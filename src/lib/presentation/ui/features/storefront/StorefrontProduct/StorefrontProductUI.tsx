"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BadgeCheck,
  Check,
  ChevronDown,
  Heart,
  MapPin,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Star,
  Truck,
} from "lucide-react";
import {
  ProductCard,
  storefrontProducts,
} from "../StorefrontHome/StorefrontHomeUI";

const product = {
  name: "گوشی موبایل سامسونگ مدل Galaxy S26 Ultra",
  brand: "سامسونگ",
  price: "۸۹٬۹۰۰٬۰۰۰",
  oldPrice: "۹۸٬۵۰۰٬۰۰۰",
  rating: "۴٫۸",
  reviews: "۲۱۴",
  description:
    "معرفی پرچم‌دار جدید سامسونگ با بدنه تیتانیومی، نمایشگر بزرگ و روشن و دوربین ۲۰۰ مگاپیکسلی، برای عکاسی در نور کم و کارهای سنگین طراحی شده است. این کالا با گارانتی معتبر و بسته‌بندی اصلی عرضه می‌شود.",
};
const specs = [
  ["نمایشگر", "۶٫۹ اینچ Dynamic AMOLED 2X"],
  ["حافظه داخلی", "۵۱۲ گیگابایت"],
  ["حافظه رم", "۱۲ گیگابایت"],
  ["دوربین اصلی", "۲۰۰ مگاپیکسل"],
  ["باتری", "۵۰۰۰ میلی‌آمپرساعت"],
  ["سیستم‌عامل", "Android 16"],
  ["سیم‌کارت", "دو عدد (نانو و eSIM)"],
  ["وزن", "۲۱۸ گرم"],
];
const features = [
  "نمایشگر ۶٫۹ اینچ Dynamic AMOLED 2X با نرخ نمایش ۱۲۰ هرتز",
  "دوربین اصلی ۲۰۰ مگاپیکسلی با لرزشگیر اپتیکال",
  "باتری ۵۰۰۰ میلی‌آمپرساعت با شارژ سریع ۴۵ وات",
  "حافظه ۵۱۲ گیگابایت و رم ۱۲ گیگابایت",
  "گارانتی ۱۸ ماهه اصالت و سلامت فیزیکی",
];
const benefitRows = [
  {
    Icon: Truck,
    title: "ارسال به سراسر کشور",
    description: "تحویل ۲ تا ۴ روز کاری",
  },
  {
    Icon: RotateCcw,
    title: "۷ روز مهلت بازگشت کالا",
    description: "طبق شرایط بازگشت فروشگاه",
  },
  {
    Icon: ShieldCheck,
    title: "گارانتی ۱۸ ماهه",
    description: "اصالت و سلامت کالا",
  },
  {
    Icon: MapPin,
    title: "فروشنده: اورجینال پل",
    description: "ضمانت اصالت فروشگاه",
  },
];
const similarProducts = [
  storefrontProducts[0],
  storefrontProducts[1],
  storefrontProducts[3],
  storefrontProducts[4],
];

function RatingStars({ value = 5 }: { value?: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-accent"
      aria-label={`${value} از ۵ ستاره`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={14} fill={i < value ? "currentColor" : "none"} />
      ))}
    </span>
  );
}

function ProductGallery() {
  const [selected, setSelected] = useState(0);
  return (
    <div className="grid gap-3 sm:grid-cols-[72px_1fr]">
      <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            aria-label={`تصویر ${index + 1}`}
            className={`grid size-16 shrink-0 place-items-center rounded-lg border bg-white ${selected === index ? "border-primary ring-1 ring-primary" : "border-border"}`}
          >
            <Smartphone
              className="text-primary/70"
              size={index === selected ? 30 : 26}
              strokeWidth={1.4}
            />
          </button>
        ))}
      </div>
      <div className="relative grid min-h-[300px] place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-[#edf4f2] to-[#d9e7e3] sm:min-h-[440px]">
        <span className="absolute start-4 top-4 rounded-full bg-destructive px-3 py-1.5 text-xs font-bold text-white">
          ۹٪ تخفیف
        </span>
        <Smartphone
          size={190}
          strokeWidth={0.8}
          className="text-[#416d69] drop-shadow-lg sm:size-64"
        />
        <span className="absolute bottom-4 rounded-full bg-white/80 px-3 py-1 text-xs text-foreground">
          تصویر {selected + 1} از ۴
        </span>
      </div>
    </div>
  );
}

