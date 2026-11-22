import { describe, expect, it } from "vitest";
import {
  findAttribute,
  findBrand,
  findCategory,
  findOrder,
  findProduct,
  findReturn,
  formatToman,
  attributes,
  inventory,
  products,
} from "./adminData";
import type { OrderStatus } from "./adminData";

describe("adminData", () => {
  describe("findOrder", () => {
    it("finds an existing order by id", () => {
      const order = findOrder("OP-1048");
      expect(order?.id).toBe("OP-1048");
      expect(order?.customer).toBe("رضا احمدی");
    });

    it("returns undefined for unknown id", () => {
      expect(findOrder("NOPE")).toBeUndefined();
    });
  });

  describe("findReturn", () => {
    it("finds an existing return by id", () => {
      const ret = findReturn("RT-2001");
      expect(ret?.id).toBe("RT-2001");
      expect(ret?.status).toBe("pending");
    });

    it("returns undefined for unknown id", () => {
      expect(findReturn("NOPE")).toBeUndefined();
    });
  });

  describe("findProduct", () => {
    it("finds an existing product by id", () => {
      const product = findProduct("PR-5001");
      expect(product?.id).toBe("PR-5001");
      expect(product?.name).toBe("گوشی سامسونگ Galaxy A55");
      expect(product?.status).toBe("active");
    });

    it("returns undefined for unknown id", () => {
      expect(findProduct("NOPE")).toBeUndefined();
    });
  });

  describe("findCategory", () => {
    it("finds an existing category by id", () => {
      const category = findCategory("CT-6001");
      expect(category?.id).toBe("CT-6001");
      expect(category?.name).toBe("موبایل");
    });

    it("returns undefined for unknown id", () => {
      expect(findCategory("NOPE")).toBeUndefined();
    });
  });

  describe("findBrand", () => {
    it("finds an existing brand by id", () => {
      const brand = findBrand("BR-7001");
      expect(brand?.id).toBe("BR-7001");
      expect(brand?.name).toBe("سامسونگ");
    });

    it("returns undefined for unknown id", () => {
      expect(findBrand("NOPE")).toBeUndefined();
    });
  });

  describe("findAttribute", () => {
    it("finds an existing attribute by id", () => {
      const attribute = findAttribute("AT-8001");
      expect(attribute?.id).toBe("AT-8001");
      expect(attribute?.name).toBe("رنگ");
      expect(attribute?.filterable).toBe(true);
    });

    it("returns undefined for unknown id", () => {
      expect(findAttribute("NOPE")).toBeUndefined();
    });
  });

  describe("formatToman", () => {
    it("formats with Persian digits and toman separator", () => {
      expect(formatToman(1250000)).toBe("۱٬۲۵۰٬۰۰۰");
    });

    it("handles zero", () => {
      expect(formatToman(0)).toBe("۰");
    });
  });

  describe("order statuses", () => {
    const statuses: OrderStatus[] = [
      "processing",
      "shipped",
      "completed",
      "pending_payment",
    ];
    it("covers all defined statuses", () => {
      expect(statuses).toHaveLength(4);
    });
  });

  describe("product statuses", () => {
    it("includes active, draft, and archived", () => {
      const statuses = new Set(products.map((p) => p.status));
      expect(statuses.has("active")).toBe(true);
      expect(statuses.has("draft")).toBe(true);
      expect(statuses.has("archived")).toBe(true);
    });
  });

  describe("inventory statuses", () => {
    it("includes ok, low, and out", () => {
      const statuses = new Set(inventory.map((i) => i.status));
      expect(statuses.has("ok")).toBe(true);
      expect(statuses.has("low")).toBe(true);
      expect(statuses.has("out")).toBe(true);
    });
  });

  describe("attribute types", () => {
    it("covers text, number, and select types", () => {
      const types = new Set(attributes.map((a) => a.type));
      expect(types.has("text")).toBe(false);
      expect(types.has("number")).toBe(true);
      expect(types.has("select")).toBe(true);
    });
  });
});
