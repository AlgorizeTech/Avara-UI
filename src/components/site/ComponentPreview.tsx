"use client";

import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { cn } from "@/lib/utils";
import { Code2, MonitorPlay, RotateCcw, Terminal } from "lucide-react";
import React, { useState } from "react";

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
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">(
    "preview",
  );
  const [language, setLanguage] = useState<"ts" | "js">("ts");

  // Replay Animation State
  const [replayKey, setReplayKey] = useState<number>(0);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  // Replay Trigger: Increments React key to remount DOM & replay animations
  const handleReplay = () => {
    setIsReplaying(true);
    setReplayKey((prev) => prev + 1);

    // Stop icon spin animation after 600ms
    setTimeout(() => {
      setIsReplaying(false);
    }, 600);
  };

  const showLanguageToggle =
    (activeTab === "code" && jsCode) || (activeTab === "usage" && jsUsageCode);

  return (
    <div className="w-full my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-sm not-prose">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
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

        {/* Right Side: Replay Button & Language Toggle */}
        <div className="flex items-center gap-2 ml-auto">
          {activeTab === "preview" && (
            <button
              onClick={handleReplay}
              className={cn(
                "h-8 px-3 rounded-lg font-medium text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-sm border",
                "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700",
              )}
              title="Replay component animations"
            >
              <RotateCcw
                className={cn(
                  "w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400 transition-transform duration-500",
                  isReplaying && "animate-spin",
                )}
              />
              <span>Replay</span>
            </button>
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
      <div className="relative w-full bg-white dark:bg-[#09090b]">
        {activeTab === "preview" ? (
          <div className="p-6 sm:p-10 md:p-12 flex justify-center items-center min-h-[400px] overflow-x-auto bg-zinc-50/50 dark:bg-[#020202] relative">
            {/* 
              THE KEY REMOUNT ENGINE: 
              Attaching `key={replayKey}` forces React to unmount and remount this entire block 
              whenever the Replay button is clicked, cleanly triggering all entry animations!
            */}
            <div
              key={replayKey}
              className="w-full flex justify-center items-center animate-in fade-in duration-300"
            >
              {children}
            </div>
          </div>
        ) : activeTab === "usage" && usageCode ? (
          <div className="relative w-full max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CodeBlocks
              code={language === "ts" ? usageCode : jsUsageCode || usageCode}
              language={language === "ts" ? "tsx" : "jsx"}
            />
          </div>
        ) : (
          <div className="relative w-full max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
