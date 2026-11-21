import "server-only";
import type { AppRole } from "@/lib/domain/auth/role";
import type { User } from "@/lib/domain/entity/user";

export interface UserSummary {
  id: string;
  username: string;
  role: AppRole;
  createdAt: Date;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  listAll(): Promise<UserSummary[]>;
  updateRole(id: string, role: AppRole): Promise<UserSummary | null>;
  deleteById(id: string): Promise<boolean>;
  save(user: User): Promise<User>;
}
