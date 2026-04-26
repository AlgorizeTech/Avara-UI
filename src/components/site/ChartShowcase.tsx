"use client";

import {
  ChartBlock,
  ChartColor,
  ChartType,
} from "@/components/custom/blocks/ChartBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const CHART_ENGINE_CODE_TS = `"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export type ChartColor = "indigo" | "rose" | "emerald" | "zinc" | string;
export type ChartType = "bar" | "line" | "area";

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

const colorThemes: Record<string, string> = {
  indigo: "#4f46e5", rose: "#e11d48", emerald: "#10b981", zinc: "#18181b",
};

export const getThemeStyles = (color: string) => {
  const isHex = color && color.startsWith("#");
  const finalColor = isHex ? color : colorThemes[color] || colorThemes.indigo;
  const rgb = hexToRgb(finalColor);
  return {
    theme: { fill: "fill-[var(--theme-color)]", stroke: "stroke-[var(--theme-color)]", bg: "bg-[var(--theme-color)]", text: "text-[var(--theme-color)]" },
    style: { "--theme-color": finalColor, "--theme-color-rgb": rgb } as React.CSSProperties,
  };
};

export interface ChartDataPoint { label: string; value: number; }
export interface ChartBlockProps { data: ChartDataPoint[]; type?: ChartType; color?: ChartColor; height?: number; showGrid?: boolean; showTooltip?: boolean; animated?: boolean; className?: string; valuePrefix?: string; valueSuffix?: string; }

