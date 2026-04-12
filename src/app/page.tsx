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
import Link from "next/link";
import { useState } from "react";

export default function InteractiveDensityPage() {
  const [activeTab, setActiveTab] = useState("Examples");
  const tabs = ["Examples", "Dashboard", "Tasks", "Playground"];

  return (
    <div className="relative min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800 pb-20">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 pointer-events-none hidden dark:flex items-center justify-center overflow-hidden">
        <div className="absolute top-[-10%] w-[800px] h-[500px] bg-zinc-800/20 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <main className="relative z-10 flex flex-col items-center pt-20 px-4 md:px-8">
        {/* Hero Section */}
        <div className="max-w-4xl text-center flex flex-col items-center">
          <Link
            href={"/docs"}
            className="cursor-pointer inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md text-xs font-medium text-zinc-600 dark:text-zinc-300 mb-6 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
          >
            ui-nexus/blocks, charts, and more
            <svg
              className="size-3 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-zinc-950 dark:text-zinc-50 text-balance">
            The Foundation for your Design System
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-[42rem] mb-8 text-balance leading-relaxed">
            A set of beautifully designed, dynamic components that you can
            customize, extend, and build on. Start here, make it yours. Open
            Source.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="w-full max-w-6xl mt-24 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`cursor-pointer px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-950 dark:text-zinc-50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto group">
            <div className="cursor-pointer hidden sm:flex items-center justify-between h-9 px-3 w-auto min-w-[130px] gap-3 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-sm text-zinc-500 shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <span>Theme: Neutral</span>
              <svg
                className="size-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Component Grid (Fully Modular!) */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          <div className="flex flex-col gap-6">
            <PaymentBlock />
            <NotificationsBlock />
          </div>

          <div className="flex flex-col gap-6">
            <TeamMembersBlock />
            <CommandSearchBlock />
          </div>

          <div className="flex flex-col gap-6">
            <SecurityBlock />
            <ComputeBlock />
          </div>
        </div>
      </main>
    </div>
  );
}
