import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { adminCopy } from "./adminCopy";

export default function ReportsPage() {
  const copy = adminCopy.reports;
  const columns = ["گزارش", "دوره", "تاریخ تولید", "وضعیت", "عملیات"];
  const rows = [
    [
      "گزارش فروش روزانه",
      "۱۴۰۵/۰۹/۰۵",
      "۱۴۰۵/۰۹/۰۵ ۰۸:۰۰",
      "تکمیل شده",
      <a key="dl1" href="#" className="text-xs font-semibold text-primary">
        دریافت
      </a>,
    ],
    [
      "گزارش تراکنش‌های مالی",
      "۱۴۰۵/۰۸/۲۵ - ۱۴۰۵/۰۸/۳۱",
      "۱۴۰۵/۰۹/۰۱ ۰۹:۳۰",
      "تکمیل شده",
      <a key="dl2" href="#" className="text-xs font-semibold text-primary">
        دریافت
      </a>,
    ],
    [
      "گزارش مرجوعی‌ها",
      "۱۴۰۵/۰۸/۰۱ - ۱۴۰۵/۰۸/۳۱",
      "۱۴۰۵/۰۹/۰۲ ۱۱:۱۵",
      "در انتظار",
      <a key="dl3" href="#" className="text-xs font-semibold text-primary">
        دریافت
      </a>,
    ],
  ].map((row) => (
    <tr key={String(row[0])} className="border-t border-border text-foreground">
      {row.map((cell, index) => (
        <td key={String(index)} className="px-4 py-3">
          {cell}
        </td>
      ))}
    </tr>
  ));

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
          <div>
            <p className="mb-1 text-[10px] text-muted-foreground">
              فیلتر گزارش‌ها
            </p>
            <div className="flex gap-2">
              <select
                defaultValue="هفتهٔ اخیر"
                className="h-9 rounded-lg border border-border bg-card px-3 text-xs font-normal outline-none focus:border-primary"
              >
                <option>هفتهٔ اخیر</option>
                <option>ماه قبل</option>
                <option>سه ماهه اخیر</option>
              </select>
              <button className="rounded-lg border border-border px-4 text-xs font-semibold">
                اعمال
              </button>
            </div>
          </div>
          <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-5 text-xs font-bold text-white">
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
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {copy.export}
          </button>
        </div>
        <DataTable title="گزارش‌های تولید شده" columns={columns} rows={rows} />
        <p className="mt-4 text-xs text-muted-foreground">{copy.empty}</p>
      </div>
    </AdminLayout>
  );
}
