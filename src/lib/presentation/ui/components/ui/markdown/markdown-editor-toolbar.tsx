"use client";

import type { EditorView } from "@codemirror/view";
import {
  Bold,
  Code,
  Eraser,
  FileCode2,
  Italic,
  Link,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Redo2,
  Strikethrough,
  Table,
  TextQuote,
  Undo2,
} from "lucide-react";
import { Button } from "@/lib/presentation/ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/lib/presentation/ui/components/ui/tooltip";
import { insertMarkdownSnippet } from "./insert-markdown-snippet";
import {
  MarkdownEmojiPicker,
  MarkdownHeadingMenu,
} from "./markdown-editor-toolbar-menus";

type ToolbarAction = {
  id: string;
  label: string;
  icon: typeof Bold;
  run: (view: EditorView) => void;
};

const TOOLBAR_ACTIONS: ToolbarAction[] = [
  {
    id: "bold",
    label: "پررنگ",
    icon: Bold,
    run: (view) => insertMarkdownSnippet(view, "**", "**", "متن"),
  },
  {
    id: "italic",
    label: "مورب",
    icon: Italic,
    run: (view) => insertMarkdownSnippet(view, "*", "*", "متن"),
  },
  {
    id: "strike",
    label: "خط‌خورده",
    icon: Strikethrough,
    run: (view) => insertMarkdownSnippet(view, "~~", "~~", "متن"),
  },
  {
    id: "link",
    label: "پیوند",
    icon: Link,
    run: (view) => insertMarkdownSnippet(view, "[", "](https://)", "عنوان"),
  },
  {
    id: "quote",
    label: "نقل‌قول",
    icon: TextQuote,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      const selected = view.state.doc.sliceString(from, to) || "نقل‌قول";
      view.dispatch({
        changes: { from, to, insert: `> ${selected}` },
        selection: { anchor: from + 2, head: from + 2 + selected.length },
      });
      view.focus();
    },
  },
  {
    id: "ul",
    label: "فهرست",
    icon: List,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      const selected = view.state.doc.sliceString(from, to) || "مورد";
      view.dispatch({
        changes: { from, to, insert: `- ${selected}` },
        selection: { anchor: from + 2, head: from + 2 + selected.length },
      });
      view.focus();
    },
  },
  {
    id: "ol",
    label: "فهرست شماره‌دار",
    icon: ListOrdered,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      const selected = view.state.doc.sliceString(from, to) || "مورد";
      view.dispatch({
        changes: { from, to, insert: `1. ${selected}` },
        selection: { anchor: from + 3, head: from + 3 + selected.length },
      });
      view.focus();
    },
  },
  {
    id: "task",
    label: "کار",
    icon: ListTodo,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      const selected = view.state.doc.sliceString(from, to) || "کار";
      view.dispatch({
        changes: { from, to, insert: `- [ ] ${selected}` },
        selection: { anchor: from + 6, head: from + 6 + selected.length },
      });
      view.focus();
    },
  },
  {
    id: "code",
    label: "کد درون‌خطی",
    icon: Code,
    run: (view) => insertMarkdownSnippet(view, "`", "`", "کد"),
  },
  {
    id: "codeblock",
    label: "بلوک کد",
    icon: FileCode2,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      const selected = view.state.doc.sliceString(from, to) || "";
      const block = `\`\`\`\n${selected || "کد"}\n\`\`\``;
      view.dispatch({
        changes: { from, to, insert: block },
        selection: {
          anchor: from + 4,
          head: from + 4 + (selected || "کد").length,
        },
      });
      view.focus();
    },
  },
  {
    id: "table",
    label: "جدول",
    icon: Table,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      const table = "| ستون ۱ | ستون ۲ |\n| --- | --- |\n| مقدار | مقدار |";
      view.dispatch({
        changes: { from, to, insert: table },
        selection: { anchor: from + table.length, head: from + table.length },
      });
      view.focus();
    },
  },
  {
    id: "hr",
    label: "خط جداکننده",
    icon: Minus,
    run: (view) => {
      const { from, to } = view.state.selection.main;
      view.dispatch({
        changes: { from, to, insert: "\n\n---\n\n" },
        selection: { anchor: from + 6, head: from + 6 },
      });
      view.focus();
    },
  },
];

