import { describe, expect, it, vi } from "vitest";
import { ApplicationErrorCode } from "@/lib/application/errors";
import {
  loginHandler,
  logoutHandler,
  meHandler,
  refreshHandler,
} from "./controller";

const authResult = {
  accessToken: "jwt-token",
  expiresAt: new Date("2026-01-01T00:15:00.000Z"),
  refreshToken: "refresh-token",
  refreshExpiresAt: new Date("2026-02-01T00:00:00.000Z"),
  sessionId: "session-1",
  user: {
    id: "user-1",
    username: "admin",
    role: "Admin" as const,
    permissions: ["users:manage"],
  },
};

function jsonRequest(
  body?: unknown,
  url = "http://localhost/api/auth/login",
): Request {
  return new Request(url, {
    method: "POST",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
}

describe("auth controller", () => {
  it("logs in and sets auth cookies", async () => {
    const login = vi.fn().mockResolvedValue(authResult);
    const deps = {
      login,
      refresh: vi.fn(),
      logout: vi.fn(),
    };

    const response = await loginHandler(
      deps,
      jsonRequest({
        username: "admin",
        password: "Secret1!",
      }),
    );
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.user.username).toBe("admin");
    expect(response.headers.getSetCookie().join(";")).toContain(
      "originalpal_access_token=",
    );
    expect(response.headers.getSetCookie().join(";")).toContain(
      "originalpal_refresh_token=",
    );
  });

  it("refreshes tokens from the refresh cookie", async () => {
    const refresh = vi.fn().mockResolvedValue(authResult);
    const request = new Request("http://localhost/api/auth/refresh", {
      method: "POST",
      headers: {
        cookie: "originalpal_refresh_token=refresh-token",
      },
    });

    const response = await refreshHandler(
      { login: vi.fn(), refresh, logout: vi.fn() },
      request,
    );

    expect(response.status).toBe(200);
    expect(refresh).toHaveBeenCalledWith({ refreshToken: "refresh-token" });
  });

  it("clears auth cookies on logout", async () => {
    const response = await logoutHandler(
      { login: vi.fn(), refresh: vi.fn(), logout: vi.fn() },
      new Request("http://localhost/api/auth/logout", { method: "POST" }),
    );

    const cookies = response.headers.getSetCookie().join(";");
    expect(cookies).toContain("Max-Age=0");
    expect(cookies).toContain("originalpal_refresh_token=");
  });

  it("returns 400 for invalid login input", async () => {
    const response = await loginHandler(
      { login: vi.fn(), refresh: vi.fn(), logout: vi.fn() },
      jsonRequest({ username: "", password: "" }),
    );
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.code).toBe(ApplicationErrorCode.ValidationError);
  });

  it("returns the current user session", async () => {
    const response = await meHandler(
      {
        userRepository: {
          findById: vi.fn().mockResolvedValue({
            id: "user-1",
            username: "admin",
            passwordHash: "hash",
            role: "Admin",
            createdAt: new Date("2026-01-01T00:00:00.000Z"),
          }),
          findByUsername: vi.fn(),
          listAll: vi.fn(),
          updateRole: vi.fn(),
          deleteById: vi.fn(),
          save: vi.fn(),
        },
      },
      {
        sub: "user-1",
        username: "stale-admin",
        sid: "session-1",
        role: "Admin",
        expiresAt: new Date("2026-01-01T00:15:00.000Z"),
      },
    );
    const body = await response.json();

    expect(body).toEqual({
      id: "user-1",
      username: "admin",
      role: "Admin",
      permissions: expect.arrayContaining(["users:manage"]),
    });
  });

  it("returns 401 when session is missing", async () => {
    const response = await meHandler(
      {
        userRepository: {
          findById: vi.fn(),
          findByUsername: vi.fn(),
          listAll: vi.fn(),
          updateRole: vi.fn(),
          deleteById: vi.fn(),
          save: vi.fn(),
        },
      },
      null,
    );
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body.code).toBe(ApplicationErrorCode.Unauthorized);
  });
});
