import { getSessionFromRequest } from "@/lib/infrastructure/auth/session";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUserRole,
} from "@/lib/infrastructure/container";
import {
  createUserHandler,
  listUsersHandler,
} from "@/lib/presentation/http/user/controller";

const deps = { listUsers, createUser, updateUserRole, deleteUser };

export async function GET(request: Request) {
  const session = await getSessionFromRequest(request);
  return listUsersHandler(deps, session);
}

export async function POST(request: Request) {
  const session = await getSessionFromRequest(request);
  return createUserHandler(deps, session, request);
}
