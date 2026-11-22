"use client";

import { useState } from "react";
import AccountOrderDetailUI from "./AccountOrderDetailUI";
import { findOrder } from "./accountData";

export default function AccountOrderDetailPage({
  orderId,
}: {
  orderId: string;
}) {
  const [notice, setNotice] = useState<string | null>(null);

  return (
    <AccountOrderDetailUI
      order={findOrder(orderId)}
      notice={notice}
      onClickInvoice={() =>
        setNotice("دریافت فاکتور پس از اتصال سرویس سفارش‌ها فعال می‌شود.")
      }
      onClickPay={() =>
        setNotice("پرداخت سفارش پس از اتصال درگاه پرداخت فعال می‌شود.")
      }
    />
  );
}
