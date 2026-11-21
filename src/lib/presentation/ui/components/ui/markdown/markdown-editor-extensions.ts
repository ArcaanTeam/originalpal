import type { Extension } from "@codemirror/state";

export type MarkdownHistorySnapshot = {
  canUndo: boolean;
  canRedo: boolean;
};

export async function buildMarkdownEditorExtensions(
  onHistoryChange: (snapshot: MarkdownHistorySnapshot) => void,
): Promise<Extension[]> {
  const [
    { markdown },
    { EditorView },
    { redoDepth, undoDepth },
    { createMarkdownEditorTheme },
  ] = await Promise.all([
    import("@codemirror/lang-markdown"),
    import("@codemirror/view"),
    import("@codemirror/commands"),
    import("./codemirror-theme"),
  ]);

  return [
    markdown(),
    createMarkdownEditorTheme(1),
    EditorView.lineWrapping,
    EditorView.contentAttributes.of({ dir: "auto", spellcheck: "true" }),
    EditorView.updateListener.of((update) => {
      if (
        !update.docChanged &&
        !update.transactions.some((tr) => tr.isUserEvent("input.history"))
      ) {
        return;
      }
      onHistoryChange({
        canUndo: undoDepth(update.state) > 0,
        canRedo: redoDepth(update.state) > 0,
      });
    }),
  ];
}

export async function loadMarkdownHistoryCommands() {
  const { redo, undo, redoDepth, undoDepth } =
    await import("@codemirror/commands");
  return { redo, undo, redoDepth, undoDepth };
}
