import { formatToman } from "../StorefrontCart/cartAtom";

export type OrderStatus =
  "awaiting-payment" | "processing" | "shipped" | "delivered" | "cancelled";

export type Illustration = "phone" | "headphones" | "tablet" | "cable";

export interface AccountProfile {
  firstName: string;
  lastName: string;
  fullName: string;
  mobile: string;
  nationalId: string;
  email: string;
  birthDate: string;
  gender: "male" | "female";
  newsletter: boolean;
  twoFactor: boolean;
  passwordChangedAt: string;
}

export interface AccountStats {
  activeOrders: number;
  wishlist: number;
  walletBalance: number;
}

export interface OrderLine {
  title: string;
  variant: string;
  quantity: number;
  amount: number;
  illustration: Illustration;
}

export interface AccountOrder {
  id: string;
  date: string;
  status: OrderStatus;
  lines: OrderLine[];
  amount: number;
  paymentMethod: string;
  shippingMethod: string;
  subtotal: number;
  discount: number;
  shipping: number;
}

export interface OrderTimelineStep {
  key: string;
  label: string;
  date: string;
  done: boolean;
}

export interface ReturnRequest {
  id: string;
  item: string;
  status: "processing" | "delivered";
}

export interface WishlistItem {
  id: string;
  title: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: string;
  reviews: number;
  illustration: Illustration;
}

export interface AccountAddress {
  id: string;
  title: string;
  isDefault: boolean;
  line: string;
  postalCode: string;
  recipient: string;
  mobile: string;
}

export interface WalletTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
}

export interface AccountReview {
  id: string;
  product: string;
  status: "approved" | "pending";
  body: string;
  illustration: Illustration;
}

export interface AccountMessage {
  id: string;
  title: string;
  body: string;
  time: string;
  unread: boolean;
}

export const accountProfile: AccountProfile = {
  firstName: "علی",
  lastName: "رضایی",
  fullName: "علی رضایی",
  mobile: "۰۹۱۲۳۴۵۶۷۸۹",
  nationalId: "۰۰۱۲۳۴۵۶۷۸",
  email: "ali@example.com",
  birthDate: "۱۳۷۰/۰۵/۱۲",
  gender: "male",
  newsletter: true,
  twoFactor: false,
  passwordChangedAt: "۱۴۰۵/۰۵/۱۰",
};

export const accountStats: AccountStats = {
  activeOrders: 2,
  wishlist: 5,
  walletBalance: 2_500_000,
};

export const accountOrders: AccountOrder[] = [
  {
    id: "100128",
    date: "۱۴۰۵/۰۸/۰۳",
    status: "awaiting-payment",
    amount: 89_900_000,
    paymentMethod: "آنلاین (درگاه بانکی)",
    shippingMethod: "ارسال عادی",
    subtotal: 98_500_000,
    discount: 8_600_000,
    shipping: 0,
    lines: [
      {
        title: "گوشی موبایل سامسونگ مدل Galaxy S26 Ultra",
        variant: "تیتانیوم مشکی · ۵۱۲ گیگابایت · تعداد ۱",
        quantity: 1,
        amount: 89_900_000,
        illustration: "phone",
      },
    ],
  },
  {
    id: "100094",
    date: "۱۴۰۵/۰۶/۲۷",
    status: "delivered",
    amount: 18_900_000,
    paymentMethod: "آنلاین (درگاه بانکی)",
    shippingMethod: "ارسال عادی",
    subtotal: 22_400_000,
    discount: 3_500_000,
    shipping: 0,
    lines: [
      {
        title: "هدفون سونی WH-1000XM6",
        variant: "مشکی · گارانتی ۱۸ ماهه اصالت · تعداد ۱",
        quantity: 1,
        amount: 18_900_000,
        illustration: "headphones",
      },
    ],
  },
  {
    id: "100041",
    date: "۱۴۰۵/۰۳/۱۲",
    status: "delivered",
    amount: 42_300_000,
    paymentMethod: "آنلاین (درگاه بانکی)",
    shippingMethod: "ارسال عادی",
    subtotal: 42_300_000,
    discount: 0,
    shipping: 0,
    lines: [
      {
        title: "تبلت لنوو Tab P12",
        variant: "خاکستری · ۲۵۶ گیگابایت · تعداد ۱",
        quantity: 1,
        amount: 42_300_000,
        illustration: "tablet",
      },
    ],
  },
  {
    id: "100020",
    date: "۱۴۰۴/۱۱/۱۸",
    status: "cancelled",
    amount: 3_200_000,
    paymentMethod: "آنلاین (درگاه بانکی)",
    shippingMethod: "ارسال عادی",
    subtotal: 3_200_000,
    discount: 0,
    shipping: 0,
    lines: [
      {
        title: "کابل شارژ",
        variant: "USB-C · ۲ متر · تعداد ۲",
        quantity: 2,
        amount: 3_200_000,
        illustration: "cable",
      },
    ],
  },
];

