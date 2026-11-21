import {
  invalid,
  payloadTooLarge,
  unauthorized,
  validationError,
} from "@/lib/application/errors";
import type { UploadedFileSummary } from "@/lib/application/port/file";
import type { FileContentResult } from "@/lib/application/usecase/file/getFileContent";
import type { FileListScope } from "@/lib/application/usecase/file/listFiles";
import type { AppRole } from "@/lib/domain/auth/role";
import { canPreviewInline } from "@/lib/domain/entity/uploadedFile";
import { writeError } from "@/lib/presentation/http/errors";
import { FileIdParamSchema, ListFilesQuerySchema } from "./schema";

export interface FileControllerDeps {
  uploadFile: (input: {
    uploaderId: string;
    uploaderUsername?: string;
    originalName: string;
    claimedMimeType: string;
    content: Uint8Array;
  }) => Promise<UploadedFileSummary>;
  listFiles: (input: {
    actorUserId: string;
    actorRole: AppRole;
    scope?: FileListScope;
  }) => Promise<UploadedFileSummary[]>;
  getFile: (input: {
    actorUserId: string;
    actorRole: AppRole;
    fileId: string;
  }) => Promise<UploadedFileSummary>;
  getFileContent: (input: {
    actorUserId: string;
    actorRole: AppRole;
    fileId: string;
  }) => Promise<FileContentResult>;
  deleteFile: (input: {
    actorUserId: string;
    actorRole: AppRole;
    fileId: string;
  }) => Promise<void>;
  maxFileSizeBytes: number;
  allowedMimeTypes: readonly string[];
}

export interface SessionInfo {
  sub: string;
  username: string;
  role: AppRole;
}

const MULTIPART_OVERHEAD_ALLOWANCE_BYTES = 256 * 1024;

function toFileResponse(file: UploadedFileSummary) {
  return {
    id: file.id,
    uploader_id: file.uploaderId,
    uploader_username: file.uploaderUsername,
    original_name: file.originalName,
    mime_type: file.mimeType,
    size_bytes: file.sizeBytes,
    sha256: file.sha256,
    created_at: file.createdAt.toISOString(),
    url: `/api/files/${file.id}/content`,
    download_url: `/api/files/${file.id}/content?download=1`,
  };
}

function parseFileId(fileId: string): string {
  const parsed = FileIdParamSchema.safeParse(fileId);
  if (!parsed.success) {
    throw validationError(
      "invalid file id",
      parsed.error.issues.map((issue) => ({
        field: "id",
        code: issue.code,
        message: issue.message,
      })),
    );
  }
  return parsed.data;
}

