"use client";

import {
  ScrollStackItem,
  StickyScrollStack,
} from "@/components/custom/blocks/motion/StickyScrollStackBlock";
import { Palette, Smartphone, Sparkles } from "lucide-react";

const getThemeColorHex = (c: string) => {
  if (c.startsWith("#")) return c;
  const map: Record<string, string> = { primary: "var(--primary)", default: "var(--primary)", indigo: "#6366f1", rose: "#f43f5e", emerald: "#10b981", lavender: "#9b8afb" };
  return map[c] || "var(--primary)";
};

export default function StickyScrollStackMotionDemo({
  enableGlow = false,
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
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
      imageAlt: "Misty mountain forest nature landscape",
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
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
      imageAlt: "Golden mountain valley sunset nature landscape",
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
        "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148863/photo-1447752875215-b2761acb3c5d-1790148865109.jpg",
      imageAlt: "Lush green forest nature landscape",
      buttonText: "View Cloud Specs",
    },
  ];

  return (
    <div className="w-full relative overflow-hidden rounded-2xl border border-border bg-muted/50">

      <div className="relative z-10 max-h-[750px] overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-300 dark:scrollbar-thumb-zinc-700">
        <StickyScrollStack
          items={allItems}
          enableGlow={enableGlow}
          scaleStep={scaleStep}
          stackOffsetStep={stackOffsetStep}
          headerContentType={headerMode}
          headerImageUrl={
            headerMode === "image-button"
              ? "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg"
              : undefined
          }
          headerTitle="Our Core Capabilities"
          headerSubtitle="We emphasize user-centric design, ensuring that every project we undertake prioritizes the needs and goals of your real audience."
          headerButtonText="Request free audit"
          className="py-10 sm:py-14"
        />
      </div>
    </div>
  );
}
