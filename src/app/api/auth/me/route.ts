import { getSessionFromCookies } from "@/lib/infrastructure/auth/session";
import { container } from "@/lib/infrastructure/container";
import { meHandler } from "@/lib/presentation/http/auth/controller";

export async function GET() {
  const session = await getSessionFromCookies();
  return meHandler({ userRepository: container.userRepository }, session);
}
