import { Permission, type PermissionKey } from "@/lib/domain/auth/permission";

export const ROUTE_PERMISSIONS = {
  usersApi: [Permission.UsersManage],
} as const satisfies Record<string, readonly PermissionKey[]>;

export type RoutePermissionScope = keyof typeof ROUTE_PERMISSIONS;

const API_ROUTE_PERMISSIONS: Record<string, readonly PermissionKey[]> = {
  "/api/users": ROUTE_PERMISSIONS.usersApi,
};

const PAGE_ROUTE_PERMISSIONS: Record<string, readonly PermissionKey[]> = {
  "/admin/users": ROUTE_PERMISSIONS.usersApi,
};

function normalizePathname(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) {
    return pathname.slice(0, -1);
  }
  return pathname;
}

export function getPageRoutePermissions(
  pathname: string,
): readonly PermissionKey[] | null {
  const normalized = normalizePathname(pathname);
  return PAGE_ROUTE_PERMISSIONS[normalized] ?? null;
}

export function getApiRoutePermissions(
  pathname: string,
): readonly PermissionKey[] | null {
  const normalized = normalizePathname(pathname);

  if (normalized === "/api/users") {
    return API_ROUTE_PERMISSIONS[normalized] ?? null;
  }

  if (normalized.startsWith("/api/users/")) {
    return ROUTE_PERMISSIONS.usersApi;
  }

  return null;
}
