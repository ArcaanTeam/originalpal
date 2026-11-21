import type { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | undefined;

export function registerAuthQueryClient(client: QueryClient): void {
  queryClient = client;
}

export function clearAuthQueryClient(): void {
  queryClient?.clear();
}
