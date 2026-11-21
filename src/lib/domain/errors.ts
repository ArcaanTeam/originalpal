import "server-only";

export enum DomainErrorCode {
  InvalidInput = "INVALID_INPUT",
  NotFound = "NOT_FOUND",
  Conflict = "CONFLICT",
}

export class DomainError extends Error {
  readonly code: DomainErrorCode;

  constructor(code: DomainErrorCode, message: string) {
    super(message);
    this.name = "DomainError";
    this.code = code;
  }
}

export function invalidInput(message: string): DomainError {
  return new DomainError(DomainErrorCode.InvalidInput, message);
}

export function notFound(message: string): DomainError {
  return new DomainError(DomainErrorCode.NotFound, message);
}

export function conflict(message: string): DomainError {
  return new DomainError(DomainErrorCode.Conflict, message);
}
