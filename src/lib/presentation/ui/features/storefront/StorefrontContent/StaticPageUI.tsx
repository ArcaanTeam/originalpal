import { ContentBreadcrumb, MobilePageHeader } from "./ContentParts";
import { contentCopy, type StaticPage } from "./contentCopy";

export interface StaticPageUIProps {
  page: StaticPage;
}

export default function StaticPageUI({ page }: StaticPageUIProps) {
  return (
    <div className="pb-8">
      <MobilePageHeader
        title={page.title}
        backHref="/"
        backLabel="بازگشت به خانه"
      />
      <div className="hidden lg:block">
        <ContentBreadcrumb
          items={[
            { label: contentCopy.breadcrumbRoot, href: "/" },
            { label: page.title },
          ]}
        />
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-4 pt-4 lg:px-8">
        <article className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6 lg:p-6">
          <h1 className="text-[26px] leading-[1.7] font-extrabold">
            {page.title}
          </h1>
          <p className="text-xs leading-[1.8] text-muted-foreground">
            {contentCopy.pages.updatedAt} {page.updatedAt}
          </p>
          {page.empty || page.sections.length === 0 ? (
            <p className="text-[15px] leading-[2.1] text-muted-foreground">
              به‌زودی منتشر می‌شود.
            </p>
          ) : (
            page.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-2">
                <h2 className="text-[19px] leading-[1.7] font-bold">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 24)}
                    className="text-[15px] leading-[2.1]"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))
          )}
        </article>
      </div>
    </div>
  );
}
