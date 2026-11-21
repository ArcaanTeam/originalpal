import { type ReactNode } from "react";

export type ToastColor = "primary" | "danger" | "success" | "warning";

export interface ToastOptions {
  id?: string | number;
  title: ReactNode;
  description?: ReactNode;
  duration?: number;
  iconDuration?: number;
  color?: ToastColor;
  closeIcon?: ReactNode;
  hideIcon?: boolean;
  hideCloseButton?: boolean;
  classNames?: {
    base?: string;
    title?: string;
    description?: string;
    icon?: string;
    closeButton?: string;
  };
  endContent?: ReactNode;
  onClose?: () => void;
  iconBg?: string;
  iconColor?: string;
}
