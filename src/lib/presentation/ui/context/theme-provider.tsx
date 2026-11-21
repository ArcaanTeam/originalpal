"use client";

import * as React from "react";
import {
  ThemeProvider as NextThemesProvider,
  useTheme as useNextTheme,
} from "next-themes";

/** next-themes `storageKey` for the light/dark/system preference. */
export const UI_THEME_STORAGE_KEY = "originalpal-ui-theme";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey={UI_THEME_STORAGE_KEY}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}

export function useTheme() {
  const nextTheme = useNextTheme();

  const resetTheme = React.useCallback(() => {
    nextTheme.setTheme("system");
  }, [nextTheme]);

  return {
    ...nextTheme,
    theme: (nextTheme.theme ?? "system") as Theme,
    resetTheme,
  };
}

/** Resolved light/dark; defaults to dark until next-themes hydrates. */
export function useResolvedColorMode(): "light" | "dark" {
  const { resolvedTheme } = useNextTheme();
  return resolvedTheme === "light" ? "light" : "dark";
}

function ThemeColorMeta() {
  const { resolvedTheme } = useNextTheme();

  React.useEffect(() => {
    if (resolvedTheme !== "light" && resolvedTheme !== "dark") {
      return;
    }
    const themeColor = resolvedTheme === "dark" ? "#020817" : "#ffffff";
    const metaThemeColor = document.querySelector("meta[name='theme-color']");
    metaThemeColor?.setAttribute("content", themeColor);
  }, [resolvedTheme]);

  return null;
}

export function ThemeProviderWithMeta({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <ThemeProvider {...props}>
      <ThemeColorMeta />
      {children}
    </ThemeProvider>
  );
}
