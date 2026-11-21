import type { ReactNode } from "react";
import { cn } from "cn";
import type { Components } from "react-markdown";
import { dirPropForText, extractPlainText } from "./markdown-bidi";

function autoDirProps(children: ReactNode) {
  return dirPropForText(extractPlainText(children));
}

export const markdownComponents: Components = {
  p: ({ children, className, node: _node, ...props }) => (
    <p className={className} {...autoDirProps(children)} {...props}>
      {children}
    </p>
  ),
  h1: ({ children, className, node: _node, ...props }) => (
    <h1 className={className} {...autoDirProps(children)} {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, className, node: _node, ...props }) => (
    <h2 className={className} {...autoDirProps(children)} {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, className, node: _node, ...props }) => (
    <h3 className={className} {...autoDirProps(children)} {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, className, node: _node, ...props }) => (
    <h4 className={className} {...autoDirProps(children)} {...props}>
      {children}
    </h4>
  ),
  h5: ({ children, className, node: _node, ...props }) => (
    <h5 className={className} {...autoDirProps(children)} {...props}>
      {children}
    </h5>
  ),
  h6: ({ children, className, node: _node, ...props }) => (
    <h6 className={className} {...autoDirProps(children)} {...props}>
      {children}
    </h6>
  ),
  li: ({ children, className, node: _node, ...props }) => (
    <li className={className} {...autoDirProps(children)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, className, node: _node, ...props }) => (
    <blockquote className={className} {...autoDirProps(children)} {...props}>
      {children}
    </blockquote>
  ),
  th: ({ children, className, node: _node, align, ...props }) => (
    <th
      className={className}
      align={align}
      {...autoDirProps(children)}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ children, className, node: _node, align, ...props }) => (
    <td
      className={className}
      align={align}
      {...autoDirProps(children)}
      {...props}
    >
      {children}
    </td>
  ),
  table: ({ children, className, node: _node, ...props }) => (
    <div className="markdown-table-wrap">
      <table className={className} dir="auto" {...props}>
        {children}
      </table>
    </div>
  ),
  pre: ({ children, className, node: _node, ...props }) => (
    <pre className={cn("markdown-ltr", className)} dir="ltr" {...props}>
      {children}
    </pre>
  ),
  code: ({ children, className, node: _node, ...props }) => (
    <code className={cn("markdown-ltr", className)} dir="ltr" {...props}>
      {children}
    </code>
  ),
  a: ({ children, className, href, node: _node, ...props }) => {
    const text = extractPlainText(children);
    const hrefText = href ?? "";
    const dir =
      dominantFromUrl(hrefText) ?? (text ? dirPropForText(text).dir : "auto");

    return (
      <a
        className={cn("markdown-link", className)}
        href={href}
        dir={dir}
        {...props}
      >
        {children}
      </a>
    );
  },
};

function dominantFromUrl(href: string): "ltr" | undefined {
  if (/^https?:\/\//i.test(href) || href.includes("/")) {
    return "ltr";
  }
  return undefined;
}
