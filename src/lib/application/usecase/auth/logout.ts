import "server-only";
import { ApplicationError, mapDomainError } from "@/lib/application/errors";
import type { RefreshTokenService } from "@/lib/application/port/auth";
import type { SessionRepository } from "@/lib/application/port/session";

export interface LogoutInput {
  sessionId?: string;
  refreshToken?: string;
}

export interface LogoutDeps {
  sessionRepository: SessionRepository;
  refreshTokenService: RefreshTokenService;
}

export function logoutUseCase(deps: LogoutDeps) {
  return async function execute(input: LogoutInput): Promise<void> {
    try {
      let sessionId = input.sessionId;

      if (!sessionId && input.refreshToken) {
        const session = await deps.sessionRepository.findByRefreshTokenHash(
          deps.refreshTokenService.hash(input.refreshToken),
        );
        sessionId = session?.id;
      }

      if (!sessionId) {
        return;
      }

      const session = await deps.sessionRepository.findById(sessionId);
      if (!session || session.revokedAt) {
        return;
      }

      await deps.sessionRepository.save({
        ...session,
        revokedAt: new Date(),
      });
    } catch (err) {
      if (err instanceof ApplicationError) {
        throw err;
      }
      const mapped = mapDomainError(err);
      if (mapped instanceof ApplicationError) {
        throw mapped;
      }
      throw err;
    }
  };
}
