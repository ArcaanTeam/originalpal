import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { brokenLinks } from "./adminData";

const copy = adminCopy.seo.brokenLinks;

const typeLabels: Record<string, string> = {
  internal: copy.internal,
  external: copy.external,
};

const brokenLinkRows = brokenLinks.map((b) => (
  <tr key={b.id} className="border-t border-border text-foreground">
    <td className="px-4 py-3 font-bold text-primary">{b.foundIn}</td>
    <td className="px-4 py-3">{b.statusCode}</td>
    <td className="px-4 py-3">{typeLabels[b.type]}</td>
    <td className="px-4 py-3">
      <button className="text-xs font-medium text-primary hover:underline">
        {copy.action}
      </button>
    </td>
  </tr>
));

export default function BrokenLinksPage() {
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
        <div className="flex items-center gap-4">
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            {copy.rescan}
          </button>
          <span className="text-xs text-muted-foreground">
            {copy.lastScan}: امروز ۰۶:۰۰
          </span>
        </div>
        <div className="flex gap-2 text-xs font-medium text-muted-foreground">
          <span>{copy.checkedLinks}</span>
          <span className="font-bold text-foreground">{2480}</span>
          <span>{copy.brokenLinksCount}</span>
          <span className="font-bold text-[#b42318]">{brokenLinks.length}</span>
          <span>{copy.typeAll}</span>
          <span>{copy.statusAll}</span>
          <span>{copy.typeLink}</span>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable title="" columns={copy.columns} rows={brokenLinkRows} />
        <div className="mt-4 flex items-end gap-2 text-xs text-muted-foreground">
          <span>{copy.showing} ۱ تا ۵ از ۱۲ مورد</span>
          {["۱", "۲", "۳"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
