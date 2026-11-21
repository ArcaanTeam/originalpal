import "server-only";
import type { AuthSession } from "@/lib/domain/entity/authSession";

export interface SessionRepository {
  save(session: AuthSession): Promise<AuthSession>;
  findById(id: string): Promise<AuthSession | null>;
  findByRefreshTokenHash(refreshTokenHash: string): Promise<AuthSession | null>;
}
