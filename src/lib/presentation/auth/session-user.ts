import type { VerifiedAccessToken } from "@/lib/application/port/auth";
import { getPermissionsForRole } from "@/lib/domain/auth/permission";

export function toAuthUserProfile(session: VerifiedAccessToken) {
  return {
    id: session.sub,
    username: session.username,
    role: session.role,
    permissions: getPermissionsForRole(session.role),
  };
}
