import { afterEach, describe, expect, it, vi } from "vitest";
import { assertRequiredEnv, resetServerEnvCacheForTests } from "./env";

describe("assertRequiredEnv", () => {
  const originalDatabaseUrl = process.env.DATABASE_URL;

  afterEach(() => {
    vi.unstubAllEnvs();
    resetServerEnvCacheForTests();
    if (originalDatabaseUrl === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = originalDatabaseUrl;
    }
  });

  it("throws when DATABASE_URL is missing", () => {
    vi.stubEnv("VITEST", "");
    delete process.env.DATABASE_URL;

    expect(() => assertRequiredEnv()).toThrow(
      /Missing required environment variables:[\s\S]*DATABASE_URL/,
    );
  });

  it("throws when DATABASE_URL is empty", () => {
    vi.stubEnv("VITEST", "");
    process.env.DATABASE_URL = "   ";

    expect(() => assertRequiredEnv()).toThrow(/DATABASE_URL/);
  });

  it("returns parsed env when DATABASE_URL is set", () => {
    vi.stubEnv("VITEST", "");
    process.env.DATABASE_URL =
      "postgresql://postgres:password@127.0.0.1:5432/originalpal";
    process.env.JWT_SECRET = "app-dev-secret-minimum-32-characters!!";
    process.env.JWT_ISSUER = "originalpal-auth";
    process.env.JWT_ACCESS_TTL_SECONDS = "900";
    process.env.JWT_REFRESH_TTL_SECONDS = "604800";
    process.env.ADMIN_USERNAME = "admin";
    process.env.ADMIN_PASSWORD = "Secret1!234";
    process.env.BCRYPT_ROUNDS = "12";

    expect(assertRequiredEnv()).toEqual({
      DATABASE_URL: "postgresql://postgres:password@127.0.0.1:5432/originalpal",
      JWT_SECRET: "app-dev-secret-minimum-32-characters!!",
      JWT_ISSUER: "originalpal-auth",
      JWT_ACCESS_TTL_SECONDS: 900,
      JWT_REFRESH_TTL_SECONDS: 604800,
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "Secret1!234",
      BCRYPT_ROUNDS: 12,
      UPLOAD_DIR: "./uploads",
      UPLOAD_MAX_FILE_SIZE_BYTES: 10_485_760,
    });
  });

  it("skips validation during vitest", () => {
    vi.stubEnv("VITEST", "true");
    delete process.env.DATABASE_URL;

    expect(assertRequiredEnv()).toMatchObject({
      DATABASE_URL: "",
      JWT_ISSUER: "originalpal-auth",
      JWT_ACCESS_TTL_SECONDS: 900,
      JWT_REFRESH_TTL_SECONDS: 604800,
      ADMIN_USERNAME: "admin",
      ADMIN_PASSWORD: "Secret1!234",
      BCRYPT_ROUNDS: 12,
    });
    expect(assertRequiredEnv().JWT_SECRET.length).toBeGreaterThanOrEqual(32);
  });
});
