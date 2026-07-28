"use client";

import {
  SelectBlock,
  SelectColor,
  SelectSize,
  SelectVariant,
} from "@/components/custom/blocks/SelectBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import {
  Box,
  Code,
  Database,
  Layers,
  Paintbrush,
  Smartphone,
} from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const SELECT_ENGINE_CODE_TS = `"use client";

import React, { useState, useRef, useEffect, forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, AlertCircle, Check, Search, X } from "lucide-react";

export type SelectColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type SelectVariant = "default" | "filled" | "underlined" | "glow";
export type SelectSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { ring: "ring-indigo-500/30 border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 text-white", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500", glowWrapper: "shadow-[0_0_10px_rgba(99,102,241,0.2)] border-indigo-500/30" },
  rose: { ring: "ring-rose-500/30 border-rose-500", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 text-white", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500", glowWrapper: "shadow-[0_0_10px_rgba(244,63,94,0.2)] border-rose-500/30" },
  emerald: { ring: "ring-emerald-500/30 border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 text-white", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500", glowWrapper: "shadow-[0_0_10px_rgba(16,185,129,0.2)] border-emerald-500/30" },
  zinc: { ring: "ring-zinc-500/30 border-zinc-500 dark:ring-white/20 dark:border-white", text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white", glowWrapper: "shadow-[0_0_10px_rgba(255,255,255,0.1)] border-zinc-500/30 dark:border-white/30" },
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
      theme: { ring: "ring-[var(--theme-color)]/30 border-[var(--theme-color)]", text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]", glow: "shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] border-[var(--theme-color)]", glowWrapper: "shadow-[0_0_10px_rgba(var(--theme-color-rgb),0.2)] border-[rgba(var(--theme-color-rgb),0.3)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface SelectOption { label: string; value: string; icon?: React.ElementType; group?: string; }
export interface SelectBlockProps { options: SelectOption[]; value?: string | string[]; onChange?: (value: any) => void; placeholder?: string; variant?: SelectVariant; color?: SelectColor; inputSize?: SelectSize; label?: string; helperText?: string; error?: string; icon?: React.ReactNode; disabled?: boolean; className?: string; multiple?: boolean; searchable?: boolean; }

export const SelectBlock = forwardRef<HTMLDivElement, SelectBlockProps>(({ options = [], value, onChange, placeholder = "Select an option", variant = "default", color = "indigo", inputSize = "md", label, helperText, error, icon, disabled = false, className, multiple = false, searchable = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { theme, style } = getThemeStyles(color as string);

  const hasError = Boolean(error);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [options, searchQuery]);

  const groupedOptions = useMemo(() => {
    return filteredOptions.reduce((acc, opt) => {
      const group = opt.group || "ungrouped";
      if (!acc[group]) acc[group] = [];
      acc[group].push(opt);
      return acc;
    }, {} as Record<string, SelectOption[]>);
  }, [filteredOptions]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) setTimeout(() => searchInputRef.current?.focus(), 50);
    if (!isOpen) setSearchQuery("");
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => { if (selectRef.current && !selectRef.current.contains(event.target as Node)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optValue) ? currentValues.filter((v) => v !== optValue) : [...currentValues, optValue];
      if (onChange) onChange(newValues);
    } else {
      if (onChange) onChange(optValue);
      setIsOpen(false);
    }
  };

  const handleRemoveTag = (optValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) if (onChange) onChange(value.filter((v) => v !== optValue));
  };

  const sizeClasses = {
    sm: { wrapper: "min-h-9 px-3 py-1.5", text: "text-xs", icon: "w-3.5 h-3.5", option: "px-3 py-2 text-xs", tag: "px-1.5 py-0.5 text-[10px]" },
    md: { wrapper: "min-h-11 px-4 py-2.5", text: "text-sm", icon: "w-4 h-4", option: "px-4 py-2.5 text-sm", tag: "px-2 py-1 text-xs" },
    lg: { wrapper: "min-h-14 px-5 py-3.5", text: "text-base", icon: "w-5 h-5", option: "px-5 py-3 text-base", tag: "px-2.5 py-1 text-sm" },
  };
  const s = sizeClasses[inputSize || "md"];

  const getVariantStyles = () => {
    const baseWrapper = cn("relative flex items-center justify-between w-full transition-all duration-300 cursor-pointer outline-none", s.wrapper);
    if (disabled) return { wrapper: cn(baseWrapper, "opacity-50 cursor-not-allowed border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"), active: "" };
    if (hasError) return { wrapper: cn(baseWrapper, "border border-red-500 bg-white dark:bg-[#09090b]", variant === "underlined" && "border-0 border-b-2 rounded-none", variant !== "underlined" && "rounded-xl"), active: "ring-4 ring-red-500/10" };
    switch (variant) {
      case "filled": return { wrapper: cn(baseWrapper, "bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-xl"), active: cn("bg-white dark:bg-zinc-950 ring-4", theme.ring) };
      case "underlined": return { wrapper: cn(baseWrapper, "border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-none px-0"), active: theme.ring.split(" ")[1] };
      case "glow": return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border rounded-xl", theme.glowWrapper), active: theme.glow };
      case "default": default: return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"), active: cn("ring-4", theme.ring) };
    }
  };
  const styles = getVariantStyles();

  const renderSelectedContent = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex flex-wrap items-center gap-1.5 w-full pr-6 overflow-hidden">
          {value.map((val) => {
            const opt = options.find((o) => o.value === val);
            if (!opt) return null;
            return (
              <span key={val} onClick={(e) => handleRemoveTag(val, e)} className={cn("inline-flex items-center gap-1 font-semibold rounded-md border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-colors", s.tag, theme.bgSoft)}>
                {opt.label}
                <X className={cn("shrink-0 hover:text-red-500", s.icon)} style={{ width: "0.8em", height: "0.8em" }} />
              </span>
            );
          })}
        </div>
      );
    }
    const singleOption = options.find((opt) => opt.value === value);
    return <span className={cn("truncate pr-6", s.text, !singleOption ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-900 dark:text-zinc-100")}>{singleOption ? singleOption.label : placeholder}</span>;
  };

  return (
    <div ref={selectRef} className={cn("flex flex-col gap-1.5 w-full relative", className)} style={style}>
      {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300", disabled && "opacity-50")}>{label}</label>}
      <button type="button" disabled={disabled} onClick={() => setIsOpen(!isOpen)} className={cn(styles.wrapper, isOpen && styles.active, multiple && Array.isArray(value) && value.length > 0 && "py-1.5")}>
        <div className="flex items-center gap-2 overflow-hidden w-full">
          {icon && <div className={cn("shrink-0 text-zinc-400 dark:text-zinc-500", isOpen && theme.text)}>{icon}</div>}
          {renderSelectedContent()}
        </div>
        <div className="absolute right-4 flex items-center gap-2 shrink-0 bg-transparent">
          {hasError && <AlertCircle className={cn(s.icon, "text-red-500")} />}
          <ChevronDown className={cn(s.icon, "text-zinc-400 dark:text-zinc-500 transition-transform duration-300", isOpen && "rotate-180", isOpen && theme.text)} />
        </div>
      </button>
      <div className={cn("absolute left-0 right-0 z-50 overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl transition-all duration-200 ease-out origin-top", variant === "underlined" ? "top-[100%]" : "top-[calc(100%+8px)]", isOpen ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none")}>
        {searchable && (
          <div className="p-2 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input ref={searchInputRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onClick={(e) => e.stopPropagation()} placeholder="Search options..." className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:border-transparent transition-all" style={{ '--tw-ring-color': \`var(--theme-color)\` } as any} />
            </div>
          </div>
        )}
        <div className="max-h-60 overflow-y-auto p-1 flex flex-col gap-0.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {Object.keys(groupedOptions).length === 0 ? (
            <div className="px-4 py-3 text-sm text-zinc-500 text-center">No results found</div>
          ) : (
            Object.entries(groupedOptions).map(([group, opts]) => (
              <div key={group} className="flex flex-col gap-0.5">
                {group !== "ungrouped" && <div className="px-3 py-2 mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{group}</div>}
                {opts.map((opt) => {
                  const isSelected = multiple && Array.isArray(value) ? value.includes(opt.value) : value === opt.value;
                  const OptIcon = opt.icon;
                  return (
                    <button key={opt.value} type="button" onClick={(e) => handleSelect(opt.value, e)} className={cn("w-full flex items-center justify-between rounded-lg transition-colors font-medium text-left cursor-pointer active:scale-[0.98]", s.option, isSelected ? theme.bgSoft : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900")}>
                      <div className="flex items-center gap-2">
                        {multiple && <div className={cn("w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors", isSelected ? cn(theme.bg, "border-transparent") : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900")}>{isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</div>}
                        {OptIcon && <OptIcon className={s.icon} />}<span>{opt.label}</span>
                      </div>
                      {isSelected && !multiple && <Check className={cn(s.icon, theme.text)} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
      {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
      {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
    </div>
  );
});
SelectBlock.displayName = "SelectBlock";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const SELECT_ENGINE_CODE_JS = `"use client";

