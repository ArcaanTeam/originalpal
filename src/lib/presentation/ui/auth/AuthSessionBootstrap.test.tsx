import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AuthSessionBootstrap } from "./AuthSessionBootstrap";
import {
  getAuthSession,
  resetAuthSession,
  setAuthenticatedUser,
} from "./session-store";
import { testAuthUser } from "./testSupport";

describe("AuthSessionBootstrap", () => {
  afterEach(() => {
    resetAuthSession();
    vi.unstubAllGlobals();
  });

  it("keeps a session that was established while the initial check is in flight", async () => {
    resetAuthSession();

    let resolveMe: ((response: Response) => void) | undefined;
    const mePromise = new Promise<Response>((resolve) => {
      resolveMe = resolve;
    });

    vi.stubGlobal(
      "fetch",
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.includes("/api/auth/me")) {
          return mePromise;
        }
        return Promise.resolve(new Response(null, { status: 401 }));
      }),
    );

    render(<AuthSessionBootstrap />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    setAuthenticatedUser(testAuthUser);
    resolveMe?.(new Response(null, { status: 401 }));

    await waitFor(() => {
      expect(getAuthSession().sessionReady).toBe(true);
    });

    expect(getAuthSession().sessionActive).toBe(true);
    expect(getAuthSession().user).toEqual(testAuthUser);
  });
});
