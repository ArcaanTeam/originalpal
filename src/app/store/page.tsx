import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  BadgePercent,
  ChevronLeft,
  Headphones,
  Heart,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";

const categories = [
  { icon: "📱", title: "موبایل و دیجیتال", tone: "bg-[#eaf3ff]" },
  { icon: "💻", title: "کامپیوتر و لپ‌تاپ", tone: "bg-[#f0edff]" },
  { icon: "🎧", title: "صوتی و تصویری", tone: "bg-[#fff1e8]" },
  { icon: "⌚", title: "ساعت هوشمند", tone: "bg-[#e9f6f0]" },
  { icon: "📷", title: "دوربین و عکاسی", tone: "bg-[#fff4dc]" },
  { icon: "🎮", title: "بازی و سرگرمی", tone: "bg-[#fcecf1]" },
];

const products = [
  {
    name: "گوشی موبایل سامسونگ Galaxy A55",
    detail: "۲۵۶ گیگابایت · ۸ گیگابایت رم",
    price: "۲۳٬۸۹۰٬۰۰۰",
    old: "۲۷٬۴۰۰٬۰۰۰",
    discount: "۱۳٪",
    art: "phone",
    emoji: "📱",
    color: "from-sky-100 to-blue-50",
  },
  {
    name: "هدفون بی‌سیم سونی WH-CH720N",
    detail: "نویز کنسلینگ · بلوتوث",
    price: "۷٬۴۵۰٬۰۰۰",
    old: "۸٬۹۰۰٬۰۰۰",
    discount: "۱۶٪",
    art: "headphones",
    emoji: "🎧",
    color: "from-violet-100 to-indigo-50",
  },
  {
    name: "ساعت هوشمند اپل Watch SE",
    detail: "نسل دوم · بدنه آلومینیومی",
    price: "۱۵٬۶۰۰٬۰۰۰",
    old: "۱۸٬۲۰۰٬۰۰۰",
    discount: "۱۴٪",
    art: "watch",
    emoji: "⌚",
    color: "from-emerald-100 to-teal-50",
  },
  {
    name: "اسپیکر بلوتوثی JBL Flip 6",
    detail: "ضدآب · صدای قدرتمند",
    price: "۶٬۲۹۰٬۰۰۰",
    old: "۷٬۱۰۰٬۰۰۰",
    discount: "۱۱٪",
    art: "speaker",
    emoji: "🔊",
    color: "from-amber-100 to-orange-50",
  },
];

const persianDigits = (value: string) => value;

function StoreHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[#eeece7] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center gap-5 px-4 py-3 sm:px-7 lg:px-10">
        <button
          aria-label="منو"
          className="grid size-10 shrink-0 place-items-center rounded-xl border border-[#eeece7] text-[#38413d] md:hidden"
        >
          <Menu size={19} />
        </button>
        <Link
          href="/store"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="اورجینال پل، صفحه اصلی"
        >
          <span className="grid size-10 place-items-center rounded-[14px] bg-[#087e68] text-white shadow-sm">
            <ShoppingBag size={21} strokeWidth={2.2} />
          </span>
          <span className="text-[19px] font-black tracking-tight text-[#172a25]">
            اورجینال<span className="text-[#087e68]">‌پل</span>
          </span>
        </Link>
        <form
          action="/store"
          className="relative hidden max-w-[520px] flex-1 md:block"
        >
          <Search
            size={18}
            className="absolute top-1/2 right-4 -translate-y-1/2 text-[#929a96]"
          />
          <input
            name="q"
            placeholder="جست‌وجوی محصول، برند یا دسته‌بندی..."
            className="h-11 w-full rounded-xl border border-[#eeece7] bg-[#f8f8f6] ps-4 pe-12 text-sm text-[#25352f] transition outline-none placeholder:text-[#9ba19e] focus:border-[#9bc9bd] focus:bg-white focus:ring-4 focus:ring-[#087e68]/[0.07]"
          />
        </form>
        <nav className="ms-auto hidden items-center gap-6 text-[13px] font-semibold text-[#56625d] lg:flex">
          <a href="#categories" className="transition hover:text-[#087e68]">
            دسته‌بندی‌ها
          </a>
          <a href="#offers" className="transition hover:text-[#087e68]">
            پیشنهادهای ویژه
          </a>
          <a href="#popular" className="transition hover:text-[#087e68]">
            پرفروش‌ها
          </a>
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <button
            aria-label="علاقه‌مندی‌ها"
            className="hidden size-10 place-items-center rounded-xl text-[#56625d] hover:bg-[#f5f6f3] sm:grid"
          >
            <Heart size={19} />
          </button>
          <Link
            href="/login"
            className="hidden h-10 items-center rounded-xl border border-[#e6e9e5] px-4 text-[13px] font-bold text-[#34433d] transition hover:border-[#087e68] hover:text-[#087e68] sm:flex"
          >
            ورود | ثبت‌نام
          </Link>
          <button
            aria-label="سبد خرید"
            className="relative grid size-10 place-items-center rounded-xl bg-[#087e68] text-white shadow-sm shadow-[#087e68]/20"
          >
            <ShoppingBag size={19} />
            <span className="absolute -start-1 -top-1 grid size-[18px] place-items-center rounded-full border-2 border-white bg-[#f2ae49] text-[9px] font-bold text-[#28332d]">
              ۰
            </span>
          </button>
        </div>
      </div>
      <form action="/store" className="relative mx-4 mb-3 md:hidden">
        <Search
          size={17}
          className="absolute top-1/2 right-3.5 -translate-y-1/2 text-[#929a96]"
        />
        <input
          name="q"
          placeholder="جست‌وجوی محصولات..."
          className="h-10 w-full rounded-xl border border-[#eeece7] bg-[#f8f8f6] ps-3 pe-10 text-sm outline-none placeholder:text-[#9ba19e] focus:border-[#9bc9bd]"
        />
      </form>
    </header>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <article className="group relative rounded-2xl border border-[#eeece7] bg-white p-3 transition duration-200 hover:-translate-y-1 hover:border-[#cbded7] hover:shadow-[0_14px_35px_-20px_rgba(24,66,53,.25)] sm:p-4">
      <span className="absolute top-3 right-3 z-10 rounded-full bg-[#e9f5f0] px-2.5 py-1 text-[10px] font-bold text-[#087e68]">
        {product.discount} تخفیف
      </span>
      <button
        aria-label="افزودن به علاقه‌مندی‌ها"
        className="absolute top-3 left-3 z-10 grid size-8 place-items-center rounded-full bg-white/90 text-[#88918c] transition hover:text-rose-500"
      >
        <Heart size={16} />
      </button>
      <div
        className={`relative mb-3 flex aspect-[1.16/1] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${product.color}`}
      >
        <span
          aria-hidden
          className="absolute size-32 rounded-full border border-white/60 bg-white/30 blur-[1px]"
        />
        <span
          aria-hidden
          className="relative drop-shadow-[0_12px_12px_rgba(30,45,40,.16)] transition duration-300 group-hover:scale-110"
          style={{ fontSize: "clamp(3.5rem, 8vw, 5.8rem)" }}
        >
          {product.emoji}
        </span>
        <span className="absolute right-2 bottom-2 rounded-lg bg-white/80 px-2 py-1 text-[9px] font-semibold text-[#56625d] backdrop-blur">
          اصل و ضمانت‌شده
        </span>
      </div>
      <div className="min-h-[52px]">
        <h3 className="line-clamp-2 text-[12px] leading-6 font-bold text-[#263630] sm:text-[13px]">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[10px] text-[#929a96]">{product.detail}</p>
      </div>
      <div className="mt-3 flex items-end justify-between gap-1">
        <span className="text-[9px] text-[#8a938e]">تومان</span>
        <div className="text-left">
          <p className="text-[13px] font-black text-[#25352f] tabular-nums sm:text-[15px]">
            {persianDigits(product.price)}
          </p>
          <p className="mt-0.5 text-[10px] text-[#a2a8a4] line-through">
            {product.old}
          </p>
        </div>
      </div>
      <button className="mt-3 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-[#eff6f2] text-[11px] font-bold text-[#087e68] transition hover:bg-[#087e68] hover:text-white">
        <ShoppingBag size={14} /> افزودن به سبد
      </button>
    </article>
  );
}

