import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import type { ApiErrorBody, ApiFieldViolation } from "./api-error";

export interface ResolvedApiErrorMessage {
  title: string;
  description?: string;
}

function resolveViolationMessage(
  violation: ApiFieldViolation,
  copy: ReturnType<typeof getDictionary>["errors"],
): string | undefined {
  const byCode = copy.violations[violation.code];
  if (byCode) {
    return byCode;
  }
  const fieldKey = `${violation.field}.${violation.code}`;
  return copy.violations[fieldKey];
}

export function resolveApiErrorMessage(
  body: ApiErrorBody,
): ResolvedApiErrorMessage {
  const copy = getDictionary().errors;

  if (body.reason && copy.reasons[body.reason]) {
    return {
      title: copy.title,
      description: copy.reasons[body.reason],
    };
  }

  const firstViolation = body.errors?.[0];
  if (firstViolation) {
    const violationMessage = resolveViolationMessage(firstViolation, copy);
    if (violationMessage) {
      return {
        title: copy.title,
        description: violationMessage,
      };
    }
  }

  if (body.code && copy.codes[body.code]) {
    return {
      title: copy.title,
      description: copy.codes[body.code],
    };
  }

  if (body.message && body.message !== "Request failed") {
    return {
      title: copy.title,
      description: body.message,
    };
  }

  return {
    title: copy.title,
    description: copy.fallback,
  };
}
