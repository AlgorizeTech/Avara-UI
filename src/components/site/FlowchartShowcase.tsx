"use client";

import {
  FlowCanvas,
  Flowchart,
  FlowColumn,
  FlowConnection,
  FlowNode,
} from "@/components/custom/blocks/FlowchartBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import {
  AlertCircle,
  CheckCircle2,
  Cpu,
  RefreshCw,
  Terminal,
  Webhook,
} from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const FLOW_ENGINE_CODE_TS = `"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface FlowchartContextType { activePath: string | null; setActivePath: (pathId: string | null) => void; color: string; }
const FlowchartContext = createContext<FlowchartContextType | null>(null);
export function useFlowchart() { const context = useContext(FlowchartContext); if (!context) throw new Error("Missing FlowchartContext"); return context; }

export interface FlowchartProps extends React.HTMLAttributes<HTMLDivElement> { initialActivePath?: string | null; color?: "blue" | "indigo" | "rose" | "emerald" | "zinc"; }
export const Flowchart = forwardRef<HTMLDivElement, FlowchartProps>(({ children, initialActivePath = null, color = "indigo", className, ...props }, ref) => {
  const [activePath, setActivePath] = useState<string | null>(initialActivePath);
  return (
    <FlowchartContext.Provider value={{ activePath, setActivePath, color }}>
      <div ref={ref} className={cn("relative w-full overflow-hidden bg-zinc-50 dark:bg-[#050505] p-6 md:p-12 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl select-none", className)} {...props}>
        <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />
        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">{children}</div>
      </div>
    </FlowchartContext.Provider>
  );
});
Flowchart.displayName = "Flowchart";

export const FlowColumn = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ children, className, ...props }, ref) => {
  return (<div ref={ref} className={cn("flex flex-row lg:flex-col items-center justify-center gap-6 md:gap-8 w-full lg:w-auto relative z-20", className)} {...props}>{children}</div>);
});
FlowColumn.displayName = "FlowColumn";

export interface FlowNodeProps extends React.HTMLAttributes<HTMLDivElement> { id: string; title: string; description?: string; icon?: React.ComponentType<any>; connectedPaths?: string[]; }
export const FlowNode = forwardRef<HTMLDivElement, FlowNodeProps>(({ id, title, description, icon: Icon, connectedPaths = [], className, ...props }, ref) => {
  const { activePath, setActivePath, color } = useFlowchart(); const nodeRef = useRef<HTMLDivElement>(null);
  React.useImperativeHandle(ref, () => nodeRef.current as HTMLDivElement);
  const isHighlighted = connectedPaths.includes(activePath || "");

  useEffect(() => { if (nodeRef.current) gsap.fromTo(nodeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }); }, []);

  const borderColors: Record<string, string> = { indigo: "border-indigo-500/80 shadow-indigo-500/10", blue: "border-blue-500/80 shadow-blue-500/10", rose: "border-rose-500/80 shadow-rose-500/10", emerald: "border-emerald-500/80 shadow-emerald-500/10", zinc: "border-zinc-900 dark:border-zinc-100 shadow-zinc-500/5" };

  return (
    <div ref={nodeRef} onClick={() => connectedPaths.length > 0 && setActivePath(connectedPaths[0])} className={cn("w-full max-w-[240px] p-4 rounded-xl border bg-white dark:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-sm text-left opacity-0", isHighlighted ? cn("scale-[1.03] border-2 shadow-md z-30", borderColors[color] || borderColors.indigo) : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-[1.01]", className)} {...props}>
      <div className="flex items-center gap-3">
        {Icon && <div className={cn("p-2 rounded-lg flex-shrink-0 border", isHighlighted ? "bg-zinc-50 dark:bg-zinc-800 border-transparent text-zinc-900 dark:text-zinc-50" : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200/50 dark:border-zinc-800 text-zinc-500")}><Icon className="w-4 h-4" /></div>}
        <div className="min-w-0 flex-1"><h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{title}</h4>{description && <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{description}</p>}</div>
      </div>
    </div>
  );
});
FlowNode.displayName = "FlowNode";

export const FlowCanvas = forwardRef<SVGSVGElement, React.SVGAttributes<SVGSVGElement>>(({ children, className, ...props }, ref) => {
  return (<svg ref={ref} className={cn("absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block", className)} style={{ overflow: "visible" }} {...props}>{children}</svg>);
});
FlowCanvas.displayName = "FlowCanvas";

export interface FlowConnectionProps extends React.SVGAttributes<SVGPathElement> { id: string; path: string; }
export const FlowConnection = forwardRef<SVGPathElement, FlowConnectionProps>(({ id, path, className, ...props }, ref) => {
  const { activePath, color } = useFlowchart(); const lineRef = useRef<SVGPathElement>(null);
  React.useImperativeHandle(ref, () => lineRef.current as SVGPathElement); const isActive = activePath === id;

  useEffect(() => { if (lineRef.current) { const length = lineRef.current.getTotalLength(); gsap.fromTo(lineRef.current, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", delay: 0.2 }); } }, []);

  const strokeColors: Record<string, string> = { indigo: "#6366f1", blue: "#3b82f6", rose: "#f43f5e", emerald: "#10b981", zinc: "#18181b" };
  const activeStroke = strokeColors[color] || strokeColors.indigo;

  return (
    <>
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800/80 transition-colors duration-300" {...props} />
      <path ref={lineRef} d={path} fill="none" stroke={isActive ? activeStroke : "transparent"} strokeWidth="2.5" strokeDasharray={isActive ? "6, 4" : undefined} className={cn(isActive && "animate-[dash_30s_linear_infinite]")} style={{ animationDuration: "1.5s" }} />
      <style>{\`@keyframes dash { to { stroke-dashoffset: -20; } }\`}</style>
    </>
  );
});
FlowConnection.displayName = "FlowConnection";`;

