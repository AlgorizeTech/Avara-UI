"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Transition } from "motion/react";
import { cn } from "@/lib/utils";
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

export interface AvatarGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "translate"> {
  children?: React.ReactNode;
  invertOverlap?: boolean;
  translate?: string | number;
  transition?: Transition;
  tooltipTransition?: Transition;
  /** Whether to show the hover tooltip. Defaults to true. */
  showTooltip?: boolean;
  /** Alias for showTooltip. */
  tooltip?: boolean;
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
      transition = { type: "spring", stiffness: 300, damping: 17 },
      tooltipTransition = { type: "spring", stiffness: 300, damping: 35 },
      showTooltip = true,
      tooltip = true,
      className,
      ...props
    },
    ref,
  ) => {
    const isTooltipEnabled = showTooltip && tooltip;
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
    const [mounted, setMounted] = useState(false);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          className={cn("relative flex items-center h-12 -space-x-3 my-6", className)}
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
                <motion.div
                  animate={{ y: isHovered ? translate : 0 }}
                  transition={transition}
                >
                  {cleanChild}
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* Floating tooltip portaled outside to document.body to prevent flex layout shifts */}
        {mounted &&
          isTooltipEnabled &&
          typeof document !== "undefined" &&
          createPortal(
            <AnimatePresence>
              {activeIndex !== null && coords && tooltips[activeIndex] && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85, x: coords.x, y: coords.y - 4 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: coords.x,
                    y: coords.y - 14,
                  }}
                  exit={{ opacity: 0, scale: 0.85, x: coords.x, y: coords.y - 4 }}
                  transition={tooltipTransition}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 9999,
                  }}
                >
                  <div className="-translate-x-1/2 -translate-y-full flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground z-50 w-fit max-w-xs rounded-md px-3.5 py-1.5 text-xs text-balance shadow-md flex items-center justify-center relative">
                      <div className="overflow-hidden whitespace-nowrap py-0.5">
                        <div
                          key={activeIndex}
                          className={cn(
                            "flex flex-col",
                            tooltips[activeIndex]?.designation
                              ? "items-start text-left"
                              : "items-center text-center",
                          )}
                        >
                          <motion.span
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.36,
                              ease: [0.16, 1, 0.3, 1],
                              delay: 0.06,
                            }}
                            className="font-semibold text-xs leading-tight tracking-tight text-primary-foreground whitespace-nowrap"
                          >
                            {tooltips[activeIndex]?.title}
                          </motion.span>
                          {tooltips[activeIndex]?.designation && (
                            <motion.span
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{
                                duration: 0.38,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.18,
                              }}
                              className="text-[11px] text-primary-foreground/85 leading-tight mt-1 whitespace-nowrap"
                            >
                              {tooltips[activeIndex]?.designation}
                            </motion.span>
                          )}
                        </div>
                      </div>
                      <span
                        className="fill-primary size-2.5 absolute -bottom-1 left-1/2 -translate-x-1/2 rotate-45 bg-primary pointer-events-none"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
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

export interface AvatarStackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "translate"> {
  avatars: StackAvatar[];
  size?: AvatarStackSize;
  /** Presentation variant: `default` (smooth fan out) or `shift` (spring lift with tooltip). */
  variant?: "default" | "shift";
  /** Invert overlapping order so the first avatar appears on top. */
  invertOverlap?: boolean;
  /** Vertical displacement when an avatar is hovered (e.g. "-30%"). */
  translate?: string | number;
  /** Faces shown before the rest fold into a count. */
  max?: number;
  /** Colour of the gap between faces — match the surface they sit on. */
  ringClassName?: string;
  /** A trailing element that shares the stack's size, e.g. a "+" button. */
  action?: React.ReactNode;
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
}

