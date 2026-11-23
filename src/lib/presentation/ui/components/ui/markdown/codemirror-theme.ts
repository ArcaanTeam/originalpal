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
        color: "var(--foreground)",
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
        caretColor: "var(--foreground)",
        color: "var(--foreground)",
      },
      ".cm-cursor": {
        borderInlineStartColor: "var(--foreground)",
      },
      ".cm-selectionBackground": {
        backgroundColor: "var(--accent) !important",
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
