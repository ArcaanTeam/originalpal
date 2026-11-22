import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { OrderDetailCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { formatToman } from "./adminData";
import type { Order } from "./adminData";

export interface OrderDetailPageProps {
  order: Order;
}

export default function OrderDetailPage({ order }: OrderDetailPageProps) {
  const copy = adminCopy.orderDetail;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="جزئیات سفارش"
    >
      <PageHeader
        title={order.id}
        backHref="/admin/orders"
        backLabel={copy.back}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <OrderDetailCard order={order} />
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold text-primary">
            کالاهای سفارش داده‌شده
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead>
                <tr>
                  {copy.itemColumns.map((col) => (
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
                {order.items.map((item) => (
                  <tr key={item.product} className="border-t border-border">
                    <td className="px-4 py-2">{item.product}</td>
                    <td className="px-4 py-2">{item.qty}</td>
                    <td className="px-4 py-2">
                      {formatToman(item.unitPrice)} تومان
                    </td>
                    <td className="px-4 py-2 font-bold text-primary">
                      {formatToman(item.amount)} تومان
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-foreground/10">
                  <td
                    className="px-4 py-2 font-bold text-foreground"
                    colSpan={3}
                  >
                    مبلغ کل
                  </td>
                  <td className="px-4 py-2 font-black text-foreground">
                    {formatToman(order.total)} تومان
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold text-primary">آدرس ارسال</p>
          <p className="text-sm whitespace-pre-line text-foreground">
            {order.shippingAddress}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold text-primary">روش پرداخت</p>
          <p className="text-sm text-foreground">{order.paymentMethod}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
