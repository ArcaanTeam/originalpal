export const contentCopy = {
  breadcrumbRoot: "خانه",
  toman: "تومان",
  blog: {
    title: "مجله اورجینال پل",
    breadcrumb: "مجله اورجینال پل",
    allTag: "همه مطالب",
    moreArticles: "نمایش مطالب بیشتر",
    readTime: "دقیقه مطالعه",
    paginationLabel: "صفحه‌بندی",
    previousPage: "صفحه قبل",
    nextPage: "صفحه بعد",
    newsletter: {
      title: "جدیدترین مطالب را در ایمیل خود بخوانید",
      description: "هر هفته یک خلاصه از بهترین راهنماها.",
      emailLabel: "ایمیل",
      placeholder: "ایمیل شما",
      submit: "عضویت",
      success: "ایمیل شما ثبت شد؛ به‌زودی خبرنامه ارسال می‌شود.",
      invalid: "نشانی ایمیل معتبر وارد کنید.",
      pending: "عضویت در خبرنامه پس از اتصال سرویس محتوا فعال می‌شود.",
    },
  },
  article: {
    breadcrumb: "مجله",
    levelTwo: "مجله",
    contents: "فهرست مطالب",
    share: "اشتراک‌گذاری",
    shared: "نشانی مقاله کپی شد.",
    shareFailed: "کپی نشانی در این مرورگر پشتیبانی نمی‌شود.",
    viewProduct: "مشاهده کالا",
    authorRole: "نویسنده مجله اورجینال پل",
    related: "مطالب مرتبط",
    notFound: "این مقاله پیدا نشد.",
    keywordsLabel: "برچسب‌ها",
  },
  contact: {
    title: "تماس با ما",
    breadcrumb: "تماس با ما",
    formTitle: "ارسال پیام",
    name: "نام و نام خانوادگی",
    mobile: "شماره موبایل",
    subject: "موضوع",
    subjectOptions: [
      "پیگیری سفارش",
      "پشتیبانی فنی",
      "مرجوعی و بازگشت کالا",
      "همکاری و فروش",
      "سایر موارد",
    ],
    message: "پیام",
    submit: "ارسال پیام",
    submitted: "پیام شما ثبت شد؛ پس از اتصال سرویس پشتیبانی ارسال می‌شود.",
    validationName: "نام و نام خانوادگی را وارد کنید.",
    validationMessage: "متن پیام را وارد کنید.",
    channelsTitle: "راه‌های ارتباطی",
    phone: "۰۲۱-۱۲۳۴۵۶۷۸ (۸ تا ۲۰)",
    email: "support@example.com",
    address: "تهران، خیابان ولیعصر، پلاک ۱۲۳",
    map: "نقشه",
  },
  faq: {
    title: "سوالات متداول",
    breadcrumb: "سوالات متداول",
    searchLabel: "جست‌وجو در سوالات",
    searchPlaceholder: "جست‌وجو در سوالات متداول",
    empty: "پرسشی با این عبارت پیدا نشد.",
  },
  pages: {
    notFound: "این صفحه پیدا نشد.",
    updatedAt: "آخرین به‌روزرسانی:",
  },
} as const;

export interface StaticPage {
  slug: string;
  title: string;
  updatedAt: string;
  sections: { heading: string; paragraphs: string[] }[];
  empty?: boolean;
}

export const staticPages: StaticPage[] = [
  {
    slug: "terms",
    title: "قوانین و مقررات",
    updatedAt: "۱۴۰۵/۰۷/۲۰",
    sections: [
      {
        heading: "۱. شرایط استفاده",
        paragraphs: [
          "استفاده از خدمات اورجینال پل به معنای پذیرش شرایط زیر است. این متن نمونه است و باید با متن حقوقی نهایی جایگزین شود.",
        ],
      },
      {
        heading: "۲. حریم خصوصی",
        paragraphs: [
          "اطلاعات کاربران فقط برای پردازش سفارش و بهبود خدمات استفاده می‌شود.",
        ],
      },
      {
        heading: "۳. بازگشت کالا",
        paragraphs: ["مهلت بازگشت کالا ۷ روز پس از تحویل است."],
      },
    ],
  },
  {
    slug: "privacy",
    title: "حریم خصوصی",
    updatedAt: "۱۴۰۵/۰۷/۲۰",
    sections: [
      {
        heading: "۱. داده‌هایی که نگه می‌داریم",
        paragraphs: [
          "برای پردازش سفارش، نام، شماره تماس و نشانی ارسال ذخیره می‌شود. این داده‌ها تنها در اختیار تیم پشتیبانی اورجینال پل قرار دارد.",
        ],
      },
      {
        heading: "۲. کوکی‌ها",
        paragraphs: [
          "کوکی‌ها برای نگه‌داشتن سبد خرید و ورود به حساب کاربری استفاده می‌شوند.",
        ],
      },
      {
        heading: "۳. حق حذف داده",
        paragraphs: [
          "می‌توانید از طریق صفحه تماس با ما درخواست حذف اطلاعات حساب خود را ثبت کنید.",
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "رویه بازگشت کالا",
    updatedAt: "۱۴۰۵/۰۷/۱۵",
    sections: [
      {
        heading: "۱. مهلت درخواست",
        paragraphs: ["درخواست مرجوعی تا ۷ روز پس از تحویل کالا ثبت می‌شود."],
      },
      {
        heading: "۲. شرایط پذیرش",
        paragraphs: [
          "کالا باید در بسته‌بندی اصلی و همراه با تمام لوازم جانبی بازگردانده شود.",
        ],
      },
      {
        heading: "۳. بازگشت وجه",
        paragraphs: [
          "پس از تأیید کارشناس، مبلغ به کیف پول یا حساب بانکی شما بازمی‌گردد.",
        ],
      },
    ],
  },
  {
    slug: "about",
    title: "درباره ما",
    updatedAt: "۱۴۰۵/۰۷/۱۰",
    sections: [
      {
        heading: "داستان اورجینال پل",
        paragraphs: [
          "اورجینال پل با هدف عرضه کالای دیجیتال اصل و قابل اعتماد راه‌اندازی شده است.",
        ],
      },
      {
        heading: "تعهد ما",
        paragraphs: [
          "ضمانت اصالت، قیمت شفاف و پشتیبانی واقعی، سه ستون اصلی خدمات ما است.",
        ],
      },
    ],
  },
  {
    slug: "careers",
    title: "فرصت‌های شغلی",
    updatedAt: "۱۴۰۵/۰۷/۰۵",
    sections: [],
    empty: true,
  },
  {
    slug: "selling",
    title: "فروشنده شوید",
    updatedAt: "۱۴۰۵/۰۶/۲۸",
    sections: [
      {
        heading: "شرایط همکاری",
        paragraphs: [
          "برای عرضه کالا در اورجینال پل، مدارک کسب‌وکار و نمونه کالا بررسی می‌شود.",
        ],
      },
    ],
  },
];

export function findStaticPage(slug: string): StaticPage | undefined {
  return staticPages.find((page) => page.slug === slug);
}
