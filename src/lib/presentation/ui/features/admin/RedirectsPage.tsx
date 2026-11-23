import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { notFound404s, redirects } from "./adminData";

const copy = adminCopy.seo.redirects;

const redirectRows = redirects.map((r) => {
  const typeLabel = r.type === "301" ? copy.type301 : copy.type302;
  return (
    <tr key={r.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{r.source}</td>
      <td className="px-4 py-3">{r.destination}</td>
      <td className="px-4 py-3">{typeLabel}</td>
      <td className="px-4 py-3">{r.visits}</td>
    </tr>
  );
});

const notFoundRows = notFound404s.map((n) => (
  <tr key={n.id} className="border-t border-border text-foreground">
    <td className="px-4 py-3 font-bold text-primary">{n.path}</td>
    <td className="px-4 py-3">{n.lastVisited}</td>
  </tr>
));

export default function RedirectsPage() {
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
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
            {copy.add}
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            {copy.importCsv}
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            {copy.exportCsv}
          </button>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="mb-3 text-sm font-bold">{copy.listTitle}</h2>
        <DataTable title="" columns={copy.columns} rows={redirectRows} />
        <div className="mt-4 flex items-end gap-2 text-xs text-muted-foreground">
          <span>{copy.showing} ۱ تا ۴ از ۲۷ ریدایرکت</span>
          {["۱", "۲", "۳"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3 flex items-center gap-2">
          <h2 className="text-sm font-bold">{copy.notFound404Title}</h2>
        </div>
        <DataTable title="" columns={copy.columns404} rows={notFoundRows} />
        <div className="mt-4 flex items-end gap-2 text-xs text-muted-foreground">
          {["۱", "۲", "۳"].map((n) => (
            <span key={n}>{n}</span>
          ))}
          <p className="ml-auto text-[10px] text-muted-foreground">
            مرتب‌شده بر اساس بازدید
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
