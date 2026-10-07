"use client";

import {
  DataGridBlock,
  GridColor,
  GridColumn,
} from "@/components/custom/blocks/DataGridBlock";
import { useEffect, useState } from "react";

const INITIAL_DATA = [
  {
    id: "TX-101",
    customer: "Acme Corp",
    amount: 4500.5,
    status: "Paid",
    date: "2023-10-12",
  },
  {
    id: "TX-102",
    customer: "Global Tech",
    amount: 1200.0,
    status: "Pending",
    date: "2023-10-14",
  },
  {
    id: "TX-103",
    customer: "Stark Ind.",
    amount: 8900.25,
    status: "Overdue",
    date: "2023-09-30",
  },
  {
    id: "TX-104",
    customer: "Wayne Ent.",
    amount: 15500.0,
    status: "Paid",
    date: "2023-10-01",
  },
  {
    id: "TX-105",
    customer: "Initech",
    amount: 340.0,
    status: "Paid",
    date: "2023-10-15",
  },
  {
    id: "TX-106",
    customer: "Soylent Corp",
    amount: 950.75,
    status: "Pending",
    date: "2023-10-16",
  },
  {
    id: "TX-107",
    customer: "Umbrella Corp",
    amount: 12000.0,
    status: "Paid",
    date: "2023-10-10",
  },
  {
    id: "TX-108",
    customer: "Massive Dynamic",
    amount: 450.0,
    status: "Paid",
    date: "2023-10-05",
  },
];

const COLUMNS: GridColumn[] = [
  { field: "id", headerName: "Transaction ID", width: 120, readOnly: true },
  { field: "customer", headerName: "Customer Name", width: 200 },
  { field: "amount", headerName: "Amount ($)", type: "number", width: 120 },
  { field: "status", headerName: "Status", width: 120 },
  { field: "date", headerName: "Date", width: 140 },
];

const GRADEBOOK_COLUMNS: GridColumn[] = [
  { field: "id", headerName: "User ID", width: 100, readOnly: true },
  { field: "name", headerName: "Full Name", width: 250 },
  { field: "score", headerName: "Test Score", type: "number", width: 150 },
];

const GRADEBOOK_DATA = [
  { id: "U-01", name: "Alice Smith", score: 95 },
  { id: "U-02", name: "Bob Jones", score: 82 },
  { id: "U-03", name: "Carol Williams", score: 78 },
  { id: "U-04", name: "David Lee", score: 91 },
];

const DATASETS = {
  ledger: {
    title: "Financial Ledger",
    columns: COLUMNS,
    data: INITIAL_DATA as Record<string, unknown>[],
  },
  gradebook: {
    title: "Gradebook",
    columns: GRADEBOOK_COLUMNS,
    data: GRADEBOOK_DATA as Record<string, unknown>[],
  },
} as const;

export default function DataGridDemo({
  color = "primary",
  showRowNumbers = true,
  readOnly = false,
  dataset = "ledger",
  data,
}: {
  color?: GridColor | string;
  showRowNumbers?: boolean;
  readOnly?: boolean;
  /** Swaps the whole schema to show the grid is column-driven. */
  dataset?: "ledger" | "gradebook";
  data?: Record<string, unknown>[];
}) {
  const preset = DATASETS[dataset] ?? DATASETS.ledger;
  const initial = data ?? preset.data;

  const [currentData, setCurrentData] =
    useState<Record<string, unknown>[]>(initial);

  useEffect(() => {
    setCurrentData(initial);
  }, [initial]);

  return (
    <div className="w-full flex flex-col items-center justify-center relative z-10 overflow-hidden">
      <DataGridBlock
        key={`${dataset}-${showRowNumbers}`}
        title={preset.title}
        description={
          readOnly
            ? "View mode only."
            : "Double-click any cell or press Enter to edit."
        }
        columns={preset.columns as GridColumn[]}
        data={currentData as Record<string, any>[]}
        onChange={setCurrentData}
        color={color}
        showRowNumbers={showRowNumbers}
        readOnly={readOnly}
        className="w-full shadow-xl"
      />
    </div>
  );
}
