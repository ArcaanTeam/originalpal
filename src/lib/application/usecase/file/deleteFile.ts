import "server-only";
import { forbidden, notFound } from "@/lib/application/errors";
import type { FileRepository } from "@/lib/application/port/file";
import type { FileStorage } from "@/lib/application/port/fileStorage";
import type { AppRole } from "@/lib/domain/auth/role";
import { canAccessUploadedFile } from "@/lib/domain/entity/uploadedFile";

export interface DeleteFileInput {
  actorUserId: string;
  actorRole: AppRole;
  fileId: string;
}

export interface DeleteFileDeps {
  fileRepository: FileRepository;
  fileStorage: FileStorage;
}

export function deleteFileUseCase(deps: DeleteFileDeps) {
  return async function execute(input: DeleteFileInput): Promise<void> {
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

    const deleted = await deps.fileRepository.deleteById(file.id);
    if (!deleted) {
      throw notFound("file_not_found", "file not found");
    }

    await deps.fileStorage.delete(file.storageKey);
  };
}
