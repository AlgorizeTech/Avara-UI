"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { getThemeStyles } from "./timeline-theme";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type TimelineColor =
  | "indigo"
  | "rose"
  | "emerald"
  | "zinc"
  | (string & {});
export type TimelineVariant = "default" | "glass" | "minimal";
export type TimelineLayout = "left" | "center" | "right";

// ==========================================
// INTERFACES
// ==========================================
export type TimelineStatus =
  | "completed"
  | "current"
  | "upcoming"
  | (string & {});

export interface TimelineItemType {
  id: string | number;
  title: string;
  date: string;
  description?: string;
  icon?: React.ElementType;
  content?: React.ReactNode;
  action?: React.ReactNode; // e.g., a button
  status?: TimelineStatus;
}

export interface TimelineBlockProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: TimelineItemType[];
  color?: TimelineColor;
  variant?: TimelineVariant;
  layout?: TimelineLayout;
  animate?: boolean;
}

// ==========================================
// MAIN COMPONENT
// ==========================================
export const TimelineBlock = forwardRef<HTMLDivElement, TimelineBlockProps>(
  (
    {
      items,
      color = "primary",
      variant = "default",
      layout = "left",
      animate = true,
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (animate && containerRef.current) {
        const elements = containerRef.current.querySelectorAll(
          ".timeline-item-anim",
        );
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.15,
            ease: "power3.out",
            clearProps: "all",
          },
        );
      }
    }, [animate, items, variant, layout, color]);

    return (
      // Every breakpoint below is a container query, not a media query. The
      // timeline is nearly always inside a constrained column, so the viewport
      // says nothing useful about how much room the rail actually has — a
      // 672px timeline in a 1400px window would otherwise split into two
      // 288px columns and shred every card.
      <div
        ref={ref}
        className={cn("@container/timeline w-full py-4", className)}
        style={style}
        {...props}
      >
        <div
          ref={containerRef}
          className="relative flex flex-col gap-8 @xl/timeline:gap-12"
        >
          {items.map((item, index) => (
            <TimelineNode
              key={item.id}
              item={item}
              index={index}
              isLast={index === items.length - 1}
              theme={theme}
              variant={variant}
              layout={layout}
            />
          ))}
        </div>
      </div>
    );
  },
);
TimelineBlock.displayName = "TimelineBlock";

