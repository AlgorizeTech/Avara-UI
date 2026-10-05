"use client";

import { cn } from "@/lib/utils";
import {
  ArrowDownRight,
  ArrowUpRight,
  ChartColumnBig,
  ChartSpline,
  Info,
  Mail,
  Minus,
  PenLine,
  UserPlus,
  Wallet,
} from "lucide-react";
import { useId, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./PopoverBlock";
import { ToggleGroup, ToggleGroupItem } from "./ToggleGroupBlock";

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
  | "stacked-bar"
  /** Semicircular tick gauge with categorized shares and conversion rate. */
  | "traffic-sources"
  /** Proportional barcode visualization with country ISO badges and share breakdown. */
  | "visitors-by-country"
  /** Multi-metric tabs overview with pill columns, dashed average line, and trend spline toggle. */
  | "metrics-overview";

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

const DASH_COLORS = [
  "#6356d1",
  "#e87ba4",
  "#eda100",
  "#1baf7a",
  "#94a3b8",
];

// ==========================================
// TYPES & PROPS
// ==========================================
export interface ChartDataPoint {
  id?: string;
  label: string;
  value: number;
  /** Own colour for this share in `donut-legend`, `stacked-bar`, `traffic-sources`. */
  color?: string;
  /** 2-letter ISO code for country breakdown charts, e.g. "US", "DE". */
  code?: string;
}

export interface MetricTabPoint {
  label: string;
  shortLabel?: string;
  fullLabel?: string;
  value: number;
}

export interface MetricTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  currency?: string;
  change?: number | null;
  points: MetricTabPoint[];
}

