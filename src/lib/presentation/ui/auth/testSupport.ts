import type { AuthUser } from "./session-store";

export const testAuthUser: AuthUser = {
  id: "user-1",
  username: "admin",
  role: "Admin",
  permissions: ["users:manage"],
};
