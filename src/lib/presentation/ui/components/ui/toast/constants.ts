import { AlertTriangle, Check, CheckCircle, Info, X } from "lucide-react";
import { type ToastColor } from "./types";

export const TOAST_DURATION = 3000;

/** Keeps the promise loading toast visible until the promise settles. */
export const PROMISE_LOADING_TOAST_DURATION = 10 * 60 * 1000;

export const TOAST_SOUND_URL = "";

export const NOTIFICATION_SOUND_URL = "";

export const toastIconMap = {
  danger: X,
  primary: Info,
  success: Check,
  warning: AlertTriangle,
} as const;

export const toastColorMap: Record<
  ToastColor,
  { bg: string; colorClass: string }
> = {
  danger: {
    bg: "bg-red-950/50 dark:bg-red-50",
    colorClass: "text-red-400 dark:text-red-600",
  },
  primary: {
    bg: "bg-blue-950/50 dark:bg-blue-50",
    colorClass: "text-blue-400 dark:text-blue-600",
  },
  success: {
    bg: "bg-green-950/50 dark:bg-green-50",
    colorClass: "text-green-400 dark:text-green-600",
  },
  warning: {
    bg: "bg-amber-950/50 dark:bg-amber-50",
    colorClass: "text-amber-400 dark:text-amber-600",
  },
};

export const defaultToastIcon = CheckCircle;
