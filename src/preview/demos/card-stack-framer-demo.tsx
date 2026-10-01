"use client";

import React from "react";
import {
  Palette,
  Terminal,
  FileText,
  Radio,
  CheckSquare,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import {
  CardStack,
  type CardStackItem,
} from "@/components/custom/blocks/framer/CardStackBlock";

// Exact replica of the MakerHunt brand mark from the reference design
function MakerHuntLogo() {
  return (
    <div className="relative size-12 rounded-2xl bg-[#091642] overflow-hidden flex items-center justify-center shadow-xs">
      {/* 16 white dots ring matching the screenshot */}
      <svg viewBox="0 0 40 40" className="size-8 relative z-10" fill="none">
        <circle cx="20" cy="20" r="11" stroke="white" strokeWidth="2.8" strokeDasharray="3.2 2.2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="6" fill="#091642" />
      </svg>
    </div>
  );
}

const ARRIVALS: CardStackItem[] = [
  {
    id: "maker-hunt",
    title: "MakerHunt",
    description: "Daily product launches for indie makers.",
    category: "Productivity",
    date: "1d ago",
    href: "https://makerhunt.example.com",
    icon: <MakerHuntLogo />,
  },
  {
    id: "design-forge",
    title: "DesignForge",
    description: "AI-powered vector generation and canvas tools for modern UI designers.",
    category: "Design",
    date: "2d ago",
    href: "https://designforge.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
        <Palette className="size-6" />
      </div>
    ),
  },
  {
    id: "dev-pulse",
    title: "DevPulse",
    description: "Real-time deployment monitors and automated error triage alerts.",
    category: "Developer Tools",
    date: "3d ago",
    href: "https://devpulse.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
        <Terminal className="size-6" />
      </div>
    ),
  },
  {
    id: "draft-craft",
    title: "DraftCraft",
    description: "Collaborative markdown workspace with branch versioning and instant preview.",
    category: "Writing",
    date: "4d ago",
    href: "https://draftcraft.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
        <FileText className="size-6" />
      </div>
    ),
  },
  {
    id: "echo-feed",
    title: "EchoFeed",
    description: "Minimalist social reader with smart RSS deduplication and topic filters.",
    category: "News",
    date: "5d ago",
    href: "https://echofeed.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
        <Radio className="size-6" />
      </div>
    ),
  },
  {
    id: "task-zen",
    title: "TaskZen",
    description: "Fluid Kanban boards and time-boxing timers engineered for deep work.",
    category: "Productivity",
    date: "6d ago",
    href: "https://taskzen.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-violet-600 text-white flex items-center justify-center shadow-xs">
        <CheckSquare className="size-6" />
      </div>
    ),
  },
  {
    id: "hyper-audio",
    title: "HyperAudio",
    description: "Studio-grade neural speech synthesis and automatic podcast noise removal.",
    category: "Audio",
    date: "1w ago",
    href: "https://hyperaudio.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
        <Headphones className="size-6" />
      </div>
    ),
  },
  {
    id: "nova-vault",
    title: "NovaVault",
    description: "Zero-knowledge encrypted secret storage and API key manager.",
    category: "Security",
    date: "1w ago",
    href: "https://novavault.example.com",
    icon: (
      <div className="size-12 rounded-2xl bg-zinc-800 text-white flex items-center justify-center shadow-xs">
        <ShieldCheck className="size-6" />
      </div>
    ),
  },
];

export default function CardStackFramerDemo({
  example = "swipe",
  slideDirection = "right",
  loop = false,
  swipeToDismiss,
  showNavigation,
  showHeader,
}: {
  example?: "swipe" | "buttons" | "left" | "loop";
  slideDirection?: "right" | "left";
  loop?: boolean;
  swipeToDismiss?: boolean;
  showNavigation?: boolean;
  showHeader?: boolean;
}) {
  if (example === "buttons") {
    return (
      <div className="flex min-h-[360px] w-full items-center justify-center p-4 sm:p-8 overflow-hidden">
        <CardStack
          items={ARRIVALS}
          swipeToDismiss={swipeToDismiss ?? false}
          showNavigation={showNavigation ?? true}
          showHeader={showHeader ?? true}
          defaultIndex={0}
          slideDirection={slideDirection}
          loop={loop}
        />
      </div>
    );
  }

  if (example === "left") {
    return (
      <div className="flex min-h-[360px] w-full items-center justify-center p-4 sm:p-8 overflow-hidden">
        <CardStack
          items={ARRIVALS}
          slideDirection="left"
          swipeToDismiss={swipeToDismiss ?? false}
          showNavigation={showNavigation ?? true}
          showHeader={showHeader ?? true}
          loop={loop}
        />
      </div>
    );
  }

  if (example === "loop") {
    return (
      <div className="flex min-h-[320px] w-full items-center justify-center p-4 sm:p-8 overflow-hidden">
        <CardStack
          items={ARRIVALS.slice(0, 5)}
          slideDirection={slideDirection}
          loop={true}
          swipeToDismiss={swipeToDismiss ?? true}
          showNavigation={showNavigation ?? false}
          showHeader={showHeader ?? false}
        />
      </div>
    );
  }

  // Default: Swipe/Drag to discard (no header, no back buttons, swipe left or right)
  return (
    <div className="flex min-h-[320px] w-full items-center justify-center p-4 sm:p-8 overflow-hidden">
      <CardStack
        items={ARRIVALS}
        defaultIndex={0}
        swipeToDismiss={swipeToDismiss ?? true}
        showHeader={showHeader ?? false}
        loop={loop}
      />
    </div>
  );
}
