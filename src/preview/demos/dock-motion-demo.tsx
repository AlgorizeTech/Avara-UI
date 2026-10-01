"use client";

import { Dock, DockItem } from "@/components/custom/blocks/motion/DockBlock";
import {
  Compass,
  FolderGit2,
  Code2,
  Home,
  Mail,
  Settings,
  Sparkles,
  Terminal,
} from "lucide-react";
import { useState } from "react";

export default function DockMotionDemo({
  activeTab = "home",
  baseSize = 46,
  magnification = 84,
  distance = 135,
  gap = 12,
  containerHeight = 80,
  itemSet = "full",
}: {
  activeTab?: string;
  /** Resting icon size in px. */
  baseSize?: number;
  /** Peak icon size under the cursor, in px. */
  magnification?: number;
  /** How far from the cursor the magnification reaches, in px. */
  distance?: number;
  gap?: number;
  containerHeight?: number;
  /** "compact" renders a four-app dock instead of the full desktop set. */
  itemSet?: "full" | "compact";
}) {
  const [active, setActive] = useState(activeTab);

  const allItems: DockItem[] = [
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
      id: "code",
      label: "Code",
      icon: <Code2 className="w-full h-full" />,
      isActive: active === "code",
      onClick: () => setActive("code"),
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings className="w-full h-full" />,
      isActive: active === "settings",
      onClick: () => setActive("settings"),
    },
  ];

  const sampleItems =
    itemSet === "compact"
      ? allItems.filter((item) =>
          ["home", "mail", "terminal", "settings"].includes(item.id),
        )
      : allItems;

  return (
    <div className="w-full flex flex-col items-center justify-end bg-background pt-14 sm:pt-24 pb-6 sm:pb-12 px-2 sm:px-8 relative overflow-visible min-h-[200px] sm:min-h-[420px] rounded-3xl border border-border transition-colors duration-300">
      {/* Subtle Ambient Backglow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-gradient-to-t from-foreground/10 via-foreground/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      {/* Dummy Desktop Workplace State Indicator */}
      <div className="absolute top-6 left-6 text-xs font-mono text-muted-foreground">
        Active App:{" "}
        <span className="text-foreground uppercase font-semibold">
          {active}
        </span>
      </div>

      {/* Interactive Dock Container with Customized Dimensions */}
      <div className="relative z-10 w-full flex justify-center pb-2 sm:pb-4 overflow-visible">
        <Dock
          items={sampleItems}
          containerHeight={containerHeight}
          baseSize={baseSize}
          magnification={magnification}
          distance={distance}
          gap={gap}
        />
      </div>
    </div>
  );
}
