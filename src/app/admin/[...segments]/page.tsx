import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommerceScreenLoading from "@/lib/presentation/ui/features/commerce/CommerceScreenLoading";
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

async function AdminRouteContent({ params }: RouteProps) {
  const { segments } = await params;
  if (!findCommerceScreen("admin", segments)) notFound();
  return <CommerceScreenPage area="admin" segments={segments} />;
}

export default function AdminRoute(props: RouteProps) {
  return (
    <Suspense fallback={<CommerceScreenLoading area="admin" />}>
      <AdminRouteContent params={props.params} />
    </Suspense>
  );
}
