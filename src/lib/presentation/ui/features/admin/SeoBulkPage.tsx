import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";

const copy = adminCopy.seo.bulk;

const columns = [
  "انتخاب",
  "صفحه",
  "عنوان متا",
  "توضیحات متا",
  "Robots",
  "وضعیت",
];
const rows = [
  {
    id: "B-1",
    page: "/product/samsung-galaxy-s26-ultra",
    title: "مراجعة گوشی پرچم‌دار — اورجینال‌پل",
    desc: "خرید سمرگسیناس با گارانتی اصالت از اورجینال‌پل",
    robots: "Index, Follow",
    status: "منتشر شده",
  },
  {
    id: "B-2",
    page: "/blog/flagship-phone-buying-guide",
    title: "راهنمای خرید گوشی پرچم‌دار",
    desc: "چه نکاتی را بررسی کنیم؟",
    robots: "Index, Follow",
    status: "منتشر شده",
  },
].map((r) => (
  <tr key={r.id} className="border-t border-border text-foreground">
    <td className="px-4 py-3">
      <input type="checkbox" className="rounded border-border text-primary" />
    </td>
    <td className="px-4 py-3 font-bold text-primary">{r.page}</td>
    <td className="px-4 py-3">{r.title}</td>
    <td className="px-4 py-3">{r.desc}</td>
    <td className="px-4 py-3">{r.robots}</td>
    <td className="px-4 py-3">
      <span className="inline-flex h-6 items-center rounded-full bg-[#e3f1f0] px-2.5 text-[10px] font-semibold text-[#0b6e6e]">
        فعال
      </span>
    </td>
  </tr>
));

export default function SeoBulkPage() {
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
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          {2} {copy.selectedPlural}
        </span>
        <div className="flex gap-2">
          <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
            حذف انتخاب‌شده‌ها
          </button>
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
            {adminCopy.seo.redirects.add}
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable title="" columns={columns} rows={rows} />
        {rows.length === 0 && (
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
