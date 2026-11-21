import "server-only";
import { DomainError, DomainErrorCode } from "@/lib/domain/errors";

export enum ApplicationErrorCode {
  Unauthorized = "UNAUTHORIZED",
  Forbidden = "FORBIDDEN",
  BadRequest = "BAD_REQUEST",
  NotFound = "NOT_FOUND",
  Conflict = "CONFLICT",
  PayloadTooLarge = "PAYLOAD_TOO_LARGE",
  UnsupportedMediaType = "UNSUPPORTED_MEDIA_TYPE",
  Internal = "INTERNAL",
  InvalidInput = "INVALID_INPUT",
  ValidationError = "VALIDATION_ERROR",
}

export interface FieldViolation {
  field: string;
  code: string;
  message: string;
}

export class ApplicationError extends Error {
  readonly code: ApplicationErrorCode;
  readonly reasonCode?: string;
  readonly violations?: FieldViolation[];

  constructor(
    code: ApplicationErrorCode,
    message: string,
    violations?: FieldViolation[],
    reasonCode?: string,
  ) {
    super(message);
    this.name = "ApplicationError";
    this.code = code;
    this.reasonCode = reasonCode;
    this.violations = violations;
  }
}

export function validationError(
  message: string,
  violations: FieldViolation[],
  reasonCode?: string,
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.ValidationError,
    message,
    violations,
    reasonCode,
  );
}

export function invalid(reasonCode: string, message: string): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.InvalidInput,
    message,
    undefined,
    reasonCode,
  );
}

export function notFound(
  reasonCode: string,
  message: string,
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.NotFound,
    message,
    undefined,
    reasonCode,
  );
}

export function conflict(
  reasonCode: string,
  message: string,
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.Conflict,
    message,
    undefined,
    reasonCode,
  );
}

export function unauthorized(
  message: string,
  reasonCode?: string,
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.Unauthorized,
    message,
    undefined,
    reasonCode,
  );
}

export function forbidden(
  message: string,
  reasonCode?: string,
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.Forbidden,
    message,
    undefined,
    reasonCode,
  );
}

export function payloadTooLarge(
  message: string,
  reasonCode = "file_too_large",
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.PayloadTooLarge,
    message,
    undefined,
    reasonCode,
  );
}

export function unsupportedMediaType(
  message: string,
  reasonCode = "unsupported_file_type",
): ApplicationError {
  return new ApplicationError(
    ApplicationErrorCode.UnsupportedMediaType,
    message,
    undefined,
    reasonCode,
  );
}

export function mapDomainError(err: unknown): unknown {
  if (err === null) {
    return null;
  }

  if (!(err instanceof DomainError)) {
    return err;
  }

  switch (err.code) {
    case DomainErrorCode.InvalidInput:
      return new ApplicationError(
        ApplicationErrorCode.InvalidInput,
        err.message,
      );
    case DomainErrorCode.NotFound:
      return new ApplicationError(ApplicationErrorCode.NotFound, err.message);
    case DomainErrorCode.Conflict:
      return new ApplicationError(ApplicationErrorCode.Conflict, err.message);
    default:
      return err;
  }
}
