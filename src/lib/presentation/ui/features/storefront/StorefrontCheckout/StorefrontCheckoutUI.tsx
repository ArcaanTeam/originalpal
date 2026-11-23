"use client";

import Link from "next/link";
import { useState } from "react";
import { useAtomValue } from "jotai";
import {
  ChevronLeft,
  CreditCard,
  MapPin,
  Plus,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";
import {
  CheckoutSteps,
  OrderSummary,
} from "../StorefrontCart/StorefrontCartUI";
import {
  cartAtom,
  formatToman,
  getCartTotals,
} from "../StorefrontCart/cartAtom";

const addresses = [
  {
    id: "home",
    title: "منزل",
    recipient: "علی رضایی",
    details: "تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۴",
    postal: "۱۲۳۴۵۶۷۸۹۰",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
  },
  {
    id: "work",
    title: "محل کار",
    recipient: "علی رضایی",
    details: "تهران، خیابان شریعتی، پلاک ۴۵، طبقه ۲",
    postal: "۱۹۸۷۶۵۴۳۲۱",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
  },
];

function CheckoutHeading({ step, title }: { step: 2 | 3; title: string }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
      <div>
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <Link href="/cart">سبد خرید</Link>
          <ChevronLeft size={13} />
          {title}
        </div>
        <h1 className="text-2xl font-extrabold">{title}</h1>
      </div>
      <CheckoutSteps current={step} />
    </div>
  );
}

function AddressCard({
  address,
  selected,
  onSelect,
  onEdit,
}: {
  address: (typeof addresses)[number];
  selected: boolean;
  onSelect: () => void;
  onEdit: () => void;
}) {
  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 transition ${selected ? "border-primary bg-primary-soft/40 ring-1 ring-primary" : "border-border bg-white hover:border-primary/40"}`}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-label={`انتخاب آدرس ${address.title}`}
        className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full border border-input"
      >
        {selected && <span className="size-2.5 rounded-full bg-primary" />}
      </button>
      <div className="min-w-0 flex-1">
        <h3 className="flex items-center gap-2 font-bold">
          {address.title}
          <span className="text-xs font-normal text-muted-foreground">
            {address.recipient}
          </span>
        </h3>
        <p className="mt-2 text-sm leading-6">{address.details}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          کدپستی {address.postal} · موبایل <bdi dir="ltr">{address.phone}</bdi>
        </p>
      </div>
      <button
        type="button"
        onClick={onEdit}
        className="text-xs font-bold text-primary"
      >
        ویرایش
      </button>
    </div>
  );
}

function ShippingUI() {
  const [selectedAddress, setSelectedAddress] = useState("home");
  const [shipping, setShipping] = useState("standard");
  const [addingAddress, setAddingAddress] = useState(false);
  const items = useAtomValue(cartAtom);
  const { subtotal, discount } = getCartTotals(items);
  const fee = shipping === "express" ? 180_000 : 0;
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-6 sm:px-8 sm:py-8">
      <CheckoutHeading step={2} title="اطلاعات ارسال" />
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-5 rounded-xl border border-border bg-white p-4 sm:p-5">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-extrabold">آدرس تحویل</h2>
              <MapPin size={19} className="text-primary" />
            </div>
            <div className="space-y-3">
              {addresses.map((address) => (
                <AddressCard
                  key={address.id}
                  address={address}
                  selected={selectedAddress === address.id}
                  onSelect={() => setSelectedAddress(address.id)}
                  onEdit={() => setAddingAddress(true)}
                />
              ))}
            </div>
            <button
              onClick={() => setAddingAddress(!addingAddress)}
              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-dashed border-primary text-sm font-bold text-primary"
            >
              <Plus size={17} />
              افزودن آدرس جدید
            </button>
            {addingAddress && (
              <div className="mt-3 grid gap-3 rounded-lg bg-muted/50 p-4 sm:grid-cols-2">
                {[
                  "عنوان آدرس",
                  "نام تحویل‌گیرنده",
                  "شماره موبایل",
                  "کدپستی",
                  "استان و شهر",
                  "نشانی کامل",
                ].map((label) => (
                  <label key={label} className="text-xs font-semibold">
                    {label}
                    <input
                      placeholder={label}
                      className="mt-1 h-10 w-full rounded-md border border-input bg-white px-3 text-sm font-normal"
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
          <fieldset>
            <legend className="mb-3 font-extrabold">روش ارسال</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["standard", "ارسال عادی", "تحویل ۲ تا ۴ روز کاری", "رایگان"],
                [
                  "express",
                  "ارسال سریع",
                  "تحویل ۱ تا ۲ روز کاری",
                  formatToman(180_000),
                ],
              ].map(([id, title, description, price]) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${shipping === id ? "border-primary bg-primary-soft/40" : "border-border"}`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping === id}
                    onChange={() => setShipping(id)}
                    className="accent-primary"
                  />
                  <Truck size={20} className="text-primary" />
                  <span className="flex-1">
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {description}
                    </span>
                  </span>
                  <span className="text-xs font-bold">{price}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="rounded-lg bg-muted/60 p-3 text-xs leading-6 text-muted-foreground">
            مرسوله ۱ ·{" "}
            {items
              .reduce((count, item) => count + item.quantity, 0)
              .toLocaleString("fa-IR")}{" "}
            کالا · ارسال توسط اورجینال پل
          </div>
          <Link
            href="/checkout/payment"
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary text-sm font-bold text-white"
          >
            ادامه و پرداخت
            <ChevronLeft size={17} />
          </Link>
        </section>
        <div className="lg:sticky lg:top-5">
          <OrderSummary
            subtotal={subtotal}
            discount={discount}
            shipping={fee}
            onCheckout
          />
        </div>
      </div>
      <p className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck size={15} className="text-primary" />
        اطلاعات شما در پرداخت امن محافظت می‌شود.
      </p>
    </main>
  );
}

