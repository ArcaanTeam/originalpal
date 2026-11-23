import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContactPage from "./ContactPage";

afterEach(cleanup);

describe("ContactPage", () => {
  it("shows the contact channels and the message form", () => {
    render(<ContactPage />);
    expect(screen.getByText("راه‌های ارتباطی")).toBeInTheDocument();
    expect(screen.getByText("۰۲۱-۱۲۳۴۵۶۷۸ (۸ تا ۲۰)")).toBeInTheDocument();
    expect(screen.getByText("support@example.com")).toBeInTheDocument();
    expect(screen.getByLabelText("نام و نام خانوادگی")).toBeInTheDocument();
    expect(screen.getByLabelText("موضوع")).toBeInTheDocument();
    expect(screen.getByLabelText("پیام")).toBeInTheDocument();
  });

  it("validates required fields before submitting", () => {
    render(<ContactPage />);
    fireEvent.click(screen.getByRole("button", { name: "ارسال پیام" }));
    expect(
      screen.getByText("نام و نام خانوادگی را وارد کنید."),
    ).toBeInTheDocument();
    expect(screen.getByText("متن پیام را وارد کنید.")).toBeInTheDocument();
  });

  it("submits a valid message and shows the pending notice", () => {
    render(<ContactPage />);
    fireEvent.change(screen.getByLabelText("نام و نام خانوادگی"), {
      target: { value: "علی رضایی" },
    });
    fireEvent.change(screen.getByLabelText("پیام"), {
      target: { value: "سلام، درباره سفارشم سوال دارم." },
    });
    fireEvent.click(screen.getByRole("button", { name: "ارسال پیام" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "پیام شما ثبت شد؛ پس از اتصال سرویس پشتیبانی ارسال می‌شود.",
    );
  });
});
