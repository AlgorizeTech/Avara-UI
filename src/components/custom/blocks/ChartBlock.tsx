"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

// ==========================================
// DYNAMIC THEME ENGINE
// ==========================================
export type ChartColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | "amber"
  | "blue"
  | string;
export type ChartType =
  | "bar"
  | "line"
  | "pie"
  | "donut"
  /** A categorical donut with a legend beside it; hover either to read a share. */
  | "donut-legend"
  /** One horizontal bar split into shares, legend below. */
  | "stacked-bar";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#3f3f46",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#") || color.startsWith("var(")) return color;
  return colorMap[color] || "var(--primary)";
};

const inkOn = (color: string) =>
  color === "var(--primary)" ? "text-primary-foreground" : "text-white";

/**
 * Categorical palette for the legend charts, where every share needs its own
 * hue rather than a shade of one. The theme accent leads; the grey at the end
 * is what an "Other" bucket lands on when there are five shares.
 */
const CATEGORICAL = [
  "var(--primary)",
  "#0d9488",
  "#d97706",
  "#e11d48",
  "#a1a1aa",
];

// ==========================================
// TYPES & PROPS
// ==========================================
export interface ChartDataPoint {
  label: string;
  value: number;
  /** Own colour for this share in `donut-legend` and `stacked-bar`. */
  color?: string;
}

export interface ChartBlockProps {
  data: ChartDataPoint[];
  type?: ChartType;
  color?: ChartColor;
  /**
   * Fixed pixel height. Defaults to 300 for the axis charts; the legend
   * charts (`donut-legend`, `stacked-bar`) size to their content unless set.
   */
  height?: number;
  className?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  showGrid?: boolean;
  showArea?: boolean;
  /**
   * Palette for the legend charts, one colour per share in order. A point's
   * own `color` wins over it. Defaults to the theme accent and four hues.
   */
  colors?: string[];
  /** `donut-legend`: caption under the centre value at rest, e.g. "top reason". */
  centerLabel?: string;
  /** `donut-legend`: caption under the centre value while a share is hovered. */
  hoverLabel?: string;
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export function ChartBlock({
  data,
  type = "bar",
  color = "var(--primary)",
  height,
  className,
  valuePrefix = "",
  valueSuffix = "",
  showGrid = true,
  showArea = true,
  colors = CATEGORICAL,
  centerLabel = "largest",
  hoverLabel = "share",
}: ChartBlockProps) {
  const themeColor = getThemeColor(color);
  const isLegendChart = type === "donut-legend" || type === "stacked-bar";
  // Every share gets a colour: its own, else the palette in order, wrapping.
  const shareColor = (d: ChartDataPoint, i: number) =>
    getThemeColor(d.color ?? colors[i % colors.length] ?? "primary");

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height: height ?? (isLegendChart ? undefined : 300) }}
    >
      {/* NATIVE CSS ANIMATIONS */}
      <style>{`
        @keyframes drawLine { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } }
        @keyframes growUp { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } }
        @keyframes fadeUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-draw { animation: drawLine 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        .animate-grow { animation: growUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; transform-origin: bottom; }
        .animate-fade { animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
      `}</style>

      {type === "bar" && (
        <BarChart
          data={data}
          color={themeColor}
          prefix={valuePrefix}
          suffix={valueSuffix}
          showGrid={showGrid}
        />
      )}

      {type === "line" && (
        <SmoothLineChart
          data={data}
          color={themeColor}
          prefix={valuePrefix}
          suffix={valueSuffix}
          showGrid={showGrid}
          showArea={showArea}
        />
      )}

      {(type === "pie" || type === "donut") && (
        <CircularChart
          data={data}
          type={type}
          color={themeColor}
          prefix={valuePrefix}
          suffix={valueSuffix}
        />
      )}

      {type === "donut-legend" && (
        <DonutLegendChart
          data={data}
          shareColor={shareColor}
          prefix={valuePrefix}
          suffix={valueSuffix}
          centerLabel={centerLabel}
          hoverLabel={hoverLabel}
        />
      )}

      {type === "stacked-bar" && (
        <StackedBarChart
          data={data}
          shareColor={shareColor}
          prefix={valuePrefix}
          suffix={valueSuffix}
        />
      )}
    </div>
  );
}

