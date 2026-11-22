import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommerceScreenLoading from "@/lib/presentation/ui/features/commerce/CommerceScreenLoading";
import CommerceScreenPage from "@/lib/presentation/ui/features/commerce/CommerceScreenPage";
import { findCommerceScreen } from "@/lib/presentation/ui/features/commerce/routeCatalog";
import StorefrontBrowsePage from "@/lib/presentation/ui/features/storefront/StorefrontBrowse/StorefrontBrowsePage";

type RouteProps = {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { segments } = await params;
  const screen = findCommerceScreen("store", segments);
  if (!screen) return { title: "صفحه پیدا نشد" };
  return { title: screen.title, description: screen.description };
}

async function StorefrontRouteContent({ params, searchParams }: RouteProps) {
  const [{ segments }, { q }] = await Promise.all([params, searchParams]);
  if (!findCommerceScreen("store", segments)) notFound();
  if (
    segments[0] === "category" ||
    segments[0] === "search" ||
    segments[0] === "compare"
  ) {
    return <StorefrontBrowsePage segments={segments} query={q} />;
  }
  return (
    <CommerceScreenPage
      area="store"
      segments={segments}
      query={q}
      showStoreNavigation={false}
    />
  );
}

export default function StorefrontRoute(props: RouteProps) {
  return (
    <Suspense fallback={<CommerceScreenLoading area="store" />}>
      <StorefrontRouteContent
        params={props.params}
        searchParams={props.searchParams}
      />
    </Suspense>
  );
}
