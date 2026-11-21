import * as React from "react";
import { cn } from "cn";

/** Ring around a row: top/bottom on every cell, start/end caps on first/last only. */
const tableRowRingClassName =
  "border-y border-transparent first:border-s last:border-e";

const tableHeaderRingClassName = cn(tableRowRingClassName, "border-border");

const tableBodyRingClassName = cn(
  tableRowRingClassName,
  "group-hover/row:border-border group-data-selected/row:border-border",
);

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full min-w-0 scroll-pe-2 overflow-x-auto overscroll-x-contain bg-transparent"
    >
      <table
        data-slot="table"
        className={cn(
          "caption-bottom border-separate border-spacing-y-1 bg-transparent text-[13px] text-card-foreground",
          className,
          // Keep after className so consumer min-w-* cannot override full-width fill.
          "w-max min-w-full",
        )}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn("group/row transition-[border-color]", className)}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        tableHeaderRingClassName,
        "h-[52px] bg-card px-2 text-start align-middle font-medium whitespace-nowrap text-card-foreground",
        "first:rounded-s-md last:rounded-e-md",
        "has-[[role=checkbox]]:w-0 has-[[role=checkbox]]:max-w-12 has-[[role=checkbox]]:min-w-12 has-[[role=checkbox]]:px-0 has-[[role=checkbox]]:text-center *:[[role=checkbox]]:mt-1 *:[[role=checkbox]]:inline-flex",
        className,
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        tableBodyRingClassName,
        "bg-card px-2 py-1 align-middle whitespace-nowrap text-card-foreground",
        "first:rounded-s-md last:rounded-e-md",
        "has-[[role=checkbox]]:w-0 has-[[role=checkbox]]:max-w-12 has-[[role=checkbox]]:min-w-12 has-[[role=checkbox]]:p-0 has-[[role=checkbox]]:text-center *:[[role=checkbox]]:mt-1 *:[[role=checkbox]]:inline-flex",
        className,
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("mt-4 text-[13px] text-muted-foreground", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
