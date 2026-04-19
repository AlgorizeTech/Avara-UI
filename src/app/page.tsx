"use client";

import { ComputeBlock } from "@/components/custom/blocks/ComputeBlock";
import { PaymentBlock } from "@/components/custom/blocks/PaymentBlock";
import {
  NotificationsBlock,
  SecurityBlock,
} from "@/components/custom/blocks/SettingsBlock";
import {
  CommandSearchBlock,
  TeamMembersBlock,
} from "@/components/custom/blocks/UtilityBlocks";
import { cn } from "@/lib/utils";
import { ArrowRight, Github, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InteractiveDensityPage() {
  const [activeTab, setActiveTab] = useState("Examples");
  const tabs = ["Examples", "Dashboard", "Tasks", "Playground"];

  return (
    <div className="relative min-h-screen bg-white dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 font-sans selection:bg-indigo-500/30 pb-20 overflow-hidden">
      {/* === ENHANCED BACKGROUND FX === */}
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* Glowing Orbs */}
      <div className="absolute top-0 flex w-full justify-center opacity-40 dark:opacity-50">
        <div className="absolute top-[-200px] w-[600px] h-[500px] bg-indigo-500/30 blur-[120px] rounded-[100%] mix-blend-screen" />
        <div className="absolute top-[-100px] right-[20%] w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-[100%] mix-blend-screen" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-24 md:pt-32 px-4 md:px-8">
        {/* === HERO SECTION === */}
        <div className="max-w-4xl text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-8 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
              Introducing UI-Nexus Blocks v2.0
            </span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tighter mb-6 text-zinc-900 dark:text-white leading-[1.1] md:leading-[1.1] text-balance">
            The Foundation for your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Design System
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-[42rem] mb-10 text-balance leading-relaxed">
            A curated collection of beautifully designed, highly functional
            React components. Copy, paste, and customize to build your next
            great idea faster than ever.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/docs"
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg shadow-zinc-900/20 dark:shadow-white/10 flex items-center justify-center gap-2"
            >
              Browse Components
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-full font-bold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </Link>
          </div>
        </div>

        {/* === INTERACTIVE TABS === */}
        <div className="w-full max-w-6xl mt-32 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 animate-in fade-in duration-1000 delay-300 fill-mode-both">
          <div className="flex items-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-full p-1 shadow-sm overflow-x-auto w-full sm:w-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "cursor-pointer px-6 py-2 rounded-full text-sm font-bold transition-all",
                  activeTab === tab
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 shadow-sm"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/50",
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 cursor-pointer h-10 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-sm font-medium text-zinc-500 shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group">
            <span>Theme: Neutral</span>
            <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300" />
          </div>
        </div>

        {/* === COMPONENT GRID === */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 fill-mode-both">
          <div className="flex flex-col gap-6 lg:gap-8">
            <PaymentBlock />
            <NotificationsBlock />
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <TeamMembersBlock />
            <CommandSearchBlock />
          </div>

          <div className="flex flex-col gap-6 lg:gap-8">
            <SecurityBlock />
            <ComputeBlock />
          </div>
        </div>
      </main>
    </div>
  );
}

// Simple Chevron icon so we don't have to import it at the top
function ChevronDown(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
