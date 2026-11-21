import { describe, expect, it, vi } from "vitest";
import { forbidden, notFound } from "@/lib/application/errors";
import { ALLOWED_UPLOAD_MIME_TYPES } from "@/lib/domain/entity/uploadedFile";
import {
  deleteFileHandler,
  getFileContentHandler,
  getFileHandler,
  listFilesHandler,
  uploadFileHandler,
  type FileControllerDeps,
  type SessionInfo,
} from "./controller";

const VALID_UUID = "11111111-1111-4111-8111-111111111111";

const memberSession: SessionInfo = {
  sub: "user-1",
  username: "alice",
  role: "Member",
};

function makeDeps(): FileControllerDeps {
  return {
    uploadFile: vi.fn(async () => ({
      id: VALID_UUID,
      uploaderId: "user-1",
      uploaderUsername: "alice",
      originalName: "hello.png",
      mimeType: "image/png",
      sizeBytes: 10,
      sha256: "deadbeef",
      createdAt: new Date("2026-11-21T10:00:00.000Z"),
    })),
    listFiles: vi.fn(async () => []),
    getFile: vi.fn(async () => ({
      id: VALID_UUID,
      uploaderId: "user-1",
      uploaderUsername: "alice",
      originalName: "hello.png",
      mimeType: "image/png",
      sizeBytes: 10,
      sha256: "deadbeef",
      createdAt: new Date("2026-11-21T10:00:00.000Z"),
    })),
    getFileContent: vi.fn(async () => ({
      file: {
        id: VALID_UUID,
        uploaderId: "user-1",
        originalName: "hello.png",
        storageKey: "2026/11/hello.png",
        mimeType: "image/png",
        sizeBytes: 10,
        sha256: "deadbeef",
        createdAt: new Date("2026-11-21T10:00:00.000Z"),
      },
      stream: new ReadableStream({
        start(controller) {
          controller.enqueue(new Uint8Array([1, 2, 3]));
          controller.close();
        },
      }),
    })),
    deleteFile: vi.fn(async () => undefined),
    maxFileSizeBytes: 1024,
    allowedMimeTypes: ALLOWED_UPLOAD_MIME_TYPES,
  };
}

describe("file controller", () => {
  it("returns 401 when session is missing", async () => {
    const deps = makeDeps();
    const res = await listFilesHandler(
      deps,
      null,
      new Request("http://localhost/api/files"),
    );
    expect(res.status).toBe(401);
  });

  it("uploads multipart file and returns 201", async () => {
    const deps = makeDeps();
    const form = new FormData();
    form.append(
      "file",
      new File([new Uint8Array([0x89, 0x50, 0x4e, 0x47])], "hello.png", {
        type: "image/png",
      }),
    );

    const req = new Request("http://localhost/api/files", {
      method: "POST",
      body: form,
    });

    const res = await uploadFileHandler(deps, memberSession, req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toMatchObject({
      id: VALID_UUID,
      original_name: "hello.png",
      url: `/api/files/${VALID_UUID}/content`,
      download_url: `/api/files/${VALID_UUID}/content?download=1`,
    });
  });

  it("rejects non-multipart requests and missing file field", async () => {
    const deps = makeDeps();

    const jsonReq = new Request("http://localhost/api/files", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{}",
    });
    expect((await uploadFileHandler(deps, memberSession, jsonReq)).status).toBe(
      400,
    );

    const emptyForm = new FormData();
    const missingFieldReq = new Request("http://localhost/api/files", {
      method: "POST",
      body: emptyForm,
    });
    expect(
      (await uploadFileHandler(deps, memberSession, missingFieldReq)).status,
    ).toBe(400);
  });

  it("rejects oversized files with 413", async () => {
    const deps = makeDeps();
    const form = new FormData();
    form.append(
      "file",
      new File([new Uint8Array(2048)], "huge.png", { type: "image/png" }),
    );

    const req = new Request("http://localhost/api/files", {
      method: "POST",
      body: form,
    });
    const res = await uploadFileHandler(deps, memberSession, req);
    expect(res.status).toBe(413);
  });

  it("validates UUID on get/delete/content routes", async () => {
    const deps = makeDeps();
    expect((await getFileHandler(deps, memberSession, "bad-id")).status).toBe(
      400,
    );
    expect(
      (await deleteFileHandler(deps, memberSession, "bad-id")).status,
    ).toBe(400);
    expect(
      (
        await getFileContentHandler(
          deps,
          memberSession,
          "bad-id",
          new Request("http://localhost/api/files/bad-id/content"),
        )
      ).status,
    ).toBe(400);
  });

  it("streams content with security headers, attachment option, and 304 ETag", async () => {
    const deps = makeDeps();

    const inlineRes = await getFileContentHandler(
      deps,
      memberSession,
      VALID_UUID,
      new Request(`http://localhost/api/files/${VALID_UUID}/content`),
    );
    expect(inlineRes.status).toBe(200);
    expect(inlineRes.headers.get("content-type")).toBe("image/png");
    expect(inlineRes.headers.get("x-content-type-options")).toBe("nosniff");
    expect(inlineRes.headers.get("content-security-policy")).toBe(
      "default-src 'none'; sandbox",
    );
    expect(inlineRes.headers.get("content-disposition")).toContain("inline;");

    const downloadRes = await getFileContentHandler(
      deps,
      memberSession,
      VALID_UUID,
      new Request(
        `http://localhost/api/files/${VALID_UUID}/content?download=1`,
      ),
    );
    expect(downloadRes.headers.get("content-disposition")).toContain(
      "attachment;",
    );

    const notModifiedRes = await getFileContentHandler(
      deps,
      memberSession,
      VALID_UUID,
      new Request(`http://localhost/api/files/${VALID_UUID}/content`, {
        headers: { "if-none-match": '"deadbeef"' },
      }),
    );
    expect(notModifiedRes.status).toBe(304);
  });

  it("maps forbidden and notFound errors cleanly", async () => {
    const deps = makeDeps();
    vi.mocked(deps.getFile).mockRejectedValueOnce(
      forbidden("forbidden", "insufficient_permissions"),
    );
    expect((await getFileHandler(deps, memberSession, VALID_UUID)).status).toBe(
      403,
    );

    vi.mocked(deps.deleteFile).mockRejectedValueOnce(
      notFound("file_not_found", "not found"),
    );
    expect(
      (await deleteFileHandler(deps, memberSession, VALID_UUID)).status,
    ).toBe(404);
  });
});
