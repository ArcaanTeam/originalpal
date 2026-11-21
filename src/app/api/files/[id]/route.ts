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
  deleteFileHandler,
  getFileHandler,
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

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSessionFromRequest(request);
  const { id } = await context.params;
  return getFileHandler(getDeps(), session, id);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const session = await getSessionFromRequest(request);
  const { id } = await context.params;
  return deleteFileHandler(getDeps(), session, id);
}
