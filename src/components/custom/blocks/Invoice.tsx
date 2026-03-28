"use client";

import { DollarSign, Heart, Plus, Save, Send, Trash2 } from "lucide-react";
import { useState } from "react";

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

export default function Invoice({ invoiceData }: { invoiceData: InvoiceData }) {
  const [data, setData] = useState<InvoiceData>(invoiceData);
  const [isEditing, setIsEditing] = useState(false);

  const handleMainChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (
    section: "invoiceTo" | "billTo",
    field: string,
    value: string,
  ) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string,
  ) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setData({ ...data, items: newItems });
  };

  const addItem = () => {
    setData({
      ...data,
      items: [
        ...data.items,
        { item: "", description: "", hours: 0, qty: 1, total: "$0" },
      ],
    });
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData({ ...data, items: newItems });
  };

  const handlePrint = () => {
    window.print();
  };

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

  // Custom Input Component to keep things dry and looking premium
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
        className={`w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#7367f0]/20 focus:border-[#7367f0] transition-all text-${align} ${className}`}
      />
    ) : (
      <span className={`block ${className}`}>{value}</span>
    );

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 lg:p-8 bg-zinc-50 dark:bg-zinc-950/50 min-h-[800px] font-sans transition-colors duration-200">
      {/* === MAIN INVOICE AREA === */}
      <div className="flex-1 min-w-0 bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 print:shadow-none print:border-none print:p-0">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start mb-12 gap-8">
          {/* Brand */}
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl shrink-0">
              <Heart className="w-8 h-8 text-[#7367f0] fill-[#7367f0]/20" />
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

          {/* Invoice Meta */}
          <div className="w-full sm:w-auto bg-zinc-50 dark:bg-zinc-950/50 p-5 rounded-xl border border-zinc-100 dark:border-zinc-800/50">
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
                  className="font-bold text-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md px-3 py-1 w-28 text-right outline-none focus:ring-2 focus:ring-[#7367f0]/20 focus:border-[#7367f0] transition-all text-zinc-900 dark:text-zinc-100"
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
          {/* Invoice To */}
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

          {/* Payment Details */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-3 block">
              Payment Details
            </span>
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800/50 space-y-3 text-sm">
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
                  className="font-bold text-lg text-[#7367f0]"
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
        <section className="mb-10 overflow-x-auto border border-zinc-200 dark:border-zinc-800 rounded-xl">
          <table className="w-full min-w-[600px] text-left text-sm text-zinc-800 dark:text-zinc-200 border-collapse">
            <thead className="bg-zinc-50 dark:bg-zinc-950/50 text-zinc-500 dark:text-zinc-400 uppercase tracking-wider text-[10px] font-bold border-b border-zinc-200 dark:border-zinc-800">
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
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {data.items.map((item, idx) => (
                <tr
                  key={idx}
                  className="group hover:bg-zinc-50/50 dark:hover:bg-zinc-950/20 transition-colors"
                >
                  <td className="px-4 py-4 align-top">
                    {isEditing ? (
                      <div className="space-y-2">
                        <input
                          value={item.item}
                          onChange={(e) =>
                            handleItemChange(idx, "item", e.target.value)
                          }
                          placeholder="Item Name"
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 outline-none focus:ring-2 focus:ring-[#7367f0]/20 font-medium"
                        />
                        <textarea
                          value={item.description}
                          onChange={(e) =>
                            handleItemChange(idx, "description", e.target.value)
                          }
                          rows={2}
                          placeholder="Description"
                          className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-1.5 outline-none resize-none text-xs text-zinc-500"
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
                        className="text-red-400 hover:text-red-600 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 p-2 rounded-md transition-colors"
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
            <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/30 print:hidden">
              <button
                onClick={addItem}
                className="flex items-center gap-2 text-sm font-medium text-[#7367f0] hover:text-[#6355eb] transition-colors cursor-pointer px-2 py-1"
              >
                <Plus className="w-4 h-4" /> Add Line Item
              </button>
            </div>
          )}
        </section>

        {/* TOTALS & FOOTER */}
        <footer className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
          {/* Notes */}
          <div className="order-2 md:order-1">
            <div className="bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/50 mb-4">
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
                  className="w-full bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-md px-3 py-2 outline-none resize-none text-sm text-zinc-600 dark:text-zinc-400 focus:ring-2 focus:ring-[#7367f0]/20"
                  rows={3}
                />
              ) : (
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-transparent p-3 dark:p-0 rounded-lg">
                  {data.note}
                </p>
              )}
            </div>
          </div>

          {/* Calculations */}
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
                    className="w-32 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-md px-3 py-1 outline-none text-right font-bold text-[#7367f0] text-lg focus:ring-2 focus:ring-[#7367f0]/20"
                  />
                ) : (
                  <span className="font-bold text-2xl text-[#7367f0]">
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
        <div className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 space-y-4">
          <button
            onClick={() => alert("Invoice Sent!")}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-[#7367f0] text-white rounded-xl text-sm font-medium hover:bg-[#6c5fef] transition-all active:scale-[0.98] shadow-sm shadow-[#7367f0]/20"
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
              className={`cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all active:scale-[0.98] ${
                isEditing
                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-500/10 dark:text-green-400"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              }`}
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

        <div className="mt-4 bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 bg-[#28c76f] text-white rounded-xl text-sm font-medium hover:bg-[#25c069] transition-all active:scale-[0.98] shadow-sm shadow-[#28c76f]/20">
            <DollarSign className="w-4 h-4" /> Add Payment
          </button>
        </div>
      </aside>
    </div>
  );
}
