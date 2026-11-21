import { getDictionary } from "@/lib/presentation/i18n/dictionary";

export default function FileManagerErrorUI() {
  const filesCopy = getDictionary().files;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-6">
      <p className="text-sm text-destructive">{filesCopy.loadError}</p>
    </div>
  );
}
