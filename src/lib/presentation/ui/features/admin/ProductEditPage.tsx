import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { ProductDetailCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import type { Product } from "./adminData";

export interface ProductEditPageProps {
  product: Product;
}

export default function ProductEditPage({ product }: ProductEditPageProps) {
  const copy = adminCopy.productEdit;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="محصولات"
    >
      <PageHeader
        title={product.name}
        backHref="/admin/products"
        backLabel={copy.back}
      />
      <div className="grid gap-6 md:grid-cols-4">
        <ProductDetailCard product={product} />
        <div className="rounded-xl border border-[#e9ece8] bg-white p-4 md:col-span-1">
          <p className="mb-2 text-[10px] font-bold text-[#087e68]">عملیات</p>
          <Link
            href="/admin/products"
            className="block w-full rounded-lg border border-[#e6e9e5] px-4 py-2.5 text-xs font-semibold text-[#526057] hover:bg-[#f5f7f5]"
          >
            {copy.back}
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