export const AvatarStack = React.forwardRef<HTMLDivElement, AvatarStackProps>(
  (
    {
      avatars,
      size = "md",
      variant = "default",
      invertOverlap = true,
      translate,
      max = 4,
      ringClassName = "ring-background",
      action,
      spreadOnHover = false,
      spreadDistance = 6,
      transitionDuration = 500,
      liftOnHover = true,
      showTooltip = true,
      tooltip = true,
      showTooltipArrow = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredAvatarIndex, setHoveredAvatarIndex] = useState<number | string | null>(null);
    const s = SIZES[size] ?? SIZES.md;
    const shown = avatars.slice(0, max);
    const rest = avatars.length - shown.length;
    const enableTooltip = showTooltip && tooltip;
    const dist = spreadDistance;

    // Shift on hover variant (matches animate-ui behavior)
    if (variant === "shift") {
      return (
        <AvatarGroup
          ref={ref}
          invertOverlap={invertOverlap}
          translate={translate ?? "-30%"}
          showTooltip={enableTooltip}
          className={className}
          {...props}
        >
          {shown.map((a, i) => (
            <Avatar
              key={i}
              className={cn(s.box, "border-3 border-background ring-0 cursor-pointer", ringClassName)}
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
              className={cn(
                s.box,
                "border-3 border-background ring-0 bg-muted text-muted-foreground font-semibold text-xs flex items-center justify-center cursor-pointer",
                ringClassName,
              )}
            >
              +{rest}
            </Avatar>
          )}
          {action}
        </AvatarGroup>
      );
    }

    // Default variant: smooth rightward fan-out spread on hover & z-index elevation on hover
    return (
      <div
        ref={ref}
        className={cn("group flex items-center", s.overlap, className)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredAvatarIndex(null);
        }}
        {...props}
      >
        {shown.map((a, i) => {
          const shiftX = isHovered && spreadOnHover ? i * dist : 0;
          const isThisHovered = hoveredAvatarIndex === i;
          const currentZIndex = isThisHovered ? 50 : shown.length - i;
          const shiftY = isThisHovered && translate ? (typeof translate === "number" ? `${translate}px` : translate) : "0px";
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
                      transform: liftOnHover && isThisHovered ? "scale(1.15)" : "scale(1)",
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }
                  : {
                      transform: `translateX(${shiftX}px) translateY(${shiftY}) ${liftOnHover && isThisHovered ? "scale(1.15)" : "scale(1)"}`,
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
                  showArrow={showTooltipArrow}
                  animated={showTooltipArrow ? "pop" : undefined}
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
          const shiftRestX = isHovered && spreadOnHover ? shown.length * dist : 0;
          const isRestHovered = hoveredAvatarIndex === "rest";
          const shiftRestY = isRestHovered && translate ? (typeof translate === "number" ? `${translate}px` : translate) : "0px";
          const restElement = (
            <span
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
                      transform: liftOnHover && isRestHovered ? "scale(1.15)" : "scale(1)",
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }
                  : {
                      transform: `translateX(${shiftRestX}px) translateY(${shiftRestY}) ${liftOnHover && isRestHovered ? "scale(1.15)" : "scale(1)"}`,
                      zIndex: isRestHovered ? 50 : 0,
                      transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
                    }
              }
            >
              +{rest}
            </span>
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
                  showArrow={showTooltipArrow}
                  animated={showTooltipArrow ? "pop" : undefined}
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
        {action && (
          <span
            onMouseEnter={() => setHoveredAvatarIndex("action")}
            onMouseLeave={() => setHoveredAvatarIndex(null)}
            className={cn(
              "relative grid shrink-0 place-items-center overflow-visible rounded-full ring-0 cursor-pointer",
              s.box,
              hoveredAvatarIndex === "action" && "scale-110",
            )}
            style={{
              transform: `translateX(${isHovered && spreadOnHover ? (shown.length + (rest > 0 ? 1 : 0)) * dist : 0}px) translateY(${hoveredAvatarIndex === "action" && translate ? (typeof translate === "number" ? `${translate}px` : translate) : "0px"})`,
              zIndex: hoveredAvatarIndex === "action" ? 50 : 0,
              transition: `transform ${transitionDuration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            }}
          >
            {action}
          </span>
        )}
      </div>
    );
  },
);
AvatarStack.displayName = "AvatarStack";

export default AvatarStack;
