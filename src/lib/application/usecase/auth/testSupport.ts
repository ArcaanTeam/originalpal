import type {
  AccessTokenIssuer,
  AccessTokenVerifier,
  PasswordHasher,
  RefreshTokenService,
  VerifiedAccessToken,
} from "@/lib/application/port/auth";
import type { SessionRepository } from "@/lib/application/port/session";
import type { UserRepository } from "@/lib/application/port/user";
import type { AuthSession } from "@/lib/domain/entity/authSession";
import type { User } from "@/lib/domain/entity/user";

export function createFakeUserRepository(
  options: {
    users?: User[];
  } = {},
): UserRepository {
  const users = [...(options.users ?? [])];

  return {
    async findById(id: string) {
      return users.find((user) => user.id === id) ?? null;
    },
    async findByUsername(username: string) {
      return (
        users.find((user) => user.username === username.toLowerCase()) ?? null
      );
    },
    async listAll() {
      return users.map((user) => ({
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      }));
    },
    async updateRole(id: string, role: User["role"]) {
      const user = users.find((item) => item.id === id);
      if (!user) {
        return null;
      }
      user.role = role;
      return {
        id: user.id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt,
      };
    },
    async deleteById(id: string) {
      const index = users.findIndex((item) => item.id === id);
      if (index < 0) {
        return false;
      }
      users.splice(index, 1);
      return true;
    },
    async save(user: User) {
      const index = users.findIndex((item) => item.id === user.id);
      if (index >= 0) {
        users[index] = user;
      } else {
        users.push(user);
      }
      return user;
    },
  };
}

export function createFakeSessionRepository(
  options: {
    sessions?: AuthSession[];
  } = {},
): SessionRepository {
  const sessions = [...(options.sessions ?? [])];

  return {
    async save(session: AuthSession) {
      const index = sessions.findIndex((item) => item.id === session.id);
      if (index >= 0) {
        sessions[index] = session;
      } else {
        sessions.push(session);
      }
      return session;
    },
    async findById(id: string) {
      return sessions.find((session) => session.id === id) ?? null;
    },
    async findByRefreshTokenHash(refreshTokenHash: string) {
      return (
        sessions.find(
          (session) => session.refreshTokenHash === refreshTokenHash,
        ) ?? null
      );
    },
  };
}

export function createFakeRefreshTokenService(): RefreshTokenService {
  let counter = 0;

  return {
    generate() {
      counter += 1;
      return `refresh-token-${counter}`;
    },
    hash(token: string) {
      return `hash:${token}`;
    },
  };
}

export function createFakePasswordHasher(
  options: { matches?: boolean } = {},
): PasswordHasher {
  const matches = options.matches ?? true;

  return {
    async compare() {
      return matches;
    },
    async hash(plain: string) {
      return `hashed:${plain}`;
    },
  };
}

export function createFakeAccessTokenIssuer(
  options: {
    token?: string;
    expiresAt?: Date;
  } = {},
): AccessTokenIssuer {
  const token = options.token ?? "access-token";
  const expiresAt = options.expiresAt ?? new Date("2026-01-01T00:15:00.000Z");

  return {
    async issue() {
      return { token, expiresAt };
    },
  };
}

export function createFakeAccessTokenVerifier(
  options: {
    result?: VerifiedAccessToken | null;
  } = {},
): AccessTokenVerifier {
  const result =
    options.result ??
    ({
      sub: "user-1",
      username: "admin",
      sid: "session-1",
      role: "Admin",
      expiresAt: new Date("2026-01-01T00:15:00.000Z"),
    } satisfies VerifiedAccessToken);

  return {
    async verify() {
      return result;
    },
  };
}
