import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { StatCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { orders, returns, formatToman } from "./adminData";

export default function DashboardPage() {
  const copy = adminCopy.dashboard;
  const today = "۱۴۰۵/۰۹/۰۵";
  const todayOrders = orders.filter((o) => o.date === today).length;
  const todaySales = orders
    .filter((o) => o.date === today)
    .reduce((sum, o) => sum + o.total, 0);
  const newCustomers = 36;
  const needsAttention = returns.filter((r) => r.status === "pending").length;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          label={copy.todayOrders}
          value={todayOrders.toLocaleString("fa-IR")}
        />
        <StatCard
          label={copy.todaySales}
          value={formatToman(todaySales)}
          delta="+۱۲٪ نسبت به دیروز"
        />
        <StatCard
          label={copy.newCustomers}
          value={newCustomers.toLocaleString("fa-IR")}
        />
        <StatCard
          label={copy.needsAttention}
          value={needsAttention.toLocaleString("fa-IR")}
          delta={needsAttention > 0 ? "بازبینی کنید" : "بدون پیگیری"}
        />
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 text-sm font-bold">{copy.quickActions}</h2>
          <div className="space-y-2">
            <Link
              href="/admin/products/new"
              className="block rounded-lg bg-[#f7f9f7] px-3 py-2.5 text-[11px] font-semibold text-[#526057] hover:bg-primary-soft"
            >
              {copy.addProduct}
            </Link>
            <Link
              href="/admin/orders"
              className="block rounded-lg bg-[#f7f9f7] px-3 py-2.5 text-[11px] font-semibold text-[#526057] hover:bg-primary-soft"
            >
              {copy.viewOrders}
            </Link>
            <Link
              href="/admin/settings/store"
              className="block rounded-lg bg-[#f7f9f7] px-3 py-2.5 text-[11px] font-semibold text-[#526057] hover:bg-primary-soft"
            >
              {copy.storeSettings}
            </Link>
          </div>
          <p className="mt-5 flex items-center gap-1 text-[10px] text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={13}
              height={13}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            {copy.guide}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="mb-3 text-sm font-bold">آخرین سفارشات</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr>
                  {["شناسه", "مشتری", "تاریخ", "مبلغ", "وضعیت"].map((col) => (
                    <th
                      key={col}
                      className="px-4 py-2 text-[10px] font-semibold text-muted-foreground"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="border-t border-border">
                    <td className="px-4 py-2 font-bold text-primary">
                      {order.id}
                    </td>
                    <td className="px-4 py-2">{order.customer}</td>
                    <td className="px-4 py-2">{order.date}</td>
                    <td className="px-4 py-2">
                      {formatToman(order.total)} تومان
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex h-5 items-center rounded-full px-2 text-[9px] font-semibold ${
                          order.status === "processing"
                            ? "bg-muted text-muted-foreground"
                            : order.status === "shipped" ||
                                order.status === "completed"
                              ? "bg-primary-soft text-primary"
                              : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {order.status === "processing"
                          ? "در حال پردازش"
                          : order.status === "shipped"
                            ? "ارسال شده"
                            : order.status === "completed"
                              ? "تکمیل شده"
                              : "در انتظار پرداخت"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
