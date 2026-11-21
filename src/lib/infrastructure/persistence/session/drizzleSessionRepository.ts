import { eq } from "drizzle-orm";
import "server-only";
import type { SessionRepository } from "@/lib/application/port/session";
import type { AuthSession } from "@/lib/domain/entity/authSession";
import {
  getDb,
  type DbExecutor,
} from "@/lib/infrastructure/persistence/drizzle/client";
import { authSessions } from "@/lib/infrastructure/persistence/drizzle/schema";
import { authSessionRecordToDomain, authSessionToRecord } from "./mapper";

export class DrizzleSessionRepository implements SessionRepository {
  constructor(private readonly db: DbExecutor = getDb()) {}

  async save(session: AuthSession): Promise<AuthSession> {
    const record = authSessionToRecord(session);
    const [row] = await this.db
      .insert(authSessions)
      .values(record)
      .onConflictDoUpdate({
        target: authSessions.id,
        set: {
          userId: record.userId,
          refreshTokenHash: record.refreshTokenHash,
          expiresAt: record.expiresAt,
          revokedAt: record.revokedAt,
          createdAt: record.createdAt,
        },
      })
      .returning();
    return authSessionRecordToDomain(row!);
  }

  async findById(id: string): Promise<AuthSession | null> {
    const [row] = await this.db
      .select()
      .from(authSessions)
      .where(eq(authSessions.id, id))
      .limit(1);
    return row ? authSessionRecordToDomain(row) : null;
  }

  async findByRefreshTokenHash(
    refreshTokenHash: string,
  ): Promise<AuthSession | null> {
    const [row] = await this.db
      .select()
      .from(authSessions)
      .where(eq(authSessions.refreshTokenHash, refreshTokenHash))
      .limit(1);
    return row ? authSessionRecordToDomain(row) : null;
  }
}
