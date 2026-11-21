import { getSessionFromRequest } from "@/lib/infrastructure/auth/session";
import {
  createUser,
  deleteUser,
  listUsers,
  updateUserRole,
} from "@/lib/infrastructure/container";
import { deleteUserHandler } from "@/lib/presentation/http/user/controller";

const deps = { listUsers, createUser, updateUserRole, deleteUser };

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSessionFromRequest(request);
  const { id } = await context.params;
  return deleteUserHandler(deps, session, id);
}
