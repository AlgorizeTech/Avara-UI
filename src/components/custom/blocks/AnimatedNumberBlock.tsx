"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import { prefersReducedMotion } from "./gsap-motion";
import { useInView } from "./in-view";

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  /** Turns the running number into text. Defaults to `toLocaleString()`. */
  format?: (value: number) => string;
  /** Seconds each count takes. */
  duration?: number;
}

/**
 * A number that counts up when it scrolls into view, then counts from where it
 * is to every new `value`. Screen readers get the final value, not the count.
 */
export function AnimatedNumber({
  value,
  format = (n) => n.toLocaleString(),
  duration = 0.9,
  className,
  ...props
}: AnimatedNumberProps) {
  const [watch, inView] = useInView();
  const textRef = useRef<HTMLSpanElement>(null);
  const shown = useRef({ value: 0 });
  const formatRef = useRef(format);
  formatRef.current = format;

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    const write = () => {
      el.textContent = formatRef.current(shown.current.value);
    };
    if (!inView || prefersReducedMotion()) {
      shown.current.value = inView ? value : 0;
      write();
      return;
    }
    const tween = gsap.to(shown.current, {
      value,
      duration,
      ease: "power3.out",
      onUpdate: write,
      onComplete: write,
    });
    return () => {
      tween.kill();
    };
  }, [value, inView, duration]);

  return (
    <span ref={watch} className={cn("tabular-nums", className)} {...props}>
      <span className="sr-only">{format(value)}</span>
      <span ref={textRef} aria-hidden="true" />
    </span>
  );
}
