import { sql } from "drizzle-orm";
import "server-only";
import { closeDatabase, createDatabase } from "./client";

function shouldSkipDatabaseConnectivityCheck(): boolean {
  return (
    process.env.VITEST === "true" || process.env.SKIP_ENV_VALIDATION === "true"
  );
}

export async function assertDatabaseConnectivity(): Promise<void> {
  if (shouldSkipDatabaseConnectivityCheck()) {
    return;
  }

  const db = createDatabase();

  try {
    await db.execute(sql`SELECT 1`);
  } catch (error) {
    const detail =
      error instanceof Error ? error.message : "Unknown database error";
    throw new Error(
      [
        "Database connectivity check failed.",
        "Verify DATABASE_URL and that Postgres is reachable before starting the app.",
        detail,
      ].join("\n"),
    );
  } finally {
    await closeDatabase(db);
  }
}
