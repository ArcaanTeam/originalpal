import { randomUUID } from "node:crypto";
import { afterAll, describe, expect, it } from "vitest";
import { DrizzleUserRepository } from "./drizzleUserRepository";

// Needs a migrated Postgres at DATABASE_URL:
//   RUN_DB_INTEGRATION=1 pnpm test drizzleUserRepository
const runIntegration = process.env.RUN_DB_INTEGRATION === "1";

describe.runIf(runIntegration)("DrizzleUserRepository integration", () => {
  const repository = new DrizzleUserRepository();
  const createdIds: string[] = [];

  async function saveUser(prefix: string) {
    const id = randomUUID();
    createdIds.push(id);
    return repository.save({
      id,
      username: `${prefix}-${id.slice(0, 8)}`,
      passwordHash: "hash",
      role: "Member",
      createdAt: new Date(),
    });
  }

  afterAll(async () => {
    await Promise.all(
      createdIds.map((id) => repository.deleteById(id).catch(() => false)),
    );
  });

  it("saves a user and finds it by id and username", async () => {
    const user = await saveUser("it-find");

    expect((await repository.findById(user.id))?.username).toBe(user.username);
    expect((await repository.findByUsername(user.username))?.id).toBe(user.id);
  });

  it("updates the role and returns the summary", async () => {
    const user = await saveUser("it-role");

    const updated = await repository.updateRole(user.id, "Admin");

    expect(updated?.role).toBe("Admin");
  });

  it("deletes a user", async () => {
    const user = await saveUser("it-delete");

    expect(await repository.deleteById(user.id)).toBe(true);
    expect(await repository.findById(user.id)).toBeNull();
  });
});
