import { describe, expect, it } from "vitest";
import {
  conflict,
  DomainError,
  DomainErrorCode,
  invalidInput,
  notFound as domainNotFound,
} from "@/lib/domain/errors";
import {
  ApplicationError,
  ApplicationErrorCode,
  invalid,
  mapDomainError,
  notFound,
  validationError,
} from "./errors";

describe("ApplicationError", () => {
  it("creates VALIDATION_ERROR", () => {
    const err = validationError("invalid body", [
      { field: "title", code: "required", message: "title is required" },
    ]);
    expect(err.code).toBe(ApplicationErrorCode.ValidationError);
    expect(err.violations).toHaveLength(1);
  });

  it("creates NOT_FOUND", () => {
    const err = notFound("TODO_NOT_FOUND", "todo not found");
    expect(err.code).toBe(ApplicationErrorCode.NotFound);
    expect(err.reasonCode).toBe("TODO_NOT_FOUND");
    expect(err.message).toBe("todo not found");
  });

  it("creates INVALID_INPUT via invalid()", () => {
    const err = invalid("TITLE_REQUIRED", "title is required");
    expect(err.code).toBe(ApplicationErrorCode.InvalidInput);
    expect(err.message).toBe("title is required");
  });
});

describe("mapDomainError", () => {
  const cases = [
    {
      name: "INVALID_INPUT",
      domain: invalidInput("bad title"),
      expectedCode: ApplicationErrorCode.InvalidInput,
    },
    {
      name: "NOT_FOUND",
      domain: domainNotFound("missing"),
      expectedCode: ApplicationErrorCode.NotFound,
    },
    {
      name: "CONFLICT",
      domain: conflict("already done"),
      expectedCode: ApplicationErrorCode.Conflict,
    },
  ] as const;

  for (const { name, domain, expectedCode } of cases) {
    it(`maps ${name} to application error`, () => {
      const mapped = mapDomainError(domain);
      expect(mapped).toBeInstanceOf(ApplicationError);
      expect((mapped as ApplicationError).code).toBe(expectedCode);
      expect((mapped as ApplicationError).message).toBe(domain.message);
    });
  }

  it("returns non-domain errors unchanged", () => {
    const err = new Error("boom");
    expect(mapDomainError(err)).toBe(err);
  });

  it("returns null for null input", () => {
    expect(mapDomainError(null)).toBeNull();
  });

  it("maps unknown domain codes to the same code string", () => {
    const domain = new DomainError("UNKNOWN" as DomainErrorCode, "unknown");
    const mapped = mapDomainError(domain);
    expect(mapped).toBe(domain);
  });
});
