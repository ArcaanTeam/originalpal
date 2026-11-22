import { describe, expect, it } from "vitest";
import { resolvePostLoginPath } from "./resolve-post-login-path";

describe("resolvePostLoginPath", () => {
  it("uses a same-origin path", () => {
    expect(resolvePostLoginPath("/profile")).toBe("/profile");
    expect(resolvePostLoginPath("/admin/users?tab=1")).toBe(
      "/admin/users?tab=1",
    );
  });

  it("falls back to the admin dashboard for missing or external targets", () => {
    expect(resolvePostLoginPath(null)).toBe("/admin/dashboard");
    expect(resolvePostLoginPath("")).toBe("/admin/dashboard");
    expect(resolvePostLoginPath("https://evil.example")).toBe(
      "/admin/dashboard",
    );
    expect(resolvePostLoginPath("//evil.example")).toBe("/admin/dashboard");
    expect(resolvePostLoginPath("/\\evil.example")).toBe("/admin/dashboard");
  });

  it("does not send the browser back to the login page", () => {
    expect(resolvePostLoginPath("/login")).toBe("/admin/dashboard");
    expect(resolvePostLoginPath("/login?redirectTo=/")).toBe(
      "/admin/dashboard",
    );
    expect(resolvePostLoginPath("/login/extra")).toBe("/admin/dashboard");
  });
});
