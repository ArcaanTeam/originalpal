import { cn } from "cn";
import {
  Cable,
  Headphones,
  Smartphone,
  Tablet,
  type LucideIcon,
} from "lucide-react";
import type { Illustration } from "./accountData";

const illustrationIcons: Record<Illustration, LucideIcon> = {
  phone: Smartphone,
  headphones: Headphones,
  tablet: Tablet,
  cable: Cable,
};

export function ProductThumbnail({
  illustration,
  className,
  iconSize = 30,
}: {
  illustration: Illustration;
  className?: string;
  iconSize?: number;
}) {
  const Icon = illustrationIcons[illustration];
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon size={iconSize} strokeWidth={1.3} />
    </span>
  );
}

const badgeTones = {
  accent: "bg-accent text-accent-foreground",
  success: "bg-[#e4f3ea] text-[#14633b]",
  primary: "bg-primary-soft text-primary",
  danger: "bg-[#fdecea] text-destructive",
} as const;

export function StatusBadge({
  children,
  tone = "primary",
}: {
  children: React.ReactNode;
  tone?: keyof typeof badgeTones;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold whitespace-nowrap",
        badgeTones[tone],
      )}
    >
      {children}
    </span>
  );
}

export function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "rounded-xl border border-border bg-white p-4 sm:p-5",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
      {children}
    </p>
  );
}
