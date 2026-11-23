import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CustomerOtpPage from "./CustomerOtpPage";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), refresh: vi.fn() }),
  usePathname: () => "/account/login/verify",
  useSearchParams: () => new URLSearchParams(),
}));

afterEach(cleanup);

describe("CustomerOtpPage", () => {
  it("shows the masked mobile number and validates an incomplete code", () => {
    render(<CustomerOtpPage phone="09123456789" />);
    expect(screen.getByText("۰۹۱۲ ۳۴۵ ۶۷۸۹")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "تأیید و ورود" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      "کد تأیید ۵ رقمی را کامل وارد کنید.",
    );
  });

  it("accepts a five digit code typed with Persian digits and reports the pending service", () => {
    render(<CustomerOtpPage phone="09123456789" />);
    const digits = screen.getAllByLabelText("رقم کد تأیید");
    ["۴", "۸", "۲", "۹", "۱"].forEach((digit, index) => {
      fireEvent.change(digits[index], { target: { value: digit } });
    });
    fireEvent.click(screen.getByRole("button", { name: "تأیید و ورود" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "پس از اتصال سرویس حساب کاربری",
    );
  });

  it("ignores submissions without a phone number", () => {
    render(<CustomerOtpPage />);
    const submit = screen.getByRole("button", { name: "تأیید و ورود" });
    expect(submit).toBeDisabled();
    expect(screen.getByText(/شماره موبایل مشخص نشده است/)).toBeInTheDocument();
  });

  it("counts the resend timer down once per second", () => {
    vi.useFakeTimers();
    try {
      render(<CustomerOtpPage phone="09123456789" />);
      expect(screen.getByText("۰۱:۴۲")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "ارسال مجدد" })).toBeDisabled();

      act(() => {
        vi.advanceTimersByTime(1_000);
      });
      expect(screen.getByText("۰۱:۴۱")).toBeInTheDocument();

      act(() => {
        vi.advanceTimersByTime(1_000);
      });
      expect(screen.getByText("۰۱:۴۰")).toBeInTheDocument();
    } finally {
      vi.useRealTimers();
    }
  });
});
