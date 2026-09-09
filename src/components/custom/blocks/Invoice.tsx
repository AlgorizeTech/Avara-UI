"use client";

import { cn } from "@/lib/utils";
import { Heart, Plus, Save, Send, Trash2, CheckCircle2, QrCode, Building2, Printer, Download, Edit3 } from "lucide-react";
import { useState } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type InvoiceVariant =
  | "default"
  | "corporate"
  | "brutalist";

export type InvoiceColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

const invoiceVariants: Record<InvoiceVariant, Record<string, string>> = {
  default: {
    wrapper: "bg-transparent",
    invoicePanel: "bg-card border border-border shadow-sm rounded-2xl p-4 sm:p-8 md:p-10",
    sidebarCard: "bg-card border border-border shadow-sm rounded-2xl",
    tableHeader: "bg-muted border-b border-border",
    tableRow: "divide-border hover:bg-muted/50",
    inputBg: "bg-muted border border-border",
    blockBg: "bg-muted border border-border",
  },
  corporate: {
    wrapper: "bg-transparent",
    invoicePanel:
      "bg-white dark:bg-zinc-950 border-2 border-zinc-800 dark:border-zinc-700 shadow-2xl rounded-2xl overflow-hidden p-0",
    sidebarCard:
      "bg-white dark:bg-zinc-950 border border-border shadow-sm rounded-2xl",
    tableHeader:
      "bg-zinc-900 text-white dark:bg-zinc-800 font-bold uppercase text-xs tracking-wider",
    tableRow:
      "divide-border hover:bg-zinc-100 dark:hover:bg-zinc-900",
    inputBg:
      "bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700",
    blockBg:
      "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl",
  },
  brutalist: {
    wrapper: "bg-transparent",
    invoicePanel:
      "bg-white dark:bg-zinc-950 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rounded-none p-4 sm:p-8 md:p-10 font-mono",
    sidebarCard:
      "bg-white dark:bg-zinc-950 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] rounded-none",
    tableHeader:
      "bg-black text-white dark:bg-white dark:text-black font-black uppercase border-b-4 border-black",
    tableRow:
      "divide-y-4 divide-black dark:divide-white hover:bg-yellow-200 dark:hover:bg-zinc-800 font-mono",
    inputBg:
      "bg-white dark:bg-zinc-900 border-2 border-black dark:border-white font-mono",
    blockBg:
      "bg-yellow-100 dark:bg-zinc-900 border-4 border-black dark:border-white p-4",
  },
};

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    text: "text-primary",
    bg: "bg-primary hover:bg-primary/90 text-primary-foreground shadow-primary/20",
    lightBg: "bg-primary/10 text-primary",
    border: "border-primary/30",
    focusRing: "focus:ring-primary/20 focus:border-primary",
  },
  indigo: {
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20",
    lightBg:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-500/30",
    focusRing: "focus:ring-indigo-500/20 focus:border-indigo-500",
  },
  rose: {
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/20",
    lightBg: "bg-rose-50 dark:bg-rose-500/10 text-rose-700 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-500/30",
    focusRing: "focus:ring-rose-500/20 focus:border-rose-500",
  },
  emerald: {
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
    lightBg:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-500/30",
    focusRing: "focus:ring-emerald-500/20 focus:border-emerald-500",
  },
  zinc: {
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-zinc-900/10",
    lightBg: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-300 dark:border-zinc-600",
    focusRing: "focus:ring-zinc-500/20 focus:border-zinc-500",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] hover:opacity-90 text-white shadow-[0_4px_14px_0_rgba(var(--theme-color-rgb),0.2)]",
        lightBg:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        border: "border-[rgba(var(--theme-color-rgb),0.3)]",
        focusRing:
          "focus:ring-[rgba(var(--theme-color-rgb),0.2)] focus:border-[var(--theme-color)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

