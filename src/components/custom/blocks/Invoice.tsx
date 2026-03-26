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

  return (
    // FIX 2 & 3: Changed md:flex-row to lg:flex-row and removed min-h-screen
    <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 bg-gray-50 dark:bg-gray-950 font-sans transition-colors duration-200">
      {/* MAIN INVOICE AREA */}
      {/* FIX 1: Added min-w-0 to prevent flex blowout */}
      <div className="flex-1 min-w-0 bg-white dark:bg-gray-900 p-5 sm:p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 print:shadow-none print:border-none print:p-0">
        <header className="flex flex-col sm:flex-row justify-between items-start mb-10 gap-6">
          <div className="flex gap-3">
            <Heart className="w-10 h-10 text-[#7367f0] shrink-0" />
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Vuexy
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 max-w-[200px] leading-relaxed">
                Office 149, 450 South Brand Brooklyn San Diego County, CA 91905,
                USA
                <br />
                +1 (123) 456 7891, +44 (876) 543 2198
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xl font-medium text-gray-900 dark:text-white flex items-center sm:justify-end gap-2 mb-2">
              Invoice
              {isEditing ? (
                <input
                  type="text"
                  value={data.invoiceNumber}
                  onChange={(e) =>
                    handleMainChange("invoiceNumber", e.target.value)
                  }
                  className="font-semibold bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 w-24 text-right outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span className="font-semibold">{data.invoiceNumber}</span>
              )}
            </div>

            <div className="text-xs text-gray-500 dark:text-gray-400 grid grid-cols-[auto,1fr] sm:grid-cols-[1fr,auto] gap-x-3 gap-y-2 items-center">
              <span className="text-gray-700 dark:text-gray-300">
                Date Issued:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={data.dateIssued}
                  onChange={(e) =>
                    handleMainChange("dateIssued", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span>{data.dateIssued}</span>
              )}

              <span className="text-gray-700 dark:text-gray-300">
                Date Due:
              </span>
              {isEditing ? (
                <input
                  type="text"
                  value={data.dateDue}
                  onChange={(e) => handleMainChange("dateDue", e.target.value)}
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span>{data.dateDue}</span>
              )}
            </div>
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 mb-10 text-xs">
          {/* INVOICE TO */}
          <div>
            <h2 className="text-gray-600 dark:text-gray-400 font-medium mb-3 text-sm">
              Invoice To:
            </h2>
            {isEditing ? (
              <div className="space-y-2">
                <input
                  value={data.invoiceTo.name}
                  onChange={(e) =>
                    handleNestedChange("invoiceTo", "name", e.target.value)
                  }
                  placeholder="Name"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
                <input
                  value={data.invoiceTo.company}
                  onChange={(e) =>
                    handleNestedChange("invoiceTo", "company", e.target.value)
                  }
                  placeholder="Company"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
                <input
                  value={data.invoiceTo.address}
                  onChange={(e) =>
                    handleNestedChange("invoiceTo", "address", e.target.value)
                  }
                  placeholder="Address"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
                <input
                  value={data.invoiceTo.phone}
                  onChange={(e) =>
                    handleNestedChange("invoiceTo", "phone", e.target.value)
                  }
                  placeholder="Phone"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
                <input
                  value={data.invoiceTo.email}
                  onChange={(e) =>
                    handleNestedChange("invoiceTo", "email", e.target.value)
                  }
                  placeholder="Email"
                  className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              </div>
            ) : (
              <div className="space-y-1">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  {data.invoiceTo.name}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {data.invoiceTo.company}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {data.invoiceTo.address}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {data.invoiceTo.phone}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  {data.invoiceTo.email}
                </p>
              </div>
            )}
          </div>

          {/* BILL TO */}
          <div>
            <h2 className="text-gray-600 dark:text-gray-400 font-medium mb-3 text-sm">
              Bill To:
            </h2>
            <div className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-2 text-gray-700 dark:text-gray-300 items-center">
              <span className="font-medium text-gray-600 dark:text-gray-400">
                Total Due:
              </span>
              {isEditing ? (
                <input
                  value={data.billTo.totalDue}
                  onChange={(e) =>
                    handleNestedChange("billTo", "totalDue", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0] font-semibold text-gray-900 dark:text-white"
                />
              ) : (
                <span className="font-semibold text-gray-900 dark:text-white text-sm">
                  {data.billTo.totalDue}
                </span>
              )}

              <span className="font-medium text-gray-600 dark:text-gray-400 mt-1">
                Bank name:
              </span>
              {isEditing ? (
                <input
                  value={data.billTo.bankName}
                  onChange={(e) =>
                    handleNestedChange("billTo", "bankName", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span>{data.billTo.bankName}</span>
              )}

              <span className="font-medium text-gray-600 dark:text-gray-400">
                Country:
              </span>
              {isEditing ? (
                <input
                  value={data.billTo.country}
                  onChange={(e) =>
                    handleNestedChange("billTo", "country", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span>{data.billTo.country}</span>
              )}

              <span className="font-medium text-gray-600 dark:text-gray-400">
                IBAN:
              </span>
              {isEditing ? (
                <input
                  value={data.billTo.iban}
                  onChange={(e) =>
                    handleNestedChange("billTo", "iban", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span>{data.billTo.iban}</span>
              )}

              <span className="font-medium text-gray-600 dark:text-gray-400">
                SWIFT code:
              </span>
              {isEditing ? (
                <input
                  value={data.billTo.swift}
                  onChange={(e) =>
                    handleNestedChange("billTo", "swift", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0]"
                />
              ) : (
                <span>{data.billTo.swift}</span>
              )}
            </div>
          </div>
        </section>

        {/* ITEMS TABLE - Responsive Wrapper */}
        <section className="mb-10 overflow-x-auto">
          <table className="w-full min-w-[500px] text-left text-xs text-gray-800 dark:text-gray-200 border-collapse">
            <thead className="text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              <tr>
                <th className="px-2 sm:px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800">
                  Item
                </th>
                <th className="px-2 sm:px-4 py-3 font-semibold border-b border-gray-100 dark:border-gray-800 hidden sm:table-cell">
                  Description
                </th>
                <th className="px-2 sm:px-4 py-3 font-semibold text-right border-b border-gray-100 dark:border-gray-800">
                  Hours
                </th>
                <th className="px-2 sm:px-4 py-3 font-semibold text-right border-b border-gray-100 dark:border-gray-800">
                  Qty
                </th>
                <th className="px-2 sm:px-4 py-3 font-semibold text-right border-b border-gray-100 dark:border-gray-800">
                  Total
                </th>
                {isEditing && (
                  <th className="px-2 py-3 font-semibold border-b border-gray-100 dark:border-gray-800 text-center print:hidden">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.items.map((item, idx) => (
                <tr key={idx} className="group">
                  <td className="px-2 sm:px-4 py-4 border-b border-gray-100 dark:border-gray-800 align-top">
                    {isEditing ? (
                      <input
                        value={item.item}
                        onChange={(e) =>
                          handleItemChange(idx, "item", e.target.value)
                        }
                        className="w-full sm:w-32 lg:w-40 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none"
                      />
                    ) : (
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.item}
                      </p>
                    )}
                    {!isEditing && (
                      <p className="sm:hidden text-gray-500 mt-1">
                        {item.description}
                      </p>
                    )}
                  </td>

                  <td className="px-2 sm:px-4 py-4 border-b border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 hidden sm:table-cell align-top">
                    {isEditing ? (
                      <textarea
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(idx, "description", e.target.value)
                        }
                        rows={2}
                        className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none resize-none"
                      />
                    ) : (
                      item.description
                    )}
                  </td>

                  <td className="px-2 sm:px-4 py-4 border-b border-gray-100 dark:border-gray-800 text-right align-top">
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.hours}
                        onChange={(e) =>
                          handleItemChange(idx, "hours", e.target.value)
                        }
                        className="w-12 sm:w-16 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right"
                      />
                    ) : (
                      item.hours
                    )}
                  </td>

                  <td className="px-2 sm:px-4 py-4 border-b border-gray-100 dark:border-gray-800 text-right align-top">
                    {isEditing ? (
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          handleItemChange(idx, "qty", e.target.value)
                        }
                        className="w-12 sm:w-16 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right"
                      />
                    ) : (
                      item.qty
                    )}
                  </td>

                  <td className="px-2 sm:px-4 py-4 border-b border-gray-100 dark:border-gray-800 text-right text-gray-900 dark:text-white font-medium align-top">
                    {isEditing ? (
                      <input
                        value={item.total}
                        onChange={(e) =>
                          handleItemChange(idx, "total", e.target.value)
                        }
                        className="w-16 sm:w-20 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right font-semibold"
                      />
                    ) : (
                      item.total
                    )}
                  </td>

                  {isEditing && (
                    <td className="px-2 py-4 border-b border-gray-100 dark:border-gray-800 text-center align-top print:hidden">
                      <button
                        onClick={() => removeItem(idx)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
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
            <div className="mt-4 print:hidden">
              <button
                onClick={addItem}
                className="flex items-center gap-2 text-xs font-medium text-[#7367f0] hover:text-[#6355eb] transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
          )}
        </section>

        {/* TOTALS & FOOTER */}
        <footer className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 items-end text-xs">
          <div className="order-2 sm:order-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Salesperson:
              </span>
              {isEditing ? (
                <input
                  value={data.salesPerson}
                  onChange={(e) =>
                    handleMainChange("salesPerson", e.target.value)
                  }
                  className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none focus:border-[#7367f0] font-semibold text-gray-900 dark:text-white"
                />
              ) : (
                <span className="font-semibold text-gray-900 dark:text-white">
                  {data.salesPerson}
                </span>
              )}
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Thanks for your business
            </p>
          </div>

          <div className="text-right order-1 sm:order-2">
            <div className="grid grid-cols-[1fr,auto] gap-x-4 gap-y-2 text-gray-700 dark:text-gray-300 items-center">
              <span>Subtotal:</span>
              {isEditing ? (
                <input
                  value={data.subtotal}
                  onChange={(e) => handleMainChange("subtotal", e.target.value)}
                  className="w-20 sm:w-24 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right font-medium"
                />
              ) : (
                <span className="font-medium text-gray-900 dark:text-white">
                  {data.subtotal}
                </span>
              )}

              <span>Discount:</span>
              {isEditing ? (
                <input
                  value={data.discount}
                  onChange={(e) => handleMainChange("discount", e.target.value)}
                  className="w-20 sm:w-24 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right font-medium"
                />
              ) : (
                <span className="font-medium text-gray-900 dark:text-white">
                  {data.discount}
                </span>
              )}

              <span>Tax:</span>
              {isEditing ? (
                <input
                  value={data.tax}
                  onChange={(e) => handleMainChange("tax", e.target.value)}
                  className="w-20 sm:w-24 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right font-medium"
                />
              ) : (
                <span className="font-medium text-gray-900 dark:text-white">
                  {data.tax}
                </span>
              )}
            </div>
            <hr className="my-4 border-gray-100 dark:border-gray-800" />
            <div className="flex justify-end items-center gap-4 text-base font-medium text-gray-900 dark:text-white">
              <span>Total:</span>
              {isEditing ? (
                <input
                  value={data.grandTotal}
                  onChange={(e) =>
                    handleMainChange("grandTotal", e.target.value)
                  }
                  className="w-24 sm:w-32 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-2 py-1 outline-none text-right font-bold text-[#7367f0]"
                />
              ) : (
                <span className="font-bold">{data.grandTotal}</span>
              )}
            </div>
          </div>
        </footer>

        {/* BOTTOM NOTE */}
        <div className="mt-10 w-full pt-6 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 dark:text-gray-400">
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            Note:{" "}
          </span>
          {isEditing ? (
            <textarea
              value={data.note.replace("Note: ", "")}
              onChange={(e) =>
                handleMainChange("note", `Note: ${e.target.value}`)
              }
              className="w-full mt-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 outline-none resize-none"
              rows={2}
            />
          ) : (
            <span>{data.note.replace("Note: ", "")}</span>
          )}
        </div>
      </div>

      {/* --- RIGHT SIDEBAR / ACTIONS --- */}
      <aside className="w-full lg:w-[280px] flex-shrink-0 bg-white dark:bg-gray-900 p-5 rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 print:hidden h-fit lg:sticky top-6">
        <div className="space-y-4">
          <button
            onClick={() => alert("Invoice Sent!")}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 bg-[#7367f0] text-white rounded-md text-sm font-medium hover:bg-[#6c5fef] transition-all active:scale-[0.98] shadow-sm"
          >
            <Send className="w-4 h-4" /> Send Invoice
          </button>

          <button
            onClick={handleDownload}
            className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
          >
            Download JSON
          </button>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handlePrint}
              className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-all active:scale-[0.98]"
            >
              Print
            </button>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all active:scale-[0.98] ${
                isEditing
                  ? "bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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

          <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-2.5 bg-[#28c76f] text-white rounded-md text-sm font-medium hover:bg-[#25c069] transition-all active:scale-[0.98] shadow-sm">
            <DollarSign className="w-4 h-4" /> Add Payment
          </button>
        </div>
      </aside>
    </div>
  );
}
