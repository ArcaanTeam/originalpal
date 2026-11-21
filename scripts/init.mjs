// Renames the project to the name entered in the prompt (package name,
// Postgres schema & migrations, auth cookies, JWT issuer, theme storage key,
// Docker tags, UI title/description, and README heading).
//
// Usage:
//   pnpm run init                        (interactive prompt)
//   pnpm run init -- --name my-app --yes (non-interactive, defaults for the rest)
//   npm run init
//
// Flags: --name, --title, --description, --schema, --yes, --help.
// Uses only Node built-ins, so it works before `pnpm install`.
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import {
  applyReplacements,
  buildRenameRules,
  deriveNames,
  detectCurrentProjectNames,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  validateProjectName,
  validateSchemaName,
} from "./bootstrap/rules.mjs";

const DEFAULT_ROOT = fileURLToPath(new URL("..", import.meta.url));

function readHelpText() {
  return readFileSync(fileURLToPath(import.meta.url), "utf8")
    .split("\n")
    .filter((line) => line.startsWith("//"))
    .map((line) => line.replace(/^\/\/ ?/, ""))
    .join("\n");
}

function formatFiles(root, files) {
  const prettier = path.join(root, "node_modules", ".bin", "prettier");
  if (files.length === 0 || !existsSync(prettier)) {
    return files.length === 0;
  }
  const result = spawnSync(
    prettier,
    ["--write", "--log-level=warn", "--ignore-unknown", ...files],
    {
      cwd: root,
      stdio: "inherit",
      shell: process.platform === "win32",
    },
  );
  return result.status === 0;
}

function updateExistingEnv(envContent, current, next) {
  const escapedDb = current.dbName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  let updated = envContent.replace(
    new RegExp(`(5432/)${escapedDb}(?![a-z0-9_])`, "g"),
    `$1${next.snake}`,
  );
  updated = updated.replace(
    `5432/${current.dbName}_test`,
    `5432/${next.snake}_test`,
  );
  updated = updated.replace(
    `JWT_ISSUER="${current.jwtIssuer}"`,
    `JWT_ISSUER="${next.name}-auth"`,
  );
  return updated;
}

export async function runInit(argv = process.argv.slice(2), options = {}) {
  const root = options.root ?? DEFAULT_ROOT;
  const input = options.stdin ?? process.stdin;
  const output = options.stdout ?? process.stdout;
  const errorOutput = options.stderr ?? process.stderr;

  const normalizedArgv = argv[0] === "--" ? argv.slice(1) : argv;

  const { values: flags } = parseArgs({
    args: normalizedArgv,
    options: {
      name: { type: "string" },
      title: { type: "string" },
      description: { type: "string" },
      schema: { type: "string" },
      yes: { type: "boolean", short: "y", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
  });

  if (flags.help) {
    output.write(`${readHelpText()}\n`);
    return { status: "help", updatedFiles: [] };
  }

  const readProjectFile = (file) => readFileSync(path.join(root, file), "utf8");
  const readProjectFileOrNull = (file) => {
    const full = path.join(root, file);
    return existsSync(full) ? readFileSync(full, "utf8") : null;
  };
  const writeProjectFile = (file, content) =>
    writeFileSync(path.join(root, file), content);

  const current = detectCurrentProjectNames(readProjectFileOrNull);

  const shouldPrompt =
    !flags.yes && !(flags.name !== undefined && !input.isTTY);
  const rl = shouldPrompt
    ? createInterface({ input, crlfDelay: Infinity })
    : null;
  const lineIterator = rl ? rl[Symbol.asyncIterator]() : null;

  const fail = (message) => {
    rl?.close();
    throw new Error(message);
  };

  async function askQuestion(prompt) {
    if (!lineIterator) {
      return "";
    }
    output.write(prompt);
    try {
      const next = await lineIterator.next();
      if (next.done) {
        return "";
      }
      if (!input.isTTY) {
        output.write("\n");
      }
      return next.value.trim();
    } catch {
      return "";
    }
  }

  async function ask(question, { flag, fallback, validate, suggest } = {}) {
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
      const answer = await askQuestion(`${question}${hint}: `);
      const value = answer || fallback;
      const error = validate?.(value ?? "");
      if (!error) {
        return value;
      }
      const suggestion = suggest?.(value);
      const hintSuffix =
        suggestion && suggestion !== value
          ? ` Suggestion: "${suggestion}".`
          : "";
      output.write(`  ${error}${hintSuffix}\n`);
    }
  }

  async function confirm(question, fallback) {
    if (!rl) {
      return fallback;
    }
    const hint = fallback ? "Y/n" : "y/N";
    const answer = (await askQuestion(`${question} [${hint}]: `)).toLowerCase();
    return answer ? answer.startsWith("y") : fallback;
  }

  try {
    output.write(
      `Current project: ${current.packageName} (${current.title})\n\n`,
    );

    const dirDefault = toKebabCase(path.basename(root));
    const fallbackName =
      dirDefault &&
      dirDefault !== current.packageName &&
      !validateProjectName(dirDefault)
        ? dirDefault
        : "my-app";

    const name = await ask("Project name (package, cookies, Docker tag)", {
      flag: flags.name,
      fallback: fallbackName,
      validate: validateProjectName,
      suggest: toKebabCase,
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
      suggest: toSnakeCase,
    });

    const names = deriveNames({ name, title, description, schema });

    output.write("\nSummary:\n");
    output.write(`  name         ${names.name}\n`);
    output.write(`  title        ${names.title}\n`);
    output.write(`  description  ${names.description}\n`);
    output.write(`  schema       ${names.schema}\n`);
    output.write(
      `  cookies      ${names.snake}_access_token / _refresh_token\n`,
    );

    if (!(await confirm("\nApply these changes?", true))) {
      output.write("Aborted; nothing was changed.\n");
      return { status: "aborted", updatedFiles: [] };
    }
    rl?.close();

    if (
      current.packageName === names.name &&
      current.title === names.title &&
      current.schema === names.schema
    ) {
      output.write("\nProject already uses these settings; nothing changed.\n");
      return { status: "unchanged", updatedFiles: [] };
    }

    const updates = [];
    const warnings = [];
    for (const rule of buildRenameRules(current, names)) {
      if (!existsSync(path.join(root, rule.file))) {
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

    const envPath = path.join(root, ".env");
    if (existsSync(envPath)) {
      const beforeEnv = readFileSync(envPath, "utf8");
      const afterEnv = updateExistingEnv(beforeEnv, current, names);
      if (afterEnv !== beforeEnv) {
        writeFileSync(envPath, afterEnv);
        updates.push({ file: ".env", content: afterEnv });
      }
    }

    output.write(
      `\n✔ Renamed project to "${names.name}" (${updates.length} files updated).\n`,
    );

    if (!options.skipFormat) {
      formatFiles(
        root,
        updates.map((update) => update.file).filter((file) => file !== ".env"),
      );
    }

    if (warnings.length > 0) {
      errorOutput.write(
        "\n⚠ Some template strings were not found (already edited?):\n",
      );
      for (const warning of warnings) {
        errorOutput.write(`  - ${warning}\n`);
      }
    }

    return {
      status: "updated",
      names,
      updatedFiles: updates.map((u) => u.file),
      warnings,
    };
  } finally {
    rl?.close();
  }
}

const isEntrypoint =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isEntrypoint) {
  runInit().catch((error) => {
    console.error(
      `\n✖ ${error instanceof Error ? error.message : String(error)}`,
    );
    process.exit(1);
  });
}
