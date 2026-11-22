import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { ShipmentRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { shipments } from "./adminData";

export default function ShippingPage() {
  const copy = adminCopy.shipping;
  const rows = shipments.map((s) => <ShipmentRow key={s.id} shipment={s} />);

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable title="فهرست ارسال‌ها" columns={copy.columns} rows={rows} />
        {shipments.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-[#dce5de] bg-card px-5 py-16 text-center">
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-primary-soft text-primary">
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
                <polyline points="14 2 9 21" />
                <path d="M21 12v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2z" />
                <circle cx="5.5" cy="18.5" r="1.5" />
                <circle cx="18.5" cy="18.5" r="1.5" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
