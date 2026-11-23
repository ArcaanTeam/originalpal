"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useAtom } from "jotai";
import {
  Check,
  ChevronLeft,
  Headphones,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Trash2,
  Watch,
} from "lucide-react";
import {
  ProductCard,
  storefrontProducts,
} from "../StorefrontHome/StorefrontHomeUI";
import {
  cartAtom,
  formatToman,
  getCartTotals,
  type CartLine,
} from "./cartAtom";

function Illustration({ line }: { line: CartLine }) {
  const Icon =
    line.illustration === "phone"
      ? Smartphone
      : line.illustration === "headphones"
        ? Headphones
        : Watch;
  return (
    <span className="grid size-24 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-primary-soft to-[#dfe9e5] text-primary sm:size-28">
      <Icon size={52} strokeWidth={1.2} />
    </span>
  );
}

export function CheckoutSteps({ current = 1 }: { current?: number }) {
  const steps = ["سبد خرید", "اطلاعات ارسال", "پرداخت"];
  return (
    <ol className="flex items-center gap-2 text-xs sm:gap-4">
      {steps.map((step, index) => {
        const number = index + 1;
        return (
          <li
            key={step}
            className={`flex items-center gap-2 whitespace-nowrap ${number === current ? "font-bold text-primary" : "text-muted-foreground"}`}
          >
            <span
              className={`grid size-7 place-items-center rounded-full border text-xs ${number <= current ? "border-primary bg-primary text-white" : "border-border bg-white"}`}
            >
              {number < current ? <Check size={14} /> : number}
            </span>
            <span className="hidden sm:inline">{step}</span>
            {index < steps.length - 1 && (
              <span className="mx-1 h-px w-4 bg-border sm:w-10" />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export function OrderSummary({
  subtotal,
  discount,
  shipping = 0,
  onCheckout = false,
}: {
  subtotal: number;
  discount: number;
  shipping?: number;
  onCheckout?: boolean;
}) {
  const payable = Math.max(0, subtotal - discount + shipping);
  return (
    <section className="rounded-xl border border-border bg-white p-5">
      <h2 className="text-base font-extrabold">خلاصه سفارش</h2>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">جمع کالاها</dt>
          <dd>{formatToman(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">تخفیف کالاها</dt>
          <dd className="font-semibold text-destructive">
            −{formatToman(discount)}
          </dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt className="text-muted-foreground">هزینه ارسال</dt>
          <dd>
            {shipping ? (
              formatToman(shipping)
            ) : (
              <span className="font-semibold text-primary">رایگان</span>
            )}
          </dd>
        </div>
        <div className="flex justify-between gap-3 border-t border-border pt-3 font-extrabold">
          <dt>مبلغ قابل پرداخت</dt>
          <dd className="text-primary">{formatToman(payable)}</dd>
        </div>
      </dl>
      {discount > 0 && (
        <p className="mt-3 rounded-lg bg-primary-soft px-3 py-2 text-xs font-semibold text-primary">
          {formatToman(discount)} سود شما از این خرید
        </p>
      )}
      {!onCheckout && (
        <Link
          href="/checkout/shipping"
          className="mt-4 flex h-12 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white"
        >
          ادامه فرایند خرید
          <ChevronLeft size={17} />
        </Link>
      )}
      <p className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck size={15} className="text-primary" />
        پرداخت امن و ضمانت اصالت کالا
      </p>
    </section>
  );
}

function Recommendations({ empty = false }: { empty?: boolean }) {
  const items = empty
    ? storefrontProducts.slice(0, 4)
    : storefrontProducts.slice(1, 5);
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-lg font-extrabold">پیشنهاد برای شما</h2>
      <div className="grid auto-cols-[178px] grid-flow-col gap-3 overflow-x-auto pb-3 sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.name} product={item} />
        ))}
      </div>
    </section>
  );
}

function EmptyCart() {
  return (
    <main className="mx-auto max-w-[1100px] px-4 py-7 sm:px-8 sm:py-10">
      <div className="mb-4 text-xs text-muted-foreground">
        <Link href="/">خانه</Link>
        <ChevronLeft className="mx-1 inline" size={13} />
        سبد خرید
      </div>
      <h1 className="text-2xl font-extrabold">سبد خرید</h1>
      <section className="mt-5 rounded-xl border border-border bg-white px-5 py-12 text-center sm:py-16">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
          <ShoppingBag size={30} />
        </span>
        <h2 className="mt-4 text-xl font-extrabold">سبد خرید شما خالی است</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
          کالاهای مورد نظرتان را به سبد اضافه کنید. اگر قبلاً وارد شده‌اید،
          کالاهای ذخیره‌شده شما اینجا نمایش داده می‌شود.
        </p>
        <div className="mt-5 flex flex-col justify-center gap-2 sm:flex-row">
          <Link
            href="/categories"
            className="rounded-lg bg-primary px-5 py-3 text-sm font-bold text-white"
          >
            شروع خرید
          </Link>
          <Link
            href="/account/login"
            className="rounded-lg border border-border px-5 py-3 text-sm font-bold"
          >
            ورود به حساب
          </Link>
        </div>
      </section>
      <Recommendations empty />
    </main>
  );
}

export default function StorefrontCartUI({
  mode = "cart",
}: {
  mode?: "cart" | "empty";
}) {
  const [items, setItems] = useAtom(cartAtom);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const isEmpty = mode === "empty" || items.length === 0;
  const totals = useMemo(() => getCartTotals(items), [items]);
  const { subtotal } = totals;
  const discount = couponApplied ? Math.round(subtotal * 0.1) : totals.discount;
  if (isEmpty) return <EmptyCart />;

  function changeQuantity(id: string, delta: number) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  }
  function removeItem(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  return (
    <main className="mx-auto max-w-[1200px] px-4 py-5 sm:px-8 sm:py-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="mb-2 text-xs text-muted-foreground">
            <Link href="/">خانه</Link>
            <ChevronLeft className="mx-1 inline" size={13} />
            سبد خرید
          </div>
          <h1 className="text-2xl font-extrabold">
            سبد خرید{" "}
            <span className="text-base font-semibold text-muted-foreground">
              ({totals.count.toLocaleString("fa-IR")} کالا)
            </span>
          </h1>
        </div>
        <CheckoutSteps />
      </div>
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex-col gap-3 rounded-xl border border-border bg-white p-3 sm:flex sm:flex-row sm:gap-4 sm:p-4"
            >
              <Link href={`/product/${item.slug}`}>
                <Illustration line={item} />
              </Link>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Link
                    href={`/product/${item.slug}`}
                    className="line-clamp-2 text-sm leading-6 font-bold hover:text-primary"
                  >
                    {item.title}
                  </Link>
                  {item.discount && (
                    <span className="hidden rounded-full bg-destructive/10 px-2 py-1 text-[10px] font-bold text-destructive sm:inline">
                      {item.discount} تخفیف
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.color}
                  {item.variant ? ` · ${item.variant}` : ""}
                </p>
                <p className="mt-1 text-xs font-semibold text-primary">
                  موجود در انبار
                </p>
                <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                  <div className="flex items-center rounded-lg border border-border">
                    <button
                      aria-label="کاهش تعداد"
                      onClick={() => changeQuantity(item.id, -1)}
                      className="grid size-9 place-items-center"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="min-w-8 text-center text-sm font-bold">
                      {item.quantity.toLocaleString("fa-IR")}
                    </span>
                    <button
                      aria-label="افزایش تعداد"
                      onClick={() => changeQuantity(item.id, 1)}
                      className="grid size-9 place-items-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="text-end">
                    <p className="text-sm font-extrabold">
                      {formatToman(item.price)}
                    </p>
                    {item.oldPrice && (
                      <p className="text-[11px] text-muted-foreground line-through">
                        {formatToman(item.oldPrice)}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 flex gap-4 text-xs">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="inline-flex items-center gap-1 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 size={13} />
                    حذف
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-primary"
                  >
                    ذخیره برای بعد
                  </button>
                </div>
              </div>
            </article>
          ))}
          <section className="rounded-xl border border-border bg-white p-4">
            <h2 className="text-sm font-bold">کد تخفیف</h2>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setCouponApplied(coupon.trim().length > 0);
              }}
              className="mt-2 flex gap-2"
            >
              <input
                value={coupon}
                onChange={(event) => setCoupon(event.target.value)}
                placeholder="کد تخفیف را وارد کنید"
                className="h-11 min-w-0 flex-1 rounded-lg border border-input px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button className="h-11 rounded-lg border border-primary px-4 text-sm font-bold text-primary">
                اعمال
              </button>
            </form>
            {couponApplied && (
              <p
                role="status"
                className="mt-2 flex items-center gap-1 text-xs text-primary"
              >
                <Check size={14} />
                کد تخفیف اعمال شد.
              </p>
            )}
          </section>
        </section>
        <div className="hidden lg:sticky lg:top-5 lg:block">
          <OrderSummary subtotal={subtotal} discount={discount} />
        </div>
      </div>
      <div className="mt-5 lg:hidden">
        <OrderSummary subtotal={subtotal} discount={discount} />
      </div>
      <Recommendations />
    </main>
  );
}
