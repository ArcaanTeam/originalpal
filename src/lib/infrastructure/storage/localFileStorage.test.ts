import { mkdtemp, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import { LocalFileStorage } from "./localFileStorage";

describe("LocalFileStorage", () => {
  let tempDir: string;
  let storage: LocalFileStorage;

  beforeEach(async () => {
    tempDir = await mkdtemp(path.join(os.tmpdir(), "file-storage-test-"));
    storage = new LocalFileStorage(tempDir);
  });

  afterEach(async () => {
    await rm(tempDir, { recursive: true, force: true });
  });

  it("writes, streams, and deletes a file", async () => {
    const payload = new TextEncoder().encode("hello file storage");
    await storage.put({ storageKey: "2026/11/sample.txt", content: payload });

    const stream = await storage.getStream("2026/11/sample.txt");
    const reader = stream.getReader();
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const text = new TextDecoder().decode(Buffer.concat(chunks));
    expect(text).toBe("hello file storage");

    await storage.delete("2026/11/sample.txt");
    await expect(storage.getStream("2026/11/sample.txt")).rejects.toMatchObject(
      {
        code: ApplicationErrorCode.NotFound,
      },
    );
  });

  it("ignores delete on missing file", async () => {
    await expect(
      storage.delete("2026/11/missing.txt"),
    ).resolves.toBeUndefined();
  });

  it("rejects path traversal and absolute storage keys", async () => {
    await expect(
      storage.put({
        storageKey: "../escape.txt",
        content: new Uint8Array([1, 2, 3]),
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.InvalidInput,
    });

    await expect(storage.getStream("/etc/passwd")).rejects.toMatchObject({
      code: ApplicationErrorCode.InvalidInput,
    });
  });
});
