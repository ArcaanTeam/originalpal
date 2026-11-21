import { defaultSchema } from "rehype-sanitize";

export const markdownSanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), "className", "class"],
    span: [...(defaultSchema.attributes?.span ?? []), "className", "class"],
    div: [...(defaultSchema.attributes?.div ?? []), "className", "class"],
    pre: [...(defaultSchema.attributes?.pre ?? []), "className", "class"],
    input: [
      ...(defaultSchema.attributes?.input ?? []),
      "type",
      "disabled",
      "checked",
    ],
  },
  tagNames: [
    ...(defaultSchema.tagNames ?? []),
    "input",
    "del",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
  ],
};
