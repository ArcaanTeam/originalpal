import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CommerceScreenLoading from "@/lib/presentation/ui/features/commerce/CommerceScreenLoading";
import CommerceScreenPage from "@/lib/presentation/ui/features/commerce/CommerceScreenPage";
import { findCommerceScreen } from "@/lib/presentation/ui/features/commerce/routeCatalog";
import StorefrontBrowsePage from "@/lib/presentation/ui/features/storefront/StorefrontBrowse/StorefrontBrowsePage";
import StorefrontCartPage from "@/lib/presentation/ui/features/storefront/StorefrontCart/StorefrontCartPage";
import StorefrontCheckoutPage from "@/lib/presentation/ui/features/storefront/StorefrontCheckout/StorefrontCheckoutPage";
import StorefrontPaymentResultPage from "@/lib/presentation/ui/features/storefront/StorefrontPaymentResult/StorefrontPaymentResultPage";
import StorefrontProductPage from "@/lib/presentation/ui/features/storefront/StorefrontProduct/StorefrontProductPage";
import StorefrontReviewPage from "@/lib/presentation/ui/features/storefront/StorefrontReview/StorefrontReviewPage";

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
  const route = segments.join("/");
  if (route === "cart") return <StorefrontCartPage />;
  if (route === "cart/empty") return <StorefrontCartPage mode="empty" />;
  if (route === "checkout/shipping") {
    return <StorefrontCheckoutPage mode="shipping" />;
  }
  if (route === "checkout/payment") {
    return <StorefrontCheckoutPage mode="payment" />;
  }
  if (route === "checkout/success") {
    return <StorefrontPaymentResultPage mode="success" />;
  }
  if (route === "checkout/failed") {
    return <StorefrontPaymentResultPage mode="failed" />;
  }
  if (segments[0] === "product" && segments.length === 2) {
    return <StorefrontProductPage />;
  }
  if (segments.join("/") === "reviews/write") return <StorefrontReviewPage />;
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
