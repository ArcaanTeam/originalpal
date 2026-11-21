const AUTH_PUBLIC_PATHS = ["/api/auth/login"];

export function isAuthPublicUrl(input: RequestInfo | URL): boolean {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.pathname
        : input.url;

  return AUTH_PUBLIC_PATHS.some(
    (path) => url === path || url.startsWith(`${path}?`),
  );
}
