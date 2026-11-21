"use client";

import { Suspense } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthSessionBootstrap } from "@/lib/presentation/ui/auth/AuthSessionBootstrap";
import { AuthSessionRedirectGuard } from "@/lib/presentation/ui/auth/AuthSessionRedirectGuard";
import { Toaster } from "@/lib/presentation/ui/components/ui/toast/toaster";
import { TooltipProvider } from "@/lib/presentation/ui/components/ui/tooltip";
import { ThemeProviderWithMeta } from "@/lib/presentation/ui/context/theme-provider";
import AppHeader from "@/lib/presentation/ui/layout/AppHeader/AppHeader";
import { getQueryClient } from "@/lib/presentation/ui/query/get-query-client";

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient();

  return (
    <ThemeProviderWithMeta>
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <AuthSessionBootstrap />
          <AuthSessionRedirectGuard />
          <Suspense fallback={null}>
            <AppHeader />
          </Suspense>
          {children}
          <Toaster />
          {process.env.NODE_ENV === "development" && (
            <ReactQueryDevtools initialIsOpen={false} />
          )}
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProviderWithMeta>
  );
}
