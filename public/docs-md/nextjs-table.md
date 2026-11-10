---
title: "Shadcn Table"
description: "A set of composable table primitives. You write the rows; the component supplies the structure, spacing and theming. Free shadcn/ui Table component."
url: https://avaraui.com/docs/nextjs/table
---

# Shadcn Table

A set of composable table primitives. You write the rows; the component supplies the structure, spacing and theming.

There is **no column config and no required row shape**. Whatever your API returns — nested objects, snake_case keys, `_id` instead of `id` — you map it straight into JSX. Nothing has to be flattened or transformed first.

Every example below is live. Click a sortable header, expand a row, or hover the right edge of a row to reveal its actions.

## For AI agents

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

## Soft variant

A plain read-only table in the admin-dashboard look — a rounded panel on a hairline ring, a tinted header band, calm dividers and soft row hover. No search, filters or paging: just the rows.

- Set `variant="soft"` once on `Table`; the heading, header band, cells and dividers read it from context. Every tint is mixed from the table colour.
- `TablePerson` and `TableBadge` draw the avatar-and-email cell and the status pill, in any variant.

```tsx
"use client";

import {
  Table,
  TableBadge,
  type TableBadgeTone,
  TableBody,
  TableCell,
  TableContent,
  TableHead,
  TableHeader,
  TableHeading,
  TablePerson,
  TableRow,
} from "@/components/custom/blocks/TableBlock";
import { accentStyle } from "@/lib/accent";

type Status = "paid" | "pending" | "failed";

// Nested on purpose: the primitives render whatever shape your API returns.
interface Invoice {
  reference: string;
  customer: { name: string; email: string };
  amount: number;
  status: Status;
  /** ISO date. */
  issuedAt: string;
}

const INVOICES: Invoice[] = [
  { reference: "INV-3021", customer: { name: "Alice Freeman", email: "alice@northwind.io" }, amount: 3200, status: "paid", issuedAt: "2026-09-28" },
  { reference: "INV-3022", customer: { name: "Bob Smith", email: "bob@lumen.studio" }, amount: 850.5, status: "pending", issuedAt: "2026-09-27" },
  { reference: "INV-3023", customer: { name: "Charlie Davis", email: "charlie@acme.io" }, amount: 1420, status: "failed", issuedAt: "2026-09-26" },
  { reference: "INV-3024", customer: { name: "Diana Prince", email: "diana@themyscira.co" }, amount: 940, status: "paid", issuedAt: "2026-09-25" },
  { reference: "INV-3025", customer: { name: "Evan Wright", email: "evan@wright.design" }, amount: 2100, status: "paid", issuedAt: "2026-09-23" },
  { reference: "INV-3026", customer: { name: "Fiona Gallagher", email: "fiona@southside.org" }, amount: 450, status: "pending", issuedAt: "2026-09-22" },
];

const STATUS_TONE: Record<Status, TableBadgeTone> = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

const STATUS_LABEL: Record<Status, string> = {
  paid: "Paid",
  pending: "Pending",
  failed: "Failed",
};

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-09-04" → "Sep 4, 2026", the same on every machine. */
const formatDate = (iso: string) => {
  const [year, month, day] = iso.split("-").map(Number);
  return `${MONTHS[(month ?? 1) - 1]} ${day}, ${year}`;
};

export default function InvoicesTable({ color }: { color?: string } = {}) {
  return (
    <div className="w-full" style={accentStyle(color)}>
      <Table variant="soft" color={color}>
      <TableHeading title="Recent invoices" description="Everything billed in the last 30 days." />
      <TableContent aria-label="Recent invoices">
        <TableHeader>
          <TableRow isHeader>
            <TableHead>Invoice</TableHead>
            <TableHead className="min-w-60">Customer</TableHead>
            <TableHead>Issued</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {INVOICES.map((invoice) => (
            <TableRow key={invoice.reference}>
              <TableCell className="whitespace-nowrap font-medium tabular-nums">
                {invoice.reference}
              </TableCell>
              <TableCell className="min-w-60">
                <TablePerson name={invoice.customer.name} description={invoice.customer.email} />
              </TableCell>
              <TableCell className="whitespace-nowrap tabular-nums text-muted-foreground">
                <time dateTime={invoice.issuedAt}>{formatDate(invoice.issuedAt)}</time>
              </TableCell>
              <TableCell>
                <TableBadge tone={STATUS_TONE[invoice.status]}>{STATUS_LABEL[invoice.status]}</TableBadge>
              </TableCell>
              <TableCell align="right" className="whitespace-nowrap font-medium tabular-nums">
                {money(invoice.amount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </Table>
    </div>
  );
}
```

`Table` is the card. `TableContent` renders the scroll container and the `<table>` element. Everything else maps one-to-one onto the HTML table tags, so `colSpan`, `scope` and any other native attribute pass straight through.

### Composable table

