import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CommerceScreenPage from "@/lib/presentation/ui/features/commerce/CommerceScreenPage";
import { findCommerceScreen } from "@/lib/presentation/ui/features/commerce/routeCatalog";

type RouteProps = { params: Promise<{ segments: string[] }> };

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { segments } = await params;
  const screen = findCommerceScreen("admin", segments);
  return {
    title: screen?.title ?? "مدیریت فروشگاه",
    description: screen?.description,
  };
}

export default async function AdminRoute({ params }: RouteProps) {
  const { segments } = await params;
  if (!findCommerceScreen("admin", segments)) notFound();
  return <CommerceScreenPage area="admin" segments={segments} />;
}
