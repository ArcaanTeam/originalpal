import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FaqPage from "./FaqPage";

afterEach(cleanup);

describe("FaqPage", () => {
  it("opens the first question by default and toggles others", () => {
    render(<FaqPage />);
    expect(
      screen.getByText(
        "از بخش «سفارش‌های من» در حساب کاربری می‌توانید وضعیت هر سفارش را ببینید.",
      ),
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: "مهلت بازگشت کالا چقدر است؟" }),
    );
    expect(
      screen.getByText(
        "مهلت بازگشت کالا ۷ روز پس از تحویل است و درخواست مرجوعی از بخش «مرجوعی‌ها» ثبت می‌شود.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "از بخش «سفارش‌های من» در حساب کاربری می‌توانید وضعیت هر سفارش را ببینید.",
      ),
    ).not.toBeInTheDocument();
  });

  it("filters questions by the search query", () => {
    render(<FaqPage />);
    fireEvent.change(screen.getByLabelText("جست‌وجو در سوالات"), {
      target: { value: "اصالت" },
    });
    expect(
      screen.getByRole("button", { name: "آیا کالاها اصل هستند؟" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "هزینه ارسال چقدر است؟" }),
    ).not.toBeInTheDocument();
  });

  it("shows an empty state when nothing matches", () => {
    render(<FaqPage />);
    fireEvent.change(screen.getByLabelText("جست‌وجو در سوالات"), {
      target: { value: "عبارت ناموجود" },
    });
    expect(
      screen.getByText("پرسشی با این عبارت پیدا نشد."),
    ).toBeInTheDocument();
  });
});
