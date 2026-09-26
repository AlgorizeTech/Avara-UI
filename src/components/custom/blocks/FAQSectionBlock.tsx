"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Compass, MapPin, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// ==========================================
// MOTION CONSTANTS & KEYFRAMES
// The canvas eases to each item's size; the photos crossfade, the new one
// settling from a touch larger while the old one shrinks away; the answer
// panels open and close to their own height; the chevron turns over.
// ==========================================
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const STYLES = `
@keyframes faq-photo-in { from { opacity: 0; transform: scale(1.04); } }
@keyframes faq-photo-out { to { opacity: 0; transform: scale(0.98); } }
.faq-photo-in { animation: faq-photo-in 0.4s ${EASE} backwards; }
.faq-photo-out { animation: faq-photo-out 0.4s ${EASE} forwards; }
`;

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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1464822759023-fed622ff2c3b-1790145143491-1790224284663.webp",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1448375240586-882707db888b-1790145143491-1790224284683.webp",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224285/photo-1507525428034-b723cf961d3e-1790146212208-1790224284653.webp",
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
      "Our motion components rely exclusively on GPU-accelerated CSS properties (translate3d, scale, opacity) and spring curves rendered as native CSS easing. We avoid animating height or layout reflow properties whenever possible, guaranteeing zero CLS and a 100% Lighthouse score.",
    image:
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1506744038136-46273834b3fb-1790146212208-1790224284681.webp",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224284/photo-1473448912268-2022ce9509d8-1790148865110-1790224284673.webp",
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
      "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790224415/photo-1470071459604-3b5ec3a7fe05-1790146212205-1790224416316.webp",
    location: "Lake Moraine Alpine Valley, Alberta",
    coordinates: "51.3276° N, 116.1822° W",
    height: 360,
    maxWidth: 510,
    clipCut: "2.25rem",
  },
];

interface PhotoLayer {
  key: number;
  item: FAQItem;
  leaving: boolean;
}

function usePhotoLayers(item: FAQItem) {
  const [layers, setLayers] = useState<PhotoLayer[]>(() => [{ key: 0, item, leaving: false }]);
  const nextKey = useRef(1);

  const top = layers[layers.length - 1];
  if (top.item.id !== item.id) {
    setLayers([
      ...layers.map((layer) => (layer.leaving ? layer : { ...layer, leaving: true })),
      { key: nextKey.current++, item, leaving: false },
    ]);
  } else if (top.item !== item) {
    setLayers([...layers.slice(0, -1), { ...top, item }]);
  }

  const drop = useCallback((key: number) => {
    setLayers((current) => current.filter((layer) => layer.key !== key));
  }, []);

  const leavingKeys = layers.filter((layer) => layer.leaving).map((layer) => layer.key).join();
  useEffect(() => {
    if (!leavingKeys) return;
    const t = window.setTimeout(() => {
      setLayers((current) => current.filter((layer) => !layer.leaving || !leavingKeys.split(",").includes(String(layer.key))));
    }, 500);
    return () => window.clearTimeout(t);
  }, [leavingKeys]);

  return { layers, drop };
}

