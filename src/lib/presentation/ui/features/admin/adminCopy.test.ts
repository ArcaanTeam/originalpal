import { describe, expect, it } from "vitest";
import { adminCopy } from "./adminCopy";

describe("adminCopy", () => {
  it("has app branding", () => {
    expect(adminCopy.app.title).toBe("پنل مدیریت اورجینال‌پل");
    expect(adminCopy.app.brand).toBe("اورجینال‌پل");
  });

  it("has nav labels", () => {
    expect(adminCopy.nav.dashboard).toBe("داشبورد");
    expect(adminCopy.nav.orders).toBe("سفارش‌ها");
    expect(adminCopy.nav.returns).toBe("مرجوعی‌ها");
    expect(adminCopy.nav.transactions).toBe("تراکنش‌ها");
    expect(adminCopy.nav.shipping).toBe("ارسال و حمل‌ونقل");
  });

  it("has dashboard copy", () => {
    expect(adminCopy.dashboard.title).toBe("داشبورد");
    expect(adminCopy.dashboard.todayOrders).toBe("سفارش‌های امروز");
    expect(adminCopy.dashboard.todaySales).toBe("فروش امروز");
  });

  it("has order detail copy", () => {
    expect(adminCopy.orderDetail.title).toBe("جزئیات سفارش");
    expect(adminCopy.orderDetail.back).toBe("بازگشت به فهرست سفارش‌ها");
  });

  it("has common copy", () => {
    expect(adminCopy.common.home).toBe("بازگشت به داشبورد");
    expect(adminCopy.common.back).toBe("بازگشت");
    expect(adminCopy.common.save).toBe("ذخیره تغییرات");
  });
});
