import "server-only";
import { forbidden } from "@/lib/application/errors";
import type { VerifiedAccessToken } from "@/lib/application/port/auth";
import {
  getPermissionsForRole,
  hasAnyPermission,
  type PermissionKey,
} from "@/lib/domain/auth/permission";

export function getSessionPermissions(
  session: VerifiedAccessToken,
): PermissionKey[] {
  return getPermissionsForRole(session.role);
}

export function sessionHasAnyPermission(
  session: VerifiedAccessToken,
  keys: readonly PermissionKey[],
): boolean {
  return hasAnyPermission(getSessionPermissions(session), keys);
}

export function assertSessionPermission(
  session: VerifiedAccessToken,
  keys: readonly PermissionKey[],
): void {
  if (!sessionHasAnyPermission(session, keys)) {
    throw forbidden("insufficient permissions", "insufficient_permissions");
  }
}
