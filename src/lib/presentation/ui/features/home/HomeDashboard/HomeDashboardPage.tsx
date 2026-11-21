import {
  getPermissionsForRole,
  hasAnyPermission,
  Permission,
} from "@/lib/domain/auth/permission";
import { getSessionFromCookies } from "@/lib/infrastructure/auth/session";
import {
  formatMessage,
  getDictionary,
} from "@/lib/presentation/i18n/dictionary";
import HomeDashboardUI from ".";

export default async function HomeDashboardPage() {
  const session = await getSessionFromCookies();
  if (!session) {
    return null;
  }

  const homeCopy = getDictionary().home;
  const canManageUsers = hasAnyPermission(getPermissionsForRole(session.role), [
    Permission.UsersManage,
  ]);

  return (
    <HomeDashboardUI
      translations={{
        title: homeCopy.title,
        tagline: homeCopy.tagline,
        welcome: formatMessage(homeCopy.welcome, {
          username: session.username,
        }),
        sectionTitle: homeCopy.sectionTitle,
      }}
      navItems={[
        {
          href: "/files",
          title: homeCopy.filesTitle,
          description: homeCopy.filesDescription,
        },
        {
          href: "/profile",
          title: homeCopy.profileTitle,
          description: homeCopy.profileDescription,
        },
        ...(canManageUsers
          ? [
              {
                href: "/admin/users",
                title: homeCopy.adminTitle,
                description: homeCopy.adminDescription,
              },
            ]
          : []),
      ]}
    />
  );
}
