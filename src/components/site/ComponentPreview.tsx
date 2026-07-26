"use client";

import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { cn } from "@/lib/utils";
import { Code2, Monitor, MonitorPlay, RotateCcw, Smartphone, Tablet, Terminal, GripVertical } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export function ComponentPreview({
  children,
  tsCode,
  jsCode,
  usageCode,
  jsUsageCode,
  name = "Component",
}: {
  children: React.ReactNode;
  tsCode: string;
  jsCode?: string;
  usageCode?: string;
  jsUsageCode?: string;
  name?: string;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");
  const [language, setLanguage] = useState<"ts" | "js">("ts");

  // Replay Animation State
  const [replayKey, setReplayKey] = useState<number>(0);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  // Responsive Preview State
  const [previewWidth, setPreviewWidth] = useState<number | "100%">("100%");
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Replay Trigger: Increments React key to remount DOM & replay animations
  const handleReplay = () => {
    setIsReplaying(true);
    setReplayKey((prev) => prev + 1);

    setTimeout(() => {
      setIsReplaying(false);
    }, 600);
  };

  const showLanguageToggle =
    (activeTab === "code" && jsCode) || (activeTab === "usage" && jsUsageCode);

  // Drag to resize logic
  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && containerRef.current.parentElement) {
        const parentRect = containerRef.current.parentElement.getBoundingClientRect();
        // Calculate new width relative to the parent container's left edge
        let newWidth = e.clientX - parentRect.left;
        
        // Add some padding/limits
        const maxWidth = parentRect.width;
        if (newWidth > maxWidth) newWidth = maxWidth;
        if (newWidth < 320) newWidth = 320; // Minimum width like mobile
        
        // Snap to 100% if it's very close to full width
        if (newWidth >= maxWidth - 10) {
          setPreviewWidth("100%");
        } else {
          setPreviewWidth(newWidth);
        }
      }
    };
    const handleMouseUp = () => setIsDragging(false);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="w-full my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col not-prose relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-t-xl">
        {/* Left Side: 3-Tab Toggles */}
        <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
              activeTab === "preview"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
            )}
          >
            <MonitorPlay className="w-4 h-4" /> Preview
          </button>

          {usageCode && (
            <button
              onClick={() => setActiveTab("usage")}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
                activeTab === "usage"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              )}
            >
              <Terminal className="w-4 h-4" /> Usage
            </button>
          )}

          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all cursor-pointer",
              activeTab === "code"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
            )}
          >
            <Code2 className="w-4 h-4" /> Component
          </button>
        </div>

        {/* Right Side: Replay Button, Language Toggle & Responsive Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {activeTab === "preview" && (
            <div className="flex items-center gap-3">
              {/* Width Display */}
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 min-w-[40px] text-right">
                {previewWidth === "100%" ? "100%" : `${Math.round(previewWidth as number)}px`}
              </span>
              
              {/* Responsive Toggles */}
              <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50 hidden sm:flex">
                <button
                  onClick={() => setPreviewWidth("100%")}
                  className={cn(
                    "p-1.5 rounded-md transition-all cursor-pointer",
                    previewWidth === "100%" 
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100" 
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewWidth(768)}
                  className={cn(
                    "p-1.5 rounded-md transition-all cursor-pointer",
                    previewWidth === 768 
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100" 
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                  title="Tablet View"
                >
                  <Tablet className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewWidth(375)}
                  className={cn(
                    "p-1.5 rounded-md transition-all cursor-pointer",
                    previewWidth === 375 
                      ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100" 
                      : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
              
              {/* Replay Button (Icon Only) */}
              <button
                onClick={handleReplay}
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm border",
                  "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-700",
                )}
                title="Replay component animations"
              >
                <RotateCcw
                  className={cn(
                    "w-4 h-4 transition-transform duration-500",
                    isReplaying && "animate-spin",
                  )}
                />
              </button>
            </div>
          )}

          {/* TS vs JS Language Toggle */}
          {showLanguageToggle && (
            <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg animate-in fade-in duration-200 ml-1 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setLanguage("ts")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  language === "ts"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                <div className="w-4 h-4 bg-[#3178C6] rounded-[3px] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-bold leading-none mt-px">
                    TS
                  </span>
                </div>
                TypeScript
              </button>
              <button
                onClick={() => setLanguage("js")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  language === "js"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                <div className="w-4 h-4 bg-[#F7DF1E] rounded-[3px] flex items-center justify-center shrink-0">
                  <span className="text-black text-[9px] font-bold leading-none mt-px">
                    JS
                  </span>
                </div>
                JavaScript
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full bg-white dark:bg-[#09090b] rounded-b-xl">
        {activeTab === "preview" ? (
          <div className={cn(
            "flex items-stretch min-h-[400px] relative justify-start overflow-visible rounded-b-xl",
            "bg-zinc-50/50 dark:bg-[#020202]"
          )}>
            {/* Dashed Grid Background */}
            <div className="absolute inset-0 pointer-events-none rounded-b-xl overflow-hidden">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="dashed-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dashed-grid)" className="text-zinc-400/20 dark:text-white/10" />
              </svg>
            </div>

            <div
              ref={containerRef}
              style={{ width: previewWidth === "100%" ? "100%" : `${previewWidth}px`, maxWidth: "100%" }}
              className={cn(
                "relative flex justify-center items-center transition-[width] ease-out",
                isDragging ? "duration-0" : "duration-300",
                "border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]",
                previewWidth === "100%" ? "rounded-b-xl" : "rounded-bl-xl rounded-r-none"
              )}
            >
              <div
                key={replayKey}
                className={cn(
                  "w-full h-full flex justify-center items-center animate-in fade-in duration-300 overflow-hidden",
                  previewWidth === "100%" ? "rounded-b-xl" : "rounded-bl-xl rounded-r-none"
                )}
              >
                {children}
              </div>

              {/* Drag Handle */}
              <div
                onMouseDown={handleDragStart}
                className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[3px] flex items-center justify-center cursor-ew-resize shadow-sm hover:shadow-md transition-shadow z-10 hidden sm:flex"
              >
                <GripVertical className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          </div>
        ) : activeTab === "usage" && usageCode ? (
          <div className="relative w-full max-h-[600px] overflow-y-auto overflow-x-hidden rounded-b-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CodeBlocks
              code={language === "ts" ? usageCode : jsUsageCode || usageCode}
              language={language === "ts" ? "tsx" : "jsx"}
            />
          </div>
        ) : (
          <div className="relative w-full max-h-[600px] overflow-y-auto overflow-x-hidden rounded-b-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CodeBlocks
              code={language === "ts" ? tsCode : jsCode || tsCode}
              language={language === "ts" ? "tsx" : "jsx"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
