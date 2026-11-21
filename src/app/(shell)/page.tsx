import { Suspense } from "react";
import HomeDashboardPage from "@/lib/presentation/ui/features/home/HomeDashboard/HomeDashboardPage";
import HomeDashboardLoadingUI from "@/lib/presentation/ui/features/home/HomeDashboard/loading";

export default function HomePage() {
  return (
    <Suspense fallback={<HomeDashboardLoadingUI />}>
      <HomeDashboardPage />
    </Suspense>
  );
}