export const orderTimeline: OrderTimelineStep[] = [
  { key: "placed", label: "ثبت سفارش", date: "۱۴۰۵/۰۸/۰۳", done: true },
  { key: "paid", label: "پرداخت", date: "۱۴۰۵/۰۸/۰۳", done: true },
  { key: "preparing", label: "آماده‌سازی", date: "—", done: false },
  { key: "shipped", label: "ارسال", date: "—", done: false },
  { key: "delivered", label: "تحویل", date: "—", done: false },
];

export const accountReturns: ReturnRequest[] = [
  { id: "200012", item: "هدفون سونی WH-1000XM6", status: "processing" },
  { id: "200007", item: "کابل شارژ", status: "delivered" },
];

export const returnReasons = [
  "کالا معیوب است",
  "کالای اشتباه ارسال شده",
  "با توضیحات محصول مطابقت ندارد",
  "انصراف از خرید",
];

export const wishlistItems: WishlistItem[] = [
  {
    id: "samsung-s26-ultra",
    title: "گوشی سامسونگ Galaxy S26 Ultra",
    price: 89_900_000,
    oldPrice: 98_500_000,
    discount: "۹٪ تخفیف",
    rating: "۴٫۸",
    reviews: 214,
    illustration: "phone",
  },
  {
    id: "samsung-s26",
    title: "گوشی سامسونگ Galaxy S26",
    price: 64_800_000,
    rating: "۴٫۶",
    reviews: 138,
    illustration: "phone",
  },
  {
    id: "samsung-a57",
    title: "گوشی سامسونگ Galaxy A57",
    price: 24_200_000,
    oldPrice: 26_900_000,
    discount: "۱۰٪ تخفیف",
    rating: "۴٫۳",
    reviews: 96,
    illustration: "phone",
  },
  {
    id: "samsung-flip-7",
    title: "گوشی سامسونگ Galaxy Z Flip 7",
    price: 71_500_000,
    rating: "۴٫۵",
    reviews: 57,
    illustration: "phone",
  },
  {
    id: "samsung-s25-fe",
    title: "گوشی سامسونگ Galaxy S25 FE",
    price: 38_600_000,
    oldPrice: 43_900_000,
    discount: "۱۲٪ تخفیف",
    rating: "۴٫۴",
    reviews: 81,
    illustration: "phone",
  },
  {
    id: "samsung-a17",
    title: "گوشی سامسونگ Galaxy A17",
    price: 12_400_000,
    rating: "۴٫۱",
    reviews: 162,
    illustration: "phone",
  },
];

export const accountAddresses: AccountAddress[] = [
  {
    id: "home",
    title: "منزل",
    isDefault: true,
    line: "تهران، خیابان ولیعصر، پلاک ۱۲۳، واحد ۴",
    postalCode: "۱۲۳۴۵۶۷۸۹۰",
    recipient: "علی رضایی",
    mobile: "۰۹۱۲۳۴۵۶۷۸۹",
  },
  {
    id: "work",
    title: "محل کار",
    isDefault: false,
    line: "تهران، خیابان شریعتی، پلاک ۴۵، طبقه ۲",
    postalCode: "۱۹۸۷۶۵۴۳۲۱",
    recipient: "علی رضایی",
    mobile: "۰۹۱۲۳۴۵۶۷۸۹",
  },
];

