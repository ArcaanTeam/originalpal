import { ApiUnauthorizedError } from "./api-errors";
import { invalidateSession } from "./invalidate-session";
import { isAuthPublicUrl } from "./is-auth-public-url";
import { refreshAccessToken } from "./refresh-access-token";

type RetriableRequestInit = RequestInit & {
  __retried?: boolean;
};

export async function apiFetch(
  input: RequestInfo | URL,
  init?: RetriableRequestInit,
): Promise<Response> {
  const response = await fetch(input, {
    ...init,
    credentials: "same-origin",
  });

  if (response.status !== 401 || isAuthPublicUrl(input)) {
    return response;
  }

  if (init?.__retried) {
    await invalidateSession();
    throw new ApiUnauthorizedError();
  }

  const refreshed = await refreshAccessToken();
  if (!refreshed) {
    await invalidateSession();
    throw new ApiUnauthorizedError();
  }

  return apiFetch(input, {
    ...init,
    __retried: true,
  });
}
