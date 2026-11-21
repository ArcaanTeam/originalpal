import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import type { ApiErrorBody } from "@/lib/presentation/ui/feedback/api-error";

export type LoginErrorBody = ApiErrorBody;

export interface LoginErrorCopy {
  invalidCredentials: string;
  signInFailed: string;
  validationFailed: string;
}

export function resolveLoginErrorMessage(
  body: LoginErrorBody,
  copy: LoginErrorCopy,
): string {
  if (body.code === "UNAUTHORIZED") {
    return copy.invalidCredentials;
  }

  if (
    body.code === "VALIDATION_ERROR" ||
    body.code === "INVALID_INPUT" ||
    body.errors?.length
  ) {
    return copy.validationFailed;
  }

  const errorCopy = getDictionary().errors;

  if (body.reason && errorCopy.reasons[body.reason]) {
    return errorCopy.reasons[body.reason];
  }

  const firstViolation = body.errors?.[0];
  if (firstViolation) {
    const byCode = errorCopy.violations[firstViolation.code];
    if (byCode) {
      return byCode;
    }
    const fieldKey = `${firstViolation.field}.${firstViolation.code}`;
    if (errorCopy.violations[fieldKey]) {
      return errorCopy.violations[fieldKey];
    }
  }

  return copy.signInFailed;
}
