"use client";

import React, { useState, useRef, useEffect, useLayoutEffect, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  prefersReducedMotion,
  springTiming,
  usePrefersReducedMotion,
  type SpringOptions,
  type Timing,
} from "@/lib/animate";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/custom/blocks/TooltipBlock";
export { AvatarImage, AvatarFallback } from "@/components/custom/ui/avatar";

// ==========================================
// AVATAR STACK & AVATAR GROUP
// A row of overlapping faces — the "people who…" cue under a headline or
// beside a count. Shows up to `max` faces, folds the rest into a "+N" disc,
// and takes an optional trailing action, like a follow button.
//
// Includes both the classic fan-out AvatarStack and the spring-shifted
// interactive AvatarGroup (inspired by animate-ui).
// ==========================================

export interface StackAvatar {
  src: string;
  alt?: string;
  fallback?: string;
  tooltip?: string;
  name?: string;
  designation?: string;
  role?: string;
}

export type AvatarStackSize = "sm" | "md" | "lg" | "xl";
export type AvatarStackVariant = "default" | "shift" | "zoom" | "spread";
export type AvatarStackType = "default" | "tooltip" | "tooltip-arrow";

export interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  src?: string;
  alt?: string;
  size?: AvatarStackSize;
  /** Colour of the ring around the face — match the surface it sits on. */
  ringClassName?: string;
}

const SIZES: Record<AvatarStackSize, { box: string; overlap: string; text: string }> = {
  sm: { box: "size-7", overlap: "-space-x-2", text: "text-[10px]" },
  md: { box: "size-9", overlap: "-space-x-2.5", text: "text-[11px]" },
  lg: { box: "size-11", overlap: "-space-x-3", text: "text-xs" },
  xl: { box: "size-12", overlap: "-space-x-3", text: "text-xs" },
};

/**
 * One face, the same disc the stack is built from. Powered by Radix Avatar Root so it
 * supports composable child components like AvatarImage & AvatarFallback, or shorthand src/alt.
 */
export const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(
  (
    {
      src,
      alt = "",
      size = "md",
      ringClassName = "ring-background",
      className,
      children,
      ...props
    },
    ref,
  ) => (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted ring-2 cursor-pointer transition-shadow",
        SIZES[size]?.box ?? "size-9",
        ringClassName,
        className,
      )}
      {...props}
    >
      {src ? (
        <>
          <AvatarPrimitive.Image
            src={src}
            alt={alt}
            className="aspect-square h-full w-full object-cover"
          />
          <AvatarPrimitive.Fallback className="bg-muted flex h-full w-full items-center justify-center rounded-full text-xs font-medium">
            {alt ? alt.slice(0, 2).toUpperCase() : ""}
          </AvatarPrimitive.Fallback>
        </>
      ) : (
        children
      )}
    </AvatarPrimitive.Root>
  ),
);
Avatar.displayName = "Avatar";

// ==========================================
// AVATAR GROUP (Animate UI Variant)
// Overlapping avatars that smoothly shift upward with spring physics on hover
// and a single gliding tooltip that tracks between avatars without dipping.
// ==========================================

export interface AvatarGroupTooltipProps {
  className?: string;
  children?: React.ReactNode;
  /** Designation or subtitle displayed underneath the name. */
  designation?: React.ReactNode;
  /** Alias for designation. */
  role?: React.ReactNode;
  layout?: boolean | "position" | "size" | "preserve-aspect";
}

/**
 * Marker component placed inside an Avatar to declare its hover tooltip content and designation.
 */
export function AvatarGroupTooltip(_props: AvatarGroupTooltipProps) {
  return null;
}
AvatarGroupTooltip.displayName = "AvatarGroupTooltip";

export interface AvatarGroupTooltipArrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  tipRadius?: number;
}

export function AvatarGroupTooltipArrow({ className, ...props }: AvatarGroupTooltipArrowProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "fill-primary size-3 absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 bg-primary pointer-events-none data-[side='bottom']:translate-y-[1px] data-[side='right']:translate-x-[1px] data-[side='left']:translate-x-[-1px] data-[side='top']:translate-y-[-1px]",
        className,
      )}
      {...props}
    />
  );
}
AvatarGroupTooltipArrow.displayName = "AvatarGroupTooltipArrow";

