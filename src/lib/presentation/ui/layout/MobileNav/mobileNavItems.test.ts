import { describe, expect, it } from "vitest";
import { activeMobileNavItem, mobileNavItems } from "./mobileNavItems";

describe("activeMobileNavItem", () => {
  it.each([
    ["/", "home"],
    ["/files", "files"],
    ["/files/123", "files"],
    ["/profile/settings", "profile"],
    ["/admin/users/abc", "users"],
    ["/profile", "profile"],
    ["/admin/users", "users"],
  ] as const)("maps %s to %s", (pathname, expected) => {
    expect(activeMobileNavItem(pathname)).toBe(expected);
  });

  it("returns null for routes without a tab", () => {
    expect(activeMobileNavItem("/login")).toBeNull();
    expect(activeMobileNavItem("/profilex")).toBeNull();
  });
});

describe("mobileNavItems", () => {
  it("hides the users tab without the users permission", () => {
    expect(mobileNavItems({ canManageUsers: false }).map((i) => i.id)).toEqual([
      "home",
      "files",
      "profile",
    ]);
  });

  it("adds the users tab for user managers", () => {
    expect(mobileNavItems({ canManageUsers: true }).map((i) => i.id)).toEqual([
      "home",
      "files",
      "users",
      "profile",
    ]);
  });
});
