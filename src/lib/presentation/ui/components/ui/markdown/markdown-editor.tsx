"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import type { Extension } from "@codemirror/state";
import type { EditorView } from "@codemirror/view";
import { cn } from "cn";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/lib/presentation/ui/components/ui/resizable";
import { useIsMobile } from "@/lib/presentation/ui/hooks/use-mobile";
import {
  buildMarkdownEditorExtensions,
  loadMarkdownHistoryCommands,
} from "./markdown-editor-extensions";
import MarkdownEditorLoadingUI from "./markdown-editor-loading";
import MarkdownEditorToolbar, {
  type MarkdownEditorDocumentToolbarProps,
} from "./markdown-editor-toolbar";
import "./markdown-editor.css";
import MarkdownRenderer from "./markdown-renderer";
import { useMarkdownScrollSync } from "./use-markdown-scroll-sync";

const CodeMirror = dynamic(
  () => import("@uiw/react-codemirror").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <div className="min-h-0 flex-1" aria-hidden="true" />,
  },
);

export type { MarkdownEditorDocumentToolbarProps };

export interface MarkdownEditorProps {
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  className?: string;
  documentToolbar?: MarkdownEditorDocumentToolbarProps;
}

export default function MarkdownEditor({
  value,
  onChange,
  readOnly = false,
  className,
  documentToolbar,
}: MarkdownEditorProps) {
  // Phones stack the source above the preview instead of side by side.
  const isMobile = useIsMobile();
  const [editorView, setEditorView] = useState<EditorView | null>(null);
  const [historyState, setHistoryState] = useState({
    canUndo: false,
    canRedo: false,
  });
  const [previewElement, setPreviewElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [extensions, setExtensions] = useState<Extension[] | null>(null);
  const [historyCommands, setHistoryCommands] = useState<Awaited<
    ReturnType<typeof loadMarkdownHistoryCommands>
  > | null>(null);

  useEffect(() => {
    if (readOnly) {
      return;
    }
    let cancelled = false;
    void Promise.all([
      buildMarkdownEditorExtensions(setHistoryState),
      loadMarkdownHistoryCommands(),
    ]).then(([nextExtensions, commands]) => {
      if (!cancelled) {
        setExtensions(nextExtensions);
        setHistoryCommands(commands);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [readOnly]);

  const isSourceLoading =
    !readOnly && (editorView === null || extensions === null);

  const bindPreviewScrollElement = useCallback(
    (node: HTMLDivElement | null) => {
      setPreviewElement(node);
    },
    [],
  );

  useMarkdownScrollSync(editorView, previewElement, !readOnly, value);

  const onClickUndo = useCallback(() => {
    if (editorView && historyCommands) {
      historyCommands.undo(editorView);
    }
  }, [editorView, historyCommands]);

  const onClickRedo = useCallback(() => {
    if (editorView && historyCommands) {
      historyCommands.redo(editorView);
    }
  }, [editorView, historyCommands]);

  return (
    <div
      className={cn(
        "markdown-editor-shell min-h-0 flex-1 rounded-md border border-input bg-card",
        isSourceLoading && "markdown-editor-shell--loading",
        className,
      )}
      aria-busy={isSourceLoading}
    >
      {!readOnly ? (
        <MarkdownEditorToolbar
          editorView={editorView}
          documentToolbar={documentToolbar}
          canUndo={historyState.canUndo}
          canRedo={historyState.canRedo}
          onClickUndo={onClickUndo}
          onClickRedo={onClickRedo}
        />
      ) : null}
      <div className="markdown-editor-body relative min-h-0 flex-1">
        {isSourceLoading ? (
          <div className="markdown-editor-loading-overlay">
            <MarkdownEditorLoadingUI className="h-full min-h-48 w-full" />
          </div>
        ) : null}
        {readOnly ? (
          <div className="markdown-editor-pane markdown-editor-pane--preview-only h-full overflow-auto">
            <MarkdownRenderer content={value} />
          </div>
        ) : (
          <ResizablePanelGroup
            id="markdown-editor-split"
            orientation={isMobile ? "vertical" : "horizontal"}
            className="markdown-editor-split"
          >
            <ResizablePanel
              id="markdown-editor-source"
              defaultSize="50"
              minSize="15"
              className="markdown-editor-pane markdown-editor-pane--source"
            >
              {extensions ? (
                <CodeMirror
                  value={value}
                  height="100%"
                  theme="none"
                  extensions={extensions}
                  readOnly={readOnly}
                  basicSetup={{
                    lineNumbers: false,
                    foldGutter: false,
                    highlightActiveLine: true,
                  }}
                  onChange={(next) => onChange?.(next)}
                  onCreateEditor={(view) => {
                    setEditorView(view);
                    if (historyCommands) {
                      setHistoryState({
                        canUndo: historyCommands.undoDepth(view.state) > 0,
                        canRedo: historyCommands.redoDepth(view.state) > 0,
                      });
                    }
                  }}
                />
              ) : null}
            </ResizablePanel>
            <ResizableHandle
              withHandle
              className="markdown-editor-split-handle"
            />
            <ResizablePanel
              id="markdown-editor-preview"
              defaultSize="50"
              minSize="15"
              className="flex min-h-0 flex-col overflow-hidden"
            >
              <div
                ref={bindPreviewScrollElement}
                className="markdown-editor-pane markdown-editor-pane--preview min-h-0 flex-1 overflow-auto"
              >
                <MarkdownRenderer content={value} />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        )}
      </div>
    </div>
  );
}
