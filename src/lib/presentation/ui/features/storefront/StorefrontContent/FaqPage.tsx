"use client";

import { useState } from "react";
import FaqUI from "./FaqUI";
import { faqItems, searchFaq } from "./faqData";

export default function FaqPage() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <FaqUI
      items={searchFaq(faqItems, query)}
      query={query}
      openId={openId}
      onChangeQuery={setQuery}
      onToggle={handleToggle}
    />
  );
}
