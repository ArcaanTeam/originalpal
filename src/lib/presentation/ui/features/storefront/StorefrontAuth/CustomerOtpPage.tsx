"use client";

import { useEffect, useState } from "react";
import CustomerOtpUI, { OTP_LENGTH } from "./CustomerOtpUI";
import { customerAuthCopy } from "./customerAuthCopy";
import {
  formatMobileNumber,
  isValidIranMobile,
  normalizeMobileNumber,
} from "./phone";

const RESEND_SECONDS = 102;

const emptyCode = () => Array.from<string>({ length: OTP_LENGTH }).fill("");

export default function CustomerOtpPage({ phone = "" }: { phone?: string }) {
  const mobile = normalizeMobileNumber(phone);
  const [code, setCode] = useState<string[]>(emptyCode);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(
      () => setCountdown((value) => value - 1),
      1000,
    );
    return () => window.clearTimeout(timer);
  }, [countdown]);

  function handleChangeDigit(index: number, value: string) {
    setCode((current) => {
      const next = [...current];
      next[index] = value.slice(0, 1);
      return next;
    });
    setError(null);
    setNotice(null);
  }

  function handleSubmit() {
    if (code.some((digit) => !digit)) {
      setError(customerAuthCopy.otp.error);
      return;
    }
    setError(null);
    setNotice(customerAuthCopy.notConnected);
  }

  function handleResend() {
    setCode(emptyCode());
    setError(null);
    setCountdown(RESEND_SECONDS);
    setNotice("کد تأیید جدید به شماره شما ارسال شد.");
  }

  return (
    <CustomerOtpUI
      translations={customerAuthCopy}
      mobileLabel={
        isValidIranMobile(mobile) ? formatMobileNumber(mobile) : mobile
      }
      code={code}
      countdownSeconds={countdown}
      error={error}
      notice={notice}
      onChangeDigit={handleChangeDigit}
      onSubmit={handleSubmit}
      onClickResend={handleResend}
    />
  );
}
