import * as React from "react";
import { cn } from "cn";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { resolveNativeButton } from "@/lib/presentation/ui/components/ui/resolve-native-button";
import {
  Spinner,
  spinnerVariants,
} from "@/lib/presentation/ui/components/ui/spinner";

function spinnerSizeForButton(
  size: VariantProps<typeof buttonVariants>["size"],
): VariantProps<typeof spinnerVariants>["size"] {
  if (size === "xs" || size === "icon-xs") {
    return "xs";
  }
  if (size === "sm" || size === "icon-sm") {
    return "sm";
  }
  if (size === "lg" || size === "icon-lg") {
    return "md";
  }
  return "default";
}

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-card text-card-foreground text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        outline:
          "border border-input hover:bg-hover hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent hover:bg-hover hover:text-accent-foreground",
        "destructive-ghost":
          "bg-transparent text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90",
        link: "bg-transparent text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 px-5 has-data-[icon=inline-start]:pl-4 has-data-[icon=inline-end]:pr-4",
        sm: "h-9 gap-1.5 px-4 has-data-[icon=inline-start]:pl-3 has-data-[icon=inline-end]:pr-3",
        xs: 'h-8 gap-1 px-3 text-xs has-data-[icon=inline-start]:pl-2 has-data-[icon=inline-end]:pr-2 [&_svg:not([class*="size-"])]:size-3.5',
        lg: "h-11 px-6 has-data-[icon=inline-start]:pl-5 has-data-[icon=inline-end]:pr-5",
        icon: "size-10",
        "icon-xs": 'size-6 [&_svg:not([class*="size-"])]:size-3',
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  disabled,
  render,
  nativeButton,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const isDisabled = Boolean(disabled || loading);
  const asChildElement =
    asChild && !render && React.isValidElement(children) ? children : undefined;
  const resolvedRender = render ?? asChildElement;

  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(
        buttonVariants({ variant, size, className }),
        loading && "relative",
      )}
      disabled={isDisabled}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      render={resolvedRender}
      nativeButton={resolveNativeButton(nativeButton, resolvedRender)}
      {...props}
    >
      {asChildElement ? null : loading ? (
        <>
          <Spinner
            className="absolute"
            decorative
            variant="inherit"
            size={spinnerSizeForButton(size)}
          />
          <span
            className="invisible inline-flex items-center justify-center gap-2"
            aria-hidden
          >
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </ButtonPrimitive>
  );
}

export { Button, buttonVariants };
