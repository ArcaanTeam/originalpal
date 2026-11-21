import Link from "next/link";
import { cn } from "cn";
import { Button } from "@/lib/presentation/ui/components/ui/button";
import { Input } from "@/lib/presentation/ui/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/presentation/ui/components/ui/table";

export type UserManagementRoleOptionView = {
  value: string;
  label: string;
};

export type UserManagementRowView = {
  id: string;
  username: string;
  role: string;
  roleLabel: string;
  createdAtLabel: string;
  isSelf: boolean;
};

export interface UserManagementUIProps {
  translations: {
    title: string;
    description: string;
    backLink: string;
    createHeading: string;
    usernameLabel: string;
    usernamePlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    roleLabel: string;
    createButton: string;
    tableHead: {
      username: string;
      role: string;
      createdAt: string;
      actions: string;
    };
    deleteButton: string;
    selfBadge: string;
    empty: string;
    roleOptions: UserManagementRoleOptionView[];
  };
  rows: UserManagementRowView[];
  newUsername: string;
  newPassword: string;
  newRole: string;
  isCreating: boolean;
  isMutating: boolean;
  onChangeNewUsername: (value: string) => void;
  onChangeNewPassword: (value: string) => void;
  onSelectNewRole: (role: string) => void;
  onClickCreate: () => void;
  onSelectUserRole: (userId: string, role: string) => void;
  onClickDeleteUser: (userId: string) => void;
}

const roleChipClass =
  "rounded-md border px-2 py-1 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-40";

export default function UserManagementUI(props: UserManagementUIProps) {
  const canCreate =
    props.newUsername.trim().length > 0 &&
    props.newPassword.length >= 8 &&
    !props.isCreating &&
    !props.isMutating;

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6 p-4 sm:gap-8 sm:p-6">
      <header className="flex flex-col gap-3">
        <Link
          href="/"
          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {props.translations.backLink}
        </Link>
        <div>
          <h1 className="text-2xl font-semibold">{props.translations.title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {props.translations.description}
          </p>
        </div>
      </header>

      <section className="rounded-lg border bg-card p-4">
        <h2 className="text-sm font-medium">
          {props.translations.createHeading}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Input
            value={props.newUsername}
            onChange={(event) => props.onChangeNewUsername(event.target.value)}
            placeholder={props.translations.usernamePlaceholder}
            aria-label={props.translations.usernameLabel}
            autoComplete="off"
          />
          <Input
            type="password"
            value={props.newPassword}
            onChange={(event) => props.onChangeNewPassword(event.target.value)}
            placeholder={props.translations.passwordPlaceholder}
            aria-label={props.translations.passwordLabel}
            autoComplete="new-password"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {props.translations.roleLabel}
          </span>
          {props.translations.roleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cn(
                roleChipClass,
                props.newRole === option.value
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border text-muted-foreground hover:border-primary/40",
              )}
              onClick={() => props.onSelectNewRole(option.value)}
              disabled={props.isCreating || props.isMutating}
            >
              {option.label}
            </button>
          ))}
        </div>
        <Button
          className="mt-4"
          loading={props.isCreating}
          onClick={props.onClickCreate}
          disabled={!canCreate}
        >
          {props.translations.createButton}
        </Button>
      </section>

      {props.rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {props.translations.empty}
        </p>
      ) : (
        <>
          {/* Phones: one card per user instead of a sideways-scrolling table. */}
          <ul className="flex flex-col gap-3 md:hidden">
            {props.rows.map((row) => (
              <li
                key={row.id}
                className="flex flex-col gap-3 rounded-xl border bg-card p-4"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="truncate font-medium">{row.username}</span>
                    {row.isSelf ? (
                      <span className="text-micro shrink-0 rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                        {props.translations.selfBadge}
                      </span>
                    ) : null}
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {row.createdAtLabel}
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div
                    className="flex flex-wrap gap-1.5"
                    aria-label={props.translations.tableHead.role}
                  >
                    {props.translations.roleOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={cn(
                          roleChipClass,
                          row.role === option.value
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border text-muted-foreground hover:border-primary/40",
                        )}
                        onClick={() =>
                          props.onSelectUserRole(row.id, option.value)
                        }
                        disabled={
                          row.isSelf ||
                          row.role === option.value ||
                          props.isMutating
                        }
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    loading={props.isMutating}
                    onClick={() => props.onClickDeleteUser(row.id)}
                    disabled={row.isSelf || props.isMutating}
                  >
                    {props.translations.deleteButton}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div className="max-md:hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{props.translations.tableHead.username}</TableHead>
                  <TableHead>{props.translations.tableHead.role}</TableHead>
                  <TableHead>
                    {props.translations.tableHead.createdAt}
                  </TableHead>
                  <TableHead>{props.translations.tableHead.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {props.rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{row.username}</span>
                        {row.isSelf ? (
                          <span className="text-micro rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                            {props.translations.selfBadge}
                          </span>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1.5">
                        {props.translations.roleOptions.map((option) => (
                          <button
                            key={option.value}
                            type="button"
                            className={cn(
                              roleChipClass,
                              row.role === option.value
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border text-muted-foreground hover:border-primary/40",
                            )}
                            onClick={() =>
                              props.onSelectUserRole(row.id, option.value)
                            }
                            disabled={
                              row.isSelf ||
                              row.role === option.value ||
                              props.isMutating
                            }
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.createdAtLabel}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        loading={props.isMutating}
                        onClick={() => props.onClickDeleteUser(row.id)}
                        disabled={row.isSelf || props.isMutating}
                      >
                        {props.translations.deleteButton}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}
