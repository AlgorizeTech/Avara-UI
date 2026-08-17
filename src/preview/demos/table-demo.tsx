"use client";

import {
  TableBlock,
  TableColumn,
  TableSize,
  TableVariant,
} from "@/components/custom/blocks/TableBlock";

type Transaction = {
  id: string;
  user: string;
  email: string;
  amount: string;
  status: "completed" | "processing" | "failed";
  date: string;
  details?: string;
};

const sampleData: Transaction[] = [
  {
    id: "INV-3021",
    user: "Alice Freeman",
    email: "alice@example.com",
    amount: "$3,200.00",
    status: "completed",
    date: "Oct 24, 2023",
    details: "Payment processed via Stripe. Invoice sent to alice@example.com.",
  },
  {
    id: "INV-3022",
    user: "Bob Smith",
    email: "bob@example.com",
    amount: "$850.50",
    status: "processing",
    date: "Oct 24, 2023",
    details: "Waiting for bank confirmation. Usually takes 2-3 business days.",
  },
  {
    id: "INV-3023",
    user: "Charlie Davis",
    email: "charlie@example.com",
    amount: "$1,420.00",
    status: "failed",
    date: "Oct 23, 2023",
    details:
      "Card declined by issuer. User has been notified to update payment method.",
  },
  {
    id: "INV-3024",
    user: "Diana Prince",
    email: "diana@example.com",
    amount: "$940.00",
    status: "completed",
    date: "Oct 22, 2023",
    details: "Payment processed via PayPal.",
  },
  {
    id: "INV-3025",
    user: "Evan Wright",
    email: "evan@example.com",
    amount: "$2,100.00",
    status: "completed",
    date: "Oct 21, 2023",
  },
  {
    id: "INV-3026",
    user: "Fiona Gallagher",
    email: "fiona@example.com",
    amount: "$450.00",
    status: "processing",
    date: "Oct 21, 2023",
  },
  {
    id: "INV-3027",
    user: "George Harris",
    email: "george@example.com",
    amount: "$5,500.00",
    status: "completed",
    date: "Oct 20, 2023",
  },
];

const columns: TableColumn<Transaction>[] = [
  { key: "id", label: "Invoice", sortable: true },
  {
    key: "user",
    label: "Customer",
    sortable: true,
    render: (row) => (
      <div className="flex flex-col">
        <span className="font-bold text-zinc-900 dark:text-zinc-100">
          {row.user}
        </span>
        <span className="text-xs text-zinc-500">{row.email}</span>
      </div>
    ),
  },
  { key: "amount", label: "Amount", sortable: true, align: "right" },
  {
    key: "status",
    label: "Status",
    sortable: true,
    render: (row) => {
      const styles = {
        completed:
          "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
        processing:
          "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
        failed: "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400",
      };
      return (
        <span
          className={`px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${styles[row.status]}`}
        >
          {row.status}
        </span>
      );
    },
  },
  { key: "date", label: "Date", sortable: true, align: "right" },
  { key: "actions", label: "", align: "right" },
];

const TABLE_SIZES: TableSize[] = ["sm", "md", "lg"];

export default function TableDemo({
  variant = "default",
  tableSize = "md",
  color = "primary",
  isSelectable = true,
  isPaginated = true,
  isExpandable = true,
  showAll,
}: {
  variant?: TableVariant;
  tableSize?: TableSize;
  color?: string;
  isSelectable?: boolean;
  isPaginated?: boolean;
  isExpandable?: boolean;
  /** Renders every step of a scalar prop in one frame. */
  showAll?: "sizes";
}) {
  if (showAll === "sizes") {
    // Trimmed data + no interactive extras so the three densities stay comparable.
    const compactColumns = columns.slice(0, 4);
    return (
      <div className="w-full flex flex-col gap-8 p-4 sm:p-6">
        {TABLE_SIZES.map((size) => (
          <div key={size} className="flex flex-col gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              tableSize=&quot;{size}&quot;
            </span>
            <TableBlock
              data={sampleData.slice(0, 3)}
              columns={compactColumns}
              variant={variant}
              color={color}
              tableSize={size}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`w-full flex flex-col items-start justify-center min-h-[500px] ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""} relative z-10`}
    >
      <div className="w-full max-w-5xl mx-auto">
        <TableBlock
          key={`${variant}-${color}-${tableSize}-${isSelectable}-${isPaginated}-${isExpandable}`}
          data={sampleData}
          columns={columns}
          variant={variant}
          color={color}
          tableSize={tableSize}
          selectable={isSelectable}
          expandable={isExpandable}
          pagination={isPaginated ? { itemsPerPage: 5 } : undefined}
          onEdit={(row) => console.log("Edit clicked", row)}
          onDelete={(row) => console.log("Delete clicked", row)}
          renderExpanded={(row) => (
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                Transaction Summary
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                {row.details ||
                  "No additional transaction history provided for this invoice."}
              </p>
            </div>
          )}
        />
      </div>
    </div>
  );
}
