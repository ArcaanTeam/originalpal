"use client";

import { useMemo, useState } from "react";
import type { UserRoleDto } from "@/lib/presentation/data/feature/user/types";
import useCreateUser from "@/lib/presentation/data/feature/user/useCreateUser";
import useDeleteUser from "@/lib/presentation/data/feature/user/useDeleteUser";
import useGetUsers from "@/lib/presentation/data/feature/user/useGetUsers";
import useUpdateUserRole from "@/lib/presentation/data/feature/user/useUpdateUserRole";
import { faDateFormatter } from "@/lib/presentation/i18n/faFormatters";
import { useAuthSession } from "@/lib/presentation/ui/auth/use-auth-session";
import UserManagementUI from ".";
import UserManagementErrorUI from "./error";
import UserManagementLoadingUI from "./loading";

const ROLE_OPTIONS: Array<{ value: UserRoleDto; label: string }> = [
  { value: "Admin", label: "مدیر" },
  { value: "Member", label: "عضو" },
];

function roleLabel(role: UserRoleDto): string {
  return ROLE_OPTIONS.find((option) => option.value === role)?.label ?? role;
}

export default function UserManagementPage() {
  const { user: currentUser } = useAuthSession();
  const { users, succeed } = useGetUsers();
  const { createUser, isPending: isCreating } = useCreateUser();
  const { updateUserRole, isPending: isUpdatingRole } = useUpdateUserRole();
  const { deleteUser, isPending: isDeleting } = useDeleteUser();

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState<UserRoleDto>("Member");

  const isMutating = isCreating || isUpdatingRole || isDeleting;

  const rows = useMemo(
    () =>
      users.map((user) => ({
        id: user.id,
        username: user.username,
        role: user.role,
        roleLabel: roleLabel(user.role),
        createdAtLabel: faDateFormatter.format(new Date(user.created_at)),
        isSelf: user.id === currentUser?.id,
      })),
    [users, currentUser?.id],
  );

  if (succeed === null) {
    return <UserManagementLoadingUI />;
  }
  if (succeed === false) {
    return <UserManagementErrorUI />;
  }

  return (
    <UserManagementUI
      translations={{
        title: "مدیریت کاربران",
        description: "ایجاد حساب، تغییر نقش و حذف کاربران سیستم.",
        backLink: "بازگشت به خانه",
        createHeading: "کاربر جدید",
        usernameLabel: "نام کاربری",
        usernamePlaceholder: "نام کاربری",
        passwordLabel: "رمز عبور",
        passwordPlaceholder: "حداقل ۸ کاراکتر",
        roleLabel: "نقش",
        createButton: "ایجاد کاربر",
        tableHead: {
          username: "نام کاربری",
          role: "نقش",
          createdAt: "تاریخ ایجاد",
          actions: "عملیات",
        },
        deleteButton: "حذف",
        selfBadge: "شما",
        empty: "کاربری ثبت نشده است.",
        roleOptions: ROLE_OPTIONS,
      }}
      rows={rows}
      newUsername={newUsername}
      newPassword={newPassword}
      newRole={newRole}
      isCreating={isCreating}
      isMutating={isMutating}
      onChangeNewUsername={setNewUsername}
      onChangeNewPassword={setNewPassword}
      onSelectNewRole={(role) => setNewRole(role as UserRoleDto)}
      onClickCreate={async () => {
        await createUser({
          username: newUsername.trim(),
          password: newPassword,
          role: newRole,
        });
        setNewUsername("");
        setNewPassword("");
        setNewRole("Member");
      }}
      onSelectUserRole={async (userId, role) => {
        await updateUserRole({
          userId,
          role: role as UserRoleDto,
        });
      }}
      onClickDeleteUser={async (userId) => {
        const target = users.find((item) => item.id === userId);
        if (!target) {
          return;
        }
        const confirmed = window.confirm(`کاربر «${target.username}» حذف شود؟`);
        if (!confirmed) {
          return;
        }
        await deleteUser({ userId });
      }}
    />
  );
}
