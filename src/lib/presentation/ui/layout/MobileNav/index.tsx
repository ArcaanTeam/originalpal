"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "cn";
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Transition,
} from "motion/react";
import type { MobileNavItemId } from "./mobileNavItems";

const TAB_TRANSITION: Transition = { duration: 0.22, ease: [0.33, 1, 0.68, 1] };

export interface MobileNavTabView {
  id: MobileNavItemId;
  href: string;
  label: string;
  icon: ReactNode;
}

export interface MobileNavUIProps {
  ariaLabel: string;
  tabs: MobileNavTabView[];
  activeId: MobileNavItemId | null;
}

/**
 * Bottom tab bar (panel-web's magnetic tabs): the active icon lifts and its
 * label fades in under it.
 */
export default function MobileNavUI(props: MobileNavUIProps) {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : TAB_TRANSITION;

  return (
    <LazyMotion features={domAnimation}>
      <nav
        aria-label={props.ariaLabel}
        className="flex h-14 w-full items-center bg-card px-5"
      >
        <ul className="relative flex w-full items-center justify-around">
          {props.tabs.map((tab) => {
            const isActive = tab.id === props.activeId;
            return (
              <li
                key={tab.id}
                className="relative flex min-w-0 flex-1 justify-center"
              >
                <Link
                  href={tab.href}
                  aria-label={tab.label}
                  aria-current={isActive ? "page" : undefined}
                  className="relative z-10 flex h-14 w-full touch-manipulation flex-col items-center justify-center outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <m.span
                    className={cn(
                      "pointer-events-none relative inline-flex shrink-0 items-center justify-center leading-none [&_svg]:size-5",
                      isActive ? "text-brand" : "text-muted-foreground/70",
                    )}
                    initial={false}
                    animate={{ y: isActive ? -8 : 0 }}
                    transition={transition}
                  >
                    {tab.icon}
                  </m.span>
                </Link>
                <m.span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute bottom-1.5 left-1/2 -translate-x-1/2 text-xs leading-none font-bold tracking-wide whitespace-nowrap",
                    isActive ? "text-brand" : "text-muted-foreground/70",
                  )}
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                  transition={transition}
                >
                  {tab.label}
                </m.span>
              </li>
            );
          })}
        </ul>
      </nav>
    </LazyMotion>
  );
}
