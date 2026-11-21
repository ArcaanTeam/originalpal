import "server-only";
import {
  ApplicationError,
  forbidden,
  mapDomainError,
  notFound,
} from "@/lib/application/errors";
import type { UserRepository } from "@/lib/application/port/user";

export interface DeleteUserInput {
  actorUserId: string;
  targetUserId: string;
}

export interface DeleteUserDeps {
  userRepository: UserRepository;
}

export function deleteUserUseCase(deps: DeleteUserDeps) {
  return async function execute(input: DeleteUserInput): Promise<void> {
    try {
      if (input.actorUserId === input.targetUserId) {
        throw forbidden(
          "cannot delete your own account",
          "cannot_delete_own_account",
        );
      }

      const deleted = await deps.userRepository.deleteById(input.targetUserId);
      if (!deleted) {
        throw notFound("user_not_found", "user not found");
      }
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
