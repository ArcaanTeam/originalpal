---
name: react-clean-component
description: >-
  Clean Component pattern for React — pure UI, dependency injectors, data hooks,
  and page composition. Use when adding or refactoring feature modules under
  components/feature/, creating injectors, data hooks in data/feature/, page
  injectors, translations props, loading/error siblings, or enforcing import
  boundaries between routes, pages, and UI.
---

# React Clean Component

Clean Architecture-**inspired** presentation pattern: dependency injection + ports at the UI boundary. Pure UI + injector splits rendering from wiring.

## When to Apply

Use this skill when:

- Adding a feature under `src/components/feature/<domain>/`
- Creating pure UI (`index.tsx`), injectors (`AdminXxx.tsx`), or page injectors (`XxxPage.tsx`)
- Adding data hooks in `src/data/feature/<domain>/` with `UseXxxReturn` contracts
- Refactoring smart components into testable layers
- Wiring `translations`, loading/error UI, or shared mappers

**Full guide:** [AGENTS.md](AGENTS.md)

## Three Levels

| Level | Location | Responsibility |
| ----- | -------- | -------------- |
| **App** | `components/layout/` | Providers, shells |
| **Page** | `*Page.tsx`, routes | Compose injectors only |
| **Component** | `components/feature/` | Pure UI + injectors + shared siblings |

**Dependency flow:** Page → Injector → (Pure UI · Data hook · Mapper · Loading/Error). Inner layers never import pages.

## Sample Layout

```
FeatureName/
├── index.tsx              # Pure UI — UIProps, translations, view models
├── AdminFeatureName.tsx   # Injector — default export
├── loading.tsx            # Optional
├── error.tsx              # Optional
└── formatFeatureRows.ts   # Optional mapper (one concern per file)
```

- `src/components/ui/` — primitives only
- `src/data/feature/<domain>/` — `useGetXxx` + `UseXxxReturn`
- Routes import page injectors only — never `index.tsx` or `data/feature/` hooks

## Pure UI Rules (`index.tsx`)

1. Export default component + `<Name>UIProps` + view-model types (`<Name><Concept>View`)
2. No domain/API type imports — view models defined in this file
3. Only `translations` is grouped; all other props are flat top-level siblings
4. UI-semantics prop names (`onClickButton`, not `handleAddToCart`)
5. Pages never import this file — injectors only

## Injector Rules (`<Variant>.tsx`)

1. Default export; pages import this file
2. Wire `data/feature/` hooks; branch on `UseXxxReturn` contract
3. Assemble `translations` (injector calls `useTranslation`; pure UI never imports i18n)
4. Reuse sibling `loading.tsx`, `error.tsx`, mappers
5. Accept page-supplied props (route params, search) — do not read router APIs when page can pass values

## Data Hook Rules (`data/feature/`)

1. Export default hook + `UseXxxReturn` interface
2. One concern per hook; library types stay inside the hook
3. Example tri-state: `succeed: boolean | null` (`null` loading, `false` error, `true` success)

## Development Workflow

1. **UI first** — `index.tsx` with hardcoded props; get design approval
2. **Shared support** — loading/error, mappers (`formatXxx.ts` or `useXxxLogic.ts`)
3. **Injector** — wire hooks, branch states, render pure UI
4. **Real data** — swap mock internals in hooks; `UseXxxReturn` and UI unchanged

## Definition of Done

- [ ] Pure UI has no domain/API imports
- [ ] At least one injector; routes/pages import injectors only
- [ ] Data hooks export `UseXxxReturn` (if async)
- [ ] `translations` populated in injector
- [ ] Empty state handled when UX requires it
- [ ] Storybook or RTL test for pure UI

## Project Examples

- Page injector: `src/components/feature/users/UsersPage.tsx`
- Table injector: `src/components/feature/users/UsersTable/AdminUsersTable.tsx`
- Pure UI: `src/components/feature/users/UsersTable/index.tsx`
- Data hook: `src/data/feature/user/useGetUsers.ts`
- Form: `src/components/feature/auth/UserAuthForm/`

## Related Skills

- `react-components` — Sample-specific shortcuts and i18n/forms conventions
- `routes` — TanStack Router file-based routing
- `testing` — Vitest browser tests for components
- `react-hook-form` — form injectors + Zod resolvers
- `tanstack-query-best-practices` — data hook implementation
