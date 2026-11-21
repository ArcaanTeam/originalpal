import "server-only";
import {
  ApplicationError,
  invalid,
  mapDomainError,
  unauthorized,
} from "@/lib/application/errors";
import type { PasswordHasher } from "@/lib/application/port/auth";
import type { UserRepository } from "@/lib/application/port/user";

export interface UpdatePasswordInput {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

export interface UpdatePasswordDeps {
  userRepository: UserRepository;
  passwordHasher: PasswordHasher;
}

export function updatePasswordUseCase(deps: UpdatePasswordDeps) {
  return async function execute(input: UpdatePasswordInput): Promise<void> {
    try {
      if (!input.currentPassword || !input.newPassword.trim()) {
        throw invalid("invalid_input", "current and new password are required");
      }

      if (input.newPassword.length < 8) {
        throw invalid(
          "password_too_short",
          "new password must be at least 8 characters",
        );
      }

      if (input.currentPassword === input.newPassword) {
        throw invalid(
          "password_unchanged",
          "new password must differ from current password",
        );
      }

      const user = await deps.userRepository.findById(input.userId);
      if (!user) {
        throw unauthorized("login required");
      }

      const passwordMatches = await deps.passwordHasher.compare(
        input.currentPassword,
        user.passwordHash,
      );
      if (!passwordMatches) {
        throw unauthorized(
          "invalid current password",
          "invalid_current_password",
        );
      }

      const passwordHash = await deps.passwordHasher.hash(input.newPassword);
      await deps.userRepository.save({
        ...user,
        passwordHash,
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
