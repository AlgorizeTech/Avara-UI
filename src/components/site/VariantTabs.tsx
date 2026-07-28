"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface VariantOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface VariantTabsProps {
  variants: (string | VariantOption)[];
  defaultValue?: string;
  label?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

function normalize(v: string | VariantOption): VariantOption {
  return typeof v === "string" ? { value: v, label: v } : v;
}

export function VariantTabs({
  variants,
  defaultValue,
  label = "Variant",
  className,
  onValueChange,
}: VariantTabsProps) {
  const options = variants.map(normalize);
  const [selected, setSelected] = useState<string>(
    defaultValue ?? options[0]?.value ?? ""
  );

  useEffect(() => {
    document.body.setAttribute("data-active-variant", selected);
    return () => document.body.removeAttribute("data-active-variant");
  }, [selected]);

  const handleChange = useCallback(
    (value: string) => {
      setSelected(value);
      onValueChange?.(value);
    },
    [onValueChange]
  );

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
        {label}
      </label>
      <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-xl w-max border border-zinc-200 dark:border-white/5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => handleChange(opt.value)}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-lg capitalize transition-all cursor-pointer",
              selected === opt.value
                ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            )}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
