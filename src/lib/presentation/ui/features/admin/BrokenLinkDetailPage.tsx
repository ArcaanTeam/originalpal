import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import type { BrokenLink } from "./adminData";

const copy = adminCopy.seo.brokenLinks;

const typeLabels: Record<string, string> = {
  internal: copy.internal,
  external: copy.external,
};

export interface BrokenLinkDetailPageProps {
  brokenLink: BrokenLink;
}

export default function BrokenLinkDetailPage({
  brokenLink,
}: BrokenLinkDetailPageProps) {
  return (
    <AdminLayout
      title={brokenLink.url}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <PageHeader
        title={brokenLink.url}
        backHref="/admin/seo/broken-links"
        backLabel={adminCopy.seo.overview.view}
      />
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[10px] text-muted-foreground">نشانی شکسته</p>
            <p className="text-sm font-bold text-foreground">
              {brokenLink.url}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">کد وضعیت</p>
            <p className="text-sm font-bold text-foreground">
              {brokenLink.statusCode}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">نوع</p>
            <p className="text-sm font-bold text-foreground">
              {typeLabels[brokenLink.type]}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">یافت‌شده در</p>
            <p className="text-sm font-bold text-foreground">
              {brokenLink.foundIn}
            </p>
          </div>
        </div>
        <div className="mt-5 flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
            {copy.action}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
