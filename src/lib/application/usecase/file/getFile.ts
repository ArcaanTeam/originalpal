import "server-only";
import { forbidden, notFound } from "@/lib/application/errors";
import type {
  FileRepository,
  UploadedFileSummary,
} from "@/lib/application/port/file";
import type { AppRole } from "@/lib/domain/auth/role";
import { canAccessUploadedFile } from "@/lib/domain/entity/uploadedFile";

export interface GetFileInput {
  actorUserId: string;
  actorRole: AppRole;
  fileId: string;
}

export interface GetFileDeps {
  fileRepository: FileRepository;
}

export function getFileUseCase(deps: GetFileDeps) {
  return async function execute(
    input: GetFileInput,
  ): Promise<UploadedFileSummary> {
    const file = await deps.fileRepository.findSummaryById(input.fileId);
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

    return file;
  };
}
