import StorefrontBrowseUI, {
  type StorefrontBrowseMode,
} from "./StorefrontBrowseUI";

export default function StorefrontBrowsePage({
  segments,
  query,
}: {
  segments: string[];
  query?: string;
}) {
  const path = segments.join("/");
  let mode: StorefrontBrowseMode;
  if (segments[0] === "category" && segments.length === 2) mode = "category";
  else if (path === "search/filters") mode = "filters";
  else if (path === "search/sort") mode = "sort";
  else if (path === "search/suggestions") mode = "suggestions";
  else if (path === "search/empty") mode = "empty";
  else if (path === "search") mode = "search";
  else if (path === "compare") mode = "compare";
  else return null;
  return <StorefrontBrowseUI mode={mode} query={query} />;
}
