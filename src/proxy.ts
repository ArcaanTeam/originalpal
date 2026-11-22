import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify, type JWTPayload } from "jose";
import {
  getPermissionsForRole,
  hasAnyPermission,
} from "@/lib/domain/auth/permission";
import { isAppRole, type AppRole } from "@/lib/domain/auth/role";
import {
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_TYPE,
} from "@/lib/infrastructure/auth/constants";
import {
  getApiRoutePermissions,
  getPageRoutePermissions,
} from "@/lib/presentation/auth/route-permissions";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/store",
  "/categories",
  "/deals",
  "/category",
  "/search",
  "/compare",
  "/product",
  "/reviews",
  "/cart",
  "/checkout",
  "/magazine",
  "/contact",
  "/faq",
  "/pages",
  "/api/auth/login",
  "/api/auth/refresh",
];

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}

function getSecretKey(secret: string): Uint8Array {
  return Uint8Array.from(new TextEncoder().encode(secret));
}

interface VerifiedSession {
  sub: string;
  username: string;
  sid: string;
  role: AppRole;
}

function parseSession(payload: JWTPayload): VerifiedSession | null {
  if (
    typeof payload.sub !== "string" ||
    typeof payload.username !== "string" ||
    typeof payload.sid !== "string" ||
    payload.typ !== ACCESS_TOKEN_TYPE ||
    !isAppRole(payload.role)
  ) {
    return null;
  }

  return {
    sub: payload.sub,
    username: payload.username,
    sid: payload.sid,
    role: payload.role,
  };
}

async function verifySessionCookie(
  token: string,
): Promise<VerifiedSession | null> {
  const secret = process.env.JWT_SECRET;
  const issuer = process.env.JWT_ISSUER ?? "originalpal-auth";

  if (!secret || secret.length < 32) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecretKey(secret), {
      issuer,
    });
    return parseSession(payload);
  } catch {
    return null;
  }
}

function isRouteAllowed(pathname: string, session: VerifiedSession): boolean {
  const pagePermissions = getPageRoutePermissions(pathname);
  const apiPermissions = pathname.startsWith("/api/")
    ? getApiRoutePermissions(pathname)
    : null;
  const required = pagePermissions ?? apiPermissions;

  if (!required || required.length === 0) {
    return true;
  }

  const permissions = getPermissionsForRole(session.role);
  return hasAnyPermission(permissions, required);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next/") || pathname.startsWith("/favicon.ico")) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  const session = token ? await verifySessionCookie(token) : null;

  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname === "/403") {
    return NextResponse.next();
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  if (!session) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          error: "Unauthorized",
          code: "UNAUTHORIZED",
          message: "login required",
        },
        { status: 401 },
      );
    }

    if (refreshToken) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isRouteAllowed(pathname, session)) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json(
        {
          error: "Forbidden",
          code: "FORBIDDEN",
          message: "insufficient permissions",
        },
        { status: 403 },
      );
    }

    return NextResponse.redirect(new URL("/403", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
