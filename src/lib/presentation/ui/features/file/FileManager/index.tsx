"use client";

import Link from "next/link";
import { useRef, useState, type DragEvent } from "react";
import { cn } from "cn";
import {
  Download,
  ExternalLink,
  FileArchive,
  FileText,
  Image as ImageIcon,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { Badge } from "@/lib/presentation/ui/components/ui/badge";
import { Button } from "@/lib/presentation/ui/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/presentation/ui/components/ui/table";

export type FileManagerScopeOptionView = {
  value: string;
  label: string;
};

export type FileManagerRowView = {
  id: string;
  name: string;
  mimeType: string;
  sizeLabel: string;
  uploaderLabel: string;
  createdAtLabel: string;
  previewUrl: string;
  downloadUrl: string;
  isImage: boolean;
  isPreviewable: boolean;
};

export interface FileManagerUIProps {
  translations: {
    title: string;
    description: string;
    backLink: string;
    dropzoneTitle: string;
    dropzoneHint: string;
    selectFileButton: string;
    uploadingLabel: string;
    maxSizeHint: string;
    tableHead: {
      name: string;
      type: string;
      size: string;
      uploader: string;
      createdAt: string;
      actions: string;
    };
    previewButton: string;
    downloadButton: string;
    deleteButton: string;
    empty: string;
  };
  rows: FileManagerRowView[];
  scope: string;
  scopeOptions: FileManagerScopeOptionView[];
  showScopeFilter: boolean;
  isUploading: boolean;
  uploadProgress: number | null;
  isMutating: boolean;
  acceptAttribute: string;
  onSelectFiles: (files: FileList) => void;
  onSelectScope: (scope: string) => void;
  onClickDeleteFile: (fileId: string) => void;
}

const scopeChipClass =
  "rounded-md border px-2.5 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";

function FileThumbnail({ row }: { row: FileManagerRowView }) {
  if (row.isImage) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={row.previewUrl}
        alt={row.name}
        className="size-10 shrink-0 rounded-lg border object-cover"
        loading="lazy"
      />
    );
  }

  const Icon =
    row.mimeType === "application/zip"
      ? FileArchive
      : row.mimeType.startsWith("image/")
        ? ImageIcon
        : FileText;

  return (
    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-icon-surface text-muted-foreground">
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

export default function FileManagerUI(props: FileManagerUIProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!props.isUploading) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (props.isUploading) {
      return;
    }
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      props.onSelectFiles(event.dataTransfer.files);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:gap-8 sm:p-6">
      <header className="flex flex-col gap-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {props.translations.backLink}
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">{props.translations.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {props.translations.description}
          </p>
        </div>
      </header>

      <section
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed bg-card p-6 text-center transition-colors sm:p-8",
          isDragging ? "border-primary bg-primary/5" : "border-border",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={props.acceptAttribute}
          className="sr-only"
          aria-label={props.translations.selectFileButton}
          onChange={(event) => {
            if (event.target.files && event.target.files.length > 0) {
              props.onSelectFiles(event.target.files);
              event.target.value = "";
            }
          }}
        />
        <span className="flex size-12 items-center justify-center rounded-full bg-icon-surface text-brand">
          <UploadCloud className="size-6" aria-hidden="true" />
        </span>
        <div className="space-y-1">
          <p className="text-sm font-medium">
            {props.translations.dropzoneTitle}
          </p>
          <p className="text-xs text-muted-foreground">
            {props.translations.dropzoneHint}
          </p>
          <p className="text-xs text-muted-foreground">
            {props.translations.maxSizeHint}
          </p>
        </div>

        <Button
          type="button"
          loading={props.isUploading}
          disabled={props.isUploading}
          onClick={() => inputRef.current?.click()}
        >
          {props.isUploading
            ? props.translations.uploadingLabel
            : props.translations.selectFileButton}
        </Button>

        {props.isUploading && props.uploadProgress !== null ? (
          <div className="mt-1 w-full max-w-xs space-y-1">
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={props.uploadProgress}
              className="h-2 w-full overflow-hidden rounded-full bg-muted"
            >
              <div
                className="h-full bg-primary transition-[width] duration-150"
                style={{ width: `${props.uploadProgress}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground tabular-nums">
              {props.uploadProgress}%
            </p>
          </div>
        ) : null}
      </section>

      {props.showScopeFilter ? (
        <div className="flex flex-wrap items-center gap-2">
          {props.scopeOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                scopeChipClass,
                props.scope === option.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40",
              )}
              onClick={() => props.onSelectScope(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}

      {props.rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {props.translations.empty}
        </p>
      ) : (
        <>
          <ul className="flex flex-col gap-3 md:hidden">
            {props.rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-3 rounded-xl border bg-card p-4"
              >
                <div className="flex items-center gap-3">
                  <FileThumbnail row={row} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium" dir="auto">
                      {row.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {row.sizeLabel} · {row.createdAtLabel}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Badge variant="secondary">{row.mimeType}</Badge>
                  <div className="flex items-center gap-1.5">
                    {row.isPreviewable ? (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={row.previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink
                            className="size-3.5"
                            aria-hidden="true"
                          />
                          {props.translations.previewButton}
                        </a>
                      </Button>
                    ) : null}
                    <Button asChild variant="outline" size="sm">
                      <a href={row.downloadUrl} download={row.name}>
                        <Download className="size-3.5" aria-hidden="true" />
                        {props.translations.downloadButton}
                      </a>
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={props.isMutating}
                      onClick={() => props.onClickDeleteFile(row.id)}
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                      {props.translations.deleteButton}
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="max-md:hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{props.translations.tableHead.name}</TableHead>
                  <TableHead>{props.translations.tableHead.type}</TableHead>
                  <TableHead>{props.translations.tableHead.size}</TableHead>
                  {props.showScopeFilter ? (
                    <TableHead>
                      {props.translations.tableHead.uploader}
                    </TableHead>
                  ) : null}
                  <TableHead>
                    {props.translations.tableHead.createdAt}
                  </TableHead>
                  <TableHead>{props.translations.tableHead.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <FileThumbnail row={row} />
                        <span
                          className="max-w-xs truncate font-medium"
                          dir="auto"
                        >
                          {row.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{row.mimeType}</Badge>
                    </TableCell>
                    <TableCell
                      className="text-muted-foreground tabular-nums"
                      dir="ltr"
                    >
                      {row.sizeLabel}
                    </TableCell>
                    {props.showScopeFilter ? (
                      <TableCell className="text-muted-foreground">
                        {row.uploaderLabel}
                      </TableCell>
                    ) : null}
                    <TableCell className="text-muted-foreground">
                      {row.createdAtLabel}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {row.isPreviewable ? (
                          <Button asChild variant="outline" size="sm">
                            <a
                              href={row.previewUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {props.translations.previewButton}
                            </a>
                          </Button>
                        ) : null}
                        <Button asChild variant="outline" size="sm">
                          <a href={row.downloadUrl} download={row.name}>
                            {props.translations.downloadButton}
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={props.isMutating}
                          onClick={() => props.onClickDeleteFile(row.id)}
                        >
                          {props.translations.deleteButton}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
