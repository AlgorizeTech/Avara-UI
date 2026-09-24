"use client";

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
import { formatBytes, formatTimeLeft } from "./upload-format";

// ==========================================
// TYPES, FORMATTERS & THEME ENGINE
// ==========================================
export type UploadStatus =
  | "idle"
  | "uploading"
  | "paused"
  | "error"
  | "success"
  | (string & {});

export interface FileUploadState {
  id: string;
  file: File;
  progress: number;
  status: UploadStatus;
  timeLeft?: number; // in seconds
  errorMessage?: string;
  previewUrl?: string;
}

// Accent colour comes from the `--primary` theme token (`border-primary/30`,
// `bg-primary`, `text-primary`), so the dropzone and the progress bar follow
// the site theme and the docs colour picker with no prop and no polling.

// ==========================================
// 1. DROPZONE (Glitch-Free & Theme Adaptive)
// ==========================================
export interface DropzoneProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesDrop: (files: File[]) => void;
  maxSize?: number; // in MB
  accept?: string;
}

export const Dropzone = forwardRef<HTMLDivElement, DropzoneProps>(
  ({ onFilesDrop, maxSize = 50, accept, className, ...props }, ref) => {
    const internalRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    // Drag counter prevents bubbling glitches when hovering over children
    const dragCounter = useRef(0);

    React.useImperativeHandle(ref, () => internalRef.current as HTMLDivElement);

    // GSAP moves the icon and text on drag; the colours (border, tint, glow,
    // icon) are Tailwind `data-[dragging]` classes on the token, since GSAP
    // cannot tween an oklch/var() colour.
    useEffect(() => {
      if (!iconRef.current || !textRef.current) return;

      if (isDragging) {
        gsap.to(iconRef.current, { y: -8, scale: 1.1, duration: 0.4, ease: "back.out(2)" });
        gsap.to(textRef.current, { y: -4, duration: 0.4, ease: "back.out(2)" });
      } else {
        gsap.to(iconRef.current, { y: 0, scale: 1, duration: 0.4, ease: "power2.out" });
        gsap.to(textRef.current, { y: 0, duration: 0.4, ease: "power2.out" });
      }
    }, [isDragging]);

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current += 1;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounter.current -= 1;
      if (dragCounter.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFilesDrop(Array.from(e.dataTransfer.files));
      }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        onFilesDrop(Array.from(e.target.files));
        e.target.value = ""; // Reset to allow re-selecting same file
      }
    };

    return (
      <div
        ref={internalRef}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        data-dragging={isDragging || undefined}
        className={cn(
          "relative w-full rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center py-12 px-6 cursor-pointer overflow-hidden group bg-card/50",
          "transition-[border-color,background-color,box-shadow] duration-300",
          "data-[dragging]:border-primary/30 data-[dragging]:bg-primary/5 data-[dragging]:shadow-[0_0_30px_-5px_color-mix(in_oklab,var(--primary)_20%,transparent)]",
          className,
        )}
        {...props}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          multiple
          accept={accept}
          className="hidden"
        />

        {/* pointer-events-none prevents drag events from bubbling and glitching the hover state */}
        <div
          ref={iconRef}
          className="text-muted-foreground mb-4 transition-colors duration-300 pointer-events-none group-data-[dragging]:text-primary"
        >
          <UploadCloud className="w-10 h-10" strokeWidth={1.5} />
        </div>

        <div
          ref={textRef}
          className="flex flex-col items-center text-center pointer-events-none"
        >
          <h3 className="text-base font-semibold text-foreground">
            {isDragging
              ? "Release to upload"
              : "Drop your files here or click to browse"}
          </h3>
          <p className="text-[13px] text-muted-foreground mt-1">
            PNG, JPG, PDF, MP4 — up to {maxSize} MB
          </p>
        </div>
      </div>
    );
  },
);
Dropzone.displayName = "Dropzone";

