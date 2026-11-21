import "server-only";
import {
  ApplicationError,
  mapDomainError,
  unauthorized,
} from "@/lib/application/errors";
import type {
  AccessTokenIssuer,
  RefreshTokenService,
} from "@/lib/application/port/auth";
import type { SessionRepository } from "@/lib/application/port/session";
import type { UserRepository } from "@/lib/application/port/user";
import { getPermissionsForRole } from "@/lib/domain/auth/permission";
import { isAuthSessionActive } from "@/lib/domain/entity/authSession";
import type { AuthTokensResult } from "./tokens";

export interface RefreshInput {
  refreshToken: string;
}

export interface RefreshDeps {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  accessTokenIssuer: AccessTokenIssuer;
  refreshTokenService: RefreshTokenService;
  refreshTtlSeconds: number;
}

export function refreshSessionUseCase(deps: RefreshDeps) {
  return async function execute(
    input: RefreshInput,
  ): Promise<AuthTokensResult> {
    try {
      if (!input.refreshToken) {
        throw unauthorized("Invalid refresh token");
      }

      const refreshTokenHash = deps.refreshTokenService.hash(
        input.refreshToken,
      );
      const session =
        await deps.sessionRepository.findByRefreshTokenHash(refreshTokenHash);

      if (!session || !isAuthSessionActive(session)) {
        throw unauthorized("Invalid refresh token");
      }

      const user = await deps.userRepository.findById(session.userId);
      if (!user) {
        throw unauthorized("Invalid refresh token");
      }

      const nextRefreshToken = deps.refreshTokenService.generate();
      const refreshExpiresAt = new Date(
        Date.now() + deps.refreshTtlSeconds * 1000,
      );

      await deps.sessionRepository.save({
        ...session,
        refreshTokenHash: deps.refreshTokenService.hash(nextRefreshToken),
        expiresAt: refreshExpiresAt,
      });

      const issued = await deps.accessTokenIssuer.issue({
        sub: user.id,
        username: user.username,
        sid: session.id,
        role: user.role,
      });

      return {
        accessToken: issued.token,
        expiresAt: issued.expiresAt,
        refreshToken: nextRefreshToken,
        refreshExpiresAt,
        sessionId: session.id,
        user: {
          id: user.id,
          username: user.username,
          role: user.role,
          permissions: getPermissionsForRole(user.role),
        },
      };
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