// --- PURE JAVASCRIPT ENGINE CODE ---
const FLOW_ENGINE_CODE_JS = `"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext, useEffect, useRef, useState } from "react";
import gsap from "gsap";

const FlowchartContext = createContext(null);
export function useFlowchart() { const context = useContext(FlowchartContext); if (!context) throw new Error("Missing FlowchartContext"); return context; }

export const Flowchart = forwardRef(({ children, initialActivePath = null, color = "indigo", className, ...props }, ref) => {
  const [activePath, setActivePath] = useState(initialActivePath);
  return (
    <FlowchartContext.Provider value={{ activePath, setActivePath, color }}>
      <div ref={ref} className={cn("relative w-full overflow-hidden bg-zinc-50 dark:bg-[#050505] p-6 md:p-12 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl select-none", className)} {...props}>
        <div className="absolute inset-0 bg-[radial-gradient(#80808020_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none z-0" />
        <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">{children}</div>
      </div>
    </FlowchartContext.Provider>
  );
});
Flowchart.displayName = "Flowchart";

export const FlowColumn = forwardRef(({ children, className, ...props }, ref) => {
  return (<div ref={ref} className={cn("flex flex-row lg:flex-col items-center justify-center gap-6 md:gap-8 w-full lg:w-auto relative z-20", className)} {...props}>{children}</div>);
});
FlowColumn.displayName = "FlowColumn";

export const FlowNode = forwardRef(({ id, title, description, icon: Icon, connectedPaths = [], className, ...props }, ref) => {
  const { activePath, setActivePath, color } = useFlowchart(); const nodeRef = useRef(null);
  React.useImperativeHandle(ref, () => nodeRef.current); const isHighlighted = connectedPaths.includes(activePath || "");

  useEffect(() => { if (nodeRef.current) gsap.fromTo(nodeRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.4)" }); }, []);

  const borderColors = { indigo: "border-indigo-500/80 shadow-indigo-500/10", blue: "border-blue-500/80 shadow-blue-500/10", rose: "border-rose-500/80 shadow-rose-500/10", emerald: "border-emerald-500/80 shadow-emerald-500/10", zinc: "border-zinc-900 dark:border-zinc-100 shadow-zinc-500/5" };

  return (
    <div ref={nodeRef} onClick={() => connectedPaths.length > 0 && setActivePath(connectedPaths[0])} className={cn("w-full max-w-[240px] p-4 rounded-xl border bg-white dark:bg-zinc-900 transition-all duration-300 cursor-pointer shadow-sm text-left opacity-0", isHighlighted ? cn("scale-[1.03] border-2 shadow-md z-30", borderColors[color] || borderColors.indigo) : "border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:scale-[1.01]", className)} {...props}>
      <div className="flex items-center gap-3">
        {Icon && <div className={cn("p-2 rounded-lg flex-shrink-0 border", isHighlighted ? "bg-zinc-50 dark:bg-zinc-800 border-transparent text-zinc-900 dark:text-zinc-50" : "bg-zinc-50 dark:bg-zinc-950 border-zinc-200/50 dark:border-zinc-800 text-zinc-500")}><Icon className="w-4 h-4" /></div>}
        <div className="min-w-0 flex-1"><h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">{title}</h4>{description && <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{description}</p>}</div>
      </div>
    </div>
  );
});
FlowNode.displayName = "FlowNode";

export const FlowCanvas = forwardRef(({ children, className, ...props }, ref) => {
  return (<svg ref={ref} className={cn("absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block", className)} style={{ overflow: "visible" }} {...props}>{children}</svg>);
});
FlowCanvas.displayName = "FlowCanvas";

export const FlowConnection = forwardRef(({ id, path, className, ...props }, ref) => {
  const { activePath, color } = useFlowchart(); const lineRef = useRef(null);
  React.useImperativeHandle(ref, () => lineRef.current); const isActive = activePath === id;

  useEffect(() => { if (lineRef.current) { const length = lineRef.current.getTotalLength(); gsap.fromTo(lineRef.current, { strokeDasharray: length, strokeDashoffset: length }, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out", delay: 0.2 }); } }, []);

  const strokeColors = { indigo: "#6366f1", blue: "#3b82f6", rose: "#f43f5e", emerald: "#10b981", zinc: "#18181b" };
  const activeStroke = strokeColors[color] || strokeColors.indigo;

  return (
    <>
      <path d={path} fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-200 dark:text-zinc-800/80 transition-colors duration-300" {...props} />
      <path ref={lineRef} d={path} fill="none" stroke={isActive ? activeStroke : "transparent"} strokeWidth="2.5" strokeDasharray={isActive ? "6, 4" : undefined} className={cn(isActive && "animate-[dash_30s_linear_infinite]")} style={{ animationDuration: "1.5s" }} />
      <style>{\`@keyframes dash { to { stroke-dashoffset: -20; } }\`}</style>
    </>
  );
});
FlowConnection.displayName = "FlowConnection";`;

