import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { ReviewRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { reviews } from "./adminData";

export default function ReviewsListPage() {
  const copy = adminCopy.reviews;
  const rows = reviews.map((review) => (
    <ReviewRow key={review.id} review={review} />
  ));

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active=""
    >
      <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
        <DataTable
          title="فهرست نظرات و پرسش‌ها"
          columns={copy.columns}
          rows={rows}
        />
        {reviews.length === 0 && (
          <div className="mt-6 rounded-2xl border border-dashed border-[#dce5de] bg-white px-5 py-16 text-center">
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#eff6f2] text-[#087e68]">
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
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12.01" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
