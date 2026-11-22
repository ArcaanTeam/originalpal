import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AccountOrdersUI from "./AccountOrdersUI";
import { accountOrders, filterOrders } from "./accountData";

afterEach(cleanup);

describe("AccountOrdersUI", () => {
  it("renders the order filters and the awaiting-payment actions", () => {
    render(
      <AccountOrdersUI
        orders={accountOrders}
        filter="all"
        onChangeFilter={vi.fn()}
      />,
    );

    expect(screen.getByRole("tab", { name: "همه" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.getByText("سفارش ۱۰۰۱۲۸")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "جزئیات سفارش" })[0],
    ).toHaveAttribute("href", "/account/orders/100128");
    expect(screen.getByRole("link", { name: "پرداخت سفارش" })).toHaveAttribute(
      "href",
      "/checkout/payment",
    );
    expect(screen.getAllByRole("link", { name: "پیگیری مرسوله" })).toHaveLength(
      3,
    );
  });

  it("reports a filter change", () => {
    const onChangeFilter = vi.fn();
    render(
      <AccountOrdersUI
        orders={accountOrders}
        filter="all"
        onChangeFilter={onChangeFilter}
      />,
    );

    fireEvent.click(screen.getByRole("tab", { name: "تحویل‌شده" }));
    expect(onChangeFilter).toHaveBeenCalledWith("delivered");
  });

  it("shows the empty state for a status with no orders", () => {
    render(
      <AccountOrdersUI
        orders={filterOrders(accountOrders, "shipped")}
        filter="shipped"
        onChangeFilter={vi.fn()}
      />,
    );
    expect(
      screen.getByText("سفارشی با این وضعیت پیدا نشد."),
    ).toBeInTheDocument();
  });
});
