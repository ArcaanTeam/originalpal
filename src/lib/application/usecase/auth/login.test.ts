import { describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import type { AuthSession } from "@/lib/domain/entity/authSession";
import type { User } from "@/lib/domain/entity/user";
import { loginUseCase } from "./login";
import { refreshSessionUseCase } from "./refresh";
import {
  createFakeAccessTokenIssuer,
  createFakePasswordHasher,
  createFakeRefreshTokenService,
  createFakeSessionRepository,
  createFakeUserRepository,
} from "./testSupport";

const sampleUser: User = {
  id: "user-1",
  username: "admin",
  passwordHash: "hashed-password",
  role: "Admin",
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

const activeSession: AuthSession = {
  id: "session-1",
  userId: "user-1",
  refreshTokenHash: "hash:refresh-token-1",
  expiresAt: new Date("2026-12-31T00:00:00.000Z"),
  revokedAt: null,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("loginUseCase", () => {
  it("issues access and refresh tokens for valid credentials", async () => {
    const login = loginUseCase({
      userRepository: createFakeUserRepository({ users: [sampleUser] }),
      sessionRepository: createFakeSessionRepository(),
      passwordHasher: createFakePasswordHasher({ matches: true }),
      accessTokenIssuer: createFakeAccessTokenIssuer({
        token: "jwt-token",
        expiresAt: new Date("2026-01-01T00:15:00.000Z"),
      }),
      refreshTokenService: createFakeRefreshTokenService(),
      sessionIdGenerator: () => "session-1",
      refreshTtlSeconds: 3600,
    });

    const result = await login({
      username: "admin",
      password: "Secret1!",
    });

    expect(result.accessToken).toBe("jwt-token");
    expect(result.refreshToken).toBe("refresh-token-1");
    expect(result.sessionId).toBe("session-1");
    expect(result.user).toEqual({
      id: "user-1",
      username: "admin",
      role: "Admin",
      permissions: expect.arrayContaining(["users:manage"]),
    });
  });

  it("throws unauthorized when the user does not exist", async () => {
    const login = loginUseCase({
      userRepository: createFakeUserRepository(),
      sessionRepository: createFakeSessionRepository(),
      passwordHasher: createFakePasswordHasher({ matches: true }),
      accessTokenIssuer: createFakeAccessTokenIssuer(),
      refreshTokenService: createFakeRefreshTokenService(),
      sessionIdGenerator: () => "session-1",
      refreshTtlSeconds: 3600,
    });

    await expect(
      login({ username: "missing", password: "Secret1!" }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.Unauthorized,
    });
  });
});

describe("refreshSessionUseCase", () => {
  it("rotates refresh token and issues a new access token", async () => {
    const refresh = refreshSessionUseCase({
      userRepository: createFakeUserRepository({ users: [sampleUser] }),
      sessionRepository: createFakeSessionRepository({
        sessions: [activeSession],
      }),
      accessTokenIssuer: createFakeAccessTokenIssuer({
        token: "jwt-token-2",
        expiresAt: new Date("2026-01-01T00:30:00.000Z"),
      }),
      refreshTokenService: createFakeRefreshTokenService(),
      refreshTtlSeconds: 3600,
    });

    const result = await refresh({ refreshToken: "refresh-token-1" });

    expect(result.accessToken).toBe("jwt-token-2");
    expect(result.refreshToken).toBe("refresh-token-1");
    expect(result.sessionId).toBe("session-1");
  });

  it("rejects invalid refresh tokens", async () => {
    const refresh = refreshSessionUseCase({
      userRepository: createFakeUserRepository({ users: [sampleUser] }),
      sessionRepository: createFakeSessionRepository({
        sessions: [activeSession],
      }),
      accessTokenIssuer: createFakeAccessTokenIssuer(),
      refreshTokenService: createFakeRefreshTokenService(),
      refreshTtlSeconds: 3600,
    });

    await expect(refresh({ refreshToken: "missing" })).rejects.toMatchObject({
      code: ApplicationErrorCode.Unauthorized,
    });
  });
});
