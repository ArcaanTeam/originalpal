export const ACCESS_TOKEN_COOKIE = "originalpal_access_token";
export const REFRESH_TOKEN_COOKIE = "originalpal_refresh_token";
export const ACCESS_TOKEN_TYPE = "access";
export const REFRESH_COOKIE_PATH = "/api/auth";

export interface AccessTokenClaims {
  sub: string;
  username: string;
  sid: string;
  typ: typeof ACCESS_TOKEN_TYPE;
  role: string;
}

export interface AccessTokenConfig {
  secret: string;
  issuer: string;
  ttlSeconds: number;
}

export function accessTokenCookieOptions(
  expiresAt: Date,
  secure: boolean,
): {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: string;
  expires: Date;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    expires: expiresAt,
  };
}

export function refreshTokenCookieOptions(
  expiresAt: Date,
  secure: boolean,
): {
  httpOnly: true;
  sameSite: "lax";
  secure: boolean;
  path: string;
  expires: Date;
} {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: REFRESH_COOKIE_PATH,
    expires: expiresAt,
  };
}
