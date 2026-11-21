import CommerceScreenUI from "./CommerceScreenUI";
import {
  findCommerceScreen,
  getNavigationGroups,
  type CommerceArea,
} from "./routeCatalog";

export interface CommerceScreenPageProps {
  area: CommerceArea;
  segments?: string[];
  query?: string;
}

export default function CommerceScreenPage({
  area,
  segments = [],
  query,
}: CommerceScreenPageProps) {
  const screen = findCommerceScreen(area, segments);
  if (!screen) return null;
  const pathname = `/${area === "store" ? "store" : "admin"}${segments.length ? `/${segments.join("/")}` : ""}`;
  return (
    <CommerceScreenUI
      screen={screen}
      pathname={pathname}
      navGroups={getNavigationGroups(area)}
      query={query}
    />
  );
}
