export interface CustomerLoginCopy {
  brand: string;
  login: {
    title: string;
    description: string;
    mobileLabel: string;
    mobilePlaceholder: string;
    mobileHint: string;
    submit: string;
    divider: string;
    passwordButton: string;
    passwordLabel: string;
    passwordSubmit: string;
    passwordHint: string;
    passwordNotice: string;
    switchToOtp: string;
    terms: { prefix: string; terms: string; termsHref: string };
    privacy: { separator: string; label: string; href: string };
  };
  benefits: { title: string; items: { title: string; description: string }[] };
  otp: {
    back: string;
    title: string;
    descriptionPrefix: string;
    descriptionSuffix: string;
    missingMobile: string;
    missingMobileHint: string;
    editMobile: string;
    digitLabel: string;
    submit: string;
    cancel: string;
    resendIn: string;
    resend: string;
    error: string;
  };
  layout: {
    back: string;
    loginTitle: string;
    verifyTitle: string;
  };
  notConnected: string;
  footer: string;
}

export const customerAuthCopy: CustomerLoginCopy = {
  brand: "اورجینال پل",
  login: {
    title: "ورود یا ثبت‌نام",
    description:
      "شماره موبایل خود را وارد کنید. اگر حساب ندارید، به‌صورت خودکار برایتان ساخته می‌شود.",
    mobileLabel: "شماره موبایل",
    mobilePlaceholder: "۰۹۱۲ ۳۴۵ ۶۷۸۹",
    mobileHint: "شماره موبایل باید با ۰۹ شروع شود.",
    submit: "دریافت کد تأیید",
    divider: "یا",
    passwordButton: "ورود با رمز عبور",
    passwordLabel: "رمز عبور",
    passwordSubmit: "ورود",
    passwordHint: "برای ورود با رمز عبور، حساب شما باید از قبل رمز داشته باشد.",
    passwordNotice:
      "ورود با رمز عبور پس از اتصال سرویس حساب کاربری فعال می‌شود.",
    switchToOtp: "ورود با کد تأیید",
    terms: {
      prefix: "با ورود یا ثبت‌نام،",
      terms: "قوانین و مقررات",
      termsHref: "/pages/terms",
    },
    privacy: {
      separator: "و",
      label: "حریم خصوصی",
      href: "/pages/privacy",
    },
  },
  benefits: {
    title: "با اورجینال پل مطمئن بخرید",
    items: [
      {
        title: "ضمانت اصالت کالا",
        description: "همه کالاها با گارانتی معتبر",
      },
      {
        title: "ارسال به سراسر کشور",
        description: "سریع و مطمئن تا در منزل شما",
      },
      {
        title: "پیگیری سفارش",
        description: "وضعیت سفارش در هر لحظه",
      },
      {
        title: "لیست علاقه‌مندی‌ها",
        description: "ذخیره کالاها برای خرید بعدی",
      },
    ],
  },
  otp: {
    back: "بازگشت",
    title: "کد تأیید را وارد کنید",
    descriptionPrefix: "کد ۵ رقمی به شماره",
    descriptionSuffix: "ارسال شد.",
    missingMobile: "شماره موبایل شما",
    missingMobileHint:
      "شماره موبایل مشخص نشده است؛ برای دریافت کد تأیید دوباره وارد شوید.",
    editMobile: "ویرایش شماره",
    digitLabel: "رقم کد تأیید",
    submit: "تأیید و ورود",
    cancel: "بازگشت",
    resendIn: "ارسال مجدد کد تا",
    resend: "ارسال مجدد",
    error: "کد تأیید ۵ رقمی را کامل وارد کنید.",
  },
  layout: {
    back: "بازگشت",
    loginTitle: "ورود / ثبت‌نام",
    verifyTitle: "تأیید شماره موبایل",
  },
  notConnected: "ورود با کد تأیید پس از اتصال سرویس حساب کاربری فعال می‌شود.",
  footer: "© ۱۴۰۵ اورجینال پل. همه حقوق محفوظ است.",
};
