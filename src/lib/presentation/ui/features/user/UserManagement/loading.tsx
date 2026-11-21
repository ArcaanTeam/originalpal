import { Skeleton } from "@/lib/presentation/ui/components/ui/skeleton";

export default function UserManagementLoadingUI() {
  return (
    <div
      className="mx-auto flex w-full max-w-4xl flex-col gap-8 p-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <header className="flex flex-col gap-3">
        <Skeleton className="h-4 w-24" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </header>

      <section className="rounded-lg border bg-card p-4">
        <Skeleton className="h-4 w-28" />
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Skeleton className="h-4 w-10" />
          <Skeleton className="h-8 w-14 rounded-md" />
          <Skeleton className="h-8 w-14 rounded-md" />
        </div>
        <Skeleton className="mt-4 h-10 w-28" />
      </section>

      <div className="space-y-3">
        <div className="flex gap-4 border-b pb-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="flex flex-wrap items-center gap-4 border-b border-border/50 py-3 last:border-0"
          >
            <Skeleton className="h-5 w-32" />
            <div className="flex gap-1.5">
              <Skeleton className="h-8 w-14 rounded-md" />
              <Skeleton className="h-8 w-14 rounded-md" />
            </div>
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
}
