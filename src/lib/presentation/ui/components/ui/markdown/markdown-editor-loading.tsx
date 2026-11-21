import { cn } from "cn";
import { Spinner } from "@/lib/presentation/ui/components/ui/spinner";

export interface MarkdownEditorLoadingUIProps {
  className?: string;
  label?: string;
}

export default function MarkdownEditorLoadingUI({
  className,
  label = "در حال بارگذاری ویرایشگر…",
}: MarkdownEditorLoadingUIProps) {
  return (
    <div
      className={cn(
        "markdown-editor-loading flex flex-col items-center justify-center gap-2 text-center",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner
        size="md"
        variant="inherit"
        decorative
        className="markdown-editor-loading-spinner"
      />
      <p className="markdown-editor-loading-label text-sm">{label}</p>
    </div>
  );
}
