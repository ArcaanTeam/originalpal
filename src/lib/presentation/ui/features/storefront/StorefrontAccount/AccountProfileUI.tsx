"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useState } from "react";
import { cn } from "cn";
import { Check } from "lucide-react";
import { formatToman } from "../StorefrontCart/cartAtom";
import { SectionCard } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import type { AccountProfile, AccountStats } from "./accountData";

export interface AccountProfileValues {
  firstName: string;
  lastName: string;
  nationalId: string;
  email: string;
  birthDate: string;
  gender: AccountProfile["gender"];
  newsletter: boolean;
  twoFactor: boolean;
}

export interface AccountProfileUIProps {
  profile: AccountProfile;
  stats: AccountStats;
  values: AccountProfileValues;
  notice: string | null;
  onChangeField: (field: keyof AccountProfileValues, value: string) => void;
  onToggle: (field: "newsletter" | "twoFactor", value: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}

function Field({
  id,
  label,
  value,
  onChange,
  dir,
  readOnly,
  hint,
  badge,
}: {
  id: string;
  label: string;
  value: string;
  onChange?: (value: string) => void;
  dir?: "ltr" | "rtl";
  readOnly?: boolean;
  hint?: string;
  badge?: string;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={id}
          dir={dir}
          value={value}
          readOnly={readOnly}
          onChange={(event) => onChange?.(event.target.value)}
          className={cn(
            "h-11 w-full rounded-lg border border-input bg-white px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ring",
            readOnly && "bg-muted text-muted-foreground",
            dir === "ltr" && "text-start",
          )}
        />
        {badge && (
          <span className="inline-flex h-6 shrink-0 items-center rounded-full bg-[#e4f3ea] px-2 text-xs font-semibold text-[#14633b]">
            {badge}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Switch({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="leading-6">
        <span className="block text-sm font-medium">{label}</span>
        {hint && (
          <span className="block text-xs text-muted-foreground">{hint}</span>
        )}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-primary" : "bg-input",
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 size-5 rounded-full bg-white shadow transition-all",
            checked ? "start-0.5" : "start-[22px]",
          )}
        />
      </button>
    </div>
  );
}

export default function AccountProfileUI({
  profile,
  stats,
  values,
  notice,
  onChangeField,
  onToggle,
  onSubmit,
  onCancel,
}: AccountProfileUIProps) {
  const copy = accountCopy.sections.profile;
  const [securityNotice, setSecurityNotice] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          {
            label: copy.stats.activeOrders,
            value: stats.activeOrders.toLocaleString("fa-IR"),
          },
          {
            label: copy.stats.wishlist,
            value: stats.wishlist.toLocaleString("fa-IR"),
          },
          {
            label: copy.stats.wallet,
            value: formatToman(stats.walletBalance),
          },
        ].map((stat) => (
          <li
            key={stat.label}
            className="rounded-xl border border-border bg-white px-4 py-3"
          >
            <span className="block text-xs text-muted-foreground">
              {stat.label}
            </span>
            <span className="mt-1 block text-lg font-extrabold tabular-nums">
              {stat.value}
            </span>
          </li>
        ))}
      </ul>

      <SectionCard>
        <h2 className="mb-4 text-base font-extrabold">{copy.personalInfo}</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field
              id="account-first-name"
              label={copy.fields.firstName}
              value={values.firstName}
              onChange={(value) => onChangeField("firstName", value)}
            />
            <Field
              id="account-last-name"
              label={copy.fields.lastName}
              value={values.lastName}
              onChange={(value) => onChangeField("lastName", value)}
            />
            <Field
              id="account-national-id"
              label={copy.fields.nationalId}
              dir="ltr"
              value={values.nationalId}
              onChange={(value) => onChangeField("nationalId", value)}
            />
            <Field
              id="account-mobile"
              label={copy.fields.mobile}
              dir="ltr"
              readOnly
              value={profile.mobile}
              badge={copy.fields.verified}
            />
            <Field
              id="account-email"
              label={copy.fields.email}
              dir="ltr"
              value={values.email}
              onChange={(value) => onChangeField("email", value)}
            />
            <Field
              id="account-birth-date"
              label={copy.fields.birthDate}
              dir="ltr"
              value={values.birthDate}
              onChange={(value) => onChangeField("birthDate", value)}
            />
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-medium">
              {copy.fields.gender}
            </legend>
            <div className="mt-2 flex gap-6">
              {(
                [
                  ["male", copy.fields.male],
                  ["female", copy.fields.female],
                ] as const
              ).map(([value, label]) => (
                <label
                  key={value}
                  className="flex items-center gap-2 text-sm"
                  htmlFor={`account-gender-${value}`}
                >
                  <input
                    id={`account-gender-${value}`}
                    type="radio"
                    name="account-gender"
                    checked={values.gender === value}
                    onChange={() => onChangeField("gender", value)}
                    className="size-4 accent-primary"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-4 border-t border-border pt-4">
            <Switch
              label={copy.fields.newsletter}
              hint={copy.fields.newsletterHint}
              checked={values.newsletter}
              onChange={(value) => onToggle("newsletter", value)}
            />
          </div>
          {notice && (
            <p
              role="status"
              className="mt-4 rounded-lg bg-primary-soft px-3 py-2 text-xs leading-6 text-primary"
            >
              {notice}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="submit"
              className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-base font-semibold text-primary-foreground"
            >
              <Check size={17} />
              {accountCopy.saveButton}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="h-12 rounded-lg border border-input bg-white px-5 text-base font-semibold"
            >
              {accountCopy.cancelButton}
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard>
        <h2 className="mb-4 text-base font-extrabold">{copy.security}</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-3 border-b border-border pb-3">
            <span className="min-w-0 flex-1 leading-6">
              <span className="block text-sm font-medium">
                {copy.fields.password}
              </span>
              <span className="block text-xs text-muted-foreground">
                {copy.fields.passwordChangedAt} {profile.passwordChangedAt}
              </span>
            </span>
            <button
              type="button"
              onClick={() => setSecurityNotice(copy.savedNotice)}
              className="h-11 rounded-lg border border-input bg-white px-4 text-sm font-semibold"
            >
              {copy.fields.changePassword}
            </button>
          </div>
          <Switch
            label={copy.fields.twoFactor}
            hint={copy.fields.twoFactorHint}
            checked={values.twoFactor}
            onChange={(value) => onToggle("twoFactor", value)}
          />
        </div>
        {securityNotice && (
          <p
            role="status"
            className="mt-4 rounded-lg bg-muted px-3 py-2 text-xs leading-6 text-muted-foreground"
          >
            {securityNotice}
          </p>
        )}
      </SectionCard>

      <Link
        href="/account/profile"
        className="self-start text-xs font-semibold text-primary"
      >
        {accountCopy.back}
      </Link>
    </div>
  );
}
