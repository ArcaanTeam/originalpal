"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { cn } from "cn";
import type { PermissionKey } from "@/lib/domain/auth/permission";
import type { LoginResponse } from "@/lib/presentation/http/auth/schema";
import { getDictionary } from "@/lib/presentation/i18n/dictionary";
import {
  resolveLoginErrorMessage,
  type LoginErrorBody,
} from "@/lib/presentation/ui/auth/resolve-login-error-message";
import { resolvePostLoginPath } from "@/lib/presentation/ui/auth/resolve-post-login-path";
import { setAuthenticatedUser } from "@/lib/presentation/ui/auth/session-store";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/lib/presentation/ui/components/ui/alert";
import { Button } from "@/lib/presentation/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/presentation/ui/components/ui/card";
import { Input } from "@/lib/presentation/ui/components/ui/input";
import { Label } from "@/lib/presentation/ui/components/ui/label";
import { showErrorToast } from "@/lib/presentation/ui/feedback/show-feedback";
import { APP_LIQUID_GLASS_CARD_CLASS } from "@/lib/presentation/ui/layout/liquid-glass";

const loginCopy = getDictionary().login;
const authCopy = getDictionary().auth;

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = resolvePostLoginPath(searchParams.get("redirectTo"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function clearError() {
    setErrorMessage(null);
  }

  async function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });
      const body = await response.json().catch(() => ({}));

      if (!response.ok) {
        const message = resolveLoginErrorMessage(body as LoginErrorBody, {
          invalidCredentials: authCopy.invalidCredentials,
          signInFailed: authCopy.signInFailed,
          validationFailed: authCopy.validationFailed,
        });
        setErrorMessage(message);
        showErrorToast({
          ...(body as LoginErrorBody),
          message,
        });
        return;
      }

      const successBody = body as LoginResponse;
      const user = successBody.user;

      if (user?.id && user.username && user.role) {
        setAuthenticatedUser({
          id: user.id,
          username: user.username,
          role: user.role,
          permissions: user.permissions as PermissionKey[],
        });
      }

      window.location.assign(redirectTo);
    } catch {
      setErrorMessage(authCopy.signInFailed);
      showErrorToast({ message: authCopy.signInFailed });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-full flex-1 items-center justify-center p-6">
      <Card
        data-auth-card
        className={cn(
          "w-full max-w-md gap-6 py-8",
          APP_LIQUID_GLASS_CARD_CLASS,
        )}
      >
        <CardHeader className="text-center">
          <CardTitle>{loginCopy.title}</CardTitle>
          <CardDescription>{loginCopy.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="username">{loginCopy.usernameLabel}</Label>
              <Input
                id="username"
                autoComplete="username"
                value={username}
                aria-invalid={errorMessage ? true : undefined}
                onChange={(event) => {
                  setUsername(event.target.value);
                  clearError();
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{loginCopy.passwordLabel}</Label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                aria-invalid={errorMessage ? true : undefined}
                onChange={(event) => {
                  setPassword(event.target.value);
                  clearError();
                }}
              />
            </div>
            {errorMessage ? (
              <Alert variant="destructive">
                <AlertTitle>{loginCopy.errorTitle}</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            ) : null}
            <Button
              type="submit"
              className="w-full"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {loginCopy.submitButton}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
