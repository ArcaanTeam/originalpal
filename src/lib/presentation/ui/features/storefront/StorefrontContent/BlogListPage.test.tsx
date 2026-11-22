import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import BlogListPage from "./BlogListPage";

afterEach(cleanup);

describe("BlogListPage", () => {
  it("renders the featured article and the article grid", () => {
    render(<BlogListPage />);
    expect(
      screen.getByRole("heading", { name: "مجله اورجینال پل" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("راهنمای خرید گوشی پرچم‌دار: چه نکاتی را بررسی کنیم؟"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("مقایسه نمایشگرهای AMOLED و LCD در گوشی‌های امروزی"),
    ).toBeInTheDocument();
  });

  it("filters articles by tag", () => {
    render(<BlogListPage />);
    fireEvent.click(screen.getByRole("tab", { name: "آموزش" }));
    expect(
      screen.getByText("نکات نگهداری از باتری لپ‌تاپ"),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("مقایسه نمایشگرهای AMOLED و LCD در گوشی‌های امروزی"),
    ).not.toBeInTheDocument();
  });

  it("rejects an invalid newsletter email and accepts a valid one", () => {
    render(<BlogListPage />);
    fireEvent.change(screen.getByLabelText("ایمیل"), {
      target: { value: "not-an-email" },
    });
    fireEvent.click(screen.getByRole("button", { name: "عضویت" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "نشانی ایمیل معتبر وارد کنید.",
    );

    fireEvent.change(screen.getByLabelText("ایمیل"), {
      target: { value: "user@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "عضویت" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "پس از اتصال سرویس محتوا فعال می‌شود.",
    );
  });
});
