import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { TicketRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { tickets } from "./adminData";

export default function TicketsListPage() {
  const copy = adminCopy.tickets;
  const rows = tickets.map((ticket) => (
    <TicketRow key={ticket.id} ticket={ticket} />
  ));

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="درخواست‌های پشتیبانی"
    >
      <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
        <DataTable
          title="فهرست تیکت‌های پشتیبانی"
          columns={copy.columns}
          rows={rows}
        />
        {tickets.length === 0 && (
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
                <path d="M21 15v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
