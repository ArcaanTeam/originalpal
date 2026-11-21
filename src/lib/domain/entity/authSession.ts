import "server-only";

export interface AuthSession {
  id: string;
  userId: string;
  refreshTokenHash: string;
  expiresAt: Date;
  revokedAt: Date | null;
  createdAt: Date;
}

export function isAuthSessionActive(
  session: AuthSession,
  now: Date = new Date(),
): boolean {
  return (
    session.revokedAt === null && session.expiresAt.getTime() > now.getTime()
  );
}
