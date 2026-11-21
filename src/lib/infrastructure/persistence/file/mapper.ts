import "server-only";
import type { UploadedFile } from "@/lib/domain/entity/uploadedFile";
import type { FileRow } from "@/lib/infrastructure/persistence/drizzle/schema";

export function fileRecordToDomain(record: FileRow): UploadedFile {
  return {
    id: record.id,
    uploaderId: record.uploaderId,
    originalName: record.originalName,
    storageKey: record.storageKey,
    mimeType: record.mimeType,
    sizeBytes: record.sizeBytes,
    sha256: record.sha256,
    createdAt: record.createdAt,
  };
}

export function fileToRecord(file: UploadedFile): FileRow {
  return {
    id: file.id,
    uploaderId: file.uploaderId,
    originalName: file.originalName,
    storageKey: file.storageKey,
    mimeType: file.mimeType,
    sizeBytes: file.sizeBytes,
    sha256: file.sha256,
    createdAt: file.createdAt,
  };
}
