import type { PermissionKey } from "@/lib/domain/auth/permission";
import type { AppRole } from "@/lib/domain/auth/role";

export interface AuthUser {
  id: string;
  username: string;
  role: AppRole;
  permissions: PermissionKey[];
}

export interface AuthSessionState {
  sessionReady: boolean;
  sessionActive: boolean;
  user: AuthUser | null;
}

type AuthSessionListener = (state: AuthSessionState) => void;

const initialState: AuthSessionState = {
  sessionReady: false,
  sessionActive: false,
  user: null,
};

let state: AuthSessionState = initialState;
let epoch = 0;
const listeners = new Set<AuthSessionListener>();

export function getAuthSession(): AuthSessionState {
  return state;
}

export function getAuthSessionEpoch(): number {
  return epoch;
}

export function subscribeAuthSession(
  listener: AuthSessionListener,
): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function emit(nextState: AuthSessionState): void {
  state = nextState;
  for (const listener of listeners) {
    listener(state);
  }
}

export function resetAuthSession(): void {
  epoch += 1;
  emit(initialState);
}

export function setSessionReady(sessionReady: boolean): void {
  emit({ ...state, sessionReady });
}

export function setAuthenticatedUser(user: AuthUser): void {
  epoch += 1;
  emit({
    ...state,
    sessionReady: true,
    sessionActive: true,
    user,
  });
}

export function clearAuthenticatedSession(): void {
  epoch += 1;
  emit({
    ...state,
    sessionReady: true,
    sessionActive: false,
    user: null,
  });
}
