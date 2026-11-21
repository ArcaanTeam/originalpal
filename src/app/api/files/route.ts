import { getSessionFromRequest } from "@/lib/infrastructure/auth/session";
import {
  deleteFile,
  getFile,
  getFileContent,
  getUploadConfig,
  listFiles,
  uploadFile,
} from "@/lib/infrastructure/container";
import {
  listFilesHandler,
  uploadFileHandler,
} from "@/lib/presentation/http/file/controller";

function getDeps() {
  const config = getUploadConfig();
  return {
    uploadFile,
    listFiles,
    getFile,
    getFileContent,
    deleteFile,
    maxFileSizeBytes: config.maxFileSizeBytes,
    allowedMimeTypes: config.allowedMimeTypes,
  };
}

export async function GET(request: Request) {
  const session = await getSessionFromRequest(request);
  return listFilesHandler(getDeps(), session, request);
}

export async function POST(request: Request) {
  const session = await getSessionFromRequest(request);
  return uploadFileHandler(getDeps(), session, request);
}
