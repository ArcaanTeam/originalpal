import { cn } from "cn";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

type CheckboxProps = Omit<CheckboxPrimitive.Root.Props, "checked"> & {
  checked?: boolean | "indeterminate";
};

function Checkbox({ className, checked, ...props }: CheckboxProps) {
  const indeterminate = checked === "indeterminate";
  const resolvedChecked = checked === "indeterminate" ? undefined : checked;

  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-sm border border-input bg-card transition-colors outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50 dark:aria-invalid:ring-destructive/40 dark:data-checked:bg-primary",
        className,
      )}
      checked={resolvedChecked}
      indeterminate={indeterminate}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-primary-foreground!"
      >
        <CheckIcon className="size-3.5 text-primary-foreground!" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
