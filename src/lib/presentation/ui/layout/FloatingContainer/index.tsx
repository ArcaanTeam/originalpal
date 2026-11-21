import type { ComponentPropsWithoutRef } from "react";
import { cn } from "cn";

/**
 * Fixed mobile chrome (ported from panel-web): a top bar or a bottom bar with
 * the frosted `bg-card-chrome` veil, safe-area padding, hidden from `md` up.
 */
const variants = {
  header: cn(
    "fixed inset-x-0 top-0 isolate z-50 overflow-hidden md:hidden",
    "pr-[env(safe-area-inset-right,0px)] pl-[env(safe-area-inset-left,0px)]",
    "border-b border-border bg-card-chrome pt-[env(safe-area-inset-top,0px)] backdrop-blur-xl backdrop-saturate-150",
  ),
  footer: cn(
    "fixed inset-x-0 bottom-0 isolate z-50 overflow-hidden md:hidden",
    "pr-[env(safe-area-inset-right,0px)] pl-[env(safe-area-inset-left,0px)]",
    "border-t border-border bg-card-chrome pb-[env(safe-area-inset-bottom,0px)] backdrop-blur-xl backdrop-saturate-150",
  ),
} as const;

export type FloatingContainerUIProps =
  | ({ variant: "header" } & ComponentPropsWithoutRef<"header">)
  | ({ variant: "footer" } & ComponentPropsWithoutRef<"footer">);

export default function FloatingContainerUI(props: FloatingContainerUIProps) {
  if (props.variant === "footer") {
    const { variant, className, ...rest } = props;
    return <footer className={cn(variants[variant], className)} {...rest} />;
  }
  const { variant, className, ...rest } = props;
  return <header className={cn(variants[variant], className)} {...rest} />;
}