/** A spring, or a fixed `duration` in seconds with a CSS easing or cubic-bezier points. */
export type AvatarTransition =
  | (SpringOptions & { type?: "spring" })
  | { duration: number; ease?: string | [number, number, number, number] };

const SHIFT_SPRING: AvatarTransition = { type: "spring", stiffness: 300, damping: 17 };
const TOOLTIP_SPRING: AvatarTransition = { type: "spring", stiffness: 300, damping: 35 };

function timingOf(transition: AvatarTransition): Timing {
  if ("duration" in transition) {
    const { duration, ease = "ease" } = transition;
    return {
      duration: duration * 1000,
      easing: Array.isArray(ease) ? `cubic-bezier(${ease.join(",")})` : ease,
    };
  }
  return springTiming(transition);
}

const TOOLTIP_TEXT_CSS = `
@keyframes avatar-tooltip-text { from { opacity: 0; transform: translateY(6px); } }
@media (prefers-reduced-motion: reduce) { [data-avatar-tooltip-text] { animation: none !important; } }
`;

/**
 * The tooltip, kept on screen through its exit: `tip` goes null the moment the
 * pointer leaves, and the last content stays until the animation out finishes.
 */
function FloatingTooltip({
  tip,
  tipKey,
  coords,
  timing,
  style,
}: {
  tip: TooltipItemData | null;
  tipKey: number | null;
  coords: { x: number; y: number } | null;
  timing: Timing;
  style?: React.CSSProperties;
}) {
  const [present, setPresent] = useState(false);
  if (tip && !present) setPresent(true);

  const last = useRef<{ tip: TooltipItemData; tipKey: number | null; x: number; y: number } | null>(null);
  if (tip && coords) last.current = { tip, tipKey, x: coords.x, y: coords.y };

  const ref = useRef<HTMLDivElement>(null);
  const running = useRef<Animation | null>(null);
  const open = Boolean(tip);
  const x = last.current?.x;
  const y = last.current?.y;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || x === undefined || y === undefined) return;
    const pose = (opacity: number, scale: number, lift: number) => ({
      opacity,
      transform: `translate3d(${x}px, ${y + lift}px, 0) scale(${scale})`,
    });
    const hidden = pose(0, 0.85, -4);
    // Interrupted mid-way, it carries on from where it is rather than restarting.
    const computed = getComputedStyle(el);
    const from = running.current ? { opacity: computed.opacity, transform: computed.transform } : hidden;
    running.current?.cancel();
    const animation = el.animate([from, open ? pose(1, 1, -14) : hidden], {
      ...timing,
      duration: prefersReducedMotion() ? 0 : timing.duration,
      fill: "both",
    });
    running.current = animation;
    if (!open) {
      animation.onfinish = () => {
        running.current = null;
        setPresent(false);
      };
    }
  }, [open, x, y, timing]);

  const shown = last.current;
  if (!present || !shown) return null;

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
        ...style,
      }}
    >
      <style>{TOOLTIP_TEXT_CSS}</style>
      <div className="-translate-x-1/2 -translate-y-full flex flex-col items-center">
        <div className="bg-primary text-primary-foreground z-50 w-fit max-w-xs rounded-md px-3.5 py-1.5 text-xs text-balance shadow-md flex items-center justify-center relative">
          <div className="overflow-hidden whitespace-nowrap py-0.5">
            <div
              key={shown.tipKey}
              className={cn(
                "flex flex-col",
                shown.tip.designation ? "items-start text-left" : "items-center text-center",
              )}
            >
              <span
                data-avatar-tooltip-text
                style={{ animation: "avatar-tooltip-text 0.36s cubic-bezier(0.16, 1, 0.3, 1) 0.06s backwards" }}
                className="font-semibold text-xs leading-tight tracking-tight text-primary-foreground whitespace-nowrap"
              >
                {shown.tip.title}
              </span>
              {shown.tip.designation && (
                <span
                  data-avatar-tooltip-text
                  style={{ animation: "avatar-tooltip-text 0.38s cubic-bezier(0.16, 1, 0.3, 1) 0.18s backwards" }}
                  className="text-[11px] text-primary-foreground/85 leading-tight mt-1 whitespace-nowrap"
                >
                  {shown.tip.designation}
                </span>
              )}
            </div>
          </div>
          <span
            className="fill-primary size-2.5 absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 bg-primary pointer-events-none"
          />
        </div>
      </div>
    </div>
  );
}

export interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "translate"> {
  children?: React.ReactNode;
  invertOverlap?: boolean;
  translate?: string | number;
  transition?: AvatarTransition;
  tooltipTransition?: AvatarTransition;
  /** Whether to show the hover tooltip. Defaults to true. */
  showTooltip?: boolean;
  /** Alias for showTooltip. */
  tooltip?: boolean;
  /** Custom inline style passed to the floating tooltip container. */
  tooltipStyle?: React.CSSProperties;
}

interface TooltipItemData {
  title: React.ReactNode;
  designation?: React.ReactNode;
}

export const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      children,
      invertOverlap = true,
      translate = "-30%",
      transition = SHIFT_SPRING,
      tooltipTransition = TOOLTIP_SPRING,
      showTooltip = true,
      tooltip = true,
      tooltipStyle,
      style,
      className,
      ...props
    },
    ref,
  ) => {
    const isTooltipEnabled = showTooltip && tooltip;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const [computedTheme, setComputedTheme] = useState<React.CSSProperties>({});
    const [mounted, setMounted] = useState(false);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
    const reduceMotion = usePrefersReducedMotion();
    const shift = useMemo(() => timingOf(transition), [transition]);
    const tooltipTiming = useMemo(() => timingOf(tooltipTransition), [tooltipTransition]);
    const lift = typeof translate === "number" ? `${translate}px` : translate;

    useEffect(() => {
      setMounted(true);
    }, []);

    const childArray = React.Children.toArray(children);
    const count = childArray.length;
    const tooltips: (TooltipItemData | null)[] = [];

    const updateCoords = useCallback((index: number) => {
      const el = itemRefs.current[index];
      if (el) {
        const rect = el.getBoundingClientRect();
        setCoords({
          x: rect.left + rect.width / 2 + (typeof window !== "undefined" ? window.scrollX : 0),
          y: rect.top + (typeof window !== "undefined" ? window.scrollY : 0),
        });
        if (typeof window !== "undefined") {
          const computed = window.getComputedStyle(el);
          const primary = computed.getPropertyValue("--primary").trim();
          const primaryFg = computed.getPropertyValue("--primary-foreground").trim();
          if (primary) {
            setComputedTheme({
              ["--primary" as string]: primary,
              ...(primaryFg ? { ["--primary-foreground" as string]: primaryFg } : {}),
            });
          }
        }
      }
    }, []);

    const handleMouseEnter = (index: number) => {
      setActiveIndex(index);
      updateCoords(index);
    };

    useEffect(() => {
      if (activeIndex === null) return;
      const onScrollOrResize = () => {
        updateCoords(activeIndex);
      };
      window.addEventListener("scroll", onScrollOrResize, true);
      window.addEventListener("resize", onScrollOrResize);
      return () => {
        window.removeEventListener("scroll", onScrollOrResize, true);
        window.removeEventListener("resize", onScrollOrResize);
      };
    }, [activeIndex, updateCoords]);

    return (
      <>
        <div
          ref={ref}
          data-slot="avatar-group"
          className={cn("relative flex w-fit mx-auto items-center justify-center h-12 -space-x-3 py-20 px-6", className)}
          onMouseLeave={() => setActiveIndex(null)}
          {...props}
        >
          {childArray.map((child, index) => {
            if (!React.isValidElement(child)) return child;

            let tooltipNode: React.ReactNode = null;
            let designationNode: React.ReactNode = null;
            const childChildren = (child.props as any)?.children;
            let remainingChildren: React.ReactNode = childChildren;

            if (Array.isArray(childChildren)) {
              const nextArr: React.ReactNode[] = [];
              React.Children.forEach(childChildren, (nested) => {
                if (
                  React.isValidElement(nested) &&
                  (nested.type === AvatarGroupTooltip ||
                    (nested.type as any)?.displayName === "AvatarGroupTooltip")
                ) {
                  tooltipNode = (nested.props as any)?.children;
                  designationNode = (nested.props as any)?.designation || (nested.props as any)?.role;
                } else {
                  nextArr.push(nested);
                }
              });
              remainingChildren = nextArr;
            } else if (
              React.isValidElement(childChildren) &&
              (childChildren.type === AvatarGroupTooltip ||
                (childChildren.type as any)?.displayName === "AvatarGroupTooltip")
            ) {
              tooltipNode = (childChildren.props as any)?.children;
              designationNode = (childChildren.props as any)?.designation || (childChildren.props as any)?.role;
              remainingChildren = null;
            }

            tooltips[index] = tooltipNode ? { title: tooltipNode, designation: designationNode } : null;

            const cleanChild = React.cloneElement(child, {
              ...(child.props as any),
              children: remainingChildren,
            });

            const isHovered = activeIndex === index;

            return (
              <div
                key={index}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-slot="avatar-container"
                className="relative cursor-pointer select-none outline-none shrink-0"
                style={{
                  zIndex: invertOverlap ? count - index : index + 1,
                }}
                onMouseEnter={() => handleMouseEnter(index)}
                onFocus={() => handleMouseEnter(index)}
                onPointerMove={() => {
                  if (activeIndex === index) {
                    updateCoords(index);
                  }
                }}
              >
                <div
                  style={{
                    transform: isHovered ? `translateY(${lift})` : undefined,
                    transition: reduceMotion ? undefined : `transform ${shift.duration}ms ${shift.easing}`,
                  }}
                >
                  {cleanChild}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating tooltip portaled outside to document.body to prevent flex layout shifts */}
        {mounted &&
          isTooltipEnabled &&
          typeof document !== "undefined" &&
          createPortal(
            <FloatingTooltip
              tip={activeIndex !== null && coords ? tooltips[activeIndex] : null}
              tipKey={activeIndex}
              coords={coords}
              timing={tooltipTiming}
              style={{ ...computedTheme, ...style, ...tooltipStyle }}
            />,
            document.body,
          )}
      </>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";

// ==========================================
// AVATAR STACK
// ==========================================

export type AvatarStackAction =
  | boolean
  | ((event: React.MouseEvent<HTMLElement>) => void)
  | { onClick?: (event: React.MouseEvent<HTMLElement>) => void; label?: string }
  | React.ReactNode;

export interface AvatarStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "translate"> {
  avatars: StackAvatar[];
  size?: AvatarStackSize;
  /** Presentation variant: `shift` (spring lift), `zoom` (scale up on hover, fixed gap), or `spread` (fan out to the right on hover). */
  variant?: AvatarStackVariant;
  /** Tooltip presentation type for `zoom` and `spread` variants: `default` (no tooltip), `tooltip` (clean tooltip), or `tooltip-arrow` (arrow pointer tooltip). */
  type?: AvatarStackType;
  /** Invert overlapping order so the first avatar appears on top. */
  invertOverlap?: boolean;
  /** Vertical displacement when an avatar is hovered (e.g. "-30%"). */
  translate?: string | number;
  /** Faces shown before the rest fold into a count. */
  max?: number;
  /** Optional click handler when the folded `+N` counter disc is clicked. */
  onMoreClick?: (
    restCount: number,
    hiddenAvatars: StackAvatar[],
    event: React.MouseEvent<HTMLElement>,
  ) => void;
  /** Colour of the gap between faces — match the surface they sit on. */
  ringClassName?: string;
  /** Trailing "+" action button: pass an `onClick` function `() => void`, `{ onClick, label }`, `true`, or custom `ReactNode`. */
  action?: AvatarStackAction;
  /** Faces slide apart a little when the stack is hovered. */
  spreadOnHover?: boolean;
  /** Pixel distance each subsequent avatar shifts to the right on hover. Defaults to 6. */
  spreadDistance?: number;
  /** Transition duration in milliseconds for slide/spread animations. Defaults to 500. */
  transitionDuration?: number;
  /** A hovered face rises above its neighbours and grows a touch, so it can be seen whole. */
  liftOnHover?: boolean;
  /** Whether to show a tooltip with the avatar's alt text on hover. Defaults to true. */
  showTooltip?: boolean;
  /** Alias for showTooltip. */
  tooltip?: boolean;
  /** Whether to display an arrow pointer on the tooltip. Defaults to false. */
  showTooltipArrow?: boolean;
  /** Custom inline style passed to the floating tooltip container. */
  tooltipStyle?: React.CSSProperties;
}

export const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  (
    {
      avatars,
      size = "md",
      variant = "default",
      type,
      invertOverlap = true,
      translate,
      max,
      onMoreClick,
      ringClassName = "ring-background",
      action,
      spreadOnHover,
      spreadDistance = 6,
      transitionDuration = 500,
      liftOnHover,
      showTooltip,
      tooltip,
      showTooltipArrow,
      tooltipStyle,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredAvatarIndex, setHoveredAvatarIndex] = useState<number | string | null>(null);
    const s = SIZES[size] ?? SIZES.md;
    const hasMax = typeof max === "number" && max > 0;
    const shown = hasMax ? avatars.slice(0, max) : avatars;
    const hiddenAvatars = hasMax ? avatars.slice(max) : [];
    const rest = avatars.length - shown.length;

    const handleMoreClick = (e: React.MouseEvent<HTMLElement>) => {
      onMoreClick?.(rest, hiddenAvatars, e);
    };

    const isCustomActionElement = React.isValidElement(action);
    const hasAction = Boolean(action);

    const isActionConfigObject =
      typeof action === "object" &&
      action !== null &&
      !isCustomActionElement &&
      ("onClick" in action || "label" in action);

    const resolvedActionClick =
      typeof action === "function"
        ? action
        : isActionConfigObject
          ? (action as { onClick?: (event: React.MouseEvent<HTMLElement>) => void }).onClick
          : undefined;

    const resolvedActionLabel = isCustomActionElement
      ? (((action as React.ReactElement).props as Record<string, any>)?.[
          "aria-label"
        ] as string) ?? "Join the community"
      : isActionConfigObject
        ? (action as { label?: string }).label ?? "Join the community"
        : "Join the community";

    const renderedActionNode = isCustomActionElement ? (
      action
    ) : hasAction ? (
      <button
        type="button"
        aria-label={resolvedActionLabel}
        onClick={resolvedActionClick}
        className={cn(
          "group/action grid size-full place-items-center rounded-full bg-primary text-primary-foreground ring-2 transition-transform duration-300 hover:scale-110 cursor-pointer",
          ringClassName,
        )}
      >
        <Plus
          size={size === "sm" ? 13 : size === "lg" || size === "xl" ? 18 : 16}
          className="transition-transform duration-300 group-hover/action:rotate-90"
        />
      </button>
    ) : null;

    const isSpreadVariant = variant === "spread";
    const effectiveSpreadOnHover = spreadOnHover ?? isSpreadVariant;
    const effectiveLiftOnHover = liftOnHover ?? !isSpreadVariant;
    const effectiveTranslate = translate ?? (isSpreadVariant ? "-30%" : undefined);

    const resolvedShowTooltip =
      showTooltip !== undefined
        ? showTooltip
        : tooltip !== undefined
          ? tooltip
          : type === "default"
            ? false
            : true;
    const enableTooltip = resolvedShowTooltip && (tooltip ?? true);
    const effectiveShowTooltipArrow =
      showTooltipArrow !== undefined
        ? showTooltipArrow
        : type === "tooltip-arrow";
    const dist = spreadDistance;

    // Shift on hover variant (matches animate-ui behavior)
    if (variant === "shift") {
      return (
        <AvatarGroup
          ref={ref}
          invertOverlap={invertOverlap}
          translate={translate ?? "-30%"}
          showTooltip={enableTooltip}
          className={cn(s.overlap, className)}
          style={style}
          tooltipStyle={tooltipStyle ?? style}
          {...props}
        >
          {shown.map((a, i) => (
            <Avatar
              key={i}
              className={cn(s.box, "border-[3px] border-background ring-0 cursor-pointer", ringClassName)}
            >
              <img src={a.src} alt={a.alt ?? a.name ?? ""} className="h-full w-full object-cover" />
              {(enableTooltip && (a.tooltip || a.alt || a.name)) && (
                <AvatarGroupTooltip designation={a.designation || a.role}>
                  {a.name || a.tooltip || a.alt}
                </AvatarGroupTooltip>
              )}
            </Avatar>
          ))}
          {rest > 0 && (
            <Avatar
              onClick={handleMoreClick}
              className={cn(
                s.box,
                "border-[3px] border-background ring-0 bg-muted text-muted-foreground font-semibold text-xs flex items-center justify-center cursor-pointer",
                ringClassName,
              )}
            >
              +{rest}
              {enableTooltip && (
                <AvatarGroupTooltip>+{rest} more</AvatarGroupTooltip>
              )}
            </Avatar>
          )}
          {renderedActionNode && (
            <Avatar
              className={cn(
                s.box,
                "border-[3px] border-background ring-0 bg-transparent flex items-center justify-center cursor-pointer overflow-visible",
                ringClassName,
              )}
            >
              {renderedActionNode}
              {enableTooltip && resolvedActionLabel && (
                <AvatarGroupTooltip>{resolvedActionLabel}</AvatarGroupTooltip>
              )}
            </Avatar>
          )}
        </AvatarGroup>
      );
    }

    const totalItemsCount = shown.length + (rest > 0 ? 1 : 0) + (renderedActionNode ? 1 : 0);
    const centerIndex = (totalItemsCount - 1) / 2;

    // Default variant: smooth centered fan-out spread on hover & z-index elevation on hover
    return (
      <div
        ref={ref}
        {...props}
        className={cn("group flex w-fit mx-auto items-center justify-center py-20 px-6", s.overlap, className)}
        style={style}
        onMouseEnter={(e) => {
          setIsHovered(true);
          props.onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          setHoveredAvatarIndex(null);
          props.onMouseLeave?.(e);
        }}
      >
        {shown.map((a, i) => {
          const shiftX = isHovered && effectiveSpreadOnHover ? (i - centerIndex) * dist : 0;
          const isThisHovered = hoveredAvatarIndex === i;
          const currentZIndex = isThisHovered ? 50 : shown.length - i;
          const shiftY = isThisHovered && effectiveTranslate ? (typeof effectiveTranslate === "number" ? `${effectiveTranslate}px` : effectiveTranslate) : "0px";
          const avatarElement = (
            <span
              key={a.src}
              onMouseEnter={() => setHoveredAvatarIndex(i)}
              onMouseLeave={() => setHoveredAvatarIndex(null)}
              className={cn(
                "relative grid shrink-0 place-items-center overflow-hidden rounded-full ring-2 cursor-pointer bg-muted outline-none",
                s.box,
                ringClassName,
              )}
              style={
                enableTooltip
                  ? {
                      transform: effectiveLiftOnHover && isThisHovered ? "scale(1.15)" : "scale(1)",
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }
                  : {
                      transform: `translateX(${shiftX}px) translateY(${shiftY}) ${effectiveLiftOnHover && isThisHovered ? "scale(1.15)" : "scale(1)"}`,
                      zIndex: currentZIndex,
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease, z-index 0ms`,
                    }
              }
            >
              <img src={a.src} alt={a.alt ?? ""} className="h-full w-full object-cover" />
            </span>
          );

          const title = a.name ?? a.alt ?? a.tooltip;
          const designation = a.designation ?? a.role;

          if (enableTooltip && title) {
            return (
              <Tooltip key={a.src} delayDuration={50}>
                <TooltipTrigger
                  className={cn("inline-block relative outline-none", isThisHovered && "!z-50")}
                  style={{
                    transform: `translateX(${shiftX}px) translateY(${shiftY})`,
                    zIndex: currentZIndex,
                    transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), z-index 0ms`,
                  }}
                  onMouseEnter={() => setHoveredAvatarIndex(i)}
                  onMouseLeave={() => setHoveredAvatarIndex(null)}
                >
                  {avatarElement}
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  showArrow={effectiveShowTooltipArrow}
                  animated={effectiveShowTooltipArrow ? "pop" : undefined}
                  style={tooltipStyle ?? style}
                >
                  <div
                    className={cn(
                      "flex flex-col",
                      designation ? "items-start text-left" : "items-center text-center",
                    )}
                  >
                    <span className="font-semibold text-xs leading-tight whitespace-nowrap">{title}</span>
                    {designation && (
                      <span className="text-[10px] opacity-80 whitespace-nowrap mt-0.5">{designation}</span>
                    )}
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return avatarElement;
        })}
        {rest > 0 && (() => {
          const restIndex = shown.length;
          const shiftRestX = isHovered && effectiveSpreadOnHover ? (restIndex - centerIndex) * dist : 0;
          const isRestHovered = hoveredAvatarIndex === "rest";
          const shiftRestY = isRestHovered && effectiveTranslate ? (typeof effectiveTranslate === "number" ? `${effectiveTranslate}px` : effectiveTranslate) : "0px";
          const restElement = (
            <button
              type="button"
              onClick={handleMoreClick}
              onMouseEnter={() => setHoveredAvatarIndex("rest")}
              onMouseLeave={() => setHoveredAvatarIndex(null)}
              className={cn(
                "relative grid shrink-0 place-items-center overflow-hidden rounded-full ring-2 cursor-pointer bg-primary font-semibold text-primary-foreground outline-none",
                s.box,
                s.text,
                ringClassName,
              )}
              style={
                enableTooltip
                  ? {
                      transform: effectiveLiftOnHover && isRestHovered ? "scale(1.15)" : "scale(1)",
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }
                  : {
                      transform: `translateX(${shiftRestX}px) translateY(${shiftRestY}) ${effectiveLiftOnHover && isRestHovered ? "scale(1.15)" : "scale(1)"}`,
                      zIndex: isRestHovered ? 50 : 0,
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }
              }
            >
              +{rest}
            </button>
          );

          if (enableTooltip) {
            return (
              <Tooltip key="rest-count" delayDuration={50}>
                <TooltipTrigger
                  className={cn("inline-block relative outline-none", isRestHovered && "!z-50")}
                  style={{
                    transform: `translateX(${shiftRestX}px) translateY(${shiftRestY})`,
                    zIndex: isRestHovered ? 50 : 0,
                    transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1), z-index 0ms`,
                  }}
                  onMouseEnter={() => setHoveredAvatarIndex("rest")}
                  onMouseLeave={() => setHoveredAvatarIndex(null)}
                >
                  {restElement}
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  showArrow={effectiveShowTooltipArrow}
                  animated={effectiveShowTooltipArrow ? "pop" : undefined}
                  style={tooltipStyle ?? style}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="font-semibold text-xs leading-tight whitespace-nowrap">+{rest} more</span>
                  </div>
                </TooltipContent>
              </Tooltip>
            );
          }

          return restElement;
        })()}
        {renderedActionNode && (() => {
          const actionIndex = shown.length + (rest > 0 ? 1 : 0);
          const shiftActionX = isHovered && effectiveSpreadOnHover ? (actionIndex - centerIndex) * dist : 0;
          return (
            <span
              onMouseEnter={() => setHoveredAvatarIndex("action")}
              onMouseLeave={() => setHoveredAvatarIndex(null)}
              className={cn(
                "relative grid shrink-0 place-items-center overflow-visible rounded-full ring-0 cursor-pointer",
                s.box,
                hoveredAvatarIndex === "action" && "scale-110",
              )}
              style={{
                transform: `translateX(${shiftActionX}px) translateY(${hoveredAvatarIndex === "action" && effectiveTranslate ? (typeof effectiveTranslate === "number" ? `${effectiveTranslate}px` : effectiveTranslate) : "0px"})`,
                zIndex: hoveredAvatarIndex === "action" ? 50 : 0,
                transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
              }}
            >
              {renderedActionNode}
            </span>
          );
        })()}
      </div>
    );
  },
);
AvatarStack.displayName = "AvatarStack";

export default AvatarStack;
