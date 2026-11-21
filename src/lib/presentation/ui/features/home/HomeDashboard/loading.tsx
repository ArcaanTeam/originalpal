import { Skeleton } from "@/lib/presentation/ui/components/ui/skeleton";

export default function HomeDashboardLoadingUI() {
  return (
    <main
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center px-4 py-10 sm:px-6 sm:py-16"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Skeleton className="mx-auto h-4 w-16 sm:mx-0" />
      <Skeleton className="mt-3 h-9 w-48 sm:w-56" />
      <Skeleton className="mt-3 h-4 w-full max-w-md" />
      <Skeleton className="mt-10 h-4 w-36 sm:mt-12" />
      <Skeleton className="mt-4 h-28 w-full" />
    </main>
  );
}
