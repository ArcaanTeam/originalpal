"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { cn } from "cn";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { formatIdentifier } from "../StorefrontAccount/accountData";
import {
  ArticleCard,
  ArticleMeta,
  ArticleThumbnail,
  TagBadge,
} from "./ContentParts";
import { contentCopy } from "./contentCopy";
import {
  ARTICLES_PER_PAGE,
  articleTags,
  type Article,
  type ArticleTag,
} from "./contentData";

export type TagFilter = ArticleTag | "all";

export interface BlogListUIProps {
  featured: Article;
  articles: Article[];
  tag: TagFilter;
  page: number;
  visibleCount: number;
  totalPages: number;
  newsletterEmail: string;
  newsletterNotice: string | null;
  newsletterInvalid: boolean;
  onChangeTag: (tag: TagFilter) => void;
  onChangePage: (page: number) => void;
  onClickLoadMore: () => void;
  onChangeNewsletterEmail: (email: string) => void;
  onSubmitNewsletter: () => void;
}

export default function BlogListUI({
  featured,
  articles,
  tag,
  page,
  visibleCount,
  totalPages,
  newsletterEmail,
  newsletterNotice,
  newsletterInvalid,
  onChangeTag,
  onChangePage,
  onClickLoadMore,
  onChangeNewsletterEmail,
  onSubmitNewsletter,
}: BlogListUIProps) {
  const copy = contentCopy.blog;
  const pageStart = (page - 1) * ARTICLES_PER_PAGE;
  const pageEnd = page * ARTICLES_PER_PAGE;

  function handleNewsletterSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitNewsletter();
  }

  function visibilityClass(index: number) {
    const shownOnMobile = index < visibleCount;
    const shownOnDesktop = index >= pageStart && index < pageEnd;
    if (shownOnMobile && shownOnDesktop) return "";
    if (shownOnMobile) return "lg:hidden";
    if (shownOnDesktop) return "hidden lg:block";
    return "hidden";
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-4 lg:px-8">
      <h1 className="text-2xl font-extrabold lg:text-[28px] lg:leading-[1.5]">
        {copy.title}
      </h1>

      <Link
        href={`/magazine/${featured.slug}`}
        className="group mt-4 flex flex-col overflow-hidden rounded-xl border border-border bg-white lg:flex-row"
      >
        <ArticleThumbnail
          index={0}
          className="min-h-[180px] flex-1 lg:min-h-[260px] lg:basis-[420px]"
          size={52}
        />
        <div className="flex flex-1 flex-col justify-center gap-3 p-5 lg:basis-[360px] lg:p-8">
          <span className="self-start">
            <TagBadge tag={featured.tag} />
          </span>
          <p className="text-xl leading-[1.7] font-bold group-hover:text-primary lg:text-[26px]">
            {featured.title}
          </p>
          <p className="text-sm leading-[2] text-muted-foreground">
            {featured.excerpt}
          </p>
          <ArticleMeta article={featured} readTimeLabel={copy.readTime} />
        </div>
      </Link>

      <div
        role="tablist"
        aria-label="دسته‌بندی مطالب"
        className="-mx-1 mt-5 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {[
          { value: "all" as const, label: copy.allTag },
          ...articleTags.map((item) => ({ value: item, label: item })),
        ].map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={tag === item.value}
            onClick={() => onChangeTag(item.value)}
            className={cn(
              "h-11 shrink-0 rounded-full border px-4 text-sm whitespace-nowrap transition-colors",
              tag === item.value
                ? "border-primary bg-primary font-semibold text-primary-foreground"
                : "border-input bg-white text-foreground hover:bg-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {articles.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-border bg-white p-8 text-center text-sm text-muted-foreground">
          مطلبی با این دسته‌بندی پیدا نشد.
        </p>
      ) : (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <li key={article.slug} className={visibilityClass(index)}>
              <ArticleCard
                article={article}
                index={index + 1}
                readTimeLabel={copy.readTime}
                preview
              />
            </li>
          ))}
        </ul>
      )}

      <button
        type="button"
        onClick={onClickLoadMore}
        disabled={visibleCount >= articles.length}
        className="mt-5 h-12 w-full rounded-lg border border-input bg-white text-base font-semibold disabled:opacity-50 lg:hidden"
      >
        {copy.moreArticles}
      </button>

      <nav
        aria-label={copy.paginationLabel}
        className="mt-5 hidden items-center justify-center gap-2 lg:flex"
      >
        <button
          type="button"
          aria-label={copy.nextPage}
          disabled={page === 1}
          onClick={() => onChangePage(page - 1)}
          className="grid size-11 place-items-center rounded-lg border border-input bg-white disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (number) => (
            <button
              key={number}
              type="button"
              aria-current={number === page ? "page" : undefined}
              onClick={() => onChangePage(number)}
              className={cn(
                "h-11 min-w-11 rounded-lg border px-3 text-[15px]",
                number === page
                  ? "border-primary bg-primary font-semibold text-primary-foreground"
                  : "border-input bg-white",
              )}
            >
              {formatIdentifier(number)}
            </button>
          ),
        )}
        <button
          type="button"
          aria-label={copy.previousPage}
          disabled={page === totalPages}
          onClick={() => onChangePage(page + 1)}
          className="grid size-11 place-items-center rounded-lg border border-input bg-white disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>
      </nav>

      <section className="mt-6 rounded-xl bg-primary p-6 text-primary-foreground lg:p-8">
        <div className="flex flex-wrap items-center gap-6">
          <div className="min-w-0 flex-1 basis-[280px]">
            <h2 className="text-xl leading-[1.7] font-bold">
              {copy.newsletter.title}
            </h2>
            <p className="mt-1 text-sm leading-[1.9] text-[#c9e3e1]">
              {copy.newsletter.description}
            </p>
          </div>
          <form
            onSubmit={handleNewsletterSubmit}
            className="flex basis-[320px] gap-2"
            noValidate
          >
            <input
              aria-label={copy.newsletter.emailLabel}
              aria-invalid={newsletterInvalid || undefined}
              placeholder={copy.newsletter.placeholder}
              dir="ltr"
              value={newsletterEmail}
              onChange={(event) => onChangeNewsletterEmail(event.target.value)}
              className="h-11 min-w-0 flex-1 rounded-lg bg-white px-3 text-start text-[15px] text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent"
            />
            <button
              type="submit"
              className="h-11 shrink-0 rounded-lg bg-accent px-5 text-[15px] font-semibold text-accent-foreground"
            >
              {copy.newsletter.submit}
            </button>
          </form>
        </div>
        {newsletterNotice && (
          <p
            role="status"
            className="mt-3 rounded-lg bg-white/10 px-3 py-2 text-xs leading-6"
          >
            {newsletterNotice}
          </p>
        )}
      </section>
    </div>
  );
}
