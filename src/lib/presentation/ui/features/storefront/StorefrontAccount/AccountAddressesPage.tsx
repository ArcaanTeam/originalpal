"use client";

import { useState } from "react";
import AccountAddressesUI, { type AddressDraft } from "./AccountAddressesUI";
import { accountCopy } from "./accountCopy";
import { accountAddresses } from "./accountData";

export default function AccountAddressesPage() {
  const [addresses, setAddresses] = useState(accountAddresses);
  const [notice, setNotice] = useState<string | null>(null);

  function handleDelete(id: string) {
    setAddresses((current) => current.filter((address) => address.id !== id));
  }

  function handleSubmitAddress(draft: AddressDraft) {
    if (draft.fullAddress.trim().length === 0) {
      setNotice("نشانی کامل را وارد کنید.");
      return;
    }
    setNotice(accountCopy.sections.addresses.savedNotice);
  }

  return (
    <AccountAddressesUI
      addresses={addresses}
      notice={notice}
      onClickDelete={handleDelete}
      onSubmitAddress={handleSubmitAddress}
    />
  );
}
