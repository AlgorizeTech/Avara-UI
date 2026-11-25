---
title: "Shadcn Table"
description: "Shadcn Table. A set of composable, stateless table primitives (`Table`, `TableHead`, `TableRow`, `TableCell`) that map any API data shape directly into JSX."
url: https://avaraui.com/docs/nextjs/table
---

# Shadcn Table

A set of composable, stateless table primitives (`Table`, `TableHead`, `TableRow`, `TableCell`) that map any API data shape directly into JSX.

### Comparison (soft)

The same soft table as a plan comparison: features down the side, plans across the top, ticks and limits centred under their headers.

- `align="center"` on both `TableHead` and `TableCell` lines the ticks and values up under each plan.

```tsx
"use client";

import { Check, Minus } from "lucide-react";
import {
  Table,
  TableBadge,
  TableBody,
  TableCell,
  TableContent,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/custom/blocks/TableBlock";
import { accentStyle } from "@/lib/accent";

const PLANS = ["Free", "Pro", "Team"] as const;
type Plan = (typeof PLANS)[number];

// `true` is included, `false` is not, a string is the limit.
type Value = boolean | string;

const FEATURES: { feature: string; values: Record<Plan, Value> }[] = [
  { feature: "Projects", values: { Free: "3", Pro: "Unlimited", Team: "Unlimited" } },
  { feature: "Team members", values: { Free: "1", Pro: "5", Team: "Unlimited" } },
  { feature: "Storage", values: { Free: "2 GB", Pro: "100 GB", Team: "1 TB" } },
  { feature: "Custom domains", values: { Free: false, Pro: true, Team: true } },
  { feature: "Analytics", values: { Free: "Basic", Pro: "Advanced", Team: "Advanced" } },
  { feature: "Version history", values: { Free: "7 days", Pro: "90 days", Team: "Forever" } },
  { feature: "Single sign-on", values: { Free: false, Pro: false, Team: true } },
  { feature: "Priority support", values: { Free: false, Pro: true, Team: true } },
];

function PlanValue({ value }: { value: Value }) {
  if (value === true) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Check className="size-3.5" strokeWidth={2.5} aria-hidden="true" />
        <span className="sr-only">Included</span>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex size-6 items-center justify-center text-muted-foreground/60">
        <Minus className="size-3.5" aria-hidden="true" />
        <span className="sr-only">Not included</span>
      </span>
    );
  }
  return <span className="text-foreground">{value}</span>;
}

export default function PlanComparison({ color }: { color?: string } = {}) {
  return (
    <div className="w-full" style={accentStyle(color)}>
      <Table variant="soft" color={color}>
      <TableContent aria-label="Compare plans">
        <TableHeader>
          <TableRow isHeader>
            <TableHead className="min-w-44">Feature</TableHead>
            {PLANS.map((plan) => (
              <TableHead key={plan} align="center" className="min-w-28">
                <span className="inline-flex items-center gap-2">
                  {plan}
                  {plan === "Pro" && (
                    <TableBadge tone="info" dot={false} className="h-5 px-2 text-[10px] normal-case tracking-normal">
                      Popular
                    </TableBadge>
                  )}
                </span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {FEATURES.map(({ feature, values }) => (
            <TableRow key={feature}>
              <TableCell className="font-medium">{feature}</TableCell>
              {PLANS.map((plan) => (
                <TableCell key={plan} align="center">
                  <PlanValue value={values[plan]} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </Table>
    </div>
  );
}
```

## About Shadcn Table

**What it is.** A composable suite of table primitives (`Table`, `TableContent`, `TableHeader`, `TableBody`, `TableFooter`, `TableHead`, `TableRow`, `TableCell`, `TableExpandedRow`, `TableEmpty`, `TableRowActions`, `TablePerson`, `TableBadge`) with `default`, `minimal`, and `soft` variants.

**How it is built.** Each primitive renders native semantic `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>` markup while sharing `variant`, `size`, and theme tokens from context. Sorting and row expansion are controlled props so the table never mutates your data behind your back.

