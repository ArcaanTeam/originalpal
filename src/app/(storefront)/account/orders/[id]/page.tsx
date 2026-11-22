import type { Metadata } from "next";
import AccountOrderDetailPage from "@/lib/presentation/ui/features/storefront/StorefrontAccount/AccountOrderDetailPage";
import {
  findOrder,
  formatIdentifier,
} from "@/lib/presentation/ui/features/storefront/StorefrontAccount/accountData";

type PageProps = { params: Promise<{ id: string }> };

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const order = findOrder(id);
  return {
    title: order ? `سفارش ${formatIdentifier(order.id)}` : "سفارش پیدا نشد",
    description: "جزئیات و پیگیری سفارش در فروشگاه اورجینال پل",
  };
}

async function OrderDetailContent({ params }: PageProps) {
  const { id } = await params;
  return <AccountOrderDetailPage orderId={id} />;
}

export default function AccountOrderDetailRoute(props: PageProps) {
  return <OrderDetailContent params={props.params} />;
}
