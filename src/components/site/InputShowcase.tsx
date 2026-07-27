"use client";

import {
  InputBlock,
  InputColor,
  InputSize,
  InputVariant,
} from "@/components/custom/blocks/InputBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const INPUT_ENGINE_CODE_TS = `"use client";

import React, { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Eye, EyeOff, UploadCloud, X, FileIcon, ImageIcon, FileText } from "lucide-react";

export type InputColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});
export type InputVariant = "default" | "filled" | "underlined" | "glow";
export type InputSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  indigo: { ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 text-white", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100", glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500", dragActive: "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" },
  rose: { ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 text-white", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100", glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500", dragActive: "border-rose-500 bg-rose-50 dark:bg-rose-500/10" },
  emerald: { ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 text-white", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100", glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500", dragActive: "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  zinc: { ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white", text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white", dragActive: "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800/50" },
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
      theme: { ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]", text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white hover:opacity-90", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]", glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]", dragActive: "border-[var(--theme-color)] bg-[rgba(var(--theme-color-rgb),0.05)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export interface InputBlockProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color" | "type"> { type?: "text" | "password" | "email" | "number" | "file"; variant?: InputVariant; color?: InputColor; inputSize?: InputSize; label?: string; helperText?: string; error?: string; leftIcon?: React.ReactNode; rightIcon?: React.ReactNode; onFilesChange?: (files: File[]) => void; }

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>(({ type = "text", variant = "default", color = "indigo", inputSize = "md", label, helperText, error, leftIcon, rightIcon, disabled = false, className, multiple, accept, onFilesChange, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, style } = getThemeStyles(color as string);
  const hasError = Boolean(error);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = { sm: { wrapper: "min-h-9 px-3", text: "text-xs", icon: "w-3.5 h-3.5", dropzone: "p-4 min-h-[100px]" }, md: { wrapper: "min-h-11 px-4", text: "text-sm", icon: "w-4 h-4", dropzone: "p-6 min-h-[140px]" }, lg: { wrapper: "min-h-14 px-5", text: "text-base", icon: "w-5 h-5", dropzone: "p-8 min-h-[180px]" } };
  const s = sizeClasses[inputSize || "md"];

  const getVariantStyles = () => {
    const baseWrapper = cn("relative flex items-center w-full transition-all duration-300 overflow-hidden", s.wrapper);
    if (disabled) return { wrapper: cn(baseWrapper, "opacity-50 cursor-not-allowed border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"), active: "" };
    if (hasError) return { wrapper: cn(baseWrapper, "border border-red-500 bg-white dark:bg-[#09090b]", variant === "underlined" && "border-0 border-b-2 rounded-none", variant !== "underlined" && "rounded-xl"), active: "focus-within:ring-4 focus-within:ring-red-500/10" };
    switch (variant) {
      case "filled": return { wrapper: cn(baseWrapper, "bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-xl"), active: cn("focus-within:bg-white dark:focus-within:bg-zinc-950 focus-within:ring-4", theme.ring) };
      case "underlined": return { wrapper: cn(baseWrapper, "border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-none px-0"), active: theme.ring };
      case "glow": return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"), active: theme.glow };
      case "default": default: return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"), active: cn("focus-within:ring-4", theme.ring) };
    }
  };
  const styles = getVariantStyles();

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFiles = useCallback((newFiles: File[]) => {
    const validFiles = multiple ? [...selectedFiles, ...newFiles] : [newFiles[0]];
    setSelectedFiles(validFiles);
    if (onFilesChange) onFilesChange(validFiles);
    validFiles.forEach(file => {
      if (file.type.startsWith('image/') && !previews[file.name]) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviews(prev => ({ ...prev, [file.name]: reader.result as string }));
        reader.readAsDataURL(file);
      }
    });
  }, [multiple, selectedFiles, previews, onFilesChange]);

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); if (disabled) return; if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFiles(Array.from(e.dataTransfer.files)); };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files && e.target.files.length > 0) processFiles(Array.from(e.target.files)); };
  const removeFile = (fileName: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updatedFiles = selectedFiles.filter(f => f.name !== fileName);
    setSelectedFiles(updatedFiles);
    if (onFilesChange) onFilesChange(updatedFiles);
    setPreviews(prev => { const newPreviews = { ...prev }; delete newPreviews[fileName]; return newPreviews; });
  };

  if (type === "file") {
    return (
      <div className={cn("flex flex-col gap-1.5 w-full relative", className)} style={style}>
        {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300", disabled && "opacity-50")}>{label}</label>}
        <div onClick={() => !disabled && fileInputRef.current?.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={cn("w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ease-in-out group", s.dropzone, disabled ? "opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50" : hasError ? "border-red-400 bg-red-50/50 dark:bg-red-500/5" : isDragging ? theme.dragActive : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-900/50")}>
          <input type="file" ref={fileInputRef} className="hidden" multiple={multiple} accept={accept} onChange={handleFileChange} disabled={disabled} {...props} />
          <div className={cn("p-3 rounded-full mb-3 transition-colors", isDragging ? theme.bg : "bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 group-hover:scale-105")}><UploadCloud className={cn("w-6 h-6", isDragging ? "text-white" : theme.text)} /></div>
          <p className={cn("font-bold text-zinc-900 dark:text-white", s.text)}>{isDragging ? "Drop files here" : "Click or drag file to this area"}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[250px]">{accept ? \`Supports \${accept}\` : "Supports all file types"} {multiple && "• Upload multiple"}</p>
        </div>
        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {selectedFiles.map(file => (
              <div key={file.name} className="flex items-center justify-between p-3 bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm group">
                <div className="flex items-center gap-3 overflow-hidden">
                  {previews[file.name] ? <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative border border-zinc-200 dark:border-zinc-800"><img src={previews[file.name]} alt="preview" className="w-full h-full object-cover" /></div> : <div className={cn("w-10 h-10 shrink-0 rounded-md flex items-center justify-center", theme.bgSoft)}>{file.type.includes('pdf') ? <FileText className={cn("w-5 h-5", theme.text)} /> : <FileIcon className={cn("w-5 h-5", theme.text)} />}</div>}
                  <div className="flex flex-col min-w-0"><span className="text-sm font-bold text-zinc-900 dark:text-white truncate">{file.name}</span><span className="text-xs text-zinc-500 font-medium">{formatFileSize(file.size)}</span></div>
                </div>
                <button type="button" onClick={(e) => removeFile(file.name, e)} className="p-2 shrink-0 rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
        {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
      </div>
    );
  }

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full relative", className)} style={style}>
      {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300", disabled && "opacity-50")}>{label}</label>}
      <div className={cn(styles.wrapper, styles.active)}>
        {leftIcon && <div className={cn("shrink-0 pl-4 text-zinc-400 dark:text-zinc-500", variant === "underlined" && "pl-0 pr-3")}>{leftIcon}</div>}
        <input ref={ref} type={inputType} disabled={disabled} className={cn("w-full h-full bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-colors", s.text, leftIcon && variant !== "underlined" ? "pl-2.5" : "pl-0", variant === "underlined" && !leftIcon && "pl-0", rightIcon || isPassword ? "pr-2.5" : "pr-0")} {...props} />
        {isPassword && <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={disabled} className={cn("shrink-0 pr-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors disabled:opacity-50", variant === "underlined" && "pr-0 pl-3")}>{showPassword ? <EyeOff className={s.icon} /> : <Eye className={s.icon} />}</button>}
        {rightIcon && !isPassword && <div className={cn("shrink-0 pr-4 text-zinc-400 dark:text-zinc-500", variant === "underlined" && "pr-0 pl-3")}>{rightIcon}</div>}
      </div>
      {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
      {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
    </div>
  );
});
InputBlock.displayName = "InputBlock";`;

// --- JAVASCRIPT ENGINE CODE ---
const INPUT_ENGINE_CODE_JS = `"use client";

import React, { useState, useRef, useEffect, forwardRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, Eye, EyeOff, UploadCloud, X, FileIcon, ImageIcon, FileText } from "lucide-react";

const colorThemes = {
  indigo: { ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500", text: "text-indigo-600 dark:text-indigo-400", bg: "bg-indigo-600 text-white", bgSoft: "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100", glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500", dragActive: "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10" },
  rose: { ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500", text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-600 text-white", bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100", glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500", dragActive: "border-rose-500 bg-rose-50 dark:bg-rose-500/10" },
  emerald: { ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500", text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-600 text-white", bgSoft: "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100", glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500", dragActive: "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10" },
  zinc: { ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white", text: "text-zinc-900 dark:text-zinc-100", bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900", bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100", glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white", dragActive: "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800/50" },
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
      theme: { ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]", text: "text-[var(--theme-color)]", bg: "bg-[var(--theme-color)] text-white hover:opacity-90", bgSoft: "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]", glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]", dragActive: "border-[var(--theme-color)] bg-[rgba(var(--theme-color-rgb),0.05)]" },
      style: { "--theme-color": color, "--theme-color-rgb": rgb },
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

export const InputBlock = forwardRef(({ type = "text", variant = "default", color = "indigo", inputSize = "md", label, helperText, error, leftIcon, rightIcon, disabled = false, className, multiple, accept, onFilesChange, ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, style } = getThemeStyles(color);
  const hasError = Boolean(error);

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState({});
  const fileInputRef = useRef(null);

  const sizeClasses = { sm: { wrapper: "min-h-9 px-3", text: "text-xs", icon: "w-3.5 h-3.5", dropzone: "p-4 min-h-[100px]" }, md: { wrapper: "min-h-11 px-4", text: "text-sm", icon: "w-4 h-4", dropzone: "p-6 min-h-[140px]" }, lg: { wrapper: "min-h-14 px-5", text: "text-base", icon: "w-5 h-5", dropzone: "p-8 min-h-[180px]" } };
  const s = sizeClasses[inputSize];

  const getVariantStyles = () => {
    const baseWrapper = cn("relative flex items-center w-full transition-all duration-300 overflow-hidden", s.wrapper);
    if (disabled) return { wrapper: cn(baseWrapper, "opacity-50 cursor-not-allowed border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50"), active: "" };
    if (hasError) return { wrapper: cn(baseWrapper, "border border-red-500 bg-white dark:bg-[#09090b]", variant === "underlined" && "border-0 border-b-2 rounded-none", variant !== "underlined" && "rounded-xl"), active: "focus-within:ring-4 focus-within:ring-red-500/10" };
    switch (variant) {
      case "filled": return { wrapper: cn(baseWrapper, "bg-zinc-100 dark:bg-zinc-900 border border-transparent rounded-xl"), active: cn("focus-within:bg-white dark:focus-within:bg-zinc-950 focus-within:ring-4", theme.ring) };
      case "underlined": return { wrapper: cn(baseWrapper, "border-b-2 border-zinc-200 dark:border-zinc-800 bg-transparent rounded-none px-0"), active: theme.ring };
      case "glow": return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"), active: theme.glow };
      case "default": default: return { wrapper: cn(baseWrapper, "bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm"), active: cn("focus-within:ring-4", theme.ring) };
    }
  };
  const styles = getVariantStyles();

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024; const sizes = ['Bytes', 'KB', 'MB', 'GB']; const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const processFiles = useCallback((newFiles) => {
    const validFiles = multiple ? [...selectedFiles, ...newFiles] : [newFiles[0]];
    setSelectedFiles(validFiles);
    if (onFilesChange) onFilesChange(validFiles);
    validFiles.forEach(file => {
      if (file.type.startsWith('image/') && !previews[file.name]) {
        const reader = new FileReader();
        reader.onloadend = () => setPreviews(prev => ({ ...prev, [file.name]: reader.result }));
        reader.readAsDataURL(file);
      }
    });
  }, [multiple, selectedFiles, previews, onFilesChange]);

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => { e.preventDefault(); setIsDragging(false); if (disabled) return; if (e.dataTransfer.files && e.dataTransfer.files.length > 0) processFiles(Array.from(e.dataTransfer.files)); };
  const handleFileChange = (e) => { if (e.target.files && e.target.files.length > 0) processFiles(Array.from(e.target.files)); };
  const removeFile = (fileName, e) => {
    e.stopPropagation();
    const updatedFiles = selectedFiles.filter(f => f.name !== fileName);
    setSelectedFiles(updatedFiles);
    if (onFilesChange) onFilesChange(updatedFiles);
    setPreviews(prev => { const newPreviews = { ...prev }; delete newPreviews[fileName]; return newPreviews; });
  };

  if (type === "file") {
    return (
      <div className={cn("flex flex-col gap-1.5 w-full relative", className)} style={style}>
        {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300", disabled && "opacity-50")}>{label}</label>}
        <div onClick={() => !disabled && fileInputRef.current?.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={cn("w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ease-in-out group", s.dropzone, disabled ? "opacity-50 cursor-not-allowed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50" : hasError ? "border-red-400 bg-red-50/50 dark:bg-red-500/5" : isDragging ? theme.dragActive : "border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-[#09090b] hover:bg-zinc-100 dark:hover:bg-zinc-900/50")}>
          <input type="file" ref={fileInputRef} className="hidden" multiple={multiple} accept={accept} onChange={handleFileChange} disabled={disabled} {...props} />
          <div className={cn("p-3 rounded-full mb-3 transition-colors", isDragging ? theme.bg : "bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700 group-hover:scale-105")}><UploadCloud className={cn("w-6 h-6", isDragging ? "text-white" : theme.text)} /></div>
          <p className={cn("font-bold text-zinc-900 dark:text-white", s.text)}>{isDragging ? "Drop files here" : "Click or drag file to this area"}</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-[250px]">{accept ? \`Supports \${accept}\` : "Supports all file types"} {multiple && "• Upload multiple"}</p>
        </div>
        {selectedFiles.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {selectedFiles.map(file => (
              <div key={file.name} className="flex items-center justify-between p-3 bg-white dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm group">
                <div className="flex items-center gap-3 overflow-hidden">
                  {previews[file.name] ? <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative border border-zinc-200 dark:border-zinc-800"><img src={previews[file.name]} alt="preview" className="w-full h-full object-cover" /></div> : <div className={cn("w-10 h-10 shrink-0 rounded-md flex items-center justify-center", theme.bgSoft)}>{file.type.includes('pdf') ? <FileText className={cn("w-5 h-5", theme.text)} /> : <FileIcon className={cn("w-5 h-5", theme.text)} />}</div>}
                  <div className="flex flex-col min-w-0"><span className="text-sm font-bold text-zinc-900 dark:text-white truncate">{file.name}</span><span className="text-xs text-zinc-500 font-medium">{formatFileSize(file.size)}</span></div>
                </div>
                <button type="button" onClick={(e) => removeFile(file.name, e)} className="p-2 shrink-0 rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"><X className="w-4 h-4" /></button>
              </div>
            ))}
          </div>
        )}
        {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
        {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
      </div>
    );
  }

  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className={cn("flex flex-col gap-1.5 w-full relative", className)} style={style}>
      {label && <label className={cn("text-sm font-bold", hasError ? "text-red-500" : "text-zinc-700 dark:text-zinc-300", disabled && "opacity-50")}>{label}</label>}
      <div className={cn(styles.wrapper, styles.active)}>
        {leftIcon && <div className={cn("shrink-0 pl-4 text-zinc-400 dark:text-zinc-500", variant === "underlined" && "pl-0 pr-3")}>{leftIcon}</div>}
        <input ref={ref} type={inputType} disabled={disabled} className={cn("w-full h-full bg-transparent border-none outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-colors", s.text, leftIcon && variant !== "underlined" ? "pl-2.5" : "pl-0", variant === "underlined" && !leftIcon && "pl-0", rightIcon || isPassword ? "pr-2.5" : "pr-0")} {...props} />
        {isPassword && <button type="button" onClick={() => setShowPassword(!showPassword)} disabled={disabled} className={cn("shrink-0 pr-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors disabled:opacity-50", variant === "underlined" && "pr-0 pl-3")}>{showPassword ? <EyeOff className={s.icon} /> : <Eye className={s.icon} />}</button>}
        {rightIcon && !isPassword && <div className={cn("shrink-0 pr-4 text-zinc-400 dark:text-zinc-500", variant === "underlined" && "pr-0 pl-3")}>{rightIcon}</div>}
      </div>
      {error && <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>}
      {helperText && !error && <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-0.5">{helperText}</p>}
    </div>
  );
});
InputBlock.displayName = "InputBlock";`;

export function InputShowcase() {
  const [inputType, setInputType] = useState<
    "text" | "password" | "email" | "file"
  >("text");
  const [variant, setVariant] = useState<InputVariant>("default");
  const [inputSize, setInputSize] = useState<InputSize>("md");
  const [showError, setShowError] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // File specific toggles
  const [isMultiple, setIsMultiple] = useState(true);
  const [isImageOnly, setIsImageOnly] = useState(false);

  // Initialize with localStorage if available
  const [color, setColor] = useState<InputColor | string>(() => {
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

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        type="${inputType}"\n        variant="${variant}"\n        color="${color}"\n        inputSize="${inputSize}"\n        label="${inputType === "file" ? "Upload Documents" : "Email Address"}"`;

    if (inputType === "file") {
      if (isMultiple) propsStr += `\n        multiple`;
      if (isImageOnly) propsStr += `\n        accept="image/*"`;
      propsStr += `\n        onFilesChange={(files) => console.log(files)}`;
    } else {
      propsStr += `\n        placeholder="Enter your email..."`;
    }

    if (showError)
      propsStr += `\n        error="${inputType === "file" ? "File size exceeds 5MB limit." : "Please enter a valid email address."}"`;
    else
      propsStr += `\n        helperText="${inputType === "file" ? "Attach your files here." : "We'll never share your email."}"`;

    if (isDisabled) propsStr += `\n        disabled`;

    return `import { InputBlock } from "@/components/custom/blocks/InputBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

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
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Input Type Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Input Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["text", "password", "email", "file"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setInputType(t)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
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
          {/* Color */}
          <ThemeColorPicker color={color} onChange={handleColorChange} label="Active Color" />

          {/* State Toggles */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              States & Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              {inputType === "file" && (
                <>
                  <button
                    onClick={() => setIsMultiple(!isMultiple)}
                    className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                      isMultiple
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                        : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Multiple Files
                  </button>
                  <button
                    onClick={() => setIsImageOnly(!isImageOnly)}
                    className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                      isImageOnly
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                        : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    Images Only
                  </button>
                </>
              )}
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
        name="InputBlock"
        tsCode={INPUT_ENGINE_CODE_TS}
        jsCode={INPUT_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-sm">
            <InputBlock
              key={`${inputType}-${variant}-${color}-${inputSize}-${showError}-${isDisabled}-${isMultiple}-${isImageOnly}`}
              type={inputType}
              variant={variant}
              color={color}
              inputSize={inputSize}
              disabled={isDisabled}
              leftIcon={
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
              label={
                inputType === "file"
                  ? "Upload Portfolio"
                  : inputType === "password"
                    ? "Password"
                    : "Email Address"
              }
              placeholder={
                inputType === "file"
                  ? undefined
                  : inputType === "password"
                    ? "Enter your password..."
                    : "Enter your email..."
              }
              helperText={
                !showError
                  ? inputType === "file"
                    ? "Attach your files here."
                    : "We'll never share your data."
                  : undefined
              }
              error={
                showError
                  ? inputType === "file"
                    ? "File size exceeds 5MB limit."
                    : "Please enter a valid input."
                  : undefined
              }
              multiple={inputType === "file" ? isMultiple : undefined}
              accept={
                inputType === "file" && isImageOnly ? "image/*" : undefined
              }
              onFilesChange={(files) => console.log("Uploaded files:", files)}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
