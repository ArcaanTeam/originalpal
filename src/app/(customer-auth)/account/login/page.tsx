import type { Metadata } from "next";
import CustomerLoginPage from "@/lib/presentation/ui/features/storefront/StorefrontAuth/CustomerLoginPage";

export const metadata: Metadata = {
  title: "ورود و ثبت‌نام",
  description: "ورود یا ثبت‌نام با شماره موبایل در فروشگاه اورجینال پل",
};

export default function CustomerLoginRoute() {
  return <CustomerLoginPage />;
}
