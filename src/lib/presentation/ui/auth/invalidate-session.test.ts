import { afterEach, describe, expect, it, vi } from "vitest";
import { resetSessionInvalidation } from "./invalidate-session";
import { resetAuthSession, setAuthenticatedUser } from "./session-store";
import { testAuthUser } from "./testSupport";

describe("invalidateSession", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    resetAuthSession();
    resetSessionInvalidation();
  });

  it("deduplicates concurrent invalidations", async () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);

    let resolveLogout: (() => void) | undefined;
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveLogout = () => {
            resolve(
              new Response(JSON.stringify({ ok: true }), { status: 200 }),
            );
          };
        }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const { invalidateSession } = await import("./invalidate-session");
    const first = invalidateSession();
    const second = invalidateSession();

    resolveLogout?.();
    await Promise.all([first, second]);

    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
