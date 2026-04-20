"use client";

import {
  InputBlock,
  InputColor,
  InputSize,
  InputType,
  InputVariant,
} from "@/components/custom/blocks/InputBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Mail } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const INPUT_ENGINE_CODE_TS = `"use client";

import React, { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Search, UploadCloud, AlertCircle, ChevronDown } from "lucide-react";

export type InputColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type InputVariant = "default" | "filled" | "underlined" | "glow";
export type InputType = "text" | "email" | "password" | "search" | "file" | "textarea" | "select" | "checkbox" | "radio";
export type InputSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", borderFocus: "focus-within:border-indigo-500", glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500", accent: "accent-indigo-600 dark:accent-indigo-500" },
  rose: { ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500", text: "text-rose-600 dark:text-rose-400", borderFocus: "focus-within:border-rose-500", glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500", accent: "accent-rose-600 dark:accent-rose-500" },
  emerald: { ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", borderFocus: "focus-within:border-emerald-500", glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500", accent: "accent-emerald-600 dark:accent-emerald-500" },
  zinc: { ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white", text: "text-zinc-900 dark:text-zinc-100", borderFocus: "focus-within:border-zinc-900 dark:focus-within:border-white", glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white", accent: "accent-zinc-900 dark:accent-zinc-100" },
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
      theme: { ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]", text: "text-[var(--theme-color)]", borderFocus: "focus-within:border-[var(--theme-color)]", glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]", accent: "accent-[var(--theme-color)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface InputBlockProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, 'type' | 'size'> { type?: InputType; variant?: InputVariant; color?: InputColor; inputSize?: InputSize; label?: string; helperText?: string; error?: string; icon?: React.ReactNode; options?: { label: string; value: string }[]; rows?: number; }

