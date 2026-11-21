import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";
import { userKeys } from "./keys";

export interface DeleteUserParams {
  userId: string;
}

export interface UseDeleteUserReturn {
  deleteUser: (params: DeleteUserParams) => Promise<void>;
  isPending: boolean;
}

export default function useDeleteUser(): UseDeleteUserReturn {
  const queryClient = useQueryClient();
  const toastCopy = getDictionary().toast.users;

  const mutation = useMutation({
    mutationFn: async ({ userId }: DeleteUserParams) => {
      await requestJson<{ ok: boolean }>(`/api/users/${userId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      showSuccessToast(toastCopy.deleted);
      void queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });

  return {
    deleteUser: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
