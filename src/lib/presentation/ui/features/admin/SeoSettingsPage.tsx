import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { adminCopy } from "./adminCopy";

const copy = adminCopy.seo.settings;

export default function SeoSettingsPage() {
  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active={copy.title}
    >
      <PageHeader
        title={copy.title}
        backHref="/admin/seo"
        backLabel={adminCopy.seo.overview.view}
      />

      <form className="space-y-6">
        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.titleTemplates}
          </h3>
          <p className="mb-3 text-[10px] text-muted-foreground">
            {copy.availableVariables}
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-xs text-muted-foreground">
            <span>{copy.varTitle}</span>
            <span>{copy.varSiteName}</span>
            <span>{copy.varCategory}</span>
            <span>{copy.varPrice}</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.productTitleTemplate}
              </p>
              <input
                defaultValue="%title% | %site_name%"
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.blogTitleTemplate}
              </p>
              <input
                defaultValue="%title% | %site_name%"
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.categoryTitleTemplate}
              </p>
              <input
                defaultValue="%title% | %site_name%"
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="flex items-end">
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.titleSeparator}
              </p>
              <input
                defaultValue="|"
                className="ml-2 w-10 rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {copy.defaultDescription}
            </p>
            <textarea
              defaultValue={copy.defaultDescriptionLabel}
              className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
            />
          </div>
          <div className="mt-4">
            <p className="mb-1 text-[10px] font-bold text-muted-foreground">
              {copy.ogImage}
            </p>
            <p className="mb-2 text-[10px] text-muted-foreground">
              {copy.ogImageHint}
            </p>
            <div className="rounded-xl border border-dashed border-border bg-muted/50 px-4 py-6 text-center">
              <p className="text-xs font-medium text-muted-foreground">
                تصویر پیش‌فرض انتخاب نشده است
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.canonical}
          </h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.stripUtm}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.wwwRedirect}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.httpToHttps}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.lowercaseUrls}</span>
            </label>
            <div>
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.trailingSlash}
              </p>
              <select className="rounded-lg border border-border bg-transparent px-3 py-2 text-sm">
                <option>{copy.trailingSlashNone}</option>
                <option>با اسلش پایانی</option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.robotsDefaults}
          </h3>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { label: copy.robotsProduct, val: copy.robotsProductVal },
              { label: copy.robotsCategory, val: copy.robotsCategoryVal },
              { label: copy.robotsBlog, val: copy.robotsBlogVal },
              { label: copy.robotsSearch, val: copy.robotsSearchVal },
              { label: copy.robotsTag, val: copy.robotsTagVal },
              { label: copy.robotsCart, val: copy.robotsCartVal },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-border bg-muted/50 p-3"
              >
                <p className="text-[10px] font-bold text-muted-foreground">
                  {item.label}
                </p>
                <p className="mt-1 text-sm font-black text-foreground">
                  {item.val}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.breadcrumb}
          </h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.showBreadcrumb}</span>
            </label>
            <div className="ml-6">
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.homepageTitle}
              </p>
              <input
                defaultValue="خانه"
                className="w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <div className="ml-6">
              <p className="mb-1 text-[10px] font-bold text-muted-foreground">
                {copy.separator}
              </p>
              <input
                defaultValue="‹"
                className="w-10 rounded-lg border border-border bg-transparent px-3 py-2 text-sm"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.selfCanonical}</span>
            </label>
            <p className="mt-1 ml-6 text-[10px] text-muted-foreground">
              {copy.selfCanonicalDesc}
            </p>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.paginationTitle}</span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5">
          <h3 className="mb-3 text-[10px] font-bold text-primary">
            {copy.speed}
          </h3>
          <div className="space-y-3">
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.lazyLoad}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.webp}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.preloadFont}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="rounded border-border text-primary"
              />
              <span className="text-sm">{copy.imageDimensions}</span>
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
