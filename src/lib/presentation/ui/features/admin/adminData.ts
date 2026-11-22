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

export type CustomerStatus = "active" | "blocked" | "inactive";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  registeredAt: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string | null;
  address: string;
  status: CustomerStatus;
}

export const customers: Customer[] = [
  {
    id: "CU-1001",
    name: "رضا احمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    email: "reza@example.com",
    registeredAt: "۱۴۰۵/۰۱/۱۵",
    totalOrders: 12,
    totalSpent: 45000000,
    lastOrder: "۱۴۰۵/۰۸/۲۹",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    status: "active",
  },
  {
    id: "CU-1002",
    name: "سارا محمدی",
    phone: "۰۹۱۲۳۴۵۶۷۸۰",
    email: "sara@example.com",
    registeredAt: "۱۴۰۵/۰۳/۲۰",
    totalOrders: 7,
    totalSpent: 31000000,
    lastOrder: "۱۴۰۵/۰۹/۰۲",
    address: "تهران، خیابانvale، پلاک ۴۵",
    status: "active",
  },
  {
    id: "CU-1003",
    name: "علی رضایی",
    phone: "۰۹۱۲۳۴۵۶۷۸۱",
    email: "ali@example.com",
    registeredAt: "۱۴۰۵/۰۵/۰۵",
    totalOrders: 3,
    totalSpent: 18500000,
    lastOrder: "۱۴۰۵/۰۸/۲۷",
    address: "اصفهان، خیابان چهارباغ، پلاک ۷",
    status: "blocked",
  },
  {
    id: "CU-1004",
    name: "مریم حسینی",
    phone: "۰۹۱۲۳۴۵۶۷۸۲",
    email: "maryam@example.com",
    registeredAt: "۱۴۰۵/۰۶/۱۰",
    totalOrders: 5,
    totalSpent: 26000000,
    lastOrder: null,
    address: "شیراز، خیابان زند، پلاک ۱۰۱",
    status: "inactive",
  },
];

export interface CustomerOrderSummary {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
}

export const customerOrders: Record<string, CustomerOrderSummary[]> = {
  "CU-1001": [
    { id: "OP-1048", date: "۱۴۰۵/۰۸/۲۹", total: 1250000, status: "processing" },
    { id: "OP-1046", date: "۱۴۰۵/۰۸/۲۷", total: 15600000, status: "completed" },
    { id: "OP-1001", date: "۱۴۰۵/۰۷/۱۰", total: 8500000, status: "completed" },
  ],
  "CU-1002": [
    { id: "OP-1047", date: "۱۴۰۵/۰۹/۰۲", total: 23890000, status: "shipped" },
    { id: "OP-1002", date: "۱۴۰۵/۰۸/۱۵", total: 5200000, status: "completed" },
  ],
  "CU-1003": [
    { id: "OP-1003", date: "۱۴۰۵/۰۸/۲۷", total: 18500000, status: "completed" },
  ],
  "CU-1004": [],
};

export type ReviewStatus = "pending" | "approved" | "rejected";

export interface Review {
  id: string;
  product: string;
  customer: string;
  rating: number;
  status: ReviewStatus;
  date: string;
}

export const reviews: Review[] = [
  {
    id: "RV-3001",
    product: "گوشی سامسونگ Galaxy A55",
    customer: "رضا احمدی",
    rating: 5,
    status: "pending",
    date: "۱۴۰۵/۰۹/۰۳",
  },
  {
    id: "RV-3002",
    product: "هدفون بی‌سیم سونی WH-1000XM5",
    customer: "سارا محمدی",
    rating: 4,
    status: "approved",
    date: "۱۴۰۵/۰۹/۰۲",
  },
  {
    id: "RV-3003",
    product: "ساعت هوشمند اپل SE",
    customer: "علی رضایی",
    rating: 3,
    status: "rejected",
    date: "۱۴۰۵/۰۹/۰۱",
  },
  {
    id: "RV-3004",
    product: "اسپیکر JBL Flip 6",
    customer: "مریم حسینی",
    rating: 5,
    status: "pending",
    date: "۱۴۰۵/۰۹/۰۴",
  },
];

export type TicketStatus = "open" | "in_progress" | "closed";

export type TicketPriority = "low" | "medium" | "high";

export interface Ticket {
  id: string;
  customer: string;
  subject: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}

