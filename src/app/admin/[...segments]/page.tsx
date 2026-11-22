import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import AttributesListPage from "@/lib/presentation/ui/features/admin/AttributesListPage";
import BannerEditPage from "@/lib/presentation/ui/features/admin/BannerEditPage";
import BannersListPage from "@/lib/presentation/ui/features/admin/BannersListPage";
import BrandsListPage from "@/lib/presentation/ui/features/admin/BrandsListPage";
import BrokenLinkDetailPage from "@/lib/presentation/ui/features/admin/BrokenLinkDetailPage";
import BrokenLinksPage from "@/lib/presentation/ui/features/admin/BrokenLinksPage";
import CategoriesListPage from "@/lib/presentation/ui/features/admin/CategoriesListPage";
import CouponEditPage from "@/lib/presentation/ui/features/admin/CouponEditPage";
import CouponsListPage from "@/lib/presentation/ui/features/admin/CouponsListPage";
import CustomerDetailPage from "@/lib/presentation/ui/features/admin/CustomerDetailPage";
import CustomersListPage from "@/lib/presentation/ui/features/admin/CustomersListPage";
import DashboardPage from "@/lib/presentation/ui/features/admin/DashboardPage";
import IntegrationsPage from "@/lib/presentation/ui/features/admin/IntegrationsPage";
import InternalLinksPage from "@/lib/presentation/ui/features/admin/InternalLinksPage";
import InventoryPage from "@/lib/presentation/ui/features/admin/InventoryPage";
import OrderDetailPage from "@/lib/presentation/ui/features/admin/OrderDetailPage";
import OrdersListPage from "@/lib/presentation/ui/features/admin/OrdersListPage";
import ProductEditPage from "@/lib/presentation/ui/features/admin/ProductEditPage";
import ProductsListPage from "@/lib/presentation/ui/features/admin/ProductsListPage";
import RedirectDetailPage from "@/lib/presentation/ui/features/admin/RedirectDetailPage";
import RedirectsPage from "@/lib/presentation/ui/features/admin/RedirectsPage";
import ReportsPage from "@/lib/presentation/ui/features/admin/ReportsPage";
import ReturnDetailPage from "@/lib/presentation/ui/features/admin/ReturnDetailPage";
import ReturnsListPage from "@/lib/presentation/ui/features/admin/ReturnsListPage";
import ReviewsListPage from "@/lib/presentation/ui/features/admin/ReviewsListPage";
import SchemaPage from "@/lib/presentation/ui/features/admin/SchemaPage";
import SeoBulkPage from "@/lib/presentation/ui/features/admin/SeoBulkPage";
import SeoOverviewPage from "@/lib/presentation/ui/features/admin/SeoOverviewPage";
import SeoSettingsPage from "@/lib/presentation/ui/features/admin/SeoSettingsPage";
import ShippingPage from "@/lib/presentation/ui/features/admin/ShippingPage";
import SitemapRobotsPage from "@/lib/presentation/ui/features/admin/SitemapRobotsPage";
import TicketDetailPage from "@/lib/presentation/ui/features/admin/TicketDetailPage";
import TicketsListPage from "@/lib/presentation/ui/features/admin/TicketsListPage";
import TransactionsPage from "@/lib/presentation/ui/features/admin/TransactionsPage";
import {
  findBanner,
  findBrokenLink,
  findCustomer,
  findCoupon,
  findOrder,
  findProduct,
  findRedirect,
  findReturn,
  findReview,
  findTicket,
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
const CUSTOMERS_TITLE = "مشتریان";
const REVIEWS_TITLE = "نظرات و پرسش‌ها";
const TICKETS_TITLE = "درخواست‌های پشتیبانی";
const COUPONS_TITLE = "کدهای تخفیف";
const BANNERS_TITLE = "بنرها";
const SEO_TITLE = "سئو";
const SEO_SETTINGS_TITLE = "تنظیمات عمومی سئو";
const SEO_BULK_TITLE = "ویرایش گروهی سئو";
const SEO_REDIRECTS_TITLE = "ریدیركت‌ها و ۴۰۴";
const SEO_SITEMAP_TITLE = "سایت‌مپ و Robots.txt";
const SEO_SCHEMA_TITLE = "اسکیما (Schema)";
const SEO_BROKEN_LINKS_TITLE = "لینک‌های شکسته";
const SEO_INTERNAL_LINKS_TITLE = "لینک‌سازی داخلی";
const SEO_INTEGRATIONS_TITLE = "اتصال‌ها و کدها";

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
  if (route === "customers")
    return {
      title: CUSTOMERS_TITLE,
      description: "مدیریت حساب‌های کاربری مشتریان و بررسی چت‌لوگ‌ها.",
    };
  if (segments[0] === "customers" && segments.length === 2) {
    const customer = findCustomer(segments[1]);
    if (!customer) return { title: "صفحه پیدا نشد" };
    return {
      title: `پروفایل مشتری ${customer.name}`,
      description: "مشاهده جزئیات حساب مشتری، تاریخچه سفارشات و اطلاعات.",
    };
  }
  if (route === "reviews")
    return {
      title: REVIEWS_TITLE,
      description: "بررسی و تایید نظرات و پرسش‌های مشتریان در مورد محصولات.",
    };
  if (segments[0] === "reviews" && segments.length === 2) {
    const review = findReview(segments[1]);
    if (!review) return { title: "صفحه پیدا نشد" };
    return {
      title: `جزئیات نظر ${review.id}`,
      description: "مشاهده جزئیات کامل نظر یا پرسش مشتری.",
    };
  }
  if (
    segments[0] === "support" &&
    segments[1] === "tickets" &&
    segments.length === 2
  )
    return {
      title: TICKETS_TITLE,
      description: "مدیریت تیکت‌های پشتیبانی مشتریان و پیگیری وضعیت پاسخ‌دهی.",
    };
  if (
    segments[0] === "support" &&
    segments[1] === "tickets" &&
    segments.length === 3
  ) {
    const ticket = findTicket(segments[2]);
    if (!ticket) return { title: "صفحه پیدا نشد" };
    return {
      title: `جزئیات تیکت ${ticket.id}`,
      description: "مشاهده محتوای تیکت پشتیبانی و تاریخچه ارتباطات با مشتری.",
    };
  }
  if (route === "coupons")
    return {
      title: COUPONS_TITLE,
      description: "ایجاد و مدیریت کدهای تخفیف و کوپن‌های خرید برای مشتریان.",
    };
  if (
    segments[0] === "coupons" &&
    segments[1] === "edit" &&
    segments.length === 3
  ) {
    const coupon = findCoupon(segments[2]);
    if (!coupon) return { title: "صفحه پیدا نشد" };
    return {
      title: `ویرایش کد تخفیف ${coupon.code}`,
      description: "ویرایش جزئیات کد تخفیف، مقدار و تاریخ انقضا.",
    };
  }
  if (route === "banners")
    return {
      title: BANNERS_TITLE,
      description: "مدیریت بنرهای تبلیغاتی صفحه اصلی و صفحات داخلی.",
    };
  if (
    segments[0] === "banners" &&
    segments[1] === "edit" &&
    segments.length === 3
  ) {
    const banner = findBanner(segments[2]);
    if (!banner) return { title: "صفحه پیدا نشد" };
    return {
      title: `ویرایش بنر ${banner.title}`,
      description: "ویرایش متن، تصویر، لینک و تاریخ نمایش بنر.",
    };
  }
  if (route === "seo")
    return {
      title: SEO_TITLE,
      description:
        "وضعیت سئو، Core Web Vitals و مشکلات شناسایی شده در یک نگاه.",
    };
  if (route === "seo/settings")
    return {
      title: SEO_SETTINGS_TITLE,
      description: "قالب عنوان و توضیحات، آدرس اصلی، ربات‌ها و سرعت سایت.",
    };
  if (route === "seo/bulk")
    return {
      title: SEO_BULK_TITLE,
      description:
        "تغییرات گروهی در عنوان، توضیحات و robots برای صفحات انتخاب‌شده.",
    };
  if (route === "seo/redirects")
    return {
      title: SEO_REDIRECTS_TITLE,
      description: "مدیریت ریدایرکت‌ها و نظارت بر خطاهای ۴۰۴ اخیر.",
    };
  if (
    segments[0] === "seo" &&
    segments[1] === "redirects" &&
    segments.length === 3
  ) {
    const redirect = findRedirect(segments[2]);
    if (!redirect) return { title: "صفحه پیدا نشد" };
    return {
      title: `ریدیركت ${redirect.source}`,
      description: "مشاهده و ویرایش جزئیات ریدایرکت.",
    };
  }
  if (route === "seo/sitemap")
    return {
      title: SEO_SITEMAP_TITLE,
      description: "وضعیت نقشه سایت XML و ویرایشگر فایل Robots.txt.",
    };
  if (route === "seo/schema")
    return {
      title: SEO_SCHEMA_TITLE,
      description: "مدیریت داده‌های ساختاریافته و اسکیما صفحات.",
    };
  if (route === "seo/broken-links")
    return {
      title: SEO_BROKEN_LINKS_TITLE,
      description: "اسکن و مدیریت لینک‌های شکسته داخلی و خارجی.",
    };
  if (
    segments[0] === "seo" &&
    segments[1] === "broken-links" &&
    segments.length === 3
  ) {
    const brokenLink = findBrokenLink(segments[2]);
    if (!brokenLink) return { title: "صفحه پیدا نشد" };
    return {
      title: `لینک شکسته ${brokenLink.url}`,
      description: "مشاهده جزئیات لینک شکسته و ساخت ریدایرکت.",
    };
  }
  if (route === "seo/internal-links")
    return {
      title: SEO_INTERNAL_LINKS_TITLE,
      description: "مدیریت لینک‌های داخلی بین صفحات و محتوای سایت.",
    };
  if (route === "seo/integrations")
    return {
      title: SEO_INTEGRATIONS_TITLE,
      description: "اتصال به ابزارهای شخص ثالث و کدهای پیگیری.",
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
  if (route === "customers") return <CustomersListPage />;
  if (segments[0] === "customers" && segments.length === 2) {
    const customer = findCustomer(segments[1]);
    if (!customer) notFound();
    return <CustomerDetailPage customer={customer} />;
  }
  if (route === "reviews") return <ReviewsListPage />;
  if (segments[0] === "reviews" && segments.length === 2) {
    const review = findReview(segments[1]);
    if (!review) notFound();
    return <ReviewsListPage />;
  }
  if (
    segments[0] === "support" &&
    segments[1] === "tickets" &&
    segments.length === 2
  )
    return <TicketsListPage />;
  if (
    segments[0] === "support" &&
    segments[1] === "tickets" &&
    segments.length === 3
  ) {
    const ticket = findTicket(segments[2]);
    if (!ticket) notFound();
    return <TicketDetailPage ticket={ticket} />;
  }
  if (route === "coupons") return <CouponsListPage />;
  if (
    segments[0] === "coupons" &&
    segments[1] === "edit" &&
    segments.length === 3
  ) {
    const coupon = findCoupon(segments[2]);
    if (!coupon) notFound();
    return <CouponEditPage coupon={coupon} />;
  }
  if (route === "banners") return <BannersListPage />;
  if (
    segments[0] === "banners" &&
    segments[1] === "edit" &&
    segments.length === 3
  ) {
    const banner = findBanner(segments[2]);
    if (!banner) notFound();
    return <BannerEditPage banner={banner} />;
  }
  if (route === "seo") return <SeoOverviewPage />;
  if (route === "seo/settings") return <SeoSettingsPage />;
  if (route === "seo/bulk") return <SeoBulkPage />;
  if (route === "seo/redirects") return <RedirectsPage />;
  if (
    segments[0] === "seo" &&
    segments[1] === "redirects" &&
    segments.length === 3
  ) {
    const redirect = findRedirect(segments[2]);
    if (!redirect) notFound();
    return <RedirectDetailPage redirect={redirect} />;
  }
  if (route === "seo/sitemap") return <SitemapRobotsPage />;
  if (route === "seo/schema") return <SchemaPage />;
  if (route === "seo/broken-links") return <BrokenLinksPage />;
  if (
    segments[0] === "seo" &&
    segments[1] === "broken-links" &&
    segments.length === 3
  ) {
    const brokenLink = findBrokenLink(segments[2]);
    if (!brokenLink) notFound();
    return <BrokenLinkDetailPage brokenLink={brokenLink} />;
  }
  if (route === "seo/internal-links") return <InternalLinksPage />;
  if (route === "seo/integrations") return <IntegrationsPage />;

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
