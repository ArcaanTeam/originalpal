import Link from "next/link";
import { AdminLayout } from "./AdminParts";
import { PageHeader } from "./AdminParts";
import { BannerEditCard } from "./AdminParts";
import { adminCopy } from "./adminCopy";
import type { Banner } from "./adminData";

export interface BannerEditPageProps {
  banner: Banner;
}

export default function BannerEditPage({ banner }: BannerEditPageProps) {
  const copy = adminCopy.bannerEdit;

  return (
    <AdminLayout
      title={copy.title}
      section={copy.section}
      description={copy.description}
      active="بنرها"
    >
      <PageHeader
        title={banner.title}
        backHref="/admin/banners"
        backLabel={copy.back}
      />
      <div className="grid gap-6 md:grid-cols-4">
        <BannerEditCard banner={banner} />
        <div className="rounded-xl border border-border bg-card p-4 md:col-span-1">
          <p className="mb-2 text-[10px] font-bold text-primary">عملیات</p>
          <Link
            href="/admin/banners"
            className="block w-full rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-[#526057] hover:bg-muted"
          >
            {copy.back}
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
}
