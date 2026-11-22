import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AttributesListPage from "@/lib/presentation/ui/features/admin/AttributesListPage";
import BrandsListPage from "@/lib/presentation/ui/features/admin/BrandsListPage";
import CategoriesListPage from "@/lib/presentation/ui/features/admin/CategoriesListPage";
import DashboardPage from "@/lib/presentation/ui/features/admin/DashboardPage";
import InventoryPage from "@/lib/presentation/ui/features/admin/InventoryPage";
import OrderDetailPage from "@/lib/presentation/ui/features/admin/OrderDetailPage";
import OrdersListPage from "@/lib/presentation/ui/features/admin/OrdersListPage";
import ProductEditPage from "@/lib/presentation/ui/features/admin/ProductEditPage";
import ProductsListPage from "@/lib/presentation/ui/features/admin/ProductsListPage";
import ReportsPage from "@/lib/presentation/ui/features/admin/ReportsPage";
import ReturnDetailPage from "@/lib/presentation/ui/features/admin/ReturnDetailPage";
import ReturnsListPage from "@/lib/presentation/ui/features/admin/ReturnsListPage";
import ShippingPage from "@/lib/presentation/ui/features/admin/ShippingPage";
import TransactionsPage from "@/lib/presentation/ui/features/admin/TransactionsPage";
import {
  findOrder,
  findReturn,
  findProduct,
} from "@/lib/presentation/ui/features/admin/adminData";
import CommerceScreenLoading from "@/lib/presentation/ui/features/commerce/CommerceScreenLoading";
import CommerceScreenPage from "@/lib/presentation/ui/features/commerce/CommerceScreenPage";
import { findCommerceScreen } from "@/lib/presentation/ui/features/commerce/routeCatalog";

type RouteProps = { params: Promise<{ segments: string[] }> };

const DASHBOARD_TITLE = "داشبورد";
const REPORTS_TITLE = "گزارش‌ها";
const ORDERS_TITLE = "سفارش‌ها";
const RETURNS_TITLE = "مرجوعی‌ها";
const TRANSACTIONS_TITLE = "تراکنش‌ها";
const SHIPPING_TITLE = "ارسال و حمل‌ونقل";
const PRODUCTS_TITLE = "محصولات";
const CATEGORIES_TITLE = "دسته‌بندی‌ها";
const BRANDS_TITLE = "برندها";
const ATTRIBUTES_TITLE = "ویژگی‌ها";
const INVENTORY_TITLE = "موجودی انبار";

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { segments } = await params;
  const route = segments.join("/");

  if (route === "dashboard")
    return {
      title: DASHBOARD_TITLE,
      description: "وضعیت سفارشات و اطلاعات کلیدی فروشگاه در یک نگاه.",
    };
  if (route === "reports")
    return {
      title: REPORTS_TITLE,
      description: "گزارش‌های فروش، تراکنش و کارایی فروشگاه.",
    };
  if (route === "orders")
    return {
      title: ORDERS_TITLE,
      description: "مشاهده و مدیریت سفارش‌های مشتریان.",
    };
  if (segments[0] === "orders" && segments.length === 2) {
    const order = findOrder(segments[1]);
    if (!order) return { title: "صفحه پیدا نشد" };
    return {
      title: `جزئیات سفارش ${order.id}`,
      description: "مشاهده جزئیات کامل سفارش و رهگیری وضعیت.",
    };
  }
  if (route === "returns")
    return {
      title: RETURNS_TITLE,
      description: "مدیریت درخواست‌های بازگردانی کالا از مشتریان.",
    };
  if (segments[0] === "returns" && segments.length === 2) {
    const ret = findReturn(segments[1]);
    if (!ret) return { title: "صفحه پیدا نشد" };
    return {
      title: `جزئیات مرجوعی ${ret.id}`,
      description: "مشاهده جزئیات کامل درخواست مرجوعی و وضعیت پردازش.",
    };
  }
  if (route === "transactions")
    return {
      title: TRANSACTIONS_TITLE,
      description: "تراکنش‌های مالی و انتقال وجه مشتریان.",
    };
  if (route === "shipping")
    return {
      title: SHIPPING_TITLE,
      description: "مدیریت وضعیت ارسال سفارشات و شرکت‌های حمل‌ونقل.",
    };
  if (route === "products")
    return {
      title: PRODUCTS_TITLE,
      description: "مدیریت فهرست کالاهای فروشگاه و détails هر محصول.",
    };
  if (
    segments[0] === "products" &&
    segments[1] === "edit" &&
    segments.length === 3
  ) {
    const product = findProduct(segments[2]);
    if (!product) return { title: "صفحه پیدا نشد" };
    return {
      title: `ویرایش محصول ${product.name}`,
      description: "ویرایش مشخصات، قیمت و موجودی یک محصول.",
    };
  }
  if (route === "categories")
    return {
      title: CATEGORIES_TITLE,
      description: "مدیریت دسته‌بندی‌ها و زیردسته‌بندی‌های کالا.",
    };
  if (route === "brands")
    return {
      title: BRANDS_TITLE,
      description: "مدیریت برندهای موجود در فروشگاه.",
    };
  if (route === "attributes")
    return {
      title: ATTRIBUTES_TITLE,
      description: "تعریف ویژگی‌های فنی قابلة فیلتر برای کالاهای فروشگاه.",
    };
  if (route === "inventory")
    return {
      title: INVENTORY_TITLE,
      description: "مدیریت موجودی کالا و هشدار کمی موجودی.",
    };

  const screen = findCommerceScreen("admin", segments);
  if (!screen) return { title: "صفحه پیدا نشد" };
  return { title: screen.title, description: screen.description };
}

async function AdminRouteContent({ params }: RouteProps) {
  const { segments } = await params;
  const route = segments.join("/");

  if (route === "dashboard") return <DashboardPage />;
  if (route === "reports") return <ReportsPage />;
  if (route === "orders") return <OrdersListPage />;
  if (segments[0] === "orders" && segments.length === 2) {
    const order = findOrder(segments[1]);
    if (!order) notFound();
    return <OrderDetailPage order={order} />;
  }
  if (route === "returns") return <ReturnsListPage />;
  if (segments[0] === "returns" && segments.length === 2) {
    const ret = findReturn(segments[1]);
    if (!ret) notFound();
    return <ReturnDetailPage ret={ret} />;
  }
  if (route === "transactions") return <TransactionsPage />;
  if (route === "shipping") return <ShippingPage />;
  if (route === "products") return <ProductsListPage />;
  if (
    segments[0] === "products" &&
    segments[1] === "edit" &&
    segments.length === 3
  ) {
    const product = findProduct(segments[2]);
    if (!product) notFound();
    return <ProductEditPage product={product} />;
  }
  if (route === "categories") return <CategoriesListPage />;
  if (route === "brands") return <BrandsListPage />;
  if (route === "attributes") return <AttributesListPage />;
  if (route === "inventory") return <InventoryPage />;

  if (!findCommerceScreen("admin", segments)) notFound();
  return <CommerceScreenPage area="admin" segments={segments} />;
}

export default function AdminRoute(props: RouteProps) {
  return (
    <Suspense fallback={<CommerceScreenLoading area="admin" />}>
      <AdminRouteContent params={props.params} />
    </Suspense>
  );
}
