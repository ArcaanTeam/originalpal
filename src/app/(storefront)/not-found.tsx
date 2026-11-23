import Link from "next/link";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { Button } from "@/lib/presentation/ui/components/ui/button";

const copy = getDictionary().notFound;

export default function NotFoundPage() {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <section className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[60px] font-bold text-[#b00020]">
            404
          </span>
          <h1 className="text-2xl font-semibold text-[#171717]">
            {copy.title}
          </h1>
        </div>
        <p className="text-sm text-[#2e2c26]">{copy.description}</p>
        <Button asChild variant="default" className="w-full">
          <Link href="/">{copy.homeButton}</Link>
        </Button>
      </section>
    </main>
  );
}
