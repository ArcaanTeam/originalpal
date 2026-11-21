import "server-only";
import type { PermissionKey } from "@/lib/domain/auth/permission";
import type { AppRole } from "@/lib/domain/auth/role";

export interface AuthUserProfile {
  id: string;
  username: string;
  role: AppRole;
  permissions: PermissionKey[];
}

export interface AuthTokensResult {
  accessToken: string;
  expiresAt: Date;
  refreshToken: string;
  refreshExpiresAt: Date;
  sessionId: string;
  user: AuthUserProfile;
}
