import type { Metadata } from "next";
import AccountAddressesPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountAddressesPage";

export const metadata: Metadata = {
  title: "آدرس‌ها",
  description: "نشانی‌های ارسال اورجینال پل",
};

export default function AccountAddressesRoute() {
  return <AccountAddressesPage />;
}
