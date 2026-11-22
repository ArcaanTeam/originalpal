import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  ChevronLeft,
  CircleCheck,
  Headphones,
  Heart,
  Laptop,
  Menu,
  Search,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Tablet,
  Truck,
  Watch,
} from "lucide-react";

const categories = [
  {
    label: "موبایل و لوازم جانبی",
    detail: "گوشی، قاب و گلس",
    href: "/category/mobile",
    Icon: Smartphone,
  },
  {
    label: "لپ‌تاپ و کامپیوتر",
    detail: "لپ‌تاپ، تبلت و قطعات",
    href: "/category/computers",
    Icon: Laptop,
  },
  {
    label: "لوازم خانگی",
    detail: "آشپزخانه و خانه",
    href: "/category/home",
    Icon: Sparkles,
  },
  {
    label: "مد و پوشاک",
    detail: "استایل هر روز",
    href: "/category/fashion",
    Icon: ShoppingBag,
  },
];

type StoreProduct = {
  name: string;
  price: string;
  old?: string;
  off?: string;
  Icon: typeof Smartphone;
  color: string;
};

const products: StoreProduct[] = [
  {
    name: "گوشی سامسونگ Galaxy S26 Ultra",
    price: "۸۹٬۹۰۰٬۰۰۰",
    old: "۹۸٬۵۰۰٬۰۰۰",
    off: "۹٪",
    Icon: Smartphone,
    color: "from-[#e4eeee] to-[#cbdcda]",
  },
  {
    name: "گوشی شیائومی 16 Ultra",
    price: "۶۱٬۴۰۰٬۰۰۰",
    old: "۷۲٬۹۰۰٬۰۰۰",
    off: "۱۶٪",
    Icon: Smartphone,
    color: "from-[#f3e9df] to-[#e4d0bf]",
  },
  {
    name: "هدفون سونی WH-1000XM6",
    price: "۱۸٬۹۰۰٬۰۰۰",
    old: "۲۲٬۴۰۰٬۰۰۰",
    off: "۱۶٪",
    Icon: Headphones,
    color: "from-[#e9e7ef] to-[#d2cfe0]",
  },
  {
    name: "تبلت لنوو Tab P12",
    price: "۱۹٬۶۰۰٬۰۰۰",
    old: "۲۳٬۱۰۰٬۰۰۰",
    off: "۱۵٪",
    Icon: Tablet,
    color: "from-[#e9edf3] to-[#cbd5e3]",
  },
  {
    name: "لپ‌تاپ ایسوس ZenBook 14",
    price: "۷۲٬۵۰۰٬۰۰۰",
    old: "۸۱٬۰۰۰٬۰۰۰",
    off: "۱۱٪",
    Icon: Laptop,
    color: "from-[#e9eeee] to-[#ccd7d7]",
  },
  {
    name: "هدفون جی‌بی‌ال Tour One",
    price: "۹٬۸۰۰٬۰۰۰",
    old: "۱۲٬۴۰۰٬۰۰۰",
    off: "۲۱٪",
    Icon: Headphones,
    color: "from-[#f1e6d5] to-[#dfc9a8]",
  },
];

const recommendations = [
  {
    ...products[0],
    name: "گوشی اپل iPhone 17 Pro Max",
    price: "۹۴٬۲۰۰٬۰۰۰",
    old: undefined,
    off: undefined,
  },
  products[1],
  {
    ...products[2],
    name: "ساعت هوشمند سامسونگ Watch 9",
    price: "۱۴٬۲۰۰٬۰۰۰",
    old: undefined,
    off: undefined,
    Icon: Watch,
  },
  products[3],
];

const articles = [
  [
    "راهنمای خرید",
    "راهنمای خرید گوشی پرچم‌دار: چه نکاتی را بررسی کنیم؟",
    "مریم احمدی · ۱۴۰۵/۰۸/۰۳ · ۷ دقیقه مطالعه",
  ],
  [
    "نقد و بررسی",
    "مقایسه نمایشگرهای AMOLED و LCD در گوشی‌های امروزی",
    "حسین کریمی · ۱۴۰۵/۰۸/۰۱ · ۵ دقیقه مطالعه",
  ],
  [
    "راهنمای خرید",
    "چطور اصالت کالای دیجیتال را تشخیص دهیم؟",
    "سارا موسوی · ۱۴۰۵/۰۷/۲۹ · ۶ دقیقه مطالعه",
  ],
  [
    "نقد و بررسی",
    "بهترین هدفون‌های نویزکنسلینگ برای کار و سفر",
    "رضا نوروزی · ۱۴۰۵/۰۷/۲۵ · ۸ دقیقه مطالعه",
  ],
];

