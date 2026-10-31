"use client";

import React, { useEffect, useRef } from "react";
import {
  Globe as GlobeIcon,
  Sparkles,
  ChevronRight,
  Heart,
  Layers,
  Cpu,
  Zap,
  Mail,
  ShieldCheck,
  Lock,
  Code2,
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Database,
} from "lucide-react";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";
import { accentStyle } from "@/lib/accent";
import { SocialLinks, type SocialLink } from "./SocialLinksBlock";
import CustomButton from "./Button";

export type FooterVariant =
  | "simple-centered"
  | "glass-dock"
  | "neon-glow-pulse"
  | "quantum-particle-beam"
  | "snapshot"
  | "modern-stack"
  | "snapshot-stack"
  | "wordmark-glow"
  | "editorial-card"
  | "tilted-cta"
  | "architectural-liquid"
  | "heron-blueprint"
  | "blueprint-liquid";

export interface ArchitecturalLiquidFooterProps {
  headline?: string;
  brandWordmark?: string;
  brandName?: string;
  color?: string;
  subscribeText?: string;
  addressLines?: string[];
  directionHref?: string;
  businessEmail?: string;
  inquiryEmail?: string;
  navColumns?: {
    title?: string;
    links: { label: string; href: string; active?: boolean }[];
  }[];
  socials?: { label: string; href: string }[];
  legalLinks?: { label: string; href: string }[];
  copyrightText?: string;
  className?: string;
}

export interface WordmarkFooterColumnItem {
  title: string;
  link: string;
}

export interface WordmarkFooterColumn {
  title: string;
  children: WordmarkFooterColumnItem[];
}

export interface WordmarkFooterContact {
  email?: string;
  location?: string;
}

export interface WordmarkFooterLabels {
  contact?: string;
  location?: string;
  social?: string;
}

export interface WordmarkFooterProps {
  logo?: React.ReactNode | string;
  logoDark?: string;
  logoHref?: string;
  tagline?: string;
  columns?: WordmarkFooterColumn[];
  contact?: WordmarkFooterContact;
  social?: { title: string; link: string }[];
  legal?: { title: string; link: string }[];
  labels?: WordmarkFooterLabels;
  copyright?: string;
  bottomLine?: string;
  wordmark?: string;
  className?: string;
}

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

export interface EditorialFooterProps {
  headline?: string;
  buttonText?: string;
  buttonHref?: string;
  onButtonClick?: () => void;
  city?: string;
  menuLinks?: { label: string; href?: string; disabled?: boolean }[];
  socialLinks?: { label: string; href: string }[];
  copyright?: string;
  rightsText?: string;
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
  /** Configuration and content for the `wordmark-glow` variant. */
  wordmarkFooter?: WordmarkFooterProps;
  /** Giant wordmark text for the `wordmark-glow` variant (default: "Algorize"). */
  wordmark?: string;
  /** Content and CTA config for the `editorial-card` / `tilted-cta` variant. */
  editorialCta?: EditorialFooterProps;
  /** Content and layout config for the `architectural-liquid` blueprint variant. */
  architecturalLiquid?: ArchitecturalLiquidFooterProps;
  /** Custom wordmark text for the architectural liquid wordmark (default: "AVARA UI"). */
  blueprintWordmark?: string;
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
  "wordmark-glow": DEFAULT_FOOTER_SECTIONS,
  "editorial-card": DEFAULT_FOOTER_SECTIONS,
  "tilted-cta": DEFAULT_FOOTER_SECTIONS,
  "architectural-liquid": DEFAULT_FOOTER_SECTIONS,
  "heron-blueprint": DEFAULT_FOOTER_SECTIONS,
  "blueprint-liquid": DEFAULT_FOOTER_SECTIONS,
};

const DEFAULT_WORDMARK_COLUMNS: WordmarkFooterColumn[] = [
  {
    title: "Solutions",
    children: [
      { title: "Enterprise", link: "#" },
      { title: "Business Process Outsourcing (BPO)", link: "#" },
      { title: "Staffing Agencies", link: "#" },
      { title: "Customer Service", link: "#" },
      { title: "Software Engineering", link: "#" },
      { title: "Consulting", link: "#" },
      { title: "Retail", link: "#" },
    ],
  },
  {
    title: "Product",
    children: [
      { title: "Product", link: "#" },
      { title: "Pricing", link: "#" },
      { title: "Case Studies", link: "#" },
      { title: "See Sample", link: "#" },
      { title: "Become a Partner", link: "#" },
      { title: "API", link: "#" },
    ],
  },
];

const DEFAULT_WORDMARK_CONTACT: WordmarkFooterContact = {
  email: "hello@example.com",
  location: "Remote-first team",
};

const DEFAULT_WORDMARK_SOCIAL = [
  { title: "Threads", link: "#" },
  { title: "LinkedIn", link: "#" },
  { title: "YouTube", link: "#" },
];

const DEFAULT_WORDMARK_LEGAL = [
  { title: "Legal Center", link: "#" },
];

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

/* -------------------------------------------------------------------------- */
/*  Wordmark variant (Giant rising wordmark with pointer glow)               */
/* -------------------------------------------------------------------------- */

const wordmarkHeadingClass = "mb-3 text-[0.8125rem] font-medium text-muted-foreground";
const wordmarkLinkClass = "text-[0.9375rem] text-foreground/80 hover:text-foreground transition-colors";

const wordmarkKeyframes = `
@keyframes footer-block-rise { from { transform: translateY(70%); } to { transform: none; } }
@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .footer-block-letter {
      animation: footer-block-rise linear both;
      animation-timeline: view();
      animation-range: entry calc(var(--i) * 4%) entry 100%;
    }
  }
}
`;

