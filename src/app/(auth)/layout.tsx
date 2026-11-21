import AppPageShellUI from "@/lib/presentation/ui/layout/AppPageShell";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppPageShellUI variant="bare">{children}</AppPageShellUI>;
}
