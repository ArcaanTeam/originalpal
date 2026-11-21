import { redirect } from "next/navigation";
import "server-only";
import { sessionHasAnyPermission } from "@/lib/application/auth/authorization";
import type { VerifiedAccessToken } from "@/lib/application/port/auth";
import { getPageRoutePermissions } from "@/lib/presentation/auth/route-permissions";

export function assertPageRouteAccess(
  session: VerifiedAccessToken | null,
  pathname: string,
): void {
  const required = getPageRoutePermissions(pathname);
  if (!required || required.length === 0) {
    return;
  }

  if (!session || !sessionHasAnyPermission(session, required)) {
    redirect("/403");
  }
}
