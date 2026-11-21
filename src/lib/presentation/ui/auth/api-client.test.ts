import { afterEach, describe, expect, it, vi } from "vitest";
import { apiFetch } from "./api-client";
import { resetSessionInvalidation } from "./invalidate-session";
import { resetRefreshAccessToken } from "./refresh-access-token";
import {
  getAuthSession,
  resetAuthSession,
  setAuthenticatedUser,
} from "./session-store";
import { testAuthUser } from "./testSupport";

describe("apiFetch", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    resetAuthSession();
    resetSessionInvalidation();
    resetRefreshAccessToken();
  });

  it("retries once after a successful refresh", async () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify([{ id: "1", title: "Task" }]), {
          status: 200,
        }),
      );
    vi.stubGlobal("fetch", fetchMock);

    const response = await apiFetch("/api/board-columns");

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(fetchMock.mock.calls[1]?.[0]).toBe("/api/auth/refresh");
    expect(getAuthSession().sessionActive).toBe(true);
  });

  it("clears session state when refresh fails", async () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);

    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ ok: true }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(apiFetch("/api/board-columns")).rejects.toMatchObject({
      name: "ApiUnauthorizedError",
    });

    expect(fetchMock.mock.calls[1]?.[0]).toBe("/api/auth/refresh");
    expect(fetchMock.mock.calls[2]?.[0]).toBe("/api/auth/logout");
    expect(getAuthSession()).toEqual({
      sessionReady: true,
      sessionActive: false,
      user: null,
    });
  });

  it("queues concurrent 401s behind a single refresh", async () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);

    let boardCalls = 0;
    const fetchMock = vi.fn((url: string) => {
      if (url === "/api/board-columns") {
        boardCalls += 1;
        if (boardCalls <= 2) {
          return Promise.resolve(new Response(null, { status: 401 }));
        }
        return Promise.resolve(
          new Response(JSON.stringify([]), { status: 200 }),
        );
      }
      if (url === "/api/auth/refresh") {
        return Promise.resolve(
          new Response(JSON.stringify({ ok: true }), { status: 200 }),
        );
      }
      return Promise.resolve(new Response(null, { status: 404 }));
    });
    vi.stubGlobal("fetch", fetchMock);

    const [firstResponse, secondResponse] = await Promise.all([
      apiFetch("/api/board-columns"),
      apiFetch("/api/board-columns"),
    ]);

    expect(firstResponse.status).toBe(200);
    expect(secondResponse.status).toBe(200);
    expect(
      fetchMock.mock.calls.filter(([url]) => url === "/api/auth/refresh"),
    ).toHaveLength(1);
  });

  it("does not invalidate session for public auth endpoints", async () => {
    resetAuthSession();
    setAuthenticatedUser(testAuthUser);

    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const response = await apiFetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username: "admin", password: "wrong" }),
    });

    expect(response.status).toBe(401);
    expect(getAuthSession().sessionActive).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
