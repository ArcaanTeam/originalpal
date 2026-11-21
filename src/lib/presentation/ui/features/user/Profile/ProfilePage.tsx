"use client";

import { useState } from "react";
import useUpdatePassword from "@/lib/presentation/data/feature/auth/useUpdatePassword";
import useUpdateUsername from "@/lib/presentation/data/feature/auth/useUpdateUsername";
import type { AuthUser } from "@/lib/presentation/ui/auth/session-store";
import { useAuthSession } from "@/lib/presentation/ui/auth/use-auth-session";
import { ApiClientError } from "@/lib/presentation/ui/feedback/api-error";
import { resolveApiErrorMessage } from "@/lib/presentation/ui/feedback/resolve-api-error-message";
import { showErrorToast } from "@/lib/presentation/ui/feedback/show-feedback";
import ProfileUI from ".";

export default function ProfilePage() {
  const { user, sessionReady, sessionActive } = useAuthSession();

  if (!sessionReady || !sessionActive || !user) {
    return null;
  }

  return <ProfilePageAuthenticated key={user.id} user={user} />;
}

function ProfilePageAuthenticated({ user }: { user: AuthUser }) {
  const { updateUsername, isPending: isUsernamePending } = useUpdateUsername();
  const { updatePassword, isPending: isPasswordPending } = useUpdatePassword();

  const [usernameDraft, setUsernameDraft] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState<
    string | null
  >(null);

  return (
    <ProfileUI
      translations={{
        pageTitle: "پروفایل",
        description: "نام کاربری و رمز عبور خود را مدیریت کنید.",
        backLink: "بازگشت به خانه",
        usernameSection: {
          heading: "تغییر نام کاربری",
          label: "نام کاربری",
          placeholder: "نام کاربری جدید…",
          save: "ذخیره نام کاربری",
        },
        passwordSection: {
          heading: "تغییر رمز عبور",
          currentLabel: "رمز عبور فعلی",
          currentPlaceholder: "رمز عبور فعلی…",
          newLabel: "رمز عبور جدید",
          newPlaceholder: "حداقل ۸ کاراکتر…",
          save: "ذخیره رمز عبور",
        },
      }}
      username={user.username}
      usernameDraft={usernameDraft}
      currentPassword={currentPassword}
      newPassword={newPassword}
      isUsernamePending={isUsernamePending}
      isPasswordPending={isPasswordPending}
      currentPasswordError={currentPasswordError}
      onChangeUsername={setUsernameDraft}
      onChangeCurrentPassword={(value) => {
        setCurrentPassword(value);
        setCurrentPasswordError(null);
      }}
      onChangeNewPassword={setNewPassword}
      onClickSaveUsername={() => {
        void updateUsername({ username: usernameDraft.trim() });
      }}
      onClickSavePassword={async () => {
        setCurrentPasswordError(null);
        try {
          await updatePassword({
            currentPassword,
            newPassword,
          });
          setCurrentPassword("");
          setNewPassword("");
        } catch (error) {
          if (error instanceof ApiClientError) {
            const resolved = resolveApiErrorMessage(error.body);
            if (error.body.reason === "invalid_current_password") {
              setCurrentPasswordError(resolved.description ?? resolved.title);
              return;
            }
            showErrorToast(error.body);
            return;
          }
          showErrorToast({
            error: "Request failed",
            message: "Request failed",
          });
        }
      }}
    />
  );
}
