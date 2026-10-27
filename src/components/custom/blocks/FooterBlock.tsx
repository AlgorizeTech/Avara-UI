"use client";

import React from "react";
import {
  Globe as GlobeIcon,
  Sparkles,
  ChevronRight,
  Heart,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";
import { accentStyle } from "@/lib/accent";
import { SocialLinks, type SocialLink } from "./SocialLinksBlock";

export type FooterVariant =
  | "simple-centered"
  | "glass-dock"
  | "neon-glow-pulse"
  | "quantum-particle-beam"
  | "snapshot"
  | "modern-stack"
  | "snapshot-stack";

export interface FooterLinkSection {
  title: string;
  /** `badge` renders a small count pill next to the label (used by `snapshot`). */
  links: { label: string; href: string; badge?: string | number }[];
}

export interface SnapshotPhoto {
  src: string;
  caption: string;
}

export interface SnapshotCardData {
  dotColor?: string;
  tag: string;
  meta: string;
  title: string;
  lines: string[];
  footerLabel?: string;
  footerValue?: string;
  stickerText?: string;
  /** Custom icon node for the circular sticker badge. */
  stickerIcon?: React.ReactNode;
  /** Background color for modern stack card styling (e.g. "#F7C844"). */
  bgColor?: string;
  /** Foreground/text color for modern stack card styling (e.g. "#2B1C06"). */
  textColor?: string;
}

/** Content for the `snapshot` variant. Every field is optional. */
export interface SnapshotFooterContent {
  /** Headline, one entry per line. */
  headingLines?: string[];
  description?: string;
  /** Three-line tagline; the last line is rendered muted. */
  taglineLines?: string[];
  /** Interactive cards in the pocket pile. */
  cards?: SnapshotCardData[];
  /** Legacy support for photos if provided. */
  photos?: SnapshotPhoto[];
  /** Address lines for the studio card. */
  address?: string[];
  hours?: string;
  stickerText?: string;
  legalLinks?: { label: string; href: string }[];
}

export interface FooterProps {
  variant?: FooterVariant;
  /** Active accent color from the theme or color picker (e.g. "lavender", "indigo", "rose", "emerald", hex). */
  color?: string;
  brandName?: string;
  logo?: React.ReactNode;
  tagline?: string;
  copyrightText?: string;
  sections?: FooterLinkSection[];
  /** The social row. Defaults to X, GitHub, LinkedIn, YouTube and Instagram pointing at `#`. */
  socialLinks?: SocialLink[];
  /** Copy, photos and note card for the `snapshot` variant. */
  snapshot?: SnapshotFooterContent;
  className?: string;
}

const DEFAULT_SOCIAL_LINKS: SocialLink[] = [
  { network: "x", href: "#" },
  { network: "github", href: "#" },
  { network: "linkedin", href: "#" },
  { network: "youtube", href: "#" },
  { network: "instagram", href: "#" },
];

const DEFAULT_FOOTER_SECTIONS: FooterLinkSection[] = [
  {
    title: "Product",
    links: [
      { label: "Components", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "GitHub", href: "#" },
      { label: "Discord", href: "#" },
      { label: "Community", href: "#" },
      { label: "Showcase", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy Policy", href: "#" },
    ],
  },
];

/**
 * Per-variant default link columns.
 *
 * `sections` overrides these. Each variant keeps its own wording, so the
 * out-of-the-box look is unchanged when the prop is omitted.
 */
const DEFAULT_SECTIONS_BY_VARIANT: Record<FooterVariant, FooterLinkSection[]> = {
  "simple-centered": DEFAULT_FOOTER_SECTIONS,
  "glass-dock": [
  { title: "UI Library", links: [{ label: "Globe 3D", href: "#" }, { label: "Hero Showcase", href: "#" }, { label: "Marquee", href: "#" }, { label: "Scroll Stack", href: "#" }] },
  { title: "Documentation", links: [{ label: "Quickstart", href: "#" }, { label: "Installation", href: "#" }, { label: "Tailwind Setup", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Community", links: [{ label: "GitHub Repo", href: "#" }, { label: "Discord Chat", href: "#" }, { label: "Twitter News", href: "#" }, { label: "YouTube", href: "#" }] },
  { title: "Company", links: [{ label: "About Team", href: "#" }, { label: "Careers", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Security", href: "#" }] },
  ],
  "neon-glow-pulse": [
  { title: "Cyber Blocks", links: [{ label: "3D Animated Globe", href: "#" }, { label: "Hero Showcase", href: "#" }, { label: "Infinite Marquee", href: "#" }, { label: "Scroll Stack", href: "#" }] },
  { title: "Documentation", links: [{ label: "Quickstart Guide", href: "#" }, { label: "Framework Setup", href: "#" }, { label: "Tailwind v4", href: "#" }, { label: "CLI Reference", href: "#" }] },
  { title: "Community", links: [{ label: "GitHub Repository", href: "#" }, { label: "Discord Server", href: "#" }, { label: "Twitter Feed", href: "#" }, { label: "YouTube Channel", href: "#" }] },
  { title: "Trust & Legal", links: [{ label: "About Our Team", href: "#" }, { label: "Careers (Hiring)", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Security Overview", href: "#" }] },
  ],
  "quantum-particle-beam": [
  { title: "UI Components", links: [{ label: "Globe 3D", href: "#" }, { label: "Hero Showcase", href: "#" }, { label: "Marquee", href: "#" }, { label: "Scroll Stack", href: "#" }] },
  { title: "Documentation", links: [{ label: "Quickstart", href: "#" }, { label: "Installation", href: "#" }, { label: "Tailwind Setup", href: "#" }, { label: "Changelog", href: "#" }] },
  { title: "Community", links: [{ label: "GitHub Repo", href: "#" }, { label: "Discord Chat", href: "#" }, { label: "Twitter News", href: "#" }, { label: "YouTube", href: "#" }] },
  { title: "Company", links: [{ label: "About Team", href: "#" }, { label: "Careers", href: "#" }, { label: "Privacy Policy", href: "#" }, { label: "Security", href: "#" }] },
  ],
  snapshot: [
    {
      title: "Components",
      links: [
        { label: "Buttons", href: "#" },
        { label: "Bento Grid", href: "#" },
        { label: "Dialog", href: "#" },
        { label: "Carousel", href: "#" },
        { label: "Navigation", href: "#" },
        { label: "Footer", href: "#", badge: "New" },
        { label: "All Catalog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub", href: "#" },
        { label: "Discord", href: "#" },
        { label: "X / Twitter", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ],
  "modern-stack": [
    {
      title: "Components",
      links: [
        { label: "Buttons", href: "#" },
        { label: "Bento Grid", href: "#" },
        { label: "Dialog", href: "#" },
        { label: "Carousel", href: "#" },
        { label: "Navigation", href: "#" },
        { label: "Footer", href: "#", badge: "New" },
        { label: "All Catalog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub", href: "#" },
        { label: "Discord", href: "#" },
        { label: "X / Twitter", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ],
  "snapshot-stack": [
    {
      title: "Components",
      links: [
        { label: "Buttons", href: "#" },
        { label: "Bento Grid", href: "#" },
        { label: "Dialog", href: "#" },
        { label: "Carousel", href: "#" },
        { label: "Navigation", href: "#" },
        { label: "Footer", href: "#", badge: "New" },
        { label: "All Catalog", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Documentation", href: "#" },
        { label: "Templates", href: "#" },
        { label: "Changelog", href: "#" },
        { label: "Roadmap", href: "#" },
        { label: "FAQ", href: "#" },
      ],
    },
    {
      title: "Community",
      links: [
        { label: "GitHub", href: "#" },
        { label: "Discord", href: "#" },
        { label: "X / Twitter", href: "#" },
        { label: "YouTube", href: "#" },
        { label: "LinkedIn", href: "#" },
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/*  Snapshot variant                                                          */
/* -------------------------------------------------------------------------- */

const DEFAULT_SNAPSHOT_CARDS: SnapshotCardData[] = [
  {
    dotColor: "bg-emerald-500",
    tag: "DESIGN SYSTEM",
    meta: "V4.2",
    title: "Precision Craft",
    lines: [
      "Pixel-perfect tokens,",
      "Tailwind CSS v4 & React 19,",
      "accessible by default.",
    ],
    footerLabel: "STATUS",
    footerValue: "Production",
  },
  {
    dotColor: "bg-blue-500",
    tag: "COMPONENTS",
    meta: "60+",
    title: "Modular Blocks",
    lines: [
      "Copy-paste ready,",
      "zero bloat architecture,",
      "fluid spring physics.",
    ],
    footerLabel: "LIBRARY",
    footerValue: "TypeScript",
  },
  {
    dotColor: "bg-primary",
    tag: "AVARA STUDIO",
    meta: "HQ • 2026",
    title: "Avara Studio",
    lines: [
      "Level 4, Innovation Park",
      "Dhaka 1212, Bangladesh",
      "+880 1700 000 000",
    ],
    footerLabel: "HOURS",
    footerValue: "Mon–Fri, 9–6",
    stickerText: "say hi!",
  },
  {
    dotColor: "bg-amber-500",
    tag: "PERFORMANCE",
    meta: "60 FPS",
    title: "Silky Motion",
    lines: [
      "GPU accelerated,",
      "reduced-motion aware,",
      "smooth micro-interactions.",
    ],
    footerLabel: "ENGINE",
    footerValue: "Framer Motion",
  },
  {
    dotColor: "bg-violet-500",
    tag: "OPEN SOURCE",
    meta: "FREE",
    title: "Community First",
    lines: [
      "MIT licensed forever,",
      "built by developers,",
      "for ambitious creators.",
    ],
    footerLabel: "LICENSE",
    footerValue: "MIT Free",
  },
  {
    dotColor: "bg-rose-500",
    tag: "ECOSYSTEM",
    meta: "24/7",
    title: "Active Support",
    lines: [
      "Discord & GitHub community,",
      "regular monthly drops,",
      "developer-first docs.",
    ],
    footerLabel: "UPDATES",
    footerValue: "Weekly",
  },
];

/** Multi-colored modern stack cards matching the vivid, lively palette of ModernScrollStackBlock with rounded badges on all cards. */
export const DEFAULT_MODERN_STACK_CARDS: SnapshotCardData[] = [
  {
    bgColor: "#98E3AD",
    textColor: "#1A4325",
    dotColor: "bg-[#1A4325]",
    tag: "DESIGN SYSTEM",
    meta: "V4.2",
    title: "Precision Craft",
    lines: [
      "Pixel-perfect tokens,",
      "Tailwind CSS v4 & React 19,",
      "accessible by default.",
    ],
    footerLabel: "STATUS",
    footerValue: "Production",
    stickerText: "craft!",
    stickerIcon: <Sparkles className="size-4 min-[810px]:size-6" />,
  },
  {
    bgColor: "#EB5E30",
    textColor: "#FFFDF9",
    dotColor: "bg-white",
    tag: "COMPONENTS",
    meta: "60+",
    title: "Modular Blocks",
    lines: [
      "Copy-paste ready,",
      "zero bloat architecture,",
      "fluid spring physics.",
    ],
    footerLabel: "LIBRARY",
    footerValue: "TypeScript",
    stickerText: "blocks!",
    stickerIcon: <Layers className="size-4 min-[810px]:size-6" />,
  },
  {
    bgColor: "#F7C844",
    textColor: "#2B1C06",
    dotColor: "bg-[#2B1C06]",
    tag: "AVARA STUDIO",
    meta: "HQ • 2026",
    title: "Avara Studio",
    lines: [
      "Level 4, Innovation Park",
      "Dhaka 1212, Bangladesh",
      "+880 1700 000 000",
    ],
    footerLabel: "HOURS",
    footerValue: "Mon–Fri, 9–6",
    stickerText: "say hi!",
    stickerIcon: <SnapshotWaveHandIcon />,
  },
  {
    bgColor: "#4086D6",
    textColor: "#FFFFFF",
    dotColor: "bg-white",
    tag: "PERFORMANCE",
    meta: "60 FPS",
    title: "Silky Motion",
    lines: [
      "GPU accelerated,",
      "reduced-motion aware,",
      "smooth micro-interactions.",
    ],
    footerLabel: "ENGINE",
    footerValue: "Framer Motion",
    stickerText: "60 fps!",
    stickerIcon: <Zap className="size-4 min-[810px]:size-6 fill-current" />,
  },
  {
    bgColor: "#1E1B4B",
    textColor: "#EEF2FF",
    dotColor: "bg-indigo-300",
    tag: "OPEN SOURCE",
    meta: "FREE",
    title: "Community First",
    lines: [
      "MIT licensed forever,",
      "built by developers,",
      "for ambitious creators.",
    ],
    footerLabel: "LICENSE",
    footerValue: "MIT Free",
    stickerText: "free!",
    stickerIcon: <Heart className="size-4 min-[810px]:size-6 fill-current" />,
  },
  {
    bgColor: "#065F46",
    textColor: "#ECFDF5",
    dotColor: "bg-emerald-300",
    tag: "ECOSYSTEM",
    meta: "24/7",
    title: "Active Support",
    lines: [
      "Discord & GitHub community,",
      "regular monthly drops,",
      "developer-first docs.",
    ],
    footerLabel: "UPDATES",
    footerValue: "Weekly",
    stickerText: "join!",
    stickerIcon: <GlobeIcon className="size-4 min-[810px]:size-6" />,
  },
];

function isDarkColor(hex?: string): boolean {
  if (!hex || !hex.startsWith("#")) return false;
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16) || 0;
  const g = parseInt(c.substring(2, 4), 16) || 0;
  const b = parseInt(c.substring(4, 6), 16) || 0;
  return (r * 299 + g * 587 + b * 114) / 1000 < 140;
}

const SNAPSHOT_DEFAULTS: Required<SnapshotFooterContent> = {
  headingLines: ["Design freely.", "Ship extraordinary apps."],
  description:
    "Avara UI is an open collection of modern, production-ready React and Tailwind components. Built with precision craft, silky smooth animations, and clean ergonomics for ambitious developers and designers.",
  taglineLines: ["Modern components.", "Infinite creativity.", "Built for everyone."],
  cards: DEFAULT_SNAPSHOT_CARDS,
  photos: [],
  address: ["Avara Studio", "Level 4, Innovation Park", "Dhaka 1212, Bangladesh", "+880 1700 000 000"],
  hours: "Mon–Fri, 9–6",
  stickerText: "say hi!",
  legalLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};

type SnapshotBreakpoint = "phone" | "tablet" | "desktop";

/** Mirrors the source's three layouts: <810px, 810–1199px and ≥1200px. */
function useSnapshotBreakpoint(): SnapshotBreakpoint {
  const [bp, setBp] = React.useState<SnapshotBreakpoint>("desktop");
  React.useEffect(() => {
    const tablet = window.matchMedia("(min-width: 810px)");
    const desktop = window.matchMedia("(min-width: 1200px)");
    const sync = () => setBp(desktop.matches ? "desktop" : tablet.matches ? "tablet" : "phone");
    sync();
    tablet.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      tablet.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);
  return bp;
}

const SNAPSHOT_HOVER_SPRING = { type: "spring", bounce: 0.22, duration: 0.45 } as const;
const SNAPSHOT_EASE = [0.22, 1, 0.36, 1] as const;

interface SnapshotPileItem {
  cardIndex: number;
  className: string;
  rest: number;
  hoverRotate: number;
  lift: Record<SnapshotBreakpoint, number>;
  enterY: number;
  delay: number;
  isCenter?: boolean;
}

/**
 * Positions, tilts and lift coordinates matching the card pocket pile:
 * DOM Order: Card 0 -> Card 1 -> Studio Card 2 -> Card 3 -> Card 4 -> Card 5
 */
const SNAPSHOT_PILE: SnapshotPileItem[] = [
  {
    cardIndex: 0,
    className:
      "w-[145px] h-[220px] top-[90px] left-[17%] min-[810px]:w-[190px] min-[810px]:h-[285px] min-[810px]:top-[120px] min-[810px]:left-[12%] min-[1200px]:w-[215px] min-[1200px]:h-[295px] min-[1200px]:top-[130px] min-[1200px]:left-[11%]",
    rest: 4,
    hoverRotate: -3,
    lift: { phone: -82, tablet: -128, desktop: -158 },
    enterY: 90,
    delay: 0,
  },
  {
    cardIndex: 1,
    className:
      "hidden min-[810px]:block min-[810px]:w-[190px] min-[810px]:h-[285px] min-[810px]:top-[170px] min-[810px]:left-[25%] min-[1200px]:w-[215px] min-[1200px]:h-[295px] min-[1200px]:top-[182px] min-[1200px]:left-[22%]",
    rest: -11,
    hoverRotate: -4,
    lift: { phone: -178, tablet: -178, desktop: -205 },
    enterY: 70,
    delay: 0.06,
  },
  {
    cardIndex: 2,
    isCenter: true,
    className:
      "w-[160px] h-[220px] top-[60px] left-[calc(49%-80px)] min-[810px]:w-[220px] min-[810px]:h-[300px] min-[810px]:top-[65px] min-[810px]:left-[calc(42%-110px)] min-[1200px]:top-[78px] min-[1200px]:left-[calc(39.3%-110px)]",
    rest: -1,
    hoverRotate: -2,
    lift: { phone: -80, tablet: -112, desktop: -112 },
    enterY: 90,
    delay: 0.12,
  },
  {
    cardIndex: 3,
    className:
      "w-[145px] h-[220px] top-[80px] left-[87%] min-[810px]:w-[190px] min-[810px]:h-[285px] min-[810px]:top-[100px] min-[810px]:left-[78%] min-[1200px]:w-[215px] min-[1200px]:h-[295px] min-[1200px]:top-[112px] min-[1200px]:left-[71%]",
    rest: -4,
    hoverRotate: 5,
    lift: { phone: -72, tablet: -110, desktop: -140 },
    enterY: 90,
    delay: 0.24,
  },
  {
    cardIndex: 4,
    className:
      "hidden min-[810px]:block min-[810px]:w-[190px] min-[810px]:h-[285px] min-[810px]:top-[150px] min-[810px]:left-[65%] min-[1200px]:w-[215px] min-[1200px]:h-[295px] min-[1200px]:top-[162px] min-[1200px]:left-[56%]",
    rest: -5,
    hoverRotate: 4,
    lift: { phone: -158, tablet: -158, desktop: -188 },
    enterY: 90,
    delay: 0.18,
  },
  {
    cardIndex: 5,
    className:
      "hidden min-[810px]:block min-[810px]:w-[190px] min-[810px]:h-[285px] min-[810px]:top-[104px] min-[810px]:left-[91%] min-[1200px]:w-[215px] min-[1200px]:h-[295px] min-[1200px]:top-[118px] min-[1200px]:left-[89%]",
    rest: 9,
    hoverRotate: 12,
    lift: { phone: -112, tablet: -112, desktop: -140 },
    enterY: 90,
    delay: 0.3,
  },
];

/** Framer waving hand icon SVG */
function SnapshotWaveHandIcon() {
  return (
    <svg
      className="size-5 min-[810px]:size-7"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 16.988 6.753 L 15.369 3.941 C 14.848 3.051 13.707 2.75 12.814 3.265 C 11.921 3.78 11.612 4.92 12.122 5.816 L 9.309 0.941 C 8.791 0.042 7.643 -0.267 6.745 0.251 C 5.846 0.769 5.537 1.917 6.055 2.816 L 6.055 2.816 L 5.406 1.691 C 4.889 0.794 3.742 0.486 2.845 1.004 C 1.948 1.522 1.64 2.669 2.158 3.566 L 3.493 5.878 C 2.972 4.989 1.83 4.688 0.938 5.203 C 0.045 5.718 -0.264 6.857 0.245 7.753 L 3.997 14.253 C 6.068 17.84 10.655 19.07 14.243 16.999 C 17.83 14.928 19.059 10.34 16.988 6.753 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3.006 2.997)"
      />
      <path
        d="M 0.245 2.802 C -0.264 1.906 0.045 0.767 0.938 0.252 C 1.83 -0.264 2.972 0.038 3.493 0.927 L 6.305 5.802"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(8.816 3.01)"
      />
      <path
        d="M 1.586 5.126 L 0.251 2.813 C -0.266 1.916 0.041 0.769 0.938 0.251 C 1.835 -0.266 2.982 0.041 3.5 0.938 L 6.422 6.001"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(4.912 3.749)"
      />
      <path
        d="M 0 0 C 1.253 0.331 2.322 1.148 2.969 2.271 L 3 2.324"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(18 3.167)"
      />
      <path
        d="M 2.589 3 C 1.543 2.174 0.665 1.155 0 0"
        fill="transparent"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(4.406 18.75)"
      />
    </svg>
  );
}

/** Sleek modern studio card: clean hierarchy, active status, optional custom background/palette, and interactive animated "say hi!" sticker. */
function SnapshotStudioCard({
  card,
  bp,
  isModernStack,
}: {
  card: SnapshotCardData;
  bp: SnapshotBreakpoint;
  isModernStack?: boolean;
}) {
  const isMobile = bp === "phone";
  const isStudioHQ = Boolean(card.stickerText);
  const hasCustomBg = Boolean(card.bgColor);
  const isDarkCard = hasCustomBg ? isDarkColor(card.bgColor) : false;

  return (
    <div className="relative size-full select-none cursor-pointer">
      {/* Sleek Modern Studio Card */}
      <div
        className={cn(
          "size-full flex flex-col justify-between overflow-hidden rounded-2xl p-3.5 min-[810px]:p-5 transition-all cursor-pointer",
          isModernStack
            ? "border"
            : hasCustomBg
            ? "border shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18),0_2px_8px_-1px_rgba(0,0,0,0.06)] dark:shadow-[0_16px_36px_-10px_rgba(0,0,0,0.65)]"
            : "border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/95 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.08),0_2px_6px_-1px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.6)]"
        )}
        style={
          hasCustomBg
            ? {
                backgroundColor: card.bgColor,
                color: card.textColor ?? (isDarkCard ? "#FFFFFF" : "#18181b"),
                borderColor: isDarkCard
                  ? "rgba(255, 255, 255, 0.18)"
                  : "rgba(0, 0, 0, 0.12)",
              }
            : undefined
        }
      >
        {/* Top Header Row */}
        <div>
          <div
            className="flex items-center justify-between pb-2 min-[810px]:pb-2.5 border-b"
            style={{
              borderColor: hasCustomBg
                ? isDarkCard
                  ? "rgba(255,255,255,0.16)"
                  : "rgba(0,0,0,0.1)"
                : undefined,
            }}
          >
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span
                className={cn(
                  "size-2 shrink-0 rounded-full animate-pulse",
                  !hasCustomBg && (card.dotColor ?? "bg-primary"),
                  hasCustomBg && card.dotColor
                )}
                style={
                  hasCustomBg && !card.dotColor
                    ? { backgroundColor: card.textColor ?? "currentColor" }
                    : undefined
                }
              />
              <span
                className={cn(
                  "text-[9.5px] min-[810px]:text-[11px] font-semibold tracking-wider uppercase font-sans truncate",
                  !hasCustomBg &&
                    (isStudioHQ ? "text-primary" : "text-zinc-600 dark:text-zinc-300")
                )}
                style={
                  hasCustomBg
                    ? { color: card.textColor ?? "inherit", opacity: 0.95 }
                    : undefined
                }
              >
                {card.tag}
              </span>
            </div>
            <span
              className={cn(
                "text-[9px] min-[810px]:text-[10px] font-mono tracking-tight uppercase shrink-0 pl-1",
                !hasCustomBg && "text-zinc-400 dark:text-zinc-500"
              )}
              style={
                hasCustomBg
                  ? { color: card.textColor ?? "inherit", opacity: 0.72 }
                  : undefined
              }
            >
              {card.meta}
            </span>
          </div>

          {/* Details / Content */}
          <div className="mt-2.5 min-[810px]:mt-3 flex flex-col gap-1 text-left font-sans">
            <h4
              className={cn(
                "text-[12.5px] min-[810px]:text-[15px] font-bold tracking-tight leading-tight",
                !hasCustomBg && "text-zinc-900 dark:text-zinc-100"
              )}
              style={hasCustomBg ? { color: card.textColor ?? "inherit" } : undefined}
            >
              {card.title}
            </h4>
            {card.lines.map((line, idx) => (
              <p
                key={idx}
                className={cn(
                  "text-[10px] min-[810px]:text-[12px] leading-snug",
                  !hasCustomBg &&
                    (idx === card.lines.length - 1 && line.startsWith("+")
                      ? "font-semibold text-zinc-800 dark:text-zinc-200 pt-0.5"
                      : "text-zinc-600 dark:text-zinc-400")
                )}
                style={
                  hasCustomBg
                    ? {
                        color: card.textColor ?? "inherit",
                        opacity:
                          idx === card.lines.length - 1 && line.startsWith("+")
                            ? 1
                            : 0.82,
                        fontWeight:
                          idx === card.lines.length - 1 && line.startsWith("+")
                            ? 600
                            : 400,
                      }
                    : undefined
                }
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* Operating / Metric Row */}
        {(card.footerLabel || card.footerValue) && (
          <div
            className="pt-2 border-t flex items-center justify-between font-sans"
            style={{
              borderColor: hasCustomBg
                ? isDarkCard
                  ? "rgba(255,255,255,0.16)"
                  : "rgba(0,0,0,0.1)"
                : undefined,
            }}
          >
            <span
              className={cn(
                "text-[9px] min-[810px]:text-[10px] uppercase tracking-wider font-medium",
                !hasCustomBg && "text-zinc-400 dark:text-zinc-500"
              )}
              style={
                hasCustomBg
                  ? { color: card.textColor ?? "inherit", opacity: 0.7 }
                  : undefined
              }
            >
              {card.footerLabel ?? "Status"}
            </span>
            <span
              className={cn(
                "text-[9.5px] min-[810px]:text-[11px] font-medium px-2 py-0.5 rounded-full transition-colors",
                !hasCustomBg &&
                  (isStudioHQ
                    ? "text-primary bg-primary/10 border border-primary/20"
                    : "text-zinc-700 dark:text-zinc-300 bg-zinc-100/90 dark:bg-zinc-800")
              )}
              style={
                hasCustomBg
                  ? {
                      backgroundColor: isDarkCard
                        ? "rgba(255, 255, 255, 0.16)"
                        : "rgba(0, 0, 0, 0.08)",
                      border: isDarkCard
                        ? "1px solid rgba(255, 255, 255, 0.22)"
                        : "1px solid rgba(0, 0, 0, 0.12)",
                      color: card.textColor ?? "inherit",
                    }
                  : undefined
              }
            >
              {card.footerValue}
            </span>
          </div>
        )}
      </div>

      {/* Floating Circular Sticker if card has stickerText */}
      {card.stickerText && (
        <motion.div
          variants={{
            rest: { y: 0, rotate: isModernStack ? -20 : -24 },
            hover: {
              y: isModernStack
                ? (isMobile ? -132 : -188)
                : (isMobile ? -176 : -244),
              rotate: isModernStack ? -7 : -8,
            },
          }}
          transition={{ type: "spring", bounce: 0.45, delay: 0.05, duration: 0.6 }}
          className={cn(
            "absolute -left-2 top-[246px] flex flex-col items-center justify-center rounded-full border-white dark:border-zinc-900 bg-primary text-primary-foreground cursor-pointer z-20 pointer-events-none",
            isModernStack
              ? "size-[64px] min-[810px]:-left-3 min-[810px]:top-[336px] min-[810px]:size-[82px] border-3 min-[810px]:border-4 shadow-none"
              : "size-[70px] min-[810px]:-left-3.5 min-[810px]:top-[336px] min-[810px]:size-[92px] border-4 min-[810px]:border-[5px] shadow-[0_12px_24px_-6px_color-mix(in_oklab,var(--primary)_50%,transparent)]"
          )}
        >
          {card.stickerIcon ?? <SnapshotWaveHandIcon />}
          <span
            className={cn(
              "mt-0.5 leading-none text-primary-foreground font-bold tracking-tight uppercase",
              isModernStack
                ? "text-[10px] min-[810px]:text-[11.5px]"
                : "text-[11px] min-[810px]:text-[13px]"
            )}
            style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
          >
            {card.stickerText}
          </span>
        </motion.div>
      )}
    </div>
  );
}

/**
 * Studio footer with a pile of cards sunk behind the divider. Each card sits
 * mostly below the fold of the top section and rises on hover/press.
 */
function SnapshotFooter({
  brandName,
  logo,
  copyrightText,
  sections,
  content,
  isModernStack,
  socialLinks = DEFAULT_SOCIAL_LINKS,
}: {
  brandName: string;
  logo?: React.ReactNode;
  copyrightText?: string;
  sections: FooterLinkSection[];
  content?: SnapshotFooterContent;
  isModernStack?: boolean;
  socialLinks?: SocialLink[];
}) {
  const c = { ...SNAPSHOT_DEFAULTS, ...content };
  const bp = useSnapshotBreakpoint();
  const reduceMotion = useReducedMotion();
  const wordmark = brandName;
  const copyright =
    copyrightText ??
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;
  const [line1, line2, line3] = c.taglineLines;
  let wordIndex = 0;

  const baseCards =
    content?.cards ??
    (isModernStack ? DEFAULT_MODERN_STACK_CARDS : DEFAULT_SNAPSHOT_CARDS);

  return (
    <div
      className="w-full bg-[#faf8f5] dark:bg-[#0c0c0e] text-[#18181b] dark:text-[#f4f4f5] antialiased transition-colors"
      style={{ fontFamily: '"Switzer", "Inter", ui-sans-serif, system-ui, sans-serif' }}
    >
      <style>{`@import url('https://api.fontshare.com/v2/css?f[]=switzer@400,500,600&display=swap');@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');`}</style>

      {/* Top: intro + photo pile, clipped at the divider */}
      <div className="relative flex w-full justify-center overflow-hidden">
        <div className="flex w-full max-w-[1440px] flex-col items-center gap-11 px-5 pt-[72px] min-[810px]:gap-14 min-[810px]:px-8 min-[810px]:pt-24 min-[1200px]:gap-16 min-[1200px]:px-10 min-[1200px]:pt-[120px]">
          {isModernStack ? (
            <div className="flex w-full flex-col gap-6 min-[810px]:gap-8 min-[1200px]:flex-row min-[1200px]:items-end min-[1200px]:justify-between min-[1200px]:gap-12">
              <div className="flex flex-col gap-3.5 min-[1200px]:flex-1">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.6, ease: SNAPSHOT_EASE }}
                  className="flex items-center gap-2"
                >
                  <span className="size-2 rounded-full bg-primary" />
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-primary">
                    Curated Component Library
                  </span>
                </motion.div>

                <h2 className="text-[36px] min-[810px]:text-[48px] min-[1200px]:text-[56px] font-bold leading-[1.04] tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
                  {c.headingLines.map((line, li) => (
                    <React.Fragment key={li}>
                      {li > 0 && <br />}
                      <span className={li === c.headingLines.length - 1 ? "text-primary font-bold" : undefined}>
                        {line}
                      </span>
                    </React.Fragment>
                  ))}
                </h2>
              </div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.8, delay: 0.2, ease: SNAPSHOT_EASE }}
                className="w-full min-[810px]:max-w-[560px] min-[1200px]:w-[480px] min-[1200px]:max-w-none min-[1200px]:shrink-0 border-l-2 border-primary/25 pl-5 min-[810px]:pl-6"
              >
                <p className="text-[15px] min-[1200px]:text-[16px] leading-[1.65] text-zinc-600 dark:text-zinc-400 font-normal tracking-[-0.01em] [text-wrap:pretty]">
                  {c.description}
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="flex w-full flex-col gap-4 min-[810px]:gap-5 min-[1200px]:flex-row min-[1200px]:gap-10">
              <h2 className="text-[34px] min-[810px]:text-[44px] min-[1200px]:flex-1 min-[1200px]:text-[48px] font-medium leading-[1.05] tracking-[-0.035em] text-[#09090b] dark:text-zinc-100">
                {c.headingLines.map((line, li) => (
                  <React.Fragment key={li}>
                    {li > 0 && <br />}
                    {line.split(" ").map((word, wi) => {
                      const i = wordIndex++;
                      return (
                        <React.Fragment key={wi}>
                          {wi > 0 && " "}
                          <motion.span
                            className="inline-block"
                            initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
                            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.7, delay: i * 0.05, ease: SNAPSHOT_EASE }}
                          >
                            {word}
                          </motion.span>
                        </React.Fragment>
                      );
                    })}
                  </React.Fragment>
                ))}
              </h2>
              <motion.p
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.9, delay: 0.3, ease: SNAPSHOT_EASE }}
                className="w-full text-[15px] min-[810px]:max-w-[560px] min-[1200px]:w-[460px] min-[1200px]:max-w-none min-[1200px]:shrink-0 min-[1200px]:text-base leading-[1.55] tracking-[-0.01em] text-[#52525b] dark:text-zinc-400 [text-wrap:pretty]"
              >
                {c.description}
              </motion.p>
            </div>
          )}

          {/* Card pocket pile */}
          <div className="relative h-[200px] w-full max-w-[420px] min-[810px]:h-[250px] min-[810px]:max-w-[820px] min-[1200px]:h-[280px] min-[1200px]:max-w-[1240px] select-none">
            {SNAPSHOT_PILE.map((item, idx) => {
              const cardData =
                (content?.cards && content.cards[item.cardIndex]) ??
                baseCards[item.cardIndex];
              if (!cardData) return null;

              // Merge studio address/hours/sticker onto center card if customized
              const resolvedCard: SnapshotCardData =
                item.isCenter
                  ? {
                      ...cardData,
                      lines: c.address && c.address.length > 0 ? c.address : cardData.lines,
                      footerValue: c.hours ?? cardData.footerValue,
                      stickerText: c.stickerText ?? cardData.stickerText,
                    }
                  : cardData;

              return (
                <motion.div
                  key={idx}
                  className={cn("absolute hover:z-20 focus-within:z-20", item.className)}
                  style={!item.isCenter ? { x: "-50%" } : undefined}
                  initial={reduceMotion ? false : { y: item.enterY, rotate: -6 }}
                  whileInView={{ y: 0, rotate: item.rest }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ type: "spring", bounce: 0.22, duration: 0.9, delay: item.delay }}
                >
                  <motion.div
                    tabIndex={0}
                    initial="rest"
                    whileHover="hover"
                    whileTap="hover"
                    whileFocus="hover"
                    variants={{
                      rest: { y: 0, rotate: 0 },
                      hover: {
                        y: item.lift[bp],
                        rotate: item.hoverRotate - item.rest,
                        scale: 1.02,
                      },
                    }}
                    transition={SNAPSHOT_HOVER_SPRING}
                    className="size-full cursor-pointer outline-none"
                  >
                    <SnapshotStudioCard
                      card={resolvedCard}
                      bp={bp}
                      isModernStack={isModernStack}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-[#e5e2da] dark:bg-zinc-800/80" />

      {/* Bottom section: conditioned on isModernStack */}
      {isModernStack ? (
        /* Modern Stack enhanced bottom (Clean, Flat, Zero Shadow) */
        <div className="relative flex w-full justify-center overflow-hidden">
          <div className="relative z-10 flex w-full max-w-[1440px] flex-col gap-12 px-5 pt-12 pb-7 min-[810px]:gap-16 min-[810px]:px-8 min-[810px]:pt-16 min-[810px]:pb-8 min-[1200px]:gap-[72px] min-[1200px]:px-10 min-[1200px]:pt-[72px] min-[1200px]:pb-9">
            <div className="flex flex-col gap-12 min-[810px]:gap-14 min-[1200px]:flex-row min-[1200px]:justify-between min-[1200px]:gap-12">
              {/* Left: Brand & bold tagline */}
              <div className="flex flex-col gap-6 min-[810px]:gap-7 min-[1200px]:max-w-[460px]">
                {/* Brand without version badge */}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="group flex w-fit items-center gap-3 no-underline cursor-pointer"
                >
                  {logo ?? (
                    <img
                      src="/favicon/android-chrome-192x192.png"
                      alt={brandName}
                      width={28}
                      height={28}
                      className="size-7 rounded-[7px] object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  )}
                  <span className="text-[22px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 font-sans">
                    {wordmark}
                  </span>
                </a>

                {/* Typographic Tagline with crisp contrast */}
                <div className="flex flex-col gap-3">
                  <p className="text-[30px] min-[810px]:text-[38px] font-bold leading-[1.08] tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
                    <span>{line1}</span>
                    {line2 && (
                      <>
                        <br />
                        <span>{line2}</span>
                      </>
                    )}
                    {line3 && (
                      <>
                        <br />
                        <span className="text-primary font-bold">{line3}</span>
                      </>
                    )}
                  </p>
                  <p className="text-[14.5px] leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-[420px] font-normal tracking-[-0.01em]">
                    Crafted with precision tokens, silky micro-interactions, and zero-bloat architecture for ambitious builders.
                  </p>
                </div>
              </div>

              {/* Right: Modern structured navigation columns with theme color hover effects */}
              <nav
                aria-label="Footer Navigation"
                className="grid w-full grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 min-[810px]:gap-x-10 min-[1200px]:w-auto min-[1200px]:gap-x-12"
              >
                {sections.map((col) => (
                  <div
                    key={col.title}
                    className="flex flex-col gap-4 min-[810px]:w-[180px] min-[1200px]:w-[195px]"
                  >
                    <div className="flex items-center gap-2 pb-2.5 border-b border-zinc-200/80 dark:border-zinc-800/80">
                      <span className="size-2 rounded-full bg-primary" />
                      <p className="text-[11px] font-bold uppercase leading-none tracking-[0.1em] text-zinc-900 dark:text-zinc-200">
                        {col.title}
                      </p>
                    </div>
                    <ul className="flex flex-col gap-1">
                      {col.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            onClick={(e) => {
                              if (link.href === "#" || !link.href) e.preventDefault();
                            }}
                            className="group flex items-center justify-between py-1.5 px-2.5 -mx-2.5 rounded-lg text-[13.5px] font-medium text-zinc-600 dark:text-zinc-400 no-underline transition-all duration-200 cursor-pointer border border-transparent hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary dark:hover:text-primary hover:border-primary/20"
                          >
                            <span className="group-hover:translate-x-1 transition-transform duration-200 flex items-center gap-1.5">
                              <ChevronRight className="size-3 text-primary opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 shrink-0" />
                              <span>{link.label}</span>
                            </span>
                            {link.badge !== undefined && (
                              <span className="rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-[9.5px] font-bold leading-none uppercase tracking-wide">
                                {link.badge}
                              </span>
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom Bar: Copyright, Social Icons & Legal with Theme Color Hover */}
            <div className="pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80 flex flex-col gap-6 sm:gap-4 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between text-[13px] text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <p className="leading-none">{copyright}</p>
              </div>

              <SocialLinks
                links={socialLinks}
                size="sm"
                variant="ghost"
                className="justify-start min-[810px]:justify-center [&_a:hover]:bg-primary/10 [&_a:hover]:text-primary [&_a]:transition-all [&_a]:duration-200 hover:[&_a]:scale-110"
              />

              <div className="flex items-center gap-5">
                {c.legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "#" || !link.href) e.preventDefault();
                    }}
                    className="leading-none text-zinc-500 dark:text-zinc-400 no-underline transition-colors duration-150 hover:text-primary dark:hover:text-primary cursor-pointer text-xs font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Original Snapshot variant bottom section */
        <div className="flex w-full justify-center">
          <div className="flex w-full max-w-[1440px] flex-col gap-12 px-5 pt-12 pb-7 min-[810px]:gap-16 min-[810px]:px-8 min-[810px]:pt-16 min-[810px]:pb-8 min-[1200px]:gap-[88px] min-[1200px]:px-10 min-[1200px]:pt-[72px] min-[1200px]:pb-9">
            <div className="flex flex-col gap-12 min-[810px]:gap-14 min-[1200px]:flex-row min-[1200px]:gap-10">
              <div className="flex flex-col gap-7 min-[810px]:gap-10 min-[1200px]:flex-1 min-[1200px]:justify-between min-[1200px]:self-stretch">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex w-fit items-center gap-2.5 no-underline cursor-pointer"
                >
                  {logo ?? (
                    <img
                      src="/favicon/android-chrome-192x192.png"
                      alt={brandName}
                      width={22}
                      height={22}
                      className="size-[22px] rounded-[5px]"
                    />
                  )}
                  <span className="text-[20px] font-semibold leading-none tracking-[-0.03em] text-[#09090b] dark:text-zinc-100">
                    {wordmark}
                  </span>
                </a>
                <p className="text-[26px] min-[810px]:text-[28px] font-medium leading-[1.15] tracking-[-0.03em]">
                  <span className="text-[#09090b] dark:text-zinc-100">{line1}</span>
                  {line2 && (
                    <>
                      <br />
                      <span className="text-[#09090b] dark:text-zinc-100">{line2}</span>
                    </>
                  )}
                  {line3 && (
                    <>
                      <br />
                      <span className="text-primary font-medium">{line3}</span>
                    </>
                  )}
                </p>
              </div>

              <nav
                aria-label="Footer"
                className="grid w-full grid-cols-2 gap-x-5 gap-y-10 min-[810px]:flex min-[810px]:gap-0 min-[1200px]:w-auto"
              >
                {sections.map((col) => (
                  <div
                    key={col.title}
                    className="flex flex-col gap-[22px] min-[810px]:flex-1 min-[1200px]:w-[190px] min-[1200px]:flex-none"
                  >
                    <p className="text-[11px] font-medium uppercase leading-none tracking-[0.08em] text-[#84827c] dark:text-zinc-400">
                      {col.title}
                    </p>
                    <ul className="flex flex-col gap-3">
                      {col.links.map((link) => (
                        <li key={link.label} className="flex items-center gap-2">
                          <a
                            href={link.href}
                            onClick={(e) => {
                              if (link.href === "#" || !link.href) e.preventDefault();
                            }}
                            className="text-[15px] leading-[1.4] tracking-[-0.01em] text-[#18181b] dark:text-zinc-200 no-underline transition-colors duration-200 hover:text-primary dark:hover:text-primary cursor-pointer"
                          >
                            {link.label}
                          </a>
                          {link.badge !== undefined && (
                            <span className="rounded-[20px] bg-primary px-1.5 py-0.5 text-[11px] font-semibold leading-none tabular-nums text-primary-foreground">
                              {link.badge}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            </div>

            <div className="flex flex-col items-start gap-3 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between">
              <p className="text-[13px] leading-none text-[#84827c] dark:text-zinc-500">{copyright}</p>
              <div className="flex items-center gap-6">
                {c.legalLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => {
                      if (link.href === "#" || !link.href) e.preventDefault();
                    }}
                    className="text-[13px] leading-none text-[#84827c] dark:text-zinc-400 no-underline transition-colors duration-200 hover:text-primary dark:hover:text-primary cursor-pointer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/** The wordmark, or whatever `logo` was passed instead of it. */
function BrandLogo({ logo, brandName }: Pick<FooterProps, "logo" | "brandName">) {
  return (
  <div className="flex items-center gap-2.5 select-none">
    {logo || (
      <div className="relative flex items-center justify-center">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-[24px]"
        >
          <rect x="3" y="3" width="7" height="7" rx="1.5" className="fill-foreground" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" className="fill-primary" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" className="fill-foreground" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" className="fill-primary" />
        </svg>
      </div>
    )}
    <span className="font-extrabold text-base sm:text-lg tracking-tight text-foreground flex items-center gap-1.5">
      {brandName === "Avara UI" ? "Docs" : brandName}{" "}
      <span className="text-primary font-normal">UI</span>
      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
        v1.0
      </span>
    </span>
  </div>
  );
}

export function Footer({
  variant = "simple-centered",
  color,
  brandName = "Avara UI",
  logo,
  tagline = "Elevate your web applications with fluid, production-ready animated components.",
  copyrightText,
  sections,
  socialLinks = DEFAULT_SOCIAL_LINKS,
  snapshot,
  className,
}: FooterProps) {
  const dynamicAccent = accentStyle(color);
  const linkSections = sections ?? DEFAULT_SECTIONS_BY_VARIANT[variant];
  const copyright =
    copyrightText ??
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  if (variant === "snapshot" || variant === "modern-stack" || variant === "snapshot-stack") {
    const isModernStack = variant === "modern-stack" || variant === "snapshot-stack";
    return (
      <footer style={dynamicAccent} className={cn("w-full overflow-hidden transition-colors", className)}>
        <SnapshotFooter
          brandName={brandName}
          logo={logo}
          copyrightText={copyrightText}
          sections={linkSections}
          content={snapshot}
          isModernStack={isModernStack}
          socialLinks={socialLinks}
        />
      </footer>
    );
  }

  return (
    <footer
      style={dynamicAccent}
      className={cn("w-full bg-background border-t border-border/80 text-foreground transition-all overflow-hidden", className)}
    >
      {/* 1. SIMPLE CENTERED */}
      {variant === "simple-centered" && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 flex flex-col items-center justify-center text-center gap-8 sm:gap-10">
          <BrandLogo logo={logo} brandName={brandName} />
          
          <div className="max-w-xl space-y-3 px-2">
            <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">Build faster with modern component building blocks</h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{tagline}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-muted/40 border border-border max-w-2xl w-full">
            {linkSections
              .flatMap((section) => section.links)
              .map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-primary hover:bg-background transition-all flex items-center gap-1.5 group"
                >
                  <ChevronRight className="size-3 text-primary/60 group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                  <span>{link.label}</span>
                </a>
              ))}
          </div>

          <div className="pt-2">
            <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
          </div>

          <div className="w-full border-t border-border/60 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <div className="flex items-center gap-2">
              <GlobeIcon className="size-3.5 text-primary" />
              <span>English (US)</span>
              <span className="text-border">•</span>
              <span>USD ($)</span>
            </div>
            <span>{copyright}</span>
            <div className="flex items-center gap-1">
              <span>Crafted with</span>
              <Heart className="size-3.5 text-rose-500 fill-rose-500" />
              <span>for developers.</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. GLASS DOCK */}
      {variant === "glass-dock" && (
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 space-y-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-card/80 backdrop-blur-2xl border border-border shadow-2xl space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <BrandLogo logo={logo} brandName={brandName} />
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">{tagline}</p>
              </div>
              <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-border/80 text-xs sm:text-sm">
              {linkSections.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Layers className="size-3 text-primary/70 group-hover:scale-110 transition-transform shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <span>{copyright}</span>
            <span>Crafted for high-end modern interfaces.</span>
          </div>
        </div>
      )}

      {/* 3. NEON GLOW PULSE (Supports both Day Mode & Night Mode Theme Adaptively) */}
      {variant === "neon-glow-pulse" && (
        <div className="w-full bg-primary/5 text-foreground py-16 sm:py-24 px-4 border-t border-primary/30 transition-colors">
          <div className="max-w-7xl mx-auto p-8 sm:p-12 rounded-3xl bg-card/90 border border-primary/40 shadow-[0_0_40px_color-mix(in_oklab,var(--primary)_15%,transparent)] dark:shadow-[0_0_50px_color-mix(in_oklab,var(--primary)_20%,transparent)] space-y-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-primary/20">
              <BrandLogo logo={logo} brandName={brandName} />
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 text-xs font-mono animate-pulse">
                <Cpu className="size-4" /> NEON MATRIX ONLINE (60 FPS)
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-xs sm:text-sm">
              {linkSections.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-primary uppercase tracking-wider text-xs">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Zap className="size-3 text-primary group-hover:scale-125 transition-transform shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-primary/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
              <span>{copyright}</span>
              <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
            </div>
          </div>
        </div>
      )}

      {/* 4. QUANTUM PARTICLE BEAM */}
      {variant === "quantum-particle-beam" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-primary/5 border border-primary/30 shadow-xl space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <BrandLogo logo={logo} brandName={brandName} />
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md">{tagline}</p>
              </div>
              <SocialLinks links={socialLinks} className="justify-center sm:justify-start" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-6 border-t border-primary/20 text-xs sm:text-sm">
              {linkSections.map((col, idx) => (
                <div key={idx} className="space-y-3">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-foreground">{col.title}</h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {col.links.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a href={link.href} className="hover:text-primary transition-colors flex items-center gap-1.5 group">
                          <Sparkles className="size-3 text-primary/70 group-hover:scale-110 transition-transform shrink-0" />
                          <span>{link.label}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left">
            <span>{copyright}</span>
            <span>Built for modern web applications.</span>
          </div>
        </div>
      )}
    </footer>
  );
}
