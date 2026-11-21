import "server-only";
import type { UploadedFile } from "@/lib/domain/entity/uploadedFile";

export interface UploadedFileSummary {
  id: string;
  uploaderId: string;
  uploaderUsername: string | null;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  createdAt: Date;
}

export interface FileRepository {
  findById(id: string): Promise<UploadedFile | null>;
  findSummaryById(id: string): Promise<UploadedFileSummary | null>;
  listByUploader(uploaderId: string): Promise<UploadedFileSummary[]>;
  listAll(): Promise<UploadedFileSummary[]>;
  save(file: UploadedFile): Promise<UploadedFile>;
  deleteById(id: string): Promise<boolean>;
}
