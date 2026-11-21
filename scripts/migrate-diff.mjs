import { spawnSync } from "node:child_process";

// Generates a new SQL migration in ./drizzle from schema changes.
const name = process.env.NAME?.trim() || process.argv[2]?.trim();
if (!name) {
  console.error("Usage: pnpm migrate:diff <migration_name>");
  console.error("   or: NAME=describe_change pnpm migrate:diff");
  process.exit(1);
}

const result = spawnSync("drizzle-kit", ["generate", "--name", name], {
  stdio: "inherit",
  shell: process.platform === "win32",
});

process.exit(result.status ?? 1);
