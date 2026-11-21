import { connection } from "next/server";
import { Suspense, type ReactNode } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { QueryClient } from "@tanstack/react-query";
import { getQueryClient } from "@/lib/presentation/ui/query/get-query-client";

type ServerQueryHydrationProps = {
  fallback: ReactNode;
  prefetch: (queryClient: QueryClient) => Promise<void>;
  children: ReactNode;
};

async function ServerQueryHydrationInner({
  prefetch,
  children,
}: Omit<ServerQueryHydrationProps, "fallback">) {
  await connection();
  const queryClient = getQueryClient();
  await prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}

export function ServerQueryHydration({
  fallback,
  prefetch,
  children,
}: ServerQueryHydrationProps) {
  return (
    <Suspense fallback={fallback}>
      <ServerQueryHydrationInner prefetch={prefetch}>
        {children}
      </ServerQueryHydrationInner>
    </Suspense>
  );
}
