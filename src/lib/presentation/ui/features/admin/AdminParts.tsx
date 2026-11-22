"use client";

import Link from "next/link";
import {
  Clock,
  CreditCard,
  Layout,
  RotateCcw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { formatToman } from "./adminData";
import type { Order } from "./adminData";
import type { ReturnItem } from "./adminData";
import type { Transaction } from "./adminData";
import type { Shipment } from "./adminData";

const ADMIN_MUTED = "#58655f";

export const adminLinks = [
  { label: "داشبورد", href: "/admin/dashboard", icon: Layout },
  { label: "گزارش‌ها", href: "/admin/reports", icon: Clock },
  { label: "سفارش‌ها", href: "/admin/orders", icon: ShoppingBag },
  { label: "مرجوعی‌ها", href: "/admin/returns", icon: RotateCcw },
  { label: "تراکنش‌ها", href: "/admin/transactions", icon: CreditCard },
  { label: "ارسال و حمل‌ونقل", href: "/admin/shipping", icon: Truck },
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
  return (
    <div dir="rtl" className={`min-h-screen bg-[#f7f8f6] text-[#263630]`}>
      <aside className="hidden w-60 shrink-0 border-l border-[#e9ece8] bg-white p-4 lg:block">
        <Link
          href="/admin/dashboard"
          className="mb-7 flex items-center gap-2 px-2 py-2 font-black text-[#173a30]"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-[#087e68] text-white">
            <ShoppingBag size={18} />
          </span>
          اورجینال‌پل{" "}
          <span className="text-[10px] font-medium text-[#929a96]">مدیریت</span>
        </Link>
        <div className="space-y-5">
          {adminLinks.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.label;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`block rounded-lg px-2.5 py-2 text-xs font-medium transition ${
                  isActive
                    ? "bg-[#eaf4ef] font-bold text-[#087e68]"
                    : "text-[#58655f] hover:bg-[#f5f7f5]"
                }`}
              >
                <Icon size={14} className="mr-2" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="mx-auto flex max-w-[1500px]">
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-7 sm:py-8">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="mb-1 text-[10px] font-bold text-[#087e68]">
                {section}
              </p>
              <h1 className="text-xl font-black sm:text-2xl">{title}</h1>
              {description && (
                <p className="mt-1.5 text-xs text-[#89938c]">{description}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                aria-label="جست‌وجو"
                className="grid size-9 place-items-center rounded-lg border border-[#e5e9e5] bg-white text-[#627067] sm:hidden"
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
              <button className="flex h-9 items-center gap-1.5 rounded-lg bg-[#087e68] px-3 text-[11px] font-bold text-white">
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
                className="grid size-9 place-items-center rounded-lg border border-[#e5e9e5] bg-white text-[#627067]"
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
    <div className="rounded-xl border border-white/70 bg-white/75 p-3">
      <p className="text-[9px] text-[#7d8982]">{label}</p>
      <p className="mt-2 text-sm font-black text-[#263630]">{value}</p>
      {delta && (
        <p className="mt-1 text-[10px] font-semibold text-[#087e68]">{delta}</p>
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
    <div className="overflow-hidden rounded-2xl border border-[#e9ece8] bg-white">
      <div className="flex items-center justify-between border-b border-[#edf0ed] px-4 py-3">
        <h2 className="text-sm font-bold">{title}</h2>
        <button className="flex h-8 items-center gap-1.5 rounded-lg border border-[#e9ece8] px-2.5 text-[10px] font-semibold text-[#59655f]">
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
          <thead className="bg-[#f8f9f7] text-[10px] text-[#818b85]">
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
  processing: { color: "#59655f", bg: "#f5f7f5" },
  shipped: { color: "#087e68", bg: "#eaf4ef" },
  completed: { color: "#087e68", bg: "#eaf4ef" },
  pending_payment: { color: "#b00020", bg: "#fdecea" },
  pending: { color: "#59655f", bg: "#f5f7f5" },
  approved: { color: "#087e68", bg: "#eaf4ef" },
  rejected: { color: "#b00020", bg: "#fdecea" },
  success: { color: "#087e68", bg: "#eaf4ef" },
  failed: { color: "#b00020", bg: "#fdecea" },
  delivered: { color: "#087e68", bg: "#eaf4ef" },
  returned: { color: "#b00020", bg: "#fdecea" },
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
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status] ?? {
    color: ADMIN_MUTED,
    bg: "#f5f7f5",
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
    <tr key={order.id} className="border-t border-[#f0f1ee] text-[#44514a]">
      <td className="px-4 py-3 font-bold text-[#087e68]">{order.id}</td>
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
    <tr key={item.id} className="border-t border-[#f0f1ee] text-[#44514a]">
      <td className="px-4 py-3 font-bold text-[#087e68]">{item.id}</td>
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
    <tr key={tx.id} className="border-t border-[#f0f1ee] text-[#44514a]">
      <td className="px-4 py-3 font-bold text-[#087e68]">{tx.id}</td>
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
    <tr key={shipment.id} className="border-t border-[#f0f1ee] text-[#44514a]">
      <td className="px-4 py-3 font-bold text-[#087e68]">{shipment.id}</td>
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
    <div className="rounded-xl border border-[#e9ece8] bg-white p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[10px] text-[#818b85]">شماره سفارش</p>
          <p className="text-sm font-bold text-[#173a30]">{order.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">مشتری</p>
          <p className="text-sm font-bold text-[#173a30]">{order.customer}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">تاریخ</p>
          <p className="text-sm font-bold text-[#173a30]">{order.date}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">مبلغ کل</p>
          <p className="text-sm font-black text-[#263630]">
            {formatToman(order.total)} تومان
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">وضعیت</p>
          <p className="mt-1">
            <StatusBadge status={order.status} />
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">روش پرداخت</p>
          <p className="text-sm font-bold text-[#173a30]">
            {order.paymentMethod}
          </p>
        </div>
      </div>
      {order.notes && (
        <div className="mt-4">
          <p className="mb-1 text-[10px] text-[#818b85]">تغذیه‌ها</p>
          <p className="text-sm text-[#44514a]">{order.notes}</p>
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
        className="text-xs font-medium text-[#58655f] hover:text-[#087e68]"
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
      <h1 className="text-xl font-black text-[#173a30]">{title}</h1>
    </div>
  );
}
