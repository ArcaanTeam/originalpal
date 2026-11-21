import AppPageShellUI from "@/lib/presentation/ui/layout/AppPageShell";

export default function ShellLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AppPageShellUI>{children}</AppPageShellUI>;
}
