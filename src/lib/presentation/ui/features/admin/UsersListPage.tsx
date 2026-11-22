import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminSettings } from "./adminCopy";
import { users } from "./adminData";

const copy = adminSettings.users;

const userRows = users.map((u) => {
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    active: { color: "#0b6e6e", bg: "#e3f1f0", label: copy.statusActive },
    inactive: { color: "#5b6070", bg: "#f0eee8", label: copy.statusInactive },
  };
  const config = statusConfig[u.status] ?? {
    color: "#5b6070",
    bg: "#f0eee8",
    label: u.status,
  };
  return (
    <tr key={u.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{u.name}</td>
      <td className="px-4 py-3">{u.role}</td>
      <td className="px-4 py-3">{u.lastLogin}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
    </tr>
  );
});

export default function UsersListPage() {
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
            {copy.add}
          </button>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
          {copy.filters.map((f) => (
            <span
              key={f}
              className="cursor-pointer rounded border border-border px-2 py-1 hover:bg-muted"
            >
              {f}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable title="" columns={copy.columns} rows={userRows} />
        <div className="mt-4 flex items-end gap-2 text-xs text-muted-foreground">
          <span>
            {copy.showing} ۱ تا ۴ از ۷ {copy.users}
          </span>
          {["۱", "۲", "۳"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
