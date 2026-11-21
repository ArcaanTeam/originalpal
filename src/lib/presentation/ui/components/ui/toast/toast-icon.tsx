import { useEffect, useRef, useState } from "react";
import { cn } from "cn";
import { type LucideIcon } from "lucide-react";

const RADIUS = 14;

interface ToastIconProps {
  colorClass: string;
  bg: string;
  duration: number;
  Icon: LucideIcon;
  className?: string;
}

export function ToastIcon({
  colorClass,
  bg,
  duration,
  Icon,
  className,
}: ToastIconProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const showProgress = Number.isFinite(duration) && duration > 0;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const parent = container.closest("[data-sonner-toast]");
    if (!parent) return;

    const handleMouseEnter = () => setPaused(true);
    const handleMouseLeave = () => setPaused(false);

    parent.addEventListener("mouseenter", handleMouseEnter);
    parent.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      parent.removeEventListener("mouseenter", handleMouseEnter);
      parent.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      className={cn(
        "relative size-8 shrink-0 rounded-full",
        "max-md:size-6",
        bg,
        colorClass,
        className,
      )}
      ref={containerRef}
    >
      <svg className="h-full w-full" height={32} viewBox="0 0 32 32" width={32}>
        <circle
          cx="16"
          cy="16"
          fill="none"
          opacity={0.2}
          r={RADIUS}
          stroke="currentColor"
          strokeWidth={2}
        />
        {showProgress ? (
          <circle
            className={cn(
              "toast-progress-ring",
              paused && "toast-progress-ring--paused",
            )}
            cx="16"
            cy="16"
            fill="none"
            r={RADIUS}
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth={2}
            style={{ animationDuration: `${duration}ms` }}
            transform="rotate(-90 16 16)"
          />
        ) : null}
      </svg>

      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className="size-3.75 max-md:size-3" />
      </div>
    </div>
  );
}
