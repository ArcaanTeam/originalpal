import { describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import {
  createFakePasswordHasher,
  createFakeUserRepository,
} from "./testSupport";
import { updatePasswordUseCase } from "./updatePassword";

const sampleUser = {
  id: "user-1",
  username: "admin",
  passwordHash: "hashed-password",
  role: "Admin" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("updatePasswordUseCase", () => {
  it("updates password when current password is valid", async () => {
    const userRepository = createFakeUserRepository({ users: [sampleUser] });
    const updatePassword = updatePasswordUseCase({
      userRepository,
      passwordHasher: createFakePasswordHasher({ matches: true }),
    });

    await updatePassword({
      userId: "user-1",
      currentPassword: "OldSecret1!",
      newPassword: "NewSecret1!",
    });

    const updated = await userRepository.findById("user-1");
    expect(updated?.passwordHash).toBe("hashed:NewSecret1!");
  });

  it("rejects invalid current password", async () => {
    const updatePassword = updatePasswordUseCase({
      userRepository: createFakeUserRepository({ users: [sampleUser] }),
      passwordHasher: createFakePasswordHasher({ matches: false }),
    });

    await expect(
      updatePassword({
        userId: "user-1",
        currentPassword: "wrong",
        newPassword: "NewSecret1!",
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.Unauthorized,
    });
  });

  it("rejects short new passwords", async () => {
    const updatePassword = updatePasswordUseCase({
      userRepository: createFakeUserRepository({ users: [sampleUser] }),
      passwordHasher: createFakePasswordHasher({ matches: true }),
    });

    await expect(
      updatePassword({
        userId: "user-1",
        currentPassword: "OldSecret1!",
        newPassword: "short",
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.InvalidInput,
    });
  });
});
