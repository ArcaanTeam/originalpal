import { describe, expect, it } from "vitest";
import { resolveLoginErrorMessage } from "./resolve-login-error-message";

const copy = {
  invalidCredentials: "نام کاربری یا رمز عبور نادرست است.",
  signInFailed: "ورود ممکن نیست. دوباره تلاش کنید.",
  validationFailed: "لطفاً نام کاربری و رمز عبور را وارد کنید.",
};

describe("resolveLoginErrorMessage", () => {
  it("maps unauthorized responses to invalid credentials copy", () => {
    expect(
      resolveLoginErrorMessage(
        {
          code: "UNAUTHORIZED",
          message: "Invalid credentials",
        },
        copy,
      ),
    ).toBe(copy.invalidCredentials);
  });

  it("maps validation errors to validation failed copy", () => {
    expect(
      resolveLoginErrorMessage(
        {
          code: "VALIDATION_ERROR",
          message: "validation failed",
          errors: [
            {
              field: "username",
              code: "too_small",
              message: "username is required",
            },
          ],
        },
        copy,
      ),
    ).toBe(copy.validationFailed);
  });

  it("falls back to sign-in failed for unknown errors", () => {
    expect(
      resolveLoginErrorMessage(
        {
          code: "INTERNAL",
          message: "unexpected failure",
        },
        copy,
      ),
    ).toBe(copy.signInFailed);
  });

  it("falls back to sign-in failed for empty bodies", () => {
    expect(resolveLoginErrorMessage({}, copy)).toBe(copy.signInFailed);
  });
});
