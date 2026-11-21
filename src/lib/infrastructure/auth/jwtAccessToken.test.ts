/**
 * @vitest-environment node
 */
import { describe, expect, it } from "vitest";
import { JoseAccessTokenService } from "./jwtAccessToken";

const config = {
  secret: "app-dev-secret-minimum-32-characters!!",
  issuer: "originalpal-auth",
  ttlSeconds: 900,
};

describe("JoseAccessTokenService", () => {
  it("issues and verifies an access token", async () => {
    const service = new JoseAccessTokenService(config);
    const issued = await service.issue({
      sub: "user-1",
      username: "admin",
      sid: "session-1",
      role: "Admin",
    });

    const verified = await service.verify(issued.token);

    expect(verified).toMatchObject({
      sub: "user-1",
      username: "admin",
      sid: "session-1",
      role: "Admin",
    });
    expect(verified?.expiresAt.getTime()).toBeGreaterThan(Date.now());
  });

  it("returns null for an invalid token", async () => {
    const service = new JoseAccessTokenService(config);
    expect(await service.verify("not-a-token")).toBeNull();
  });
});