function PurchasePanel({
  onAdd,
  added,
}: {
  onAdd: () => void;
  added: boolean;
}) {
  const [color, setColor] = useState("تیتانیوم مشکی");
  const [storage, setStorage] = useState("۵۱۲ گیگابایت");
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">
          موجود در انبار
        </span>
        <button
          aria-label="افزودن به علاقه‌مندی‌ها"
          className="grid size-9 place-items-center rounded-lg border border-border text-muted-foreground hover:text-destructive"
        >
          <Heart size={18} />
        </button>
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        رنگ: <span className="font-bold text-foreground">{color}</span>
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {["تیتانیوم مشکی", "نقره‌ای", "آبی"].map((item) => (
          <button
            key={item}
            onClick={() => setColor(item)}
            className={`min-h-10 rounded-lg border px-3 text-xs ${color === item ? "border-primary bg-primary-soft font-bold text-primary" : "border-border"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        حافظه: <span className="font-bold text-foreground">{storage}</span>
      </p>
      <div className="mt-2 flex gap-2">
        {["۲۵۶ گیگابایت", "۵۱۲ گیگابایت", "۱ ترابایت"].map((item) => (
          <button
            key={item}
            onClick={() => setStorage(item)}
            className={`min-h-10 rounded-lg border px-3 text-xs ${storage === item ? "border-primary bg-primary-soft font-bold text-primary" : "border-border"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="my-5 space-y-3 border-y border-border py-4">
        {benefitRows.map(({ Icon, title, description }) => (
          <div key={title} className="flex items-center gap-3">
            <Icon size={19} className="shrink-0 text-primary" />
            <span>
              <span className="block text-sm font-semibold">{title}</span>
              <span className="text-xs text-muted-foreground">
                {description}
              </span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between">
        <span className="text-xs text-muted-foreground line-through">
          {product.oldPrice} تومان
        </span>
        <span className="text-xl font-extrabold tabular-nums">
          {product.price} <small className="text-xs font-normal">تومان</small>
        </span>
      </div>
      <button
        onClick={onAdd}
        className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white transition hover:bg-primary/90"
      >
        {added ? (
          <>
            <Check size={18} />
            به سبد خرید اضافه شد
          </>
        ) : (
          <>
            <ShoppingBag size={18} />
            افزودن به سبد خرید
          </>
        )}
      </button>
      <button className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold">
        <Heart size={17} />
        افزودن به علاقه‌مندی‌ها
      </button>
    </section>
  );
}

function Specifications() {
  return (
    <section
      id="specifications"
      className="scroll-mt-24 rounded-xl border border-border bg-white p-5 sm:p-6"
    >
      <h2 className="text-lg font-extrabold">مشخصات فنی</h2>
      <dl className="mt-4 divide-y divide-border">
        {specs.map(([label, value]) => (
          <div
            key={label}
            className="grid grid-cols-[minmax(120px,0.6fr)_1fr] gap-4 py-3 text-sm"
          >
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function Reviews() {
  const bars = [
    ["۵ ستاره", "۷۸%", "w-[78%]"],
    ["۴ ستاره", "۱۴%", "w-[14%]"],
    ["۳ ستاره", "۵%", "w-[5%]"],
    ["۲ ستاره", "۲%", "w-[2%]"],
    ["۱ ستاره", "۱%", "w-[1%]"],
  ] as const;
  return (
    <section
      id="reviews"
      className="scroll-mt-24 rounded-xl border border-border bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-extrabold">دیدگاه مشتریان</h2>
          <div className="mt-2 flex items-center gap-2">
            <strong className="text-2xl">۴٫۸</strong>
            <RatingStars />
            <span className="text-xs text-muted-foreground">از ۲۱۴ دیدگاه</span>
          </div>
        </div>
        <Link
          href="/reviews/write"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white"
        >
          ثبت دیدگاه
        </Link>
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          {bars.map(([label, percent, width]) => (
            <div key={label} className="flex items-center gap-2 text-xs">
              <span className="w-14 text-muted-foreground">{label}</span>
              <div className="h-2 flex-1 rounded-full bg-muted">
                <div className={`h-full rounded-full bg-accent ${width}`} />
              </div>
              <span className="w-10 text-end">{percent}</span>
            </div>
          ))}
        </div>
        <article className="rounded-lg bg-muted/60 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold">علی رضایی</span>
            <span className="text-xs text-muted-foreground">۱۴۰۵/۰۷/۲۸</span>
          </div>
          <RatingStars />
          <p className="mt-2 text-sm leading-7">
            کیفیت ساخت و دوربین عالی است. بسته‌بندی سالم بود و کالا اصل بود.
          </p>
          <span className="mt-2 inline-flex items-center gap-1 text-xs text-primary">
            <BadgeCheck size={14} />
            خریدار این محصول
          </span>
        </article>
      </div>
    </section>
  );
}

export default function StorefrontProductUI() {
  const [added, setAdded] = useState(false);
  return (
    <main className="mx-auto max-w-[1200px] px-4 pt-5 pb-24 sm:px-8 sm:pt-8 sm:pb-10">
      <nav
        aria-label="مسیر صفحه"
        className="mb-5 text-xs text-muted-foreground"
      >
        <Link href="/">خانه</Link>
        <ChevronDown className="mx-1 inline -rotate-90" size={13} />
        <Link href="/category/mobile">موبایل و لوازم جانبی</Link>
        <ChevronDown className="mx-1 inline -rotate-90" size={13} />
        <Link href="/category/mobile">گوشی موبایل</Link>
        <ChevronDown className="mx-1 inline -rotate-90" size={13} />
        {product.brand}
      </nav>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="order-2 lg:order-1">
          <ProductGallery />
          <div className="mt-5 hidden lg:block">
            <PurchasePanel onAdd={() => setAdded(true)} added={added} />
          </div>
        </section>
        <section className="order-1 lg:order-2">
          <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-bold text-destructive">
            ۹٪ تخفیف
          </span>
          <h1 className="mt-3 text-2xl leading-10 font-extrabold">
            {product.name}
          </h1>
          <Link
            href="/category/mobile"
            className="mt-1 inline-block text-sm font-semibold text-primary"
          >
            {product.brand} · مشاهده همه محصولات برند
          </Link>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <RatingStars />
            <strong>{product.rating}</strong>
            <a href="#reviews" className="text-muted-foreground">
              · {product.reviews} دیدگاه
            </a>
          </div>
        </section>
      </div>
      <div className="mt-5 lg:hidden">
        <PurchasePanel onAdd={() => setAdded(true)} added={added} />
      </div>
      <section className="mt-5 rounded-xl border border-border bg-white p-5">
        <h2 className="font-extrabold">ویژگی‌های کلیدی</h2>
        <ul className="mt-3 space-y-3">
          {features.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm leading-6">
              <Check className="mt-1 shrink-0 text-primary" size={16} />
              {item}
            </li>
          ))}
        </ul>
      </section>
      <nav
        aria-label="بخش‌های محصول"
        className="sticky top-0 z-20 mt-7 flex gap-5 overflow-x-auto border-y border-border bg-background px-2 text-sm font-bold"
      >
        <a href="#specifications" className="min-h-12 shrink-0 content-center">
          مشخصات فنی
        </a>
        <a href="#description" className="min-h-12 shrink-0 content-center">
          معرفی
        </a>
        <a href="#reviews" className="min-h-12 shrink-0 content-center">
          دیدگاه مشتریان
        </a>
      </nav>
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Specifications />
        <section
          id="description"
          className="scroll-mt-24 rounded-xl border border-border bg-white p-5 sm:p-6"
        >
          <h2 className="text-lg font-extrabold">معرفی محصول</h2>
          <p className="mt-3 text-sm leading-8 text-muted-foreground">
            {product.description}
          </p>
        </section>
      </div>
      <div className="mt-5">
        <Reviews />
      </div>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-extrabold">کالاهای مشابه</h2>
          <Link
            href="/category/mobile"
            className="text-sm font-bold text-primary"
          >
            مشاهده همه
          </Link>
        </div>
        <div className="grid auto-cols-[178px] grid-flow-col gap-3 overflow-x-auto pb-3 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-4">
          {similarProducts.map((item) => (
            <ProductCard key={item.name} product={item} />
          ))}
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-3 border-t border-border bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:hidden">
        <span className="min-w-0 flex-1 text-sm font-extrabold">
          {product.price} <small className="font-normal">تومان</small>
        </span>
        <button
          onClick={() => setAdded(true)}
          className="flex h-11 shrink-0 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-bold text-white"
        >
          <ShoppingBag size={17} />
          {added ? "به سبد اضافه شد" : "افزودن به سبد خرید"}
        </button>
      </div>
    </main>
  );
}
