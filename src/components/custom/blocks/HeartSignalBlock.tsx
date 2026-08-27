"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export type HeartSignalVariant = "ecg-line" | "cardiac-wave" | "pulse-heart";

export interface HeartSignalProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: HeartSignalVariant;
  bpm?: number;
  speed?: number;
  color?: string;
  showBPM?: boolean;
  showGrid?: boolean;
  className?: string;
}

const PRESET_ACCENT_HEX: Record<string, string> = {
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
  zinc: "#18181b",
};

/** Turns a preset accent name or custom hex string into a CSS color, or null for default theme. */
function resolveColorAccent(color?: string): string | null {
  if (!color || color === "primary" || color === "default") return null;
  return PRESET_ACCENT_HEX[color] ?? color;
}

export function HeartSignal({
  variant = "ecg-line",
  bpm = 75,
  speed = 0.25,
  color,
  showBPM = true,
  showGrid = true,
  className,
  ...props
}: HeartSignalProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [themePrimaryColor, setThemePrimaryColor] = useState<string>("currentColor");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Real-time semantic CSS theme color resolver (supports standard CSS vars and Shadcn HSL variables)
  const getActivePrimaryColor = (): string => {
    if (typeof window === "undefined") return resolvedTheme === "dark" ? "#f43f5e" : "#e11d48";
    try {
      // 1. Direct CSS variable evaluation
      const dummy = document.createElement("div");
      dummy.style.color = "var(--primary)";
      dummy.style.position = "absolute";
      dummy.style.visibility = "hidden";
      dummy.style.pointerEvents = "none";
      document.body.appendChild(dummy);
      let computedColor = window.getComputedStyle(dummy).color;
      document.body.removeChild(dummy);

      if (computedColor && computedColor !== "rgba(0, 0, 0, 0)" && computedColor !== "transparent") {
        return computedColor;
      }

      // 2. Shadcn HSL CSS variable format fallback (hsl(var(--primary)))
      const dummyHsl = document.createElement("div");
      dummyHsl.style.color = "hsl(var(--primary))";
      dummyHsl.style.position = "absolute";
      dummyHsl.style.visibility = "hidden";
      dummyHsl.style.pointerEvents = "none";
      document.body.appendChild(dummyHsl);
      computedColor = window.getComputedStyle(dummyHsl).color;
      document.body.removeChild(dummyHsl);

      if (computedColor && computedColor !== "rgba(0, 0, 0, 0)" && computedColor !== "transparent") {
        return computedColor;
      }
    } catch {}
    return resolvedTheme === "dark" ? "#f43f5e" : "#e11d48";
  };

  // Dynamically observe and resolve exact active site theme --primary CSS color variable
  useEffect(() => {
    if (typeof window === "undefined" || !mounted) return;

    const updateThemeColor = () => {
      const activeColor = getActivePrimaryColor();
      setThemePrimaryColor(activeColor);
    };

    updateThemeColor();

    const observer = new MutationObserver(() => updateThemeColor());
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    return () => observer.disconnect();
  }, [mounted, resolvedTheme]);

  // Resolve picked color from color picker or fallback to exact active header primary theme color
  const resolvedPickerColor = resolveColorAccent(color);
  const effectiveColor =
    resolvedPickerColor ||
    (themePrimaryColor !== "currentColor"
      ? themePrimaryColor
      : getActivePrimaryColor());

  // Real-time Canvas Rendering Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    const handleResize = () => {
      if (!container || !canvas) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    let time = 0;
    const maxHistory = 450;
    const historyPoints: number[] = [];

    // Sharp linear piecewise vertex calculator
    const getSharpPiecewiseY = (cycleNorm: number, h: number, pScale: number, dScale: number, tScale: number): number => {
      const cy = h / 2;
      const tNorm = ((cycleNorm % 1) + 1) % 1;

      const keypoints: [number, number][] = [
        [0.0, 0],
        [0.06, 0],
        [0.10, -h * 0.16 * tScale],
        [0.14, 0],
        [0.18, h * 0.20 * dScale],
        [0.23, -h * 0.44 * pScale],
        [0.28, h * 0.24 * dScale],
        [0.32, 0],
        [0.40, 0],
        [0.45, -h * 0.14 * tScale],
        [0.50, 0],
        [1.0, 0],
      ];

      for (let i = 0; i < keypoints.length - 1; i++) {
        const [t1, y1] = keypoints[i];
        const [t2, y2] = keypoints[i + 1];

        if (tNorm >= t1 && tNorm <= t2) {
          const segP = (tNorm - t1) / (t2 - t1);
          return cy + (y1 + segP * (y2 - y1));
        }
      }

      return cy;
    };

    // Smooth Reference Image Waveform Calculator for Pulse Heart Variant
    const getReferenceSmoothWaveY = (t: number, h: number, amplitudeMult = 1.0): number => {
      const cy = h / 2;
      const tNorm = ((t % 1) + 1) % 1;

      if (tNorm < 0.08 || tNorm > 0.92) return cy;

      // Left EKG Pulse Wave
      if (tNorm >= 0.08 && tNorm < 0.16) {
        const p = (tNorm - 0.08) / 0.08;
        return cy - Math.sin(p * Math.PI) * (h * 0.14 * amplitudeMult);
      }
      if (tNorm >= 0.16 && tNorm < 0.22) {
        const p = (tNorm - 0.16) / 0.06;
        return cy + Math.sin(p * Math.PI) * (h * 0.2 * amplitudeMult);
      }
      if (tNorm >= 0.22 && tNorm < 0.32) {
        const p = (tNorm - 0.22) / 0.10;
        return cy - Math.sin(p * Math.PI) * (h * 0.38 * amplitudeMult);
      }
      if (tNorm >= 0.32 && tNorm < 0.38) {
        const p = (tNorm - 0.32) / 0.06;
        return cy + Math.sin(p * Math.PI) * (h * 0.22 * amplitudeMult);
      }

      // Middle baseline segment behind organ
      if (tNorm >= 0.38 && tNorm < 0.62) return cy;

      // Right EKG Pulse Wave
      if (tNorm >= 0.62 && tNorm < 0.68) {
        const p = (tNorm - 0.62) / 0.06;
        return cy - Math.sin(p * Math.PI) * (h * 0.14 * amplitudeMult);
      }
      if (tNorm >= 0.68 && tNorm < 0.74) {
        const p = (tNorm - 0.68) / 0.06;
        return cy + Math.sin(p * Math.PI) * (h * 0.2 * amplitudeMult);
      }
      if (tNorm >= 0.74 && tNorm < 0.84) {
        const p = (tNorm - 0.74) / 0.10;
        return cy - Math.sin(p * Math.PI) * (h * 0.4 * amplitudeMult);
      }
      if (tNorm >= 0.84 && tNorm < 0.92) {
        const p = (tNorm - 0.84) / 0.08;
        return cy + Math.sin(p * Math.PI) * (h * 0.22 * amplitudeMult);
      }

      return cy;
    };

    // Clean Classic Vector SVG Heart Icon
    const drawClassicHeartIcon = (c: CanvasRenderingContext2D, cx: number, cy: number, scale: number) => {
      c.save();
      c.translate(cx, cy);
      c.scale(scale * 6.5, scale * 6.5);
      c.translate(-12, -12);

      const path = new Path2D(
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
      );
      c.fill(path);
      c.restore();
    };

    const render = () => {
      const isDark = resolvedTheme === "dark";
      const currentBaselineY = height / 2;

      // 100% Solid Opaque Base Hex Colors (Zero Alpha Overlap Seams)
      const baseSolidColor = isDark ? "#27272a" : "#e4e4e7";

      const pulseFrequency = (bpm / 120) * speed * 0.35;
      time += 0.004 * pulseFrequency * 60;

      ctx.clearRect(0, 0, width, height);

      const gridSize = width < 640 ? 24 : 32;

      // 1. GRID BACKGROUND LAYER
      if (showGrid) {
        ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.035)";
        ctx.lineWidth = 1;

        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }

        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // VARIANT 1: "ecg-line"
      if (variant === "ecg-line") {
        ctx.lineJoin = "miter";
        ctx.lineCap = "square";
        ctx.miterLimit = 10;

        const cycleProgress = time * 0.38;
        const beatIndex = Math.floor(cycleProgress);

        const peakScale = 0.55 + Math.abs(Math.sin(beatIndex * 2.3) * 0.55 + Math.cos(beatIndex * 0.9) * 0.25);
        const dipScale = 0.6 + Math.abs(Math.cos(beatIndex * 1.8) * 0.45);
        const tWaveScale = 0.6 + Math.abs(Math.sin(beatIndex * 1.3) * 0.45);

        const cycle = cycleProgress % 1;
        const signalY = getSharpPiecewiseY(cycle, height, peakScale, dipScale, tWaveScale);

        historyPoints.push(signalY);
        if (historyPoints.length > maxHistory) {
          historyPoints.shift();
        }

        const targetPercent = width >= 768 ? 0.82 : 0.72;
        const targetThresholdX = width * targetPercent;
        const stepX = targetThresholdX / (maxHistory - 1);
        const strokeW = width < 640 ? 2.8 : 3.2;

        // Ambient outer glow trace
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < historyPoints.length; i++) {
          const px = i * stepX;
          const py = historyPoints[i];
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = effectiveColor;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = strokeW * 2.2;
        ctx.stroke();
        ctx.restore();

        // Main sharp line trace
        ctx.save();
        ctx.beginPath();
        for (let i = 0; i < historyPoints.length; i++) {
          const px = i * stepX;
          const py = historyPoints[i];
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }

        ctx.strokeStyle = effectiveColor;
        ctx.lineWidth = strokeW;
        ctx.stroke();
        ctx.restore();

        // Active Glowing Tip Cursor
        if (historyPoints.length > 0) {
          const headX = Math.min((historyPoints.length - 1) * stepX, targetThresholdX);
          const headY = historyPoints[historyPoints.length - 1];

          const pulseRing = (time * 4) % 1;
          const dotR = width < 640 ? 6 : 7;

          ctx.strokeStyle = effectiveColor;
          ctx.globalAlpha = (1 - pulseRing) * 0.85;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(headX, headY, dotR - 1 + pulseRing * 13, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1.0;

          ctx.fillStyle = effectiveColor;
          ctx.beginPath();
          ctx.arc(headX, headY, dotR, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(headX, headY, dotR * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // VARIANT 2: "cardiac-wave"
      else if (variant === "cardiac-wave") {
        const leads = 3;
        const strokeW = width < 640 ? 2.6 : 3.2;

        for (let l = 0; l < leads; l++) {
          ctx.beginPath();
          const opacity = 1 - l * 0.28;
          const freq = 0.012 + l * 0.004;

          const waveModulation = 0.75 + Math.sin(time * 0.25 + l) * 0.35;
          const amp = height * (0.2 - l * 0.04) * waveModulation;
          const speedOffset = time * (0.35 + l * 0.12);

          for (let x = 0; x < width; x += 3) {
            const y = currentBaselineY + Math.sin(x * freq + speedOffset) * amp * Math.sin((x / width) * Math.PI);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          ctx.strokeStyle = effectiveColor;
          ctx.globalAlpha = opacity;
          ctx.lineWidth = strokeW - l * 0.5;
          ctx.stroke();
        }
        ctx.globalAlpha = 1.0;

        // Soft bottom equalizer bars
        const bars = width < 640 ? 18 : 24;
        const barWidth = width / (bars * 2.2);
        for (let i = 0; i < bars; i++) {
          const dynamicHeightMod = 0.65 + Math.sin(time * 0.9 + i) * 0.4;
          const barHeight = (12 + Math.abs(Math.sin(time * 0.9 + i * 0.3)) * (height * 0.18)) * dynamicHeightMod;
          const bx = (i * width) / bars + barWidth;
          const by = height - 16;

          ctx.fillStyle = effectiveColor;
          ctx.globalAlpha = 0.45 + Math.sin(time * 1.2 + i) * 0.2;
          ctx.fillRect(bx, by - barHeight, barWidth, barHeight);
        }
        ctx.globalAlpha = 1.0;
      }

      // VARIANT 3: "pulse-heart"
      else if (variant === "pulse-heart") {
        ctx.lineJoin = "round";
        ctx.lineCap = "round";

        const padX = width < 640 ? 35 : 70;
        const startX = padX;
        const endX = width - padX;
        const drawW = endX - startX;
        const centerX = width / 2;
        const baseHeartScale = Math.min(width, height) * 0.00165;

        const sweepProgress = (time * 0.14) % 1;
        const sweepX = startX + sweepProgress * drawW;

        const distFromCenter = Math.abs(sweepX - centerX);
        const heartPulse = distFromCenter < 110 ? Math.sin((1 - distFromCenter / 110) * Math.PI) * 0.12 : 0;
        const currentHeartScale = baseHeartScale * (1 + heartPulse);

        const heartOverlapRadius = 46 * currentHeartScale;
        const heartLeftWallX = centerX - heartOverlapRadius;
        const heartRightWallX = centerX + heartOverlapRadius;

        const drawExteriorWaveformSegments = (c: CanvasRenderingContext2D) => {
          c.beginPath();
          const points = 350;

          let drawingLeft = false;
          for (let i = 0; i <= points; i++) {
            const t = i / points;
            const px = startX + t * drawW;
            if (px > heartLeftWallX) break;

            const py = getReferenceSmoothWaveY(t, height, 0.55);
            if (!drawingLeft) {
              c.moveTo(px, py);
              drawingLeft = true;
            } else {
              c.lineTo(px, py);
            }
          }

          let drawingRight = false;
          for (let i = 0; i <= points; i++) {
            const t = i / points;
            const px = startX + t * drawW;
            if (px < heartRightWallX) continue;

            const py = getReferenceSmoothWaveY(t, height, 0.55);
            if (!drawingRight) {
              c.moveTo(px, py);
              drawingRight = true;
            } else {
              c.lineTo(px, py);
            }
          }
        };

        const dotR = width < 640 ? 7 : 9;

        // 1. Base Track Layer
        ctx.save();
        ctx.fillStyle = baseSolidColor;
        ctx.beginPath();
        ctx.arc(startX, currentBaselineY, dotR, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(endX, currentBaselineY, dotR, 0, Math.PI * 2);
        ctx.fill();

        drawExteriorWaveformSegments(ctx);
        ctx.strokeStyle = baseSolidColor;
        ctx.lineWidth = 3.8;
        ctx.stroke();

        drawClassicHeartIcon(ctx, centerX, currentBaselineY, currentHeartScale);
        ctx.restore();

        // 2. Vibrant Primary Color Sweep Layer
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, sweepX, height);
        ctx.clip();

        drawExteriorWaveformSegments(ctx);
        ctx.strokeStyle = effectiveColor;
        ctx.globalAlpha = 0.3;
        ctx.lineWidth = 8;
        ctx.stroke();

        drawExteriorWaveformSegments(ctx);
        ctx.strokeStyle = effectiveColor;
        ctx.globalAlpha = 1.0;
        ctx.lineWidth = 4.2;
        ctx.stroke();

        ctx.save();
        ctx.fillStyle = effectiveColor;
        drawClassicHeartIcon(ctx, centerX, currentBaselineY, currentHeartScale);
        ctx.restore();

        if (sweepX >= startX) {
          ctx.fillStyle = effectiveColor;
          ctx.beginPath();
          ctx.arc(startX, currentBaselineY, dotR, 0, Math.PI * 2);
          ctx.fill();
        }
        if (sweepX >= endX - 5) {
          ctx.fillStyle = effectiveColor;
          ctx.beginPath();
          ctx.arc(endX, currentBaselineY, dotR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();

        // 3. Leading Sweep Head Tip
        if (sweepX >= startX && sweepX <= endX) {
          if (sweepX < heartLeftWallX || sweepX > heartRightWallX) {
            const sweepNorm = sweepProgress;
            const sweepY = getReferenceSmoothWaveY(sweepNorm, height, 0.55);
            const pulseRing = (time * 4) % 1;

            ctx.save();
            ctx.strokeStyle = effectiveColor;
            ctx.globalAlpha = (1 - pulseRing) * 0.85;
            ctx.lineWidth = 2.2;
            ctx.beginPath();
            ctx.arc(sweepX, sweepY, dotR + pulseRing * 14, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1.0;

            ctx.fillStyle = effectiveColor;
            ctx.beginPath();
            ctx.arc(sweepX, sweepY, dotR + 1, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.arc(sweepX, sweepY, dotR * 0.4, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      resizeObserver.disconnect();
    };
  }, [variant, bpm, speed, effectiveColor, showGrid, resolvedTheme]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full min-h-[450px] sm:min-h-[540px] lg:min-h-[640px] flex items-center justify-center select-none overflow-hidden rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 p-3 sm:p-5 md:p-6",
        className
      )}
      {...props}
    >
      {/* Realtime Canvas Renderer */}
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* Floating BPM Vital Telemetry Badge */}
      {showBPM && (
        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-sm pointer-events-none z-10">
          <div className="relative flex items-center justify-center">
            <span
              className="w-2.5 h-2.5 rounded-full animate-ping absolute"
              style={{ backgroundColor: effectiveColor }}
            />
            <span
              className="w-2.5 h-2.5 rounded-full relative"
              style={{ backgroundColor: effectiveColor }}
            />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-none">
              {bpm}
            </span>
            <span className="text-[9px] sm:text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase leading-none">
              BPM
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeartSignal;