export function FlowchartShowcase() {
  const [color, setColor] = useState<
    "blue" | "indigo" | "rose" | "emerald" | "zinc"
  >("indigo");
  const [key, setKey] = useState(0);

  const generateUsageCode = (isTs: boolean) => {
    return `import { Flowchart, FlowColumn, FlowNode, FlowCanvas, FlowConnection } from "@/components/custom/blocks/FlowchartBlock";
import { Webhook, Cpu, CheckCircle2, AlertCircle } from "lucide-react";

export default function PipelineDemo() {
  return (
    <Flowchart initialActivePath="success-path" color="${color}">
      
      {/* Column 1: Source Triggers */}
      <FlowColumn>
        <FlowNode 
          id="webhook" 
          title="Webhook Trigger" 
          description="Inbound secure POST" 
          icon={Webhook} 
          connectedPaths={["success-path", "fail-path"]} 
        />
      </FlowColumn>

      {/* Column 2: Compute Processing */}
      <FlowColumn>
        <FlowNode 
          id="transform" 
          title="Transform payload" 
          description="Normalizing JSON data" 
          icon={Cpu} 
          connectedPaths={["success-path"]} 
        />
        <FlowNode 
          id="error" 
          title="Validation Check" 
          description="Checking metadata schema" 
          icon={Terminal} 
          connectedPaths={["fail-path"]} 
        />
      </FlowColumn>

      {/* Column 3: Storage Outcomes */}
      <FlowColumn>
        <FlowNode 
          id="success" 
          title="Sync Database" 
          description="Committed to cluster" 
          icon={CheckCircle2} 
          connectedPaths={["success-path"]} 
        />
        <FlowNode 
          id="fail" 
          title="Dead Letter Queue" 
          description="Retrying delivery pool" 
          icon={AlertCircle} 
          connectedPaths={["fail-path"]} 
        />
      </FlowColumn>

      {/* Connection Layer - Uses pre-mapped coordinate strings */}
      <FlowCanvas>
        <FlowConnection id="success-path" path="M 235,115 C 335,115 335,115 435,115" />
        <FlowConnection id="success-path" path="M 675,115 C 775,115 775,115 875,115" />
        
        <FlowConnection id="fail-path" path="M 235,115 C 335,115 335,265 435,265" />
        <FlowConnection id="fail-path" path="M 675,265 C 775,265 775,265 875,265" />
      </FlowCanvas>

    </Flowchart>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col gap-6 p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl z-0 relative">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
              Active Connection Theme
            </label>
            <div className="flex flex-wrap bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-full md:w-max border border-zinc-200 dark:border-white/5">
              {(["indigo", "blue", "rose", "emerald", "zinc"] as const).map(
                (c) => (
                  <button
                    key={c}
                    onClick={() => setColor(c)}
                    className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                      color === c
                        ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                    }`}
                  >
                    {c}
                  </button>
                ),
              )}
            </div>
          </div>

          <button
            onClick={() => setKey((prev) => prev + 1)}
            className="px-4 py-2 text-sm font-bold rounded-lg border bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex items-center justify-center w-full sm:w-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Replay Canvas Entry
          </button>
        </div>
      </div>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="FlowchartBlock"
        tsCode={FLOW_ENGINE_CODE_TS}
        jsCode={FLOW_ENGINE_CODE_JS}
        usageCode={generateUsageCode(true)}
        jsUsageCode={generateUsageCode(false)}
      >
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl bg-white dark:bg-[#09090b] overflow-hidden p-4 sm:p-8">
          <Flowchart key={key} initialActivePath="success-path" color={color}>
            {/* Column 1: Source */}
            <FlowColumn>
              <FlowNode
                id="webhook"
                title="Webhook Trigger"
                description="Inbound secure POST"
                icon={Webhook}
                connectedPaths={["success-path", "fail-path"]}
              />
            </FlowColumn>

            {/* Column 2: Processors */}
            <FlowColumn>
              <FlowNode
                id="transform"
                title="Transform Payload"
                description="Normalizing JSON data"
                icon={Cpu}
                connectedPaths={["success-path"]}
              />
              <FlowNode
                id="error"
                title="Validation Check"
                description="Checking metadata schema"
                icon={Terminal}
                connectedPaths={["fail-path"]}
              />
            </FlowColumn>

            {/* Column 3: Outcomes */}
            <FlowColumn>
              <FlowNode
                id="success"
                title="Sync Database"
                description="Committed to cluster"
                icon={CheckCircle2}
                connectedPaths={["success-path"]}
              />
              <FlowNode
                id="fail"
                title="Dead Letter Queue"
                description="Retrying delivery pool"
                icon={AlertCircle}
                connectedPaths={["fail-path"]}
              />
            </FlowColumn>

            {/* Canvas overlay connection layers */}
            <FlowCanvas>
              {/* Top Row horizontal line path */}
              <FlowConnection
                id="success-path"
                path="M 235,115 C 335,115 335,115 435,115"
              />
              <FlowConnection
                id="success-path"
                path="M 675,115 C 775,115 775,115 875,115"
              />

              {/* Bottom branching loop line paths */}
              <FlowConnection
                id="fail-path"
                path="M 235,115 C 335,115 335,265 435,265"
              />
              <FlowConnection
                id="fail-path"
                path="M 675,265 C 775,265 775,265 875,265"
              />
            </FlowCanvas>
          </Flowchart>
        </div>
      </ComponentPreview>
    </div>
  );
}
