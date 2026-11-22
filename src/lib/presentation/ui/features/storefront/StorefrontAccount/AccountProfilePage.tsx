"use client";

import { useState } from "react";
import AccountProfileUI, {
  type AccountProfileValues,
} from "./AccountProfileUI";
import { accountCopy } from "./accountCopy";
import { accountProfile, accountStats } from "./accountData";

const initialValues: AccountProfileValues = {
  firstName: accountProfile.firstName,
  lastName: accountProfile.lastName,
  nationalId: accountProfile.nationalId,
  email: accountProfile.email,
  birthDate: accountProfile.birthDate,
  gender: accountProfile.gender,
  newsletter: accountProfile.newsletter,
  twoFactor: accountProfile.twoFactor,
};

export default function AccountProfilePage() {
  const [values, setValues] = useState(initialValues);
  const [notice, setNotice] = useState<string | null>(null);

  function handleChangeField(field: keyof AccountProfileValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setNotice(null);
  }

  function handleToggle(field: "newsletter" | "twoFactor", value: boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    setNotice(null);
  }

  return (
    <AccountProfileUI
      profile={accountProfile}
      stats={accountStats}
      values={values}
      notice={notice}
      onChangeField={handleChangeField}
      onToggle={handleToggle}
      onSubmit={() => setNotice(accountCopy.sections.profile.savedNotice)}
      onCancel={() => {
        setValues(initialValues);
        setNotice(null);
      }}
    />
  );
}