- Map `rows` straight into JSX — nested values like customer.email need no transformation.

```tsx
"use client";



type Invoice = {
  reference: string;
  customer: { name: string; email: string };
  amount: number;
  status: "completed" | "processing" | "failed";
  issuedAt: string;
  note?: string;
};

const sampleInvoices: Invoice[] = [
  {
    reference: "INV-3021",
    customer: { name: "Alice Freeman", email: "alice@example.com" },
    amount: 3200,
    status: "completed",
    issuedAt: "2023-10-24",
  },
  {
    reference: "INV-3022",
    customer: { name: "Bob Smith", email: "bob@example.com" },
    amount: 850.5,
    status: "processing",
    issuedAt: "2023-10-24",
  },
  {
    reference: "INV-3023",
    customer: { name: "Charlie Davis", email: "charlie@example.com" },
    amount: 1420,
    status: "failed",
    issuedAt: "2023-10-23",
  },
  {
    reference: "INV-3024",
    customer: { name: "Diana Prince", email: "diana@example.com" },
    amount: 940,
    status: "completed",
    issuedAt: "2023-10-22",
  },
];

const STATUS_STYLES: Record<Invoice["status"], string> = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  <span
    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function ComposableTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  return (
    <Table>
      <TableHeading
        title="Invoices"
        description="Composed from primitives — no column config anywhere."
      />

      <TableContent>
        <TableHeader>
          <TableRow isHeader>
            <TableHead>Invoice</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead align="right">Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align="right">Issued</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.reference}>
              <TableCell className="font-mono text-xs">
                {invoice.reference}
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">
                    {invoice.customer.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {invoice.customer.email}
                  </span>
                </div>
              </TableCell>

              <TableCell align="right" className="font-medium">
                {money(invoice.amount)}
              </TableCell>

              <TableCell>
                <StatusPill status={invoice.status} />
              </TableCell>

              <TableCell align="right" className="text-muted-foreground">
                {invoice.issuedAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContent>
    </Table>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/table.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/table
```

## Examples

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

## Density

### Sizes

- Set `size="sm" | "md" | "lg"` on Table — every descendant reads it from context, so cells and headers stay in step.

```tsx
"use client";



type Invoice = {
  reference: string;
  customer: { name: string; email: string };
  amount: number;
  status: "completed" | "processing" | "failed";
  issuedAt: string;
  note?: string;
};

const sampleInvoices: Invoice[] = [
  {
    reference: "INV-3021",
    customer: { name: "Alice Freeman", email: "alice@example.com" },
    amount: 3200,
    status: "completed",
    issuedAt: "2023-10-24",
  },
  {
    reference: "INV-3022",
    customer: { name: "Bob Smith", email: "bob@example.com" },
    amount: 850.5,
    status: "processing",
    issuedAt: "2023-10-24",
  },
  {
    reference: "INV-3023",
    customer: { name: "Charlie Davis", email: "charlie@example.com" },
    amount: 1420,
    status: "failed",
    issuedAt: "2023-10-23",
  },
];

const STATUS_STYLES: Record<Invoice["status"], string> = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  <span
    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider ${STATUS_STYLES[status]}`}
  >
    {status}
  </span>
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const TABLE_SIZES = ["sm", "md", "lg"] as const;

export default function TableSizesDemo({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  return (
    <div className="w-full flex flex-col gap-8">
      {TABLE_SIZES.map((size) => (
        <div key={size} className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            size=&quot;{size}&quot;
          </span>
          <Table size={size}>
            <TableContent>
              <TableHeader>
                <TableRow isHeader>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead align="right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.reference}>
                    <TableCell className="font-mono text-xs font-medium">
                      {invoice.reference}
                    </TableCell>
                    <TableCell>{invoice.customer.name}</TableCell>
                    <TableCell align="right" className="font-medium">
                      {money(invoice.amount)}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={invoice.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TableContent>
          </Table>
        </div>
      ))}
    </div>
  );
}
```

## Features

### Any data shape

No column config and no required row shape. Nested objects, unusual key names and computed cells all work without a transformation step.

### Real table markup

Each primitive renders its native element, so colSpan, scope and aria attributes pass straight through and screen readers get a genuine table.

### Themed by context

Variant, size and colour are set once on Table and read by every descendant, so a cell dropped three levels deep still matches.

### Stateless by default

Sorting and expansion are controlled props. The table never reorders or hides your data on its own, so server-side sorting and paging drop in unchanged.

## Best Practices & Guidelines

### Reach for the Data Table instead

These primitives are deliberately stateless. If you need search, pagination, row selection and batch actions wired up for you, use the Data Table — it composes the very same primitives and adds a state provider.

### Keep colSpan honest

TableEmpty and TableExpandedRow both need a colSpan that matches your real column count. Derive it from a variable rather than hard-coding it, so conditional columns cannot drift out of sync.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/table
