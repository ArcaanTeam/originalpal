import Link from "next/link";
import {
  ChevronLeft,
  CircleCheck,
  Headphones,
  Laptop,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react";

const categories = [
  {
    name: "موبایل و لوازم جانبی",
    slug: "mobile",
    items: [
      "گوشی موبایل",
      "تبلت",
      "ساعت هوشمند",
      "هدفون",
      "شارژر و کابل",
      "قاب و گلس",
    ],
    Icon: Smartphone,
  },
  {
    name: "لپ‌تاپ و کامپیوتر",
    slug: "computers",
    items: ["لپ‌تاپ", "مانیتور", "قطعات کامپیوتر", "لوازم جانبی"],
    Icon: Laptop,
  },
  {
    name: "لوازم خانگی",
    slug: "home",
    items: ["آشپزخانه", "نظافت", "روشنایی", "دکور"],
    Icon: Tablet,
  },
  {
    name: "مد و پوشاک",
    slug: "fashion",
    items: ["لباس زنانه", "لباس مردانه", "کیف و کفش", "اکسسوری"],
    Icon: Watch,
  },
];
const dealItems = [
  [
    "گوشی سامسونگ Galaxy S26 Ultra",
    "۸۹٬۹۰۰٬۰۰۰",
    "۹۸٬۵۰۰٬۰۰۰",
    "۹٪",
    Smartphone,
  ],
  ["گوشی سامسونگ Galaxy S26", "۶۴٬۸۰۰٬۰۰۰", "", "", Smartphone],
  ["گوشی سامسونگ Galaxy A57", "۲۴٬۲۰۰٬۰۰۰", "۲۶٬۹۰۰٬۰۰۰", "۱۰٪", Smartphone],
  ["هدفون سونی WH-1000XM6", "۱۸٬۹۰۰٬۰۰۰", "۲۲٬۴۰۰٬۰۰۰", "۱۶٪", Headphones],
  ["تبلت لنوو Tab P12", "۱۹٬۶۰۰٬۰۰۰", "۲۳٬۱۰۰٬۰۰۰", "۱۵٪", Tablet],
  ["لپ‌تاپ ایسوس ZenBook 14", "۷۲٬۵۰۰٬۰۰۰", "۸۱٬۰۰۰٬۰۰۰", "۱۱٪", Laptop],
  ["هدفون جی‌بی‌ال Tour One", "۹٬۸۰۰٬۰۰۰", "۱۲٬۴۰۰٬۰۰۰", "۲۱٪", Headphones],
  ["ساعت هوشمند سامسونگ Watch 9", "۱۴٬۲۰۰٬۰۰۰", "", "", Watch],
] as const;

function PageHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-5">
      <div className="mb-2 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        <ChevronLeft className="mx-1 inline" size={13} />
        {title}
      </div>
      <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function CategoriesUI() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 sm:py-8">
      <PageHeading
        title="همه دسته‌بندی‌ها"
        subtitle="دسته مورد نظرتان را انتخاب کنید و محصولات را ببینید."
      />
      <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="hidden rounded-xl border border-border bg-white p-4 lg:block">
          <h2 className="mb-3 font-bold">دسته‌ها</h2>
          {categories.map(({ name, slug, Icon }) => (
            <Link
              key={slug}
              href={`/category/${slug}`}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold hover:bg-primary-soft hover:text-primary"
            >
              <Icon size={19} />
              {name}
              <ChevronLeft className="ms-auto" size={15} />
            </Link>
          ))}
        </aside>
        <div className="grid gap-4 sm:grid-cols-2">
          {categories.map(({ name, slug, items, Icon }, index) => (
            <section
              key={slug}
              className="overflow-hidden rounded-xl border border-border bg-white"
            >
              <Link
                href={`/category/${slug}`}
                className={`flex items-center justify-between p-5 ${index % 2 ? "bg-[#f7f4ec]" : "bg-primary-soft"}`}
              >
                <span>
                  <span className="block text-lg font-extrabold">{name}</span>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    مشاهده همه محصولات
                  </span>
                </span>
                <span className="grid size-14 place-items-center rounded-xl bg-white text-primary">
                  <Icon size={28} strokeWidth={1.5} />
                </span>
              </Link>
              <ul className="grid grid-cols-2 gap-1 p-3">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/category/${slug}`}
                      className="flex min-h-11 items-center justify-between rounded-lg px-3 text-sm hover:bg-muted"
                    >
                      <span>{item}</span>
                      <ChevronLeft
                        size={14}
                        className="text-muted-foreground"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-border bg-white p-4 text-sm">
        <CircleCheck className="shrink-0 text-primary" size={20} />
        <span>همه محصولات با ضمانت اصالت و گارانتی معتبر ارائه می‌شوند.</span>
      </div>
    </main>
  );
}

function DealsUI() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-8 sm:py-8">
      <PageHeading
        title="پیشنهاد شگفت‌انگیز"
        subtitle="تخفیف‌های محدود با موجودی کم؛ فرصت خرید را از دست ندهید."
      />
      <section className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-[#095a5a] p-4 text-white sm:p-5">
        <div>
          <p className="text-sm font-bold">
            زمان باقی‌مانده تا پایان پیشنهادها
          </p>
          <p className="mt-1 text-xs text-white/70">
            تخفیف‌ها را پیش از اتمام موجودی ببینید
          </p>
        </div>
        <div className="flex items-center gap-2" dir="ltr">
          {[
            ["۰۵", "ساعت"],
            ["۲۴", "دقیقه"],
            ["۱۰", "ثانیه"],
          ].map(([n, label]) => (
            <div
              key={label}
              className="min-w-14 rounded-lg bg-white/10 px-2 py-1.5 text-center"
            >
              <b className="block text-lg tabular-nums">{n}</b>
              <small className="text-[10px] text-white/75">{label}</small>
            </div>
          ))}
        </div>
      </section>
      <div className="mb-4 flex items-center gap-2 overflow-x-auto">
        {["همه", "موبایل", "لپ‌تاپ", "لوازم خانگی"].map((item, index) => (
          <button
            key={item}
            className={`min-h-10 rounded-full px-5 text-sm font-semibold whitespace-nowrap ${index === 0 ? "bg-primary text-white" : "border border-border bg-white hover:bg-muted"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {dealItems.map(([name, price, old, discount, Icon]) => (
          <article
            key={name}
            className="overflow-hidden rounded-xl border border-border bg-white"
          >
            <div className="relative grid aspect-square place-items-center bg-gradient-to-br from-[#e3f1f0] to-[#d7e4e0]">
              <Icon size={76} strokeWidth={1.1} className="text-primary/75" />
              {discount && (
                <span className="absolute start-2 top-2 rounded-full bg-destructive px-2 py-1 text-[10px] font-bold text-white">
                  {discount} تخفیف
                </span>
              )}
            </div>
            <div className="p-3">
              <h2 className="line-clamp-2 min-h-11 text-sm leading-6 font-semibold">
                {name}
              </h2>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>۴٫۸ ★</span>
                <span>ارسال رایگان</span>
              </div>
              <div className="mt-2 flex items-baseline justify-end gap-1">
                <strong className="text-sm tabular-nums">{price}</strong>
                <span className="text-[10px]">تومان</span>
              </div>
              {old && (
                <p className="text-end text-[11px] text-muted-foreground line-through">
                  {old} تومان
                </p>
              )}
            </div>
          </article>
        ))}
      </section>
      <nav aria-label="صفحه‌بندی" className="mt-6 flex justify-center gap-2">
        <button className="size-10 rounded-lg border border-border bg-white text-sm">
          ۱
        </button>
        <button className="size-10 rounded-lg border border-border bg-white text-sm">
          ۲
        </button>
        <button className="size-10 rounded-lg bg-primary text-sm text-white">
          ۳
        </button>
      </nav>
    </main>
  );
}

export default function StorefrontCatalogUI({
  mode,
}: {
  mode: "categories" | "deals";
}) {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="min-h-[70vh] bg-background text-foreground"
    >
      {mode === "categories" ? <CategoriesUI /> : <DealsUI />}
    </div>
  );
}
