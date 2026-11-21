import { Skeleton } from "@/lib/presentation/ui/components/ui/skeleton";

export default function FileManagerLoadingUI() {
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

      <section className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed bg-card p-8">
        <Skeleton className="size-12 rounded-full" />
        <Skeleton className="h-4 w-64" />
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-10 w-32 rounded-full" />
      </section>

      <div className="space-y-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="flex items-center justify-between gap-4 border-b border-border/50 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="size-10 rounded-lg" />
              <Skeleton className="h-4 w-40" />
            </div>
            <Skeleton className="h-8 w-24 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
