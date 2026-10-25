export const metadata = docsPageMetadata("table");

# Table

A set of composable table primitives. You write the rows; the component supplies the structure, spacing and theming.

There is **no column config and no required row shape**. Whatever your API returns — nested objects, snake_case keys, `_id` instead of `id` — you map it straight into JSX. Nothing has to be flattened or transformed first.

Every example below is live. Click a sortable header, expand a row, or hover the right edge of a row to reveal its actions.

`Table` is the card. `TableContent` renders the scroll container and the `` element. Everything else maps one-to-one onto the HTML table tags, so `colSpan`, `scope` and any other native attribute pass straight through.

export const invoiceType = `type Invoice = {
  reference: string;
  customer: { name: string; email: string };
  amount: number;
  status: "completed" | "processing" | "failed";
  issuedAt: string;
  note?: string;
};`;

export const usageBasic = `"use client";

${invoiceType}

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

const STATUS_STYLES: Record = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function ComposableTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  return (

            Invoice
            Customer
            Amount
            Status
            Issued

          {invoices.map((invoice) => (

                {invoice.reference}

                    {invoice.customer.name}

                    {invoice.customer.email}

                {money(invoice.amount)}

                {invoice.issuedAt}

          ))}

  );
}`;

export const usageMinimal = `"use client";

${invoiceType}

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

const STATUS_STYLES: Record = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function MinimalTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  return (

            Invoice
            Customer
            Amount
            Status
            Issued

          {invoices.map((invoice) => (

                {invoice.reference}

                    {invoice.customer.name}

                    {invoice.customer.email}

                {money(invoice.amount)}

                {invoice.issuedAt}

          ))}

  );
}`;

export const usageSorting = `"use client";

${invoiceType}

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
  {
    reference: "INV-3025",
    customer: { name: "Evan Wright", email: "evan@example.com" },
    amount: 2100,
    status: "completed",
    issuedAt: "2023-10-21",
  },
];

const STATUS_STYLES: Record = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

type SortKey = "reference" | "customer" | "amount" | "issuedAt";

const SORT_ACCESSORS = {
  reference: (row: Invoice) => row.reference,
  customer: (row: Invoice) => row.customer.name,
  amount: (row: Invoice) => row.amount,
  issuedAt: (row: Invoice) => row.issuedAt,
} as const;

export default function SortableTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  const [sort, setSort] = useState({ key: "reference", direction: "asc" });

  const toggleSort = (key: SortKey) =>
    setSort((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );

  const sorted = useMemo(() => {
    if (!sort) return invoices;
    const read = SORT_ACCESSORS[sort.key];
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...invoices].sort((a, b) => {
      const av = read(a);
      const bv = read(b);
      if (typeof av === "number" && typeof bv === "number")
        return factor * (av - bv);
      return factor * String(av).localeCompare(String(bv));
    });
  }, [invoices, sort]);

  return (

             toggleSort("reference")}
            >
              Invoice
            
             toggleSort("customer")}
            >
              Customer
            
             toggleSort("amount")}
            >
              Amount
            
            Status
             toggleSort("issuedAt")}
            >
              Issued

          {sorted.map((invoice) => (

                {invoice.reference}

                    {invoice.customer.name}

                    {invoice.customer.email}

                {money(invoice.amount)}

                {invoice.issuedAt}

          ))}

  );
}`;

export const usageExpandable = `"use client";

${invoiceType}

const sampleInvoices: Invoice[] = [
  {
    reference: "INV-3021",
    customer: { name: "Alice Freeman", email: "alice@example.com" },
    amount: 3200,
    status: "completed",
    issuedAt: "2023-10-24",
    note: "Payment processed via Stripe. Receipt emailed to the customer.",
  },
  {
    reference: "INV-3022",
    customer: { name: "Bob Smith", email: "bob@example.com" },
    amount: 850.5,
    status: "processing",
    issuedAt: "2023-10-24",
    note: "Waiting on bank confirmation — usually 2–3 business days.",
  },
  {
    reference: "INV-3023",
    customer: { name: "Charlie Davis", email: "charlie@example.com" },
    amount: 1420,
    status: "failed",
    issuedAt: "2023-10-23",
    note: "Card declined by issuer. Customer asked to update payment method.",
  },
  {
    reference: "INV-3024",
    customer: { name: "Diana Prince", email: "diana@example.com" },
    amount: 940,
    status: "completed",
    issuedAt: "2023-10-22",
    note: "Payment processed via PayPal.",
  },
];

const STATUS_STYLES: Record = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function ExpandableTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  const [expanded, setExpanded] = useState>(new Set(["INV-3021"]));

  const toggleExpanded = (reference: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(reference)) next.delete(reference);
      else next.add(reference);
      return next;
    });

  const columnCount = 6;

  return (

            Invoice
            Customer
            Amount
            Status
            Issued

          {invoices.map((invoice) => (

                   toggleExpanded(invoice.reference)}
                  />

                  {invoice.reference}

                      {invoice.customer.name}

                      {invoice.customer.email}

                  {money(invoice.amount)}

                  {invoice.issuedAt}

                  Transaction summary

                  {invoice.note ??
                    "No additional history recorded for this invoice."}

          ))}

  );
}`;