export function WordmarkFooter({
  logo,
  logoDark,
  logoHref = "/",
  tagline = "AI first-round screening for recruiters. Algorize checks every applicant and runs the first interview, day or night.",
  columns = DEFAULT_WORDMARK_COLUMNS,
  contact = DEFAULT_WORDMARK_CONTACT,
  social = DEFAULT_WORDMARK_SOCIAL,
  legal = DEFAULT_WORDMARK_LEGAL,
  labels = {},
  copyright = "Avara UI",
  bottomLine = "A person makes every hiring decision.",
  wordmark = "Algorize",
  className = "",
}: WordmarkFooterProps) {
  const { contact: contactLabel = "Talk to us", location: locationLabel = "Where we work", social: socialLabel = "Follow" } = labels;
  const wrapRef = useRef<HTMLDivElement>(null);

  // Writes the pointer position as --mx / --my for the glow, one write per frame.
  useEffect(() => {
    const node = wrapRef.current;
    if (!node || typeof window === "undefined" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return undefined;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        node.style.setProperty("--mx", `${x}px`);
        node.style.setProperty("--my", `${y}px`);
      });
    };
    node.addEventListener("pointermove", onMove);
    return () => {
      node.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  const renderedLogo = logo ? (
    typeof logo === "string" ? (
      <img src={logo} alt="Logo" className={cn("h-8 w-auto object-contain", logoDark ? "dark:hidden" : "")} />
    ) : (
      logo
    )
  ) : (
    <div className="flex items-center gap-2 select-none">
      <div className="relative flex items-center justify-center">
        <img
          src="/favicon/android-chrome-192x192.png"
          alt="Avara UI"
          width={24}
          height={24}
          className="size-6 object-contain"
        />
      </div>
      <span className="font-extrabold text-xl tracking-tight text-foreground flex items-center gap-1.5">
        Avara{" "}
        <span
          className="font-normal"
          style={{ color: "var(--brand, #9B8AFB)" }}
        >
          UI
        </span>
      </span>
    </div>
  );

  const yearStr = String(new Date().getFullYear());
  const displayCopyright = copyright.startsWith(yearStr)
    ? copyright
    : `${yearStr} ${copyright}`;
  const charRatio = wordmark ? Math.max(wordmark.length * 0.56, 2.5) : 4.5;

  return (
    <footer className={cn("relative w-full bg-background pt-[72px] text-foreground transition-colors overflow-hidden", className)}>
      <style>{wordmarkKeyframes}</style>

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.3fr_1fr]">
          <div className="grid max-w-[352px] content-start gap-3.5">
            <a href={logoHref} className="inline-flex w-fit items-center rounded-xl p-1.5 -ml-1.5">
              {renderedLogo}
              {logoDark && typeof logoDark === "string" && (
                <img src={logoDark} alt="Logo" className="hidden h-8 w-auto object-contain dark:block" />
              )}
            </a>
            {tagline && <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{tagline}</p>}
          </div>

          <div className="grid grid-cols-2 gap-8">
            {columns.map((column, index) => (
              <nav key={`${column.title}-${index}`} aria-label={column.title}>
                <p className={wordmarkHeadingClass}>{column.title}</p>
                <ul className="grid gap-2.5">
                  {column.children?.map((item) => (
                    <li key={`${item.title}-${item.link}`}>
                      <a href={item.link} className={wordmarkLinkClass}>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {(contact || (social && social.length > 0)) && (
            <div>
              {contact?.email && (
                <>
                  <p className={wordmarkHeadingClass}>{contactLabel}</p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-xl font-medium underline decoration-current/35 underline-offset-[5px] transition-colors hover:text-primary"
                  >
                    {contact.email}
                  </a>
                </>
              )}
              {contact?.location && (
                <>
                  <p className={cn(wordmarkHeadingClass, "mt-5")}>{locationLabel}</p>
                  <p className="text-[0.9375rem] leading-relaxed text-muted-foreground">{contact.location}</p>
                </>
              )}
              {social && social.length > 0 && (
                <>
                  <p className={cn(wordmarkHeadingClass, "mt-5")}>{socialLabel}</p>
                  <ul className="grid gap-2.5">
                    {social.map((item) => (
                      <li key={item.title}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className={wordmarkLinkClass}>
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}
        </div>

        <div className="mt-14 flex flex-wrap justify-between gap-x-6 gap-y-3 border-t border-border pt-6 text-[0.8125rem] text-muted-foreground">
          <p>
            © {displayCopyright}
          </p>
          <ul className="flex flex-wrap gap-4">
            {legal.map((item) => (
              <li key={`${item.title}-${item.link}`}>
                <a href={item.link} className="transition-colors hover:text-primary">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          {bottomLine && <p>{bottomLine}</p>}
        </div>
      </div>

      {wordmark && (
        <div
          ref={wrapRef}
          className="group/word relative isolate mt-[calc(24px-var(--lift))] overflow-hidden px-2 pt-[var(--lift)] sm:px-4 [--lift:clamp(96px,10vw,160px)] lg:mt-[calc(40px-var(--lift))] [container-type:inline-size]"
        >
          {/* Glow behind the letters; it reaches up behind the bottom row and fades in. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,60%),color-mix(in_oklab,var(--primary)_42%,transparent),transparent_70%)] opacity-50 transition-opacity duration-300 [mask-image:linear-gradient(to_bottom,transparent,#000_calc(var(--lift)+48px))] group-hover/word:opacity-100"
          />
          <p
            aria-hidden="true"
            style={{
              fontSize: `clamp(3.5rem, calc(88cqi / ${charRatio}), 19rem)`,
            }}
            className="pointer-events-none mb-[-0.025em] mt-6 flex w-full select-none justify-center whitespace-nowrap text-[clamp(3.5rem,calc(88vw/4.5),19rem)] font-semibold leading-[0.82] tracking-[-0.035em]"
          >
            {[...wordmark].map((letter, index) => (
              <span
                key={index}
                style={{ "--i": index } as React.CSSProperties}
                className="footer-block-letter inline-block px-[0.02em] last:pr-[0.14em] bg-gradient-to-b from-foreground/20 to-foreground/[0.02] to-85% bg-clip-text text-transparent"
              >
                {letter}
              </span>
            ))}
          </p>
        </div>
      )}
    </footer>
  );
}

export { WordmarkFooter as FooterBlock };

/* -------------------------------------------------------------------------- */
/*  Editorial Tilted Card variant (Husham Sam inspired architectural footer)  */
/* -------------------------------------------------------------------------- */

function WireframeGlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className ?? "size-6 text-neutral-600 dark:text-neutral-400"}
      viewBox="0 0 35 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.5 0C7.84989 0 0 6.27799 0 14C0 21.722 7.84989 28 17.5 28C27.1501 28 35 21.722 35 14C35 6.27799 27.1501 0 17.5 0ZM16.7266 2.28491V7.5283C15.1575 7.50629 13.6373 7.41384 12.206 7.26415C13.6817 5.0673 15.5264 3.31069 16.7266 2.28491ZM16.7266 8.96793V13.2824H9.89459C10.0279 11.6314 10.5969 10.0553 11.3837 8.62013C13.0639 8.82704 14.8686 8.94591 16.731 8.97233L16.7266 8.96793ZM16.7266 14.7176V19.0321C14.8641 19.0585 13.0594 19.1774 11.3792 19.3843C10.5969 17.9491 10.0235 16.373 9.89459 14.722H16.7266V14.7176ZM16.7266 20.4673V25.7151C15.5264 24.6893 13.6773 22.9327 12.2015 20.7358C13.6328 20.5818 15.1575 20.4893 16.7266 20.4673ZM18.2779 25.7107V20.4673C19.8336 20.4893 21.3538 20.5862 22.794 20.7447C21.3183 22.9371 19.478 24.6893 18.2779 25.7151V25.7107ZM18.2779 19.0277V14.7132H25.1099C24.9765 16.3686 24.4075 17.9447 23.6208 19.3799C21.9406 19.173 20.1403 19.0497 18.2779 19.0233V19.0277ZM18.2779 13.278V8.96352C20.1403 8.93711 21.9406 8.81384 23.6208 8.60692C24.4075 10.0421 24.981 11.6226 25.1099 13.2736H18.2779V13.278ZM18.2779 7.5283V2.28491C19.478 3.31069 21.3183 5.06289 22.794 7.25535C21.3538 7.41384 19.8336 7.50629 18.2779 7.5327V7.5283ZM19.7314 1.56289C23.643 1.99434 27.1057 3.55283 29.5726 5.80252C28.2036 6.32201 26.4522 6.74025 24.4831 7.03522C23.0118 4.67107 21.1049 2.76478 19.7314 1.56289ZM10.5124 7.04843C8.54331 6.75346 6.80086 6.33522 5.41847 5.81132C7.88545 3.55283 11.3526 1.99434 15.2731 1.55849C13.8995 2.76478 11.9882 4.67547 10.5169 7.04403L10.5124 7.04843ZM9.76124 8.38679C9.00114 9.88805 8.45441 11.5346 8.33439 13.278H1.57798C1.74689 10.9358 2.73368 8.76541 4.3161 6.93836C5.76962 7.54591 7.63208 8.03899 9.76124 8.38679ZM8.33439 14.7176C8.45441 16.461 9.00114 18.1075 9.76124 19.6088C7.63652 19.9566 5.77407 20.4453 4.3161 21.0572C2.73368 19.2302 1.74689 17.0597 1.57798 14.7176H8.32995H8.33439ZM10.5124 20.9472C11.9882 23.3157 13.8951 25.2264 15.2686 26.4327C11.3481 25.9969 7.881 24.4384 5.41402 22.1799C6.80086 21.656 8.53886 21.2377 10.508 20.9428L10.5124 20.9472ZM24.4787 20.9604C26.4522 21.2553 28.1991 21.678 29.5682 22.1931C27.1012 24.4428 23.6386 26.0013 19.7269 26.4327C21.1005 25.2264 23.0029 23.3201 24.4787 20.9604ZM25.2388 19.6132C26.0033 18.1075 26.55 16.461 26.6701 14.7132H33.422C33.2531 17.0597 32.2619 19.2346 30.675 21.066C29.2259 20.4541 27.3635 19.961 25.2388 19.6132ZM26.6701 13.278C26.55 11.5346 26.0033 9.88365 25.2388 8.37799C27.3635 8.03019 29.2215 7.53711 30.675 6.92516C32.2619 8.7566 33.2531 10.9314 33.422 13.278H26.6701Z"
        fill="currentColor"
      />
    </svg>
  );
}

const DEFAULT_EDITORIAL_SOCIALS = [
  { label: "LINKEDIN", href: "#" },
  { label: "INSTAGRAM", href: "#" },
  { label: "DRIBBBLE", href: "#" },
];

type EditorialTabKey = "newsletter" | "colophon" | "privacy";

const TAB_THEMES: Record<
  EditorialTabKey,
  {
    bg: string;
    textColor: string;
    border: string;
    activeTabBg: string;
    activeTabText: string;
    activeTabBorder: string;
    dotColor: string;
  }
> = {
  newsletter: {
    bg: "bg-[#4086D6]", // Modern stack: Azure Blue
    textColor: "text-white",
    border: "border-[#2f6cb2] dark:border-[#5295e2]",
    activeTabBg: "bg-[#4086D6]/15 dark:bg-[#4086D6]/25",
    activeTabText: "text-[#2662a5] dark:text-[#5295e2]",
    activeTabBorder: "border-l-[#4086D6]",
    dotColor: "bg-[#4086D6]",
  },
  colophon: {
    bg: "bg-[#EB5E30]", // Modern stack: Vibrant Terracotta / Coral
    textColor: "text-white",
    border: "border-[#c9491f] dark:border-[#f2754d]",
    activeTabBg: "bg-[#EB5E30]/15 dark:bg-[#EB5E30]/25",
    activeTabText: "text-[#EB5E30] dark:text-[#f2754d]",
    activeTabBorder: "border-l-[#EB5E30]",
    dotColor: "bg-[#EB5E30]",
  },
  privacy: {
    bg: "bg-[#059669]", // Rich Vibrant Emerald Green
    textColor: "text-white",
    border: "border-[#047857] dark:border-[#10b981]",
    activeTabBg: "bg-[#059669]/15 dark:bg-[#059669]/25",
    activeTabText: "text-[#059669] dark:text-[#10b981]",
    activeTabBorder: "border-l-[#059669]",
    dotColor: "bg-[#059669]",
  },
};

function NewsletterSubscriptionField({
  buttonText,
  onSubmit,
}: {
  buttonText?: string;
  onSubmit?: (e: React.FormEvent) => void;
}) {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setErrorMessage("");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      if (onSubmit) onSubmit(e);
    }, 600);
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full mt-3 p-3 rounded-xl bg-white/25 border border-white/40 text-white flex items-center justify-between text-xs"
      >
        <span className="flex items-center gap-2">
          <CheckCircle2 className="size-4 shrink-0 text-white" />
          <span className="font-medium text-white text-xs sm:text-[13px]">
            Subscribed! Issue #042 is on its way.
          </span>
        </span>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-[11px] font-mono underline hover:opacity-80 transition-opacity ml-2 shrink-0 cursor-pointer text-white"
        >
          Reset
        </button>
      </motion.div>
    );
  }

  return (
    <div className="w-full mt-3 sm:mt-4">
      <form
        onSubmit={handleSubmit}
        className={cn(
          "w-full p-1.5 rounded-xl border bg-white/20 border-white/35 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 transition-all",
          status === "error"
            ? "border-red-300 bg-red-500/20"
            : "focus-within:border-white focus-within:bg-white/25"
        )}
      >
        <div className="flex items-center gap-2.5 px-3 py-1.5 flex-1 min-w-0 text-xs text-white">
          <Mail className="size-4 text-white shrink-0" />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="developer@company.com"
            disabled={status === "loading"}
            className="w-full bg-transparent text-xs text-white placeholder:text-white/70 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-4 py-2 rounded-lg bg-white hover:bg-neutral-100 text-[#1D4E89] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all shrink-0 cursor-pointer disabled:opacity-50"
        >
          {status === "loading" ? (
            <span className="size-3.5 border-2 border-[#1D4E89] border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{buttonText ?? "SUBSCRIBE"}</span>
              <ArrowUpRight className="size-3.5" />
            </>
          )}
        </button>
      </form>
      {status === "error" && (
        <p className="text-[11px] text-white/90 font-mono mt-1.5 pl-1">{errorMessage}</p>
      )}
    </div>
  );
}

function EditorialTabCardContent({
  activeTab,
  editorialCta,
}: {
  activeTab: EditorialTabKey;
  editorialCta?: EditorialFooterProps;
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="w-full flex-1 flex flex-col justify-between"
      >
        {activeTab === "newsletter" && (
          <div className="w-full h-full flex flex-col justify-between text-white">
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {/* Responsive Header Row - Never wraps awkwardly */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/20 gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="size-2 rounded-full bg-white animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white truncate whitespace-nowrap">
                    NEWSLETTER
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-mono uppercase text-white/80 whitespace-nowrap">
                    ISSUE #042
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Sparkles className="size-2.5 shrink-0" />
                    <span>drop!</span>
                  </span>
                </div>
              </div>

              {/* Title & Description with Distinct Uppercase Style (1 Line on Large Screens) */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shrink-0">
                    01 • DISPATCH
                  </span>
                  <span className="h-px flex-1 bg-white/20" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-[21px] font-black uppercase tracking-tight text-white leading-tight lg:truncate lg:whitespace-nowrap">
                  CURATED MOTION & FLUID PRIMITIVES
                </h3>
                <div className="border-l-2 border-white/40 pl-3 py-0.5">
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Production-ready React components, zero-dependency mechanics, and copy-paste recipes delivered every second Thursday.
                  </p>
                </div>
              </div>

              {/* Working Interactive Input Field Module */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-white/15 border border-white/25">
                <NewsletterSubscriptionField buttonText="JOIN" />
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-1.5 sm:gap-3 mt-2.5 text-[10.5px] sm:text-[11px] text-white/90 font-mono">
                  <span>✓ Pure React 19 & Tailwind</span>
                  <span>✓ Zero spam guarantee</span>
                </div>
              </div>

              {/* Footer Status Row */}
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase text-white/75">STATUS</span>
                <span className="text-[10.5px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                  Active Broadcast
                </span>
              </div>
            </div>

            {/* Bottom Action Button - Using Pricing Primary Button */}
            <div className="pt-3.5 mt-auto">
              <CustomButton
                variant="pricing-primary"
                showArrow
                className="w-full h-11 text-xs uppercase tracking-wider font-bold rounded-xl justify-center bg-white text-[#1D4E89] hover:bg-neutral-100 hover:text-black border-0 cursor-pointer"
                onClick={() => {
                  editorialCta?.onButtonClick?.();
                  if (editorialCta?.buttonHref && editorialCta.buttonHref !== "#") {
                    window.location.href = editorialCta.buttonHref;
                  }
                }}
              >
                <span>{editorialCta?.buttonText ?? "SUBSCRIBE TO DISPATCH"}</span>
              </CustomButton>
            </div>
          </div>
        )}

        {activeTab === "colophon" && (
          <div className="w-full h-full flex flex-col justify-between text-white">
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {/* Responsive Header Row - Never wraps awkwardly */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/20 gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="size-2 rounded-full bg-white animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white truncate whitespace-nowrap">
                    SPECIFICATION
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-mono uppercase text-white/80 whitespace-nowrap">
                    V2.4 ENGINE
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <Layers className="size-2.5 shrink-0" />
                    <span>blocks!</span>
                  </span>
                </div>
              </div>

              {/* Title & Description with Distinct Uppercase Style (1 Line on Large Screens) */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shrink-0">
                    02 • ARCHITECTURE
                  </span>
                  <span className="h-px flex-1 bg-white/20" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-[21px] font-black uppercase tracking-tight text-white leading-tight lg:truncate lg:whitespace-nowrap">
                  ENGINEERED FOR 60FPS FLUIDITY
                </h3>
                <div className="border-l-2 border-white/40 pl-3 py-0.5">
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Built with hardware-accelerated transforms, fluid OKLCH design tokens, and semantic accessibility standards.
                  </p>
                </div>
              </div>

              {/* Spec Rows Grid - 4 Responsive Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-white">
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/75">Framework</div>
                    <div className="font-bold text-xs sm:text-[12.5px] mt-0.5">Next 15 + React 19</div>
                  </div>
                  <Zap className="size-4 text-white shrink-0" />
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/75">Design Tokens</div>
                    <div className="font-bold text-xs sm:text-[12.5px] mt-0.5">Tailwind v3 OKLCH</div>
                  </div>
                  <Code2 className="size-4 text-white shrink-0" />
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/75">Motion Engine</div>
                    <div className="font-bold text-xs sm:text-[12.5px] mt-0.5">Framer Motion 12</div>
                  </div>
                  <Terminal className="size-4 text-white shrink-0" />
                </div>
                <div className="p-2.5 sm:p-3 rounded-xl bg-white/15 border border-white/25 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/75">Typography</div>
                    <div className="font-bold text-xs sm:text-[12.5px] mt-0.5">Anton & Geist Sans</div>
                  </div>
                  <Cpu className="size-4 text-white shrink-0" />
                </div>
              </div>

              {/* Footer Status Row */}
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase text-white/75">FRAME RATE</span>
                <span className="text-[10.5px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                  60 FPS Locked
                </span>
              </div>
            </div>

            {/* Bottom Action Button - Using Pricing Primary Button */}
            <div className="pt-3.5 mt-auto">
              <CustomButton
                variant="pricing-primary"
                showArrow
                className="w-full h-11 text-xs uppercase tracking-wider font-bold rounded-xl justify-center bg-white text-[#943110] hover:bg-neutral-100 hover:text-black border-0 cursor-pointer"
                onClick={() => {
                  editorialCta?.onButtonClick?.();
                }}
              >
                <span>INSPECT SYSTEM TOKENS & METRICS</span>
              </CustomButton>
            </div>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="w-full h-full flex flex-col justify-between text-white">
            <div className="flex flex-col gap-3 sm:gap-3.5">
              {/* Responsive Header Row - Never wraps awkwardly */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/20 gap-2 min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                  <span className="size-2 rounded-full bg-white animate-pulse shrink-0" />
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold tracking-wider uppercase text-white truncate whitespace-nowrap">
                    PRIVACY MANIFEST
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <span className="text-[9.5px] sm:text-[10px] font-mono uppercase text-white/80 whitespace-nowrap">
                    AUDITED 2026
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white flex items-center gap-1 shrink-0 whitespace-nowrap">
                    <ShieldCheck className="size-2.5 shrink-0" />
                    <span>craft!</span>
                  </span>
                </div>
              </div>

              {/* Title & Description with Distinct Uppercase Style (1 Line on Large Screens) */}
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white/20 text-white font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase shrink-0">
                    03 • DATA INTEGRITY
                  </span>
                  <span className="h-px flex-1 bg-white/20" />
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl xl:text-[21px] font-black uppercase tracking-tight text-white leading-tight lg:truncate lg:whitespace-nowrap">
                  100% SELF-HOSTED & ZERO TRACKERS
                </h3>
                <div className="border-l-2 border-white/40 pl-3 py-0.5">
                  <p className="text-xs sm:text-[13px] text-white/90 leading-relaxed font-normal">
                    Software privacy is an engineering requirement. Your user code never touches remote trackers or analytics.
                  </p>
                </div>
              </div>

              {/* 3 Privacy Assurance Rows */}
              <div className="space-y-2 text-white">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/15 border border-white/25 flex items-start gap-2.5">
                  <Lock className="size-4 text-white shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-[13px]">
                      Zero Remote Network Requests
                    </div>
                    <div className="text-[11px] text-white/80 leading-normal">
                      All components execute completely offline in your local React bundle.
                    </div>
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/15 border border-white/25 flex items-start gap-2.5">
                  <Database className="size-4 text-white shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-[13px]">
                      No Cookies or Browser Fingerprinting
                    </div>
                    <div className="text-[11px] text-white/80 leading-normal">
                      Zero tracking pixels, analytics beacons, or behavioral monitoring.
                    </div>
                  </div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-white/15 border border-white/25 flex items-start gap-2.5">
                  <FileText className="size-4 text-white shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <div className="font-bold text-xs sm:text-[13px]">
                      Permissive Open Source MIT License
                    </div>
                    <div className="text-[11px] text-white/80 leading-normal">
                      Free for commercial and personal apps with no royalties or vendor locks.
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Status Row */}
              <div className="pt-2 border-t border-white/20 flex items-center justify-between text-xs font-mono">
                <span className="text-[10px] uppercase text-white/75">OUTBOUND CALLS</span>
                <span className="text-[10.5px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                  0 Telemetry
                </span>
              </div>
            </div>

            {/* Bottom Action Button - Using Pricing Primary Button */}
            <div className="pt-3.5 mt-auto">
              <CustomButton
                variant="pricing-primary"
                showArrow
                className="w-full h-11 text-xs uppercase tracking-wider font-bold rounded-xl justify-center bg-white text-[#047857] hover:bg-neutral-100 hover:text-black border-0 cursor-pointer"
                onClick={() => {
                  editorialCta?.onButtonClick?.();
                }}
              >
                <span>VIEW DATA INTEGRITY SPECIFICATION</span>
              </CustomButton>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

export function EditorialCardFooter({
  brandName = "HS",
  copyrightText,
  editorialCta,
  socialLinks,
  color,
  className,
}: {
  brandName?: string;
  copyrightText?: string;
  tagline?: string;
  editorialCta?: EditorialFooterProps;
  socialLinks?: SocialLink[];
  color?: string;
  className?: string;
}) {
  const [activeTab, setActiveTab] = React.useState<EditorialTabKey>("newsletter");
  const [timeStr, setTimeStr] = React.useState("11:52:19");
  const [dateStr, setDateStr] = React.useState("Wednesday Oct 28 2026");

  React.useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setTimeStr(`${hours}:${minutes}:${seconds}`);

      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        month: "short",
        day: "numeric",
        year: "numeric",
      };
      setDateStr(now.toLocaleDateString("en-US", options).replace(/,/g, ""));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyright =
    editorialCta?.copyright ??
    copyrightText ??
    `${brandName || "HS"} © ${new Date().getFullYear()}`;
  const rightsText = editorialCta?.rightsText ?? "All Rights Reserved";

  const rawSocials =
    editorialCta?.socialLinks ??
    (socialLinks && socialLinks.length > 0
      ? socialLinks.map((s) => ({
          label: s.network.toUpperCase(),
          href: "#",
        }))
      : DEFAULT_EDITORIAL_SOCIALS);

  const socials = rawSocials
    .filter(
      (s) =>
        s.label.toLowerCase() !== "x" &&
        s.label.toLowerCase() !== "twitter"
    )
    .map((s) => ({
      ...s,
      href: "#",
    }));

  const TAB_ITEMS: { key: EditorialTabKey; label: string }[] = [
    { key: "newsletter", label: "NEWSLETTER" },
    { key: "colophon", label: "COLOPHON" },
    { key: "privacy", label: "PRIVACY POLICY" },
  ];

  return (
    <div
      style={accentStyle(color)}
      className={cn(
        "w-full bg-[#f6f6f6] dark:bg-[#0c0c0e] text-[#1a1a1a] dark:text-[#f4f4f5] border border-dashed border-neutral-300 dark:border-neutral-800 relative overflow-hidden flex flex-col justify-between min-h-0 lg:min-h-[760px] xl:min-h-[820px] transition-colors select-none",
        className
      )}
    >
        
        {/* Continuous Full-Height Vertical Guide Lines (Edge-to-Edge Top to Bottom) */}
        <div className="absolute inset-0 pointer-events-none grid grid-cols-1 md:grid-cols-[minmax(360px,1.3fr)_1fr] lg:grid-cols-[minmax(390px,1.4fr)_0.85fr_1fr_1.35fr] z-0">
          <div className="border-r border-dashed border-neutral-300 dark:border-neutral-800 h-full hidden md:block" />
          <div className="border-r border-dashed border-neutral-300 dark:border-neutral-800 h-full hidden md:block" />
          <div className="border-r border-dashed border-neutral-300 dark:border-neutral-800 h-full hidden lg:block" />
          <div className="h-full" />
        </div>

        {/* Top Empty Architectural Grid Space (Tall luxury empty cell on desktop, responsive on mobile) */}
        <div className="w-full h-8 sm:h-14 lg:h-[200px] xl:h-[240px] relative z-10 flex-1" />

        {/* Middle Main Content Row (Full-Width Horizontal Border restored at the very top) */}
        <div className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-800 relative z-10">
          <div className="w-full grid grid-cols-1 md:grid-cols-[minmax(360px,1.3fr)_1fr] lg:grid-cols-[minmax(390px,1.4fr)_0.85fr_1fr_1.35fr]">
            
            {/* Column 1: Interactive Tabs & Spacer Boxes (NEWSLETTER, COLOPHON, PRIVACY POLICY) */}
            <div className="flex flex-col md:row-span-2 lg:row-span-1">
              {/* Empty Spacer Box above NEWSLETTER (Bounded by main top horizontal line above) */}
              <div className="w-full h-8 sm:h-11 lg:h-14" />

              {/* Tabs with Individual Dashed Borders (NEWSLETTER top border is strictly in Column 1) */}
              {TAB_ITEMS.map((tab) => {
                const isSelected = activeTab === tab.key;
                const tabTheme = TAB_THEMES[tab.key];
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "w-full text-left px-5 sm:px-6 py-4 sm:py-6 min-h-[52px] sm:min-h-[66px] flex items-center justify-between text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer outline-none border-t border-dashed border-neutral-300 dark:border-neutral-800 shadow-none",
                      isSelected
                        ? cn(tabTheme.activeTabBg, tabTheme.activeTabText, "border-l-4 font-bold shadow-none", tabTheme.activeTabBorder)
                        : "bg-transparent text-neutral-600 dark:text-neutral-400 font-semibold hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 shadow-none"
                    )}
                  >
                    <span>{tab.label}</span>
                    {isSelected && (
                      <span className={cn("size-2 rounded-full animate-pulse shrink-0 ml-2", tabTheme.dotColor)} />
                    )}
                  </button>
                );
              })}

              {/* Empty Spacer Box below PRIVACY POLICY (Strictly in Left Column) */}
              <div className="w-full h-8 sm:h-11 lg:h-14 border-t border-dashed border-neutral-300 dark:border-neutral-800" />
            </div>

            {/* Column 2: Empty architectural grid space (Box 2) */}
            <div className="hidden lg:block" />

            {/* Column 3: Live Time & Date (Box 3) */}
            <div className="flex flex-col justify-start pt-4 sm:pt-5 pb-5 px-5 sm:px-6 border-t md:border-t-0 border-dashed border-neutral-300 dark:border-neutral-800">
              <div className="text-xs sm:text-[13px] font-mono tracking-tight text-neutral-800 dark:text-neutral-200">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-primary animate-pulse shrink-0" />
                  <span className="font-semibold text-neutral-950 dark:text-white">
                    {timeStr}
                  </span>
                </div>
                <span className="block text-neutral-500 dark:text-neutral-400 mt-1 pl-4">
                  {dateStr}
                </span>
              </div>
            </div>

            {/* Column 4: Globe Icon & Copyright (Box 4) */}
            <div className="flex flex-col justify-start pt-4 sm:pt-5 pb-5 px-5 sm:px-6 border-t md:border-t-0 border-dashed border-neutral-300 dark:border-neutral-800">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20 shrink-0 mt-0.5">
                  <WireframeGlobeIcon className="size-5" />
                </div>
                <div className="text-xs sm:text-[13px] font-medium leading-tight text-neutral-800 dark:text-neutral-200">
                  <div className="font-semibold">{copyright}</div>
                  <div className="text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {rightsText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Socials Row (Full-Width Horizontal Border) */}
        <div className="w-full border-t border-dashed border-neutral-300 dark:border-neutral-800 px-5 sm:px-6 min-h-[56px] sm:min-h-[66px] flex flex-wrap items-center gap-4 sm:gap-6 relative z-10">
          {socials.map((s, idx) => (
            <a
              key={idx}
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="inline-flex items-center text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 hover:text-primary dark:hover:text-primary transition-colors leading-none cursor-pointer"
            >
              {s.label}
            </a>
          ))}
        </div>

        {/* Desktop Tilted Interactive CTA Card (Spans from right edge to the border left of Avara UI) */}
        <div className="hidden lg:grid absolute inset-x-0 bottom-0 top-0 pointer-events-none grid-cols-[minmax(390px,1.4fr)_0.85fr_1fr_1.35fr] z-20">
          <div className="col-start-3 col-end-5 relative flex flex-col justify-end pointer-events-none">
            <motion.div
              initial="rest"
              whileHover="hover"
              animate="rest"
              variants={{
                rest: {
                  rotate: 7,
                  y: "68%",
                  x: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.25, 1, 0.5, 1],
                  },
                },
                hover: {
                  rotate: 0,
                  y: "0%",
                  x: 0,
                  transition: {
                    duration: 0.55,
                    ease: [0.16, 1, 0.3, 1],
                  },
                },
              }}
              style={{ transformOrigin: "bottom right" }}
              className={cn(
                "w-full h-[510px] xl:h-[570px] pointer-events-auto flex flex-col justify-between p-7 xl:p-9 border cursor-pointer relative overflow-hidden rounded-2xl transition-all duration-500",
                TAB_THEMES[activeTab].bg,
                TAB_THEMES[activeTab].border,
                TAB_THEMES[activeTab].textColor,
              )}
            >
              <EditorialTabCardContent activeTab={activeTab} editorialCta={editorialCta} />
            </motion.div>
          </div>
        </div>

        {/* Mobile / Tablet Inline CTA Card (NO SHADOW, responsive rounded card) */}
        <div className="lg:hidden w-full p-4 sm:p-6 border-t border-dashed border-neutral-300 dark:border-neutral-800 relative z-10">
          <motion.div
            initial={{ rotate: 0 }}
            className={cn(
              "w-full flex flex-col justify-between p-4 sm:p-6 border relative overflow-hidden rounded-2xl transition-all duration-500",
              TAB_THEMES[activeTab].bg,
              TAB_THEMES[activeTab].border,
              TAB_THEMES[activeTab].textColor,
            )}
          >
            <EditorialTabCardContent activeTab={activeTab} editorialCta={editorialCta} />
          </motion.div>
        </div>
      </div>
  );
}

/** The wordmark, or whatever `logo` was passed instead of it. */
function BrandLogo({ logo, brandName }: Pick<FooterProps, "logo" | "brandName">) {
  const isAvara = !brandName || brandName === "Avara UI";
  return (
    <div className="flex items-center gap-2 select-none">
      {logo || (
        <div className="relative flex items-center justify-center">
          <img
            src="/favicon/android-chrome-192x192.png"
            alt={brandName || "Avara UI"}
            width={24}
            height={24}
            className="size-6 object-contain"
          />
        </div>
      )}
      <span className="font-extrabold text-base sm:text-lg tracking-tight text-foreground flex items-center gap-1.5">
        {isAvara ? "Avara" : brandName}{" "}
        <span
          className="font-normal"
          style={{ color: "var(--brand, #9B8AFB)" }}
        >
          UI
        </span>
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 leading-none">
          v1.0
        </span>
      </span>
    </div>
  );
}

// ============================================================================
// ARCHITECTURAL BLUEPRINT & LIQUID INK WORDMARK FOOTER (HERON AI INSPIRED)
// ============================================================================

export function IsometricWireframeCube({
  className,
  brandLetter: _brandLetter = "H",
}: {
  className?: string;
  brandLetter?: string;
}) {
  const [hoveredFacet, setHoveredFacet] = React.useState<string | null>(null);

  const isHighlighted = (facetId: string) => hoveredFacet === facetId;

  return (
    <div
      onMouseEnter={() => {
        if (!hoveredFacet) setHoveredFacet("left-face");
      }}
      onMouseLeave={() => setHoveredFacet(null)}
      className={cn("relative flex items-center justify-center select-none cursor-pointer group", className)}
    >
      <svg
        viewBox="0 0 160 160"
        className="w-24 h-24 sm:w-28 sm:h-28 text-neutral-900 dark:text-neutral-100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Top of Left Pillar Segment */}
        <polygon
          points="44,56 56.6,49.7 92.6,67.7 80,74"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredFacet("top-left");
          }}
          style={{ fill: isHighlighted("top-left") ? "var(--primary, #ff3b00)" : undefined }}
          className={cn(
            "stroke-neutral-900 dark:stroke-white transition-colors duration-150 cursor-pointer",
            isHighlighted("top-left") ? "fill-primary" : "fill-white dark:fill-neutral-900"
          )}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Top of Right Pillar Segment */}
        <polygon
          points="67.4,44.3 80,38 116,56 103.4,62.3"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredFacet("top-right");
          }}
          style={{ fill: isHighlighted("top-right") ? "var(--primary, #ff3b00)" : undefined }}
          className={cn(
            "stroke-neutral-900 dark:stroke-white transition-colors duration-150 cursor-pointer",
            isHighlighted("top-right") ? "fill-primary" : "fill-white dark:fill-neutral-900"
          )}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Notch Floor (Crossbar Top inside upper notch) */}
        <polygon
          points="56.6,67.9 67.4,62.5 103.4,80.5 92.6,85.9"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredFacet("notch-floor");
          }}
          style={{ fill: isHighlighted("notch-floor") ? "var(--primary, #ff3b00)" : undefined }}
          className={cn(
            "stroke-neutral-900 dark:stroke-white transition-colors duration-150 cursor-pointer",
            isHighlighted("notch-floor") ? "fill-primary" : "fill-white dark:fill-neutral-900"
          )}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Notch Left Inner Wall Segment */}
        <polygon
          points="56.6,49.7 92.6,67.7 92.6,85.9 56.6,67.9"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredFacet("notch-wall");
          }}
          style={{ fill: isHighlighted("notch-wall") ? "var(--primary, #ff3b00)" : undefined }}
          className={cn(
            "stroke-neutral-900 dark:stroke-white transition-colors duration-150 cursor-pointer",
            isHighlighted("notch-wall") ? "fill-primary" : "fill-white dark:fill-neutral-900"
          )}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Left Face Box / Segment: Turns vibrant orange / primary on hover! */}
        <polygon
          points="44,56 80,74 80,122 44,104"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredFacet("left-face");
          }}
          style={{ fill: isHighlighted("left-face") ? "var(--primary, #ff3b00)" : undefined }}
          className={cn(
            "stroke-neutral-900 dark:stroke-white transition-colors duration-150 cursor-pointer",
            isHighlighted("left-face") ? "fill-primary" : "fill-white dark:fill-neutral-900"
          )}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Front-Right H Face Box / Segment */}
        <polygon
          points="80,74 92.6,67.7 92.6,85.9 103.4,80.5 103.4,62.3 116,56 116,104 103.4,110.3 103.4,92.1 92.6,97.5 92.6,115.7 80,122"
          onMouseEnter={(e) => {
            e.stopPropagation();
            setHoveredFacet("front-h");
          }}
          style={{ fill: isHighlighted("front-h") ? "var(--primary, #ff3b00)" : undefined }}
          className={cn(
            "stroke-neutral-900 dark:stroke-white transition-colors duration-150 cursor-pointer",
            isHighlighted("front-h") ? "fill-primary" : "fill-white dark:fill-neutral-900"
          )}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ============================================================================
// ARCHITECTURAL CAD GLYPH PATH DEFINITIONS (HERON AI CAD DRAFTING SPEC)
// ============================================================================

export function getArchitecturalGlyph(
  char: string,
  cx: number,
  cy = 120,
  letterW = 92
): { fillD: string; strokeD: string } {
  const y1 = 46;
  const y2 = 194;
  const x1 = cx - letterW / 2;
  const x2 = cx + letterW / 2;
  const T = 22; // stroke thickness
  const C = 26; // chamfer for octagonal O, G
  const OS = 5; // corner drafting extension overshoot

  switch (char.toUpperCase()) {
    case "O": {
      // Outer octagonal chamfer + inner octagonal chamfer hole
      const fillD = [
        `M ${x1 + C} ${y1} L ${x2 - C} ${y1} L ${x2} ${y1 + C} L ${x2} ${y2 - C} L ${x2 - C} ${y2} L ${x1 + C} ${y2} L ${x1} ${y2 - C} L ${x1} ${y1 + C} Z`,
        `M ${x1 + T + C * 0.6} ${y1 + T} L ${x2 - T - C * 0.6} ${y1 + T} L ${x2 - T} ${y1 + T + C * 0.6} L ${x2 - T} ${y2 - T - C * 0.6} L ${x2 - T - C * 0.6} ${y2 - T} L ${x1 + T + C * 0.6} ${y2 - T} L ${x1 + T} ${y2 - T - C * 0.6} L ${x1 + T} ${y1 + T + C * 0.6} Z`,
      ].join(" ");
      const strokeD = [
        `M ${x1 + C} ${y1} L ${x2 - C} ${y1} L ${x2} ${y1 + C} L ${x2} ${y2 - C} L ${x2 - C} ${y2} L ${x1 + C} ${y2} L ${x1} ${y2 - C} L ${x1} ${y1 + C} Z`,
        `M ${x1 + T + C * 0.6} ${y1 + T} L ${x2 - T - C * 0.6} ${y1 + T} L ${x2 - T} ${y1 + T + C * 0.6} L ${x2 - T} ${y2 - T - C * 0.6} L ${x2 - T - C * 0.6} ${y2 - T} L ${x1 + T + C * 0.6} ${y2 - T} L ${x1 + T} ${y2 - T - C * 0.6} L ${x1 + T} ${y1 + T + C * 0.6} Z`,
        // Center crosshair inside hole
        `M ${cx - 5} ${cy} L ${cx + 5} ${cy} M ${cx} ${cy - 5} L ${cx} ${cy + 5}`,
        // Top and bottom registration ticks
        `M ${cx} ${y1 - OS} L ${cx} ${y1 + OS} M ${cx} ${y2 - OS} L ${cx} ${y2 + OS}`,
        `M ${x1 - OS} ${cy} L ${x1 + OS} ${cy} M ${x2 - OS} ${cy} L ${x2 + OS} ${cy}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "A": {
      const topHalfW = 16;
      const fillD = [
        `M ${cx - topHalfW} ${y1} L ${cx + topHalfW} ${y1} L ${x2} ${y2} L ${x2 - T * 1.15} ${y2} L ${cx + 14} 150 L ${cx - 14} 150 L ${x1 + T * 1.15} ${y2} L ${x1} ${y2} Z`,
        `M ${cx} 78 L ${cx + 12} 130 L ${cx - 12} 130 Z`,
      ].join(" ");
      const strokeD = [
        `M ${x1 - OS} ${y2} L ${x2 + OS} ${y2}`,
        `M ${x1} ${y2 + OS} L ${cx - topHalfW} ${y1}`,
        `M ${x2} ${y2 + OS} L ${cx + topHalfW} ${y1}`,
        `M ${cx - topHalfW - OS} ${y1} L ${cx + topHalfW + OS} ${y1}`,
        `M ${x1 + T * 1.15} ${y2} L ${cx - 14} 150 L ${cx + 14} 150 L ${x2 - T * 1.15} ${y2}`,
        `M ${cx - 12 - OS} 130 L ${cx + 12 + OS} 130`,
        `M ${cx - 12} 130 L ${cx} 78 L ${cx + 12} 130`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "L": {
      const fillD = `M ${x1} ${y1} L ${x1 + T} ${y1} L ${x1 + T} ${y2 - T} L ${x2} ${y2 - T} L ${x2} ${y2} L ${x1} ${y2} Z`;
      const strokeD = [
        `M ${x1} ${y1 - OS} L ${x1} ${y2 + OS}`,
        `M ${x1 - OS} ${y1} L ${x1 + T + OS} ${y1}`,
        `M ${x1 + T} ${y1 - OS} L ${x1 + T} ${y2 - T}`,
        `M ${x1 + T} ${y2 - T} L ${x2 + OS} ${y2 - T}`,
        `M ${x2} ${y2 - T - OS} L ${x2} ${y2 + OS}`,
        `M ${x1 - OS} ${y2} L ${x2 + OS} ${y2}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "G": {
      // 4 authentic 45-degree chamfered corners (kona) perfectly matching octagonal O:
      // Top-left, Top-right, Bottom-right, Bottom-left!
      const inC = C * 0.6; // matching inner chamfer of O

      const fillD = [
        `M ${x1} ${y1 + C}`,
        `L ${x1 + C} ${y1}`,
        `L ${x2 - C} ${y1}`,
        `L ${x2} ${y1 + C}`,
        `L ${x2 - T} ${y1 + C}`,
        `L ${(x2 - T - inC).toFixed(1)} ${y1 + T}`,
        `L ${(x1 + T + inC).toFixed(1)} ${y1 + T}`,
        `L ${x1 + T} ${(y1 + T + inC).toFixed(1)}`,
        `L ${x1 + T} ${(y2 - T - inC).toFixed(1)}`,
        `L ${(x1 + T + inC).toFixed(1)} ${y2 - T}`,
        `L ${(x2 - T - inC).toFixed(1)} ${y2 - T}`,
        `L ${x2 - T} ${(y2 - T - inC).toFixed(1)}`,
        `L ${x2 - T} ${cy + T / 2}`,
        `L ${cx + 2} ${cy + T / 2}`,
        `L ${cx + 2} ${cy - T / 2}`,
        `L ${x2} ${cy - T / 2}`,
        `L ${x2} ${y2 - C}`,
        `L ${x2 - C} ${y2}`,
        `L ${x1 + C} ${y2}`,
        `L ${x1} ${y2 - C}`,
        `Z`,
      ].join(" ");

      const strokeD = [
        // Top outer horizontal
        `M ${x1 + C - OS} ${y1} L ${x2 - C + OS} ${y1}`,
        // Top-right outer 45-degree chamfer
        `M ${x2 - C} ${y1} L ${x2} ${y1 + C}`,
        // Top terminal horizontal cut
        `M ${x2 - T - OS} ${y1 + C} L ${x2 + OS} ${y1 + C}`,
        // Inner top-right 45-degree chamfer
        `M ${x2 - T} ${y1 + C} L ${x2 - T - inC} ${y1 + T}`,
        // Inner top horizontal
        `M ${x1 + T + inC - OS} ${y1 + T} L ${x2 - T - inC + OS} ${y1 + T}`,
        // Inner top-left 45-degree chamfer
        `M ${x1 + T + inC} ${y1 + T} L ${x1 + T} ${y1 + T + inC}`,
        // Inner left vertical
        `M ${x1 + T} ${y1 + T + inC - OS} L ${x1 + T} ${y2 - T - inC + OS}`,
        // Inner bottom-left 45-degree chamfer
        `M ${x1 + T} ${y2 - T - inC} L ${x1 + T + inC} ${y2 - T}`,
        // Inner bottom horizontal
        `M ${x1 + T + inC - OS} ${y2 - T} L ${x2 - T - inC + OS} ${y2 - T}`,
        // Inner bottom-right 45-degree chamfer
        `M ${x2 - T - inC} ${y2 - T} L ${x2 - T} ${y2 - T - inC}`,
        // Inner right vertical up to crossbar
        `M ${x2 - T} ${y2 - T - inC + OS} L ${x2 - T} ${cy + T / 2 - OS}`,
        // Crossbar bottom horizontal
        `M ${cx + 2 - OS} ${cy + T / 2} L ${x2 - T + OS} ${cy + T / 2}`,
        // Crossbar tip vertical
        `M ${cx + 2} ${cy + T / 2 + OS} L ${cx + 2} ${cy - T / 2 - OS}`,
        // Crossbar top horizontal
        `M ${cx + 2 - OS} ${cy - T / 2} L ${x2 + OS} ${cy - T / 2}`,
        // Outer right vertical below crossbar
        `M ${x2} ${cy - T / 2 - OS} L ${x2} ${y2 - C + OS}`,
        // Outer bottom-right 45-degree chamfer
        `M ${x2} ${y2 - C} L ${x2 - C} ${y2}`,
        // Outer bottom horizontal
        `M ${x2 - C + OS} ${y2} L ${x1 + C - OS} ${y2}`,
        // Outer bottom-left 45-degree chamfer
        `M ${x1 + C} ${y2} L ${x1} ${y2 - C}`,
        // Outer left vertical
        `M ${x1} ${y2 - C + OS} L ${x1} ${y1 + C - OS}`,
        // Outer top-left 45-degree chamfer
        `M ${x1} ${y1 + C} L ${x1 + C} ${y1}`,
        // Center crosshair and registration ticks
        `M ${cx - 5} ${cy} L ${cx + 5} ${cy} M ${cx} ${cy - 5} L ${cx} ${cy + 5}`,
        `M ${cx} ${y1 - OS} L ${cx} ${y1 + OS} M ${cx} ${y2 - OS} L ${cx} ${y2 + OS}`,
        `M ${x1 - OS} ${cy} L ${x1 + OS} ${cy}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "R": {
      const loopY = 120;
      const fillD = [
        `M ${x1} ${y1} L ${x2 - 16} ${y1} Q ${x2} ${y1} ${x2} ${(y1 + loopY) / 2} Q ${x2} ${loopY} ${x2 - 16} ${loopY} L ${x1 + T} ${loopY} L ${cx + 6} ${loopY} L ${x2} ${y2} L ${x2 - T * 1.15} ${y2} L ${cx - 4} ${loopY} L ${x1 + T} ${loopY} L ${x1 + T} ${y2} L ${x1} ${y2} Z`,
        `M ${x1 + T} ${y1 + T} L ${x2 - 20} ${y1 + T} Q ${x2 - T} ${y1 + T} ${x2 - T} ${(y1 + loopY) / 2} Q ${x2 - T} ${loopY - T} ${x2 - 20} ${loopY - T} L ${x1 + T} ${loopY - T} Z`,
      ].join(" ");
      const strokeD = [
        `M ${x1} ${y1 - OS} L ${x1} ${y2 + OS}`,
        `M ${x1 + T} ${y1} L ${x1 + T} ${y2 + OS}`,
        `M ${x1 - OS} ${y1} L ${x2 - 16} ${y1} Q ${x2} ${y1} ${x2} ${(y1 + loopY) / 2} Q ${x2} ${loopY} ${x2 - 16} ${loopY} L ${x1 - OS} ${loopY}`,
        `M ${x1 + T} ${y1 + T} L ${x2 - 20} ${y1 + T} Q ${x2 - T} ${y1 + T} ${x2 - T} ${(y1 + loopY) / 2} Q ${x2 - T} ${loopY - T} ${x2 - 20} ${loopY - T} L ${x1 + T} ${loopY - T}`,
        `M ${cx - 4} ${loopY} L ${x2 - T * 1.15} ${y2 + OS}`,
        `M ${cx + 6} ${loopY} L ${x2} ${y2 + OS}`,
        `M ${x1 - OS} ${y2} L ${x1 + T + OS} ${y2}`,
        `M ${x2 - T * 1.15 - OS} ${y2} L ${x2 + OS} ${y2}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "I": {
      const halfT = T / 2;
      const fillD = `M ${cx - halfT} ${y1} L ${cx + halfT} ${y1} L ${cx + halfT} ${y2} L ${cx - halfT} ${y2} Z`;
      const strokeD = [
        `M ${cx - halfT} ${y1 - OS} L ${cx - halfT} ${y2 + OS}`,
        `M ${cx + halfT} ${y1 - OS} L ${cx + halfT} ${y2 + OS}`,
        `M ${cx - halfT - OS} ${y1} L ${cx + halfT + OS} ${y1}`,
        `M ${cx - halfT - OS} ${y2} L ${cx + halfT + OS} ${y2}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "Z": {
      const fillD = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y1 + T} L ${x1 + T * 1.25} ${y2 - T} L ${x2} ${y2 - T} L ${x2} ${y2} L ${x1} ${y2} L ${x1} ${y2 - T} L ${x2 - T * 1.25} ${y1 + T} L ${x1} ${y1 + T} Z`;
      const strokeD = [
        `M ${x1 - OS} ${y1} L ${x2 + OS} ${y1}`,
        `M ${x1} ${y1 - OS} L ${x1} ${y1 + T}`,
        `M ${x2} ${y1 - OS} L ${x2} ${y1 + T}`,
        `M ${x1 - OS} ${y1 + T} L ${x2 - T * 1.25} ${y1 + T} L ${x1} ${y2 - T} L ${x1 - OS} ${y2 - T}`,
        `M ${x2} ${y1 + T} L ${x1 + T * 1.25} ${y2 - T} L ${x2 + OS} ${y2 - T}`,
        `M ${x1 - OS} ${y2} L ${x2 + OS} ${y2}`,
        `M ${x1} ${y2 - T} L ${x1} ${y2 + OS}`,
        `M ${x2} ${y2 - T} L ${x2} ${y2 + OS}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "E": {
      const midY = (y1 + y2) / 2;
      const fillD = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y1 + T} L ${x1 + T} ${y1 + T} L ${x1 + T} ${midY - T / 2} L ${x2 - 14} ${midY - T / 2} L ${x2 - 14} ${midY + T / 2} L ${x1 + T} ${midY + T / 2} L ${x1 + T} ${y2 - T} L ${x2} ${y2 - T} L ${x2} ${y2} L ${x1} ${y2} Z`;
      const strokeD = [
        `M ${x1} ${y1 - OS} L ${x1} ${y2 + OS}`,
        `M ${x1 - OS} ${y1} L ${x2 + OS} ${y1}`,
        `M ${x2} ${y1 - OS} L ${x2} ${y1 + T + OS}`,
        `M ${x1 + T} ${y1 + T - OS} L ${x2 + OS} ${y1 + T}`,
        `M ${x1 + T} ${y1 + T} L ${x1 + T} ${y2 - T}`,
        `M ${x1 + T - OS} ${midY - T / 2} L ${x2 - 14 + OS} ${midY - T / 2}`,
        `M ${x2 - 14} ${midY - T / 2 - OS} L ${x2 - 14} ${midY + T / 2 + OS}`,
        `M ${x1 + T - OS} ${midY + T / 2} L ${x2 - 14 + OS} ${midY + T / 2}`,
        `M ${x1 + T - OS} ${y2 - T} L ${x2 + OS} ${y2 - T}`,
        `M ${x2} ${y2 - T - OS} L ${x2} ${y2 + OS}`,
        `M ${x1 - OS} ${y2} L ${x2 + OS} ${y2}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "H": {
      const midY = (y1 + y2) / 2;
      const fillD = `M ${x1} ${y1} L ${x1 + T} ${y1} L ${x1 + T} ${midY - T / 2} L ${x2 - T} ${midY - T / 2} L ${x2 - T} ${y1} L ${x2} ${y1} L ${x2} ${y2} L ${x2 - T} ${y2} L ${x2 - T} ${midY + T / 2} L ${x1 + T} ${midY + T / 2} L ${x1 + T} ${y2} L ${x1} ${y2} Z`;
      const strokeD = [
        `M ${x1} ${y1 - OS} L ${x1} ${y2 + OS}`,
        `M ${x1 + T} ${y1 - OS} L ${x1 + T} ${y2 + OS}`,
        `M ${x1 - OS} ${y1} L ${x1 + T + OS} ${y1}`,
        `M ${x1 - OS} ${y2} L ${x1 + T + OS} ${y2}`,
        `M ${x2 - T} ${y1 - OS} L ${x2 - T} ${y2 + OS}`,
        `M ${x2} ${y1 - OS} L ${x2} ${y2 + OS}`,
        `M ${x2 - T - OS} ${y1} L ${x2 + OS} ${y1}`,
        `M ${x2 - T - OS} ${y2} L ${x2 + OS} ${y2}`,
        `M ${x1 + T - OS} ${midY - T / 2} L ${x2 - T + OS} ${midY - T / 2}`,
        `M ${x1 + T - OS} ${midY + T / 2} L ${x2 - T + OS} ${midY + T / 2}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    case "N": {
      const fillD = `M ${x1} ${y1} L ${x1 + T} ${y1} L ${x2 - T} ${y2 - 20} L ${x2 - T} ${y1} L ${x2} ${y1} L ${x2} ${y2} L ${x2 - T} ${y2} L ${x1 + T} ${y1 + 20} L ${x1 + T} ${y2} L ${x1} ${y2} Z`;
      const strokeD = [
        `M ${x1} ${y1 - OS} L ${x1} ${y2 + OS}`,
        `M ${x1 + T} ${y1 - OS} L ${x1 + T} ${y2 + OS}`,
        `M ${x1 - OS} ${y1} L ${x1 + T + OS} ${y1}`,
        `M ${x1 - OS} ${y2} L ${x1 + T + OS} ${y2}`,
        `M ${x2 - T} ${y1 - OS} L ${x2 - T} ${y2 + OS}`,
        `M ${x2} ${y1 - OS} L ${x2} ${y2 + OS}`,
        `M ${x2 - T - OS} ${y1} L ${x2 + OS} ${y1}`,
        `M ${x2 - T - OS} ${y2} L ${x2 + OS} ${y2}`,
        `M ${x1} ${y1} L ${x2 - T} ${y2}`,
        `M ${x1 + T} ${y1} L ${x2} ${y2}`,
      ].join(" ");
      return { fillD, strokeD };
    }

    default: {
      // Fallback: standard clean geometric rectangular glyph
      const fillD = `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2} L ${x1} ${y2} Z`;
      const strokeD = `M ${x1 - OS} ${y1} L ${x2 + OS} ${y1} M ${x2} ${y1 - OS} L ${x2} ${y2 + OS} M ${x2 + OS} ${y2} L ${x1 - OS} ${y2} M ${x1} ${y2 + OS} L ${x1} ${y1 - OS}`;
      return { fillD, strokeD };
    }
  }
}

export function ArchitecturalLiquidWordmark({
  text = "algorize",
  className,
}: {
  text?: string;
  className?: string;
}) {
  const uid = React.useId().replace(/[:]/g, "");
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const laserDotRef = useRef<SVGRectElement>(null);

  const resolvedText = React.useMemo(() => (text || "algorize").toUpperCase(), [text]);

  // Pointer position in SVG coordinate space (0-1200, 0-240)
  const pointerRef = useRef({
    x: 600,
    y: 120,
    targetX: -9999,
    targetY: -9999,
    prevX: 600,
    prevY: 120,
    active: false,
    radius: 0,
    targetRadius: 0,
  });

  // 8-stage viscous trailing body chain (octopus tentacles trailing behind like living fluid)
  const trailRef = useRef([
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
    { x: 600, y: 120, vx: 0, vy: 0, r: 0 },
  ]);

  const timeRef = useRef(0);

  // Layout calculation for authentic CAD drafting blueprint glyphs
  const len = Math.max(1, resolvedText.length);
  const letterSpacing = Math.min(136, Math.floor(1080 / len));
  const letterWidth = Math.min(94, Math.floor(letterSpacing * 0.74));
  const totalW = (len - 1) * letterSpacing;
  const startX = 600 - totalW / 2;

  const glyphList = React.useMemo(() => {
    return resolvedText.split("").map((ch, idx) => {
      const cx = startX + idx * letterSpacing;
      return getArchitecturalGlyph(ch, cx, 120, letterWidth);
    });
  }, [resolvedText, startX, letterSpacing, letterWidth]);

  const combinedFillD = React.useMemo(() => {
    return glyphList.map((g) => g.fillD).join(" ");
  }, [glyphList]);

  const combinedStrokeD = React.useMemo(() => {
    return glyphList.map((g) => g.strokeD).join(" ");
  }, [glyphList]);

  // Total 36 organic metaball nodes:
  // 5 core nodes + 12 perimeter octopus tentacle lobes + 8 chained trail nodes + 6 satellite droplets + 5 inner inlets
  const TOTAL_CIRCLES = 36;
  const grayCirclesRef = useRef<(SVGCircleElement | null)[]>([]);
  const blackCirclesRef = useRef<(SVGCircleElement | null)[]>([]);

  // 60 FPS Organic Octopus Fluid Liquid Simulation
  useEffect(() => {
    const render = () => {
      const ptr = pointerRef.current;
      const trail = trailRef.current;

      // Update fluid undulation time (gentle organic pulsation)
      timeRef.current += 0.038;
      const t = timeRef.current;

      // Viscous liquid easing - creeps slowly, smoothly oozing like thick ink
      if (ptr.active) {
        ptr.x += (ptr.targetX - ptr.x) * 0.065;
        ptr.y += (ptr.targetY - ptr.y) * 0.065;
        // Large radius (175px radius = 350px diameter) covering 2-3 letters at once
        ptr.targetRadius = 175;
      } else {
        ptr.targetRadius = 0;
      }
      // Slow organic soaking / dissipation easing
      ptr.radius += (ptr.targetRadius - ptr.radius) * (ptr.targetRadius > 0 ? 0.05 : 0.032);

      // Movement velocity & heading (for octopus tentacles reaching in direction of travel)
      const velX = ptr.x - ptr.prevX;
      const velY = ptr.y - ptr.prevY;
      const moveSpeed = Math.hypot(velX, velY);
      const moveAngle = Math.atan2(velY, velX);
      ptr.prevX = ptr.x;
      ptr.prevY = ptr.y;

      // Update tiny red CAD laser indicator dot at pointer position
      if (laserDotRef.current) {
        if (ptr.active && ptr.radius > 2) {
          laserDotRef.current.setAttribute("x", (ptr.x - 2.5).toFixed(1));
          laserDotRef.current.setAttribute("y", (ptr.y - 2.5).toFixed(1));
          laserDotRef.current.setAttribute("opacity", "1");
        } else {
          laserDotRef.current.setAttribute("opacity", "0");
        }
      }

      // 8-stage chained viscous trail (tentacles stretching and dragging behind like an octopus)
      let leadX = ptr.x;
      let leadY = ptr.y;
      for (let k = 0; k < trail.length; k++) {
        const p = trail[k];
        const followSpeed = Math.max(0.035, 0.13 - k * 0.012);
        p.vx = (p.vx + (leadX - p.x) * followSpeed) * 0.62;
        p.vy = (p.vy + (leadY - p.y) * followSpeed) * 0.62;
        p.x += p.vx;
        p.y += p.vy;
        const decay = Math.max(0.18, 0.58 - k * 0.052);
        p.r = ptr.radius * decay;
        leadX = p.x;
        leadY = p.y;
      }

      let circleIdx = 0;
      const R = ptr.radius;

      // 1. Central Heavy Liquid Nucleus (5 nodes)
      updateCircle(circleIdx++, ptr.x, ptr.y, R * 0.76);
      const coreAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
      for (let c = 0; c < 4; c++) {
        const ca = coreAngles[c] + Math.sin(t * 1.5 + c) * 0.2;
        const cd = R * (0.24 + 0.08 * Math.cos(t * 2.0 + c));
        updateCircle(circleIdx++, ptr.x + Math.cos(ca) * cd, ptr.y + Math.sin(ca) * cd * 0.7, R * 0.58);
      }

      // 2. 12 Undulating Octopus Tentacle Lobes (Deep organic "akabaka" wavy perimeter)
      for (let i = 0; i < 12; i++) {
        const baseAngle = (i * 2 * Math.PI) / 12;
        const angleWobble = Math.sin(t * 1.4 + i * 1.2) * 0.14;
        const currentAngle = baseAngle + angleWobble;

        // Base distance irregularity
        const irregularity = i % 3 === 0 ? 1.22 : i % 2 === 0 ? 0.88 : 1.08;
        const wave = 0.22 * Math.sin(t * 1.8 + i * 1.5) + 0.12 * Math.cos(t * 2.4 + i * 2.2);

        // Forward stretching: tentacles pointing towards direction of motion reach forward
        let stretch = 0;
        if (moveSpeed > 0.4) {
          const alignment = Math.cos(currentAngle - moveAngle);
          if (alignment > 0) {
            stretch = alignment * Math.min(0.48, moveSpeed * 0.038);
          } else {
            // Drag backward slightly
            stretch = alignment * Math.min(0.24, moveSpeed * 0.02);
          }
        }

        const reach = R * (0.84 * irregularity + wave + stretch);
        const lx = ptr.x + Math.cos(currentAngle) * reach;
        const ly = ptr.y + Math.sin(currentAngle) * reach * 0.72; // flattened slightly for 240px stage height
        const lobeR = R * (0.34 + 0.10 * Math.sin(t * 2.1 + i * 1.1));
        updateCircle(circleIdx++, lx, ly, lobeR);
      }

      // 3. 8 Chained Viscous Drag Body Nodes (The trailing octopus body)
      for (let k = 0; k < trail.length; k++) {
        const p = trail[k];
        updateCircle(circleIdx++, p.x, p.y, p.r);
      }

      // 4. 6 Outer Satellite Droplets / Pseudopods (Organic detachment flecks)
      for (let s = 0; s < 6; s++) {
        const satAngle = (s * 2 * Math.PI) / 6 + 0.35 + Math.sin(t * 1.2 + s) * 0.18;
        const satReach = R * (1.28 + 0.24 * Math.sin(t * 1.7 + s * 1.6));
        const sx = ptr.x + Math.cos(satAngle) * satReach;
        const sy = ptr.y + Math.sin(satAngle) * satReach * 0.72;
        const sr = R * (0.19 + 0.06 * Math.cos(t * 2.2 + s));
        updateCircle(circleIdx++, sx, sy, sr);
      }

      // 5. 5 Micro-splash Inlets (Creating deep negative crevices and fluid inlets)
      for (let m = 0; m < 5; m++) {
        const mAngle = (m * 2 * Math.PI) / 5 + 0.6;
        const mReach = R * (0.52 + 0.14 * Math.sin(t * 2.0 + m * 1.8));
        const mx = ptr.x + Math.cos(mAngle) * mReach;
        const my = ptr.y + Math.sin(mAngle) * mReach * 0.72;
        const mr = R * 0.24;
        updateCircle(circleIdx++, mx, my, mr);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    const updateCircle = (idx: number, cx: number, cy: number, r: number) => {
      const gEl = grayCirclesRef.current[idx];
      const bEl = blackCirclesRef.current[idx];
      if (!gEl || !bEl) return;

      if (r <= 1.0) {
        gEl.setAttribute("r", "0");
        bEl.setAttribute("r", "0");
      } else {
        gEl.setAttribute("cx", cx.toFixed(1));
        gEl.setAttribute("cy", cy.toFixed(1));
        // Solid gray shadow rim extends +14px beyond black core
        gEl.setAttribute("r", (r + 14).toFixed(1));

        bEl.setAttribute("cx", cx.toFixed(1));
        bEl.setAttribute("cy", cy.toFixed(1));
        bEl.setAttribute("r", r.toFixed(1));
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Pointer event handlers - activates paintbrush splatter where cursor hovers
  const updatePointer = (clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      pointerRef.current.active = false;
      return;
    }

    const relX = (clientX - rect.left) / rect.width;
    const relY = (clientY - rect.top) / rect.height;
    const svgX = relX * 1200;
    const svgY = relY * 240;

    // Active over the wordmark area
    if (svgY < 20 || svgY > 220) {
      pointerRef.current.active = false;
      return;
    }

    pointerRef.current.targetX = svgX;
    pointerRef.current.targetY = svgY;
    if (!pointerRef.current.active) {
      pointerRef.current.active = true;
      pointerRef.current.x = svgX;
      pointerRef.current.y = svgY;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    updatePointer(e.clientX, e.clientY);
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  const handleTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className={cn("relative w-full flex flex-col select-none", className)}>
      {/* Top Measuring Ruler Bar */}
      <div className="w-full flex items-center justify-between border-y border-neutral-300 dark:border-neutral-800 px-3 py-1 font-mono text-[9px] text-neutral-400 dark:text-neutral-600 bg-neutral-200/20 dark:bg-neutral-900/30">
        <span className="font-bold text-primary dark:text-primary">+</span>
        <div className="flex-1 mx-3 overflow-hidden flex items-center justify-between opacity-70">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "inline-block shrink-0",
                i % 10 === 0
                  ? "h-2 w-px bg-neutral-500 dark:bg-neutral-500"
                  : i % 5 === 0
                  ? "h-1.5 w-px bg-neutral-400 dark:bg-neutral-600"
                  : "h-1 w-px bg-neutral-300 dark:bg-neutral-800"
              )}
            />
          ))}
        </div>
        <span className="font-bold text-primary dark:text-primary">+</span>
      </div>

      {/* Main Interactive Liquid Wordmark Stage */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onTouchStart={handleTouch}
        onTouchMove={handleTouch}
        onTouchEnd={handlePointerLeave}
        className="relative w-full h-[180px] min-[420px]:h-[220px] sm:h-[280px] md:h-[340px] flex items-center justify-center overflow-hidden text-neutral-900 dark:text-neutral-100 cursor-crosshair"
      >
        <svg
          viewBox="0 0 1200 240"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs: CAD Silhouette ClipPath & Turbulent Fluid Liquid Filter */}
          <defs>
            {/* The CAD Glyph Silhouette Clip-Path (EvenOdd rule ensures holes in O, G, A, R stay transparent) */}
            <clipPath id={`cad-letters-clip-${uid}`} clipRule="evenodd">
              <path d={combinedFillD} fillRule="evenodd" />
            </clipPath>

            {/* Gooey filter with fractal turbulence displacement for organic liquid ink dispersion */}
            <filter
              id={`liquid-goo-${uid}`}
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur in="SourceGraphic" stdDeviation="11" result="blur" />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 28 -10"
                result="goo"
              />
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.038"
                numOctaves="2"
                seed="7"
                result="noise"
              />
              <feDisplacementMap
                in="goo"
                in2="noise"
                scale="13"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
            </filter>
          </defs>

          {/* Layer 1: Clipped Paintbrush Liquid Ink Splatter that flows under hover */}
          <g clipPath={`url(#cad-letters-clip-${uid})`}>
            {/* Underneath: Solid Gray Meniscus Shadow Fluid Layer */}
            <g
              filter={`url(#liquid-goo-${uid})`}
              className="fill-neutral-400 dark:fill-neutral-500 transition-colors duration-150"
            >
              {Array.from({ length: TOTAL_CIRCLES }).map((_, idx) => (
                <circle
                  key={`gray-circle-${idx}`}
                  ref={(el) => {
                    grayCirclesRef.current[idx] = el;
                  }}
                  cx="-500"
                  cy="-500"
                  r="0"
                />
              ))}
            </g>

            {/* On Top: Solid Dark Ink Core Layer */}
            <g
              filter={`url(#liquid-goo-${uid})`}
              className="fill-[#1b1b1b] dark:fill-[#fafafa] transition-colors duration-150"
            >
              {Array.from({ length: TOTAL_CIRCLES }).map((_, idx) => (
                <circle
                  key={`black-circle-${idx}`}
                  ref={(el) => {
                    blackCirclesRef.current[idx] = el;
                  }}
                  cx="-500"
                  cy="-500"
                  r="0"
                />
              ))}
            </g>
          </g>

          {/* Layer 2: CAD Blueprint Stroke Lines (Persistent technical drafting spec with tick marks) */}
          <path
            d={combinedStrokeD}
            className="stroke-neutral-800/80 dark:stroke-neutral-200/80 pointer-events-none transition-colors duration-150"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Layer 3: CAD Laser Tracking Dot (Tiny red/orange square at pointer position) */}
          <rect
            ref={laserDotRef}
            x="-20"
            y="-20"
            width="5"
            height="5"
            opacity="0"
            className="fill-primary pointer-events-none"
            style={{ fill: "var(--primary, #ff3b00)" }}
          />
        </svg>
      </div>

      {/* Bottom Measuring Ruler Bar */}
      <div className="w-full flex items-center justify-between border-y border-neutral-300 dark:border-neutral-800 px-3 py-1 font-mono text-[9px] text-neutral-400 dark:text-neutral-600 bg-neutral-200/20 dark:bg-neutral-900/30">
        <span className="font-bold text-primary dark:text-primary">+</span>
        <div className="flex-1 mx-3 overflow-hidden flex items-center justify-between opacity-70">
          {Array.from({ length: 80 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "inline-block shrink-0",
                i % 10 === 0
                  ? "h-2 w-px bg-neutral-500 dark:bg-neutral-500"
                  : i % 5 === 0
                  ? "h-1.5 w-px bg-neutral-400 dark:bg-neutral-600"
                  : "h-1 w-px bg-neutral-300 dark:bg-neutral-800"
              )}
            />
          ))}
        </div>
        <span className="font-bold text-primary dark:text-primary">+</span>
      </div>
    </div>
  );
}

const DEFAULT_ARCHITECTURAL_NAV = [
  {
    links: [
      { label: "Home", href: "#", active: true },
      { label: "About us", href: "#" },
      { label: "Contact us", href: "#" },
    ],
  },
  {
    links: [
      { label: "Components", href: "#" },
      { label: "Templates", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    links: [
      { label: "Documentation", href: "#" },
      { label: "Showcase", href: "#" },
      { label: "Changelog", href: "#" },
    ],
  },
];

const DEFAULT_ARCHITECTURAL_SOCIALS = [
  { label: "Website", href: "#" },
  { label: "Dribbble", href: "#" },
  { label: "FWA", href: "#" },
  { label: "Awwwards", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Linkedin", href: "#" },
];

const DEFAULT_ARCHITECTURAL_LEGAL = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms & Conditions", href: "#" },
  { label: "Cookie Policy", href: "#" },
];

export function ArchitecturalLiquidFooter({
  headline = "CRAFTED FOR EXTRAORDINARY INTERFACES",
  brandWordmark = "algorize",
  brandName = "Algorize",
  color,
  subscribeText = "Want to see more cool websites like this? Sign up for occasional updates from Avara UI.",
  addressLines = ["60 Martin Pl, Sydney,", "NSW 2000, Australia"],
  directionHref = "#",
  businessEmail = "business@avara.ui",
  inquiryEmail = "hello@avara.ui",
  navColumns = DEFAULT_ARCHITECTURAL_NAV,
  socials = DEFAULT_ARCHITECTURAL_SOCIALS,
  legalLinks = DEFAULT_ARCHITECTURAL_LEGAL,
  copyrightText,
  className,
}: ArchitecturalLiquidFooterProps & { className?: string }) {
  const dynamicAccent = accentStyle(color);
  const [email, setEmail] = React.useState("");
  const [isSubscribed, setIsSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setIsSubscribed(false);
    }, 3000);
  };

  const resolvedCopyright =
    copyrightText ||
    `©${new Date().getFullYear()} ${brandName.toUpperCase()}. ALL RIGHTS RESERVED. CONCEPT CRAFTED BY ${brandName.toUpperCase()}`;

  return (
    <footer
      style={dynamicAccent}
      className={cn(
        "w-full bg-[#f4f3ef] dark:bg-[#0c0d10] text-neutral-900 dark:text-neutral-100 border-t border-neutral-300 dark:border-neutral-800 transition-colors select-none font-sans",
        className
      )}
    >
      {/* ============================================================== */}
      {/* ROW 1: TOP HEADLINE & MULTI-COLUMN NAVIGATION GRID             */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-300 dark:border-neutral-800">
        {/* Cell 1: Bold Statement Banner */}
        <div className="md:col-span-4 p-6 sm:p-10 border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-800 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary block font-bold">
              CAD SPEC // MISSION
            </span>
            <h2 className="font-black text-2xl sm:text-3xl lg:text-4xl tracking-tight uppercase leading-[0.95] text-neutral-900 dark:text-white">
              {headline}
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 pt-6 font-mono text-[10px] text-neutral-400">
            <span className="text-primary font-bold">[+]</span>
            <span>01_ROOT</span>
            <span>--</span>
            <span>SYSTEM DRAFT</span>
          </div>
        </div>

        {/* Navigation Columns */}
        {navColumns.map((col, idx) => (
          <div
            key={idx}
            className="md:col-span-2 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-800 flex flex-col justify-between"
          >
            {col.title && (
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-400 mb-4 block">
                {col.title}
              </span>
            )}
            <ul className="space-y-3 sm:space-y-4">
              {col.links.map((link, lIdx) => (
                <li key={lIdx}>
                  <a
                    href={link.href}
                    className={cn(
                      "text-xs sm:text-sm font-semibold transition-colors duration-200 block",
                      link.active
                        ? "text-primary font-bold"
                        : "text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary"
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Cell 5: Isometric 3D Wireframe Brand Cube */}
        <div className="md:col-span-2 p-6 flex flex-col items-center justify-center bg-neutral-200/30 dark:bg-neutral-900/40">
          <IsometricWireframeCube brandLetter={brandName.charAt(0) || "A"} />
          <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mt-2 block">
            <span className="text-primary font-bold">[+]</span> 3D CAD SPEC
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ROW 2: SUBSCRIBE, ADDRESS, INQUIRIES & SOCIAL DETAILS GRID      */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 border-b border-neutral-300 dark:border-neutral-800">
        {/* Cell 1: Subscribe Form Box */}
        <div className="md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary block font-bold">
              SUBSCRIBE
            </span>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {subscribeText}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex items-center w-full mt-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={isSubscribed ? "Subscribed successfully!" : "Enter your email"}
              disabled={isSubscribed}
              className="flex-1 bg-transparent border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-xs text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary/40 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubscribed}
              className="px-3.5 py-2 border-y border-r border-neutral-300 dark:border-neutral-700 bg-neutral-900 text-white dark:bg-white dark:text-black hover:bg-primary hover:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground transition-colors text-xs font-bold cursor-pointer"
            >
              →
            </button>
          </form>
        </div>

        {/* Cell 2: Physical Address & Direction */}
        <div className="md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary block font-bold">
            ADDRESS
          </span>
          <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 font-medium leading-relaxed">
            {addressLines.map((line, lIdx) => (
              <div key={lIdx}>{line}</div>
            ))}
          </div>
          <div>
            <a
              href={directionHref}
              className="text-xs font-semibold underline underline-offset-4 hover:text-primary dark:hover:text-primary transition-colors"
            >
              Direction
            </a>
          </div>
        </div>

        {/* Cell 3: Business & General Inquiries */}
        <div className="md:col-span-3 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-300 dark:border-neutral-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary block font-bold">
              NEW BUSINESS
            </span>
            <a
              href={`mailto:${businessEmail}`}
              className="text-xs sm:text-sm font-semibold hover:text-primary dark:hover:text-primary transition-colors block"
            >
              {businessEmail}
            </a>
          </div>

          <div className="space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary block font-bold">
              GENERAL INQUIRIES
            </span>
            <a
              href={`mailto:${inquiryEmail}`}
              className="text-xs sm:text-sm font-semibold hover:text-primary dark:hover:text-primary transition-colors block"
            >
              {inquiryEmail}
            </a>
          </div>
        </div>

        {/* Cell 4: Social Network Grid */}
        <div className="md:col-span-3 p-6 sm:p-8 flex flex-col justify-between space-y-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary/80 dark:text-primary block font-bold">
            SOCIAL
          </span>
          <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs sm:text-sm font-medium">
            {socials.map((soc, sIdx) => (
              <a
                key={sIdx}
                href={soc.href}
                className="hover:text-primary dark:hover:text-primary transition-colors duration-150"
              >
                {soc.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* ROW 3: INTERACTIVE ARCHITECTURAL LIQUID INK WORDMARK           */}
      {/* ============================================================== */}
      <ArchitecturalLiquidWordmark text={brandWordmark} />

      {/* ============================================================== */}
      {/* ROW 4: BOTTOM LEGAL & COPYRIGHT SUB-BAR                        */}
      {/* ============================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-12 text-xs">
        <div className="md:col-span-8 p-4 sm:p-6 md:border-r border-b md:border-b-0 border-neutral-300 dark:border-neutral-800 flex items-center font-mono text-[10px] sm:text-xs text-neutral-600 dark:text-neutral-400">
          <span>{resolvedCopyright}</span>
        </div>
        <div className="md:col-span-4 p-4 sm:p-6 flex items-center justify-start md:justify-end gap-4 sm:gap-6 font-sans text-[11px] sm:text-xs font-medium text-neutral-600 dark:text-neutral-400">
          {legalLinks.map((leg, legIdx) => (
            <a
              key={legIdx}
              href={leg.href}
              className="hover:text-primary dark:hover:text-primary transition-colors whitespace-nowrap"
            >
              {leg.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
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
  wordmarkFooter,
  wordmark,
  editorialCta,
  architecturalLiquid,
  blueprintWordmark,
  className,
}: FooterProps) {
  const dynamicAccent = accentStyle(color);
  const linkSections = sections ?? DEFAULT_SECTIONS_BY_VARIANT[variant];
  const copyright =
    copyrightText ??
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  if (
    variant === "architectural-liquid" ||
    variant === "heron-blueprint" ||
    variant === "blueprint-liquid"
  ) {
    return (
      <footer style={dynamicAccent} className="w-full transition-colors">
        <ArchitecturalLiquidFooter
          color={color}
          headline={architecturalLiquid?.headline}
          brandWordmark={
            blueprintWordmark ??
            wordmark ??
            architecturalLiquid?.brandWordmark ??
            "algorize"
          }
          brandName={brandName}
          subscribeText={architecturalLiquid?.subscribeText}
          addressLines={architecturalLiquid?.addressLines}
          directionHref={architecturalLiquid?.directionHref}
          businessEmail={architecturalLiquid?.businessEmail}
          inquiryEmail={architecturalLiquid?.inquiryEmail}
          navColumns={architecturalLiquid?.navColumns}
          socials={architecturalLiquid?.socials}
          legalLinks={architecturalLiquid?.legalLinks}
          copyrightText={copyrightText ?? architecturalLiquid?.copyrightText}
          className={className}
        />
      </footer>
    );
  }

  if (variant === "editorial-card" || variant === "tilted-cta") {
    return (
      <footer style={dynamicAccent} className="w-full transition-colors">
        <EditorialCardFooter
          brandName={brandName}
          copyrightText={copyrightText}
          tagline={tagline}
          editorialCta={editorialCta}
          socialLinks={socialLinks}
          color={color}
          className={className}
        />
      </footer>
    );
  }

  if (variant === "wordmark-glow") {
    return (
      <div style={dynamicAccent} className={cn("w-full transition-colors", className)}>
        <WordmarkFooter
          logo={logo}
          tagline={
            tagline !== "Elevate your web applications with fluid, production-ready animated components."
              ? tagline
              : wordmarkFooter?.tagline ?? "AI first-round screening for recruiters. Algorize checks every applicant and runs the first interview, day or night."
          }
          columns={wordmarkFooter?.columns}
          contact={wordmarkFooter?.contact}
          social={wordmarkFooter?.social}
          legal={wordmarkFooter?.legal}
          labels={wordmarkFooter?.labels}
          copyright={wordmarkFooter?.copyright ?? copyrightText ?? (brandName || "Avara UI")}
          bottomLine={wordmarkFooter?.bottomLine}
          wordmark={wordmark ?? wordmarkFooter?.wordmark ?? "Algorize"}
        />
      </div>
    );
  }

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
