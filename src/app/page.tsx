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
    <div className="relative min-h-screen bg-[#fafafa] dark:bg-[#050505] text-zinc-950 dark:text-zinc-50 font-sans selection:bg-indigo-500/30 pb-24 overflow-hidden">
      {/* === PREMIUM BACKGROUND FX === */}
      {/* Radial Gradient Base */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_80%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.1)_0%,transparent_80%)] pointer-events-none" />

      {/* Precision Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Cinematic Glowing Orbs */}
      <div className="absolute top-0 flex w-full justify-center opacity-50 dark:opacity-60 pointer-events-none">
        <div className="absolute top-[-250px] w-[800px] h-[600px] bg-indigo-500/20 blur-[120px] rounded-[100%] mix-blend-screen dark:mix-blend-lighten" />
        <div className="absolute top-[-150px] right-[15%] w-[500px] h-[500px] bg-rose-500/15 blur-[100px] rounded-[100%] mix-blend-screen dark:mix-blend-lighten" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-24 md:pt-36 px-4 md:px-8">
        {/* === HERO SECTION === */}
        <div className="max-w-5xl text-center flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
          {/* Glassmorphic Pill */}
          <Link
            href="/docs"
            className="group inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-200/40 dark:border-zinc-700/40 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl text-[13px] font-semibold text-zinc-700 dark:text-zinc-300 mb-8 hover:bg-white/60 dark:hover:bg-zinc-800/60 hover:shadow-[0_0_20px_rgba(99,102,241,0.1)] transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400">
              Introducing Docs UI Blocks v2.0
            </span>
            <div className="w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 mx-1" />
            <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
              Explore{" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>

          {/* Epic Typography */}
          <h1 className="text-[3rem] md:text-[5rem] lg:text-[6.5rem] font-black tracking-tighter mb-6 text-zinc-900 dark:text-white leading-[1.05] text-balance">
            Build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">
              Exceptional
            </span>
            <br className="hidden md:block" />
            User Interfaces.
          </h1>

          <p className="text-[17px] md:text-[21px] text-zinc-600 dark:text-zinc-400 max-w-[44rem] mb-10 text-balance leading-relaxed tracking-wide">
            A meticulously curated collection of beautifully designed, highly
            functional React components. Copy, paste, and customize to build
            your next great idea faster than ever.
          </p>

          {/* Refined Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/docs"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:scale-[1.02] active:scale-95 transition-all ring-1 ring-zinc-900/5 dark:ring-white/5"
            >
              Browse Components
            </Link>
            <Link
              href="https://github.com/docs/docs"
              target="_blank"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-[14px] flex items-center justify-center gap-2 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-zinc-900 dark:text-white border border-zinc-200/80 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800 shadow-sm hover:scale-[1.02] active:scale-95 transition-all"
            >
              <Github className="w-4 h-4" /> View on GitHub
            </Link>
          </div>
        </div>

        {/* === INTERACTIVE TABS === */}
        <div className="w-full max-w-[1100px] mt-24 md:mt-32 flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both">
          <div className="flex items-center p-1.5 rounded-full bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm overflow-x-auto w-full sm:w-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "relative cursor-pointer px-5 py-2 rounded-full text-[13.5px] font-bold transition-colors select-none",
                  activeTab === tab
                    ? "text-zinc-900 dark:text-white"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200",
                )}
              >
                {activeTab === tab && (
                  <div className="absolute inset-0 bg-white dark:bg-zinc-800 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.08)] -z-10" />
                )}
                {tab}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 cursor-pointer h-[42px] px-4 rounded-full border border-zinc-200/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl text-[13px] font-semibold text-zinc-600 dark:text-zinc-400 shadow-sm hover:bg-white dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors group">
            <span>Theme: Neutral</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />
          </div>
        </div>

        {/* === COMPONENT GRID === */}
        <div className="relative w-full max-w-[1100px] animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-500 fill-mode-both">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
            <div className="flex flex-col gap-6 lg:gap-8">
              <PaymentBlock />
              <NotificationsBlock />
            </div>

            <div className="flex flex-col gap-6 lg:gap-8 mt-0 md:mt-12 lg:mt-24">
              <TeamMembersBlock />
              <CommandSearchBlock />
            </div>

            <div className="flex flex-col gap-6 lg:gap-8 mt-0 lg:mt-12">
              <SecurityBlock />
              <ComputeBlock />
            </div>
          </div>

          {/* Fade Out Bottom Edge */}
          <div className="absolute bottom-0 left-0 w-full h-[300px] bg-gradient-to-t from-[#fafafa] dark:from-[#050505] to-transparent pointer-events-none" />
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
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