export function StoreHeader() {
  return (
    <>
      <header className="bg-primary text-primary-foreground">
        <div className="mx-auto flex min-h-[76px] max-w-[1280px] items-center gap-5 px-4 lg:px-8">
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
              <ShoppingBag size={20} />
            </span>
            اورجینال پل
          </Link>
          <form
            action="/search"
            className="hidden h-11 max-w-[660px] min-w-48 flex-1 items-center overflow-hidden rounded-lg bg-white text-foreground sm:flex"
          >
            <Search className="mx-3 shrink-0 text-muted-foreground" size={18} />
            <input
              name="q"
              placeholder="جست‌وجو در میان هزاران کالای اصیل..."
              className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button className="h-full bg-accent px-5 text-sm font-bold text-accent-foreground">
              جست‌وجو
            </button>
          </form>
          <div className="ms-auto hidden items-center gap-2 sm:flex">
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              سلام، وارد شوید
            </Link>
            <Link
              href="/account/orders"
              className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/10"
            >
              حساب من
            </Link>
            <Link
              href="/cart"
              className="flex items-center gap-2 rounded-md bg-white px-4 py-2.5 text-sm font-bold text-primary"
            >
              <ShoppingBag size={17} /> سبد خرید{" "}
              <span className="grid size-5 place-items-center rounded-full bg-accent text-xs text-accent-foreground">
                ۲
              </span>
            </Link>
          </div>
          <div className="ms-auto flex items-center gap-3 sm:hidden">
            <Link
              href="/cart"
              aria-label="سبد خرید"
              className="relative grid size-10 place-items-center rounded-lg bg-white/10"
            >
              <ShoppingBag size={20} />
              <span className="absolute -end-1 -top-1 grid size-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                ۲
              </span>
            </Link>
            <button
              aria-label="باز کردن منو"
              className="grid size-10 place-items-center rounded-lg bg-white/10"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      <nav
        aria-label="دسته‌بندی اصلی"
        className="hidden border-b border-border bg-white md:block"
      >
        <div className="mx-auto flex max-w-[1280px] items-center gap-7 overflow-x-auto px-8 text-sm font-semibold text-foreground">
          {[
            ["همه دسته‌ها", "/categories"],
            ["پرفروش‌ها", "/deals"],
            ["تخفیف‌ها", "/deals"],
            ["موبایل", "/category/mobile"],
            ["لپ‌تاپ", "/category/computers"],
            ["لوازم خانگی", "/category/home"],
            ["مد و پوشاک", "/category/fashion"],
            ["کتاب", "/magazine"],
            ["مجله", "/magazine"],
            ["فروشنده شوید", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className="py-4 whitespace-nowrap transition-colors hover:text-primary"
            >
              {label}
            </Link>
          ))}
        </div>
      </nav>
      <form
        action="/search"
        className="flex h-11 items-center border-b border-border bg-white px-4 sm:hidden"
      >
        <Search size={17} className="me-2 text-muted-foreground" />
        <input
          name="q"
          placeholder="جست‌وجو در محصولات"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </form>
    </>
  );
}

function HeroBanner() {
  return (
    <section className="relative isolate overflow-hidden rounded-xl bg-[#095a5a] px-6 py-9 text-white sm:px-10 sm:py-12 lg:min-h-[300px] lg:px-14 lg:py-14">
      <div className="absolute -end-12 -top-24 -z-10 size-72 rounded-full border-[42px] border-white/5" />
      <div className="absolute end-16 -bottom-40 -z-10 size-72 rounded-full bg-[#0b6e6e]" />
      <div className="relative max-w-xl">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold">
          <Sparkles size={14} className="text-accent" /> جشنواره زمستانه
        </span>
        <h1 className="mt-4 text-3xl leading-[1.5] font-extrabold sm:text-4xl">
          اورجینال پل
          <br />
          <span className="text-accent">تا ۴۰٪ تخفیف</span> روی کالای دیجیتال
        </h1>
        <p className="mt-2 text-sm leading-7 text-white/80">
          انتخابی مطمئن از میان بهترین برندها، با ضمانت اصالت و ارسال سریع.
        </p>
        <Link
          href="/deals"
          className="mt-5 inline-flex h-11 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-bold text-accent-foreground transition hover:brightness-95"
        >
          مشاهده تخفیف‌ها <ChevronLeft size={17} />
        </Link>
      </div>
      <div
        aria-hidden="true"
        className="absolute end-12 top-1/2 hidden -translate-y-1/2 items-center gap-4 lg:flex"
      >
        <div className="grid size-36 rotate-[-8deg] place-items-center rounded-[30px] border border-white/20 bg-white/10 shadow-2xl">
          <Smartphone size={72} strokeWidth={1.2} />
        </div>
        <div className="grid size-44 rotate-[6deg] place-items-center rounded-[34px] border border-white/20 bg-white/10 shadow-2xl">
          <Headphones size={82} strokeWidth={1.2} />
        </div>
      </div>
    </section>
  );
}

