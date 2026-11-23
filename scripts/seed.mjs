// Seeds sample users of every role into the database.
//
// Auth is phone + password (no registration). The `username` column stores
// the phone number (e.g. 09123456789) and is used as the login identifier.
//
// Usage: node scripts/seed.mjs
// Env: DATABASE_URL (required), BCRYPT_ROUNDS (default 12).
//      ADMIN_USERNAME / ADMIN_PASSWORD override the primary admin (default
//      phone 09120000001 / Secret1!234). Reads .env when present.
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
  console.error("DATABASE_URL is required to seed users.");
  process.exit(1);
}

const rounds = Number(process.env.BCRYPT_ROUNDS ?? 12);

// Sample users covering every AppRole. Phone numbers act as usernames.
const sampleUsers = [
  {
    username: process.env.ADMIN_USERNAME ?? "09120000001",
    password: process.env.ADMIN_PASSWORD ?? "Secret1!234",
    role: "Admin",
    label: "primary admin",
  },
  {
    username: "09120000002",
    password: "Member1!234",
    role: "Member",
    label: "sample member",
  },
  {
    username: "09120000003",
    password: "Member1!234",
    role: "Member",
    label: "sample member 2",
  },
];

const client = new pg.Client({ connectionString: databaseUrl });
let exitCode = 0;
try {
  await client.connect();
  for (const user of sampleUsers) {
    const passwordHash = await bcrypt.hash(user.password, rounds);
    await client.query(
      `INSERT INTO "originalpal"."users" (id, username, password_hash, role)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (username)
       DO UPDATE SET password_hash = EXCLUDED.password_hash, role = EXCLUDED.role`,
      [randomUUID(), user.username, passwordHash, user.role],
    );
    console.log(
      `Seeded ${user.label} "${user.username}" (role: ${user.role}).`,
    );
  }
} catch (error) {
  console.error(
    formatDatabaseError(error, {
      databaseUrl,
      operation: "seed sample users",
    }),
  );
  exitCode = 1;
} finally {
  await client.end();
}
process.exitCode = exitCode;
