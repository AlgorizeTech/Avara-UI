"use client";

import { cn } from "@/lib/utils";
import { DollarSign, Heart, Plus, Save, Send, Trash2 } from "lucide-react";
import { useState } from "react";

// ==========================================
// VARIANT & COLOR CONFIGURATION
// ==========================================
export type InvoiceVariant = "default" | "minimal" | "glass";

// Preserves IDE autocomplete while allowing arbitrary hex strings
export type InvoiceColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});

const invoiceVariants: Record<InvoiceVariant, Record<string, string>> = {
  default: {
    wrapper: "bg-zinc-50 dark:bg-zinc-950/50",
    invoicePanel:
      "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
    sidebarCard:
      "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm",
    tableHeader:
      "bg-zinc-50 dark:bg-zinc-950/50 border-b border-zinc-200 dark:border-zinc-800",
    tableRow:
      "divide-zinc-100 dark:divide-zinc-800/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20",
    inputBg:
      "bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800",
    blockBg:
      "bg-zinc-50 dark:bg-zinc-950/50 border border-zinc-100 dark:border-zinc-800/50",
  },
  minimal: {
    wrapper: "bg-transparent",
    invoicePanel: "bg-transparent border-none shadow-none",
    sidebarCard:
      "bg-zinc-50/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-zinc-800/50 rounded-2xl",
    tableHeader:
      "bg-transparent border-b-2 border-zinc-200 dark:border-zinc-800",
    tableRow:
      "divide-zinc-100 dark:divide-zinc-800/60 hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20",
    inputBg:
      "bg-zinc-50/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800",
    blockBg: "bg-transparent border-none p-0",
  },
  glass: {
    wrapper:
      "bg-white/40 dark:bg-black/40 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl rounded-2xl",
    invoicePanel:
      "bg-white/50 dark:bg-black/50 backdrop-blur-md border border-white/30 dark:border-white/10 shadow-lg",
    sidebarCard:
      "bg-white/40 dark:bg-black/40 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-2xl",
    tableHeader:
      "bg-white/20 dark:bg-black/20 border-b border-white/20 dark:border-white/10",
    tableRow:
      "divide-white/10 dark:divide-white/5 hover:bg-white/20 dark:hover:bg-white/5",
    inputBg:
      "bg-white/40 dark:bg-black/40 border border-white/30 dark:border-white/10 backdrop-blur-md",
    blockBg:
      "bg-white/20 dark:bg-black/20 border border-white/20 dark:border-white/10",
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
  const styles = invoiceVariants[variant];

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
        { item: "", description: "", hours: 0, qty: 1, total: "$0" },
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

  const EditableInput = ({
    value,
    onChange,
    placeholder,
    className = "",
    align = "left",
  }: any) =>
    isEditing ? (
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          `w-full rounded-md px-3 py-1.5 outline-none focus:ring-2 transition-all text-${align}`,
          styles.inputBg,
          theme.focusRing,
          className,
        )}
      />
    ) : (
      <span className={`block ${className}`}>{value}</span>
    );

  return (
    <div
      style={style}
      className={cn(
        "flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:p-8 min-h-[800px] font-sans transition-colors duration-300",
        styles.wrapper,
      )}
    >
      {/* === MAIN INVOICE AREA === */}
      <div
        className={cn(
          "flex-1 min-w-0 p-6 sm:p-10 rounded-2xl print:shadow-none print:border-none print:p-0 transition-colors duration-300",
          styles.invoicePanel,
        )}
      >
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-8">
          <div className="flex gap-4 items-start">
            <div className={cn("p-3 rounded-xl shrink-0", theme.lightBg)}>
              <Heart
                className={cn("w-8 h-8", theme.text)}
                fill="currentColor"
                fillOpacity={0.2}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                Algorize
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-[220px] leading-relaxed">
                Office 149, 450 South Brand Brooklyn San Diego County, CA 91905,
                USA
                <br />
                +1 (123) 456 7891
              </p>
            </div>
          </div>

          <div
            className={cn("w-full sm:w-auto p-5 rounded-xl", styles.blockBg)}
          >
            <div className="flex items-center sm:justify-end gap-3 mb-4">
              <span className="text-xl font-medium text-zinc-400 uppercase tracking-widest">
                INVOICE
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={(e) =>
                    handleMainChange("invoiceNumber", e.target.value)
                  }
                  className={cn(
                    "font-bold text-xl rounded-md px-3 py-1 w-28 text-right outline-none focus:ring-2 transition-all text-zinc-900 dark:text-zinc-100",
                    styles.inputBg,
                    theme.focusRing,
                  )}
                />
              ) : (
                <span className="font-bold text-2xl text-zinc-900 dark:text-zinc-100">
                  {data.invoiceNumber}
                </span>
              )}
            </div>

            <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm items-center sm:text-right text-left">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                Date Issued:
              </span>
              <EditableInput
                value={data.dateIssued}
                onChange={(e: any) =>
                  handleMainChange("dateIssued", e.target.value)
                }
                align="right"
                className="text-zinc-900 dark:text-zinc-200 font-medium"
              />
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                Date Due:
              </span>
              <EditableInput
                value={data.dateDue}
                onChange={(e: any) =>
                  handleMainChange("dateDue", e.target.value)
                }
                align="right"
                className="text-zinc-900 dark:text-zinc-200 font-medium"
              />
            </div>
          </div>
        </header>

        {/* BILLING INFO */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 block">
              Invoice To
            </span>
            <div className="space-y-1.5 text-sm">
              <EditableInput
                value={data.invoiceTo.name}
                onChange={(e: any) =>
                  handleNestedChange("invoiceTo", "name", e.target.value)
                }
                placeholder="Name"
                className="font-semibold text-base text-zinc-900 dark:text-zinc-100 mb-2"
              />
              <EditableInput
                value={data.invoiceTo.company}
                onChange={(e: any) =>
                  handleNestedChange("invoiceTo", "company", e.target.value)
                }
                placeholder="Company"
                className="text-zinc-600 dark:text-zinc-300"
              />
              <EditableInput
                value={data.invoiceTo.address}
                onChange={(e: any) =>
                  handleNestedChange("invoiceTo", "address", e.target.value)
                }
                placeholder="Address"
                className="text-zinc-600 dark:text-zinc-300"
              />
              <EditableInput
                value={data.invoiceTo.phone}
                onChange={(e: any) =>
                  handleNestedChange("invoiceTo", "phone", e.target.value)
                }
                placeholder="Phone"
                className="text-zinc-600 dark:text-zinc-300"
              />
              <EditableInput
                value={data.invoiceTo.email}
                onChange={(e: any) =>
                  handleNestedChange("invoiceTo", "email", e.target.value)
                }
                placeholder="Email"
                className="text-zinc-600 dark:text-zinc-300"
              />
            </div>
          </div>

          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 block">
              Payment Details
            </span>
            <div
              className={cn("p-4 rounded-lg space-y-3 text-sm", styles.blockBg)}
            >
              <div className="flex justify-between items-center pb-3 border-b border-zinc-200 dark:border-zinc-800">
                <span className="font-medium text-zinc-600 dark:text-zinc-400">
                  Total Due:
                </span>
                <EditableInput
                  value={data.billTo.totalDue}
                  onChange={(e: any) =>
                    handleNestedChange("billTo", "totalDue", e.target.value)
                  }
                  align="right"
                  className={cn("font-bold text-lg", theme.text)}
                />
              </div>
              <div className="grid grid-cols-[100px,1fr] gap-2 items-center">
                <span className="text-zinc-500 dark:text-zinc-400">Bank:</span>
                <EditableInput
                  value={data.billTo.bankName}
                  onChange={(e: any) =>
                    handleNestedChange("billTo", "bankName", e.target.value)
                  }
                  className="text-zinc-800 dark:text-zinc-200 font-medium"
                />
                <span className="text-zinc-500 dark:text-zinc-400">
                  Country:
                </span>
                <EditableInput
                  value={data.billTo.country}
                  onChange={(e: any) =>
                    handleNestedChange("billTo", "country", e.target.value)
                  }
                  className="text-zinc-800 dark:text-zinc-200 font-medium"
                />
                <span className="text-zinc-500 dark:text-zinc-400">IBAN:</span>
                <EditableInput
                  value={data.billTo.iban}
                  onChange={(e: any) =>
                    handleNestedChange("billTo", "iban", e.target.value)
                  }
                  className="text-zinc-800 dark:text-zinc-200 font-medium font-mono text-xs"
                />
                <span className="text-zinc-500 dark:text-zinc-400">SWIFT:</span>
                <EditableInput
                  value={data.billTo.swift}
                  onChange={(e: any) =>
                    handleNestedChange("billTo", "swift", e.target.value)
                  }
                  className="text-zinc-800 dark:text-zinc-200 font-medium font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ITEMS TABLE */}
        <section
          className={cn(
            "mb-10 overflow-x-auto rounded-xl",
            variant !== "minimal"
              ? "border border-zinc-200 dark:border-zinc-800"
              : "",
          )}
        >
          <table className="w-full min-w-[600px] text-left text-sm text-zinc-800 dark:text-zinc-200 border-collapse">
            <thead
              className={cn(
                "text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[10px] font-bold",
                styles.tableHeader,
              )}
            >
              <tr>
                <th className="px-4 py-4">Item Details</th>
                <th className="px-4 py-4 text-right w-24">Hours</th>
                <th className="px-4 py-4 text-right w-24">Qty</th>
                <th className="px-4 py-4 text-right w-32">Total</th>
                {isEditing && (
                  <th className="px-4 py-4 text-center w-16 print:hidden">
                    Act
                  </th>
                )}
              </tr>
            </thead>
            <tbody className={styles.tableRow}>
              {data.items.map((item, idx) => (
                <tr key={idx} className={styles.tableRow}>
                  <td className="px-4 py-4 align-top">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          value={item.item}
                          onChange={(e) =>
                            handleItemChange(idx, "item", e.target.value)
                          }
                          placeholder="Item Name"
                          className={cn(
                            "w-full rounded-md px-3 py-1.5 outline-none focus:ring-2 font-medium",
                            styles.inputBg,
                            theme.focusRing,
                          )}
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(idx, "description", e.target.value)
                          }
                          rows={2}
                          placeholder="Description"
                          className={cn(
                            "w-full rounded-md px-3 py-1.5 outline-none resize-none text-xs text-zinc-500",
                            styles.inputBg,
                            theme.focusRing,
                          )}
                        />
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                          {item.item}
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          {item.description}
                        </p>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    <EditableInput
                      value={item.hours}
                      onChange={(e: any) =>
                        handleItemChange(idx, "hours", e.target.value)
                      }
                      align="right"
                    />
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    <EditableInput
                      value={item.qty}
                      onChange={(e: any) =>
                        handleItemChange(idx, "qty", e.target.value)
                      }
                      align="right"
                    />
                  </td>
                  <td className="px-4 py-4 text-right align-top">
                    <EditableInput
                      value={item.total}
                      onChange={(e: any) =>
                        handleItemChange(idx, "total", e.target.value)
                      }
                      align="right"
                      className="font-semibold text-zinc-900 dark:text-zinc-100"
                    />
                  </td>
                  {isEditing && (
                    <td className="px-4 py-4 text-center align-top print:hidden">
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 p-2 rounded-md transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {isEditing && (
            <div
              className={cn(
                "p-4 border-t print:hidden",
                variant === "minimal"
                  ? "border-zinc-200 dark:border-zinc-800"
                  : styles.blockBg,
              )}
            >
              <button
                onClick={addItem}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors cursor-pointer px-2 py-1",
                  theme.text,
                )}
              >
                <Plus className="w-4 h-4" /> Add Line Item
              </button>
            </div>
          )}
        </section>

        {/* TOTALS & FOOTER */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          <div className="order-2 md:order-1">
            <div className={cn("p-4 rounded-xl mb-4", styles.blockBg)}>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 block">
                Salesperson
              </span>
              <EditableInput
                value={data.salesPerson}
                onChange={(e: any) =>
                  handleMainChange("salesPerson", e.target.value)
                }
                className="font-semibold text-zinc-900 dark:text-zinc-100"
              />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2 block">
                Additional Notes
              </span>
              {isEditing ? (
                <textarea
                  value={data.note}
                  onChange={(e) => handleMainChange("note", e.target.value)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 outline-none resize-none text-sm text-zinc-600 dark:text-zinc-400 focus:ring-2",
                    styles.inputBg,
                    theme.focusRing,
                  )}
                  rows={3}
                />
              ) : (
                <p
                  className={cn(
                    "text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed p-3 rounded-lg",
                    styles.blockBg,
                  )}
                >
                  {data.note}
                </p>
              )}
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-end">
            <div className="w-full sm:w-72 space-y-3 text-sm">
              <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                <span>Subtotal</span>
                <EditableInput
                  value={data.subtotal}
                  onChange={(e: any) =>
                    handleMainChange("subtotal", e.target.value)
                  }
                  align="right"
                  className="font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                <span>Discount</span>
                <EditableInput
                  value={data.discount}
                  onChange={(e: any) =>
                    handleMainChange("discount", e.target.value)
                  }
                  align="right"
                  className="font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400 pb-4 border-b border-zinc-200 dark:border-zinc-800">
                <span>Tax</span>
                <EditableInput
                  value={data.tax}
                  onChange={(e: any) => handleMainChange("tax", e.target.value)}
                  align="right"
                  className="font-medium text-zinc-900 dark:text-zinc-100"
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  Total
                </span>
                {isEditing ? (
                  <input
                    value={data.grandTotal}
                    onChange={(e) =>
                      handleMainChange("grandTotal", e.target.value)
                    }
                    className={cn(
                      "w-32 rounded-md px-3 py-1 outline-none text-right font-bold text-lg focus:ring-2 transition-all",
                      theme.lightBg,
                      theme.border,
                      theme.focusRing,
                      theme.text,
                    )}
                  />
                ) : (
                  <span className={cn("font-bold text-2xl", theme.text)}>
                    {data.grandTotal}
                  </span>
                )}
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* === RIGHT SIDEBAR / ACTIONS === */}
      <aside className="w-full lg:w-[280px] flex-shrink-0 print:hidden h-fit lg:sticky top-8">
        <div
          className={cn(
            "p-5 space-y-4 transition-colors duration-300",
            styles.sidebarCard,
          )}
        >
          <button
            onClick={() => alert("Invoice Sent!")}
            className={cn(
              "cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98] shadow-sm",
              theme.bg,
            )}
          >
            <Send className="w-4 h-4" /> Send Invoice
          </button>

          <button
            onClick={handleDownload}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all active:scale-[0.98]"
          >
            Download JSON
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handlePrint}
              className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-zinc-100 text-zinc-700 rounded-xl text-sm font-medium hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 transition-all active:scale-[0.98]"
            >
              Print
            </button>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98]",
                isEditing
                  ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700",
              )}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" /> Save
                </>
              ) : (
                "Edit"
              )}
            </button>
          </div>
        </div>

        <div
          className={cn(
            "mt-4 p-5 transition-colors duration-300",
            styles.sidebarCard,
          )}
        >
          <button
            className={cn(
              "cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98] shadow-sm",
              theme.bg,
            )}
          >
            <DollarSign className="w-4 h-4" /> Add Payment
          </button>
        </div>
      </aside>
    </div>
  );
}
