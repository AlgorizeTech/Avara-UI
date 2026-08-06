"use client";

import {
  DataGridBlock,
  GridColor,
  GridColumn,
} from "@/components/custom/blocks/DataGridBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { Download, Plus, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const DATAGRID_ENGINE_CODE_TS = `"use client";

import React, { forwardRef, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export type GridColor = "indigo" | "rose" | "emerald" | "blue" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { outline: "outline-indigo-500", bgActive: "bg-indigo-50 dark:bg-indigo-500/10", handle: "bg-indigo-500" },
  rose: { outline: "outline-rose-500", bgActive: "bg-rose-50 dark:bg-rose-500/10", handle: "bg-rose-500" },
  emerald: { outline: "outline-emerald-500", bgActive: "bg-emerald-50 dark:bg-emerald-500/10", handle: "bg-emerald-500" },
  blue: { outline: "outline-blue-500", bgActive: "bg-blue-50 dark:bg-blue-500/10", handle: "bg-blue-500" },
  zinc: { outline: "outline-zinc-900 dark:outline-zinc-100", bgActive: "bg-zinc-100 dark:bg-zinc-800", handle: "bg-zinc-900 dark:bg-zinc-100" },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { outline: "outline-[var(--grid-color)]", bgActive: "bg-[rgba(var(--grid-rgb),0.1)]", handle: "bg-[var(--grid-color)]" },
      style: { "--grid-color": color, "--grid-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.blue, style: {} };
};

export interface GridColumn { field: string; headerName: string; width?: string | number; type?: "text" | "number"; readOnly?: boolean; }
export interface DataGridBlockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> { columns: GridColumn[]; data: Record<string, any>[]; color?: GridColor; onChange?: (newData: Record<string, any>[]) => void; showRowNumbers?: boolean; readOnly?: boolean; }

export const DataGridBlock = forwardRef<HTMLDivElement, DataGridBlockProps>(({ columns, data: initialData, color = "blue", onChange, showRowNumbers = true, readOnly = false, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const containerRef = useRef<HTMLDivElement>(null);
  const editInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<Record<string, any>[]>(initialData);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  useEffect(() => { setData(initialData); }, [initialData]);

  const finishEditing = useCallback((save: boolean = true) => {
    if (editingCell && save && !readOnly) {
      const colDef = columns[editingCell.col];
      if (!colDef.readOnly) {
        const newData = [...data];
        newData[editingCell.row] = { ...newData[editingCell.row], [colDef.field]: colDef.type === "number" ? Number(editValue) || 0 : editValue };
        setData(newData);
        if (onChange) onChange(newData);
      }
    }
    setEditingCell(null);
  }, [data, columns, editingCell, editValue, onChange, readOnly]);

  const startEditing = useCallback((row: number, col: number, initialValue?: string) => {
    if (readOnly || columns[col].readOnly) return;
    setEditingCell({ row, col });
    setEditValue(initialValue !== undefined ? initialValue : String(data[row][columns[col].field] || ""));
  }, [columns, data, readOnly]);

  const handleGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (editingCell || !activeCell) return;
    const { row, col } = activeCell;
    const rowCount = data.length;
    const colCount = columns.length;
    let nextRow = row; let nextCol = col; let handled = true;

    switch (e.key) {
      case "ArrowUp": nextRow = Math.max(0, row - 1); break;
      case "ArrowDown": nextRow = Math.min(rowCount - 1, row + 1); break;
      case "ArrowLeft": nextCol = Math.max(0, col - 1); break;
      case "ArrowRight": nextCol = Math.min(colCount - 1, col + 1); break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) { if (col > 0) nextCol = col - 1; else if (row > 0) { nextRow = row - 1; nextCol = colCount - 1; } } 
        else { if (col < colCount - 1) nextCol = col + 1; else if (row < rowCount - 1) { nextRow = row + 1; nextCol = 0; } }
        break;
      case "Enter":
      case "F2": startEditing(row, col); e.preventDefault(); break;
      case "Escape": setActiveCell(null); break;
      case "Backspace":
      case "Delete":
        if (!readOnly && !columns[col].readOnly) {
          const newData = [...data]; newData[row] = { ...newData[row], [columns[col].field]: "" };
          setData(newData); if (onChange) onChange(newData);
        }
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { startEditing(row, col, e.key); e.preventDefault(); } 
        else { handled = false; }
        break;
    }

    if (handled && (nextRow !== row || nextCol !== col)) {
      e.preventDefault(); setActiveCell({ row: nextRow, col: nextCol });
      document.getElementById(\`cell-\${nextRow}-\${nextCol}\`)?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); finishEditing(true); if (activeCell && activeCell.row < data.length - 1) setActiveCell({ row: activeCell.row + 1, col: activeCell.col }); containerRef.current?.focus({ preventScroll: true }); } 
    else if (e.key === "Escape") { e.preventDefault(); finishEditing(false); containerRef.current?.focus({ preventScroll: true }); } 
    else if (e.key === "Tab") { e.preventDefault(); finishEditing(true); if (activeCell && activeCell.col < columns.length - 1) setActiveCell({ row: activeCell.row, col: activeCell.col + 1 }); containerRef.current?.focus({ preventScroll: true }); }
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => { if (containerRef.current && !containerRef.current.contains(e.target as Node)) { setActiveCell(null); finishEditing(true); } };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [finishEditing]);

  return (
    <div className={cn("w-full overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#09090b]", className)} style={style} {...props}>
      <div ref={containerRef} tabIndex={0} onKeyDown={handleGridKeyDown} className="w-full overflow-auto max-h-[600px] outline-none">
        <table className="w-full border-collapse text-sm text-left whitespace-nowrap select-none">
          <thead className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
            <tr>
              {showRowNumbers && <th className="w-12 px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 text-center font-medium text-zinc-400 bg-zinc-100/50 dark:bg-zinc-950/50 backdrop-blur-md">#</th>}
              {columns.map((col, idx) => (<th key={idx} className="px-4 py-2 font-semibold text-zinc-600 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 backdrop-blur-md" style={{ width: col.width, minWidth: col.width || 120 }}>{col.headerName}</th>))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                {showRowNumbers && <td className="w-12 px-4 py-2 text-center text-xs font-mono text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">{rowIndex + 1}</td>}
                {columns.map((col, colIndex) => {
                  const isActive = activeCell?.row === rowIndex && activeCell?.col === colIndex;
                  const isEditingThis = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                  const val = row[col.field];
                  return (
                    <td key={colIndex} id={\`cell-\${rowIndex}-\${colIndex}\`} onClick={() => { setActiveCell({ row: rowIndex, col: colIndex }); containerRef.current?.focus({ preventScroll: true }); }} onDoubleClick={() => startEditing(rowIndex, colIndex)} className={cn("relative px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 h-10 truncate transition-colors duration-75 cursor-cell", isActive && "outline outline-2 -outline-offset-2 z-10 bg-white dark:bg-zinc-900", isActive && theme.outline, (activeCell?.row === rowIndex && !isActive) && "bg-zinc-50/80 dark:bg-zinc-900/50", isEditingThis && "p-0")}>
                      {isEditingThis ? (<input ref={editInputRef} autoFocus type={col.type === "number" ? "number" : "text"} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleInputKeyDown} onBlur={() => finishEditing(true)} className={cn("absolute inset-0 w-full h-full px-4 outline-none bg-white dark:bg-zinc-900 font-sans text-sm m-0 border-none shadow-xl z-20", col.type === "number" && "font-mono")} />) : (<span className={cn("block w-full overflow-hidden text-ellipsis", col.type === "number" && "font-mono text-zinc-600 dark:text-zinc-400", (readOnly || col.readOnly) && "opacity-60 cursor-not-allowed")}>{val !== null && val !== undefined ? String(val) : ""}</span>)}
                      {isActive && !isEditingThis && <div className={cn("absolute bottom-[-3px] right-[-3px] w-1.5 h-1.5 z-20 border border-white dark:border-black rounded-[1px]", theme.handle)} />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <div className="py-12 text-center text-sm text-zinc-500">No data available.</div>}
      </div>
    </div>
  );
});
DataGridBlock.displayName = "DataGridBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const DATAGRID_ENGINE_CODE_JS = `"use client";

import React, { forwardRef, useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const colorThemes = {
  indigo: { outline: "outline-indigo-500", bgActive: "bg-indigo-50 dark:bg-indigo-500/10", handle: "bg-indigo-500" },
  rose: { outline: "outline-rose-500", bgActive: "bg-rose-50 dark:bg-rose-500/10", handle: "bg-rose-500" },
  emerald: { outline: "outline-emerald-500", bgActive: "bg-emerald-50 dark:bg-emerald-500/10", handle: "bg-emerald-500" },
  blue: { outline: "outline-blue-500", bgActive: "bg-blue-50 dark:bg-blue-500/10", handle: "bg-blue-500" },
  zinc: { outline: "outline-zinc-900 dark:outline-zinc-100", bgActive: "bg-zinc-100 dark:bg-zinc-800", handle: "bg-zinc-900 dark:bg-zinc-100" },
};

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

export const getThemeStyles = (color) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: { outline: "outline-[var(--grid-color)]", bgActive: "bg-[rgba(var(--grid-rgb),0.1)]", handle: "bg-[var(--grid-color)]" },
      style: { "--grid-color": color, "--grid-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.blue, style: {} };
};

export const DataGridBlock = forwardRef(({ columns, data: initialData, color = "blue", onChange, showRowNumbers = true, readOnly = false, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const containerRef = useRef(null);
  const editInputRef = useRef(null);

  const [data, setData] = useState(initialData);
  const [activeCell, setActiveCell] = useState(null);
  const [editingCell, setEditingCell] = useState(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => { setData(initialData); }, [initialData]);

  const finishEditing = useCallback((save = true) => {
    if (editingCell && save && !readOnly) {
      const colDef = columns[editingCell.col];
      if (!colDef.readOnly) {
        const newData = [...data];
        newData[editingCell.row] = { ...newData[editingCell.row], [colDef.field]: colDef.type === "number" ? Number(editValue) || 0 : editValue };
        setData(newData);
        if (onChange) onChange(newData);
      }
    }
    setEditingCell(null);
  }, [data, columns, editingCell, editValue, onChange, readOnly]);

  const startEditing = useCallback((row, col, initialValue) => {
    if (readOnly || columns[col].readOnly) return;
    setEditingCell({ row, col });
    setEditValue(initialValue !== undefined ? initialValue : String(data[row][columns[col].field] || ""));
  }, [columns, data, readOnly]);

  const handleGridKeyDown = (e) => {
    if (editingCell || !activeCell) return;
    const { row, col } = activeCell;
    const rowCount = data.length;
    const colCount = columns.length;
    let nextRow = row; let nextCol = col; let handled = true;

    switch (e.key) {
      case "ArrowUp": nextRow = Math.max(0, row - 1); break;
      case "ArrowDown": nextRow = Math.min(rowCount - 1, row + 1); break;
      case "ArrowLeft": nextCol = Math.max(0, col - 1); break;
      case "ArrowRight": nextCol = Math.min(colCount - 1, col + 1); break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) { if (col > 0) nextCol = col - 1; else if (row > 0) { nextRow = row - 1; nextCol = colCount - 1; } } 
        else { if (col < colCount - 1) nextCol = col + 1; else if (row < rowCount - 1) { nextRow = row + 1; nextCol = 0; } }
        break;
      case "Enter":
      case "F2": startEditing(row, col); e.preventDefault(); break;
      case "Escape": setActiveCell(null); break;
      case "Backspace":
      case "Delete":
        if (!readOnly && !columns[col].readOnly) {
          const newData = [...data]; newData[row] = { ...newData[row], [columns[col].field]: "" };
          setData(newData); if (onChange) onChange(newData);
        }
        break;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) { startEditing(row, col, e.key); e.preventDefault(); } 
        else { handled = false; }
        break;
    }

    if (handled && (nextRow !== row || nextCol !== col)) {
      e.preventDefault(); setActiveCell({ row: nextRow, col: nextCol });
      document.getElementById(\`cell-\${nextRow}-\${nextCol}\`)?.scrollIntoView({ behavior: "auto", block: "nearest", inline: "nearest" });
    }
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); finishEditing(true); if (activeCell && activeCell.row < data.length - 1) setActiveCell({ row: activeCell.row + 1, col: activeCell.col }); containerRef.current?.focus({ preventScroll: true }); } 
    else if (e.key === "Escape") { e.preventDefault(); finishEditing(false); containerRef.current?.focus({ preventScroll: true }); } 
    else if (e.key === "Tab") { e.preventDefault(); finishEditing(true); if (activeCell && activeCell.col < columns.length - 1) setActiveCell({ row: activeCell.row, col: activeCell.col + 1 }); containerRef.current?.focus({ preventScroll: true }); }
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (e) => { if (containerRef.current && !containerRef.current.contains(e.target)) { setActiveCell(null); finishEditing(true); } };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [finishEditing]);

  return (
    <div className={cn("w-full overflow-hidden border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#09090b]", className)} style={style} {...props}>
      <div ref={containerRef} tabIndex={0} onKeyDown={handleGridKeyDown} className="w-full overflow-auto max-h-[600px] outline-none">
        <table className="w-full border-collapse text-sm text-left whitespace-nowrap select-none">
          <thead className="sticky top-0 z-20 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
            <tr>
              {showRowNumbers && <th className="w-12 px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 text-center font-medium text-zinc-400 bg-zinc-100/50 dark:bg-zinc-950/50 backdrop-blur-md">#</th>}
              {columns.map((col, idx) => (<th key={idx} className="px-4 py-2 font-semibold text-zinc-600 dark:text-zinc-300 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 backdrop-blur-md" style={{ width: col.width, minWidth: col.width || 120 }}>{col.headerName}</th>))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors">
                {showRowNumbers && <td className="w-12 px-4 py-2 text-center text-xs font-mono text-zinc-400 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950">{rowIndex + 1}</td>}
                {columns.map((col, colIndex) => {
                  const isActive = activeCell?.row === rowIndex && activeCell?.col === colIndex;
                  const isEditingThis = editingCell?.row === rowIndex && editingCell?.col === colIndex;
                  const val = row[col.field];
                  return (
                    <td key={colIndex} id={\`cell-\${rowIndex}-\${colIndex}\`} onClick={() => { setActiveCell({ row: rowIndex, col: colIndex }); containerRef.current?.focus({ preventScroll: true }); }} onDoubleClick={() => startEditing(rowIndex, colIndex)} className={cn("relative px-4 py-2 border-r border-zinc-200 dark:border-zinc-800 last:border-r-0 h-10 truncate transition-colors duration-75 cursor-cell", isActive && "outline outline-2 -outline-offset-2 z-10 bg-white dark:bg-zinc-900", isActive && theme.outline, (activeCell?.row === rowIndex && !isActive) && "bg-zinc-50/80 dark:bg-zinc-900/50", isEditingThis && "p-0")}>
                      {isEditingThis ? (<input ref={editInputRef} autoFocus type={col.type === "number" ? "number" : "text"} value={editValue} onChange={(e) => setEditValue(e.target.value)} onKeyDown={handleInputKeyDown} onBlur={() => finishEditing(true)} className={cn("absolute inset-0 w-full h-full px-4 outline-none bg-white dark:bg-zinc-900 font-sans text-sm m-0 border-none shadow-xl z-20", col.type === "number" && "font-mono")} />) : (<span className={cn("block w-full overflow-hidden text-ellipsis", col.type === "number" && "font-mono text-zinc-600 dark:text-zinc-400", (readOnly || col.readOnly) && "opacity-60 cursor-not-allowed")}>{val !== null && val !== undefined ? String(val) : ""}</span>)}
                      {isActive && !isEditingThis && <div className={cn("absolute bottom-[-3px] right-[-3px] w-1.5 h-1.5 z-20 border border-white dark:border-black rounded-[1px]", theme.handle)} />}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {data.length === 0 && <div className="py-12 text-center text-sm text-zinc-500">No data available.</div>}
      </div>
    </div>
  );
});
DataGridBlock.displayName = "DataGridBlock";`;

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

export function DataGridShowcase() {
  const [showRowNumbers, setShowRowNumbers] = useState(true);
  const [readOnly, setReadOnly] = useState(false);

  const [currentData, setCurrentData] =
    useState<Record<string, any>[]>(INITIAL_DATA);

  const [color, setColor] = useState<GridColor | string>("primary");

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleAddRow = () => {
    setCurrentData([
      ...currentData,
      {
        id: `TX-${Math.floor(Math.random() * 1000)}`,
        customer: "New Customer",
        amount: 0,
        status: "Pending",
        date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const generateUsageCode = (isTs: boolean) => {
    const colorPropStr = color && color !== "primary" && color !== "default" ? `\n        color="${color}"` : "";
    let propsStr = `\n        columns={columns}\n        data={data}${colorPropStr}`;
    if (!showRowNumbers) propsStr += `\n        showRowNumbers={false}`;
    if (readOnly) propsStr += `\n        readOnly`;

    return `import { useState } from "react";
import { DataGridBlock } from "@/components/custom/blocks/DataGridBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

const columns = [
  { field: "id", headerName: "ID", readOnly: true },
  { field: "name", headerName: "Name", width: 200 },
  { field: "score", headerName: "Score", type: "number" }
];

const INITIAL_DATA = [
  { id: 1, name: "Alice", score: 95 },
  { id: 2, name: "Bob", score: 88 }
];

export default function Spreadsheet() {
  const [data, setData] = useState<Record<string, any>[]>(INITIAL_DATA);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <DataGridBlock ${propsStr}
        onChange={(newData) => setData(newData)}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Focus Ring Color" />

          {/* Features Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Grid Configuration
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setShowRowNumbers(!showRowNumbers)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  showRowNumbers
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Row Indices
              </button>
              <button
                onClick={() => setReadOnly(!readOnly)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  readOnly
                    ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Read Only
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:ml-auto">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 sm:text-right">
              Data Controls
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={handleAddRow}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Row
              </button>
              <button
                onClick={() => setCurrentData(INITIAL_DATA)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-red-600 dark:text-red-400"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="DataGridBlock"
        tsCode={DATAGRID_ENGINE_CODE_TS}
        jsCode={DATAGRID_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
        sandbox="data-grid"
        sandboxProps={{ color, showRowNumbers, readOnly, data: currentData }}
      >
        <div className="w-full flex flex-col items-center justify-center relative z-10 overflow-hidden">
          <div className="w-full max-w-5xl flex flex-col gap-2">
            <div className="flex items-center justify-between px-2 mb-2">
              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                  Financial Ledger
                </h3>
                <p className="text-sm text-zinc-500">
                  {readOnly
                    ? "View mode only."
                    : "Double-click any cell or press Enter to edit."}
                </p>
              </div>
              <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <Download className="w-3.5 h-3.5" />
                Export CSV
              </button>
            </div>

            <DataGridBlock
              key={`${showRowNumbers}`}
              columns={COLUMNS}
              data={currentData}
              onChange={setCurrentData}
              color={color}
              showRowNumbers={showRowNumbers}
              readOnly={readOnly}
              className="shadow-xl"
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
