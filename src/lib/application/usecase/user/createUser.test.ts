import { describe, expect, it } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import {
  createFakePasswordHasher,
  createFakeUserRepository,
} from "../auth/testSupport";
import { createUserUseCase } from "./createUser";

describe("createUserUseCase", () => {
  it("creates a user with a hashed password", async () => {
    const createUser = createUserUseCase({
      userRepository: createFakeUserRepository(),
      passwordHasher: createFakePasswordHasher(),
      idGenerator: () => "user-new",
    });

    const created = await createUser({
      username: "new-user",
      password: "Secret123!",
      role: "Member",
    });

    expect(created).toMatchObject({
      id: "user-new",
      username: "new-user",
      role: "Member",
    });
  });

  it("rejects duplicate usernames", async () => {
    const createUser = createUserUseCase({
      userRepository: createFakeUserRepository({
        users: [
          {
            id: "user-1",
            username: "taken",
            passwordHash: "hash",
            role: "Member",
            createdAt: new Date("2026-01-01T00:00:00.000Z"),
          },
        ],
      }),
      passwordHasher: createFakePasswordHasher(),
      idGenerator: () => "user-new",
    });

    await expect(
      createUser({
        username: "taken",
        password: "Secret123!",
        role: "Member",
      }),
    ).rejects.toMatchObject({
      code: ApplicationErrorCode.Conflict,
    });
  });
});
