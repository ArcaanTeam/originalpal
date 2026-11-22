"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { cn } from "cn";
import { MapPin } from "lucide-react";
import { EmptyState, StatusBadge } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import type { AccountAddress } from "./accountData";

export interface AddressDraft {
  province: string;
  city: string;
  fullAddress: string;
  plaque: string;
  unit: string;
  postalCode: string;
  recipient: string;
  mobile: string;
  isDefault: boolean;
}

export interface AccountAddressesUIProps {
  addresses: AccountAddress[];
  notice: string | null;
  onClickDelete: (id: string) => void;
  onSubmitAddress: (draft: AddressDraft) => void;
}

function DraftField({
  id,
  label,
  value,
  onChange,
  readOnly,
  dir,
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  dir?: "ltr";
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        dir={dir}
        value={value}
        readOnly={readOnly}
        onChange={(event) => onChange?.(event.target.value)}
        className={cn(
          "h-11 w-full rounded-lg border border-input bg-white px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ring",
          readOnly && "bg-muted text-muted-foreground",
        )}
      />
    </div>
  );
}

export default function AccountAddressesUI({
  addresses,
  notice,
  onClickDelete,
  onSubmitAddress,
}: AccountAddressesUIProps) {
  const copy = accountCopy.sections.addresses;
  const [draft, setDraft] = useState<AddressDraft>({
    province: "تهران",
    city: "تهران",
    fullAddress: "",
    plaque: "",
    unit: "",
    postalCode: "",
    recipient: "علی رضایی",
    mobile: "۰۹۱۲۳۴۵۶۷۸۹",
    isDefault: false,
  });

  function setField<K extends keyof AddressDraft>(
    key: K,
    value: AddressDraft[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmitAddress(draft);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="hidden min-w-0 flex-1 text-xl font-extrabold lg:block lg:text-2xl">
          {copy.desktopTitle}
        </h1>
        <a
          href="#account-new-address"
          className="inline-flex h-12 items-center rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground"
        >
          {copy.addNew}
        </a>
      </div>

      {addresses.length === 0 ? (
        <EmptyState>{copy.empty}</EmptyState>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {addresses.map((address) => (
            <li
              key={address.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-white p-4"
            >
              <div className="flex flex-wrap items-center gap-2">
                <b className="text-[15px]">{address.title}</b>
                {address.isDefault && (
                  <StatusBadge tone="primary">{copy.defaultBadge}</StatusBadge>
                )}
              </div>
              <p className="text-sm leading-[1.9] text-muted-foreground">
                {address.line} · {copy.postalCode} {address.postalCode}
                <br />
                {address.recipient} · <bdi dir="ltr">{address.mobile}</bdi>
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="#account-new-address"
                  className="inline-flex h-12 items-center rounded-lg border border-input bg-white px-5 text-base font-semibold"
                >
                  {copy.edit}
                </a>
                <button
                  type="button"
                  onClick={() => onClickDelete(address.id)}
                  className="h-11 rounded-lg px-4 text-sm font-semibold text-destructive"
                >
                  {copy.delete}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <section
        id="account-new-address"
        className="scroll-mt-4 rounded-xl border border-border bg-white p-4 sm:p-5"
      >
        <h2 className="mb-4 text-base font-extrabold">{copy.newTitle}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <span className="flex h-32 items-center justify-center gap-2 rounded-lg bg-muted text-sm text-muted-foreground">
            <MapPin size={20} aria-hidden="true" />
            {copy.map}
          </span>
          <div className="grid gap-4 sm:grid-cols-2">
            <DraftField
              id="address-province"
              label={copy.province}
              value={draft.province}
              onChange={(value) => setField("province", value)}
            />
            <DraftField
              id="address-city"
              label={copy.city}
              value={draft.city}
              onChange={(value) => setField("city", value)}
            />
          </div>
          <DraftField
            id="address-full"
            label={copy.fullAddress}
            value={draft.fullAddress}
            onChange={(value) => setField("fullAddress", value)}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <DraftField
              id="address-plaque"
              label={copy.plaque}
              value={draft.plaque}
              onChange={(value) => setField("plaque", value)}
            />
            <DraftField
              id="address-unit"
              label={copy.unit}
              value={draft.unit}
              onChange={(value) => setField("unit", value)}
            />
          </div>
          <DraftField
            id="address-postal"
            label={copy.postalCode}
            dir="ltr"
            value={draft.postalCode}
            onChange={(value) => setField("postalCode", value)}
          />
          <DraftField
            id="address-recipient"
            label={copy.recipient}
            value={draft.recipient}
            onChange={(value) => setField("recipient", value)}
          />
          <DraftField
            id="address-mobile"
            label={copy.mobile}
            dir="ltr"
            value={draft.mobile}
            onChange={(value) => setField("mobile", value)}
          />
          <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
            <span className="text-sm font-medium">{copy.setDefault}</span>
            <button
              type="button"
              role="switch"
              aria-checked={draft.isDefault}
              aria-label={copy.setDefault}
              onClick={() => setField("isDefault", !draft.isDefault)}
              className={cn(
                "relative h-6 w-11 shrink-0 rounded-full transition-colors",
                draft.isDefault ? "bg-primary" : "bg-input",
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
                  draft.isDefault ? "start-0.5" : "start-[22px]",
                )}
              />
            </button>
          </div>
          <button
            type="submit"
            className="h-12 rounded-lg bg-primary text-base font-semibold text-primary-foreground sm:w-auto sm:self-start sm:px-6"
          >
            {copy.save}
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
