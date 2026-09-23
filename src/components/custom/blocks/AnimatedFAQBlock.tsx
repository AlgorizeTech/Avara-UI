"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MapPin, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// FAQ DATA TYPES & SUNLIT NATURE ITEMS
// ==========================================

export interface FAQItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  /** Pure sunlit nature photography */
  image: string;
  location: string;
  coordinates: string;
  /** Dynamic morphing dimensions for Uniserve-style slow transition */
  height: number;
  maxWidth: number;
  clipCut: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "installation",
    category: "CLI & Setup",
    question: "How do I install and use components in my project?",
    answer:
      "Installing components takes seconds using the official shadcn CLI. The code drops straight into your repository as pure TypeScript and Tailwind CSS — with zero third-party wrapper dependencies or build configuration headaches.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1400&auto=format&fit=crop&q=85",
    location: "Mount Rainier National Park, Washington",
    coordinates: "46.8523° N, 121.7603° W",
    height: 420,
    maxWidth: 460,
    clipCut: "2.5rem",
  },
  {
    id: "theming",
    category: "Tailwind & Theming",
    question: "Can I customize the colors, dark mode, and border radiuses?",
    answer:
      "Yes, absolutely. All components are architected around standard Tailwind CSS variables and OKLCH design tokens. Modifying your primary color, font family, or container radius automatically updates every component across both light and dark themes.",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1400&auto=format&fit=crop&q=85",
    location: "Cascades Redwood Rainforest, Oregon",
    coordinates: "43.7694° N, 122.5694° W",
    height: 340,
    maxWidth: 530,
    clipCut: "2rem",
  },
  {
    id: "licensing",
    category: "MIT Licensing",
    question: "Is Docs UI free to use for commercial client projects and SaaS?",
    answer:
      "Docs UI is 100% free and open-source under the permissive MIT license. You can use it in personal side projects, client portals, venture-backed SaaS applications, or commercial products with zero royalty fees or attribution requirements.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1400&auto=format&fit=crop&q=85",
    location: "Big Sur Pacific Coastline, California",
    coordinates: "36.2704° N, 121.8081° W",
    height: 390,
    maxWidth: 480,
    clipCut: "2.75rem",
  },
  {
    id: "performance",
    category: "Performance & FPS",
    question: "How do you achieve 60fps animations with zero layout shift?",
    answer:
      "Our motion components rely exclusively on GPU-accelerated CSS properties (translate3d, scale, opacity) and Framer Motion spring physics. We avoid animating height or layout reflow properties whenever possible, guaranteeing zero CLS and a 100% Lighthouse score.",
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1400&auto=format&fit=crop&q=85",
    location: "Tre Cime di Lavaredo, Italian Dolomites",
    coordinates: "46.6186° N, 12.3028° E",
    height: 330,
    maxWidth: 540,
    clipCut: "2rem",
  },
  {
    id: "accessibility",
    category: "Accessibility",
    question: "Are the components accessible and keyboard navigable?",
    answer:
      "Accessibility is deeply integrated from day one. Headless primitives are powered by Radix UI, providing full WAI-ARIA 1.2 compliance, focus rings, roving tab indices, screen-reader announcements, and native support for reduced-motion preferences.",
    image:
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=1400&auto=format&fit=crop&q=85",
    location: "Sahara Golden Dunes, Merzouga",
    coordinates: "31.0802° N, 4.0134° W",
    height: 440,
    maxWidth: 440,
    clipCut: "3rem",
  },
  {
    id: "code-ownership",
    category: "Code Ownership",
    question: "Why copy-paste code instead of a giant monolithic NPM package?",
    answer:
      "Monolithic packages bundle unnecessary styles, risk breaking on major version upgrades, and limit deep customization. By placing the component directly inside your codebase, you retain 100% code ownership, zero bloat, and infinite freedom to adapt it as you see fit.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1400&auto=format&fit=crop&q=85",
    location: "Lake Moraine Alpine Valley, Alberta",
    coordinates: "51.3276° N, 116.1822° W",
    height: 360,
    maxWidth: 510,
    clipCut: "2.25rem",
  },
];

// ==========================================
// MAIN ANIMATED FAQ COMPONENT
// ==========================================

export interface AnimatedFAQBlockProps {
  items?: FAQItem[];
  className?: string;
  defaultActiveId?: string;
}