export function ChartBlock({ data, type = "bar", color = "indigo", height = 300, showGrid = true, showTooltip = true, animated = true, className, valuePrefix = "", valueSuffix = "" }: ChartBlockProps) {
  const { style } = getThemeStyles(color);
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const viewBoxWidth = 1000; const viewBoxHeight = 400;
  const padding = { top: 40, bottom: 40, left: 20, right: 20 };
  const chartWidth = viewBoxWidth - padding.left - padding.right;
  const chartHeight = viewBoxHeight - padding.top - padding.bottom;

  const maxDataValue = useMemo(() => { const max = Math.max(...data.map(d => d.value)); return max > 0 ? max : 1; }, [data]);
  const yAxisMax = useMemo(() => { const magnitude = Math.pow(10, Math.floor(Math.log10(maxDataValue))); return Math.ceil(maxDataValue / magnitude) * magnitude; }, [maxDataValue]);

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.value / yAxisMax) * chartHeight;
      return { x, y, ...d };
    });
  }, [data, yAxisMax, chartWidth, chartHeight, padding]);

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.map((p, i) => \`\${i === 0 ? "M" : "L"} \${p.x} \${p.y}\`).join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    return \`\${linePath} L \${points[points.length - 1].x} \${padding.top + chartHeight} L \${points[0].x} \${padding.top + chartHeight} Z\`;
  }, [linePath, points, padding.top, chartHeight]);

  useEffect(() => {
    if (!animated || !svgRef.current) return;
    const ctx = gsap.context(() => {
      if (type === "bar") {
        gsap.fromTo(".chart-bar", { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.05, ease: "back.out(1.2)", transformOrigin: "bottom" });
      } else {
        gsap.fromTo(".chart-path-group", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        if (type === "line") {
          const path = document.querySelector(".chart-stroke-path") as SVGPathElement;
          if (path) {
            const length = path.getTotalLength();
            gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut" });
          }
        }
      }
    }, svgRef);
    return () => ctx.revert();
  }, [type, animated, data]);

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-visible group", className)} style={{ ...style, height }} onMouseLeave={() => setHoveredIndex(null)}>
      <svg ref={svgRef} viewBox={\`0 0 \${viewBoxWidth} \${viewBoxHeight}\`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={\`gradient-\${color}\`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-color)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--theme-color)" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        {showGrid && (
          <g className="text-zinc-200 dark:text-zinc-800">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding.top + chartHeight * ratio;
              return <line key={i} x1={padding.left} y1={y} x2={viewBoxWidth - padding.right} y2={y} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />;
            })}
          </g>
        )}
        <g className="text-zinc-400 dark:text-zinc-500 text-[12px] font-medium" textAnchor="middle">
          {points.map((p, i) => {
            const showLabel = points.length < 15 || i % Math.ceil(points.length / 8) === 0 || i === points.length - 1;
            if (!showLabel) return null;
            return <text key={i} x={p.x} y={viewBoxHeight - 10} fill="currentColor">{p.label}</text>;
          })}
        </g>
        <g className="text-zinc-400 dark:text-zinc-500 text-[12px] font-medium" textAnchor="start">
          <text x={0} y={padding.top - 10} fill="currentColor">{valuePrefix}{yAxisMax}{valueSuffix}</text>
          <text x={0} y={viewBoxHeight - padding.bottom - 10} fill="currentColor">0</text>
        </g>
        <g className="chart-path-group">
          {type === "bar" && (
            <g>
              {points.map((p, i) => {
                const barWidth = Math.max((chartWidth / points.length) * 0.6, 4);
                const isHovered = hoveredIndex === i;
                return <rect key={i} className={cn("chart-bar transition-opacity duration-300 cursor-pointer", hoveredIndex !== null && !isHovered ? "opacity-30" : "opacity-100")} x={p.x - barWidth / 2} y={p.y} width={barWidth} height={padding.top + chartHeight - p.y} fill="var(--theme-color)" rx={barWidth / 4} />;
              })}
            </g>
          )}
          {(type === "area" || type === "line") && (
            <>
              {type === "area" && <path d={areaPath} fill={\`url(#gradient-\${color})\`} className="transition-opacity duration-500" />}
              <path d={linePath} fill="none" stroke="var(--theme-color)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className="chart-stroke-path transition-all duration-500" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={hoveredIndex === i ? 6 : 4} fill="white" stroke="var(--theme-color)" strokeWidth={2} className={cn("transition-all duration-300", hoveredIndex !== null && hoveredIndex !== i ? "opacity-0" : "opacity-100")} />
              ))}
            </>
          )}
        </g>
        {showTooltip && (
          <g>
            {points.map((p, i) => {
              const rectWidth = chartWidth / Math.max(points.length - 1, 1);
              const xPos = type === "bar" ? p.x - rectWidth / 2 : i === 0 ? padding.left : p.x - rectWidth / 2;
              return <rect key={\`interaction-\${i}\`} x={xPos} y={0} width={i === 0 || i === points.length - 1 ? rectWidth / 2 : rectWidth} height={viewBoxHeight} fill="transparent" onMouseEnter={() => setHoveredIndex(i)} className="cursor-crosshair" />;
            })}
          </g>
        )}
      </svg>
      {showTooltip && hoveredIndex !== null && (
        <div className="absolute z-50 pointer-events-none transition-all duration-200 ease-out" style={{ left: \`\${(points[hoveredIndex].x / viewBoxWidth) * 100}%\`, top: \`\${(points[hoveredIndex].y / viewBoxHeight) * 100}%\`, transform: 'translate(-50%, -100%)', marginTop: '-12px' }}>
          <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-2 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap flex flex-col items-center gap-0.5 relative animate-in fade-in zoom-in-95 duration-200">
            <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-wider">{points[hoveredIndex].label}</span>
            <span>{valuePrefix}{points[hoveredIndex].value}{valueSuffix}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const CHART_ENGINE_CODE_JS = `"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

const hexToRgb = (hex) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3) cleanHex = cleanHex.split("").map((x) => x + x).join("");
  const result = /^([a-f\\d]{2})([a-f\\d]{2})([a-f\\d]{2})$/i.exec(cleanHex);
  return result ? \`\${parseInt(result[1], 16)}, \${parseInt(result[2], 16)}, \${parseInt(result[3], 16)}\` : "99, 102, 241";
};

const colorThemes = {
  indigo: "#4f46e5", rose: "#e11d48", emerald: "#10b981", zinc: "#18181b",
};

export const getThemeStyles = (color) => {
  const isHex = color && color.startsWith("#");
  const finalColor = isHex ? color : colorThemes[color] || colorThemes.indigo;
  const rgb = hexToRgb(finalColor);
  return {
    theme: { fill: "fill-[var(--theme-color)]", stroke: "stroke-[var(--theme-color)]", bg: "bg-[var(--theme-color)]", text: "text-[var(--theme-color)]" },
    style: { "--theme-color": finalColor, "--theme-color-rgb": rgb },
  };
};

export function ChartBlock({ data, type = "bar", color = "indigo", height = 300, showGrid = true, showTooltip = true, animated = true, className, valuePrefix = "", valueSuffix = "" }) {
  const { style } = getThemeStyles(color);
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const viewBoxWidth = 1000; const viewBoxHeight = 400;
  const padding = { top: 40, bottom: 40, left: 20, right: 20 };
  const chartWidth = viewBoxWidth - padding.left - padding.right;
  const chartHeight = viewBoxHeight - padding.top - padding.bottom;

  const maxDataValue = useMemo(() => { const max = Math.max(...data.map(d => d.value)); return max > 0 ? max : 1; }, [data]);
  const yAxisMax = useMemo(() => { const magnitude = Math.pow(10, Math.floor(Math.log10(maxDataValue))); return Math.ceil(maxDataValue / magnitude) * magnitude; }, [maxDataValue]);

  const points = useMemo(() => {
    return data.map((d, i) => {
      const x = padding.left + (i / Math.max(data.length - 1, 1)) * chartWidth;
      const y = padding.top + chartHeight - (d.value / yAxisMax) * chartHeight;
      return { x, y, ...d };
    });
  }, [data, yAxisMax, chartWidth, chartHeight, padding]);

  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    return points.map((p, i) => \`\${i === 0 ? "M" : "L"} \${p.x} \${p.y}\`).join(" ");
  }, [points]);

  const areaPath = useMemo(() => {
    if (points.length === 0) return "";
    return \`\${linePath} L \${points[points.length - 1].x} \${padding.top + chartHeight} L \${points[0].x} \${padding.top + chartHeight} Z\`;
  }, [linePath, points, padding.top, chartHeight]);

  useEffect(() => {
    if (!animated || !svgRef.current) return;
    const ctx = gsap.context(() => {
      if (type === "bar") {
        gsap.fromTo(".chart-bar", { scaleY: 0 }, { scaleY: 1, duration: 0.8, stagger: 0.05, ease: "back.out(1.2)", transformOrigin: "bottom" });
      } else {
        gsap.fromTo(".chart-path-group", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        if (type === "line") {
          const path = document.querySelector(".chart-stroke-path");
          if (path) {
            const length = path.getTotalLength();
            gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.5, ease: "power3.inOut" });
          }
        }
      }
    }, svgRef);
    return () => ctx.revert();
  }, [type, animated, data]);

  return (
    <div ref={containerRef} className={cn("relative w-full overflow-visible group", className)} style={{ ...style, height }} onMouseLeave={() => setHoveredIndex(null)}>
      <svg ref={svgRef} viewBox={\`0 0 \${viewBoxWidth} \${viewBoxHeight}\`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id={\`gradient-\${color}\`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--theme-color)" stopOpacity={0.4} />
            <stop offset="100%" stopColor="var(--theme-color)" stopOpacity={0.0} />
          </linearGradient>
        </defs>
        {showGrid && (
          <g className="text-zinc-200 dark:text-zinc-800">
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
              const y = padding.top + chartHeight * ratio;
              return <line key={i} x1={padding.left} y1={y} x2={viewBoxWidth - padding.right} y2={y} stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />;
            })}
          </g>
        )}
        <g className="text-zinc-400 dark:text-zinc-500 text-[12px] font-medium" textAnchor="middle">
          {points.map((p, i) => {
            const showLabel = points.length < 15 || i % Math.ceil(points.length / 8) === 0 || i === points.length - 1;
            if (!showLabel) return null;
            return <text key={i} x={p.x} y={viewBoxHeight - 10} fill="currentColor">{p.label}</text>;
          })}
        </g>
        <g className="text-zinc-400 dark:text-zinc-500 text-[12px] font-medium" textAnchor="start">
          <text x={0} y={padding.top - 10} fill="currentColor">{valuePrefix}{yAxisMax}{valueSuffix}</text>
          <text x={0} y={viewBoxHeight - padding.bottom - 10} fill="currentColor">0</text>
        </g>
        <g className="chart-path-group">
          {type === "bar" && (
            <g>
              {points.map((p, i) => {
                const barWidth = Math.max((chartWidth / points.length) * 0.6, 4);
                const isHovered = hoveredIndex === i;
                return <rect key={i} className={cn("chart-bar transition-opacity duration-300 cursor-pointer", hoveredIndex !== null && !isHovered ? "opacity-30" : "opacity-100")} x={p.x - barWidth / 2} y={p.y} width={barWidth} height={padding.top + chartHeight - p.y} fill="var(--theme-color)" rx={barWidth / 4} />;
              })}
            </g>
          )}
          {(type === "area" || type === "line") && (
            <>
              {type === "area" && <path d={areaPath} fill={\`url(#gradient-\${color})\`} className="transition-opacity duration-500" />}
              <path d={linePath} fill="none" stroke="var(--theme-color)" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" className="chart-stroke-path transition-all duration-500" />
              {points.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r={hoveredIndex === i ? 6 : 4} fill="white" stroke="var(--theme-color)" strokeWidth={2} className={cn("transition-all duration-300", hoveredIndex !== null && hoveredIndex !== i ? "opacity-0" : "opacity-100")} />
              ))}
            </>
          )}
        </g>
        {showTooltip && (
          <g>
            {points.map((p, i) => {
              const rectWidth = chartWidth / Math.max(points.length - 1, 1);
              const xPos = type === "bar" ? p.x - rectWidth / 2 : i === 0 ? padding.left : p.x - rectWidth / 2;
              return <rect key={\`interaction-\${i}\`} x={xPos} y={0} width={i === 0 || i === points.length - 1 ? rectWidth / 2 : rectWidth} height={viewBoxHeight} fill="transparent" onMouseEnter={() => setHoveredIndex(i)} className="cursor-crosshair" />;
            })}
          </g>
        )}
      </svg>
      {showTooltip && hoveredIndex !== null && (
        <div className="absolute z-50 pointer-events-none transition-all duration-200 ease-out" style={{ left: \`\${(points[hoveredIndex].x / viewBoxWidth) * 100}%\`, top: \`\${(points[hoveredIndex].y / viewBoxHeight) * 100}%\`, transform: 'translate(-50%, -100%)', marginTop: '-12px' }}>
          <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-2 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap flex flex-col items-center gap-0.5 relative animate-in fade-in zoom-in-95 duration-200">
            <span className="text-zinc-400 dark:text-zinc-500 text-[10px] uppercase tracking-wider">{points[hoveredIndex].label}</span>
            <span>{valuePrefix}{points[hoveredIndex].value}{valueSuffix}</span>
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zinc-900 dark:bg-white rotate-45" />
          </div>
        </div>
      )}
    </div>
  );
}`;

