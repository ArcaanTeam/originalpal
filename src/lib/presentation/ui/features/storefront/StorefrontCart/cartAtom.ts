import { atomWithStorage } from "jotai/utils";
import { createSyncStorage } from "@/lib/presentation/storage/createSyncStorage";

export interface CartLine {
  id: string;
  slug: string;
  title: string;
  price: number;
  oldPrice?: number;
  quantity: number;
  color?: string;
  variant?: string;
  illustration: "phone" | "headphones" | "watch";
  discount?: string;
}

export const initialCart: CartLine[] = [
  {
    id: "samsung-s26-ultra",
    slug: "samsung-s26-ultra",
    title: "گوشی موبایل سامسونگ مدل Galaxy S26 Ultra",
    price: 89_900_000,
    oldPrice: 98_500_000,
    quantity: 1,
    color: "تیتانیوم مشکی",
    variant: "۵۱۲ گیگابایت",
    illustration: "phone",
    discount: "۹٪",
  },
  {
    id: "sony-wh-1000xm6",
    slug: "sony-wh-1000xm6",
    title: "هدفون بی‌سیم سونی مدل WH-1000XM6",
    price: 18_900_000,
    oldPrice: 22_400_000,
    quantity: 1,
    color: "مشکی",
    variant: "گارانتی ۱۸ ماهه اصالت",
    illustration: "headphones",
    discount: "۱۶٪",
  },
  {
    id: "samsung-watch-9",
    slug: "samsung-watch-9",
    title: "ساعت هوشمند سامسونگ Watch 9",
    price: 34_500_000,
    oldPrice: 38_000_000,
    quantity: 1,
    color: "مشکی",
    illustration: "watch",
  },
];

function parseCart(raw: unknown, fallback: CartLine[]): CartLine[] {
  if (!Array.isArray(raw)) return fallback;
  return raw
    .filter(
      (item): item is CartLine =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.slug === "string" &&
        typeof item.title === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number" &&
        ["phone", "headphones", "watch"].includes(item.illustration),
    )
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity)),
    }));
}

const cartStorage = createSyncStorage<CartLine[]>({ parse: parseCart });
export const cartAtom = atomWithStorage<CartLine[]>(
  "originalpal-storefront-cart",
  initialCart,
  cartStorage,
);

export function getCartTotals(items: CartLine[], shippingFee = 0) {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const discount = items.reduce(
    (total, item) =>
      total +
      Math.max(0, (item.oldPrice ?? item.price) - item.price) * item.quantity,
    0,
  );
  return {
    count,
    subtotal,
    discount,
    payable: Math.max(0, subtotal - discount + shippingFee),
  };
}

export function formatToman(value: number): string {
  return `${Math.max(0, Math.round(value)).toLocaleString("fa-IR")} تومان`;
}
