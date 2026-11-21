import "server-only";
import {
  ApplicationError,
  forbidden,
  mapDomainError,
  notFound,
} from "@/lib/application/errors";
import type { UserRepository } from "@/lib/application/port/user";
import type { AppRole } from "@/lib/domain/auth/role";
import { isAppRole } from "@/lib/domain/auth/role";

export interface UpdateUserRoleInput {
  actorUserId: string;
  targetUserId: string;
  role: AppRole;
}

export interface UpdateUserRoleDeps {
  userRepository: UserRepository;
}

export function updateUserRoleUseCase(deps: UpdateUserRoleDeps) {
  return async function execute(input: UpdateUserRoleInput) {
    try {
      if (!isAppRole(input.role)) {
        throw notFound("invalid_role", "invalid role");
      }

      if (input.actorUserId === input.targetUserId) {
        throw forbidden(
          "cannot change your own role",
          "cannot_change_own_role",
        );
      }

      const updated = await deps.userRepository.updateRole(
        input.targetUserId,
        input.role,
      );

      if (!updated) {
        throw notFound("user_not_found", "user not found");
      }

      return updated;
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
