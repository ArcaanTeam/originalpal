"use client";

import { useEffect } from "react";
import { refreshAccessToken } from "./refresh-access-token";
import {
  clearAuthenticatedSession,
  getAuthSessionEpoch,
  setAuthenticatedUser,
  setSessionReady,
  type AuthUser,
} from "./session-store";

function isAuthUser(value: unknown): value is AuthUser {
  if (!value || typeof value !== "object") {
    return false;
  }

  const user = value as Record<string, unknown>;
  return (
    typeof user.id === "string" &&
    typeof user.username === "string" &&
    typeof user.role === "string" &&
    Array.isArray(user.permissions)
  );
}

async function loadCurrentUser(): Promise<AuthUser | null> {
  const response = await fetch("/api/auth/me", {
    credentials: "same-origin",
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      return null;
    }

    const retryResponse = await fetch("/api/auth/me", {
      credentials: "same-origin",
    });
    if (retryResponse.status === 401 || !retryResponse.ok) {
      return null;
    }

    const user = await retryResponse.json();
    return isAuthUser(user) ? user : null;
  }

  if (!response.ok) {
    return null;
  }

  const user = await response.json();
  return isAuthUser(user) ? user : null;
}

export function AuthSessionBootstrap() {
  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const seenEpoch = getAuthSessionEpoch();

      try {
        const user = await loadCurrentUser();
        if (cancelled || getAuthSessionEpoch() !== seenEpoch) {
          return;
        }

        if (!user) {
          clearAuthenticatedSession();
          return;
        }

        setAuthenticatedUser(user);
      } catch (error) {
        console.error("failed to bootstrap auth session", error);
        if (!cancelled && getAuthSessionEpoch() === seenEpoch) {
          clearAuthenticatedSession();
        }
      } finally {
        if (!cancelled && getAuthSessionEpoch() === seenEpoch) {
          setSessionReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
