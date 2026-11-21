import { defineConfig } from "drizzle-kit";

// drizzle-kit does not read .env; Node's built-in loader does (no-op when absent).
try {
  process.loadEnvFile();
} catch {
  // No .env file: use the process environment.
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/infrastructure/persistence/drizzle/schema.ts",
  out: "./drizzle",
  schemaFilter: ["originalpal"],
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  migrations: {
    schema: "originalpal",
    table: "__drizzle_migrations",
  },
  strict: true,
  verbose: true,
});
