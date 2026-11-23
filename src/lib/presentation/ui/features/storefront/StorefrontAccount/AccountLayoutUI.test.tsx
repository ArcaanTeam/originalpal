import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AccountLayoutUI from "./AccountLayoutUI";

const pathname = vi.fn(() => "/account/orders");

vi.mock("next/navigation", () => ({
  usePathname: () => pathname(),
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(() => {
  cleanup();
  pathname.mockReturnValue("/account/orders");
});

describe("AccountLayoutUI", () => {
  it("renders the account navigation, profile card, and breadcrumb", () => {
    render(
      <AccountLayoutUI>
        <p>محتوا</p>
      </AccountLayoutUI>,
    );

    expect(screen.getByText("علی رضایی")).toBeInTheDocument();
    expect(screen.getByText("محتوا")).toBeInTheDocument();
    for (const label of [
      "اطلاعات حساب",
      "سفارش‌های من",
      "مرجوعی‌ها",
      "علاقه‌مندی‌ها",
      "آدرس‌ها",
      "کیف پول",
      "دیدگاه‌ها",
      "پیام‌ها",
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
    expect(screen.getByRole("link", { name: "سفارش‌های من" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: "خانه" })).toHaveAttribute(
      "href",
      "/",
    );
  });

  it("marks the orders section active for order detail pages", () => {
    pathname.mockReturnValue("/account/orders/100128");
    render(<AccountLayoutUI>محتوا</AccountLayoutUI>);

    expect(screen.getByRole("link", { name: "سفارش‌های من" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getAllByText("سفارش ۱۰۰۱۲۸").length).toBeGreaterThan(0);
  });
});
