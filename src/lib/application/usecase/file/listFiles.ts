import "server-only";
import { forbidden } from "@/lib/application/errors";
import type {
  FileRepository,
  UploadedFileSummary,
} from "@/lib/application/port/file";
import type { AppRole } from "@/lib/domain/auth/role";

export type FileListScope = "own" | "all";

export interface ListFilesInput {
  actorUserId: string;
  actorRole: AppRole;
  scope?: FileListScope;
}

export interface ListFilesDeps {
  fileRepository: FileRepository;
}

export function listFilesUseCase(deps: ListFilesDeps) {
  return async function execute(
    input: ListFilesInput,
  ): Promise<UploadedFileSummary[]> {
    const scope = input.scope ?? "own";
    if (scope === "all") {
      if (input.actorRole !== "Admin") {
        throw forbidden("insufficient permissions", "insufficient_permissions");
      }
      return deps.fileRepository.listAll();
    }

    return deps.fileRepository.listByUploader(input.actorUserId);
  };
}
