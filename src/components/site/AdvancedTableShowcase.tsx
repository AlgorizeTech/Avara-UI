"use client";

import {
  AdvancedTableBlock,
  TableColor,
  TableColumn,
} from "@/components/custom/blocks/AdvancedTableBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const ADVANCEDTABLE_ENGINE_CODE_TS = `"use client";

import React, { forwardRef, useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, Trash2, Edit2, Check, Minus, X } from "lucide-react";

export type TableColor = "indigo" | "rose" | "emerald" | "blue" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", ring: "focus:border-indigo-600 focus:ring-indigo-600/10" },
  rose: { bg: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10", ring: "focus:border-rose-600 focus:ring-rose-600/10" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", ring: "focus:border-emerald-600 focus:ring-emerald-600/10" },
  blue: { bg: "bg-blue-600", text: "text-blue-600 dark:text-blue-400", border: "border-blue-600", bgSoft: "bg-blue-50 dark:bg-blue-500/10", ring: "focus:border-blue-600 focus:ring-blue-600/10" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", ring: "focus:border-zinc-900 focus:ring-zinc-900/10" },
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
      theme: { bg: "bg-[var(--table-color)]", text: "text-[var(--table-color)]", border: "border-[var(--table-color)]", bgSoft: "bg-[rgba(var(--table-rgb),0.1)]", ring: "focus:border-[var(--table-color)] focus:ring-[rgba(var(--table-rgb),0.1)]" },
      style: { "--table-color": color, "--table-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface TableColumn<T> { key: keyof T | string; header: string; sortable?: boolean; width?: string; render?: (row: T) => React.ReactNode; sortType?: "string" | "number"; }
export interface AdvancedTableProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> { data: T[]; columns: TableColumn<T>[]; color?: TableColor; searchable?: boolean; selectable?: boolean; primaryKey: keyof T; onBatchDelete?: (selectedIds: string[]) => void; onBatchEdit?: (selectedIds: string[]) => void; itemsPerPageOptions?: number[]; batchActions?: (selectedIds: string[], clearSelection: () => void) => React.ReactNode; }

export const AdvancedTableBlock = forwardRef<HTMLDivElement, AdvancedTableProps<any>>(({ data, columns, color = "indigo", searchable = true, selectable = true, primaryKey, onBatchDelete, onBatchEdit, itemsPerPageOptions = [5, 10, 25, 50], batchActions, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color as string);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc"; type: "string" | "number" } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1] || 10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filteredData = useMemo(() => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter((row) => Object.entries(row).some(([, val]) => String(val).toLowerCase().includes(lowerSearch)));
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortConfig.key]; let bVal = b[sortConfig.key];
      if (sortConfig.type === "number") return sortConfig.direction === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      aVal = String(aVal).toLowerCase(); bVal = String(bVal).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [totalPages, currentPage]);

  const handleSort = (key: string, type: "string" | "number" = "string") => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key) direction = sortConfig.direction === "asc" ? "desc" : "asc";
    else if (type === "number") direction = "desc";
    setSortConfig({ key, direction, type });
  };

  const toggleSelection = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAllPageSelection = () => {
    const pageIds = paginatedData.map(row => String(row[primaryKey]));
    const allSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.has(id));
    const newSet = new Set(selectedIds);
    if (allSelected) pageIds.forEach(id => newSet.delete(id)); else pageIds.forEach(id => newSet.add(id));
    setSelectedIds(newSet);
  };

  const clearSelection = () => setSelectedIds(new Set());
  const isAllPageSelected = paginatedData.length > 0 && paginatedData.every(row => selectedIds.has(String(row[primaryKey])));
  const isSomePageSelected = paginatedData.length > 0 && paginatedData.some(row => selectedIds.has(String(row[primaryKey]))) && !isAllPageSelected;
  const tableId = React.useId().replace(/:/g, "");

  return (
    <div ref={ref} className={cn("w-full flex flex-col gap-4 font-sans max-w-[960px] mx-auto text-[#1a1a2e]", className)} style={style} {...props}>
      <style>{\`@keyframes fadeUp-\${tableId} { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }\`}</style>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {searchable ? (
          <div className="relative w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input type="text" placeholder="Search all columns…" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className={cn("w-full pl-9 pr-3 py-2 text-[13px] bg-white dark:bg-zinc-950 border-[1.5px] border-zinc-200 dark:border-zinc-800 rounded-lg outline-none transition-all shadow-sm", theme.ring, "focus:ring-[3px]")} />
          </div>
        ) : <div />}
        <div className="flex items-center gap-2 relative h-10 min-w-[200px] justify-end">
          <div className={cn("flex items-center gap-1.5 text-[13px] text-zinc-500 absolute right-0 transition-opacity duration-200", selectedIds.size > 0 ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto")}>
            Show
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="bg-white dark:bg-zinc-900 border-[1.5px] border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1 outline-none cursor-pointer text-zinc-700 dark:text-zinc-300">
              {itemsPerPageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            entries
          </div>
          <div className={cn("flex items-center gap-2 px-3 py-2 bg-[#1e1b4b] dark:bg-indigo-950 rounded-xl shadow-[0_4px_20px_rgba(79,70,229,0.35)] overflow-hidden absolute right-0 transition-all duration-300 ease-out origin-right", selectedIds.size > 0 ? "max-w-[400px] opacity-100 pointer-events-auto translate-y-0" : "max-w-0 opacity-0 pointer-events-none -translate-y-1")}>
            <span className="text-[12px] font-bold text-indigo-200 whitespace-nowrap pl-1">{selectedIds.size} selected</span>
            <div className="w-px h-[18px] bg-white/15 shrink-0 mx-1" />
            {batchActions ? batchActions(Array.from(selectedIds), clearSelection) : (
              <>{onBatchEdit && (<button onClick={() => onBatchEdit(Array.from(selectedIds))} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-indigo-300/15 text-indigo-300 hover:bg-indigo-300/25 transition-colors whitespace-nowrap active:scale-95"><Edit2 className="w-[13px] h-[13px]" /> Edit</button>)}{onBatchDelete && (<button onClick={() => { onBatchDelete(Array.from(selectedIds)); clearSelection(); }} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors whitespace-nowrap active:scale-95"><Trash2 className="w-[13px] h-[13px]" /> Delete</button>)}</>
            )}
            <div className="w-px h-[18px] bg-white/15 shrink-0 mx-1" />
            <button onClick={clearSelection} className="px-1.5 text-white/40 hover:text-white/70 text-lg leading-none transition-colors"><X className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-2xl border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <table className="w-full text-[13.5px] text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#f9fafb] dark:bg-zinc-900 border-b-[1.5px] border-zinc-200 dark:border-zinc-800">
            <tr>
              {selectable && (<th className="w-11 px-4 py-[11px] text-center"><div className="flex items-center justify-center"><button onClick={toggleAllPageSelection} className={cn("w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0", (isAllPageSelected || isSomePageSelected) ? cn(theme.bg, theme.border) : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950")}>{isAllPageSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}{isSomePageSelected && <Minus className="w-2.5 h-2.5 text-white" strokeWidth={3} />}</button></div></th>)}
              {columns.map((col) => (<th key={String(col.key)} className={cn("px-4 py-[11px] font-semibold text-[12px] text-zinc-500 uppercase tracking-[0.04em]", col.sortable && cn("cursor-pointer select-none group hover:", theme.text))} style={{ width: col.width }} onClick={() => col.sortable && handleSort(String(col.key), col.sortType)}><div className="flex items-center gap-1.5">{col.header}{col.sortable && (<div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">{sortConfig?.key === String(col.key) ? (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn("w-3 h-3 block", theme.text)}>{sortConfig.direction === "asc" ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}</svg>) : (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 block"><polyline points="18 15 12 9 6 15"/><polyline points="6 9 12 15 18 9" opacity=".4"/></svg>)}</div>)}</div></th>))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (<tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center text-[14px] text-zinc-400">No results found.</td></tr>) : (
              paginatedData.map((row, rowIndex) => {
                const id = String(row[primaryKey]);
                const isSelected = selectedIds.has(id);
                return (
                  <tr key={id} className={cn("border-b border-[#f3f4f6] dark:border-zinc-800/50 transition-colors duration-150", isSelected ? theme.bgSoft : "hover:bg-[#f9fafb] dark:hover:bg-zinc-900/50")} style={{ animation: \`fadeUp-\${tableId} 0.2s ease \${rowIndex * 30}ms both\` }}>
                    {selectable && (<td className="px-4 py-3 text-center"><div className="flex items-center justify-center"><button onClick={() => toggleSelection(id)} className={cn("w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0", isSelected ? cn(theme.bg, theme.border) : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950")}>{isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}</button></div></td>)}
                    {columns.map((col) => (<td key={String(col.key)} className="px-4 py-3 text-[#374151] dark:text-zinc-300 align-middle">{col.render ? col.render(row) : String(row[col.key] || "")}</td>))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-1">
        <div className="text-[13px] text-zinc-500">Showing <strong className="font-semibold text-[#111827] dark:text-zinc-100">{sortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="font-semibold text-[#111827] dark:text-zinc-100">{Math.min(currentPage * itemsPerPage, sortedData.length)}</strong> of <strong className="font-semibold text-[#111827] dark:text-zinc-100">{sortedData.length}</strong> results</div>
        <div className="flex items-center gap-[3px]">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded-lg border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"><ChevronLeft className="w-4 h-4" strokeWidth={2.5} /></button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) { pageNum = currentPage - 2 + i; if (pageNum > totalPages) pageNum = totalPages - (4 - i); }
            return (<button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={cn("w-8 h-8 rounded-lg text-[13px] font-medium border-[1.5px] flex items-center justify-center transition-all", currentPage === pageNum ? cn(theme.bg, theme.border, "font-bold text-white") : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700")}>{pageNum}</button>);
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="w-8 h-8 rounded-lg border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"><ChevronRight className="w-4 h-4" strokeWidth={2.5} /></button>
        </div>
      </div>
    </div>
  );
});
AdvancedTableBlock.displayName = "AdvancedTableBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const ADVANCEDTABLE_ENGINE_CODE_JS = `"use client";

import React, { forwardRef, useState, useMemo, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Search, ChevronLeft, ChevronRight, Trash2, Edit2, Check, Minus, X } from "lucide-react";

const colorThemes = {
  indigo: { bg: "bg-indigo-600", text: "text-indigo-600 dark:text-indigo-400", border: "border-indigo-600", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10", ring: "focus:border-indigo-600 focus:ring-indigo-600/10" },
  rose: { bg: "bg-rose-600", text: "text-rose-600 dark:text-rose-400", border: "border-rose-600", bgSoft: "bg-rose-50 dark:bg-rose-500/10", ring: "focus:border-rose-600 focus:ring-rose-600/10" },
  emerald: { bg: "bg-emerald-600", text: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-600", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10", ring: "focus:border-emerald-600 focus:ring-emerald-600/10" },
  blue: { bg: "bg-blue-600", text: "text-blue-600 dark:text-blue-400", border: "border-blue-600", bgSoft: "bg-blue-50 dark:bg-blue-500/10", ring: "focus:border-blue-600 focus:ring-blue-600/10" },
  zinc: { bg: "bg-zinc-900 dark:bg-zinc-100", text: "text-zinc-900 dark:text-zinc-100", border: "border-zinc-900 dark:border-zinc-100", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50", ring: "focus:border-zinc-900 focus:ring-zinc-900/10" },
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
      theme: { bg: "bg-[var(--table-color)]", text: "text-[var(--table-color)]", border: "border-[var(--table-color)]", bgSoft: "bg-[rgba(var(--table-rgb),0.1)]", ring: "focus:border-[var(--table-color)] focus:ring-[rgba(var(--table-rgb),0.1)]" },
      style: { "--table-color": color, "--table-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export const AdvancedTableBlock = forwardRef(({ data, columns, color = "indigo", searchable = true, selectable = true, primaryKey, onBatchDelete, onBatchEdit, itemsPerPageOptions = [5, 10, 25, 50], batchActions, className, ...props }, ref) => {
  const { theme, style } = getThemeStyles(color);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[1] || 10);
  const [selectedIds, setSelectedIds] = useState(new Set());

  const filteredData = useMemo(() => {
    if (!search) return data;
    const lowerSearch = search.toLowerCase();
    return data.filter((row) => Object.entries(row).some(([, val]) => String(val).toLowerCase().includes(lowerSearch)));
  }, [data, search]);

  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    return [...filteredData].sort((a, b) => {
      let aVal = a[sortConfig.key]; let bVal = b[sortConfig.key];
      if (sortConfig.type === "number") return sortConfig.direction === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
      aVal = String(aVal).toLowerCase(); bVal = String(bVal).toLowerCase();
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(start, start + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);

  useEffect(() => { if (currentPage > totalPages) setCurrentPage(totalPages); }, [totalPages, currentPage]);

  const handleSort = (key, type = "string") => {
    let direction = "asc";
    if (sortConfig && sortConfig.key === key) direction = sortConfig.direction === "asc" ? "desc" : "asc";
    else if (type === "number") direction = "desc";
    setSortConfig({ key, direction, type });
  };

  const toggleSelection = (id) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) newSet.delete(id); else newSet.add(id);
    setSelectedIds(newSet);
  };

  const toggleAllPageSelection = () => {
    const pageIds = paginatedData.map(row => String(row[primaryKey]));
    const allSelected = pageIds.length > 0 && pageIds.every(id => selectedIds.has(id));
    const newSet = new Set(selectedIds);
    if (allSelected) pageIds.forEach(id => newSet.delete(id)); else pageIds.forEach(id => newSet.add(id));
    setSelectedIds(newSet);
  };

  const clearSelection = () => setSelectedIds(new Set());
  const isAllPageSelected = paginatedData.length > 0 && paginatedData.every(row => selectedIds.has(String(row[primaryKey])));
  const isSomePageSelected = paginatedData.length > 0 && paginatedData.some(row => selectedIds.has(String(row[primaryKey]))) && !isAllPageSelected;
  const tableId = React.useId().replace(/:/g, "");

  return (
    <div ref={ref} className={cn("w-full flex flex-col gap-4 font-sans max-w-[960px] mx-auto text-[#1a1a2e]", className)} style={style} {...props}>
      <style>{\`@keyframes fadeUp-\${tableId} { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }\`}</style>
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {searchable ? (
          <div className="relative w-[260px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            <input type="text" placeholder="Search all columns…" value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} className={cn("w-full pl-9 pr-3 py-2 text-[13px] bg-white dark:bg-zinc-950 border-[1.5px] border-zinc-200 dark:border-zinc-800 rounded-lg outline-none transition-all shadow-sm", theme.ring, "focus:ring-[3px]")} />
          </div>
        ) : <div />}
        <div className="flex items-center gap-2 relative h-10 min-w-[200px] justify-end">
          <div className={cn("flex items-center gap-1.5 text-[13px] text-zinc-500 absolute right-0 transition-opacity duration-200", selectedIds.size > 0 ? "opacity-0 pointer-events-none" : "opacity-100 pointer-events-auto")}>
            Show
            <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="bg-white dark:bg-zinc-900 border-[1.5px] border-zinc-200 dark:border-zinc-800 rounded-md px-2 py-1 outline-none cursor-pointer text-zinc-700 dark:text-zinc-300">
              {itemsPerPageOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            entries
          </div>
          <div className={cn("flex items-center gap-2 px-3 py-2 bg-[#1e1b4b] dark:bg-indigo-950 rounded-xl shadow-[0_4px_20px_rgba(79,70,229,0.35)] overflow-hidden absolute right-0 transition-all duration-300 ease-out origin-right", selectedIds.size > 0 ? "max-w-[400px] opacity-100 pointer-events-auto translate-y-0" : "max-w-0 opacity-0 pointer-events-none -translate-y-1")}>
            <span className="text-[12px] font-bold text-indigo-200 whitespace-nowrap pl-1">{selectedIds.size} selected</span>
            <div className="w-px h-[18px] bg-white/15 shrink-0 mx-1" />
            {batchActions ? batchActions(Array.from(selectedIds), clearSelection) : (
              <>{onBatchEdit && (<button onClick={() => onBatchEdit(Array.from(selectedIds))} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-indigo-300/15 text-indigo-300 hover:bg-indigo-300/25 transition-colors whitespace-nowrap active:scale-95"><Edit2 className="w-[13px] h-[13px]" /> Edit</button>)}{onBatchDelete && (<button onClick={() => { onBatchDelete(Array.from(selectedIds)); clearSelection(); }} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[12px] font-semibold bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors whitespace-nowrap active:scale-95"><Trash2 className="w-[13px] h-[13px]" /> Delete</button>)}</>
            )}
            <div className="w-px h-[18px] bg-white/15 shrink-0 mx-1" />
            <button onClick={clearSelection} className="px-1.5 text-white/40 hover:text-white/70 text-lg leading-none transition-colors"><X className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto rounded-2xl border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <table className="w-full text-[13.5px] text-left border-collapse whitespace-nowrap">
          <thead className="bg-[#f9fafb] dark:bg-zinc-900 border-b-[1.5px] border-zinc-200 dark:border-zinc-800">
            <tr>
              {selectable && (<th className="w-11 px-4 py-[11px] text-center"><div className="flex items-center justify-center"><button onClick={toggleAllPageSelection} className={cn("w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0", (isAllPageSelected || isSomePageSelected) ? cn(theme.bg, theme.border) : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950")}>{isAllPageSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}{isSomePageSelected && <Minus className="w-2.5 h-2.5 text-white" strokeWidth={3} />}</button></div></th>)}
              {columns.map((col) => (<th key={String(col.key)} className={cn("px-4 py-[11px] font-semibold text-[12px] text-zinc-500 uppercase tracking-[0.04em]", col.sortable && cn("cursor-pointer select-none group hover:", theme.text))} style={{ width: col.width }} onClick={() => col.sortable && handleSort(String(col.key), col.sortType)}><div className="flex items-center gap-1.5">{col.header}{col.sortable && (<div className="flex flex-col opacity-50 group-hover:opacity-100 transition-opacity">{sortConfig?.key === String(col.key) ? (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cn("w-3 h-3 block", theme.text)}>{sortConfig.direction === "asc" ? <polyline points="18 15 12 9 6 15"/> : <polyline points="6 9 12 15 18 9"/>}</svg>) : (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 block"><polyline points="18 15 12 9 6 15"/><polyline points="6 9 12 15 18 9" opacity=".4"/></svg>)}</div>)}</div></th>))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (<tr><td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12 text-center text-[14px] text-zinc-400">No results found.</td></tr>) : (
              paginatedData.map((row, rowIndex) => {
                const id = String(row[primaryKey]);
                const isSelected = selectedIds.has(id);
                return (
                  <tr key={id} className={cn("border-b border-[#f3f4f6] dark:border-zinc-800/50 transition-colors duration-150", isSelected ? theme.bgSoft : "hover:bg-[#f9fafb] dark:hover:bg-zinc-900/50")} style={{ animation: \`fadeUp-\${tableId} 0.2s ease \${rowIndex * 30}ms both\` }}>
                    {selectable && (<td className="px-4 py-3 text-center"><div className="flex items-center justify-center"><button onClick={() => toggleSelection(id)} className={cn("w-4 h-4 rounded border-[1.5px] flex items-center justify-center transition-colors shrink-0", isSelected ? cn(theme.bg, theme.border) : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950")}>{isSelected && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}</button></div></td>)}
                    {columns.map((col) => (<td key={String(col.key)} className="px-4 py-3 text-[#374151] dark:text-zinc-300 align-middle">{col.render ? col.render(row) : String(row[col.key] || "")}</td>))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-1">
        <div className="text-[13px] text-zinc-500">Showing <strong className="font-semibold text-[#111827] dark:text-zinc-100">{sortedData.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}</strong> to <strong className="font-semibold text-[#111827] dark:text-zinc-100">{Math.min(currentPage * itemsPerPage, sortedData.length)}</strong> of <strong className="font-semibold text-[#111827] dark:text-zinc-100">{sortedData.length}</strong> results</div>
        <div className="flex items-center gap-[3px]">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="w-8 h-8 rounded-lg border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"><ChevronLeft className="w-4 h-4" strokeWidth={2.5} /></button>
          {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
            let pageNum = i + 1;
            if (totalPages > 5 && currentPage > 3) { pageNum = currentPage - 2 + i; if (pageNum > totalPages) pageNum = totalPages - (4 - i); }
            return (<button key={pageNum} onClick={() => setCurrentPage(pageNum)} className={cn("w-8 h-8 rounded-lg text-[13px] font-medium border-[1.5px] flex items-center justify-center transition-all", currentPage === pageNum ? cn(theme.bg, theme.border, "font-bold text-white") : "border-transparent text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-200 dark:hover:border-zinc-700")}>{pageNum}</button>);
          })}
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages || totalPages === 0} className="w-8 h-8 rounded-lg border-[1.5px] border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-700 dark:text-zinc-300 flex items-center justify-center disabled:opacity-35 disabled:cursor-not-allowed hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"><ChevronRight className="w-4 h-4" strokeWidth={2.5} /></button>
        </div>
      </div>
    </div>
  );
});
AdvancedTableBlock.displayName = "AdvancedTableBlock";`;

// --- SHOWCASE MOCK DATA & HELPERS ---
const now = Date.now();
const ago = (d: number, h: number = 0) => now - (d * 86400000 + h * 3600000);

interface Employee {
  id: number;
  name: string;
  role: string;
  status: "Active" | "Inactive" | "Pending" | "Banned";
  lastActive: string;
  lastActiveTs: number;
  sessions: number;
}

const INITIAL_DATA: Employee[] = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Admin",
    status: "Active",
    lastActive: "2 minutes ago",
    lastActiveTs: ago(0, 0),
    sessions: 142,
  },
  {
    id: 2,
    name: "Bob Martinez",
    role: "Editor",
    status: "Active",
    lastActive: "1 hour ago",
    lastActiveTs: ago(0, 1),
    sessions: 89,
  },
  {
    id: 3,
    name: "Carol Williams",
    role: "Viewer",
    status: "Pending",
    lastActive: "3 hours ago",
    lastActiveTs: ago(0, 3),
    sessions: 12,
  },
  {
    id: 4,
    name: "David Lee",
    role: "Manager",
    status: "Active",
    lastActive: "Yesterday",
    lastActiveTs: ago(1),
    sessions: 201,
  },
  {
    id: 5,
    name: "Eva Chen",
    role: "Developer",
    status: "Inactive",
    lastActive: "3 days ago",
    lastActiveTs: ago(3),
    sessions: 54,
  },
  {
    id: 6,
    name: "Frank Nguyen",
    role: "Editor",
    status: "Active",
    lastActive: "5 days ago",
    lastActiveTs: ago(5),
    sessions: 76,
  },
  {
    id: 7,
    name: "Grace Park",
    role: "Viewer",
    status: "Banned",
    lastActive: "2 weeks ago",
    lastActiveTs: ago(14),
    sessions: 3,
  },
  {
    id: 8,
    name: "Hank Torres",
    role: "Admin",
    status: "Active",
    lastActive: "30 minutes ago",
    lastActiveTs: ago(0, 0.5),
    sessions: 310,
  },
  {
    id: 9,
    name: "Iris Scott",
    role: "Manager",
    status: "Active",
    lastActive: "4 hours ago",
    lastActiveTs: ago(0, 4),
    sessions: 188,
  },
  {
    id: 10,
    name: "James Kim",
    role: "Developer",
    status: "Pending",
    lastActive: "1 week ago",
    lastActiveTs: ago(7),
    sessions: 29,
  },
  {
    id: 11,
    name: "Karen Brown",
    role: "Viewer",
    status: "Active",
    lastActive: "10 minutes ago",
    lastActiveTs: ago(0, 0.17),
    sessions: 67,
  },
  {
    id: 12,
    name: "Liam Davis",
    role: "Editor",
    status: "Inactive",
    lastActive: "1 month ago",
    lastActiveTs: ago(30),
    sessions: 22,
  },
  {
    id: 13,
    name: "Mia Wilson",
    role: "Developer",
    status: "Active",
    lastActive: "2 days ago",
    lastActiveTs: ago(2),
    sessions: 95,
  },
  {
    id: 14,
    name: "Noah Anderson",
    role: "Manager",
    status: "Active",
    lastActive: "6 hours ago",
    lastActiveTs: ago(0, 6),
    sessions: 134,
  },
  {
    id: 15,
    name: "Olivia Thomas",
    role: "Viewer",
    status: "Banned",
    lastActive: "3 months ago",
    lastActiveTs: ago(90),
    sessions: 1,
  },
];

const getDotClass = (ts: number) => {
  const diff = (now - ts) / 60000;
  if (diff < 60) return "bg-[#22c55e]";
  if (diff < 60 * 24) return "bg-[#f59e0b]";
  if (diff < 60 * 24 * 7) return "bg-[#ef4444]";
  return "bg-[#9ca3af]";
};

export function AdvancedTableShowcase() {
  const [data, setData] = useState<Employee[]>(INITIAL_DATA);
  const [searchable, setSearchable] = useState(true);
  const [selectable, setSelectable] = useState(true);

  // Custom Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingIds, setEditingIds] = useState<string[]>([]);
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");

  const [color, setColor] = useState<TableColor | string>(() => {
    if (typeof window !== "undefined")
      return localStorage.getItem("primaryColor") || "indigo";
    return "indigo";
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    }, 1000);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) setColor(e.newValue);
    };
    window.addEventListener("storage", handleStorage);
    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  const columns: TableColumn<Employee>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => (
        <strong className="font-semibold text-[#111827] dark:text-zinc-100">
          {row.name}
        </strong>
      ),
    },
    {
      key: "role",
      header: "Role",
      sortable: true,
      render: (row) => {
        const map: Record<string, string> = {
          Admin:
            "bg-[#ede9fe] text-[#5b21b6] dark:bg-purple-500/10 dark:text-purple-400",
          Manager:
            "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
          Developer:
            "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
          Editor:
            "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
          Viewer:
            "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300",
        };
        return (
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.02em]",
              map[row.role] || map.Viewer,
            )}
          >
            {row.role}
          </span>
        );
      },
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (row) => {
        const map: Record<string, string> = {
          Active:
            "bg-[#d1fae5] text-[#065f46] dark:bg-emerald-500/10 dark:text-emerald-400",
          Pending:
            "bg-[#fef3c7] text-[#92400e] dark:bg-amber-500/10 dark:text-amber-400",
          Inactive:
            "bg-[#dbeafe] text-[#1e40af] dark:bg-blue-500/10 dark:text-blue-400",
          Banned:
            "bg-[#fee2e2] text-[#991b1b] dark:bg-red-500/10 dark:text-red-400",
        };
        return (
          <span
            className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-[0.02em]",
              map[row.status] || map.Inactive,
            )}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: "lastActiveTs",
      header: "Last Active",
      sortable: true,
      sortType: "number",
      render: (row) => (
        <div className="flex items-center gap-[5px]">
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full shrink-0",
              getDotClass(row.lastActiveTs),
            )}
          />
          {row.lastActive}
        </div>
      ),
    },
    {
      key: "sessions",
      header: "Sessions",
      sortable: true,
      sortType: "number",
    },
  ];

  const handleBatchDelete = (ids: string[]) => {
    if (confirm(`Are you sure you want to delete ${ids.length} users?`)) {
      setData(data.filter((d) => !ids.includes(String(d.id))));
    }
  };

  const handleOpenEditModal = (ids: string[]) => {
    setEditingIds(ids);
    setEditRole("");
    setEditStatus("");
    setIsEditModalOpen(true);
  };

  const applyEdits = () => {
    setData(
      data.map((row) => {
        if (editingIds.includes(String(row.id))) {
          return {
            ...row,
            role: editRole || row.role,
            status: (editStatus || row.status) as any,
          };
        }
        return row;
      }),
    );
    setIsEditModalOpen(false);
  };

  const editingNames = data
    .filter((d) => editingIds.includes(String(d.id)))
    .map((d) => d.name);
  const subtitleText =
    editingNames.length <= 3
      ? editingNames.join(", ")
      : `${editingNames.slice(0, 3).join(", ")} +${editingNames.length - 3} more`;

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        data={data}\n        columns={columns}\n        primaryKey="id"\n        color="${color}"`;
    if (!searchable) propsStr += `\n        searchable={false}`;
    if (!selectable) propsStr += `\n        selectable={false}`;

    return `import { AdvancedTableBlock } from "@/components/custom/blocks/AdvancedTableBlock";

