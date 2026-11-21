"use client";

import { useMemo, useState } from "react";
import { canPreviewInline } from "@/lib/domain/entity/uploadedFile";
import type { FileListScopeDto } from "@/lib/presentation/data/feature/file/keys";
import useDeleteFile from "@/lib/presentation/data/feature/file/useDeleteFile";
import useGetFiles from "@/lib/presentation/data/feature/file/useGetFiles";
import useUploadFile from "@/lib/presentation/data/feature/file/useUploadFile";
import {
  formatMessage,
  getDictionary,
} from "@/lib/presentation/i18n/dictionary";
import { faDateTimeFormatter } from "@/lib/presentation/i18n/faFormatters";
import { useAuthSession } from "@/lib/presentation/ui/auth/use-auth-session";
import { showErrorToast } from "@/lib/presentation/ui/feedback/show-feedback";
import FileManagerUI from ".";
import FileManagerErrorUI from "./error";
import { formatFileSize } from "./formatBytes";
import FileManagerLoadingUI from "./loading";

export default function FileManagerPage() {
  const { user } = useAuthSession();
  const isAdmin = user?.role === "Admin";
  const [scope, setScope] = useState<FileListScopeDto>("own");
  const effectiveScope: FileListScopeDto = isAdmin ? scope : "own";

  const { files, maxFileSizeBytes, allowedMimeTypes, succeed } =
    useGetFiles(effectiveScope);
  const { uploadFile, isPending: isUploading, progress } = useUploadFile();
  const { deleteFile, isPending: isDeleting } = useDeleteFile();

  const filesCopy = getDictionary().files;

  const rows = useMemo(
    () =>
      files.map((file) => ({
        id: file.id,
        name: file.original_name,
        mimeType: file.mime_type,
        sizeLabel: formatFileSize(file.size_bytes),
        uploaderLabel: file.uploader_username ?? "—",
        createdAtLabel: faDateTimeFormatter.format(new Date(file.created_at)),
        previewUrl: file.url,
        downloadUrl: file.download_url,
        isImage: file.mime_type.startsWith("image/"),
        isPreviewable: canPreviewInline(file.mime_type),
      })),
    [files],
  );

  if (succeed === null) {
    return <FileManagerLoadingUI />;
  }
  if (succeed === false) {
    return <FileManagerErrorUI />;
  }

  return (
    <FileManagerUI
      translations={{
        title: filesCopy.title,
        description: filesCopy.description,
        backLink: filesCopy.backLink,
        dropzoneTitle: filesCopy.dropzoneTitle,
        dropzoneHint: filesCopy.dropzoneHint,
        selectFileButton: filesCopy.selectFileButton,
        uploadingLabel: filesCopy.uploadingLabel,
        maxSizeHint: formatMessage(filesCopy.maxSizeHint, {
          maxSize: formatFileSize(maxFileSizeBytes),
        }),
        tableHead: filesCopy.tableHead,
        previewButton: filesCopy.previewButton,
        downloadButton: filesCopy.downloadButton,
        deleteButton: filesCopy.deleteButton,
        empty: filesCopy.empty,
      }}
      rows={rows}
      scope={effectiveScope}
      scopeOptions={[
        { value: "own", label: filesCopy.scopeOwn },
        { value: "all", label: filesCopy.scopeAll },
      ]}
      showScopeFilter={isAdmin}
      isUploading={isUploading}
      uploadProgress={progress}
      isMutating={isUploading || isDeleting}
      acceptAttribute={allowedMimeTypes.join(",")}
      onSelectScope={(nextScope) => setScope(nextScope as FileListScopeDto)}
      onSelectFiles={async (selectedFiles) => {
        for (const file of Array.from(selectedFiles)) {
          if (file.size === 0) {
            showErrorToast({ reason: "file_empty" });
            continue;
          }
          if (file.size > maxFileSizeBytes) {
            showErrorToast({ reason: "file_too_large" });
            continue;
          }
          try {
            await uploadFile({ file });
          } catch {
            // Error toast is handled by uploadFileWithProgress.
          }
        }
      }}
      onClickDeleteFile={async (fileId) => {
        const target = files.find((item) => item.id === fileId);
        if (!target) {
          return;
        }
        const confirmed = window.confirm(
          formatMessage(filesCopy.confirmDelete, {
            name: target.original_name,
          }),
        );
        if (!confirmed) {
          return;
        }
        await deleteFile({ fileId });
      }}
    />
  );
}
