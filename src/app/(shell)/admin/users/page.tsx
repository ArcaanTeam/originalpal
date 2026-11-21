import { getSessionFromCookies } from "@/lib/infrastructure/auth/session";
import { assertPageRouteAccess } from "@/lib/presentation/auth/require-route-access";
import UserManagementPage from "@/lib/presentation/ui/features/user/UserManagement/UserManagementPage";
import UserManagementLoadingUI from "@/lib/presentation/ui/features/user/UserManagement/loading";
import { noop } from "@/lib/presentation/ui/query/noop";
import { usersQueryOptions } from "@/lib/presentation/ui/query/options/users";
import { ServerQueryHydration } from "@/lib/presentation/ui/query/server-query-hydration";
import { serverRequestJson } from "@/lib/presentation/ui/query/server-request-json";

export default function AdminUsersPage() {
  return (
    <ServerQueryHydration
      fallback={<UserManagementLoadingUI />}
      prefetch={async (queryClient) => {
        const session = await getSessionFromCookies();
        assertPageRouteAccess(session, "/admin/users");
        await queryClient
          .query(usersQueryOptions(serverRequestJson))
          .catch(noop);
      }}
    >
      <UserManagementPage />
    </ServerQueryHydration>
  );
}
