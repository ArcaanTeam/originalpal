import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { connections } from "./adminData";

const copy = adminCopy.seo.integrations;

const connectionRows = connections.map((c) => {
  const connected = c.status === "connected";
  return (
    <tr key={c.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{c.name}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
            connected
              ? "bg-[#e3f1f0] text-[#0b6e6e]"
              : "bg-[#fdecea] text-[#b42318]"
          }`}
        >
          {connected ? copy.connected : copy.disconnected}
        </span>
      </td>
      <td className="px-4 py-3">{c.lastSync ?? "—"}</td>
    </tr>
  );
});

export default function IntegrationsPage() {
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
        <DataTable title="" columns={copy.columns} rows={connectionRows} />
        {connections.length === 0 && (
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
