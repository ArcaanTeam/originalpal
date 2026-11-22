import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AccountProfilePage from "./AccountProfilePage";

afterEach(cleanup);

describe("AccountProfilePage", () => {
  it("renders the account statistics and read-only verified mobile", () => {
    render(<AccountProfilePage />);
    expect(screen.getByText("سفارش‌های جاری")).toBeInTheDocument();
    expect(screen.getByText("۲٬۵۰۰٬۰۰۰ تومان")).toBeInTheDocument();
    expect(screen.getByLabelText("شماره موبایل")).toHaveValue("۰۹۱۲۳۴۵۶۷۸۹");
    expect(screen.getByLabelText("شماره موبایل")).toHaveAttribute("readonly");
    expect(screen.getByText("تأیید شده")).toBeInTheDocument();
  });

  it("saves the form and shows the pending-service notice", () => {
    render(<AccountProfilePage />);
    fireEvent.change(screen.getByLabelText("نام"), {
      target: { value: "رضا" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ذخیره تغییرات/ }));

    expect(screen.getByLabelText("نام")).toHaveValue("رضا");
    expect(screen.getByRole("status")).toHaveTextContent(
      "پس از اتصال سرویس حساب کاربری",
    );
  });

  it("restores the initial values on cancel", () => {
    render(<AccountProfilePage />);
    fireEvent.change(screen.getByLabelText("نام خانوادگی"), {
      target: { value: "تغییر" },
    });
    fireEvent.click(screen.getByRole("button", { name: "انصراف" }));
    expect(screen.getByLabelText("نام خانوادگی")).toHaveValue("رضایی");
  });

  it("switches gender, newsletter, and two-factor toggles", () => {
    render(<AccountProfilePage />);
    fireEvent.click(screen.getByLabelText("زن"));
    expect(screen.getByLabelText("زن")).toBeChecked();

    const newsletter = screen.getByRole("switch", {
      name: "دریافت خبرنامه و پیشنهادهای ویژه",
    });
    expect(newsletter).toHaveAttribute("aria-checked", "true");
    fireEvent.click(newsletter);
    expect(newsletter).toHaveAttribute("aria-checked", "false");

    const twoFactor = screen.getByRole("switch", { name: "ورود دو مرحله‌ای" });
    expect(twoFactor).toHaveAttribute("aria-checked", "false");
    fireEvent.click(twoFactor);
    expect(twoFactor).toHaveAttribute("aria-checked", "true");
  });
});
