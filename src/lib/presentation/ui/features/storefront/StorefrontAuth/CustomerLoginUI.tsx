"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { ArrowLeft } from "lucide-react";
import AuthBenefitsPanel from "./CustomerAuthBenefits";
import type { CustomerLoginCopy } from "./customerAuthCopy";

export type CustomerLoginMode = "otp" | "password";

export interface CustomerLoginUIProps {
  translations: CustomerLoginCopy;
  mode: CustomerLoginMode;
  mobile: string;
  mobileInvalid: boolean;
  password: string;
  notice: string | null;
  onChangeMobile: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
  onSwitchMode: (mode: CustomerLoginMode) => void;
}

export default function CustomerLoginUI({
  translations,
  mode,
  mobile,
  mobileInvalid,
  password,
  notice,
  onChangeMobile,
  onChangePassword,
  onSubmit,
  onSwitchMode,
}: CustomerLoginUIProps) {
  const { login } = translations;
  const isPasswordMode = mode === "password";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main className="mx-auto flex w-full max-w-[1120px] flex-1 items-center px-4 py-8 sm:px-8 lg:py-12">
      <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-8">
          <div className="space-y-1.5">
            <h1 className="text-2xl font-extrabold">{login.title}</h1>
            <p className="text-sm leading-[1.9] text-muted-foreground">
              {login.description}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-5 space-y-4" noValidate>
            <div className="space-y-1.5">
              <label htmlFor="customer-mobile" className="text-sm font-medium">
                {login.mobileLabel}
              </label>
              <input
                id="customer-mobile"
                name="mobile"
                type="tel"
                dir="ltr"
                inputMode="numeric"
                autoComplete="tel-national"
                aria-describedby="customer-mobile-hint"
                aria-invalid={(mobileInvalid && !isPasswordMode) || undefined}
                value={mobile}
                onChange={(event) => onChangeMobile(event.target.value)}
                placeholder={login.mobilePlaceholder}
                className="h-11 w-full rounded-lg border border-input bg-white px-3 text-end text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ring aria-invalid:border-destructive"
              />
              <p
                id="customer-mobile-hint"
                className={
                  mobileInvalid && !isPasswordMode
                    ? "text-xs text-destructive"
                    : "text-xs text-muted-foreground"
                }
              >
                {login.mobileHint}
              </p>
            </div>
            {isPasswordMode && (
              <div className="space-y-1.5">
                <label
                  htmlFor="customer-password"
                  className="text-sm font-medium"
                >
                  {login.passwordLabel}
                </label>
                <input
                  id="customer-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => onChangePassword(event.target.value)}
                  className="h-11 w-full rounded-lg border border-input bg-white px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
                <p className="text-xs text-muted-foreground">
                  {login.passwordHint}
                </p>
              </div>
            )}
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {isPasswordMode ? login.passwordSubmit : login.submit}
              {!isPasswordMode && <ArrowLeft size={16} />}
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
          <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            {login.divider}
            <span className="h-px flex-1 bg-border" />
          </div>
          <button
            type="button"
            onClick={() => onSwitchMode(isPasswordMode ? "otp" : "password")}
            className="mt-5 h-12 w-full rounded-lg border border-input bg-white text-base font-semibold transition-colors hover:bg-muted"
          >
            {isPasswordMode ? login.switchToOtp : login.passwordButton}
          </button>
          <p className="mt-5 text-xs leading-[1.9] text-muted-foreground">
            {login.terms.prefix}{" "}
            <Link
              href={login.terms.termsHref}
              className="font-semibold text-primary"
            >
              {login.terms.terms}
            </Link>{" "}
            {login.privacy.separator}{" "}
            <Link
              href={login.privacy.href}
              className="font-semibold text-primary"
            >
              {login.privacy.label}
            </Link>{" "}
            {translations.brand} را می‌پذیرید.
          </p>
        </section>
        <AuthBenefitsPanel translations={translations} />
      </div>
    </main>
  );
}
