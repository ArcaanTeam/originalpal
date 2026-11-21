import { login, logout, refresh } from "@/lib/infrastructure/container";
import { refreshHandler } from "@/lib/presentation/http/auth/controller";

const deps = { login, refresh, logout };

export async function POST(request: Request) {
  return refreshHandler(deps, request);
}
