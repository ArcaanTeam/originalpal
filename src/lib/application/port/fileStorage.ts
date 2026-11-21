import "server-only";

export interface PutStoredFileInput {
  storageKey: string;
  content: Uint8Array;
}

export interface FileStorage {
  put(input: PutStoredFileInput): Promise<void>;
  getStream(storageKey: string): Promise<ReadableStream<Uint8Array>>;
  delete(storageKey: string): Promise<void>;
}
