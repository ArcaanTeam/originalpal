import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CustomerLoginUI from "./CustomerLoginUI";
import { customerAuthCopy } from "./customerAuthCopy";

afterEach(cleanup);

function renderUI(overrides: Partial<Parameters<typeof CustomerLoginUI>[0]>) {
  return render(
    <CustomerLoginUI
      translations={customerAuthCopy}
      mode="otp"
      mobile=""
      mobileInvalid={false}
      password=""
      notice={null}
      onChangeMobile={vi.fn()}
      onChangePassword={vi.fn()}
      onSubmit={vi.fn()}
      onSwitchMode={vi.fn()}
      {...overrides}
    />,
  );
}

describe("CustomerLoginUI", () => {
  it("renders the Persian login copy and benefit panel", () => {
    renderUI({});
    expect(
      screen.getByRole("heading", { name: "ورود یا ثبت‌نام" }),
    ).toBeVisible();
    expect(screen.getByLabelText("شماره موبایل")).toBeVisible();
    expect(screen.getByText("با اورجینال پل مطمئن بخرید")).toBeVisible();
    expect(screen.getByText("همه کالاها با گارانتی معتبر")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "قوانین و مقررات" }),
    ).toHaveAttribute("href", "/pages/terms");
    expect(screen.getByRole("link", { name: "حریم خصوصی" })).toHaveAttribute(
      "href",
      "/pages/privacy",
    );
  });

  it("submits the mobile number and reports input changes", () => {
    const onChangeMobile = vi.fn();
    const onSubmit = vi.fn();
    renderUI({ onChangeMobile, onSubmit });

    fireEvent.change(screen.getByLabelText("شماره موبایل"), {
      target: { value: "0912" },
    });
    expect(onChangeMobile).toHaveBeenCalledWith("0912");

    fireEvent.click(screen.getByRole("button", { name: /دریافت کد تأیید/ }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("marks the mobile field invalid and shows the not-yet-connected notice", () => {
    renderUI({ mobile: "0912", mobileInvalid: true, notice: "پیام" });
    expect(screen.getByLabelText("شماره موبایل")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(screen.getByRole("status")).toHaveTextContent("پیام");
  });

  it("requests the password mode instead of navigating on its own", () => {
    const onSwitchMode = vi.fn();
    renderUI({ onSwitchMode });
    fireEvent.click(screen.getByRole("button", { name: "ورود با رمز عبور" }));
    expect(onSwitchMode).toHaveBeenCalledWith("password");
  });

  it("renders the password field and password submit in password mode", () => {
    renderUI({ mode: "password" });
    expect(screen.getByLabelText("رمز عبور")).toBeVisible();
    expect(screen.getByRole("button", { name: "ورود" })).toBeVisible();
    expect(
      screen.getByRole("button", { name: "ورود با کد تأیید" }),
    ).toBeVisible();
  });
});
