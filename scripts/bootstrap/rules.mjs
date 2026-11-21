// Pure helpers for scripts/bootstrap: name derivation, validation, and the
// exact template strings to rewrite. No file system access here, so it is
// unit-tested in rules.test.mjs.

/** Package name the template ships with; any other name means already bootstrapped. */
export const TEMPLATE_PACKAGE_NAME = "nextjs-starter";

const TEMPLATE_TITLE = "پنل";

export const TEMPLATE_PROJECT_DEFAULTS = {
  packageName: TEMPLATE_PACKAGE_NAME,
  dockerImageBase: "app",
  schema: "app",
  cookiePrefix: "app",
  jwtIssuer: "app-auth",
  themeStorageKey: "app-ui-theme",
  dbName: "app",
  dockerCachePrefix: "app",
  title: TEMPLATE_TITLE,
};

/** npm package name: lowercase, digits, dashes; starts with a letter. */
const PROJECT_NAME_PATTERN = /^[a-z][a-z0-9-]{0,49}$/;

/** Postgres identifier we generate: lowercase, digits, underscores. */
const SCHEMA_NAME_PATTERN = /^[a-z][a-z0-9_]{0,62}$/;

/** "My Cool App" → "my-cool-app". */
export function toKebabCase(value) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/^[^a-z]+/, "");
}

/** "my-cool-app" → "my_cool_app". */
export function toSnakeCase(value) {
  return toKebabCase(value).replace(/-/g, "_");
}

