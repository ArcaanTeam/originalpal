"use client";

import { useSyncExternalStore } from "react";
import {
  hasAnyPermission,
  type PermissionKey,
} from "@/lib/domain/auth/permission";
import { getAuthSession, subscribeAuthSession } from "./session-store";

const EMPTY_PERMISSIONS: readonly PermissionKey[] = [];

function getPermissionsSnapshot(): readonly PermissionKey[] {
  return getAuthSession().user?.permissions ?? EMPTY_PERMISSIONS;
}

export function usePermissions(keys: readonly PermissionKey[]): boolean {
  const permissions = useSyncExternalStore(
    subscribeAuthSession,
    getPermissionsSnapshot,
    () => EMPTY_PERMISSIONS,
  );

  return hasAnyPermission(permissions, keys);
}
