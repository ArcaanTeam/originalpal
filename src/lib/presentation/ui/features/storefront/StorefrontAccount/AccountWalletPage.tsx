"use client";

import { useState } from "react";
import AccountWalletUI from "./AccountWalletUI";
import { accountCopy } from "./accountCopy";
import { accountStats, walletTransactions } from "./accountData";

export default function AccountWalletPage() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <AccountWalletUI
      balance={accountStats.walletBalance}
      transactions={walletTransactions}
      notice={notice}
      onClickTopUp={() => setNotice(accountCopy.sections.wallet.topUpNotice)}
    />
  );
}
