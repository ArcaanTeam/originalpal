import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import FileManagerUI, { type FileManagerUIProps } from ".";

function makeProps(
  overrides: Partial<FileManagerUIProps> = {},
): FileManagerUIProps {
  return {
    translations: {
      title: "مدیریت فایل‌ها",
      description: "توضیحات",
      backLink: "بازگشت",
      dropzoneTitle: "فایل را اینجا رها کنید",
      dropzoneHint: "تصاویر و اسناد",
      selectFileButton: "انتخاب فایل",
      uploadingLabel: "در حال بارگذاری…",
      maxSizeHint: "حداکثر ۱۰ مگابایت",
      tableHead: {
        name: "نام فایل",
        type: "نوع",
        size: "حجم",
        uploader: "بارگذار",
        createdAt: "تاریخ",
        actions: "عملیات",
      },
      previewButton: "مشاهده",
      downloadButton: "دانلود",
      deleteButton: "حذف",
      empty: "هنوز فایلی بارگذاری نشده است.",
    },
    rows: [],
    scope: "own",
    scopeOptions: [
      { value: "own", label: "فایل‌های من" },
      { value: "all", label: "همه فایل‌ها" },
    ],
    showScopeFilter: false,
    isUploading: false,
    uploadProgress: null,
    isMutating: false,
    acceptAttribute: "image/png,application/pdf",
    onSelectFiles: vi.fn(),
    onSelectScope: vi.fn(),
    onClickDeleteFile: vi.fn(),
    ...overrides,
  };
}

describe("FileManagerUI", () => {
  it("renders empty state and handles file input selection", () => {
    const onSelectFiles = vi.fn();
    render(<FileManagerUI {...makeProps({ onSelectFiles })} />);

    expect(
      screen.getByText("هنوز فایلی بارگذاری نشده است."),
    ).toBeInTheDocument();

    const fileInput = screen.getByLabelText("انتخاب فایل") as HTMLInputElement;
    const file = new File(["hello"], "note.txt", { type: "text/plain" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(onSelectFiles).toHaveBeenCalledTimes(1);
  });

  it("shows upload progress bar when uploading", () => {
    render(
      <FileManagerUI
        {...makeProps({ isUploading: true, uploadProgress: 65 })}
      />,
    );

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toHaveAttribute("aria-valuenow", "65");
    expect(screen.getByText("65%")).toBeInTheDocument();
  });

  it("renders rows, admin scope toggle, and delete callback", () => {
    const onClickDeleteFile = vi.fn();
    const onSelectScope = vi.fn();
    render(
      <FileManagerUI
        {...makeProps({
          showScopeFilter: true,
          onClickDeleteFile,
          onSelectScope,
          rows: [
            {
              id: "file-1",
              name: "report.pdf",
              mimeType: "application/pdf",
              sizeLabel: "2.0 KB",
              uploaderLabel: "admin",
              createdAtLabel: "۱۴۰۵/۰۹/۰۱",
              previewUrl: "/api/files/file-1/content",
              downloadUrl: "/api/files/file-1/content?download=1",
              isImage: false,
              isPreviewable: true,
            },
          ],
        })}
      />,
    );

    expect(screen.getAllByText("report.pdf").length).toBeGreaterThan(0);

    fireEvent.click(screen.getByText("همه فایل‌ها"));
    expect(onSelectScope).toHaveBeenCalledWith("all");

    const deleteButtons = screen.getAllByText("حذف");
    fireEvent.click(deleteButtons[0]!);
    expect(onClickDeleteFile).toHaveBeenCalledWith("file-1");
  });
});
