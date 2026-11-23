import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ArticleDetailPage from "./ArticleDetailPage";
import { findArticle } from "./contentData";

afterEach(cleanup);

function renderPage() {
  const article = findArticle("flagship-buying-guide")!;
  render(<ArticleDetailPage article={article} slug={article.slug} />);
}

describe("ArticleDetailPage", () => {
  it("renders the article body, quote, product card and author", () => {
    renderPage();
    expect(
      screen.getByRole("heading", {
        name: "راهنمای خرید گوشی پرچم‌دار: چه نکاتی را بررسی کنیم؟",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "نمایشگر و طراحی" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "پیش از خرید، گارانتی و اصالت کالا را حتماً بررسی کنید.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("گوشی سامسونگ Galaxy S26 Ultra"),
    ).toBeInTheDocument();
    expect(screen.getAllByText("مریم احمدی")).toHaveLength(2);
    expect(screen.getAllByText("مطالب مرتبط")).toHaveLength(2);
  });

  it("links the table of contents to section anchors", () => {
    renderPage();
    const tocLink = screen.getByRole("link", { name: "دوربین" });
    expect(tocLink).toHaveAttribute("href", "#camera");
  });

  it("copies the article URL when sharing", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    renderPage();
    fireEvent.click(screen.getByRole("button", { name: "اشتراک‌گذاری" }));
    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining("/magazine/flagship-buying-guide"),
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "نشانی مقاله کپی شد.",
    );
  });
});
