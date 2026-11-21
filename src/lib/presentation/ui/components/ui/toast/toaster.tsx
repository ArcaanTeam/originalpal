import { Toaster as Sonner, type ToasterProps } from "sonner";
import { useTheme } from "@/lib/presentation/ui/context/theme-provider";
import { TOAST_DURATION } from "./constants";
import "./toast.css";

export function Toaster({ ...props }: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      className="toaster group"
      closeButton
      dir="ltr"
      duration={TOAST_DURATION}
      expand={false}
      offset={16}
      position="bottom-left"
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        unstyled: true,
      }}
      {...props}
    />
  );
}
