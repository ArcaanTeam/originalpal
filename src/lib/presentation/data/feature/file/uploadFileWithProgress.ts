import { ApiUnauthorizedError } from "@/lib/presentation/ui/auth/api-errors";
import { invalidateSession } from "@/lib/presentation/ui/auth/invalidate-session";
import { refreshAccessToken } from "@/lib/presentation/ui/auth/refresh-access-token";
import {
  ApiClientError,
  type ApiErrorBody,
} from "@/lib/presentation/ui/feedback/api-error";
import { showErrorToast } from "@/lib/presentation/ui/feedback/show-feedback";
import type { UploadedFileDto } from "./types";

export interface UploadWithProgressOptions {
  file: File;
  onProgress?: (percent: number) => void;
  toastOnError?: boolean;
}

function parseXhrErrorBody(xhr: XMLHttpRequest): ApiErrorBody {
  try {
    return JSON.parse(xhr.responseText) as ApiErrorBody;
  } catch {
    return {
      error: "Request failed",
      message: xhr.statusText || "Request failed",
      code: String(xhr.status),
    };
  }
}

function sendUploadRequest(
  file: File,
  onProgress?: (percent: number) => void,
): Promise<{ status: number; body: string; xhr: XMLHttpRequest }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api/files", true);
    xhr.withCredentials = true;

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && event.total > 0) {
        const percent = Math.min(
          100,
          Math.max(0, Math.round((event.loaded / event.total) * 100)),
        );
        onProgress?.(percent);
      }
    };

    xhr.onload = () => {
      resolve({ status: xhr.status, body: xhr.responseText, xhr });
    };

    xhr.onerror = () => {
      reject(new Error("Network error while uploading file"));
    };

    xhr.onabort = () => {
      reject(new Error("Upload aborted"));
    };

    const formData = new FormData();
    formData.append("file", file);
    xhr.send(formData);
  });
}

export async function uploadFileWithProgress(
  options: UploadWithProgressOptions,
  retried = false,
): Promise<UploadedFileDto> {
  const { file, onProgress, toastOnError = true } = options;

  let result: { status: number; body: string; xhr: XMLHttpRequest };
  try {
    result = await sendUploadRequest(file, onProgress);
  } catch (err) {
    const body: ApiErrorBody = {
      error: "Request failed",
      message: err instanceof Error ? err.message : "Upload failed",
    };
    if (toastOnError) {
      showErrorToast(body);
    }
    throw new ApiClientError(body);
  }

  if (result.status === 401) {
    if (retried) {
      await invalidateSession();
      throw new ApiUnauthorizedError();
    }
    const refreshed = await refreshAccessToken();
    if (!refreshed) {
      await invalidateSession();
      throw new ApiUnauthorizedError();
    }
    return uploadFileWithProgress(options, true);
  }

  if (result.status < 200 || result.status >= 300) {
    const body = parseXhrErrorBody(result.xhr);
    if (toastOnError) {
      showErrorToast(body);
    }
    throw new ApiClientError(body);
  }

  onProgress?.(100);
  return JSON.parse(result.body) as UploadedFileDto;
}
