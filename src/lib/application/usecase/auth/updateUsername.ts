import "server-only";
import {
  ApplicationError,
  conflict,
  invalid,
  mapDomainError,
  unauthorized,
} from "@/lib/application/errors";
import type { UserRepository } from "@/lib/application/port/user";
import { normalizeUsername } from "@/lib/domain/entity/user";

export interface UpdateUsernameInput {
  userId: string;
  username: string;
}

export interface UpdateUsernameDeps {
  userRepository: UserRepository;
}

export interface UpdateUsernameResult {
  id: string;
  username: string;
  role: string;
}

export function updateUsernameUseCase(deps: UpdateUsernameDeps) {
  return async function execute(
    input: UpdateUsernameInput,
  ): Promise<UpdateUsernameResult> {
    try {
      const username = normalizeUsername(input.username);
      if (!username) {
        throw invalid("invalid_input", "username is required");
      }

      const user = await deps.userRepository.findById(input.userId);
      if (!user) {
        throw unauthorized("login required");
      }

      if (user.username === username) {
        return {
          id: user.id,
          username: user.username,
          role: user.role,
        };
      }

      const existing = await deps.userRepository.findByUsername(username);
      if (existing && existing.id !== user.id) {
        throw conflict("username_taken", "username already exists");
      }

      const updated = await deps.userRepository.save({
        ...user,
        username,
      });

      return {
        id: updated.id,
        username: updated.username,
        role: updated.role,
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
