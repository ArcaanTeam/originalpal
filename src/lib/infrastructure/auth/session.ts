import { cookies } from "next/headers";
import "server-only";
import type { VerifiedAccessToken } from "@/lib/application/port/auth";
import { ACCESS_TOKEN_COOKIE } from "@/lib/infrastructure/auth/constants";
import { verifyAccessToken } from "@/lib/infrastructure/auth/jwtAccessToken";
import { getAccessTokenConfig } from "@/lib/infrastructure/env";

export async function getSessionFromCookies(): Promise<VerifiedAccessToken | null> {
  const token = (await cookies()).get(ACCESS_TOKEN_COOKIE)?.value;
  if (!token) {
    return null;
  }

  return verifyAccessToken(token, getAccessTokenConfig());
}

export async function getSessionFromRequest(
  request: Request,
): Promise<VerifiedAccessToken | null> {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return null;
  }

  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ACCESS_TOKEN_COOKIE}=`))
    ?.slice(ACCESS_TOKEN_COOKIE.length + 1);

  if (!token) {
    return null;
  }

  return verifyAccessToken(decodeURIComponent(token), getAccessTokenConfig());
}
