"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/custom/blocks/ResizableBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";

// --- TYPESCRIPT ENGINE CODE ---
const RESIZABLE_ENGINE_CODE_TS = `"use client";

import React, { createContext, useContext, useRef } from "react";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

interface ResizableContextType { direction: "horizontal" | "vertical"; }
const ResizableContext = createContext<ResizableContextType | null>(null);

function useResizable() {
  const context = useContext(ResizableContext);
  if (!context) throw new Error("Must be used within a ResizablePanelGroup");
  return context;
}

export interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> { direction?: "horizontal" | "vertical"; }

export function ResizablePanelGroup({ direction = "horizontal", className, children, ...props }: ResizablePanelGroupProps) {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <div className={cn("flex h-full w-full overflow-hidden", direction === "horizontal" ? "flex-row" : "flex-col", className)} {...props}>
        {children}
      </div>
    </ResizableContext.Provider>
  );
}

export interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> { defaultSize?: number; minSize?: number; maxSize?: number; }

export function ResizablePanel({ defaultSize = 50, minSize = 0, maxSize = 100, className, children, ...props }: ResizablePanelProps) {
  return (
    <div
      className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}
      style={{ flex: \`\${defaultSize} \${defaultSize} 0%\` }}
      data-panel data-flex-size={defaultSize} data-min-size={minSize} data-max-size={maxSize}
      {...props}
    >
      {children}
    </div>
  );
}

export interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> { withHandle?: boolean; }

export function ResizableHandle({ withHandle = false, className, ...props }: ResizableHandleProps) {
  const { direction } = useResizable();
  const isHorizontal = direction === "horizontal";
  const handleRef = useRef<HTMLDivElement>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const handle = handleRef.current;
    if (!handle) return;

    const prev = handle.previousElementSibling as HTMLElement;
    const next = handle.nextElementSibling as HTMLElement;
    if (!prev || !next || !prev.hasAttribute("data-panel") || !next.hasAttribute("data-panel")) return;

    const startPos = isHorizontal ? e.clientX : e.clientY;
    const prevStartFlex = parseFloat(prev.getAttribute("data-flex-size") || "50");
    const nextStartFlex = parseFloat(next.getAttribute("data-flex-size") || "50");
    const totalFlex = prevStartFlex + nextStartFlex;

    const prevRect = prev.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    const totalPixels = isHorizontal ? prevRect.width + nextRect.width : prevRect.height + nextRect.height;

    const prevMin = parseFloat(prev.getAttribute("data-min-size") || "0");
    const prevMax = parseFloat(prev.getAttribute("data-max-size") || "100");
    const nextMin = parseFloat(next.getAttribute("data-min-size") || "0");
    const nextMax = parseFloat(next.getAttribute("data-max-size") || "100");

    document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";

    const onPointerMove = (moveEvent: PointerEvent) => {
      const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
      const deltaPixels = currentPos - startPos;
      const deltaPercentage = (deltaPixels / totalPixels) * totalFlex;

      let newPrevFlex = prevStartFlex + deltaPercentage;
      let newNextFlex = nextStartFlex - deltaPercentage;

      newPrevFlex = Math.max(prevMin, Math.min(newPrevFlex, prevMax));
      newPrevFlex = Math.max(newPrevFlex, totalFlex - nextMax);
      newPrevFlex = Math.min(newPrevFlex, totalFlex - nextMin);
      newNextFlex = totalFlex - newPrevFlex;

      prev.style.flex = \`\${newPrevFlex} \${newPrevFlex} 0%\`;
      prev.setAttribute("data-flex-size", newPrevFlex.toString());
      next.style.flex = \`\${newNextFlex} \${newNextFlex} 0%\`;
      next.setAttribute("data-flex-size", newNextFlex.toString());
    };

    const onPointerUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const handle = handleRef.current;
    if (!handle) return;
    const prev = handle.previousElementSibling as HTMLElement;
    const next = handle.nextElementSibling as HTMLElement;
    if (!prev || !next) return;

    let delta = 0;
    const step = 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") delta = -step;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") delta = step;
    
    if (delta !== 0) {
      e.preventDefault();
      const prevStartFlex = parseFloat(prev.getAttribute("data-flex-size") || "50");
      const nextStartFlex = parseFloat(next.getAttribute("data-flex-size") || "50");
      const totalFlex = prevStartFlex + nextStartFlex;

      const prevMin = parseFloat(prev.getAttribute("data-min-size") || "0");
      const prevMax = parseFloat(prev.getAttribute("data-max-size") || "100");
      const nextMin = parseFloat(next.getAttribute("data-min-size") || "0");
      const nextMax = parseFloat(next.getAttribute("data-max-size") || "100");

      let newPrevFlex = prevStartFlex + delta;
      newPrevFlex = Math.max(prevMin, Math.min(newPrevFlex, prevMax));
      newPrevFlex = Math.max(newPrevFlex, totalFlex - nextMax);
      newPrevFlex = Math.min(newPrevFlex, totalFlex - nextMin);
      const newNextFlex = totalFlex - newPrevFlex;

      prev.style.flex = \`\${newPrevFlex} \${newPrevFlex} 0%\`;
      prev.setAttribute("data-flex-size", newPrevFlex.toString());
      next.style.flex = \`\${newNextFlex} \${newNextFlex} 0%\`;
      next.setAttribute("data-flex-size", newNextFlex.toString());
    }
  };

  return (
    <div ref={handleRef} role="separator" tabIndex={0} aria-orientation={direction} onPointerDown={handlePointerDown} onKeyDown={handleKeyDown} className={cn("relative flex shrink-0 items-center justify-center bg-zinc-200 dark:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500", isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize", className)} {...props}>
      <div className={cn("absolute z-10", isHorizontal ? "inset-y-0 -inset-x-2" : "inset-x-0 -inset-y-2")} />
      {withHandle && (
        <div className={cn("z-20 flex items-center justify-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm", isHorizontal ? "h-6 w-3" : "h-3 w-6")}>
          {isHorizontal ? <GripVertical className="h-2.5 w-2.5 text-zinc-500" /> : <GripHorizontal className="h-2.5 w-2.5 text-zinc-500" />}
        </div>
      )}
    </div>
  );
}`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const RESIZABLE_ENGINE_CODE_JS = `"use client";

import React, { createContext, useContext, useRef } from "react";
import { cn } from "@/lib/utils";
import { GripVertical, GripHorizontal } from "lucide-react";

const ResizableContext = createContext(null);

function useResizable() {
  const context = useContext(ResizableContext);
  if (!context) throw new Error("Must be used within a ResizablePanelGroup");
  return context;
}

export function ResizablePanelGroup({ direction = "horizontal", className, children, ...props }) {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <div className={cn("flex h-full w-full overflow-hidden", direction === "horizontal" ? "flex-row" : "flex-col", className)} {...props}>
        {children}
      </div>
    </ResizableContext.Provider>
  );
}

export function ResizablePanel({ defaultSize = 50, minSize = 0, maxSize = 100, className, children, ...props }) {
  return (
    <div
      className={cn("relative flex h-full w-full flex-col overflow-hidden", className)}
      style={{ flex: \`\${defaultSize} \${defaultSize} 0%\` }}
      data-panel data-flex-size={defaultSize} data-min-size={minSize} data-max-size={maxSize}
      {...props}
    >
      {children}
    </div>
  );
}

export function ResizableHandle({ withHandle = false, className, ...props }) {
  const { direction } = useResizable();
  const isHorizontal = direction === "horizontal";
  const handleRef = useRef(null);

  const handlePointerDown = (e) => {
    e.preventDefault();
    const handle = handleRef.current;
    if (!handle) return;

    const prev = handle.previousElementSibling;
    const next = handle.nextElementSibling;
    if (!prev || !next || !prev.hasAttribute("data-panel") || !next.hasAttribute("data-panel")) return;

    const startPos = isHorizontal ? e.clientX : e.clientY;
    const prevStartFlex = parseFloat(prev.getAttribute("data-flex-size") || "50");
    const nextStartFlex = parseFloat(next.getAttribute("data-flex-size") || "50");
    const totalFlex = prevStartFlex + nextStartFlex;

    const prevRect = prev.getBoundingClientRect();
    const nextRect = next.getBoundingClientRect();
    const totalPixels = isHorizontal ? prevRect.width + nextRect.width : prevRect.height + nextRect.height;

    const prevMin = parseFloat(prev.getAttribute("data-min-size") || "0");
    const prevMax = parseFloat(prev.getAttribute("data-max-size") || "100");
    const nextMin = parseFloat(next.getAttribute("data-min-size") || "0");
    const nextMax = parseFloat(next.getAttribute("data-max-size") || "100");

    document.body.style.cursor = isHorizontal ? "col-resize" : "row-resize";
    document.body.style.userSelect = "none";

    const onPointerMove = (moveEvent) => {
      const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY;
      const deltaPixels = currentPos - startPos;
      const deltaPercentage = (deltaPixels / totalPixels) * totalFlex;

      let newPrevFlex = prevStartFlex + deltaPercentage;
      let newNextFlex = nextStartFlex - deltaPercentage;

      newPrevFlex = Math.max(prevMin, Math.min(newPrevFlex, prevMax));
      newPrevFlex = Math.max(newPrevFlex, totalFlex - nextMax);
      newPrevFlex = Math.min(newPrevFlex, totalFlex - nextMin);
      newNextFlex = totalFlex - newPrevFlex;

      prev.style.flex = \`\${newPrevFlex} \${newPrevFlex} 0%\`;
      prev.setAttribute("data-flex-size", newPrevFlex.toString());
      next.style.flex = \`\${newNextFlex} \${newNextFlex} 0%\`;
      next.setAttribute("data-flex-size", newNextFlex.toString());
    };

    const onPointerUp = () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const handleKeyDown = (e) => {
    const handle = handleRef.current;
    if (!handle) return;
    const prev = handle.previousElementSibling;
    const next = handle.nextElementSibling;
    if (!prev || !next) return;

    let delta = 0;
    const step = 5;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") delta = -step;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") delta = step;
    
    if (delta !== 0) {
      e.preventDefault();
      const prevStartFlex = parseFloat(prev.getAttribute("data-flex-size") || "50");
      const nextStartFlex = parseFloat(next.getAttribute("data-flex-size") || "50");
      const totalFlex = prevStartFlex + nextStartFlex;

      const prevMin = parseFloat(prev.getAttribute("data-min-size") || "0");
      const prevMax = parseFloat(prev.getAttribute("data-max-size") || "100");
      const nextMin = parseFloat(next.getAttribute("data-min-size") || "0");
      const nextMax = parseFloat(next.getAttribute("data-max-size") || "100");

      let newPrevFlex = prevStartFlex + delta;
      newPrevFlex = Math.max(prevMin, Math.min(newPrevFlex, prevMax));
      newPrevFlex = Math.max(newPrevFlex, totalFlex - nextMax);
      newPrevFlex = Math.min(newPrevFlex, totalFlex - nextMin);
      const newNextFlex = totalFlex - newPrevFlex;

      prev.style.flex = \`\${newPrevFlex} \${newPrevFlex} 0%\`;
      prev.setAttribute("data-flex-size", newPrevFlex.toString());
      next.style.flex = \`\${newNextFlex} \${newNextFlex} 0%\`;
      next.setAttribute("data-flex-size", newNextFlex.toString());
    }
  };

  return (
    <div ref={handleRef} role="separator" tabIndex={0} aria-orientation={direction} onPointerDown={handlePointerDown} onKeyDown={handleKeyDown} className={cn("relative flex shrink-0 items-center justify-center bg-zinc-200 dark:bg-zinc-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500", isHorizontal ? "w-1 cursor-col-resize" : "h-1 cursor-row-resize", className)} {...props}>
      <div className={cn("absolute z-10", isHorizontal ? "inset-y-0 -inset-x-2" : "inset-x-0 -inset-y-2")} />
      {withHandle && (
        <div className={cn("z-20 flex items-center justify-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm", isHorizontal ? "h-6 w-3" : "h-3 w-6")}>
          {isHorizontal ? <GripVertical className="h-2.5 w-2.5 text-zinc-500" /> : <GripHorizontal className="h-2.5 w-2.5 text-zinc-500" />}
        </div>
      )}
    </div>
  );
}`;

