import { EditorView } from "@codemirror/view";

export function createMarkdownEditorTheme(scale: number) {
  const fontSize = `${14 * scale}px`;
  const lineHeight = `${1.35 * scale}`;
  const padding = `${10 * scale}px`;

  return EditorView.theme(
    {
      "&": {
        height: "100%",
        fontSize,
        fontFamily: "var(--font-sans)",
        backgroundColor: "transparent",
        color: "var(--tree-glass-text)",
      },
      ".cm-editor": {
        backgroundColor: "transparent",
        height: "100%",
      },
      ".cm-scroller": {
        fontFamily: "inherit",
        lineHeight,
        backgroundColor: "transparent",
        overflow: "auto",
      },
      ".cm-content": {
        padding,
        caretColor: "var(--tree-glass-text)",
        color: "var(--tree-glass-text)",
      },
      ".cm-cursor": {
        borderInlineStartColor: "var(--tree-glass-text)",
      },
      ".cm-selectionBackground": {
        backgroundColor:
          "var(--tree-glass-highlight, rgba(255, 255, 255, 0.12)) !important",
      },
      ".cm-gutters": {
        display: "none",
      },
      "&.cm-focused": {
        outline: "none",
      },
      ".cm-activeLine": {
        backgroundColor: "rgba(255, 255, 255, 0.04)",
      },
    },
    { dark: true },
  );
}
