"use client";
import React from "react";

export function ComponentCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md hover:border-border overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function ToggleSwitch({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-9 h-5 rounded-full flex items-center p-0.5 cursor-pointer transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
        active ? "bg-primary" : "bg-foreground/15"
      }`}
    >
      <div className={`size-4 rounded-full bg-background shadow-sm transform transition-transform duration-200 ${active ? "translate-x-4" : "translate-x-0"}`} />
    </button>
  );
}