import React, { useState, useRef, useEffect, forwardRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, AlertCircle, Check, Search, X } from "lucide-react";

const colorThemes = {
  indigo: { ring: "ring-indigo-500/30 border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 text-white", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100", glow: "shadow-[0_0_20px_rgba(99,102,241,0.4)] border-indigo-500", glowWrapper: "shadow-[0_0_10px_rgba(99,102,241,0.2)] border-indigo-500/30" },
  rose: { ring: "ring-rose-500/30 border-rose-500", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 text-white", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100", glow: "shadow-[0_0_20px_rgba(244,63,94,0.4)] border-rose-500", glowWrapper: "shadow-[0_0_10px_rgba(244,63,94,0.2)] border-rose-500/30" },
  emerald: { ring: "ring-emerald-500/30 border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 text-white", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100", glow: "shadow-[0_0_20px_rgba(16,185,129,0.4)] border-emerald-500", glowWrapper: "shadow-[0_0_10px_rgba(16,185,129,0.2)] border-emerald-500/30" },
  zinc: { ring: "ring-zinc-500/30 border-zinc-500 dark:ring-white/20 dark:border-white", text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", glow: "shadow-[0_0_20px_rgba(255,255,255,0.15)] border-zinc-900 dark:border-white", glowWrapper: "shadow-[0_0_10px_rgba(255,255,255,0.1)] border-zinc-500/30 dark:border-white/30" },
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
      theme: { ring: "ring-[var(--theme-color)]/30 border-[var(--theme-color)]", text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white hover:opacity-90", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)] hover:bg-[rgba(var(--theme-color-rgb),0.2)]", glow: "shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] border-[var(--theme-color)]", glowWrapper: "shadow-[0_0_10px_rgba(var(--theme-color-rgb),0.2)] border-[rgba(var(--theme-color-rgb),0.3)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export const SelectBlock = forwardRef(({ options = [], value, onChange, placeholder = "Select an option", variant = "default", color = "indigo", inputSize = "md", label, helperText, error, icon, disabled = false, className, multiple = false, searchable = false }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const selectRef = useRef(null);
  const searchInputRef = useRef(null);
  const { theme, style } = getThemeStyles(color);

  const hasError = Boolean(error);

  const filteredOptions = useMemo(() => {
    if (!searchQuery) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [options, searchQuery]);

  const groupedOptions = useMemo(() => {
    return filteredOptions.reduce((acc, opt) => {
      const group = opt.group || "ungrouped";
      if (!acc[group]) acc[group] = [];
      acc[group].push(opt);
      return acc;
    }, {});
  }, [filteredOptions]);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) setTimeout(() => searchInputRef.current?.focus(), 50);
    if (!isOpen) setSearchQuery("");
  }, [isOpen, searchable]);

  useEffect(() => {
    const handleClickOutside = (event) => { if (selectRef.current && !selectRef.current.contains(event.target)) setIsOpen(false); };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optValue, e) => {
    e.stopPropagation();
    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optValue) ? currentValues.filter((v) => v !== optValue) : [...currentValues, optValue];
      if (onChange) onChange(newValues);
    } else {
      if (onChange) onChange(optValue);
      setIsOpen(false);
    }
  };

  const handleRemoveTag = (optValue, e) => {
    e.stopPropagation();
    if (multiple && Array.isArray(value)) if (onChange) onChange(value.filter((v) => v !== optValue));
  };

  const sizeClasses = {
    sm: { wrapper: "min-h-9 px-3 py-1.5", text: "text-xs", icon: "w-3.5 h-3.5", option: "px-3 py-2 text-xs", tag: "px-1.5 py-0.5 text-[10px]" },
    md: { wrapper: "min-h-11 px-4 py-2.5", text: "text-sm", icon: "w-4 h-4", option: "px-4 py-2.5 text-sm", tag: "px-2 py-1 text-xs" },
    lg: { wrapper: "min-h-14 px-5 py-3.5", text: "text-base", icon: "w-5 h-5", option: "px-5 py-3 text-base", tag: "px-2.5 py-1 text-sm" },
  };
  const s = sizeClasses[inputSize];

  const getVariantStyles = () => {
    const baseWrapper = cn("relative flex items-center justify-between w-full transition-all duration-300 cursor-pointer outline-none", s.wrapper);
    if (disabled) return { wrapper: cn(baseWrapper, "opacity-50 cursor-not-allowed border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"), active: "" };
    if (hasError) return { wrapper: cn(baseWrapper, "border border-red-500 bg-white dark:bg-[#09090b]", variant === "underlined" && "border-0 border-b-2 rounded-none", variant !== "underlined" && "rounded-xl"), active: "ring-4 ring-red-500/10" };
    switch (variant) {
      case "filled": return { wrapper: cn(baseWrapper, "bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-xl"), active: cn("bg-white dark:bg-zinc-950 ring-4", theme.ring) };
      case "underlined": return { wrapper: cn(baseWrapper, "border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-none px-0"), active: theme.ring.split(" ")[1] };
      case "glow": return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border rounded-xl", theme.glowWrapper), active: theme.glow };
      case "default": default: return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"), active: cn("ring-4", theme.ring) };
    }
  };
  const styles = getVariantStyles();

  const renderSelectedContent = () => {
    if (multiple && Array.isArray(value) && value.length > 0) {
      return (
        <div className="flex flex-wrap items-center gap-1.5 w-full pr-6 overflow-hidden">
          {value.map((val) => {
            const opt = options.find((o) => o.value === val);
            if (!opt) return null;
            return (
              <span key={val} onClick={(e) => handleRemoveTag(val, e)} className={cn("inline-flex items-center gap-1 font-semibold rounded-md border border-transparent hover:border-red-200 dark:hover:border-red-900 transition-colors", s.tag, theme.bgSoft)}>
                {opt.label}
                <X className={cn("shrink-0 hover:text-red-500", s.icon)} style={{ width: "0.8em", height: "0.8em" }} />
              </span>
            );
          })}
        </div>
      );
    }
    const singleOption = options.find((opt) => opt.value === value);
    return <span className={cn("truncate pr-6", s.text, !singleOption ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-900 dark:text-zinc-100")}>{singleOption ? singleOption.label : placeholder}</span>;
  };

  return (
    <div ref={selectRef} className={cn("flex flex-col gap-1.5 w-full relative", className)} style={style}>
      {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300", disabled && "opacity-50")}>{label}</label>}
      <button type="button" disabled={disabled} onClick={() => setIsOpen(!isOpen)} className={cn(styles.wrapper, isOpen && styles.active, multiple && Array.isArray(value) && value.length > 0 && "py-1.5")}>
        <div className="flex items-center gap-2 overflow-hidden w-full">
          {icon && <div className={cn("shrink-0 text-zinc-400 dark:text-zinc-500", isOpen && theme.text)}>{icon}</div>}
          {renderSelectedContent()}
        </div>
        <div className="absolute right-4 flex items-center gap-2 shrink-0 bg-transparent">
          {hasError && <AlertCircle className={cn(s.icon, "text-red-500")} />}
          <ChevronDown className={cn(s.icon, "text-zinc-400 dark:text-zinc-500 transition-transform duration-300", isOpen && "rotate-180", isOpen && theme.text)} />
        </div>
      </button>
      <div className={cn("absolute left-0 right-0 z-50 overflow-hidden bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl transition-all duration-200 ease-out origin-top", variant === "underlined" ? "top-[100%]" : "top-[calc(100%+8px)]", isOpen ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto" : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none")}>
        {searchable && (
          <div className="p-2 border-b border-zinc-100 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input ref={searchInputRef} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onClick={(e) => e.stopPropagation()} placeholder="Search options..." className="w-full pl-9 pr-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:ring-2 focus:border-transparent transition-all" style={{ '--tw-ring-color': \`var(--theme-color)\` }} />
            </div>
          </div>
        )}
        <div className="max-h-60 overflow-y-auto p-1 flex flex-col gap-0.5 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
          {Object.keys(groupedOptions).length === 0 ? (
            <div className="px-4 py-3 text-sm text-zinc-500 text-center">No results found</div>
          ) : (
            Object.entries(groupedOptions).map(([group, opts]) => (
              <div key={group} className="flex flex-col gap-0.5">
                {group !== "ungrouped" && <div className="px-3 py-2 mt-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">{group}</div>}
                {opts.map((opt) => {
                  const isSelected = multiple && Array.isArray(value) ? value.includes(opt.value) : value === opt.value;
                  const OptIcon = opt.icon;
                  return (
                    <button key={opt.value} type="button" onClick={(e) => handleSelect(opt.value, e)} className={cn("w-full flex items-center justify-between rounded-lg transition-colors font-medium text-left cursor-pointer active:scale-[0.98]", s.option, isSelected ? theme.bgSoft : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900")}>
                      <div className="flex items-center gap-2">
                        {multiple && <div className={cn("w-4 h-4 rounded-[4px] border flex items-center justify-center transition-colors", isSelected ? cn(theme.bg, "border-transparent") : "border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-900")}>{isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}</div>}
                        {OptIcon && <OptIcon className={s.icon} />}<span>{opt.label}</span>
                      </div>
                      {isSelected && !multiple && <Check className={cn(s.icon, theme.text)} strokeWidth={3} />}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
      {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
      {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
    </div>
  );
});
SelectBlock.displayName = "SelectBlock";`;

export function SelectShowcase() {
  const [variant, setVariant] = useState<SelectVariant>("default");
  const [inputSize, setInputSize] = useState<SelectSize>("md");
  const [showError, setShowError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMultiple, setIsMultiple] = useState(false);
  const [isSearchable, setIsSearchable] = useState(false);
  const [isGrouped, setIsGrouped] = useState(true);

  // Initialize with localStorage if available
  const [color, setColor] = useState<SelectColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

  // State for the preview component
  const [singleValue, setSingleValue] = useState<string>("");
  const [multiValue, setMultiValue] = useState<string[]>([]);

  const standardOptions = [
    { label: "Engineering", value: "eng", icon: Code },
    { label: "Design", value: "design", icon: Paintbrush },
    { label: "Marketing", value: "mkt" },
    { label: "Operations", value: "ops", icon: Box },
    { label: "Data Science", value: "data", icon: Database },
  ];

  const groupedOptions = [
    { label: "React", value: "react", icon: Code, group: "Frontend" },
    { label: "Vue", value: "vue", icon: Code, group: "Frontend" },
    { label: "Svelte", value: "svelte", icon: Code, group: "Frontend" },
    { label: "Node.js", value: "node", icon: Database, group: "Backend" },
    { label: "Python", value: "python", icon: Database, group: "Backend" },
    { label: "iOS (Swift)", value: "ios", icon: Smartphone, group: "Mobile" },
    {
      label: "Android (Kotlin)",
      value: "android",
      icon: Smartphone,
      group: "Mobile",
    },
  ];

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        options={options}\n        value={value}\n        onChange={setValue}\n        variant="${variant}"\n        color="${color}"\n        inputSize="${inputSize}"\n        label="Technologies"\n        placeholder="Select options..."`;

    if (showError)
      propsStr += `\n        error="Please select a valid option."`;
    else
      propsStr += `\n        helperText="Choose the technologies you want to learn."`;

    if (isDisabled) propsStr += `\n        disabled`;
    if (isMultiple) propsStr += `\n        multiple`;
    if (isSearchable) propsStr += `\n        searchable`;

    return `import { useState } from "react";
import { SelectBlock } from "@/components/custom/blocks/SelectBlock";
import { Code, Database } from "lucide-react";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

const options = [
  { label: "React", value: "react", icon: Code, group: "Frontend" },
  { label: "Node.js", value: "node", icon: Database, group: "Backend" },
];

export default function FormDemo() {
  const [value, setValue] = useState${isTs ? (isMultiple ? "<string[]>([])" : '("")') : isMultiple ? "([])" : '("")'};

  return (
    <div className="w-full max-w-sm">
      <SelectBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                ["default", "filled", "underlined", "glow"] as SelectVariant[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    variant === v
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Size
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["sm", "md", "lg"] as SelectSize[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setInputSize(s)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    inputSize === s
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Active Color" />

          {/* Features Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setIsMultiple(!isMultiple)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isMultiple
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Multi-Select
              </button>
              <button
                onClick={() => setIsSearchable(!isSearchable)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isSearchable
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Searchable
              </button>
              <button
                onClick={() => setIsGrouped(!isGrouped)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isGrouped
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Grouped
              </button>
              <button
                onClick={() => setShowError(!showError)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  showError
                    ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Error State
              </button>
              <button
                onClick={() => setIsDisabled(!isDisabled)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  isDisabled
                    ? "bg-zinc-200 border-zinc-300 text-zinc-600 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Disabled
              </button>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="SelectBlock"
        tsCode={SELECT_ENGINE_CODE_TS}
        jsCode={SELECT_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-start justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-sm mx-auto">
            <SelectBlock
              key={`${variant}-${color}-${inputSize}-${showError}-${isDisabled}-${isMultiple}-${isSearchable}-${isGrouped}`}
              options={isGrouped ? groupedOptions : standardOptions}
              value={isMultiple ? multiValue : singleValue}
              onChange={isMultiple ? setMultiValue : setSingleValue}
              variant={variant}
              color={color}
              inputSize={inputSize}
              multiple={isMultiple}
              searchable={isSearchable}
              disabled={isDisabled}
              icon={
                isGrouped ? (
                  <Layers
                    className={
                      inputSize === "sm"
                        ? "w-3.5 h-3.5"
                        : inputSize === "lg"
                          ? "w-5 h-5"
                          : "w-4 h-4"
                    }
                  />
                ) : undefined
              }
              label={isGrouped ? "Technologies" : "Department"}
              placeholder="Select an option..."
              helperText={
                !showError ? "Choose the options you wish to add." : undefined
              }
              error={
                showError
                  ? "Please select a valid option to proceed."
                  : undefined
              }
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
