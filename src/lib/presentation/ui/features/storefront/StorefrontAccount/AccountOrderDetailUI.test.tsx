import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AccountOrderDetailUI from "./AccountOrderDetailUI";
import { findOrder } from "./accountData";

afterEach(cleanup);

describe("AccountOrderDetailUI", () => {
  it("renders the timeline, totals, and delivery details", () => {
    render(
      <AccountOrderDetailUI
        order={findOrder("100128")}
        notice={null}
        onClickInvoice={vi.fn()}
        onClickPay={vi.fn()}
      />,
    );

    expect(
      screen.getByRole("heading", { name: "سفارش ۱۰۰۱۲۸" }),
    ).toBeInTheDocument();
    for (const step of [
      "ثبت سفارش",
      "پرداخت",
      "آماده‌سازی",
      "ارسال",
      "تحویل",
    ]) {
      expect(screen.getByText(step)).toBeInTheDocument();
    }
    expect(screen.getByText("جمع کالاها:")).toBeInTheDocument();
    expect(screen.getAllByText("۸۹٬۹۰۰٬۰۰۰ تومان").length).toBeGreaterThan(0);
    expect(
      screen.getByText("تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۴"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("گوشی موبایل سامسونگ مدل Galaxy S26 Ultra"),
    ).toBeInTheDocument();
  });

  it("fires the invoice and payment callbacks", () => {
    const onClickInvoice = vi.fn();
    const onClickPay = vi.fn();
    render(
      <AccountOrderDetailUI
        order={findOrder("100128")}
        notice={null}
        onClickInvoice={onClickInvoice}
        onClickPay={onClickPay}
      />,
    );

    fireEvent.click(
      screen.getAllByRole("button", { name: "دریافت فاکتور" })[0],
    );
    fireEvent.click(screen.getAllByRole("button", { name: "پرداخت سفارش" })[0]);
    expect(onClickInvoice).toHaveBeenCalledTimes(1);
    expect(onClickPay).toHaveBeenCalledTimes(1);
  });

  it("hides the payment action for settled orders and shows the notice", () => {
    render(
      <AccountOrderDetailUI
        order={findOrder("100094")}
        notice="پیام آزمایشی"
        onClickInvoice={vi.fn()}
        onClickPay={vi.fn()}
      />,
    );
    expect(
      screen.queryByRole("button", { name: "پرداخت سفارش" }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("پیام آزمایشی");
  });

  it("falls back to the not-found state", () => {
    render(
      <AccountOrderDetailUI
        order={undefined}
        notice={null}
        onClickInvoice={vi.fn()}
        onClickPay={vi.fn()}
      />,
    );
    expect(screen.getByText("این سفارش پیدا نشد.")).toBeInTheDocument();
  });
});
