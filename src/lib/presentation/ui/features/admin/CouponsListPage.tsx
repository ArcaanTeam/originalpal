import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { CouponRow } from "./AdminParts";
import { CouponStatCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { coupons } from "./adminData";

export default function CouponsListPage() {
  const copy = adminCopy.coupons;
  const rows = coupons.map((coupon) => (
    <CouponRow key={coupon.id} coupon={coupon} />
  ));
  const activeCount = coupons.filter((c) => c.status === "active").length;
  const expiredCount = coupons.filter((c) => c.status === "expired").length;
  const draftCount = coupons.filter((c) => c.status === "draft").length;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <CouponStatCard
          label="کل کوپن‌ها"
          value={coupons.length.toLocaleString("fa-IR")}
        />
        <CouponStatCard
          label="فعال"
          value={activeCount.toLocaleString("fa-IR")}
        />
        <CouponStatCard
          label="منقضی شده"
          value={expiredCount.toLocaleString("fa-IR")}
        />
        <CouponStatCard
          label="پیش‌نویس"
          value={draftCount.toLocaleString("fa-IR")}
        />
      </div>
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable
          title="فهرست کدهای تخفیف"
          columns={copy.columns}
          rows={rows}
        />
        {coupons.length === 0 && (
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
