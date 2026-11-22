import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { TicketMessageRow } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import { ticketMessages } from "./adminData";
import type { Ticket, TicketMessage } from "./adminData";

export interface TicketDetailPageProps {
  ticket: Ticket;
}

export default function TicketDetailPage({ ticket }: TicketDetailPageProps) {
  const copy = adminCopy.ticketDetail;
  const messages = ticketMessages[ticket.id] ?? [];

  const priorityLabels: Record<string, string> = {
    low: "کم",
    medium: "متوسط",
    high: "زیاد",
  };
  const statusLabels: Record<string, string> = {
    open: "باز",
    in_progress: "در حال بررسی",
    closed: "بسته شده",
  };

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="درخواست‌های پشتیبانی"
    >
      <PageHeader
        title={ticket.subject}
        backHref="/admin/support/tickets"
        backLabel={copy.back}
      />
      <div className="grid gap-4 md:grid-cols-4">
        <div>
          <p className="text-[10px] text-[#818b85]">{copy.ticketId}</p>
          <p className="text-sm font-bold text-[#173a30]">{ticket.id}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">{copy.customer}</p>
          <p className="text-sm font-bold text-[#173a30]">{ticket.customer}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">{copy.priority}</p>
          <p className="mt-1">
            <span
              className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
                ticket.priority === "low"
                  ? "bg-[#f5f7f5] text-[#59655f]"
                  : ticket.priority === "medium"
                    ? "bg-[#eaf4ef] text-[#087e68]"
                    : "bg-[#fdecea] text-[#b00020]"
              }`}
            >
              {priorityLabels[ticket.priority] ?? ticket.priority}
            </span>
          </p>
        </div>
        <div>
          <p className="text-[10px] text-[#818b85]">{copy.status}</p>
          <p className="mt-1">
            <span
              className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
                ticket.status === "open"
                  ? "bg-[#fdecea] text-[#b00020]"
                  : ticket.status === "in_progress"
                    ? "bg-[#f5f7f5] text-[#59655f]"
                    : "bg-[#eaf4ef] text-[#087e68]"
              }`}
            >
              {statusLabels[ticket.status] ?? ticket.status}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-6 rounded-xl border border-[#e9ece8] bg-white p-5">
        <p className="mb-2 text-[10px] font-bold text-[#087e68]">
          {copy.message}
        </p>
        <div className="mb-4 rounded-lg border border-[#e9ece8] bg-[#eaf4ef] p-4 text-right">
          <p className="mb-1 text-[10px] font-semibold text-[#818b85]">مشتری</p>
          <p className="text-sm whitespace-pre-line text-[#263630]">
            پیام مشتری درباره {ticket.subject}
          </p>
          <p className="mt-1 text-[9px] text-[#89938c]">{ticket.createdAt}</p>
        </div>
        {messages.length > 0 ? (
          <div className="mt-4 space-y-3">
            {messages.map((message: TicketMessage) => (
              <TicketMessageRow key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <p className="mt-4 text-xs text-[#89938c]">هنوز پاسخ ثبت نشده است.</p>
        )}
      </div>
      <div className="mt-6 flex gap-2">
        <button
          className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e6e9e5] px-4 text-xs font-semibold text-[#58655f] hover:bg-[#f5f7f5]"
          onClick={() => {}}
        >
          {copy.reply}
        </button>
        <button
          className="flex h-9 items-center gap-1.5 rounded-lg bg-[#b00020] px-4 text-xs font-bold text-white"
          onClick={() => {}}
        >
          {copy.close}
        </button>
        <Link
          href="/admin/support/tickets"
          className="flex h-9 items-center gap-1.5 rounded-lg border border-[#e6e9e5] px-4 text-xs font-semibold text-[#58655f] hover:bg-[#f5f7f5]"
        >
          {copy.back}
        </Link>
      </div>
    </AdminLayout>
  );
}
