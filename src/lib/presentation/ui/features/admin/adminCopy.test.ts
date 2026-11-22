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

  it("has products copy", () => {
    expect(adminCopy.products.title).toBe("محصولات");
    expect(adminCopy.products.add).toBe("افزودن محصول");
    expect(adminCopy.products.empty).toBe("محصولی یافت نشد.");
  });

  it("has product edit copy", () => {
    expect(adminCopy.productEdit.title).toBe("ویرایش محصول");
    expect(adminCopy.productEdit.name).toBe("نام محصول");
    expect(adminCopy.productEdit.sku).toBe("شناسه داخلی (SKU)");
    expect(adminCopy.productEdit.back).toBe("بازگشت به فهرست محصولات");
  });

  it("has categories copy", () => {
    expect(adminCopy.categories.title).toBe("دسته‌بندی‌ها");
    expect(adminCopy.categories.add).toBe("افزودن دسته‌بندی");
    expect(adminCopy.categories.empty).toBe("دسته‌بندی‌ای یافت نشد.");
  });

  it("has brands copy", () => {
    expect(adminCopy.brands.title).toBe("برندها");
    expect(adminCopy.brands.empty).toBe("برندی یافت نشد.");
  });

  it("has attributes copy", () => {
    expect(adminCopy.attributes.title).toBe("ویژگی‌ها");
    expect(adminCopy.attributes.empty).toBe("ویژگی‌ای تعریف نشده است.");
  });

  it("has inventory copy", () => {
    expect(adminCopy.inventory.title).toBe("موجودی انبار");
    expect(adminCopy.inventory.empty).toBe("رکورد انبارداری یافت نشد.");
  });

  it("has coupons copy", () => {
    expect(adminCopy.coupons.title).toBe("کدهای تخفیف");
    expect(adminCopy.coupons.add).toBe("افزودن کد تخفیف");
    expect(adminCopy.coupons.empty).toBe("کد تخفیفی یافت نشد.");
  });

  it("has coupon edit copy", () => {
    expect(adminCopy.couponEdit.title).toBe("ویرایش کد تخفیف");
    expect(adminCopy.couponEdit.code).toBe("کد تخفیف");
    expect(adminCopy.couponEdit.back).toBe("بازگشت به فهرست کدهای تخفیف");
  });

  it("has banners copy", () => {
    expect(adminCopy.banners.title).toBe("بنرها");
    expect(adminCopy.banners.add).toBe("افزودن بنر");
    expect(adminCopy.banners.empty).toBe("بنری یافت نشد.");
  });

  it("has banner edit copy", () => {
    expect(adminCopy.bannerEdit.title).toBe("ویرایش بنر");
    expect(adminCopy.bannerEdit.bannerTitle).toBe("عنوان بنر");
    expect(adminCopy.bannerEdit.back).toBe("بازگشت به فهرست بنرها");
  });
});
