import type { Metadata } from "next";
import AccountProfilePage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountProfilePage";

export const metadata: Metadata = {
  title: "اطلاعات حساب",
  description: "اطلاعات حساب کاربری فروشگاه اورجینال پل",
};

export default function AccountProfileRoute() {
  return <AccountProfilePage />;
}
