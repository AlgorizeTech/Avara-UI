"use client";

import {
  ChartBlock,
  ChartColor,
  ChartType,
} from "@/components/custom/blocks/ChartBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";
import { useEffect, useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const CHART_ENGINE_CODE_TS = `"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export type ChartColor = "indigo" | "rose" | "emerald" | "zinc" | "amber" | "blue" | (string & {});
export type ChartType = "bar" | "line" | "pie" | "donut";

const colorMap: Record<string, string> = { indigo: "#4f46e5", rose: "#e11d48", emerald: "#10b981", zinc: "#3f3f46", amber: "#f59e0b", blue: "#3b82f6" };
const getThemeColor = (color: string) => color.startsWith("#") ? color : colorMap[color] || colorMap.indigo;

export interface ChartDataPoint { label: string; value: number; }
export interface ChartBlockProps { data: ChartDataPoint[]; type?: ChartType; color?: ChartColor; height?: number; className?: string; valuePrefix?: string; valueSuffix?: string; showGrid?: boolean; showArea?: boolean; }

export function ChartBlock({ data, type = "bar", color = "indigo", height = 300, className, valuePrefix = "", valueSuffix = "", showGrid = true, showArea = true }: ChartBlockProps) {
  const themeColor = getThemeColor(color);

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <style>{\`@keyframes drawLine { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } } @keyframes growUp { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } } @keyframes fadeUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .animate-draw { animation: drawLine 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; } .animate-grow { animation: growUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; transform-origin: bottom; } .animate-fade { animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }\`}</style>
      {type === "bar" && <BarChart data={data} color={themeColor} prefix={valuePrefix} suffix={valueSuffix} showGrid={showGrid} />}
      {type === "line" && <SmoothLineChart data={data} color={themeColor} prefix={valuePrefix} suffix={valueSuffix} showGrid={showGrid} showArea={showArea} />}
      {(type === "pie" || type === "donut") && <CircularChart data={data} type={type} color={themeColor} prefix={valuePrefix} suffix={valueSuffix} />}
    </div>
  );
}

function BarChart({ data, color, prefix, suffix, showGrid }: { data: ChartDataPoint[], color: string, prefix: string, suffix: string, showGrid: boolean }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const gridLines = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="relative w-full h-full flex flex-col pt-6 animate-fade">
      <div className="absolute inset-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none z-0">
        {gridLines.map((ratio, i) => (
          <div key={i} className="flex items-center w-full relative">
            <span className="absolute -left-2 -translate-x-full text-[10px] font-medium text-zinc-400">{prefix}{Math.round(maxVal * ratio)}{suffix}</span>
            {showGrid && <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex-1 flex items-end justify-between gap-1 sm:gap-2 px-2 pb-8">
        {data.map((d, i) => (
          <div key={i} className="group relative flex flex-col items-center justify-end w-full h-full">
            <div className="absolute -top-12 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
              <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap">{d.label}: {prefix}{d.value}{suffix}</div>
              <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 -mt-1" />
            </div>
            <div className="w-full max-w-[48px] rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity animate-grow cursor-pointer" style={{ height: \`\${(d.value / maxVal) * 100}%\`, backgroundColor: color, animationDelay: \`\${i * 0.04}s\` }}><div className="w-full h-1.5 bg-white/30 rounded-t-md" /></div>
            <span className="absolute -bottom-6 text-[10px] font-medium text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmoothLineChart({ data, color, prefix, suffix, showGrid, showArea }: { data: ChartDataPoint[], color: string, prefix: string, suffix: string, showGrid: boolean, showArea: boolean }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const cleanColorId = color.replace("#", "");
  
  const points = data.map((d, i) => ({ x: (i / Math.max(data.length - 1, 1)) * 100, y: 100 - ((d.value / maxVal) * 100) }));
  const createSmoothPath = (pts: {x: number, y: number}[]) => {
    if (pts.length === 0) return ""; let d = \`M \${pts[0].x} \${pts[0].y}\`;
    for (let i = 1; i < pts.length; i++) { const cpX = (pts[i - 1].x + pts[i].x) / 2; d += \` C \${cpX} \${pts[i - 1].y}, \${cpX} \${pts[i].y}, \${pts[i].x} \${pts[i].y}\`; }
    return d;
  };
  const smoothPath = createSmoothPath(points);
  const areaPath = \`\${smoothPath} L 100 100 L 0 100 Z\`;

  return (
    <div className="relative w-full h-full pt-6 pb-8 pl-8 pr-2 animate-fade">
      <div className="absolute inset-0 top-6 bottom-8 left-8 right-2 flex flex-col justify-between pointer-events-none z-0">
        {[1, 0.5, 0].map((ratio, i) => (
          <div key={i} className="flex items-center w-full relative h-0">
            <span className="absolute -left-2 -translate-x-full text-[10px] font-medium text-zinc-400">{prefix}{Math.round(maxVal * ratio)}{suffix}</span>
            {showGrid && <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />}
          </div>
        ))}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 top-6 bottom-8 left-8 right-2 w-[calc(100%-40px)] h-[calc(100%-56px)] overflow-visible z-10">
        <defs>
          <linearGradient id={\`area-grad-\${cleanColorId}\`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {showArea && <path d={areaPath} fill={\`url(#area-grad-\${cleanColorId})\`} className="animate-fade" />}
        <path d={smoothPath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="100" className="animate-draw vector-non-scaling-stroke drop-shadow-sm" style={{ vectorEffect: "non-scaling-stroke" }} />
      </svg>
      <div className="absolute inset-0 top-6 bottom-8 left-8 right-2 z-20">
        {points.map((p, i) => (
          <div key={i} className="absolute top-0 bottom-0 cursor-crosshair group" style={{ left: \`\${p.x}%\`, width: \`\${100 / Math.max(points.length - 1, 1)}%\`, transform: 'translateX(-50%)' }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className={cn("absolute w-3 h-3 rounded-full bg-white dark:bg-black border-2 transition-all duration-200 pointer-events-none shadow-sm", hoveredIndex === i ? "scale-100 opacity-100" : "scale-50 opacity-0")} style={{ top: \`\${p.y}%\`, left: '50%', transform: 'translate(-50%, -50%)', borderColor: color }}>
              <div className={cn("absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-200", hoveredIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
                <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap">{data[i].label}: {prefix}{data[i].value}{suffix}</div>
                <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 -mt-1" />
              </div>
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-zinc-500 whitespace-nowrap">{data[i].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularChart({ data, type, color, prefix, suffix }: { data: ChartDataPoint[], type: "pie" | "donut", color: string, prefix: string, suffix: string }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = type === "pie" ? 25 : 40; const strokeWidth = type === "pie" ? 50 : 20; const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  
  const slices = data.map((d, i) => {
    const sliceRatio = d.value / (total || 1);
    const strokeDasharray = \`\${sliceRatio * circumference} \${circumference}\`;
    const strokeDashoffset = -currentOffset;
    currentOffset += sliceRatio * circumference;
    const midAngle = ((currentOffset - (sliceRatio * circumference) / 2) / circumference) * Math.PI * 2 - Math.PI / 2;
    const tooltipRadius = type === "pie" ? 30 : 40;
    const tx = 50 + tooltipRadius * Math.cos(midAngle); const ty = 50 + tooltipRadius * Math.sin(midAngle);
    return { ...d, strokeDasharray, strokeDashoffset, opacity: 1 - (i * 0.15), tx, ty };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center animate-fade">
      <div className="relative aspect-square h-full max-h-[300px]">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible -rotate-90">
          {slices.map((slice, i) => (
            <circle key={i} cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={slice.strokeDasharray} strokeDashoffset={slice.strokeDashoffset} className={cn("transition-all duration-300 cursor-crosshair", hoveredIndex !== null && hoveredIndex !== i ? "opacity-30" : "opacity-100")} style={{ opacity: slice.opacity }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} />
          ))}
          {type === "donut" && <circle cx="50" cy="50" r={radius - strokeWidth/2} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-200 dark:text-zinc-800 pointer-events-none" />}
        </svg>
        {hoveredIndex !== null && (
          <div className="absolute z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center" style={{ left: \`\${slices[hoveredIndex].tx}%\`, top: \`\${slices[hoveredIndex].ty}%\`, transform: 'translate(-50%, -50%)' }}>
            <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap text-center">
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{slices[hoveredIndex].label}</div>
              <div>{prefix}{slices[hoveredIndex].value}{suffix}</div>
            </div>
          </div>
        )}
        {type === "donut" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-zinc-500">Total</span><span className="text-xl font-black text-zinc-900 dark:text-white">{prefix}{total}{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE ---
const CHART_ENGINE_CODE_JS = `"use client";

import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const colorMap = { indigo: "#4f46e5", rose: "#e11d48", emerald: "#10b981", zinc: "#3f3f46", amber: "#f59e0b", blue: "#3b82f6" };
const getThemeColor = (color) => color.startsWith("#") ? color : colorMap[color] || colorMap.indigo;

export function ChartBlock({ data, type = "bar", color = "indigo", height = 300, className, valuePrefix = "", valueSuffix = "", showGrid = true, showArea = true }) {
  const themeColor = getThemeColor(color);

  return (
    <div className={cn("relative w-full", className)} style={{ height }}>
      <style>{\`@keyframes drawLine { from { stroke-dashoffset: 100; } to { stroke-dashoffset: 0; } } @keyframes growUp { from { transform: scaleY(0); opacity: 0; } to { transform: scaleY(1); opacity: 1; } } @keyframes fadeUp { from { transform: translateY(10px); opacity: 0; } to { transform: translateY(0); opacity: 1; } } .animate-draw { animation: drawLine 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; } .animate-grow { animation: growUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; transform-origin: bottom; } .animate-fade { animation: fadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }\`}</style>
      {type === "bar" && <BarChart data={data} color={themeColor} prefix={valuePrefix} suffix={valueSuffix} showGrid={showGrid} />}
      {type === "line" && <SmoothLineChart data={data} color={themeColor} prefix={valuePrefix} suffix={valueSuffix} showGrid={showGrid} showArea={showArea} />}
      {(type === "pie" || type === "donut") && <CircularChart data={data} type={type} color={themeColor} prefix={valuePrefix} suffix={valueSuffix} />}
    </div>
  );
}

function BarChart({ data, color, prefix, suffix, showGrid }) {
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const gridLines = [1, 0.75, 0.5, 0.25, 0];

  return (
    <div className="relative w-full h-full flex flex-col pt-6 animate-fade">
      <div className="absolute inset-0 top-6 bottom-8 flex flex-col justify-between pointer-events-none z-0">
        {gridLines.map((ratio, i) => (
          <div key={i} className="flex items-center w-full relative">
            <span className="absolute -left-2 -translate-x-full text-[10px] font-medium text-zinc-400">{prefix}{Math.round(maxVal * ratio)}{suffix}</span>
            {showGrid && <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex-1 flex items-end justify-between gap-1 sm:gap-2 px-2 pb-8">
        {data.map((d, i) => (
          <div key={i} className="group relative flex flex-col items-center justify-end w-full h-full">
            <div className="absolute -top-12 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none z-50 flex flex-col items-center">
              <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap">{d.label}: {prefix}{d.value}{suffix}</div>
              <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 -mt-1" />
            </div>
            <div className="w-full max-w-[48px] rounded-t-md opacity-90 group-hover:opacity-100 transition-opacity animate-grow cursor-pointer" style={{ height: \`\${(d.value / maxVal) * 100}%\`, backgroundColor: color, animationDelay: \`\${i * 0.04}s\` }}><div className="w-full h-1.5 bg-white/30 rounded-t-md" /></div>
            <span className="absolute -bottom-6 text-[10px] font-medium text-zinc-500 whitespace-nowrap overflow-hidden text-ellipsis max-w-full">{d.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SmoothLineChart({ data, color, prefix, suffix, showGrid, showArea }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const maxVal = Math.max(...data.map(d => d.value), 1);
  const cleanColorId = color.replace("#", "");
  
  const points = data.map((d, i) => ({ x: (i / Math.max(data.length - 1, 1)) * 100, y: 100 - ((d.value / maxVal) * 100) }));
  const createSmoothPath = (pts) => {
    if (pts.length === 0) return ""; let d = \`M \${pts[0].x} \${pts[0].y}\`;
    for (let i = 1; i < pts.length; i++) { const cpX = (pts[i - 1].x + pts[i].x) / 2; d += \` C \${cpX} \${pts[i - 1].y}, \${cpX} \${pts[i].y}, \${pts[i].x} \${pts[i].y}\`; }
    return d;
  };
  const smoothPath = createSmoothPath(points);
  const areaPath = \`\${smoothPath} L 100 100 L 0 100 Z\`;

  return (
    <div className="relative w-full h-full pt-6 pb-8 pl-8 pr-2 animate-fade">
      <div className="absolute inset-0 top-6 bottom-8 left-8 right-2 flex flex-col justify-between pointer-events-none z-0">
        {[1, 0.5, 0].map((ratio, i) => (
          <div key={i} className="flex items-center w-full relative h-0">
            <span className="absolute -left-2 -translate-x-full text-[10px] font-medium text-zinc-400">{prefix}{Math.round(maxVal * ratio)}{suffix}</span>
            {showGrid && <div className="w-full border-t border-dashed border-zinc-200 dark:border-zinc-800" />}
          </div>
        ))}
      </div>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 top-6 bottom-8 left-8 right-2 w-[calc(100%-40px)] h-[calc(100%-56px)] overflow-visible z-10">
        <defs>
          <linearGradient id={\`area-grad-\${cleanColorId}\`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>
        {showArea && <path d={areaPath} fill={\`url(#area-grad-\${cleanColorId})\`} className="animate-fade" />}
        <path d={smoothPath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="100" strokeDasharray="100" className="animate-draw vector-non-scaling-stroke drop-shadow-sm" style={{ vectorEffect: "non-scaling-stroke" }} />
      </svg>
      <div className="absolute inset-0 top-6 bottom-8 left-8 right-2 z-20">
        {points.map((p, i) => (
          <div key={i} className="absolute top-0 bottom-0 cursor-crosshair group" style={{ left: \`\${p.x}%\`, width: \`\${100 / Math.max(points.length - 1, 1)}%\`, transform: 'translateX(-50%)' }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
            <div className={cn("absolute w-3 h-3 rounded-full bg-white dark:bg-black border-2 transition-all duration-200 pointer-events-none shadow-sm", hoveredIndex === i ? "scale-100 opacity-100" : "scale-50 opacity-0")} style={{ top: \`\${p.y}%\`, left: '50%', transform: 'translate(-50%, -50%)', borderColor: color }}>
              <div className={cn("absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center transition-all duration-200", hoveredIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-95")}>
                <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap">{data[i].label}: {prefix}{data[i].value}{suffix}</div>
                <div className="w-2 h-2 bg-zinc-900 dark:bg-white rotate-45 -mt-1" />
              </div>
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-zinc-500 whitespace-nowrap">{data[i].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CircularChart({ data, type, color, prefix, suffix }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = type === "pie" ? 25 : 40; const strokeWidth = type === "pie" ? 50 : 20; const circumference = 2 * Math.PI * radius;
  let currentOffset = 0;
  
  const slices = data.map((d, i) => {
    const sliceRatio = d.value / (total || 1);
    const strokeDasharray = \`\${sliceRatio * circumference} \${circumference}\`;
    const strokeDashoffset = -currentOffset;
    currentOffset += sliceRatio * circumference;
    const midAngle = ((currentOffset - (sliceRatio * circumference) / 2) / circumference) * Math.PI * 2 - Math.PI / 2;
    const tooltipRadius = type === "pie" ? 30 : 40;
    const tx = 50 + tooltipRadius * Math.cos(midAngle); const ty = 50 + tooltipRadius * Math.sin(midAngle);
    return { ...d, strokeDasharray, strokeDashoffset, opacity: 1 - (i * 0.15), tx, ty };
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center animate-fade">
      <div className="relative aspect-square h-full max-h-[300px]">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible -rotate-90">
          {slices.map((slice, i) => (
            <circle key={i} cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth={strokeWidth} strokeDasharray={slice.strokeDasharray} strokeDashoffset={slice.strokeDashoffset} className={cn("transition-all duration-300 cursor-crosshair", hoveredIndex !== null && hoveredIndex !== i ? "opacity-30" : "opacity-100")} style={{ opacity: slice.opacity }} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)} />
          ))}
          {type === "donut" && <circle cx="50" cy="50" r={radius - strokeWidth/2} fill="none" stroke="currentColor" strokeWidth="0.5" className="text-zinc-200 dark:text-zinc-800 pointer-events-none" />}
        </svg>
        {hoveredIndex !== null && (
          <div className="absolute z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-200 flex flex-col items-center" style={{ left: \`\${slices[hoveredIndex].tx}%\`, top: \`\${slices[hoveredIndex].ty}%\`, transform: 'translate(-50%, -50%)' }}>
            <div className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-3 py-1.5 rounded-lg shadow-xl text-xs font-bold whitespace-nowrap text-center">
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">{slices[hoveredIndex].label}</div>
              <div>{prefix}{slices[hoveredIndex].value}{suffix}</div>
            </div>
          </div>
        )}
        {type === "donut" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs font-medium text-zinc-500">Total</span><span className="text-xl font-black text-zinc-900 dark:text-white">{prefix}{total}{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );
}`;

export function ChartShowcase() {
  const [type, setType] = useState<ChartType>("bar");
  const [showGrid, setShowGrid] = useState(true);
  const [showArea, setShowArea] = useState(true);

  // Initialize with localStorage if available
  const [color, setColor] = useState<ChartColor | string>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("primaryColor") || "indigo";
    }
    return "indigo";
  });

  // Automatically listen for updates to the primaryColor in localStorage
  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("primaryColor");
      if (stored && stored !== color) {
        setColor(stored);
      }
    }, 1000);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "primaryColor" && e.newValue) {
        setColor(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorage);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", handleStorage);
    };
  }, [color]);

  // Sync manual UI changes down to local storage
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    localStorage.setItem("primaryColor", newColor);
  };

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

  // We cut down the slices for pie/donut to avoid it looking too dense
  const activeData =
    type === "pie" || type === "donut" ? sampleData.slice(0, 5) : sampleData;

  const generateUsageCode = (isTs: boolean) => {
    let propsStr = `\n        data={data}\n        type="${type}"\n        color="${color}"`;
    if (!showGrid) propsStr += `\n        showGrid={false}`;
    if (!showArea && type === "line") propsStr += `\n        showArea={false}`;
    propsStr += `\n        valuePrefix="$"`;

    return `import { ChartBlock } from "@/components/custom/blocks/ChartBlock";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

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
      <ShowcaseControlPanel className="flex flex-col gap-6 p-5 rounded-xl z-0 relative">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Variant Selector */}
          <VariantTabs
            variants={["bar", "line", "pie", "donut"]}
            label="Chart Type"
            defaultValue={type}
            onValueChange={(v) => setType(v as ChartType)}
          />

          <ThemeColorPicker color={color} onChange={handleColorChange} label="Theme Color" />

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Features
            </label>
            <div className="flex flex-wrap items-center gap-2 h-10">
              <button
                onClick={() => setShowGrid(!showGrid)}
                disabled={type === "pie" || type === "donut"}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  showGrid
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Background Grid
              </button>
              <button
                onClick={() => setShowArea(!showArea)}
                disabled={type !== "line"}
                className={`px-4 py-2 text-sm font-bold rounded-lg border transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                  showArea
                    ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                    : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                }`}
              >
                Area Fill Fill
              </button>
            </div>
          </div>
        </div>
      </ShowcaseControlPanel>

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
            {/* The Key forces a total re-render when switching types so entrance animations re-trigger properly */}
            <ChartBlock
              key={`${type}-${color}-${showGrid}-${showArea}`}
              data={activeData}
              type={type}
              color={color}
              showGrid={showGrid}
              showArea={showArea}
              valuePrefix="$"
              height={300}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
