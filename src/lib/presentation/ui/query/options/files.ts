import { queryOptions } from "@tanstack/react-query";
import {
  fileKeys,
  type FileListScopeDto,
} from "@/lib/presentation/data/feature/file/keys";
import type { FileListResponseDto } from "@/lib/presentation/data/feature/file/types";
import type { JsonRequestFn } from "./json-request";

export function filesQueryOptions(
  fetchJson: JsonRequestFn,
  scope: FileListScopeDto = "own",
) {
  return queryOptions({
    queryKey: fileKeys.list(scope),
    queryFn: async () =>
      fetchJson<FileListResponseDto>(
        `/api/files?scope=${encodeURIComponent(scope)}`,
      ),
  });
}
