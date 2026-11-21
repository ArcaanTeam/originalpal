import { describe, expect, it } from "vitest";
import {
  clearAuthenticatedSession,
  getAuthSession,
  resetAuthSession,
  setAuthenticatedUser,
  setSessionReady,
} from "./session-store";
import { testAuthUser } from "./testSupport";

describe("auth session store", () => {
  it("starts unauthenticated and not ready", () => {
    resetAuthSession();
    expect(getAuthSession()).toEqual({
      sessionReady: false,
      sessionActive: false,
      user: null,
    });
  });

  it("marks an authenticated user", () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);

    expect(getAuthSession()).toEqual({
      sessionReady: true,
      sessionActive: true,
      user: testAuthUser,
    });
  });

  it("clears authenticated session while staying ready", () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);
    clearAuthenticatedSession();

    expect(getAuthSession()).toEqual({
      sessionReady: true,
      sessionActive: false,
      user: null,
    });
  });

  it("can mark session ready without a user", () => {
    resetAuthSession();
    setSessionReady(true);

    expect(getAuthSession()).toMatchObject({
      sessionReady: true,
      sessionActive: false,
      user: null,
    });
  });
});
