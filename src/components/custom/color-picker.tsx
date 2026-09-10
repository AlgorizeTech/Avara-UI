"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  Copy,
  Check,
  Pipette,
  ArrowLeftRight,
  Sparkles,
  Shuffle,
  Layers,
  Palette,
  Compass,
  Sliders,
} from "lucide-react";

export type ColorFormat = "hex" | "rgb" | "hsl";

/**
 * The slice of the EyeDropper API this uses. It is still not in lib.dom,
 * and `"EyeDropper" in window` already guards the call site.
 */
type EyeDropperConstructor = new () => {
  open: () => Promise<{ sRGBHex: string }>;
};

export interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
  format?: ColorFormat;
  showPresets?: boolean;
  showEyeDropper?: boolean;
  showAlpha?: boolean;
  showShades?: boolean;
  showHarmonies?: boolean;
  className?: string;
  variant?: "standalone" | "gradient";
}

// ==========================================
// COLOR MATH CONVERSION & HARMONY HELPERS
// ==========================================

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  let cleanHex = hex.replace("#", "").trim();
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(cleanHex, 16);
  if (isNaN(num)) return { r: 208, g: 255, b: 0 };
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rNorm:
        h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0);
        break;
      case gNorm:
        h = (bNorm - rNorm) / d + 2;
        break;
      case bNorm:
        h = (rNorm - gNorm) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hNorm = (h % 360) / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return { r: val, g: val, b: val };
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tAdj = t;
    if (tAdj < 0) tAdj += 1;
    if (tAdj > 1) tAdj -= 1;
    if (tAdj < 1 / 6) return p + (q - p) * 6 * tAdj;
    if (tAdj < 1 / 2) return q;
    if (tAdj < 2 / 3) return p + (q - p) * (2 / 3 - tAdj) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = hue2rgb(p, q, hNorm + 1 / 3);
  const g = hue2rgb(p, q, hNorm);
  const b = hue2rgb(p, q, hNorm - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function hslToHex(h: number, s: number, l: number): string {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
}

const PRESET_SWATCHES_48 = [
  "#ff5252", "#ff793f", "#ffb142", "#ff9f43", "#ee5253", "#ff6b6b", "#e17055", "#d63031", "#eb4d4b", "#ff7675", "#d0ff00", "#badc58",
  "#33d9b2", "#10b981", "#1dd1a1", "#10ac84", "#00b894", "#26de81", "#20bf6b", "#00d2d3", "#0abde3", "#06b6d4", "#34ace0", "#54a0ff",
  "#2e86de", "#0984e3", "#45aaf2", "#2d98da", "#706fd3", "#8b5cf6", "#5f27cd", "#6c5ce7", "#a29bfe", "#ec4899", "#f368e0", "#fd79a8",
  "#e84393", "#a55eea", "#c8d6e5", "#8395a7", "#576574", "#222f3e", "#718093", "#2f3640", "#353b48", "#1e272e", "#ffda79", "#f1c40f"
];

const PRESET_GRADIENTS = [
  { name: "Neon Violet", color1: "#8b5cf6", color2: "#ec4899", color3: "#3b82f6", angle: 135 },
  { name: "Sunset Glow", color1: "#ff5252", color2: "#ffb142", color3: "#ff793f", angle: 135 },
  { name: "Emerald Cyan", color1: "#10b981", color2: "#06b6d4", color3: "#3b82f6", angle: 135 },
  { name: "Ocean Blue", color1: "#34ace0", color2: "#706fd3", color3: "#8b5cf6", angle: 135 },
  { name: "Solar Flare", color1: "#ff793f", color2: "#d0ff00", color3: "#10b981", angle: 135 },
  { name: "Midnight", color1: "#2e86de", color2: "#341f97", color3: "#8b5cf6", angle: 135 },
  { name: "Cosmic Purple", color1: "#6c5ce7", color2: "#a29bfe", color3: "#fd79a8", angle: 135 },
  { name: "Cotton Candy", color1: "#ff758c", color2: "#ff7eb3", color3: "#70a1ff", angle: 135 },
  { name: "Northern Lights", color1: "#00b894", color2: "#0984e3", color3: "#6c5ce7", angle: 135 },
  { name: "Tropical Breeze", color1: "#00cec9", color2: "#81ecec", color3: "#fdcb6e", angle: 135 },
  { name: "Cyberpunk", color1: "#f368e0", color2: "#ff9f43", color3: "#0abde3", angle: 135 },
  { name: "Rose Gold", color1: "#ed4c67", color2: "#f39c12", color3: "#f1c40f", angle: 135 },
];

const VIBRANT_HEX_POOL = [
  "#ff5252", "#ff793f", "#ffb142", "#33d9b2", "#34ace0",
  "#706fd3", "#d0ff00", "#10b981", "#06b6d4", "#8b5cf6",
  "#ec4899", "#f368e0", "#ffda79", "#1dd1a1", "#0abde3"
];

// ==========================================
// SEMANTIC VARIANT 1: 360° COLOR WHEEL STUDIO
// ==========================================

export function StandaloneColorPicker({
  value = "#d0ff00",
  onChange,
  format: initialFormat = "hex",
  showPresets = true,
  showEyeDropper = true,
  showAlpha = true,
  showShades = true,
  showHarmonies = true,
  className,
}: ColorPickerProps) {
  const parseColorToState = (val: string) => {
    const rgb = hexToRgb(val);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    return { h: hsl.h, s: hsl.s, l: hsl.l, a: 1 };
  };

  const [colorHsl, setColorHsl] = useState(() => parseColorToState(value));
  const [selectedFormat, setSelectedFormat] = useState<ColorFormat>(initialFormat);
  const [copied, setCopied] = useState(false);
  const [inputHex, setInputHex] = useState(value);

  const wheelCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const wheelContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingWheel = useRef(false);

  const rgb = hslToRgb(colorHsl.h, colorHsl.s, colorHsl.l);
  const hex = rgbToHex(rgb.r, rgb.g, rgb.b);

  useEffect(() => {
    // Keeps the editable hex field in step with the swatch the user is dragging.
    setInputHex(hex);
  }, [hex]);

  useEffect(() => {
    if (value && value !== hex) {
      // Adopts a new controlled `value`, parsed from a string this component does not otherwise hold.
      setColorHsl(parseColorToState(value));
    }
  }, [value]);

  const updateColor = useCallback(
    (newHsl: { h: number; s: number; l: number; a: number }) => {
      setColorHsl(newHsl);
      const newRgb = hslToRgb(newHsl.h, newHsl.s, newHsl.l);
      const newHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
      onChange?.(newHex);
    },
    [onChange]
  );

  // Draw 360° Color Spectrum Wheel Canvas
  useEffect(() => {
    const canvas = wheelCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const radius = width / 2;
    const innerRadius = radius * 0.52;

    ctx.clearRect(0, 0, width, height);

    for (let x = -radius; x < radius; x++) {
      for (let y = -radius; y < radius; y++) {
        const dist = Math.sqrt(x * x + y * y);
        if (dist <= radius && dist >= innerRadius) {
          let angle = Math.atan2(y, x) * (180 / Math.PI);
          if (angle < 0) angle += 360;

          const sat = Math.min(100, ((dist - innerRadius) / (radius - innerRadius)) * 100);
          ctx.fillStyle = `hsl(${angle}, ${Math.max(20, sat)}%, 50%)`;
          ctx.fillRect(x + radius, y + radius, 1.2, 1.2);
        }
      }
    }
  }, []);

  const handleWheelPointer = useCallback(
    (clientX: number, clientY: number) => {
      const container = wheelContainerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = clientX - centerX;
      const dy = clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxRadius = rect.width / 2;
      const innerRadius = maxRadius * 0.52;

      let angle = Math.atan2(dy, dx) * (180 / Math.PI);
      if (angle < 0) angle += 360;

      const sat = Math.min(
        100,
        Math.max(0, ((dist - innerRadius) / (maxRadius - innerRadius)) * 100)
      );

      updateColor({
        ...colorHsl,
        h: Math.round(angle),
        s: Math.round(sat),
      });
    },
    [colorHsl, updateColor]
  );

  const handleWheelStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDraggingWheel.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    handleWheelPointer(clientX, clientY);
  };

  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      if (isDraggingWheel.current) {
        handleWheelPointer(clientX, clientY);
      }
    };

    const handlePointerUp = () => {
      isDraggingWheel.current = false;
    };

    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove);
    window.addEventListener("touchend", handlePointerUp);

    return () => {
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
    };
  }, [handleWheelPointer]);

  const handleCopy = () => {
    let outputText = hex;
    if (selectedFormat === "rgb") {
      outputText = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    } else if (selectedFormat === "hsl") {
      outputText = `hsl(${colorHsl.h}, ${colorHsl.s}%, ${colorHsl.l}%)`;
    }

    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEyeDropper = async () => {
    if (typeof window !== "undefined" && "EyeDropper" in window) {
      try {
        const eyeDropper = new (
          window as unknown as { EyeDropper: EyeDropperConstructor }
        ).EyeDropper();
        const result = await eyeDropper.open();
        if (result?.sRGBHex) {
          setColorHsl(parseColorToState(result.sRGBHex));
          onChange?.(result.sRGBHex);
        }
      } catch {
        // User cancelled
      }
    }
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputHex(val);
    if (/^#[0-9A-F]{6}$/i.test(val)) {
      setColorHsl(parseColorToState(val));
      onChange?.(val);
    }
  };

  const rad = (colorHsl.h * Math.PI) / 180;
  const minPercent = 26;
  const maxPercent = 48;
  const currentRadiusPercent = minPercent + (colorHsl.s / 100) * (maxPercent - minPercent);
  const handleX = 50 + currentRadiusPercent * Math.cos(rad);
  const handleY = 50 + currentRadiusPercent * Math.sin(rad);

  const getFormattedValue = () => {
    if (selectedFormat === "rgb") return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    if (selectedFormat === "hsl") return `${colorHsl.h}°, ${colorHsl.s}%, ${colorHsl.l}%`;
    return inputHex.toUpperCase();
  };

  const shades = [10, 20, 30, 40, 50, 60, 70, 80, 90, 95].map((lightness) =>
    hslToHex(colorHsl.h, colorHsl.s, lightness)
  );

  return (
    <article
      className={cn(
        "w-full max-w-5xl p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col lg:flex-row gap-8 text-zinc-900 dark:text-zinc-100 select-none backdrop-blur-xl",
        className
      )}
    >
      {/* LEFT ASIDE: 360° Color Spectrum Wheel Canvas & Sliders */}
      <aside className="w-full lg:w-[380px] shrink-0 flex flex-col gap-6 items-center">
        {/* Canvas Spectrum Container */}
        <figure className="relative w-full aspect-square max-w-[290px] flex items-center justify-center p-1 m-0">
          <div
            ref={wheelContainerRef}
            onMouseDown={handleWheelStart}
            onTouchStart={handleWheelStart}
            className="relative w-[270px] h-[270px] sm:w-[285px] sm:h-[285px] rounded-full p-2 bg-zinc-50 dark:bg-zinc-800/60 flex items-center justify-center cursor-crosshair overflow-hidden ring-8 ring-zinc-100 dark:ring-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60"
          >
            <canvas
              ref={wheelCanvasRef}
              width={270}
              height={270}
              className="w-full h-full rounded-full object-cover pointer-events-none"
            />

            {/* Center Orb Preview Eye */}
            <div
              className="absolute size-32 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 flex flex-col items-center justify-center p-2 text-center transition-all duration-200 pointer-events-none group z-10"
              style={{ backgroundColor: hex, borderRadius: "50%" }}
            >
              <span className="font-mono text-sm font-black text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] uppercase tracking-wider">
                {hex}
              </span>
              <span className="text-[10px] font-bold text-white/90 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] uppercase">
                {colorHsl.h}° / {colorHsl.s}%
              </span>
            </div>

            {/* Canvas Handle */}
            <div
              className="absolute size-6 rounded-full border-2 border-white ring-4 ring-black/30 pointer-events-none transition-transform duration-75 z-20"
              style={{
                left: `${handleX}%`,
                top: `${handleY}%`,
                transform: "translate(-50%, -50%)",
                backgroundColor: hex,
              }}
            />
          </div>
        </figure>

        {/* Sliders Fieldset */}
        <fieldset className="w-full space-y-3 p-0 border-0 m-0">
          {/* Lightness Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
              <span>Lightness / Brightness</span>
              <span>{colorHsl.l}%</span>
            </div>
            <div className="relative w-full h-4.5 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `linear-gradient(to right, #ffffff, hsl(${colorHsl.h}, ${colorHsl.s}%, 50%), #000000)`,
                }}
              />
              <input
                type="range"
                min={0}
                max={100}
                step={0.5}
                value={colorHsl.l}
                onChange={(e) => updateColor({ ...colorHsl, l: parseFloat(e.target.value) })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div
                className="absolute top-1/2 size-5 rounded-full bg-white border border-zinc-300 ring-2 ring-black/10 pointer-events-none -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${colorHsl.l}%` }}
              />
            </div>
          </div>

          {/* Opacity Slider */}
          {showAlpha && (
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[10px] font-extrabold text-zinc-400 uppercase tracking-wider">
                <span>Opacity Channel</span>
                <span>{Math.round(colorHsl.a * 100)}%</span>
              </div>
              <div className="relative w-full h-4.5 rounded-full overflow-hidden border border-black/10 dark:border-white/10">
                <div
                  className="absolute inset-0 rounded-full opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)",
                    backgroundSize: "8px 8px",
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `linear-gradient(to right, transparent, ${hex})`,
                  }}
                />
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={colorHsl.a}
                  onChange={(e) => updateColor({ ...colorHsl, a: parseFloat(e.target.value) })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div
                  className="absolute top-1/2 size-5 rounded-full bg-white border border-zinc-300 ring-2 ring-black/10 pointer-events-none -translate-y-1/2 -translate-x-1/2"
                  style={{ left: `${colorHsl.a * 100}%` }}
                />
              </div>
            </div>
          )}
        </fieldset>

        {/* Row 1: Swatch Indicator & Code Text Input */}
        <div className="w-full flex items-center gap-2">
          <div
            className="size-10 rounded-2xl border-2 border-white dark:border-zinc-800 shrink-0 transition-all"
            style={{ backgroundColor: hex }}
          />

          <div className="relative flex-1 flex items-center bg-zinc-100 dark:bg-zinc-800/90 rounded-2xl px-3.5 py-2 border border-zinc-200 dark:border-zinc-700/60">
            <input
              type="text"
              value={getFormattedValue()}
              onChange={handleHexInputChange}
              className="w-full bg-transparent font-mono text-xs font-black text-zinc-900 dark:text-zinc-100 outline-none uppercase tracking-wider"
            />
            <button
              onClick={handleCopy}
              className="p-1 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors"
              title="Copy color code"
            >
              {copied ? (
                <Check className="size-4 text-emerald-500" />
              ) : (
                <Copy className="size-4" />
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Full-Width Format Selector (HEX / RGB / HSL) & EyeDropper */}
        <div className="w-full flex items-center gap-2">
          <nav className="flex-1 flex items-center justify-between bg-zinc-100 dark:bg-zinc-800/90 p-1 rounded-2xl border border-zinc-200 dark:border-zinc-700/60 text-[10px] font-extrabold gap-1">
            {(["hex", "rgb", "hsl"] as ColorFormat[]).map((fmt) => (
              <button
                key={fmt}
                onClick={() => setSelectedFormat(fmt)}
                className={cn(
                  "flex-1 py-1.5 rounded-xl uppercase transition-all text-center",
                  selectedFormat === fmt
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                )}
              >
                {fmt}
              </button>
            ))}
          </nav>

          {showEyeDropper && typeof window !== "undefined" && "EyeDropper" in window && (
            <button
              onClick={handleEyeDropper}
              className="size-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-zinc-600 dark:text-zinc-300 transition-colors shrink-0"
              title="Pick color from screen"
            >
              <Pipette className="size-4" />
            </button>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN SECTION: EXPANDED PALETTES & SPECTRUM STUDIO */}
      <main className="flex-1 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-zinc-100 dark:border-zinc-800/80 pt-6 lg:pt-0 lg:pl-8 min-w-0">
        {/* 10-Step Lightness Spectrum */}
        {showShades && (
          <section className="space-y-2">
            <header className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider min-w-0 truncate">
                <Layers className="size-4 text-indigo-500 shrink-0" />
                <span className="truncate">Lightness Spectrum</span>
                <span className="hidden sm:inline text-zinc-400 font-normal">(10-Step)</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-zinc-400 shrink-0">10% — 95%</span>
            </header>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
              {shades.map((shadeHex, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setColorHsl(parseColorToState(shadeHex));
                    onChange?.(shadeHex);
                  }}
                  className="h-10 rounded-xl border border-black/10 dark:border-white/10 transition-transform hover:scale-110 flex flex-col justify-end p-1 group"
                  style={{ backgroundColor: shadeHex }}
                  title={shadeHex}
                >
                  <span className="text-[7px] font-mono font-extrabold mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {shadeHex}
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}

        {/* 10-Step Saturation Spectrum */}
        <section className="space-y-2">
          <header className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider min-w-0 truncate">
              <Sliders className="size-4 text-purple-500 shrink-0" />
              <span className="truncate">Saturation Spectrum</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-zinc-400 shrink-0">10% — 100%</span>
          </header>

          <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((sat, idx) => {
              const satHex = hslToHex(colorHsl.h, sat, colorHsl.l);
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setColorHsl(parseColorToState(satHex));
                    onChange?.(satHex);
                  }}
                  className="h-10 rounded-xl border border-black/10 dark:border-white/10 transition-transform hover:scale-110 flex flex-col justify-end p-1 group"
                  style={{ backgroundColor: satHex }}
                  title={`${sat}% Saturation: ${satHex}`}
                >
                  <span className="text-[7px] font-mono font-extrabold mix-blend-difference text-white opacity-0 group-hover:opacity-100 transition-opacity truncate">
                    {sat}%
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Curated Theme Collections / Color Harmonies */}
        {showHarmonies && (
          <section className="space-y-2">
            <header className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider min-w-0 truncate">
              <Palette className="size-4 text-emerald-500 shrink-0" />
              <span className="truncate">Curated Theme Collections</span>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { name: "Neon Cyber", colors: ["#00f5d4", "#7b2cbf", "#ff007f", "#00bbf9"] },
                { name: "Pastel Dreams", colors: ["#ffc6ff", "#bdb2ff", "#a0c4ff", "#9bf6ff"] },
                { name: "Warm Autumn", colors: ["#d4a373", "#faedcd", "#fefae0", "#bc6c25"] },
                { name: "Deep Midnight", colors: ["#0f172a", "#1e293b", "#334155", "#64748b"] },
              ].map((theme, idx) => (
                <figure
                  key={idx}
                  className="p-2 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/60 dark:border-zinc-700/60 flex flex-col gap-1.5 m-0"
                >
                  <figcaption className="text-[10px] font-extrabold text-zinc-600 dark:text-zinc-300 truncate">
                    {theme.name}
                  </figcaption>
                  <div className="flex gap-1">
                    {theme.colors.map((c, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => {
                          setColorHsl(parseColorToState(c));
                          onChange?.(c);
                        }}
                        className="flex-1 h-5 rounded-lg border border-black/10 dark:border-white/10 transition-transform hover:scale-110"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* 48 Expanded Preset Palette Swatches */}
        {showPresets && (
          <section className="space-y-2">
            <header className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider min-w-0 truncate">
              <Sparkles className="size-4 text-amber-500 shrink-0" />
              <span className="truncate">Preset Palette</span>
              <span className="hidden sm:inline text-zinc-400 font-normal">(48 Swatches)</span>
            </header>

            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
              {PRESET_SWATCHES_48.map((presetHex, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setColorHsl(parseColorToState(presetHex));
                    onChange?.(presetHex);
                  }}
                  className={cn(
                    "size-7 sm:size-8 rounded-full border-2 border-white dark:border-zinc-800 transition-transform hover:scale-115 active:scale-95",
                    hex.toLowerCase() === presetHex.toLowerCase() &&
                      "ring-2 ring-zinc-900 dark:ring-white scale-110"
                  )}
                  style={{ backgroundColor: presetHex }}
                  title={presetHex}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </article>
  );
}

// ==========================================
// SEMANTIC VARIANT 2: GRADIENT STUDIO GENERATOR
// ==========================================

export function GradientColorPicker({
  value,
  onChange,
  className,
}: ColorPickerProps) {
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic">("linear");
  const [stopCount, setStopCount] = useState<2 | 3>(2);
  // `value` is a single colour, so for a gradient it can only mean the
  // first stop. Anything that is not a hex colour (a gradient string, say)
  // falls back rather than seeding a broken stop.
  const [color1, setColor1] = useState(
    value && /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(value)
      ? value
      : "#8b5cf6",
  );
  const [color2, setColor2] = useState("#ec4899");
  const [color3, setColor3] = useState("#3b82f6");
  const [angle, setAngle] = useState(135);
  const [copied, setCopied] = useState(false);

  const getGradientCss = useCallback(() => {
    const stops = stopCount === 3 ? `${color1}, ${color2}, ${color3}` : `${color1}, ${color2}`;
    if (gradientType === "radial") return `radial-gradient(circle at center, ${stops})`;
    if (gradientType === "conic") return `conic-gradient(from ${angle}deg at 50% 50%, ${stops})`;
    return `linear-gradient(${angle}deg, ${stops})`;
  }, [gradientType, stopCount, color1, color2, color3, angle]);

  const gradientCss = getGradientCss();

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    onChange?.(gradientCss);
  }, [gradientCss, onChange]);

  const handleCopyCss = () => {
    navigator.clipboard.writeText(`background: ${gradientCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    const temp = color1;
    setColor1(color2);
    setColor2(temp);
  };

  const handleRandomize = () => {
    const r1 = VIBRANT_HEX_POOL[Math.floor(Math.random() * VIBRANT_HEX_POOL.length)];
    const r2 = VIBRANT_HEX_POOL[Math.floor(Math.random() * VIBRANT_HEX_POOL.length)];
    const r3 = VIBRANT_HEX_POOL[Math.floor(Math.random() * VIBRANT_HEX_POOL.length)];
    setColor1(r1);
    setColor2(r2);
    setColor3(r3);
    setAngle(Math.floor(Math.random() * 72) * 5);
  };

  return (
    <article
      className={cn(
        "w-full max-w-5xl p-4 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex flex-col gap-6 text-zinc-900 dark:text-zinc-100 select-none",
        className
      )}
    >
      {/* Full-Width Wide Live Gradient Banner */}
      <figure
        className="relative w-full h-48 sm:h-56 rounded-3xl border border-black/10 dark:border-white/10 flex flex-col justify-between p-4 sm:p-6 transition-all duration-200 overflow-hidden group m-0"
        style={{ background: gradientCss }}
      >
        <header className="flex flex-wrap items-center justify-between gap-2 z-10">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-black text-white uppercase tracking-wider border border-white/20">
              {gradientType === "linear" ? `${angle}° Linear` : gradientType}
            </span>
            <span className="hidden sm:inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
              {stopCount} Stops
            </span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={handleRandomize}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 hover:bg-black/60 transition-all"
              title="Randomize Gradient"
            >
              <Shuffle className="size-3" />
              <span className="hidden sm:inline">Randomize</span>
            </button>
            <button
              onClick={handleCopyCss}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 hover:bg-black/60 transition-all"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-400" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="size-3 text-white/90" />
                  <span>Copy CSS</span>
                </>
              )}
            </button>
          </div>
        </header>

        <figcaption className="z-10 flex items-center justify-between bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/15 gap-2">
          <span className="text-[11px] font-mono font-black text-white drop-shadow-md truncate">
            {gradientCss}
          </span>
          <span className="text-[9px] font-bold text-white/80 uppercase tracking-widest shrink-0">
            CSS Rule
          </span>
        </figcaption>
      </figure>

      {/* Controls Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Style Tabs */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Gradient Style
          </label>
          <nav className="flex items-center justify-between gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-bold">
            {(["linear", "radial", "conic"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setGradientType(type)}
                className={cn(
                  "flex-1 py-1.5 rounded-xl capitalize text-xs transition-all",
                  gradientType === type
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                )}
              >
                {type}
              </button>
            ))}
          </nav>
        </div>

        {/* Color Stops Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Color Stops
          </label>
          <nav className="flex items-center justify-between gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-bold">
            <button
              onClick={() => setStopCount(2)}
              className={cn(
                "flex-1 py-1.5 rounded-xl transition-all",
                stopCount === 2
                  ? "bg-purple-600 text-white font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              2 Color Stops
            </button>
            <button
              onClick={() => setStopCount(3)}
              className={cn(
                "flex-1 py-1.5 rounded-xl transition-all",
                stopCount === 3
                  ? "bg-purple-600 text-white font-bold shadow-sm"
                  : "text-zinc-400 hover:text-zinc-600"
              )}
            >
              3 Color Stops
            </button>
          </nav>
        </div>

        {/* Angle Slider & Swap */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Angle & Direction ({angle}°)
          </label>
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/80 px-3.5 py-2 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
            <button
              onClick={handleSwap}
              className="p-1.5 rounded-xl bg-white dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-zinc-700 dark:text-zinc-200 shadow-sm transition-colors"
              title="Swap Stop 1 & Stop 2"
            >
              <ArrowLeftRight className="size-4" />
            </button>
            <div className="flex-1 flex items-center gap-2">
              <Compass className="size-4 text-zinc-400" />
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={angle}
                disabled={gradientType === "radial"}
                onChange={(e) => setAngle(parseInt(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer disabled:opacity-40"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Color Stop Inputs Row */}
      <fieldset className={cn("grid gap-3 items-center p-0 border-0 m-0", stopCount === 3 ? "grid-cols-1 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2")}>
        {/* Stop 1 */}
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/80 p-2.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
          <input
            type="color"
            value={color1}
            onChange={(e) => setColor1(e.target.value)}
            className="size-8 rounded-xl cursor-pointer border-0 p-0 bg-transparent shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-zinc-400 uppercase">Stop 1 Color</div>
            <div className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 uppercase truncate">
              {color1}
            </div>
          </div>
        </div>

        {/* Stop 2 */}
        <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/80 p-2.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
          <input
            type="color"
            value={color2}
            onChange={(e) => setColor2(e.target.value)}
            className="size-8 rounded-xl cursor-pointer border-0 p-0 bg-transparent shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-bold text-zinc-400 uppercase">Stop 2 Color</div>
            <div className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 uppercase truncate">
              {color2}
            </div>
          </div>
        </div>

        {/* Stop 3 */}
        {stopCount === 3 && (
          <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-800/80 p-2.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
            <input
              type="color"
              value={color3}
              onChange={(e) => setColor3(e.target.value)}
              className="size-8 rounded-xl cursor-pointer border-0 p-0 bg-transparent shrink-0"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[10px] font-bold text-zinc-400 uppercase">Stop 3 Color</div>
              <div className="text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200 uppercase truncate">
                {color3}
              </div>
            </div>
          </div>
        )}
      </fieldset>

      {/* Preset Gradients Gallery Grid */}
      <section className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 space-y-3">
        <header className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 uppercase tracking-wider min-w-0 truncate">
          <Sparkles className="size-4 text-amber-500 shrink-0" />
          <span className="truncate">Curated Gradient Presets Gallery</span>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {PRESET_GRADIENTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setColor1(p.color1);
                setColor2(p.color2);
                if (p.color3) setColor3(p.color3);
                setAngle(p.angle);
              }}
              className="h-14 rounded-2xl border border-black/10 dark:border-white/10 shadow-sm hover:scale-105 transition-transform flex flex-col justify-end p-2 relative overflow-hidden group"
              style={{
                background: `linear-gradient(${p.angle}deg, ${p.color1}, ${p.color2}${p.color3 ? `, ${p.color3}` : ""})`,
              }}
              title={p.name}
            >
              <span className="text-[10px] font-extrabold text-white drop-shadow-md truncate">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </section>
    </article>
  );
}

// ==========================================
// MAIN EXPORTED COLOR PICKER COMPONENT
// ==========================================

export function ColorPicker(props: ColorPickerProps) {
  if (props.variant === "gradient") {
    return <GradientColorPicker {...props} />;
  }

  return <StandaloneColorPicker {...props} />;
}
