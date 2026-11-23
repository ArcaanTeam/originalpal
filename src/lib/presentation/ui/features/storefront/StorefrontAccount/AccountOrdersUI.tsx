"use client";

import Link from "next/link";
import { cn } from "cn";
import { formatToman } from "../StorefrontCart/cartAtom";
import { EmptyState, ProductThumbnail, StatusBadge } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import {
  formatIdentifier,
  orderFilters,
  orderStatusLabels,
  type AccountOrder,
  type OrderFilter,
} from "./accountData";

const statusTones = {
  "awaiting-payment": "accent",
  processing: "primary",
  shipped: "primary",
  delivered: "success",
  cancelled: "danger",
} as const;

export interface AccountOrdersUIProps {
  orders: AccountOrder[];
  filter: OrderFilter;
  onChangeFilter: (filter: OrderFilter) => void;
}

export default function AccountOrdersUI({
  orders,
  filter,
  onChangeFilter,
}: AccountOrdersUIProps) {
  const copy = accountCopy.sections.orders;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="hidden text-xl font-extrabold lg:mb-2 lg:block lg:text-2xl">
        {copy.desktopTitle}
      </h1>
      <div
        role="tablist"
        aria-label={copy.desktopTitle}
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
      >
        {orderFilters.map((item) => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={filter === item.value}
            onClick={() => onChangeFilter(item.value)}
            className={cn(
              "h-11 shrink-0 rounded-full border px-4 text-sm transition-colors",
              filter === item.value
                ? "border-primary bg-primary font-semibold text-primary-foreground"
                : "border-input bg-white text-foreground hover:bg-muted",
            )}
          >
            {item.label}
          </button>
        ))}
      </div>

      {orders.length === 0 ? (
        <EmptyState>{copy.emptyFiltered}</EmptyState>
      ) : (
        <ul className="flex flex-col gap-4">
          {orders.map((order) => {
            const first = order.lines[0];
            const isPending = order.status === "awaiting-payment";
            return (
              <li
                key={order.id}
                className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <b className="text-[15px]">
                    {`${copy.orderPrefix} ${formatIdentifier(order.id)}`}
                  </b>
                  <span className="text-[13px] text-muted-foreground">
                    {order.date}
                  </span>
                  <span className="ms-auto">
                    <StatusBadge tone={statusTones[order.status]}>
                      {orderStatusLabels[order.status]}
                    </StatusBadge>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ProductThumbnail
                    illustration={first.illustration}
                    className="size-16"
                  />
                  <div className="min-w-0 flex-1 text-sm leading-[1.8]">
                    <p className="truncate">{first.title}</p>
                    <p className="text-[13px] text-muted-foreground">
                      {copy.amountPrefix} {formatToman(order.amount)}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="inline-flex h-12 items-center rounded-lg border border-input bg-white px-5 text-base font-semibold transition-colors hover:bg-muted"
                  >
                    {copy.details}
                  </Link>
                  {isPending ? (
                    <Link
                      href="/checkout/payment"
                      className="inline-flex h-12 items-center rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground"
                    >
                      {copy.pay}
                    </Link>
                  ) : (
                    <Link
                      href={`/account/orders/${order.id}`}
                      className="inline-flex h-12 items-center rounded-lg border border-input bg-white px-5 text-base font-semibold transition-colors hover:bg-muted"
                    >
                      {copy.track}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
