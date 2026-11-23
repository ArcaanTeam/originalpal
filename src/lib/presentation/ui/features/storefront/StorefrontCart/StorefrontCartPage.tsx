import StorefrontCartUI from "./StorefrontCartUI";

export default function StorefrontCartPage({
  mode = "cart",
}: {
  mode?: "cart" | "empty";
}) {
  return <StorefrontCartUI mode={mode} />;
}
