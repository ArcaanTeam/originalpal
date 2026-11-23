import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import type { Redirect } from "./adminData";

const copy = adminCopy.seo.redirects;

export interface RedirectDetailPageProps {
  redirect: Redirect;
}

export default function RedirectDetailPage({
  redirect,
}: RedirectDetailPageProps) {
  const typeLabel = redirect.type === "301" ? copy.type301 : copy.type302;
  return (
    <AdminLayout
      title={redirect.source}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <PageHeader
        title={redirect.source}
        backHref="/admin/seo/redirects"
        backLabel={adminCopy.seo.overview.view}
      />
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-[10px] text-muted-foreground">مسیر مبدأ</p>
            <p className="text-sm font-bold text-foreground">
              {redirect.source}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">مسیر مقصد</p>
            <p className="text-sm font-bold text-foreground">
              {redirect.destination}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">نوع</p>
            <p className="text-sm font-bold text-foreground">{typeLabel}</p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">بازدید</p>
            <p className="text-sm font-black text-foreground">
              {redirect.visits}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">تاریخ ایجاد</p>
            <p className="text-sm font-bold text-foreground">
              {redirect.createdAt}
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
