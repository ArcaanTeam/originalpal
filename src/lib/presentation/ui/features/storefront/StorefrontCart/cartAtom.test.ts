import { describe, expect, it } from "vitest";
import { formatToman, getCartTotals, initialCart } from "./cartAtom";

describe("storefront cart totals", () => {
  it("matches the reference cart amounts and computes shipping", () => {
    expect(getCartTotals(initialCart)).toEqual({
      count: 3,
      subtotal: 143_300_000,
      discount: 15_600_000,
      payable: 127_700_000,
    });
    expect(getCartTotals(initialCart, 180_000).payable).toBe(127_880_000);
  });

  it("formats non-negative Toman totals with Persian digits", () => {
    expect(formatToman(1000)).toBe("۱٬۰۰۰ تومان");
    expect(formatToman(-500)).toBe("۰ تومان");
  });
});
