import "server-only";
import {
  ApplicationError,
  invalid,
  mapDomainError,
  payloadTooLarge,
  unsupportedMediaType,
} from "@/lib/application/errors";
import type {
  FileRepository,
  UploadedFileSummary,
} from "@/lib/application/port/file";
import type { FileStorage } from "@/lib/application/port/fileStorage";
import {
  detectMimeTypeFromBytes,
  extensionForMimeType,
  sanitizeFileName,
} from "@/lib/domain/entity/uploadedFile";

export interface UploadFileInput {
  uploaderId: string;
  uploaderUsername?: string;
  originalName: string;
  claimedMimeType: string;
  content: Uint8Array;
}

export interface UploadFileDeps {
  fileRepository: FileRepository;
  fileStorage: FileStorage;
  idGenerator: () => string;
  sha256: (content: Uint8Array) => string;
  maxFileSizeBytes: number;
  allowedMimeTypes: readonly string[];
  now?: () => Date;
}

export function uploadFileUseCase(deps: UploadFileDeps) {
  return async function execute(
    input: UploadFileInput,
  ): Promise<UploadedFileSummary> {
    try {
      if (input.content.byteLength === 0) {
        throw invalid("file_empty", "file must not be empty");
      }

      if (input.content.byteLength > deps.maxFileSizeBytes) {
        throw payloadTooLarge(
          "file exceeds maximum allowed size",
          "file_too_large",
        );
      }

      const safeName = sanitizeFileName(input.originalName);
      const detectedMime = detectMimeTypeFromBytes(
        input.content,
        input.claimedMimeType,
        safeName,
      );

      if (!detectedMime || !deps.allowedMimeTypes.includes(detectedMime)) {
        throw unsupportedMediaType(
          "file type is not allowed",
          "unsupported_file_type",
        );
      }

      const id = deps.idGenerator();
      const createdAt = deps.now ? deps.now() : new Date();
      const year = String(createdAt.getUTCFullYear());
      const month = String(createdAt.getUTCMonth() + 1).padStart(2, "0");
      const storageKey = `${year}/${month}/${id}${extensionForMimeType(detectedMime)}`;
      const sha256 = deps.sha256(input.content);

      await deps.fileStorage.put({
        storageKey,
        content: input.content,
      });

      try {
        const saved = await deps.fileRepository.save({
          id,
          uploaderId: input.uploaderId,
          originalName: safeName,
          storageKey,
          mimeType: detectedMime,
          sizeBytes: input.content.byteLength,
          sha256,
          createdAt,
        });

        return {
          id: saved.id,
          uploaderId: saved.uploaderId,
          uploaderUsername: input.uploaderUsername ?? null,
          originalName: saved.originalName,
          mimeType: saved.mimeType,
          sizeBytes: saved.sizeBytes,
          sha256: saved.sha256,
          createdAt: saved.createdAt,
        };
      } catch (err) {
        await deps.fileStorage.delete(storageKey).catch(() => undefined);
        throw err;
      }
    } catch (err) {
      if (err instanceof ApplicationError) {
        throw err;
      }
      const mapped = mapDomainError(err);
      if (mapped instanceof ApplicationError) {
        throw mapped;
      }
      throw err;
    }
  };
}
