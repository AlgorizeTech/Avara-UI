"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronsLeftRight,
  Sparkles,
  Sliders,
  Layers,
  Split,
  Scan,
} from "lucide-react";

export type ImageCompareVariant =
  | "classic-slider"
  | "split-handle"
  | "glowing-divider"
  | "badge-overlay"
  | "minimal-line"
  | "hover-reveal"
  | "vertical-slide"
  | "circle-magnifier"
  | "glass-handle"
  | "diagonal-split";

export type ImageCompareColor = "indigo" | "rose" | "emerald" | "zinc" | "primary" | (string & {});

export interface ImageCompareProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ImageCompareVariant;
  color?: ImageCompareColor | string;
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialPosition?: number;
  className?: string;
}

const colorThemes: Record<string, { accent: string; rgb: string }> = {
  primary: {
    accent: "#6366f1",
    rgb: "99, 102, 241",
  },
  indigo: {
    accent: "#6366f1",
    rgb: "99, 102, 241",
  },
  rose: {
    accent: "#f43f5e",
    rgb: "244, 63, 94",
  },
  emerald: {
    accent: "#10b981",
    rgb: "16, 185, 129",
  },
  zinc: {
    accent: "#a1a1aa",
    rgb: "161, 161, 170",
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

const DEFAULT_BEFORE =
  "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80";
const DEFAULT_AFTER =
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&auto=format&fit=crop&q=80";

export function ImageCompare({
  variant = "classic-slider",
  color = "primary",
  beforeImage = DEFAULT_BEFORE,
  afterImage = DEFAULT_AFTER,
  beforeLabel = "Original",
  afterLabel = "Enhanced",
  initialPosition = 50,
  className,
  ...props
}: ImageCompareProps) {
  const isPrimary = color === "primary" || color === "default" || !color;
  const activeColor = isPrimary
    ? "var(--primary)"
    : color?.startsWith("#")
      ? color
      : colorThemes[color]?.accent || "var(--primary)";

  const activeRgb = isPrimary
    ? "var(--primary)"
    : color?.startsWith("#")
      ? hexToRgb(color)
      : colorThemes[color]?.rgb || "99, 102, 241";

  const [sliderPos, setSliderPos] = useState(initialPosition);
  const [sliderPosY, setSliderPosY] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (variant === "vertical-slide") {
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      const percentage = (y / rect.height) * 100;
      setSliderPos(percentage);
    } else if (variant === "circle-magnifier") {
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));
      setSliderPos((x / rect.width) * 100);
      setSliderPosY((y / rect.height) * 100);
    } else {
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (x / rect.width) * 100;
      setSliderPos(percentage);
    }
  }, [variant]);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    },
    [isDragging, handleMove]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging && variant !== "hover-reveal") return;
      handleMove(e.clientX, e.clientY);
    },
    [isDragging, variant, handleMove]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging || variant === "hover-reveal") {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, variant, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    handleMove(clientX, clientY);
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      className={cn(
        "relative w-full h-[480px] sm:h-[560px] rounded-2xl overflow-hidden select-none border transition-all duration-300 cursor-ew-resize group",
        "bg-zinc-950 border-zinc-200 dark:border-zinc-800",
        variant === "vertical-slide" && "cursor-ns-resize",
        variant === "circle-magnifier" && "cursor-crosshair",
        className
      )}
      {...props}
    >
      {/* BEFORE IMAGE (Full Background) */}
      <img
        src={beforeImage}
        alt={beforeLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* AFTER IMAGE (Clipped Container) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none transition-all duration-75"
        style={{
          clipPath:
            variant === "vertical-slide"
              ? `inset(0 0 ${100 - sliderPos}% 0)`
              : variant === "circle-magnifier"
                ? `circle(120px at ${sliderPos}% ${sliderPosY}%)`
                : `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
      </div>

      {/* BEFORE & AFTER LABELS */}
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-black/60 text-white backdrop-blur-md border border-white/20 shadow-md">
          {beforeLabel}
        </span>
      </div>
      <div className="absolute top-4 right-4 z-20 pointer-events-none">
        <span
          className="px-3 py-1.5 rounded-full text-xs font-extrabold text-white backdrop-blur-md border shadow-md"
          style={{
            backgroundColor: isPrimary ? "hsl(var(--primary) / 0.8)" : `rgba(${activeRgb}, 0.8)`,
            borderColor: isPrimary ? "hsl(var(--primary) / 0.4)" : `rgba(${activeRgb}, 0.4)`,
          }}
        >
          {afterLabel}
        </span>
      </div>

      {/* VARIANT 1: CLASSIC SLIDER */}
      {variant === "classic-slider" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-1 transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPos}%`, backgroundColor: activeColor }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border-2 shadow-2xl flex items-center justify-center pointer-events-auto"
            style={{ borderColor: activeColor, color: activeColor }}
          >
            <ChevronsLeftRight className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* VARIANT 2: SPLIT HANDLE */}
      {variant === "split-handle" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 transition-all duration-75 pointer-events-none bg-white/80"
          style={{ left: `${sliderPos}%` }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl border text-xs font-black tracking-wider uppercase shadow-xl flex items-center gap-1.5 pointer-events-auto text-primary-foreground dark:text-zinc-900"
            style={{
              backgroundColor: activeColor,
              borderColor: "rgba(255,255,255,0.4)",
            }}
          >
            <Split className="w-4 h-4" />
            Drag
          </div>
        </div>
      )}

      {/* VARIANT 3: GLOWING DIVIDER */}
      {variant === "glowing-divider" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-1 shadow-[0_0_20px_4px] transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPos}%`, backgroundColor: activeColor, color: activeColor }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-2xl text-primary-foreground dark:text-zinc-900"
            style={{ backgroundColor: activeColor }}
          >
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* VARIANT 4: BADGE OVERLAY */}
      {variant === "badge-overlay" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-1 transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPos}%`, backgroundColor: activeColor }}
        >
          <div
            className="absolute bottom-6 -translate-x-1/2 px-4 py-2 rounded-2xl backdrop-blur-md border shadow-2xl text-xs font-extrabold flex items-center gap-2 pointer-events-auto text-primary-foreground dark:text-zinc-900"
            style={{
              backgroundColor: isPrimary ? "hsl(var(--primary) / 0.85)" : `rgba(${activeRgb}, 0.85)`,
              borderColor: "rgba(255,255,255,0.3)",
            }}
          >
            <Sliders className="w-4 h-4" />
            {Math.round(sliderPos)}% Compare
          </div>
        </div>
      )}

      {/* VARIANT 5: MINIMAL LINE */}
      {variant === "minimal-line" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 transition-all duration-75 pointer-events-none bg-white"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border border-black/20" />
        </div>
      )}

      {/* VARIANT 6: HOVER REVEAL */}
      {variant === "hover-reveal" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-0.5 transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPos}%`, backgroundColor: activeColor }}
        >
          <div
            className="absolute top-6 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase shadow-lg text-primary-foreground dark:text-zinc-900"
            style={{ backgroundColor: activeColor }}
          >
            Hover Reveal
          </div>
        </div>
      )}

      {/* VARIANT 7: VERTICAL SLIDE */}
      {variant === "vertical-slide" && (
        <div
          className="absolute left-0 right-0 z-30 h-1 transition-all duration-75 pointer-events-none"
          style={{ top: `${sliderPos}%`, backgroundColor: activeColor }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white dark:bg-zinc-900 border-2 shadow-2xl flex items-center justify-center pointer-events-auto"
            style={{ borderColor: activeColor, color: activeColor }}
          >
            <ChevronsLeftRight className="w-5 h-5 rotate-90" />
          </div>
        </div>
      )}

      {/* VARIANT 8: CIRCLE MAGNIFIER */}
      {variant === "circle-magnifier" && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 z-30 w-[240px] h-[240px] rounded-full border-4 shadow-2xl pointer-events-none transition-all duration-75"
          style={{ left: `${sliderPos}%`, top: `${sliderPosY}%`, borderColor: activeColor }}
        >
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full text-[10px] font-black shadow-md text-primary-foreground dark:text-zinc-900"
            style={{ backgroundColor: activeColor }}
          >
            Lens Scope
          </div>
        </div>
      )}

      {/* VARIANT 9: GLASS HANDLE */}
      {variant === "glass-handle" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-1 transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPos}%`, backgroundColor: activeColor }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl bg-white/20 dark:bg-black/30 backdrop-blur-xl border-2 shadow-2xl flex items-center justify-center pointer-events-auto text-primary-foreground dark:text-zinc-900"
            style={{ borderColor: activeColor }}
          >
            <Layers className="w-5 h-5" />
          </div>
        </div>
      )}

      {/* VARIANT 10: DIAGONAL SPLIT */}
      {variant === "diagonal-split" && (
        <div
          className="absolute top-0 bottom-0 z-30 w-1 transition-all duration-75 pointer-events-none"
          style={{ left: `${sliderPos}%`, backgroundColor: activeColor }}
        >
          <div
            className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl rotate-45 shadow-2xl flex items-center justify-center pointer-events-auto text-primary-foreground dark:text-zinc-900"
            style={{ backgroundColor: activeColor }}
          >
            <Scan className="w-5 h-5 -rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}
