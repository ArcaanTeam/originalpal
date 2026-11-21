import * as React from "react";
import { cn } from "cn";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";

type PopoverAnchorContextValue = {
  anchorElement: HTMLElement | null;
  setAnchorElement: (element: HTMLElement | null) => void;
};

const PopoverAnchorContext =
  React.createContext<PopoverAnchorContextValue | null>(null);

function Popover({ children, ...props }: PopoverPrimitive.Root.Props) {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(
    null,
  );
  const anchorContext = React.useMemo(
    () => ({ anchorElement, setAnchorElement }),
    [anchorElement],
  );

  return (
    <PopoverAnchorContext.Provider value={anchorContext}>
      <PopoverPrimitive.Root data-slot="popover" {...props}>
        {children}
      </PopoverPrimitive.Root>
    </PopoverAnchorContext.Provider>
  );
}

function PopoverTrigger({
  asChild = false,
  children,
  render,
  ...props
}: PopoverPrimitive.Trigger.Props & { asChild?: boolean }) {
  const asChildElement =
    asChild && !render && React.isValidElement(children) ? children : undefined;

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      render={render ?? asChildElement}
      {...props}
    >
      {asChildElement ? null : children}
    </PopoverPrimitive.Trigger>
  );
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  side = "bottom",
  alignOffset = 0,
  collisionPadding,
  keepMounted = false,
  anchor: anchorProp,
  showBackdrop = false,
  backdropClassName,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    | "align"
    | "alignOffset"
    | "side"
    | "sideOffset"
    | "collisionPadding"
    | "anchor"
  > & {
    keepMounted?: boolean;
    showBackdrop?: boolean;
    backdropClassName?: string;
  }) {
  const anchorContext = React.useContext(PopoverAnchorContext);
  const anchorFromContext = anchorContext?.anchorElement ?? undefined;
  const anchor = anchorProp ?? anchorFromContext;

  return (
    <PopoverPrimitive.Portal keepMounted={keepMounted}>
      {showBackdrop ? (
        <PopoverPrimitive.Backdrop
          data-slot="popover-backdrop"
          className={cn("fixed inset-0 z-50 bg-black/20", backdropClassName)}
        />
      ) : null}
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        collisionPadding={collisionPadding}
        anchor={anchor}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 w-72 origin-(--transform-origin) rounded-xl border bg-card p-4 text-card-foreground outline-hidden data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverBackdrop({
  className,
  ...props
}: PopoverPrimitive.Backdrop.Props) {
  return (
    <PopoverPrimitive.Backdrop
      data-slot="popover-backdrop"
      className={cn("fixed inset-0 z-50 bg-black/20", className)}
      {...props}
    />
  );
}

function PopoverAnchor({ className, ...props }: React.ComponentProps<"div">) {
  const anchorContext = React.useContext(PopoverAnchorContext);

  const setAnchorRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      if (!anchorContext) {
        return;
      }
      anchorContext.setAnchorElement(node);
    },
    [anchorContext],
  );

  return (
    <div
      ref={setAnchorRef}
      data-slot="popover-anchor"
      className={className}
      {...props}
    />
  );
}

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
  PopoverBackdrop,
};
