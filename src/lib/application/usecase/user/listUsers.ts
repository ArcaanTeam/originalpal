import "server-only";
import type { UserRepository } from "@/lib/application/port/user";

export interface ListUsersDeps {
  userRepository: UserRepository;
}

export function listUsersUseCase(deps: ListUsersDeps) {
  return async function execute() {
    return deps.userRepository.listAll();
  };
}
