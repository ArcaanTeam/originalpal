import type { Metadata } from "next";
import AccountReviewsPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountReviewsPage";

export const metadata: Metadata = {
  title: "دیدگاه‌های من",
  description: "دیدگاه‌های ثبت‌شده اورجینال پل",
};

export default function AccountReviewsRoute() {
  return <AccountReviewsPage />;
}
