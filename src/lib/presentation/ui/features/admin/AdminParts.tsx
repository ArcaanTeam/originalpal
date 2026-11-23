"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Clock,
  CreditCard,
  FileText,
  Layout,
  Mail,
  Package,
  RotateCcw,
  ShoppingBag,
  Shield,
  Ticket as TicketIcon,
  Truck,
  User,
  ChevronDown,
} from "lucide-react";
import { formatToman } from "./adminData";
import type { Order } from "./adminData";
import type { ReturnItem } from "./adminData";
import type { Transaction } from "./adminData";
import type { Shipment } from "./adminData";
import type { Product } from "./adminData";
import type { Category } from "./adminData";
import type { Brand } from "./adminData";
import type { Attribute } from "./adminData";
import type { InventoryItem } from "./adminData";
import type { Customer } from "./adminData";
import type { Review } from "./adminData";
import type { Ticket } from "./adminData";
import type { TicketMessage } from "./adminData";
import type { Coupon } from "./adminData";
import type { Banner } from "./adminData";

const ADMIN_MUTED = "#5b6070";

export interface AdminLink {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: AdminLink[];
}

export const adminLinks: AdminLink[] = [
  { label: "داشبورد", href: "/admin/dashboard", icon: Layout },
  { label: "گزارش‌ها", href: "/admin/reports", icon: Clock },
  { label: "سفارش‌ها", href: "/admin/orders", icon: ShoppingBag },
  { label: "مرجوعی‌ها", href: "/admin/returns", icon: RotateCcw },
  { label: "تراکنش‌ها", href: "/admin/transactions", icon: CreditCard },
  { label: "ارسال و حمل‌ونقل", href: "/admin/shipping", icon: Truck },
  { label: "محصولات", href: "/admin/products", icon: Package },
  { label: "دسته‌بندی‌ها", href: "/admin/categories", icon: Layout },
  { label: "برندها", href: "/admin/brands", icon: ShoppingBag },
  { label: "ویژگی‌ها", href: "/admin/attributes", icon: Clock },
  { label: "موجودی انبار", href: "/admin/inventory", icon: Truck },
  { label: "مشتریان", href: "/admin/customers", icon: User },
  { label: "نظرات و پرسش‌ها", href: "/admin/reviews", icon: Clock },
  {
    label: "درخواست‌های پشتیبانی",
    href: "/admin/support/tickets",
    icon: TicketIcon,
  },
  { label: "کدهای تخفیف", href: "/admin/coupons", icon: TicketIcon },
  { label: "بنرها", href: "/admin/banners", icon: ShoppingBag },
  {
    label: "سئو",
    href: "/admin/seo",
    icon: Layout,
    children: [
      { label: "نمای کلی سئو", href: "/admin/seo", icon: Layout },
      { label: "تنظیمات عمومی سئو", href: "/admin/seo/settings", icon: Layout },
      { label: "ویرایش گروهی سئو", href: "/admin/seo/bulk", icon: Layout },
      { label: "ریدیركت‌ها و ۴۰۴", href: "/admin/seo/redirects", icon: Layout },
      {
        label: "سایت‌مپ و Robots.txt",
        href: "/admin/seo/sitemap",
        icon: Layout,
      },
      { label: "اسکیما (Schema)", href: "/admin/seo/schema", icon: Layout },
      {
        label: "لینک‌های شکسته",
        href: "/admin/seo/broken-links",
        icon: Layout,
      },
      {
        label: "لینک‌سازی داخلی",
        href: "/admin/seo/internal-links",
        icon: Layout,
      },
      {
        label: "اتصال‌ها و کدها",
        href: "/admin/seo/integrations",
        icon: Layout,
      },
    ],
  },
  {
    label: "تنظیمات",
    href: "/admin/settings/store",
    icon: Mail,
    children: [
      { label: "تنظیمات فروشگاه", href: "/admin/settings/store", icon: Layout },
      { label: "کاربران و نقش‌ها", href: "/admin/settings/users", icon: User },
      {
        label: "نقش‌ها و دسترسی‌ها",
        href: "/admin/settings/roles",
        icon: Shield,
      },
      {
        label: "قالب پیام‌ها",
        href: "/admin/settings/templates",
        icon: FileText,
      },
    ],
  },
];

export interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
  section: string;
  description?: string;
  active?: string;
}

export function AdminLayout({
  children,
  title,
  section,
  description,
  active = "",
}: AdminLayoutProps) {
  const [expandedGroups, setExpandedGroups] = useState(new Set<string>());
  return (
    <div dir="rtl" className={`min-h-screen bg-background text-foreground`}>
      <aside className="hidden w-[260px] shrink-0 border-l border-border bg-card p-4 lg:block">
        <Link
          href="/admin/dashboard"
          className="mb-7 flex items-center gap-2 px-2 py-2 font-black text-foreground"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-primary text-white">
            <ShoppingBag size={18} />
          </span>
          اورجینال‌پل{" "}
          <span className="text-[10px] font-medium text-muted-foreground">
            مدیریت
          </span>
        </Link>
        <div className="space-y-5">
          {adminLinks.map((item) => {
            if (!item.children) {
              const Icon = item.icon;
              const isActive = active === item.label;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`block rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                    isActive
                      ? "bg-primary-soft font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={14} className="mr-2" />
                  {item.label}
                </Link>
              );
            }
            const GroupIcon = item.icon;
            const isExpanded = expandedGroups.has(item.label);
            const isActive = active === item.label;
            const hasActiveChild =
              isActive || item.children.some((child) => active === child.label);
            return (
              <div key={item.label} className="overflow-hidden">
                <Link
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setExpandedGroups((prev) =>
                      prev.has(item.label)
                        ? new Set([...prev].filter((x) => x !== item.label))
                        : new Set([...prev, item.label]),
                    );
                  }}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                    isActive || hasActiveChild
                      ? "bg-primary-soft font-bold text-primary"
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <GroupIcon size={14} className="mr-2" />
                  {item.label}
                  <ChevronDown
                    size={12}
                    className={`ml-auto transition-transform ${isExpanded ? "rotate-180" : ""}`}
                  />
                </Link>
                {isExpanded && (
                  <div className="ml-3 space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const isChildActive = active === child.label;
                      return (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={`block rounded-lg px-4 py-1.5 text-[10px] font-medium transition ${
                            isChildActive
                              ? "bg-primary-soft font-bold text-primary"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          <ChildIcon size={12} className="mr-2" />
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </aside>
      <div className="mx-auto flex max-w-[1500px]">
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-bold text-primary">
                {section}
              </p>
              <h1 className="text-xl font-black sm:text-2xl">{title}</h1>
              {description && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {description}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="جست‌وجو"
                className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground sm:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
              <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-[11px] font-bold text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                افزودن مورد
              </button>
              <button
                aria-label="دریافت خروجی"
                className="grid size-9 place-items-center rounded-lg border border-border bg-card text-muted-foreground"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={15}
                  height={15}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </button>
            </div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}

export interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
}

export function StatCard({ label, value, delta }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-black text-foreground">{value}</p>
      {delta && (
        <p className="mt-1 text-[10px] font-semibold text-primary">{delta}</p>
      )}
    </div>
  );
}

interface TableProps {
  title: string;
  columns: readonly string[];
  rows: React.ReactNode[];
}

export function DataTable({ title, columns, rows }: TableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-bold">{title}</h2>
        <button className="flex h-8 items-center gap-1.5 rounded-lg border border-border px-2.5 text-[10px] font-semibold text-muted-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={13}
            height={13}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 12.46" />
            <polygon points="22 7 2 7 12 16.46 12 16.46" />
            <line x1="12" y1="16.46" x2="12" y2="21" />
          </svg>
          فیلتر
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] text-right text-xs">
          <thead className="bg-muted text-[10px] text-muted-foreground">
            <tr>
              {columns.map((item) => (
                <th key={item} className="px-4 py-3 font-semibold">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </div>
  );
}

export interface StatusBadgeProps {
  status: string;
}

const STATUS_CONFIG: Record<string, { color: string; bg: string }> = {
  processing: { color: "#5b6070", bg: "#f0eee8" },
  shipped: { color: "#0b6e6e", bg: "#e3f1f0" },
  completed: { color: "#0b6e6e", bg: "#e3f1f0" },
  pending_payment: { color: "#b42318", bg: "#fdecea" },
  pending: { color: "#5b6070", bg: "#f0eee8" },
  approved: { color: "#0b6e6e", bg: "#e3f1f0" },
  rejected: { color: "#b42318", bg: "#fdecea" },
  success: { color: "#0b6e6e", bg: "#e3f1f0" },
  failed: { color: "#b42318", bg: "#fdecea" },
  delivered: { color: "#0b6e6e", bg: "#e3f1f0" },
  returned: { color: "#b42318", bg: "#fdecea" },
  active: { color: "#0b6e6e", bg: "#e3f1f0" },
  inactive: { color: "#5b6070", bg: "#f0eee8" },
};

const STATUS_LABELS: Record<string, string> = {
  processing: "در حال پردازش",
  shipped: "ارسال شده",
  completed: "تکمیل شده",
  pending_payment: "در انتظار پرداخت",
  pending: "در انتظار بررسی",
  approved: "تأیید شده",
  rejected: "رد شده",
  success: "موفق",
  failed: "ناموفق",
  delivered: "تحویل شده",
  returned: "برگشتاده",
  active: "فعال",
  inactive: "غیرفعال",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
  };
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
    >
      {STATUS_LABELS[status] ?? status}
    </span>
  );
}

export function OrderRow({ order }: { order: Order }) {
  return (
    <tr key={order.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{order.id}</td>
      <td className="px-4 py-3">{order.customer}</td>
      <td className="px-4 py-3">{order.date}</td>
      <td className="px-4 py-3">{formatToman(order.total)} تومان</td>
      <td className="px-4 py-3">
        <StatusBadge status={order.status} />
      </td>
    </tr>
  );
}

export function ReturnRow({ item }: { item: ReturnItem }) {
  return (
    <tr key={item.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{item.id}</td>
      <td className="px-4 py-3">{item.customer}</td>
      <td className="px-4 py-3">{item.date}</td>
      <td className="px-4 py-3">{formatToman(item.amount)} تومان</td>
      <td className="px-4 py-3">
        <StatusBadge status={item.status} />
      </td>
    </tr>
  );
}

export function TransactionRow({ tx }: { tx: Transaction }) {
  const typeLabels: Record<string, string> = {
    charge: "واریز",
    refund: "بازپرداخت",
    purchase: "خرید",
  };
  return (
    <tr key={tx.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{tx.id}</td>
      <td className="px-4 py-3">{tx.customer}</td>
      <td className="px-4 py-3">{typeLabels[tx.type] ?? tx.type}</td>
      <td className="px-4 py-3">{formatToman(tx.amount)} تومان</td>
      <td className="px-4 py-3">{tx.date}</td>
      <td className="px-4 py-3">
        <StatusBadge status={tx.status} />
      </td>
    </tr>
  );
}

export function ShipmentRow({ shipment }: { shipment: Shipment }) {
  return (
    <tr key={shipment.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{shipment.id}</td>
      <td className="px-4 py-3">{shipment.carrier}</td>
      <td className="px-4 py-3">{shipment.shippedAt}</td>
      <td className="px-4 py-3">{shipment.tracking}</td>
      <td className="px-4 py-3">
        <StatusBadge status={shipment.status} />
      </td>
    </tr>
  );
}

export function OrderDetailCard({ order }: { order: Order }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] text-muted-foreground">شماره سفارش</p>
          <p className="text-sm font-bold text-foreground">{order.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">مشتری</p>
          <p className="text-sm font-bold text-foreground">{order.customer}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تاریخ</p>
          <p className="text-sm font-bold text-foreground">{order.date}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">مبلغ کل</p>
          <p className="text-sm font-black text-foreground">
            {formatToman(order.total)} تومان
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">وضعیت</p>
          <p className="mt-1">
            <StatusBadge status={order.status} />
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">روش پرداخت</p>
          <p className="text-sm font-bold text-foreground">
            {order.paymentMethod}
          </p>
        </div>
      </div>
      {order.notes && (
        <div className="mt-4">
          <p className="mb-1 text-[10px] text-muted-foreground">تغذیه‌ها</p>
          <p className="text-sm text-foreground">{order.notes}</p>
        </div>
      )}
    </div>
  );
}

export interface PageHeaderProps {
  title: string;
  backHref: string;
  backLabel: string;
}

export function PageHeader({ title, backHref, backLabel }: PageHeaderProps) {
  return (
    <div className="mb-6 flex items-center gap-2">
      <Link
        href={backHref}
        className="text-xs font-medium text-muted-foreground hover:text-primary"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
        {backLabel}
      </Link>
      <h1 className="text-xl font-black text-foreground">{title}</h1>
    </div>
  );
}

export interface CatalogRowProps {
  id: string;
  name: string;
  extra: string;
  status: string;
  statusConfig?: { color: string; bg: string };
  statusLabel?: string;
}

export function ProductRow({ product }: { product: Product }) {
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    active: { color: "#0b6e6e", bg: "#e3f1f0", label: "فعال" },
    draft: { color: "#5b6070", bg: "#f0eee8", label: "پیش‌نویس" },
    archived: { color: "#b42318", bg: "#fdecea", label: "بایسته" },
  };
  const config = statusConfig[product.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: product.status,
  };
  return (
    <tr key={product.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{product.id}</td>
      <td className="px-4 py-3">{product.name}</td>
      <td className="px-4 py-3">{product.category}</td>
      <td className="px-4 py-3">{formatToman(product.price)} تومان</td>
      <td className="px-4 py-3">{product.stock}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
    </tr>
  );
}

export function CategoryRow({ category }: { category: Category }) {
  return (
    <tr key={category.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{category.id}</td>
      <td className="px-4 py-3">{category.name}</td>
      <td className="px-4 py-3">{category.productCount}</td>
      <td className="px-4 py-3">
        <StatusBadge
          status={category.status === "active" ? "active" : "inactive"}
        />
      </td>
    </tr>
  );
}

export function BrandRow({ brand }: { brand: Brand }) {
  return (
    <tr key={brand.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{brand.id}</td>
      <td className="px-4 py-3">{brand.name}</td>
      <td className="px-4 py-3">{brand.productCount}</td>
      <td className="px-4 py-3">
        <StatusBadge
          status={brand.status === "active" ? "active" : "inactive"}
        />
      </td>
    </tr>
  );
}

export function AttributeRow({ attribute }: { attribute: Attribute }) {
  const typeLabels: Record<string, string> = {
    text: "متن",
    number: "عدد",
    select: "انتخابی",
  };
  return (
    <tr key={attribute.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{attribute.id}</td>
      <td className="px-4 py-3">{attribute.name}</td>
      <td className="px-4 py-3">
        {typeLabels[attribute.type] ?? attribute.type}
      </td>
      <td className="px-4 py-3">{attribute.filterable ? "بله" : "خیر"}</td>
    </tr>
  );
}

export function InventoryRow({ item }: { item: InventoryItem }) {
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    ok: { color: "#0b6e6e", bg: "#e3f1f0", label: "مستقر" },
    low: { color: "#5b6070", bg: "#f0eee8", label: "کم موجودی" },
    out: { color: "#b42318", bg: "#fdecea", label: "ناموجود" },
  };
  const config = statusConfig[item.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: item.status,
  };
  return (
    <tr key={item.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{item.id}</td>
      <td className="px-4 py-3">{item.product}</td>
      <td className="px-4 py-3">{item.stock}</td>
      <td className="px-4 py-3">{item.minStock}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
    </tr>
  );
}

export interface ProductDetailCardProps {
  product: Product;
}

export function ProductDetailCard({ product }: ProductDetailCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] text-muted-foreground">شناسه محصول</p>
          <p className="text-sm font-bold text-foreground">{product.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">نام محصول</p>
          <p className="text-sm font-bold text-foreground">{product.name}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">SKU</p>
          <p className="text-sm font-bold text-foreground">{product.sku}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">دسته‌بندی</p>
          <p className="text-sm font-bold text-foreground">
            {product.category}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">برند</p>
          <p className="text-sm font-bold text-foreground">{product.brand}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">قیمت</p>
          <p className="text-sm font-black text-foreground">
            {formatToman(product.price)} تومان
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">موجودی</p>
          <p className="text-sm font-bold text-foreground">{product.stock}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">وضعیت</p>
          <p className="mt-1">
            <span
              className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${product.status === "active" ? "bg-primary-soft text-primary" : product.status === "draft" ? "bg-muted text-muted-foreground" : "bg-destructive/10 text-destructive"}`}
            >
              {product.status === "active"
                ? "فعال"
                : product.status === "draft"
                  ? "پیش‌نویس"
                  : "بایسته"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function InventoryStatCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-black text-foreground">{value}</p>
      {delta && (
        <p className="mt-1 text-[10px] font-semibold text-primary">{delta}</p>
      )}
    </div>
  );
}

export function CustomerRow({ customer }: { customer: Customer }) {
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    active: { color: "#0b6e6e", bg: "#e3f1f0", label: "فعال" },
    blocked: { color: "#b42318", bg: "#fdecea", label: "مسدود" },
    inactive: { color: "#5b6070", bg: "#f0eee8", label: "غیرفعال" },
  };
  const config = statusConfig[customer.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: customer.status,
  };
  return (
    <tr key={customer.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{customer.id}</td>
      <td className="px-4 py-3">{customer.name}</td>
      <td className="px-4 py-3">{customer.phone}</td>
      <td className="px-4 py-3">{customer.totalOrders}</td>
      <td className="px-4 py-3">{formatToman(customer.totalSpent)} تومان</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
    </tr>
  );
}

export function ReviewRow({ review }: { review: Review }) {
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    pending: { color: "#5b6070", bg: "#f0eee8", label: "در انتظار بررسی" },
    approved: { color: "#0b6e6e", bg: "#e3f1f0", label: "تأیید شده" },
    rejected: { color: "#b42318", bg: "#fdecea", label: "رد شده" },
  };
  const config = statusConfig[review.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: review.status,
  };
  return (
    <tr key={review.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{review.id}</td>
      <td className="px-4 py-3">{review.product}</td>
      <td className="px-4 py-3">{review.customer}</td>
      <td className="px-4 py-3">{review.rating} اساره</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
      <td className="px-4 py-3">{review.date}</td>
    </tr>
  );
}

export function TicketRow({ ticket }: { ticket: Ticket }) {
  const priorityConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    low: { color: "#5b6070", bg: "#f0eee8", label: "کم" },
    medium: { color: "#0b6e6e", bg: "#e3f1f0", label: "متوسط" },
    high: { color: "#b42318", bg: "#fdecea", label: "زیاد" },
  };
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    open: { color: "#b42318", bg: "#fdecea", label: "باز" },
    in_progress: { color: "#5b6070", bg: "#f0eee8", label: "در حال بررسی" },
    closed: { color: "#0b6e6e", bg: "#e3f1f0", label: "بسته شده" },
  };
  const pConfig = priorityConfig[ticket.priority] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: ticket.priority,
  };
  const sConfig = statusConfig[ticket.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: ticket.status,
  };
  return (
    <tr key={ticket.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{ticket.id}</td>
      <td className="px-4 py-3">{ticket.customer}</td>
      <td className="px-4 py-3">{ticket.subject}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${pConfig.color}] bg-[${pConfig.bg}]`}
        >
          {pConfig.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${sConfig.color}] bg-[${sConfig.bg}]`}
        >
          {sConfig.label}
        </span>
      </td>
      <td className="px-4 py-3">{ticket.createdAt}</td>
    </tr>
  );
}

export function TicketMessageRow({ message }: { message: TicketMessage }) {
  return (
    <div
      className={`mb-4 rounded-lg border border-border p-4 ${
        message.sender === "customer"
          ? "bg-primary-soft text-right"
          : "bg-muted text-left"
      }`}
    >
      <p className="mb-1 text-[10px] font-semibold text-muted-foreground">
        {message.sender === "customer" ? "مشتری" : "پشتیبانی"}
      </p>
      <p className="text-sm whitespace-pre-line text-foreground">
        {message.content}
      </p>
      <p className="mt-1 text-[9px] text-muted-foreground">
        {message.createdAt}
      </p>
    </div>
  );
}

export function CustomerDetailCard({ customer }: { customer: Customer }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] text-muted-foreground">شناسه مشتری</p>
          <p className="text-sm font-bold text-foreground">{customer.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">
            نام و نام خانوادگی
          </p>
          <p className="text-sm font-bold text-foreground">{customer.name}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">شماره همراه</p>
          <p className="text-sm font-bold text-foreground">{customer.phone}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">پست الکترونیک</p>
          <p className="text-sm font-bold text-foreground">{customer.email}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تاریخ ثبت‌نام</p>
          <p className="text-sm font-bold text-foreground">
            {customer.registeredAt}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تعداد سفارشات</p>
          <p className="text-sm font-black text-foreground">
            {customer.totalOrders}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">مجموع خرید</p>
          <p className="text-sm font-black text-foreground">
            {formatToman(customer.totalSpent)} تومان
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">آخرین سفارش</p>
          <p className="text-sm font-bold text-foreground">
            {customer.lastOrder ?? "—"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">آدرس پیش‌فرض</p>
          <p className="text-sm text-foreground">{customer.address}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">وضعیت</p>
          <p className="mt-1">
            <span
              className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
                customer.status === "active"
                  ? "bg-primary-soft text-primary"
                  : customer.status === "blocked"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {customer.status === "active"
                ? "فعال"
                : customer.status === "blocked"
                  ? "مسدود"
                  : "غیرفعال"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export interface CouponRowProps {
  coupon: Coupon;
}

export function CouponRow({ coupon }: CouponRowProps) {
  const typeLabels: Record<string, string> = {
    percent: "درصدی",
    fixed: "مبلغ ثابت",
  };
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    active: { color: "#0b6e6e", bg: "#e3f1f0", label: "فعال" },
    expired: { color: "#b42318", bg: "#fdecea", label: "منقضی شده" },
    draft: { color: "#5b6070", bg: "#f0eee8", label: "پیش‌نویس" },
  };
  const config = statusConfig[coupon.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: coupon.status,
  };
  return (
    <tr key={coupon.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{coupon.id}</td>
      <td className="px-4 py-3">{coupon.code}</td>
      <td className="px-4 py-3">{typeLabels[coupon.type] ?? coupon.type}</td>
      <td className="px-4 py-3">
        {coupon.value}
        {coupon.type === "percent" ? "%" : " تومان"}
      </td>
      <td className="px-4 py-3">{coupon.expiresAt}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
    </tr>
  );
}

export interface BannerRowProps {
  banner: Banner;
}

export function BannerRow({ banner }: BannerRowProps) {
  const locationLabels: Record<string, string> = {
    home: "صفحه اصلی",
    category: "صفحه دسته‌بندی",
    product: "صفحه محصول",
  };
  const statusConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    active: { color: "#0b6e6e", bg: "#e3f1f0", label: "فعال" },
    inactive: { color: "#5b6070", bg: "#f0eee8", label: "غیرفعال" },
    scheduled: { color: "#b42318", bg: "#fdecea", label: "زمان‌بندی شده" },
  };
  const config = statusConfig[banner.status] ?? {
    color: ADMIN_MUTED,
    bg: "#f0eee8",
    label: banner.status,
  };
  return (
    <tr key={banner.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{banner.id}</td>
      <td className="px-4 py-3">{banner.title}</td>
      <td className="px-4 py-3">
        {locationLabels[banner.location] ?? banner.location}
      </td>
      <td className="px-4 py-3">{banner.startsAt}</td>
      <td className="px-4 py-3">{banner.endsAt}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
    </tr>
  );
}

export function CouponEditCard({ coupon }: { coupon: Coupon }) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] text-muted-foreground">شماره کوپن</p>
          <p className="text-sm font-bold text-foreground">{coupon.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">کد تخفیف</p>
          <p className="text-sm font-bold text-foreground">{coupon.code}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">نوع تخفیف</p>
          <p className="text-sm font-bold text-foreground">
            {coupon.type === "percent" ? "درصدی" : "مبلغ ثابت"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">مقدار تخفیف</p>
          <p className="text-sm font-black text-foreground">
            {coupon.value}
            {coupon.type === "percent" ? "%" : " تومان"}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">حداقل مبلغ سفارش</p>
          <p className="text-sm font-bold text-foreground">
            {formatToman(coupon.minOrder)} تومان
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">حداکثر استفاده</p>
          <p className="text-sm font-bold text-foreground">{coupon.maxUsage}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تاریخ انقضا</p>
          <p className="text-sm font-bold text-foreground">
            {coupon.expiresAt}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">وضعیت</p>
          <p className="mt-1">
            <span
              className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
                coupon.status === "active"
                  ? "bg-primary-soft text-primary"
                  : coupon.status === "expired"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {coupon.status === "active"
                ? "فعال"
                : coupon.status === "expired"
                  ? "منقضی شده"
                  : "پیش‌نویس"}
            </span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تعداد استفاده</p>
          <p className="text-sm font-bold text-foreground">
            {coupon.usageCount}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BannerEditCard({ banner }: { banner: Banner }) {
  const locationLabels: Record<string, string> = {
    home: "صفحه اصلی",
    category: "صفحه دسته‌بندی",
    product: "صفحه محصول",
  };
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] text-muted-foreground">شماره بنر</p>
          <p className="text-sm font-bold text-foreground">{banner.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">عنوان بنر</p>
          <p className="text-sm font-bold text-foreground">{banner.title}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">محل نمایش</p>
          <p className="text-sm font-bold text-foreground">
            {locationLabels[banner.location] ?? banner.location}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">آدرس تصویر</p>
          <p className="text-sm font-bold text-foreground">{banner.imageUrl}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">لینک مقصد</p>
          <p className="text-sm font-bold text-foreground">{banner.linkUrl}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تاریخ شروع</p>
          <p className="text-sm font-bold text-foreground">{banner.startsAt}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">تاریخ پایان</p>
          <p className="text-sm font-bold text-foreground">{banner.endsAt}</p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">وضعیت</p>
          <p className="mt-1">
            <span
              className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
                banner.status === "active"
                  ? "bg-primary-soft text-primary"
                  : banner.status === "inactive"
                    ? "bg-muted text-muted-foreground"
                    : "bg-destructive/10 text-destructive"
              }`}
            >
              {banner.status === "active"
                ? "فعال"
                : banner.status === "inactive"
                  ? "غیرفعال"
                  : "زمان‌بندی شده"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export interface CouponStatCardProps {
  label: string;
  value: string;
  delta?: string;
}

export function CouponStatCard({ label, value, delta }: CouponStatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-black text-foreground">{value}</p>
      {delta && (
        <p className="mt-1 text-[10px] font-semibold text-primary">{delta}</p>
      )}
    </div>
  );
}

export interface BannerStatCardProps {
  label: string;
  value: string;
  delta?: string;
}

export function BannerStatCard({ label, value, delta }: BannerStatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <p className="text-[9px] text-muted-foreground">{label}</p>
      <p className="mt-2 text-sm font-black text-foreground">{value}</p>
      {delta && (
        <p className="mt-1 text-[10px] font-semibold text-primary">{delta}</p>
      )}
    </div>
  );
}
