"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { invalidateSession } from "./invalidate-session";

export interface UseLogoutReturn {
  logout: () => Promise<void>;
  isPending: boolean;
}

export function useLogout(): UseLogoutReturn {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const logout = useCallback(async () => {
    setIsPending(true);
    try {
      await invalidateSession();
      router.replace("/login");
      router.refresh();
    } finally {
      setIsPending(false);
    }
  }, [router]);

  return { logout, isPending };
}
