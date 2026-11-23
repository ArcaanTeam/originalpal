import type { Metadata } from "next";
import StorefrontCatalogUI from "@/lib/presentation/ui/features/storefront/StorefrontCatalog/StorefrontCatalogUI";

export const metadata: Metadata = {
  title: "همه دسته‌بندی‌ها",
  description: "دسته‌بندی‌های فروشگاه اورجینال پل",
};

export default function CategoriesPage() {
  return <StorefrontCatalogUI mode="categories" />;
}