// ==========================================
// NODE COMPONENT
// ==========================================
function TimelineNode({
  item,
  index,
  isLast,
  theme,
  variant,
  layout,
}: {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
  theme: Record<string, string>;
  variant: TimelineVariant;
  layout: TimelineLayout;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const Icon = item.icon;
  const hasContent = Boolean(item.content);

  const status = item.status || "completed";
  const isCompleted = status === "completed";
  const isCurrent = status === "current";
  const isUpcoming = status === "upcoming";

  // Center layout magic (only applies once the rail itself is wide enough —
  // see @xl/timeline below; narrower than that it falls back to the left rail)
  const isEven = index % 2 === 0;
  const isCenter = layout === "center";
  // Cards whose content hugs the rail from the right: the `right` layout, and
  // the even (left-hand column) cards of the `center` zig-zag.
  const railOnRight = layout === "right" || (isCenter && isEven);

  const isGlass = variant === "glass";
  const isMinimal = variant === "minimal";

  return (
    <div className="timeline-item-anim relative group w-full flex flex-col @xl/timeline:flex-row">
      {/* 1. THE VERTICAL LINE (Dynamic positioning based on layout) */}
      {!isLast && (
        <div
          className={cn(
            "absolute w-[2px] transition-colors duration-500",
            // Narrow rail is always left-aligned
            "left-[19px] @xl/timeline:left-auto top-10 bottom-[-32px] @xl/timeline:bottom-[-48px]",
            // Wide rail positioning
            layout === "left" && "@xl/timeline:left-[19px]",
            layout === "right" && "@xl/timeline:right-[19px]",
            layout === "center" &&
              "@xl/timeline:left-1/2 @xl/timeline:-translate-x-1/2",
            // Colors based on status
            isGlass ? "bg-white/10" : "bg-muted",
            isCompleted && theme.bg, // Fill the line if this node is completed
          )}
        />
      )}

      {/* 2. THE DOT / ICON */}
      <div
        className={cn(
          "absolute z-10 flex items-center justify-center rounded-full transition-all duration-500",
          "w-10 h-10 left-0 @xl/timeline:left-auto border-2",
          // Wide rail positioning
          layout === "left" && "@xl/timeline:left-0",
          layout === "right" && "@xl/timeline:right-0",
          layout === "center" &&
            "@xl/timeline:left-1/2 @xl/timeline:-translate-x-1/2",
          // Styling based on status & variant
          isGlass
            ? "bg-black/50 backdrop-blur-md"
            : "bg-background",
          isCompleted || isCurrent
            ? theme.border
            : isGlass
              ? "border-white/20"
              : "border-border",
          isCurrent && theme.glow,
          // Hover effects
          !isUpcoming && "group-hover:scale-110",
        )}
      >
        {Icon ? (
          <Icon
            className={cn(
              "w-4 h-4 transition-colors",
              isCompleted || isCurrent
                ? theme.text
                : "text-muted-foreground",
            )}
          />
        ) : (
          <div
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              isCompleted || isCurrent
                ? theme.bg
                : "bg-muted",
              isCurrent && "animate-pulse",
            )}
          />
        )}
      </div>

      {/* 3. THE CONTENT CARD */}
      <div
        className={cn(
          "flex flex-col w-full transition-all duration-300",
          // Narrow rail always clears the dot on the left
          "pl-16 @xl/timeline:pl-0",
          // Wide rail width & positioning
          layout === "center"
            ? "@xl/timeline:w-[calc(50%-3rem)]"
            : "@xl/timeline:w-[calc(100%-4rem)]",
          layout === "left" && "@xl/timeline:ml-16",
          layout === "right" && "@xl/timeline:mr-16 @xl/timeline:text-right",
          isCenter &&
            isEven &&
            "@xl/timeline:mr-auto @xl/timeline:pr-0 @xl/timeline:text-right",
          isCenter &&
            !isEven &&
            "@xl/timeline:ml-auto @xl/timeline:pl-0 @xl/timeline:text-left",
          isUpcoming && "opacity-60 grayscale hover:grayscale-0",
        )}
      >
        <div
          className={cn(
            "@container/tlcard flex flex-col gap-3 rounded-2xl transition-all duration-300",
            !isMinimal && "p-5 border shadow-sm",
            !isMinimal &&
              !isGlass &&
              "bg-card text-card-foreground border-border",
            isGlass &&
              "bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10",
            isMinimal && "p-1 hover:-translate-y-1",
          )}
        >
          {/* Header Row (Title, Date, Expand Button) */}
          <div
            className={cn(
              // Keyed to the CARD's width, not the rail's: a center-layout card
              // is only half the rail, so putting the date beside the title
              // there leaves the copy ~110px to wrap into. It drops onto its
              // own line until the card can carry both on one row.
              "flex flex-col @lg/tlcard:flex-row justify-between gap-2 @lg/tlcard:gap-4",
              railOnRight && "@lg/tlcard:flex-row-reverse",
              hasContent && "cursor-pointer select-none",
            )}
            onClick={() => hasContent && setIsExpanded(!isExpanded)}
          >
            {/* min-w-0 so a long title shrinks the column instead of
                overflowing it once this is a row. */}
            <div className="flex flex-col gap-1 min-w-0">
              <h3
                className={cn(
                  "text-base font-semibold transition-colors",
                  isGlass ? "text-white" : "text-foreground",
                  "group-hover:text-[var(--timeline-color)]",
                )}
              >
                {item.title}
              </h3>
              {item.description && (
                <p
                  className={cn(
                    "text-sm",
                    isGlass
                      ? "text-zinc-300"
                      : "text-muted-foreground",
                  )}
                >
                  {item.description}
                </p>
              )}
            </div>

            <div
              className={cn(
                "flex items-center gap-3 shrink-0",
                // Stacked, this row is full width, so it needs to be told to
                // follow the card's text alignment. Once it is a row the div
                // is content-sized and justify-* is a no-op.
                railOnRight &&
                  "@xl/timeline:justify-end @lg/tlcard:flex-row-reverse",
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold px-2.5 py-1 rounded-md whitespace-nowrap",
                  isCurrent
                    ? theme.bg
                    : isGlass
                      ? "bg-white/10 text-zinc-300"
                      : "bg-muted text-muted-foreground",
                  isCurrent && theme.on,
                  isCurrent && "shadow-sm",
                )}
              >
                {item.date}
              </span>
              {hasContent && (
                <button
                  className={cn(
                    "p-1.5 rounded-full transition-all",
                    isGlass
                      ? "hover:bg-white/10 text-zinc-300"
                      : "hover:bg-muted text-muted-foreground",
                  )}
                >
                  <ChevronDown
                    className={cn(
                      "w-4 h-4 transition-transform duration-300",
                      isExpanded && "rotate-180",
                    )}
                  />
                </button>
              )}
            </div>
          </div>

          {/* Action Area (e.g. Buttons) */}
          {item.action && (
            <div
              className={cn(
                "mt-2",
                railOnRight && "@xl/timeline:flex @xl/timeline:justify-end",
              )}
            >
              {item.action}
            </div>
          )}

          {/* Expandable Content Area (CSS Grid Trick) */}
          {hasContent && (
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out text-left",
                isExpanded
                  ? "grid-rows-[1fr] opacity-100 mt-2 @lg/tlcard:mt-4"
                  : "grid-rows-[0fr] opacity-0 mt-0",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(
                    "pt-4 border-t",
                    isGlass
                      ? "border-white/10"
                      : "border-border",
                  )}
                >
                  {item.content}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
