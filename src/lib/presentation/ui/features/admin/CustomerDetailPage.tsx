import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { CustomerDetailCard } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { customerOrders, formatToman } from "./adminData";
import type { Customer, CustomerOrderSummary } from "./adminData";

export interface CustomerDetailPageProps {
  customer: Customer;
}

export default function CustomerDetailPage({
  customer,
}: CustomerDetailPageProps) {
  const copy = adminCopy.customerDetail;
  const orders = customerOrders[customer.id] ?? [];

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="مشتریان"
    >
      <PageHeader
        title={customer.name}
        backHref="/admin/customers"
        backLabel={copy.back}
      />
      <CustomerDetailCard customer={customer} />
      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <p className="mb-2 text-[10px] font-bold text-primary">{copy.orders}</p>
        <DataTable
          title="تاریخچه سفارشات"
          columns={copy.orderColumns}
          rows={orders.map((o: CustomerOrderSummary) => (
            <tr key={o.id} className="border-t border-border text-foreground">
              <td className="px-4 py-3 font-bold text-primary">{o.id}</td>
              <td className="px-4 py-3">{o.date}</td>
              <td className="px-4 py-3">{formatToman(o.total)} تومان</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex h-5 items-center rounded-full px-2 text-[9px] font-semibold ${
                    o.status === "completed"
                      ? "bg-primary-soft text-primary"
                      : o.status === "shipped"
                        ? "bg-primary-soft text-primary"
                        : o.status === "processing"
                          ? "bg-muted text-muted-foreground"
                          : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {o.status === "completed"
                    ? "تکمیل شده"
                    : o.status === "shipped"
                      ? "ارسال شده"
                      : o.status === "processing"
                        ? "در حال پردازش"
                        : "در انتظار پرداخت"}
                </span>
              </td>
            </tr>
          ))}
        />
        {orders.length === 0 && (
          <p className="mt-4 text-xs text-muted-foreground">
            {copy.emptyOrders}
          </p>
        )}
        <Link
          href="/admin/customers"
          className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {copy.back}
        </Link>
      </div>
    </AdminLayout>
  );
}
