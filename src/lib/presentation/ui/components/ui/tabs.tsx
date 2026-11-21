import {
  Activity,
  createContext,
  useContext,
  type ReactNode,
  useEffect,
  useRef,
} from "react";
import { cn } from "cn";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

const TabPanelActiveContext = createContext(true);

/** Whether the nearest {@link ActivityTabPanel} is the active tab panel. */
export function useTabPanelActive() {
  return useContext(TabPanelActiveContext);
}

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-10 w-fit items-center justify-center gap-1 rounded-lg bg-background p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md px-4 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors outline-none hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:opacity-50 data-active:bg-card data-active:text-foreground data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

type ActivityTabPanelProps = {
  active: boolean;
  children: ReactNode;
  className?: string;
};

function ActivityTabPanel({
  active,
  children,
  className,
}: ActivityTabPanelProps) {
  const wasActiveRef = useRef(active);

  useEffect(() => {
    wasActiveRef.current = active;
  }, [active]);

  return (
    <TabPanelActiveContext.Provider value={active}>
      <Activity mode={active ? "visible" : "hidden"}>
        <div aria-hidden={!active} className={className}>
          {children}
        </div>
      </Activity>
    </TabPanelActiveContext.Provider>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent, ActivityTabPanel };
