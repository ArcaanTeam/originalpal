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

export type ProductStatus = "active" | "draft" | "archived";

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  brand: string;
  price: number;
  stock: number;
  status: ProductStatus;
}

export const products: Product[] = [
  {
    id: "PR-5001",
    name: "گوشی سامسونگ Galaxy A55",
    sku: "SAM-A55-128",
    category: "موبایل",
    brand: "سامسونگ",
    price: 23890000,
    stock: 42,
    status: "active",
  },
  {
    id: "PR-5002",
    name: "هدفون بی‌سیم سونی WH-1000XM5",
    sku: "SONY-WH1000XM5",
    category: "صوت و تصویر",
    brand: "سونی",
    price: 15500000,
    stock: 18,
    status: "active",
  },
  {
    id: "PR-5003",
    name: "ساعت هوشمند اپل SE",
    sku: "APPLE-WATCH-SE",
    category: "ساعت هوشمند",
    brand: "اپل",
    price: 15600000,
    stock: 6,
    status: "active",
  },
  {
    id: "PR-5004",
    name: "اسپیکر JBL Flip 6",
    sku: "JBL-FLIP-6",
    category: "صوت و تصویر",
    brand: "JBL",
    price: 6290000,
    stock: 0,
    status: "archived",
  },
  {
    id: "PR-5005",
    name: "لپ‌تاپ ایسوس ZenBook 14",
    sku: "ASUS-ZENBOOK-14",
    category: "لپ‌تاپ",
    brand: "اسوس",
    price: 72500000,
    stock: 3,
    status: "draft",
  },
];

export type CategoryStatus = "active" | "inactive";

export interface Category {
  id: string;
  name: string;
  productCount: number;
  status: CategoryStatus;
}

export const categories: Category[] = [
  { id: "CT-6001", name: "موبایل", productCount: 142, status: "active" },
  { id: "CT-6002", name: "لپ‌تاپ", productCount: 87, status: "active" },
  { id: "CT-6003", name: "صوت و تصویر", productCount: 53, status: "active" },
  { id: "CT-6004", name: "ساعت هوشمند", productCount: 29, status: "inactive" },
];

export type BrandStatus = "active" | "inactive";

export interface Brand {
  id: string;
  name: string;
  productCount: number;
  status: BrandStatus;
}

export const brands: Brand[] = [
  { id: "BR-7001", name: "سامسونگ", productCount: 38, status: "active" },
  { id: "BR-7002", name: "سونی", productCount: 24, status: "active" },
  { id: "BR-7003", name: "اپل", productCount: 31, status: "active" },
  { id: "BR-7004", name: "JBL", productCount: 12, status: "inactive" },
];

export interface Attribute {
  id: string;
  name: string;
  type: "text" | "number" | "select";
  filterable: boolean;
}

export const attributes: Attribute[] = [
  { id: "AT-8001", name: "رنگ", type: "select", filterable: true },
  { id: "AT-8002", name: "حافظه داخلی", type: "number", filterable: true },
  { id: "AT-8003", name: "وزن", type: "number", filterable: false },
  { id: "AT-8004", name: "گارانتی (ماه)", type: "number", filterable: true },
];

export interface InventoryItem {
  id: string;
  product: string;
  stock: number;
  minStock: number;
  status: "ok" | "low" | "out";
}

export const inventory: InventoryItem[] = [
  {
    id: "IN-9001",
    product: "گوشی سامسونگ Galaxy A55",
    stock: 42,
    minStock: 10,
    status: "ok",
  },
  {
    id: "IN-9002",
    product: "هدفون بی‌سیم سونی WH-1000XM5",
    stock: 18,
    minStock: 5,
    status: "ok",
  },
  {
    id: "IN-9003",
    product: "ساعت هوشمند اپل SE",
    stock: 6,
    minStock: 10,
    status: "low",
  },
  {
    id: "IN-9004",
    product: "اسپیکر JBL Flip 6",
    stock: 0,
    minStock: 5,
    status: "out",
  },
  {
    id: "IN-9005",
    product: "لپ‌تاپ ایسوس ZenBook 14",
    stock: 3,
    minStock: 5,
    status: "low",
  },
];

export function findOrder(id: string): Order | undefined {
  return orders.find((order) => order.id === id);
}

export function findReturn(id: string): ReturnItem | undefined {
  return returns.find((item) => item.id === id);
}

export function findProduct(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function findCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function findBrand(id: string): Brand | undefined {
  return brands.find((brand) => brand.id === id);
}

export function findAttribute(id: string): Attribute | undefined {
  return attributes.find((attribute) => attribute.id === id);
}

export function formatToman(value: number): string {
  return value.toLocaleString("fa-IR");
}
