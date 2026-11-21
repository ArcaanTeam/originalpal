import { sql } from "drizzle-orm";
import {
  bigint,
  foreignKey,
  index,
  pgSchema,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * Application database schema. Every table lives in the `app` Postgres
 * schema; rename it here (and in drizzle.config.ts) for your project.
 */
export const appSchema = pgSchema("originalpal");

export const userRole = appSchema.enum("UserRole", ["Admin", "Member"]);

function timestamptz(name: string) {
  return timestamp(name, { withTimezone: true, precision: 6, mode: "date" });
}

function createdAt(name = "created_at") {
  return timestamptz(name)
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`);
}

export const users = appSchema.table(
  "users",
  {
    id: uuid("id").primaryKey(),
    username: varchar("username", { length: 64 }).notNull(),
    passwordHash: text("password_hash").notNull(),
    role: userRole("role").notNull().default("Member"),
    createdAt: createdAt(),
  },
  (t) => [uniqueIndex("users_username_key").on(t.username)],
);

export const authSessions = appSchema.table(
  "auth_sessions",
  {
    id: uuid("id").primaryKey(),
    userId: uuid("user_id").notNull(),
    refreshTokenHash: text("refresh_token_hash").notNull(),
    expiresAt: timestamptz("expires_at").notNull(),
    revokedAt: timestamptz("revoked_at"),
    createdAt: createdAt(),
  },
  (t) => [
    index("auth_sessions_refresh_token_hash_idx").on(t.refreshTokenHash),
    foreignKey({
      name: "auth_sessions_user_id_fkey",
      columns: [t.userId],
      foreignColumns: [users.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

export const files = appSchema.table(
  "files",
  {
    id: uuid("id").primaryKey(),
    uploaderId: uuid("uploader_id").notNull(),
    originalName: varchar("original_name", { length: 255 }).notNull(),
    storageKey: text("storage_key").notNull(),
    mimeType: varchar("mime_type", { length: 127 }).notNull(),
    sizeBytes: bigint("size_bytes", { mode: "number" }).notNull(),
    sha256: varchar("sha256", { length: 64 }).notNull(),
    createdAt: createdAt(),
  },
  (t) => [
    uniqueIndex("files_storage_key_key").on(t.storageKey),
    index("files_uploader_id_created_at_idx").on(t.uploaderId, t.createdAt),
    foreignKey({
      name: "files_uploader_id_fkey",
      columns: [t.uploaderId],
      foreignColumns: [users.id],
    })
      .onDelete("cascade")
      .onUpdate("cascade"),
  ],
);

export type UserRow = typeof users.$inferSelect;
export type AuthSessionRow = typeof authSessions.$inferSelect;
export type FileRow = typeof files.$inferSelect;
