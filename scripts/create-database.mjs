import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import pg from "pg";

function loadEnv() {
  try {
    process.loadEnvFile();
  } catch {
    // .env is optional when DATABASE_URL is provided by the environment.
  }
}

export function quoteIdentifier(identifier) {
  return `"${identifier.replaceAll('"', '""')}"`;
}

export function getDatabaseConnectionInfo(databaseUrl) {
  let url;
  try {
    url = new URL(databaseUrl);
  } catch {
    throw new Error("DATABASE_URL must be a valid PostgreSQL connection URL.");
  }

  if (!["postgres:", "postgresql:"].includes(url.protocol)) {
    throw new Error(
      "DATABASE_URL must use the postgres:// or postgresql:// protocol.",
    );
  }

  const databaseName = decodeURIComponent(url.pathname.replace(/^\//, ""));
  if (!databaseName) {
    throw new Error("DATABASE_URL must include the database name in its path.");
  }

  const hostname = url.hostname.includes(":")
    ? `[${url.hostname}]`
    : url.hostname;
  const endpoint = `${hostname}:${url.port || "5432"}`;

  // Connect to the maintenance database so the target database can be created.
  url.pathname = "/postgres";
  return {
    databaseName,
    adminConnectionString: url.toString(),
    endpoint,
  };
}

function formatConnectionFailure(error, { databaseName, endpoint }) {
  const originalMessage =
    error instanceof Error ? error.message : String(error);
  const code =
    error && typeof error === "object" && "code" in error
      ? ` (${String(error.code)})`
      : "";

  return [
    `Could not connect to PostgreSQL at ${endpoint} to create database "${databaseName}".`,
    `PostgreSQL reported${code}: ${originalMessage}`,
    "Check that DATABASE_URL has the correct host, port, username, and password; that PostgreSQL is running and accepting connections; and that its SSL requirements match the URL options.",
    "If PostgreSQL runs in Docker, use a host reachable from this shell (for example, the published host port rather than the container-only service name).",
    "Credentials are omitted from this diagnostic.",
  ].join("\n");
}

export async function createDatabase({
  databaseUrl,
  Client = pg.Client,
  logger = console,
}) {
  const connectionInfo = getDatabaseConnectionInfo(databaseUrl);
  const { databaseName, adminConnectionString } = connectionInfo;
  const client = new Client({ connectionString: adminConnectionString });

  try {
    try {
      await client.connect();
    } catch (error) {
      throw new Error(formatConnectionFailure(error, connectionInfo), {
        cause: error,
      });
    }

    const existing = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [databaseName],
    );

    if (existing.rowCount) {
      logger.log(`Database "${databaseName}" already exists.`);
      return { created: false, databaseName };
    }

    try {
      // PostgreSQL parameters cannot represent identifiers; quote the validated URL path safely.
      await client.query(`CREATE DATABASE ${quoteIdentifier(databaseName)}`);
      logger.log(`Created database "${databaseName}".`);
      return { created: true, databaseName };
    } catch (error) {
      // Another setup process may have created it after the existence check.
      if (error?.code === "42P04") {
        logger.log(`Database "${databaseName}" already exists.`);
        return { created: false, databaseName };
      }
      throw error;
    }
  } finally {
    await client.end();
  }
}

async function main() {
  loadEnv();
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is required. Set it in .env or the process environment.",
    );
  }
  await createDatabase({ databaseUrl });
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href
) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
