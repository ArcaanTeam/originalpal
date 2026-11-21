import { useMutation } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
}

export interface UseUpdatePasswordReturn {
  updatePassword: (params: UpdatePasswordParams) => Promise<void>;
  isPending: boolean;
}

export default function useUpdatePassword(): UseUpdatePasswordReturn {
  const toastCopy = getDictionary().toast.profile;

  const mutation = useMutation({
    mutationFn: async (params: UpdatePasswordParams) => {
      await requestJson<{ ok: true }>(
        "/api/auth/password",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(params),
        },
        { toastOnError: false },
      );
    },
    onSuccess: () => {
      showSuccessToast(toastCopy.passwordUpdated);
    },
  });

  return {
    updatePassword: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
