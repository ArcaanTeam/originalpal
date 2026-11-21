import { afterEach, describe, expect, it, vi } from "vitest";
import { assertDatabaseConnectivity } from "./assertDatabaseConnectivity";

const { createDatabaseMock, closeDatabaseMock } = vi.hoisted(() => ({
  createDatabaseMock: vi.fn(),
  closeDatabaseMock: vi.fn(),
}));

vi.mock("./client", () => ({
  createDatabase: createDatabaseMock,
  closeDatabase: closeDatabaseMock,
}));

describe("assertDatabaseConnectivity", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    createDatabaseMock.mockReset();
    closeDatabaseMock.mockReset();
  });

  it("skips the check during vitest", async () => {
    vi.stubEnv("VITEST", "true");

    await expect(assertDatabaseConnectivity()).resolves.toBeUndefined();
    expect(createDatabaseMock).not.toHaveBeenCalled();
  });

  it("skips the check when SKIP_ENV_VALIDATION is set", async () => {
    vi.stubEnv("VITEST", "");
    vi.stubEnv("SKIP_ENV_VALIDATION", "true");

    await expect(assertDatabaseConnectivity()).resolves.toBeUndefined();
    expect(createDatabaseMock).not.toHaveBeenCalled();
  });

  it("throws when the database is unreachable", async () => {
    vi.stubEnv("VITEST", "");
    vi.stubEnv("SKIP_ENV_VALIDATION", "");

    const db = {
      execute: vi.fn().mockRejectedValue(new Error("connection refused")),
    };
    createDatabaseMock.mockReturnValue(db);

    await expect(assertDatabaseConnectivity()).rejects.toThrow(
      /Database connectivity check failed/,
    );
    expect(closeDatabaseMock).toHaveBeenCalledExactlyOnceWith(db);
  });

  it("passes when SELECT 1 succeeds", async () => {
    vi.stubEnv("VITEST", "");
    vi.stubEnv("SKIP_ENV_VALIDATION", "");

    const db = {
      execute: vi.fn().mockResolvedValue({ rows: [{ "?column?": 1 }] }),
    };
    createDatabaseMock.mockReturnValue(db);

    await expect(assertDatabaseConnectivity()).resolves.toBeUndefined();
    expect(closeDatabaseMock).toHaveBeenCalledExactlyOnceWith(db);
  });
});
