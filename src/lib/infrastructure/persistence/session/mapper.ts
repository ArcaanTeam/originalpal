import "server-only";
import type { AuthSession } from "@/lib/domain/entity/authSession";
import type { AuthSessionRow as AuthSessionRecord } from "@/lib/infrastructure/persistence/drizzle/schema";

export function authSessionRecordToDomain(
  record: AuthSessionRecord,
): AuthSession {
  return {
    id: record.id,
    userId: record.userId,
    refreshTokenHash: record.refreshTokenHash,
    expiresAt: record.expiresAt,
    revokedAt: record.revokedAt,
    createdAt: record.createdAt,
  };
}

export function authSessionToRecord(session: AuthSession): AuthSessionRecord {
  return {
    id: session.id,
    userId: session.userId,
    refreshTokenHash: session.refreshTokenHash,
    expiresAt: session.expiresAt,
    revokedAt: session.revokedAt,
    createdAt: session.createdAt,
  };
}
