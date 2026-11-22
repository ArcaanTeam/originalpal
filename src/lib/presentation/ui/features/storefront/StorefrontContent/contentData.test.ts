import { describe, expect, it } from "vitest";
import {
  ARTICLES_PER_PAGE,
  articles,
  featuredArticle,
  filterArticles,
  findArticle,
  newsletterEmailIsValid,
  paginateArticles,
  relatedArticles,
} from "./contentData";

describe("contentData", () => {
  it("finds an article by slug and returns undefined for unknown slugs", () => {
    expect(findArticle("flagship-buying-guide")?.title).toContain(
      "راهنمای خرید گوشی پرچم‌دار",
    );
    expect(findArticle("no-such-article")).toBeUndefined();
  });

  it("exposes the featured article", () => {
    expect(featuredArticle.featured).toBe(true);
    expect(featuredArticle.slug).toBe("flagship-buying-guide");
  });

  it("filters by tag and keeps the featured article first for 'all'", () => {
    const all = filterArticles("all");
    expect(all[0].slug).toBe(featuredArticle.slug);
    expect(all).toHaveLength(articles.length);

    const reviews = filterArticles("نقد و بررسی");
    expect(reviews.length).toBeGreaterThan(0);
    expect(reviews.every((article) => article.tag === "نقد و بررسی")).toBe(
      true,
    );
  });

  it("paginates with clamping", () => {
    const list = filterArticles("all");
    const first = paginateArticles(list, 1);
    expect(first.page).toBe(1);
    expect(first.items).toHaveLength(ARTICLES_PER_PAGE);
    expect(first.totalPages).toBeGreaterThan(1);

    const clamped = paginateArticles(list, 999);
    expect(clamped.page).toBe(clamped.totalPages);

    const low = paginateArticles(list, 0);
    expect(low.page).toBe(1);
  });

  it("returns related articles preferring the same tag", () => {
    const related = relatedArticles("flagship-buying-guide", 3);
    expect(related).toHaveLength(3);
    expect(
      related.some((article) => article.slug === "flagship-buying-guide"),
    ).toBe(false);
    expect(related[0].tag).toBe("راهنمای خرید");
  });

  it("validates newsletter emails", () => {
    expect(newsletterEmailIsValid("user@example.com")).toBe(true);
    expect(newsletterEmailIsValid("not-an-email")).toBe(false);
    expect(newsletterEmailIsValid("")).toBe(false);
  });
});
