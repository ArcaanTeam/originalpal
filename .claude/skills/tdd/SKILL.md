---
name: tdd
description: >-
  Test-driven development for this full-stack Next.js app. Use when
  adding or changing any code under src/lib/ or src/app/, fixing bugs, or when the user
  mentions red-green-refactor, test-first, or TDD. Covers per-layer Vitest
  patterns for domain, application, infrastructure, HTTP controllers, API routes,
  react-clean-component UI, and data hooks.
---

# TDD

**Hard rule:** no production file is created or modified before a failing test exists that requires it.

**Full guide:** [AGENTS.md](AGENTS.md)

## The loop

| Step | Action |
| ---- | ------ |
| **Red** | Write a failing test for behavior that does not exist yet |
| **Green** | Write the minimum code to pass |
| **Refactor** | Clean up; tests stay green |

Work in **vertical slices** — one test → one implementation → repeat. Never bulk-write all tests then all code.

## Commands

```bash
pnpm test              # full suite (must be green before done)
pnpm test:watch        # during development
pnpm test:coverage     # coverage over src/lib/
pnpm test path/to/file.test.ts   # single file
```

Post-change: `pnpm test` → `pnpm typecheck` → `pnpm lint`.

## Per-layer quick reference

| Layer | Test file | Fakes |
| ----- | --------- | ----- |
| `domain/entity`, `domain/errors` | `*.test.ts` colocated | None — pure functions |
| `application/usecase` | `*.test.ts` colocated | Hand-written port fake (not real repo) |
| `infrastructure/persistence` | `*.integration.test.ts` | None — real Postgres, opt-in via `RUN_DB_INTEGRATION=1` |
| `presentation/http` | `controller.test.ts` | Mocked use cases |
| `src/app/api/**/route.ts` | `route.test.ts` colocated | `vi.mock` container |
| Pure UI (`index.tsx`) | `index.test.tsx` | Hardcoded `UIProps` (RTL) |
| Injector (`Simple*.tsx`) | `Simple*.test.tsx` | `vi.mock` data hooks |
| Data hooks | `useGetXxx.test.tsx` | `vi.stubGlobal('fetch', …)` + `QueryClientProvider` |

## Definition of Done

- [ ] Test file exists **before** or in the same commit as the production file it drives
- [ ] `pnpm test` passes with zero skipped/`.only` tests
- [ ] Use-case tests use port fakes; repository contract tests use the Drizzle repository + Postgres
- [ ] UI tests follow [react-clean-component](../react-clean-component/SKILL.md) testing table

## Reference implementation

Copy the `user` / `auth` vertical slices when adding features:

- `src/lib/domain/auth/permission.test.ts` — pure domain rules
- `src/lib/application/usecase/user/*.test.ts` — use cases with port fakes
- `src/lib/infrastructure/persistence/user/drizzleUserRepository.integration.test.ts` — repository against Postgres (`RUN_DB_INTEGRATION=1`)
- `src/lib/presentation/http/auth/controller.test.ts` — controllers with mocked use cases
- `src/lib/presentation/ui/auth/AuthSessionBootstrap.test.tsx` — client components (RTL)
