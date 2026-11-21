import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { PassThrough } from "node:stream";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildRules, deriveNames } from "./bootstrap/rules.mjs";
import { runInit } from "./init.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));

function createTempProjectCopy() {
  const tempDir = mkdtempSync(path.join(os.tmpdir(), "nextjs-init-test-"));
  const targetFiles = [
    ...new Set(
      buildRules(deriveNames({ name: "sample-app" })).map((r) => r.file),
    ),
  ];

  for (const file of targetFiles) {
    const src = path.join(ROOT, file);
    if (!existsSync(src)) continue;
    const dest = path.join(tempDir, file);
    mkdirSync(path.dirname(dest), { recursive: true });
    cpSync(src, dest);
  }

  return tempDir;
}

function makeIo(inputText = "") {
  const stdin = new PassThrough();
  const stdout = new PassThrough();
  const stderr = new PassThrough();
  let outText = "";
  let errText = "";

  stdout.on("data", (chunk) => {
    outText += chunk.toString("utf8");
  });
  stderr.on("data", (chunk) => {
    errText += chunk.toString("utf8");
  });

  if (inputText) {
    stdin.end(inputText);
  } else {
    stdin.end();
  }

  return {
    stdin,
    stdout,
    stderr,
    getStdout: () => outText,
    getStderr: () => errText,
  };
}

describe("scripts/init", () => {
  const tempDirs = [];

  afterEach(() => {
    while (tempDirs.length > 0) {
      rmSync(tempDirs.pop(), { recursive: true, force: true });
    }
  });

  it("prompts interactively and renames the project twice cleanly", async () => {
    const tempDir = createTempProjectCopy();
    tempDirs.push(tempDir);

    writeFileSync(
      path.join(tempDir, ".env"),
      'DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/app"\nJWT_SECRET="keep-secret"\nJWT_ISSUER="app-auth"\n',
    );

    const firstIo = makeIo("acme-crm\nAcme CRM\nCustomer desk\nacme_crm\ny\n");
    const first = await runInit([], {
      root: tempDir,
      stdin: firstIo.stdin,
      stdout: firstIo.stdout,
      stderr: firstIo.stderr,
      skipFormat: true,
    });

    expect(first.status).toBe("updated");
    expect(first.warnings).toEqual([]);
    expect(
      JSON.parse(readFileSync(path.join(tempDir, "package.json"), "utf8")).name,
    ).toBe("acme-crm");
    expect(
      readFileSync(path.join(tempDir, "drizzle.config.ts"), "utf8"),
    ).toContain('schema: "acme_crm"');
    expect(
      readFileSync(path.join(tempDir, "drizzle/0001_files.sql"), "utf8"),
    ).toContain('"acme_crm"."files"');
    expect(readFileSync(path.join(tempDir, ".env"), "utf8")).toContain(
      'JWT_SECRET="keep-secret"',
    );
    expect(readFileSync(path.join(tempDir, ".env"), "utf8")).toContain(
      'JWT_ISSUER="acme-crm-auth"',
    );
    expect(readFileSync(path.join(tempDir, ".env"), "utf8")).toContain(
      "5432/acme_crm",
    );

    // Rename a second time from acme-crm -> beta-portal using defaults.
    const secondIo = makeIo("beta-portal\n\n\n\ny\n");
    const second = await runInit([], {
      root: tempDir,
      stdin: secondIo.stdin,
      stdout: secondIo.stdout,
      stderr: secondIo.stderr,
      skipFormat: true,
    });

    expect(second.status).toBe("updated");
    expect(second.warnings).toEqual([]);
    expect(
      JSON.parse(readFileSync(path.join(tempDir, "package.json"), "utf8")).name,
    ).toBe("beta-portal");
    expect(
      readFileSync(
        path.join(tempDir, "src/lib/infrastructure/auth/constants.ts"),
        "utf8",
      ),
    ).toContain('"beta_portal_access_token"');
    expect(
      readFileSync(
        path.join(tempDir, "src/lib/presentation/i18n/dictionaries/fa.ts"),
        "utf8",
      ),
    ).toContain('title: "Beta Portal"');
    expect(readFileSync(path.join(tempDir, ".env"), "utf8")).toContain(
      "5432/beta_portal",
    );
  });

  it("re-prompts with suggestion when project name is invalid", async () => {
    const tempDir = createTempProjectCopy();
    tempDirs.push(tempDir);

    const io = makeIo("My Cool App\nmy-cool-app\n\n\n\ny\n");
    const result = await runInit([], {
      root: tempDir,
      stdin: io.stdin,
      stdout: io.stdout,
      stderr: io.stderr,
      skipFormat: true,
    });

    expect(io.getStdout()).toContain('Suggestion: "my-cool-app"');
    expect(result.status).toBe("updated");
    expect(
      JSON.parse(readFileSync(path.join(tempDir, "package.json"), "utf8")).name,
    ).toBe("my-cool-app");
  });

  it("supports --name and --yes flags non-interactively", async () => {
    const tempDir = createTempProjectCopy();
    tempDirs.push(tempDir);

    const io = makeIo();
    const result = await runInit(["--name", "nova-app", "--yes"], {
      root: tempDir,
      stdin: io.stdin,
      stdout: io.stdout,
      stderr: io.stderr,
      skipFormat: true,
    });

    expect(result.status).toBe("updated");
    expect(result.warnings).toEqual([]);
    expect(
      JSON.parse(readFileSync(path.join(tempDir, "package.json"), "utf8")).name,
    ).toBe("nova-app");
    expect(readFileSync(path.join(tempDir, "README.md"), "utf8")).toContain(
      "# Nova App",
    );
  });

  it("handles pnpm-forwarded leading '--' before flags", async () => {
    const tempDir = createTempProjectCopy();
    tempDirs.push(tempDir);

    const io = makeIo();
    const result = await runInit(["--", "--help"], {
      root: tempDir,
      stdin: io.stdin,
      stdout: io.stdout,
      stderr: io.stderr,
      skipFormat: true,
    });

    expect(result.status).toBe("help");
    expect(io.getStdout()).toContain("Usage:");
  });

  it("aborts cleanly when user declines confirmation", async () => {
    const tempDir = createTempProjectCopy();
    tempDirs.push(tempDir);

    const io = makeIo("orbit-app\n\n\n\nn\n");
    const result = await runInit([], {
      root: tempDir,
      stdin: io.stdin,
      stdout: io.stdout,
      stderr: io.stderr,
      skipFormat: true,
    });

    expect(result.status).toBe("aborted");
    expect(
      JSON.parse(readFileSync(path.join(tempDir, "package.json"), "utf8")).name,
    ).toBe("nextjs-starter");
  });
});
