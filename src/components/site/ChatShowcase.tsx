"use client";

import ChatApp, {
  ChatColor,
  ChatVariant,
} from "@/components/custom/blocks/Chat";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { useState } from "react";

export function ChatShowcase() {
  const [variant, setVariant] = useState<ChatVariant>("default");
  const [color, setColor] = useState<ChatColor>("indigo");

  const generateCode = (isTs: boolean) => {
    const typeDef = isTs ? " : React.JSX.Element" : "";

    return `"use client";

import ChatApp from "@/components/custom/blocks/Chat";

export default function ChatDemo()${typeDef} {
  const currentUser = {
    avatar: "https://i.pravatar.cc/150?u=current",
    status: "online",
  };

  const contactsData = [
    {
      id: 1,
      name: "Felecia Rower",
      message: "I will purchase it for sure. 👍",
      date: "Mar 13",
      unread: 1,
      status: "offline",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Adalberto Granzin",
      message: "If it takes long you can mail me a...",
      date: "Mar 12",
      unread: 0,
      status: "offline",
      initials: "AG",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    },
  ] as any; // Cast needed if using JS without strict type checking

  return (
    <div className="w-full">
      <ChatApp 
        currentUser={currentUser} 
        contactsData={contactsData}
        variant="${variant}"
        color="${color}"
      />
    </div>
  );
}`;
  };

  const sampleCurrentUser = {
    avatar: "https://i.pravatar.cc/150?u=current",
    status: "online",
  };

  const sampleContactsData = [
    {
      id: 1,
      name: "Felecia Rower",
      message: "I will purchase it for sure. 👍",
      date: "Mar 13",
      unread: 1,
      status: "offline",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      id: 2,
      name: "Adalberto Granzin",
      message: "If it takes long you can mail me a...",
      date: "Mar 12",
      unread: 0,
      status: "offline",
      initials: "AG",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400",
    },
    {
      id: 3,
      name: "Zenia Jacobs",
      message: "Thank you, looking forward to it.",
      date: "Dec 13",
      unread: 0,
      status: "online",
      initials: "ZJ",
      color: "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400",
    },
    {
      id: 4,
      name: "Miguel Guelff",
      message: "Can we schedule a meeting for tomorrow?",
      date: "Dec 11",
      unread: 0,
      status: "online",
      avatar: "https://i.pravatar.cc/150?u=4",
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
            {(["default", "minimal", "glass"] as ChatVariant[]).map((v) => (
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
                onClick={() => setColor(c.id as ChatColor)}
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
        name="ChatApp"
        tsCode={generateCode(true)}
        jsCode={generateCode(false)}
      >
        <div
          className={`w-full transition-all duration-500 ${variant === "glass" ? "p-4 sm:p-8 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl" : ""}`}
        >
          <ChatApp
            variant={variant}
            color={color}
            currentUser={sampleCurrentUser}
            contactsData={sampleContactsData}
          />
        </div>
      </ComponentPreview>
    </div>
  );
}
