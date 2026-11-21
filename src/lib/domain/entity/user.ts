import "server-only";
import type { AppRole } from "@/lib/domain/auth/role";
import { DEFAULT_APP_ROLE } from "@/lib/domain/auth/role";

export interface User {
  id: string;
  username: string;
  passwordHash: string;
  role: AppRole;
  createdAt: Date;
}

export { DEFAULT_APP_ROLE };

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}
