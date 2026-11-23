import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CustomerLoginPage from "./CustomerLoginPage";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/account/login",
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(() => {
  cleanup();
  push.mockReset();
});

describe("CustomerLoginPage", () => {
  it("rejects an invalid mobile number and keeps the user on the page", () => {
    render(<CustomerLoginPage />);
    fireEvent.click(screen.getByRole("button", { name: /دریافت کد تأیید/ }));

    expect(screen.getByLabelText("شماره موبایل")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(push).not.toHaveBeenCalled();
  });

  it("normalizes Persian digits and navigates to the verification step", () => {
    render(<CustomerLoginPage />);
    fireEvent.change(screen.getByLabelText("شماره موبایل"), {
      target: { value: "۰۹۱۲۳۴۵۶۷۸۹" },
    });
    fireEvent.click(screen.getByRole("button", { name: /دریافت کد تأیید/ }));

    expect(push).toHaveBeenCalledWith(
      "/account/login/verify?phone=09123456789",
    );
  });

  it("explains that password login is not connected yet", () => {
    render(<CustomerLoginPage />);
    fireEvent.click(screen.getByRole("button", { name: "ورود با رمز عبور" }));
    fireEvent.change(screen.getByLabelText("شماره موبایل"), {
      target: { value: "۰۹۱۲۳۴۵۶۷۸۹" },
    });
    fireEvent.change(screen.getByLabelText("رمز عبور"), {
      target: { value: "secret-password" },
    });
    fireEvent.click(screen.getByRole("button", { name: "ورود" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "پس از اتصال سرویس حساب کاربری",
    );
    expect(push).not.toHaveBeenCalled();
  });
});
