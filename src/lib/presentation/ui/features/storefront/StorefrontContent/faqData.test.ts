import { describe, expect, it } from "vitest";
import { faqItems, searchFaq } from "./faqData";

describe("faqData", () => {
  it("returns every item for an empty query", () => {
    expect(searchFaq(faqItems, "")).toHaveLength(faqItems.length);
    expect(searchFaq(faqItems, "   ")).toHaveLength(faqItems.length);
  });

  it("matches questions and answers", () => {
    const byQuestion = searchFaq(faqItems, "بازگشت");
    expect(byQuestion.map((item) => item.id)).toContain("return-window");

    const byAnswer = searchFaq(faqItems, "کیف پول");
    expect(byAnswer.map((item) => item.id)).toContain("wallet");
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchFaq(faqItems, "عبارت ناموجود")).toHaveLength(0);
  });
});