export function ChartShowcase() {
  const [type, setType] = useState<ChartType>("bar");
  const [color, setColor] = useState<ChartColor>("indigo");
  const [showGrid, setShowGrid] = useState(true);

  // Sample Financial Data
  const sampleData = [
    { label: "Jan", value: 1200 },
    { label: "Feb", value: 1900 },
    { label: "Mar", value: 1500 },
    { label: "Apr", value: 2400 },
    { label: "May", value: 2100 },
    { label: "Jun", value: 3200 },
    { label: "Jul", value: 2800 },
    { label: "Aug", value: 3800 },
    { label: "Sep", value: 3400 },
    { label: "Oct", value: 4200 },
    { label: "Nov", value: 3900 },
    { label: "Dec", value: 4800 },
  ];

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        data={data}\n        type="${type}"\n        color="${color}"`;
    if (!showGrid) propsStr += `\n        showGrid={false}`;
    propsStr += `\n        valuePrefix="$"`;

    return `import { ChartBlock } from "@/components/custom/blocks/ChartBlock";

const data = [
  { label: "Jan", value: 1200 },
  { label: "Feb", value: 1900 },
  { label: "Mar", value: 1500 },
  // ...
];

export default function DashboardMetrics() {
  return (
    <div className="w-full p-6 border rounded-xl bg-white dark:bg-zinc-950">
      <h3 className="text-lg font-bold mb-6">Revenue Overview</h3>
      <ChartBlock ${propsStr}
      />
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Chart Type
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["bar", "line", "area"] as ChartType[]).map((v) => (
                <button
                  key={v}
                  onClick={() => setType(v)}
                  className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                    type === v
                      ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Theme Color
            </label>
            <div className="flex items-center gap-2 h-10 px-2">
              {[
                { id: "indigo", bg: "bg-indigo-500" },
                { id: "rose", bg: "bg-rose-500" },
                { id: "emerald", bg: "bg-emerald-500" },
                { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setColor(c.id as ChartColor)}
                  className={`w-7 h-7 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                    color === c.id
                      ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                      : "hover:scale-110 hover:opacity-80"
                  }`}
                  title={c.id}
                />
              ))}

              {/* Custom Color Picker */}
              <div
                className={`relative flex items-center justify-center w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${color.startsWith("#") ? "border-zinc-900 dark:border-white scale-110 ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500" : "border-zinc-300 dark:border-zinc-700 hover:scale-110"}`}
              >
                <input
                  type="color"
                  value={color.startsWith("#") ? color : "#8b5cf6"}
                  onChange={(e) => setColor(e.target.value)}
                  className="absolute inset-[-10px] w-12 h-12 cursor-pointer"
                  title="Custom Hex Color"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setShowGrid(!showGrid)}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all ${
                  showGrid
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Background Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="ChartBlock"
        tsCode={CHART_ENGINE_CODE_TS}
        jsCode={CHART_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex flex-col items-start justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          <div className="w-full max-w-4xl mx-auto">
            <div className="mb-8">
              <h3 className="text-xl font-black text-zinc-900 dark:text-white">
                Annual Revenue Overview
              </h3>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                Fiscal year 2023 performance metrics.
              </p>
            </div>
            {/* The Key forces a total re-render when switching types so GSAP entrance animations re-trigger properly */}
            <ChartBlock
              key={`${type}-${color}-${showGrid}`}
              data={sampleData}
              type={type}
              color={color}
              showGrid={showGrid}
              valuePrefix="$"
              height={300}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
