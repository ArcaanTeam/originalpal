import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommerceScreenLoading from "@/lib/presentation/ui/features/commerce/CommerceScreenLoading";
import CommerceScreenPage from "@/lib/presentation/ui/features/commerce/CommerceScreenPage";
import { findCommerceScreen } from "@/lib/presentation/ui/features/commerce/routeCatalog";

type RouteProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { segments } = await params;
  const screen = findCommerceScreen("store", segments);
  return {
    title: screen?.title ?? "فروشگاه",
    description: screen?.description,
  };
}

async function StoreRouteContent({ params, searchParams }: RouteProps) {
  const [{ segments }, { q }] = await Promise.all([params, searchParams]);
  if (!findCommerceScreen("store", segments)) notFound();
  return <CommerceScreenPage area="store" segments={segments} query={q} />;
}

export default function StoreRoute(props: RouteProps) {
  return (
    <Suspense fallback={<CommerceScreenLoading area="store" />}>
      <StoreRouteContent
        params={props.params}
        searchParams={props.searchParams}
      />
    </Suspense>
  );
}
