import "server-only";
import {
  ApplicationError,
  conflict,
  invalid,
  mapDomainError,
} from "@/lib/application/errors";
import type { PasswordHasher } from "@/lib/application/port/auth";
import type { UserRepository } from "@/lib/application/port/user";
import type { AppRole } from "@/lib/domain/auth/role";
import { isAppRole } from "@/lib/domain/auth/role";
import { DEFAULT_APP_ROLE, normalizeUsername } from "@/lib/domain/entity/user";

export interface CreateUserInput {
  username: string;
  password: string;
  role?: AppRole;
}

export interface CreateUserDeps {
  userRepository: UserRepository;
  passwordHasher: PasswordHasher;
  idGenerator: () => string;
}

export function createUserUseCase(deps: CreateUserDeps) {
  return async function execute(input: CreateUserInput) {
    try {
      const username = normalizeUsername(input.username);
      if (!username || !input.password.trim()) {
        throw invalid("invalid_input", "username and password are required");
      }

      const role = input.role ?? DEFAULT_APP_ROLE;
      if (!isAppRole(role)) {
        throw invalid("invalid_role", "invalid role");
      }

      const existing = await deps.userRepository.findByUsername(username);
      if (existing) {
        throw conflict("username_taken", "username already exists");
      }

      const passwordHash = await deps.passwordHasher.hash(input.password);
      const created = await deps.userRepository.save({
        id: deps.idGenerator(),
        username,
        passwordHash,
        role,
        createdAt: new Date(),
      });

      return {
        id: created.id,
        username: created.username,
        role: created.role,
        createdAt: created.createdAt,
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
