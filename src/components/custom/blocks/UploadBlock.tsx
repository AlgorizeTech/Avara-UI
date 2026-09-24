"use client";

import { cn } from "@/lib/utils";
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

// ==========================================
// MOTION (library-free)
// ==========================================
// GSAP's back.out(2), power2.out and power1.out as CSS easings.
const BACK_OUT_2 =
  "linear(0, .2225, .4153, .5802, .7191, .8341, .9271, 1, 1.0547, 1.0933, 1.1176, 1.1296, 1.1312, 1.1244, 1.1111, 1.0933, 1.0729, 1.0518, 1.0321, 1.0155, 1.0042, 1)";
const POWER2_OUT = "cubic-bezier(.3333, 1, .6667, 1)";
const POWER1_OUT = "cubic-bezier(.3333, .6667, .6667, 1)";

const running = new WeakMap<HTMLElement, Animation>();

/**
 * Tween `el` to `to` from wherever it is right now (mid-flight included), so a
 * new target takes over a running tween with the full duration and its own
 * ease. The end values are written inline, so nothing is held by a fill.
 */
function tweenTo(el: HTMLElement, to: Record<string, string>, duration: number, easing: string) {
  const computed = getComputedStyle(el);
  const from: Record<string, string> = {};
  for (const key of Object.keys(to)) from[key] = computed.getPropertyValue(key);
  running.get(el)?.cancel();
  for (const [key, value] of Object.entries(to)) el.style.setProperty(key, value);
  if (typeof el.animate !== "function") return;
  running.set(el, el.animate([from, to], { duration: duration * 1000, easing }));
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

    // The icon and text lift on drag (Web Animations on `translate`/`scale`);
    // the colours (border, tint, glow, icon) are Tailwind `data-[dragging]`
    // classes on the token.
    useEffect(() => {
      if (!iconRef.current || !textRef.current) return;

      if (isDragging) {
        tweenTo(iconRef.current, { translate: "0px -8px", scale: "1.1" }, 0.4, BACK_OUT_2);
        tweenTo(textRef.current, { translate: "0px -4px" }, 0.4, BACK_OUT_2);
      } else {
        tweenTo(iconRef.current, { translate: "0px 0px", scale: "1" }, 0.4, POWER2_OUT);
        tweenTo(textRef.current, { translate: "0px 0px" }, 0.4, POWER2_OUT);
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
// Registered so the spotlight's position and colour interpolate.
const SPOTLIGHT_CSS = `
@property --upload-spot-x { syntax: "<length-percentage>"; inherits: false; initial-value: 50%; }
@property --upload-spot-y { syntax: "<length-percentage>"; inherits: false; initial-value: 50%; }
@property --upload-spot-color { syntax: "<color>"; inherits: false; initial-value: rgba(0, 0, 0, 0); }
`;

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
        tweenTo(progressRef.current, { width: `${progress}%` }, 0.3, POWER2_OUT);
      }
    }, [progress]);

    // Mouse-tracking Spotlight Effect (Adaptive for Light/Dark Mode). The
    // gradient reads registered custom properties (see SPOTLIGHT_CSS), which
    // CSS can transition where it cannot transition a gradient itself.
    const moveSpotlight = (x: string, y: string, color: string, duration: number) => {
      const glow = glowRef.current;
      if (!glow) return;
      glow.style.transition = [
        "opacity 300ms cubic-bezier(0.4, 0, 0.2, 1)",
        ...["--upload-spot-x", "--upload-spot-y", "--upload-spot-color"].map(
          (property) => `${property} ${duration}s ${POWER1_OUT}`,
        ),
      ].join(", ");
      glow.style.setProperty("--upload-spot-x", x);
      glow.style.setProperty("--upload-spot-y", y);
      glow.style.setProperty("--upload-spot-color", color);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !glowRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isDark = document.documentElement.classList.contains("dark");
      const spotlightColor = isDark
        ? "rgba(255,255,255,0.06)"
        : "rgba(0,0,0,0.04)";

      moveSpotlight(`${x}px`, `${y}px`, spotlightColor, 0.1);
    };

    const handleMouseLeave = () => {
      moveSpotlight("50%", "50%", "rgba(0,0,0,0)", 0.5);
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
        <style>{SPOTLIGHT_CSS}</style>
        <div
          ref={glowRef}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(600px circle at var(--upload-spot-x) var(--upload-spot-y), var(--upload-spot-color), transparent 40%)",
          }}
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
