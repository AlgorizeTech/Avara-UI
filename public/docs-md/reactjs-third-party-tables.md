export const metadata = docsPageMetadata("third-party/tables", {
  title: "Data Tables",
  description: `Integrate TanStack Table and AG Grid with Avara UI — a headless table rendered with the Table primitives, and a themed grid with React cell renderers.`
});

# Data Tables

Two very different answers to the same problem. TanStack Table is headless — it
computes sorting, filtering, pagination and selection, and renders nothing at
all, which makes it a direct fit for the Table
primitives. AG Grid is the opposite: it owns the viewport, virtualises rows, and
is themed rather than composed.

## TanStack Table

`TableHead` already accepts `sortable`, `sortDirection` and `onSort`, which is
exactly the shape a TanStack header exposes — so the two meet with no adapter in
between. Everything visible is an Avara UI component; TanStack supplies the
row model and the state.

export const usageTanStack = `import { useState } from "react";

type Invoice = {
  id: string;
  customer: string;
  status: "paid" | "pending" | "overdue";
  amount: number;
  issued: string;
};

const invoices: Invoice[] = [
  { id: "INV-1042", customer: "Northwind Traders", status: "paid", amount: 4820, issued: "2026-01-12" },
  { id: "INV-1043", customer: "Contoso Ltd", status: "pending", amount: 1290, issued: "2026-01-18" },
  { id: "INV-1044", customer: "Fabrikam Inc", status: "overdue", amount: 7350, issued: "2026-01-21" },
  { id: "INV-1045", customer: "Adventure Works", status: "paid", amount: 2140, issued: "2026-02-02" },
  { id: "INV-1046", customer: "Tailspin Toys", status: "pending", amount: 960, issued: "2026-02-09" },
  { id: "INV-1047", customer: "Wide World Importers", status: "paid", amount: 5610, issued: "2026-02-14" },
  { id: "INV-1048", customer: "Proseware Inc", status: "overdue", amount: 3080, issued: "2026-02-23" },
  { id: "INV-1049", customer: "Lucerne Publishing", status: "paid", amount: 1875, issued: "2026-03-01" },
  { id: "INV-1050", customer: "Litware Inc", status: "pending", amount: 4390, issued: "2026-03-07" },
];

/**
 * v9 registers features explicitly. Nothing you do not list here is compiled
 * in — and, just as importantly, \`table.getState().sorting\` does not exist
 * until \`rowSortingFeature\` is in this object.
 */
const features = tableFeatures({
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  columnFilteringFeature,
  globalFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  filterFns: { includesString: filterFn_includesString },
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  /**
   * v9 only compiles in the sort/filter functions you name. \`text\` is what
   * a string column resolves to automatically and \`basic\` what a numeric one
   * does — leave either out and that column logs "sortFn not registered" and
   * silently refuses to sort.
   */
  sortFns: { text: sortFn_text, basic: sortFn_basic },
});

const helper = createColumnHelper();

const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const STATUS_VARIANT = {
  paid: "default",
  pending: "secondary",
  overdue: "destructive",
} as const;

const columns = helper.columns([
  helper.accessor("id", { header: "Invoice" }),
  helper.accessor("customer", { header: "Customer" }),
  helper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: (info) => {
      const status = info.getValue();
      return {status};
    },
  }),
  helper.accessor("amount", {
    header: "Amount",
    cell: (info) => {money(info.getValue())},
  }),
  helper.accessor("issued", { header: "Issued" }),
]);

/**
 * TanStack Table is headless: it hands back header groups, a row model and
 * the sort/filter/page state, and renders nothing. That makes it a direct
 * fit for the \`Table\` primitives — \`TableHead\` already takes \`sortable\`,
 * \`sortDirection\` and \`onSort\`, which is exactly the shape a v9 header
 * exposes.
 */
export default function TanStackDataTable() {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useTable({
    features,
    data: invoices,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });

  const rows = table.getRowModel().rows;

  return (

         setGlobalFilter(event.target.value)}
          placeholder="Search invoices…"
          className="h-9 w-56 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />

          {table.getHeaderGroups().map((group) => (
            
              {group.headers.map((header) => (
                 header.column.toggleSorting()}
                >
                  {header.isPlaceholder ? null : }
                
              ))}
            
          ))}

          {rows.length === 0 && (
            No invoices match that search.
          )}

          {rows.map((row) => (
            
              {row.getAllCells().map((cell) => (

              ))}
            
          ))}

          Page {table.state.pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}

           table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          
           table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next

  );
}`;

`, not the standalone `flexRender(...)` call from v8.",
        },
      ],
      usage: usageTanStack,
      code: extractCode("src/components/custom/blocks/TableBlock.tsx"),
    },
  ]}
/>

### Installation

The example renders through our table primitives, so install those too:

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/table.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/table
```

It also uses `Badge` and `Button`:

### Coming from v8

The v9 API is a real break, and most examples still online are v8. Three
differences account for nearly every migration error:

        v8
        v9

        {'useReactTable({ getCoreRowModel: getCoreRowModel() })'}
        {'useTable({ features })'}, with row models registered as feature slots

        Features always present
        {'tableFeatures({ rowSortingFeature, ... })'} — opt in, or the state does not exist

        {'table.getState().pagination'}
        {'table.state.pagination'}

        {'flexRender(cell.column.columnDef.cell, cell.getContext())'}
        {''}

