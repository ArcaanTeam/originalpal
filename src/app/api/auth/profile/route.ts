import { getSessionFromRequest } from "@/lib/infrastructure/auth/session";
import { container, updateUsername } from "@/lib/infrastructure/container";
import { updateProfileHandler } from "@/lib/presentation/http/auth/controller";

export async function PATCH(request: Request) {
  const session = await getSessionFromRequest(request);
  return updateProfileHandler(
    { userRepository: container.userRepository, updateUsername },
    session,
    request,
  );
}
