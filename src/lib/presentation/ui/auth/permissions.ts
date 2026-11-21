import {
  hasAnyPermission,
  type PermissionKey,
} from "@/lib/domain/auth/permission";
import { getAuthSession } from "./session-store";

export function getClientPermissions(): PermissionKey[] {
  return getAuthSession().user?.permissions ?? [];
}

export function clientHasAnyPermission(
  keys: readonly PermissionKey[],
): boolean {
  return hasAnyPermission(getClientPermissions(), keys);
}
