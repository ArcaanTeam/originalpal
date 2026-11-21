import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowUpLeft,
  CircleHelp,
  Plus,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import type { CommerceScreen } from "./routeCatalog";

export interface CommerceScreenUIProps {
  screen: CommerceScreen;
  pathname: string;
  navGroups: { section: string; items: CommerceScreen[] }[];
  query?: string;
}

const sampleRows = [
  [
    "OP-1048",
    "هدفون بی‌سیم سونی",
    "۱۴۰۵/۰۸/۲۹",
    "۱٬۲۵۰٬۰۰۰ تومان",
    "در حال پردازش",
  ],
  [
    "OP-1047",
    "گوشی سامسونگ Galaxy A55",
    "۱۴۰۵/۰۸/۲۸",
    "۲۳٬۸۹۰٬۰۰۰ تومان",
    "ارسال شده",
  ],
  [
    "OP-1046",
    "ساعت هوشمند اپل SE",
    "۱۴۰۵/۰۸/۲۷",
    "۱۵٬۶۰۰٬۰۰۰ تومان",
    "تکمیل شده",
  ],
  [
    "OP-1045",
    "اسپیکر JBL Flip 6",
    "۱۴۰۵/۰۸/۲۶",
    "۶٬۲۹۰٬۰۰۰ تومان",
    "در انتظار پرداخت",
  ],
];

function storeHref(path: string) {
  return path
    ? `/store/${path.replaceAll("[slug]", "sample").replaceAll("[id]", "1048")}`
    : "/store";
}
function adminHref(path: string) {
  return path
    ? `/admin/${path.replaceAll("[slug]", "sample").replaceAll("[id]", "1048")}`
    : "/admin/dashboard";
}

