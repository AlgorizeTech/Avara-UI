"use client";

import { Dock, DockItem } from "@/components/custom/blocks/DockBlock";
import {
  Compass,
  FolderGit2,
  Github,
  Home,
  Mail,
  Settings,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState } from "react";

export default function DockDemo({
  activeTab = "home",
}: {
  activeTab?: string;
}) {
  const [active, setActive] = useState(activeTab);

  const sampleItems: DockItem[] = [
    {
      id: "home",
      label: "Dashboard",
      icon: <Home className="w-full h-full" />,
      isActive: active === "home",
      onClick: () => setActive("home"),
    },
    {
      id: "compass",
      label: "Explore",
      icon: <Compass className="w-full h-full" />,
      isActive: active === "compass",
      onClick: () => setActive("compass"),
    },
    {
      id: "mail",
      label: "Messages",
      icon: <Mail className="w-full h-full" />,
      badge: 3,
      isActive: active === "mail",
      onClick: () => setActive("mail"),
    },
    {
      id: "terminal",
      label: "Terminal",
      icon: <Terminal className="w-full h-full" />,
      isActive: active === "terminal",
      onClick: () => setActive("terminal"),
    },
    {
      id: "projects",
      label: "Repositories",
      icon: <FolderGit2 className="w-full h-full" />,
      isActive: active === "projects",
      onClick: () => setActive("projects"),
    },
    {
      id: "ai",
      label: "AI Assistant",
      icon: <Sparkles className="w-full h-full text-amber-500" />,
      isActive: active === "ai",
      onClick: () => setActive("ai"),
    },
    {
      id: "github",
      label: "GitHub",
      icon: <Github className="w-full h-full" />,
      isActive: active === "github",
      onClick: () => setActive("github"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-full h-full" />,
      isActive: active === "settings",
      onClick: () => setActive("settings"),
    },
  ];

  return (
    <div className="w-full flex flex-col items-center justify-end bg-zinc-50 dark:bg-[#0a0a0a] py-16 px-2 sm:px-8 relative overflow-hidden min-h-[420px] rounded-3xl border border-zinc-200 dark:border-white/10 transition-colors duration-300">
      {/* Subtle Ambient Backglow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-zinc-400/20 via-zinc-400/5 to-transparent dark:from-white/10 dark:via-white/5 dark:to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Dummy Desktop Workplace State Indicator */}
      <div className="absolute top-6 left-6 text-xs font-mono text-zinc-400 dark:text-zinc-600">
        Active App:{" "}
        <span className="text-zinc-800 dark:text-zinc-300 uppercase font-bold">
          {active}
        </span>
      </div>

      {/* Interactive Dock Container with Customized Dimensions */}
      <div className="relative z-10 w-full flex justify-center pb-2 sm:pb-4">
        <Dock
          items={sampleItems}
          containerHeight={80}
          baseSize={46}
          magnification={84}
          distance={135}
          gap={12}
        />
      </div>
    </div>
  );
}