export interface ChartBlockProps {
  data?: ChartDataPoint[];
  type?: ChartType;
  color?: ChartColor;
  /**
   * Fixed pixel height. Defaults to 300 for the axis charts; the legend and breakdown
   * charts size to their content unless set.
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
  /** `traffic-sources`: number of sign-ups to calculate visit-to-sign-up rate. */
  signUps?: number;
  /** `visitors-by-country`: whether to display 2-letter ISO country badge. */
  showCodes?: boolean;
  /** Optional title for card-based breakdown charts. */
  title?: string;
  /** Optional subtitle/caption for card-based breakdown charts. */
  caption?: string;
  /** `metrics-overview`: array of metric tabs with series data. */
  metrics?: MetricTabItem[];
}

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export function ChartBlock({
  data = [],
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
  signUps,
  showCodes = true,
  title,
  caption,
  metrics,
}: ChartBlockProps) {
  const themeColor = getThemeColor(color);
  const isSelfSizing =
    type === "donut-legend" ||
    type === "stacked-bar" ||
    type === "traffic-sources" ||
    type === "visitors-by-country" ||
    type === "metrics-overview";

  // Every share gets a colour: its own, else the palette in order, wrapping.
  const shareColor = (d: ChartDataPoint, i: number) =>
    getThemeColor(d.color ?? colors[i % colors.length] ?? "primary");

  if (type === "metrics-overview") {
    const activeMetrics =
      metrics ||
      (data && data.length > 0
        ? [
            {
              id: "metric-1",
              label: title || "Overview",
              points: data.map((d) => ({
                label: d.label,
                value: d.value,
              })),
            },
          ]
        : undefined);

    return (
      <MetricsOverviewChart
        metrics={activeMetrics}
        title={title}
        compareCaption={caption}
        className={className}
      />
    );
  }

  if (type === "traffic-sources") {
    return (
      <TrafficSourcesChart
        data={data}
        colors={colors}
        signUps={signUps}
        title={title}
        caption={caption}
        className={className}
      />
    );
  }

  if (type === "visitors-by-country") {
    return (
      <VisitorsByCountryChart
        data={data}
        colors={colors}
        showCodes={showCodes}
        title={title}
        caption={caption}
        className={className}
      />
    );
  }

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ height: height ?? (isSelfSizing ? undefined : 300) }}
    >
      {/* NATIVE CSS ANIMATIONS */}
      <style>{`
        @keyframes drawLine { from { clip-path: inset(-8px 100% -8px -8px); } to { clip-path: inset(-8px -8px -8px -8px); } }
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
                className={cn(inkOn(color), "px-3 py-1.5 rounded-lg border border-border/20 text-xs font-semibold whitespace-nowrap text-center")}
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
  // An id that is valid whatever the colour is: `var(--primary)` (the
  // default) is not a legal fragment for `url(#…)`, which left the area black.
  const cleanColorId = useId().replace(/[^a-zA-Z0-9_-]/g, "");

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

      {/* Vector Graphics. The draw-in is a left-to-right clip reveal rather
          than a stroke-dasharray sweep: with a non-scaling stroke the dash
          pattern is measured in screen pixels, not pathLength units, so a
          dashed draw cut the line into pieces whose count changed with width. */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 top-6 bottom-8 left-12 right-4 w-[calc(100%-64px)] h-[calc(100%-56px)] overflow-visible z-10 animate-draw"
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
                "absolute w-3 h-3 rounded-full bg-background border-2 transition-all duration-200 pointer-events-none",
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
                  className={cn(inkOn(color), "px-3 py-1.5 rounded-lg border border-border/20 text-xs font-semibold whitespace-nowrap text-center")}
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
              className={cn(inkOn(color), "px-3 py-1.5 rounded-lg border border-border/20 text-xs font-semibold whitespace-nowrap text-center")}
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

// ==========================================
// 6. TRAFFIC SOURCES & VISITORS BY COUNTRY (Dashboard Breakdown Visualizations)
// ==========================================
const integerFormat = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });
const compactFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatNumber = (value: number) => integerFormat.format(value);
const formatCompact = (value: number) =>
  Math.abs(value) < 10000 ? formatNumber(value) : compactFormat.format(value);
const formatShare = (share: number) =>
  share <= 0 ? "0%" : share < 0.01 ? "<1%" : `${Math.round(share * 100)}%`;
const formatRate = (rate: number) =>
  rate === 0 ? "0%" : `${(rate * 100).toFixed(rate < 0.1 ? 1 : 0)}%`;
const plural = (count: number, [one, many]: [string, string]) =>
  count === 1 ? one : many;
const sumValues = (values: number[]) => values.reduce((total, value) => total + value, 0);

interface BreakdownSlice {
  key: string;
  name: string;
  value: number;
  share: number;
  color: string;
  code?: string;
}

function composeBreakdownShares(
  shares: ChartDataPoint[],
  palette: string[] = DASH_COLORS
): { slices: BreakdownSlice[]; total: number } {
  const rows = [...shares].filter((s) => s.value > 0).sort((a, b) => b.value - a.value);
  const total = sumValues(rows.map((r) => r.value));
  if (!total) return { slices: [], total: 0 };
  const top = rows.slice(0, rows.length > 4 ? 3 : 4);
  const rest = rows.slice(top.length);
  const slices: BreakdownSlice[] = top.map((row, index) => ({
    key: row.id || row.label,
    name: row.label,
    value: row.value,
    share: row.value / total,
    color: row.color || palette[index % palette.length] || "#94a3b8",
    code: row.code,
  }));
  if (rest.length) {
    const value = sumValues(rest.map((r) => r.value));
    slices.push({
      key: "__other",
      name: `Other (${rest.length})`,
      value,
      share: value / total,
      color: "#94a3b8",
    });
  }
  return { slices, total };
}

function allocateGaugeUnits(slices: BreakdownSlice[], units: number): (BreakdownSlice | null)[] {
  const total = sumValues(slices.map((slice) => slice.value));
  if (!total) return Array.from({ length: units }, () => null);
  const exact = slices.map((slice) => (slice.value / total) * units);
  const counts = exact.map(Math.floor);
  let left = units - sumValues(counts);
  exact
    .map((value, index) => ({ index, rest: value - Math.floor(value) }))
    .sort((a, b) => b.rest - a.rest)
    .forEach(({ index }) => {
      if (left > 0) {
        counts[index] = (counts[index] ?? 0) + 1;
        left -= 1;
      }
    });
  return slices.flatMap((slice, index) => Array.from({ length: counts[index] ?? 0 }, () => slice));
}

const GAUGE_TICKS = 44;

function TickGauge({
  slices,
  focus,
  onFocus,
  label,
  children,
}: {
  slices: BreakdownSlice[];
  focus: string | null;
  onFocus: (key: string | null) => void;
  label: string;
  children: React.ReactNode;
}) {
  const units = allocateGaugeUnits(slices, GAUGE_TICKS);
  return (
    <div className="relative mx-auto w-full max-w-[20rem] sm:max-w-[24rem] md:max-w-[26rem]">
      <svg viewBox="0 0 300 156" className="block w-full" role="img" aria-label={label}>
        {units.map((unit, index) => {
          const angle = Math.PI - (index / (GAUGE_TICKS - 1)) * Math.PI;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          return (
            <line
              key={index}
              x1={150 + 104 * cos}
              y1={150 - 104 * sin}
              x2={150 + 136 * cos}
              y2={150 - 136 * sin}
              stroke={unit ? unit.color : "currentColor"}
              className={cn(
                unit ? "cursor-pointer" : "text-muted-foreground/20",
                "transition-all duration-150"
              )}
              strokeWidth={focus && unit && unit.key === focus ? 6 : 5}
              strokeLinecap="round"
              opacity={focus && unit && unit.key !== focus ? 0.22 : 1}
              style={{ transition: "opacity 150ms ease-out, stroke-width 150ms ease-out" }}
              onPointerEnter={unit ? () => onFocus(unit.key) : undefined}
              onPointerLeave={unit ? () => onFocus(null) : undefined}
            />
          );
        })}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}

function Barcode({
  slices,
  focus,
  onFocus,
}: {
  slices: BreakdownSlice[];
  focus: string | null;
  onFocus: (key: string | null) => void;
}) {
  const units = allocateGaugeUnits(slices, 48);
  return (
    <div
      aria-hidden="true"
      className="mt-5 flex h-12 items-stretch gap-[3px]"
      onPointerLeave={() => onFocus(null)}
    >
      {units.map((unit, index) => (
        <span
          key={index}
          className={cn(
            "min-w-0 flex-1 rounded-full transition-opacity duration-150 cursor-pointer",
            index > 0 && units[index - 1]?.key !== unit?.key && "ml-1.5",
            focus && focus !== unit?.key && "opacity-25",
            !unit && "bg-muted"
          )}
          style={{ backgroundColor: unit?.color }}
          onPointerEnter={() => onFocus(unit?.key ?? null)}
        />
      ))}
    </div>
  );
}

function BreakdownList({
  slices,
  focus,
  onFocus,
  showCodes = false,
  className,
}: {
  slices: BreakdownSlice[];
  focus: string | null;
  onFocus: (key: string | null) => void;
  showCodes?: boolean;
  className?: string;
}) {
  return (
    <ul className={cn("space-y-1", className)} onPointerLeave={() => onFocus(null)}>
      {slices.map((slice) => (
        <li
          key={slice.key}
          onPointerEnter={() => onFocus(slice.key)}
          onClick={() => onFocus(focus === slice.key ? null : slice.key)}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 transition-all duration-150 cursor-pointer select-none",
            focus === slice.key
              ? "bg-muted/80 translate-x-1"
              : "hover:bg-muted/50 hover:translate-x-0.5"
          )}
        >
          <span
            aria-hidden="true"
            className="h-4 w-1.5 shrink-0 rounded-full transition-transform duration-150"
            style={{ backgroundColor: slice.color }}
          />
          {showCodes && (
            <span
              aria-hidden="true"
              className="grid h-4 w-6 shrink-0 place-items-center rounded-[4px] bg-muted text-[9px] font-semibold tracking-wide text-muted-foreground"
            >
              {slice.code ?? "··"}
            </span>
          )}
          <span className="min-w-0 flex-1 truncate text-sm font-medium text-foreground">{slice.name}</span>
          <span className="text-sm font-medium tabular-nums text-foreground">{formatNumber(slice.value)}</span>
          <span className="w-14 shrink-0 rounded-full bg-muted/80 py-0.5 text-center text-xs tabular-nums text-muted-foreground font-semibold">
            {formatShare(slice.share)}
          </span>
        </li>
      ))}
    </ul>
  );
}

