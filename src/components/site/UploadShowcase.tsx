"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  Dropzone,
  FileUploadState,
  UploadItem,
} from "@/components/custom/blocks/UploadBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const UPLOAD_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  AlertTriangle,
  Check,
  FileText,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

export type UploadStatus = "idle" | "uploading" | "paused" | "error" | "success";

export interface FileUploadState {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  timeLeft?: number;
  errorMessage?: string;
  previewUrl?: string;
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} \${sizes[i]}\`;
}

export function formatTimeLeft(seconds?: number) {
  if (seconds === undefined || seconds < 0) return "Calculating...";
  if (seconds === 0) return "Almost done...";
  if (seconds < 60) return \`\${seconds}s left\`;
  return \`\${Math.floor(seconds / 60)}m \${seconds % 60}s left\`;
}

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result
    ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\`
    : "99, 102, 241";
};

function useThemeColor(defaultColor = "#6366f1") {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  return color;
}

export interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesDrop: (files: File[]) => void;
  maxSize?: number;
  accept?: string;
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  ({ onFilesDrop, maxSize = 50, accept, className, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const primaryColor = useThemeColor();
    const dragCounter = useRef(0);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    useEffect(() => {
      if (!internalRef.current || !iconRef.current || !textRef.current) return;
      const rgbColor = hexToRgb(primaryColor);

      if (isDragging) {
        gsap.to(internalRef.current, {
          borderColor: primaryColor,
          backgroundColor: \`rgba(\${rgbColor}, 0.05)\`,
          boxShadow: \`0 0 30px -5px rgba(\${rgbColor}, 0.2)\`,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(iconRef.current, { y: -8, scale: 1.1, color: primaryColor, duration: 0.4, ease: "back.out(2)" });
        gsap.to(textRef.current, { y: -4, duration: 0.4, ease: "back.out(2)" });
      } else {
        gsap.to(internalRef.current, { borderColor: "rgba(113, 113, 122, 0.4)", backgroundColor: "transparent", boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
        gsap.to(iconRef.current, { y: 0, scale: 1, color: "#71717a", duration: 0.4, ease: "power2.out" });
        gsap.to(textRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
      }
    }, [isDragging, primaryColor]);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault(); e.stopPropagation(); dragCounter.current += 1;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
    };
    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault(); e.stopPropagation(); dragCounter.current -= 1;
      if (dragCounter.current === 0) setIsDragging(false);
    };
    const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault(); e.stopPropagation(); setIsDragging(false); dragCounter.current = 0;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) onFilesDrop(Array.from(e.dataTransfer.files));
    };
    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesDrop(Array.from(e.target.files));
        e.target.value = ""; 
      }
    };

    return (
      <div ref={internalRef} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={cn("relative w-full rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/50 flex flex-col items-center justify-center py-12 px-6 cursor-pointer transition-colors overflow-hidden group bg-white/50 dark:bg-transparent", className)} {...props}>
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept={accept} className="hidden" />
        <div ref={iconRef} className="text-zinc-400 dark:text-zinc-500 mb-4 transition-colors pointer-events-none">
          <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <div ref={textRef} className="flex flex-col items-center text-center pointer-events-none">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-200">{isDragging ? "Release to upload" : "Drop your files here or click to browse"}</h3>
          <p className="text-[13px] text-zinc-500 mt-1">PNG, JPG, PDF, MP4 — up to {maxSize} MB</p>
        </div>
      </div>
    );
  }
);
Dropzone.displayName = "Dropzone";

export interface UploadItemProps {
  item: FileUploadState;
  onRetry?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export const UploadItem = forwardRef<HTMLDivElement, UploadItemProps>(
  ({ item, onRetry, onRemove }, ref) => {
    const { file, progress, status, timeLeft, errorMessage, previewUrl } = item;
    const cardRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const primaryColor = useThemeColor();

    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    useEffect(() => {
      if (progressRef.current) gsap.to(progressRef.current, { width: \`\${progress}%\`, duration: 0.3, ease: "power2.out" });
    }, [progress]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isDark = document.documentElement.classList.contains("dark");
      const spotlightColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
      gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at \${x}px \${y}px, \${spotlightColor}, transparent 40%)\`, duration: 0.1 });
    };

    const handleMouseLeave = () => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at 50% 50%, rgba(0,0,0,0), transparent 40%)\`, duration: 0.5 });
    };

    const isImage = file.type.startsWith("image/");
    const isError = status === "error";
    const isSuccess = status === "success";
    const isPaused = status === "paused";

    const barColorClass = isError ? "bg-rose-500" : isSuccess ? "bg-emerald-500" : "";
    const iconColor = isError ? "text-rose-500" : isSuccess ? "text-emerald-500" : "text-zinc-500 dark:text-zinc-400";
    const fileExtension = file.name.split(".").pop()?.toUpperCase() || "FILE";

    return (
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("w-full bg-white dark:bg-[#0d0d12] border rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] group", isError ? "border-rose-200 dark:border-rose-900/50" : isSuccess ? "border-emerald-200 dark:border-emerald-900/30" : "border-zinc-200 dark:border-zinc-800/80")}>
        <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="flex items-start gap-4 relative z-10">
          <div className={cn("rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden relative shadow-sm", previewUrl && isImage ? "w-14 h-14" : "w-12 h-12")}>
            {previewUrl && isImage ? ( <img src={previewUrl} alt="preview" className="w-full h-full object-cover" /> ) : ( <FileText className={cn("w-5 h-5", iconColor)} /> )}
            {isSuccess && ( <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center"> <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 drop-shadow-md" strokeWidth={3} /> </div> )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center pt-0.5">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-200 truncate pr-2">{file.name}</h4>
              <span className="text-[13px] font-bold text-zinc-700 dark:text-zinc-100 flex-shrink-0">{Math.round(progress)}%</span>
            </div>
            <div className="flex items-center gap-2 mt-1 mb-2">
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-transparent">{fileExtension}</span>
              <span className="text-[11px] font-semibold text-zinc-500">{formatBytes(file.size)}</span>
            </div>
            <div className="flex items-center justify-between mt-auto h-5">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-zinc-500 truncate">
                {isError ? ( <span className="flex items-center text-rose-500 gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />{errorMessage || "Connection lost"}</span> ) : isSuccess ? ( <span className="flex items-center text-emerald-600 dark:text-emerald-500 gap-1.5"><Check className="w-3.5 h-3.5" />Upload complete</span> ) : ( <span>{formatTimeLeft(timeLeft)}</span> )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(isError || isPaused) && onRetry && ( <button onClick={() => onRetry(item.id)} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors border border-zinc-200 dark:border-transparent"><RefreshCw className="w-3 h-3" /> Retry</button> )}
                {onRemove && ( <button onClick={() => onRemove(item.id)} className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"><X className="w-4 h-4" /></button> )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden relative z-10">
          <div ref={progressRef} className={cn("absolute top-0 bottom-0 left-0 rounded-full", barColorClass)} style={{ width: "0%", backgroundColor: !isError && !isSuccess ? primaryColor : undefined }} />
        </div>
      </div>
    );
  }
);
UploadItem.displayName = "UploadItem";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const UPLOAD_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import {
  AlertTriangle,
  Check,
  FileText,
  RefreshCw,
  UploadCloud,
  X,
} from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";

export function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return \`\${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} \${sizes[i]}\`;
}

export function formatTimeLeft(seconds) {
  if (seconds === undefined || seconds < 0) return "Calculating...";
  if (seconds === 0) return "Almost done...";
  if (seconds < 60) return \`\${seconds}s left\`;
  return \`\${Math.floor(seconds / 60)}m \${seconds % 60}s left\`;
}

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result
    ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\`
    : "99, 102, 241";
};

function useThemeColor(defaultColor = "#6366f1") {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fetchColor = () => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) setColor(stored);
    };
    fetchColor();
    window.addEventListener("storage", fetchColor);
    const interval = setInterval(fetchColor, 500);
    return () => {
      window.removeEventListener("storage", fetchColor);
      clearInterval(interval);
    };
  }, [color]);

  return color;
}

export const Dropzone = forwardRef(
  ({ onFilesDrop, maxSize = 50, accept, className, ...props }, ref) => {
    const internalRef = useRef(null);
    const iconRef = useRef(null);
    const textRef = useRef(null);
    const fileInputRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const primaryColor = useThemeColor();
    const dragCounter = useRef(0);

    React.useImperativeHandle(ref, () => internalRef.current);

    useEffect(() => {
      if (!internalRef.current || !iconRef.current || !textRef.current) return;
      const rgbColor = hexToRgb(primaryColor);

      if (isDragging) {
        gsap.to(internalRef.current, {
          borderColor: primaryColor,
          backgroundColor: \`rgba(\${rgbColor}, 0.05)\`,
          boxShadow: \`0 0 30px -5px rgba(\${rgbColor}, 0.2)\`,
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(iconRef.current, { y: -8, scale: 1.1, color: primaryColor, duration: 0.4, ease: "back.out(2)" });
        gsap.to(textRef.current, { y: -4, duration: 0.4, ease: "back.out(2)" });
      } else {
        gsap.to(internalRef.current, { borderColor: "rgba(113, 113, 122, 0.4)", backgroundColor: "transparent", boxShadow: "0 0 0px rgba(0,0,0,0)", duration: 0.3 });
        gsap.to(iconRef.current, { y: 0, scale: 1, color: "#71717a", duration: 0.4, ease: "power2.out" });
        gsap.to(textRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
      }
    }, [isDragging, primaryColor]);

    const handleDragEnter = (e) => {
      e.preventDefault(); e.stopPropagation(); dragCounter.current += 1;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) setIsDragging(true);
    };
    const handleDragLeave = (e) => {
      e.preventDefault(); e.stopPropagation(); dragCounter.current -= 1;
      if (dragCounter.current === 0) setIsDragging(false);
    };
    const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };
    const handleDrop = (e) => {
      e.preventDefault(); e.stopPropagation(); setIsDragging(false); dragCounter.current = 0;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) onFilesDrop(Array.from(e.dataTransfer.files));
    };
    const handleFileSelect = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesDrop(Array.from(e.target.files));
        e.target.value = ""; 
      }
    };

    return (
      <div ref={internalRef} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onDrop={handleDrop} onClick={() => fileInputRef.current?.click()} className={cn("relative w-full rounded-2xl border-2 border-dashed border-zinc-300 dark:border-zinc-700/50 flex flex-col items-center justify-center py-12 px-6 cursor-pointer transition-colors overflow-hidden group bg-white/50 dark:bg-transparent", className)} {...props}>
        <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept={accept} className="hidden" />
        <div ref={iconRef} className="text-zinc-400 dark:text-zinc-500 mb-4 transition-colors pointer-events-none">
          <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
        </div>
        <div ref={textRef} className="flex flex-col items-center text-center pointer-events-none">
          <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-200">{isDragging ? "Release to upload" : "Drop your files here or click to browse"}</h3>
          <p className="text-[13px] text-zinc-500 mt-1">PNG, JPG, PDF, MP4 — up to {maxSize} MB</p>
        </div>
      </div>
    );
  }
);
Dropzone.displayName = "Dropzone";

export const UploadItem = forwardRef(
  ({ item, onRetry, onRemove }, ref) => {
    const { file, progress, status, timeLeft, errorMessage, previewUrl } = item;
    const cardRef = useRef(null);
    const progressRef = useRef(null);
    const glowRef = useRef(null);
    const primaryColor = useThemeColor();

    React.useImperativeHandle(ref, () => cardRef.current);

    useEffect(() => {
      if (progressRef.current) gsap.to(progressRef.current, { width: \`\${progress}%\`, duration: 0.3, ease: "power2.out" });
    }, [progress]);

    const handleMouseMove = (e) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const isDark = document.documentElement.classList.contains("dark");
      const spotlightColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)";
      gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at \${x}px \${y}px, \${spotlightColor}, transparent 40%)\`, duration: 0.1 });
    };

    const handleMouseLeave = () => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, { background: \`radial-gradient(600px circle at 50% 50%, rgba(0,0,0,0), transparent 40%)\`, duration: 0.5 });
    };

    const isImage = file.type.startsWith("image/");
    const isError = status === "error";
    const isSuccess = status === "success";
    const isPaused = status === "paused";

    const barColorClass = isError ? "bg-rose-500" : isSuccess ? "bg-emerald-500" : "";
    const iconColor = isError ? "text-rose-500" : isSuccess ? "text-emerald-500" : "text-zinc-500 dark:text-zinc-400";
    const fileExtension = file.name.split(".").pop()?.toUpperCase() || "FILE";

    return (
      <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className={cn("w-full bg-white dark:bg-[#0d0d12] border rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] group", isError ? "border-rose-200 dark:border-rose-900/50" : isSuccess ? "border-emerald-200 dark:border-emerald-900/30" : "border-zinc-200 dark:border-zinc-800/80")}>
        <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
        <div className="flex items-start gap-4 relative z-10">
          <div className={cn("rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center flex-shrink-0 overflow-hidden relative shadow-sm", previewUrl && isImage ? "w-14 h-14" : "w-12 h-12")}>
            {previewUrl && isImage ? ( <img src={previewUrl} alt="preview" className="w-full h-full object-cover" /> ) : ( <FileText className={cn("w-5 h-5", iconColor)} /> )}
            {isSuccess && ( <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center"> <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400 drop-shadow-md" strokeWidth={3} /> </div> )}
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-center pt-0.5">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-[14px] font-bold text-zinc-900 dark:text-zinc-200 truncate pr-2">{file.name}</h4>
              <span className="text-[13px] font-bold text-zinc-700 dark:text-zinc-100 flex-shrink-0">{Math.round(progress)}%</span>
            </div>
            <div className="flex items-center gap-2 mt-1 mb-2">
              <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-zinc-200 dark:border-transparent">{fileExtension}</span>
              <span className="text-[11px] font-semibold text-zinc-500">{formatBytes(file.size)}</span>
            </div>
            <div className="flex items-center justify-between mt-auto h-5">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-zinc-500 truncate">
                {isError ? ( <span className="flex items-center text-rose-500 gap-1.5"><AlertTriangle className="w-3.5 h-3.5" />{errorMessage || "Connection lost"}</span> ) : isSuccess ? ( <span className="flex items-center text-emerald-600 dark:text-emerald-500 gap-1.5"><Check className="w-3.5 h-3.5" />Upload complete</span> ) : ( <span>{formatTimeLeft(timeLeft)}</span> )}
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(isError || isPaused) && onRetry && ( <button onClick={() => onRetry(item.id)} className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-[11px] font-bold transition-colors border border-zinc-200 dark:border-transparent"><RefreshCw className="w-3 h-3" /> Retry</button> )}
                {onRemove && ( <button onClick={() => onRemove(item.id)} className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"><X className="w-4 h-4" /></button> )}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-900 rounded-full overflow-hidden relative z-10">
          <div ref={progressRef} className={cn("absolute top-0 bottom-0 left-0 rounded-full", barColorClass)} style={{ width: "0%", backgroundColor: !isError && !isSuccess ? primaryColor : undefined }} />
        </div>
      </div>
    );
  }
);
UploadItem.displayName = "UploadItem";`;

