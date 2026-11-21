/**
 * Cookie utility functions using manual document.cookie approach
 * Replaces js-cookie dependency for better consistency
 */

const DEFAULT_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SameSite = "strict" | "lax" | "none";

export type CookieOptions = {
  maxAge?: number;
  path?: string;
  sameSite?: SameSite;
  /** Defaults to `true` on HTTPS production builds. */
  secure?: boolean;
};

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookieValue = parts.pop()?.split(";").shift();
    return cookieValue;
  }
  return undefined;
}

/**
 * Set a cookie with name, value, and options.
 *
 * Accepts a number for backward compatibility (treated as `maxAge`). By
 * default cookies are scoped to `path=/`, `SameSite=Lax`, and marked `Secure`
 * in production so the browser only sends them over HTTPS.
 */
export function setCookie(
  name: string,
  value: string,
  options: number | CookieOptions = {},
): void {
  if (typeof document === "undefined") return;

  const {
    maxAge = DEFAULT_MAX_AGE,
    path = "/",
    sameSite = "lax",
    secure = process.env.NODE_ENV === "production",
  } = typeof options === "number" ? { maxAge: options } : options;

  let cookie = `${name}=${value}; path=${path}; max-age=${maxAge}; samesite=${sameSite}`;
  if (secure) cookie += "; secure";

  document.cookie = cookie;
}

/**
 * Remove a cookie by setting its max age to 0
 */
export function removeCookie(
  name: string,
  path: string = "/",
  secure: boolean = process.env.NODE_ENV === "production",
): void {
  if (typeof document === "undefined") return;

  let cookie = `${name}=; path=${path}; max-age=0`;
  if (secure) cookie += "; secure";

  document.cookie = cookie;
}
