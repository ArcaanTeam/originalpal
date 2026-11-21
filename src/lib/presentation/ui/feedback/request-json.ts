import { apiFetch } from "@/lib/presentation/ui/auth/api-client";
import {
  ApiClientError,
  parseApiErrorBody,
} from "@/lib/presentation/ui/feedback/api-error";
import { showErrorToast } from "@/lib/presentation/ui/feedback/show-feedback";

export interface RequestJsonOptions {
  toastOnError?: boolean;
}

export async function requestJson<T>(
  input: RequestInfo | URL,
  init?: RequestInit,
  options: RequestJsonOptions = {},
): Promise<T> {
  const { toastOnError = true } = options;
  const response = await apiFetch(input, init);

  if (!response.ok) {
    const body = await parseApiErrorBody(response);
    if (toastOnError) {
      showErrorToast(body);
    }
    throw new ApiClientError(body);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function requestText(
  input: RequestInfo | URL,
  init?: RequestInit,
  options: RequestJsonOptions = {},
): Promise<string> {
  const { toastOnError = true } = options;
  const response = await apiFetch(input, init);

  if (!response.ok) {
    const body = await parseApiErrorBody(response);
    if (toastOnError) {
      showErrorToast(body);
    }
    throw new ApiClientError(body);
  }

  return response.text();
}
