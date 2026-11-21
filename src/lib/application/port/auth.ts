import "server-only";
import type { AppRole } from "@/lib/domain/auth/role";

export interface PasswordHasher {
  compare(plain: string, hash: string): Promise<boolean>;
  hash(plain: string): Promise<string>;
}

export interface AccessTokenPayload {
  sub: string;
  username: string;
  sid: string;
  role: AppRole;
}

export interface IssuedAccessToken {
  token: string;
  expiresAt: Date;
}

export interface AccessTokenIssuer {
  issue(payload: AccessTokenPayload): Promise<IssuedAccessToken>;
}

export interface VerifiedAccessToken extends AccessTokenPayload {
  expiresAt: Date;
}

export interface AccessTokenVerifier {
  verify(token: string): Promise<VerifiedAccessToken | null>;
}

export interface RefreshTokenService {
  generate(): string;
  hash(token: string): string;
}