export const usagePagination = `"use client";

${invoiceType}

const sampleInvoices: Invoice[] = [
  { reference: "INV-3021", customer: { name: "Alice Freeman", email: "alice@example.com" }, amount: 3200, status: "completed", issuedAt: "2023-10-24" },
  { reference: "INV-3022", customer: { name: "Bob Smith", email: "bob@example.com" }, amount: 850.5, status: "processing", issuedAt: "2023-10-24" },
  { reference: "INV-3023", customer: { name: "Charlie Davis", email: "charlie@example.com" }, amount: 1420, status: "failed", issuedAt: "2023-10-23" },
  { reference: "INV-3024", customer: { name: "Diana Prince", email: "diana@example.com" }, amount: 940, status: "completed", issuedAt: "2023-10-22" },
  { reference: "INV-3025", customer: { name: "Evan Wright", email: "evan@example.com" }, amount: 2100, status: "completed", issuedAt: "2023-10-21" },
  { reference: "INV-3026", customer: { name: "Fiona Gallagher", email: "fiona@example.com" }, amount: 450, status: "processing", issuedAt: "2023-10-21" },
  { reference: "INV-3027", customer: { name: "George Harris", email: "george@example.com" }, amount: 5500, status: "completed", issuedAt: "2023-10-20" },
];

const STATUS_STYLES: Record = {
  completed: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing: "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function PaginatedTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  const pageSize = 4;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(invoices.length / pageSize));
  const rows = invoices.slice((page - 1) * pageSize, page * pageSize);

  return (

            Invoice
            Customer
            Amount
            Status
            Issued

          {rows.map((invoice) => (

                {invoice.reference}

                    {invoice.customer.name}

                    {invoice.customer.email}

                {money(invoice.amount)}

                {invoice.issuedAt}

          ))}

          Page {page} of {totalPages}

           setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="p-1.5 rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >

           setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
            className="p-1.5 rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >

  );
}`;

export const usageActions = `"use client";

${invoiceType}

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

const STATUS_STYLES: Record = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
);

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

export default function RowActionsTable({
  invoices = sampleInvoices,
}: {
  invoices?: Invoice[];
}) {
  const handleEdit = (invoice: Invoice) => {
    console.log("Editing invoice:", invoice.reference);
  };

  const handleDelete = (invoice: Invoice) => {
    console.log("Deleting invoice:", invoice.reference);
  };

  return (

            Invoice
            Customer
            Amount
            Status
            Issued
            Actions

          {invoices.map((invoice) => (

                {invoice.reference}

                    {invoice.customer.name}

                    {invoice.customer.email}

                {money(invoice.amount)}

                {invoice.issuedAt}

                   handleEdit(invoice)}
                    aria-label={\`Edit \${invoice.reference}\`}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                  >

                   handleDelete(invoice)}
                    aria-label={\`Delete \${invoice.reference}\`}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                  >

          ))}

  );
}`;

export const usageSizes = `"use client";

${invoiceType}

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

const STATUS_STYLES: Record = {
  completed:
    "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  processing:
    "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
  failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
};

const StatusPill = ({ status }: { status: Invoice["status"] }) => (
  
    {status}
  
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
    
      {TABLE_SIZES.map((size) => (

            size=&quot;{size}&quot;

                  Invoice
                  Customer
                  Amount
                  Status

                {invoices.map((invoice) => (

                      {invoice.reference}
                    
                    {invoice.customer.name}
                    
                      {money(invoice.amount)}

                ))}

      ))}
    
  );
}`;

