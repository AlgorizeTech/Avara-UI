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
    <div ref={handleRef} role="separator" tabIndex={0} aria-orientation={direction} onPointerDown={handlePointerDown} onKeyDown={handleKeyDown} className={cn("relative flex shrink-0 items-center justify-center bg-border/80 hover:bg-primary/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary", isHorizontal ? "w-1.5 cursor-col-resize" : "h-1.5 cursor-row-resize", className)} {...props}>
      <div className={cn("absolute z-10", isHorizontal ? "inset-y-0 -inset-x-3" : "inset-x-0 -inset-y-3")} />
      {withHandle && (
        <div className={cn("z-20 flex items-center justify-center rounded-md border border-border bg-card shadow-xs text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors", isHorizontal ? "h-6 w-3.5" : "h-3.5 w-6")}>
          {isHorizontal ? <GripVertical className="h-3 w-3" /> : <GripHorizontal className="h-3 w-3" />}
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
        <div className="w-full flex items-center justify-center transition-colors duration-300 rounded-2xl overflow-hidden relative">
          {/* Simulated Application UI */}
          <div className="w-full h-[360px] sm:h-[420px] border border-border rounded-xl overflow-hidden shadow-xs bg-background flex flex-col">
            {/* Fake Header */}
            <div className="h-9 sm:h-10 border-b border-border/80 bg-muted/50 px-3 sm:px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[11px] sm:text-xs font-bold text-foreground ml-2">
                  Nexus Studio
                </span>
              </div>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                Resizable Layout
              </span>
            </div>

            {/* Resizable Layout Engine: Responsive Direction (Vertical/Row Stack for Small Screens) */}
            <div className="flex-1 overflow-hidden">
              {/* Mobile View */}
              <div className="block md:hidden h-full">
                <ResizablePanelGroup direction="vertical">
                  <ResizablePanel defaultSize={25} minSize={15} className="bg-muted/30">
                    <div className="p-2.5 flex flex-col h-full">
                      <div className="text-[10px] font-extrabold uppercase tracking-wider text-primary mb-1">
                        Explorer
                      </div>
                      <div className="space-y-1 flex-1">
                        <div className="w-full h-2.5 bg-muted rounded" />
                        <div className="w-3/4 h-2.5 bg-muted rounded" />
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  <ResizablePanel defaultSize={75}>
                    <div className="p-3 flex flex-col h-full bg-background font-mono text-[11px] overflow-y-auto">
                      <div className="text-foreground font-bold mb-2 border-b border-border/50 pb-1 flex items-center justify-between shrink-0">
                        <span>page.tsx</span>
                        <span className="text-[10px] text-primary font-mono bg-primary/10 px-1 py-0.5 rounded">Active</span>
                      </div>
                      <div className="space-y-1 font-mono text-[11px] flex-1">
                        <div>
                          <span className="text-[#d73a49] dark:text-[#f97583] font-semibold">export default function</span>{" "}
                          <span className="text-[#6f42c1] dark:text-[#b392f0] font-bold">Page</span>() {"{"}
                        </div>
                        <div className="pl-2 font-semibold text-[#d73a49] dark:text-[#f97583]">return (</div>
                        <div className="pl-4">
                          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;div</span>{" "}
                          <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                          <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;flex h-full w-full flex-col p-4&quot;</span>
                          <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                        </div>
                        <div className="pl-6">
                          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;h2</span>{" "}
                          <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                          <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;text-xl font-bold&quot;</span>
                          <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                          <span className="text-foreground font-bold">Shuvo Sarkar</span>
                          <span className="text-[#22863a] dark:text-[#85e89d]">&lt;/h2&gt;</span>
                        </div>
                        <div className="pl-6 text-[#6a737d] dark:text-[#6a737d] italic text-[10px]">
                          {"{/* Drag handle bars to resize panels live */}"}
                        </div>
                        <div className="pl-4 text-[#22863a] dark:text-[#85e89d]">&lt;/div&gt;</div>
                        <div className="pl-2 font-semibold text-[#d73a49] dark:text-[#f97583]">);</div>
                        <div>{"}"}</div>
                      </div>
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block h-full">
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel
                    defaultSize={22}
                    minSize={15}
                    maxSize={40}
                    className="bg-muted/30"
                  >
                    <div className="p-4 flex flex-col h-full">
                      <div className="text-xs font-extrabold uppercase tracking-wider text-primary mb-4">
                        Explorer
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="w-full h-4 bg-muted rounded" />
                        <div className="w-3/4 h-4 bg-muted rounded" />
                        <div className="w-5/6 h-4 bg-muted rounded" />
                      </div>
                    </div>
                  </ResizablePanel>

                  <ResizableHandle withHandle />

                  <ResizablePanel defaultSize={78}>
                    <ResizablePanelGroup direction="vertical">
                      <ResizablePanel defaultSize={70} minSize={30}>
                        <div className="p-4 flex flex-col h-full bg-background overflow-y-auto">
                          <div className="text-xs font-bold text-foreground mb-4 border-b border-border/60 pb-2 flex items-center justify-between shrink-0">
                            <span>page.tsx</span>
                            <span className="text-[10px] text-primary font-mono bg-primary/10 px-1.5 py-0.5 rounded">Active</span>
                          </div>
                          <div className="space-y-2 font-mono text-xs flex-1">
                            <div>
                              <span className="text-[#d73a49] dark:text-[#f97583] font-semibold">export default function</span>{" "}
                              <span className="text-[#6f42c1] dark:text-[#b392f0] font-bold">Page</span>() {"{"}
                            </div>
                            <div className="pl-4 font-semibold text-[#d73a49] dark:text-[#f97583]">return (</div>
                            <div className="pl-8">
                              <span className="text-[#22863a] dark:text-[#85e89d]">&lt;div</span>{" "}
                              <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                              <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;flex h-full w-full flex-col p-4&quot;</span>
                              <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                            </div>
                            <div className="pl-12">
                              <span className="text-[#22863a] dark:text-[#85e89d]">&lt;h2</span>{" "}
                              <span className="text-[#6f42c1] dark:text-[#b392f0]">className</span>=
                              <span className="text-[#032f62] dark:text-[#9ecbfc]">&quot;text-2xl font-bold&quot;</span>
                              <span className="text-[#22863a] dark:text-[#85e89d]">&gt;</span>
                              <span className="text-foreground font-bold">Shuvo Sarkar</span>
                              <span className="text-[#22863a] dark:text-[#85e89d]">&lt;/h2&gt;</span>
                            </div>
                            <div className="pl-12 text-[#6a737d] dark:text-[#6a737d] italic">
                              {"{/* Drag handle bars to resize panels live */}"}
                            </div>
                            <div className="pl-8 text-[#22863a] dark:text-[#85e89d]">&lt;/div&gt;</div>
                            <div className="pl-4 font-semibold text-[#d73a49] dark:text-[#f97583]">);</div>
                            <div>{"}"}</div>
                          </div>
                        </div>
                      </ResizablePanel>

                      <ResizableHandle withHandle />

                      <ResizablePanel defaultSize={30} minSize={15}>
                        <div className="p-4 flex flex-col h-full bg-zinc-950 text-white border-t border-border/40">
                          <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center justify-between">
                            <span>Terminal</span>
                            <span className="text-[9px] text-muted-foreground">bash</span>
                          </div>
                          <div className="font-mono text-xs text-zinc-300">
                            <span className="text-emerald-400 font-bold">
                              project@app:~$
                            </span>{" "}
                            npm run dev
                            <br />
                            <span className="text-primary font-semibold">✓ Ready in 850ms</span>
                          </div>
                        </div>
                      </ResizablePanel>
                    </ResizablePanelGroup>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </div>
            </div>
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}
