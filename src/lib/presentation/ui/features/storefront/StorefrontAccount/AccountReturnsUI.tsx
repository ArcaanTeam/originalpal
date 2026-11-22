"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { cn } from "cn";
import { ChevronDown, UploadCloud } from "lucide-react";
import { EmptyState, StatusBadge } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import {
  accountOrders,
  formatIdentifier,
  returnReasons,
  type ReturnRequest,
} from "./accountData";

export interface AccountReturnsUIProps {
  returns: ReturnRequest[];
  notice: string | null;
  onSubmitRequest: (draft: ReturnDraft) => void;
}

export interface ReturnDraft {
  orderId: string;
  item: string;
  reason: string;
  description: string;
}

const statusTones = {
  processing: "primary",
  delivered: "success",
} as const;

function Select({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <span className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-lg border border-input bg-white px-3 pe-9 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          aria-hidden="true"
          className="pointer-events-none absolute end-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
      </span>
    </div>
  );
}

export default function AccountReturnsUI({
  returns,
  notice,
  onSubmitRequest,
}: AccountReturnsUIProps) {
  const copy = accountCopy.sections.returns;
  const orderOptions = accountOrders.map(
    (order) => `${copy.orderField} ${formatIdentifier(order.id)}`,
  );
  const itemOptions = accountOrders.flatMap((order) =>
    order.lines.map((line) => line.title),
  );

  const [order, setOrder] = useState(orderOptions[1] ?? "");
  const [item, setItem] = useState(itemOptions[0] ?? "");
  const [reason, setReason] = useState(returnReasons[0]);
  const [description, setDescription] = useState(
    "پس از دو هفته کار، صدای کانال راست قطع شد.",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitRequest({ orderId: order, item, reason, description });
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="hidden text-xl font-extrabold lg:mb-2 lg:block lg:text-2xl">
        {copy.desktopTitle}
      </h1>

      {returns.length === 0 ? (
        <EmptyState>{accountCopy.emptyState}</EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {returns.map((request) => (
            <li
              key={request.id}
              className="rounded-xl border border-border bg-white p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <b className="text-[15px]">
                  مرجوعی {formatIdentifier(request.id)}
                </b>
                <span className="ms-auto">
                  <StatusBadge tone={statusTones[request.status]}>
                    {copy.statusLabels[request.status]}
                  </StatusBadge>
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {request.item}
              </p>
            </li>
          ))}
        </ul>
      )}

      <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
        <h2 className="mb-4 text-base font-extrabold">{copy.newRequest}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <Select
              id="return-order"
              label={copy.orderField}
              value={order}
              options={orderOptions}
              onChange={setOrder}
            />
            <Select
              id="return-item"
              label={copy.itemField}
              value={item}
              options={itemOptions}
              onChange={setItem}
            />
            <Select
              id="return-reason"
              label={copy.reasonField}
              value={reason}
              options={returnReasons}
              onChange={setReason}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="return-description" className="text-sm font-medium">
              {copy.descriptionLabel}
            </label>
            <textarea
              id="return-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="rounded-lg border border-input bg-white p-3 text-sm leading-7 outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div className="flex flex-col items-center gap-1 rounded-xl border border-dashed border-input bg-muted/40 p-5 text-center">
            <UploadCloud
              size={26}
              aria-hidden="true"
              className="text-primary"
            />
            <p className="text-sm">
              <b>{copy.uploadTitle}</b> {copy.uploadHint}
            </p>
            <p className="text-xs text-muted-foreground">{copy.imageLimit}</p>
            <p className="text-xs text-muted-foreground">{copy.videoLimit}</p>
            <p className="text-xs text-muted-foreground">{copy.fileLimit}</p>
          </div>
          <p className="rounded-lg bg-muted px-3 py-2 text-xs leading-6 text-muted-foreground">
            {copy.deadline}
          </p>
          <button
            type="submit"
            className={cn(
              "h-12 w-full rounded-lg bg-primary text-base font-semibold text-primary-foreground sm:w-auto sm:px-6",
            )}
          >
            {copy.submit}
          </button>
        </form>
        {notice && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-primary-soft px-3 py-2 text-xs leading-6 text-primary"
          >
            {notice}
          </p>
        )}
      </section>
    </div>
  );
}
