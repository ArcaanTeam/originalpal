import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { internalLinks } from "./adminData";

const copy = adminCopy.seo.internalLinks;

const internalLinkRows = internalLinks.map((l) => (
  <tr key={l.id} className="border-t border-border text-foreground">
    <td className="px-4 py-3 font-bold text-primary">{l.source}</td>
    <td className="px-4 py-3">{l.target}</td>
    <td className="px-4 py-3">{l.anchor}</td>
    <td className="px-4 py-3">{l.clicks.toLocaleString("fa-IR")}</td>
  </tr>
));

export default function InternalLinksPage() {
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
        <DataTable title="" columns={copy.columns} rows={internalLinkRows} />
        {internalLinks.length === 0 && (
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
                <path d="M9 22h6c4.714 0 7.5-4.286 7.5-7.5V5c0-4.714-2.786-7.5-7.5-7.5H9c-4.714 0-7.5 4.286-7.5 7.5v9.5c0 4.714 2.786 7.5 7.5 7.5Z" />
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
