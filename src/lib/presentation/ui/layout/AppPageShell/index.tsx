import { cn } from "cn";

export interface AppPageShellUIProps {
  children: React.ReactNode;
  /** `shell`: standard page surface. `bare`: no additional page surface. */
  variant?: "shell" | "bare";
}

/**
 * Standard page canvas with an optional inset content surface.
 */
export default function AppPageShellUI({
  children,
  variant = "shell",
}: AppPageShellUIProps) {
  return (
    <div className={cn("flex min-h-svh flex-1 flex-col bg-background")}>
      {variant === "shell" ? (
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col",
            "md:m-4 md:min-h-[calc(100svh-2rem)] md:rounded-xl",
            // Mobile: clear the fixed top bar (h-12) and bottom tabs (h-14).
            "max-md:pt-[calc(3rem+env(safe-area-inset-top,0px))]",
            "max-md:pb-[calc(3.5rem+env(safe-area-inset-bottom,0px)+0.75rem)]",
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
