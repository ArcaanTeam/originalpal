import { getSessionFromRequest } from "@/lib/infrastructure/auth/session";
import { updatePassword } from "@/lib/infrastructure/container";
import { updatePasswordHandler } from "@/lib/presentation/http/auth/controller";

const deps = { updatePassword };

export async function PATCH(request: Request) {
  const session = await getSessionFromRequest(request);
  return updatePasswordHandler(deps, session, request);
}
