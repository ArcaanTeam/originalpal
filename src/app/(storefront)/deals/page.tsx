import type { Metadata } from "next";
import StorefrontCatalogUI from "@/lib/presentation/ui/features/storefront/StorefrontCatalog/StorefrontCatalogUI";

export const metadata: Metadata = {
  title: "پیشنهادهای شگفت‌انگیز",
  description: "تخفیف‌های محدود فروشگاه اورجینال پل",
};

export default function DealsPage() {
  return <StorefrontCatalogUI mode="deals" />;
}
