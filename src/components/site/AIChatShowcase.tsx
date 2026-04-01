"use client";

import AIChat, {
  AIChatColor,
  AIChatVariant,
} from "@/components/custom/blocks/Ai-chat";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

export function AIChatShowcase() {
  const [variant, setVariant] = useState<AIChatVariant>("default");
  const [color, setColor] = useState<AIChatColor>("indigo");

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    return `"use client";

import AIChat from '@/components/custom/blocks/Ai-chat';

export default function AIChatDemo()${typeDef} {
  const chatHistory = [
    { id: 1, title: "Help with React Components", date: "Today" },
    { id: 2, title: "Write a python script for SEO", date: "Today" },
    { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" }
  ];

  const initialMessages = [
    {
      id: 1,
      role: "ai",
      content: "Hello! I am your AI assistant. How can I help you today?",
      time: "10:00 AM",
    }
  ];

  return (
    <div className="w-full">
      <AIChat 
        chatHistory={chatHistory} 
        initialMessages={initialMessages}
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

  const sampleChatHistory = [
    { id: 1, title: "Help with React Components", date: "Today" },
    { id: 2, title: "Write a python script for SEO", date: "Today" },
    { id: 3, title: "Ideas for marketing campaign", date: "Yesterday" },
    { id: 4, title: "Explain quantum physics", date: "Previous 7 Days" },
    { id: 5, title: "Dinner recipes with chicken", date: "Previous 7 Days" },
  ];

  const sampleInitialMessages = [
    {
      id: 1,
      role: "ai",
      content: "Hello! I am your AI assistant. How can I help you today?",
      time: "10:00 AM",
    },
    {
      id: 2,
      role: "user",
      content:
        "Can you help me build a modern dashboard UI using Tailwind CSS?",
      time: "10:02 AM",
    },
    {
      id: 3,
      role: "ai",
      content:
        "Absolutely! Tailwind CSS is fantastic for building modern dashboards. I recommend starting with a clean layout: a side navigation bar, a top header for user profile and search, and a main content area with grid-based cards for your widgets.\n\nWould you like me to generate some starter code for a specific component, like a statistics card or a data table?",
      time: "10:02 AM",
    },
  ] as any;

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <div className="flex flex-col sm:flex-row gap-6 p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-xl flex-wrap">
        {/* Variant Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Style Variant
          </label>
          <div className="flex bg-zinc-200/50 dark:bg-black/50 p-1 rounded-lg w-max border border-zinc-200 dark:border-white/5">
            {(["default", "minimal", "glass"] as AIChatVariant[]).map((v) => (
              <button
                key={v}
                onClick={() => setVariant(v)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize transition-all ${
                  variant === v
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Theme Color
          </label>
          <div className="flex items-center gap-2 h-[36px]">
            {[
              { id: "indigo", bg: "bg-indigo-500" },
              { id: "rose", bg: "bg-rose-500" },
              { id: "emerald", bg: "bg-emerald-500" },
              { id: "zinc", bg: "bg-zinc-900 dark:bg-zinc-100" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setColor(c.id as AIChatColor)}
                className={`w-6 h-6 rounded-full transition-all duration-200 outline-none flex items-center justify-center ${c.bg} ${
                  color === c.id
                    ? "ring-2 ring-offset-2 ring-offset-zinc-50 dark:ring-offset-zinc-900 ring-zinc-400 dark:ring-zinc-500 scale-110"
                    : "hover:scale-110 hover:opacity-80"
                }`}
                title={c.id}
              />
            ))}
          </div>
        </div>
      </div>

      {/* --- WRAPPER WITH DYNAMIC CODE --- */}
      <ComponentPreview
        name="AIChat"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div
          className={`w-full transition-all duration-500 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""}`}
        >
          {/* Key forces a re-render to reset internal state if needed, though chat handles it well */}
          <AIChat
            variant={variant}
            color={color}
            chatHistory={sampleChatHistory}
            initialMessages={sampleInitialMessages}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
