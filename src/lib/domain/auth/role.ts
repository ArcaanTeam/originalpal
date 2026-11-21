export const APP_ROLES = ["Admin", "Member"] as const;

export type AppRole = (typeof APP_ROLES)[number];

export function isAppRole(value: unknown): value is AppRole {
  return (
    typeof value === "string" &&
    (APP_ROLES as readonly string[]).includes(value)
  );
}

export const DEFAULT_APP_ROLE: AppRole = "Member";
