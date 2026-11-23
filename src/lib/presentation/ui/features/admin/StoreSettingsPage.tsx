import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminSettings } from "./adminCopy";
import { storeSettings } from "./adminData";

const copy = adminSettings.store;

export default function StoreSettingsPage() {
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
      <form className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.storeInfo}
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.storeName}
              </p>
              <input
                defaultValue={storeSettings.storeName}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.supportEmail}
              </p>
              <input
                defaultValue={storeSettings.supportEmail}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.supportPhone}
              </p>
              <input
                defaultValue={storeSettings.supportPhone}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.address}
              </p>
              <input
                defaultValue={storeSettings.address}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.shipping}
          </h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-border p-3">
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.shippingStandard}
              </p>
              <p className="text-xs text-muted-foreground">
                {copy.shippingStandardDetail}
              </p>
              <p className="mt-2 text-sm font-bold text-primary">
                {copy.shippingFree}
              </p>
            </div>
            <div className="rounded-xl border border-border p-3">
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.shippingExpress}
              </p>
              <p className="text-xs text-muted-foreground">
                {copy.shippingExpressDetail}
              </p>
              <p className="mt-2 text-sm font-bold text-primary">
                {copy.shippingExpressPrice}
              </p>
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.freeShippingThreshold}
              </p>
              <input
                defaultValue={storeSettings.freeShippingThreshold.toLocaleString(
                  "fa-IR",
                )}
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.payment}
          </h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={storeSettings.paymentOnline}
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.paymentOnline}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={storeSettings.paymentWallet}
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.paymentWallet}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={storeSettings.paymentInstallment}
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.paymentInstallment}</span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.notifications}
          </h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={storeSettings.notifyOrderSms}
                className="rounded border-border text-primary"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {copy.notifyOrderSms}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {copy.notifyOrderSmsDetail}
                </p>
              </div>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={storeSettings.notifyLowStockEmail}
                className="rounded border-border text-primary"
              />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {copy.notifyLowStockEmail}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {copy.notifyLowStockEmailDetail}
                </p>
              </div>
            </label>
          </div>
        </section>

        <button className="flex h-9 items-center gap-1.5 rounded-lg bg-primary px-5 text-xs font-bold text-white">
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
      </form>
    </AdminLayout>
  );
}
