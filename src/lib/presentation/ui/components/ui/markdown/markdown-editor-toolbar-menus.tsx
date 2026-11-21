"use client";

import { useState } from "react";
import type { EditorView } from "@codemirror/view";
import { Heading2, Smile } from "lucide-react";
import { Button } from "@/lib/presentation/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/lib/presentation/ui/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/lib/presentation/ui/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/presentation/ui/components/ui/tooltip";
import {
  applyMarkdownHeading,
  insertTextAtCursor,
} from "./insert-markdown-snippet";
import { MARKDOWN_EMOJI_PRESETS } from "./markdown-emoji-presets";

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6] as const;

const toolbarButtonClass =
  "markdown-editor-toolbar-btn tree-glass-btn-ghost size-9 rounded-xl";

function formatHeadingLevelLabel(level: number): string {
  return `عنوان ${level.toLocaleString("fa-IR")}`;
}

export function MarkdownHeadingMenu({
  editorView,
}: {
  editorView: EditorView | null;
}) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger
          render={
            <DropdownMenuTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={toolbarButtonClass}
                  disabled={!editorView}
                  aria-label="عنوان"
                />
              }
            />
          }
        >
          <Heading2 className="size-5" aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent side="bottom">عنوان</TooltipContent>
      </Tooltip>
      <DropdownMenuContent
        align="start"
        className="tree-glass tree-glass-elevated min-w-36 border-white/10 p-1 backdrop-blur-2xl"
      >
        {HEADING_LEVELS.map((level) => (
          <DropdownMenuItem
            key={level}
            className="text-sm"
            onClick={() => {
              if (editorView) {
                applyMarkdownHeading(editorView, level);
              }
            }}
          >
            <span className="font-mono text-white/45" dir="ltr">
              {"#".repeat(level)}
            </span>
            <span className="ms-2">{formatHeadingLevelLabel(level)}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function MarkdownEmojiPicker({
  editorView,
}: {
  editorView: EditorView | null;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger
          render={
            <PopoverTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  className={toolbarButtonClass}
                  disabled={!editorView}
                  aria-label="شکلک"
                  aria-haspopup="dialog"
                />
              }
            />
          }
        >
          <Smile className="size-5" aria-hidden="true" />
        </TooltipTrigger>
        <TooltipContent side="bottom">شکلک</TooltipContent>
      </Tooltip>
      <PopoverContent
        side="bottom"
        align="start"
        className="tree-glass tree-glass-elevated w-[min(calc(100vw-2rem),14.5rem)] border-white/10 p-2 backdrop-blur-2xl"
      >
        <p className="tree-glass-section-label mb-2 px-1">شکلک</p>
        <div
          className="markdown-emoji-grid grid grid-cols-8 gap-0.5"
          role="listbox"
          aria-label="انتخاب شکلک"
        >
          {MARKDOWN_EMOJI_PRESETS.map(({ emoji, label }) => (
            <button
              key={`${emoji}-${label}`}
              type="button"
              title={label}
              aria-label={label}
              className="flex size-8 items-center justify-center rounded-lg text-lg leading-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--tree-theme-accent,#3b82f6)_40%,transparent)] focus-visible:outline-none"
              onClick={() => {
                if (editorView) {
                  insertTextAtCursor(editorView, emoji);
                  setOpen(false);
                }
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
