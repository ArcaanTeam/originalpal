"use client";

import { cn } from "cn";
import { ChevronDown, Search } from "lucide-react";
import { ContentBreadcrumb, MobilePageHeader } from "./ContentParts";
import { contentCopy } from "./contentCopy";
import type { FaqItem } from "./faqData";

export interface FaqUIProps {
  items: FaqItem[];
  query: string;
  openId: string | null;
  onChangeQuery: (query: string) => void;
  onToggle: (id: string) => void;
}

export default function FaqUI({
  items,
  query,
  openId,
  onChangeQuery,
  onToggle,
}: FaqUIProps) {
  const copy = contentCopy.faq;

  return (
    <div className="pb-8">
      <MobilePageHeader
        title={copy.title}
        backHref="/"
        backLabel="بازگشت به خانه"
      />
      <div className="hidden lg:block">
        <ContentBreadcrumb
          items={[
            { label: contentCopy.breadcrumbRoot, href: "/" },
            { label: copy.breadcrumb },
          ]}
        />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-4 lg:px-8">
        <h1 className="hidden text-[28px] leading-[1.5] font-extrabold lg:block">
          {copy.title}
        </h1>

        <div className="mt-4 flex max-w-[760px] flex-col gap-3">
          <div className="relative">
            <Search
              size={18}
              className="inset-inline-start-3 pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              aria-label={copy.searchLabel}
              placeholder={copy.searchPlaceholder}
              value={query}
              onChange={(event) => onChangeQuery(event.target.value)}
              className="h-11 w-full rounded-lg border border-input bg-white ps-10 pe-4 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
            />
          </div>

          {items.length === 0 ? (
            <p className="rounded-xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
              {copy.empty}
            </p>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => {
                const open = openId === item.id;
                return (
                  <li
                    key={item.id}
                    className="overflow-hidden rounded-xl border border-border bg-white"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => onToggle(item.id)}
                      className="flex min-h-14 w-full items-center gap-3 px-4 py-3 text-start text-[15px] font-semibold"
                    >
                      <span className="flex-1">{item.question}</span>
                      <ChevronDown
                        size={18}
                        className={cn(
                          "shrink-0 text-muted-foreground transition-transform",
                          open && "rotate-180",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                    {open && (
                      <p className="border-t border-border px-4 py-3 text-sm leading-[2] text-muted-foreground">
                        {item.answer}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
