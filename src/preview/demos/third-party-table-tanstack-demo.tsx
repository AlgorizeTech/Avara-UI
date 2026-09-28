"use client";

// Mirrors the Usage snippet on the Third Party Integration pages verbatim.
// Edit the docs snippet and this file together — they are the same code.

import { useState } from "react";
import {
  columnFilteringFeature,
  createColumnHelper,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFn_includesString,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_basic,
  sortFn_text,
  tableFeatures,
  useTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableContent,
  TableEmpty,
  TableHead,
  TableHeader,
  TableHeading,
  TableRow,
} from "@/components/custom/blocks/TableBlock";
import { Badge } from "@/components/custom/ui/badge";
import Button from "@/components/custom/blocks/Button";

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
 * in — and, just as importantly, `table.getState().sorting` does not exist
 * until `rowSortingFeature` is in this object.
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
   * v9 only compiles in the sort/filter functions you name. `text` is what
   * a string column resolves to automatically and `basic` what a numeric one
   * does — leave either out and that column logs "sortFn not registered" and
   * silently refuses to sort.
   */
  sortFns: { text: sortFn_text, basic: sortFn_basic },
});

const helper = createColumnHelper<typeof features, Invoice>();

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
      return <Badge variant={STATUS_VARIANT[status]}>{status}</Badge>;
    },
  }),
  helper.accessor("amount", {
    header: "Amount",
    cell: (info) => <span className="tabular-nums">{money(info.getValue())}</span>,
  }),
  helper.accessor("issued", { header: "Issued" }),
]);

/**
 * TanStack Table is headless: it hands back header groups, a row model and
 * the sort/filter/page state, and renders nothing. That makes it a direct
 * fit for the `Table` primitives — `TableHead` already takes `sortable`,
 * `sortDirection` and `onSort`, which is exactly the shape a v9 header
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
    <Table variant="default" className="w-full max-w-4xl">
      <TableHeading title="Invoices" description="Sorted, filtered and paged by TanStack Table">
        <input
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          placeholder="Search invoices…"
          className="h-9 w-56 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      </TableHeading>

      <TableContent>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id} isHeader>
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  align={header.column.id === "amount" ? "right" : "left"}
                  sortable={header.column.getCanSort()}
                  sortDirection={header.column.getIsSorted() || null}
                  onSort={() => header.column.toggleSorting()}
                >
                  {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {rows.length === 0 && (
            <TableEmpty colSpan={columns.length}>No invoices match that search.</TableEmpty>
          )}

          {rows.map((row) => (
            <TableRow key={row.id}>
              {row.getAllCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  align={cell.column.id === "amount" ? "right" : "left"}
                >
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableContent>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Page {table.state.pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
        </p>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </Table>
  );
}
