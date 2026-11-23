"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent } from "react";
import { Check, ImagePlus, Star, X } from "lucide-react";

export default function StorefrontReviewUI() {
  const [rating, setRating] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function onFilesChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files ?? []);
    const invalid = selected.find((file) => {
      const isVideo = file.type === "video/mp4" || file.type === "video/webm";
      const isImage =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp";
      return (
        (!isVideo && !isImage) || file.size > (isVideo ? 50 : 5) * 1024 * 1024
      );
    });
    if (invalid) {
      setFileError("نوع یا اندازه فایل انتخاب‌شده مجاز نیست.");
      event.currentTarget.value = "";
      return;
    }
    const nextFiles = [...files, ...selected];
    if (nextFiles.length > 5) {
      setFileError("حداکثر ۵ فایل می‌توانید بارگذاری کنید.");
      event.currentTarget.value = "";
      return;
    }
    setFileError(null);
    setFiles(nextFiles);
    event.currentTarget.value = "";
  }
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      className="mx-auto max-w-[860px] px-4 py-6 sm:px-8 sm:py-10"
      dir="rtl"
      lang="fa"
    >
      <div className="mb-5 text-xs text-muted-foreground">
        <Link href="/" className="hover:text-primary">
          خانه
        </Link>
        <span className="mx-2">/</span>
        <Link href="/product/samsung-s26-ultra" className="hover:text-primary">
          گوشی سامسونگ S26 Ultra
        </Link>
        <span className="mx-2">/</span>ثبت دیدگاه
      </div>
      <section className="rounded-xl border border-border bg-white p-5 sm:p-8">
        <h1 className="text-2xl font-extrabold">ثبت دیدگاه</h1>
        <div className="mt-4 flex items-center gap-3 rounded-lg bg-muted/60 p-3">
          <span className="grid size-14 place-items-center rounded-lg bg-primary-soft text-primary">
            <span className="text-2xl">▯</span>
          </span>
          <span>
            <span className="block text-sm font-bold">
              گوشی موبایل سامسونگ مدل Galaxy S26 Ultra
            </span>
            <span className="mt-1 block text-xs text-muted-foreground">
              سامسونگ · ۵۱۲ گیگابایت
            </span>
          </span>
        </div>
        {submitted ? (
          <div
            role="status"
            className="mt-6 rounded-lg border border-primary/20 bg-primary-soft p-5 text-center"
          >
            <span className="mx-auto grid size-11 place-items-center rounded-full bg-white text-primary">
              <Check />
            </span>
            <p className="mt-3 font-extrabold">دیدگاه شما ثبت شد</p>
            <p className="mt-1 text-sm text-muted-foreground">
              پس از بررسی، دیدگاه شما در صفحه محصول نمایش داده می‌شود.
            </p>
            <Link
              href="/product/samsung-s26-ultra"
              className="mt-4 inline-block text-sm font-bold text-primary"
            >
              بازگشت به محصول
            </Link>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-5">
            <fieldset>
              <legend className="text-sm font-bold">امتیاز شما</legend>
              <div
                className="mt-2 flex items-center gap-2"
                role="radiogroup"
                aria-label="امتیاز شما"
              >
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} ستاره`}
                    onClick={() => setRating(value)}
                    className="grid size-10 place-items-center rounded-md hover:bg-muted"
                  >
                    <Star
                      size={25}
                      className={
                        value <= rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground"
                      }
                    />
                  </button>
                ))}
              </div>
              {rating === 0 && (
                <p className="mt-1 text-xs text-muted-foreground">
                  برای ثبت دیدگاه، امتیاز خود را انتخاب کنید.
                </p>
              )}
            </fieldset>
            <label className="block text-sm font-bold">
              عنوان دیدگاه
              <input
                required
                placeholder="خلاصه تجربه شما از خرید"
                className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="block text-sm font-bold">
              متن دیدگاه
              <textarea
                required
                minLength={10}
                rows={5}
                placeholder="تجربه‌تان را با دیگران به اشتراک بگذارید..."
                className="mt-2 w-full resize-y rounded-lg border border-input bg-background p-3 text-sm leading-7 font-normal outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold">
                نکات مثبت
                <input
                  placeholder="مثلاً: کیفیت ساخت عالی"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm font-normal"
                />
              </label>
              <label className="block text-sm font-bold">
                نکات منفی
                <input
                  placeholder="مثلاً: قیمت بالا"
                  className="mt-2 h-11 w-full rounded-lg border border-input bg-background px-3 text-sm font-normal"
                />
              </label>
            </div>
            <section>
              <h2 className="text-sm font-bold">افزودن تصویر یا ویدیو</h2>
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="mt-2 flex min-h-28 w-full flex-col items-center justify-center rounded-lg border border-dashed border-input bg-background text-center hover:border-primary"
              >
                <ImagePlus className="text-primary" size={24} />
                <span className="mt-2 text-sm font-semibold">
                  انتخاب فایل یا کشیدن و رها کردن
                </span>
                <span className="mt-1 text-xs text-muted-foreground">
                  تصویر: حداکثر ۵ مگابایت · JPG، PNG یا WebP
                </span>
                <span className="text-xs text-muted-foreground">
                  ویدیو: حداکثر ۵۰ مگابایت · MP4 یا WebM · حداکثر ۵ فایل
                </span>
              </button>
              <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                multiple
                className="sr-only"
                onChange={onFilesChange}
              />
              {fileError && (
                <p role="alert" className="mt-2 text-xs text-destructive">
                  {fileError}
                </p>
              )}
              {files.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {files.map((file, index) => (
                    <li
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between rounded-md bg-muted px-3 py-2 text-xs"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        type="button"
                        aria-label={`حذف ${file.name}`}
                        onClick={() =>
                          setFiles((current) =>
                            current.filter((_, i) => i !== index),
                          )
                        }
                      >
                        <X size={15} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" className="size-4 accent-primary" />
              نمایش نام من به‌صورت ناشناس
            </label>
            {rating === 0 && (
              <p className="text-xs text-destructive">
                برای ثبت دیدگاه ابتدا امتیاز خود را انتخاب کنید.
              </p>
            )}
            <div className="flex flex-col-reverse gap-2 border-t border-border pt-4 sm:flex-row sm:justify-end">
              <Link
                href="/product/samsung-s26-ultra"
                className="flex h-11 items-center justify-center rounded-lg border border-border px-5 text-sm font-bold"
              >
                انصراف
              </Link>
              <button
                disabled={rating === 0}
                className="h-11 rounded-lg bg-primary px-6 text-sm font-bold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                ثبت دیدگاه
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
}