**When to use it.** Use `Table` when you want full control over row JSX, server-side sorting, or custom cells without column definitions. When you want client-side search, multi-column sorting, pagination, and batch selection wired up automatically, use [Data Table](https://avaraui.com/docs/nextjs/data-table).

## For AI agents

**When to use**

- Read-only, comparison, or server-driven tables where rows map directly from any API shape into JSX
- Expandable rows (`TableExpandToggle` + `TableExpandedRow`), hover/focus row actions (`TableRowActions`), or `variant="soft"` admin/comparison tables

**When not to use**

- Client-side search, filters, pagination, and batch row selection out of the box — use [Data Table](https://avaraui.com/docs/nextjs/data-table)
- Spreadsheet-style inline cell editing — use [Data Grid](https://avaraui.com/docs/nextjs/data-grid)

**Agent notes**

- Named exports from `@/components/custom/blocks/TableBlock`
- `TableEmpty` and `TableExpandedRow` require an accurate `colSpan` matching your visible column count
- Sorting (`sortable`, `sortDirection`, `onSort`) is controlled and stateless

**Ask before you pick.** This page has 3 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 3 options as live previews: https://avaraui.com/view/table

**When to use it.** A set of composable table primitives: you write the rows and the component supplies structure, spacing and theming, with no column config and no required row shape. Three looks: the default card, a minimal one and the soft admin-dashboard look.

**When to use something else:**

- [Data Table](https://avaraui.com/docs/nextjs/data-table): for a data table with search, filters and paging wired up for you.

**Gotchas:**

- All three are looks of the one `table` item: install it once and set `variant` on `Table` from the index.
- Sortable headers, expandable rows, pagination and row actions are composition on any look; the table never reorders your data behind your back.
- `size` on `Table` sets the spacing for every cell and header through context.

### The 3 variants

1. **Default card** (`default`): The table inside a card wrapper: the default look.
   - Live: https://avaraui.com/view/table/default
   - Best for: a data table on a plain page
   - Avoid if: the table already sits in a container that supplies the frame
   - Traits: card wrapper, default look
   - Install: `npx shadcn@latest add @avara-ui/table`
   - Docs: https://avaraui.com/docs/nextjs/table#composable-table
2. **Minimal** (`minimal`): The card wrapper is dropped so the table sits directly on the page.
   - Live: https://avaraui.com/view/table/minimal
   - Best for: a table inside a layout that already provides the surface
   - Avoid if: you want it to read as a self-contained card
   - Traits: no card wrapper
   - Install: `npx shadcn@latest add @avara-ui/table`
   - Set these props: `{"variant":"minimal"}`
   - Docs: https://avaraui.com/docs/nextjs/table#minimal
3. **Soft** (`soft`): A read-only admin-dashboard look: rounded panel, tinted header band, calm dividers and soft row hover.
   - Live: https://avaraui.com/view/table/soft
   - Best for: an admin or settings area with a gentle, dashboard-style table
   - Avoid if: you need search, filters or paging built in
   - Traits: rounded panel on a hairline ring, tinted header band, tints mixed from the table colour
   - Install: `npx shadcn@latest add @avara-ui/table`
   - Set these props: `{"variant":"soft"}`
   - Docs: https://avaraui.com/docs/nextjs/table#soft-variant

## Props Reference

### Components

| Component | Renders | Purpose |
| --- | --- | --- |
| `Table` | `div` | The card wrapper. Provides variant, size and colour by context. |
| `TableHeading` | `div` | Title bar above the table. Children align to the right as an action slot. |
| `TableContent` | `div > table` | Horizontal scroll container plus the table element. |
| `TableHeader` | `thead` | Plain pass-through. |
| `TableBody` | `tbody` | Optional staggered entrance animation. |
| `TableRow` | `tr` | Body row, or a header row with `isHeader`. |
| `TableHead` | `th` | Header cell, optionally sortable. |
| `TableCell` | `td` | Body cell. |
| `TableFooter` | `div` | Footer bar below the table — pagers, totals, bulk controls. |
| `TableEmpty` | `tr > td` | Full-width empty state row. |
| `TableExpandedRow` | `tr > td` | Animated detail panel beneath a row. |
| `TableExpandToggle` | `button` | Rotating chevron for the row above. |
| `TableRowActions` | `div` | Reveals its buttons on row hover or keyboard focus (always visible in `soft`). |
| `TableRowAction` | `button` | Round icon button for a row action; `label` is required, `tone="danger"` for deletes. |
| `TableAction` | `button` | Toolbar button in the table's look — `variant` primary, secondary or ghost. |
| `TableBadge` | `span` | Status pill with a dot (`tone`: neutral, success, warning, danger, info), or a tag with `dot={"{false}"}`. |
| `TablePerson` | `div` | Avatar (photo or initials), a name and a muted second line. |

### `Table`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "minimal" \| "glass" \| "soft"` | `"default"` | Bordered card, bare table, frosted glass panel, or the admin-dashboard look (see [Data Table](https://avaraui.com/docs/nextjs/data-table) for the full soft example). |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Row density — cell padding and text size. |
| `color` | `"primary" \| "indigo" \| "rose" \| "emerald" \| "zinc" \| (hex)` | `"primary"` | Accent for selected rows and interactive affordances. Any `#rrggbb` works. |

### `TableHead`

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `align` | `"left" \| "center" \| "right"` | `"left"` | Text alignment. |
| `sortable` | `boolean` | `false` | Renders the header as a sort button. |
| `sortDirection` | `"asc" \| "desc" \| null` | `null` | Controlled — drives the chevron and `aria-sort`. |
| `onSort` | `() => void` | — | Fired on click. You reorder the data. |

### `TableRow`, `TableCell`, `TableBody`

| Component | Prop | Type | Description |
| --- | --- | --- | --- |
| `TableRow` | `isHeader` | `boolean` | Applies header styling instead of body row styling. |
| `TableRow` | `selected` | `boolean` | Applies the selected background and sets `data-selected`. |
| `TableCell` | `align` | `"left" \| "center" \| "right"` | Text alignment. |
| `TableBody` | `animate` | `boolean` | Staggered entrance (Web Animations API) for direct child rows. Off by default. |
| `TableBody` | `animateKey` | `React.Key` | Change it to replay the entrance — e.g. on sort or page change. |

### `TableExpandedRow`, `TableEmpty`, `TableRowActions`

| Component | Prop | Type | Description |
| --- | --- | --- | --- |
| `TableExpandedRow` | `open` | `boolean` | Grid-animates the panel open or closed. |
| `TableExpandedRow` | `colSpan` | `number` | Required. Must match your column count. |
| `TableEmpty` | `colSpan` | `number` | Required. Defaults its text to &ldquo;No data available.&rdquo; |
| `TableRowActions` | `align` | `"left" \| "center" \| "right"` | Horizontal alignment inside the cell. Defaults to `"right"`. |
| `TableRowActions` | `alwaysVisible` | `boolean` | Skip the hover reveal and keep the buttons visible. Defaults to visible in the `soft` variant. |

Every primitive also forwards its ref and accepts the native attributes of the element it renders.

## Works with other components

- Upgrade to [Data Table](https://avaraui.com/docs/nextjs/data-table) when you need built-in search, filter tabs, pagination, and batch row selection.
- Pair row actions with [Dialog](https://avaraui.com/docs/nextjs/dialog) for delete confirmations or [Popover](https://avaraui.com/docs/nextjs/popover) for quick filters.
- Render [Avatar Stack](https://avaraui.com/docs/nextjs/avatar-stack) or [Verify Badge](https://avaraui.com/docs/nextjs/verify-badge) inside table cells.

## When should I use Table vs Data Table?

Use `Table` when you want stateless primitives that you map your own API data into. Move to [Data Table](https://avaraui.com/docs/nextjs/data-table) when you need built-in search, filter tabs, pagination and batch row selection. `Table` has no state of its own, so you control sorting and selection.

## How do I add sortable column headers?

Set `sortable` on `TableHead` and control `sortDirection` with `"asc"`, `"desc"` or `null`. The head renders as a sort button, shows a chevron and sets `aria-sort`. `onSort` fires on click, and you reorder the data yourself because the table never sorts rows.

## How do I highlight selected rows or add an expandable row?

Pass `selected` to `TableRow` to apply the selected background and `data-selected`. For details panels, render a `TableExpandedRow` with `open` and a `colSpan` matching your column count. It animates open and closed with a grid transition.

## How do I keep TableEmpty and TableExpandedRow aligned?

Both require a `colSpan`, so set it to the number of columns in your table. `TableEmpty` shows "No data available." by default. A `colSpan` that is too small leaves the empty or expanded cell narrower than the header row.

## How do I switch the table style or density?

Set `variant` to `"default"`, `"minimal"`, `"glass"` or `"soft"` on `Table`, and `size` to `"sm"`, `"md"` or `"lg"` for row density. `color` sets the accent for selected rows. `TableBody` can add a staggered entrance with `animate`, replayed by changing `animateKey`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/table
