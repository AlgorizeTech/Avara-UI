"use client";

import { cn } from "@/lib/utils";
import {
  AlertCircle,
  Eye,
  EyeOff,
  FileIcon,
  FileText,
  UploadCloud,
  X,
} from "lucide-react";
import React, { forwardRef, useCallback, useRef, useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type InputColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type InputVariant = "default" | "filled" | "underlined" | "glow";
export type InputSize = "sm" | "md" | "lg";

const colorThemes: Record<string, Record<string, string>> = {
  primary: {
    ring: "focus-within:ring-primary/30 focus-within:border-primary",
    text: "text-primary",
    bg: "bg-primary text-primary-foreground",
    bgSoft:
      "bg-primary/10 text-foreground",
    glow: "focus-within:shadow-[0_0_20px_var(--primary)] focus-within:border-primary",
    dragActive: "border-primary bg-primary/10",
  },
  indigo: {
    ring: "focus-within:ring-indigo-500/30 focus-within:border-indigo-500",
    text: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-600 text-white",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-900 dark:text-indigo-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(99,102,241,0.4)] focus-within:border-indigo-500",
    dragActive: "border-indigo-500 bg-indigo-50 dark:bg-indigo-500/10",
  },
  rose: {
    ring: "focus-within:ring-rose-500/30 focus-within:border-rose-500",
    text: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-600 text-white",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-900 dark:text-rose-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(244,63,94,0.4)] focus-within:border-rose-500",
    dragActive: "border-rose-500 bg-rose-50 dark:bg-rose-500/10",
  },
  emerald: {
    ring: "focus-within:ring-emerald-500/30 focus-within:border-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-600 text-white",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-900 dark:text-emerald-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(16,185,129,0.4)] focus-within:border-emerald-500",
    dragActive: "border-emerald-500 bg-emerald-50 dark:bg-emerald-500/10",
  },
  zinc: {
    ring: "focus-within:ring-zinc-500/30 focus-within:border-zinc-500 dark:focus-within:ring-white/20 dark:focus-within:border-white",
    text: "text-zinc-900 dark:text-zinc-100",
    bg: "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    glow: "focus-within:shadow-[0_0_20px_rgba(255,255,255,0.15)] focus-within:border-zinc-900 dark:focus-within:border-white",
    dragActive:
      "border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-800/50",
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
        ring: "focus-within:ring-[var(--theme-color)]/30 focus-within:border-[var(--theme-color)]",
        text: "text-[var(--theme-color)]",
        bg: "bg-[var(--theme-color)] text-white hover:opacity-90",
        bgSoft:
          "bg-[rgba(var(--theme-color-rgb),0.1)] text-[var(--theme-color)]",
        glow: "focus-within:shadow-[0_0_20px_rgba(var(--theme-color-rgb),0.5)] focus-within:border-[var(--theme-color)]",
        dragActive:
          "border-[var(--theme-color)] bg-[rgba(var(--theme-color-rgb),0.05)]",
      },
      style: {
        "--theme-color": color,
        "--theme-color-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.primary, style: {} };
};

// ==========================================
// INPUT COMPONENT
// ==========================================
export interface InputBlockProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "size" | "color" | "type"
  > {
  type?: "text" | "password" | "email" | "number" | "file";
  variant?: InputVariant;
  color?: InputColor;
  inputSize?: InputSize;
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFilesChange?: (files: File[]) => void;
}

export const InputBlock = forwardRef<HTMLInputElement, InputBlockProps>(
  (
    {
      type = "text",
      variant = "default",
      color = "primary",
      inputSize = "md",
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      disabled = false,
      className,
      multiple,
      accept,
      onFilesChange,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const { theme, style } = getThemeStyles(color);
    const hasError = Boolean(error);

    // --- File Upload State ---
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<Record<string, string>>({});
    const fileInputRef = useRef<HTMLInputElement>(null);

    // --- Size Classes ---
    const sizeClasses = {
      sm: {
        wrapper: "min-h-9 px-3",
        text: "text-xs",
        icon: "w-3.5 h-3.5",
        dropzone: "p-4 min-h-[100px]",
      },
      md: {
        wrapper: "min-h-11 px-4",
        text: "text-sm",
        icon: "w-4 h-4",
        dropzone: "p-6 min-h-[140px]",
      },
      lg: {
        wrapper: "min-h-14 px-5",
        text: "text-base",
        icon: "w-5 h-5",
        dropzone: "p-8 min-h-[180px]",
      },
    };
    const s = sizeClasses[inputSize];

    // --- Variant Styles ---
    const getVariantStyles = () => {
      const baseWrapper = cn(
        "relative flex items-center w-full transition-all duration-300 overflow-hidden",
        s.wrapper,
      );

      if (disabled)
        return {
          wrapper: cn(
            baseWrapper,
            "opacity-50 cursor-not-allowed border border-border bg-muted",
          ),
          active: "",
        };
      if (hasError)
        return {
          wrapper: cn(
            baseWrapper,
            "border border-red-500 bg-white dark:bg-[#09090b]",
            variant === "underlined" && "border-0 border-b-2 rounded-none",
            variant !== "underlined" && "rounded-xl",
          ),
          active: "focus-within:ring-4 focus-within:ring-red-500/10",
        };

      switch (variant) {
        case "filled":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-muted border border-transparent rounded-xl",
            ),
            active: cn(
              "focus-within:bg-background focus-within:ring-4",
              theme.ring,
            ),
          };
        case "underlined":
          return {
            wrapper: cn(
              baseWrapper,
              "border-b-2 border-border bg-transparent rounded-none px-0",
            ),
            active: theme.ring,
          };
        case "glow":
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-border rounded-xl shadow-sm",
            ),
            active: theme.glow,
          };
        case "default":
        default:
          return {
            wrapper: cn(
              baseWrapper,
              "bg-white dark:bg-[#09090b] border border-border rounded-xl shadow-sm",
            ),
            active: cn("focus-within:ring-4", theme.ring),
          };
      }
    };
    const styles = getVariantStyles();

    // ==========================================
    // FILE UPLOAD LOGIC
    // ==========================================
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes";
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const processFiles = useCallback(
      (newFiles: File[]) => {
        const validFiles = multiple
          ? [...selectedFiles, ...newFiles]
          : [newFiles[0]];
        setSelectedFiles(validFiles);
        if (onFilesChange) onFilesChange(validFiles);

        // Generate previews for images
        validFiles.forEach((file) => {
          if (file.type.startsWith("image/") && !previews[file.name]) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreviews((prev) => ({
                ...prev,
                [file.name]: reader.result as string,
              }));
            };
            reader.readAsDataURL(file);
          }
        });
      },
      [multiple, selectedFiles, previews, onFilesChange],
    );

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(Array.from(e.dataTransfer.files));
      }
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(Array.from(e.target.files));
      }
    };
    const removeFile = (fileName: string, e: React.MouseEvent) => {
      e.stopPropagation();
      const updatedFiles = selectedFiles.filter((f) => f.name !== fileName);
      setSelectedFiles(updatedFiles);
      if (onFilesChange) onFilesChange(updatedFiles);
      setPreviews((prev) => {
        const newPreviews = { ...prev };
        delete newPreviews[fileName];
        return newPreviews;
      });
    };

    // ==========================================
    // RENDER: FILE TYPE
    // ==========================================
    if (type === "file") {
      return (
        <div
          className={cn("flex flex-col gap-1.5 w-full relative", className)}
          style={style}
        >
          {label && (
            <label
              className={cn(
                "text-sm font-bold",
                hasError ? "text-red-500" : "text-foreground",
                disabled && "opacity-50",
              )}
            >
              {label}
            </label>
          )}

          <div
            onClick={() => !disabled && fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ease-in-out group",
              s.dropzone,
              disabled
                ? "opacity-50 cursor-not-allowed border-border bg-muted"
                : hasError
                  ? "border-red-400 bg-red-50/50 dark:bg-red-500/5"
                  : isDragging
                    ? theme.dragActive
                    : "border-border bg-muted/50 dark:bg-[#09090b] hover:bg-muted",
            )}
          >
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              multiple={multiple}
              accept={accept}
              onChange={handleFileChange}
              disabled={disabled}
              {...props}
            />
            <div
              className={cn(
                "p-3 rounded-full mb-3 transition-colors",
                isDragging
                  ? theme.bg
                  : "bg-card shadow-sm border border-border group-hover:scale-105",
              )}
            >
              <UploadCloud
                className={cn(
                  "w-6 h-6",
                  isDragging ? "text-white" : theme.text,
                )}
              />
            </div>
            <p
              className={cn("font-bold text-foreground", s.text)}
            >
              {isDragging
                ? "Drop files here"
                : "Click or drag file to this area"}
            </p>
            <p className="text-xs text-muted-foreground mt-1 max-w-[250px]">
              {accept ? `Supports ${accept}` : "Supports all file types"}{" "}
              {multiple && "• Upload multiple"}
            </p>
          </div>

          {/* File List / Previews */}
          {selectedFiles.length > 0 && (
            <div className="flex flex-col gap-2 mt-2">
              {selectedFiles.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between p-3 bg-white dark:bg-[#09090b] border border-border rounded-lg shadow-sm group"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {previews[file.name] ? (
                      <div className="w-10 h-10 shrink-0 rounded-md overflow-hidden bg-muted relative border border-border">
                        {/* A FileReader data URL — next/image cannot optimise
                            it and would need `unoptimized`, so a plain img is
                            both simpler and framework-neutral. */}
                        <img
                          src={previews[file.name]}
                          alt="preview"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={cn(
                          "w-10 h-10 shrink-0 rounded-md flex items-center justify-center",
                          theme.bgSoft,
                        )}
                      >
                        {file.type.includes("pdf") ? (
                          <FileText className={cn("w-5 h-5", theme.text)} />
                        ) : (
                          <FileIcon className={cn("w-5 h-5", theme.text)} />
                        )}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-bold text-foreground truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {formatFileSize(file.size)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => removeFile(file.name, e)}
                    className="p-2 shrink-0 rounded-md text-zinc-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && (
            <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5">
              <AlertCircle className="w-3.5 h-3.5" /> {error}
            </p>
          )}
          {helperText && !error && (
            <p className="text-xs font-medium text-muted-foreground mt-0.5">
              {helperText}
            </p>
          )}
        </div>
      );
    }

    // ==========================================
    // RENDER: STANDARD TEXT/PASSWORD/EMAIL
    // ==========================================
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div
        className={cn("flex flex-col gap-1.5 w-full relative", className)}
        style={style}
      >
        {label && (
          <label
            className={cn(
              "text-sm font-bold",
              hasError ? "text-red-500" : "text-foreground",
              disabled && "opacity-50",
            )}
          >
            {label}
          </label>
        )}

        <div className={cn(styles.wrapper, styles.active)}>
          {leftIcon && (
            <div
              className={cn(
                "shrink-0 pl-4 text-muted-foreground",
                variant === "underlined" && "pl-0 pr-3",
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={cn(
              "w-full h-full bg-transparent border-none outline-none text-foreground placeholder:text-zinc-400 dark:placeholder:text-zinc-600 transition-colors",
              s.text,
              leftIcon && variant !== "underlined" ? "pl-2.5" : "pl-0",
              variant === "underlined" && !leftIcon && "pl-0",
              rightIcon || isPassword ? "pr-2.5" : "pr-0",
            )}
            {...props}
          />

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              disabled={disabled}
              className={cn(
                "shrink-0 pr-4 text-muted-foreground hover:text-muted-foreground transition-colors disabled:opacity-50",
                variant === "underlined" && "pr-0 pl-3",
              )}
            >
              {showPassword ? (
                <EyeOff className={s.icon} />
              ) : (
                <Eye className={s.icon} />
              )}
            </button>
          )}
          {rightIcon && !isPassword && (
            <div
              className={cn(
                "shrink-0 pr-4 text-muted-foreground",
                variant === "underlined" && "pr-0 pl-3",
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p className="text-xs font-semibold text-red-500 flex items-center gap-1 mt-0.5">
            <AlertCircle className="w-3.5 h-3.5" /> {error}
          </p>
        )}
        {helperText && !error && (
          <p className="text-xs font-medium text-muted-foreground mt-0.5">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);
InputBlock.displayName = "InputBlock";