/** "my-cool-app" → "My Cool App". */
export function toTitleCase(value) {
  return toKebabCase(value)
    .split("-")
    .filter(Boolean)
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

/** Derives PostgreSQL and in-network DSN settings for the local Compose stack. */
export function getComposeDatabaseSettings(databaseUrl, fallbackDatabaseName) {
  const url = new URL(databaseUrl);
  if (!["postgres:", "postgresql:"].includes(url.protocol)) {
    throw new Error(
      "DATABASE_URL must use postgres:// or postgresql:// for Docker Compose.",
    );
  }

  const databaseName =
    decodeURIComponent(url.pathname.slice(1)) || fallbackDatabaseName;
  const username = decodeURIComponent(url.username) || "postgres";
  const password = decodeURIComponent(url.password) || "local-dev-change-me";
  const dockerUrl = new URL(databaseUrl);
  dockerUrl.hostname = "db";
  dockerUrl.port = "5432";
  dockerUrl.username = "";
  dockerUrl.password = "";
  dockerUrl.pathname = `/${encodeURIComponent(databaseName)}`;
  const dockerConnectionUrl = `${dockerUrl.protocol}//${encodeURIComponent(username)}:${encodeURIComponent(password)}@${dockerUrl.host}${dockerUrl.pathname}${dockerUrl.search}`;

  return {
    POSTGRES_DB: databaseName,
    POSTGRES_USER: username,
    // Compose interprets `$` in .env values; escape it so the runtime password remains literal.
    POSTGRES_PASSWORD: password.replaceAll("$", () => "$$"),
    POSTGRES_PORT: url.port || "5439",
    DATABASE_URL_DOCKER: dockerConnectionUrl,
  };
}

/** Returns an error message, or null when the name is usable. */
export function validateProjectName(name) {
  if (!PROJECT_NAME_PATTERN.test(name)) {
    return "Use 1–50 lowercase letters, digits or dashes, starting with a letter (e.g. my-app).";
  }
  if (name.endsWith("-") || name.includes("--")) {
    return "Dashes must separate words (no leading, trailing or doubled dashes).";
  }
  return null;
}

/** Returns an error message, or null when the schema name is usable. */
export function validateSchemaName(name) {
  if (!SCHEMA_NAME_PATTERN.test(name)) {
    return "Use lowercase letters, digits or underscores, starting with a letter (e.g. my_app).";
  }
  if (name.startsWith("pg_") || name === "public") {
    return `"${name}" is reserved by Postgres.`;
  }
  return null;
}

/**
 * Fills in every derived value from the answers the user gave.
 * @param {{ name: string, title?: string, description?: string, schema?: string }} input
 */
export function deriveNames(input) {
  const name = input.name;
  const snake = name.replace(/-/g, "_");
  return {
    name,
    snake,
    title: input.title?.trim() || toTitleCase(name),
    description: input.description?.trim() || `${toTitleCase(name)} panel`,
    schema: input.schema?.trim() || snake,
  };
}

function escapeForRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function jsonString(value) {
  return JSON.stringify(value).slice(1, -1);
}

function decodeJsonStringLiteral(escapedContent, fallback) {
  try {
    return JSON.parse(`"${escapedContent}"`);
  } catch {
    return fallback;
  }
}

/**
 * Inspects current project files (via a caller-provided reader) to detect the
 * active project identifiers, enabling `init` to rename both fresh templates
 * and already-renamed projects.
 * @param {(file: string) => string | null} readFile
 */
export function detectCurrentProjectNames(readFile) {
  const pkgRaw = readFile("package.json");
  let packageName = TEMPLATE_PROJECT_DEFAULTS.packageName;
  let dockerImageBase = TEMPLATE_PROJECT_DEFAULTS.dockerImageBase;
  if (pkgRaw) {
    try {
      const pkg = JSON.parse(pkgRaw);
      if (typeof pkg.name === "string" && pkg.name.trim()) {
        packageName = pkg.name.trim();
      }
      const dockerBuild = pkg.scripts?.["docker:build"];
      if (typeof dockerBuild === "string") {
        const match = dockerBuild.match(/docker build -t ([^\s:]+):latest/);
        if (match?.[1]) {
          dockerImageBase = match[1];
        }
      }
    } catch {
      // Keep defaults when package.json is unreadable.
    }
  }

  const drizzleConfig = readFile("drizzle.config.ts");
  const schema =
    drizzleConfig?.match(/schemaFilter:\s*\[\s*"([^"]+)"\s*\]/)?.[1] ??
    TEMPLATE_PROJECT_DEFAULTS.schema;

  const authConstants = readFile("src/lib/infrastructure/auth/constants.ts");
  const cookiePrefix =
    authConstants?.match(/"([^"]+)_access_token"/)?.[1] ??
    TEMPLATE_PROJECT_DEFAULTS.cookiePrefix;

  const envFile = readFile("src/lib/infrastructure/env.ts");
  const jwtIssuer =
    envFile?.match(/JWT_ISSUER:[\s\S]*?\.default\("([^"]+)"\)/)?.[1] ??
    TEMPLATE_PROJECT_DEFAULTS.jwtIssuer;

  const themeProvider = readFile(
    "src/lib/presentation/ui/context/theme-provider.tsx",
  );
  const themeStorageKey =
    themeProvider?.match(/UI_THEME_STORAGE_KEY\s*=\s*"([^"]+)"/)?.[1] ??
    TEMPLATE_PROJECT_DEFAULTS.themeStorageKey;

  const envExample = readFile(".env.example");
  const dbName =
    envExample?.match(/5432\/([a-zA-Z0-9_-]+)_test/)?.[1] ??
    TEMPLATE_PROJECT_DEFAULTS.dbName;

  const prodDockerfile = readFile("docker/production/Dockerfile");
  const dockerCachePrefix =
    prodDockerfile?.match(/id=([a-z0-9-]+)-pnpm-store/)?.[1] ??
    TEMPLATE_PROJECT_DEFAULTS.dockerCachePrefix;

  const faDict = readFile("src/lib/presentation/i18n/dictionaries/fa.ts");
  const titleMatch = faDict?.match(
    /metadata:\s*\{\s*title:\s*"((?:[^"\\]|\\.)*)"/,
  );
  const title = titleMatch?.[1]
    ? decodeJsonStringLiteral(titleMatch[1], TEMPLATE_PROJECT_DEFAULTS.title)
    : TEMPLATE_PROJECT_DEFAULTS.title;

  return {
    packageName,
    dockerImageBase,
    schema,
    cookiePrefix,
    jwtIssuer,
    themeStorageKey,
    dbName,
    dockerCachePrefix,
    title,
  };
}

/**
 * Every string to rewrite, per file, from `current` project identifiers to
 * `next` derived names.
 */
