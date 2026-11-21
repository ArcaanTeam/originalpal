import { login, logout, refresh } from "@/lib/infrastructure/container";
import { loginHandler } from "@/lib/presentation/http/auth/controller";

const deps = { login, refresh, logout };

export async function POST(request: Request) {
  return loginHandler(deps, request);
}