export function ResizableShowcase() {
  const generateUsageCode = () => {
    return `import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/custom/blocks/ResizableBlock";

export default function IDE_Layout() {
  return (
    <div className="h-screen w-full">
      <ResizablePanelGroup direction="horizontal">
        
        {/* Left Sidebar */}
        <ResizablePanel defaultSize={20} minSize={10} maxSize={30}>
          <div>Explorer</div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Main Editor Area */}
        <ResizablePanel defaultSize={80}>
          
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={70}>
              <div>Code Editor</div>
            </ResizablePanel>
            
            <ResizableHandle withHandle />
            
            <ResizablePanel defaultSize={30} minSize={10}>
              <div>Terminal</div>
            </ResizablePanel>
          </ResizablePanelGroup>

        </ResizablePanel>

      </ResizablePanelGroup>
    </div>
  );
}`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      <ComponentPreview
        name="ResizableBlock"
        tsCode={RESIZABLE_ENGINE_CODE_TS}
        jsCode={RESIZABLE_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        sandbox="resizable"
      >
        <div className="w-full flex items-center justify-center min-h-[500px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#050505] p-6 sm:p-12 relative z-10">
          {/* Simulated Application UI */}
          <div className="w-full h-[400px] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-zinc-950 flex flex-col">
            {/* Fake Header */}
            <div className="h-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 px-4 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
              </div>
              <span className="text-xs font-medium text-zinc-500 ml-4">
                Nexus Studio
              </span>
            </div>

            {/* Resizable Layout Engine */}
            <div className="flex-1 overflow-hidden">
              <ResizablePanelGroup direction="horizontal">
                {/* 1. Sidebar Panel */}
                <ResizablePanel
                  defaultSize={20}
                  minSize={15}
                  maxSize={40}
                  className="bg-zinc-50 dark:bg-zinc-900/30"
                >
                  <div className="p-4 flex flex-col h-full">
                    <div className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-4">
                      Explorer
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="w-full h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      <div className="w-3/4 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                      <div className="w-5/6 h-4 bg-zinc-200 dark:bg-zinc-800 rounded" />
                    </div>
                  </div>
                </ResizablePanel>

                <ResizableHandle withHandle />

                {/* 2. Main Area Panel */}
                <ResizablePanel defaultSize={80}>
                  {/* Nested Vertical Group */}
                  <ResizablePanelGroup direction="vertical">
                    {/* 2A. Editor Panel */}
                    <ResizablePanel defaultSize={75} minSize={30}>
                      <div className="p-4 flex flex-col h-full bg-white dark:bg-zinc-950">
                        <div className="text-xs font-bold text-zinc-500 mb-4 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                          page.tsx
                        </div>
                        <div className="space-y-3 font-mono text-xs opacity-50 flex-1">
                          <div className="text-indigo-500">
                            export default function Page() {"{"}
                          </div>
                          <div className="pl-4">return (</div>
                          <div className="pl-8 text-emerald-500">
                            &lt;div className=&quot;flex&quot;&gt;
                          </div>
                          <div className="pl-12">
                            {"{/* Drag the handles to resize */}"}
                          </div>
                          <div className="pl-8 text-emerald-500">
                            &lt;/div&gt;
                          </div>
                          <div className="pl-4">);</div>
                          <div className="text-indigo-500">{"}"}</div>
                        </div>
                      </div>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    {/* 2B. Terminal Panel */}
                    <ResizablePanel defaultSize={25} minSize={15}>
                      <div className="p-4 flex flex-col h-full bg-zinc-900 dark:bg-black text-white">
                        <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                          Terminal
                        </div>
                        <div className="font-mono text-xs text-zinc-300">
                          <span className="text-emerald-400">
                            nexus@admin:~$
                          </span>{" "}
                          npm run dev
                          <br />
                          <span className="text-zinc-500">Ready in 1250ms</span>
                        </div>
                      </div>
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
