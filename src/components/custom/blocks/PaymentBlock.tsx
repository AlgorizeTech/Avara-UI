"use client";
import { useState } from "react";
import { ComponentCard } from "../ui/base";
import { SelectBlock } from "./SelectBlock";

const MONTH_OPTIONS = [
  { label: "January", value: "January" },
  { label: "February", value: "February" },
  { label: "March", value: "March" },
];

const YEAR_OPTIONS = [
  { label: "2026", value: "2026" },
  { label: "2027", value: "2027" },
  { label: "2028", value: "2028" },
];

export function PaymentBlock() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2026");

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => setIsSubmitting(false), 1500); // Simulate network request
  };

  return (
    <ComponentCard>
      <div className="flex flex-col space-y-1.5 p-6 pb-4">
        <h3 className="font-semibold leading-none tracking-tight">Payment Method</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">All transactions are secure and encrypted.</p>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Name on Card</label>
          <input className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-text" placeholder="John Doe" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 space-y-2">
            <label className="text-sm font-medium">Card Number</label>
            <input className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-text" placeholder="1234 5678 9012 3456" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">CVV</label>
            <input className="flex h-9 w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus:border-zinc-400 dark:focus:border-zinc-500 focus:outline-none cursor-text" placeholder="123" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Month</label>
            <SelectBlock
              options={MONTH_OPTIONS}
              value={month}
              onChange={setMonth}
              inputSize="sm"
              placeholder="Select month"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Year</label>
            <SelectBlock
              options={YEAR_OPTIONS}
              value={year}
              onChange={setYear}
              inputSize="sm"
              placeholder="Select year"
            />
          </div>
        </div>
        <button onClick={handleSubmit} disabled={isSubmitting} className="mt-2 w-full inline-flex h-9 items-center justify-center rounded-md bg-zinc-900 dark:bg-zinc-50 text-sm font-medium text-white dark:text-zinc-900 shadow transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
          {isSubmitting ? (
            <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : "Save Payment Method"}
        </button>
      </div>
    </ComponentCard>
  );
}