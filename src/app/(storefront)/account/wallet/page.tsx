import type { Metadata } from "next";
import AccountWalletPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountWalletPage";

export const metadata: Metadata = {
  title: "کیف پول",
  description: "کیف پول و تراکنش‌های اورجینال پل",
};

export default function AccountWalletRoute() {
  return <AccountWalletPage />;
}
