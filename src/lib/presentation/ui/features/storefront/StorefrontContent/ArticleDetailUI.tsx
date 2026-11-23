"use client";

import Link from "next/link";
import { Image as ImageIcon, Share2 } from "lucide-react";
import { formatToman } from "../StorefrontCart/cartAtom";
import {
  ArticleCard,
  ContentBreadcrumb,
  MobilePageHeader,
  TagBadge,
} from "./ContentParts";
import { contentCopy } from "./contentCopy";
import type { Article } from "./contentData";

export interface ArticleDetailUIProps {
  article: Article;
  related: Article[];
  shareNotice: string | null;
  onShare: () => void;
}

export default function ArticleDetailUI({
  article,
  related,
  shareNotice,
  onShare,
}: ArticleDetailUIProps) {
  const copy = contentCopy.article;
  const blog = contentCopy.blog;

  return (
    <div className="pb-8">
      <MobilePageHeader
        title={copy.levelTwo}
        backHref="/magazine"
        backLabel="بازگشت به مجله"
      />
      <div className="hidden lg:block">
        <ContentBreadcrumb
          items={[
            { label: contentCopy.breadcrumbRoot, href: "/" },
            { label: copy.breadcrumb, href: "/magazine" },
            { label: article.tag },
          ]}
        />
      </div>

      <div className="mx-auto w-full max-w-[1280px] lg:flex lg:items-start lg:gap-8 lg:px-8 lg:pt-4">
        <article className="min-w-0 flex-1">
          <div
            aria-hidden="true"
            className="flex h-[220px] items-center justify-center bg-[#EEEBE4] text-[#5B6070] lg:h-[360px] lg:rounded-xl"
          >
            <ImageIcon size={48} strokeWidth={1.2} />
          </div>

          <div className="flex flex-col gap-4 px-4 pt-4 lg:px-0 lg:pt-5">
            <div className="flex flex-col items-start gap-2.5">
              <TagBadge tag={article.tag} />
              <h1 className="text-[22px] leading-[1.7] font-extrabold lg:text-[30px]">
                {article.title}
              </h1>
              <p className="text-sm leading-[1.8] text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {article.author}
                </span>
                <span> · </span>
                <span>{article.date}</span>
                <span> · </span>
                <span>
                  {article.readMinutes.toLocaleString("fa-IR")} {blog.readTime}
                </span>
              </p>
            </div>

            <p className="text-[15px] leading-[2.1] lg:text-base">
              {article.introduction}
            </p>

            {article.sections.map((section, index) => (
              <div key={section.id} className="flex flex-col gap-2">
                <h2
                  id={section.id}
                  className="scroll-mt-24 text-xl leading-[1.7] font-bold"
                >
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-[15px] leading-[2.1] lg:text-base"
                  >
                    {paragraph}
                  </p>
                ))}
                {index === 1 && article.quote && (
                  <blockquote className="rounded-xl bg-[#E3F1F0] px-5 py-4 text-[15px] leading-[2] font-semibold text-primary">
                    {article.quote}
                  </blockquote>
                )}
              </div>
            ))}

            {article.product && (
              <Link
                href={`/product/${article.product.slug}`}
                className="flex items-center gap-4 rounded-xl border border-border bg-white p-4"
              >
                <span
                  aria-hidden="true"
                  className="grid size-[72px] shrink-0 place-items-center rounded-lg bg-[#EEEBE4] text-[#5B6070]"
                >
                  <ImageIcon size={26} strokeWidth={1.2} />
                </span>
                <span className="min-w-0 flex-1 leading-[1.8]">
                  <span className="block text-sm font-semibold">
                    {article.product.title}
                  </span>
                  <span className="mt-1 block text-base font-bold">
                    {formatToman(article.product.price)}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      {contentCopy.toman}
                    </span>
                  </span>
                  <span className="mt-2 inline-flex h-6 items-center rounded-full bg-[#E3F1F0] px-2.5 text-xs font-semibold text-primary">
                    {copy.viewProduct}
                  </span>
                </span>
              </Link>
            )}

            <div className="flex flex-wrap gap-2">
              {article.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex h-9 items-center rounded-full bg-[#F1EFE9] px-3.5 text-[13px]"
                >
                  {keyword}
                </span>
              ))}
            </div>

            <div className="hidden justify-start lg:flex">
              <button
                type="button"
                onClick={onShare}
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-input bg-white px-5 text-base font-semibold"
              >
                <Share2 size={18} />
                {copy.share}
              </button>
            </div>
            {shareNotice && (
              <p role="status" className="text-xs text-primary">
                {shareNotice}
              </p>
            )}

            <div className="flex items-center gap-3 rounded-xl border border-border bg-white p-4">
              <span
                aria-hidden="true"
                className="grid size-12 shrink-0 place-items-center rounded-full bg-[#E3F1F0] text-lg font-bold text-primary"
              >
                {article.author.charAt(0)}
              </span>
              <span className="min-w-0 leading-[1.8]">
                <span className="block text-[15px] font-semibold">
                  {article.author}
                </span>
                <span className="block text-[13px] text-muted-foreground">
                  {copy.authorRole}
                </span>
              </span>
            </div>

            <section>
              <h2 className="text-lg leading-[1.7] font-bold">
                {copy.related}
              </h2>
              <ul className="mt-3 flex flex-col gap-3 lg:hidden">
                {related.slice(0, 2).map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/magazine/${item.slug}`}
                      className="flex gap-3 rounded-xl border border-border bg-white p-3"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-24 shrink-0 place-items-center rounded-lg bg-[#EEEBE4] text-[#5B6070]"
                      >
                        <ImageIcon size={22} strokeWidth={1.2} />
                      </span>
                      <span className="flex min-w-0 flex-col gap-1.5">
                        <TagBadge tag={item.tag} />
                        <span className="text-[15px] leading-[1.7] font-bold">
                          {item.title}
                        </span>
                        <span className="text-xs leading-[1.7] text-muted-foreground">
                          {item.author} · {item.date} ·{" "}
                          {item.readMinutes.toLocaleString("fa-IR")}{" "}
                          {blog.readTime}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </article>

        <aside className="hidden w-[240px] shrink-0 lg:sticky lg:top-4 lg:block lg:self-start lg:rounded-xl lg:border lg:border-border lg:bg-white lg:p-4">
          <p className="text-[15px] font-bold">{copy.contents}</p>
          <nav className="mt-2 flex flex-col">
            {article.sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={
                  index === 0
                    ? "text-sm leading-[2] font-semibold text-primary"
                    : "text-sm leading-[2] text-muted-foreground hover:text-primary"
                }
              >
                {section.heading}
              </a>
            ))}
          </nav>
        </aside>
      </div>

      <section className="mx-auto mt-6 hidden w-full max-w-[1280px] px-8 lg:block">
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold">{copy.related}</h2>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
            {related.map((item) => (
              <li key={item.slug}>
                <ArticleCard
                  article={item}
                  index={2}
                  readTimeLabel={blog.readTime}
                  preview
                />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
