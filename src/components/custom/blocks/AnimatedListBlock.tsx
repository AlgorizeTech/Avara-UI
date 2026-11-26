"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { prefersReducedMotion } from "./gsap-motion";
import { useInView } from "./in-view";

const BLUR_OUT = { opacity: 0, filter: "blur(6px)" };
const BLUR_IN = { opacity: 1, filter: "blur(0px)" };

/** Whether the list's entrance has played; items added after that animate alone. */
const ListContext = createContext({ revealed: false });

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as React.MutableRefObject<T | null>).current = node;
    }
  };
}

export interface AnimatedListProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render. Use "div" when the items are not list items. */
  as?: "ul" | "ol" | "div";
  /** Seconds between one item starting its entrance and the next. */
  staggerDelay?: number;
  /** Entrance duration of each item, in seconds. */
  duration?: number;
}

/**
 * A list whose items rise and blur in one after another when it scrolls into
 * view. Put `AnimatedListItem`s inside; items you add later fade in, items you
 * remove fade out, and the others glide to their new place.
 */
export const AnimatedList = forwardRef<HTMLElement, AnimatedListProps>(
  ({ as = "ul", staggerDelay = 0.07, duration = 0.55, className, ...props }, ref) => {
    const rootRef = useRef<HTMLElement | null>(null);
    const [watch, inView] = useInView();
    const [revealed, setRevealed] = useState(false);

    const setRoot = useCallback(
      (node: HTMLElement | null) => {
        rootRef.current = node;
        watch(node);
      },
      [watch],
    );

    useEffect(() => {
      if (!inView || revealed) return;
      const items = rootRef.current?.querySelectorAll(":scope > [data-animated-item]");
      if (items?.length && !prefersReducedMotion()) {
        gsap.fromTo(
          items,
          { ...BLUR_OUT, y: 14 },
          {
            ...BLUR_IN,
            y: 0,
            duration,
            ease: "power3.out",
            stagger: staggerDelay,
            clearProps: "filter,transform",
          },
        );
      }
      setRevealed(true);
    }, [inView, revealed, duration, staggerDelay]);

    return (
      <ListContext.Provider value={{ revealed }}>
        {React.createElement(as, {
          ...props,
          ref: mergeRefs(setRoot, ref as React.Ref<HTMLElement>),
          className: cn("relative", className),
        })}
      </ListContext.Provider>
    );
  },
);
AnimatedList.displayName = "AnimatedList";

export interface AnimatedListItemProps extends React.HTMLAttributes<HTMLElement> {
  /** The element to render. Use "div" inside an `as="div"` list. */
  as?: "li" | "div";
}

/**
 * One animated row. Give it a stable `key`: that is how the list tells an item
 * that was added, removed or moved from one that stayed.
 */
export const AnimatedListItem = forwardRef<HTMLElement, AnimatedListItemProps>(
  ({ as = "li", className, ...props }, ref) => {
    const { revealed } = useContext(ListContext);
    const itemRef = useRef<HTMLElement | null>(null);
    const revealedRef = useRef(revealed);
    revealedRef.current = revealed;
    const lastBox = useRef<{ top: number; left: number } | null>(null);

    // After every commit: fade in when new, glide when something moved it.
    // Layout positions are read (offsetTop/Left), so running animations never
    // count as movement.
    useLayoutEffect(() => {
      const el = itemRef.current;
      if (!el) return;
      const box = { top: el.offsetTop, left: el.offsetLeft };
      const prev = lastBox.current;
      lastBox.current = box;
      if (prefersReducedMotion()) return;

      if (!prev) {
        if (revealedRef.current) {
          gsap.fromTo(el, BLUR_OUT, { ...BLUR_IN, duration: 0.4, delay: 0.1, clearProps: "filter" });
        }
        return;
      }
      const dx = prev.left - box.left;
      const dy = prev.top - box.top;
      if (!dx && !dy) return;
      gsap.fromTo(
        el,
        { x: Number(gsap.getProperty(el, "x")) + dx, y: Number(gsap.getProperty(el, "y")) + dy },
        { x: 0, y: 0, duration: 0.5, ease: "power3.inOut", overwrite: "auto" },
      );
    });

    // On removal, a copy stays behind and fades out where the item stood.
    useLayoutEffect(() => {
      const el = itemRef.current;
      return () => {
        const parent = el?.parentElement;
        if (!el || !parent || !revealedRef.current || prefersReducedMotion()) return;
        const ghost = el.cloneNode(true) as HTMLElement;
        ghost.removeAttribute("data-animated-item");
        ghost.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
        ghost.setAttribute("aria-hidden", "true");
        ghost.setAttribute("inert", "");
        Object.assign(ghost.style, {
          position: "absolute",
          top: `${el.offsetTop}px`,
          left: `${el.offsetLeft}px`,
          width: `${el.offsetWidth}px`,
          height: `${el.offsetHeight}px`,
          margin: "0",
          pointerEvents: "none",
        });
        parent.appendChild(ghost);
        gsap.to(ghost, {
          ...BLUR_OUT,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => ghost.remove(),
        });
      };
    }, []);

    return React.createElement(as, {
      ...props,
      "data-animated-item": "",
      ref: mergeRefs(itemRef, ref as React.Ref<HTMLElement>),
      className: cn(!revealed && "opacity-0", className),
    } as React.HTMLAttributes<HTMLElement>);
  },
);
AnimatedListItem.displayName = "AnimatedListItem";