export const tickets: Ticket[] = [
  {
    id: "TK-4001",
    customer: "رضا احمدی",
    subject: "بعد از ۳ روز هنوز سفارش ارسال نشده است.",
    priority: "high",
    status: "open",
    createdAt: "۱۴۰۵/۰۹/۰۵",
  },
  {
    id: "TK-4002",
    customer: "سارا محمدی",
    subject: "درخواست مرجوعی کالا معتبر نیست.",
    priority: "medium",
    status: "in_progress",
    createdAt: "۱۴۰۵/۰۹/۰۴",
  },
  {
    id: "TK-4003",
    customer: "علی رضایی",
    subject: "مشکل در ورود به حساب کاربری.",
    priority: "low",
    status: "closed",
    createdAt: "۱۴۰۵/۰۹/۰۳",
  },
  {
    id: "TK-4004",
    customer: "مریم حسینی",
    subject: "درخواست فاکتور برای استعلام مالی.",
    priority: "medium",
    status: "open",
    createdAt: "۱۴۰۵/۰۹/۰۴",
  },
];

export interface TicketMessage {
  id: string;
  sender: "customer" | "support";
  content: string;
  createdAt: string;
}

export const ticketMessages: Record<string, TicketMessage[]> = {
  "TK-4001": [
    {
      id: "MSG-1",
      sender: "customer",
      content:
        "سفارش منOP-1047 را ۳ روز قبل ثبت کردم اما هنوز وضعیت آن 'در حال پردازش' است. لطفاً وضعیت ارسال را به من اطلاع دهید.",
      createdAt: "۱۴۰۵/۰۹/۰۵ ۱۰:۱۵",
    },
    {
      id: "MSG-2",
      sender: "support",
      content:
        "سلام، سفارش شما بررسی شده و امروز ارسال شده است. کد پیگیری را به شما ارسال می‌کنیم.",
      createdAt: "۱۴۰۵/۰۹/۰۵ ۱۱:۳۰",
    },
  ],
  "TK-4002": [
    {
      id: "MSG-3",
      sender: "customer",
      content: "مرجوعی مرا تایید نکردید. لطفاً دلیل را توضیح دهید.",
      createdAt: "۱۴۰۵/۰۹/۰۴ ۰۹:۰۰",
    },
  ],
  "TK-4003": [],
  "TK-4004": [
    {
      id: "MSG-4",
      sender: "customer",
      content: "برای استعلام مالی به فاکتور سفارش OP-1046 نیاز دارم.",
      createdAt: "۱۴۰۵/۰۹/۰۴ ۱۴:۰۰",
    },
  ],
};

export function findCustomer(id: string): Customer | undefined {
  return customers.find((customer) => customer.id === id);
}

export function findReview(id: string): Review | undefined {
  return reviews.find((review) => review.id === id);
}

export function findTicket(id: string): Ticket | undefined {
  return tickets.find((ticket) => ticket.id === id);
}

export type CouponStatus = "active" | "expired" | "draft";

export interface Coupon {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrder: number;
  maxUsage: number;
  expiresAt: string;
  status: CouponStatus;
  usageCount: number;
}

export const coupons: Coupon[] = [
  {
    id: "CP-1001",
    code: "WELCOME10",
    type: "percent",
    value: 10,
    minOrder: 500000,
    maxUsage: 1000,
    expiresAt: "۱۴۰۶/۰۱/۰۱",
    status: "active",
    usageCount: 245,
  },
  {
    id: "CP-1002",
    code: "SUMMER25",
    type: "percent",
    value: 25,
    minOrder: 1000000,
    maxUsage: 500,
    expiresAt: "۱۴۰۵/۱۲/۳۰",
    status: "active",
    usageCount: 189,
  },
  {
    id: "CP-1003",
    code: "FIRST50K",
    type: "fixed",
    value: 50000,
    minOrder: 300000,
    maxUsage: 1,
    expiresAt: "۱۴۰۵/۱۰/۱۵",
    status: "expired",
    usageCount: 1,
  },
  {
    id: "CP-1004",
    code: "BLACKFRIDAY40",
    type: "percent",
    value: 40,
    minOrder: 2000000,
    maxUsage: 200,
    expiresAt: "۱۴۰۵/۱۱/۲۵",
    status: "draft",
    usageCount: 0,
  },
];

export type BannerStatus = "active" | "inactive" | "scheduled";

export interface Banner {
  id: string;
  title: string;
  location: "home" | "category" | "product";
  imageUrl: string;
  linkUrl: string;
  startsAt: string;
  endsAt: string;
  status: BannerStatus;
}

