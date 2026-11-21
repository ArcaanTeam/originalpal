import type { AppRole } from "@/lib/domain/auth/role";

export interface UploadedFile {
  id: string;
  uploaderId: string;
  originalName: string;
  storageKey: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  createdAt: Date;
}

export const DEFAULT_MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_UPLOAD_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/json",
  "application/zip",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
] as const;

export const PREVIEWABLE_MIME_TYPES = new Set<string>([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "text/plain",
]);

const MIME_TO_EXTENSION: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "application/pdf": ".pdf",
  "text/plain": ".txt",
  "text/csv": ".csv",
  "application/json": ".json",
  "application/zip": ".zip",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    ".docx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": ".xlsx",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    ".pptx",
};

const OOXML_EXTENSION_TO_MIME: Record<string, string> = {
  ".docx":
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ".pptx":
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  ".zip": "application/zip",
};

const OOXML_MIMES = new Set<string>(Object.values(OOXML_EXTENSION_TO_MIME));

function extractLowerExtension(fileName: string): string {
  const base = fileName.split(/[/\\]/).pop() ?? "";
  const dotIndex = base.lastIndexOf(".");
  if (dotIndex <= 0 || dotIndex === base.length - 1) {
    return "";
  }
  return base.slice(dotIndex).toLowerCase();
}

export function sanitizeFileName(rawName: string): string {
  const baseName = rawName.split(/[/\\]/).pop() ?? "";
  const cleaned = baseName
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/[\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+/, "");

  if (!cleaned) {
    return "file";
  }

  if (cleaned.length <= 255) {
    return cleaned;
  }

  const ext = extractLowerExtension(cleaned);
  if (ext && ext.length < 32) {
    const stemMax = 255 - ext.length;
    return `${cleaned.slice(0, stemMax)}${ext}`;
  }

  return cleaned.slice(0, 255);
}

function startsWithBytes(bytes: Uint8Array, signature: number[]): boolean {
  if (bytes.byteLength < signature.length) {
    return false;
  }
  for (let i = 0; i < signature.length; i += 1) {
    if (bytes[i] !== signature[i]) {
      return false;
    }
  }
  return true;
}

function matchesAsciiAt(
  bytes: Uint8Array,
  offset: number,
  ascii: string,
): boolean {
  if (bytes.byteLength < offset + ascii.length) {
    return false;
  }
  for (let i = 0; i < ascii.length; i += 1) {
    if (bytes[offset + i] !== ascii.charCodeAt(i)) {
      return false;
    }
  }
  return true;
}

function isUtf8Text(bytes: Uint8Array): boolean {
  const sample = bytes.subarray(0, Math.min(bytes.byteLength, 64 * 1024));
  for (let i = 0; i < sample.byteLength; i += 1) {
    const b = sample[i]!;
    if (b === 0) {
      return false;
    }
    if (b < 0x20 && b !== 0x09 && b !== 0x0a && b !== 0x0d) {
      return false;
    }
  }

  try {
    const decoder = new TextDecoder("utf-8", { fatal: true });
    decoder.decode(sample);
    return true;
  } catch {
    return false;
  }
}

function isDangerousBinary(bytes: Uint8Array): boolean {
  return (
    startsWithBytes(bytes, [0x7f, 0x45, 0x4c, 0x46]) || // ELF
    startsWithBytes(bytes, [0x4d, 0x5a]) || // PE / MZ
    startsWithBytes(bytes, [0xfe, 0xed, 0xfa, 0xce]) || // Mach-O
    startsWithBytes(bytes, [0xfe, 0xed, 0xfa, 0xcf]) || // Mach-O 64
    startsWithBytes(bytes, [0xca, 0xfe, 0xba, 0xbe]) // Mach-O Universal
  );
}

export function detectMimeTypeFromBytes(
  bytes: Uint8Array,
  claimedMimeType: string,
  fileName: string,
): string | null {
  if (bytes.byteLength === 0 || isDangerousBinary(bytes)) {
    return null;
  }

  const normalizedClaim =
    claimedMimeType.split(";")[0]?.trim().toLowerCase() ?? "";
  const ext = extractLowerExtension(fileName);

  if (
    startsWithBytes(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
  ) {
    return "image/png";
  }

  if (startsWithBytes(bytes, [0xff, 0xd8, 0xff])) {
    return "image/jpeg";
  }

  if (
    matchesAsciiAt(bytes, 0, "GIF87a") ||
    matchesAsciiAt(bytes, 0, "GIF89a")
  ) {
    return "image/gif";
  }

  if (matchesAsciiAt(bytes, 0, "RIFF") && matchesAsciiAt(bytes, 8, "WEBP")) {
    return "image/webp";
  }

  if (matchesAsciiAt(bytes, 0, "%PDF-")) {
    return "application/pdf";
  }

  if (
    startsWithBytes(bytes, [0x50, 0x4b, 0x03, 0x04]) ||
    startsWithBytes(bytes, [0x50, 0x4b, 0x05, 0x06]) ||
    startsWithBytes(bytes, [0x50, 0x4b, 0x07, 0x08])
  ) {
    if (ext && OOXML_EXTENSION_TO_MIME[ext]) {
      return OOXML_EXTENSION_TO_MIME[ext];
    }
    if (OOXML_MIMES.has(normalizedClaim)) {
      return normalizedClaim;
    }
    return "application/zip";
  }

  if (isUtf8Text(bytes)) {
    if (ext === ".json" || normalizedClaim === "application/json") {
      try {
        const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
        JSON.parse(text);
        return "application/json";
      } catch {
        return null;
      }
    }
    if (ext === ".csv" || normalizedClaim === "text/csv") {
      return "text/csv";
    }
    if (
      ext === ".txt" ||
      ext === ".md" ||
      ext === ".log" ||
      normalizedClaim === "text/plain" ||
      normalizedClaim === "" ||
      normalizedClaim === "application/octet-stream"
    ) {
      return "text/plain";
    }
  }

  return null;
}

export function extensionForMimeType(mimeType: string): string {
  return MIME_TO_EXTENSION[mimeType] ?? "";
}

export function canPreviewInline(mimeType: string): boolean {
  return PREVIEWABLE_MIME_TYPES.has(mimeType);
}

export function canAccessUploadedFile(
  file: Pick<UploadedFile, "uploaderId">,
  actor: { userId: string; role: AppRole },
): boolean {
  return actor.role === "Admin" || file.uploaderId === actor.userId;
}
