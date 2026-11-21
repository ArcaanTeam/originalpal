import type { AppRole } from "./role";
import { APP_ROLES } from "./role";

export const Permission = {
  UsersManage: "users:manage",
} as const;

export type PermissionKey = (typeof Permission)[keyof typeof Permission];

export const ALL_PERMISSIONS = Object.values(Permission) as PermissionKey[];

const ROLE_PERMISSIONS: Record<AppRole, readonly PermissionKey[]> = {
  Admin: ALL_PERMISSIONS,
  Member: [],
};

export function getPermissionsForRole(role: AppRole): PermissionKey[] {
  return [...ROLE_PERMISSIONS[role]];
}

export function getRolePermissionMatrix(): Record<
  AppRole,
  readonly PermissionKey[]
> {
  return ROLE_PERMISSIONS;
}

export function listRolePermissionEntries(): Array<{
  role: AppRole;
  permissions: PermissionKey[];
}> {
  return APP_ROLES.map((role) => ({
    role,
    permissions: getPermissionsForRole(role),
  }));
}

export function hasPermission(
  permissions: readonly string[],
  key: PermissionKey,
): boolean {
  return permissions.includes(key);
}

export function hasAnyPermission(
  permissions: readonly string[],
  keys: readonly PermissionKey[],
): boolean {
  if (keys.length === 0) {
    return true;
  }

  return keys.some((key) => hasPermission(permissions, key));
}
