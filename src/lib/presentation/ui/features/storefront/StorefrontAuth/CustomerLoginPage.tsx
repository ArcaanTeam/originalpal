"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomerLoginUI, { type CustomerLoginMode } from "./CustomerLoginUI";
import { customerAuthCopy } from "./customerAuthCopy";
import { isValidIranMobile, normalizeMobileNumber } from "./phone";

export default function CustomerLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<CustomerLoginMode>("otp");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [mobileInvalid, setMobileInvalid] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  function handleChangeMobile(value: string) {
    setMobile(normalizeMobileNumber(value));
    setMobileInvalid(false);
    setNotice(null);
  }

  function handleSwitchMode(next: CustomerLoginMode) {
    setMode(next);
    setMobileInvalid(false);
    setNotice(null);
  }

  function handleSubmit() {
    if (mode === "password") {
      if (!isValidIranMobile(mobile) || password.length === 0) {
        setMobileInvalid(!isValidIranMobile(mobile));
        setNotice(null);
        return;
      }
      setNotice(customerAuthCopy.login.passwordNotice);
      return;
    }

    if (!isValidIranMobile(mobile)) {
      setMobileInvalid(true);
      return;
    }
    router.push(`/account/login/verify?phone=${mobile}`);
  }

  return (
    <CustomerLoginUI
      translations={customerAuthCopy}
      mode={mode}
      mobile={mobile}
      mobileInvalid={mobileInvalid}
      password={password}
      notice={notice}
      onChangeMobile={handleChangeMobile}
      onChangePassword={(value) => {
        setPassword(value);
        setNotice(null);
      }}
      onSubmit={handleSubmit}
      onSwitchMode={handleSwitchMode}
    />
  );
}
