import type { Metadata } from "next";
import AccountReturnsPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountReturnsPage";

export const metadata: Metadata = {
  title: "مرجوعی‌ها",
  description: "درخواست و پیگیری مرجوعی اورجینال پل",
};

export default function AccountReturnsRoute() {
  return <AccountReturnsPage />;
}
