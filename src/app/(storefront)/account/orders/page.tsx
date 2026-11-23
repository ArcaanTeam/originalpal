import type { Metadata } from "next";
import AccountOrdersPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountOrdersPage";

export const metadata: Metadata = {
  title: "سفارش‌های من",
  description: "سفارش‌ها و پیگیری ارسال اورجینال پل",
};

export default function AccountOrdersRoute() {
  return <AccountOrdersPage />;
}
