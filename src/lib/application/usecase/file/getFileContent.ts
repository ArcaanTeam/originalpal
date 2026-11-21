import "server-only";
import { forbidden, notFound } from "@/lib/application/errors";
import type { FileRepository } from "@/lib/application/port/file";
import type { FileStorage } from "@/lib/application/port/fileStorage";
import type { AppRole } from "@/lib/domain/auth/role";
import {
  canAccessUploadedFile,
  type UploadedFile,
} from "@/lib/domain/entity/uploadedFile";

export interface GetFileContentInput {
  actorUserId: string;
  actorRole: AppRole;
  fileId: string;
}

export interface GetFileContentDeps {
  fileRepository: FileRepository;
  fileStorage: FileStorage;
}

export interface FileContentResult {
  file: UploadedFile;
  stream: ReadableStream<Uint8Array>;
}

export function getFileContentUseCase(deps: GetFileContentDeps) {
  return async function execute(
    input: GetFileContentInput,
  ): Promise<FileContentResult> {
    const file = await deps.fileRepository.findById(input.fileId);
    if (!file) {
      throw notFound("file_not_found", "file not found");
    }

    if (
      !canAccessUploadedFile(file, {
        userId: input.actorUserId,
        role: input.actorRole,
      })
    ) {
      throw forbidden("insufficient permissions", "insufficient_permissions");
    }

    const stream = await deps.fileStorage.getStream(file.storageKey);
    return { file, stream };
  };
}
