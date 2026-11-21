import { describe, expect, it, vi } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import type {
  FileRepository,
  UploadedFileSummary,
} from "@/lib/application/port/file";
import type { FileStorage } from "@/lib/application/port/fileStorage";
import { ALLOWED_UPLOAD_MIME_TYPES } from "@/lib/domain/entity/uploadedFile";
import type { UploadedFile } from "@/lib/domain/entity/uploadedFile";
import { deleteFileUseCase } from "./deleteFile";
import { getFileUseCase } from "./getFile";
import { getFileContentUseCase } from "./getFileContent";
import { listFilesUseCase } from "./listFiles";
import { uploadFileUseCase } from "./uploadFile";

const PNG_BYTES = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00,
]);

function makeDeps() {
  const store = new Map<string, UploadedFile>();
  const blobs = new Map<string, Uint8Array>();

  const fileRepository: FileRepository = {
    findById: vi.fn(async (id) => store.get(id) ?? null),
    findSummaryById: vi.fn(async (id) => {
      const f = store.get(id);
      if (!f) return null;
      return {
        id: f.id,
        uploaderId: f.uploaderId,
        uploaderUsername: "alice",
        originalName: f.originalName,
        mimeType: f.mimeType,
        sizeBytes: f.sizeBytes,
        sha256: f.sha256,
        createdAt: f.createdAt,
      };
    }),
    listByUploader: vi.fn(async (uploaderId): Promise<UploadedFileSummary[]> =>
      Array.from(store.values())
        .filter((f) => f.uploaderId === uploaderId)
        .map((f) => ({
          id: f.id,
          uploaderId: f.uploaderId,
          uploaderUsername: "alice",
          originalName: f.originalName,
          mimeType: f.mimeType,
          sizeBytes: f.sizeBytes,
          sha256: f.sha256,
          createdAt: f.createdAt,
        })),
    ),
    listAll: vi.fn(async (): Promise<UploadedFileSummary[]> =>
      Array.from(store.values()).map((f) => ({
        id: f.id,
        uploaderId: f.uploaderId,
        uploaderUsername: "alice",
        originalName: f.originalName,
        mimeType: f.mimeType,
        sizeBytes: f.sizeBytes,
        sha256: f.sha256,
        createdAt: f.createdAt,
      })),
    ),
    save: vi.fn(async (file) => {
      store.set(file.id, file);
      return file;
    }),
    deleteById: vi.fn(async (id) => store.delete(id)),
  };

  const fileStorage: FileStorage = {
    put: vi.fn(async ({ storageKey, content }) => {
      blobs.set(storageKey, content);
    }),
    getStream: vi.fn(async (storageKey) => {
      const content = blobs.get(storageKey);
      if (!content) {
        throw new Error("not found");
      }
      return new ReadableStream({
        start(controller) {
          controller.enqueue(content);
          controller.close();
        },
      });
    }),
    delete: vi.fn(async (storageKey) => {
      blobs.delete(storageKey);
    }),
  };

  return { store, blobs, fileRepository, fileStorage };
}