Keep `features`, `data` and `columns` stable across renders. A fresh array
literal as a fallback (`data={rows ?? []}`) invalidates every data-dependent row
model on every render.

## AG Grid

AG Grid renders its own viewport, so the integration point moves: instead of
composing our primitives, you theme the grid and drop our components into its
cells.

export const usageAgGrid = `import { useMemo, useState } from "react";

/**
 * AG Grid v33+ is modular: register once, at module scope. \`AllCommunityModule\`
 * is the batteries-included option — swap it for the individual modules you
 * use when bundle size matters.
 */
ModuleRegistry.registerModules([AllCommunityModule]);

type Item = {
  sku: string;
  product: string;
  warehouse: string;
  onHand: number;
  reserved: number;
  status: "in-stock" | "low" | "backorder";
};

const inventory: Item[] = [
  { sku: "AZ-1001", product: "Aurora Desk Lamp", warehouse: "Rotterdam", onHand: 412, reserved: 38, status: "in-stock" },
  { sku: "AZ-1002", product: "Vector Mechanical Keyboard", warehouse: "Austin", onHand: 96, reserved: 74, status: "low" },
  { sku: "AZ-1003", product: "Halo Monitor Arm", warehouse: "Rotterdam", onHand: 0, reserved: 120, status: "backorder" },
  { sku: "AZ-1004", product: "Drift Office Chair", warehouse: "Osaka", onHand: 233, reserved: 12, status: "in-stock" },
  { sku: "AZ-1005", product: "Nimbus Standing Desk", warehouse: "Austin", onHand: 54, reserved: 41, status: "low" },
  { sku: "AZ-1006", product: "Pulse Webcam 4K", warehouse: "Osaka", onHand: 611, reserved: 87, status: "in-stock" },
  { sku: "AZ-1007", product: "Cobalt USB-C Hub", warehouse: "Rotterdam", onHand: 0, reserved: 64, status: "backorder" },
];

const STATUS_VARIANT = {
  "in-stock": "default",
  low: "secondary",
  backorder: "destructive",
} as const;

/**
 * The Theming API takes plain values, so a \`Badge\` cell renderer and a themed
 * grid can share one design language. Cell renderers are ordinary React
 * components — this is where your own components go into someone else's grid.
 */
const StatusCell = ({ value }: { value: Item["status"] }) => (
  {value.replace("-", " ")}
);

export default function AgGridInventory() {
  const [quickFilter, setQuickFilter] = useState("");
  const tokens = useChartTokens();

  const columnDefs = useMemo[]>(
    () => [
      { field: "sku", headerName: "SKU", width: 120, pinned: "left" },
      { field: "product", headerName: "Product", flex: 2, minWidth: 200 },
      { field: "warehouse", headerName: "Warehouse", flex: 1, minWidth: 130 },
      { field: "onHand", headerName: "On hand", type: "numericColumn", width: 120 },
      { field: "reserved", headerName: "Reserved", type: "numericColumn", width: 120 },
      {
        field: "status",
        headerName: "Status",
        width: 140,
        cellRenderer: StatusCell,
        filter: true,
      },
    ],
    [],
  );

  /**
   * v33+ replaced the CSS-file themes (\`ag-theme-alpine\`) with a theme object.
   * Nothing to import in globals.css — and every value here can come straight
   * from your token scale.
   */
  const theme = useMemo(
    () =>
      themeQuartz.withParams({
        accentColor: tokens.series[0],
        backgroundColor: tokens.card,
        foregroundColor: tokens.foreground,
        borderColor: tokens.border,
        chromeBackgroundColor: tokens.card,
        headerTextColor: tokens.muted,
        headerFontWeight: 600,
        fontFamily: "inherit",
        borderRadius: 8,
        wrapperBorderRadius: 12,
        spacing: 8,
      }),
    [tokens],
  );

  return (

            Inventory
            AG Grid Community, themed with the Theming API

             setQuickFilter(event.target.value)}
              placeholder="Quick filter…"
              className="h-9 w-48 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
            />
             setQuickFilter("")}>
              Clear

            theme={theme}
            rowData={inventory}
            columnDefs={columnDefs}
            quickFilterText={quickFilter}
            defaultColDef={{ sortable: true, resizable: true }}
            pagination
            paginationPageSize={5}
            paginationPageSizeSelector={[5, 10, 20]}
          />

  );
}`;

### Installation

This example also uses these Avara UI components — install whichever
your project does not already have:

The grid takes its colours from `useChartTokens`, which is not a registry item:
create `src/lib/chart-tokens.ts` with the file in this example's Code tab — the
same file the Charts page sets up, so
skip this if you already have it.

## Which one

        TanStack Table
        AG Grid Community

        Markup
        Yours, entirely
        The grid's

        Bundle
        ~15 kB
        ~500 kB+

        Row virtualisation
        Add TanStack Virtual
        Built in

        Column resize, pinning, quick filter
        Wire it up
        Built in

        Matching a design system
        Nothing to override
        Theming API

        Excel export, pivoting, master detail
        —
        Enterprise licence

Under a few thousand rows, and where the table should look like the rest of the
page, TanStack Table is less code and a far smaller bundle. Reach for AG Grid
when you want a spreadsheet — virtualised rows, resizable pinned columns, and a
filter UI you did not have to build.

---

**Component Path:** `[framework]\third-party\tables\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
