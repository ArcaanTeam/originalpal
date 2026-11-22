export type OrderStatus =
  "processing" | "shipped" | "completed" | "pending_payment";

export interface OrderItem {
  product: string;
  qty: number;
  unitPrice: number;
  amount: number;
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
  shippingAddress: string;
  paymentMethod: string;
  notes: string;
}

export type ReturnStatus = "pending" | "approved" | "rejected" | "completed";

export interface ReturnItem {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  amount: number;
  status: ReturnStatus;
}

export type TransactionType = "charge" | "refund" | "purchase";

export type TransactionStatus = "success" | "failed" | "pending";

export interface Transaction {
  id: string;
  customer: string;
  type: TransactionType;
  amount: number;
  date: string;
  status: TransactionStatus;
}

export type ShippingStatus = "pending" | "shipped" | "delivered" | "returned";

export interface Shipment {
  id: string;
  carrier: string;
  shippedAt: string;
  tracking: string;
  status: ShippingStatus;
}

export const orders: Order[] = [
  {
    id: "OP-1048",
    customer: "رضا احمدی",
    date: "۱۴۰۵/۰۸/۲۹",
    total: 1250000,
    status: "processing",
    items: [
      {
        product: "هدفون بی‌سیم سونی",
        qty: 1,
        unitPrice: 1250000,
        amount: 1250000,
      },
    ],
    shippingAddress: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    paymentMethod: "کارت به کارت",
    notes: "",
  },
  {
    id: "OP-1047",
    customer: "سارا محمدی",
    date: "۱۴۰۵/۰۸/۲۸",
    total: 23890000,
    status: "shipped",
    items: [
      {
        product: "گوشی سامسونگ Galaxy A55",
        qty: 1,
        unitPrice: 23890000,
        amount: 23890000,
      },
    ],
    shippingAddress: "تهران، خیابان unit، پلاک ۴۵",
    paymentMethod: "پرداخت آنلاین",
    notes: "",
  },
  {
    id: "OP-1046",
    customer: "علی رضایی",
    date: "۱۴۰۵/۰۸/۲۷",
    total: 15600000,
    status: "completed",
    items: [
      {
        product: "ساعت هوشمند اپل SE",
        qty: 1,
        unitPrice: 15600000,
        amount: 15600000,
      },
    ],
    shippingAddress: "اصفهان، خیابان چهارباغ، پلاک ۷",
    paymentMethod: "کارت به کارت",
    notes: "",
  },
  {
    id: "OP-1045",
    customer: "مریم حسینی",
    date: "۱۴۰۵/۰۸/۲۶",
    total: 6290000,
    status: "pending_payment",
    items: [
      {
        product: "اسپیکر JBL Flip 6",
        qty: 1,
        unitPrice: 6290000,
        amount: 6290000,
      },
    ],
    shippingAddress: "شیراز، خیابان زند، پلاک ۱۰۱",
    paymentMethod: "پرداخت عند دریافت",
    notes: "",
  },
];

export const returns: ReturnItem[] = [
  {
    id: "RT-2001",
    orderId: "OP-1047",
    customer: "سارا محمدی",
    date: "۱۴۰۵/۰۹/۰۱",
    amount: 23890000,
    status: "pending",
  },
  {
    id: "RT-2002",
    orderId: "OP-1045",
    customer: "مریم حسینی",
    date: "۱۴۰۵/۰۹/۰۲",
    amount: 6290000,
    status: "approved",
  },
  {
    id: "RT-2003",
    orderId: "OP-1048",
    customer: "رضا احمدی",
    date: "۱۴۰۵/۰۹/۰۳",
    amount: 1250000,
    status: "rejected",
  },
  {
    id: "RT-2004",
    orderId: "OP-1046",
    customer: "علی رضایی",
    date: "۱۴۰۵/۰۹/۰۴",
    amount: 15600000,
    status: "completed",
  },
];

export const transactions: Transaction[] = [
  {
    id: "TX-3001",
    customer: "رضا احمدی",
    type: "charge",
    amount: 2000000,
    date: "۱۴۰۵/۰۹/۰۱ ۱۰:۱۵",
    status: "success",
  },
  {
    id: "TX-3002",
    customer: "سارا محمدی",
    type: "refund",
    amount: 23890000,
    date: "۱۴۰۵/۰۹/۰۲ ۱۴:۳۰",
    status: "success",
  },
  {
    id: "TX-3003",
    customer: "علی رضایی",
    type: "purchase",
    amount: 15600000,
    date: "۱۴۰۵/۰۹/۰۳ ۰۹:۴۵",
    status: "success",
  },
  {
    id: "TX-3004",
    customer: "مریم حسینی",
    type: "purchase",
    amount: 6290000,
    date: "۱۴۰۵/۰۹/۰۴ ۱۱:۲۰",
    status: "pending",
  },
];

export const shipments: Shipment[] = [
  {
    id: "SH-4001",
    carrier: "پست ایران",
    shippedAt: "۱۴۰۵/۰۹/۰۱",
    tracking: "POST123456789IR",
    status: "delivered",
  },
  {
    id: "SH-4002",
    carrier: "تیپاکس",
    shippedAt: "۱۴۰۵/۰۹/۰۲",
    tracking: "TPK987654321",
    status: "shipped",
  },
  {
    id: "SH-4003",
    carrier: "پست ایران",
    shippedAt: "۱۴۰۵/۰۹/۰۳",
    tracking: "POST456789123IR",
    status: "pending",
  },
  {
    id: "SH-4004",
    carrier: "اسناپ",
    shippedAt: "۱۴۰۵/۰۹/۰۴",
    tracking: "SNP789123456",
    status: "returned",
  },
];

export function findOrder(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}

export function findReturn(id: string): ReturnItem | undefined {
  return returns.find((item) => item.id === id);
}

export function formatToman(value: number): string {
  return value.toLocaleString("fa-IR");
}