export const walletTransactions: WalletTransaction[] = [
  {
    id: "tx-1",
    title: "شارژ کیف پول",
    date: "۱۴۰۵/۰۸/۰۱",
    amount: 3_000_000,
  },
  {
    id: "tx-2",
    title: "پرداخت سفارش ۱۰۰۰۹۴",
    date: "۱۴۰۵/۰۶/۲۷",
    amount: -500_000,
  },
  {
    id: "tx-3",
    title: "بازگشت وجه مرجوعی",
    date: "۱۴۰۵/۰۶/۱۰",
    amount: 18_900_000,
  },
];

export const accountReviews: AccountReview[] = [
  {
    id: "review-1",
    product: "گوشی سامسونگ Galaxy S26 Ultra",
    status: "approved",
    body: "کیفیت ساخت و دوربین عالی است.",
    illustration: "phone",
  },
  {
    id: "review-2",
    product: "هدفون سونی WH-1000XM6",
    status: "pending",
    body: "نویزکنسلینگ خوب، ولی بالشتک کمی سفت است.",
    illustration: "headphones",
  },
];

export const accountMessages: AccountMessage[] = [
  {
    id: "msg-1",
    title: "سفارش ۱۰۰۱۲۸ ثبت شد",
    body: "پرداخت شما در انتظار تأیید است.",
    time: "امروز ۱۰:۲۰",
    unread: true,
  },
  {
    id: "msg-2",
    title: "کد تخفیف WINTER40",
    body: "تا پایان آذر قابل استفاده است.",
    time: "دیروز",
    unread: true,
  },
  {
    id: "msg-3",
    title: "مرجوعی ۲۰۰۰۱۲ در حال بررسی است",
    body: "نتیجه تا ۲ روز کاری اعلام می‌شود.",
    time: "۳ روز پیش",
    unread: false,
  },
];

export const orderStatusLabels: Record<OrderStatus, string> = {
  "awaiting-payment": "در انتظار پرداخت",
  processing: "در حال پردازش",
  shipped: "ارسال‌شده",
  delivered: "تحویل شد",
  cancelled: "لغوشده",
};

export type OrderFilter = "all" | OrderStatus;

export const orderFilters: { value: OrderFilter; label: string }[] = [
  { value: "all", label: "همه" },
  { value: "awaiting-payment", label: "در انتظار پرداخت" },
  { value: "processing", label: "در حال پردازش" },
  { value: "shipped", label: "ارسال‌شده" },
  { value: "delivered", label: "تحویل‌شده" },
  { value: "cancelled", label: "لغو شده" },
];

export function filterOrders(
  orders: AccountOrder[],
  filter: OrderFilter,
): AccountOrder[] {
  if (filter === "all") return orders;
  return orders.filter((order) => order.status === filter);
}

export function findOrder(id: string): AccountOrder | undefined {
  return accountOrders.find((order) => order.id === id);
}

/** Signed wallet amount, e.g. `+۳٬۰۰۰٬۰۰۰ تومان`. */
export function formatWalletAmount(amount: number): string {
  const formatted = formatToman(Math.abs(amount));
  return `${amount < 0 ? "−" : "+"}${formatted}`;
}

/** Persian digits without grouping, for identifiers such as order numbers. */
export function formatIdentifier(value: string | number): string {
  return String(value).replace(
    /[0-9]/g,
    (digit) => "۰۱۲۳۴۵۶۷۸۹"[Number(digit)],
  );
}

export function orderCountLabel(count: number): string {
  return `${count.toLocaleString("fa-IR")} سفارش`;
}