export const usageEmpty = `"use client";

${invoiceType}

export default function EmptyTableDemo() {
  const rows: Invoice[] = [];

  return (

            Invoice
            Customer
            Amount
            Status
            Issued

          {rows.length === 0 ? (
            No invoices yet.
          ) : (
            rows.map((invoice) => (
              
                {invoice.reference}
              
            ))
          )}

  );
}`;

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

## Density

## Features

    Any data shape
    No column config and no required row shape. Nested objects, unusual key names and computed cells all work without a transformation step.

    Real table markup
    Each primitive renders its native element, so colSpan, scope and aria attributes pass straight through and screen readers get a genuine table.

    Themed by context
    Variant, size and colour are set once on Table and read by every descendant, so a cell dropped three levels deep still matches.

    Stateless by default
    Sorting and expansion are controlled props. The table never reorders or hides your data on its own, so server-side sorting and paging drop in unchanged.

## Best Practices & Guidelines

    Reach for the Data Table instead
    These primitives are deliberately stateless. If you need search, pagination, row selection and batch actions wired up for you, use the Data Table — it composes the very same primitives and adds a state provider.

    Keep colSpan honest
    TableEmpty and TableExpandedRow both need a colSpan that matches your real column count. Derive it from a variable rather than hard-coding it, so conditional columns cannot drift out of sync.

## Props Reference

### Components

      ComponentRendersPurpose

      TabledivThe card wrapper. Provides variant, size and colour by context.
      TableHeadingdivTitle bar above the table. Children align to the right as an action slot.
      TableContentdiv &gt; tableHorizontal scroll container plus the table element.
      TableHeadertheadPlain pass-through.
      TableBodytbodyOptional staggered entrance animation.
      TableRowtrBody row, or a header row with isHeader.
      TableHeadthHeader cell, optionally sortable.
      TableCelltdBody cell.
      TableFooterdivFooter bar below the table — pagers, totals, bulk controls.
      TableEmptytr &gt; tdFull-width empty state row.
      TableExpandedRowtr &gt; tdAnimated detail panel beneath a row.
      TableExpandTogglebuttonRotating chevron for the row above.
      TableRowActionsdivReveals its buttons on row hover or keyboard focus (always visible in soft).
      TableRowActionbuttonRound icon button for a row action; label is required, tone="danger" for deletes.
      TableActionbuttonToolbar button in the table's look — variant primary, secondary or ghost.
      TableBadgespanStatus pill with a dot (tone: neutral, success, warning, danger, info), or a tag with dot={"{false}"}.
      TablePersondivAvatar (photo or initials), a name and a muted second line.

### `Table`

      PropTypeDefaultDescription

      variant"default" | "minimal" | "glass" | "soft""default"Bordered card, bare table, frosted glass panel, or the admin-dashboard look (see Data Table for the full soft example).
      size"sm" | "md" | "lg""md"Row density — cell padding and text size.
      color"primary" | "indigo" | "rose" | "emerald" | "zinc" | (hex)"primary"Accent for selected rows and interactive affordances. Any #rrggbb works.

### `TableHead`

      PropTypeDefaultDescription

      align"left" | "center" | "right""left"Text alignment.
      sortablebooleanfalseRenders the header as a sort button.
      sortDirection"asc" | "desc" | nullnullControlled — drives the chevron and aria-sort.
      onSort() =&gt; void—Fired on click. You reorder the data.

### `TableRow`, `TableCell`, `TableBody`

      ComponentPropTypeDescription

      TableRowisHeaderbooleanApplies header styling instead of body row styling.
      TableRowselectedbooleanApplies the selected background and sets data-selected.
      TableCellalign"left" | "center" | "right"Text alignment.
      TableBodyanimatebooleanStaggered entrance (Web Animations API) for direct child rows. Off by default.
      TableBodyanimateKeyReact.KeyChange it to replay the entrance — e.g. on sort or page change.

### `TableExpandedRow`, `TableEmpty`, `TableRowActions`

      ComponentPropTypeDescription

      TableExpandedRowopenbooleanGrid-animates the panel open or closed.
      TableExpandedRowcolSpannumberRequired. Must match your column count.
      TableEmptycolSpannumberRequired. Defaults its text to &ldquo;No data available.&rdquo;
      TableRowActionsalign"left" | "center" | "right"Horizontal alignment inside the cell. Defaults to "right".
      TableRowActionsalwaysVisiblebooleanSkip the hover reveal and keep the buttons visible. Defaults to visible in the soft variant.

Every primitive also forwards its ref and accepts the native attributes of the element it renders.

---

**Component Path:** `[framework]\table\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
