import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminSettings } from "./adminCopy";
import { roles, roleSectionLabels } from "./adminData";

const copy = adminSettings.roles;
const adminRole = roles[0];

const sectionOrder: (keyof typeof roleSectionLabels)[] = [
  "products",
  "orders",
  "customers",
  "content",
  "seo",
  "reports",
  "settings",
];

const roleRows = sectionOrder.map((section) => {
  const perm = adminRole.permissions.find((p) => p.section === section)!;
  return (
    <tr key={section} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">
        {roleSectionLabels[section]}
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
            perm.view
              ? "border-[#0b6e6e] bg-[#e3f1f0] text-[#0b6e6e]"
              : "border-[#5b6070] bg-transparent text-[#5b6070]"
          }`}
        >
          {perm.view ? "✓" : "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
            perm.create
              ? "border-[#0b6e6e] bg-[#e3f1f0] text-[#0b6e6e]"
              : "border-[#5b6070] bg-transparent text-[#5b6070]"
          }`}
        >
          {perm.create ? "✓" : "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
            perm.edit
              ? "border-[#0b6e6e] bg-[#e3f1f0] text-[#0b6e6e]"
              : "border-[#5b6070] bg-transparent text-[#5b6070]"
          }`}
        >
          {perm.edit ? "✓" : "—"}
        </span>
      </td>
      <td className="px-4 py-3 text-center">
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
            perm.delete
              ? "border-[#0b6e6e] bg-[#e3f1f0] text-[#0b6e6e]"
              : "border-[#5b6070] bg-transparent text-[#5b6070]"
          }`}
        >
          {perm.delete ? "✓" : "—"}
        </span>
      </td>
    </tr>
  );
});

export default function RolesListPage() {
  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <PageHeader
        title={copy.title}
        backHref="/admin/settings/store"
        backLabel={adminSettings.store.title}
      />
      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-bold">
            {copy.permissionsOf} «{adminRole.name}»
          </h2>
          <span className="text-[10px] font-medium text-muted-foreground">
            {adminRole.userCount} {copy.userCountLabel}
          </span>
        </div>
        <DataTable
          title=""
          columns={[
            copy.columns[1],
            copy.columns[2],
            copy.columns[3],
            copy.columns[4],
            copy.columns[5],
          ]}
          rows={roleRows}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {roles.map((r) => (
          <div
            key={r.id}
            className="rounded-xl border border-border bg-card p-4"
          >
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {r.name}
            </p>
            <p className="text-sm font-bold text-foreground">
              {r.userCount} {copy.userCountLabel}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-4">
        <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          {copy.add}
        </button>
        <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
          {copy.save}
        </button>
      </div>
    </AdminLayout>
  );
}
