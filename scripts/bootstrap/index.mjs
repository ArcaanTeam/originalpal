// Bootstraps a fresh clone of the template for a new project: renames the
// app (package, Postgres schema, cookies, JWT issuer, storage keys, Docker
// tags, UI title) and writes a .env with a generated JWT secret.
//
// Usage:
//   pnpm bootstrap                       (interactive)
//   pnpm bootstrap --name my-app --yes   (non-interactive, defaults for the rest)
//
// Flags: --name, --title, --description, --schema, --database-url,
//        --admin-username, --admin-password, --yes (accept defaults),
//        --keep-script (do not remove scripts/bootstrap afterwards),
//        --force (run even if the project was already bootstrapped).
//
// Uses only Node built-ins, so it runs before `pnpm install`.
import { spawnSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import {
  TEMPLATE_PACKAGE_NAME,
  applyReplacements,
  buildRules,
  deriveNames,
  setEnvValues,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  validateProjectName,
  validateSchemaName,
} from "./rules.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));

const { values: flags } = parseArgs({
  options: {
    name: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    schema: { type: "string" },
    "database-url": { type: "string" },
    "admin-username": { type: "string" },
    "admin-password": { type: "string" },
    yes: { type: "boolean", short: "y", default: false },
    "keep-script": { type: "boolean", default: false },
    force: { type: "boolean", default: false },
    help: { type: "boolean", short: "h", default: false },
  },
});

if (flags.help) {
  const header = readFileSync(fileURLToPath(import.meta.url), "utf8")
    .split("\n")
    .filter((line) => line.startsWith("//"))
    .map((line) => line.replace(/^\/\/ ?/, ""))
    .join("\n");
  console.log(header);
  process.exit(0);
}

const interactive = !flags.yes && process.stdin.isTTY;
const rl = interactive
  ? createInterface({ input: process.stdin, output: process.stdout })
  : null;

/** Asks until `validate` passes; returns the default on empty input or in non-interactive mode. */
async function ask(question, { flag, fallback, validate } = {}) {
  if (flag !== undefined) {
    const error = validate?.(flag);
    if (error) {
      fail(`${question}: ${error}`);
    }
    return flag;
  }
  if (!rl) {
    return fallback;
  }
  for (;;) {
    const hint = fallback ? ` (${fallback})` : "";
    const answer = (await rl.question(`${question}${hint}: `)).trim();
    const value = answer || fallback;
    const error = validate?.(value ?? "");
    if (!error) {
      return value;
    }
    console.log(`  ${error}`);
  }
}

async function confirm(question, fallback) {
  if (!rl) {
    return fallback;
  }
  const hint = fallback ? "Y/n" : "y/N";
  const answer = (await rl.question(`${question} [${hint}]: `))
    .trim()
    .toLowerCase();
  return answer ? answer.startsWith("y") : fallback;
}

function fail(message) {
  console.error(`\n✖ ${message}`);
  rl?.close();
  process.exit(1);
}

function readProjectFile(file) {
  return readFileSync(path.join(ROOT, file), "utf8");
}

function writeProjectFile(file, content) {
  writeFileSync(path.join(ROOT, file), content);
}

function generateSecret(bytes) {
  return randomBytes(bytes).toString("base64url");
}

/** Runs the project's Prettier on `files`; false when it is not installed yet. */
function formatFiles(files) {
  const prettier = path.join(ROOT, "node_modules", ".bin", "prettier");
  if (files.length === 0 || !existsSync(prettier)) {
    return files.length === 0;
  }
  const result = spawnSync(
    prettier,
    ["--write", "--log-level=warn", "--ignore-unknown", ...files],
    {
      cwd: ROOT,
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );
  return result.status === 0;
}

async function main() {
  const packageName = JSON.parse(readProjectFile("package.json")).name;
  if (packageName !== TEMPLATE_PACKAGE_NAME && !flags.force) {
    fail(
      `This project is already bootstrapped (package name "${packageName}"). Re-run with --force to rename it again from the template values.`,
    );
  }

  console.log("Bootstrap a new project from the Next.js starter.\n");

  const defaultName = toKebabCase(path.basename(ROOT)) || "my-app";
  const name = await ask("Project name (package, cookies, Docker tag)", {
    flag: flags.name,
    fallback: validateProjectName(defaultName) ? "my-app" : defaultName,
    validate: validateProjectName,
  });
  const title = await ask("Display title (browser tab, login page)", {
    flag: flags.title,
    fallback: toTitleCase(name),
  });
  const description = await ask("Short description (page metadata)", {
    flag: flags.description,
    fallback: `${title} panel`,
  });
  const schema = await ask("Postgres schema name", {
    flag: flags.schema,
    fallback: toSnakeCase(name),
    validate: validateSchemaName,
  });

  const names = deriveNames({ name, title, description, schema });

  const envPath = path.join(ROOT, ".env");
  let writeEnv = true;
  if (existsSync(envPath)) {
    writeEnv = await confirm(".env already exists. Overwrite it?", false);
  }

  let env = null;
  if (writeEnv) {
    const databaseUrl = await ask("DATABASE_URL", {
      flag: flags["database-url"],
      fallback: `postgresql://postgres:postgres@127.0.0.1:5432/${names.snake}`,
    });
    const adminUsername = await ask("Admin username", {
      flag: flags["admin-username"],
      fallback: "admin",
    });
    const generatedPassword = generateSecret(12);
    const adminPassword = await ask(
      "Admin password (min 8 chars; blank = generate one)",
      {
        flag: flags["admin-password"],
        fallback: generatedPassword,
        validate: (value) =>
          value.trim().length >= 8 ? null : "Use at least 8 characters.",
      },
    );
    env = {
      DATABASE_URL: databaseUrl,
      JWT_SECRET: generateSecret(48),
      JWT_ISSUER: `${names.name}-auth`,
      ADMIN_USERNAME: adminUsername,
      ADMIN_PASSWORD: adminPassword,
      passwordWasGenerated: adminPassword === generatedPassword,
    };
  }

  const removeScript =
    !flags["keep-script"] &&
    (await confirm(
      "Remove the bootstrap script from the project afterwards?",
      true,
    ));

  console.log("\nSummary:");
  console.log(`  name         ${names.name}`);
  console.log(`  title        ${names.title}`);
  console.log(`  description  ${names.description}`);
  console.log(`  schema       ${names.schema}`);
  console.log(`  cookies      ${names.snake}_access_token / _refresh_token`);
  console.log(`  .env         ${env ? "write" : "keep existing"}`);
  if (!(await confirm("\nApply these changes?", true))) {
    fail("Aborted; nothing was changed.");
  }
  rl?.close();

  // Read and rewrite everything in memory first so a missing file aborts
  // before anything is written.
  const updates = [];
  const warnings = [];
  for (const rule of buildRules(names)) {
    if (!existsSync(path.join(ROOT, rule.file))) {
      warnings.push(`${rule.file}: file not found, skipped`);
      continue;
    }
    const before = readProjectFile(rule.file);
    const { content, missing } = applyReplacements(before, rule.replacements);
    for (const find of missing) {
      warnings.push(`${rule.file}: "${find}" not found`);
    }
    if (content !== before) {
      updates.push({ file: rule.file, content });
    }
  }

  for (const { file, content } of updates) {
    writeProjectFile(file, content);
  }
  console.log(`\n✔ Updated ${updates.length} files.`);

  // Longer names can shift Markdown table padding; reformat what we touched.
  const formatted = formatFiles(updates.map((update) => update.file));

  if (env) {
    const example = readProjectFile(".env.example");
    const { passwordWasGenerated, ...values } = env;
    writeProjectFile(".env", setEnvValues(example, values));
    console.log("✔ Wrote .env with a generated JWT_SECRET.");
    if (passwordWasGenerated) {
      console.log(
        `  Admin password: ${values.ADMIN_PASSWORD} (stored in .env as ADMIN_PASSWORD)`,
      );
    }
  }

  if (removeScript) {
    const packageJson = JSON.parse(readProjectFile("package.json"));
    delete packageJson.scripts?.bootstrap;
    writeProjectFile(
      "package.json",
      `${JSON.stringify(packageJson, null, 2)}\n`,
    );
    rmSync(path.join(ROOT, "scripts/bootstrap"), {
      recursive: true,
      force: true,
    });
    console.log("✔ Removed scripts/bootstrap and the bootstrap script.");
  }

  if (warnings.length > 0) {
    console.log(
      "\n⚠ Some template strings were not found (already edited?). Check these by hand:",
    );
    for (const warning of warnings) {
      console.log(`  - ${warning}`);
    }
  }

  console.log(`
Next steps:
  pnpm install${formatted ? "" : "\n  pnpm format"}
  pnpm migrate:deploy
  pnpm seed
  pnpm dev
`);
}

main().catch((error) => {
  fail(error instanceof Error ? error.message : String(error));
});
