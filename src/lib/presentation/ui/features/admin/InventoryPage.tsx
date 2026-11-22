import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { InventoryRow } from "./AdminParts";
import { InventoryStatCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { inventory } from "./adminData";

export default function InventoryPage() {
  const copy = adminCopy.inventory;
  const rows = inventory.map((item) => (
    <InventoryRow key={item.id} item={item} />
  ));
  const totalStock = inventory.reduce((sum, item) => sum + item.stock, 0);
  const lowStock = inventory.filter((item) => item.status === "low").length;
  const outOfStock = inventory.filter((item) => item.status === "out").length;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active=""
    >
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <InventoryStatCard
          label="کل موجودی"
          value={totalStock.toLocaleString("fa-IR")}
        />
        <InventoryStatCard
          label="کم موجودی"
          value={lowStock.toLocaleString("fa-IR")}
        />
        <InventoryStatCard
          label="ناموجود"
          value={outOfStock.toLocaleString("fa-IR")}
        />
        <InventoryStatCard
          label="تعداد آیتم‌ها"
          value={inventory.length.toLocaleString("fa-IR")}
        />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable
          title="فهرست موجودی انبار"
          columns={copy.columns}
          rows={rows}
        />
        {inventory.length === 0 && (
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