function ConversionRate({ signUps, visits }: { signUps: number; visits: number }) {
  const rate = signUps / (visits || 1);
  const valid = rate <= 1;
  return (
    <div className="mt-auto pt-5">
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1 text-[13px] text-muted-foreground">
            Visit to sign-up rate
            <Popover>
              <PopoverTrigger
                aria-label="How this rate is calculated"
                className="grid size-6 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Info className="size-3.5" aria-hidden="true" />
              </PopoverTrigger>
              <PopoverContent
                side="top"
                className="w-64 rounded-lg border-0 bg-foreground p-3 text-xs leading-5 text-background lg:p-3 lg:text-xs"
              >
                New sign-ups divided by the visits in the same period.
              </PopoverContent>
            </Popover>
          </div>
          <p className="text-sm font-medium tabular-nums text-foreground">{valid ? formatRate(rate) : "—"}</p>
        </div>
        <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full rounded-full bg-primary" style={{ width: `${valid ? rate * 100 : 0}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {valid
            ? `${formatNumber(signUps)} ${plural(signUps, ["sign-up", "sign-ups"])} from ${formatNumber(visits)} ${plural(visits, ["visit", "visits"])}`
            : `${formatNumber(signUps)} sign-ups outnumber the ${formatNumber(visits)} tracked visits.`}
        </p>
      </div>
    </div>
  );
}

