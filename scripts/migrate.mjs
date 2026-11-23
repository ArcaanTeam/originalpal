// Applies Drizzle migrations from ./drizzle.
//
// Usage: node scripts/migrate.mjs   (reads DATABASE_URL; .env when present)
import { fileURLToPath } from "node:url";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import { formatDatabaseError } from "./db-diagnostics.mjs";

// ../drizzle next to this script, in the repo and in the Docker image.
const MIGRATIONS_FOLDER = fileURLToPath(new URL("../drizzle", import.meta.url));
const MIGRATIONS_SCHEMA = "originalpal";
const MIGRATIONS_TABLE = "__drizzle_migrations";

try {
  process.loadEnvFile();
} catch {
  // No .env file: use the process environment.
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required to run migrations.");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: databaseUrl });
try {
  await migrate(drizzle({ client: pool }), {
    migrationsFolder: MIGRATIONS_FOLDER,
    migrationsSchema: MIGRATIONS_SCHEMA,
    migrationsTable: MIGRATIONS_TABLE,
  });
  console.log("Database migrations are up to date.");
} catch (error) {
  console.error(
    formatDatabaseError(error, {
      databaseUrl,
      operation: "apply Drizzle migrations",
    }),
  );
  process.exitCode = 1;
} finally {
  await pool.end();
}
