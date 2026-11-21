import { createHash, randomBytes } from "node:crypto";
import type { RefreshTokenService } from "@/lib/application/port/auth";

export class CryptoRefreshTokenService implements RefreshTokenService {
  generate(): string {
    return randomBytes(32).toString("base64url");
  }

  hash(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }
}
