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
        <div className="rounded-xl border border-[#e9ece8] bg-white p-4 md:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] text-[#818b85]">شماره مرجوعی</p>
              <p className="text-sm font-bold text-[#173a30]">{ret.id}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#818b85]">سفارش مرتبط</p>
              <p className="text-sm font-bold text-[#173a30]">{ret.orderId}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#818b85]">مشتری</p>
              <p className="text-sm font-bold text-[#173a30]">{ret.customer}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#818b85]">تاریخ درخواست</p>
              <p className="text-sm font-bold text-[#173a30]">{ret.date}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#818b85]">مبلغ بازگشت</p>
              <p className="text-sm font-black text-[#263630]">
                {formatToman(ret.amount)} تومان
              </p>
            </div>
            <div>
              <p className="text-[10px] text-[#818b85]">وضعیت</p>
              <p className="mt-1">
                <StatusBadge status={ret.status} />
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-[#e9ece8] bg-white p-4">
          <p className="mb-2 text-[10px] font-bold text-[#087e68]">
            دلیل مرجوعی
          </p>
          <p className="text-sm text-[#263630] italic">
            مشتری درخواست بازگردانی کالا را ثبت نموده است.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
