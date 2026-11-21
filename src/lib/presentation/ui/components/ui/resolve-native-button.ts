import * as React from "react";

/**
 * Base UI `nativeButton` must match the real DOM tag of `render` / asChild.
 * Host `<button>` → true; anything else (Link, custom components, span, …) → false.
 * Render callbacks are treated as non-native (caller should pass `nativeButton` explicitly if needed).
 */
export function resolveNativeButton(
  nativeButton: boolean | undefined,
  render:
    React.ReactElement | ((...args: never[]) => React.ReactNode) | undefined,
): boolean | undefined {
  if (nativeButton !== undefined) return nativeButton;
  if (render == null) return undefined;
  if (typeof render === "function") return false;
  if (typeof render.type === "string") {
    return render.type === "button";
  }
  // Custom components (e.g. TanStack `Link`) are not host buttons.
  return false;
}
