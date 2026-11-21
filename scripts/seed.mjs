// Creates or updates the bootstrap admin user.
//
// Usage: node scripts/seed.mjs
// Env: DATABASE_URL, ADMIN_PASSWORD, optional ADMIN_USERNAME (default admin)
//      and BCRYPT_ROUNDS (default 12). Reads .env when present.
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import pg from "pg";
import { formatDatabaseError } from "./db-diagnostics.mjs";

try {
  process.loadEnvFile();
} catch {
  // No .env file: use the process environment.
}

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is required to seed the admin user.");
  process.exit(1);
}

const username = (process.env.ADMIN_USERNAME ?? "admin").trim().toLowerCase();
const password = process.env.ADMIN_PASSWORD;
if (!password?.trim()) {
  console.error("ADMIN_PASSWORD is required to seed the admin user.");
  process.exit(1);
}

const rounds = Number(process.env.BCRYPT_ROUNDS ?? 12);
const passwordHash = await bcrypt.hash(password, rounds);

const client = new pg.Client({ connectionString: databaseUrl });
try {
  await client.connect();
  await client.query(
    `INSERT INTO "originalpal"."users" (id, username, password_hash, role)
     VALUES ($1, $2, $3, 'Admin')
     ON CONFLICT (username)
     DO UPDATE SET password_hash = EXCLUDED.password_hash, role = 'Admin'`,
    [randomUUID(), username, passwordHash],
  );
  console.log(`Seeded admin user "${username}".`);
} catch (error) {
  console.error(
    formatDatabaseError(error, {
      databaseUrl,
      operation: "seed the admin user",
    }),
  );
  process.exitCode = 1;
} finally {
  await client.end();
}
