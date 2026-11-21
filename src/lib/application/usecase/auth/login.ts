import "server-only";
import {
  ApplicationError,
  mapDomainError,
  unauthorized,
} from "@/lib/application/errors";
import type {
  AccessTokenIssuer,
  PasswordHasher,
  RefreshTokenService,
} from "@/lib/application/port/auth";
import type { SessionRepository } from "@/lib/application/port/session";
import type { UserRepository } from "@/lib/application/port/user";
import { getPermissionsForRole } from "@/lib/domain/auth/permission";
import { normalizeUsername } from "@/lib/domain/entity/user";
import type { AuthTokensResult } from "./tokens";

export interface LoginInput {
  username: string;
  password: string;
}

export type LoginResult = AuthTokensResult;

export interface LoginDeps {
  userRepository: UserRepository;
  sessionRepository: SessionRepository;
  passwordHasher: PasswordHasher;
  accessTokenIssuer: AccessTokenIssuer;
  refreshTokenService: RefreshTokenService;
  sessionIdGenerator: () => string;
  refreshTtlSeconds: number;
}

export function loginUseCase(deps: LoginDeps) {
  return async function execute(input: LoginInput): Promise<LoginResult> {
    try {
      const username = normalizeUsername(input.username);
      if (!username || !input.password) {
        throw unauthorized("Invalid credentials");
      }

      const user = await deps.userRepository.findByUsername(username);
      if (!user) {
        throw unauthorized("Invalid credentials");
      }

      const passwordMatches = await deps.passwordHasher.compare(
        input.password,
        user.passwordHash,
      );
      if (!passwordMatches) {
        throw unauthorized("Invalid credentials");
      }

      const sessionId = deps.sessionIdGenerator();
      const refreshToken = deps.refreshTokenService.generate();
      const refreshExpiresAt = new Date(
        Date.now() + deps.refreshTtlSeconds * 1000,
      );

      await deps.sessionRepository.save({
        id: sessionId,
        userId: user.id,
        refreshTokenHash: deps.refreshTokenService.hash(refreshToken),
        expiresAt: refreshExpiresAt,
        revokedAt: null,
        createdAt: new Date(),
      });

      const issued = await deps.accessTokenIssuer.issue({
        sub: user.id,
        username: user.username,
        sid: sessionId,
        role: user.role,
      });

      return {
        accessToken: issued.token,
        expiresAt: issued.expiresAt,
        refreshToken,
        refreshExpiresAt,
        sessionId,
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
