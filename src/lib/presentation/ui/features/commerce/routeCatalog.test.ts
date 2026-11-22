import { describe, expect, it } from "vitest";
import { findCommerceScreen, getNavigationGroups } from "./routeCatalog";

describe("commerce route catalog", () => {
  it("resolves the storefront root, fixed, and parameterized routes", () => {
    expect(findCommerceScreen("store", [])?.path).toBe("");
    expect(findCommerceScreen("admin", ["dashboard"])?.title).toBe("داشبورد");
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

  it("registers the catalog, search, comparison, and empty-search screens", () => {
    expect(findCommerceScreen("store", ["category", "mobile"])?.kind).toBe(
      "listing",
    );
    expect(findCommerceScreen("store", ["search", "filters"])?.kind).toBe(
      "utility",
    );
    expect(findCommerceScreen("store", ["search", "sort"])?.kind).toBe(
      "utility",
    );
    expect(findCommerceScreen("store", ["search", "suggestions"])?.kind).toBe(
      "utility",
    );
    expect(findCommerceScreen("store", ["search", "empty"])?.kind).toBe(
      "utility",
    );
    expect(findCommerceScreen("store", ["compare"])?.kind).toBe("listing");
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
