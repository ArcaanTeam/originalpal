"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import {
  MobileBottomNav,
  StoreFooter,
  StoreHeader,
} from "@/lib/presentation/ui/features/storefront/StorefrontHome/StorefrontHomeUI";

/**
 * Storefront shell shared by every storefront page.
 *
 * Layout contract:
 * - `StoreHeader` is `sticky top-0` so it stays in view while scrolling.
 * - The content area fills the remaining viewport (`flex-1`) so the footer is
 *   always pinned to the bottom when content is short, and scrolled into view
 *   when content is long.
 * - Content starts below the sticky header (`padding-top: var(--header-height)`)
 *   where `--header-height` is measured from the real (mobile/desktop) header
 *   node, so it stays correct across breakpoints.
 */
export default function StorefrontLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () =>
      setHeaderHeight(headerRef.current?.getBoundingClientRect().height || 0);

    measure();
    const observer = new ResizeObserver(measure);
    if (headerRef.current) {
      observer.observe(headerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        className="flex min-h-[100dvh] flex-col bg-background"
        style={
          {
            "--header-height": `${headerHeight}px`,
          } as unknown as CSSProperties
        }
      >
        <div ref={headerRef} className="sticky top-0 z-40">
          <StoreHeader />
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto pt-[var(--header-height)]">
          {children}
        </div>
        <StoreFooter />
      </div>
      <MobileBottomNav />
    </>
  );
}
