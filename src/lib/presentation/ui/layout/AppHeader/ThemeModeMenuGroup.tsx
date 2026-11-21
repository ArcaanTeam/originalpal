"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/lib/presentation/ui/components/ui/dropdown-menu";
import {
  useTheme,
  type Theme,
} from "@/lib/presentation/ui/context/theme-provider";

const MODES: { id: Theme; label: string; icon: typeof Sun }[] = [
  { id: "light", label: "روشن", icon: Sun },
  { id: "dark", label: "تاریک", icon: Moon },
  { id: "system", label: "سیستم", icon: Monitor },
];

export interface ThemeModeMenuGroupProps {
  translations: {
    sectionLabel: string;
  };
}

export default function ThemeModeMenuGroup(props: ThemeModeMenuGroupProps) {
  const { theme, setTheme } = useTheme();
  const active = theme ?? "system";

  return (
    <>
      <DropdownMenuSeparator />
      <DropdownMenuSub>
        <DropdownMenuSubTrigger>
          <Sun className="size-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 text-start">
            {props.translations.sectionLabel}
          </span>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal text-muted-foreground">
              {props.translations.sectionLabel}
            </DropdownMenuLabel>
            {MODES.map((mode) => {
              const Icon = mode.icon;
              return (
                <DropdownMenuItem
                  key={mode.id}
                  onClick={() => setTheme(mode.id)}
                  className={active === mode.id ? "bg-accent" : undefined}
                >
                  <Icon className="size-4 shrink-0" aria-hidden="true" />
                  <span className="flex-1 text-start">{mode.label}</span>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuGroup>
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    </>
  );
}
