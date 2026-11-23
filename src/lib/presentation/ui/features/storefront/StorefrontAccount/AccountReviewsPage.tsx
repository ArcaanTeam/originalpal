"use client";

import { useState } from "react";
import AccountReviewsUI from "./AccountReviewsUI";
import { accountReviews } from "./accountData";

export default function AccountReviewsPage() {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <AccountReviewsUI
      reviews={accountReviews}
      notice={notice}
      onClickEdit={() =>
        setNotice("ویرایش دیدگاه پس از اتصال سرویس دیدگاه‌ها فعال می‌شود.")
      }
    />
  );
}
