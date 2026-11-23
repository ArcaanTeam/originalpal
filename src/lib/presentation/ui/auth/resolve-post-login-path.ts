export function resolvePostLoginPath(redirectTo: string | null): string {
  if (
    !redirectTo ||
    !redirectTo.startsWith("/") ||
    redirectTo.startsWith("//") ||
    redirectTo.startsWith("/\\") ||
    redirectTo === "/login" ||
    redirectTo.startsWith("/login?") ||
    redirectTo.startsWith("/login/")
  ) {
    return "/admin/dashboard";
  }

  return redirectTo;
}
