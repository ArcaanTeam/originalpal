import { z } from "zod";
import { APP_ROLES } from "@/lib/domain/auth/role";

export const LoginSchema = z.object({
  username: z.string().trim().min(1, "username is required"),
  password: z.string().min(1, "password is required"),
});

export type LoginRequest = z.infer<typeof LoginSchema>;

const AuthUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: z.enum(APP_ROLES),
  permissions: z.array(z.string()),
});

export const LoginResponseSchema = z.object({
  user: AuthUserSchema,
  tokens: z.object({
    access_token: z.string(),
    token_type: z.literal("Bearer"),
    expires_at: z.string(),
    refresh_token: z.string(),
    refresh_expires_at: z.string(),
  }),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const MeResponseSchema = AuthUserSchema;

export type MeResponse = z.infer<typeof MeResponseSchema>;

export const UpdatePasswordSchema = z.object({
  currentPassword: z.string().min(1, "current password is required"),
  newPassword: z.string().min(8, "new password must be at least 8 characters"),
});

export type UpdatePasswordRequest = z.infer<typeof UpdatePasswordSchema>;

export const UpdateProfileSchema = z.object({
  username: z.string().trim().min(1, "username is required"),
});

export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;
