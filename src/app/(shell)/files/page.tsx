import FileManagerPage from "@/lib/presentation/ui/features/file/FileManager/FileManagerPage";
import FileManagerLoadingUI from "@/lib/presentation/ui/features/file/FileManager/loading";
import { noop } from "@/lib/presentation/ui/query/noop";
import { filesQueryOptions } from "@/lib/presentation/ui/query/options/files";
import { ServerQueryHydration } from "@/lib/presentation/ui/query/server-query-hydration";
import { serverRequestJson } from "@/lib/presentation/ui/query/server-request-json";

export default function FilesRoute() {
  return (
    <ServerQueryHydration
      fallback={<FileManagerLoadingUI />}
      prefetch={async (queryClient) => {
        await queryClient
          .query(filesQueryOptions(serverRequestJson, "own"))
          .catch(noop);
      }}
    >
      <FileManagerPage />
    </ServerQueryHydration>
  );
}
