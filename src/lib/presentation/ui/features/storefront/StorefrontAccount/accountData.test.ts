import { describe, expect, it } from "vitest";
import {
  accountOrders,
  filterOrders,
  findOrder,
  formatWalletAmount,
  orderStatusLabels,
  walletTransactions,
  wishlistItems,
} from "./accountData";

describe("storefront account data", () => {
  it("filters orders by status and keeps every order for `all`", () => {
    expect(filterOrders(accountOrders, "all")).toHaveLength(
      accountOrders.length,
    );
    expect(filterOrders(accountOrders, "delivered")).toHaveLength(2);
    expect(
      filterOrders(accountOrders, "awaiting-payment").map((o) => o.id),
    ).toEqual(["100128"]);
    expect(filterOrders(accountOrders, "shipped")).toHaveLength(0);
  });

  it("labels every order status in Persian", () => {
    expect(orderStatusLabels["awaiting-payment"]).toBe("در انتظار پرداخت");
    expect(orderStatusLabels.cancelled).toBe("لغوشده");
  });

  it("finds an order by its id and returns undefined otherwise", () => {
    expect(findOrder("100094")?.amount).toBe(18_900_000);
    expect(findOrder("does-not-exist")).toBeUndefined();
  });

  it("formats signed wallet amounts", () => {
    expect(formatWalletAmount(3_000_000)).toBe("+۳٬۰۰۰٬۰۰۰ تومان");
    expect(formatWalletAmount(-500_000)).toBe("−۵۰۰٬۰۰۰ تومان");
  });

  it("keeps the wallet transaction total consistent with the balance", () => {
    const total = walletTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0,
    );
    expect(total).toBe(21_400_000);
  });

  it("only exposes discounted wishlist items with a previous price", () => {
    for (const item of wishlistItems) {
      if (item.discount) expect(item.oldPrice).toBeGreaterThan(item.price);
    }
    expect(wishlistItems).toHaveLength(6);
  });
});
