import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";
import { userKeys } from "./keys";
import type { UserRoleDto, UserSummaryDto } from "./types";

export interface UpdateUserRoleParams {
  userId: string;
  role: UserRoleDto;
}

export interface UseUpdateUserRoleReturn {
  updateUserRole: (params: UpdateUserRoleParams) => Promise<UserSummaryDto>;
  isPending: boolean;
}

export default function useUpdateUserRole(): UseUpdateUserRoleReturn {
  const queryClient = useQueryClient();
  const toastCopy = getDictionary().toast.users;

  const mutation = useMutation({
    mutationFn: async ({ userId, role }: UpdateUserRoleParams) =>
      requestJson<UserSummaryDto>(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      }),
    onSuccess: () => {
      showSuccessToast(toastCopy.roleUpdated);
      void queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });

  return {
    updateUserRole: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
