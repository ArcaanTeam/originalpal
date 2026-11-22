import { Suspense } from "react";
import CommerceScreenLoading from "@/lib/presentation/ui/features/commerce/CommerceScreenLoading";
import CommerceScreenPage from "@/lib/presentation/ui/features/commerce/CommerceScreenPage";

export default function HomePage() {
  return (
    <Suspense fallback={<CommerceScreenLoading area="store" />}>
      <CommerceScreenPage area="store" segments={[]} />
    </Suspense>
  );
}
