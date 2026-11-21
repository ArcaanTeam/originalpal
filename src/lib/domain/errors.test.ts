import { describe, expect, it } from "vitest";
import {
  conflict,
  DomainError,
  DomainErrorCode,
  invalidInput,
  notFound,
} from "./errors";

describe("DomainError", () => {
  it("creates INVALID_INPUT error", () => {
    const err = invalidInput("title is required");
    expect(err).toBeInstanceOf(DomainError);
    expect(err.code).toBe(DomainErrorCode.InvalidInput);
    expect(err.message).toBe("title is required");
  });

  it("creates NOT_FOUND error", () => {
    const err = notFound("todo not found");
    expect(err.code).toBe(DomainErrorCode.NotFound);
    expect(err.message).toBe("todo not found");
  });

  it("creates CONFLICT error", () => {
    const err = conflict("todo already completed");
    expect(err.code).toBe(DomainErrorCode.Conflict);
    expect(err.message).toBe("todo already completed");
  });

  it("supports instanceof checks by code", () => {
    const err = notFound("missing");
    expect(err.code).toBe(DomainErrorCode.NotFound);
    expect(err.message).toBe("missing");
  });
});
