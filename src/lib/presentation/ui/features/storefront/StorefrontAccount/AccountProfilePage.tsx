"use client";

import { useRouter as useAppRouter } from "next/navigation";
import { useState } from "react";
import useUpdateUsername from "@/lib/presentation/data/feature/auth/useUpdateUsername";
import { useAuthSession } from "@/lib/presentation/ui/auth/use-auth-session";
import AccountProfileUI, {
  type AccountProfileValues,
} from "./AccountProfileUI";
import { accountCopy } from "./accountCopy";
import { accountStats } from "./accountData";

const initialValues: AccountProfileValues = {
  firstName: "",
  lastName: "",
  nationalId: "",
  email: "",
  birthDate: "",
  gender: "male",
  newsletter: true,
  twoFactor: false,
};

export default function AccountProfilePage() {
  const router = useAppRouter();
  const { user, sessionReady, sessionActive } = useAuthSession();
  const { updateUsername } = useUpdateUsername();

  const [values, setValues] = useState<AccountProfileValues>(initialValues);
  const [notice, setNotice] = useState<string | null>(null);

  // Require authentication; the profile is backed by the real session, not mock data.
  if (!sessionReady) {
    return null;
  }
  if (!sessionActive || !user) {
    router.replace("/account/login?redirectTo=/account/profile");
    return null;
  }

  const username: string = user.username;

  // The email input shows the real username until the user types a new value.
  const emailInput = values.email || username;

  function handleChangeField(field: keyof AccountProfileValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setNotice(null);
  }

  function handleToggle(field: "newsletter" | "twoFactor", value: boolean) {
    setValues((current) => ({ ...current, [field]: value }));
    setNotice(null);
  }

  async function handleSave() {
    try {
      await updateUsername({
        username: (values.email || username).trim(),
      });
      setNotice(accountCopy.sections.profile.savedNotice);
    } catch {
      setNotice("ذخیره با خطا مواجه شد. لطفاً دوباره تلاش کنید.");
    }
  }

  return (
    <AccountProfileUI
      profile={{
        firstName: values.firstName,
        lastName: values.lastName,
        fullName: username,
        mobile: username,
        nationalId: values.nationalId,
        email: emailInput,
        birthDate: values.birthDate,
        gender: values.gender,
        newsletter: values.newsletter,
        twoFactor: values.twoFactor,
        passwordChangedAt: "",
      }}
      stats={accountStats}
      values={{ ...values, email: emailInput }}
      notice={notice}
      onChangeField={handleChangeField}
      onToggle={handleToggle}
      onSubmit={handleSave}
      onCancel={() => {
        setValues((current) => ({ ...current, email: "" }));
        setNotice(null);
      }}
    />
  );
}
