import { describe, expect, it } from "vitest";
import {
  getPermissionsForRole,
  getRolePermissionMatrix,
  hasAnyPermission,
  Permission,
} from "@/lib/domain/auth/permission";
import { APP_ROLES } from "@/lib/domain/auth/role";

describe("permissions", () => {
  it("grants users management only to admin", () => {
    expect(getPermissionsForRole("Admin")).toContain(Permission.UsersManage);
    expect(getPermissionsForRole("Member")).not.toContain(
      Permission.UsersManage,
    );
  });

  it("checks any permission", () => {
    expect(
      hasAnyPermission(getPermissionsForRole("Admin"), [
        Permission.UsersManage,
      ]),
    ).toBe(true);

    expect(
      hasAnyPermission(getPermissionsForRole("Member"), [
        Permission.UsersManage,
      ]),
    ).toBe(false);
  });
});

describe("getRolePermissionMatrix", () => {
  it("returns permissions for every role", () => {
    const matrix = getRolePermissionMatrix();

    for (const role of APP_ROLES) {
      expect(matrix[role]).toBeDefined();
    }
  });
});
