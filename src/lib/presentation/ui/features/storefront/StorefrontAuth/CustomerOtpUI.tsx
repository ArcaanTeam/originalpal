"use client";

import Link from "next/link";
import { useRef, type FormEvent, type KeyboardEvent } from "react";
import { ArrowRight, Clock3 } from "lucide-react";
import type { CustomerLoginCopy } from "./customerAuthCopy";
import { formatCountdown, normalizeDigits, toPersianDigits } from "./phone";

export const OTP_LENGTH = 5;

export interface CustomerOtpUIProps {
  translations: CustomerLoginCopy;
  mobileLabel: string;
  code: string[];
  countdownSeconds: number;
  error: string | null;
  notice: string | null;
  onChangeDigit: (index: number, value: string) => void;
  onSubmit: () => void;
  onClickResend: () => void;
}

export default function CustomerOtpUI({
  translations,
  mobileLabel,
  code,
  countdownSeconds,
  error,
  notice,
  onChangeDigit,
  onSubmit,
  onClickResend,
}: CustomerOtpUIProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const { otp } = translations;
  const canResend = countdownSeconds <= 0;

  function focusInput(index: number) {
    const next = Math.min(Math.max(index, 0), OTP_LENGTH - 1);
    inputRefs.current[next]?.focus();
    inputRefs.current[next]?.select();
  }

  function handleDigitChange(index: number, value: string) {
    const digits = normalizeDigits(value);
    if (digits.length > 1) {
      digits.split("").forEach((digit, offset) => {
        if (index + offset < OTP_LENGTH) onChangeDigit(index + offset, digit);
      });
      focusInput(index + digits.length);
      return;
    }
    onChangeDigit(index, digits);
    if (digits) focusInput(index + 1);
  }

  function handleKeyDown(
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !code[index]) {
      event.preventDefault();
      focusInput(index - 1);
      onChangeDigit(index - 1, "");
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusInput(index + 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      focusInput(index - 1);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  return (
    <main className="mx-auto flex w-full max-w-[900px] flex-1 items-center px-4 py-8 sm:px-8">
      <div className="grid w-full gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="rounded-2xl border border-border bg-white p-5 sm:p-8">
          <Link
            href="/account/login"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            <ArrowRight size={15} />
            {otp.back}
          </Link>
          <h1 className="mt-4 text-2xl font-extrabold">{otp.title}</h1>
          <p className="mt-2 text-sm leading-[1.9] text-muted-foreground">
            {mobileLabel ? (
              <>
                {otp.descriptionPrefix}{" "}
                <bdi dir="ltr" className="font-bold text-foreground">
                  {mobileLabel}
                </bdi>{" "}
                {otp.descriptionSuffix}
              </>
            ) : (
              otp.missingMobileHint
            )}{" "}
            <Link href="/account/login" className="font-semibold text-primary">
              {otp.editMobile}
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <fieldset>
              <legend className="sr-only">{otp.title}</legend>
              <div dir="ltr" className="flex justify-center gap-2">
                {Array.from({ length: OTP_LENGTH }, (_, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] = element;
                    }}
                    aria-label={otp.digitLabel}
                    aria-invalid={error ? true : undefined}
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={OTP_LENGTH}
                    value={code[index] ? toPersianDigits(code[index]) : ""}
                    onChange={(event) =>
                      handleDigitChange(index, event.target.value)
                    }
                    onKeyDown={(event) => handleKeyDown(index, event)}
                    onFocus={(event) => event.target.select()}
                    className="h-14 w-[52px] rounded-lg border border-input bg-white text-center text-[22px] font-semibold outline-none focus-visible:border-2 focus-visible:border-primary aria-invalid:border-destructive"
                  />
                ))}
              </div>
            </fieldset>
            {error && (
              <p role="alert" className="text-center text-xs text-destructive">
                {error}
              </p>
            )}
            <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
              <Clock3 size={18} />
              {otp.resendIn}{" "}
              <span className="font-bold text-foreground tabular-nums">
                {formatCountdown(countdownSeconds)}
              </span>
            </div>
            <button
              type="submit"
              disabled={!mobileLabel}
              className="h-12 w-full rounded-lg bg-primary text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {otp.submit}
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
          <div className="mt-4 flex items-center justify-between gap-3 text-xs text-muted-foreground">
            <button
              type="button"
              onClick={onClickResend}
              disabled={!canResend}
              className="font-bold text-primary disabled:opacity-40"
            >
              {otp.resend}
            </button>
            {canResend && <span>کد جدید ارسال شد.</span>}
          </div>
          <Link
            href="/account/login"
            className="mt-4 flex h-12 w-full items-center justify-center rounded-lg border border-input bg-white text-base font-semibold transition-colors hover:bg-muted"
          >
            {otp.cancel}
          </Link>
        </section>
        <aside className="hidden rounded-2xl bg-primary p-6 text-white lg:flex lg:flex-col lg:justify-center">
          <p className="text-lg leading-[1.7] font-bold">
            {translations.benefits.title}
          </p>
          <ul className="mt-5 space-y-4">
            {translations.benefits.items.slice(0, 3).map((item) => (
              <li key={item.title} className="leading-[1.8]">
                <span className="block text-sm font-semibold">
                  {item.title}
                </span>
                <span className="mt-0.5 block text-xs text-white/65">
                  {item.description}
                </span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
}
