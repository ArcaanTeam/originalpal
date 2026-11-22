import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { OrderRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { orders } from "./adminData";

export default function OrdersListPage() {
  const copy = adminCopy.orders;
  const rows = orders.map((order) => <OrderRow key={order.id} order={order} />);

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
        <DataTable title="فهرست سفارشات" columns={copy.columns} rows={rows} />
        {orders.length === 0 && (
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
                <circle cx="11" cy="11" r="8" />
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
