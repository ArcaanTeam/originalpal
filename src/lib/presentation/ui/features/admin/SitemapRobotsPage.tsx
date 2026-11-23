import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { sitemapFiles } from "./adminData";

const copy = adminCopy.seo.sitemap;

const sitemapRows = sitemapFiles.map((f) => (
  <tr key={f.file} className="border-t border-border text-foreground">
    <td className="px-4 py-3 font-bold text-primary">{f.file}</td>
    <td className="px-4 py-3">{f.count.toLocaleString("fa-IR")}</td>
    <td className="px-4 py-3">{f.lastGenerated}</td>
  </tr>
));

export default function SitemapRobotsPage() {
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

      <section className="mb-6 rounded-2xl border border-border bg-card p-5">
        <div className="mb-4">
          <h3 className="text-[10px] font-bold text-primary">
            {copy.sitemapXml}
          </h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            https://originalpal.example/sitemap.xml
          </p>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-xs font-semibold text-[#0b6e6e]">
            {copy.updated}
          </span>
          <p className="ml-2 text-[10px] text-muted-foreground">
            {copy.lastGenerated} ۱۴۰۵/۰۸/۰۴ · ۱۰:۱۵ · ۱٬۹۳۴ آدرس
          </p>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{copy.autoUpdate}</p>
        <div className="mt-3 flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-muted-foreground">
              {copy.updateSchedule}
            </span>
            <span className="text-primary">{copy.scheduleEvery6h}</span>
          </div>
        </div>
        <h4 className="mt-5 mb-2 text-[10px] font-bold text-muted-foreground">
          {copy.contentTypes}
        </h4>
        <DataTable title="" columns={copy.subColumns} rows={sitemapRows} />
        <div className="mt-4 flex items-end gap-2 text-xs text-muted-foreground">
          {["۱", "۲", "۳"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            {copy.regenerate}
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
            {copy.submitSearchConsole}
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-3">
          <h3 className="text-[10px] font-bold text-primary">{copy.robots}</h3>
          <p className="mt-1 text-[10px] text-muted-foreground">
            {copy.robotsEditor}
          </p>
        </div>
        <textarea
          defaultValue="User-agent: *\nDisallow: /cart\nDisallow: /checkout\nDisallow: /account\nDisallow: /search?\nDisallow: /admin\nAllow: /\nSitemap: https://originalpal.example/sitemap.xml"
          className="w-full rounded-lg border border-border bg-transparent px-3 py-3 font-mono text-sm"
          rows={10}
        />
        <div className="mt-3 flex items-center gap-3">
          <p className="text-xs font-semibold text-[#0b6e6e]">
            {copy.syntaxValid}
          </p>
          <p className="ml-auto text-[10px] text-muted-foreground">
            {copy.sitemapAdded}
          </p>
        </div>
        <p className="mt-2 text-[10px] text-muted-foreground">
          {copy.adminBlocked}
        </p>
        <div className="mt-4 flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
            {copy.save}
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            {copy.test}
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            {copy.revert}
          </button>
        </div>
      </section>
    </AdminLayout>
  );
}
