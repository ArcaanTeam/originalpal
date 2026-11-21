import Link from "next/link";
import { cn } from "cn";
import { FolderUp, LogOut, Shield, UserRound } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
} from "@/lib/presentation/ui/components/ui/avatar";
import { Badge } from "@/lib/presentation/ui/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/lib/presentation/ui/components/ui/dropdown-menu";
import FloatingContainerUI from "@/lib/presentation/ui/layout/FloatingContainer";
import MobileNavUI, {
  type MobileNavTabView,
} from "@/lib/presentation/ui/layout/MobileNav";
import type { MobileNavItemId } from "@/lib/presentation/ui/layout/MobileNav/mobileNavItems";
import { APP_LIQUID_GLASS_CHIP_CLASS } from "@/lib/presentation/ui/layout/liquid-glass";
import ThemeModeMenuGroup from "./ThemeModeMenuGroup";

export interface AppHeaderUIProps {
  translations: {
    accountMenu: string;
    files: string;
    profile: string;
    adminUsers: string;
    logout: string;
    roleLabel: string;
    themeMode: string;
    navAriaLabel: string;
  };
  username: string;
  usernameInitial: string;
  filesHref: string;
  profileHref: string;
  adminUsersHref: string;
  showAdminUsers: boolean;
  isLoggingOut: boolean;
  onClickLogout: () => void;
  /** Page title for the mobile top bar. */
  mobileTitle: string;
  /** Bottom tab bar; omitted on pages without one. */
  mobileTabs: MobileNavTabView[] | null;
  activeMobileTab: MobileNavItemId | null;
}

/**
 * Desktop: a floating glass avatar in the shell corner.
 * Mobile (panel-web chrome): a frosted top bar with the page title and the
 * account menu, plus a bottom tab bar.
 */
export default function AppHeaderUI(props: AppHeaderUIProps) {
  return (
    <>
      <header className="pointer-events-none fixed inset-e-7 top-7 z-60 max-md:hidden">
        <AccountMenu {...props} triggerClassName="pointer-events-auto" />
      </header>

      <FloatingContainerUI variant="header">
        <div className="flex h-12 w-full items-center gap-3 bg-card ps-5 pe-3">
          <h1 className="min-w-0 flex-1 truncate text-base font-semibold tracking-tight">
            {props.mobileTitle}
          </h1>
          <AccountMenu {...props} avatarClassName="size-8" />
        </div>
      </FloatingContainerUI>

      {props.mobileTabs ? (
        <FloatingContainerUI variant="footer">
          <MobileNavUI
            ariaLabel={props.translations.navAriaLabel}
            tabs={props.mobileTabs}
            activeId={props.activeMobileTab}
          />
        </FloatingContainerUI>
      ) : null}
    </>
  );
}

function AccountMenu(
  props: AppHeaderUIProps & {
    triggerClassName?: string;
    avatarClassName?: string;
  },
) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "rounded-full outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
          props.triggerClassName,
        )}
        aria-label={props.translations.accountMenu}
      >
        <Avatar
          className={cn(
            "size-9",
            APP_LIQUID_GLASS_CHIP_CLASS,
            props.avatarClassName,
          )}
        >
          <AvatarFallback className="bg-transparent text-sm font-semibold text-foreground">
            {props.usernameInitial}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col items-start gap-1.5 py-0.5 text-start">
              <span className="truncate leading-none font-medium">
                {props.username}
              </span>
              <Badge variant="secondary" className="w-fit">
                {props.translations.roleLabel}
              </Badge>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={props.filesHref}>
              <FolderUp className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1 text-start">
                {props.translations.files}
              </span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={props.profileHref}>
              <UserRound className="size-4 shrink-0" aria-hidden="true" />
              <span className="flex-1 text-start">
                {props.translations.profile}
              </span>
            </Link>
          </DropdownMenuItem>
          {props.showAdminUsers ? (
            <DropdownMenuItem asChild>
              <Link href={props.adminUsersHref}>
                <Shield className="size-4 shrink-0" aria-hidden="true" />
                <span className="flex-1 text-start">
                  {props.translations.adminUsers}
                </span>
              </Link>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuGroup>
        <ThemeModeMenuGroup
          translations={{ sectionLabel: props.translations.themeMode }}
        />
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            disabled={props.isLoggingOut}
            onClick={props.onClickLogout}
          >
            <LogOut className="size-4 shrink-0" aria-hidden="true" />
            <span className="flex-1 text-start">
              {props.translations.logout}
            </span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
