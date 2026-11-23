export type CommerceArea = "store" | "admin";
export type CommerceScreenKind =
  "landing" | "listing" | "form" | "detail" | "utility";

export interface CommerceScreen {
  area: CommerceArea;
  path: string;
  title: string;
  section: string;
  kind: CommerceScreenKind;
  description: string;
}

const storeScreens: CommerceScreen[] = [
  ["", "خانه", "خانه و ناوبری", "landing"],
  ["categories", "همه دسته‌بندی‌ها", "خانه و ناوبری", "listing"],
  ["deals", "پیشنهادهای ویژه", "خانه و ناوبری", "listing"],
  ["category/[slug]", "صفحه دسته‌بندی", "جست‌وجو و مرور", "listing"],
  ["search", "نتایج جست‌وجو", "جست‌وجو و مرور", "listing"],
  ["search/filters", "فیلترها", "جست‌وجو و مرور", "utility"],
  ["search/sort", "مرتب‌سازی", "جست‌وجو و مرور", "utility"],
  ["search/suggestions", "پیشنهادهای جست‌وجو", "جست‌وجو و مرور", "utility"],
  ["search/empty", "نتیجه‌ای پیدا نشد", "جست‌وجو و مرور", "utility"],
  ["compare", "مقایسه محصولات", "جست‌وجو و مرور", "listing"],
  ["product/[slug]", "صفحه محصول", "محصول", "detail"],
  ["reviews/write", "ثبت دیدگاه", "محصول", "form"],
  ["cart", "سبد خرید", "سبد و پرداخت", "listing"],
  ["cart/empty", "سبد خرید خالی", "سبد و پرداخت", "utility"],
  ["checkout/shipping", "اطلاعات ارسال", "سبد و پرداخت", "form"],
  ["checkout/payment", "روش پرداخت", "سبد و پرداخت", "form"],
  ["checkout/success", "پرداخت موفق", "سبد و پرداخت", "utility"],
  ["checkout/failed", "پرداخت ناموفق", "سبد و پرداخت", "utility"],
  ["login", "ورود و ثبت‌نام", "حساب کاربری", "form"],
  ["login/verify", "تأیید شماره همراه", "حساب کاربری", "form"],
  ["account/profile", "پروفایل", "حساب کاربری", "detail"],
  ["account/profile/edit", "ویرایش پروفایل", "حساب کاربری", "form"],
  ["account/orders", "سفارش‌های من", "حساب کاربری", "listing"],
  ["account/orders/[id]", "جزئیات و رهگیری سفارش", "حساب کاربری", "detail"],
  ["account/returns", "درخواست‌های مرجوعی", "حساب کاربری", "listing"],
  ["account/wishlist", "علاقه‌مندی‌ها", "حساب کاربری", "listing"],
  ["account/addresses", "نشانی‌های من", "حساب کاربری", "listing"],
  ["account/wallet", "کیف پول", "حساب کاربری", "detail"],
  ["account/reviews", "دیدگاه‌های من", "حساب کاربری", "listing"],
  ["account/messages", "پیام‌های من", "حساب کاربری", "listing"],
  ["magazine", "مجله", "مجله و محتوا", "listing"],
  ["magazine/[slug]", "مقاله", "مجله و محتوا", "detail"],
  ["contact", "تماس با ما", "مجله و محتوا", "form"],
  ["faq", "پرسش‌های متداول", "مجله و محتوا", "utility"],
  ["pages/[slug]", "صفحه محتوا", "مجله و محتوا", "detail"],
  ["404", "صفحه پیدا نشد", "صفحات سیستم", "utility"],
  ["500", "خطای سرور", "صفحات سیستم", "utility"],
].map(([path, title, section, kind]) => ({
  area: "store",
  path,
  title,
  section,
  kind,
  description: `${title} در فروشگاه اورجینال‌پل`,
})) as CommerceScreen[];

