import { describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import { createFakeUserRepository } from "../auth/testSupport";
import { updateUserRoleUseCase } from "./updateUserRole";

const adminUser = {
  id: "admin-1",
  username: "admin",
  passwordHash: "hash",
  role: "Admin" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

const memberUser = {
  id: "member-1",
  username: "member",
  passwordHash: "hash",
  role: "Member" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("updateUserRoleUseCase", () => {
  it("updates another user's role", async () => {
    const updateRole = updateUserRoleUseCase({
      userRepository: createFakeUserRepository({
        users: [adminUser, memberUser],
      }),
    });

    const updated = await updateRole({
      actorUserId: adminUser.id,
      targetUserId: memberUser.id,
      role: "Admin",
    });

    expect(updated.role).toBe("Admin");
  });

  it("prevents changing your own role", async () => {
    const updateRole = updateUserRoleUseCase({
      userRepository: createFakeUserRepository({ users: [adminUser] }),
    });

    await expect(
      updateRole({
        actorUserId: adminUser.id,
        targetUserId: adminUser.id,
        role: "Member",
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.Forbidden,
    });
  });
});
