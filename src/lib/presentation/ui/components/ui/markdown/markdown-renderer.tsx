"use client";

import { cn } from "cn";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";
import { markdownComponents } from "./markdown-components";
import "./markdown-content.css";
import { markdownSanitizeSchema } from "./markdown-plugins";

export interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export default function MarkdownRenderer({
  content,
  className,
}: MarkdownRendererProps) {
  return (
    <div
      className={cn("markdown-content", className)}
      dir="auto"
      data-color-mode="inherit"
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkEmoji, remarkBreaks]}
        rehypePlugins={[
          rehypeHighlight,
          [rehypeSanitize, markdownSanitizeSchema],
        ]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
