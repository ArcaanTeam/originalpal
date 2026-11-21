export function describeDatabaseUrl(databaseUrl) {
  try {
    const url = new URL(databaseUrl);
    const hostname = url.hostname.includes(":")
      ? `[${url.hostname}]`
      : url.hostname;
    return {
      endpoint: `${hostname}:${url.port || "5432"}`,
      databaseName:
        decodeURIComponent(url.pathname.replace(/^\//, "")) ||
        "(not specified)",
    };
  } catch {
    return { endpoint: "(invalid DATABASE_URL)", databaseName: "(unknown)" };
  }
}

function getErrorChain(error) {
  const chain = [];
  const seen = new Set();
  let current = error;
  while (current && !seen.has(current)) {
    seen.add(current);
    chain.push(current);
    current = typeof current === "object" ? current.cause : undefined;
  }
  return chain;
}

export function formatDatabaseError(error, { databaseUrl, operation }) {
  const { endpoint, databaseName } = describeDatabaseUrl(databaseUrl);
  const chain = getErrorChain(error);
  const messages = chain
    .map((item) => (item instanceof Error ? item.message : String(item)))
    .filter((message, index, all) => message && all.indexOf(message) === index);
  const message = messages.join("\nCaused by: ");
  const codeValue = chain.find(
    (item) => item && typeof item === "object" && "code" in item,
  )?.code;
  const code = codeValue ? ` (${String(codeValue)})` : "";
  const lines = [
    `Database operation failed: ${operation}.`,
    `Target: ${databaseName} at ${endpoint}.`,
    `PostgreSQL reported${code}: ${message}`,
  ];

  if (
    [
      "ECONNREFUSED",
      "ECONNRESET",
      "ETIMEDOUT",
      "ENOTFOUND",
      "EHOSTUNREACH",
    ].includes(codeValue) ||
    /connection terminated|connection refused|timeout/i.test(message)
  ) {
    lines.push(
      "Check that the DATABASE_URL host and port are correct, PostgreSQL is running and accepting connections, and any firewall or network rules allow access.",
      "If PostgreSQL runs in Docker, use an address reachable from this shell (often localhost with the published port, not the container-only service name). Check SSL URL options if the server requires TLS.",
    );
    if (/connection terminated unexpectedly/i.test(message)) {
      lines.push(
        "The socket opened but closed before PostgreSQL completed its startup handshake. Confirm this port is actually PostgreSQL (for Docker, commonly host 5438 mapped to container 5432), inspect the database server logs, and verify it accepts connections to the maintenance database `postgres`.",
      );
    }
  } else if (codeValue === "28P01" || codeValue === "28000") {
    lines.push(
      "Check the username/password in DATABASE_URL and verify that the role is allowed to connect from this host.",
    );
  } else if (codeValue === "3D000") {
    lines.push(
      "The database does not exist. Create it with `pnpm db:create`, then retry.",
    );
  } else if (codeValue === "42501") {
    lines.push(
      "The PostgreSQL role lacks the required privileges. Grant the needed database/schema permissions or use an authorized role.",
    );
  } else {
    lines.push(
      "Check DATABASE_URL and PostgreSQL server logs for additional details.",
    );
  }

  lines.push("Connection credentials are omitted from this diagnostic.");
  return lines.join("\n");
}
