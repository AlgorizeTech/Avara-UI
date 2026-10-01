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

export default function InvoicesTable() {
  return (
    <Table variant="soft">
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
  );
}
