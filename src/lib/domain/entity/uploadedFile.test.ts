import { describe, expect, it } from "vitest";
import {
  canAccessUploadedFile,
  canPreviewInline,
  detectMimeTypeFromBytes,
  extensionForMimeType,
  sanitizeFileName,
} from "./uploadedFile";

describe("sanitizeFileName", () => {
  it("strips directory traversal and control characters", () => {
    expect(sanitizeFileName("../../etc/passwd")).toBe("passwd");
    expect(sanitizeFileName("C:\\fakepath\\report\u0000.pdf")).toBe(
      "report.pdf",
    );
    expect(sanitizeFileName("..hidden.png")).toBe("hidden.png");
    expect(sanitizeFileName("file\u202egnp.exe")).toBe("filegnp.exe");
  });

  it("falls back to 'file' when empty", () => {
    expect(sanitizeFileName("...")).toBe("file");
    expect(sanitizeFileName("   ")).toBe("file");
  });

  it("truncates long filenames while keeping extension", () => {
    const longName = `${"a".repeat(300)}.png`;
    const sanitized = sanitizeFileName(longName);
    expect(sanitized.length).toBe(255);
    expect(sanitized.endsWith(".png")).toBe(true);
  });
});

describe("detectMimeTypeFromBytes", () => {
  it("detects PNG, JPEG, GIF, WebP, and PDF from magic bytes", () => {
    expect(
      detectMimeTypeFromBytes(
        new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00]),
        "application/octet-stream",
        "photo.bin",
      ),
    ).toBe("image/png");

    expect(
      detectMimeTypeFromBytes(
        new Uint8Array([0xff, 0xd8, 0xff, 0xe0]),
        "image/png",
        "photo.png",
      ),
    ).toBe("image/jpeg");

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("GIF89a..."),
        "image/gif",
        "anim.gif",
      ),
    ).toBe("image/gif");

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("RIFF1234WEBP"),
        "image/webp",
        "pic.webp",
      ),
    ).toBe("image/webp");

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("%PDF-1.7\n"),
        "application/pdf",
        "doc.pdf",
      ),
    ).toBe("application/pdf");
  });

  it("distinguishes zip and ooxml office documents", () => {
    const zipBytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00]);
    expect(
      detectMimeTypeFromBytes(zipBytes, "application/zip", "archive.zip"),
    ).toBe("application/zip");
    expect(
      detectMimeTypeFromBytes(
        zipBytes,
        "application/octet-stream",
        "sheet.xlsx",
      ),
    ).toBe("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  });

  it("detects UTF-8 text, CSV, and valid JSON", () => {
    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("hello world"),
        "text/plain",
        "notes.txt",
      ),
    ).toBe("text/plain");

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("a,b\n1,2\n"),
        "text/csv",
        "data.csv",
      ),
    ).toBe("text/csv");

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode('{"ok":true}'),
        "application/json",
        "config.json",
      ),
    ).toBe("application/json");
  });

  it("rejects dangerous binaries, invalid JSON, and html", () => {
    expect(
      detectMimeTypeFromBytes(
        new Uint8Array([0x7f, 0x45, 0x4c, 0x46]),
        "image/png",
        "fake.png",
      ),
    ).toBeNull();

    expect(
      detectMimeTypeFromBytes(
        new Uint8Array([0x4d, 0x5a, 0x90, 0x00]),
        "text/plain",
        "payload.txt",
      ),
    ).toBeNull();

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("{bad json"),
        "application/json",
        "bad.json",
      ),
    ).toBeNull();

    expect(
      detectMimeTypeFromBytes(
        new TextEncoder().encode("<script>alert(1)</script>"),
        "text/html",
        "xss.html",
      ),
    ).toBeNull();
  });
});

describe("uploadedFile helpers", () => {
  it("maps extensions and previewability", () => {
    expect(extensionForMimeType("image/png")).toBe(".png");
    expect(canPreviewInline("image/png")).toBe(true);
    expect(canPreviewInline("application/zip")).toBe(false);
  });

  it("checks access for owner and admin", () => {
    const file = { uploaderId: "user-1" };
    expect(
      canAccessUploadedFile(file, { userId: "user-1", role: "Member" }),
    ).toBe(true);
    expect(
      canAccessUploadedFile(file, { userId: "user-2", role: "Member" }),
    ).toBe(false);
    expect(
      canAccessUploadedFile(file, { userId: "user-2", role: "Admin" }),
    ).toBe(true);
  });
});
