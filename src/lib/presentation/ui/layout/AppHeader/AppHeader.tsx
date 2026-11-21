"use client";

import { usePathname } from "next/navigation";
import { FolderUp, House, Users } from "lucide-react";
import { Permission } from "@/lib/domain/auth/permission";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import { useAuthSession } from "@/lib/presentation/ui/auth/use-auth-session";
import { useLogout } from "@/lib/presentation/ui/auth/use-logout";
import { usePermissions } from "@/lib/presentation/ui/auth/use-permissions";
import { usernameInitial } from "@/lib/presentation/ui/auth/username-initial";
import {
  Avatar,
  AvatarFallback,
} from "@/lib/presentation/ui/components/ui/avatar";
import type { MobileNavTabView } from "@/lib/presentation/ui/layout/MobileNav";
import {
  activeMobileNavItem,
  mobileNavItems,
  type MobileNavItemId,
} from "@/lib/presentation/ui/layout/MobileNav/mobileNavItems";
import AppHeaderUI from ".";

const HIDDEN_PATHS = new Set(["/login", "/403"]);

function isAppHeaderHidden(pathname: string): boolean {
  return HIDDEN_PATHS.has(pathname);
}

function roleLabel(
  role: "Admin" | "Member",
  copy: ReturnType<typeof getDictionary>["home"],
): string {
  return role === "Admin" ? copy.roleAdmin : copy.roleMember;
}

export default function AppHeader() {
  const pathname = usePathname();
  const { sessionActive, sessionReady, user } = useAuthSession();
  const { logout, isPending } = useLogout();
  const canManageUsers = usePermissions([Permission.UsersManage]);
  const dictionary = getDictionary();
  const authCopy = dictionary.auth;
  const homeCopy = dictionary.home;
  const navCopy = dictionary.nav;

  if (!sessionReady || !sessionActive || !user) {
    return null;
  }

  if (isAppHeaderHidden(pathname)) {
    return null;
  }

  const initial = usernameInitial(user.username);
  const labels: Record<MobileNavItemId, string> = {
    home: navCopy.home,
    files: navCopy.files,
    users: navCopy.users,
    profile: navCopy.profile,
  };
  const icons: Record<MobileNavItemId, React.ReactNode> = {
    home: <House aria-hidden="true" />,
    files: <FolderUp aria-hidden="true" />,
    users: <Users aria-hidden="true" />,
    profile: (
      <Avatar className="size-6">
        <AvatarFallback className="bg-brand/15 text-[10px] font-semibold text-brand">
          {initial}
        </AvatarFallback>
      </Avatar>
    ),
  };
  const tabs: MobileNavTabView[] = mobileNavItems({ canManageUsers }).map(
    (item) => ({ ...item, label: labels[item.id], icon: icons[item.id] }),
  );
  const activeTab = activeMobileNavItem(pathname);

  return (
    <AppHeaderUI
      translations={{
        accountMenu: authCopy.accountMenu,
        files: navCopy.files,
        profile: authCopy.profileLink,
        adminUsers: homeCopy.adminTitle,
        logout: authCopy.logoutButton,
        roleLabel: roleLabel(user.role, homeCopy),
        themeMode: authCopy.themeMode,
        navAriaLabel: navCopy.ariaLabel,
      }}
      username={user.username}
      usernameInitial={initial}
      filesHref="/files"
      profileHref="/profile"
      adminUsersHref="/admin/users"
      showAdminUsers={canManageUsers}
      isLoggingOut={isPending}
      onClickLogout={() => {
        void logout();
      }}
      mobileTitle={activeTab ? labels[activeTab] : dictionary.metadata.title}
      mobileTabs={tabs}
      activeMobileTab={activeTab}
    />
  );
}
