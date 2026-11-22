"use client";

import { useState } from "react";
import AccountMessagesUI from "./AccountMessagesUI";
import { accountMessages } from "./accountData";

export default function AccountMessagesPage() {
  const [messages, setMessages] = useState(accountMessages);

  function handleMarkAllRead() {
    setMessages((current) =>
      current.map((message) => ({ ...message, unread: false })),
    );
  }

  function handleClickMessage(id: string) {
    setMessages((current) =>
      current.map((message) =>
        message.id === id ? { ...message, unread: false } : message,
      ),
    );
  }

  return (
    <AccountMessagesUI
      messages={messages}
      onClickMarkAllRead={handleMarkAllRead}
      onClickMessage={handleClickMessage}
    />
  );
}
