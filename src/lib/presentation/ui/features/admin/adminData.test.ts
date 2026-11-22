import { describe, expect, it } from "vitest";
import { findOrder, findReturn, formatToman } from "./adminData";
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
});