function buildContentDisposition(
  originalName: string,
  mimeType: string,
  forceDownload: boolean,
): string {
  const dispositionType =
    !forceDownload && canPreviewInline(mimeType) ? "inline" : "attachment";
  const asciiFallback =
    originalName
      .replace(/[^\x20-\x7e]/g, "_")
      .replace(/["\\;]/g, "_")
      .trim() || "file";
  const encodedName = encodeURIComponent(originalName);
  return `${dispositionType}; filename="${asciiFallback}"; filename*=UTF-8''${encodedName}`;
}

export async function listFilesHandler(
  deps: FileControllerDeps,
  session: SessionInfo | null,
  request: Request,
) {
  try {
    if (!session) {
      throw unauthorized("login required", "login_required");
    }

    const url = new URL(request.url);
    const scopeParam = url.searchParams.get("scope") ?? undefined;
    const parsedQuery = ListFilesQuerySchema.safeParse({ scope: scopeParam });
    if (!parsedQuery.success) {
      throw validationError(
        "validation failed",
        parsedQuery.error.issues.map((issue) => ({
          field: issue.path.join(".") || "scope",
          code: issue.code,
          message: issue.message,
        })),
      );
    }

    const files = await deps.listFiles({
      actorUserId: session.sub,
      actorRole: session.role,
      scope: parsedQuery.data.scope,
    });

    return Response.json({
      files: files.map(toFileResponse),
      max_file_size_bytes: deps.maxFileSizeBytes,
      allowed_mime_types: [...deps.allowedMimeTypes],
    });
  } catch (err) {
    return writeError(err);
  }
}

export async function uploadFileHandler(
  deps: FileControllerDeps,
  session: SessionInfo | null,
  request: Request,
) {
  try {
    if (!session) {
      throw unauthorized("login required", "login_required");
    }

    const contentType = request.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("multipart/form-data")) {
      throw validationError("multipart/form-data is required", [
        {
          field: "file",
          code: "invalid_multipart",
          message: "multipart/form-data is required",
        },
      ]);
    }

    const rawLength = request.headers.get("content-length");
    if (rawLength) {
      const parsedLength = Number(rawLength);
      if (
        Number.isFinite(parsedLength) &&
        parsedLength >
          deps.maxFileSizeBytes + MULTIPART_OVERHEAD_ALLOWANCE_BYTES
      ) {
        throw payloadTooLarge(
          "file exceeds maximum allowed size",
          "file_too_large",
        );
      }
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      throw validationError("invalid multipart form data", [
        {
          field: "file",
          code: "invalid_multipart",
          message: "invalid multipart form data",
        },
      ]);
    }

    const entry = formData.get("file");
    if (
      typeof entry !== "object" ||
      entry === null ||
      typeof (entry as Blob).arrayBuffer !== "function"
    ) {
      throw validationError("file field is required", [
        {
          field: "file",
          code: "file.required",
          message: "file field is required",
        },
      ]);
    }

    const blob = entry as Blob & { name?: string };
    if (blob.size === 0) {
      throw invalid("file_empty", "file must not be empty");
    }
    if (blob.size > deps.maxFileSizeBytes) {
      throw payloadTooLarge(
        "file exceeds maximum allowed size",
        "file_too_large",
      );
    }

    const buffer = await blob.arrayBuffer();
    const content = new Uint8Array(buffer);
    const originalName =
      typeof blob.name === "string" && blob.name.trim() ? blob.name : "file";

    const uploaded = await deps.uploadFile({
      uploaderId: session.sub,
      uploaderUsername: session.username,
      originalName,
      claimedMimeType: blob.type ?? "",
      content,
    });

    return Response.json(toFileResponse(uploaded), { status: 201 });
  } catch (err) {
    return writeError(err);
  }
}

export async function getFileHandler(
  deps: FileControllerDeps,
  session: SessionInfo | null,
  fileId: string,
) {
  try {
    if (!session) {
      throw unauthorized("login required", "login_required");
    }

    const validId = parseFileId(fileId);
    const file = await deps.getFile({
      actorUserId: session.sub,
      actorRole: session.role,
      fileId: validId,
    });

    return Response.json(toFileResponse(file));
  } catch (err) {
    return writeError(err);
  }
}

export async function deleteFileHandler(
  deps: FileControllerDeps,
  session: SessionInfo | null,
  fileId: string,
) {
  try {
    if (!session) {
      throw unauthorized("login required", "login_required");
    }

    const validId = parseFileId(fileId);
    await deps.deleteFile({
      actorUserId: session.sub,
      actorRole: session.role,
      fileId: validId,
    });

    return Response.json({ ok: true });
  } catch (err) {
    return writeError(err);
  }
}

export async function getFileContentHandler(
  deps: FileControllerDeps,
  session: SessionInfo | null,
  fileId: string,
  request: Request,
) {
  try {
    if (!session) {
      throw unauthorized("login required", "login_required");
    }

    const validId = parseFileId(fileId);
    const url = new URL(request.url);
    const forceDownload = url.searchParams.get("download") === "1";

    const { file, stream } = await deps.getFileContent({
      actorUserId: session.sub,
      actorRole: session.role,
      fileId: validId,
    });

    const etag = `"${file.sha256}"`;
    const headers = new Headers({
      "Content-Type": file.mimeType,
      "Content-Length": String(file.sizeBytes),
      ETag: etag,
      "Cache-Control": "private, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; sandbox",
      "Content-Disposition": buildContentDisposition(
        file.originalName,
        file.mimeType,
        forceDownload,
      ),
    });

    const ifNoneMatch = request.headers.get("if-none-match");
    if (ifNoneMatch && ifNoneMatch.trim() === etag) {
      await stream.cancel().catch(() => undefined);
      return new Response(null, { status: 304, headers });
    }

    return new Response(stream, { status: 200, headers });
  } catch (err) {
    return writeError(err);
  }
}
