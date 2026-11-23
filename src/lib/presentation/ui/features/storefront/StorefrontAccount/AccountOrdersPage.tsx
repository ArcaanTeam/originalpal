"use client";

import { useState } from "react";
import AccountOrdersUI from "./AccountOrdersUI";
import { accountOrders, filterOrders, type OrderFilter } from "./accountData";

export default function AccountOrdersPage() {
  const [filter, setFilter] = useState<OrderFilter>("all");

  return (
    <AccountOrdersUI
      orders={filterOrders(accountOrders, filter)}
      filter={filter}
      onChangeFilter={setFilter}
    />
  );
}