export const banners: Banner[] = [
  {
    id: "BN-2001",
    title: "جشنواره زمستانه تا ۴۰٪ تخفیف",
    location: "home",
    imageUrl: "/assets/banners/winter-sale.jpg",
    linkUrl: "/store/deals",
    startsAt: "۱۴۰۵/۱۲/۰۱",
    endsAt: "۱۴۰۶/۰۲/۲۸",
    status: "active",
  },
  {
    id: "BN-2002",
    title: "لancement محصول جدید سامسونگ",
    location: "category",
    imageUrl: "/assets/banners/samsung-launch.jpg",
    linkUrl: "/store/category/mobile",
    startsAt: "۱۴۰۵/۱۱/۱۵",
    endsAt: "۱۴۰۵/۱۲/۱۵",
    status: "scheduled",
  },
  {
    id: "BN-2003",
    title: "بسته‌های ویژه صوت و تصویر",
    location: "product",
    imageUrl: "/assets/banners/audio-bundle.jpg",
    linkUrl: "/store/category/audio",
    startsAt: "۱۴۰۵/۱۰/۰۱",
    endsAt: "۱۴۰۵/۱۱/۳۰",
    status: "inactive",
  },
];

export function findCoupon(id: string): Coupon | undefined {
  return coupons.find((coupon) => coupon.id === id);
}

export function findBanner(id: string): Banner | undefined {
  return banners.find((banner) => banner.id === id);
}

/* ═══════════════════════════════════════════════════════════════
   SEO (سئو) — Attachment 16
   ═══════════════════════════════════════════════════════════════ */

export type RedirectType = "301" | "302";

export interface Redirect {
  id: string;
  source: string;
  destination: string;
  type: RedirectType;
  visits: number;
  createdAt: string;
}

export const redirects: Redirect[] = [
  {
    id: "RD-3001",
    source: "/old-product",
    destination: "/product/samsung-galaxy-s26-ultra",
    type: "301",
    visits: 420,
    createdAt: "۱۴۰۵/۰۸/۲۰",
  },
  {
    id: "RD-3002",
    source: "/mobile",
    destination: "/category/mobile-phone",
    type: "301",
    visits: 210,
    createdAt: "۱۴۰۵/۰۸/۲۲",
  },
  {
    id: "RD-3003",
    source: "/blog/old-guide",
    destination: "/blog/flagship-phone-buying-guide",
    type: "301",
    visits: 136,
    createdAt: "۱۴۰۵/۰۸/۲۵",
  },
  {
    id: "RD-3004",
    source: "/sale",
    destination: "/campaign/winter",
    type: "302",
    visits: 88,
    createdAt: "۱۴۰۵/۰۸/۲۸",
  },
];

export interface NotFound404 {
  id: string;
  path: string;
  visits: number;
  lastVisited: string;
  actionLabel: string;
}

export const notFound404s: NotFound404[] = [
  {
    id: "NF-4001",
    path: "/products/samsung-s26",
    visits: 61,
    lastVisited: "امروز",
    actionLabel: "ساخت ریدایرکت",
  },
  {
    id: "NF-4002",
    path: "/blog/phone-guide-2025",
    visits: 38,
    lastVisited: "دیروز",
    actionLabel: "ساخت ریدایرکت",
  },
  {
    id: "NF-4003",
    path: "/category/mobiles",
    visits: 24,
    lastVisited: "۳ روز پیش",
    actionLabel: "ساخت ریدایرکت",
  },
];

export type CoreWebVitalStatus = "good" | "needs-improvement" | "poor";

export interface CoreWebVitals {
  lcp: { value: string; status: CoreWebVitalStatus; target: string };
  inp: { value: string; status: CoreWebVitalStatus; target: string };
  cls: { value: string; status: CoreWebVitalStatus; target: string };
}

export const coreWebVitals: CoreWebVitals = {
  lcp: { value: "۲٫۱ ثانیه", status: "good", target: "زیر ۲٫۵ ثانیه" },
  inp: {
    value: "۱۸۰ میلی‌ثانیه",
    status: "good",
    target: "زیر ۲۰۰ میلی‌ثانیه",
  },
  cls: { value: "۰٫۰۸", status: "good", target: "زیر ۰٫۱" },
};

export type SeoIssueSeverity = "critical" | "needs-improvement" | "info";

export interface SeoIssue {
  id: string;
  title: string;
  count: number;
  severity: SeoIssueSeverity;
  status: string;
}

export const seoIssues: SeoIssue[] = [
  {
    id: "SI-5001",
    title: "صفحه بدون توضیحات متا",
    count: 14,
    severity: "needs-improvement",
    status: "نصب به بهبود",
  },
  {
    id: "SI-5002",
    title: "تصویر بدون متن جایگزین (Alt)",
    count: 9,
    severity: "needs-improvement",
    status: "نصب به بهبود",
  },
  {
    id: "SI-5003",
    title: "صفحه با عنوان سئو تکراری",
    count: 3,
    severity: "needs-improvement",
    status: "نصب به بهبود",
  },
  {
    id: "SI-5004",
    title: "لینک شکسته داخلی",
    count: 12,
    severity: "critical",
    status: "بحرانی",
  },
  {
    id: "SI-5005",
    title: "صفحه با وضعیت Noindex",
    count: 6,
    severity: "info",
    status: "اطلاع",
  },
];

