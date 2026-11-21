"use client";

/* eslint-disable react-hooks/set-state-in-effect -- mount gate for hydration-safe client-only UI */
import { useEffect, useState } from "react";

/** False on SSR and the first client render; true after mount (stable hydration). */
export function useClientMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
