import {
  MobileBottomNav,
  StoreFooter,
  StoreHeader,
} from "@/lib/presentation/ui/features/storefront/StorefrontHome/StorefrontHomeUI";

export default function StorefrontLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <StoreHeader />
      {children}
      <StoreFooter />
      <MobileBottomNav />
    </>
  );
}