export interface TrafficSourcesChartProps {
  data?: ChartDataPoint[];
  title?: string;
  caption?: string;
  signUps?: number;
  showConversionRate?: boolean;
  className?: string;
  colors?: string[];
  unitLabel?: string;
  pluralUnitLabel?: string;
  href?: string;
}

export function TrafficSourcesChart({
  data = [
    { label: "Direct", value: 3420 },
    { label: "Google Search", value: 2180 },
    { label: "GitHub", value: 1450 },
    { label: "Twitter / X", value: 890 },
    { label: "LinkedIn", value: 430 },
  ],
  title = "Traffic sources",
  caption = "Today",
  signUps = 412,
  showConversionRate = true,
  className,
  colors = DASH_COLORS,
  unitLabel = "visit",
  pluralUnitLabel = "visits",
  href,
}: TrafficSourcesChartProps) {
  const id = useId();
  const [focus, setFocus] = useState<string | null>(null);
  const { slices, total } = useMemo(() => composeBreakdownShares(data, colors), [data, colors]);
  const gaugeLabel = total
    ? `Visits by source: ${slices.map((slice) => `${slice.name} ${formatShare(slice.share)}`).join(", ")}`
    : `No visits yet`;

  return (
    <div
      aria-labelledby={`${id}-title`}
      className={cn(
        "flex flex-col rounded-3xl border border-border/70 bg-card p-5 sm:p-6 text-card-foreground",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={`${id}-title`} className="text-base font-semibold text-foreground">
            {title}
          </h3>
          {caption && <p className="text-[13px] text-muted-foreground">{caption}</p>}
        </div>
        {href && (
          <a
            href={href}
            aria-label="Open visitor analytics"
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground border border-border/70"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <TickGauge slices={slices} focus={focus} onFocus={setFocus} label={gaugeLabel}>
          <span className="text-[2rem] font-light leading-none tracking-[-0.02em] text-foreground">
            {formatCompact(total)}
          </span>
          <span className="mt-1.5 text-xs text-muted-foreground">{plural(total, [unitLabel, pluralUnitLabel])}</span>
        </TickGauge>

        {total ? (
          <>
            <BreakdownList slices={slices} focus={focus} onFocus={setFocus} className="mt-5" />
            {showConversionRate && signUps !== undefined && (
              <ConversionRate signUps={signUps} visits={total} />
            )}
          </>
        ) : (
          <p className="mt-5 text-center text-[13px] text-muted-foreground">
            No visits recorded yet.
          </p>
        )}
      </div>
    </div>
  );
}

export interface VisitorsByCountryChartProps {
  data?: ChartDataPoint[];
  title?: string;
  caption?: string;
  className?: string;
  colors?: string[];
  showCodes?: boolean;
  href?: string;
}

export function VisitorsByCountryChart({
  data = [
    { label: "United States", value: 4250, code: "US" },
    { label: "Germany", value: 1820, code: "DE" },
    { label: "United Kingdom", value: 1340, code: "GB" },
    { label: "India", value: 980, code: "IN" },
    { label: "Canada", value: 650, code: "CA" },
    { label: "France", value: 420, code: "FR" },
  ],
  title = "Visitors by country",
  caption = "Today",
  className,
  colors = DASH_COLORS,
  showCodes = true,
  href,
}: VisitorsByCountryChartProps) {
  const id = useId();
  const [focus, setFocus] = useState<string | null>(null);
  const { slices, total } = useMemo(() => composeBreakdownShares(data, colors), [data, colors]);
  const countryCount = data.filter((item) => item.value > 0).length;
  const leader = slices[0];

  return (
    <div
      aria-labelledby={`${id}-title`}
      className={cn(
        "flex flex-col rounded-3xl border border-border/70 bg-card p-5 sm:p-6 text-card-foreground",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 id={`${id}-title`} className="text-base font-semibold text-foreground">
            {title}
          </h3>
          {caption && <p className="text-[13px] text-muted-foreground">{caption}</p>}
        </div>
        {href && (
          <a
            href={href}
            aria-label="Open country analytics"
            className="grid size-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground border border-border"
          >
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>

      {!total || !leader ? (
        <p className="mt-5 text-center text-[13px] text-muted-foreground py-8">
          Countries appear here once visitors arrive.
        </p>
      ) : (
        <>
          <div className="mt-5">
            <p className="flex items-baseline gap-2">
              <span className="text-[2rem] font-light leading-none tracking-[-0.02em] text-foreground">
                {formatNumber(countryCount)}
              </span>
              <span className="text-sm text-muted-foreground">{plural(countryCount, ["country", "countries"])}</span>
            </p>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
              {leader.name} accounts for {formatShare(leader.share)} of visits.
            </p>
          </div>
          <Barcode slices={slices} focus={focus} onFocus={setFocus} />
          <BreakdownList slices={slices} focus={focus} onFocus={setFocus} showCodes={showCodes} className="mt-4" />
        </>
      )}
    </div>
  );
}

// ==========================================
// 7. METRICS OVERVIEW CHART (Multi-Tab Columns & Trend Spline)
// ==========================================
function DeltaBadge({ change, className }: { change: number; className?: string }) {
  const rounded = Math.abs(change) < 0.05 ? 0 : change;
  const direction = rounded > 0 ? "up" : rounded < 0 ? "down" : "flat";
  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full py-0.5 pl-1 pr-2 text-xs font-medium tabular-nums",
        direction === "up" && "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        direction === "down" && "bg-rose-500/10 text-rose-600 dark:text-rose-400",
        direction === "flat" && "bg-muted text-muted-foreground",
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      <span className="sr-only">
        {direction === "up" ? "Up " : direction === "down" ? "Down " : "No change, "}
      </span>
      {formatChange(rounded)}
    </span>
  );
}

const formatMoney = (value: number, currency: string, compact = false) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation: compact && Math.abs(value) >= 10000 ? "compact" : "standard",
    maximumFractionDigits: compact || Math.abs(value) >= 1000 ? 0 : 2,
  }).format(value);

const formatChange = (change: number) => {
  const size = Math.abs(change);
  const digits = size < 10 ? size.toFixed(1) : String(Math.round(size));
  return `${change > 0 ? "+" : change < 0 ? "−" : ""}${digits}%`;
};

const currencySymbol = (currency: string) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value ?? "";

function niceCeiling(value: number) {
  if (value <= 0) return 1;
  const power = 10 ** Math.floor(Math.log10(value));
  const fraction = value / power;
  const nice = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 2.5 ? 2.5 : fraction <= 5 ? 5 : 10;
  return nice * power;
}

function axisTicks(ceiling: number, money: boolean, empty: boolean) {
  if (empty) return [0];
  const half = ceiling / 2;
  return !money && !Number.isInteger(half) ? [0, ceiling] : [0, half, ceiling];
}

interface ResolvedOverviewMetric {
  metric: MetricTabItem;
  points: MetricTabPoint[];
  current: number;
  change: number | null;
  total: number;
  average: number;
  format: (value: number) => string;
  formatShort: (value: number) => string;
}

function ColumnsChart({ entry }: { entry: ResolvedOverviewMetric }) {
  const { points } = entry;
  const [inspected, setInspected] = useState<number | null>(null);
  const lastIndex = points.length - 1;
  const ceiling = niceCeiling(Math.max(0, ...points.map((point) => point.value)));
  const empty = entry.total === 0;
  const ticks = axisTicks(ceiling, Boolean(entry.metric.currency), empty);
  const shown = empty ? inspected : (inspected ?? lastIndex);
  const inspectedPoint = inspected === null ? null : points[inspected];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const from = inspected ?? lastIndex;
    const moves: Record<string, number> = {
      ArrowLeft: Math.max(0, from - 1),
      ArrowRight: Math.min(lastIndex, from + 1),
      Home: 0,
      End: lastIndex,
    };
    const move = moves[event.key];
    if (move !== undefined) {
      event.preventDefault();
      setInspected(move);
    } else if (event.key === "Escape") {
      setInspected(null);
    }
  };

  return (
    <div>
      <div
        role="group"
        aria-roledescription="chart"
        aria-label={`${entry.metric.label}. Use the arrow keys to read each value.`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onBlur={() => setInspected(null)}
        onPointerLeave={(event) => {
          if (event.pointerType !== "touch") setInspected(null);
        }}
        className="relative rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
      >
        <div className="h-[16.5rem] pt-10">
          <div className="relative h-full">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 w-9">
              {ticks.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-0 translate-y-1/2 text-[11px] leading-none tabular-nums text-muted-foreground font-mono"
                  style={{ bottom: `${(tick / ceiling) * 100}%` }}
                >
                  {entry.formatShort(tick)}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 left-12 right-0">
              {entry.average > 0 && !empty && (
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 border-t border-dashed border-muted-foreground/40 pointer-events-none"
                  style={{ bottom: `${(entry.average / ceiling) * 100}%` }}
                />
              )}
              <div className="absolute inset-0 flex items-end gap-1 sm:gap-2 md:gap-3">
                {points.map((point, index) => {
                  const percent = (point.value / ceiling) * 100;
                  const isCurrent = index === lastIndex;
                  const isInspected = index === inspected;
                  return (
                    <div
                      key={`${point.label}-${index}`}
                      className="relative flex h-full min-w-0 flex-1 justify-center cursor-pointer"
                      onPointerEnter={() => setInspected(index)}
                      onPointerDown={() => setInspected(index)}
                    >
                      <div className="relative h-full w-full max-w-7 rounded-full bg-muted/60 transition-colors">
                        {point.value > 0 && (
                          <div
                            className={cn(
                              "absolute inset-x-0 bottom-0 rounded-full transition-all duration-200",
                              isCurrent
                                ? "bg-primary"
                                : isInspected
                                  ? "bg-primary/70"
                                  : "bg-primary/25 hover:bg-primary/40",
                            )}
                            style={{ height: `max(${percent}%, 0.625rem)` }}
                          />
                        )}
                        {index === shown && (
                          <div
                            className={cn(
                              "pointer-events-none absolute z-20 whitespace-nowrap",
                              index === 0 ? "left-0" : index === lastIndex ? "right-0" : "left-1/2 -translate-x-1/2",
                            )}
                            style={{ bottom: `calc(max(${percent}%, 0.625rem) + 0.5rem)` }}
                          >
                            {isInspected ? (
                              <div className="rounded-xl bg-card border border-border px-3 py-1.5 text-card-foreground">
                                <p className="text-sm font-semibold leading-5 text-foreground">{entry.format(point.value)}</p>
                                <p className="text-[11px] leading-4 text-muted-foreground">{point.fullLabel ?? point.label}</p>
                              </div>
                            ) : (
                              <span className="block rounded-full bg-primary px-2.5 py-1 text-xs font-semibold leading-none text-primary-foreground">
                                {entry.formatShort(point.value)}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div aria-hidden="true" className="ml-12 mt-3 flex gap-1 sm:gap-2 md:gap-3">
          {points.map((point, index) => (
            <span
              key={`${point.label}-${index}`}
              className={cn(
                "min-w-0 flex-1 truncate text-center text-xs",
                index === lastIndex ? "font-semibold text-foreground" : "text-muted-foreground",
              )}
            >
              <span className="sm:hidden">{point.shortLabel ?? point.label}</span>
              <span className="hidden sm:inline">{point.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export const defaultOverviewMetrics: MetricTabItem[] = [
  {
    id: "users",
    label: "New users",
    icon: <UserPlus className="size-4" />,
    change: 9.1,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 850 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 940 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 1050 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 1000 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 1120 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 1200 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 1180 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 1280 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 1094 },
    ],
  },
  {
    id: "posts",
    label: "Posts",
    icon: <PenLine className="size-4" />,
    change: 5.6,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 110 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 125 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 130 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 120 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 140 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 150 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 145 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 160 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 149 },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: <Mail className="size-4" />,
    change: 4.4,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 420 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 460 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 490 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 470 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 520 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 580 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 550 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 610 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 571 },
    ],
  },
  {
    id: "revenue",
    label: "Revenue",
    icon: <Wallet className="size-4" />,
    currency: "USD",
    change: 7.7,
    points: [
      { label: "Jan", shortLabel: "J", fullLabel: "January", value: 52000 },
      { label: "Feb", shortLabel: "F", fullLabel: "February", value: 58000 },
      { label: "Mar", shortLabel: "M", fullLabel: "March", value: 64000 },
      { label: "Apr", shortLabel: "A", fullLabel: "April", value: 61000 },
      { label: "May", shortLabel: "M", fullLabel: "May", value: 69000 },
      { label: "Jun", shortLabel: "J", fullLabel: "June", value: 74000 },
      { label: "Jul", shortLabel: "J", fullLabel: "July", value: 71000 },
      { label: "Aug", shortLabel: "A", fullLabel: "August", value: 82000 },
      { label: "Sep", shortLabel: "S", fullLabel: "September", value: 77400 },
    ],
  },
];

export interface MetricsOverviewChartProps {
  metrics?: MetricTabItem[];
  title?: string;
  compareCaption?: string;
  periodLabel?: string;
  className?: string;
  defaultMetricId?: string;
}

export function MetricsOverviewChart({
  metrics = defaultOverviewMetrics,
  title = "This year by month",
  compareCaption = "vs last month",
  periodLabel = "a month",
  className,
  defaultMetricId,
}: MetricsOverviewChartProps) {
  const [activeId, setActiveId] = useState(defaultMetricId || metrics[0]?.id || "");
  const [form, setForm] = useState<"columns" | "line">("columns");

  const resolved: ResolvedOverviewMetric[] = useMemo(
    () =>
      metrics.map((metric) => {
        const points = metric.points;
        const total = sumValues(points.map((p) => p.value));
        const currency = metric.currency;
        return {
          metric,
          points,
          current: points[points.length - 1]?.value ?? 0,
          change: metric.change ?? null,
          total,
          average: points.length ? total / points.length : 0,
          format: currency ? (value: number) => formatMoney(value, currency) : formatNumber,
          formatShort: currency ? (value: number) => formatMoney(value, currency, true) : formatNumber,
        };
      }),
    [metrics],
  );

  const active = resolved.find((entry) => entry.metric.id === activeId) ?? resolved[0];

  return (
    <div
      className={cn(
        "flex flex-col rounded-3xl border border-border/70 bg-card text-card-foreground overflow-hidden",
        className
      )}
    >
      {/* Metric Tabs */}
      <div
        role="tablist"
        aria-label="Metrics"
        className="flex gap-px border-b border-border bg-border/40"
      >
        {resolved.map((entry) => {
          const selected = entry.metric.id === active?.metric.id;
          return (
            <button
              key={entry.metric.id}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActiveId(entry.metric.id)}
              className={cn(
                "group relative flex min-w-0 flex-1 basis-0 flex-col items-start gap-1 bg-card px-2.5 py-3 text-left transition-all duration-200 hover:bg-muted/40 cursor-pointer sm:flex-auto sm:gap-1.5 sm:px-4 sm:py-3.5 select-none",
                "outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary/60",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 bottom-0 h-[3px] origin-center bg-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
              <span
                className={cn(
                  "flex max-w-full items-center gap-2 text-xs leading-4 transition-colors sm:text-[13px] sm:leading-5",
                  selected ? "text-foreground font-medium" : "text-muted-foreground",
                )}
              >
                {entry.metric.icon && (
                  <span aria-hidden="true" className="hidden shrink-0 sm:block [&_svg]:size-4">
                    {entry.metric.icon}
                  </span>
                )}
                <span className="truncate">{entry.metric.label}</span>
              </span>
              <span className="flex max-w-full flex-col items-start gap-1 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-1.5">
                <span className="text-[1.0625rem] font-normal leading-6 tracking-[-0.02em] tabular-nums text-foreground sm:text-[1.3125rem] sm:leading-7">
                  {entry.formatShort(entry.current)}
                </span>
                {entry.change !== null && (
                  <DeltaBadge change={entry.change} className="text-[11px] sm:text-xs" />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {active && (
        <div className="px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
          <figure className="m-0">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
              <figcaption className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[13px] leading-5">
                <span className="font-semibold text-foreground">{title}</span>
                {active.change !== null && compareCaption && (
                  <>
                    <span aria-hidden="true" className="h-3.5 w-px bg-muted-foreground/30" />
                    <span className="text-muted-foreground">{compareCaption}</span>
                  </>
                )}
              </figcaption>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {active.points.length > 0 && (
                  <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] leading-5">
                    <div className="flex items-baseline gap-1.5">
                      <dt className="text-muted-foreground">Total</dt>
                      <dd className="font-semibold tabular-nums text-foreground">{active.formatShort(active.total)}</dd>
                    </div>
                    <div className="flex items-baseline gap-1.5">
                      <dt className="flex items-center gap-1.5 self-center text-muted-foreground">
                        <span aria-hidden="true" className="w-3 border-t border-dashed border-current" />
                        <span aria-hidden="true">Avg</span>
                        <span className="sr-only">Average</span>
                      </dt>
                      <dd className="font-semibold tabular-nums text-foreground">
                        {active.formatShort(active.average)}{" "}
                        <span className="font-normal text-muted-foreground">{periodLabel}</span>
                      </dd>
                    </div>
                  </dl>
                )}
                <ToggleGroup
                  type="single"
                  variant="segmented"
                  size="sm"
                  value={form}
                  onValueChange={(next) => {
                    if (next === "columns" || next === "line") setForm(next);
                  }}
                  aria-label="Chart style"
                >
                  <ToggleGroupItem value="columns" aria-label="Columns" title="Columns" className="w-8 px-0">
                    <ChartColumnBig className="size-4" aria-hidden="true" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="line" aria-label="Trend line" title="Trend line" className="w-8 px-0">
                    <ChartSpline className="size-4" aria-hidden="true" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </div>
            </div>

            <div className="mt-2">
              {form === "line" ? (
                <div className="h-[18rem] pt-4">
                  <ChartBlock
                    type="line"
                    data={active.points.map((point) => ({ label: point.label, value: point.value }))}
                    color="var(--primary)"
                    height={270}
                    valuePrefix={active.metric.currency ? currencySymbol(active.metric.currency) : ""}
                  />
                </div>
              ) : (
                <ColumnsChart entry={active} />
              )}
            </div>
          </figure>
        </div>
      )}
    </div>
  );
}
