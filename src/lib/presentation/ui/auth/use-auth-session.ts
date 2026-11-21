"use client";

import { useSyncExternalStore } from "react";
import {
  getAuthSession,
  subscribeAuthSession,
  type AuthSessionState,
} from "./session-store";

export function useAuthSession(): AuthSessionState {
  return useSyncExternalStore(
    subscribeAuthSession,
    getAuthSession,
    getAuthSession,
  );
}