// ==========================================
// 2. UPLOAD ITEM (Notification Style + Spotlight)
// ==========================================
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


    React.useImperativeHandle(ref, () => cardRef.current as HTMLDivElement);

    // Smooth Progress Bar Animation
    useEffect(() => {
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: `${progress}%`,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }, [progress]);

    // Mouse-tracking Spotlight Effect (Adaptive for Light/Dark Mode)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isDark = document.documentElement.classList.contains("dark");
      const spotlightColor = isDark
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)";

      gsap.to(glowRef.current, {
        background: `radial-gradient(600px circle at ${x}px ${y}px, ${spotlightColor}, transparent 40%)`,
        duration: 0.1,
      });
    };

    const handleMouseLeave = () => {
      if (!glowRef.current) return;
      gsap.to(glowRef.current, {
        background: `radial-gradient(600px circle at 50% 50%, rgba(0,0,0,0), transparent 40%)`,
        duration: 0.5,
      });
    };

    const isImage = file.type.startsWith("image/");
    const isError = status === "error";
    const isSuccess = status === "success";
    const isPaused = status === "paused";

    // Determine structural colors based on state
    const barColorClass = isError
      ? "bg-rose-500"
      : isSuccess
        ? "bg-emerald-500"
        : "bg-primary";

    const iconColor = isError
      ? "text-rose-500"
      : isSuccess
        ? "text-emerald-500"
        : "text-muted-foreground";

    // Extract file extension for badge
    const fileExtension = file.name.split(".").pop()?.toUpperCase() || "FILE";

    return (
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "w-full bg-card text-card-foreground border rounded-2xl p-4 flex flex-col gap-4 relative overflow-hidden transition-colors duration-300 shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_20px_rgba(0,0,0,0.2)] group",
          isError
            ? "border-rose-200 dark:border-rose-900/50"
            : isSuccess
              ? "border-emerald-200 dark:border-emerald-900/30"
              : "border-border",
        )}
      >
        {/* Spotlight Overlay Layer */}
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        />

        <div className="flex items-start gap-4 relative z-10">
          {/* Signal 04: Upload Preview */}
          <div
            className={cn(
              "rounded-xl bg-muted border border-border flex items-center justify-center flex-shrink-0 overflow-hidden relative shadow-sm",
              previewUrl && isImage ? "w-14 h-14" : "w-12 h-12",
            )}
          >
            {previewUrl && isImage ? (
              <img
                src={previewUrl}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FileText className={cn("w-5 h-5", iconColor)} />
            )}

            {/* Success Overlay Badge */}
            {isSuccess && (
              <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center">
                <Check
                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400 drop-shadow-md"
                  strokeWidth={3}
                />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-center pt-0.5">
            <div className="flex items-center justify-between gap-4">
              <h4 className="text-[14px] font-semibold text-foreground truncate pr-2">
                {file.name}
              </h4>
              <span className="text-[13px] font-semibold text-foreground flex-shrink-0">
                {Math.round(progress)}%
              </span>
            </div>

            {/* Badges / File Info */}
            <div className="flex items-center gap-2 mt-1 mb-2">
              <span className="bg-muted text-muted-foreground px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border border-border dark:border-transparent">
                {fileExtension}
              </span>
              <span className="text-[11px] font-semibold text-muted-foreground">
                {formatBytes(file.size)}
              </span>
            </div>

            {/* Honest Progress & Inline Retry Messaging */}
            <div className="flex items-center justify-between mt-auto h-5">
              <div className="flex items-center gap-2 text-[12px] font-semibold text-muted-foreground truncate">
                {isError ? (
                  <span className="flex items-center text-rose-500 gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {errorMessage || "Connection lost"}
                  </span>
                ) : isSuccess ? (
                  <span className="flex items-center text-emerald-600 dark:text-emerald-500 gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Upload complete
                  </span>
                ) : (
                  <span>{formatTimeLeft(timeLeft)}</span>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {(isError || isPaused) && onRetry && (
                  <button
                    onClick={() => onRetry(item.id)}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted hover:bg-muted text-foreground text-[11px] font-semibold transition-colors border border-border dark:border-transparent"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                )}
                {onRemove && (
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden relative z-10">
          <div
            ref={progressRef}
            className={cn(
              "absolute top-0 bottom-0 left-0 rounded-full",
              barColorClass,
            )}
            style={{ width: "0%" }}
          />
        </div>
      </div>
    );
  },
);
UploadItem.displayName = "UploadItem";
