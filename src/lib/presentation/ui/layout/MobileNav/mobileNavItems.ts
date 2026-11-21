export type MobileNavItemId = "home" | "files" | "users" | "profile";

export interface MobileNavItem {
  id: MobileNavItemId;
  href: string;
}

/** Bottom tab bar entries, in display order. */
export function mobileNavItems(input: {
  canManageUsers: boolean;
}): MobileNavItem[] {
  return [
    { id: "home", href: "/" },
    { id: "files", href: "/files" },
    ...(input.canManageUsers
      ? [{ id: "users", href: "/admin/users" } as const]
      : []),
    { id: "profile", href: "/profile" },
  ];
}

/** Which tab a pathname belongs to; null when no tab matches. */
export function activeMobileNavItem(pathname: string): MobileNavItemId | null {
  if (pathname === "/") {
    return "home";
  }
  if (pathname === "/files" || pathname.startsWith("/files/")) {
    return "files";
  }
  if (pathname === "/profile" || pathname.startsWith("/profile/")) {
    return "profile";
  }
  if (pathname === "/admin/users" || pathname.startsWith("/admin/users/")) {
    return "users";
  }
  return null;
}
