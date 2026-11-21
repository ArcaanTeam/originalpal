import { randomUUID } from "node:crypto";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import type {
  AccessTokenIssuer,
  AccessTokenPayload,
  AccessTokenVerifier,
  IssuedAccessToken,
  VerifiedAccessToken,
} from "@/lib/application/port/auth";
import { isAppRole } from "@/lib/domain/auth/role";
import { ACCESS_TOKEN_TYPE, type AccessTokenConfig } from "./constants";

function getSecretKey(secret: string): Uint8Array {
  return Uint8Array.from(new TextEncoder().encode(secret));
}

function toVerifiedAccessToken(
  payload: JWTPayload,
  expiresAt: Date,
): VerifiedAccessToken | null {
  if (
    typeof payload.sub !== "string" ||
    typeof payload.username !== "string" ||
    typeof payload.sid !== "string" ||
    payload.typ !== ACCESS_TOKEN_TYPE ||
    !isAppRole(payload.role)
  ) {
    return null;
  }

  return {
    sub: payload.sub,
    username: payload.username,
    sid: payload.sid,
    role: payload.role,
    expiresAt,
  };
}

export class JoseAccessTokenService
  implements AccessTokenIssuer, AccessTokenVerifier
{
  constructor(private readonly config: AccessTokenConfig) {}

  async issue(payload: AccessTokenPayload): Promise<IssuedAccessToken> {
    const expiresAt = new Date(Date.now() + this.config.ttlSeconds * 1000);
    const token = await new SignJWT({
      username: payload.username,
      sid: payload.sid,
      role: payload.role,
      typ: ACCESS_TOKEN_TYPE,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(payload.sub)
      .setIssuer(this.config.issuer)
      .setIssuedAt()
      .setExpirationTime(expiresAt)
      .setJti(randomUUID())
      .sign(getSecretKey(this.config.secret));

    return { token, expiresAt };
  }

  async verify(token: string): Promise<VerifiedAccessToken | null> {
    try {
      const { payload } = await jwtVerify(
        token,
        getSecretKey(this.config.secret),
        {
          issuer: this.config.issuer,
        },
      );

      const expiresAt =
        typeof payload.exp === "number"
          ? new Date(payload.exp * 1000)
          : new Date();

      return toVerifiedAccessToken(payload, expiresAt);
    } catch {
      return null;
    }
  }
}

export async function verifyAccessToken(
  token: string,
  config: AccessTokenConfig,
): Promise<VerifiedAccessToken | null> {
  const service = new JoseAccessTokenService(config);
  return service.verify(token);
}
