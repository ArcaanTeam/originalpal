import { describe, expect, it } from "vitest";
import { resolveApiErrorMessage } from "./resolve-api-error-message";

describe("resolveApiErrorMessage", () => {
  it("maps domain reason codes to Farsi guidance", () => {
    const resolved = resolveApiErrorMessage({
      code: "CONFLICT",
      reason: "username_taken",
      message: "username already exists",
    });

    expect(resolved.description).toContain("نام کاربری");
  });

  it("maps field violations before generic codes", () => {
    const resolved = resolveApiErrorMessage({
      code: "VALIDATION_ERROR",
      errors: [
        {
          field: "username",
          code: "required",
          message: "username is required",
        },
      ],
    });

    expect(resolved.description).toBe("این فیلد الزامی است.");
  });

  it("falls back to HTTP code mapping", () => {
    const resolved = resolveApiErrorMessage({
      code: "UNAUTHORIZED",
      message: "login required",
    });

    expect(resolved.description).toBeTruthy();
  });
});
