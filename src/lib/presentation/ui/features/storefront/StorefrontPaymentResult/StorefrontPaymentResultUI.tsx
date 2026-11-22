import Link from "next/link";
import {
  BadgeCheck,
  Check,
  ChevronLeft,
  CircleAlert,
  CircleCheck,
  Clock3,
  MapPin,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { formatToman } from "../StorefrontCart/cartAtom";

const amount = 127_700_000;
const orderNumber = "۱۰۰۱۲۹";

function SuccessResult() {
  return (
    <main className="mx-auto max-w-[900px] px-4 py-7 sm:px-8 sm:py-10">
      <section className="rounded-xl border border-border bg-white p-5 text-center sm:p-8">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft text-primary">
          <CircleCheck size={36} />
        </span>
        <p className="mt-4 text-xs font-bold text-primary">پرداخت امن</p>
        <h1 className="mt-2 text-2xl font-extrabold">
          پرداخت شما با موفقیت انجام شد
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          سفارش شما ثبت شد و به‌زودی برای ارسال آماده می‌شود.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          پیامک تأیید به شماره <bdi dir="ltr">۰۹۱۲۳۴۵۶۷۸۹</bdi> ارسال شد.
        </p>
        <div className="mt-7 rounded-xl bg-muted/50 p-4 text-start">
          <h2 className="mb-4 font-extrabold">وضعیت سفارش</h2>
          <ol className="grid grid-cols-4 gap-2">
            {[
              { Icon: Check, label: "ثبت سفارش" },
              { Icon: PackageCheck, label: "آماده‌سازی" },
              { Icon: Truck, label: "ارسال" },
              { Icon: BadgeCheck, label: "تحویل" },
            ].map(({ Icon, label }, index) => (
              <li key={label} className="text-center">
                <span
                  className={`mx-auto grid size-9 place-items-center rounded-full ${index === 0 ? "bg-primary text-white" : "border border-border bg-white text-muted-foreground"}`}
                >
                  <Icon size={17} />
                </span>
                <span className="mt-2 block text-[10px] sm:text-xs">
                  {label}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="mt-5 text-start">
          <h2 className="font-extrabold">جزئیات سفارش</h2>
          <dl className="mt-3 grid gap-3 rounded-xl border border-border p-4 text-sm sm:grid-cols-2">
            {[
              ["شماره سفارش", orderNumber],
              ["شماره پیگیری بانکی", "۴۸۷۲۹۱۵۰۳۶"],
              ["تاریخ و ساعت", "۱۴۰۵/۰۸/۰۴ · ۱۴:۳۲"],
              ["روش پرداخت", "پرداخت آنلاین"],
              ["مبلغ پرداخت‌شده", formatToman(amount)],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-bold">{value}</dd>
              </div>
            ))}
            <div className="sm:col-span-2">
              <dt className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin size={14} />
                تحویل به
              </dt>
              <dd className="mt-1 font-bold">
                تهران، خیابان ولیعصر، پلاک ۱۲۳ · ۳ کالا
              </dd>
            </div>
          </dl>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/account/orders/100129"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white"
          >
            پیگیری سفارش
            <ChevronLeft size={16} />
          </Link>
          <Link
            href="/"
            className="flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-bold"
          >
            بازگشت به فروشگاه
          </Link>
        </div>
      </section>
    </main>
  );
}

function FailedResult() {
  return (
    <main className="mx-auto max-w-[850px] px-4 py-7 sm:px-8 sm:py-10">
      <section className="rounded-xl border border-border bg-white p-5 text-center sm:p-8">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-destructive/10 text-destructive">
          <CircleAlert size={34} />
        </span>
        <p className="mt-4 text-xs font-bold text-muted-foreground">
          پرداخت امن
        </p>
        <h1 className="mt-2 text-2xl font-extrabold">پرداخت ناموفق بود</h1>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-7 text-muted-foreground">
          اگر مبلغی از حساب شما کسر شده باشد، طی ۷۲ ساعت به حساب شما بازگردانده
          می‌شود.
        </p>
        <div className="mt-6 rounded-xl border border-border text-start">
          <h2 className="border-b border-border p-4 font-extrabold">
            جزئیات تراکنش
          </h2>
          <dl className="grid gap-4 p-4 text-sm sm:grid-cols-2">
            {[
              ["شماره سفارش", `${orderNumber} (در انتظار پرداخت)`],
              ["علت", "انصراف از پرداخت یا خطای درگاه"],
              ["کد خطا", "۱۰۲"],
              ["مبلغ سفارش", formatToman(amount)],
              ["زمان رزرو", "سفارش شما تا ۵۹:۴۱ دقیقه دیگر رزرو می‌ماند."],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-muted-foreground">{label}</dt>
                <dd className="mt-1 font-semibold">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link
            href="/checkout/payment"
            className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-bold text-white"
          >
            <RotateCcw size={16} />
            تلاش مجدد برای پرداخت
          </Link>
          <Link
            href="/checkout/payment"
            className="flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-bold"
          >
            تغییر روش پرداخت
          </Link>
          <Link
            href="/cart"
            className="flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-bold"
          >
            بازگشت به سبد خرید
          </Link>
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Clock3 size={14} />
          رزرو سفارش تا پایان زمان اعلام‌شده حفظ می‌شود.
        </p>
        <p className="mt-2 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck size={14} />
          اطلاعات پرداخت شما نزد درگاه بانکی محفوظ است.
        </p>
      </section>
    </main>
  );
}

export default function StorefrontPaymentResultUI({
  mode,
}: {
  mode: "success" | "failed";
}) {
  return mode === "success" ? <SuccessResult /> : <FailedResult />;
}
