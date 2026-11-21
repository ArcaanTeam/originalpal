import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  TEMPLATE_PACKAGE_NAME,
  applyReplacements,
  buildRules,
  deriveNames,
  detectCurrentProjectNames,
  setEnvValues,
  toKebabCase,
  toSnakeCase,
  toTitleCase,
  validateProjectName,
  validateSchemaName,
} from "./rules.mjs";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));

/** The file checks only make sense before the project has been renamed. */
const isTemplate =
  JSON.parse(readFileSync(path.join(ROOT, "package.json"), "utf8")).name ===
  TEMPLATE_PACKAGE_NAME;

describe("name helpers", () => {
  it("derives kebab, snake and title case", () => {
    expect(toKebabCase("  My Cool_App! ")).toBe("my-cool-app");
    expect(toKebabCase("2fast app")).toBe("fast-app");
    expect(toSnakeCase("my-cool-app")).toBe("my_cool_app");
    expect(toTitleCase("my-cool-app")).toBe("My Cool App");
  });

  it("validates project names", () => {
    expect(validateProjectName("my-app")).toBeNull();
    expect(validateProjectName("app2")).toBeNull();
    expect(validateProjectName("My-App")).not.toBeNull();
    expect(validateProjectName("1app")).not.toBeNull();
    expect(validateProjectName("my--app")).not.toBeNull();
    expect(validateProjectName("my-app-")).not.toBeNull();
    expect(validateProjectName("")).not.toBeNull();
  });

  it("validates schema names", () => {
    expect(validateSchemaName("my_app")).toBeNull();
    expect(validateSchemaName("my-app")).not.toBeNull();
    expect(validateSchemaName("public")).not.toBeNull();
    expect(validateSchemaName("pg_app")).not.toBeNull();
  });

  it("fills defaults from the project name", () => {
    expect(deriveNames({ name: "acme-crm" })).toEqual({
      name: "acme-crm",
      snake: "acme_crm",
      title: "Acme Crm",
      description: "Acme Crm panel",
      schema: "acme_crm",
    });
  });
});

describe("applyReplacements", () => {
  it("replaces every literal occurrence and reports misses", () => {
    const result = applyReplacements("a app b app", [
      ["app", "crm"],
      ["missing", "x"],
    ]);
    expect(result.content).toBe("a crm b crm");
    expect(result.missing).toEqual(["missing"]);
  });

  it("supports regular expressions", () => {
    const result = applyReplacements("# Old\nbody", [[/^# .*$/m, "# New"]]);
    expect(result.content).toBe("# New\nbody");
    expect(result.missing).toEqual([]);
  });
});

describe("setEnvValues", () => {
  it("replaces existing keys and appends new ones", () => {
    const env = '# db\nDATABASE_URL="old"\nJWT_SECRET="x"\n';
    expect(setEnvValues(env, { DATABASE_URL: "new", EXTRA: "1" })).toBe(
      '# db\nDATABASE_URL="new"\nJWT_SECRET="x"\nEXTRA="1"\n',
    );
  });

  it("keeps $ in values literal", () => {
    expect(setEnvValues('A="1"\n', { A: "p$1&" })).toBe('A="p$1&"\n');
  });
});

describe.runIf(isTemplate)("buildRules against the template files", () => {
  const names = deriveNames({
    name: "acme-crm",
    title: 'Acme "CRM"',
    description: "Customer $1 desk",
  });

  for (const rule of buildRules(names)) {
    it(`matches every template string in ${rule.file}`, () => {
      const content = readFileSync(path.join(ROOT, rule.file), "utf8");
      const result = applyReplacements(content, rule.replacements);
      expect(result.missing).toEqual([]);
    });
  }

  it("renames the Postgres schema without touching Docker paths", () => {
    const apply = (file) => {
      const rule = buildRules(names).find((r) => r.file === file);
      const content = readFileSync(path.join(ROOT, file), "utf8");
      return applyReplacements(content, rule.replacements).content;
    };

    const sql = apply("drizzle/0000_baseline.sql");
    expect(sql).toContain('CREATE SCHEMA "acme_crm";');
    expect(sql).not.toContain('"app"');

    const filesSql = apply("drizzle/0001_files.sql");
    expect(filesSql).toContain('CREATE TABLE "acme_crm"."files"');
    expect(filesSql).not.toContain('"app"');

    const snapshot = JSON.parse(apply("drizzle/meta/0000_snapshot.json"));
    expect(Object.keys(snapshot.tables)).toEqual([
      "acme_crm.auth_sessions",
      "acme_crm.users",
    ]);
    expect(snapshot.schemas).toEqual({ acme_crm: "acme_crm" });

    const filesSnapshot = JSON.parse(apply("drizzle/meta/0001_snapshot.json"));
    expect(Object.keys(filesSnapshot.tables)).toEqual([
      "acme_crm.auth_sessions",
      "acme_crm.files",
      "acme_crm.users",
    ]);
    expect(filesSnapshot.schemas).toEqual({ acme_crm: "acme_crm" });

    const dockerfile = apply("Dockerfile");
    expect(dockerfile).toContain("WORKDIR /app");
    expect(dockerfile).toContain("5432/acme_crm");

    const env = apply(".env.example");
    expect(env).toContain("5432/acme_crm_test");
    expect(env).toContain('JWT_ISSUER="acme-crm-auth"');
  });

  it("writes the title and description as valid string literals", () => {
    const rule = buildRules(names).find((r) =>
      r.file.endsWith("dictionaries/fa.ts"),
    );
    const content = readFileSync(path.join(ROOT, rule.file), "utf8");
    const result = applyReplacements(content, rule.replacements).content;
    expect(result).toContain('title: "Acme \\"CRM\\""');
    expect(result).toContain('description: "Customer $1 desk"');
  });

  it("detects template project identifiers from disk", () => {
    const detected = detectCurrentProjectNames((file) =>
      readFileSync(path.join(ROOT, file), "utf8"),
    );
    expect(detected).toEqual({
      packageName: "nextjs-starter",
      dockerImageBase: "app",
      schema: "app",
      cookiePrefix: "app",
      jwtIssuer: "app-auth",
      themeStorageKey: "app-ui-theme",
      dbName: "app",
      dockerCachePrefix: "app",
      title: "پنل",
    });
  });
});
