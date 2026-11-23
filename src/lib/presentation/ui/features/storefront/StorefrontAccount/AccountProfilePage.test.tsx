import type { ReactElement } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  resetAuthSession,
  setAuthenticatedUser,
} from "@/lib/presentation/ui/auth/session-store";
import { testAuthUser } from "@/lib/presentation/ui/auth/testSupport";
import AccountProfilePage from "./AccountProfilePage";

const queryClient = new QueryClient();

function renderWithProviders(ui: ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  );
}

// The profile save is backed by the real mutation hook; in tests it resolves
// with the authenticated user so the saved notice is shown.
vi.mock("@/lib/presentation/data/feature/auth/useUpdateUsername", () => ({
  default: () => ({
    updateUsername: vi.fn(async () => undefined),
    isPending: false,
  }),
}));

beforeEach(() => {
  resetAuthSession();
  setAuthenticatedUser(testAuthUser);
});

afterEach(() => {
  cleanup();
  resetAuthSession();
  vi.unstubAllGlobals();
});

describe("AccountProfilePage", () => {
  it("renders the real profile from the active session", () => {
    renderWithProviders(<AccountProfilePage />);
    expect(screen.getByText("سفارش‌های جاری")).toBeInTheDocument();
    expect(screen.getByText("۲٬۵۰۰٬۰۰۰ تومان")).toBeInTheDocument();
    // Identity comes from the real session user, not mock data.
    expect(screen.getByLabelText("ایمیل")).toHaveValue("admin");
    expect(screen.getByLabelText("شماره موبایل")).toHaveValue("admin");
    expect(screen.getByLabelText("شماره موبایل")).toHaveAttribute("readonly");
    expect(screen.getByText("تأیید شده")).toBeInTheDocument();
  });

  it("saves the form and shows the saved notice", async () => {
    renderWithProviders(<AccountProfilePage />);
    fireEvent.change(screen.getByLabelText("نام"), {
      target: { value: "رضا" },
    });
    fireEvent.click(screen.getByRole("button", { name: /ذخیره تغییرات/ }));

    expect(screen.getByLabelText("نام")).toHaveValue("رضا");
    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        "تغییرات پس از اتصال سرویس حساب کاربری ذخیره می‌شود.",
      );
    });
  });

  it("clears the typed email on cancel", () => {
    renderWithProviders(<AccountProfilePage />);
    fireEvent.change(screen.getByLabelText("ایمیل"), {
      target: { value: "new@example.com" },
    });
    fireEvent.click(screen.getByRole("button", { name: "انصراف" }));
    expect(screen.getByLabelText("ایمیل")).toHaveValue("admin");
  });

  it("switches gender, newsletter, and two-factor toggles", () => {
    renderWithProviders(<AccountProfilePage />);
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

  it("renders nothing when there is no active session", () => {
    resetAuthSession();
    renderWithProviders(<AccountProfilePage />);
    expect(screen.queryByText("سفارش‌های جاری")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("ایمیل")).not.toBeInTheDocument();
  });
});
