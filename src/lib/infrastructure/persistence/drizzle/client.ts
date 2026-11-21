import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "server-only";
import { getServerEnv } from "@/lib/infrastructure/env";
import * as schema from "./schema";

export type Database = NodePgDatabase<typeof schema> & { $client: Pool };

/** A database handle or an open transaction — repositories accept either. */
export type DbExecutor =
  Database | Parameters<Parameters<Database["transaction"]>[0]>[0];

const globalForDb = globalThis as unknown as {
  appDb: Database | undefined;
};

export function createDatabase(databaseUrl?: string): Database {
  const pool = new Pool({
    connectionString: databaseUrl ?? getServerEnv().DATABASE_URL,
  });
  return drizzle({ client: pool, schema });
}

/** Shared pool for the app process (survives dev hot reloads). */
export function getDb(): Database {
  globalForDb.appDb ??= createDatabase();
  return globalForDb.appDb;
}

export async function closeDatabase(db: Database = getDb()): Promise<void> {
  await db.$client.end();
  if (globalForDb.appDb === db) {
    globalForDb.appDb = undefined;
  }
}
