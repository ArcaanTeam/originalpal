import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";
import { userKeys } from "./keys";
import type { UserRoleDto, UserSummaryDto } from "./types";

export interface CreateUserParams {
  username: string;
  password: string;
  role: UserRoleDto;
}

export interface UseCreateUserReturn {
  createUser: (params: CreateUserParams) => Promise<UserSummaryDto>;
  isPending: boolean;
}

export default function useCreateUser(): UseCreateUserReturn {
  const queryClient = useQueryClient();
  const toastCopy = getDictionary().toast.users;

  const mutation = useMutation({
    mutationFn: async (params: CreateUserParams) =>
      requestJson<UserSummaryDto>("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(params),
      }),
    onSuccess: () => {
      showSuccessToast(toastCopy.created);
      void queryClient.invalidateQueries({ queryKey: userKeys.list() });
    },
  });

  return {
    createUser: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