const adminScreens: CommerceScreen[] = [
  ["dashboard", "داشبورد", "دسترسی و داشبورد", "landing"],
  ["reports", "گزارش‌ها", "دسترسی و داشبورد", "listing"],
  ["orders", "سفارش‌ها", "سفارش و پرداخت", "listing"],
  ["orders/[id]", "جزئیات سفارش", "سفارش و پرداخت", "detail"],
  ["returns", "مرجوعی‌ها", "سفارش و پرداخت", "listing"],
  ["returns/[id]", "جزئیات مرجوعی", "سفارش و پرداخت", "detail"],
  ["transactions", "تراکنش‌ها", "سفارش و پرداخت", "listing"],
  ["shipping", "ارسال و حمل‌ونقل", "سفارش و پرداخت", "listing"],
  ["products", "محصولات", "کاتالوگ", "listing"],
  ["products/new", "افزودن محصول", "کاتالوگ", "form"],
  ["products/[id]/edit", "ویرایش محصول", "کاتالوگ", "form"],
  ["categories", "دسته‌بندی‌ها", "کاتالوگ", "listing"],
  ["categories/new", "افزودن دسته‌بندی", "کاتالوگ", "form"],
  ["categories/[id]/edit", "ویرایش دسته‌بندی", "کاتالوگ", "form"],
  ["brands", "برندها", "کاتالوگ", "listing"],
  ["attributes", "ویژگی‌ها", "کاتالوگ", "listing"],
  ["inventory", "موجودی انبار", "کاتالوگ", "listing"],
  ["customers", "مشتریان", "مشتری و پشتیبانی", "listing"],
  ["customers/[id]", "پروفایل مشتری", "مشتری و پشتیبانی", "detail"],
  ["reviews", "دیدگاه‌ها و پرسش‌ها", "مشتری و پشتیبانی", "listing"],
  ["support/tickets", "درخواست‌های پشتیبانی", "مشتری و پشتیبانی", "listing"],
  ["support/tickets/[id]", "جزئیات تیکت", "مشتری و پشتیبانی", "detail"],
  ["coupons", "کدهای تخفیف", "بازاریابی", "listing"],
  ["coupons/new", "افزودن کد تخفیف", "بازاریابی", "form"],
  ["banners", "بنرها", "بازاریابی", "listing"],
  ["banners/new", "افزودن بنر", "بازاریابی", "form"],
  ["content/posts", "نوشته‌های مجله", "محتوا و رسانه", "listing"],
  ["content/posts/new", "ویرایشگر نوشته", "محتوا و رسانه", "form"],
  ["content/taxonomy", "دسته‌ها و برچسب‌ها", "محتوا و رسانه", "listing"],
  ["content/pages", "صفحات ثابت", "محتوا و رسانه", "listing"],
  ["content/pages/new", "ویرایشگر صفحه", "محتوا و رسانه", "form"],
  ["content/home", "چیدمان صفحه اصلی", "محتوا و رسانه", "listing"],
  ["media", "کتابخانه رسانه", "محتوا و رسانه", "listing"],
  ["seo", "نمای کلی سئو", "سئو", "landing"],
  ["seo/settings", "تنظیمات سئو", "سئو", "form"],
  ["seo/bulk", "ویرایش گروهی سئو", "سئو", "listing"],
  ["seo/redirects", "تغییر مسیر و ۴۰۴", "سئو", "listing"],
  ["seo/sitemap", "نقشه سایت و robots", "سئو", "form"],
  ["seo/schema", "نشانه‌گذاری اسکیما", "سئو", "listing"],
  ["seo/broken-links", "پیوندهای شکسته", "سئو", "listing"],
  ["seo/internal-links", "پیوندهای داخلی", "سئو", "listing"],
  ["seo/integrations", "اتصال‌ها و کدها", "سئو", "form"],
  ["settings/store", "تنظیمات فروشگاه", "تنظیمات و دسترسی", "form"],
  ["users", "کاربران", "تنظیمات و دسترسی", "listing"],
  ["roles", "نقش‌ها و مجوزها", "تنظیمات و دسترسی", "listing"],
  ["settings/messages", "قالب پیام‌ها", "تنظیمات و دسترسی", "listing"],
].map(([path, title, section, kind]) => ({
  area: "admin",
  path,
  title,
  section,
  kind,
  description: `مدیریت ${title} در پنل اورجینال‌پل`,
})) as CommerceScreen[];

export const commerceScreens = [...storeScreens, ...adminScreens];

function routeMatches(pattern: string, segments: string[]): boolean {
  const parts = pattern ? pattern.split("/") : [];
  if (parts.length !== segments.length) return false;
  return parts.every(
    (part, index) => part.startsWith("[") || part === segments[index],
  );
}

export function findCommerceScreen(
  area: CommerceArea,
  segments: string[],
): CommerceScreen | undefined {
  return commerceScreens.find(
    (screen) => screen.area === area && routeMatches(screen.path, segments),
  );
}

export function getNavigationGroups(area: CommerceArea) {
  const screens = commerceScreens.filter(
    (screen) => screen.area === area && !screen.path.includes("["),
  );
  return [...new Set(screens.map((screen) => screen.section))].map(
    (section) => ({
      section,
      items: screens.filter((screen) => screen.section === section),
    }),
  );
}
