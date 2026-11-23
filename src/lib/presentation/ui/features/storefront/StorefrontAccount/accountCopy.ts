export type AccountSection =
  | "profile"
  | "orders"
  | "returns"
  | "wishlist"
  | "addresses"
  | "wallet"
  | "reviews"
  | "messages";

export interface AccountNavItem {
  section: AccountSection;
  href: string;
  label: string;
}

export const accountNavItems: AccountNavItem[] = [
  { section: "profile", href: "/account/profile", label: "اطلاعات حساب" },
  { section: "orders", href: "/account/orders", label: "سفارش‌های من" },
  { section: "returns", href: "/account/returns", label: "مرجوعی‌ها" },
  { section: "wishlist", href: "/account/wishlist", label: "علاقه‌مندی‌ها" },
  { section: "addresses", href: "/account/addresses", label: "آدرس‌ها" },
  { section: "wallet", href: "/account/wallet", label: "کیف پول" },
  { section: "reviews", href: "/account/reviews", label: "دیدگاه‌ها" },
  { section: "messages", href: "/account/messages", label: "پیام‌ها" },
];

export const accountCopy = {
  title: "حساب من",
  breadcrumbRoot: "خانه",
  breadcrumbAccount: "حساب من",
  back: "بازگشت",
  logout: "خروج از حساب",
  logoutHint: "خروج از حساب پس از اتصال سرویس حساب کاربری فعال می‌شود.",
  saveButton: "ذخیره تغییرات",
  cancelButton: "انصراف",
  emptyState: "هنوز موردی در این بخش ثبت نشده است.",
  sections: {
    profile: {
      mobileTitle: "اطلاعات حساب",
      desktopTitle: "اطلاعات حساب کاربری",
      breadcrumb: "اطلاعات حساب",
      personalInfo: "اطلاعات شخصی",
      security: "امنیت حساب",
      stats: {
        activeOrders: "سفارش‌های جاری",
        wishlist: "علاقه‌مندی‌ها",
        wallet: "موجودی کیف پول",
      },
      fields: {
        firstName: "نام",
        lastName: "نام خانوادگی",
        nationalId: "کد ملی",
        mobile: "شماره موبایل",
        verified: "تأیید شده",
        email: "ایمیل",
        birthDate: "تاریخ تولد",
        gender: "جنسیت",
        male: "مرد",
        female: "زن",
        newsletter: "دریافت خبرنامه و پیشنهادهای ویژه",
        newsletterHint: "پیامک و ایمیل",
        password: "رمز عبور",
        passwordChangedAt: "آخرین تغییر:",
        changePassword: "تغییر رمز عبور",
        twoFactor: "ورود دو مرحله‌ای",
        twoFactorHint: "برای امنیت بیشتر هنگام ورود، کد تأیید دریافت کنید",
      },
      savedNotice: "تغییرات پس از اتصال سرویس حساب کاربری ذخیره می‌شود.",
    },
    orders: {
      desktopTitle: "سفارش‌های من",
      mobileTitle: "سفارش‌های من",
      breadcrumb: "سفارش‌های من",
      details: "جزئیات سفارش",
      pay: "پرداخت سفارش",
      track: "پیگیری مرسوله",
      amountPrefix: "مبلغ:",
      emptyFiltered: "سفارشی با این وضعیت پیدا نشد.",
      orderPrefix: "سفارش",
    },
    orderDetail: {
      breadcrumbPrefix: "سفارش",
      mobileTitlePrefix: "سفارش",
      invoice: "دریافت فاکتور",
      pay: "پرداخت سفارش",
      timeline: "پیگیری سفارش",
      items: "اقلام سفارش",
      summary: "خلاصه پرداخت",
      delivery: "اطلاعات تحویل",
      subtotal: "جمع کالاها",
      discount: "تخفیف",
      shipping: "هزینه ارسال",
      payable: "مبلغ قابل پرداخت",
      paymentMethod: "روش پرداخت",
      recipient: "گیرنده",
      address: "نشانی",
      postalCode: "کدپستی",
      shippingMethod: "روش ارسال",
      free: "رایگان",
      notFound: "این سفارش پیدا نشد.",
    },
    returns: {
      desktopTitle: "مرجوعی‌ها",
      mobileTitle: "مرجوعی‌ها",
      breadcrumb: "مرجوعی‌ها",
      newRequest: "درخواست مرجوعی جدید",
      orderField: "سفارش",
      itemField: "کالا",
      reasonField: "دلیل مرجوعی",
      descriptionLabel: "توضیحات",
      uploadTitle: "افزودن تصویر یا ویدیو از مشکل",
      uploadHint: "یا کشیدن و رها کردن",
      imageLimit: "تصویر: حداکثر ۵ مگابایت · JPG، PNG یا WebP",
      videoLimit: "ویدیو: حداکثر ۵۰ مگابایت · MP4 یا WebM",
      fileLimit: "حداکثر ۵ فایل",
      deadline: "مهلت درخواست مرجوعی ۷ روز پس از تحویل است.",
      submit: "ثبت درخواست",
      submittedNotice:
        "ثبت درخواست مرجوعی پس از اتصال سرویس سفارش‌ها فعال می‌شود.",
      statusLabels: {
        processing: "در حال پردازش",
        delivered: "تحویل شد",
      },
    },
    wishlist: {
      desktopTitle: "علاقه‌مندی‌ها",
      mobileTitle: "علاقه‌مندی‌ها",
      breadcrumb: "علاقه‌مندی‌ها",
      removeAll: "حذف همه",
      empty: "لیست علاقه‌مندی‌های شما خالی است.",
      addToCart: "افزودن به سبد خرید",
      remove: "حذف از علاقه‌مندی‌ها",
      toman: "تومان",
    },
    addresses: {
      desktopTitle: "آدرس‌ها",
      mobileTitle: "آدرس‌ها",
      breadcrumb: "آدرس‌ها",
      addNew: "افزودن آدرس",
      defaultBadge: "پیش‌فرض",
      edit: "ویرایش",
      delete: "حذف",
      newTitle: "افزودن آدرس جدید",
      map: "انتخاب موقعیت روی نقشه",
      province: "استان",
      city: "شهر",
      fullAddress: "نشانی کامل",
      plaque: "پلاک",
      unit: "واحد",
      postalCode: "کدپستی",
      recipient: "نام گیرنده",
      mobile: "موبایل گیرنده",
      setDefault: "تنظیم به‌عنوان آدرس پیش‌فرض",
      save: "ذخیره آدرس",
      savedNotice: "ذخیره آدرس پس از اتصال سرویس حساب کاربری فعال می‌شود.",
      empty: "هنوز آدرسی ثبت نکرده‌اید.",
    },
    wallet: {
      desktopTitle: "کیف پول",
      mobileTitle: "کیف پول",
      breadcrumb: "کیف پول",
      balance: "موجودی کیف پول",
      toman: "تومان",
      topUp: "افزایش موجودی",
      transactions: "تراکنش‌ها",
      topUpNotice: "افزایش موجودی پس از اتصال درگاه پرداخت فعال می‌شود.",
      empty: "هنوز تراکنشی ثبت نشده است.",
    },
    reviews: {
      desktopTitle: "دیدگاه‌های من",
      mobileTitle: "دیدگاه‌های من",
      breadcrumb: "دیدگاه‌ها",
      edit: "ویرایش",
      statusLabels: {
        approved: "تأیید شده",
        pending: "در انتظار تأیید",
      },
      empty: "هنوز دیدگاهی ثبت نکرده‌اید.",
    },
    messages: {
      desktopTitle: "پیام‌ها",
      mobileTitle: "پیام‌ها",
      breadcrumb: "پیام‌ها",
      markAllRead: "علامت‌گذاری همه به‌عنوان خوانده‌شده",
      markRead: "علامت‌گذاری به‌عنوان خوانده‌شده",
      empty: "پیامی برای نمایش وجود ندارد.",
    },
  },
} as const;

export function getAccountNavLabel(section: AccountSection): string {
  return (
    accountNavItems.find((item) => item.section === section)?.label ?? "حساب من"
  );
}
