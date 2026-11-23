import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminSettings } from "./adminCopy";
import { messageTemplates } from "./adminData";

const copy = adminSettings.templates;

const templateRows = messageTemplates.map((t) => (
  <tr key={t.id} className="border-t border-border text-foreground">
    <td className="px-4 py-3 font-bold text-primary">{t.eventLabel}</td>
    <td className="px-4 py-3">
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          t.sms
            ? "border-[#0b6e6e] bg-[#e3f1f0] text-[#0b6e6e]"
            : "border-[#5b6070] bg-transparent text-[#5b6070]"
        }`}
      >
        {t.sms ? "✓" : "—"}
      </span>
    </td>
    <td className="px-4 py-3 text-center">
      <span
        className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
          t.email
            ? "border-[#0b6e6e] bg-[#e3f1f0] text-[#0b6e6e]"
            : "border-[#5b6070] bg-transparent text-[#5b6070]"
        }`}
      >
        {t.email ? "✓" : "—"}
      </span>
    </td>
    <td className="px-4 py-3">
      <button className="text-xs font-medium text-primary hover:underline">
        {copy.body}
      </button>
    </td>
  </tr>
));

export default function MessageTemplatesPage() {
  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <PageHeader
        title={copy.title}
        backHref="/admin/settings/store"
        backLabel={adminSettings.store.title}
      />
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4">
          <p className="text-[10px] text-muted-foreground">
            {copy.description}
          </p>
        </div>
        <DataTable title="" columns={copy.columns} rows={templateRows} />
        <div className="mt-5 rounded-xl border border-border p-4">
          <h4 className="mb-3 text-[10px] font-bold text-muted-foreground">
            {copy.eventPaymentSuccess}
          </h4>
          <p className="mb-2 text-[10px] text-muted-foreground">
            {copy.variables} {messageTemplates[1].variables.join(" ")}
          </p>
          <div className="mb-3">
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {copy.body}
            </p>
            <textarea
              defaultValue={messageTemplates[1].smsBody}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              rows={2}
            />
          </div>
          <div className="mb-3">
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {copy.subject}
            </p>
            <input
              defaultValue={messageTemplates[1].emailSubject}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="mb-3">
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {copy.emailBody}
            </p>
            <textarea
              defaultValue={messageTemplates[1].emailBody}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              rows={3}
            />
          </div>
          <div className="mt-4 rounded-lg border border-border bg-muted/50 p-3">
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {copy.preview}
            </p>
            <p className="text-sm text-foreground">
              {messageTemplates[1].preview}
            </p>
          </div>
          <div className="mt-4 flex gap-2">
            <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={15}
                height={15}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              {copy.save}
            </button>
            <button className="flex h-9 items-center gap-1.5 rounded-lg border border-border px-3 text-xs font-medium text-muted-foreground hover:bg-muted">
              {copy.sendTest}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
