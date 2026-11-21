import { asc, eq } from "drizzle-orm";
import "server-only";
import type { UserRepository } from "@/lib/application/port/user";
import type { AppRole } from "@/lib/domain/auth/role";
import type { User } from "@/lib/domain/entity/user";
import { normalizeUsername } from "@/lib/domain/entity/user";
import {
  getDb,
  type DbExecutor,
} from "@/lib/infrastructure/persistence/drizzle/client";
import { users } from "@/lib/infrastructure/persistence/drizzle/schema";
import { userRecordToDomain, userToRecord } from "./mapper";

const userSummaryColumns = {
  id: users.id,
  username: users.username,
  role: users.role,
  createdAt: users.createdAt,
};

function toSummary(row: {
  id: string;
  username: string;
  role: string;
  createdAt: Date;
}) {
  return {
    id: row.id,
    username: row.username,
    role: row.role as AppRole,
    createdAt: row.createdAt,
  };
}

export class DrizzleUserRepository implements UserRepository {
  constructor(private readonly db: DbExecutor = getDb()) {}

  async findById(id: string): Promise<User | null> {
    const [row] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);
    return row ? userRecordToDomain(row) : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const [row] = await this.db
      .select()
      .from(users)
      .where(eq(users.username, normalizeUsername(username)))
      .limit(1);
    return row ? userRecordToDomain(row) : null;
  }

  async save(user: User): Promise<User> {
    const record = userToRecord(user);
    const [row] = await this.db
      .insert(users)
      .values(record)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          username: record.username,
          passwordHash: record.passwordHash,
          role: record.role,
          createdAt: record.createdAt,
        },
      })
      .returning();
    return userRecordToDomain(row!);
  }

  async listAll() {
    const rows = await this.db
      .select(userSummaryColumns)
      .from(users)
      .orderBy(asc(users.createdAt));
    return rows.map(toSummary);
  }

  async updateRole(id: string, role: AppRole) {
    const [row] = await this.db
      .update(users)
      .set({ role })
      .where(eq(users.id, id))
      .returning(userSummaryColumns);
    return row ? toSummary(row) : null;
  }

  async deleteById(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(users)
      .where(eq(users.id, id))
      .returning({ id: users.id });
    return deleted.length > 0;
  }
}
