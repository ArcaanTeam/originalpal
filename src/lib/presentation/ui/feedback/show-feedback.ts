import { toast } from "@/lib/presentation/ui/components/ui/toast";
import type { ApiErrorBody } from "./api-error";
import { resolveApiErrorMessage } from "./resolve-api-error-message";

export function showErrorToast(body: ApiErrorBody): void {
  const resolved = resolveApiErrorMessage(body);
  toast.error(resolved.title, {
    description: resolved.description,
  });
}

export function showSuccessToast(title: string, description?: string): void {
  toast.success(title, { description });
}

export function showWarningToast(title: string, description?: string): void {
  toast.warning(title, { description });
}
