"use client";

import StaticPageUI from "./StaticPageUI";
import { findStaticPage } from "./contentCopy";

export interface StaticPagePageProps {
  slug: string;
}

export default function StaticPagePage({ slug }: StaticPagePageProps) {
  const page = findStaticPage(slug);
  if (!page) return null;
  return <StaticPageUI page={page} />;
}