// ==========================================
// INNER ANIMATED FAQ GRID (CANVAS + ACCORDION)
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
  const photos = usePhotoLayers(activeItem);

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
      <style>{STYLES}</style>
      {/* ───────────────────────────────────────────────────────────
          LEFT COLUMN: VERTICALLY CENTERED NATURE CANVAS
          ─────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 w-full lg:sticky lg:top-24 self-center flex flex-col items-center justify-center min-h-[480px] py-6">
        {/* Dynamic morphing canvas container */}
        <div
          style={{
            height: activeItem.height,
            maxWidth: activeItem.maxWidth,
            transition: `height 0.45s ${EASE}, max-width 0.45s ${EASE}`,
          }}
          className="relative w-full flex items-center justify-center"
        >
          {/* Extended Horizontal Guide: Top */}
          <div className="pointer-events-none absolute -top-[1px] -left-10 -right-10 h-[1px] bg-border" />

          {/* Extended Horizontal Guide: Bottom */}
          <div className="pointer-events-none absolute -bottom-[1px] -left-10 -right-10 h-[1px] bg-border" />

          {/* Extended Vertical Guide: Left */}
          <div className="pointer-events-none absolute -left-[1px] -top-10 -bottom-10 w-[1px] bg-border" />

          {/* Extended Vertical Guide: Right */}
          <div className="pointer-events-none absolute -right-[1px] -top-10 -bottom-10 w-[1px] bg-border" />

          {/* 4 Corner Square Dots / Registration Markers */}
          <div
            className="pointer-events-none absolute -top-1 -left-1 size-2 bg-muted-foreground border border-border rounded-[1px] shadow-xs z-20"
            title="Top Left Anchor"
          />
          <div
            className="pointer-events-none absolute -top-1 -right-1 size-2 bg-muted-foreground border border-border rounded-[1px] shadow-xs z-20"
            title="Top Right Anchor"
          />
          <div
            className="pointer-events-none absolute -bottom-1 -left-1 size-2 bg-muted-foreground border border-border rounded-[1px] shadow-xs z-20"
            title="Bottom Left Anchor"
          />
          <div
            className="pointer-events-none absolute -bottom-1 -right-1 size-2 bg-muted-foreground border border-border rounded-[1px] shadow-xs z-20"
            title="Bottom Right Anchor"
          />

          {/* Subtle Ambient Radial Backlight */}
          <div className="pointer-events-none absolute -inset-6 rounded-3xl bg-primary/8 dark:bg-primary/5 blur-2xl opacity-60" />

          {/* Chamfered Nature Image Container (Cut Top-Left & Bottom-Right) */}
          <div
            className="relative w-full h-full overflow-hidden bg-muted/90 shadow-xl dark:shadow-2xl border border-border/70 transition-all"
            style={{
              clipPath: `polygon(${activeItem.clipCut} 0%, 100% 0%, 100% calc(100% - ${activeItem.clipCut}), calc(100% - ${activeItem.clipCut}) 100%, 0% 100%, 0% ${activeItem.clipCut})`,
            }}
          >
            {photos.layers.map(({ key, item: photo, leaving }) => (
              <div
                key={key}
                onAnimationEnd={(e) => {
                  if (leaving && e.target === e.currentTarget) photos.drop(key);
                }}
                className={cn(
                  "absolute inset-0 w-full h-full",
                  leaving ? "faq-photo-out" : "faq-photo-in",
                )}
              >
                <img
                  src={photo.image}
                  alt={photo.question}
                  className="w-full h-full object-cover object-center filter brightness-[0.97] contrast-[1.03]"
                />

                {/* Soft Light-Aware Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20 dark:from-black/75 dark:via-black/20 dark:to-black/35 pointer-events-none" />

                {/* Top Corner Watermark Tag */}
                <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/70 text-[11px] font-mono tracking-wider text-foreground shadow-xs">
                    <Compass className="size-3 text-primary" />
                    <span>{photo.category}</span>
                  </div>

                  <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase bg-background/75 border border-border/50 px-2 py-0.5 rounded backdrop-blur-xs shadow-xs">
                    {photo.coordinates}
                  </span>
                </div>

                {/* Bottom Nature Caption & Location */}
                <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-md border border-border/80 text-xs text-foreground font-medium shadow-sm">
                    <MapPin className="size-3.5 text-primary shrink-0" />
                    <span className="truncate">{photo.location}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Chamfered Border Outline via SVG to preserve crisp angle */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full text-foreground/20"
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
        </div>

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
          <span className="text-foreground/70 font-medium">Dynamic Nature Canvas</span>
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
            <div
              key={item.id}
              className={cn(
                "rounded-2xl border transition-all duration-300 overflow-hidden",
                isActive
                  ? "border-primary/50 bg-card shadow-lg ring-1 ring-primary/20"
                  : "border-border/60 bg-card/40 hover:border-border hover:bg-card/80",
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
                <div
                  style={{
                    rotate: isActive ? "180deg" : "0deg",
                    transition:
                      "rotate 0.25s cubic-bezier(0.42, 0, 0.58, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  className={cn(
                    "shrink-0 size-7 rounded-full flex items-center justify-center border transition-colors mt-0.5",
                    isActive
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-muted/50 border-border/50 text-muted-foreground group-hover:text-foreground group-hover:border-primary/20",
                  )}
                >
                  <ChevronDown className="size-4" />
                </div>
              </button>

              {/* Accordion Expandable Answer */}
              <div
                inert={!isActive}
                style={{
                  display: "grid",
                  gridTemplateRows: isActive ? "1fr" : "0fr",
                  opacity: isActive ? 1 : 0,
                  transition: `grid-template-rows 0.25s ${EASE}, opacity 0.25s ${EASE}`,
                }}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 border-t border-border/40 text-sm text-muted-foreground leading-relaxed">
                    <p className="pt-3 text-[13px] sm:text-sm text-foreground/80">
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// COMPLETE WEBSITE FAQ SECTION COMPONENT
// Matching the homepage FAQ Section layout
// ==========================================

export interface FAQSectionProps {
  id?: string;
  className?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  items?: FAQItem[];
  showGlows?: boolean;
  defaultActiveId?: string;
}

export function FAQSection({
  id = "faq",
  className,
  eyebrow = "Common Queries",
  title = "Frequently Asked Questions",
  description = "Everything you need to know about using Docs UI, component integration, licensing, and custom styling.",
  items = FAQ_ITEMS,
  showGlows = true,
  defaultActiveId,
}: FAQSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 md:py-24 relative overflow-hidden bg-background border-t border-border/40",
        className
      )}
    >
      {showGlows && (
        <>
          {/* Ambient background glows */}
          <div className="pointer-events-none absolute top-10 left-1/4 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-60" />
          <div className="pointer-events-none absolute bottom-10 right-1/4 w-[500px] h-[300px] bg-primary/5 rounded-full blur-3xl opacity-50" />
        </>
      )}

      <div className="max-w-[1320px] mx-auto px-6 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {eyebrow && (
            <div className="inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] backdrop-blur px-3 py-1 text-[12px] text-foreground/90 mb-4 border border-foreground/[0.06]">
              <Sparkles className="size-3.5 text-primary" />
              <span>{eyebrow}</span>
            </div>
          )}

          <h2 className="font-serif font-normal text-[clamp(26px,3.6vw,46px)] leading-[1.15] tracking-[-0.02em] text-foreground mb-3">
            {title}
          </h2>

          {description && (
            <p className="text-[15px] leading-[1.65] text-foreground/45 max-w-[490px] mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Animated FAQ Nature Canvas + Accordion */}
        <AnimatedFAQBlock items={items} defaultActiveId={defaultActiveId} />
      </div>
    </section>
  );
}

export default FAQSection;
