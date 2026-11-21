import { unauthorized, validationError } from "@/lib/application/errors";
import type { VerifiedAccessToken } from "@/lib/application/port/auth";
import type { UserRepository } from "@/lib/application/port/user";
import type { LogoutInput } from "@/lib/application/usecase/auth/logout";
import type { AuthTokensResult } from "@/lib/application/usecase/auth/tokens";
import { getPermissionsForRole } from "@/lib/domain/auth/permission";
import type { AppRole } from "@/lib/domain/auth/role";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "@/lib/infrastructure/auth/constants";
import { writeError } from "@/lib/presentation/http/errors";
import {
  LoginSchema,
  UpdatePasswordSchema,
  UpdateProfileSchema,
  type LoginResponse,
} from "./schema";

export interface AuthControllerDeps {
  login: (input: {
    username: string;
    password: string;
  }) => Promise<AuthTokensResult>;
  refresh: (input: { refreshToken: string }) => Promise<AuthTokensResult>;
  logout: (input: LogoutInput) => Promise<void>;
}

export interface UpdatePasswordControllerDeps {
  updatePassword: (input: {
    userId: string;
    currentPassword: string;
    newPassword: string;
  }) => Promise<void>;
}

export interface MeControllerDeps {
  userRepository: UserRepository;
}

export interface UpdateProfileControllerDeps {
  userRepository: UserRepository;
  updateUsername: (input: {
    userId: string;
    username: string;
  }) => Promise<{ id: string; username: string; role: string }>;
}

function toLoginResponse(result: AuthTokensResult): LoginResponse {
  return {
    user: result.user,
    tokens: {
      access_token: result.accessToken,
      token_type: "Bearer",
      expires_at: result.expiresAt.toISOString(),
      refresh_token: result.refreshToken,
      refresh_expires_at: result.refreshExpiresAt.toISOString(),
    },
  };
}

function validateLoginBody(body: unknown) {
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    throw validationError(
      "validation failed",
      parsed.error.issues.map((issue) => ({
        field: issue.path.join(".") || "body",
        code: issue.code,
        message: issue.message,
      })),
    );
  }
  return parsed.data;
}

async function parseJson<T>(request: Request): Promise<T> {
  try {
    return (await request.json()) as T;
  } catch {
    throw validationError("invalid request body", [
      { field: "body", code: "invalid_json", message: "invalid JSON body" },
    ]);
  }
}

function appendAuthCookies(response: Response, result: AuthTokensResult): void {
  const secure = process.env.NODE_ENV === "production";

  response.headers.append(
    "Set-Cookie",
    serializeCookie(
      ACCESS_TOKEN_COOKIE,
      result.accessToken,
      accessTokenCookieOptions(result.expiresAt, secure),
    ),
  );
  response.headers.append(
    "Set-Cookie",
    serializeCookie(
      REFRESH_TOKEN_COOKIE,
      result.refreshToken,
      refreshTokenCookieOptions(result.refreshExpiresAt, secure),
    ),
  );
}

function clearAuthCookies(response: Response): void {
  const secure = process.env.NODE_ENV === "production";

  response.headers.append(
    "Set-Cookie",
    serializeCookie(ACCESS_TOKEN_COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/",
      maxAge: 0,
    }),
  );
  response.headers.append(
    "Set-Cookie",
    serializeCookie(REFRESH_TOKEN_COOKIE, "", {
      httpOnly: true,
      sameSite: "lax",
      secure,
      path: "/api/auth",
      maxAge: 0,
    }),
  );
}

