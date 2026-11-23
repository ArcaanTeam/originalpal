import Link from "next/link";
import { cn } from "cn";
import { BookOpen, ChevronLeft } from "lucide-react";
import type { Article, ArticleTag } from "./contentData";

const tagColors: Record<ArticleTag, string> = {
  "راهنمای خرید": "bg-[#e3f1f0] text-primary",
  "نقد و بررسی": "bg-[#f5ead6] text-[#7a5a1e]",
  آموزش: "bg-[#e9edf3] text-[#334a68]",
  "اخبار فناوری": "bg-[#eee8e5] text-[#5c4438]",
};

const thumbnailColors = [
  "bg-[#e3f1f0]",
  "bg-[#f5ead6]",
  "bg-[#e9edf3]",
  "bg-[#eee8e5]",
];

export function TagBadge({ tag }: { tag: ArticleTag }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-full px-2.5 text-xs font-semibold",
        tagColors[tag],
      )}
    >
      {tag}
    </span>
  );
}

export function ArticleMeta({
  article,
  readTimeLabel,
}: {
  article: Article;
  readTimeLabel: string;
}) {
  return (
    <p className="text-xs leading-[1.7] text-muted-foreground">
      {article.author} · {article.date} ·{" "}
      {article.readMinutes.toLocaleString("fa-IR")} {readTimeLabel}
    </p>
  );
}

export function ArticleThumbnail({
  index,
  className,
  size = 38,
}: {
  index: number;
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "grid place-items-center",
        thumbnailColors[index % thumbnailColors.length],
        className,
      )}
    >
      <BookOpen size={size} strokeWidth={1.2} className="text-primary/60" />
    </div>
  );
}

export function ArticleCard({
  article,
  index,
  readTimeLabel,
  preview,
}: {
  article: Article;
  index: number;
  readTimeLabel: string;
  preview?: boolean;
}) {
  return (
    <Link
      href={`/magazine/${article.slug}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <ArticleThumbnail index={index} className="h-[170px] w-full" />
      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="self-start">
          <TagBadge tag={article.tag} />
        </span>
        <h3 className="line-clamp-2 text-base leading-[1.8] font-bold group-hover:text-primary">
          {article.title}
        </h3>
        {preview && article.excerpt && (
          <p className="line-clamp-2 text-sm leading-[1.9] text-muted-foreground">
            {article.excerpt}
          </p>
        )}
        <span className="mt-auto">
          <ArticleMeta article={article} readTimeLabel={readTimeLabel} />
        </span>
      </div>
    </Link>
  );
}

export function ContentBreadcrumb({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav
      aria-label="مسیر صفحه"
      className="mx-auto w-full max-w-[1280px] px-4 pt-4 text-[13px] leading-[1.8] text-muted-foreground lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function MobilePageHeader({
  title,
  backHref,
  backLabel,
}: {
  title: string;
  backHref: string;
  backLabel: string;
}) {
  return (
    <header className="flex items-center gap-1 bg-primary px-2 py-2 text-primary-foreground lg:hidden">
      <Link
        href={backHref}
        aria-label={backLabel}
        className="grid size-11 place-items-center rounded-lg"
      >
        <ChevronLeft size={22} />
      </Link>
      <p className="flex-1 text-lg font-bold">{title}</p>
    </header>
  );
}
