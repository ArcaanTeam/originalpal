import { randomUUID } from "node:crypto";
import { createReadStream } from "node:fs";
import { mkdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import "server-only";
import { invalid, notFound } from "@/lib/application/errors";
import type {
  FileStorage,
  PutStoredFileInput,
} from "@/lib/application/port/fileStorage";

export class LocalFileStorage implements FileStorage {
  private readonly rootDir: string;

  constructor(baseDir: string) {
    this.rootDir = path.resolve(baseDir);
  }

  private resolveSafePath(storageKey: string): string {
    if (!storageKey || storageKey.includes("\0")) {
      throw invalid("invalid_storage_key", "invalid storage key");
    }
    if (path.isAbsolute(storageKey)) {
      throw invalid("invalid_storage_key", "invalid storage key");
    }

    const resolved = path.resolve(this.rootDir, storageKey);
    const prefix = `${this.rootDir}${path.sep}`;
    if (!resolved.startsWith(prefix)) {
      throw invalid("invalid_storage_key", "invalid storage key");
    }

    return resolved;
  }

  async put(input: PutStoredFileInput): Promise<void> {
    const targetPath = this.resolveSafePath(input.storageKey);
    const parentDir = path.dirname(targetPath);
    await mkdir(parentDir, { recursive: true });

    const tempPath = `${targetPath}.tmp-${randomUUID()}`;
    try {
      await writeFile(tempPath, input.content);
      await rename(tempPath, targetPath);
    } catch (err) {
      await unlink(tempPath).catch(() => undefined);
      throw err;
    }
  }

  async getStream(storageKey: string): Promise<ReadableStream<Uint8Array>> {
    const targetPath = this.resolveSafePath(storageKey);

    try {
      const info = await stat(targetPath);
      if (!info.isFile()) {
        throw notFound("file_not_found", "file content not found");
      }
    } catch (err) {
      if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
        throw notFound("file_not_found", "file content not found");
      }
      throw err;
    }

    const nodeStream = createReadStream(targetPath);
    return Readable.toWeb(nodeStream) as unknown as ReadableStream<Uint8Array>;
  }

  async delete(storageKey: string): Promise<void> {
    const targetPath = this.resolveSafePath(storageKey);
    try {
      await unlink(targetPath);
    } catch (err) {
      if ((err as NodeJS.ErrnoException)?.code === "ENOENT") {
        return;
      }
      throw err;
    }
  }
}
