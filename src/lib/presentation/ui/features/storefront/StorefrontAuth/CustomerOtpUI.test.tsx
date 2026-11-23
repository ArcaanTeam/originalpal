import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CustomerOtpUI from "./CustomerOtpUI";
import { customerAuthCopy } from "./customerAuthCopy";

afterEach(cleanup);

function renderUI(overrides: Partial<Parameters<typeof CustomerOtpUI>[0]>) {
  return render(
    <CustomerOtpUI
      translations={customerAuthCopy}
      mobileLabel="۰۹۱۲ ۳۴۵ ۶۷۸۹"
      code={["", "", "", "", ""]}
      countdownSeconds={102}
      error={null}
      notice={null}
      onChangeDigit={vi.fn()}
      onSubmit={vi.fn()}
      onClickResend={vi.fn()}
      {...overrides}
    />,
  );
}

describe("CustomerOtpUI", () => {
  it("renders five digit inputs, the masked mobile number, and the countdown", () => {
    renderUI({});
    expect(screen.getAllByLabelText("رقم کد تأیید")).toHaveLength(5);
    expect(screen.getByText("۰۹۱۲ ۳۴۵ ۶۷۸۹")).toBeInTheDocument();
    expect(screen.getByText("۰۱:۴۲")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "ویرایش شماره" })).toHaveAttribute(
      "href",
      "/account/login",
    );
  });

  it("reports digit changes and submitting an incomplete code", () => {
    const onChangeDigit = vi.fn();
    const onSubmit = vi.fn();
    renderUI({ onChangeDigit, onSubmit });

    fireEvent.change(screen.getAllByLabelText("رقم کد تأیید")[0], {
      target: { value: "۴" },
    });
    expect(onChangeDigit).toHaveBeenCalledWith(0, "4");

    fireEvent.click(screen.getByRole("button", { name: "تأیید و ورود" }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("shows the validation error and disables resend during the countdown", () => {
    renderUI({ error: customerAuthCopy.otp.error });
    expect(screen.getByRole("alert")).toHaveTextContent(
      "کد تأیید ۵ رقمی را کامل وارد کنید.",
    );
    expect(screen.getByRole("button", { name: "ارسال مجدد" })).toBeDisabled();
  });

  it("enables resend when the countdown finishes", () => {
    const onClickResend = vi.fn();
    renderUI({ countdownSeconds: 0, onClickResend });
    fireEvent.click(screen.getByRole("button", { name: "ارسال مجدد" }));
    expect(onClickResend).toHaveBeenCalledTimes(1);
    expect(screen.getByText("کد جدید ارسال شد.")).toBeInTheDocument();
  });
});
