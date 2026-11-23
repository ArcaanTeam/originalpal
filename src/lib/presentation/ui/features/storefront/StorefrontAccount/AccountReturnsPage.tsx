"use client";

import { useState } from "react";
import AccountReturnsUI from "./AccountReturnsUI";
import { accountCopy } from "./accountCopy";
import { accountReturns } from "./accountData";

export default function AccountReturnsPage() {
  const [notice, setNotice] = useState<string | null>(null);

  function handleSubmitRequest() {
    setNotice(accountCopy.sections.returns.submittedNotice);
  }

  return (
    <AccountReturnsUI
      returns={accountReturns}
      notice={notice}
      onSubmitRequest={handleSubmitRequest}
    />
  );
}
