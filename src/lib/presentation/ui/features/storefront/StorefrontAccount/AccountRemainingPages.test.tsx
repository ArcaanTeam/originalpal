import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import AccountAddressesPage from "./AccountAddressesPage";
import AccountMessagesPage from "./AccountMessagesPage";
import AccountReturnsPage from "./AccountReturnsPage";
import AccountReviewsPage from "./AccountReviewsPage";
import AccountWalletPage from "./AccountWalletPage";

afterEach(cleanup);

describe("AccountWalletPage", () => {
  it("renders the balance, signed transactions, and the top-up notice", () => {
    render(<AccountWalletPage />);
    expect(screen.getByText("۲٬۵۰۰٬۰۰۰")).toBeInTheDocument();
    expect(screen.getByText("+۳٬۰۰۰٬۰۰۰ تومان")).toBeInTheDocument();
    expect(screen.getByText("−۵۰۰٬۰۰۰ تومان")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "افزایش موجودی" }));
    expect(screen.getByRole("status")).toHaveTextContent("اتصال درگاه پرداخت");
  });
});

describe("AccountMessagesPage", () => {
  it("marks a single message read and then all of them", () => {
    render(<AccountMessagesPage />);
    expect(screen.getByText("سفارش ۱۰۰۱۲۸ ثبت شد").closest("span")).toHaveClass(
      "font-bold",
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "سفارش ۱۰۰۱۲۸ ثبت شد. علامت‌گذاری به‌عنوان خوانده‌شده",
      }),
    );
    expect(screen.getByText("سفارش ۱۰۰۱۲۸ ثبت شد").closest("span")).toHaveClass(
      "font-medium",
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "علامت‌گذاری همه به‌عنوان خوانده‌شده",
      }),
    );
    expect(
      screen.queryByRole("button", {
        name: "علامت‌گذاری همه به‌عنوان خوانده‌شده",
      }),
    ).not.toBeInTheDocument();
  });
});

describe("AccountReviewsPage", () => {
  it("renders review statuses and reports the edit action", () => {
    render(<AccountReviewsPage />);
    expect(screen.getByText("تأیید شده")).toBeInTheDocument();
    expect(screen.getByText("در انتظار تأیید")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "ویرایش" })[0]);
    expect(screen.getByRole("status")).toHaveTextContent("سرویس دیدگاه‌ها");
  });
});

describe("AccountAddressesPage", () => {
  it("lists addresses and can delete one", () => {
    render(<AccountAddressesPage />);
    expect(screen.getByText("منزل")).toBeInTheDocument();
    expect(screen.getByText("پیش‌فرض")).toBeInTheDocument();

    fireEvent.click(screen.getAllByRole("button", { name: "حذف" })[0]);
    expect(screen.queryByText("منزل")).not.toBeInTheDocument();
    expect(screen.getByText("محل کار")).toBeInTheDocument();
  });

  it("validates the address form before saving", () => {
    render(<AccountAddressesPage />);
    fireEvent.click(screen.getByRole("button", { name: "ذخیره آدرس" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "نشانی کامل را وارد کنید.",
    );

    fireEvent.change(screen.getByLabelText("نشانی کامل"), {
      target: { value: "تهران، خیابان آزادی، پلاک ۱" },
    });
    fireEvent.click(screen.getByRole("button", { name: "ذخیره آدرس" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "پس از اتصال سرویس حساب کاربری",
    );
  });

  it("toggles the default-address switch", () => {
    render(<AccountAddressesPage />);
    const toggle = screen.getByRole("switch", {
      name: "تنظیم به‌عنوان آدرس پیش‌فرض",
    });
    expect(toggle).toHaveAttribute("aria-checked", "false");
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });
});

describe("AccountReturnsPage", () => {
  it("lists existing returns and submits a new request", () => {
    render(<AccountReturnsPage />);
    expect(screen.getByText("مرجوعی ۲۰۰۰۱۲")).toBeInTheDocument();
    expect(screen.getByText("در حال پردازش")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "ثبت درخواست" }));
    expect(screen.getByRole("status")).toHaveTextContent(
      "سرویس سفارش‌ها فعال می‌شود.",
    );
  });
});
