import { desc, eq } from "drizzle-orm";
import "server-only";
import type {
  FileRepository,
  UploadedFileSummary,
} from "@/lib/application/port/file";
import type { UploadedFile } from "@/lib/domain/entity/uploadedFile";
import {
  getDb,
  type DbExecutor,
} from "@/lib/infrastructure/persistence/drizzle/client";
import { files, users } from "@/lib/infrastructure/persistence/drizzle/schema";
import { fileRecordToDomain, fileToRecord } from "./mapper";

const summaryColumns = {
  id: files.id,
  uploaderId: files.uploaderId,
  uploaderUsername: users.username,
  originalName: files.originalName,
  mimeType: files.mimeType,
  sizeBytes: files.sizeBytes,
  sha256: files.sha256,
  createdAt: files.createdAt,
};

function toSummary(row: {
  id: string;
  uploaderId: string;
  uploaderUsername: string | null;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  sha256: string;
  createdAt: Date;
}): UploadedFileSummary {
  return {
    id: row.id,
    uploaderId: row.uploaderId,
    uploaderUsername: row.uploaderUsername,
    originalName: row.originalName,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    sha256: row.sha256,
    createdAt: row.createdAt,
  };
}

export class DrizzleFileRepository implements FileRepository {
  constructor(private readonly db: DbExecutor = getDb()) {}

  async findById(id: string): Promise<UploadedFile | null> {
    const [row] = await this.db
      .select()
      .from(files)
      .where(eq(files.id, id))
      .limit(1);
    return row ? fileRecordToDomain(row) : null;
  }

  async findSummaryById(id: string): Promise<UploadedFileSummary | null> {
    const [row] = await this.db
      .select(summaryColumns)
      .from(files)
      .leftJoin(users, eq(files.uploaderId, users.id))
      .where(eq(files.id, id))
      .limit(1);
    return row ? toSummary(row) : null;
  }

  async listByUploader(uploaderId: string): Promise<UploadedFileSummary[]> {
    const rows = await this.db
      .select(summaryColumns)
      .from(files)
      .leftJoin(users, eq(files.uploaderId, users.id))
      .where(eq(files.uploaderId, uploaderId))
      .orderBy(desc(files.createdAt));
    return rows.map(toSummary);
  }

  async listAll(): Promise<UploadedFileSummary[]> {
    const rows = await this.db
      .select(summaryColumns)
      .from(files)
      .leftJoin(users, eq(files.uploaderId, users.id))
      .orderBy(desc(files.createdAt));
    return rows.map(toSummary);
  }

  async save(file: UploadedFile): Promise<UploadedFile> {
    const record = fileToRecord(file);
    const [row] = await this.db
      .insert(files)
      .values(record)
      .onConflictDoUpdate({
        target: files.id,
        set: {
          originalName: record.originalName,
          storageKey: record.storageKey,
          mimeType: record.mimeType,
          sizeBytes: record.sizeBytes,
          sha256: record.sha256,
        },
      })
      .returning();
    return fileRecordToDomain(row!);
  }

  async deleteById(id: string): Promise<boolean> {
    const deleted = await this.db
      .delete(files)
      .where(eq(files.id, id))
      .returning({ id: files.id });
    return deleted.length > 0;
  }
}
