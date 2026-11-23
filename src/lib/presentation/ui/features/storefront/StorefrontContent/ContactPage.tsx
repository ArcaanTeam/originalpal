"use client";

import { useState } from "react";
import ContactUI, { type ContactFormState } from "./ContactUI";
import { contentCopy } from "./contentCopy";

const initialForm: ContactFormState = {
  name: "",
  mobile: "",
  subject: contentCopy.contact.subjectOptions[0],
  message: "",
};

export default function ContactPage() {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ContactFormState, string>>
  >({});
  const [notice, setNotice] = useState<string | null>(null);

  function handleChange(field: keyof ContactFormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  function handleSubmit() {
    const nextErrors: Partial<Record<keyof ContactFormState, string>> = {};
    if (!form.name.trim()) {
      nextErrors.name = contentCopy.contact.validationName;
    }
    if (!form.message.trim()) {
      nextErrors.message = contentCopy.contact.validationMessage;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setNotice(contentCopy.contact.submitted);
  }

  return (
    <ContactUI
      form={form}
      errors={errors}
      notice={notice}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
