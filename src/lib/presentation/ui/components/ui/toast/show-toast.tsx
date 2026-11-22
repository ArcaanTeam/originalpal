import { type ReactNode } from "react";
import { cn } from "cn";
import { toast as sonnerToast, type ExternalToast } from "sonner";
import {
  defaultToastIcon,
  PROMISE_LOADING_TOAST_DURATION,
  TOAST_DURATION,
  toastColorMap,
  toastIconMap,
} from "./constants";
import { getNotificationAudio, getToastAudio } from "./toast-audio-store";
import { ToastIcon } from "./toast-icon";
import { type ToastColor, type ToastOptions } from "./types";

export function playToastSound() {
  const audio = getToastAudio();
  audio.currentTime = 0;
  void audio.play().catch(() => undefined);
}

export function playNotificationSound() {
  const audio = getNotificationAudio();
  audio.currentTime = 0;
  void audio.play().catch(() => undefined);
}

function mapExternalToast(
  options?: ExternalToast,
): Partial<ToastOptions> & { duration?: number } {
  if (!options) return {};

  const description =
    typeof options.description === "function"
      ? options.description()
      : options.description;

  return {
    description,
    id: options.id,
  };
}

function renderToastIcon(options: ToastOptions, iconDuration: number) {
  if (options.hideIcon) return undefined;

  const color = options.color ?? "primary";
  const Icon = toastIconMap[color] ?? defaultToastIcon;
  const defaultColors = toastColorMap[color] ?? toastColorMap.primary;

  return (
    <ToastIcon
      Icon={Icon}
      bg={options.iconBg ?? defaultColors.bg}
      colorClass={options.iconColor ?? defaultColors.colorClass}
      duration={iconDuration}
    />
  );
}

function buildExternalToast(options: ToastOptions): ExternalToast {
  const duration = options.duration ?? TOAST_DURATION;
  const iconDuration = options.iconDuration ?? duration;
  const { classNames } = options;

  return {
    classNames: {
      closeButton: cn(
        "static! inset-auto! order-first m-0! shrink-0 transform-none! rounded-full border-0! bg-transparent! p-1 text-muted-foreground! opacity-70 transition-[color,background-color,opacity] hover:bg-foreground/8! hover:text-foreground! hover:opacity-100",
        "max-md:p-0.5",
        classNames?.closeButton,
      ),
      content: "order-2 flex min-w-0 flex-1 flex-col gap-0.5",
      description: cn(
        "text-right text-xs leading-relaxed whitespace-normal text-muted-foreground!",
        "max-md:text-[11px] max-md:leading-tight",
        classNames?.description,
      ),
      icon: "order-last m-0! shrink-0",
      title: cn(
        "text-right text-sm leading-snug font-semibold tracking-tight",
        "max-md:text-xs max-md:leading-tight",
        classNames?.title,
      ),
      toast: cn(
        "toast-surface inline-flex w-fit max-w-md flex-row items-center gap-3 rounded-[1.375rem] py-3 ps-3 pe-3.5 text-foreground",
        "max-md:max-w-[min(100vw-4rem,18rem)] max-md:gap-2 max-md:rounded-2xl max-md:p-2.5",
        classNames?.base,
      ),
      cancelButton: "bg-red-600",
    },
    closeButton: options.hideCloseButton ? false : true,
    description: options.description ? (
      <span dir="rtl">{options.description}</span>
    ) : undefined,
    dismissible: true,
    duration,
    icon: renderToastIcon(options, iconDuration),
    id: options.id,
    onAutoClose: options.onClose,
    onDismiss: options.onClose,
    unstyled: true,
  };
}

type SonnerToastType = "success" | "error" | "warning" | "info" | "default";

function getSonnerType(color: ToastColor): SonnerToastType {
  switch (color) {
    case "success":
      return "success";
    case "danger":
      return "error";
    case "warning":
      return "warning";
    case "primary":
      return "info";
    default:
      return "default";
  }
}

function showTypedToast(type: SonnerToastType, options: ToastOptions) {
  playToastSound();

  const external = buildExternalToast(options);
  const title = <span dir="rtl">{options.title}</span>;

  switch (type) {
    case "success":
      return sonnerToast.success(title, external);
    case "error":
      return sonnerToast.error(title, external);
    case "warning":
      return sonnerToast.warning(title, external);
    case "info":
      return sonnerToast.info(title, external);
    default:
      return sonnerToast(title, external);
  }
}

export function showToast(options: ToastOptions) {
  return showTypedToast(getSonnerType(options.color ?? "primary"), options);
}

function createToast(color: ToastColor) {
  return (title: ReactNode, options?: ExternalToast) =>
    showTypedToast(getSonnerType(color), {
      color,
      title,
      ...mapExternalToast(options),
    });
}

type PromiseOptions<T> = {
  loading: ReactNode;
  success: ReactNode | ((data: T) => ReactNode);
  error: ReactNode | ((error: unknown) => ReactNode);
  id?: string | number;
};

function resolvePromiseMessage<T>(
  value: ReactNode | ((data: T) => ReactNode),
  data: T,
) {
  return typeof value === "function" ? value(data) : value;
}

export const toast = Object.assign(showToast, {
  success: createToast("success"),
  error: createToast("danger"),
  warning: createToast("warning"),
  message: createToast("primary"),
  info: createToast("primary"),
  dismiss: sonnerToast.dismiss,
  promise: <T,>(
    promiseInput: Promise<T> | (() => Promise<T>),
    options: PromiseOptions<T>,
  ) => {
    const loadingId = showToast({
      color: "primary",
      duration: PROMISE_LOADING_TOAST_DURATION,
      iconDuration: 0,
      id: options.id,
      title: options.loading,
    });

    const run =
      typeof promiseInput === "function" ? promiseInput() : promiseInput;

    return run
      .then((data) => {
        sonnerToast.dismiss(loadingId);
        showToast({
          color: "success",
          title: resolvePromiseMessage(options.success, data),
        });
        return data;
      })
      .catch((error) => {
        sonnerToast.dismiss(loadingId);
        showToast({
          color: "danger",
          title: resolvePromiseMessage(options.error, error),
        });
        throw error;
      });
  },
});
