import type { Metadata } from "next";
import { Suspense } from "react";
import CustomerOtpPage from "@/lib/presentation/ui/features/storefront/StorefrontAuth/CustomerOtpPage";

export const metadata: Metadata = {
  title: "تأیید شماره همراه",
  description: "تأیید کد یک‌بارمصرف ورود به فروشگاه اورجینال پل",
};

type PageProps = { searchParams: Promise<{ phone?: string }> };

async function VerifyContent({ searchParams }: PageProps) {
  const { phone } = await searchParams;
  return <CustomerOtpPage phone={phone} />;
}

export default function VerifyRoute(props: PageProps) {
  return (
    <Suspense fallback={<main className="min-h-[60svh]" />}>
      <VerifyContent searchParams={props.searchParams} />
    </Suspense>
  );
}
