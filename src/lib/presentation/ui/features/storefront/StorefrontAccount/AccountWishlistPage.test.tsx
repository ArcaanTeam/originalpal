import { act } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createStore } from "jotai";
import { Provider } from "jotai";
import { afterEach, describe, expect, it } from "vitest";
import { cartAtom, initialCart } from "../StorefrontCart/cartAtom";
import AccountWishlistPage from "./AccountWishlistPage";

afterEach(cleanup);

function renderPage() {
  const store = createStore();
  render(
    <Provider store={store}>
      <AccountWishlistPage />
    </Provider>,
  );
  return store;
}

describe("AccountWishlistPage", () => {
  it("lists the wishlist products with prices and ratings", () => {
    renderPage();
    expect(
      screen.getByText("گوشی سامسونگ Galaxy S26 Ultra"),
    ).toBeInTheDocument();
    expect(screen.getByText(/۴٫۸ \(۲۱۴\)/)).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: "افزودن به سبد خرید" }),
    ).toHaveLength(6);
  });

  it("removes a single item and then clears the whole list", () => {
    renderPage();
    fireEvent.click(
      screen.getAllByRole("button", { name: "حذف از علاقه‌مندی‌ها" })[0],
    );
    expect(
      screen.queryByText("گوشی سامسونگ Galaxy S26 Ultra"),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "حذف همه" }));
    expect(
      screen.getByText("لیست علاقه‌مندی‌های شما خالی است."),
    ).toBeInTheDocument();
  });

  it("adds a wishlist product to the persisted cart without duplicating lines", () => {
    const store = renderPage();
    fireEvent.click(
      screen.getAllByRole("button", { name: "افزودن به سبد خرید" })[0],
    );

    expect(screen.getByRole("status")).toHaveTextContent(
      "به سبد خرید اضافه شد.",
    );
    let cart = store.get(cartAtom);
    expect(cart).toHaveLength(initialCart.length);
    expect(cart.find((line) => line.id === "samsung-s26-ultra")?.quantity).toBe(
      2,
    );

    act(() => {
      fireEvent.click(
        screen.getAllByRole("button", { name: "افزودن به سبد خرید" })[1],
      );
    });
    cart = store.get(cartAtom);
    expect(cart).toHaveLength(initialCart.length + 1);
    expect(cart.at(-1)?.id).toBe("samsung-s26");
  });
});
