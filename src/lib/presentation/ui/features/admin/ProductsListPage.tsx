import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { ProductRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { products } from "./adminData";

export default function ProductsListPage() {
  const copy = adminCopy.products;
  const rows = products.map((product) => (
    <ProductRow key={product.id} product={product} />
  ));

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="rounded-2xl border border-[#e9ece8] bg-white p-5">
        <DataTable title="فهرست محصولات" columns={copy.columns} rows={rows} />
        {products.length === 0 && (
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