export interface SitemapFile {
  file: string;
  count: number;
  lastGenerated: string;
}

export const sitemapFiles: SitemapFile[] = [
  { file: "sitemap-products.xml", count: 1280, lastGenerated: "۱۴۰۵/۰۸/۰۴" },
  { file: "sitemap-categories.xml", count: 148, lastGenerated: "۱۴۰۵/۰۸/۰۴" },
  { file: "sitemap-blog.xml", count: 36, lastGenerated: "۱۴۰۵/۰۸/۰۴" },
  { file: "sitemap-pages.xml", count: 40, lastGenerated: "۱۴۰۵/۰۸/۰۴" },
];

export interface SchemaType {
  id: string;
  name: string;
  pages: number;
  status: string;
}

export const schemas: SchemaType[] = [
  { id: "SC-6001", name: "محصول (Product)", pages: 1280, status: "فعال" },
  { id: "SC-6002", name: "مقاله (Article)", pages: 36, status: "فعال" },
  {
    id: "SC-6003",
    name: "دسته‌بندی (BreadcrumbList)",
    pages: 148,
    status: "فعال",
  },
  { id: "SC-6004", name: "संगठن (Organization)", pages: 1, status: "غیرفعال" },
];

export interface BrokenLink {
  id: string;
  url: string;
  statusCode: number;
  type: "internal" | "external";
  foundIn: string;
  actionLabel: string;
}

export const brokenLinks: BrokenLink[] = [
  {
    id: "BL-7001",
    url: "/product/old-samsung-s24",
    statusCode: 404,
    type: "internal",
    foundIn: "مقاله: راهنمای خرید گوشی پرچم‌دار",
    actionLabel: "ساخت ریدایرکت",
  },
  {
    id: "BL-7002",
    url: "/category/tablets-old",
    statusCode: 404,
    type: "internal",
    foundIn: "صفحه اصلی",
    actionLabel: "ساخت ریدایرکت",
  },
  {
    id: "BL-7003",
    url: "https://example-store.test/review",
    statusCode: 404,
    type: "external",
    foundIn: "مقاله: نقد هدفون سونی",
    actionLabel: "ساخت ریدایرکت",
  },
  {
    id: "BL-7004",
    url: "/blog/removed-post",
    statusCode: 410,
    type: "internal",
    foundIn: "محصول: هدفون سونی WH-1000XM6",
    actionLabel: "ساخت ریدایرکت",
  },
  {
    id: "BL-7005",
    url: "https://partner.test/page",
    statusCode: 408,
    type: "external",
    foundIn: "مقاله: چطور اصالت را تشخیص دهیم؟",
    actionLabel: "ساخت ریدایرکت",
  },
];

export interface InternalLink {
  id: string;
  source: string;
  target: string;
  anchor: string;
  clicks: number;
}

export const internalLinks: InternalLink[] = [
  {
    id: "IL-8001",
    source: "/store",
    target: "/category/mobile",
    anchor: "گوشی موبایل",
    clicks: 1240,
  },
  {
    id: "IL-8002",
    source: "/store",
    target: "/category/audio",
    anchor: "صوت و تصویر",
    clicks: 870,
  },
  {
    id: "IL-8003",
    source: "/blog/flagship-phone-buying-guide",
    target: "/product/samsung-galaxy-s26-ultra",
    anchor: "مراجعة گوشی پرچم‌دار",
    clicks: 560,
  },
];

export interface Connection {
  id: string;
  name: string;
  status: "connected" | "disconnected";
  lastSync?: string;
}

export const connections: Connection[] = [
  {
    id: "CN-9001",
    name: "Google Search Console",
    status: "connected",
    lastSync: "امروز ۰۹:۳۰",
  },
  {
    id: "CN-9002",
    name: "Google Analytics 4",
    status: "connected",
    lastSync: "امروز ۰۹:۳۰",
  },
];

export function findRedirect(id: string): Redirect | undefined {
  return redirects.find((redirect) => redirect.id === id);
}

export function findBrokenLink(id: string): BrokenLink | undefined {
  return brokenLinks.find((brokenLink) => brokenLink.id === id);
}

export function formatToman(value: number): string {
  return value.toLocaleString("fa-IR");
}
