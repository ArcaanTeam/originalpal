import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { showSuccessToast } from "@/lib/presentation/ui/feedback/show-feedback";
import { fileKeys } from "./keys";
import type { UploadedFileDto } from "./types";
import { uploadFileWithProgress } from "./uploadFileWithProgress";

export interface UploadFileParams {
  file: File;
}

export interface UseUploadFileReturn {
  uploadFile: (params: UploadFileParams) => Promise<UploadedFileDto>;
  isPending: boolean;
  progress: number | null;
}

export default function useUploadFile(): UseUploadFileReturn {
  const queryClient = useQueryClient();
  const toastCopy = getDictionary().toast.files;
  const [progress, setProgress] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ file }: UploadFileParams) => {
      setProgress(0);
      return uploadFileWithProgress({
        file,
        onProgress: (percent) => setProgress(percent),
      });
    },
    onSuccess: () => {
      showSuccessToast(toastCopy.uploaded);
      void queryClient.invalidateQueries({ queryKey: fileKeys.all });
    },
    onSettled: () => {
      setProgress(null);
    },
  });

  return {
    uploadFile: mutation.mutateAsync,
    isPending: mutation.isPending,
    progress,
  };
}
