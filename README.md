# Originalpal

Full-stack Next.js 16 starter template: Clean Architecture on the server, Clean Components on the client, JWT auth with RBAC, Drizzle ORM + PostgreSQL, and a liquid-glass shadcn UI (Farsi / RTL by default).

## Setup

```bash
pnpm run init       # rename the project interactively (or: npm run init)
pnpm bootstrap      # full setup: rename project + generate .env + optionally remove bootstrap script
pnpm install
pnpm db:create      # create the database named in DATABASE_URL (connects to PostgreSQL's postgres DB)
pnpm migrate:deploy
pnpm seed
pnpm dev
```

`pnpm run init` prompts for a new project name (plus optional display title, description, and Postgres schema) and renames the package, schema and migrations, auth cookies, JWT issuer, theme storage key, Docker tags, and UI title/README — both on a fresh clone and on an already-renamed project. Non-interactive: `pnpm run init -- --name my-app --yes` (note: use `pnpm run init` because bare `pnpm init` is pnpm's built-in command).

`pnpm bootstrap` runs the one-time starter setup that additionally writes `.env` with a generated `JWT_SECRET` (and admin password if left blank), and by default removes `scripts/bootstrap` afterwards. Non-interactive: `pnpm bootstrap --name my-app --yes` (see `pnpm bootstrap --help`).

Open [http://localhost:3000](http://localhost:3000) and sign in at `/login` with the seeded admin (`ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env`).

## What's included

- **Clean Architecture** under `src/lib/` — `domain` → `application` (use cases + ports) → `infrastructure` (Drizzle repositories, composition root) and `presentation` (HTTP controllers, UI). `src/app/` is thin routing.
- **Auth** — `/api/auth/*` with HttpOnly access/refresh JWT cookies, refresh rotation, session table, route gating in `src/proxy.ts`.
- **RBAC** — `Admin` / `Member` roles, permission checks for pages and APIs.
- **Users** — HTTP API and admin UI at `/admin/users`; profile page at `/profile`.
- **UI** — shadcn primitives, liquid-glass theme, light/dark mode, mobile top bar + bottom tabs, toasts, markdown editor/renderer.
- **Data** — TanStack Query with server prefetch + hydration, typed `requestJson`, API error → message mapping.
- **i18n** — dictionary-based strings (`fa-IR`, RTL).
- **Tooling** — Vitest + Testing Library, ESLint, Prettier, Drizzle Kit migrations, Docker image, agent skills in `.claude/skills/`.

## After bootstrapping

1. Replace the icon in `src/app/icon.svg` and the copy in `src/lib/presentation/i18n/dictionaries/fa.ts`.
2. Adjust `docker/production/` for your registry and hosting.
3. Build features by copying the users slice — see [AGENTS.md](AGENTS.md#reference-slices).

See [AGENTS.md](AGENTS.md) for architecture and conventions.
