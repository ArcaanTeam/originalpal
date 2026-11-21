import { cn } from "cn";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2Icon } from "lucide-react";

const spinnerVariants = cva("animate-spin shrink-0", {
  variants: {
    size: {
      xs: "size-3",
      sm: "size-3.5",
      default: "size-4",
      md: "size-5",
      lg: "size-6",
      xl: "size-8",
    },
    variant: {
      default: "text-muted-foreground",
      brand: "text-brand",
      primary: "text-primary",
      inherit: "text-current",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

type SpinnerProps = React.ComponentProps<"svg"> &
  VariantProps<typeof spinnerVariants> & {
    /** Use when a parent control already exposes loading/busy state. */
    decorative?: boolean;
  };

function Spinner({
  className,
  size,
  variant,
  decorative = false,
  ...props
}: SpinnerProps) {
  return (
    <Loader2Icon
      role={decorative ? undefined : "status"}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : "در حال بارگذاری"}
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    />
  );
}

export { Spinner, spinnerVariants };