export type InvoiceItem = {
  item: string;
  description: string;
  hours: number | string;
  qty: number | string;
  total: string;
};

export type InvoiceData = {
  invoiceNumber: string;
  dateIssued: string;
  dateDue: string;
  invoiceTo: {
    name: string;
    company: string;
    address: string;
    phone: string;
    email: string;
  };
  billTo: {
    totalDue: string;
    bankName: string;
    country: string;
    iban: string;
    swift: string;
  };
  items: InvoiceItem[];
  subtotal: string;
  discount: string;
  tax: string;
  grandTotal: string;
  salesPerson: string;
  note: string;
};

type EditableInputProps = {
  value: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  className?: string;
  align?: "left" | "right" | "center";
  isEditing: boolean;
  inputBg?: string;
  focusRing?: string;
};

function EditableInput({
  value,
  onChange,
  placeholder,
  className = "",
  align = "left",
  isEditing,
  inputBg = "bg-muted border border-border",
  focusRing = "focus:ring-primary/20",
}: EditableInputProps) {
  if (!isEditing) {
    return <span className={`block ${className}`}>{value}</span>;
  }

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        `w-full rounded-md px-3 py-1.5 outline-none focus:ring-2 transition-all text-${align}`,
        inputBg,
        focusRing,
        className,
      )}
    />
  );
}

