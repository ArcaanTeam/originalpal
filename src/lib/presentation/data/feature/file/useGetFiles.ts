import { useQuery } from "@tanstack/react-query";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { filesQueryOptions } from "@/lib/presentation/ui/query/options/files";
import type { FileListScopeDto } from "./keys";
import type { UploadedFileDto } from "./types";

export interface UseGetFilesReturn {
  files: UploadedFileDto[];
  maxFileSizeBytes: number;
  allowedMimeTypes: string[];
  succeed: boolean | null;
  refetch: () => void;
}

const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export default function useGetFiles(
  scope: FileListScopeDto = "own",
): UseGetFilesReturn {
  const query = useQuery(filesQueryOptions(requestJson, scope));

  return {
    files: query.data?.files ?? [],
    maxFileSizeBytes:
      query.data?.max_file_size_bytes ?? DEFAULT_MAX_FILE_SIZE_BYTES,
    allowedMimeTypes: query.data?.allowed_mime_types ?? [],
    succeed: query.isPending ? null : query.isError ? false : query.isSuccess,
    refetch: () => {
      void query.refetch();
    },
  };
}
