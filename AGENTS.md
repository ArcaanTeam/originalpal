# Agent Guide

Full-stack Next.js starter template: `src/app/` is routing + API wiring, `src/lib/` is Clean Architecture.

## Architecture

```
src/app/      → thin Next.js wiring only (pages, route handlers, providers)
src/lib/
  domain/     → entity/ + errors (pure business rules, no I/O)
  application/→ usecase/ + port/ + errors (orchestration)
  infrastructure/ → persistence/ + container.ts (adapters, composition root)
  presentation/   → http/ (controllers) + ui/ (shadcn primitives + auth client)
```

Dependency rule: `presentation → application → domain`; `infrastructure → application`. Never outward.

## Imports

- **`@/`** is the `src/` root (`@/lib/...` → `src/lib/...`, `@/app/...` → `src/app/...`). Use `@/` for cross-folder imports under `src/`; keep same-directory relative imports (`./`, `../`) inside a feature folder when they stay local.

## UI

- **Liquid glass design (ported from panel-web):** tokens in `src/app/styles/theme.css`, glass recipes in `src/app/styles/liquid-glass.css`, class names in `src/lib/presentation/ui/layout/liquid-glass.ts`. Routes in `src/app/(shell)/` render inside `AppPageShell` (ambient page light + glass content shell); `(auth)/` gets the page light only. Add a new route group when a page needs its own full-bleed canvas. Use `bg-card`, `bg-field`, `bg-hover`, `bg-icon-surface`, `text-brand` tokens; cards on the shell turn into glass panels automatically.
- **Mobile (< md):** `AppHeader` renders panel-web's mobile chrome — a frosted top bar (page title + account menu) and a bottom tab bar (`layout/MobileNav`, tabs from `mobileNavItems.ts`); `AppPageShell` pads for both. `useCoarsePointer` / `useIsMobile` hooks detect touch and narrow screens.
- shadcn primitives live under `src/lib/presentation/ui/components/ui/` ([components.json](components.json)).
- Add components: `pnpm dlx shadcn@latest add <component>`
- `import { cn } from "cn"` for Tailwind class merging
- TanStack Query: [`getQueryClient`](src/lib/presentation/ui/query/get-query-client.ts) in providers; App Router pages prefetch with `HydrationBoundary` + [`serverRequestJson`](src/lib/presentation/ui/query/server-request-json.ts)
- When adding feature UI, follow [.claude/skills/react-clean-component/SKILL.md](.claude/skills/react-clean-component/SKILL.md)

## Database — PostgreSQL + Drizzle ORM

- Schema: [src/lib/infrastructure/persistence/drizzle/schema.ts](src/lib/infrastructure/persistence/drizzle/schema.ts) (all tables in the `app` Postgres schema — rename it in `schema.ts` and `drizzle.config.ts`). Client: `getDb()` in `drizzle/client.ts` (node-postgres pool); repositories accept a `DbExecutor` (db or transaction).
- Migrations: SQL in [drizzle/](drizzle/), config in [drizzle.config.ts](drizzle.config.ts). Change the schema, then `pnpm migrate:diff <name>` (drizzle-kit generate) and commit the SQL. Never edit an applied migration.
- `pnpm migrate:deploy` runs [scripts/migrate.mjs](scripts/migrate.mjs) (also run by `docker-entrypoint.sh` when `RUN_MIGRATIONS` is not false).
- `pnpm db:seed` (alias `pnpm seed`) upserts the admin user; `pnpm db:studio` opens Drizzle Studio.
- `.env` is read with Node's built-in `process.loadEnvFile()` (no dotenv).

```bash
pnpm bootstrap   # once per new project: rename the app, write .env
pnpm migrate:deploy
pnpm seed
pnpm dev
```

Required env: `DATABASE_URL`, `JWT_SECRET`, `ADMIN_PASSWORD` (validated at boot).

## Auth — JWT private panel

| Concern  | Implementation                                          |
| -------- | ------------------------------------------------------- |
| Login    | `POST /api/auth/login`                                  |
| Cookies  | `originalpal_access_token`, `originalpal_refresh_token` |
| Refresh  | `POST /api/auth/refresh`                                |
| Sessions | `auth_sessions` table + refresh rotation                |

- `/login` is public; other pages/APIs gated by [src/proxy.ts](src/proxy.ts).
- Client session: [src/lib/presentation/ui/auth/](src/lib/presentation/ui/auth/)

## RBAC

Roles: `Admin`, `Member`. Permission: `users:manage` (Admin only). Users HTTP API and the admin UI (`/admin/users`) are implemented. Gate new routes in [route-permissions.ts](src/lib/presentation/auth/route-permissions.ts).

## i18n

Farsi (`fa-IR`, RTL) in root layout. Strings in [src/lib/presentation/i18n/dictionaries/fa.ts](src/lib/presentation/i18n/dictionaries/fa.ts).

## TDD

See [.claude/skills/tdd/SKILL.md](.claude/skills/tdd/SKILL.md). Run `pnpm test` after changes.

## Agent skills

Project skills live under `.claude/skills/` (see [skills-lock.json](skills-lock.json) for pinned sources). Refresh pinned skills with `npx skills update -p` (then copy from `.agents/skills/` into `.claude/skills/`).

| Skill                                                                                                  | Use for                                     |
| ------------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| `react-clean-component`, `vercel-composition-patterns`                                                 | Feature UI (injectors, composition)         |
| `vercel-react-best-practices`, `next-cache-components-optimizer`, `next-partial-prefetching-optimizer` | Next.js 16 App Router, caching, performance |
| `tdd`, `vitest`                                                                                        | Tests                                       |
| `web-design-guidelines`                                                                                | UI / a11y reviews (RTL UI)                  |

Optional Cursor **plugins** (Customize → Install, user scope): **React Doctor**, **Playwright** — MCP + skills beyond this repo.

## Client state

Persisted client state uses Jotai [`atomWithStorage`](https://jotai.org/docs/utilities/storage) with the localStorage adapter in [createSyncStorage.ts](src/lib/presentation/storage/createSyncStorage.ts) (validates with a `parse` function, syncs across tabs).

## Reference slices

Copy these when adding a feature — every layer is represented:

| Layer          | Users / auth example                                                                                          |
| -------------- | ------------------------------------------------------------------------------------------------------------- |
| Domain         | `src/lib/domain/entity/user.ts`, `src/lib/domain/auth/permission.ts`                                          |
| Application    | `src/lib/application/port/user.ts`, `src/lib/application/usecase/user/*`                                      |
| Infrastructure | `src/lib/infrastructure/persistence/user/*`, wired in `container.ts`                                          |
| HTTP           | `src/lib/presentation/http/user/controller.ts` + `schema.ts`, routes in `src/app/api/users/`                  |
| Data hooks     | `src/lib/presentation/data/feature/user/*`, query options in `src/lib/presentation/ui/query/options/users.ts` |
| UI             | `src/lib/presentation/ui/features/user/UserManagement/` (page injector, pure UI, loading, error)              |
| Route          | `src/app/(shell)/admin/users/page.tsx` (prefetch via `ServerQueryHydration`)                                  |

## Post-change checks

Agents: `pnpm format:changed`, then lint/typecheck when logic changed. Claude Code runs this as a Stop hook (`.claude/hooks/session-gate.sh`).

```bash
pnpm test
pnpm format:changed
pnpm typecheck
pnpm lint
pnpm build
```

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
