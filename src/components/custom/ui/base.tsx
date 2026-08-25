"use client";
import React from "react";

export function ComponentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-white dark:bg-[#09090b] shadow-sm transition-all duration-300 hover:shadow-md hover:border-border overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function ToggleSwitch({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-9 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#09090b] ${
        active ? "bg-zinc-900 dark:bg-zinc-50" : "bg-zinc-200 dark:bg-zinc-800"
      }`}
    >
      <div className={`size-4 rounded-full bg-background shadow-sm transform transition-transform duration-200 ${active ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
}