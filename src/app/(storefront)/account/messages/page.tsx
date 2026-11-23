import type { Metadata } from "next";
import AccountMessagesPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountMessagesPage";

export const metadata: Metadata = {
  title: "پیام‌ها",
  description: "پیام‌ها و اعلان‌های اورجینال پل",
};

export default function AccountMessagesRoute() {
  return <AccountMessagesPage />;
}
