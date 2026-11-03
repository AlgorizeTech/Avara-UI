"use client";

import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

type Box = { x: number; y: number; w: number; h: number };

/**
 * The highlight that slides between the options of a segmented control, in
 * plain CSS: one absolutely positioned element that is moved by `transform`
 * and resized by `width` / `height` under a transition. It replaces a
 * `layoutId` spring from the motion library, which cost every docs page the
 * library's bundle and its layout-measuring work on each switch.
 *
 * Usage — put the returned `ref` on the `relative` container, mark each option
 * with `data-pill-active` when it is the selected one, and render `pill(...)`
 * inside the container:
 *
 *   const { ref, pill, ready } = useSlidingPill(value);
 *   <div ref={ref} className="relative …">
 *     {pill("rounded-md bg-primary/15")}
 *     <button data-pill-active={isActive || undefined}
 *             className={cn(isActive && !ready && "rounded-md bg-primary/15")}>
 *
 * `ready` is false on the server and for the first client render, so the
 * selected option paints its own background there (the static HTML and the
 * hydration pass match). Once the pill has measured the option it takes over
 * in the same frame, before anything is painted.
 */
export function useSlidingPill<T extends HTMLElement = HTMLDivElement>(activeKey: unknown) {
  // A callback ref held in state: a container that mounts later (a toolbar
  // that only shows on one tab) still gets measured when it appears.
  const [container, ref] = useState<T | null>(null);
  const [box, setBox] = useState<Box | null>(null);

  const measure = useCallback(() => {
    const active = container?.querySelector<HTMLElement>("[data-pill-active]");
    if (!container || !active) {
      setBox(null);
      return;
    }
    // offsetLeft / offsetTop are relative to the container (it is `relative`),
    // and unaffected by any transform on an ancestor — which matters inside the
    // scaled preview frames.
    const next = {
      x: active.offsetLeft,
      y: active.offsetTop,
      w: active.offsetWidth,
      h: active.offsetHeight,
    };
    setBox((prev) =>
      prev && prev.x === next.x && prev.y === next.y && prev.w === next.w && prev.h === next.h
        ? prev
        : next,
    );
  }, [container]);

  useIsomorphicLayoutEffect(() => {
    measure();
  }, [activeKey, measure]);

  // Labels hide below `sm`, fonts load, the container wraps: re-measure.
  useEffect(() => {
    if (!container || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    for (const child of Array.from(container.children)) {
      if (!child.hasAttribute("aria-hidden")) observer.observe(child);
    }
    return () => observer.disconnect();
  }, [container, measure, activeKey]);

  /**
   * `edge="bottom"` squeezes the box into a rule of `thickness` px along the
   * option's bottom edge (an underline instead of a filled pill).
   */
  const pill = (className: string, edge?: "bottom", thickness = 2) => {
    if (!box) return null;
    const underline = edge === "bottom";
    const height = underline ? thickness : box.h;
    const y = underline ? box.y + box.h - thickness : box.y;
    return (
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute left-0 top-0 transition-[transform,width,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
          className,
        )}
        style={{ width: box.w, height, transform: `translate(${box.x}px, ${y}px)` }}
      />
    );
  };

  return { ref, pill, ready: box !== null };
}
