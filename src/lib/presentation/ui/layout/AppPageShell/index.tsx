import { cn } from "cn";
import {
  APP_LIQUID_GLASS_SHELL_CLASS,
  APP_LIQUID_GLASS_SHELL_DATA,
  APP_PAGE_GLOW_CLASS,
} from "@/lib/presentation/ui/layout/liquid-glass";

export interface AppPageShellUIProps {
  children: React.ReactNode;
  /** `shell`: inset liquid glass panel (desktop). `bare`: page light only (login, errors). */
  variant?: "shell" | "bare";
}

/**
 * Page canvas: ambient brand light behind a liquid glass content shell, the
 * panel-web dashboard look without the sidebar. On mobile the shell drops
 * away and surfaces turn into veils over the light.
 */
export default function AppPageShellUI({
  children,
  variant = "shell",
}: AppPageShellUIProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-1 flex-col bg-background",
        APP_PAGE_GLOW_CLASS,
      )}
    >
      {variant === "shell" ? (
        <div
          data-liquid-glass-shell={APP_LIQUID_GLASS_SHELL_DATA}
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            "md:m-4 md:min-h-[calc(100svh-2rem)] md:rounded-xl",
            // Mobile: clear the fixed top bar (h-12) and bottom tabs (h-14).
            "max-md:pt-[calc(3rem+env(safe-area-inset-top,0px))]",
            "max-md:pb-[calc(3.5rem+env(safe-area-inset-bottom,0px)+0.75rem)]",
            APP_LIQUID_GLASS_SHELL_CLASS,
          )}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
