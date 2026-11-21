import type { ReactNode } from "react";

const RTL_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
const LTR_STRONG = /[A-Za-z0-9]/;

export type MarkdownTextDirection = "rtl" | "ltr" | "auto";

/**
 * Picks block direction from strong characters (Persian/Arabic vs Latin).
 * Returns `auto` when ambiguous or empty so the UA can decide.
 */
export function dominantTextDirection(text: string): MarkdownTextDirection {
  const sample = text.replace(/\s+/g, "");
  if (!sample) {
    return "auto";
  }

  let rtl = 0;
  let ltr = 0;

  for (const char of sample) {
    if (RTL_SCRIPT.test(char)) {
      rtl += 1;
    } else if (LTR_STRONG.test(char)) {
      ltr += 1;
    }
  }

  if (rtl > ltr) {
    return "rtl";
  }
  if (ltr > rtl) {
    return "ltr";
  }
  return "auto";
}

export function dirPropForText(text: string): { dir: MarkdownTextDirection } {
  return { dir: dominantTextDirection(text) };
}

export function extractPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") {
    return "";
  }
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(extractPlainText).join("");
  }
  if (typeof node === "object" && "props" in node) {
    const props = node.props as { children?: ReactNode };
    return extractPlainText(props.children);
  }
  return "";
}
