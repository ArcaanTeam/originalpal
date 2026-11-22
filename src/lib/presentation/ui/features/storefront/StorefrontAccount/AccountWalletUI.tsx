"use client";

import { cn } from "cn";
import { EmptyState } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import { formatWalletAmount, type WalletTransaction } from "./accountData";

export interface AccountWalletUIProps {
  balance: number;
  transactions: WalletTransaction[];
  notice: string | null;
  onClickTopUp: () => void;
}

export default function AccountWalletUI({
  balance,
  transactions,
  notice,
  onClickTopUp,
}: AccountWalletUIProps) {
  const copy = accountCopy.sections.wallet;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="hidden text-xl font-extrabold lg:mb-2 lg:block lg:text-2xl">
        {copy.desktopTitle}
      </h1>

      <section className="flex flex-col gap-3 rounded-xl bg-primary p-6 text-primary-foreground">
        <p className="text-sm text-[#c9e3e1]">{copy.balance}</p>
        <p className="text-2xl font-bold tabular-nums sm:text-3xl">
          {balance.toLocaleString("fa-IR")}{" "}
          <span className="text-sm font-normal">{copy.toman}</span>
        </p>
        <button
          type="button"
          onClick={onClickTopUp}
          className="h-12 self-start rounded-lg bg-accent px-5 text-base font-semibold text-accent-foreground"
        >
          {copy.topUp}
        </button>
      </section>

      {notice && (
        <p
          role="status"
          className="rounded-lg bg-primary-soft px-3 py-2 text-xs leading-6 text-primary"
        >
          {notice}
        </p>
      )}

      <section className="rounded-xl border border-border bg-white p-4 sm:p-5">
        <h2 className="text-base font-extrabold">{copy.transactions}</h2>
        {transactions.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">{copy.empty}</p>
        ) : (
          <ul className="mt-3 flex flex-col">
            {transactions.map((transaction, index) => (
              <li
                key={transaction.id}
                className={cn(
                  "flex items-center gap-3 py-2.5 text-sm",
                  index > 0 && "border-t border-border",
                )}
              >
                <span className="min-w-0 flex-1 leading-[1.7]">
                  <span className="block">{transaction.title}</span>
                  <span className="block text-xs text-muted-foreground">
                    {transaction.date}
                  </span>
                </span>
                <b
                  className={cn(
                    "shrink-0 tabular-nums",
                    transaction.amount < 0
                      ? "text-destructive"
                      : "text-[#14633b]",
                  )}
                >
                  <bdi dir="ltr">{formatWalletAmount(transaction.amount)}</bdi>
                </b>
              </li>
            ))}
          </ul>
        )}
      </section>
      {transactions.length === 0 && <EmptyState>{copy.empty}</EmptyState>}
    </div>
  );
}
