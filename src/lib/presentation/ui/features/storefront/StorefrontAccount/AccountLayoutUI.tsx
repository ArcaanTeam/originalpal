"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";
import {
  ChevronLeft,
  Heart,
  LogOut,
  MapPin,
  MessageSquare,
  Package,
  RotateCcw,
  Star,
  UserRound,
  Wallet,
} from "lucide-react";
import {
  accountCopy,
  accountNavItems,
  type AccountSection,
} from "./accountCopy";
import { accountProfile, formatIdentifier } from "./accountData";

const sectionIcons: Record<AccountSection, typeof UserRound> = {
  profile: UserRound,
  orders: Package,
  returns: RotateCcw,
  wishlist: Heart,
  addresses: MapPin,
  wallet: Wallet,
  reviews: Star,
  messages: MessageSquare,
};

function activeSection(
  pathname: string,
  section: AccountSection,
  href: string,
): boolean {
  if (section === "orders") {
    return pathname === href || pathname.startsWith(`${href}/`);
  }
  if (section === "profile") {
    // The password/security page lives under /account/profile as well.
    return pathname === href;
  }
  return pathname === href;
}

function sectionTitle(pathname: string): string {
  if (pathname.startsWith("/account/orders/")) {
    const id = pathname.split("/").filter(Boolean).at(-1) ?? "";
    return `${accountCopy.sections.orderDetail.mobileTitlePrefix} ${formatIdentifier(id)}`;
  }
  if (pathname === "/account/profile/edit") {
    return accountCopy.sections.profile.mobileTitle;
  }
  const match = accountNavItems.find((item) => item.href === pathname);
  if (!match) return accountCopy.title;
  if (match.section === "profile")
    return accountCopy.sections.profile.mobileTitle;
  if (match.section === "orders")
    return accountCopy.sections.orders.mobileTitle;
  if (match.section === "returns")
    return accountCopy.sections.returns.mobileTitle;
  if (match.section === "wishlist")
    return accountCopy.sections.wishlist.mobileTitle;
  if (match.section === "addresses")
    return accountCopy.sections.addresses.mobileTitle;
  if (match.section === "wallet")
    return accountCopy.sections.wallet.mobileTitle;
  if (match.section === "reviews")
    return accountCopy.sections.reviews.mobileTitle;
  return accountCopy.sections.messages.mobileTitle;
}

function breadcrumbFor(pathname: string): string[] {
  if (pathname === "/account/profile") {
    return [accountCopy.sections.profile.breadcrumb];
  }
  if (pathname === "/account/profile/edit") {
    return [
      accountCopy.sections.profile.breadcrumb,
      accountCopy.sections.profile.mobileTitle,
    ];
  }
  if (pathname.startsWith("/account/orders/")) {
    const id = pathname.split("/").filter(Boolean).at(-1) ?? "";
    return [
      accountCopy.sections.orders.breadcrumb,
      `${accountCopy.sections.orderDetail.breadcrumbPrefix} ${formatIdentifier(id)}`,
    ];
  }
  const match = accountNavItems.find((item) => item.href === pathname);
  return match ? [accountCopy.sections[match.section].breadcrumb] : [];
}

export function AccountSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="hidden w-[280px] shrink-0 self-start rounded-xl border border-border bg-white p-5 lg:flex lg:flex-col lg:gap-4">
      <div className="flex items-center gap-3">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-primary-soft text-[22px] font-bold text-primary">
          {accountProfile.fullName.slice(0, 1)}
        </span>
        <span className="leading-[1.7]">
          <span className="block text-base font-bold">
            {accountProfile.fullName}
          </span>
          <bdi dir="ltr" className="block text-[13px] text-muted-foreground">
            {accountProfile.mobile}
          </bdi>
        </span>
      </div>
      <div className="h-px bg-border" />
      <nav aria-label={accountCopy.title} className="flex flex-col gap-1">
        {accountNavItems.map((item) => {
          const Icon = sectionIcons[item.section];
          const active = activeSection(pathname, item.section, item.href);
          const isProfileEdit =
            item.section === "profile" && pathname === "/account/profile/edit";
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active || isProfileEdit ? "page" : undefined}
              className={cn(
                "flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] transition-colors",
                active || isProfileEdit
                  ? "bg-primary-soft font-semibold text-primary"
                  : "text-foreground hover:bg-muted",
              )}
            >
              <Icon size={19} aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
        <span className="mt-1 flex h-11 items-center gap-3 rounded-lg px-3 text-[15px] text-destructive">
          <LogOut size={19} aria-hidden="true" />
          {accountCopy.logout}
        </span>
      </nav>
    </aside>
  );
}

export default function AccountLayoutUI({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const crumbs = breadcrumbFor(pathname);
  const title = sectionTitle(pathname);
  const backHref = pathname.startsWith("/account/orders/")
    ? "/account/orders"
    : "/account/profile";

  return (
    <div className="flex min-h-[calc(100svh-190px)] flex-col pb-20 sm:pb-0">
      <header className="flex items-center gap-1 bg-primary px-2 py-2 text-primary-foreground lg:hidden">
        <Link
          href={backHref}
          aria-label={accountCopy.back}
          className="grid size-11 place-items-center rounded-lg"
        >
          <ChevronLeft size={22} />
        </Link>
        <p className="flex-1 text-lg font-bold">{title}</p>
      </header>
      <nav
        aria-label="مسیر صفحه"
        className="mx-auto hidden w-full max-w-[1280px] px-4 pt-4 text-[13px] leading-[1.8] text-muted-foreground sm:px-8 lg:block"
      >
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:text-primary">
              {accountCopy.breadcrumbRoot}
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/account/profile" className="hover:text-primary">
              {accountCopy.breadcrumbAccount}
            </Link>
          </li>
          {crumbs.map((crumb) => (
            <li key={crumb} className="flex items-center gap-1">
              <span aria-hidden="true">/</span>
              <span className="text-foreground">{crumb}</span>
            </li>
          ))}
        </ol>
      </nav>
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-start gap-6 px-4 py-4 sm:px-8">
        <AccountSidebar pathname={pathname} />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}

export function AccountPageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <div className="min-w-0 flex-1">
        <h1 className="text-xl font-extrabold lg:text-2xl">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
