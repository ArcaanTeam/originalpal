import { compare, hash } from "bcryptjs";
import "server-only";
import type { PasswordHasher } from "@/lib/application/port/auth";

export class BcryptPasswordHasher implements PasswordHasher {
  constructor(private readonly rounds: number = 12) {}

  async compare(plain: string, hashed: string): Promise<boolean> {
    return compare(plain, hashed);
  }

  async hash(plain: string): Promise<string> {
    return hash(plain, this.rounds);
  }
}