function PaymentUI() {
  const [method, setMethod] = useState("online");
  const [accepted, setAccepted] = useState(false);
  const items = useAtomValue(cartAtom);
  const { subtotal, discount } = getCartTotals(items);
  const methods = [
    [
      "online",
      CreditCard,
      "پرداخت آنلاین",
      "پرداخت با کارت‌های عضو شتاب از طریق درگاه بانکی",
    ],
    [
      "wallet",
      Wallet,
      "کیف پول اورجینال پل",
      `موجودی کیف پول: ${formatToman(2_500_000)}`,
    ],
    [
      "installment",
      CreditCard,
      "خرید اقساطی",
      "پرداخت در ۶ قسط با چک یا کارت اعتباری",
    ],
  ] as const;
  return (
    <main className="mx-auto max-w-[1120px] px-4 py-6 sm:px-8 sm:py-8">
      <CheckoutHeading step={3} title="پرداخت" />
      <div className="grid items-start gap-5 lg:grid-cols-[1fr_360px]">
        <section className="space-y-4 rounded-xl border border-border bg-white p-4 sm:p-5">
          <div className="rounded-lg bg-muted/60 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-extrabold">خلاصه ارسال</h2>
              <Link
                href="/checkout/shipping"
                className="text-xs font-bold text-primary"
              >
                ویرایش
              </Link>
            </div>
            <p className="mt-2 text-sm">
              علی رضایی · تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۴
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              کدپستی ۱۲۳۴۵۶۷۸۹۰ · موبایل <bdi dir="ltr">۰۹۱۲۳۴۵۶۷۸۹</bdi>
            </p>
            <p className="mt-3 border-t border-border pt-3 text-xs text-muted-foreground">
              روش ارسال: ارسال عادی (۲ تا ۴ روز کاری) · رایگان
            </p>
          </div>
          <fieldset>
            <legend className="mb-3 font-extrabold">روش پرداخت</legend>
            <div className="space-y-3">
              {methods.map(([id, Icon, title, description]) => (
                <label
                  key={id}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 ${method === id ? "border-primary bg-primary-soft/40" : "border-border"}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === id}
                    onChange={() => setMethod(id)}
                    className="accent-primary"
                  />
                  <Icon size={22} className="text-primary" />
                  <span>
                    <span className="block text-sm font-bold">{title}</span>
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {description}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <label className="flex items-start gap-2 rounded-lg bg-muted/50 p-3 text-sm">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="mt-1 accent-primary"
            />
            <span>
              قوانین و مقررات اورجینال پل را می‌پذیرم.{" "}
              <Link href="/pages/terms" className="font-bold text-primary">
                مشاهده قوانین
              </Link>
            </span>
          </label>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href="/checkout/failed"
              className="flex h-11 items-center justify-center rounded-lg border border-border text-sm font-bold"
            >
              شبیه‌سازی پرداخت ناموفق
            </Link>
            <Link
              aria-disabled={!accepted}
              onClick={(event) => {
                if (!accepted) event.preventDefault();
              }}
              href="/checkout/success"
              className={`flex h-11 items-center justify-center rounded-lg text-sm font-bold text-white ${accepted ? "bg-primary" : "pointer-events-none bg-primary/40"}`}
            >
              پرداخت {formatToman(Math.max(0, subtotal - discount))}
            </Link>
          </div>
        </section>
        <div className="lg:sticky lg:top-5">
          <OrderSummary subtotal={subtotal} discount={discount} onCheckout />
        </div>
      </div>
    </main>
  );
}

export default function StorefrontCheckoutUI({
  mode,
}: {
  mode: "shipping" | "payment";
}) {
  return mode === "shipping" ? <ShippingUI /> : <PaymentUI />;
}