export const InputBlock = forwardRef<any, InputBlockProps>(({ type = "text", variant = "default", color = "indigo", inputSize = "md", label, helperText, error, icon, options = [], className, rows = 4, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const { theme, style } = getThemeStyles(color);
  const inputType = type === "password" ? (showPassword ? "text" : "password") : type;
  const hasError = Boolean(error);

  const sizeClasses = {
    sm: { wrapper: "min-h-9", input: "text-xs px-3 py-1.5", icon: "w-3.5 h-3.5", paddingLeft: "pl-9" },
    md: { wrapper: "min-h-11", input: "text-sm px-4 py-2.5", icon: "w-4 h-4", paddingLeft: "pl-11" },
    lg: { wrapper: "min-h-14", input: "text-base px-5 py-3.5", icon: "w-5 h-5", paddingLeft: "pl-12" },
  };
  const s = sizeClasses[inputSize];

  const getVariantStyles = () => {
    const baseWrapper = cn("relative flex items-center w-full transition-all duration-300", s.wrapper);
    const baseInput = cn("w-full bg-transparent outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 appearance-none", s.input);
    if (hasError) return { wrapper: cn(baseWrapper, "border border-red-500 ring-4 ring-red-500/10 rounded-xl", variant === "underlined" && "border-0 border-b-2 rounded-none ring-0"), input: baseInput };
    switch (variant) {
      case "filled": return { wrapper: cn(baseWrapper, "bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-xl", theme.ring, "focus-within:bg-white dark:focus-within:bg-zinc-950"), input: baseInput };
      case "underlined": return { wrapper: cn(baseWrapper, "border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-none", theme.borderFocus), input: cn(baseInput, "px-0") };
      case "glow": return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm", theme.glow), input: baseInput };
      case "default": default: return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm ring-4 ring-transparent", theme.ring), input: baseInput };
    }
  };

  const styles = getVariantStyles();

  if (type === "file") {
    return (
      <div className={cn("flex flex-col gap-1.5 w-full", className)} style={style}>
        {label && <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{label}</label>}
        <label className={cn("flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300", hasError ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "border-zinc-300 dark:border-zinc-700 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900", theme.borderFocus)}>
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className={cn("mb-3", s.icon, hasError ? "text-red-500" : "text-zinc-400 dark:text-zinc-500")} />
            <p className="mb-1 text-sm text-zinc-500 dark:text-zinc-400"><span className={cn("font-bold", hasError ? "text-red-500" : theme.text)}>Click to upload</span> or drag and drop</p>
            <p className="text-xs text-zinc-400 dark:text-zinc-500">{fileName ? <span className="font-bold text-zinc-900 dark:text-white truncate max-w-[200px] block">{fileName}</span> : "SVG, PNG, JPG or GIF"}</p>
          </div>
          <input type="file" className="hidden" ref={ref as any} onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} {...props as any} />
        </label>
        {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-1"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
        {helperText && !error && <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{helperText}</p>}
      </div>
    );
  }

  if (type === "checkbox" || type === "radio") {
    const isRadio = type === "radio";
    const renderOption = (optLabel: string, optValue: string, idx: number) => (
      <label key={idx} className="flex items-start gap-3 cursor-pointer group">
        <div className="flex items-center justify-center pt-0.5">
          <input type={type} value={optValue} name={props.name || label} className={cn("w-4 h-4 cursor-pointer outline-none bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700", isRadio ? "rounded-full" : "rounded-[4px]", theme.accent)} {...props as any} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">{optLabel}</span>
          {options.length === 0 && helperText && <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</span>}
        </div>
      </label>
    );

    return (
      <div className={cn("flex flex-col gap-3 w-full", className)} style={style}>
        {label && options.length > 0 && <label className="text-sm font-bold text-zinc-700 dark:text-zinc-300 mb-1">{label}</label>}
        <div className="flex flex-col gap-3">{options.length > 0 ? options.map((opt, i) => renderOption(opt.label, opt.value, i)) : renderOption(label || "Option", "true", 0)}</div>
        {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
        {options.length > 0 && helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)} style={style}>
      {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300")}>{label}</label>}
      <div className={cn(styles.wrapper, type === "textarea" && "items-start")}>
        {(icon || type === "search") && type !== "textarea" && type !== "select" && <div className={cn("absolute left-4 shrink-0 text-zinc-400 dark:text-zinc-500 pointer-events-none", variant === "underlined" && "left-0")}>{icon ? icon : <Search className={s.icon} />}</div>}
        
        {type === "textarea" ? (
          <textarea ref={ref as any} rows={rows} className={cn(styles.input, "resize-y min-h-[100px]")} {...props as any} />
        ) : type === "select" ? (
          <div className="relative w-full flex items-center">
            <select ref={ref as any} className={cn(styles.input, "pr-10 cursor-pointer")} {...props as any}>
              {options.map((opt, i) => <option key={i} value={opt.value} className="bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">{opt.label}</option>)}
            </select>
            <ChevronDown className={cn("absolute right-4 text-zinc-400 dark:text-zinc-500 pointer-events-none", s.icon, variant === "underlined" && "right-0")} />
          </div>
        ) : (
          <input ref={ref as any} type={inputType} className={cn(styles.input, (icon || type === "search") && s.paddingLeft, variant === "underlined" && (icon || type === "search") && "pl-8")} {...props} />
        )}

        {type === "password" && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className={cn("absolute right-4 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors focus:outline-none", variant === "underlined" && "right-0")} tabIndex={-1}>
            {showPassword ? <EyeOff className={s.icon} /> : <Eye className={s.icon} />}
          </button>
        )}
        {hasError && type !== "password" && type !== "select" && <div className={cn("absolute right-4 text-red-500 shrink-0 pointer-events-none", variant === "underlined" && "right-0")}><AlertCircle className={s.icon} /></div>}
      </div>
      {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
      {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
    </div>
  );
});
InputBlock.displayName = "InputBlock";`;

// --- JAVASCRIPT ENGINE CODE ---
const INPUT_ENGINE_CODE_JS = INPUT_ENGINE_CODE_TS.replace(
  /:\s?[A-Z][A-Za-z0-9_<>]*(\[\])?/g,
  "",
)
  .replace(/<any>/g, "")
  .replace(/as any/g, "")
  .replace(/type [A-Za-z0-9_]+ = [^;]+;/g, "")
  .replace(/export interface [A-Za-z0-9_]+ \{[^}]+\}/g, "")
  .replace(/as React.CSSProperties/g, "");

export function InputShowcase() {
  const [variant, setVariant] = useState<InputVariant>("default");
  const [color, setColor] = useState<InputColor>("indigo");
  const [inputType, setInputType] = useState<InputType>("text");
  const [inputSize, setInputSize] = useState<InputSize>("md");
  const [showError, setShowError] = useState(false);

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        type="${inputType}"\n        variant="${variant}"\n        color="${color}"\n        inputSize="${inputSize}"`;

    if (inputType === "text")
      propsStr += `\n        label="Username"\n        placeholder="Enter your username"`;
    if (inputType === "email")
      propsStr += `\n        label="Email Address"\n        placeholder="you@company.com"\n        icon={<Mail className="w-4 h-4" />}`;
    if (inputType === "password")
      propsStr += `\n        label="Password"\n        placeholder="••••••••"`;
    if (inputType === "search")
      propsStr += `\n        placeholder="Search projects..."`;
    if (inputType === "file") propsStr += `\n        label="Profile Picture"`;
    if (inputType === "textarea")
      propsStr += `\n        label="Bio"\n        placeholder="Tell us about yourself..."\n        rows={4}`;
    if (inputType === "select")
      propsStr += `\n        label="Department"\n        options={[\n          { label: "Engineering", value: "eng" },\n          { label: "Marketing", value: "mkt" },\n          { label: "Sales", value: "sls" }\n        ]}`;
    if (inputType === "checkbox")
      propsStr += `\n        label="I agree to the terms and conditions"`;
    if (inputType === "radio")
      propsStr += `\n        label="Select Plan"\n        name="plan"\n        options={[\n          { label: "Basic Plan ($10/mo)", value: "basic" },\n          { label: "Pro Plan ($30/mo)", value: "pro" }\n        ]}`;

    if (showError) propsStr += `\n        error="This field is required."`;
    else if (inputType !== "checkbox" && inputType !== "radio")
      propsStr += `\n        helperText="Make sure it's unique."`;

    return `import { InputBlock } from "@/components/custom/blocks/InputBlock";
${inputType === "email" ? 'import { Mail } from "lucide-react";\n' : ""}
export default function FormDemo() {
  return (
    <div className="w-full max-w-sm">
      <InputBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Input Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                [
                  "text",
                  "email",
                  "password",
                  "search",
                  "textarea",
                  "select",
                  "checkbox",
                  "radio",
                  "file",
                ] as InputType[]
              ).map((t) => (
                <button
                  key={t}
                  onClick={() => setInputType(t)}
                  className={`flex-1 md:flex-none px-3 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    inputType === t
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Style Variant
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(
                ["default", "filled", "underlined", "glow"] as InputVariant[]
              ).map((v) => (
                <button
                  key={v}
                  onClick={() => setVariant(v)}
                  disabled={inputType === "checkbox" || inputType === "radio"}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    inputType === "checkbox" || inputType === "radio"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  } ${
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
              {(["sm", "md", "lg"] as InputSize[]).map((s) => (
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
          {/* Color Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Focus Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id as InputColor)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}

              {/* Custom Color Picker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#8b5cf6"}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                  title="Custom Hex Color"
                />
              </div>
            </div>
          </div>

          {/* State Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              State
            </label>
            <div className="flex items-center h-10">
              <button
                onClick={() => setShowError(!showError)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  showError
                    ? "bg-red-50 border-red-200 text-red-600 dark:bg-red-500/10 dark:border-red-500/30 dark:text-red-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Trigger Error State
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="InputBlock"
        tsCode={INPUT_ENGINE_CODE_TS}
        jsCode={INPUT_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[300px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12">
          <div className="w-full max-w-sm">
            <InputBlock
              key={`${variant}-${color}-${inputType}-${inputSize}-${showError}`}
              type={inputType}
              variant={variant}
              color={color}
              inputSize={inputSize}
              label={
                inputType === "search"
                  ? undefined
                  : inputType === "file"
                    ? "Upload Documentation"
                    : inputType === "textarea"
                      ? "Project Biography"
                      : inputType === "select"
                        ? "Department"
                        : inputType === "checkbox"
                          ? "I agree to the Terms of Service and Privacy Policy."
                          : inputType === "radio"
                            ? "Select Subscription Plan"
                            : "Account Email"
              }
              placeholder={
                inputType === "password"
                  ? "••••••••"
                  : inputType === "search"
                    ? "Search documentation..."
                    : inputType === "textarea"
                      ? "Tell us about your project requirements..."
                      : "you@company.com"
              }
              icon={
                inputType === "email" ? (
                  <Mail
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
              helperText={
                !showError
                  ? "We'll never share your details with a third party."
                  : undefined
              }
              error={
                showError ? "This field is required to continue." : undefined
              }
              options={
                inputType === "select"
                  ? [
                      { label: "Engineering", value: "eng" },
                      { label: "Marketing", value: "mkt" },
                      { label: "Sales", value: "sls" },
                    ]
                  : inputType === "radio"
                    ? [
                        { label: "Basic Plan ($10/mo)", value: "basic" },
                        { label: "Pro Plan ($30/mo)", value: "pro" },
                      ]
                    : undefined
              }
              name={inputType === "radio" ? "demo_plan" : undefined}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
