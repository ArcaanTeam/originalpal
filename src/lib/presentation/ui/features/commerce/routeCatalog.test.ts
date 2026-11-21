import { describe, expect, it } from "vitest";
import { findCommerceScreen, getNavigationGroups } from "./routeCatalog";

describe("commerce route catalog", () => {
  it("resolves the storefront's fixed and parameterized routes", () => {
    expect(findCommerceScreen("store", ["deals"])?.title).toBe(
      "پیشنهادهای ویژه",
    );
    expect(findCommerceScreen("store", ["product", "phone-a55"])?.title).toBe(
      "صفحه محصول",
    );
    expect(
      findCommerceScreen("store", ["account", "orders", "OP-1048"])?.title,
    ).toBe("جزئیات و رهگیری سفارش");
  });

  it("resolves admin CRUD routes and keeps route areas separate", () => {
    expect(findCommerceScreen("admin", ["products", "new"])?.kind).toBe("form");
    expect(findCommerceScreen("admin", ["products", "new"])?.title).toBe(
      "افزودن محصول",
    );
    expect(findCommerceScreen("store", ["products", "new"])).toBeUndefined();
  });

  it("returns grouped navigation for both application areas", () => {
    expect(
      getNavigationGroups("store").some(
        (group) => group.section === "حساب کاربری",
      ),
    ).toBe(true);
    expect(
      getNavigationGroups("admin").some((group) => group.section === "سئو"),
    ).toBe(true);
  });
});
