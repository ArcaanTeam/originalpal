import { describe, expect, it } from "vitest";
import { Permission } from "@/lib/domain/auth/permission";
import {
  getApiRoutePermissions,
  getPageRoutePermissions,
} from "@/lib/presentation/auth/route-permissions";

describe("route permissions", () => {
  it("does not protect placeholder pages", () => {
    expect(getPageRoutePermissions("/")).toBeNull();
    expect(getPageRoutePermissions("/login")).toBeNull();
  });

  it("protects admin user management page", () => {
    expect(getPageRoutePermissions("/admin/users")).toEqual([
      Permission.UsersManage,
    ]);
  });

  it("protects users api routes", () => {
    expect(getApiRoutePermissions("/api/users")).toEqual([
      Permission.UsersManage,
    ]);
    expect(getApiRoutePermissions("/api/users/user-1/role")).toEqual([
      Permission.UsersManage,
    ]);
  });
});
