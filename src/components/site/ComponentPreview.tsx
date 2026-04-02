"use client";

import { CodeBlocks } from "@/components/custom/ui/codeblocks"; // Your existing codeblock component
import { Code2, MonitorPlay } from "lucide-react";
import { useState } from "react";

export function ComponentPreview({
  children, // The actual live component
  tsCode, // The TypeScript raw string
  jsCode, // The JavaScript raw string
  name = "Component",
}: {
  children: React.ReactNode;
  tsCode: string;
  jsCode?: string;
  name?: string;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">("preview");
  const [language, setLanguage] = useState<"ts" | "js">("ts");

  return (
    <div className="w-full my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-sm not-prose">
      {/* Top Header: Preview vs Code Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        {/* Left Side: Preview / Code Toggles */}
        <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("preview")}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === "preview"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <MonitorPlay className="w-4 h-4" /> Preview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              activeTab === "code"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            <Code2 className="w-4 h-4" /> Code
          </button>
        </div>

        {/* Right Side: TS vs JS Tab Switcher (Only shows when in Code view) */}
        {activeTab === "code" && jsCode && (
          <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg animate-in fade-in duration-200">
            {/* TypeScript Button */}
            <button
              onClick={() => setLanguage("ts")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                language === "ts"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {/* Crisp HTML/CSS Logo */}
              <div className="w-4 h-4 bg-[#3178C6] rounded-[3px] flex items-center justify-center shrink-0">
                <span className="text-white text-[9px] font-bold leading-none mt-px">
                  TS
                </span>
              </div>
              TypeScript
            </button>

            {/* JavaScript Button */}
            <button
              onClick={() => setLanguage("js")}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                language === "js"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}
            >
              {/* Crisp HTML/CSS Logo */}
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

      {/* Main Content Area */}
      <div className="relative w-full bg-white dark:bg-[#09090b]">
        {activeTab === "preview" ? (
          <div className="p-6 md:p-10 flex justify-center items-center min-h-[400px] overflow-x-auto">
            {/* Renders your actual live React component */}
            {children}
          </div>
        ) : (
          <div className="relative w-full max-h-[600px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* Reuses your existing CodeBlocks component */}
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
