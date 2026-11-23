import { AdminLayout } from "./AdminParts";
import { DataTable } from "./AdminParts";
import { StatCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import {
  brokenLinks,
  connections,
  coreWebVitals,
  notFound404s,
  seoIssues,
} from "./adminData";

const copy = adminCopy.seo.overview;

function SeoIssueRow({ issue }: { issue: (typeof seoIssues)[number] }) {
  const severityConfig: Record<
    string,
    { color: string; bg: string; label: string }
  > = {
    critical: { color: "#b42318", bg: "#fdecea", label: copy.severityCritical },
    "needs-improvement": {
      color: "#5b6070",
      bg: "#f0eee8",
      label: copy.severityNeedsImprovement,
    },
    info: { color: "#0b6e6e", bg: "#e3f1f0", label: copy.severityInfo },
  };
  const config = severityConfig[issue.severity] ?? {
    color: "#5b6070",
    bg: "#f0eee8",
    label: issue.severity,
  };
  return (
    <tr key={issue.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{issue.title}</td>
      <td className="px-4 py-3">{issue.count}</td>
      <td className="px-4 py-3">
        <span
          className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold text-[${config.color}] bg-[${config.bg}]`}
        >
          {config.label}
        </span>
      </td>
      <td className="px-4 py-3">
        <button className="text-xs font-medium text-primary hover:underline">
          {copy.view}
        </button>
      </td>
    </tr>
  );
}

function ConnectionPill({
  connection,
}: {
  connection: (typeof connections)[number];
}) {
  const isConnected = connection.status === "connected";
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-2.5 text-[10px] font-semibold ${
        isConnected
          ? "bg-[#e3f1f0] text-[#0b6e6e]"
          : "bg-[#fdecea] text-[#b42318]"
      }`}
    >
      {isConnected
        ? adminCopy.seo.integrations.connected
        : adminCopy.seo.integrations.disconnected}
    </span>
  );
}

export default function SeoOverviewPage() {
  const issueRows = seoIssues.map((issue) => (
    <SeoIssueRow key={issue.id} issue={issue} />
  ));
  const connectionRows = connections.map((connection) => (
    <tr key={connection.id} className="border-t border-border text-foreground">
      <td className="px-4 py-3 font-bold text-primary">{connection.name}</td>
      <td className="px-4 py-3">
        <ConnectionPill connection={connection} />
      </td>
      <td className="px-4 py-3">{connection.lastSync ?? "—"}</td>
    </tr>
  ));

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <StatCard label={copy.healthScore} value="۸۴ / ۱۰۰" />
        <StatCard
          label={copy.indexedPages}
          value={(1820).toLocaleString("fa-IR")}
        />
        <StatCard
          label={copy.brokenLinks}
          value={brokenLinks.length.toString()}
        />
        <StatCard
          label={copy.notFound404}
          value={notFound404s.length.toString()}
        />
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold">{copy.cwv}</h2>
          <span className="text-[10px] text-muted-foreground">{copy.rum}</span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {[
            {
              label: copy.lcp,
              value: coreWebVitals.lcp.value,
              target: copy.lcp
                .replace("LCP — ", "")
                .replace("سرعت نمایش محتوای اصلی", ""),
              status: coreWebVitals.lcp.status,
            },
            {
              label: copy.inp,
              value: coreWebVitals.inp.value,
              target: copy.inp
                .replace("INP — ", "")
                .replace("پاسخ‌گویی به تعامل", ""),
              status: coreWebVitals.inp.status,
            },
            {
              label: copy.cls,
              value: coreWebVitals.cls.value,
              target: copy.cls
                .replace("CLS — ", "")
                .replace("پایداری چیدمان", ""),
              status: coreWebVitals.cls.status,
            },
          ].map((vital) => {
            const good = vital.status === "good";
            return (
              <div
                key={vital.label}
                className="rounded-xl border border-border bg-card p-4"
              >
                <p className="text-[10px] font-bold text-muted-foreground">
                  {vital.label}
                </p>
                <p className="mt-1 text-lg font-black text-foreground">
                  {vital.value}
                </p>
                <p className="mt-1 text-[10px] font-semibold">
                  {good ? "خوب" : "نیاز به بهبود"}
                </p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  هدف: {vital.target}
                </p>
              </div>
            );
          })}
        </div>
        <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
          <span>· {copy.rumSource}</span>
        </div>
      </div>

      <div className="mb-6 rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold">{copy.organicClicks}</h2>
          </div>
          <div className="hidden gap-6 text-[10px] font-medium text-muted-foreground md:flex">
            {[
              "هفته ۱",
              "هفته ۲",
              "هفته ۳",
              "هفته ۴",
              "هفته ۵",
              "هفته ۶",
              "هفته ۷",
            ].map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        </div>
        <div className="flex h-24 items-end gap-2 md:gap-3">
          {[320, 380, 350, 420, 460, 440, 510].map((v, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md bg-primary-soft ${i % 2 === 0 ? "bg-primary/20" : ""}`}
              style={{ height: `${(v / 510) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold">{copy.issuesFound}</h2>
        </div>
        <DataTable title="" columns={copy.issueColumns} rows={issueRows} />
        <div className="mt-4 flex items-end gap-2 text-xs text-muted-foreground">
          {["۱", "۲", "۳"].map((n) => (
            <span key={n}>{n}</span>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-bold">{copy.connections}</h2>
        </div>
        <DataTable
          title=""
          columns={["ابزار", "وضعیت", "آخرین زمان"]}
          rows={connectionRows}
        />
      </div>
    </AdminLayout>
  );
}
