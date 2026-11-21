"use client";

import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";
import { useAuthSession } from "./use-auth-session";

function isProtectedPath(pathname: string): boolean {
  return pathname !== "/login";
}

function AuthSessionRedirectGuardInner() {
  const router = useRouter();
  const pathname = usePathname();
  const { sessionActive, sessionReady } = useAuthSession();
  const previousSessionActiveRef = useRef<boolean | null>(null);

  useEffect(() => {
    if (!sessionReady) {
      return;
    }

    const previous = previousSessionActiveRef.current;
    previousSessionActiveRef.current = sessionActive;

    if (
      previous === true &&
      sessionActive === false &&
      isProtectedPath(pathname)
    ) {
      const loginUrl = new URL("/login", window.location.origin);
      loginUrl.searchParams.set("redirectTo", pathname);
      router.replace(loginUrl.pathname + loginUrl.search);
    }
  }, [pathname, router, sessionActive, sessionReady]);

  return null;
}

export function AuthSessionRedirectGuard() {
  return (
    <Suspense fallback={null}>
      <AuthSessionRedirectGuardInner />
    </Suspense>
  );
}
