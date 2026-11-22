"use client";

import Link from "next/link";
import { cn } from "cn";
import { Check } from "lucide-react";
import { formatToman } from "../StorefrontCart/cartAtom";
import { EmptyState, ProductThumbnail, StatusBadge } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import {
  accountProfile,
  formatIdentifier,
  orderStatusLabels,
  orderTimeline,
  type AccountOrder,
} from "./accountData";

export interface AccountOrderDetailUIProps {
  order: AccountOrder | undefined;
  notice: string | null;
  onClickInvoice: () => void;
  onClickPay: () => void;
}

function SummaryRow({
  label,
  children,
  strong,
}: {
  label: string;
  children: React.ReactNode;
  strong?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className={cn(strong && "font-extrabold text-primary")}>
        {children}
      </dd>
    </div>
  );
}

export default function AccountOrderDetailUI({
  order,
  notice,
  onClickInvoice,
  onClickPay,
}: AccountOrderDetailUIProps) {
  const copy = accountCopy.sections.orderDetail;

  if (!order) {
    return <EmptyState>{copy.notFound}</EmptyState>;
  }

  const isPending = order.status === "awaiting-payment";

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="hidden min-w-0 flex-1 text-xl font-extrabold lg:block lg:text-2xl">
          {`${accountCopy.sections.orders.orderPrefix} ${formatIdentifier(order.id)}`}
        </h1>
        <div className="hidden flex-wrap gap-2 lg:flex">
          {isPending && (
            <button
              type="button"
              onClick={onClickPay}
              className="h-12 rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground"
            >
              {copy.pay}
            </button>
          )}
          <button
            type="button"
            onClick={onClickInvoice}
            className="h-12 rounded-lg border border-input bg-white px-5 text-base font-semibold"
          >
            {copy.invoice}
          </button>
        </div>
        <span className="lg:hidden">
          <StatusBadge tone={isPending ? "accent" : "success"}>
            {orderStatusLabels[order.status]}
          </StatusBadge>
        </span>
      </div>

      <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
        <h2 className="text-base font-extrabold">{copy.timeline}</h2>
        <ol className="mt-4 flex flex-col gap-0 sm:flex-row sm:items-start">
          {orderTimeline.map((step, index) => (
            <li
              key={step.key}
              className="relative flex gap-3 pb-5 last:pb-0 sm:flex-1 sm:flex-col sm:items-center sm:gap-2 sm:pb-0 sm:text-center"
            >
              {index < orderTimeline.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute start-[13px] top-7 h-full w-px bg-border sm:start-1/2 sm:top-[13px] sm:me-0 sm:h-px sm:w-full sm:translate-x-1/2"
                />
              )}
              <span
                className={cn(
                  "relative z-10 grid size-7 shrink-0 place-items-center rounded-full border text-xs",
                  step.done
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-white text-muted-foreground",
                )}
              >
                {step.done ? <Check size={14} /> : formatIdentifier(index + 1)}
              </span>
              <span className="leading-[1.7]">
                <span
                  className={cn(
                    "block text-sm",
                    step.done ? "font-semibold" : "text-muted-foreground",
                  )}
                >
                  {step.label}
                </span>
                <span className="block text-xs text-muted-foreground">
                  {step.date}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
          <h2 className="text-base font-extrabold">{copy.items}</h2>
          <ul className="mt-3 flex flex-col gap-3">
            {order.lines.map((line) => (
              <li key={line.title} className="flex items-center gap-3">
                <ProductThumbnail
                  illustration={line.illustration}
                  className="size-16"
                />
                <div className="min-w-0 flex-1 text-sm leading-[1.8]">
                  <p>{line.title}</p>
                  <p className="text-[13px] text-muted-foreground">
                    {line.variant}
                  </p>
                </div>
                <b className="shrink-0 text-sm">{formatToman(line.amount)}</b>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
          <h2 className="text-base font-extrabold">{copy.summary}</h2>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <SummaryRow label={`${copy.subtotal}:`}>
              {formatToman(order.subtotal)}
            </SummaryRow>
            <SummaryRow label={`${copy.discount}:`}>
              <bdi dir="ltr">{`−${order.discount.toLocaleString("fa-IR")}`}</bdi>{" "}
              تومان
            </SummaryRow>
            <SummaryRow label={`${copy.shipping}:`}>
              {order.shipping === 0 ? copy.free : formatToman(order.shipping)}
            </SummaryRow>
            <SummaryRow label={`${copy.payable}:`} strong>
              {formatToman(order.amount)}
            </SummaryRow>
            <SummaryRow label={`${copy.paymentMethod}:`}>
              {order.paymentMethod}
            </SummaryRow>
          </dl>
        </section>
      </div>

      <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
        <h2 className="text-base font-extrabold">{copy.delivery}</h2>
        <dl className="mt-3 flex flex-col gap-2 text-sm">
          <SummaryRow label={`${copy.recipient}:`}>
            {accountProfile.fullName}
          </SummaryRow>
          <SummaryRow label={`${copy.address}:`}>
            تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۴
          </SummaryRow>
          <SummaryRow label={`${copy.postalCode}:`}>۱۲۳۴۵۶۷۸۹۰</SummaryRow>
          <SummaryRow label={`${copy.shippingMethod}:`}>
            {order.shippingMethod}
          </SummaryRow>
        </dl>
      </section>

      {notice && (
        <p
          role="status"
          className="rounded-lg bg-primary-soft px-3 py-2 text-xs leading-6 text-primary"
        >
          {notice}
        </p>
      )}

      <div className="flex flex-wrap gap-2 lg:hidden">
        <button
          type="button"
          onClick={onClickInvoice}
          className="h-12 flex-1 rounded-lg border border-input bg-white px-5 text-base font-semibold"
        >
          {copy.invoice}
        </button>
        {isPending && (
          <button
            type="button"
            onClick={onClickPay}
            className="h-12 flex-1 rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground"
          >
            {copy.pay}
          </button>
        )}
      </div>

      <Link
        href="/account/orders"
        className="self-start text-xs font-semibold text-primary"
      >
        {accountCopy.back}
      </Link>
    </div>
  );
}
