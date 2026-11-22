import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import StaticPagePage from "./StaticPagePage";

afterEach(cleanup);

describe("StaticPagePage", () => {
  it("renders the terms page with its sections", () => {
    render(<StaticPagePage slug="terms" />);
    expect(
      screen.getByRole("heading", { name: "قوانین و مقررات" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("آخرین به‌روزرسانی: ۱۴۰۵/۰۷/۲۰"),
    ).toBeInTheDocument();
    expect(screen.getByText("۱. شرایط استفاده")).toBeInTheDocument();
    expect(screen.getByText("۳. بازگشت کالا")).toBeInTheDocument();
  });

  it("renders an empty page placeholder", () => {
    render(<StaticPagePage slug="careers" />);
    expect(
      screen.getByRole("heading", { name: "فرصت‌های شغلی" }),
    ).toBeInTheDocument();
    expect(screen.getByText("به‌زودی منتشر می‌شود.")).toBeInTheDocument();
  });

  it("renders nothing for an unknown slug", () => {
    const { container } = render(<StaticPagePage slug="unknown-page" />);
    expect(container).toBeEmptyDOMElement();
  });
});
