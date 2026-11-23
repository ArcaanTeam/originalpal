"use client";

import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { Button } from "@/lib/presentation/ui/components/ui/button";

const copy = getDictionary().serverError;

export default function ErrorPage({
  _error,
  reset,
}: {
  _error: Error;
  reset: () => void;
}) {
  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <section className="w-full max-w-md space-y-6 rounded-xl border border-border bg-card p-8 text-center">
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[60px] font-bold text-[#b00020]">
            500
          </span>
          <h1 className="text-2xl font-semibold text-[#171717]">
            {copy.title}
          </h1>
        </div>
        <p className="text-sm text-[#2e2c26]">{copy.description}</p>
        <Button onClick={() => reset()} variant="default" className="w-full">
          {copy.homeButton}
        </Button>
      </section>
    </main>
  );
}