const columns = [
  { key: "name", header: "Name", sortable: true },
  { key: "role", header: "Role", sortable: true },
  { key: "lastActiveTs", header: "Last Active", sortable: true, sortType: "number", render: (row) => row.lastActive }
];

export default function UserManagement() {
  const [data, setData] = useState([...]);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <AdvancedTableBlock ${propsStr}
        onBatchDelete={(ids) => console.log("Delete:", ids)}
        onBatchEdit={(ids) => console.log("Edit:", ids)}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Accent Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-600" },
                { id: "blue", bg: "bg-blue-600" },
                { id: "emerald", bg: "bg-emerald-600" },
                { id: "rose", bg: "bg-rose-600" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleColorChange(c.id)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}
              <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-700 mx-1" />
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#4f46e5"}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer opacity-0"
                  title="Custom Hex Color"
                />
                <div
                  className="w-full h-full"
                  style={{
                    backgroundColor: color.startsWith("#")
                      ? color
                      : "transparent",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Table Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setSearchable(!searchable)}
                className={cn(
                  "px-4 py-2 text-sm font-bold rounded-lg border transition-all",
                  searchable
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800",
                )}
              >
                Search Bar
              </button>
              <button
                onClick={() => setSelectable(!selectable)}
                className={cn(
                  "px-4 py-2 text-sm font-bold rounded-lg border transition-all",
                  selectable
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800",
                )}
              >
                Checkboxes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="AdvancedTableBlock"
        tsCode={ADVANCEDTABLE_ENGINE_CODE_TS}
        jsCode={ADVANCEDTABLE_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-center justify-center transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f4f4f8] dark:bg-[#050505] p-2 sm:p-6 lg:p-8 overflow-hidden relative">
          <AdvancedTableBlock
            key={`${searchable}-${selectable}`}
            data={data}
            columns={columns}
            primaryKey="id"
            color={color}
            searchable={searchable}
            selectable={selectable}
            itemsPerPageOptions={[5, 10, 25, 50]}
            onBatchDelete={handleBatchDelete}
            onBatchEdit={handleOpenEditModal}
          />

          {/* CUSTOM EDIT MODAL */}
          <div
            className={cn(
              "fixed inset-0 bg-[#0f0f23]/50 backdrop-blur-[4px] z-[1000] flex items-center justify-center transition-opacity duration-200",
              isEditModalOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none",
            )}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsEditModalOpen(false);
            }}
          >
            <div
              className={cn(
                "bg-white dark:bg-zinc-900 rounded-[18px] p-7 w-[420px] max-w-[90vw] shadow-[0_20px_60px_rgba(0,0,0,0.2)] transition-transform duration-200",
                isEditModalOpen
                  ? "translate-y-0 scale-100"
                  : "translate-y-3 scale-95",
              )}
            >
              <div className="flex items-start justify-between mb-5">
                <div>
                  <div className="text-base font-bold text-[#111827] dark:text-white">
                    Edit Selected Users
                  </div>
                  <div className="text-xs text-[#9ca3af] mt-0.5">
                    {subtitleText}
                  </div>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-7 h-7 rounded-lg bg-[#f3f4f6] dark:bg-zinc-800 text-[#6b7280] dark:text-zinc-400 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mb-3.5">
                <label className="block text-[12px] font-semibold text-[#374151] dark:text-zinc-300 mb-[5px] uppercase tracking-[0.04em]">
                  Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="w-full p-[9px_12px] border-[1.5px] border-[#e5e7eb] dark:border-zinc-700 rounded-[9px] text-[14px] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/10 transition-all"
                >
                  <option value="">— No change —</option>
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                  <option value="Manager">Manager</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>

              <div className="mb-3.5">
                <label className="block text-[12px] font-semibold text-[#374151] dark:text-zinc-300 mb-[5px] uppercase tracking-[0.04em]">
                  Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full p-[9px_12px] border-[1.5px] border-[#e5e7eb] dark:border-zinc-700 rounded-[9px] text-[14px] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 outline-none focus:border-indigo-600 focus:ring-[3px] focus:ring-indigo-600/10 transition-all"
                >
                  <option value="">— No change —</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                  <option value="Banned">Banned</option>
                </select>
              </div>

              <div className="flex gap-2.5 mt-[22px]">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 p-[10px] rounded-[10px] text-[13px] font-semibold bg-[#f3f4f6] dark:bg-zinc-800 text-[#374151] dark:text-zinc-300 hover:bg-[#e5e7eb] dark:hover:bg-zinc-700 transition-colors active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={applyEdits}
                  className="flex-1 p-[10px] rounded-[10px] text-[13px] font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors active:scale-95"
                >
                  Apply Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
