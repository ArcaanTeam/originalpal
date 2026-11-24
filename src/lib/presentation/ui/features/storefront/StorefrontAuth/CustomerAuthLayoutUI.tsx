"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronRight } from "lucide-react";
import { customerAuthCopy } from "./customerAuthCopy";

/**
 * Standalone storefront auth canvas: the design shows a slim brand header on
 * desktop and a back/title bar on mobile, plus a dark copyright strip.
 *
 * Layout contract:
 * - Header is `sticky top-0` so it stays in view while scrolling.
 * - Outer canvas is `min-h-screen` so the footer is pinned to the bottom on
 *   short pages and scrolled into view on long ones.
 * - Content starts below the sticky header (`padding-top: var(--header-height)`)
 *   where `--header-height` is measured from the real header node.
 */
export default function CustomerAuthLayoutUI({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isVerify = pathname === "/account/login/verify";
  const { layout } = customerAuthCopy;
  const title = isVerify ? layout.verifyTitle : layout.loginTitle;
  const backHref = isVerify ? "/account/login" : "/";

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

  const headerStyle: CSSProperties = {
    "--header-height": `${headerHeight}px`,
  } as unknown as CSSProperties;

  return (
    <div
      className="flex min-h-screen flex-col bg-background"
      style={headerStyle}
    >
      <header
        ref={headerRef}
        className="sticky top-0 z-40 bg-primary text-primary-foreground"
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center gap-4 px-4 sm:px-6">
          <Link
            href={backHref}
            aria-label={layout.back}
            className="-ms-2 grid size-11 place-items-center rounded-lg lg:hidden"
          >
            <ChevronRight size={22} />
          </Link>
          <Link
            href="/"
            className="hidden items-center gap-2 py-4 text-xl font-extrabold lg:inline-flex"
          >
            <span className="size-2.5 rounded-sm bg-accent" />
            {customerAuthCopy.brand}
          </Link>
          <p className="flex-1 py-3 text-base font-bold lg:hidden">{title}</p>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto pt-[var(--header-height)]">
        {children}
      </div>
      <footer className="mt-10 bg-foreground px-4 py-5 text-center text-xs text-white/70">
        {customerAuthCopy.footer}
      </footer>
    </div>
  );
}