function getCookieValue(request: Request, name: string): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return undefined;
  }

  const value = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`))
    ?.slice(name.length + 1);

  return value ? decodeURIComponent(value) : undefined;
}

export async function loginHandler(deps: AuthControllerDeps, request: Request) {
  try {
    const body = await parseJson(request);
    const input = validateLoginBody(body);
    const result = await deps.login(input);
    const response = Response.json(toLoginResponse(result));
    appendAuthCookies(response, result);
    return response;
  } catch (err) {
    return writeError(err);
  }
}

export async function refreshHandler(
  deps: AuthControllerDeps,
  request: Request,
) {
  try {
    const refreshToken = getCookieValue(request, REFRESH_TOKEN_COOKIE);
    if (!refreshToken) {
      throw unauthorized("Invalid refresh token");
    }

    const result = await deps.refresh({ refreshToken });
    const response = Response.json(toLoginResponse(result));
    appendAuthCookies(response, result);
    return response;
  } catch (err) {
    return writeError(err);
  }
}

export async function logoutHandler(
  deps: AuthControllerDeps,
  request: Request,
) {
  try {
    const refreshToken = getCookieValue(request, REFRESH_TOKEN_COOKIE);
    const accessToken = getCookieValue(request, ACCESS_TOKEN_COOKIE);
    let sessionId: string | undefined;

    if (accessToken) {
      const { verifyAccessToken } =
        await import("@/lib/infrastructure/auth/jwtAccessToken");
      const { getAccessTokenConfig } = await import("@/lib/infrastructure/env");
      const verified = await verifyAccessToken(
        accessToken,
        getAccessTokenConfig(),
      );
      sessionId = verified?.sid;
    }

    await deps.logout({ sessionId, refreshToken });
    const response = Response.json({ ok: true });
    clearAuthCookies(response);
    return response;
  } catch (err) {
    return writeError(err);
  }
}

export async function meHandler(
  deps: MeControllerDeps,
  session: VerifiedAccessToken | null,
) {
  try {
    if (!session) {
      throw unauthorized("login required");
    }

    const user = await deps.userRepository.findById(session.sub);
    if (!user) {
      throw unauthorized("login required");
    }

    return Response.json({
      id: user.id,
      username: user.username,
      role: user.role,
      permissions: getPermissionsForRole(user.role),
    });
  } catch (err) {
    return writeError(err);
  }
}

export async function updateProfileHandler(
  deps: UpdateProfileControllerDeps,
  session: VerifiedAccessToken | null,
  request: Request,
) {
  try {
    if (!session) {
      throw unauthorized("login required");
    }

    const body = await parseJson(request);
    const parsed = UpdateProfileSchema.safeParse(body);
    if (!parsed.success) {
      throw validationError(
        "validation failed",
        parsed.error.issues.map((issue) => ({
          field: issue.path.join(".") || "body",
          code: issue.code,
          message: issue.message,
        })),
      );
    }

    const updated = await deps.updateUsername({
      userId: session.sub,
      username: parsed.data.username,
    });

    return Response.json({
      id: updated.id,
      username: updated.username,
      role: updated.role,
      permissions: getPermissionsForRole(updated.role as AppRole),
    });
  } catch (err) {
    return writeError(err);
  }
}

export async function updatePasswordHandler(
  deps: UpdatePasswordControllerDeps,
  session: VerifiedAccessToken | null,
  request: Request,
) {
  try {
    if (!session) {
      throw unauthorized("login required");
    }

    const body = await parseJson(request);
    const parsed = UpdatePasswordSchema.safeParse(body);
    if (!parsed.success) {
      throw validationError(
        "validation failed",
        parsed.error.issues.map((issue) => ({
          field: issue.path.join(".") || "body",
          code: issue.code,
          message: issue.message,
        })),
      );
    }

    await deps.updatePassword({
      userId: session.sub,
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    });

    return Response.json({ ok: true });
  } catch (err) {
    return writeError(err);
  }
}

function serializeCookie(
  name: string,
  value: string,
  options: {
    httpOnly?: boolean;
    sameSite?: "lax" | "strict" | "none";
    secure?: boolean;
    path?: string;
    expires?: Date;
    maxAge?: number;
  },
): string {
  const parts = [`${name}=${encodeURIComponent(value)}`];

  if (options.maxAge !== undefined) {
    parts.push(`Max-Age=${options.maxAge}`);
  }
  if (options.expires) {
    parts.push(`Expires=${options.expires.toUTCString()}`);
  }
  if (options.path) {
    parts.push(`Path=${options.path}`);
  }
  if (options.sameSite) {
    parts.push(`SameSite=${options.sameSite}`);
  }
  if (options.secure) {
    parts.push("Secure");
  }
  if (options.httpOnly) {
    parts.push("HttpOnly");
  }

  return parts.join("; ");
}
