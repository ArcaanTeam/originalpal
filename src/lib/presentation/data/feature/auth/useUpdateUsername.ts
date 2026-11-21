import { useMutation } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { setAuthenticatedUser } from "@/lib/presentation/ui/auth/session-store";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";
import type { AuthUserProfileDto } from "./types";

export interface UpdateUsernameParams {
  username: string;
}

export interface UseUpdateUsernameReturn {
  updateUsername: (params: UpdateUsernameParams) => Promise<AuthUserProfileDto>;
  isPending: boolean;
}

export default function useUpdateUsername(): UseUpdateUsernameReturn {
  const toastCopy = getDictionary().toast.profile;

  const mutation = useMutation({
    mutationFn: async (params: UpdateUsernameParams) =>
      requestJson<AuthUserProfileDto>("/api/auth/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }),
    onSuccess: (user) => {
      showSuccessToast(toastCopy.usernameUpdated);
      setAuthenticatedUser(user);
    },
  });

  return {
    updateUsername: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
