"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useMemo, useRef, useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type ChartColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type ChartType = "bar" | "line" | "area";

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

const colorThemes: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#18181b",
};

export const getThemeStyles = (color: string) => {
  const isHex = color && color.startsWith("#");
  const finalColor = isHex ? color : colorThemes[color] || colorThemes.indigo;
  const rgb = hexToRgb(finalColor);

  return {
    theme: {
      fill: "fill-[var(--theme-color)]",
      stroke: "stroke-[var(--theme-color)]",
      bg: "bg-[var(--theme-color)]",
      text: "text-[var(--theme-color)]",
    },
    style: {
      "--theme-color": finalColor,
      "--theme-color-rgb": rgb,
    } as React.CSSProperties,
  };
};

// ==========================================
// CHART COMPONENT
// ==========================================
export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ChartBlockProps {
  data: ChartDataPoint[];
  type?: ChartType;
  color?: ChartColor;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  animated?: boolean;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function ChartBlock({
  data,
  type = "bar",
  color = "indigo",
  height = 300,
  showGrid = true,
  showTooltip = true,
  animated = true,
  className,
  valuePrefix = "",
  valueSuffix = "",
}: ChartBlockProps) {
  const { style } = getThemeStyles(color);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // SVG Coordinate System Setup
  const viewBoxWidth = 1000;
  const viewBoxHeight = 400;
  const padding = { top: 40, bottom: 40, left: 20, right: 20 };
  const chartWidth = viewBoxWidth - padding.left - padding.right;
  const chartHeight = viewBoxHeight - padding.top - padding.bottom;

  // Math & Scaling
  const maxDataValue = useMemo(() => {
    const max = Math.max(...data.map((d) => d.value));
    return max > 0 ? max : 1; // Prevent division by zero
  }, [data]);

  // Round max value up to nearest nice number for grid lines
  const yAxisMax = useMemo(() => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(maxDataValue)));
    return Math.ceil(maxDataValue / magnitude) * magnitude;
  }, [maxDataValue]);

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.value / yAxisMax) * chartHeight;
      return { x, y, ...d };
    });
  }, [data, yAxisMax, chartWidth, chartHeight, padding]);

  // Generate Path Strings
  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
      .join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    return `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;
  }, [linePath, points, padding.top, chartHeight]);

  // Animations
  useEffect(() => {
    if (!animated || !svgRef.current) return;
    const ctx = gsap.context(() => {
      if (type === "bar") {
        gsap.fromTo(
          ".chart-bar",
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 0.8,
            stagger: 0.05,
            ease: "back.out(1.2)",
            transformOrigin: "bottom",
          },
        );
      } else {
        // For line and area, a clean fade + slide up looks most premium
        gsap.fromTo(
          ".chart-path-group",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
        );

        // If line, animate the stroke drawing
        if (type === "line") {
          const path = document.querySelector(
            ".chart-stroke-path",
          ) as SVGPathElement;
          if (path) {
            const length = path.getTotalLength();
            gsap.fromTo(
              path,
              { strokeDasharray: length, strokeDashoffset: length },
              { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut" },
            );
          }
        }
      }
    }, svgRef);

    return () => ctx.revert();
  }, [type, animated, data]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-visible group", className)}
      style={{ ...style, height }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        preserveAspectRatio="none"
        className="w-full h-full overflow-visible"
      >
        <defs>
          <linearGradient
            id={`gradient-${color}`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="var(--theme-color)"
              stopOpacity={0.4}
            />
            <stop
              offset="100%"
              stopColor="var(--theme-color)"
              stopOpacity={0.0}
            />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {showGrid && (
          <g className="text-zinc-200 dark:text-zinc-800">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding.top + chartHeight * ratio;
              return (
                <line
                  key={i}
                  x1={padding.left}
                  y1={y}
                  x2={viewBoxWidth - padding.right}
                  y2={y}
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
              );
            })}
          </g>
        )}

        {/* X-Axis Labels */}
        <g
          className="text-zinc-400 dark:text-zinc-500 text-[12px] font-medium"
          textAnchor="middle"
        >
          {points.map((p, i) => {
            // Only show reasonable amount of labels to prevent crowding
            const showLabel =
              points.length < 15 ||
              i % Math.ceil(points.length / 8) === 0 ||
              i === points.length - 1;
            if (!showLabel) return null;
            return (
              <text key={i} x={p.x} y={viewBoxHeight - 10} fill="currentColor">
                {p.label}
              </text>
            );
          })}
        </g>

        {/* Y-Axis Min/Max Labels */}
        <g
          className="text-zinc-400 dark:text-zinc-500 text-[12px] font-medium"
          textAnchor="start"
        >
          <text x={0} y={padding.top - 10} fill="currentColor">
            {valuePrefix}
            {yAxisMax}
            {valueSuffix}
          </text>
          <text
            x={0}
            y={viewBoxHeight - padding.bottom - 10}
            fill="currentColor"
          >
            0
          </text>
        </g>

        {/* CHART RENDERING */}
        <g className="chart-path-group">
          {type === "bar" && (
            <g>
              {points.map((p, i) => {
                const barWidth = Math.max(
                  (chartWidth / points.length) * 0.6,
                  4,
                );
                const isHovered = hoveredIndex === i;
                return (
                  <rect
                    key={i}
                    className={cn(
                      "chart-bar transition-opacity duration-300 cursor-pointer",
                      hoveredIndex !== null && !isHovered
                        ? "opacity-30"
                        : "opacity-100",
                    )}
                    x={p.x - barWidth / 2}
                    y={p.y}
                    width={barWidth}
                    height={padding.top + chartHeight - p.y}
                    fill="var(--theme-color)"
                    rx={barWidth / 4}
                  />
                );
              })}
            </g>
          )}

          {(type === "area" || type === "line") && (
            <>
              {type === "area" && (
                <path
                  d={areaPath}
                  fill={`url(#gradient-${color})`}
                  className="transition-opacity duration-500"
                />
              )}
              <path
                d={linePath}
                fill="none"
                stroke="var(--theme-color)"
                strokeWidth={4}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chart-stroke-path transition-all duration-500"
              />

              {/* Data Points on Line */}
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredIndex === i ? 6 : 4}
                  fill="white"
                  stroke="var(--theme-color)"
                  strokeWidth={2}
                  className={cn(
                    "transition-all duration-300",
                    hoveredIndex !== null && hoveredIndex !== i
                      ? "opacity-0"
                      : "opacity-100",
                  )}
                />
              ))}
            </>
          )}
        </g>

        {/* INVISIBLE INTERACTION OVERLAY (For flawless tooltips) */}
        {showTooltip && (
          <g>
            {points.map((p, i) => {
              const rectWidth = chartWidth / Math.max(points.length - 1, 1);
              const xPos =
                type === "bar"
                  ? p.x - rectWidth / 2
                  : i === 0
                    ? padding.left
                    : p.x - rectWidth / 2;

              return (
                <rect
                  key={`interaction-${i}`}
                  x={xPos}
                  y={0}
                  width={
                    i === 0 || i === points.length - 1
                      ? rectWidth / 2
                      : rectWidth
                  }
                  height={viewBoxHeight}
                  fill="transparent"
                  onMouseEnter={() => setHoveredIndex(i)}
                  className="cursor-crosshair"
                />
              );
            })}
          </g>
        )}
      </svg>

      {/* HTML TOOLTIP */}
      {showTooltip && hoveredIndex !== null && (
        <div
          className="absolute z-50 pointer-events-none transition-all duration-200 ease-out"
          style={{
            // Map the SVG coordinate back to HTML coordinate
            left: `${(points[hoveredIndex].x / viewBoxWidth) * 100}%`,
            top: `${(points[hoveredIndex].y / viewBoxHeight) * 100}%`,
            transform: "translate(-50%, -100%)",
            marginTop: "-12px",
          }}
        >
          <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-2 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap flex flex-col items-center gap-0.5 relative animate-in fade-in zoom-in-95 duration-200">
            <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-wider">
              {points[hoveredIndex].label}
            </span>
            <span>
              {valuePrefix}
              {points[hoveredIndex].value}
              {valueSuffix}
            </span>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}
