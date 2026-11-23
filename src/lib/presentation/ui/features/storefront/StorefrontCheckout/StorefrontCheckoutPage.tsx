import StorefrontCheckoutUI from "./StorefrontCheckoutUI";

export default function StorefrontCheckoutPage({
  mode,
}: {
  mode: "shipping" | "payment";
}) {
  return <StorefrontCheckoutUI mode={mode} />;
}
