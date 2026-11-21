import Link from "next/link";
import { Button } from "@/lib/presentation/ui/components/ui/button";
import { Input } from "@/lib/presentation/ui/components/ui/input";
import { Label } from "@/lib/presentation/ui/components/ui/label";

export interface ProfileUIProps {
  translations: {
    pageTitle: string;
    description: string;
    backLink: string;
    usernameSection: {
      heading: string;
      label: string;
      placeholder: string;
      save: string;
    };
    passwordSection: {
      heading: string;
      currentLabel: string;
      currentPlaceholder: string;
      newLabel: string;
      newPlaceholder: string;
      save: string;
    };
  };
  username: string;
  usernameDraft: string;
  currentPassword: string;
  newPassword: string;
  isUsernamePending: boolean;
  isPasswordPending: boolean;
  currentPasswordError: string | null;
  onChangeUsername: (value: string) => void;
  onChangeCurrentPassword: (value: string) => void;
  onChangeNewPassword: (value: string) => void;
  onClickSaveUsername: () => void;
  onClickSavePassword: () => void;
}

export default function ProfileUI(props: ProfileUIProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 p-4 sm:gap-8 sm:p-6">
      <header className="flex flex-col gap-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {props.translations.backLink}
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">
            {props.translations.pageTitle}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {props.translations.description}
          </p>
        </div>
      </header>

      <section className="rounded-lg border bg-card p-4">
        <h2 className="text-sm font-medium">
          {props.translations.usernameSection.heading}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-username">
              {props.translations.usernameSection.label}
            </Label>
            <Input
              id="profile-username"
              value={props.usernameDraft}
              onChange={(event) => props.onChangeUsername(event.target.value)}
              placeholder={props.translations.usernameSection.placeholder}
              autoComplete="username"
              disabled={props.isUsernamePending || props.isPasswordPending}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="self-start"
            loading={props.isUsernamePending}
            disabled={
              props.isPasswordPending ||
              props.usernameDraft.trim().length === 0 ||
              props.usernameDraft.trim() === props.username
            }
            onClick={props.onClickSaveUsername}
          >
            {props.translations.usernameSection.save}
          </Button>
        </div>
      </section>

      <section className="rounded-lg border bg-card p-4">
        <h2 className="text-sm font-medium">
          {props.translations.passwordSection.heading}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-current-password">
              {props.translations.passwordSection.currentLabel}
            </Label>
            <Input
              id="profile-current-password"
              type="password"
              value={props.currentPassword}
              onChange={(event) =>
                props.onChangeCurrentPassword(event.target.value)
              }
              placeholder={
                props.translations.passwordSection.currentPlaceholder
              }
              autoComplete="current-password"
              disabled={props.isUsernamePending || props.isPasswordPending}
              aria-invalid={props.currentPasswordError ? true : undefined}
              aria-describedby={
                props.currentPasswordError
                  ? "profile-current-password-error"
                  : undefined
              }
            />
            {props.currentPasswordError ? (
              <p
                id="profile-current-password-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {props.currentPasswordError}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="profile-new-password">
              {props.translations.passwordSection.newLabel}
            </Label>
            <Input
              id="profile-new-password"
              type="password"
              value={props.newPassword}
              onChange={(event) =>
                props.onChangeNewPassword(event.target.value)
              }
              placeholder={props.translations.passwordSection.newPlaceholder}
              autoComplete="new-password"
              disabled={props.isUsernamePending || props.isPasswordPending}
            />
          </div>
          <Button
            type="button"
            size="sm"
            className="self-start"
            loading={props.isPasswordPending}
            disabled={
              props.isUsernamePending ||
              props.currentPassword.length === 0 ||
              props.newPassword.length < 8
            }
            onClick={props.onClickSavePassword}
          >
            {props.translations.passwordSection.save}
          </Button>
        </div>
      </section>
    </main>
  );
}
