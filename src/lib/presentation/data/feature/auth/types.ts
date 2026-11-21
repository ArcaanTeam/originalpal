import type { PermissionKey } from "@/lib/domain/auth/permission";
import type { AppRole } from "@/lib/domain/auth/role";

export interface AuthUserProfileDto {
  id: string;
  username: string;
  role: AppRole;
  permissions: PermissionKey[];
}
