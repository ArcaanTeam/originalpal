import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ApplicationError,
  ApplicationErrorCode,
} from "@/lib/application/errors";
import { writeError } from "./errors";

describe("writeError", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("logs unexpected 500 errors with message and stack", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const err = new Error("DATABASE_URL is not set");

    const response = writeError(err);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error).toBe("Request failed");
    expect(consoleError).toHaveBeenCalledWith(
      "[API]",
      "[HTTP 500] DATABASE_URL is not set",
      err,
    );
  });

  it("exposes unexpected error message in development responses", async () => {
    vi.stubEnv("NODE_ENV", "development");

    const response = writeError(new Error("DATABASE_URL is not set"));
    const body = await response.json();

    expect(body.message).toBe("DATABASE_URL is not set");
  });

  it("hides unexpected error message in production responses", async () => {
    vi.stubEnv("NODE_ENV", "production");

    const response = writeError(new Error("DATABASE_URL is not set"));
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBeUndefined();
  });

  it("logs internal application errors", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const err = new ApplicationError(
      ApplicationErrorCode.Internal,
      "database unavailable",
    );

    const response = writeError(err);
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.message).toBe("database unavailable");
    expect(consoleError).toHaveBeenCalledWith(
      "[API]",
      "[HTTP 500] INTERNAL: database unavailable",
    );
  });

  it("logs client application errors", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const err = new ApplicationError(
      ApplicationErrorCode.NotFound,
      "todo not found",
      undefined,
      "todo_not_found",
    );

    const response = writeError(err);
    const body = await response.json();

    expect(response.status).toBe(404);
    expect(body.reason).toBe("todo_not_found");
    expect(consoleError).toHaveBeenCalledWith(
      "[API]",
      "[HTTP 404] NOT_FOUND: todo not found",
    );
  });

  it("logs validation errors", async () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const err = new ApplicationError(
      ApplicationErrorCode.ValidationError,
      "validation failed",
      [{ field: "title", code: "too_small", message: "title is required" }],
    );

    const response = writeError(err);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.errors).toHaveLength(1);
    expect(consoleError).toHaveBeenCalledWith(
      "[API]",
      "[HTTP 400] VALIDATION_ERROR: validation failed",
    );
  });
});
