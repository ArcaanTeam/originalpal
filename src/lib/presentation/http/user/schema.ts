import { z } from "zod";
import { APP_ROLES } from "@/lib/domain/auth/role";

export const CreateUserSchema = z.object({
  username: z.string().trim().min(1, "username is required").max(64),
  password: z.string().min(8, "password must be at least 8 characters"),
  role: z.enum(APP_ROLES),
});

export type CreateUserRequest = z.infer<typeof CreateUserSchema>;

export const UpdateUserRoleSchema = z.object({
  role: z.enum(APP_ROLES),
});

export type UpdateUserRoleRequest = z.infer<typeof UpdateUserRoleSchema>;

export const UserSummarySchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(APP_ROLES),
  created_at: z.string(),
});

export const UsersListResponseSchema = z.object({
  users: z.array(UserSummarySchema),
});

export type UsersListResponse = z.infer<typeof UsersListResponseSchema>;
