import Link from "next/link";
import {
  ChevronLeft,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import {
  ProductCard,
  storefrontProducts,
} from "../StorefrontHome/StorefrontHomeUI";

export type StorefrontBrowseMode =
  | "category"
  | "search"
  | "filters"
  | "sort"
  | "suggestions"
  | "empty"
  | "compare";

const categories = [
  "گوشی موبایل",
  "تبلت",
  "ساعت هوشمند",
  "هدفون",
  "شارژر و کابل",
  "قاب و گلس",
];
const brands = [
  ["سامسونگ", "۸۴"],
  ["اپل", "۶۱"],
  ["شیائومی", "۷۳"],
  ["هوآوی", "۲۸"],
];
const sortOptions = [
  "مرتبط‌ترین",
  "پرفروش‌ترین",
  "ارزان‌ترین",
  "گران‌ترین",
  "جدیدترین",
  "بیشترین تخفیف",
];
const recentSearches = ["گوشی سامسونگ", "هدفون سونی"];
const suggestionTerms = [
  "گوشی سامسونگ s26 ultra",
  "گوشی سامسونگ a57",
  "گوشی سامسونگ در دسته موبایل",
];

function Breadcrumb({ title }: { title: string }) {
  return (
    <div className="mb-4 text-xs text-muted-foreground">
      <Link href="/" className="hover:text-primary">
        خانه
      </Link>
      <ChevronLeft className="mx-1 inline" size={13} />
      {title}
    </div>
  );
}

function FilterPanel() {
  return (
    <aside className="hidden w-[250px] shrink-0 self-start rounded-xl border border-border bg-white p-4 lg:block">
      <div className="flex items-center justify-between">
        <h2 className="font-extrabold">فیلترها</h2>
        <Link href="/search" className="text-xs font-semibold text-primary">
          حذف همه
        </Link>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <h3 className="mb-3 text-sm font-bold">دسته‌بندی</h3>
        {categories.slice(0, 3).map((item) => (
          <label key={item} className="flex items-center gap-2 py-1.5 text-sm">
            <input type="checkbox" className="accent-primary" />
            {item}
          </label>
        ))}
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <h3 className="mb-3 text-sm font-bold">برند</h3>
        {brands.map(([name, count]) => (
          <label
            key={name}
            className="flex items-center justify-between gap-2 py-1.5 text-sm"
          >
            <span className="flex items-center gap-2">
              <input type="checkbox" className="accent-primary" />
              {name}
            </span>
            <small className="text-muted-foreground">{count}</small>
          </label>
        ))}
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <h3 className="mb-3 text-sm font-bold">محدوده قیمت (تومان)</h3>
        <div className="grid grid-cols-2 gap-2">
          <input
            aria-label="از قیمت"
            placeholder="از"
            className="h-10 min-w-0 rounded-md border border-input px-2 text-xs"
          />
          <input
            aria-label="تا قیمت"
            placeholder="تا"
            className="h-10 min-w-0 rounded-md border border-input px-2 text-xs"
          />
        </div>
      </div>
      <div className="mt-4 border-t border-border pt-4">
        <h3 className="mb-2 text-sm font-bold">امتیاز مشتریان</h3>
        <label className="block py-1 text-sm">
          <input type="checkbox" className="me-2 accent-primary" />۴ ستاره و
          بالاتر
        </label>
        <label className="block py-1 text-sm">
          <input type="checkbox" className="me-2 accent-primary" />۳ ستاره و
          بالاتر
        </label>
      </div>
      <label className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-sm font-semibold">
        <input type="checkbox" className="accent-primary" />
        فقط کالاهای موجود
      </label>
    </aside>
  );
}

function SortBar() {
  return (
    <div className="hidden items-center gap-4 rounded-xl border border-border bg-white px-4 py-3 lg:flex">
      <span className="flex items-center gap-2 text-sm font-bold">
        <SlidersHorizontal size={16} /> مرتب‌سازی:
      </span>
      {sortOptions.slice(0, 4).map((item, index) => (
        <Link
          key={item}
          href={`/search?sort=${index}`}
          className={`text-xs ${index === 0 ? "font-bold text-primary" : "text-muted-foreground hover:text-primary"}`}
        >
          {item}
        </Link>
      ))}
    </div>
  );
}

function ProductGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {storefrontProducts.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}

function CategoryPage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-5 sm:px-8 sm:py-8">
      <Breadcrumb title={title} />
      <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="hidden self-start rounded-xl border border-border bg-white p-3 lg:block">
          <h2 className="px-3 py-2 text-sm font-extrabold">
            موبایل و لوازم جانبی
          </h2>
          {categories.map((item, index) => (
            <Link
              key={item}
              href={`/category/mobile?sub=${index}`}
              className={`block rounded-lg px-3 py-2.5 text-sm ${index === 0 ? "bg-primary-soft font-bold text-primary" : "hover:bg-muted"}`}
            >
              {item}
            </Link>
          ))}
        </aside>
        <section className="min-w-0">
          <div className="mb-4">
            <h1 className="text-2xl font-extrabold">{title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              انواع گوشی با گارانتی اصالت
            </p>
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {categories.map((item, index) => (
              <Link
                key={item}
                href={`/category/mobile?sub=${index}`}
                className={`min-h-10 shrink-0 rounded-full border px-4 py-2 text-xs font-semibold ${index === 0 ? "border-primary bg-primary-soft text-primary" : "border-border bg-white"}`}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="mb-4 flex gap-2 overflow-x-auto">
            {["سامسونگ", "اپل", "شیائومی", "هوآوی", "سونی", "نوکیا"].map(
              (brand, index) => (
                <button
                  key={brand}
                  className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold ${index === 0 ? "border-primary bg-primary-soft text-primary" : "border-border bg-white"}`}
                >
                  {brand}
                </button>
              ),
            )}
          </div>
          <div className="mb-3 flex gap-2 lg:hidden">
            <Link
              href="/search/filters"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-bold"
            >
              <Filter size={16} />
              فیلترها
            </Link>
            <Link
              href="/search/sort"
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-bold"
            >
              <SlidersHorizontal size={16} />
              مرتب‌سازی
            </Link>
          </div>
          <div className="mb-3 hidden lg:block">
            <SortBar />
          </div>
          <ProductGrid />
          <div className="mt-5 flex justify-center gap-2">
            {["۱", "۲", "۳"].map((n, index) => (
              <button
                key={n}
                className={`size-10 rounded-lg border text-sm ${index === 0 ? "border-primary bg-primary text-white" : "border-border bg-white"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SearchResults({ query }: { query: string }) {
  const isEmpty =
    query.includes("۹۹") || query.toLowerCase().includes("nothing");
  if (isEmpty) return <EmptyResults query={query} />;
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-5 sm:px-8 sm:py-8">
      <Breadcrumb title="نتایج جست‌وجو" />
      <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
        <FilterPanel />
        <section className="min-w-0">
          <div className="mb-4">
            <h1 className="text-xl font-extrabold">نتایج جست‌وجو</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              ۸۴ کالا برای «{query || "گوشی موبایل"}»
            </p>
          </div>
          <div className="mb-3 flex gap-2 lg:hidden">
            <Link
              href={`/search/filters?q=${encodeURIComponent(query)}`}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-bold"
            >
              <Filter size={16} />
              فیلترها
            </Link>
            <Link
              href={`/search/sort?q=${encodeURIComponent(query)}`}
              className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-white text-sm font-bold"
            >
              <SlidersHorizontal size={16} />
              مرتب‌سازی
            </Link>
          </div>
          <div className="mb-3 hidden lg:block">
            <SortBar />
          </div>
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-primary">
              سامسونگ{" "}
              <Link href="/search" aria-label="حذف فیلتر سامسونگ">
                <X className="ms-1 inline" size={12} />
              </Link>
            </span>
            <span className="rounded-full bg-primary-soft px-3 py-1.5 text-primary">
              فقط کالاهای موجود
            </span>
          </div>
          <ProductGrid />
          <div className="mt-5 flex justify-center gap-2">
            {["۱", "۲", "۳", "…", "۱۱"].map((n, index) => (
              <button
                key={`${n}-${index}`}
                className={`min-h-10 min-w-10 rounded-lg border px-3 text-sm ${index === 0 ? "border-primary bg-primary text-white" : "border-border bg-white"}`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function SearchSuggestions({ query }: { query: string }) {
  return (
    <main className="mx-auto min-h-[55vh] max-w-[900px] px-4 py-7 sm:px-8">
      <Breadcrumb title="جست‌وجو" />
      <h1 className="text-xl font-extrabold">جست‌وجو در محصولات</h1>
      <form
        action="/search"
        className="mt-4 flex h-12 items-center rounded-lg border border-border bg-white px-3"
      >
        <Search className="me-2 text-muted-foreground" size={18} />
        <input
          autoFocus
          name="q"
          defaultValue={query}
          placeholder="نام محصول یا برند را بنویسید"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none"
        />
        <button className="rounded-md bg-primary px-4 py-2 text-xs font-bold text-white">
          جست‌وجو
        </button>
      </form>
      <div className="mt-7 grid gap-8 sm:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-extrabold">جست‌وجوهای اخیر</h2>
          {recentSearches.map((term) => (
            <Link
              key={term}
              href={`/search?q=${encodeURIComponent(term)}`}
              className="flex min-h-11 items-center border-b border-border text-sm"
            >
              <Search className="me-2 text-muted-foreground" size={15} />
              {term}
            </Link>
          ))}
        </section>
        <section>
          <h2 className="mb-3 text-sm font-extrabold">پیشنهاد جست‌وجو</h2>
          {suggestionTerms
            .filter((item) => !query || item.includes(query))
            .concat(query ? [] : suggestionTerms)
            .slice(0, 3)
            .map((term, index) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="flex min-h-11 items-center border-b border-border text-sm hover:text-primary"
              >
                <Search className="me-2 text-muted-foreground" size={15} />
                {term}
                {index === 2 && (
                  <span className="ms-auto text-xs text-primary">
                    در دسته موبایل
                  </span>
                )}
              </Link>
            ))}
        </section>
        <section className="sm:col-span-2">
          <h2 className="mb-3 text-sm font-extrabold">
            پرطرفدارترین جست‌وجوها
          </h2>
          <div className="flex flex-wrap gap-2">
            {["آیفون ۱۷", "هدفون بی‌سیم", "لپ‌تاپ ایسوس", "ساعت هوشمند"].map(
              (term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-border bg-white px-4 py-2 text-xs"
                >
                  {term}
                </Link>
              ),
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function EmptyResults({ query }: { query: string }) {
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-8 sm:px-8">
      <Breadcrumb title="نتایج جست‌وجو" />
      <div className="rounded-xl border border-border bg-white px-5 py-10 text-center sm:py-14">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary-soft text-primary">
          <Search size={26} />
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          نتیجه‌ای برای «{query || "گوشی سامسونگ ۹۹"}» پیدا نشد
        </p>
        <h1 className="mt-2 text-2xl font-extrabold">نتیجه‌ای پیدا نشد</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          عبارت دیگری بنویسید یا از دسته‌بندی‌ها دیدن کنید.
        </p>
        <div className="mt-5 flex justify-center gap-2">
          <Link
            href="/"
            className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white"
          >
            بازگشت به صفحه اصلی
          </Link>
          <Link
            href="/deals"
            className="rounded-lg border border-border px-4 py-2.5 text-sm font-bold"
          >
            مشاهده پرفروش‌ها
          </Link>
        </div>
        <ul className="mx-auto mt-6 max-w-lg space-y-1 text-start text-xs leading-6 text-muted-foreground">
          <li>املای کلمه را بررسی کنید.</li>
          <li>از کلمات کلیدی ساده‌تر یا عمومی‌تر استفاده کنید.</li>
          <li>فیلترهای انتخاب‌شده را کم کنید.</li>
        </ul>
      </div>
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-extrabold">
          شاید این‌ها را دوست داشته باشید
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {storefrontProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

function FilterSheet() {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:hidden">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-title"
        className="max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-background p-5 sm:rounded-2xl"
      >
        <div className="flex items-center justify-between">
          <h1 id="filter-title" className="text-lg font-extrabold">
            فیلترها
          </h1>
          <Link href="/search" aria-label="بستن فیلترها">
            <X size={20} />
          </Link>
        </div>
        <div className="mt-5 space-y-5">
          <fieldset>
            <legend className="mb-3 text-sm font-bold">برند</legend>
            <div className="grid grid-cols-2 gap-3">
              {brands.map(([brand]) => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="accent-primary" />
                  {brand}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-bold">حافظه داخلی</legend>
            <div className="flex flex-wrap gap-2">
              {["۲۵۶ گیگابایت", "۵۱۲ گیگابایت", "۱ ترابایت"].map((item) => (
                <label
                  key={item}
                  className="rounded-full border border-border bg-white px-3 py-2 text-xs"
                >
                  <input type="checkbox" className="me-2 accent-primary" />
                  {item}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend className="mb-3 text-sm font-bold">
              محدوده قیمت (تومان)
            </legend>
            <div className="grid grid-cols-2 gap-2">
              <input
                placeholder="از"
                className="h-11 rounded-lg border border-input bg-white px-3 text-sm"
              />
              <input
                placeholder="تا"
                className="h-11 rounded-lg border border-input bg-white px-3 text-sm"
              />
            </div>
          </fieldset>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-primary" />
            فقط کالاهای موجود
          </label>
        </div>
        <div className="mt-6 flex gap-2">
          <Link
            href="/search"
            className="flex h-11 flex-1 items-center justify-center rounded-lg border border-border text-sm font-bold"
          >
            حذف فیلترها
          </Link>
          <Link
            href="/search?brand=samsung"
            className="flex h-11 flex-1 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white"
          >
            نمایش ۸۴ کالا
          </Link>
        </div>
      </section>
    </div>
  );
}

function SortSheet() {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:hidden">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="sort-title"
        className="w-full max-w-lg rounded-t-2xl bg-background p-5 sm:rounded-2xl"
      >
        <div className="mb-3 flex items-center justify-between">
          <h1 id="sort-title" className="text-lg font-extrabold">
            مرتب‌سازی
          </h1>
          <Link href="/search" aria-label="بستن مرتب‌سازی">
            <X size={20} />
          </Link>
        </div>
        {sortOptions.map((item, index) => (
          <Link
            key={item}
            href={`/search?sort=${index}`}
            className={`flex min-h-12 items-center justify-between border-b border-border text-sm ${index === 0 ? "font-bold text-primary" : ""}`}
          >
            {item}
            {index === 0 && <span>✓</span>}
          </Link>
        ))}
      </section>
    </div>
  );
}

function CompareProducts() {
  const rows = [
    ["قیمت", "۸۹٬۹۰۰٬۰۰۰", "۹۴٬۲۰۰٬۰۰۰", "۶۱٬۴۰۰٬۰۰۰"],
    ["نمایشگر", "۶٫۹ اینچ", "۶٫۹ اینچ", "۶٫۷ اینچ"],
    ["حافظه داخلی", "۵۱۲ گیگابایت", "۲۵۶ گیگابایت", "۵۱۲ گیگابایت"],
    ["رم", "۱۲ گیگابایت", "۱۲ گیگابایت", "۱۶ گیگابایت"],
    ["دوربین اصلی", "۲۰۰ مگاپیکسل", "۴۸ مگاپیکسل", "۵۰ مگاپیکسل"],
    ["باتری", "۵۰۰۰ میلی‌آمپرساعت", "۴۷۰۰ میلی‌آمپرساعت", "۵۵۰۰ میلی‌آمپرساعت"],
  ];
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-6 sm:px-8 sm:py-8">
      <Breadcrumb title="مقایسه کالاها" />
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">مقایسه کالاها</h1>
        <button className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white">
          افزودن کالا
        </button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full min-w-[680px] border-collapse text-center text-sm">
          <thead>
            <tr>
              <th className="w-36 border-b border-border bg-muted p-4 text-start">
                ویژگی
              </th>
              {[
                "گوشی سامسونگ S26 Ultra",
                "گوشی اپل iPhone 17 Pro Max",
                "گوشی شیائومی 16 Ultra",
              ].map((name) => (
                <th
                  key={name}
                  className="min-w-44 border-s border-b border-border p-4"
                >
                  <div className="mx-auto mb-3 grid size-24 place-items-center rounded-xl bg-primary-soft text-primary">
                    <span className="text-3xl">▯</span>
                  </div>
                  {name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, ...values]) => (
              <tr key={label} className="border-b border-border last:border-0">
                <th className="bg-muted/50 p-4 text-start font-semibold">
                  {label}
                </th>
                {values.map((value, index) => (
                  <td key={index} className="border-s border-border p-4">
                    {value}
                    {label === "قیمت" && (
                      <small className="ms-1 text-muted-foreground">
                        تومان
                      </small>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="bg-muted/50 p-4"></th>
              {[0, 1, 2].map((i) => (
                <td key={i} className="border-s border-border p-4">
                  <button className="rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white">
                    افزودن به سبد
                  </button>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </main>
  );
}

export default function StorefrontBrowseUI({
  mode,
  query = "",
}: {
  mode: StorefrontBrowseMode;
  query?: string;
}) {
  if (mode === "category") return <CategoryPage title="گوشی موبایل" />;
  if (mode === "search") return <SearchResults query={query} />;
  if (mode === "filters")
    return (
      <>
        <SearchResults query={query} />
        <FilterSheet />
      </>
    );
  if (mode === "sort")
    return (
      <>
        <SearchResults query={query} />
        <SortSheet />
      </>
    );
  if (mode === "suggestions") return <SearchSuggestions query={query} />;
  if (mode === "empty") return <EmptyResults query={query} />;
  return <CompareProducts />;
}
