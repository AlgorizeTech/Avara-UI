"use client";

import { Table, TableBody, TableCell, TableContent, TableEmpty, TableExpandToggle, TableExpandedRow, TableFooter, TableHead, TableHeader, TableHeading, TableRow, TableRowActions } from "@/components/custom/blocks/TableBlock";
import { type TableSize, type TableVariant } from "@/components/custom/blocks/table-core";
import { accentStyle } from "@/lib/accent";
import { ChevronLeft, ChevronRight, Edit2, Trash2 } from "lucide-react";
import React, { useMemo, useState } from "react";

/**
 * Deliberately nested and mixed-type: the point of the composable API is that
 * this shape needs no flattening before it can be rendered.
 */
type Invoice = {
  reference: string;
  customer: { name: string; email: string };
  amount: number;
  status: "completed" | "processing" | "failed";
  issuedAt: string;
  note?: string;
};

const INVOICES: Invoice[] = [
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
  {
    reference: "INV-3025",
    customer: { name: "Evan Wright", email: "evan@example.com" },
    amount: 2100,
    status: "completed",
    issuedAt: "2023-10-21",
  },
  {
    reference: "INV-3026",
    customer: { name: "Fiona Gallagher", email: "fiona@example.com" },
    amount: 450,
    status: "processing",
    issuedAt: "2023-10-21",
  },
  {
    reference: "INV-3027",
    customer: { name: "George Harris", email: "george@example.com" },
    amount: 5500,
    status: "completed",
    issuedAt: "2023-10-20",
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
  value.toLocaleString("en-US", { style: "currency", currency: "USD" });

const TABLE_SIZES: TableSize[] = ["sm", "md", "lg"];

/** Sort keys map straight onto the nested shape — no lookup table needed. */
const SORT_ACCESSORS = {
  reference: (row: Invoice) => row.reference,
  customer: (row: Invoice) => row.customer.name,
  amount: (row: Invoice) => row.amount,
  issuedAt: (row: Invoice) => row.issuedAt,
} as const;

type SortKey = keyof typeof SORT_ACCESSORS;

export default function TableDemo({
  variant = "default",
  size = "md",
  color = "primary",
  sortable = true,
  expandable = true,
  paginated = false,
  animate = false,
  showAll,
}: {
  variant?: TableVariant;
  size?: TableSize;
  color?: string;
  sortable?: boolean;
  expandable?: boolean;
  paginated?: boolean;
  animate?: boolean;
  /** Renders every step of a scalar prop in one frame. */
  showAll?: "sizes";
}) {
  // The primitives are presentational — this demo owns every bit of state.
  const [sort, setSort] = useState<{
    key: SortKey;
    direction: "asc" | "desc";
  } | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const toggleSort = (key: SortKey) =>
    setSort((prev) =>
      prev && prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );

  const toggleExpanded = (reference: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(reference)) next.delete(reference);
      else next.add(reference);
      return next;
    });

  const sorted = useMemo(() => {
    if (!sort) return INVOICES;
    const read = SORT_ACCESSORS[sort.key];
    const factor = sort.direction === "asc" ? 1 : -1;
    return [...INVOICES].sort((a, b) => {
      const av = read(a);
      const bv = read(b);
      if (typeof av === "number" && typeof bv === "number")
        return factor * (av - bv);
      return factor * String(av).localeCompare(String(bv));
    });
  }, [sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const rows = paginated
    ? sorted.slice((page - 1) * pageSize, page * pageSize)
    : sorted;

  const columnCount = 6 + (expandable ? 1 : 0);

  if (showAll === "sizes") {
    return (
      <div style={accentStyle(color)} className="w-full flex flex-col gap-8 p-4 sm:p-6">
        {TABLE_SIZES.map((each) => (
          <div key={each} className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              size=&quot;{each}&quot;
            </span>
            <Table variant={variant} color={color} size={each}>
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
                  {INVOICES.slice(0, 3).map((invoice) => (
                    <TableRow key={invoice.reference}>
                      <TableCell className="font-mono text-xs">
                        {invoice.reference}
                      </TableCell>
                      <TableCell>{invoice.customer.name}</TableCell>
                      <TableCell align="right">
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

  return (
    <div
      style={accentStyle(color)}
      className={`w-full p-4 sm:p-6 flex flex-col items-start justify-center ${
        variant === "glass"
          ? "bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl"
          : ""
      } relative z-10`}
    >
      <div className="w-full">
        <Table variant={variant} color={color} size={size}>
          <TableHeading
            title="Invoices"
            description="Composed from primitives — no column config anywhere."
          />

          <TableContent>
            <TableHeader>
              <TableRow isHeader>
                {expandable && <TableHead className="w-10" aria-label="Expand" />}
                <TableHead
                  sortable={sortable}
                  sortDirection={sort?.key === "reference" ? sort.direction : null}
                  onSort={() => toggleSort("reference")}
                >
                  Invoice
                </TableHead>
                <TableHead
                  sortable={sortable}
                  sortDirection={sort?.key === "customer" ? sort.direction : null}
                  onSort={() => toggleSort("customer")}
                >
                  Customer
                </TableHead>
                <TableHead
                  align="right"
                  sortable={sortable}
                  sortDirection={sort?.key === "amount" ? sort.direction : null}
                  onSort={() => toggleSort("amount")}
                >
                  Amount
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead
                  align="right"
                  sortable={sortable}
                  sortDirection={sort?.key === "issuedAt" ? sort.direction : null}
                  onSort={() => toggleSort("issuedAt")}
                >
                  Issued
                </TableHead>
                <TableHead align="right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody
              animate={animate}
              animateKey={`${page}-${sort?.key ?? ""}-${sort?.direction ?? ""}`}
            >
              {rows.length === 0 ? (
                <TableEmpty colSpan={columnCount}>No invoices yet.</TableEmpty>
              ) : (
                rows.map((invoice) => (
                  <React.Fragment key={invoice.reference}>
                    <TableRow>
                      {expandable && (
                        <TableCell className="w-10">
                          <TableExpandToggle
                            open={expanded.has(invoice.reference)}
                            onClick={() => toggleExpanded(invoice.reference)}
                          />
                        </TableCell>
                      )}
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
                      <TableCell align="right">
                        <TableRowActions>
                          <button
                            onClick={() => console.log("Edit", invoice)}
                            aria-label={`Edit ${invoice.reference}`}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => console.log("Delete", invoice)}
                            aria-label={`Delete ${invoice.reference}`}
                            className="p-1.5 rounded-md text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </TableRowActions>
                      </TableCell>
                    </TableRow>

                    {expandable && (
                      <TableExpandedRow
                        open={expanded.has(invoice.reference)}
                        colSpan={columnCount}
                      >
                        <h4 className="text-sm font-semibold text-foreground">
                          Transaction summary
                        </h4>
                        <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed mt-1">
                          {invoice.note ??
                            "No additional history recorded for this invoice."}
                        </p>
                      </TableExpandedRow>
                    )}
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </TableContent>

          {paginated && (
            <TableFooter>
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="p-1.5 rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="p-1.5 rounded-md border border-border text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </TableFooter>
          )}
        </Table>
      </div>
    </div>
  );
}
