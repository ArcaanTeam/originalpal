export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "track-order",
    question: "چطور سفارش خود را پیگیری کنم؟",
    answer:
      "از بخش «سفارش‌های من» در حساب کاربری می‌توانید وضعیت هر سفارش را ببینید.",
  },
  {
    id: "return-window",
    question: "مهلت بازگشت کالا چقدر است؟",
    answer:
      "مهلت بازگشت کالا ۷ روز پس از تحویل است و درخواست مرجوعی از بخش «مرجوعی‌ها» ثبت می‌شود.",
  },
  {
    id: "authenticity",
    question: "آیا کالاها اصل هستند؟",
    answer:
      "همه کالاها با گارانتی اصالت و فاکتور معتبر ارسال می‌شوند؛ در صورت مشاهده مشکل، امکان بازگشت وجود دارد.",
  },
  {
    id: "shipping-cost",
    question: "هزینه ارسال چقدر است؟",
    answer:
      "هزینه ارسال بر اساس شهر و روش ارسال انتخابی در مرحله پرداخت محاسبه و نمایش داده می‌شود.",
  },
  {
    id: "payment-methods",
    question: "چه روش‌های پرداختی پشتیبانی می‌شود؟",
    answer:
      "پرداخت آنلاین از طریق درگاه بانکی و پرداخت با کیف پول حساب کاربری امکان‌پذیر است.",
  },
  {
    id: "wallet",
    question: "کیف پول چیست و چطور شارژ می‌شود؟",
    answer:
      "کیف پول اعتبار حساب شما برای خریدهای بعدی است و از صفحه «کیف پول» قابل افزایش موجودی است.",
  },
  {
    id: "order-cancel",
    question: "چطور سفارش را لغو کنم؟",
    answer:
      "تا پیش از مرحله آماده‌سازی، از صفحه جزئیات سفارش می‌توانید درخواست لغو ثبت کنید.",
  },
];

export function searchFaq(items: FaqItem[], query: string): FaqItem[] {
  const term = query.trim().toLowerCase();
  if (!term) return items;
  return items.filter(
    (item) =>
      item.question.toLowerCase().includes(term) ||
      item.answer.toLowerCase().includes(term),
  );
}