export default function Invoice({
  invoiceData,
  variant = "default",
  color = "primary",
}: {
  invoiceData: InvoiceData;
  variant?: InvoiceVariant;
  color?: InvoiceColor;
}) {
  const [data, setData] = useState<InvoiceData>(invoiceData);
  const [isEditing, setIsEditing] = useState(false);

  const { theme, style } = getThemeStyles(color as string);

  const handleMainChange = (field: string, value: string) =>
    setData((prev) => ({ ...prev, [field]: value }));
  const handleNestedChange = (
    section: "invoiceTo" | "billTo",
    field: string,
    value: string,
  ) =>
    setData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string,
  ) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const addItem = () =>
    setData({
      ...data,
      items: [
        ...data.items,
        { item: "New Item", description: "Item description", hours: 0, qty: 1, total: "$100" },
      ],
    });
  const removeItem = (index: number) =>
    setData({ ...data, items: data.items.filter((_, i) => i !== index) });

  const handlePrint = () => window.print();

  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Invoice_${data.invoiceNumber.replace("#", "")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={style} className="w-full max-w-full font-sans transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. CORPORATE EXECUTIVE VARIANT */}
      {/* ========================================================================= */}
      {variant === "corporate" && (
        <div className="bg-white dark:bg-zinc-950 border-2 border-zinc-800 dark:border-zinc-700 shadow-2xl rounded-2xl overflow-hidden w-full">
          {/* Action Toolbar */}
          <div className="bg-zinc-950 text-white p-3 sm:px-6 sm:py-2.5 border-b border-zinc-800/80 flex items-center justify-end print:hidden">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={cn(
                  "px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm",
                  theme.bg
                )}
                title={isEditing ? "Save Statement" : "Edit Statement"}
              >
                {isEditing ? <Save className="w-3.5 h-3.5" /> : <Edit3 className="w-3.5 h-3.5" />}
                <span>{isEditing ? "Save" : "Edit"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-zinc-800"
                title="Print PDF"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print</span>
              </button>
              <button
                onClick={handleDownload}
                className="px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-zinc-800"
                title="Export JSON"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">JSON</span>
              </button>
            </div>
          </div>

          {/* Top Corporate Banner */}
          <div className={cn("p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6", theme.bg)}>
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className={cn("w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-white shadow-xl flex items-center justify-center shrink-0 border border-white/20", theme.text)}>
                <Building2 className={cn("w-6 h-6", theme.text)} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">ALGORIZE_UI</h1>
                  <CheckCircle2 className="w-4 h-4 sm:hidden text-white shrink-0" />
                </div>
                <p className="text-[11px] sm:text-xs text-white/80 mt-0.5 break-words">450 South Brand Brooklyn, CA 91905</p>
              </div>
            </div>

            <div className="text-left sm:text-right w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-none border-white/15">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-white text-zinc-900 shadow-md mb-1.5">
                <CheckCircle2 className={cn("w-3.5 h-3.5", theme.text)} /> VERIFIED STATEMENT
              </span>
              <EditableInput
                isEditing={isEditing}
                value={data.invoiceNumber}
                onChange={(e) => handleMainChange("invoiceNumber", e.target.value)}
                align="right"
                inputBg="bg-white/20 text-white border border-white/30 font-mono font-black"
                className="text-2xl sm:text-3xl font-black text-white font-mono break-all tracking-tight"
              />
            </div>
          </div>

          {/* Metadata Strip */}
          <div className="p-4 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-border shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Invoice To</span>
              <EditableInput isEditing={isEditing} value={data.invoiceTo.name} onChange={(e) => handleNestedChange("invoiceTo", "name", e.target.value)} className="font-bold text-foreground text-sm" />
              <EditableInput isEditing={isEditing} value={data.invoiceTo.company} onChange={(e) => handleNestedChange("invoiceTo", "company", e.target.value)} className="text-xs text-muted-foreground" />
              <EditableInput isEditing={isEditing} value={data.invoiceTo.email} onChange={(e) => handleNestedChange("invoiceTo", "email", e.target.value)} className="text-xs text-muted-foreground break-all" />
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-border shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Schedule & Due</span>
              <p className="text-xs text-muted-foreground flex items-center justify-between">Issued: <EditableInput isEditing={isEditing} value={data.dateIssued} onChange={(e) => handleMainChange("dateIssued", e.target.value)} className="font-semibold text-foreground" /></p>
              <p className="text-xs text-muted-foreground flex items-center justify-between">Due Date: <EditableInput isEditing={isEditing} value={data.dateDue} onChange={(e) => handleMainChange("dateDue", e.target.value)} className="font-semibold text-foreground" /></p>
              <p className="text-xs text-muted-foreground flex items-center justify-between">Rep: <EditableInput isEditing={isEditing} value={data.salesPerson} onChange={(e) => handleMainChange("salesPerson", e.target.value)} className="font-semibold text-foreground" /></p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-zinc-950 border border-border shadow-sm space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-2">Settlement Account</span>
              <EditableInput isEditing={isEditing} value={data.billTo.bankName} onChange={(e) => handleNestedChange("billTo", "bankName", e.target.value)} className="text-xs text-muted-foreground font-semibold" />
              <EditableInput isEditing={isEditing} value={data.billTo.iban} onChange={(e) => handleNestedChange("billTo", "iban", e.target.value)} className="text-xs font-mono text-muted-foreground break-all" />
              <EditableInput isEditing={isEditing} value={data.billTo.swift} onChange={(e) => handleNestedChange("billTo", "swift", e.target.value)} className="text-xs font-mono text-muted-foreground break-all" />
            </div>
          </div>

          {/* Items Section: Mobile Executive Cards (< sm) & Desktop Table View (>= sm) */}
          <div className="p-4 sm:p-8">
            {/* Mobile Executive Card View (< sm) */}
            <div className="block sm:hidden space-y-3 mb-6">
              {data.items.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 space-y-3 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={cn("text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded-md text-white shadow-sm", theme.bg)}>
                      SERVICE #{idx + 1}
                    </span>
                    {isEditing && (
                      <button
                        onClick={() => removeItem(idx)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 cursor-pointer"
                        title="Remove service item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block">Service Description</span>
                    <EditableInput
                      isEditing={isEditing}
                      value={item.item}
                      onChange={(e) => handleItemChange(idx, "item", e.target.value)}
                      inputBg="bg-white dark:bg-zinc-950 text-foreground border border-border font-bold text-xs"
                      className="font-bold text-foreground text-sm"
                    />
                    <EditableInput
                      isEditing={isEditing}
                      value={item.description}
                      onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      inputBg="bg-white dark:bg-zinc-950 text-foreground border border-border text-xs"
                      className="text-xs text-muted-foreground"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-xs">
                    <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[9px] font-bold text-muted-foreground block uppercase mb-0.5">Hours</span>
                      <EditableInput
                        isEditing={isEditing}
                        value={item.hours}
                        onChange={(e) => handleItemChange(idx, "hours", e.target.value)}
                        inputBg="bg-zinc-100 dark:bg-zinc-900 text-foreground border border-border text-xs"
                        className="font-semibold text-foreground text-xs"
                      />
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[9px] font-bold text-muted-foreground block uppercase mb-0.5">Qty</span>
                      <EditableInput
                        isEditing={isEditing}
                        value={item.qty}
                        onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                        inputBg="bg-zinc-100 dark:bg-zinc-900 text-foreground border border-border text-xs"
                        className="font-semibold text-foreground text-xs"
                      />
                    </div>
                    <div className="bg-white dark:bg-zinc-950 p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                      <span className="text-[9px] font-bold text-muted-foreground block uppercase mb-0.5">Amount</span>
                      <EditableInput
                        isEditing={isEditing}
                        value={item.total}
                        onChange={(e) => handleItemChange(idx, "total", e.target.value)}
                        align="right"
                        inputBg="bg-zinc-100 dark:bg-zinc-900 text-foreground border border-border text-xs font-bold"
                        className="font-bold text-foreground text-xs"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>= sm) */}
            <div className="hidden sm:block rounded-xl border border-border mb-6 overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead className="bg-zinc-900 text-white dark:bg-zinc-800 text-xs uppercase tracking-wider font-bold">
                  <tr>
                    <th className="p-3.5 w-10">#</th>
                    <th className="p-3.5">Service Description</th>
                    <th className="p-3.5 text-right w-20">Qty</th>
                    <th className="p-3.5 text-right w-28">Amount</th>
                    {isEditing && <th className="p-3.5 text-center w-12">Act</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {data.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900">
                      <td className="p-3.5 font-mono text-xs text-muted-foreground">{idx + 1}</td>
                      <td className="p-3.5 space-y-1">
                        <EditableInput isEditing={isEditing} value={item.item} onChange={(e) => handleItemChange(idx, "item", e.target.value)} className="font-bold text-foreground" />
                        <EditableInput isEditing={isEditing} value={item.description} onChange={(e) => handleItemChange(idx, "description", e.target.value)} className="text-xs text-muted-foreground" />
                      </td>
                      <td className="p-3.5 text-right font-medium">
                        <EditableInput isEditing={isEditing} value={item.qty} onChange={(e) => handleItemChange(idx, "qty", e.target.value)} align="right" />
                      </td>
                      <td className="p-3.5 text-right font-bold text-foreground">
                        <EditableInput isEditing={isEditing} value={item.total} onChange={(e) => handleItemChange(idx, "total", e.target.value)} align="right" />
                      </td>
                      {isEditing && (
                        <td className="p-3.5 text-center">
                          <button onClick={() => removeItem(idx)} className="text-rose-500 hover:text-rose-700 p-1 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isEditing && (
              <button onClick={addItem} className={cn("flex items-center gap-2 text-xs font-bold mb-6 px-3.5 py-2 rounded-xl border border-border bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-sm", theme.text)}>
                <Plus className="w-4 h-4" /> Add Service Item
              </button>
            )}

            {/* Footer Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center pt-6 border-t border-border">
              <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-border flex items-center gap-4">
                <QrCode className="w-10 h-10 text-zinc-900 dark:text-white shrink-0" />
                <div>
                  <p className="font-bold text-xs text-foreground">Mobile Bank Scan & Pay</p>
                  <p className="text-[11px] text-muted-foreground">Scan with corporate banking app to settle instantly.</p>
                </div>
              </div>
              <div className="space-y-2 text-left md:text-right">
                <p className="text-xs text-muted-foreground flex justify-between md:justify-end gap-2">Subtotal: <EditableInput isEditing={isEditing} value={data.subtotal} onChange={(e) => handleMainChange("subtotal", e.target.value)} className="font-semibold text-foreground" /></p>
                <p className="text-xs text-muted-foreground flex justify-between md:justify-end gap-2">Tax: <EditableInput isEditing={isEditing} value={data.tax} onChange={(e) => handleMainChange("tax", e.target.value)} className="font-semibold text-foreground" /></p>
                <div className="pt-2 border-t border-border">
                  <span className="text-xs text-muted-foreground uppercase font-mono block">Grand Total Due</span>
                  <EditableInput isEditing={isEditing} value={data.grandTotal} onChange={(e) => handleMainChange("grandTotal", e.target.value)} align="right" className={cn("text-2xl sm:text-3xl font-black", theme.text)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. NEO-BRUTALIST VARIANT */}
      {/* ========================================================================= */}
      {variant === "brutalist" && (
        <div className="space-y-6 font-mono w-full">
          {/* Action Bar */}
          <div className={cn("p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden", theme.bg)}>
            <span className="font-black text-white uppercase text-xs sm:text-sm">[ACTION_PANEL // NEO_BRUTAL]</span>
            <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
              <button onClick={() => setIsEditing(!isEditing)} className="flex-1 sm:flex-initial px-3.5 py-2 bg-black text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-zinc-800 cursor-pointer">
                {isEditing ? "SAVE_DATA" : "EDIT_INVOICE"}
              </button>
              <button onClick={handlePrint} className="flex-1 sm:flex-initial px-3.5 py-2 bg-white text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-100 cursor-pointer">PRINT_PDF</button>
              <button onClick={handleDownload} className="flex-1 sm:flex-initial px-3.5 py-2 bg-white text-black font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-100 cursor-pointer">GET_JSON</button>
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-950 border-4 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] sm:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b-4 border-black dark:border-white">
              <div>
                <span className={cn("border-2 border-black font-black px-2.5 py-1 text-xs uppercase tracking-wider", theme.bg)}>STATEMENT // OFFICIAL</span>
                <h1 className="text-2xl sm:text-3xl font-black uppercase text-foreground mt-3">ALGORIZE_UI</h1>
              </div>
              <div className="text-left sm:text-right">
                <EditableInput isEditing={isEditing} value={data.invoiceNumber} onChange={(e) => handleMainChange("invoiceNumber", e.target.value)} align="right" className={cn("text-2xl sm:text-3xl font-black break-all", theme.text)} />
                <p className="text-xs text-muted-foreground">DATE: {data.dateIssued}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white dark:bg-zinc-900 space-y-1">
                <span className="font-black uppercase text-xs block mb-1">BILL_TO:</span>
                <EditableInput isEditing={isEditing} value={data.invoiceTo.name} onChange={(e) => handleNestedChange("invoiceTo", "name", e.target.value)} className="font-bold text-base sm:text-lg" />
                <EditableInput isEditing={isEditing} value={data.invoiceTo.company} onChange={(e) => handleNestedChange("invoiceTo", "company", e.target.value)} className="text-xs" />
                <EditableInput isEditing={isEditing} value={data.invoiceTo.email} onChange={(e) => handleNestedChange("invoiceTo", "email", e.target.value)} className="text-xs break-all" />
              </div>
              <div className={cn("p-4 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-foreground space-y-1", theme.lightBg)}>
                <span className="font-black uppercase text-xs block mb-1">PAYMENT_TERMS:</span>
                <p className="text-xs font-bold">DUE: <EditableInput isEditing={isEditing} value={data.dateDue} onChange={(e) => handleMainChange("dateDue", e.target.value)} /></p>
                <p className="text-xs">BANK: <EditableInput isEditing={isEditing} value={data.billTo.bankName} onChange={(e) => handleNestedChange("billTo", "bankName", e.target.value)} /></p>
                <p className="text-xs font-mono break-all">IBAN: <EditableInput isEditing={isEditing} value={data.billTo.iban} onChange={(e) => handleNestedChange("billTo", "iban", e.target.value)} /></p>
              </div>
            </div>

            {/* Brutalist Table */}
            <div className="border-4 border-black dark:border-white overflow-hidden">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs">
                  <tr>
                    <th className="p-3 border-r-2 border-black dark:border-white">ITEM</th>
                    <th className="p-3 text-right border-r-2 border-black dark:border-white w-16">QTY</th>
                    <th className="p-3 text-right w-28">TOTAL</th>
                    {isEditing && <th className="p-3 text-center w-12 border-l-2 border-black">ACT</th>}
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-black dark:divide-white">
                  {data.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-zinc-100 dark:hover:bg-zinc-800">
                      <td className="p-3 border-r-2 border-black dark:border-white font-bold">
                        <EditableInput isEditing={isEditing} value={item.item} onChange={(e) => handleItemChange(idx, "item", e.target.value)} />
                      </td>
                      <td className="p-3 text-right border-r-2 border-black dark:border-white">
                        <EditableInput isEditing={isEditing} value={item.qty} onChange={(e) => handleItemChange(idx, "qty", e.target.value)} align="right" />
                      </td>
                      <td className={cn("p-3 text-right font-black", theme.text)}>
                        <EditableInput isEditing={isEditing} value={item.total} onChange={(e) => handleItemChange(idx, "total", e.target.value)} align="right" />
                      </td>
                      {isEditing && (
                        <td className="p-3 text-center border-l-2 border-black">
                          <button onClick={() => removeItem(idx)} className="text-rose-600 font-bold p-1"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {isEditing && (
              <button onClick={addItem} className="px-4 py-2 bg-black text-white font-black text-xs uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                + ADD_ITEM
              </button>
            )}

            <div className="flex justify-end pt-4">
              <div className={cn("p-4 sm:p-6 border-4 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-right space-y-1 w-full sm:w-auto", theme.bg)}>
                <span className="font-black text-xs uppercase block text-white">AMOUNT DUE NOW</span>
                <EditableInput
                  isEditing={isEditing}
                  value={data.grandTotal}
                  onChange={(e) => handleMainChange("grandTotal", e.target.value)}
                  align="right"
                  inputBg="bg-black text-white border-2 border-white font-mono font-black"
                  className="text-2xl sm:text-4xl font-black tracking-tight text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. DEFAULT VARIANT */}
      {/* ========================================================================= */}
      {variant === "default" && (
        <div className="flex flex-col lg:flex-row items-start gap-6 w-full">
          <div className={cn("flex-1 min-w-0 w-full overflow-hidden", invoiceVariants[variant].invoicePanel)}>
            {/* Header */}
            <header className="flex flex-col sm:flex-row justify-between items-start mb-8 sm:mb-12 gap-6 sm:gap-8">
              <div className="flex gap-3 sm:gap-4 items-start w-full sm:w-auto">
                <div className={cn("p-2.5 sm:p-3 rounded-xl shrink-0", theme.lightBg)}>
                  <Heart className={cn("w-6 h-6 sm:w-8 sm:h-8", theme.text)} fill="currentColor" fillOpacity={0.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">ALGORIZE_UI</h1>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-[220px] leading-relaxed break-words">
                    Office 149, 450 South Brand Brooklyn San Diego County, CA 91905, USA
                    <br />
                    +1 (123) 456 7891
                  </p>
                </div>
              </div>

              <div className={cn("w-full sm:w-auto p-4 sm:p-5 rounded-xl", invoiceVariants[variant].blockBg)}>
                <div className="flex items-center justify-between sm:justify-end gap-3 mb-3 sm:mb-4">
                  <span className="text-base sm:text-xl font-medium text-muted-foreground uppercase tracking-widest">
                    INVOICE
                  </span>
                  <EditableInput isEditing={isEditing} value={data.invoiceNumber} onChange={(e) => handleMainChange("invoiceNumber", e.target.value)} align="right" className="font-bold text-xl sm:text-2xl text-foreground" />
                </div>

                <div className="grid grid-cols-[auto,1fr] gap-x-3 sm:gap-x-4 gap-y-2 text-xs sm:text-sm items-center sm:text-right text-left">
                  <span className="text-muted-foreground font-medium">Date Issued:</span>
                  <EditableInput isEditing={isEditing} inputBg={invoiceVariants[variant].inputBg} focusRing={theme.focusRing} value={data.dateIssued} onChange={(e: any) => handleMainChange("dateIssued", e.target.value)} align="right" className="text-foreground font-medium" />
                  <span className="text-muted-foreground font-medium">Date Due:</span>
                  <EditableInput isEditing={isEditing} inputBg={invoiceVariants[variant].inputBg} focusRing={theme.focusRing} value={data.dateDue} onChange={(e: any) => handleMainChange("dateDue", e.target.value)} align="right" className="text-foreground font-medium" />
                </div>
              </div>
            </header>

            {/* Billing Info */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 mb-8 sm:mb-12">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Invoice To</span>
                <div className="space-y-1.5 text-xs sm:text-sm break-words">
                  <EditableInput isEditing={isEditing} inputBg={invoiceVariants[variant].inputBg} focusRing={theme.focusRing} value={data.invoiceTo.name} onChange={(e: any) => handleNestedChange("invoiceTo", "name", e.target.value)} placeholder="Name" className="font-semibold text-sm sm:text-base text-foreground mb-2" />
                  <EditableInput isEditing={isEditing} inputBg={invoiceVariants[variant].inputBg} focusRing={theme.focusRing} value={data.invoiceTo.company} onChange={(e: any) => handleNestedChange("invoiceTo", "company", e.target.value)} placeholder="Company" className="text-muted-foreground" />
                  <EditableInput isEditing={isEditing} inputBg={invoiceVariants[variant].inputBg} focusRing={theme.focusRing} value={data.invoiceTo.email} onChange={(e: any) => handleNestedChange("invoiceTo", "email", e.target.value)} placeholder="Email" className="text-muted-foreground break-all" />
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground mb-3 block">Payment Details</span>
                <div className={cn("p-3.5 sm:p-4 rounded-lg space-y-2.5 sm:space-y-3 text-xs sm:text-sm", invoiceVariants[variant].blockBg)}>
                  <div className="flex justify-between items-center pb-2.5 sm:pb-3 border-b border-border">
                    <span className="font-medium text-muted-foreground">Total Due:</span>
                    <EditableInput isEditing={isEditing} inputBg={invoiceVariants[variant].inputBg} focusRing={theme.focusRing} value={data.billTo.totalDue} onChange={(e: any) => handleNestedChange("billTo", "totalDue", e.target.value)} align="right" className={cn("font-bold text-base sm:text-lg", theme.text)} />
                  </div>
                  <div className="grid grid-cols-[75px,1fr] gap-2 items-center">
                    <span className="text-muted-foreground">Bank:</span>
                    <EditableInput isEditing={isEditing} value={data.billTo.bankName} onChange={(e) => handleNestedChange("billTo", "bankName", e.target.value)} className="text-foreground font-medium" />
                    <span className="text-muted-foreground">IBAN:</span>
                    <EditableInput isEditing={isEditing} value={data.billTo.iban} onChange={(e) => handleNestedChange("billTo", "iban", e.target.value)} className="text-foreground font-mono text-xs break-all" />
                  </div>
                </div>
              </div>
            </section>

            {/* Table */}
            <section className="mb-8 sm:mb-10 rounded-xl w-full overflow-hidden border border-border">
              <table className="w-full text-left text-xs sm:text-sm text-foreground border-collapse">
                <thead className={cn("text-muted-foreground uppercase tracking-wider text-[10px] font-bold", invoiceVariants[variant].tableHeader)}>
                  <tr>
                    <th className="px-4 py-4">Item Details</th>
                    <th className="px-4 py-4 text-right w-20">Qty</th>
                    <th className="px-4 py-4 text-right w-28">Total</th>
                    {isEditing && <th className="px-4 py-4 text-center w-12">Act</th>}
                  </tr>
                </thead>
                <tbody className={invoiceVariants[variant].tableRow}>
                  {data.items.map((item, idx) => (
                    <tr key={idx} className={invoiceVariants[variant].tableRow}>
                      <td className="px-4 py-4 align-top space-y-1">
                        <EditableInput isEditing={isEditing} value={item.item} onChange={(e) => handleItemChange(idx, "item", e.target.value)} className="font-semibold text-foreground" />
                        <EditableInput isEditing={isEditing} value={item.description} onChange={(e) => handleItemChange(idx, "description", e.target.value)} className="text-xs text-muted-foreground" />
                      </td>
                      <td className="px-4 py-4 align-top text-right font-medium">
                        <EditableInput isEditing={isEditing} value={item.qty} onChange={(e) => handleItemChange(idx, "qty", e.target.value)} align="right" />
                      </td>
                      <td className="px-4 py-4 align-top text-right font-bold">
                        <EditableInput isEditing={isEditing} value={item.total} onChange={(e) => handleItemChange(idx, "total", e.target.value)} align="right" />
                      </td>
                      {isEditing && (
                        <td className="px-4 py-4 text-center">
                          <button onClick={() => removeItem(idx)} className="text-rose-500 hover:text-rose-700 p-1"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {isEditing && (
                <div className="p-3 border-t border-border">
                  <button onClick={addItem} className={cn("flex items-center gap-2 text-xs font-bold", theme.text)}>
                    <Plus className="w-4 h-4" /> Add Item
                  </button>
                </div>
              )}
            </section>

            {/* Footer */}
            <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pt-4 border-t border-border">
              {isEditing ? (
                <textarea value={data.note} onChange={(e) => handleMainChange("note", e.target.value)} className="w-full max-w-xs text-xs p-2 border border-border rounded-lg" rows={2} />
              ) : (
                <p className="text-xs text-muted-foreground max-w-xs">{data.note}</p>
              )}
              <div className="text-left sm:text-right w-full sm:w-auto">
                <span className="text-xs text-muted-foreground block uppercase font-mono">Grand Total</span>
                <EditableInput isEditing={isEditing} value={data.grandTotal} onChange={(e) => handleMainChange("grandTotal", e.target.value)} align="right" className={cn("text-2xl font-bold", theme.text)} />
              </div>
            </footer>
          </div>

          {/* Action Sidebar */}
          <div className={cn("w-full lg:w-72 p-4 sm:p-6 rounded-2xl shrink-0 space-y-4 print:hidden transition-colors duration-300", invoiceVariants[variant].sidebarCard)}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "w-full py-3 px-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md",
                isEditing ? "bg-emerald-600 hover:bg-emerald-700 text-white" : theme.bg,
              )}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              {isEditing ? "Save Invoice" : "Edit Invoice"}
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-border bg-background hover:bg-muted text-foreground"
            >
              <Printer className="w-4 h-4" /> Print Document
            </button>

            <button
              onClick={handleDownload}
              className="w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-border bg-background hover:bg-muted text-foreground"
            >
              <Download className="w-4 h-4" /> Download JSON
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