function CategoryTile({ item }: { item: (typeof categories)[number] }) {
  const Icon = item.Icon;
  return (
    <Link
      href={item.href}
      className="group flex min-w-[215px] items-center gap-3 rounded-xl border border-border bg-white p-4 transition hover:border-primary/40 hover:shadow-sm"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
        <Icon size={23} strokeWidth={1.7} />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-bold">{item.label}</span>
        <span className="mt-1 block text-xs text-muted-foreground">
          {item.detail}
        </span>
      </span>
      <ChevronLeft
        size={16}
        className="ms-auto text-muted-foreground transition group-hover:text-primary"
      />
    </Link>
  );
}

function ProductCard({ product }: { product: (typeof products)[number] }) {
  const Icon = product.Icon;
  return (
    <article className="group min-w-[178px] overflow-hidden rounded-xl border border-border bg-white transition hover:-translate-y-0.5 hover:shadow-md sm:min-w-0">
      <div
        className={`relative grid aspect-square place-items-center bg-gradient-to-br ${product.color}`}
      >
        <span className="grid size-24 place-items-center rounded-[28px] bg-white/55 text-[#456563] shadow-sm">
          <Icon size={54} strokeWidth={1.2} />
        </span>
        {product.off && (
          <span className="absolute start-3 top-3 rounded-full bg-destructive px-2.5 py-1 text-[11px] font-bold text-white">
            {product.off} تخفیف
          </span>
        )}
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="absolute end-2 top-2 grid size-9 place-items-center rounded-full bg-white/90 text-muted-foreground hover:text-destructive"
        >
          <Heart size={17} />
        </button>
      </div>
      <div className="p-3">
        <h3 className="line-clamp-2 min-h-11 text-sm leading-6 font-semibold">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] text-muted-foreground">
            ارسال رایگان
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
            ۴٫۸ <span className="text-accent">★</span>
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-end gap-2">
          <span className="text-sm font-extrabold tabular-nums">
            {product.price}
          </span>
          <span className="text-[10px] text-muted-foreground">تومان</span>
        </div>
        {product.old && (
          <div className="mt-0.5 text-end text-xs text-muted-foreground line-through">
            {product.old} تومان
          </div>
        )}
      </div>
    </article>
  );
}

function SectionHeading({
  title,
  href,
  action = "مشاهده همه",
}: {
  title: string;
  href: string;
  action?: string;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <h2 className="text-lg font-extrabold sm:text-xl">{title}</h2>
      <Link
        href={href}
        className="inline-flex items-center gap-1 text-xs font-bold whitespace-nowrap text-primary sm:text-sm"
      >
        {action}
        <ArrowLeft size={15} />
      </Link>
    </div>
  );
}

function ProductRail({ items }: { items: typeof products }) {
  return (
    <div className="grid auto-cols-[178px] grid-flow-col gap-3 overflow-x-auto pb-3 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 lg:grid-cols-6">
      {items.map((product) => (
        <ProductCard key={product.name} product={product} />
      ))}
    </div>
  );
}

