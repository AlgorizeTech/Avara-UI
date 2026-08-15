"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  MousePointer,
  Target,
  Zap,
  Eye,
  Maximize2,
  Minimize2,
  Crosshair,
  CircleDot,
  Radio,
} from "lucide-react";

export type CursorVariant =
  | "magnetic"
  | "glow"
  | "trail"
  | "badge"
  | "spotlight"
  | "expand"
  | "crosshair"
  | "ring"
  | "pulse"
  | "sonar";

export interface CursorAnimationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CursorVariant;
  label?: string;
  color?: string;
  trailCount?: number;
  children?: React.ReactNode;
}

export function CursorAnimation({
  variant = "glow",
  label = "Explore",
  color = "#6366f1",
  trailCount = 6,
  children,
  className,
  ...props
}: CursorAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [smoothPos, setSmoothPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  // Smooth lerp follow effect
  useEffect(() => {
    let animationFrameId: number;

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const updateSmoothPosition = () => {
      setSmoothPos((prev) => {
        const nextX = lerp(prev.x, mousePos.x, 0.15);
        const nextY = lerp(prev.y, mousePos.y, 0.15);
        return { x: nextX, y: nextY };
      });

      animationFrameId = requestAnimationFrame(updateSmoothPosition);
    };

    animationFrameId = requestAnimationFrame(updateSmoothPosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [mousePos]);

  // Trail history updates
  useEffect(() => {
    if (variant === "trail" && isHovered) {
      setTrail((prev) => {
        const newTrail = [
          { x: mousePos.x, y: mousePos.y, id: Date.now() },
          ...prev,
        ];
        return newTrail.slice(0, trailCount);
      });
    }
  }, [mousePos, variant, isHovered, trailCount]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -100, y: -100 });
    setSmoothPos({ x: -100, y: -100 });
    setTrail([]);
  };

  const getVariantIcon = () => {
    switch (variant) {
      case "glow":
        return <Sparkles className="w-7 h-7" />;
      case "magnetic":
        return <Target className="w-7 h-7" />;
      case "trail":
        return <Zap className="w-7 h-7" />;
      case "badge":
        return <MousePointer className="w-7 h-7" />;
      case "spotlight":
        return <Eye className="w-7 h-7" />;
      case "expand":
        return <Maximize2 className="w-7 h-7" />;
      case "crosshair":
        return <Crosshair className="w-7 h-7" />;
      case "ring":
        return <CircleDot className="w-7 h-7" />;
      case "pulse":
        return <Radio className="w-7 h-7" />;
      case "sonar":
        return <Minimize2 className="w-7 h-7" />;
      default:
        return <Sparkles className="w-7 h-7" />;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsClicking(true)}
      onMouseUp={() => setIsClicking(false)}
      className={cn(
        "relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden select-none border transition-all duration-300",
        "bg-zinc-50 dark:bg-[#09090b] border-zinc-200 dark:border-zinc-800/80",
        "flex flex-col items-center justify-center p-6 text-center cursor-none",
        className
      )}
      {...props}
    >
      {/* Container Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Main Interactive Demo Area Content */}
      {children || (
        <div className="relative z-10 flex flex-col items-center gap-4 max-w-md pointer-events-none">
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shadow-sm">
            {getVariantIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Hover & Move Cursor
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
              Interactive custom cursor animation with fluid physics and custom theme styling.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 border border-zinc-300/50 dark:border-zinc-700/50">
            Variant:{" "}
            <span className="text-indigo-600 dark:text-indigo-400 capitalize">
              {variant}
            </span>
          </div>
        </div>
      )}

      {/* CUSTOM CURSOR RENDERERS */}
      {isHovered && (
        <>
          {/* VARIANT 1: GLOW CURSOR */}
          {variant === "glow" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl transition-transform duration-75"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "180px" : "140px",
                  height: isClicking ? "180px" : "140px",
                  backgroundColor: color,
                  opacity: 0.35,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/40 bg-indigo-500/10 backdrop-blur-xs transition-all duration-100 ease-out"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  width: isClicking ? "24px" : "36px",
                  height: isClicking ? "24px" : "36px",
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                }}
              />
            </>
          )}

          {/* VARIANT 2: MAGNETIC TARGET CURSOR */}
          {variant === "magnetic" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-indigo-500/70 transition-transform duration-200"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "32px" : "48px",
                  height: isClicking ? "32px" : "48px",
                  transform: `translate(-50%, -50%) rotate(${
                    smoothPos.x + smoothPos.y
                  }deg)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-md"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                }}
              />
            </>
          )}

          {/* VARIANT 3: PARTICLE TRAIL CURSOR */}
          {variant === "trail" && (
            <>
              {trail.map((pt, i) => {
                const size = Math.max(4, 16 - i * 2.2);
                const opacity = (trail.length - i) / trail.length;
                return (
                  <div
                    key={pt.id + i}
                    className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500 transition-all duration-75"
                    style={{
                      left: `${pt.x}px`,
                      top: `${pt.y}px`,
                      width: `${size}px`,
                      height: `${size}px`,
                      opacity: opacity * 0.7,
                    }}
                  />
                );
              })}
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-lg"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                }}
              />
            </>
          )}

          {/* VARIANT 4: BADGE LABEL CURSOR */}
          {variant === "badge" && (
            <div
              className="pointer-events-none absolute left-0 top-0 transition-transform duration-100 ease-out z-30"
              style={{
                transform: `translate3d(${mousePos.x + 12}px, ${
                  mousePos.y + 12
                }px, 0)`,
              }}
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-xl border border-zinc-700/50 dark:border-zinc-300/50 whitespace-nowrap">
                <span>{label}</span>
                <MousePointer className="w-3.5 h-3.5 fill-current" />
              </div>
            </div>
          )}

          {/* VARIANT 5: SPOTLIGHT MASK CURSOR */}
          {variant === "spotlight" && (
            <>
              <div
                className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, transparent 0%, rgba(0, 0, 0, 0.45) 100%)`,
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_15px_#6366f1] z-30"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
            </>
          )}

          {/* VARIANT 6: EXPAND SCALING CURSOR */}
          {variant === "expand" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-indigo-500 bg-indigo-500/10 backdrop-invert-20 transition-all duration-200 ease-out"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "64px" : "40px",
                  height: isClicking ? "64px" : "40px",
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
            </>
          )}

          {/* VARIANT 7: PRECISION CROSSHAIR CURSOR */}
          {variant === "crosshair" && (
            <>
              <div
                className="pointer-events-none absolute top-0 bottom-0 w-[1px] bg-indigo-500/40"
                style={{ left: `${mousePos.x}px` }}
              />
              <div
                className="pointer-events-none absolute left-0 right-0 h-[1px] bg-indigo-500/40"
                style={{ top: `${mousePos.y}px` }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border border-indigo-500 flex items-center justify-center"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-600 dark:bg-indigo-400" />
              </div>
            </>
          )}

          {/* VARIANT 8: SMOOTH RING CURSOR */}
          {variant === "ring" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/80 transition-all duration-300 ease-out"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: isClicking ? "24px" : "42px",
                  height: isClicking ? "24px" : "42px",
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
            </>
          )}

          {/* VARIANT 9: RADIAL PULSE CURSOR */}
          {variant === "pulse" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 animate-ping"
                style={{
                  left: `${mousePos.x}px`,
                  top: `${mousePos.y}px`,
                  width: "36px",
                  height: "36px",
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-md"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
            </>
          )}

          {/* VARIANT 10: SONAR WAVE CURSOR */}
          {variant === "sonar" && (
            <>
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/60 transition-transform duration-300"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: "56px",
                  height: "56px",
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400/40 transition-transform duration-150"
                style={{
                  left: `${smoothPos.x}px`,
                  top: `${smoothPos.y}px`,
                  width: "32px",
                  height: "32px",
                }}
              />
              <div
                className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400 shadow-xs"
                style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
