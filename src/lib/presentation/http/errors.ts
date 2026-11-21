import { NextResponse } from "next/server";
import {
  ApplicationError,
  ApplicationErrorCode,
  mapDomainError,
} from "@/lib/application/errors";
import { apiLogger } from "@/lib/infrastructure/logging/apiLogger";

export interface ErrorBody {
  error: string;
  code?: string;
  reason?: string;
  message?: string;
  errors?: Array<{
    field: string;
    code: string;
    message: string;
  }>;
}

function isError(value: unknown): value is Error {
  return value instanceof Error;
}

function errorMessage(err: unknown): string {
  if (isError(err)) {
    return err.message;
  }
  if (typeof err === "string") {
    return err;
  }
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function statusFor(err: unknown): number {
  const mapped = mapDomainError(err);
  if (!(mapped instanceof ApplicationError)) {
    return 500;
  }

  switch (mapped.code) {
    case ApplicationErrorCode.ValidationError:
    case ApplicationErrorCode.InvalidInput:
    case ApplicationErrorCode.BadRequest:
      return 400;
    case ApplicationErrorCode.Unauthorized:
      return 401;
    case ApplicationErrorCode.Forbidden:
      return 403;
    case ApplicationErrorCode.NotFound:
      return 404;
    case ApplicationErrorCode.Conflict:
      return 409;
    case ApplicationErrorCode.PayloadTooLarge:
      return 413;
    case ApplicationErrorCode.UnsupportedMediaType:
      return 415;
    default:
      return 500;
  }
}

function logHttpError(err: unknown, status: number): void {
  const message = errorMessage(err);
  if (err instanceof ApplicationError) {
    apiLogger.error(`[HTTP ${status}] ${err.code}: ${message}`);
    return;
  }

  if (isError(err)) {
    apiLogger.error(`[HTTP ${status}] ${message}`, err);
    return;
  }

  apiLogger.error(`[HTTP ${status}]`, err);
}

export function writeError(err: unknown): NextResponse<ErrorBody> {
  const mapped = mapDomainError(err);
  const status = statusFor(mapped);
  const body: ErrorBody = {
    error: "Request failed",
  };

  if (mapped instanceof ApplicationError) {
    body.code = mapped.code;
    body.reason = mapped.reasonCode;
    body.message = mapped.message;
    body.error = mapped.message || body.error;
    if (mapped.violations?.length) {
      body.errors = mapped.violations;
    }
  } else if (process.env.NODE_ENV === "development") {
    body.message = errorMessage(mapped);
  }

  logHttpError(mapped, status);

  return NextResponse.json(body, { status });
}
