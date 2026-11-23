import type { Metadata } from "next";
import AccountWishlistPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountWishlistPage";

export const metadata: Metadata = {
  title: "علاقه‌مندی‌ها",
  description: "لیست علاقه‌مندی‌های اورجینال پل",
};

export default function AccountWishlistRoute() {
  return <AccountWishlistPage />;
}
