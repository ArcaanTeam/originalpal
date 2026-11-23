import CustomerAuthLayoutUI from "@/lib/presentation/ui/features/storefront/StorefrontAuth/CustomerAuthLayoutUI";

export default function CustomerAuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <CustomerAuthLayoutUI>{children}</CustomerAuthLayoutUI>;
}
