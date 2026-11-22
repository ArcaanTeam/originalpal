import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { TransactionRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { transactions } from "./adminData";

export default function TransactionsPage() {
  const copy = adminCopy.transactions;
  const rows = transactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />);

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
        <div className="mb-4 flex items-center justify-between border-b border-[#edf0ed] pb-3">
          <div>
            <p className="mb-1 text-[10px] text-[#818b85]">فیلتر تراکنش‌ها</p>
            <div className="flex gap-2">
              <select
                defaultValue="همه"
                className="h-9 rounded-lg border border-[#e5e9e5] bg-[#fcfcfb] px-3 text-xs font-normal outline-none focus:border-[#92bda9]"
              >
                <option>همه</option>
                <option>واریز</option>
                <option>بازپرداخت</option>
                <option>خرید</option>
              </select>
              <button className="rounded-lg border border-[#e6e9e5] px-4 text-xs font-semibold">
                اعمال
              </button>
            </div>
          </div>
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-[#087e68] px-5 text-xs font-bold text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={15}
              height={15}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {copy.export}
          </button>
        </div>
        <DataTable
          title="فهرست تراکنش‌های مالی"
          columns={copy.columns}
          rows={rows}
        />
        {transactions.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-[#dce5de] bg-white px-5 py-16 text-center">
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#eff6f2] text-[#087e68]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <line x1="12" y1="11" x2="12" y2="17" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
