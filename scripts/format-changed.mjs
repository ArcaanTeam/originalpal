#!/usr/bin/env node
/**
 * Format only git-changed files with Prettier (staged, unstaged, untracked).
 * Skips deleted paths and exits 0 when nothing changed.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

const SKILLS_PATH_RE = /(?:^|[\\/])\.(?:cursor|agents)[\\/]skills(?:[\\/]|$)/;

function isSkillsPath(file) {
  return SKILLS_PATH_RE.test(file.replace(/\\/g, "/"));
}

function gitLines(args) {
  try {
    const out = execFileSync("git", args, {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    return out
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);
  } catch {
    return [];
  }
}

const changed = new Set([
  ...gitLines(["diff", "--name-only", "--diff-filter=ACMR", "HEAD"]),
  ...gitLines(["ls-files", "--others", "--exclude-standard"]),
]);

const files = [...changed]
  .map((file) => path.normalize(file))
  .filter((file) => existsSync(file) && !isSkillsPath(file));

if (files.length === 0) {
  console.log("No changed files to format.");
  process.exit(0);
}

const prettierCli = require.resolve("prettier/bin/prettier.cjs");
const result = spawnSync(
  process.execPath,
  [prettierCli, "--write", "--ignore-unknown", ...files],
  { stdio: "inherit" },
);

process.exit(result.status ?? 1);
