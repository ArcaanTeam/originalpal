import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { CustomerDetailCard } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import {
  customerOrders,
  formatToman,
} from "./adminData";
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
      <div className="mt-6 rounded-xl border border-[#e9ece8] bg-white p-5">
        <p className="mb-2 text-[10px] font-bold text-[#087e68]">
          {copy.orders}
        </p>
        <DataTable
          title="تاریخچه سفارشات"
          columns={copy.orderColumns}
          rows={orders.map((o: CustomerOrderSummary) => (
            <tr key={o.id} className="border-t border-[#f0f1ee] text-[#44514a]">
              <td className="px-4 py-3 font-bold text-[#087e68]">{o.id}</td>
              <td className="px-4 py-3">{o.date}</td>
              <td className="px-4 py-3">{formatToman(o.total)} تومان</td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex h-5 items-center rounded-full px-2 text-[9px] font-semibold ${
                    o.status === "completed"
                      ? "bg-[#eaf4ef] text-[#087e68]"
                      : o.status === "shipped"
                        ? "bg-[#eaf4ef] text-[#087e68]"
                        : o.status === "processing"
                          ? "bg-[#f5f7f5] text-[#59655f]"
                          : "bg-[#fdecea] text-[#b00020]"
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
          <p className="mt-4 text-xs text-[#89938c]">{copy.emptyOrders}</p>
        )}
        <Link
          href="/admin/customers"
          className="mt-6 inline-flex items-center gap-1 text-xs font-medium text-[#087e68] hover:underline"
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
