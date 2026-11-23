"use client";

import { useState } from "react";
import { useSetAtom } from "jotai";
import { cartAtom, type CartLine } from "../StorefrontCart/cartAtom";
import AccountWishlistUI from "./AccountWishlistUI";
import { wishlistItems, type WishlistItem } from "./accountData";

function toCartLine(item: WishlistItem): CartLine {
  return {
    id: item.id,
    slug: item.id,
    title: item.title,
    price: item.price,
    ...(item.oldPrice ? { oldPrice: item.oldPrice } : {}),
    quantity: 1,
    illustration: item.illustration === "phone" ? "phone" : "headphones",
  };
}

export default function AccountWishlistPage() {
  const [items, setItems] = useState(wishlistItems);
  const [notice, setNotice] = useState<string | null>(null);
  const setCart = useSetAtom(cartAtom);

  function handleRemove(id: string) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function handleRemoveAll() {
    setItems([]);
    setNotice(null);
  }

  function handleAddToCart(item: WishlistItem) {
    setCart((current) => {
      if (current.some((line) => line.id === item.id)) {
        return current.map((line) =>
          line.id === item.id ? { ...line, quantity: line.quantity + 1 } : line,
        );
      }
      return [...current, toCartLine(item)];
    });
    setNotice(`«${item.title}» به سبد خرید اضافه شد.`);
  }

  return (
    <AccountWishlistUI
      items={items}
      notice={notice}
      onClickRemove={handleRemove}
      onClickRemoveAll={handleRemoveAll}
      onClickAddToCart={handleAddToCart}
    />
  );
}
