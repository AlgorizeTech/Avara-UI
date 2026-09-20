# Table

A set of composable table primitives. You write the rows; the component supplies the structure, spacing and theming.

There is **no column config and no required row shape**. Whatever your API returns — nested objects, snake_case keys, `_id` instead of `id` — you map it straight into JSX. Nothing has to be flattened or transformed first.

Every example below is live. Click a sortable header, expand a row, or hover the right edge of a row to reveal its actions.

`Table` is the card. `TableContent` renders the scroll container and the `` element. Everything else maps one-to-one onto the HTML table tags, so `colSpan`, `scope` and any other native attribute pass straight through.

export const invoiceType = `type Invoice = {
  reference: string;
  customer: { name: string; email: string }; // nested — no flattening needed
  amount: number;
  status: "completed" | "processing" | "failed";
  issuedAt: string;
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
];

export default function InvoiceTable({ invoices = sampleInvoices }: { invoices?: Invoice[] }) {
  return (

            Invoice
            Customer
            Amount

          {invoices.map((invoice) => (
            
              {invoice.reference}

              {/* Reach as deep into the row as you like */}

                  {invoice.customer.name}
                  
                    {invoice.customer.email}

              \${invoice.amount}
            
          ))}

  );
}`;

export const usageMinimal = `

        Invoice

      {invoices.map((invoice) => (
        
          {invoice.reference}
        
      ))}

`;

export const usageSorting = `// Sorting is controlled — the table renders the affordance, you own the state.
const [sort, setSort] = useState(null);

const toggleSort = (key: string) =>
  setSort((prev) =>
    prev && prev.key === key
      ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
      : { key, direction: "asc" },
  );

const sorted = useMemo(() => {
  if (!sort) return invoices;
  const factor = sort.direction === "asc" ? 1 : -1;
  return [...invoices].sort((a, b) =>
    factor * String(a[sort.key]).localeCompare(String(b[sort.key])),
  );
}, [invoices, sort]);

 toggleSort("customer")}
>
  Customer
`;

export const usageExpandable = `const [open, setOpen] = useState>(new Set());

const toggle = (id: string) =>
  setOpen((prev) => {
    const next = new Set(prev);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  {invoices.map((invoice) => (

           toggle(invoice.reference)}
          />
        
        {invoice.reference}

        {invoice.note}

  ))}
`;

export const usagePagination = `// The primitives do not paginate for you — slice the array and fill the footer.
// Want it built in? Use the Data Table component instead.
const pageSize = 4;
const [page, setPage] = useState(1);
const totalPages = Math.max(1, Math.ceil(invoices.length / pageSize));
const rows = invoices.slice((page - 1) * pageSize, page * pageSize);

  {/* … rows … */}

    Page {page} of {totalPages}
    
       setPage((p) => Math.max(1, p - 1))}>Prev
       setPage((p) => Math.min(totalPages, p + 1))}>Next

`;

export const usageActions = `// TableRow sets a group class, so TableRowActions can reveal on row hover.

     edit(invoice)}>Edit
     remove(invoice)}>Delete
  
`;

export const usageEmpty = `
  {rows.length === 0 ? (
    No invoices yet.
  ) : (
    rows.map((invoice) => {/* … */})
  )}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/table
```

## Examples

## Density

…
…
…`,
    },
  ]}
/>

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
      TableRowActionsdivReveals its buttons on row hover or keyboard focus.

### `Table`

      PropTypeDefaultDescription

      variant"default" | "minimal" | "glass""default"Bordered card, bare table, or frosted glass panel.
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
      TableBodyanimatebooleanStaggered GSAP entrance for direct child rows. Off by default.
      TableBodyanimateKeyReact.KeyChange it to replay the entrance — e.g. on sort or page change.

### `TableExpandedRow`, `TableEmpty`, `TableRowActions`

      ComponentPropTypeDescription

      TableExpandedRowopenbooleanGrid-animates the panel open or closed.
      TableExpandedRowcolSpannumberRequired. Must match your column count.
      TableEmptycolSpannumberRequired. Defaults its text to &ldquo;No data available.&rdquo;
      TableRowActionsalign"left" | "center" | "right"Horizontal alignment inside the cell. Defaults to "right".
      TableRowActionsalwaysVisiblebooleanSkip the hover reveal and keep the buttons visible.

Every primitive also forwards its ref and accepts the native attributes of the element it renders.

---

**Component Path:** `[framework]\table\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
