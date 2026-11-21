export type FileListScopeDto = "own" | "all";

export const fileKeys = {
  all: ["files"] as const,
  list: (scope: FileListScopeDto = "own") =>
    [...fileKeys.all, "list", scope] as const,
};
