import StorefrontPaymentResultUI from "./StorefrontPaymentResultUI";

export default function StorefrontPaymentResultPage({
  mode,
}: {
  mode: "success" | "failed";
}) {
  return <StorefrontPaymentResultUI mode={mode} />;
}
