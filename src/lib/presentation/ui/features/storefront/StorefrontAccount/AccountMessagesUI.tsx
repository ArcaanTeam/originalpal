"use client";

import { cn } from "cn";
import { Bell } from "lucide-react";
import { EmptyState } from "./AccountParts";
import { accountCopy } from "./accountCopy";
import type { AccountMessage } from "./accountData";

export interface AccountMessagesUIProps {
  messages: AccountMessage[];
  onClickMarkAllRead: () => void;
  onClickMessage: (id: string) => void;
}

export default function AccountMessagesUI({
  messages,
  onClickMarkAllRead,
  onClickMessage,
}: AccountMessagesUIProps) {
  const copy = accountCopy.sections.messages;
  const hasUnread = messages.some((message) => message.unread);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="hidden min-w-0 flex-1 text-xl font-extrabold lg:block lg:text-2xl">
          {copy.desktopTitle}
        </h1>
        {hasUnread && (
          <button
            type="button"
            onClick={onClickMarkAllRead}
            className="h-11 rounded-lg border border-input bg-white px-4 text-sm font-semibold"
          >
            {copy.markAllRead}
          </button>
        )}
      </div>

      {messages.length === 0 ? (
        <EmptyState>{copy.empty}</EmptyState>
      ) : (
        <ul className="flex flex-col gap-3">
          {messages.map((message) => (
            <li key={message.id}>
              <button
                type="button"
                onClick={() => onClickMessage(message.id)}
                aria-label={`${message.title}. ${copy.markRead}`}
                className={cn(
                  "flex w-full items-start gap-3 rounded-xl border border-border p-4 text-start transition-colors",
                  message.unread
                    ? "bg-[#f3f9f8]"
                    : "bg-white hover:bg-muted/60",
                )}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
                  <Bell size={19} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1 leading-[1.8]">
                  <span
                    className={cn(
                      "block text-sm",
                      message.unread ? "font-bold" : "font-medium",
                    )}
                  >
                    {message.title}
                  </span>
                  <span className="block text-[13px] text-muted-foreground">
                    {message.body}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {message.time}
                  </span>
                </span>
                {message.unread && (
                  <span
                    aria-hidden="true"
                    className="mt-2 size-2 shrink-0 rounded-full bg-primary"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
