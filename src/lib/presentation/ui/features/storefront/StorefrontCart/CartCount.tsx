"use client";

import { useAtomValue } from "jotai";
import { cartAtom } from "./cartAtom";

export default function CartCount() {
  const items = useAtomValue(cartAtom);
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <span className="grid size-5 place-items-center rounded-full bg-accent text-xs text-accent-foreground">
      {count.toLocaleString("fa-IR")}
    </span>
  );
}
