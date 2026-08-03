"use client";

import {
  ScrollStackItem,
  StickyScrollStack,
} from "@/components/custom/blocks/StickyScrollStackBlock";
import { Palette, Smartphone, Sparkles } from "lucide-react";

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = { primary: "var(--primary)", default: "var(--primary)", indigo: "#6366f1", rose: "#f43f5e", emerald: "#10b981", zinc: "#18181b" };
  return map[c] || "var(--primary)";
};

export default function StickyScrollStackDemo({
  enableGlow = true,
  scaleStep = 0.04,
  stackOffsetStep = 16,
  headerMode = "text-button",
  color = "primary",
}: {
  enableGlow?: boolean;
  scaleStep?: number;
  stackOffsetStep?: number;
  headerMode?: "text-button" | "image-button" | "text-only";
  color?: string;
}) {
  const allItems: ScrollStackItem[] = [
    {
      id: "ui-design",
      title: "UI Design",
      badge: "Visual Identity",
      icon: <Palette className="w-5 h-5" style={{ color: getThemeColorHex(color) }} />,
      contentType: "list",
      description:
        "Crafting intuitive, pixel-perfect interfaces designed to engage and convert real users.",
      listItems: [
        "Website / Landing Pages",
        "Mobile Apps (iOS & Android)",
        "Web App / SaaS Dashboards",
        "Comprehensive Design Systems",
      ],
      buttonText: "View UI Showcase",
      onButtonClick: () => alert("Navigating to UI Showcase..."),
    },
    {
      id: "branding",
      title: "Branding & Identity",
      badge: "Brand Strategy",
      icon: <Sparkles className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "split",
      description:
        "Building memorable, iconic brand identities that stand out in crowded markets.",
      listItems: [
        "Logo & Visual Assets",
        "Color Palettes & Typography",
        "Brand Guidelines & Tone",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Brand guidelines mockup",
      buttonText: "Explore Branding",
    },
    {
      id: "fullstack-dev",
      title: "Full-Stack Development",
      badge: "Engineering",
      icon: <Smartphone className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "image",
      description:
        "High-performance, scalable web applications built with Next.js, React, and Tailwind CSS.",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Code editor preview",
      buttonText: "Tech Stack Specs",
    },
    {
      id: "fullstack-dev-2",
      title: "Backend Architecture",
      badge: "Infrastructure",
      icon: <Smartphone className="w-5 h-5 text-[var(--theme-color)]" />,
      contentType: "image",
      description:
        "Resilient cloud architectures, serverless deployments, and real-time database indexing.",
      imageUrl:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      imageAlt: "Cloud infrastructure preview",
      buttonText: "View Cloud Specs",
    },
  ];

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80" style={{ "--theme-color": getThemeColorHex(color), backgroundColor: "color-mix(in srgb, var(--theme-color, var(--primary)) 1.5%, transparent)" } as React.CSSProperties}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        <StickyScrollStack
          items={allItems}
          enableGlow={enableGlow}
          scaleStep={scaleStep}
          stackOffsetStep={stackOffsetStep}
          headerContentType={headerMode}
          headerImageUrl={
            headerMode === "image-button"
              ? "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80"
              : undefined
          }
          headerTitle="We can help you with"
          headerSubtitle="We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience."
          headerButtonText="Request free audit"
          onHeaderButtonClick={() => alert("Free audit requested!")}
          className="py-10 sm:py-14"
        />
      </div>
    </div>
  );
}