function ToolbarIconButton({
  action,
  editorView,
}: {
  action: ToolbarAction;
  editorView: EditorView | null;
}) {
  const Icon = action.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="markdown-editor-toolbar-btn tree-glass-btn-ghost size-9 rounded-xl"
          disabled={!editorView}
          aria-label={action.label}
          onClick={() => {
            if (editorView) {
              action.run(editorView);
            }
          }}
        >
          <Icon className="size-5" aria-hidden="true" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">{action.label}</TooltipContent>
    </Tooltip>
  );
}

export interface MarkdownEditorDocumentToolbarProps {
  translations: {
    save: string;
    clear: string;
    undo: string;
    redo: string;
  };
  onClickSave: () => void;
  onClear: () => void;
  isSaving?: boolean;
  disabled?: boolean;
}

export interface MarkdownEditorToolbarProps {
  editorView: EditorView | null;
  documentToolbar?: MarkdownEditorDocumentToolbarProps;
  canUndo: boolean;
  canRedo: boolean;
  onClickUndo: () => void;
  onClickRedo: () => void;
}

export default function MarkdownEditorToolbar({
  editorView,
  documentToolbar,
  canUndo,
  canRedo,
  onClickUndo,
  onClickRedo,
}: MarkdownEditorToolbarProps) {
  const documentActionsDisabled =
    documentToolbar?.disabled || !editorView || documentToolbar?.isSaving;

  return (
    <div
      className="markdown-editor-toolbar flex w-full flex-wrap items-center gap-1 border-b px-1.5 py-1"
      role="toolbar"
      aria-label="ابزارهای مارک‌داون"
    >
      <div className="markdown-editor-toolbar-formatting flex min-w-0 flex-1 flex-wrap items-center gap-1">
        {TOOLBAR_ACTIONS.flatMap((action) => {
          const items = [
            <ToolbarIconButton
              key={action.id}
              action={action}
              editorView={editorView}
            />,
          ];
          if (action.id === "strike") {
            items.push(
              <MarkdownHeadingMenu
                key="heading-menu"
                editorView={editorView}
              />,
            );
          }
          if (action.id === "hr") {
            items.push(
              <MarkdownEmojiPicker
                key="emoji-picker"
                editorView={editorView}
              />,
            );
          }
          return items;
        })}
      </div>
      {documentToolbar ? (
        <div
          className="markdown-editor-toolbar-document flex shrink-0 items-center gap-1 border-s border-[var(--tree-glass-border-subtle)] ps-1.5"
          role="group"
          aria-label="عملیات یادداشت"
        >
          <Button
            type="button"
            size="sm"
            className="markdown-editor-toolbar-save tree-glass-btn-primary h-9 rounded-xl px-3"
            onClick={documentToolbar.onClickSave}
            loading={documentToolbar.isSaving}
            disabled={documentActionsDisabled}
          >
            {documentToolbar.translations.save}
          </Button>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="markdown-editor-toolbar-btn tree-glass-btn-ghost size-9 rounded-xl"
                disabled={documentActionsDisabled}
                aria-label={documentToolbar.translations.clear}
                onClick={documentToolbar.onClear}
              >
                <Eraser className="size-5" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {documentToolbar.translations.clear}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="markdown-editor-toolbar-btn tree-glass-btn-ghost size-9 rounded-xl"
                disabled={documentActionsDisabled || !canUndo}
                aria-label={documentToolbar.translations.undo}
                onClick={onClickUndo}
              >
                <Undo2 className="size-5" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {documentToolbar.translations.undo}
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="markdown-editor-toolbar-btn tree-glass-btn-ghost size-9 rounded-xl"
                disabled={documentActionsDisabled || !canRedo}
                aria-label={documentToolbar.translations.redo}
                onClick={onClickRedo}
              >
                <Redo2 className="size-5" aria-hidden="true" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              {documentToolbar.translations.redo}
            </TooltipContent>
          </Tooltip>
        </div>
      ) : null}
    </div>
  );
}
