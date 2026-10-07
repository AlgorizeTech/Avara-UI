"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronDown, MapPin, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { FAQ_ITEMS, type FAQItem } from "./animated-faq-data";
import {
  CLIInstallationVisual,
  ThemingVisual,
  LicensingVisual,
  PerformanceVisual,
} from "./AnimatedFAQVisuals";

export type { FAQItem };

function renderItemVisual(item: FAQItem) {
  switch (item.id) {
    case "installation":
      return <CLIInstallationVisual />;
    case "theming":
      return <ThemingVisual />;
    case "licensing":
      return <LicensingVisual />;
    case "performance":
      return <PerformanceVisual />;
    default:
      return (
        <img
          src={item.image}
          alt={item.question}
          className="w-full h-full object-cover object-center filter brightness-[0.97] contrast-[1.03]"
        />
      );
  }
}

// ==========================================
// MOTION
// The canvas eases to each item's size; the photos crossfade, the new one
// settling from a touch larger while the old one shrinks away; the answer
// panels open and close to their own height; the chevron turns over.
// ==========================================
const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

const STYLES = `
@keyframes animated-faq-photo-in { from { opacity: 0; transform: scale(1.04); } }
@keyframes animated-faq-photo-out { to { opacity: 0; transform: scale(0.98); } }
.animated-faq-photo-in { animation: animated-faq-photo-in 0.4s ${EASE} backwards; }
.animated-faq-photo-out { animation: animated-faq-photo-out 0.4s ${EASE} forwards; }
`;

interface PhotoLayer {
  key: number;
  item: FAQItem;
  leaving: boolean;
}

/**
 * The photos on the canvas: the active item's on top, coming in, over any
 * still fading out. Each leaving photo keeps the item it showed.
 */
function usePhotoLayers(item: FAQItem) {
  const [layers, setLayers] = useState<PhotoLayer[]>(() => [{ key: 0, item, leaving: false }]);

  // A new item: every photo showing starts to leave, and the new one comes in on top.
  const top = layers[layers.length - 1];
  if (top.item.id !== item.id) {
    setLayers([
      ...layers.map((layer) => (layer.leaving ? layer : { ...layer, leaving: true })),
      { key: top.key + 1, item, leaving: false },
    ]);
  } else if (top.item !== item) {
    setLayers([...layers.slice(0, -1), { ...top, item }]);
  }

  const drop = useCallback((key: number) => {
    setLayers((current) => current.filter((layer) => layer.key !== key));
  }, []);

  // In case a photo's animation never ends (a hidden tab, `display: none`).
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
// MAIN ANIMATED FAQ COMPONENT
// ==========================================

export interface AnimatedFAQBlockProps {
  items?: FAQItem[];
  className?: string;
  defaultActiveId?: string;
  showTags?: boolean;
  showLocation?: boolean;
  showDimensions?: boolean;
}

export function AnimatedFAQBlock({
  items = FAQ_ITEMS,
  className,
  defaultActiveId = FAQ_ITEMS[0].id,
  showTags = true,
  showLocation = true,
  showDimensions = true,
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
          LEFT COLUMN: VERTICALLY CENTERED UNISERVE NATURE CANVAS
          ─────────────────────────────────────────────────────────── */}
      <div className="lg:col-span-6 w-full lg:sticky lg:top-24 self-center flex flex-col items-center justify-center min-h-[480px] py-6">
        {/* Dynamic morphing canvas container — fast & snappy width and height animation */}
        <div
          style={{
            height: activeItem.height,
            maxWidth: activeItem.maxWidth,
            transition: `height 0.45s ${EASE}, max-width 0.45s ${EASE}`,
          }}
          className="relative w-full flex items-center justify-center"
        >
          {/* ═══════════════════════════════════════════════════════════
              ARCHITECTURAL CROSSHAIR GUIDES & CORNER REGISTRATION DOTS
              (As seen in uniservecorp.com & user reference image)
              ═══════════════════════════════════════════════════════════ */}

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

          {/* ═══════════════════════════════════════════════════════════
              CHAMFERED CONTAINER (Cut Top-Left & Bottom-Right)
              Exact 1px Inset Border technique to ensure 100% clean single border
              ═══════════════════════════════════════════════════════════ */}
          <div
            className="relative w-full h-full shadow-lg dark:shadow-2xl bg-border transition-all"
            style={{
              clipPath: `polygon(${activeItem.clipCut} 0%, 100% 0%, 100% calc(100% - ${activeItem.clipCut}), calc(100% - ${activeItem.clipCut}) 100%, 0% 100%, 0% ${activeItem.clipCut})`,
            }}
          >
            {/* Inner background layer with exact 1px inset so the cut corners have a crisp 1px border with no double lines */}
            <div
              className="absolute inset-[1px] overflow-hidden bg-card dark:bg-neutral-950"
              style={{
                clipPath: `polygon(${activeItem.clipCut} 0%, 100% 0%, 100% calc(100% - ${activeItem.clipCut}), calc(100% - ${activeItem.clipCut}) 100%, 0% 100%, 0% ${activeItem.clipCut})`,
              }}
            >
              {/* Instant Simultaneous Crossfade Visual Preview */}
              {photos.layers.map(({ key, item: photo, leaving }) => (
                <div
                  key={key}
                  onAnimationEnd={(e) => {
                    if (leaving && e.target === e.currentTarget) photos.drop(key);
                  }}
                  className={cn(
                    "absolute inset-0 w-full h-full overflow-hidden",
                    leaving ? "animated-faq-photo-out" : "animated-faq-photo-in",
                  )}
                >
                  {renderItemVisual(photo)}

                  {/* Top Corner Watermark Tag */}
                  {showTags && (
                    <div className="absolute top-4 left-5 right-5 flex items-center justify-between text-xs pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background/85 backdrop-blur-md border border-border/70 text-[11px] font-mono tracking-wider text-foreground shadow-xs">
                        <Compass className="size-3 text-primary" />
                        <span>{photo.category}</span>
                      </div>

                      <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase bg-background/75 border border-border/50 px-2 py-0.5 rounded backdrop-blur-xs shadow-xs">
                        {photo.coordinates}
                      </span>
                    </div>
                  )}

                  {/* Bottom Nature Caption & Location */}
                  {showLocation && (
                    <div className="absolute bottom-4 left-5 right-5 pointer-events-none">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-background/90 backdrop-blur-md border border-border/80 text-xs text-foreground font-medium shadow-sm">
                        <MapPin className="size-3.5 text-primary shrink-0" />
                        <span className="truncate">{photo.location}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dimension indicator tag below */}
        {showDimensions && (
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
        )}
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

                {/* Animated Expand Chevron — turns over alongside its colour change. */}
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

              {/* Accordion Expandable Answer — opens to its own height; closed,
                  it is out of the way of the keyboard and screen readers too. */}
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

                    {(showLocation || showDimensions) && (
                      <div className="mt-3.5 flex items-center justify-between gap-2 pt-3 border-t border-border/30 text-xs">
                        {showLocation ? (
                          <span className="text-xs text-muted-foreground/80 flex items-center gap-1.5">
                            <MapPin className="size-3 text-primary" />
                            <span>{item.location}</span>
                          </span>
                        ) : <span />}
                        {showDimensions && (
                          <span className="font-mono text-[11px] text-primary/90">
                            {item.maxWidth}×{item.height}px
                          </span>
                        )}
                      </div>
                    )}
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

export default AnimatedFAQBlock;