describe("uploadFileUseCase", () => {
  it("uploads a valid file, sanitizes name, and saves metadata", async () => {
    const { store, blobs, fileRepository, fileStorage } = makeDeps();
    const execute = uploadFileUseCase({
      fileRepository,
      fileStorage,
      idGenerator: () => "file-1",
      sha256: () => "abc123",
      maxFileSizeBytes: 1024,
      allowedMimeTypes: ALLOWED_UPLOAD_MIME_TYPES,
      now: () => new Date("2026-11-21T10:00:00.000Z"),
    });

    const result = await execute({
      uploaderId: "user-1",
      uploaderUsername: "alice",
      originalName: "../../avatar.png",
      claimedMimeType: "image/png",
      content: PNG_BYTES,
    });

    expect(result).toMatchObject({
      id: "file-1",
      uploaderId: "user-1",
      uploaderUsername: "alice",
      originalName: "avatar.png",
      mimeType: "image/png",
      sizeBytes: PNG_BYTES.byteLength,
      sha256: "abc123",
    });
    expect(store.get("file-1")?.storageKey).toBe("2026/11/file-1.png");
    expect(blobs.has("2026/11/file-1.png")).toBe(true);
  });

  it("rejects empty files, oversized files, and unsupported types", async () => {
    const { fileRepository, fileStorage } = makeDeps();
    const execute = uploadFileUseCase({
      fileRepository,
      fileStorage,
      idGenerator: () => "file-1",
      sha256: () => "abc123",
      maxFileSizeBytes: 5,
      allowedMimeTypes: ALLOWED_UPLOAD_MIME_TYPES,
    });

    await expect(
      execute({
        uploaderId: "user-1",
        originalName: "empty.png",
        claimedMimeType: "image/png",
        content: new Uint8Array(0),
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.InvalidInput,
      reasonCode: "file_empty",
    });

    await expect(
      execute({
        uploaderId: "user-1",
        originalName: "big.png",
        claimedMimeType: "image/png",
        content: PNG_BYTES,
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.PayloadTooLarge,
      reasonCode: "file_too_large",
    });

    const executeNormalLimit = uploadFileUseCase({
      fileRepository,
      fileStorage,
      idGenerator: () => "file-2",
      sha256: () => "abc123",
      maxFileSizeBytes: 1024,
      allowedMimeTypes: ALLOWED_UPLOAD_MIME_TYPES,
    });

    await expect(
      executeNormalLimit({
        uploaderId: "user-1",
        originalName: "bad.exe",
        claimedMimeType: "image/png",
        content: new Uint8Array([0x4d, 0x5a, 0x90, 0x00]),
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.UnsupportedMediaType,
      reasonCode: "unsupported_file_type",
    });
  });

  it("cleans up stored blob if repository save fails", async () => {
    const { blobs, fileRepository, fileStorage } = makeDeps();
    vi.mocked(fileRepository.save).mockRejectedValueOnce(new Error("db down"));

    const execute = uploadFileUseCase({
      fileRepository,
      fileStorage,
      idGenerator: () => "file-1",
      sha256: () => "abc123",
      maxFileSizeBytes: 1024,
      allowedMimeTypes: ALLOWED_UPLOAD_MIME_TYPES,
      now: () => new Date("2026-11-21T10:00:00.000Z"),
    });

    await expect(
      execute({
        uploaderId: "user-1",
        originalName: "avatar.png",
        claimedMimeType: "image/png",
        content: PNG_BYTES,
      }),
    ).rejects.toThrow("db down");

    expect(blobs.size).toBe(0);
    expect(fileStorage.delete).toHaveBeenCalledWith("2026/11/file-1.png");
  });
});

describe("list/get/delete file use cases", () => {
  it("enforces ownership and admin scope", async () => {
    const { store, blobs, fileRepository, fileStorage } = makeDeps();
    store.set("f1", {
      id: "f1",
      uploaderId: "user-1",
      originalName: "a.png",
      storageKey: "2026/11/f1.png",
      mimeType: "image/png",
      sizeBytes: PNG_BYTES.byteLength,
      sha256: "hash",
      createdAt: new Date(),
    });
    blobs.set("2026/11/f1.png", PNG_BYTES);

    const listFiles = listFilesUseCase({ fileRepository });
    const getFile = getFileUseCase({ fileRepository });
    const getContent = getFileContentUseCase({ fileRepository, fileStorage });
    const deleteFile = deleteFileUseCase({ fileRepository, fileStorage });

    await expect(
      listFiles({ actorUserId: "user-2", actorRole: "Member", scope: "all" }),
    ).rejects.toMatchObject({ code: ApplicationErrorCode.Forbidden });

    expect(
      await listFiles({
        actorUserId: "admin-1",
        actorRole: "Admin",
        scope: "all",
      }),
    ).toHaveLength(1);

    await expect(
      getFile({ actorUserId: "user-2", actorRole: "Member", fileId: "f1" }),
    ).rejects.toMatchObject({ code: ApplicationErrorCode.Forbidden });

    await expect(
      getContent({ actorUserId: "user-2", actorRole: "Member", fileId: "f1" }),
    ).rejects.toMatchObject({ code: ApplicationErrorCode.Forbidden });

    const contentResult = await getContent({
      actorUserId: "admin-1",
      actorRole: "Admin",
      fileId: "f1",
    });
    expect(contentResult.file.id).toBe("f1");

    await expect(
      deleteFile({ actorUserId: "user-2", actorRole: "Member", fileId: "f1" }),
    ).rejects.toMatchObject({ code: ApplicationErrorCode.Forbidden });

    await deleteFile({
      actorUserId: "user-1",
      actorRole: "Member",
      fileId: "f1",
    });
    expect(store.size).toBe(0);
    expect(blobs.size).toBe(0);
  });
});
