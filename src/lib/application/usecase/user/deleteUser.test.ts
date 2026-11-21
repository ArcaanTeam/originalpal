import { describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import { createFakeUserRepository } from "../auth/testSupport";
import { deleteUserUseCase } from "./deleteUser";

const adminUser = {
  id: "admin-1",
  username: "admin",
  passwordHash: "hash",
  role: "Admin" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("deleteUserUseCase", () => {
  it("deletes another user", async () => {
    const deleteUser = deleteUserUseCase({
      userRepository: createFakeUserRepository({
        users: [
          adminUser,
          {
            id: "dev-1",
            username: "dev",
            passwordHash: "hash",
            role: "Member",
            createdAt: new Date("2026-01-01T00:00:00.000Z"),
          },
        ],
      }),
    });

    await deleteUser({
      actorUserId: adminUser.id,
      targetUserId: "dev-1",
    });
  });

  it("prevents deleting your own account", async () => {
    const deleteUser = deleteUserUseCase({
      userRepository: createFakeUserRepository({ users: [adminUser] }),
    });

    await expect(
      deleteUser({
        actorUserId: adminUser.id,
        targetUserId: adminUser.id,
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.Forbidden,
    });
  });
});
