import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { CouponEditCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import type { Coupon } from "./adminData";

export interface CouponEditPageProps {
  coupon: Coupon;
}

export default function CouponEditPage({ coupon }: CouponEditPageProps) {
  const copy = adminCopy.couponEdit;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="کدهای تخفیف"
    >
      <PageHeader
        title={coupon.code}
        backHref="/admin/coupons"
        backLabel={copy.back}
      />
      <div className="grid gap-6 md:grid-cols-4">
        <CouponEditCard coupon={coupon} />
        <div className="rounded-xl border border-[#e9ece8] bg-white p-4 md:col-span-1">
          <p className="mb-2 text-[10px] font-bold text-[#087e68]">عملیات</p>
          <Link
            href="/admin/coupons"
            className="block w-full rounded-lg border border-[#e6e9e5] px-4 py-2.5 text-xs font-semibold text-[#526057] hover:bg-[#f5f7f5]"
          >
            {copy.back}
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
