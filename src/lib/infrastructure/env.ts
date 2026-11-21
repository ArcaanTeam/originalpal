import { z } from "zod";

const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

const serverEnvSchema = z.object({
  DATABASE_URL: z
    .string()
    .trim()
    .min(1, "DATABASE_URL is required")
    .url("DATABASE_URL must be a valid URL"),
  JWT_SECRET: z
    .string()
    .trim()
    .min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_ISSUER: z.string().trim().min(1).default("originalpal-auth"),
  JWT_ACCESS_TTL_SECONDS: z.coerce.number().int().positive().default(900),
  JWT_REFRESH_TTL_SECONDS: z.coerce.number().int().positive().default(604_800),
  ADMIN_USERNAME: z.string().trim().min(1).default("admin"),
  ADMIN_PASSWORD: z
    .string()
    .trim()
    .min(8, "ADMIN_PASSWORD must be at least 8 characters"),
  BCRYPT_ROUNDS: z.coerce.number().int().min(10).max(15).default(12),
  UPLOAD_DIR: z.string().trim().min(1).default("./uploads"),
  UPLOAD_MAX_FILE_SIZE_BYTES: z.coerce
    .number()
    .int()
    .positive()
    .max(100 * 1024 * 1024)
    .default(DEFAULT_MAX_FILE_SIZE_BYTES),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let cachedEnv: ServerEnv | undefined;

export function resetServerEnvCacheForTests(): void {
  cachedEnv = undefined;
}

function shouldSkipEnvValidation(): boolean {
  return (
    process.env.VITEST === "true" || process.env.SKIP_ENV_VALIDATION === "true"
  );
}

function formatEnvError(error: z.ZodError): string {
  const details = error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  return [
    "Missing required environment variables:",
    details,
    "Copy .env.example to .env and set the values before starting the app.",
  ].join("\n");
}

export function assertRequiredEnv(): ServerEnv {
  if (shouldSkipEnvValidation()) {
    return {
      DATABASE_URL: process.env.DATABASE_URL?.trim() ?? "",
      JWT_SECRET:
        process.env.JWT_SECRET?.trim() ??
        "app-test-secret-minimum-32-characters!!",
      JWT_ISSUER: process.env.JWT_ISSUER?.trim() ?? "originalpal-auth",
      JWT_ACCESS_TTL_SECONDS: Number(process.env.JWT_ACCESS_TTL_SECONDS ?? 900),
      JWT_REFRESH_TTL_SECONDS: Number(
        process.env.JWT_REFRESH_TTL_SECONDS ?? 604_800,
      ),
      ADMIN_USERNAME: process.env.ADMIN_USERNAME?.trim() ?? "admin",
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD?.trim() ?? "Secret1!234",
      BCRYPT_ROUNDS: Number(process.env.BCRYPT_ROUNDS ?? 12),
      UPLOAD_DIR: process.env.UPLOAD_DIR?.trim() || "./uploads",
      UPLOAD_MAX_FILE_SIZE_BYTES: Number(
        process.env.UPLOAD_MAX_FILE_SIZE_BYTES ?? DEFAULT_MAX_FILE_SIZE_BYTES,
      ),
    };
  }

  const parsed = serverEnvSchema.safeParse(process.env);
  if (!parsed.success) {
    throw new Error(formatEnvError(parsed.error));
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export function getServerEnv(): ServerEnv {
  return cachedEnv ?? assertRequiredEnv();
}

export function getAccessTokenConfig() {
  const env = getServerEnv();
  return {
    secret: env.JWT_SECRET,
    issuer: env.JWT_ISSUER,
    ttlSeconds: env.JWT_ACCESS_TTL_SECONDS,
  };
}

export function getRefreshTokenConfig() {
  const env = getServerEnv();
  return {
    ttlSeconds: env.JWT_REFRESH_TTL_SECONDS,
  };
}

export function getUploadConfig() {
  const env = getServerEnv();
  return {
    uploadDir: env.UPLOAD_DIR,
    maxFileSizeBytes: env.UPLOAD_MAX_FILE_SIZE_BYTES,
  };
}
