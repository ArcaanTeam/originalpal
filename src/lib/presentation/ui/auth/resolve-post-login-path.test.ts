import { describe, expect, it } from "vitest";
import { resolvePostLoginPath } from "./resolve-post-login-path";

describe("resolvePostLoginPath", () => {
  it("uses a same-origin path", () => {
    expect(resolvePostLoginPath("/profile")).toBe("/profile");
    expect(resolvePostLoginPath("/admin/users?tab=1")).toBe(
      "/admin/users?tab=1",
    );
  });

  it("falls back to home for missing or external targets", () => {
    expect(resolvePostLoginPath(null)).toBe("/");
    expect(resolvePostLoginPath("")).toBe("/");
    expect(resolvePostLoginPath("https://evil.example")).toBe("/");
    expect(resolvePostLoginPath("//evil.example")).toBe("/");
    expect(resolvePostLoginPath("/\\evil.example")).toBe("/");
  });

  it("does not send the browser back to the login page", () => {
    expect(resolvePostLoginPath("/login")).toBe("/");
    expect(resolvePostLoginPath("/login?redirectTo=/")).toBe("/");
    expect(resolvePostLoginPath("/login/extra")).toBe("/");
  });
});
