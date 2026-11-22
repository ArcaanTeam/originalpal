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
        <div className="rounded-xl border border-border bg-card p-4 md:col-span-1">
          <p className="mb-2 text-[10px] font-bold text-primary">عملیات</p>
          <Link
            href="/admin/products"
            className="block w-full rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-[#526057] hover:bg-muted"
          >
            {copy.back}
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
