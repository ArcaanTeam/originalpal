import type { CommerceArea } from "./routeCatalog";

export default function CommerceScreenLoading({
  area,
}: {
  area: CommerceArea;
}) {
  return (
    <main
      dir="rtl"
      aria-busy="true"
      aria-label="در حال بارگذاری صفحه"
      className="min-h-screen bg-[#f7f8f6] px-4 py-8 sm:px-7"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-8 h-12 rounded-xl bg-white" />
        <div className="mb-6 h-8 w-48 rounded-lg bg-[#e6ebe7]" />
        <div className="mb-5 h-28 rounded-2xl bg-white" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: area === "admin" ? 6 : 4 }, (_, index) => (
            <div key={index} className="h-40 rounded-2xl bg-white" />
          ))}
        </div>
      </div>
    </main>
  );
}