function StoreNavigation({
  screen,
  navGroups,
}: Pick<CommerceScreenUIProps, "screen" | "navGroups">) {
  return (
    <header className="border-b border-[#e9ece8] bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-3 sm:px-7">
        <Link
          href="/store"
          className="flex shrink-0 items-center gap-2 font-black text-[#173a30]"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#087e68] text-white">
            <ShoppingBag size={18} />
          </span>
          اورجینال‌پل
        </Link>
        <form
          action="/store/search"
          className="relative hidden max-w-xl flex-1 sm:block"
        >
          <Search
            size={16}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-[#929a96]"
          />
          <input
            name="q"
            defaultValue={screen.path === "search" ? undefined : ""}
            placeholder="جست‌وجوی محصول، برند یا دسته‌بندی..."
            className="h-10 w-full rounded-xl border border-[#e9ece8] bg-[#f8f9f7] ps-3 pe-10 text-xs outline-none focus:border-[#94bfae]"
          />
        </form>
        <nav className="ms-auto hidden items-center gap-5 text-xs font-semibold text-[#5d6963] lg:flex">
          {navGroups
            .slice(0, 1)
            .flatMap((group) => group.items.slice(1, 4))
            .map((item) => (
              <Link
                key={item.path}
                href={storeHref(item.path)}
                className="hover:text-[#087e68]"
              >
                {item.title}
              </Link>
            ))}
        </nav>
        <Link
          href="/store/cart"
          className="rounded-xl bg-[#087e68] px-4 py-2.5 text-xs font-bold text-white"
        >
          سبد خرید
        </Link>
      </div>
    </header>
  );
}

function AdminNavigation({
  pathname,
  navGroups,
}: Pick<CommerceScreenUIProps, "pathname" | "navGroups">) {
  return (
    <aside className="hidden w-60 shrink-0 border-l border-[#e9ece8] bg-white p-4 lg:block">
      <Link
        href="/admin/dashboard"
        className="mb-7 flex items-center gap-2 px-2 py-2 font-black text-[#173a30]"
      >
        <span className="grid size-9 place-items-center rounded-xl bg-[#087e68] text-white">
          <ShoppingBag size={18} />
        </span>
        اورجینال‌پل{" "}
        <span className="text-[10px] font-medium text-[#929a96]">مدیریت</span>
      </Link>
      <div className="space-y-5">
        {navGroups.map((group) => (
          <section key={group.section}>
            <h2 className="mb-1 px-2 text-[10px] font-bold text-[#97a09a]">
              {group.section}
            </h2>
            <div className="space-y-0.5">
              {group.items.slice(0, 8).map((item) => (
                <Link
                  key={item.path}
                  href={adminHref(item.path)}
                  className={`block rounded-lg px-2.5 py-2 text-xs font-medium transition ${pathname === adminHref(item.path) ? "bg-[#eaf4ef] font-bold text-[#087e68]" : "text-[#58655f] hover:bg-[#f5f7f5]"}`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  );
}

function DataTable({ title }: { title: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#e9ece8] bg-white">
      <div className="flex items-center justify-between border-b border-[#edf0ed] px-4 py-3">
        <h2 className="text-sm font-bold">{title}</h2>
        <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e9ece8] px-2.5 text-[10px] font-semibold text-[#59655f]">
          <SlidersHorizontal size={13} /> فیلتر
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-right text-xs">
          <thead className="bg-[#f8f9f7] text-[10px] text-[#818b85]">
            <tr>
              {["شناسه", "عنوان", "تاریخ", "مبلغ", "وضعیت"].map((item) => (
                <th key={item} className="px-4 py-3 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sampleRows.map((row) => (
              <tr
                key={row[0]}
                className="border-t border-[#f0f1ee] text-[#44514a]"
              >
                <td className="px-4 py-3 font-bold text-[#087e68]">{row[0]}</td>
                {row.slice(1).map((cell, index) => (
                  <td key={index} className="px-4 py-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-[10px] text-[#858e88]">
        <span>نمایش ۴ مورد از ۲۴ مورد</span>
        <div className="flex gap-1">
          <button className="rounded-md border px-2 py-1">قبلی</button>
          <button className="rounded-md bg-[#087e68] px-2.5 py-1 text-white">
            ۱
          </button>
          <button className="rounded-md border px-2.5 py-1">۲</button>
          <button className="rounded-md border px-2 py-1">بعدی</button>
        </div>
      </div>
    </div>
  );
}

function ScreenContent({
  screen,
  query,
}: Pick<CommerceScreenUIProps, "screen" | "query">) {
  if (screen.kind === "form")
    return (
      <div className="max-w-3xl rounded-2xl border border-[#e9ece8] bg-white p-5 sm:p-7">
        <h2 className="mb-5 text-sm font-bold">اطلاعات {screen.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {["عنوان", "شناسه", "وضعیت", "توضیحات"].map((label) => (
            <label key={label} className="text-xs font-semibold text-[#58655f]">
              {label}
              <input
                placeholder={`${label} را وارد کنید`}
                className="mt-2 h-10 w-full rounded-lg border border-[#e5e9e5] bg-[#fcfcfb] px-3 text-xs font-normal outline-none focus:border-[#92bda9]"
              />
            </label>
          ))}
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <button className="h-9 rounded-lg border border-[#e6e9e5] px-4 text-xs font-semibold">
            انصراف
          </button>
          <button className="h-9 rounded-lg bg-[#087e68] px-5 text-xs font-bold text-white">
            ذخیره تغییرات
          </button>
        </div>
      </div>
    );
  if (screen.kind === "utility" && screen.path.includes("empty"))
    return (
      <div className="rounded-2xl border border-dashed border-[#dce5de] bg-white px-5 py-16 text-center">
        <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#eff6f2] text-[#087e68]">
          <Search size={20} />
        </span>
        <p className="text-sm font-bold">نتیجه‌ای پیدا نشد</p>
        <p className="mt-2 text-xs text-[#858e88]">
          عبارت جست‌وجو یا فیلترهای خود را تغییر دهید.
        </p>
      </div>
    );
  if (screen.kind === "utility" && screen.path === "cart/empty")
    return (
      <div className="rounded-2xl border border-dashed border-[#dce5de] bg-white px-5 py-16 text-center">
        <ShoppingBag className="mx-auto mb-3 text-[#087e68]" size={28} />
        <p className="text-sm font-bold">سبد خرید شما خالی است</p>
        <p className="mt-2 text-xs text-[#858e88]">
          برای شروع خرید، محصولات محبوب را ببینید.
        </p>
        <Link
          href="/store/categories"
          className="mt-5 inline-flex rounded-lg bg-[#087e68] px-4 py-2.5 text-xs font-bold text-white"
        >
          رفتن به فروشگاه
        </Link>
      </div>
    );
  if (screen.kind === "detail" || screen.kind === "landing")
    return (
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-[#e9f3ed] p-5 md:col-span-2">
          <p className="text-[10px] font-bold text-[#087e68]">
            نمای کلی فروشگاه
          </p>
          <h2 className="mt-2 text-lg font-black text-[#173a30]">
            مدیریت آسان، تصمیم‌گیری هوشمند
          </h2>
          <p className="mt-2 max-w-lg text-xs leading-6 text-[#68776f]">
            وضعیت {screen.title} و اطلاعات کلیدی فروشگاه شما در یک نگاه.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              ["سفارش‌های امروز", "۱۲۸"],
              ["فروش امروز", "۸۴٬۶۰۰٬۰۰۰"],
              ["مشتریان جدید", "۳۶"],
              ["نیازمند پیگیری", "۷"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/70 bg-white/75 p-3"
              >
                <p className="text-[9px] text-[#7d8982]">{label}</p>
                <p className="mt-2 text-sm font-black text-[#263630]">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
          <h2 className="text-sm font-bold">میانبرها</h2>
          <div className="mt-3 space-y-2">
            {["افزودن محصول", "مشاهده سفارش‌ها", "تنظیمات فروشگاه"].map(
              (label) => (
                <Link
                  key={label}
                  href={
                    label.includes("محصول")
                      ? "/admin/products/new"
                      : label.includes("سفارش")
                        ? "/admin/orders"
                        : "/admin/settings/store"
                  }
                  className="flex items-center justify-between rounded-lg bg-[#f7f9f7] px-3 py-2.5 text-[11px] font-semibold text-[#526057]"
                >
                  {label}
                  <ArrowUpLeft size={13} />
                </Link>
              ),
            )}
          </div>
          <p className="mt-5 flex items-center gap-1.5 text-[10px] text-[#89938c]">
            <CircleHelp size={13} /> راهنمای پنل مدیریت
          </p>
        </div>
      </div>
    );
  if (query && !query.trim()) return null;
  return <DataTable title={screen.title} />;
}

export default function CommerceScreenUI({
  screen,
  pathname,
  navGroups,
  query,
}: CommerceScreenUIProps) {
  const isAdmin = screen.area === "admin";
  return (
    <div dir="rtl" className="min-h-screen bg-[#f7f8f6] text-[#263630]">
      {!isAdmin && <StoreNavigation screen={screen} navGroups={navGroups} />}
      <div
        className={`mx-auto flex ${isAdmin ? "max-w-[1500px]" : "max-w-7xl"}`}
      >
        {isAdmin && (
          <AdminNavigation pathname={pathname} navGroups={navGroups} />
        )}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-bold text-[#087e68]">
                {screen.section}
              </p>
              <h1 className="text-xl font-black sm:text-2xl">{screen.title}</h1>
              <p className="mt-1.5 text-xs text-[#89938c]">
                {screen.description}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                aria-label="جست‌وجو"
                className="grid size-9 place-items-center rounded-lg border border-[#e5e9e5] bg-white text-[#627067] sm:hidden"
              >
                <Search size={15} />
              </button>
              {screen.kind === "listing" && isAdmin && (
                <button className="flex h-9 items-center gap-1.5 rounded-lg bg-[#087e68] px-3 text-[11px] font-bold text-white">
                  <Plus size={15} />
                  افزودن مورد
                </button>
              )}
              <button
                aria-label="دریافت خروجی"
                className="grid size-9 place-items-center rounded-lg border border-[#e5e9e5] bg-white text-[#627067]"
              >
                <ArrowDownToLine size={15} />
              </button>
            </div>
          </div>
          <ScreenContent screen={screen} query={query} />
        </main>
      </div>
    </div>
  );
}
