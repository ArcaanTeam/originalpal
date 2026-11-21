import * as React from "react";
import { cn } from "cn";
import { cva, type VariantProps } from "class-variance-authority";

const inputVariants = cva(
  "flex h-10 w-full min-w-0 items-center rounded-full border border-field-border bg-field px-4 py-2 text-sm text-field-foreground transition-colors outline-none selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-10 file:border-0 file:bg-transparent file:px-4 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&:-webkit-autofill]:shadow-[inset_0_0_0_1000px_var(--field)] [&:-webkit-autofill]:transition-[background-color_9999s_ease-out_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:var(--field-foreground)]",
  {
    variants: {
      variant: {
        default: "bg-field",
        ghost: "bg-transparent",
        search: "bg-field",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Input({
  className,
  type,
  variant,
  ref,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      ref={ref}
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
