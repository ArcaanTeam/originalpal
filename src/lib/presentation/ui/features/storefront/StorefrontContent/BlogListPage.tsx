"use client";

import { useState } from "react";
import BlogListUI, { type TagFilter } from "./BlogListUI";
import { contentCopy } from "./contentCopy";
import {
  ARTICLES_PER_PAGE,
  featuredArticle,
  filterArticles,
  newsletterEmailIsValid,
  paginateArticles,
} from "./contentData";

export default function BlogListPage() {
  const [tag, setTag] = useState<TagFilter>("all");
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(ARTICLES_PER_PAGE);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterNotice, setNewsletterNotice] = useState<string | null>(null);
  const [newsletterInvalid, setNewsletterInvalid] = useState(false);

  const filtered = filterArticles(tag).filter(
    (article) => article.slug !== featuredArticle.slug,
  );
  const { totalPages } = paginateArticles(filtered, page);

  function handleChangeTag(next: TagFilter) {
    setTag(next);
    setPage(1);
    setVisibleCount(ARTICLES_PER_PAGE);
  }

  function handleChangePage(next: number) {
    setPage(Math.min(Math.max(next, 1), totalPages));
  }

  function handleSubmitNewsletter() {
    if (!newsletterEmailIsValid(newsletterEmail)) {
      setNewsletterInvalid(true);
      setNewsletterNotice(contentCopy.blog.newsletter.invalid);
      return;
    }
    setNewsletterInvalid(false);
    setNewsletterNotice(contentCopy.blog.newsletter.pending);
    setNewsletterEmail("");
  }

  return (
    <BlogListUI
      featured={featuredArticle}
      articles={filtered}
      tag={tag}
      page={page}
      visibleCount={visibleCount}
      totalPages={totalPages}
      newsletterEmail={newsletterEmail}
      newsletterNotice={newsletterNotice}
      newsletterInvalid={newsletterInvalid}
      onChangeTag={handleChangeTag}
      onChangePage={handleChangePage}
      onClickLoadMore={() =>
        setVisibleCount((count) => count + ARTICLES_PER_PAGE)
      }
      onChangeNewsletterEmail={(email) => {
        setNewsletterEmail(email);
        setNewsletterInvalid(false);
      }}
      onSubmitNewsletter={handleSubmitNewsletter}
    />
  );
}
