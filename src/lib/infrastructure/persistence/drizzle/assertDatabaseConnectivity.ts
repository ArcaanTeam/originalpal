import { sql } from "drizzle-orm";
import "server-only";
import { closeDatabase, createDatabase } from "./client";

function shouldSkipDatabaseConnectivityCheck(): boolean {
  return (
    process.env.VITEST === "true" || process.env.SKIP_ENV_VALIDATION === "true"
  );
}

function getErrorChain(error: unknown): unknown[] {
  const chain: unknown[] = [];
  const seen = new Set<object>();
  let current: unknown = error;

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    chain.push(current);
    current = "cause" in current ? current.cause : undefined;
  }

  if (chain.length === 0) chain.push(error);
  return chain;
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function getDatabaseTarget(): string {
  try {
    const url = new URL(process.env.DATABASE_URL ?? "");
    const database = decodeURIComponent(url.pathname.replace(/^\//, ""));
    const hostname = url.hostname.includes(":")
      ? `[${url.hostname}]`
      : url.hostname;
    return `${database || "(database not specified)"} at ${hostname}:${url.port || "5432"}`;
  } catch {
    return "(invalid DATABASE_URL)";
  }
}

function formatDatabaseConnectivityError(error: unknown): string {
  const chain = getErrorChain(error);
  const messages = chain
    .map(getErrorMessage)
    .filter((message, index, all) => message && all.indexOf(message) === index);
  const cause = messages.join("\nCaused by: ");
  const codeHolder = chain.find(
    (item) => item && typeof item === "object" && "code" in item,
  );
  const code =
    codeHolder && typeof codeHolder === "object" && "code" in codeHolder
      ? String(codeHolder.code)
      : undefined;
  const diagnostic = [
    `Database connectivity check failed for ${getDatabaseTarget()}.`,
    `PostgreSQL error${code ? ` (${code})` : ""}: ${cause}`,
  ];

  if (code === "28P01" || code === "28000") {
    diagnostic.push(
      "Authentication failed. Check the username and password in DATABASE_URL. With Docker Compose, changing POSTGRES_PASSWORD does not update an existing data volume; reset the PostgreSQL role password or use the password already stored in that volume.",
    );
  } else if (code === "3D000") {
    diagnostic.push(
      "The configured database does not exist. Create it with `pnpm db:create` or verify the database name in DATABASE_URL.",
    );
  } else if (
    ["ECONNREFUSED", "ECONNRESET", "ETIMEDOUT", "ENOTFOUND", "EHOSTUNREACH"].includes(
      code ?? "",
    ) || /connection terminated|connection refused|timeout/i.test(cause)
  ) {
    diagnostic.push(
      "Check the host and port in DATABASE_URL, that PostgreSQL is running and accepting connections, and that the app is using the correct network address (Compose services should use the service name and container port).",
    );
  } else if (code === "42501") {
    diagnostic.push(
      "The PostgreSQL role lacks permission for this operation. Check its database and schema privileges.",
    );
  } else {
    diagnostic.push("Check DATABASE_URL and the PostgreSQL server logs for more details.");
  }

  diagnostic.push("Connection credentials are omitted from this diagnostic.");
  return diagnostic.join("\n");
}

export async function assertDatabaseConnectivity(): Promise<void> {
  if (shouldSkipDatabaseConnectivityCheck()) {
    return;
  }

  const db = createDatabase();

  try {
    await db.execute(sql`SELECT 1`);
  } catch (error) {
    throw new Error(formatDatabaseConnectivityError(error), { cause: error });
  } finally {
    await closeDatabase(db);
  }
}
