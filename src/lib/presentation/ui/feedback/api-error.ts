export interface ApiFieldViolation {
  field: string;
  code: string;
  message: string;
}

export interface ApiErrorBody {
  error?: string;
  code?: string;
  reason?: string;
  message?: string;
  errors?: ApiFieldViolation[];
}

export class ApiClientError extends Error {
  readonly body: ApiErrorBody;

  constructor(body: ApiErrorBody) {
    super(body.message ?? body.error ?? "Request failed");
    this.name = "ApiClientError";
    this.body = body;
  }
}

export async function parseApiErrorBody(
  response: Response,
): Promise<ApiErrorBody> {
  try {
    return (await response.json()) as ApiErrorBody;
  } catch {
    return {
      error: "Request failed",
      message: response.statusText || "Request failed",
      code: String(response.status),
    };
  }
}
