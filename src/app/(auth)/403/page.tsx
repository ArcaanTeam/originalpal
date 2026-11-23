import Link from "next/link";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { Button } from "@/lib/presentation/ui/components/ui/button";

const copy = getDictionary().forbidden;

export default function ForbiddenPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <section
        className={`w-full max-w-md space-y-4 rounded-xl bg-card p-8 text-center`}
      >
        <h1 className="text-2xl font-semibold">{copy.title}</h1>
        <p className="text-sm text-muted-foreground">{copy.description}</p>
        <Button asChild>
          <Link href="/">بازگشت</Link>
        </Button>
      </section>
    </main>
  );
}
