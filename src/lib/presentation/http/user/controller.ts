import { assertSessionPermission } from "@/lib/application/auth/authorization";
import { validationError } from "@/lib/application/errors";
import type { VerifiedAccessToken } from "@/lib/application/port/auth";
import type { UserSummary } from "@/lib/application/port/user";
import { Permission } from "@/lib/domain/auth/permission";
import { writeError } from "@/lib/presentation/http/errors";
import { UpdateUserRoleSchema, CreateUserSchema } from "./schema";

export interface UserControllerDeps {
  listUsers: () => Promise<UserSummary[]>;
  createUser: (input: {
    username: string;
    password: string;
    role: UserSummary["role"];
  }) => Promise<UserSummary>;
  updateUserRole: (input: {
    actorUserId: string;
    targetUserId: string;
    role: UserSummary["role"];
  }) => Promise<UserSummary>;
  deleteUser: (input: {
    actorUserId: string;
    targetUserId: string;
  }) => Promise<void>;
}

function toUserResponse(user: UserSummary) {
  return {
    id: user.id,
    username: user.username,
    role: user.role,
    created_at: user.createdAt.toISOString(),
  };
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

export async function listUsersHandler(
  deps: UserControllerDeps,
  session: VerifiedAccessToken | null,
) {
  try {
    if (!session) {
      const { unauthorized } = await import("@/lib/application/errors");
      throw unauthorized("login required");
    }

    assertSessionPermission(session, [Permission.UsersManage]);

    const users = await deps.listUsers();
    return Response.json({
      users: users.map(toUserResponse),
    });
  } catch (err) {
    return writeError(err);
  }
}

export async function createUserHandler(
  deps: UserControllerDeps,
  session: VerifiedAccessToken | null,
  request: Request,
) {
  try {
    if (!session) {
      const { unauthorized } = await import("@/lib/application/errors");
      throw unauthorized("login required");
    }

    assertSessionPermission(session, [Permission.UsersManage]);

    const body = await parseJson(request);
    const parsed = CreateUserSchema.safeParse(body);
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

    const user = await deps.createUser(parsed.data);
    return Response.json(toUserResponse(user), { status: 201 });
  } catch (err) {
    return writeError(err);
  }
}

export async function deleteUserHandler(
  deps: UserControllerDeps,
  session: VerifiedAccessToken | null,
  targetUserId: string,
) {
  try {
    if (!session) {
      const { unauthorized } = await import("@/lib/application/errors");
      throw unauthorized("login required");
    }

    assertSessionPermission(session, [Permission.UsersManage]);

    await deps.deleteUser({
      actorUserId: session.sub,
      targetUserId,
    });

    return Response.json({ ok: true });
  } catch (err) {
    return writeError(err);
  }
}

export async function updateUserRoleHandler(
  deps: UserControllerDeps,
  session: VerifiedAccessToken | null,
  targetUserId: string,
  request: Request,
) {
  try {
    if (!session) {
      const { unauthorized } = await import("@/lib/application/errors");
      throw unauthorized("login required");
    }

    assertSessionPermission(session, [Permission.UsersManage]);

    const body = await parseJson(request);
    const parsed = UpdateUserRoleSchema.safeParse(body);
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

    const user = await deps.updateUserRole({
      actorUserId: session.sub,
      targetUserId,
      role: parsed.data.role,
    });

    return Response.json(toUserResponse(user));
  } catch (err) {
    return writeError(err);
  }
}
