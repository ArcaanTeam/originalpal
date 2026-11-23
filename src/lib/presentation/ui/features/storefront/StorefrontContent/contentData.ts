export type ArticleTag =
  "راهنمای خرید" | "نقد و بررسی" | "آموزش" | "اخبار فناوری";

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface ArticleProduct {
  slug: string;
  title: string;
  price: number;
  illustration: "phone" | "headphones";
}

export interface Article {
  slug: string;
  tag: ArticleTag;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readMinutes: number;
  introduction: string;
  sections: ArticleSection[];
  quote?: string;
  product?: ArticleProduct;
  keywords: string[];
  featured?: boolean;
}

export const articleTags: ArticleTag[] = [
  "راهنمای خرید",
  "نقد و بررسی",
  "آموزش",
  "اخبار فناوری",
];

export const articles: Article[] = [
  {
    slug: "flagship-buying-guide",
    tag: "راهنمای خرید",
    title: "راهنمای خرید گوشی پرچم‌دار: چه نکاتی را بررسی کنیم؟",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی. با ما همراه باشید تا گام به گام بررسی کنیم.",
    author: "مریم احمدی",
    date: "۱۴۰۵/۰۸/۰۳",
    readMinutes: 7,
    featured: true,
    introduction:
      "انتخاب یک گوشی پرچم‌دار فقط به مشخصات روی کاغذ محدود نمی‌شود. در این راهنما چند معیار اصلی را مرور می‌کنیم تا خریدی آگاهانه داشته باشید.",
    sections: [
      {
        id: "display",
        heading: "نمایشگر و طراحی",
        paragraphs: [
          "نمایشگر مهم‌ترین بخشی است که هر روز با آن سروکار دارید. اندازه، روشنایی و نرخ نمایش را در کنار وزن و جنس بدنه بسنجید.",
        ],
      },
      {
        id: "camera",
        heading: "دوربین",
        paragraphs: [
          "تعداد مگاپیکسل تنها بخشی از ماجراست؛ کیفیت لنز، لرزشگیر و پردازش تصویر در نتیجه نهایی نقش مهم‌تری دارند.",
        ],
      },
      {
        id: "battery",
        heading: "باتری و شارژ",
        paragraphs: [
          "ظرفیت باتری و توان شارژ را با هم ببینید و به تجربه کاربران در دیدگاه‌ها توجه کنید.",
        ],
      },
      {
        id: "warranty",
        heading: "گارانتی و اصالت",
        paragraphs: [
          "کالای اصل همراه با گارانتی معتبر است. اگر فروشنده ضمانت اصالت ارائه نمی‌دهد، با احتیاط بیشتری تصمیم بگیرید.",
        ],
      },
    ],
    quote: "پیش از خرید، گارانتی و اصالت کالا را حتماً بررسی کنید.",
    product: {
      slug: "samsung-s26-ultra",
      title: "گوشی سامسونگ Galaxy S26 Ultra",
      price: 89_900_000,
      illustration: "phone",
    },
    keywords: ["گوشی موبایل", "راهنمای خرید", "سامسونگ"],
  },
  {
    slug: "amoled-vs-lcd",
    tag: "نقد و بررسی",
    title: "مقایسه نمایشگرهای AMOLED و LCD در گوشی‌های امروزی",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "حسین کریمی",
    date: "۱۴۰۵/۰۸/۰۱",
    readMinutes: 5,
    introduction:
      "نمایشگرها تفاوت محسوسی در تجربه روزمره ایجاد می‌کنند. در این مقایسه، مزیت‌های هر فناوری را کنار هم می‌گذاریم.",
    sections: [
      {
        id: "contrast",
        heading: "کنتراست و رنگ",
        paragraphs: [
          "AMOLED رنگ‌های عمیق‌تر و مشکی واقعی ارائه می‌دهد، در حالی که LCD در نور شدید گاهی خوانایی بهتری دارد.",
        ],
      },
      {
        id: "power",
        heading: "مصرف انرژی",
        paragraphs: [
          "در نمایش محتوای تیره، AMOLED مصرف کمتری دارد؛ اما در صفحات روشن این تفاوت کم‌رنگ می‌شود.",
        ],
      },
      {
        id: "longevity",
        heading: "طول عمر",
        paragraphs: [
          "پنل‌های جدیدتر مقاومت بیشتری دارند، با این حال استفاده طولانی از محتوای ثابت روشن توصیه نمی‌شود.",
        ],
      },
    ],
    keywords: ["نمایشگر", "AMOLED", "LCD"],
  },
  {
    slug: "authenticity-check",
    tag: "راهنمای خرید",
    title: "چطور اصالت کالای دیجیتال را تشخیص دهیم؟",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "سارا موسوی",
    date: "۱۴۰۵/۰۷/۲۹",
    readMinutes: 6,
    introduction:
      "بازار کالای دیجیتال پر از پیشنهادهای وسوسه‌انگیز است. چند بررسی ساده می‌تواند از خرید کالای غیراصل جلوگیری کند.",
    sections: [
      {
        id: "warranty-card",
        heading: "کارت گارانتی",
        paragraphs: [
          "کارت گارانتی معتبر باید نام شرکت، شماره سریال و شرایط خدمات را داشته باشد.",
        ],
      },
      {
        id: "seal",
        heading: "پلمب و بسته‌بندی",
        paragraphs: [
          "پلمب سالم و بسته‌بندی استاندارد نشانه خوبی است، اما به‌تنهایی کافی نیست.",
        ],
      },
      {
        id: "seller",
        heading: "سابقه فروشنده",
        paragraphs: [
          "نظرات خریداران قبلی و سابقه فروشنده را بررسی کنید و از خرید بدون ضمانت کتبی پرهیز کنید.",
        ],
      },
    ],
    quote: "کالای اصل همیشه با ضمانت اصالت و فاکتور معتبر همراه است.",
    keywords: ["اصالت کالا", "گارانتی"],
  },
  {
    slug: "noise-cancelling-headphones",
    tag: "نقد و بررسی",
    title: "بهترین هدفون‌های نویزکنسلینگ برای کار و سفر",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "رضا نوروزی",
    date: "۱۴۰۵/۰۷/۲۵",
    readMinutes: 8,
    introduction:
      "هدفون نویزکنسلینگ خوب می‌تواند کیفیت تمرکز در دفتر و آرامش در پرواز را تغییر دهد. معیارهای انتخاب را مرور می‌کنیم.",
    sections: [
      {
        id: "anc",
        heading: "قدرت حذف نویز",
        paragraphs: [
          "نویزکنسلینگ فعال برای صداهای یکنواخت مثل موتور هواپیما بهترین عملکرد را دارد.",
        ],
      },
      {
        id: "comfort",
        heading: "راحتی و وزن",
        paragraphs: [
          "برای استفاده چندساعته، فشار بالشتک و وزن هدفون را حتماً در نظر بگیرید.",
        ],
      },
      {
        id: "battery",
        heading: "باتری و اتصال",
        paragraphs: [
          "عمر باتری با نویزکنسلینگ روشن معمولاً کمتر از حالت عادی است؛ به عدد واقعی توجه کنید.",
        ],
      },
    ],
    product: {
      slug: "sony-wh-1000xm6",
      title: "هدفون سونی WH-1000XM6",
      price: 18_900_000,
      illustration: "headphones",
    },
    keywords: ["هدفون", "نویزکنسلینگ"],
  },
  {
    slug: "laptop-battery-care",
    tag: "آموزش",
    title: "نکات نگهداری از باتری لپ‌تاپ",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "نگار صادقی",
    date: "۱۴۰۵/۰۷/۲۲",
    readMinutes: 4,
    introduction:
      "باتری لپ‌تاپ معمولاً اولین قطعه‌ای است که فرسوده می‌شود. چند عادت ساده عمر آن را چند سال بیشتر می‌کند.",
    sections: [
      {
        id: "charge-range",
        heading: "محدوده شارژ",
        paragraphs: [
          "نگه‌داشتن شارژ بین ۲۰ تا ۸۰ درصد فشار کمتری به سلول‌ها وارد می‌کند.",
        ],
      },
      {
        id: "heat",
        heading: "دما",
        paragraphs: [
          "گرما دشمن باتری است؛ از قرار دادن لپ‌تاپ روی سطح نرم که تهویه را می‌بندد پرهیز کنید.",
        ],
      },
      {
        id: "storage",
        heading: "انبار کردن",
        paragraphs: [
          "اگر لپ‌تاپ را مدت طولانی استفاده نمی‌کنید، آن را با شارژ حدود ۵۰ درصد نگه دارید.",
        ],
      },
    ],
    keywords: ["باتری", "لپ‌تاپ", "آموزش"],
  },
  {
    slug: "warranty-vs-physical",
    tag: "راهنمای خرید",
    title: "تفاوت گارانتی اصالت و سلامت فیزیکی چیست؟",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "مریم احمدی",
    date: "۱۴۰۵/۰۷/۱۸",
    readMinutes: 5,
    introduction:
      "دو نوع گارانتی رایج در بازار ایران معنی متفاوتی دارند و انتخاب درست به نوع استفاده شما بستگی دارد.",
    sections: [
      {
        id: "original",
        heading: "گارانتی اصالت",
        paragraphs: [
          "تضمین می‌کند کالا اصل است و معمولاً خدمات تعمیر یا تعویض را نیز شامل می‌شود.",
        ],
      },
      {
        id: "physical",
        heading: "گارانتی سلامت فیزیکی",
        paragraphs: [
          "فقط عملکرد فیزیکی دستگاه را پوشش می‌دهد و درباره اصالت کالا تعهدی ایجاد نمی‌کند.",
        ],
      },
    ],
    keywords: ["گارانتی", "اصالت"],
  },
  {
    slug: "usb-c-charging",
    tag: "آموزش",
    title: "راهنمای انتخاب شارژر و کابل USB-C",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "حسین کریمی",
    date: "۱۴۰۵/۰۷/۱۲",
    readMinutes: 4,
    introduction:
      "همه کابل‌های USB-C یکسان نیستند. توان، سرعت داده و پشتیبانی از شارژ سریع را قبل از خرید بررسی کنید.",
    sections: [
      {
        id: "watt",
        heading: "توان شارژ",
        paragraphs: [
          "شارژر باید توان مورد نیاز دستگاه شما را تأمین کند؛ توان کمتر یعنی شارژ کندتر.",
        ],
      },
      {
        id: "certification",
        heading: "استاندارد و برند",
        paragraphs: [
          "کابل‌های بدون استاندارد می‌توانند به باتری آسیب بزنند. برند شناخته‌شده انتخاب امن‌تری است.",
        ],
      },
    ],
    keywords: ["شارژر", "USB-C"],
  },
  {
    slug: "smartwatch-buying-guide",
    tag: "راهنمای خرید",
    title: "قبل از خرید ساعت هوشمند چه چیزهایی را بدانیم؟",
    excerpt:
      "نکات مهمی که پیش از خرید باید بدانید، در چند دقیقه و بدون پیچیدگی فنی.",
    author: "سارا موسوی",
    date: "۱۴۰۵/۰۷/۰۵",
    readMinutes: 6,
    introduction:
      "ساعت هوشمند ترکیبی از گجت و جواهر است؛ انتخاب درست به سبک زندگی شما بستگی دارد.",
    sections: [
      {
        id: "compatibility",
        heading: "سازگاری",
        paragraphs: [
          "بررسی کنید ساعت با سیستم‌عامل گوشی شما کامل کار می‌کند و اپلیکیشن اختصاصی دارد.",
        ],
      },
      {
        id: "battery",
        heading: "عمر باتری",
        paragraphs: [
          "مدل‌های حرفه‌ای معمولاً یک تا دو روز و مدل‌های ساده‌تر تا دو هفته دوام دارند.",
        ],
      },
    ],
    product: {
      slug: "samsung-watch-9",
      title: "ساعت هوشمند سامسونگ Watch 9",
      price: 34_500_000,
      illustration: "phone",
    },
    keywords: ["ساعت هوشمند"],
  },
];

export const featuredArticle = articles.find((article) => article.featured)!;

export const ARTICLES_PER_PAGE = 6;

export function findArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function filterArticles(tag: ArticleTag | "all"): Article[] {
  const list = articles.filter((article) => article.featured !== true);
  const all = [featuredArticle, ...list];
  if (tag === "all") return all;
  return all.filter((article) => article.tag === tag);
}

export function paginateArticles(
  list: Article[],
  page: number,
  perPage = ARTICLES_PER_PAGE,
): {
  page: number;
  totalPages: number;
  items: Article[];
} {
  const totalPages = Math.max(1, Math.ceil(list.length / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * perPage;
  return {
    page: safePage,
    totalPages,
    items: list.slice(start, start + perPage),
  };
}

export function relatedArticles(slug: string, limit = 3): Article[] {
  const current = findArticle(slug);
  if (!current) return articles.slice(0, limit);
  return articles
    .filter((article) => article.slug !== slug)
    .sort(
      (a, b) => Number(b.tag === current.tag) - Number(a.tag === current.tag),
    )
    .slice(0, limit);
}

export function newsletterEmailIsValid(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
