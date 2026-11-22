import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { ReturnRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { returns } from "./adminData";

export default function ReturnsListPage() {
  const copy = adminCopy.returns;
  const rows = returns.map((item) => <ReturnRow key={item.id} item={item} />);

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable
          title="فهرست درخواست‌های مرجوعی"
          columns={copy.columns}
          rows={rows}
        />
        {returns.length === 0 && (
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
                <polyline points="7 9 12 12 17 9" />
                <path d="m21 21-4.3-4.3" />
                <circle cx="11" cy="11" r="8" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
