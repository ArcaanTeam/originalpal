import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { CategoryRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { categories } from "./adminData";

export default function CategoriesListPage() {
  const copy = adminCopy.categories;
  const rows = categories.map((category) => (
    <CategoryRow key={category.id} category={category} />
  ));

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
        <DataTable
          title="فهرست دسته‌بندی‌ها"
          columns={copy.columns}
          rows={rows}
        />
        {categories.length === 0 && (
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
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2z" />
              </svg>
            </span>
            <p className="text-sm font-bold">{copy.empty}</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
