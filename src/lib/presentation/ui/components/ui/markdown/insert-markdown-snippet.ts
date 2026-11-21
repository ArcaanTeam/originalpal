import type { EditorView } from "@codemirror/view";

export function insertMarkdownSnippet(
  view: EditorView,
  before: string,
  after: string,
  placeholder = "",
) {
  const { from, to } = view.state.selection.main;
  const selected = view.state.doc.sliceString(from, to);
  const inner = selected || placeholder;
  const insert = `${before}${inner}${after}`;

  if (selected) {
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: from + insert.length, head: from + insert.length },
    });
  } else {
    const start = from + before.length;
    const end = start + placeholder.length;
    view.dispatch({
      changes: { from, to, insert },
      selection: { anchor: start, head: end },
    });
  }
  view.focus();
}

export function insertTextAtCursor(view: EditorView, text: string) {
  const { from, to } = view.state.selection.main;
  view.dispatch({
    changes: { from, to, insert: text },
    selection: { anchor: from + text.length, head: from + text.length },
  });
  view.focus();
}

export function applyMarkdownHeading(view: EditorView, level: number) {
  const clamped = Math.min(6, Math.max(1, level));
  const hashes = "#".repeat(clamped);
  const { from, to } = view.state.selection.main;
  const line = view.state.doc.lineAt(from);
  const selected = view.state.doc.sliceString(from, to);
  const lineText = view.state.doc.sliceString(line.from, line.to);
  const withoutHeading = lineText.replace(/^#{1,6}\s*/, "");
  const text = selected || withoutHeading.trim() || "عنوان";
  const insert = `${hashes} ${text}`;

  view.dispatch({
    changes: { from: line.from, to: line.to, insert },
    selection: {
      anchor: line.from + hashes.length + 1,
      head: line.from + hashes.length + 1 + text.length,
    },
  });
  view.focus();
}