export function buildRenameRules(current, next) {
  const { name, snake, title, description, schema } = next;
  const currentSchemaQuoted = `"${current.schema}"`;
  const schemaQuoted = `"${schema}"`;
  const dbUrl = `5432/${snake}`;
  const currentDbUrlPattern = dbUrlPatternFor(current.dbName);

  return [
    {
      file: "package.json",
      replacements: [
        [`"name": "${current.packageName}"`, `"name": "${name}"`],
        [`${current.dockerImageBase}:latest`, `${name}:latest`],
      ],
    },
    // Postgres schema
    {
      file: "src/lib/infrastructure/persistence/drizzle/schema.ts",
      replacements: [
        [`pgSchema(${currentSchemaQuoted})`, `pgSchema(${schemaQuoted})`],
      ],
    },
    {
      file: "drizzle.config.ts",
      replacements: [
        [
          `schemaFilter: [${currentSchemaQuoted}]`,
          `schemaFilter: [${schemaQuoted}]`,
        ],
        [`schema: ${currentSchemaQuoted},`, `schema: ${schemaQuoted},`],
      ],
    },
    {
      file: "scripts/migrate.mjs",
      replacements: [
        [
          `const MIGRATIONS_SCHEMA = ${currentSchemaQuoted};`,
          `const MIGRATIONS_SCHEMA = ${schemaQuoted};`,
        ],
      ],
    },
    {
      file: "scripts/seed.mjs",
      replacements: [
        [`${currentSchemaQuoted}."users"`, `${schemaQuoted}."users"`],
      ],
    },
    {
      file: "drizzle/0000_baseline.sql",
      replacements: [
        [
          `CREATE SCHEMA ${currentSchemaQuoted};`,
          `CREATE SCHEMA ${schemaQuoted};`,
        ],
        [`${currentSchemaQuoted}.`, `${schemaQuoted}.`],
      ],
    },
    {
      file: "drizzle/0001_files.sql",
      replacements: [[`${currentSchemaQuoted}.`, `${schemaQuoted}.`]],
    },
    {
      file: "drizzle/meta/0000_snapshot.json",
      replacements: [
        [`"${current.schema}.`, `"${schema}.`],
        [`"schema": ${currentSchemaQuoted}`, `"schema": ${schemaQuoted}`],
        [`"schemaTo": ${currentSchemaQuoted}`, `"schemaTo": ${schemaQuoted}`],
        [
          `"typeSchema": ${currentSchemaQuoted}`,
          `"typeSchema": ${schemaQuoted}`,
        ],
        [
          `${currentSchemaQuoted}: ${currentSchemaQuoted}`,
          `${schemaQuoted}: ${schemaQuoted}`,
        ],
      ],
    },
    {
      file: "drizzle/meta/0001_snapshot.json",
      replacements: [
        [`"${current.schema}.`, `"${schema}.`],
        [`"schema": ${currentSchemaQuoted}`, `"schema": ${schemaQuoted}`],
        [`"schemaTo": ${currentSchemaQuoted}`, `"schemaTo": ${schemaQuoted}`],
        [
          `"typeSchema": ${currentSchemaQuoted}`,
          `"typeSchema": ${schemaQuoted}`,
        ],
        [
          `${currentSchemaQuoted}: ${currentSchemaQuoted}`,
          `${schemaQuoted}: ${schemaQuoted}`,
        ],
      ],
    },
    // Auth cookies, JWT issuer, browser storage keys
    {
      file: "src/lib/infrastructure/auth/constants.ts",
      replacements: [
        [`"${current.cookiePrefix}_access_token"`, `"${snake}_access_token"`],
        [`"${current.cookiePrefix}_refresh_token"`, `"${snake}_refresh_token"`],
      ],
    },
    {
      file: "src/lib/presentation/http/auth/controller.test.ts",
      replacements: [
        [`${current.cookiePrefix}_access_token=`, `${snake}_access_token=`],
        [`${current.cookiePrefix}_refresh_token=`, `${snake}_refresh_token=`],
      ],
    },
    {
      file: "AGENTS.md",
      replacements: [
        [
          `\`${current.cookiePrefix}_access_token\`, \`${current.cookiePrefix}_refresh_token\``,
          `\`${snake}_access_token\`, \`${snake}_refresh_token\``,
        ],
      ],
    },
    {
      file: "src/proxy.ts",
      replacements: [[`"${current.jwtIssuer}"`, `"${name}-auth"`]],
    },
    {
      file: "src/lib/infrastructure/env.ts",
      replacements: [[`"${current.jwtIssuer}"`, `"${name}-auth"`]],
    },
    {
      file: "src/lib/infrastructure/env.test.ts",
      replacements: [
        [`"${current.jwtIssuer}"`, `"${name}-auth"`],
        [currentDbUrlPattern, dbUrl],
      ],
    },
    {
      file: "src/lib/infrastructure/auth/jwtAccessToken.test.ts",
      replacements: [[`"${current.jwtIssuer}"`, `"${name}-auth"`]],
    },
    {
      file: "src/lib/presentation/ui/context/theme-provider.tsx",
      replacements: [[`"${current.themeStorageKey}"`, `"${name}-ui-theme"`]],
    },
    // Env and Docker
    {
      file: ".env.example",
      replacements: [
        [currentDbUrlPattern, dbUrl],
        [`5432/${current.dbName}_test`, `5432/${snake}_test`],
        [`JWT_ISSUER="${current.jwtIssuer}"`, `JWT_ISSUER="${name}-auth"`],
      ],
    },
    {
      file: "Dockerfile",
      replacements: [[currentDbUrlPattern, dbUrl]],
    },
    {
      file: "docker/production/Dockerfile",
      replacements: [
        [currentDbUrlPattern, dbUrl],
        [`id=${current.dockerCachePrefix}-`, `id=${name}-`],
      ],
    },
    // Display name
    {
      file: "src/lib/presentation/i18n/dictionaries/fa.ts",
      // Description first: its pattern expects the current title unescaped.
      replacements: [
        [
          /(metadata: \{\n\s+title: "[^"]*",\n\s+description: ")[^"]*(")/,
          `$1${jsonString(description).replace(/\$/g, "$$$$")}$2`,
        ],
        [
          `title: "${jsonString(current.title)}"`,
          `title: "${jsonString(title)}"`,
        ],
      ],
    },
    {
      file: "src/lib/presentation/i18n/dictionary.test.ts",
      replacements: [
        [
          `metadata.title).toBe("${jsonString(current.title)}")`,
          `metadata.title).toBe("${jsonString(title)}")`,
        ],
      ],
    },
    {
      file: "README.md",
      replacements: [[/^# .*$/m, `# ${title.replace(/\$/g, "$$$$")}`]],
    },
  ];
}

/**
 * Every template string to rewrite, per file. `find` is matched literally
 * (all occurrences) unless it is a RegExp. Strings are deliberately specific
 * so unrelated text (e.g. Docker's `WORKDIR /app`) is left alone.
 */
export function buildRules(names) {
  return buildRenameRules(TEMPLATE_PROJECT_DEFAULTS, names);
}

/** `5432/<dbName>` not followed by more identifier characters (keeps `<dbName>_test`). */
function dbUrlPatternFor(dbName) {
  return new RegExp(`${escapeForRegExp(`5432/${dbName}`)}(?![a-z0-9_])`, "g");
}

/**
 * Applies one rule's replacements to file content.
 * @returns {{ content: string, missing: string[] }} `missing` lists finds that matched nothing.
 */
export function applyReplacements(content, replacements) {
  const missing = [];
  let next = content;
  for (const [find, replaceWith] of replacements) {
    if (find instanceof RegExp) {
      if (!new RegExp(find.source, find.flags.replace("g", "")).test(next)) {
        missing.push(String(find));
        continue;
      }
      next = next.replace(find, replaceWith);
      continue;
    }
    if (!next.includes(find)) {
      missing.push(find);
      continue;
    }
    next = next.split(find).join(replaceWith);
  }
  return { content: next, missing };
}

/**
 * Sets `KEY="value"` lines in a dotenv file, keeping comments and order.
 * Keys not present are appended.
 */
export function setEnvValues(envText, values) {
  let next = envText;
  for (const [key, value] of Object.entries(values)) {
    const line = `${key}=${JSON.stringify(String(value))}`;
    const pattern = new RegExp(`^${escapeForRegExp(key)}=.*$`, "m");
    next = pattern.test(next)
      ? next.replace(pattern, () => line)
      : `${next.replace(/\n*$/, "\n")}${line}\n`;
  }
  return next;
}