function GuaranteeStrip() {
  const benefits = [
    {
      Icon: ShieldCheck,
      title: "ضمانت اصالت کالا",
      text: "همه کالاها با گارانتی معتبر",
    },
    {
      Icon: Truck,
      title: "ارسال سریع و مطمئن",
      text: "تحویل سفارش در سراسر کشور",
    },
    {
      Icon: CircleCheck,
      title: "خرید امن",
      text: "پرداخت امن و پشتیبانی همراه شما",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 rounded-xl border border-border bg-white p-4 sm:grid-cols-3 sm:p-5">
      {benefits.map(({ Icon, title, text }) => (
        <div key={String(title)} className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-primary-soft text-primary">
            <Icon size={20} />
          </span>
          <span>
            <span className="block text-sm font-bold">{title}</span>
            <span className="mt-0.5 block text-xs text-muted-foreground">
              {text}
            </span>
          </span>
        </div>
      ))}
    </div>
  );
}

function Magazine() {
  return (
    <section>
      <SectionHeading
        title="مجله اورجینال پل"
        href="/magazine"
        action="مشاهده همه مقالات"
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map(([tag, title, meta], index) => (
          <Link
            key={title}
            href={`/magazine/article-${index + 1}`}
            className="group overflow-hidden rounded-xl border border-border bg-white"
          >
            <div
              className={`grid aspect-[16/9] place-items-center ${["bg-[#e3f1f0]", "bg-[#f5ead6]", "bg-[#e9edf3]", "bg-[#eee8e5]"][index]}`}
            >
              <BookOpen
                size={38}
                strokeWidth={1.2}
                className="text-primary/60"
              />
            </div>
            <div className="p-4">
              <span className="text-[11px] font-bold text-primary">{tag}</span>
              <h3 className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 font-bold group-hover:text-primary">
                {title}
              </h3>
              <p className="mt-3 text-[11px] text-muted-foreground">{meta}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function StoreFooter() {
  return (
    <footer className="mt-12 border-t border-border bg-white">
      <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-xl bg-primary-soft p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-extrabold">عضویت در خبرنامه اورجینال پل</p>
            <p className="mt-1 text-sm text-muted-foreground">
              از تخفیف‌ها و جدیدترین مطالب مجله زودتر باخبر شوید.
            </p>
          </div>
          <form className="flex h-11 max-w-md overflow-hidden rounded-lg border border-border bg-white">
            <input
              type="email"
              aria-label="ایمیل شما"
              placeholder="ایمیل خود را وارد کنید"
              className="min-w-0 flex-1 px-3 text-sm outline-none"
            />
            <button className="bg-primary px-5 text-sm font-bold text-white">
              عضویت
            </button>
          </form>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
          <div>
            <h2 className="font-extrabold">اورجینال پل</h2>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">
              خرید مطمئن کالای اصیل، با پشتیبانی در تمام مسیر.
            </p>
          </div>
          <div>
            <h2 className="font-bold">خدمات مشتریان</h2>
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/account/orders">پیگیری سفارش</Link>
              </li>
              <li>
                <Link href="/faq">سوالات متداول</Link>
              </li>
              <li>
                <Link href="/contact">تماس با ما</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold">خرید و فروش</h2>
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/categories">دسته‌بندی‌ها</Link>
              </li>
              <li>
                <Link href="/deals">پیشنهادهای ویژه</Link>
              </li>
              <li>
                <Link href="/pages/returns">رویه بازگشت کالا</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="font-bold">حساب من</h2>
            <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/login">ورود</Link>
              </li>
              <li>
                <Link href="/account/orders">سفارش‌های من</Link>
              </li>
              <li>
                <Link href="/account/wishlist">علاقه‌مندی‌ها</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-4 text-center text-xs text-muted-foreground">
          © ۱۴۰۵ اورجینال پل. همه حقوق محفوظ است.
        </p>
      </div>
    </footer>
  );
}

export function MobileBottomNav() {
  return (
    <nav
      aria-label="ناوبری فروشگاه"
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-white px-2 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] text-[10px] font-semibold text-muted-foreground sm:hidden"
    >
      {[
        ["خانه", "/", "⌂"],
        ["دسته‌ها", "/categories", "▦"],
        ["سبد خرید", "/cart", "🛍"],
        ["حساب من", "/account/profile", "♙"],
      ].map(([label, href, icon]) => (
        <Link
          key={label}
          href={href}
          className={`flex min-h-11 flex-col items-center justify-center gap-0.5 ${href === "/" ? "text-primary" : ""}`}
        >
          <span aria-hidden="true" className="text-lg leading-5">
            {icon}
          </span>
          {label}
        </Link>
      ))}
    </nav>
  );
}

export default function StorefrontHomeUI() {
  return (
    <div
      dir="rtl"
      lang="fa"
      className="min-h-screen bg-background pb-20 text-foreground sm:pb-0"
    >
      <main className="mx-auto max-w-[1280px] space-y-8 px-4 py-5 sm:space-y-10 sm:px-8 sm:py-8">
        <HeroBanner />
        <section className="space-y-4">
          <SectionHeading title="دسته‌بندی‌های محبوب" href="/categories" />
          <div className="flex gap-3 overflow-x-auto pb-1 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((item) => (
              <CategoryTile key={item.href} item={item} />
            ))}
          </div>
        </section>
        <div className="sm:hidden">
          <GuaranteeStrip />
        </div>
        <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
          <SectionHeading title="پیشنهاد شگفت‌انگیز" href="/deals" />
          <div className="-mx-1 grid auto-cols-[178px] grid-flow-col gap-3 overflow-x-auto px-1 pb-2 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-3 lg:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </section>
        <div className="hidden sm:block">
          <GuaranteeStrip />
        </div>
        <section>
          <SectionHeading title="پیشنهاد برای شما" href="/search" />
          <ProductRail items={recommendations} />
        </section>
        <Magazine />
      </main>
    </div>
  );
}
