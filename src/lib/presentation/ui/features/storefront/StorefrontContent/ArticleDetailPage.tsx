"use client";

import { useState } from "react";
import ArticleDetailUI from "./ArticleDetailUI";
import { contentCopy } from "./contentCopy";
import { relatedArticles, type Article } from "./contentData";

export interface ArticleDetailPageProps {
  article: Article;
  slug: string;
}

export default function ArticleDetailPage({
  article,
  slug,
}: ArticleDetailPageProps) {
  const [shareNotice, setShareNotice] = useState<string | null>(null);

  async function handleShare() {
    const url = `${window.location.origin}/magazine/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareNotice(contentCopy.article.shared);
    } catch {
      setShareNotice(contentCopy.article.shareFailed);
    }
  }

  return (
    <ArticleDetailUI
      article={article}
      related={relatedArticles(slug, 3)}
      shareNotice={shareNotice}
      onShare={handleShare}
    />
  );
}
