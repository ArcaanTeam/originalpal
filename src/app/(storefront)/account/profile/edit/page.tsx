import type { Metadata } from "next";
import AccountProfilePage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountProfilePage";

export const metadata: Metadata = {
  title: "ویرایش اطلاعات حساب",
  description: "ویرایش اطلاعات حساب کاربری اورجینال پل",
};

export default function AccountProfileEditRoute() {
  return <AccountProfilePage />;
}
