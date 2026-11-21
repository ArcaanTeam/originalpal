import { getSessionFromRequest } from "@/lib/infrastructure/auth/session";
import {
  deleteFile,
  getFile,
  getFileContent,
  getUploadConfig,
  listFiles,
  uploadFile,
} from "@/lib/infrastructure/container";
import { getFileContentHandler } from "@/lib/presentation/http/file/controller";

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
  return getFileContentHandler(getDeps(), session, id, request);
}
