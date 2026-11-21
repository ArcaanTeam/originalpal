import { clearAuthQueryClient } from "./query-client-registry";
import { clearAuthenticatedSession } from "./session-store";

let invalidationInFlight: Promise<void> | null = null;

async function revokeSessionCookie(): Promise<void> {
  await fetch("/api/auth/logout", {
    method: "POST",
    credentials: "same-origin",
  });
}

export async function invalidateSession(): Promise<void> {
  if (!invalidationInFlight) {
    invalidationInFlight = (async () => {
      try {
        await revokeSessionCookie();
      } catch {
        // Still clear local session state if logout fails (network, etc.).
      }

      clearAuthenticatedSession();
      clearAuthQueryClient();
    })().finally(() => {
      invalidationInFlight = null;
    });
  }

  return invalidationInFlight;
}

export function resetSessionInvalidation(): void {
  invalidationInFlight = null;
}
