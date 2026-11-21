"use client";

import { useEffect, useRef } from "react";
import type { EditorView } from "@codemirror/view";

function syncScrollPosition(from: HTMLElement, to: HTMLElement) {
  const fromMax = from.scrollHeight - from.clientHeight;
  const toMax = to.scrollHeight - to.clientHeight;

  if (fromMax <= 0) {
    to.scrollTop = 0;
    return;
  }

  const ratio = from.scrollTop / fromMax;
  to.scrollTop = ratio * Math.max(0, toMax);
}

/**
 * Keeps the markdown source (CodeMirror) and preview panes at the same scroll ratio.
 */
export function useMarkdownScrollSync(
  editorView: EditorView | null,
  previewElement: HTMLElement | null,
  enabled: boolean,
  contentKey?: string,
) {
  const syncingRef = useRef(false);

  useEffect(() => {
    if (!enabled || !editorView || !previewElement) {
      return;
    }

    const source = editorView.scrollDOM;

    const runSync = (from: HTMLElement, to: HTMLElement) => {
      if (syncingRef.current) {
        return;
      }
      syncingRef.current = true;
      syncScrollPosition(from, to);
      requestAnimationFrame(() => {
        syncingRef.current = false;
      });
    };

    const onSourceScroll = () => runSync(source, previewElement);
    const onPreviewScroll = () => runSync(previewElement, source);

    source.addEventListener("scroll", onSourceScroll, { passive: true });
    previewElement.addEventListener("scroll", onPreviewScroll, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(() => {
      runSync(source, previewElement);
    });
    resizeObserver.observe(source);
    resizeObserver.observe(previewElement);

    const mutationObserver = new MutationObserver(() => {
      runSync(source, previewElement);
    });
    mutationObserver.observe(previewElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    runSync(source, previewElement);

    return () => {
      source.removeEventListener("scroll", onSourceScroll);
      previewElement.removeEventListener("scroll", onPreviewScroll);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [editorView, previewElement, enabled]);

  useEffect(() => {
    if (!enabled || !editorView || !previewElement) {
      return;
    }
    syncScrollPosition(editorView.scrollDOM, previewElement);
  }, [contentKey, editorView, previewElement, enabled]);
}
