import "server-only";
import type { AppRole } from "@/lib/domain/auth/role";
import { isAppRole } from "@/lib/domain/auth/role";
import type { User as DomainUser } from "@/lib/domain/entity/user";
import { normalizeUsername } from "@/lib/domain/entity/user";
import type { UserRow as User } from "@/lib/infrastructure/persistence/drizzle/schema";

function toDomainRole(role: string): AppRole {
  if (!isAppRole(role)) {
    throw new Error(`unsupported user role: ${role}`);
  }
  return role;
}

export function userRecordToDomain(record: User): DomainUser {
  return {
    id: record.id,
    username: record.username,
    passwordHash: record.passwordHash,
    role: toDomainRole(record.role),
    createdAt: record.createdAt,
  };
}

export function userToRecord(user: DomainUser): User {
  return {
    id: user.id,
    username: normalizeUsername(user.username),
    passwordHash: user.passwordHash,
    role: user.role,
    createdAt: user.createdAt,
  };
}