export default async function StorePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const filtered = q
    ? products.filter((p) => `${p.name} ${p.detail}`.includes(q))
    : products;
  return (
    <main className="min-h-screen bg-[#fbfbf9] text-[#263630]" dir="rtl">
      <div className="bg-[#123b32] px-4 py-2 text-center text-[11px] font-medium text-white sm:text-xs">
        ارسال رایگان برای سفارش‌های بالای ۳ میلیون تومان{" "}
        <span className="mx-1 text-[#a6d8c4]">·</span> خرید مطمئن، تجربه‌ای
        متفاوت
      </div>
      <StoreHeader />
      <div className="mx-auto max-w-[1280px] px-4 pt-5 pb-16 sm:px-7 sm:pt-8 lg:px-10">
        <section className="relative isolate flex min-h-[300px] overflow-hidden rounded-[24px] bg-[#e8f3ec] sm:min-h-[370px] lg:min-h-[410px]">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_50%,rgba(141,194,167,.38),transparent_38%),linear-gradient(110deg,#eaf3eb_0%,#e7f2ec_54%,#d7eae0_100%)]" />
          <div className="relative z-10 flex w-full flex-col justify-center px-6 py-9 sm:w-[58%] sm:px-10 lg:px-16">
            <span className="mb-4 flex w-fit items-center gap-1.5 rounded-full border border-[#c4dfd0] bg-white/65 px-3 py-1.5 text-[10px] font-bold text-[#28785e] sm:text-xs">
              <Sparkles size={13} /> انتخاب هوشمندانه، خرید مطمئن
            </span>
            <h1 className="max-w-[520px] text-[27px] leading-[1.65] font-black tracking-tight text-[#173a30] sm:text-[38px] lg:text-[46px]">
              کیفیت اصل،
              <br />
              <span className="text-[#087e68]">با قیمتی که دوست دارید</span>
            </h1>
            <p className="mt-3 max-w-[390px] text-[12px] leading-7 text-[#63756d] sm:text-[14px]">
              دنیای محصولات دیجیتال و روزمره را با ضمانت اصالت و ارسال سریع کشف
              کنید.
            </p>
            <a
              href="#offers"
              className="mt-6 flex h-11 w-fit items-center gap-2 rounded-xl bg-[#087e68] px-5 text-[12px] font-bold text-white shadow-lg shadow-[#087e68]/20 transition hover:bg-[#066b59]"
            >
              دیدن پیشنهادها <ArrowLeft size={16} />
            </a>
            <div className="mt-7 flex items-center gap-4 text-[10px] font-semibold text-[#71827a] sm:gap-6 sm:text-[11px]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-[#087e68]" /> ضمانت اصالت
                کالا
              </span>
              <span className="flex items-center gap-1.5">
                <Truck size={15} className="text-[#087e68]" /> ارسال سریع
              </span>
            </div>
          </div>
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-0 hidden w-[48%] items-center justify-center sm:flex"
          >
            <div className="absolute top-[17%] left-[18%] size-44 rounded-full bg-white/40 blur-2xl lg:size-64" />
            <div className="relative flex items-center justify-center">
              <div className="absolute top-4 -right-20 grid size-32 rotate-[-11deg] place-items-center rounded-[28px] border border-white/70 bg-white/55 text-6xl shadow-xl shadow-[#517c64]/10 backdrop-blur-sm lg:size-40 lg:text-7xl">
                🎧
              </div>
              <div className="relative z-10 grid size-44 rotate-[7deg] place-items-center rounded-[32px] border border-white/70 bg-white/70 text-8xl shadow-[0_25px_55px_-25px_rgba(17,66,47,.38)] backdrop-blur-md lg:size-60 lg:text-[130px]">
                📱
              </div>
              <div className="absolute -bottom-7 -left-16 grid size-28 rotate-[-8deg] place-items-center rounded-[26px] border border-white/70 bg-white/65 text-6xl shadow-lg backdrop-blur lg:size-36 lg:text-7xl">
                ⌚
              </div>
              <span className="absolute top-3 -left-24 rounded-2xl bg-white px-3 py-2 text-[11px] font-black text-[#087e68] shadow-lg lg:-left-32 lg:px-4 lg:py-3">
                تا ۳۰٪ تخفیف
              </span>
            </div>
          </div>
          <div className="absolute -right-12 -bottom-16 -z-10 size-48 rounded-full border-[22px] border-white/20 sm:hidden" />
        </section>

        <section id="categories" className="pt-9 sm:pt-12">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold tracking-wide text-[#087e68]">
                خرید آسان، انتخاب متنوع
              </p>
              <h2 className="mt-1 text-[17px] font-black text-[#263630] sm:text-xl">
                دسته‌بندی‌های محبوب
              </h2>
            </div>
            <a
              href="#popular"
              className="flex items-center gap-1 text-[11px] font-bold text-[#087e68]"
            >
              همه دسته‌ها <ChevronLeft size={15} />
            </a>
          </div>
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-3">
            {categories.map((category) => (
              <a
                key={category.title}
                href="#popular"
                className="group flex min-h-[104px] flex-col items-center justify-center gap-2 rounded-2xl border border-[#efeee9] bg-white px-2 text-center transition hover:-translate-y-0.5 hover:border-[#cbded7] hover:shadow-md sm:min-h-[126px]"
              >
                <span
                  className={`grid size-12 place-items-center rounded-[17px] ${category.tone} text-[25px] transition group-hover:scale-105`}
                >
                  {category.icon}
                </span>
                <span className="text-[10px] font-bold text-[#4e5c55] sm:text-xs">
                  {category.title}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section
          id="offers"
          className="mt-10 rounded-[22px] bg-[#173d33] p-4 sm:mt-14 sm:p-6 lg:p-7"
        >
          <div className="mb-4 flex items-center justify-between gap-3 sm:mb-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-[#f3b653] text-[#263630]">
                <BadgePercent size={19} />
              </span>
              <div>
                <p className="text-[10px] font-medium text-[#a8ccc0]">
                  فرصت‌های جذاب امروز
                </p>
                <h2 className="mt-0.5 text-[16px] font-black text-white sm:text-lg">
                  پیشنهادهای ویژه
                </h2>
              </div>
            </div>
            <a
              href="#popular"
              className="flex items-center gap-1 text-[10px] font-bold text-[#cde7dc] transition hover:text-white sm:text-xs"
            >
              مشاهده همه <ChevronLeft size={15} />
            </a>
          </div>
          {q && (
            <p className="mb-3 text-xs text-[#d4e8df]">
              نتایج جست‌وجو برای «{q}»
            </p>
          )}
          {filtered.length ? (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-xl bg-white/10 px-4 py-10 text-center text-sm text-white">
              محصولی برای «{q}» پیدا نشد. عبارت دیگری را جست‌وجو کنید.
            </div>
          )}
        </section>

        <section
          id="popular"
          className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#e9eee9] bg-white px-5 py-5 sm:mt-12 sm:flex-row sm:px-8"
        >
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-[#f2f7f3] text-[#087e68]">
              <Headphones size={19} />
            </span>
            <div>
              <h2 className="text-sm font-black">
                برای انتخاب بهتر، کنار شماییم
              </h2>
              <p className="mt-1 text-[10px] text-[#838d87]">
                پاسخ‌گوی پرسش‌های شما درباره محصولات
              </p>
            </div>
          </div>
          <a
            href="mailto:hello@originalpal.com"
            className="flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#dce9e1] px-4 text-xs font-bold text-[#087e68] transition hover:bg-[#f2f7f3] sm:w-auto"
          >
            تماس با پشتیبانی <ArrowUpLeft size={15} />
          </a>
        </section>
      </div>
      <footer className="border-t border-[#ecebe6] bg-white">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-4 py-6 text-center text-[10px] text-[#8a938e] sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-10">
          <span className="font-black text-[#34433d]">
            اورجینال‌پل{" "}
            <span className="font-normal text-[#8a938e]">
              · خریدی مطمئن، هر روز
            </span>
          </span>
          <span>© تمامی حقوق برای اورجینال‌پل محفوظ است.</span>
        </div>
      </footer>
    </main>
  );
}
