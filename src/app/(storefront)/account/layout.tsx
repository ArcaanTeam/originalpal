import { Suspense } from "react";
import AccountLayoutUI from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountLayoutUI";

export default function AccountLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<div className="min-h-[60svh]" />}>
      <AccountLayoutUI>{children}</AccountLayoutUI>
    </Suspense>
  );
}
