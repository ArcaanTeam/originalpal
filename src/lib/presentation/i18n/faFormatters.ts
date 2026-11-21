/** Stable Intl formatters for fa-IR (safe to reuse across renders). */
export const faDateFormatter = new Intl.DateTimeFormat("fa-IR");

export const faDateTimeFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "short",
  timeStyle: "short",
});
