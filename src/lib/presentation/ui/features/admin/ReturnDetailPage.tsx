import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { StatusBadge } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { formatToman } from "./adminData";
import type { ReturnItem } from "./adminData";

export interface ReturnDetailPageProps {
  ret: ReturnItem;
}

export default function ReturnDetailPage({ ret }: ReturnDetailPageProps) {
  const copy = adminCopy.returnDetail;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="جزئیات مرجوعی"
    >
      <PageHeader
        title={ret.id}
        backHref="/admin/returns"
        backLabel={copy.back}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-4 md:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] text-muted-foreground">شماره مرجوعی</p>
              <p className="text-sm font-bold text-foreground">{ret.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">سفارش مرتبط</p>
              <p className="text-sm font-bold text-foreground">{ret.orderId}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">مشتری</p>
              <p className="text-sm font-bold text-foreground">
                {ret.customer}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">تاریخ درخواست</p>
              <p className="text-sm font-bold text-foreground">{ret.date}</p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">مبلغ بازگشت</p>
              <p className="text-sm font-black text-foreground">
                {formatToman(ret.amount)} تومان
              </p>
            </div>
            <div>
              <p className="text-[10px] text-muted-foreground">وضعیت</p>
              <p className="mt-1">
                <StatusBadge status={ret.status} />
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-4">
          <p className="mb-2 text-[10px] font-bold text-primary">دلیل مرجوعی</p>
          <p className="text-sm text-foreground italic">
            مشتری درخواست بازگردانی کالا را ثبت نموده است.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