export function UploadShowcase() {
  const [files, setFiles] = useState<FileUploadState[]>([]);
  const [variant, setVariant] = useState<
    "slide-right" | "slide-up" | "pop" | "flip"
  >("slide-up");

  // Refs to hold simulation intervals so we can pause/clear them
  const activeSimulations = useRef<Record<string, NodeJS.Timeout>>({});

  const simulateUpload = useCallback((fileId: string, startProgress = 0) => {
    const isDestinedToFail = Math.random() > 0.6;
    let currentProgress = startProgress;
    const failedOnce = false;

    const interval = setInterval(() => {
      setFiles((currentFiles) => {
        const fileIndex = currentFiles.findIndex((f) => f.id === fileId);
        if (fileIndex === -1) {
          clearInterval(interval);
          return currentFiles;
        }

        const fileState = currentFiles[fileIndex];
        const chunk = Math.random() * 4 + 1;
        currentProgress += chunk;

        // Simulate a death at ~90%
        if (
          isDestinedToFail &&
          !failedOnce &&
          currentProgress >= 88 &&
          currentProgress < 95
        ) {
          clearInterval(interval);
          const newFiles = [...currentFiles];
          newFiles[fileIndex] = {
            ...fileState,
            progress: 89,
            status: "error",
            errorMessage: "Connection lost",
            timeLeft: undefined,
          };
          return newFiles;
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          const newFiles = [...currentFiles];
          newFiles[fileIndex] = {
            ...fileState,
            progress: 100,
            status: "success",
            timeLeft: 0,
          };
          return newFiles;
        }

        const remaining = 100 - currentProgress;
        const speed = chunk * 10;
        const timeLeft = Math.max(1, Math.ceil(remaining / speed));

        const newFiles = [...currentFiles];
        newFiles[fileIndex] = {
          ...fileState,
          progress: currentProgress,
          status: "uploading",
          timeLeft,
        };
        return newFiles;
      });
    }, 400);

    activeSimulations.current[fileId] = interval;
  }, []);

  const handleFilesDrop = useCallback(
    (droppedFiles: File[]) => {
      const newFiles: FileUploadState[] = droppedFiles.map((file) => {
        const id = Math.random().toString(36).substring(7);

        let previewUrl;
        if (file.type.startsWith("image/")) {
          previewUrl = URL.createObjectURL(file);
        }

        return { id, file, progress: 0, status: "idle", previewUrl };
      });

      // Add to top of queue for notification feel
      setFiles((prev) => [...newFiles, ...prev]);

      newFiles.forEach((fileState) => {
        simulateUpload(fileState.id);
      });
    },
    [simulateUpload],
  );

  const handleRetry = useCallback(
    (id: string) => {
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === id) {
            simulateUpload(id, f.progress);
            return { ...f, status: "uploading", errorMessage: undefined };
          }
          return f;
        }),
      );
    },
    [simulateUpload],
  );

  const handleRemove = useCallback((id: string) => {
    if (activeSimulations.current[id]) {
      clearInterval(activeSimulations.current[id]);
      delete activeSimulations.current[id];
    }
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  // Framer Motion Map for Queue Entrances
  const getVariants = () => {
    switch (variant) {
      case "slide-right":
        return {
          initial: { opacity: 0, x: -40, height: 0, marginTop: 0 },
          animate: { opacity: 1, x: 0, height: "auto", marginTop: 12 },
          exit: { opacity: 0, x: 40, height: 0, marginTop: 0 },
        };
      case "pop":
        return {
          initial: { opacity: 0, scale: 0.8, height: 0, marginTop: 0 },
          animate: { opacity: 1, scale: 1, height: "auto", marginTop: 12 },
          exit: { opacity: 0, scale: 0.8, height: 0, marginTop: 0 },
        };
      case "flip":
        return {
          initial: { opacity: 0, rotateX: 90, height: 0, marginTop: 0 },
          animate: { opacity: 1, rotateX: 0, height: "auto", marginTop: 12 },
          exit: { opacity: 0, rotateX: -90, height: 0, marginTop: 0 },
        };
      case "slide-up":
      default:
        return {
          initial: { opacity: 0, y: 40, height: 0, marginTop: 0 },
          animate: { opacity: 1, y: 0, height: "auto", marginTop: 12 },
          exit: { opacity: 0, y: -40, height: 0, marginTop: 0 },
        };
    }
  };

  const generateUsageCode = () => {
    return `import { Dropzone, UploadItem, FileUploadState } from "@/components/custom/blocks/UploadBlock";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function UploadFlow() {
  const [files, setFiles] = useState<FileUploadState[]>([]);

  const handleDrop = (newFiles: File[]) => {
    const mapped = newFiles.map(f => ({
      id: Math.random().toString(),
      file: f,
      progress: 0,
      status: "uploading" as const,
      previewUrl: f.type.startsWith("image/") ? URL.createObjectURL(f) : undefined
    }));
    setFiles(prev => [...mapped, ...prev]);
  };

  return (
    <div className="flex flex-col gap-6 max-w-md w-full mx-auto">
      <Dropzone onFilesDrop={handleDrop} />
      
      <div className="flex flex-col">
        {/* AnimatePresence handles the seamless entry/exit of the list items */}
        <AnimatePresence mode="popLayout">
          {files.map(item => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 40, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto", marginTop: 12 }}
              exit={{ opacity: 0, x: -40, height: 0, marginTop: 0 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
            >
              <UploadItem 
                item={item} 
                onRemove={(id) => setFiles(prev => prev.filter(f => f.id !== id))}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}`;
  };

  const doneCount = files.filter((f) => f.status === "success").length;
  const totalCount = files.length;

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <VariantTabs
            label="Queue Entry Animation"
            variants={["slide-up", "slide-right", "pop", "flip"]}
            defaultValue="slide-up"
            onValueChange={(v) => setVariant(v as "slide-up" | "slide-right" | "pop" | "flip")}
          />
          <div className="text-[13px] text-zinc-500 dark:text-zinc-400 max-w-xs text-right hidden md:block">
            Drag images directly from your desktop to see the visual preview and
            entrance effects.
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="UploadBlock"
        tsCode={UPLOAD_CODE_TS}
        jsCode={UPLOAD_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
      >
        <div className="w-full flex justify-center bg-[#fafafa] dark:bg-[#050505] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden py-16 relative min-h-[600px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

          {/* App Container */}
          <div className="w-full max-w-md flex flex-col gap-6 relative z-10 px-4 perspective-[1000px]">
            <Dropzone
              onFilesDrop={handleFilesDrop}
              accept="image/*,application/pdf,video/mp4"
            />

            {files.length > 0 && (
              <div className="flex flex-col">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 px-1">
                  <span>Uploading {totalCount} files</span>
                  <span>
                    {doneCount} of {totalCount} done
                  </span>
                </div>

                {/* Independent Queue Rendering (Notification Style) */}
                <AnimatePresence mode="popLayout">
                  {files.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={getVariants().initial}
                      animate={getVariants().animate}
                      exit={getVariants().exit}
                      transition={{
                        duration: 0.4,
                        type: "spring",
                        bounce: 0.25,
                      }}
                    >
                      <UploadItem
                        item={item}
                        onRetry={handleRetry}
                        onRemove={handleRemove}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