// ==========================================
// 1. HTML FLEXBOX BAR CHART (Flawless Scaling)
// ==========================================
function BarChart({
  data,
  color,
  prefix,
  suffix,
  showGrid,
}: {
  data: ChartDataPoint[];
  color: string;
  prefix: string;
  suffix: string;
  showGrid: boolean;
}) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const gridLines = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="relative w-full h-full flex flex-col pt-6 pl-12 pr-4 animate-fade">
      {/* Background Grid & Y-Axis */}
      <div className="absolute inset-0 top-6 bottom-8 left-12 right-4 flex flex-col justify-between pointer-events-none z-0">
        {gridLines.map((ratio, i) => (
          <div key={i} className="flex items-center w-full relative">
            <span className="absolute -left-3 -translate-x-full text-[10px] font-medium text-muted-foreground">
              {prefix}
              {Math.round(maxVal * ratio)}
              {suffix}
            </span>
            {showGrid && (
              <div className="w-full border-t border-dashed border-border" />
            )}
          </div>
        ))}
      </div>

      {/* Bars Container */}
      <div className="relative z-10 flex-1 flex items-end justify-between gap-1 sm:gap-2 px-2 pb-8">
        {data.map((d, i) => (
          <div
            key={i}
            className="group relative flex flex-col items-center justify-end w-full h-full"
          >
            {/* Tooltip */}
            <div className="absolute -top-12 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
              <div
                className={cn(inkOn(color), "px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold whitespace-nowrap text-center")}
                style={{ backgroundColor: color }}
              >
                <div className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                  {d.label}
                </div>
                <div>
                  {prefix}
                  {d.value}
                  {suffix}
                </div>
              </div>
              <div className="w-2 h-2 rotate-45 -mt-1" style={{ backgroundColor: color }} />
            </div>

            {/* Flat-Bottom Bar */}
            <div
              className="w-full max-w-[48px] rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity animate-grow cursor-pointer"
              style={{
                height: `${(d.value / maxVal) * 100}%`,
                backgroundColor: color,
                animationDelay: `${i * 0.04}s`,
              }}
            >
              <div className="w-full h-1.5 bg-white/30 rounded-t-md" />
            </div>

            {/* X-Axis Label */}
            <span className="absolute -bottom-6 text-[10px] font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 2. SVG SMOOTH CURVE CHART (Line + Area Merge)
// ==========================================
function SmoothLineChart({
  data,
  color,
  prefix,
  suffix,
  showGrid,
  showArea,
}: {
  data: ChartDataPoint[];
  color: string;
  prefix: string;
  suffix: string;
  showGrid: boolean;
  showArea: boolean;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxVal = Math.max(...data.map((d) => d.value), 1);
  const cleanColorId = color.replace("#", "");

  // Calculate X/Y percentages for the data
  const points = data.map((d, i) => ({
    x: (i / Math.max(data.length - 1, 1)) * 100,
    y: 100 - (d.value / maxVal) * 100,
    label: d.label,
    value: d.value,
  }));

  // Mathematical cubic bezier curve generator for a premium SaaS look
  const createSmoothPath = (pts: { x: number; y: number }[]) => {
    const first = pts[0];
    if (!first) return "";
    let d = `M ${first.x} ${first.y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      if (!prev || !curr) continue;
      const cpX = (prev.x + curr.x) / 2; // Midpoint easing
      d += ` C ${cpX} ${prev.y}, ${cpX} ${curr.y}, ${curr.x} ${curr.y}`;
    }
    return d;
  };

  const smoothPath = createSmoothPath(points);
  const areaPath = `${smoothPath} L 100 100 L 0 100 Z`;

  return (
    <div className="relative w-full h-full pt-6 pb-8 pl-12 pr-4 animate-fade">
      {/* Background Grid */}
      <div className="absolute inset-0 top-6 bottom-8 left-12 right-4 flex flex-col justify-between pointer-events-none z-0">
        {[1, 0.5, 0].map((ratio, i) => (
          <div key={i} className="flex items-center w-full relative h-0">
            <span className="absolute -left-3 -translate-x-full text-[10px] font-medium text-muted-foreground">
              {prefix}
              {Math.round(maxVal * ratio)}
              {suffix}
            </span>
            {showGrid && (
              <div className="w-full border-t border-dashed border-border" />
            )}
          </div>
        ))}
      </div>

      {/* Vector Graphics */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 top-6 bottom-8 left-12 right-4 w-[calc(100%-64px)] h-[calc(100%-56px)] overflow-visible z-10"
      >
        <defs>
          <linearGradient
            id={`area-grad-${cleanColorId}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Optional Area Fill */}
        {showArea && (
          <path
            d={areaPath}
            fill={`url(#area-grad-${cleanColorId})`}
            className="animate-fade"
          />
        )}

        {/* Animated Line Stroke */}
        <path
          d={smoothPath}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength="100"
          strokeDasharray="100"
          className="animate-draw vector-non-scaling-stroke drop-shadow-sm"
          style={{ vectorEffect: "non-scaling-stroke" }}
        />
      </svg>

      {/* HTML Interaction Overlay (Perfectly round dots that never squash) */}
      <div className="absolute inset-0 top-6 bottom-8 left-12 right-4 z-20">
        {points.map((p, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 cursor-crosshair group"
            style={{
              left: `${p.x}%`,
              width: `${100 / Math.max(points.length - 1, 1)}%`,
              transform: "translateX(-50%)",
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* HTML Dot positioned accurately over the SVG path */}
            <div
              className={cn(
                "absolute w-3 h-3 rounded-full bg-background border-2 transition-all duration-200 pointer-events-none shadow-sm",
                hoveredIndex === i
                  ? "scale-100 opacity-100"
                  : "scale-50 opacity-0",
              )}
              style={{
                top: `${p.y}%`,
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderColor: color,
              }}
            >
              {/* Tooltip */}
              <div
                className={cn(
                  "absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-200",
                  hoveredIndex === i
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95",
                )}
              >
                <div
                  className={cn(inkOn(color), "px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold whitespace-nowrap text-center")}
                  style={{ backgroundColor: color }}
                >
                  <div className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                    {p.label}
                  </div>
                  <div>
                    {prefix}
                    {p.value}
                    {suffix}
                  </div>
                </div>
                <div className="w-2 h-2 rotate-45 -mt-1" style={{ backgroundColor: color }} />
              </div>
            </div>

            {/* X-Axis Label */}
            <span
              className={cn(
                "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap transition-colors",
                hoveredIndex === i
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground",
              )}
            >
              {p.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 3. SVG STROKE-DASHARRAY CHART (Pie/Donut)
// ==========================================
function CircularChart({
  data,
  type,
  color,
  prefix,
  suffix,
}: {
  data: ChartDataPoint[];
  type: "pie" | "donut";
  color: string;
  prefix: string;
  suffix: string;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = type === "pie" ? 25 : 40;
  const strokeWidth = type === "pie" ? 50 : 20;
  const circumference = 2 * Math.PI * radius;

  // Each slice starts where the previous one ended. Precomputed rather than
  // accumulated in a mutable variable inside map(), so the mapper stays pure.
  const sliceRatios = data.map((d) => d.value / (total || 1));
  const startRatios: number[] = [];
  sliceRatios.reduce((acc, ratio) => {
    startRatios.push(acc);
    return acc + ratio;
  }, 0);

  // Map data to stroke dashes
  const slices = data.map((d, i) => {
    const sliceRatio = sliceRatios[i] ?? 0;
    const startRatio = startRatios[i] ?? 0;
    const strokeDasharray = `${sliceRatio * circumference} ${circumference}`;
    const strokeDashoffset = -(startRatio * circumference);
    const endOffset = (startRatio + sliceRatio) * circumference;

    const midAngle =
      ((endOffset - (sliceRatio * circumference) / 2) / circumference) *
        Math.PI *
        2 -
      Math.PI / 2;
    const tooltipRadius = type === "pie" ? 30 : 40;

    // Convert polar to cartesian for the tooltip
    const tx = 50 + tooltipRadius * Math.cos(midAngle);
    const ty = 50 + tooltipRadius * Math.sin(midAngle);

    return {
      ...d,
      strokeDasharray,
      strokeDashoffset,
      opacity: 1 - i * 0.15,
      tx,
      ty,
    };
  });
  const hovered = hoveredIndex === null ? undefined : slices[hoveredIndex];

  return (
    <div className="relative w-full h-full flex items-center justify-center animate-fade">
      {/* 1:1 Aspect Ratio Container forces perfect circles */}
      <div className="relative aspect-square h-full max-h-[300px]">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full overflow-visible -rotate-90"
        >
          {slices.map((slice, i) => (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={slice.strokeDasharray}
              strokeDashoffset={slice.strokeDashoffset}
              className={cn(
                "transition-all duration-300 cursor-crosshair",
                hoveredIndex !== null && hoveredIndex !== i
                  ? "opacity-30"
                  : "opacity-100",
              )}
              style={{ opacity: slice.opacity }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}

          {/* Inner ring to give Donut a sharp edge */}
          {type === "donut" && (
            <circle
              cx="50"
              cy="50"
              r={radius - strokeWidth / 2}
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-border pointer-events-none"
            />
          )}
        </svg>

        {/* Tooltip Overlay */}
        {hovered && (
          <div
            className="absolute z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center"
            style={{
              left: `${hovered.tx}%`,
              top: `${hovered.ty}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className={cn(inkOn(color), "px-3 py-1.5 rounded-lg shadow-xl text-xs font-semibold whitespace-nowrap text-center")}
              style={{ backgroundColor: color }}
            >
              <div className="text-[10px] opacity-80 uppercase tracking-wider font-semibold">
                {hovered.label}
              </div>
              <div>
                {prefix}
                {hovered.value}
                {suffix}
              </div>
            </div>
          </div>
        )}

        {/* Donut Center Total Label */}
        {type === "donut" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-muted-foreground">Total</span>
            <span className="text-xl font-semibold text-foreground">
              {prefix}
              {total}
              {suffix}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. DONUT + LEGEND (categorical shares, hover either side)
// ==========================================
function DonutLegendChart({
  data,
  shareColor,
  prefix,
  suffix,
  centerLabel,
  hoverLabel,
}: {
  data: ChartDataPoint[];
  shareColor: (d: ChartDataPoint, i: number) => string;
  prefix: string;
  suffix: string;
  centerLabel: string;
  hoverLabel: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  const R = 38;
  const C = 2 * Math.PI * R;
  const GAP = 2; // surface gap between segments, in viewBox units

  // Where each segment starts, precomputed so the mapper stays pure.
  const starts: number[] = [];
  data.reduce((acc, d) => {
    starts.push(acc);
    return acc + (C * d.value) / total;
  }, 0);

  // The centre reads the hovered share; at rest, the largest one.
  const largest = data.reduce((best, d, i) => (d.value > (data[best]?.value ?? -Infinity) ? i : best), 0);
  const shown = data[active ?? largest];

  return (
    <div className="flex flex-col items-center gap-5 animate-fade sm:flex-row">
      <div className="relative size-36 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90" role="img" aria-label="Share of the whole by category">
          {data.map((d, i) => {
            const length = (C * d.value) / total;
            return (
              <circle
                key={d.label}
                cx="50"
                cy="50"
                r={R}
                fill="none"
                stroke={shareColor(d, i)}
                strokeWidth={active === i ? 16 : 14}
                strokeDasharray={`${Math.max(0, length - GAP)} ${C}`}
                strokeDashoffset={-(starts[i] ?? 0)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={cn(
                  "cursor-pointer transition-[stroke-width,opacity] duration-200",
                  active !== null && active !== i && "opacity-40",
                )}
              />
            );
          })}
        </svg>
        {shown && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-xl font-semibold tabular-nums text-foreground">
                {prefix}
                {shown.value}
                {suffix}
              </p>
              <p className="text-[10px] text-muted-foreground">{active === null ? centerLabel : hoverLabel}</p>
            </div>
          </div>
        )}
      </div>
      <ul className="min-w-0 flex-1 space-y-2 text-sm">
        {data.map((d, i) => (
          <li
            key={d.label}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className={cn(
              "flex items-start gap-2.5 transition-opacity",
              active !== null && active !== i && "opacity-50",
            )}
          >
            <span
              className="mt-1.5 size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: shareColor(d, i) }}
            />
            <span className="min-w-0 flex-1 leading-snug">{d.label}</span>
            <span className="font-medium tabular-nums">
              {prefix}
              {d.value}
              {suffix}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ==========================================
// 5. STACKED BAR (one bar split into shares, legend below)
// ==========================================
function StackedBarChart({
  data,
  shareColor,
  prefix,
  suffix,
}: {
  data: ChartDataPoint[];
  shareColor: (d: ChartDataPoint, i: number) => string;
  prefix: string;
  suffix: string;
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0) || 1;
  return (
    <div className="animate-fade">
      <div className="flex h-8 gap-0.5 overflow-hidden rounded-lg" role="img" aria-label="Share of the whole by category">
        {data.map((d, i) => (
          <div
            key={d.label}
            style={{ width: `${(d.value / total) * 100}%`, backgroundColor: shareColor(d, i) }}
            title={`${d.label} ${prefix}${d.value}${suffix}`}
            className="h-full first:rounded-l-lg last:rounded-r-lg"
          />
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs">
        {data.map((d, i) => (
          <li key={d.label} className="flex items-center gap-1.5">
            <span className="size-2 rounded-full" style={{ backgroundColor: shareColor(d, i) }} />
            <span className="text-muted-foreground">{d.label}</span>
            <span className="font-medium tabular-nums">
              {prefix}
              {d.value}
              {suffix}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