export function AnimatedFAQBlock({
  items = FAQ_ITEMS,
  className,
  defaultActiveId = FAQ_ITEMS[0].id,
}: AnimatedFAQBlockProps) {
  const [activeId, setActiveId] = useState<string>(defaultActiveId);
  const activeItem = items.find((i) => i.id === activeId) || items[0];

  const handleToggle = (id: string) => {
    setActiveId(id);
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center",
        className,
      )}
    >
      {/* ───────────────────────────────────────────────────────────
          LEFT COLUMN: VERTICALLY CENTERED UNISERVE NATURE CANVAS
          ─────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 w-full lg:sticky lg:top-24 self-center flex flex-col items-center justify-center min-h-[480px] py-6">
        {/* Dynamic morphing canvas container — fast & snappy width and height animation */}
        <motion.div
          layout
          animate={{
            height: activeItem.height,
            maxWidth: activeItem.maxWidth,
          }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="relative w-full transition-all flex items-center justify-center"
        >
          {/* ═══════════════════════════════════════════════════════════
              ARCHITECTURAL CROSSHAIR GUIDES & CORNER REGISTRATION DOTS
              (As seen in uniservecorp.com & user reference image)
              ═══════════════════════════════════════════════════════════ */}

          {/* Extended Horizontal Guide: Top */}
          <div className="pointer-events-none absolute -top-[1px] -left-10 -right-10 h-[1px] bg-zinc-300/80 dark:bg-zinc-800/80" />

          {/* Extended Horizontal Guide: Bottom */}
          <div className="pointer-events-none absolute -bottom-[1px] -left-10 -right-10 h-[1px] bg-zinc-300/80 dark:bg-zinc-800/80" />

          {/* Extended Vertical Guide: Left */}
          <div className="pointer-events-none absolute -left-[1px] -top-10 -bottom-10 w-[1px] bg-zinc-300/80 dark:bg-zinc-800/80" />

          {/* Extended Vertical Guide: Right */}
          <div className="pointer-events-none absolute -right-[1px] -top-10 -bottom-10 w-[1px] bg-zinc-300/80 dark:bg-zinc-800/80" />

          {/* 4 Corner Square Dots / Registration Markers */}
          <div
            className="pointer-events-none absolute -top-1 -left-1 size-2 bg-zinc-400 dark:bg-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded-[1px] shadow-xs z-20"
            title="Top Left Anchor"
          />
          <div
            className="pointer-events-none absolute -top-1 -right-1 size-2 bg-zinc-400 dark:bg-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded-[1px] shadow-xs z-20"
            title="Top Right Anchor"
          />
          <div
            className="pointer-events-none absolute -bottom-1 -left-1 size-2 bg-zinc-400 dark:bg-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded-[1px] shadow-xs z-20"
            title="Bottom Left Anchor"
          />
          <div
            className="pointer-events-none absolute -bottom-1 -right-1 size-2 bg-zinc-400 dark:bg-zinc-500 border border-zinc-300 dark:border-zinc-700 rounded-[1px] shadow-xs z-20"
            title="Bottom Right Anchor"
          />

          {/* Subtle Ambient Radial Backlight */}
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-primary/8 dark:bg-primary/5 blur-2xl opacity-60" />

          {/* ═══════════════════════════════════════════════════════════
              CHAMFERED NATURE IMAGE CONTAINER (Cut Top-Left & Bottom-Right)
              Theme-Aware Light Background in Light Mode, Dark in Dark Mode
              ═══════════════════════════════════════════════════════════ */}
          <div
            className="relative w-full h-full overflow-hidden bg-zinc-100/90 dark:bg-zinc-900/90 shadow-xl dark:shadow-2xl border border-zinc-200/70 dark:border-white/10 transition-all"
            style={{
              clipPath: `polygon(${activeItem.clipCut} 0%, 100% 0%, 100% calc(100% - ${activeItem.clipCut}), calc(100% - ${activeItem.clipCut}) 100%, 0% 100%, 0% ${activeItem.clipCut})`,
            }}
          >
            {/* Instant Simultaneous Crossfade Nature Image via AnimatePresence */}
            <AnimatePresence>
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeItem.image}
                  alt={activeItem.question}
                  className="w-full h-full object-cover object-center filter brightness-[0.97] contrast-[1.03]"
                />

                {/* Soft Light-Aware Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 dark:from-black/75 dark:via-black/20 dark:to-black/35 pointer-events-none" />

                {/* Top Corner Watermark Tag */}
                <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/85 dark:bg-black/60 backdrop-blur-md border border-zinc-200/70 dark:border-white/15 text-[11px] font-mono tracking-wider text-zinc-900 dark:text-white shadow-xs">
                    <Compass className="size-3 text-primary" />
                    <span>{activeItem.category}</span>
                  </div>

                  <span className="font-mono text-[10px] text-zinc-700 dark:text-white/70 tracking-widest uppercase bg-white/75 dark:bg-black/50 border border-zinc-200/50 dark:border-white/10 px-2 py-0.5 rounded backdrop-blur-xs shadow-xs">
                    {activeItem.coordinates}
                  </span>
                </div>

                {/* Bottom Nature Caption & Location */}
                <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/70 backdrop-blur-md border border-zinc-200/80 dark:border-white/15 text-xs text-zinc-900 dark:text-white font-medium shadow-sm">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{activeItem.location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Chamfered Border Outline via SVG to preserve crisp angle */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full text-zinc-400/30 dark:text-white/20"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              <polygon
                points="8 0, 100 0, 100 92, 92 100, 0 100, 0 8"
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </motion.div>

        {/* Dimension indicator tag below */}
        <div className="mt-6 flex items-center gap-4 text-[11px] font-mono text-muted-foreground/80">
          <span>
            W: <strong className="text-foreground">{activeItem.maxWidth}px</strong>
          </span>
          <span>•</span>
          <span>
            H: <strong className="text-foreground">{activeItem.height}px</strong>
          </span>
          <span>•</span>
          <span className="text-foreground/70 font-medium">Uniserve Dynamic Canvas</span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────
          RIGHT COLUMN: ACCORDION QUESTIONS LIST
          ─────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 w-full space-y-3 sm:space-y-4">
        {items.map((item, idx) => {
          const isActive = item.id === activeId;
          const num = String(idx + 1).padStart(2, "0");

          return (
            <motion.div
              key={item.id}
              initial={false}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                isActive
                  ? "border-primary/50 bg-card shadow-lg ring-1 ring-primary/20 dark:bg-zinc-900/60"
                  : "border-border/60 bg-card/40 hover:border-border hover:bg-card/80 dark:bg-zinc-900/20",
              )}
            >
              <button
                type="button"
                onClick={() => handleToggle(item.id)}
                aria-expanded={isActive}
                className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none transition-colors group"
              >
                <div className="flex items-start gap-3.5 sm:gap-4 min-w-0">
                  {/* Number Badge */}
                  <span
                    className={cn(
                      "shrink-0 font-mono text-xs font-semibold px-2 py-1 rounded-md border transition-colors mt-0.5",
                      isActive
                        ? "bg-primary text-primary-foreground border-primary shadow-sm"
                        : "bg-muted/80 text-muted-foreground border-border/50 group-hover:text-foreground group-hover:border-primary/30",
                    )}
                  >
                    {num}
                  </span>

                  <div className="min-w-0">
                    {/* Category Tag */}
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={cn(
                          "text-[10px] font-medium uppercase tracking-wider",
                          isActive
                            ? "text-primary font-semibold"
                            : "text-muted-foreground/70",
                        )}
                      >
                        {item.category}
                      </span>
                    </div>

                    {/* Question Title */}
                    <h3
                      className={cn(
                        "text-sm sm:text-base font-semibold leading-snug transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-foreground/80 group-hover:text-foreground",
                      )}
                    >
                      {item.question}
                    </h3>
                  </div>
                </div>

                {/* Animated Expand Chevron */}
                <motion.div
                  animate={{ rotate: isActive ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className={cn(
                    "shrink-0 size-7 rounded-full flex items-center justify-center border transition-colors mt-0.5",
                    isActive
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-muted/50 border-border/50 text-muted-foreground group-hover:text-foreground group-hover:border-primary/20",
                  )}
                >
                  <ChevronDown className="size-4" />
                </motion.div>
              </button>

              {/* Accordion Expandable Answer */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-border/40 text-sm text-muted-foreground leading-relaxed">
                      <p className="pt-3 text-[13px] sm:text-sm text-foreground/80 dark:text-zinc-300">
                        {item.answer}
                      </p>

                      <div className="mt-3.5 flex items-center justify-between gap-2 pt-3 border-t border-border/30 text-xs">
                        <span className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
                          <MapPin className="size-3 text-primary" />
                          <span>{item.location}</span>
                        </span>
                        <span className="font-mono text-[11px] text-primary/90">
                          {item.maxWidth}×{item.height}px
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default AnimatedFAQBlock;
