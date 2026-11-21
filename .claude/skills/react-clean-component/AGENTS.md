# React Clean Component

**Skill:** `react-clean-component` · **Entry point:** [SKILL.md](SKILL.md)

> **Clean Component** for React — a Clean Architecture-**inspired**, framework-agnostic presentation pattern (Vite, CRA, Remix, etc.). Dependency injection + ports at the UI boundary; not a full domain/use-case stack.

## Table of Contents

- [Using this document](#using-this-document)
- [Why this pattern](#why-this-pattern)
- [When to use it](#when-to-use-it)
- [Three Levels of Architecture](#three-levels-of-architecture)
- [Component Layer (Level 3) — The Core](#component-layer-level-3--the-core)
  - [Conceptual Packages](#conceptual-packages)
  - [Flat Layout: UI → Dependency Injectors](#flat-layout-ui--dependency-injectors)
  - [Tier 1: UI (`index.tsx`)](#tier-1-ui-indextsx)
  - [Tier 2: Dependency Injector (`<Name>.tsx`)](#tier-2-dependency-injector-nametsx)
  - [Shared logic (mappers & hooks)](#shared-logic-usecomponentnamelogicts-or-plain-mappers)
  - [Loading / Error UI (`loading.tsx`, `error.tsx`)](#loading--error-ui-loadingtsx-errortsx)
  - [Data Hooks (`data/feature/`)](#data-hooks-datafeature)
  - [Tier Interaction Summary](#tier-interaction-summary)
- [Page Layer (Level 2) — Composition](#page-layer-level-2--composition)
- [App Layer (Level 1) — Global Setup](#app-layer-level-1--global-setup)
  - [Providers](#providers)
  - [Layout Shells](#layout-shells)
- [Internationalization (`translations`)](#internationalization-translations)
- [Development Workflow](#development-workflow)
- [Principles & Rationale](#principles--rationale)
- [Testing](#testing)
- [Definition of Done](#definition-of-done)
- [Enforcing import boundaries](#enforcing-import-boundaries)

---

## Using this document

This guide is **self-contained**. Copy or link it into any React project (Vite, CRA, Remix, React Router, etc.). You do not need access to any specific repository.

| Convention in examples | What it means |
| ---------------------- | ------------- |
| `components/`, `data/`, `src/pages/` | Suggested folder layout — adapt to your repo |
| `@/` imports | Optional path alias (e.g. `"@/*": ["./*"]` in `tsconfig.json` or Vite `resolve.alias`). Relative imports work too |
| `Invoice`, `Cart`, `MOCKED_ADMIN_INVOICES` | Placeholders for **your** domain models and fixtures |
| `Table`, `Header`, `Body` | Your `components/ui/` primitives or colocated helpers in the same file |
| `/* ... */`, `{ ... }` | Bodies omitted where the **rules and prop shapes** are the teaching focus |


---

## Why this pattern

| Alternative | Limitation | Clean Component |
| ----------- | ---------- | -------------- |
| **Smart components** | UI and fetching grow together; hard to mock and reuse | Pure UI + injector splits rendering from wiring |
| **Container / presentational only** | Container still knows UI prop shape; no shared loading/error or multi-variant story | Injector owns branch logic; multiple injectors share one UI |
| **Data hooks in pages** | Every page repeats loading/error/formatting | Data hooks + injectors centralize it; pages stay thin |
| **Colocated `useQuery` in UI** | UI couples to React Query types | `UseXxxReturn` is the port; library types stay inside the hook |

**Dependency flow:** Page → Injector → (Pure UI · Data hook · Shared mapper · Loading/Error UI). Inner layers never import pages. Data hooks never import components.

---

## When to use it

**Use the full pattern** when a feature has:

- Async data (fetch, cache, mutate)
- Multiple presentations of the same UI (admin vs user, simple vs detailed)
- Loading, error, or empty states worth sharing across variants

**Use a reduced pattern** (single-file feature or UI + injector only, no `data/feature/` split) when:

- The widget is static or receives all data via props from the parent
- There is one variant and no shared loading/error reuse

**Skip the feature directory entirely** for one-off primitives — put them in `components/ui/` only.

---

## Three Levels of Architecture

Every application built with Clean Component is organized in three concentric levels:

| Level            | Scope         | Responsibility                                          |
| ---------------- | ------------- | ------------------------------------------------------- |
| **1. App**       | Global        | Providers, layouts, shared configuration                |
| **2. Page**      | Per-screen    | Compose ready-made feature components                   |
| **3. Component** | Per-component | UI rendering, isolated data logic, dependency injection |

Each level has clear boundaries:

- A **component** does not read router params or global routing APIs — the page passes them as injector props when needed.
- A **page** does not implement UI minutiae, import pure UI, or call `data/feature/` hooks directly.
- An **injector** does not own layout chrome that belongs to the app shell (headers, nav, providers).

---

## Component Layer (Level 3) — The Core

Component-level code lives under `components/` (or `src/components/`) and is divided into three conceptual packages:

### Conceptual Packages

```
components/
├── ui/              # Building-block, non-smart components
│   ├── button.tsx
│   ├── table.tsx
│   └── ...
├── feature/         # Domain-specific feature components (Clean Architecture)
│   ├── item/
│   │   └── InvoicesTable/
│   │       ├── index.tsx                   # Pure UI (no dependencies)
│   │       ├── AdminInvoicesTable.tsx       # Dep. Injector (admin version)
│   │       ├── MyInvoicesTable.tsx          # Dep. Injector (user version)
│   │       ├── loading.tsx                 # Optional shared loading UI
│   │       ├── error.tsx                   # Optional shared error UI
│   │       ├── formatInvoicesTableRows.ts      # Optional shared mapper (formatting)
│   │       └── useInvoicesTableFiltering.ts    # Optional shared logic (filtering)
│   └── product/
│       └── ProductDetail/
│           └── index.tsx                   # Pure UI (large-component example)
└── layout/          # Layout-level components
    ├── providers.tsx
    └── ExampleLayout/
        ├── index.tsx
        ├── header.tsx
        └── footer.tsx
```

Data-layer hooks live in a separate directory tree:

```
data/
└── feature/
    ├── cart/
    │   ├── useGetCart.ts
    │   └── useAddCartItem.ts
    └── invoice/
        ├── useGetAdminInvoices.ts
        └── useGetMyInvoices.ts
```

| Package         | Role                                                         | Dependencies                                        |
| --------------- | ------------------------------------------------------------ | --------------------------------------------------- |
| `ui/`           | Pure, reusable primitives (buttons, tables, inputs)          | Nothing outside `ui/`                               |
| `feature/`      | Domain components built with the Dependency Injector pattern | May reference `ui/`, data-layer hooks, shared hooks |
| `layout/`       | Global layout wrappers (providers, shells)                   | Any                                                 |
| `data/feature/` | Data-layer hooks, one concern per file                       | API clients, `@tanstack/react-query`, etc.          |

#### Domain grouping under `feature/`

Feature components live under `components/feature/<domain>/`. The `<domain>` folder groups related UI by business area — not by component type:

```
components/feature/
├── item/       # transactional records — invoices, orders, …
│   └── InvoicesTable/
├── product/    # catalog / product detail
│   └── ProductDetail/
└── …           # add domains as the app grows (cart, account, …)
```

A domain folder is optional when a feature stands alone; use it when several components share the same business context. Data hooks use a parallel scheme in `data/feature/<domain>/` (e.g. `invoice/`, `cart/`) — organized by resource, not by UI component.

---

### Flat Layout: UI → Dependency Injectors

A feature component directory holds a shared pure UI (`index.tsx`) plus one or more **Dependency Injector** files that wire data into it:

```
InvoicesTable/                       # Abstract component directory
├── index.tsx                        # Tier 1 — Pure UI (no dependencies)
├── AdminInvoicesTable.tsx           # Tier 2 — Dep. Injector (admin)
├── MyInvoicesTable.tsx              # Tier 2 — Dep. Injector (user)
├── loading.tsx                      # Optional shared loading UI
├── error.tsx                        # Optional shared error UI
├── formatInvoicesTableRows.ts      # Optional shared mapper (formatting)
└── useInvoicesTableFiltering.ts    # Optional shared logic (filtering)
```

> **Naming convention**: The abstract component directory (`InvoicesTable/`) holds `index.tsx` as the pure UI. Concrete Dependency Injectors (`AdminInvoicesTable.tsx`, `MyInvoicesTable.tsx`, etc.) are flat files in the same directory. No nested sub-folders. Loading/error UIs and shared logic hooks across injectors live as sibling files (`loading.tsx`, `error.tsx`, `use<ComponentName><Logic>.ts`).

---

### Tier 1: UI (`index.tsx`)

**Purpose**: Pure rendering at the **domain boundary** — no API types, no fetching, no injector wiring.

**What “pure” means here**:

- ✅ No imported domain or API types; view models defined in this file
- ✅ No `data/feature/` hooks
- ❌ *Not* “no dependencies whatsoever” — importing `components/ui/` primitives is expected
- ❌ *Not* necessarily free of React state — local UI state (e.g. open modal index) is fine; prefer pushing interactivity that needs external data into the injector

**Rules**:

1. Define and **export** an interface named `<ComponentName>UIProps` alongside the component (and export view-model types). Export enables Storybook, tests, and prop-fed injectors without importing the default component.
2. Props use **view-model shapes** defined in this file — no imported domain or API types. Primitives, arrays, inline object types, and callbacks are all fine.
3. Props are named based on **UI semantics**, not business logic:
   - ✅ `onClickButton` (what the UI does when clicked)
   - ❌ `handleAddToCart` (what happens in the business layer)
4. **Only `translations` is grouped** — all text/string content lives in a single `translations` object. Use **semantic sub-groupings** inside it when labels belong to the same UI region (e.g. `tableHead: { invoice, status, ... }` for column headers). Every other prop (data, event handlers, flags) is a **flat top-level sibling** — no `callbacks` object or other top-level groupings.
5. Define **view-model types** in this file alongside `UIProps`. Name them `<ComponentName><Concept>View` (e.g. `InvoicesTableRowView`) so they are unambiguous and never shadow imported UI primitives.
6. This file is the directory entry point (`index.tsx`). Export a **default** component.

   **Who imports what**:

   | Consumer | Imports |
   | -------- | ------- |
   | **Pages** (route/screen files) | Injector files only — e.g. `AdminInvoicesTable.tsx` |
   | **Injectors** | Pure UI from `./` or `./index`, sibling shared hooks, loading/error UIs, and `data/feature/` hooks |
   | **Nobody else** | Pages must not import `index.tsx` or data hooks directly |

7. **Empty state** — when zero items is meaningful UX, handle it in the UI (e.g. `rows.length === 0` with copy from `translations.empty`) or branch in the injector before render. Do not rely on loading/error alone.
8. **Accessibility** — put user-visible strings and `aria-*` labels in `translations`; loading UI should use `role="status"` / `aria-live="polite"`; error UI should be perceivable (not color-only).
9. **Internal sub-components for large modules**: When the UI component grows beyond a single screen (~50 lines of JSX), extract each logical card/block into a non-exported function at the bottom of the same file. Pass only the props each block needs (destructure at the function signature). This keeps the root component's return readable as a tree of named sections without premature abstraction into separate files.

**Example — Invoices Table UI**:

```tsx
// components/feature/item/InvoicesTable/index.tsx

import { Table, TableCaption } from "@/components/ui/table";
// Header and Body: colocated helpers in this file (bodies omitted)

type InvoicesTableRowView = {
  invoice: string;
  status: string;
  method: string;
  amount: string;
};

export interface InvoicesTableUIProps {
  translations: {
    tableCaption: string;
    tableHead: {
      invoice: string;
      status: string;
      method: string;
      amount: string;
    };
  };
  rows: InvoicesTableRowView[];
}

export default function InvoicesTableUI(props: InvoicesTableUIProps) {
  return (
    <Table>
      <TableCaption>{props.translations.tableCaption}</TableCaption>
      <Header tableHead={props.translations.tableHead} />
      <Body rows={props.rows} />
    </Table>
  );
}

function Header({
  tableHead,
}: {
  tableHead: InvoicesTableUIProps["translations"]["tableHead"];
}) { /* ... */ }
```

**Large UI example with internal sub-components**:

```tsx
// components/feature/product/ProductDetail/index.tsx

import { useState } from "react";

type ProductDetailImageView = {
  gallery: string[];
  alt: string;
};

type ProductDetailAttributeView = {
  label: string;
  value: string;
};

type ProductDetailVendorView = {
  name: string;
  price: string;
  inStock: boolean;
};

interface ProductDetailUIProps {
  translations: {
    title: string;
    addToCart: string;
    description: string;
    vendorsHeading: string;
  };
  images: ProductDetailImageView;
  title: string;
  rating: number;
  vendors: ProductDetailVendorView[];
  description: string;
  attributes: ProductDetailAttributeView[];
  onAddToCart: () => void;
}

export default function ProductDetailUI(props: ProductDetailUIProps) {
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);

  return (
    <div className="...">
      <ProductInfoCard
        images={props.images}
        title={props.title}
        rating={props.rating}
        translations={props.translations}
        attributes={props.attributes}
        onGalleryOpen={(i) => setGalleryIndex(i)}
      />
      <VendorsCard vendors={props.vendors} translations={props.translations} />
      <PurchaseCard onAddToCart={props.onAddToCart} translations={props.translations} />
      {galleryIndex !== null && <GalleryModal ... />}
    </div>
  );
}

// --- Internal sub-components (non-exported) ---

function ProductInfoCard({ ... }) { /* ... */ return (...); }
function PurchaseCard({ ... }) { /* ... */ return (...); }
function VendorsCard({ ... }) { /* ... */ return (...); }
function GalleryModal({ ... }) { /* ... */ return (...); }
```

Key rules for internal sub-components:

- **Non-exported**: Each function uses `function Name(...)` without `export`.
- **Explicit props**: Destructure all props at the function signature. No closure over the parent scope.
- **Types via indexed access**: Use `ProductDetailUIProps["translations"]` to reuse the parent type without redefining it.
- **Bottom of file**: Group all internal components after the main export with a `// --- Internal sub-components ---` comment.
- **Readable root**: The main component's return becomes a flat tree of named sections — easy to scan without scrolling.

---

### Tier 2: Dependency Injector (`<Name>.tsx`)

**Purpose**: The concrete Dependency Injector file that wires data hooks, shared logic hooks, and loading/error UIs into a final consumable component. This is the only file pages import from `components/feature/`.

**Rules**:

1. Export a **default** component named after the variant (`AdminXxx`, `MyXxx`, `SimpleXxx`, `FancyXxx`, etc.).
2. Accept props that make sense at the usage site (or no props for self-contained widgets).
3. Import data hooks from `data/feature/` — call them at the top and handle their states (loading, error, success) per the hook's `UseXxxReturn` contract.
4. Import shared mappers or logic hooks from the same directory (e.g. `formatInvoicesTableRows.ts`) — each file covers one specific concern. Injectors only import what they need.
5. Import shared loading/error UIs from sibling files (`loading.tsx`, `error.tsx`). All injectors in the same directory should reuse them.
6. Manage local UI state (`useState`) here if needed.
7. Render the pure UI component by mapping data to `UIProps` within the success branch.
8. Assemble the `translations` object here (see [Internationalization](#internationalization-translations)).
9. Accept **page-supplied props** when needed — route params (`userId`), auth context, or pre-fetched data passed from the page. The injector maps them into hooks or view models; it does not read the router directly when the page can pass values in.

#### Prop-fed injector (no data hook)

When data is already available (parent fetch, SSR payload, props), use an injector that accepts data as props and skips `data/feature/` hooks:

```tsx
// components/feature/item/InvoicesTable/PropInvoicesTable.tsx

import InvoicesTableUI from ".";
import formatInvoicesTableRows from "./formatInvoicesTableRows";
import type { Invoice } from "@/lib/types/Invoice";
import type { InvoicesTableUIProps } from ".";

interface PropInvoicesTableProps {
  invoices: Invoice[];
  translations: InvoicesTableUIProps["translations"];
}

export default function PropInvoicesTable({
  invoices,
  translations,
}: PropInvoicesTableProps) {
  const { rows } = formatInvoicesTableRows(invoices);
  return <InvoicesTableUI translations={translations} rows={rows} />;
}
```

```tsx
// src/pages/AdminInvoicesPage.tsx — page fetches or receives data, passes down

const invoices = await loadInvoices(); // or from loader / parent

<PropInvoicesTable invoices={invoices} translations={adminInvoicesCopy} />
```

Pages still import injectors only — never pure UI or data hooks.

**Example — Invoices Table (self-contained, no props)**:

```tsx
// components/feature/item/InvoicesTable/AdminInvoicesTable.tsx

import useGetAdminInvoices from "@/data/feature/invoice/useGetAdminInvoices";
import InvoicesTableUI from ".";
import formatInvoicesTableRows from "./formatInvoicesTableRows";
import InvoicesTableLoadingUI from "./loading";
import InvoicesTableErrorUI from "./error";

export default function AdminInvoicesTable() {
  const { invoices, succeed } = useGetAdminInvoices();
  const { rows } = formatInvoicesTableRows(invoices);

  if (succeed === null) {
    return <InvoicesTableLoadingUI />;
  } else if (succeed === false) {
    return <InvoicesTableErrorUI />;
  } else
    return (
      <InvoicesTableUI
        translations={{
          tableCaption: "A list of all users invoices.",
          tableHead: {
            invoice: "Invoice",
            status: "Status",
            method: "Method",
            amount: "Amount",
          },
        }}
        rows={rows}
      />
    );
}
```

> The Dependency Injector is the **only module** pages import directly. It orchestrates the data layer, formatting layer, and UI layer into one ready-to-use component. Pages never import from `index.tsx` or data hooks directly.

---

### Shared logic (`use<ComponentName><Logic>.ts` or plain mappers)

**Purpose**: Reusable logic shared between Dependency Injectors in the same directory. Each file covers **one specific concern** — formatting, filtering, sorting, validation, etc.

**Rules**:

1. One concern per file — do not combine formatting, filtering, validation, etc.
2. Accept raw data as input, return derived/transformed data (usually view-model shapes for the pure UI).
3. No data fetching, no side effects — pure logic only.
4. Reuse across injectors: `AdminInvoicesTable`, `MyInvoicesTable`, and prop-fed variants all call the same module.

**Naming**: Use the `use<ComponentName><Logic>` filename when the module contains real React hooks (`useMemo`, `useCallback`, etc.). For **pure mapping** with no hooks inside, prefer a plain name (`formatInvoicesTableRows.ts`) or export a named function from the file — the `use` prefix is reserved for functions that call hooks. Colocating pure mappers beside injectors is fine.

**Type placement**: Shared logic sits between the data layer and pure UI. It **may** import domain types (e.g. `Invoice` from `lib/types/`) because it transforms API/domain data into view-model shapes. Pure UI (`index.tsx`) must not import those types.

**Locale**: Formatting that depends on locale (`toLocaleString`, dates, currency) should accept `locale` (or `Intl` formatters) as an argument from the injector — do not hardcode locale inside the mapper.

**Example — pure formatting** (preferred name when no hooks are used):

```tsx
// components/feature/item/InvoicesTable/formatInvoicesTableRows.ts

import { Invoice } from "@/lib/types/Invoice";

export default function formatInvoicesTableRows(
  invoices: Invoice[],
  locale?: string,
) {
  return {
    rows: invoices.map((invoice) => ({
      invoice: invoice.id,
      method: invoice.method,
      status: invoice.status,
      amount: invoice.amount.toLocaleString(locale),
    })),
  };
}
```

**Example — hook-based logic** (when memoization or other hooks are needed):

```tsx
// components/feature/item/InvoicesTable/useInvoicesTableFiltering.ts

import { useMemo } from "react";
import { Invoice } from "@/lib/types/Invoice";

export default function useInvoicesTableFiltering(
  invoices: Invoice[],
  query: string,
) {
  const filtered = useMemo(
    () =>
      invoices.filter((inv) =>
        inv.id.toLowerCase().includes(query.toLowerCase()),
      ),
    [invoices, query],
  );

  return { filtered };
}
```

---

### Loading / Error UI (`loading.tsx`, `error.tsx`)

**Purpose**: Shared placeholder UIs for loading and error states. Optional sibling files in the feature directory so multiple Dependency Injectors can reuse them.

**Rules**:

1. Each file exports a **default** component named `<ComponentName>LoadingUI` / `<ComponentName>ErrorUI`.
2. Keep them minimal — placeholders, not full-featured pages.
3. All injectors in the same directory should import and reuse these shared files.
4. Loading UI: `role="status"` and `aria-live="polite"`. Error UI: clear text from `translations` when possible, not icon-only.

> **Framework note**: Some routers reserve `loading.tsx` / `error.tsx` for route-level conventions. Feature-level files under `components/feature/...` serve a different purpose — keep them in the feature directory, not in your router's reserved locations.

**Example**:

```tsx
// components/feature/item/InvoicesTable/loading.tsx
export default function InvoicesTableLoadingUI() {
  return <div>Loading invoices...</div>;
}
```

```tsx
// components/feature/item/InvoicesTable/error.tsx
export default function InvoicesTableErrorUI() {
  return <div>Failed to load invoices.</div>;
}
```

---

### Data Hooks (`data/feature/`)

**Purpose**: General-purpose, reusable data-layer logic — fetching, mutating, caching. Named by data-layer purpose, not by the component that uses them.

**Rules**:

1. Export a **default** function (`useGetXxx`, `useXxx`).
2. Define and export a `UseXxxReturn` interface that serves as the contract for consumers.
3. Each hook focuses on a **single data concern** (one API endpoint, one resource type).
4. Hooks can mock data internally until the real backend is ready — the `UseXxxReturn` contract stays the same.
5. Hooks are shared across features — any Dependency Injector can import any data hook.
6. Query key management, cache invalidation, and optimistic updates belong here.
7. Centralize query keys — e.g. `lib/query-keys.ts` or `data/feature/invoice/keys.ts` — avoid scattering string literals.
8. Gate queries on required inputs — `enabled: !!userId` when the hook needs an id from the injector.

Wire hooks to your API client however your project does it (hand-written fetch, OpenAPI codegen, tRPC, etc.).

#### Hook return contracts

Every data hook **must** define and export a `UseXxxReturn` interface. That interface is the contract — design it for what your injector needs. Clean Component does not prescribe a single return shape across all hooks.

**What is required**:

- Export `UseXxxReturn` alongside the hook.
- Return only what `UseXxxReturn` declares — injectors depend on that interface, not on library types (`UseQueryResult`, `UseMutationResult`, etc.).
- Keep the interface stable when swapping mock internals for real API calls (Phase 4) so injectors do not need to change.

**What is up to you**:

- Field names, status representation, and granularity of the contract.
- Whether a query hook exposes `succeed`, separate `isLoading`/`isError` flags, a `status` enum, or something else entirely.
- How you implement the hook body (`useState`, `useQuery`, `useMutation`, etc.) as long as the return satisfies `UseXxxReturn`.
- **Error detail** — add `error: Error | null` or `failure: { message: string; code?: string } | null` when injectors must show specific messages or retry actions (the `succeed` tri-state alone is not enough for production UX).
- **Actions** — expose `refetch`, `reset`, or mutation `error` / `isError` on the contract when the UI needs them.

**Example convention** — query hooks use a `succeed: boolean | null` tri-state alongside the data field; mutation hooks expose an action function and `isPending`. This pairs well with shared loading/error UIs, but it is an **example**, not a requirement.

| `succeed` value | Meaning | Typical mock source | Typical React Query mapping |
| --------------- | ------- | ------------------- | --------------------------- |
| `null` | Loading | Initial / in-flight | `isPending` |
| `false` | Error | Fetch failed | `isError` |
| `true` | Success | Data ready | `isSuccess` |

**Injector wiring for the example convention**:

```tsx
const { invoices, succeed } = useGetAdminInvoices();

if (succeed === null) return <LoadingUI />;
if (succeed === false) return <ErrorUI />;
return <FeatureUI rows={rows} />;
```

**Example — mock query hook**:

```tsx
// data/feature/invoice/useGetAdminInvoices.ts

import { Invoice } from "@/lib/types/Invoice";
import { useEffect, useState } from "react";

const MOCKED_ADMIN_INVOICES: Invoice[] = []; // your fixture data

export interface UseGetAdminInvoicesReturn {
  invoices: Invoice[];
  succeed: boolean | null;
}

export default function useGetAdminInvoices(): UseGetAdminInvoicesReturn {
  const [data, setData] = useState<Invoice[]>([]);
  const [succeed, setSucceed] = useState<boolean | null>(null);

  useEffect(() => {
    if (Math.random() > 0.15) {
      setData(MOCKED_ADMIN_INVOICES);
      setSucceed(true);
    } else {
      setSucceed(false);
    }
  }, []);

  return { invoices: data, succeed };
}
```

**Example — production query hook** (React Query behind the same contract):

```tsx
// data/feature/cart/useGetCart.ts

import { useQuery } from "@tanstack/react-query";
import { getCart, type Cart } from "@/lib/api/v1";

export interface UseGetCartReturn {
  cart: Cart | null;
  succeed: boolean | null;
}

export default function useGetCart(userId: string): UseGetCartReturn {
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getCart({ user_id: userId }),
  });

  return {
    cart: data ?? null,
    succeed: isPending ? null : isError ? false : isSuccess ? true : null,
  };
}
```

**Example — production mutation hook**:

```tsx
// data/feature/cart/useAddCartItem.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCartItems } from "@/lib/api/v1";

export interface AddCartItemParams {
  variantId: string;
  quantity: number;
  userId: string;
}

export interface UseAddCartItemReturn {
  addCartItem: (params: AddCartItemParams) => void;
  isPending: boolean;
}

export default function useAddCartItem(): UseAddCartItemReturn {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: ({ variantId, quantity, userId }: AddCartItemParams) =>
      postCartItems({ variant_id: variantId, quantity }, { user_id: userId }),
    onSuccess: (_data, variables) =>
      queryClient.invalidateQueries({ queryKey: ["cart", variables.userId] }),
  });

  return { addCartItem: mutate, isPending };
}
```

> **Directory structure**: `data/feature/{invoice,cart,product,...}/useGetXxx.ts`. Hooks are organized by domain, not by UI component.

---

### Tier Interaction Summary

```
┌──────────────────────────────────────────────────────────────┐
│  Page (Level 2)                                              │
│  - Imports DI component only (e.g. AdminInvoicesTable)       │
│  - No direct access to data hooks or UI components           │
└─────────────────────┬────────────────────────────────────────┘
                      │
                      ▼
┌──────────────────────────────────────────────────────────────┐
│  AdminInvoicesTable.tsx  (Dependency Injector)               │
│  - Imports data hook from data/feature/                      │
│  - Imports shared mappers (e.g. formatInvoicesTableRows)     │
│  - Imports loading/error UIs from sibling files              │
│  - Renders <InvoicesTableUI {...uiProps} />                  │
└──────┬─────────────────────────┬──────────────────┬──────────┘
       │                         │                  │
       ▼                         ▼                  ▼
┌──────────────┐  ┌───────────────────────┐  ┌─────────────────────┐
│  index.tsx   │  │  data/feature/        │  │  loading.tsx        │
│  (Pure UI)   │  │  useGetAdminInvoices  │  │  error.tsx          │
│              │  │  useGetMyInvoices     │  ├─────────────────────┤
│  - View-model│  │                       │  │  formatInvoices   │
│    props     │  │  - UseXxxReturn       │  │  TableRows.ts       │
│  - No deps   │  │  - Mocks allowed      │  │  (shared mapper)    │
│  - Default   │  │  - Default export     │  └─────────────────────┘
│    export    │  └───────────────────────┘
└──────────────┘
```

**Benefits of this separation**:

- **UI can be developed and reviewed in isolation** — pass mocked props to the UI component.
- **Data hooks are reusable** across injectors and pages.
- **Multiple injectors** share `index.tsx` while having their own data/formatting strategy.
- **Changing the API** only touches `data/feature/` — `index.tsx` never changes.
- **Loading/error states** are shared across injectors via standalone files.

---

## Page Layer (Level 2) — Composition

A page (route screen) is the **consumer** — it only imports Dependency Injector components. Pages never import `index.tsx` (pure UI) directly or call `data/feature/` hooks.

Where pages live depends on your router (`src/pages/`, React Router route elements, file-based route folders, etc.).

**Rules**:

1. Only import injector files from `components/feature/...`.
2. No direct import of `index.tsx` from feature components.
3. No direct import of hooks from `data/feature/`.
4. **May** read routing, loaders, or auth — then pass values into the injector as props (`userId`, pre-fetched lists, `translations`). The page orchestrates *where* data comes from; the injector orchestrates *how* it becomes UI.
5. Do not implement feature UI layout or formatting here — only page chrome (title, breadcrumbs) and injector composition.

**Example — Vite + React Router**:

```tsx
// src/pages/AdminInvoicesPage.tsx

import AdminInvoicesTable from "@/components/feature/item/InvoicesTable/AdminInvoicesTable";

export default function AdminInvoicesPage() {
  return (
    <div>
      <h1>Admin Invoices</h1>
      <AdminInvoicesTable />
    </div>
  );
}
```

---

## App Layer (Level 1) — Global Setup

The app layer sets up shared infrastructure — providers, global styles, fonts, and layout shells. Mount it once at the root (`main.tsx`, `App.tsx`, root layout, etc.).

### Providers

```tsx
// components/layout/providers.tsx

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: { staleTime: 5 * 60 * 1000, retry: 1 },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
```

```tsx
// src/main.tsx (Vite example)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Providers } from "@/components/layout/providers";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Providers>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Providers>
  </StrictMode>,
);
```

### Layout Shells

Layout components use `index.tsx` as the main entry, with sections in sibling files:

```
components/layout/ExampleLayout/
├── index.tsx     # Main layout composition
├── header.tsx    # Header section
└── footer.tsx    # Footer section
```

> **Naming convention**: Section components are named `<LayoutDirName><Section>` — e.g. `ExampleLayout/header.tsx` exports `ExampleLayoutHeader`.

```tsx
// components/layout/ExampleLayout/index.tsx

import { PropsWithChildren } from "react";
import ExampleLayoutHeader from "./header";
import ExampleLayoutFooter from "./footer";

export default function ExampleLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-between">
      <ExampleLayoutHeader />
      <main className="h-full">{children}</main>
      <ExampleLayoutFooter />
    </div>
  );
}
```

---

## Internationalization (`translations`)

The `translations` prop decouples UI text from the renderer. Injectors assemble it from any source:

- **Hardcoded** — fine for prototypes.
- **Dictionary module** — `import { invoicesTable } from "@/i18n/en"` and spread into `translations`.
- **i18n library** — `react-i18next`, `react-intl`, etc.; map keys to the `translations` shape the UI expects inside the injector.
- **Props from parent** — a page or layout passes pre-resolved copy into an injector that accepts `translations` as a prop.

The pure UI always receives a plain `translations` object — it never imports an i18n library.

---

## Development Workflow

Build top-down: UI first, then wiring.

### Phase 1 — UI First

1. Define `index.tsx` with `<ComponentName>UIProps` and a default export.
2. Build and refine the UI in isolation with hardcoded props.
3. Get design approval on the rendered component.

### Phase 2 — Shared Support Files

1. Create `loading.tsx` and `error.tsx` if needed.
2. Create mapper or logic files — one concern per file (`formatXxxRows.ts` for pure maps; `useXxxFiltering.ts` when hooks are required).
3. Multiple injectors in the same directory share these files.

### Phase 3 — Build Dependency Injector

1. Create `<VariantName>.tsx` as a default-exported component.
2. Import UI, shared hooks, loading/error UIs, and data hooks.
3. Handle loading/error/success per the data hook contract; render the UI.

### Phase 4 — Real Data

1. Replace mock internals in `data/feature/` hooks — keep the same `UseXxxReturn` interface.
2. Test end-to-end.
3. No changes to `index.tsx` or the injector — only the hook body changes.

---

## Principles & Rationale

**1. UI is the highest-level presentation module.**  
Pure UI depends on no domain or API types. It is stable, reusable, and immune to backend schema changes.

**2. Single-entry point per Dependency Injector.**  
The injector (`<Name>.tsx`) is the only file pages import. It owns fetching, formatting, and wiring.

**3. Data hooks are general-purpose, not component-specific.**  
Hooks live in `data/feature/` by domain. Each exposes a `UseXxxReturn` contract you define.

**4. Fast-paced, parallel development.**  
UI on `index.tsx`, data in `data/feature/`, mocks unblock UI before the backend exists.

**5. Designed for testability.**  
Each layer exposes a stable surface — see [Testing](#testing).

**6. Multiple Dependency Injectors, shared UI.**  
One `index.tsx`, many injectors (`AdminXxx`, `MyXxx`, …), each with its own data strategy.

**7. No mega components — component per feature.**  
One directory per coherent feature. Split when unrelated concerns accumulate.

---

## Testing

The architecture supports layered testing when you add a runner (e.g. Vitest + React Testing Library):

| Layer | What to test | How |
| ----- | ------------ | --- |
| **Pure UI** (`index.tsx`) | Renders for given `UIProps`; callbacks fire; empty state | Storybook or RTL with hardcoded props |
| **Shared mapper / logic** | Input → output mapping | Unit test with fixture data — no render |
| **Data hook** | `UseXxxReturn` contract | `QueryClientProvider` test wrapper; mock API |
| **Injector** | Loading / error / success / empty branches | `vi.mock` on `data/feature` and mappers |
| **Page** | Composes correct injector with props | Shallow render; assert injector + props |

**Priority:** pure UI (Storybook) and shared mappers first — highest value, lowest setup.

---

## Definition of Done

Before merging a new feature directory under `components/feature/...`:

- [ ] `index.tsx` exports default UI + `UIProps` (and view-model types)
- [ ] Pure UI has no domain/API type imports
- [ ] At least one injector; pages import injectors only
- [ ] Data hooks (if any) export `UseXxxReturn`
- [ ] Loading / error UIs shared across injectors in the directory (or documented why not)
- [ ] Empty state handled when UX requires it
- [ ] `translations` populated in injector (or passed in for prop-fed variant)
- [ ] Storybook story or RTL test for pure UI with representative props
- [ ] Mapper/logic unit test when formatting is non-trivial

---

## Enforcing import boundaries

Conventions erode without tooling. Add ESLint restrictions (e.g. `eslint-plugin-import` or `eslint-plugin-boundaries`):

```js
// eslint.config.mjs (conceptual — adapt to your flat config)

// Pages must not import pure UI or data hooks
{
  files: ["src/pages/**", "app/**/page.tsx"],
  rules: {
    "no-restricted-imports": ["error", {
      patterns: [
        { group: ["**/components/feature/**/index", "**/components/feature/**/index.tsx"], message: "Pages import injectors only." },
        { group: ["**/data/feature/**"], message: "Pages must not import data hooks." },
      ],
    }],
  },
}
```

Adjust globs to your router layout. The goal: **pages → injectors → everything else**, enforced in CI.
