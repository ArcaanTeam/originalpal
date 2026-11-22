import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { BrandRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { brands } from "./adminData";

export default function BrandsListPage() {
  const copy = adminCopy.brands;
  const rows = brands.map((brand) => <BrandRow key={brand.id} brand={brand} />);

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active=""
    >
      <div className="rounded-2xl border border-border bg-card p-5">
        <DataTable title="فهرست برندها" columns={copy.columns} rows={rows} />
        {brands.length === 0 && (
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
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
