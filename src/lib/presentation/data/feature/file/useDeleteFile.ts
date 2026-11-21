import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { requestJson } from "@/lib/presentation/ui/feedback/request-json";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";
import { fileKeys } from "./keys";

export interface DeleteFileParams {
  fileId: string;
}

export interface UseDeleteFileReturn {
  deleteFile: (params: DeleteFileParams) => Promise<void>;
  isPending: boolean;
}

export default function useDeleteFile(): UseDeleteFileReturn {
  const queryClient = useQueryClient();
  const toastCopy = getDictionary().toast.files;

  const mutation = useMutation({
    mutationFn: async ({ fileId }: DeleteFileParams) => {
      await requestJson<{ ok: boolean }>(`/api/files/${fileId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      showSuccessToast(toastCopy.deleted);
      void queryClient.invalidateQueries({ queryKey: fileKeys.all });
    },
  });

  return {
    deleteFile: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
