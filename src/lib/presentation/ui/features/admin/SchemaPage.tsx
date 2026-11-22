import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { schemas } from "./adminData";

const copy = adminCopy.seo.schema;

const schemaRows = schemas.map((s) => (
  <tr key={s.id} className="border-t border-border text-foreground">
    <td className="px-4 py-3 font-bold text-primary">{s.name}</td>
    <td className="px-4 py-3">{s.pages.toLocaleString("fa-IR")}</td>
    <td className="px-4 py-3">
      <span
        className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
          s.status === "فعال"
            ? "bg-[#e3f1f0] text-[#0b6e6e]"
            : "bg-[#f0eee8] text-[#5b6070]"
        }`}
      >
        {s.status}
      </span>
    </td>
  </tr>
));

export default function SchemaPage() {
  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <PageHeader
        title={copy.title}
        backHref="/admin/seo"
        backLabel={adminCopy.seo.overview.view}
      />
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable title="" columns={copy.columns} rows={schemaRows} />
        {schemas.length === 0 && (
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
