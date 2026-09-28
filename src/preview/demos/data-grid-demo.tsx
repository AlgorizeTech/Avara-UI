"use client";

import {
  DataGridBlock,
  GridColor,
  GridColumn,
} from "@/components/custom/blocks/DataGridBlock";
import { Download } from "lucide-react";
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
      <div className="w-full flex flex-col gap-2">
        <div className="flex items-center justify-between px-2 mb-2">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg text-foreground">
              {preset.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {readOnly
                ? "View mode only."
                : "Double-click any cell or press Enter to edit."}
            </p>
          </div>
          <button
            style={
              color && String(color).startsWith("#")
                ? { backgroundColor: String(color), color: "#fff" }
                : undefined
            }
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all shadow-xs ${
              color === "indigo"
                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                : color === "rose"
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : color === "emerald"
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : color === "blue"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : color === "lavender"
                ? "bg-[#9b8afb] hover:bg-[#9b8afb]/90 text-white"
                : "bg-primary text-primary-foreground hover:opacity-90"
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
        </div>

        <DataGridBlock
          key={`${dataset}-${showRowNumbers}`}
          columns={preset.columns as GridColumn[]}
          data={currentData as Record<string, any>[]}
          onChange={setCurrentData}
          color={color}
          showRowNumbers={showRowNumbers}
          readOnly={readOnly}
          className="shadow-xl"
        />
      </div>
    </div>
  );
}
