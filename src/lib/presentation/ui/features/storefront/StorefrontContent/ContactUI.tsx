"use client";

import type { FormEvent } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { ContentBreadcrumb, MobilePageHeader } from "./ContentParts";
import { contentCopy } from "./contentCopy";

export interface ContactFormState {
  name: string;
  mobile: string;
  subject: string;
  message: string;
}

export interface ContactUIProps {
  form: ContactFormState;
  errors: Partial<Record<keyof ContactFormState, string>>;
  notice: string | null;
  onChange: (field: keyof ContactFormState, value: string) => void;
  onSubmit: () => void;
}

export default function ContactUI({
  form,
  errors,
  notice,
  onChange,
  onSubmit,
}: ContactUIProps) {
  const copy = contentCopy.contact;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit();
  }

  const channels = [
    { icon: Phone, value: copy.phone },
    { icon: Mail, value: copy.email },
    { icon: MapPin, value: copy.address },
  ];

  return (
    <div className="pb-8">
      <MobilePageHeader
        title={copy.title}
        backHref="/"
        backLabel="بازگشت به خانه"
      />
      <div className="hidden lg:block">
        <ContentBreadcrumb
          items={[
            { label: contentCopy.breadcrumbRoot, href: "/" },
            { label: copy.breadcrumb },
          ]}
        />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-4 lg:px-8">
        <h1 className="hidden text-[28px] leading-[1.5] font-extrabold lg:block">
          {copy.title}
        </h1>

        <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6">
          <section className="order-2 rounded-xl border border-border bg-white p-4 lg:order-1 lg:flex-1 lg:basis-[420px] lg:p-4">
            <h2 className="text-lg font-bold">{copy.formTitle}</h2>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-4 flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-name" className="text-sm font-medium">
                  {copy.name}
                </label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={(event) => onChange("name", event.target.value)}
                  aria-invalid={Boolean(errors.name) || undefined}
                  className="h-11 rounded-lg border border-input bg-white px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="contact-mobile" className="text-sm font-medium">
                  {copy.mobile}
                </label>
                <input
                  id="contact-mobile"
                  value={form.mobile}
                  readOnly
                  className="h-11 rounded-lg border border-border bg-muted px-3 text-[15px] text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium"
                >
                  {copy.subject}
                </label>
                <div className="relative">
                  <select
                    id="contact-subject"
                    value={form.subject}
                    onChange={(event) =>
                      onChange("subject", event.target.value)
                    }
                    className="h-11 w-full appearance-none rounded-lg border border-input bg-white px-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                  >
                    {copy.subjectOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="inset-inline-end-3 pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium"
                >
                  {copy.message}
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) => onChange("message", event.target.value)}
                  aria-invalid={Boolean(errors.message) || undefined}
                  className="h-[120px] rounded-lg border border-input bg-white p-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="h-12 rounded-lg bg-primary text-base font-semibold text-primary-foreground"
              >
                {copy.submit}
              </button>
              {notice && (
                <p
                  role="status"
                  className="rounded-lg bg-[#e3f1f0] px-3 py-2 text-xs leading-6 text-primary"
                >
                  {notice}
                </p>
              )}
            </form>
          </section>

          <aside className="order-1 rounded-xl border border-border bg-white p-4 lg:order-2 lg:flex-1 lg:basis-[360px]">
            <h2 className="text-lg font-bold">{copy.channelsTitle}</h2>
            <ul className="mt-4 flex flex-col gap-4">
              {channels.map((channel) => (
                <li
                  key={channel.value}
                  className="flex items-center gap-3 text-sm leading-[1.8]"
                >
                  <channel.icon
                    size={20}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  <span>{channel.value}</span>
                </li>
              ))}
            </ul>
            <div
              aria-hidden="true"
              className="mt-4 flex h-[140px] items-center justify-center rounded-lg bg-[#EEEBE4] text-sm text-[#5B6070]"
            >
              {copy.map}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
