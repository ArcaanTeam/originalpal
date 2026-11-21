import { describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import { createFakeUserRepository } from "./testSupport";
import { updateUsernameUseCase } from "./updateUsername";

const sampleUser = {
  id: "user-1",
  username: "admin",
  passwordHash: "hashed-password",
  role: "Admin" as const,
  createdAt: new Date("2026-01-01T00:00:00.000Z"),
};

describe("updateUsernameUseCase", () => {
  it("updates username when available", async () => {
    const userRepository = createFakeUserRepository({ users: [sampleUser] });
    const updateUsername = updateUsernameUseCase({ userRepository });

    const result = await updateUsername({
      userId: "user-1",
      username: "NewAdmin",
    });

    expect(result.username).toBe("newadmin");
    const updated = await userRepository.findById("user-1");
    expect(updated?.username).toBe("newadmin");
  });

  it("rejects taken usernames", async () => {
    const userRepository = createFakeUserRepository({
      users: [
        sampleUser,
        {
          id: "user-2",
          username: "member",
          passwordHash: "hash",
          role: "Member",
          createdAt: new Date("2026-01-01T00:00:00.000Z"),
        },
      ],
    });
    const updateUsername = updateUsernameUseCase({ userRepository });

    await expect(
      updateUsername({
        userId: "user-1",
        username: "member",
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.Conflict,
    });
  });
});
