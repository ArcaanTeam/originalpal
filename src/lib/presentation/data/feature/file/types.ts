export interface UploadedFileDto {
  id: string;
  uploader_id: string;
  uploader_username: string | null;
  original_name: string;
  mime_type: string;
  size_bytes: number;
  sha256: string;
  created_at: string;
  url: string;
  download_url: string;
}

export interface FileListResponseDto {
  files: UploadedFileDto[];
  max_file_size_bytes: number;
  allowed_mime_types: string[];
}
