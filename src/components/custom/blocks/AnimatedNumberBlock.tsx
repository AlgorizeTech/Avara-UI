"use client";

import { cn } from "@/lib/utils";
import gsap from "gsap";
import React, { useEffect, useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "./gsap-motion";
import { useInView } from "./in-view";

export interface AnimatedNumberProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number;
  /** Turns the running number into text. Defaults to `toLocaleString()`. */
  format?: (value: number) => string;
  /** Seconds each count takes. */
  duration?: number;
  /**
   * `count` ticks through the values. `roll` slides each changed digit in: from
   * below when the value goes up, from above when it goes down. `blur` fades
   * each changed digit in out of a blur, drifting the same way.
   */
  variant?: "count" | "roll" | "blur";
}

/** One character slot. When its character changes, the old one leaves and the new one enters. */
function Slot({
  char,
  dir,
  variant,
  duration,
  index,
}: {
  char: string;
  dir: 1 | -1;
  variant: "roll" | "blur";
  duration: number;
  index: number;
}) {
  const inRef = useRef<HTMLSpanElement>(null);
  const outRef = useRef<HTMLSpanElement>(null);
  const last = useRef(char);

  useLayoutEffect(() => {
    const from = last.current;
    last.current = char;
    const entering = inRef.current;
    const leaving = outRef.current;
    if (from === char || !entering || !leaving || prefersReducedMotion()) return;
    const roll = variant === "roll";
    const shift = roll ? 100 : 40;
    const blur = roll ? "blur(0px)" : "blur(8px)";
    const fade = roll ? 1 : 0;
    const ease = roll ? "power3.out" : "power2.out";
    const delay = Math.min(index * 0.035, 0.3);
    leaving.textContent = from;
    const tl = gsap.timeline({ delay });
    tl.fromTo(
      entering,
      { yPercent: dir * shift, opacity: fade, filter: roll ? blur : "blur(8px)" },
      { yPercent: 0, opacity: 1, filter: "blur(0px)", duration, ease },
      0,
    ).fromTo(
      leaving,
      { yPercent: 0, opacity: 1, filter: "blur(0px)" },
      { yPercent: -dir * shift, opacity: fade, filter: blur, duration, ease },
      0,
    );
    tl.call(() => {
      leaving.textContent = "";
    });
    tl.set(leaving, { opacity: 0 });
    return () => {
      tl.kill();
      gsap.set([entering, leaving], { clearProps: "transform,opacity,filter" });
      leaving.textContent = "";
    };
  }, [char, dir, variant, duration, index]);

  return (
    <span
      className={cn(
        "inline-grid whitespace-pre",
        variant === "roll" && "-my-[0.1em] py-[0.1em] [clip-path:inset(0_-0.15em)]",
      )}
    >
      <span ref={inRef} className="col-start-1 row-start-1 justify-self-center">
        {char}
      </span>
      <span ref={outRef} className="col-start-1 row-start-1 justify-self-center opacity-0" />
    </span>
  );
}

/**
 * A number that counts up when it scrolls into view, then counts from where it
 * is to every new `value`. Screen readers get the final value, not the count.
 */
export function AnimatedNumber({
  value,
  format = (n) => n.toLocaleString(),
  duration = 0.9,
  variant = "count",
  className,
  ...props
}: AnimatedNumberProps) {
  const [watch, inView] = useInView();
  const textRef = useRef<HTMLSpanElement>(null);
  const shown = useRef({ value: 0 });
  const formatRef = useRef(format);
  formatRef.current = format;
  const previous = useRef(value);
  const dir: 1 | -1 = value >= previous.current ? 1 : -1;
  useEffect(() => {
    previous.current = value;
  }, [value]);

  useEffect(() => {
    const el = textRef.current;
    if (!el || variant !== "count") return;
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
  }, [value, inView, duration, variant]);

  const chars = variant === "count" ? [] : Array.from(format(inView ? value : 0));

  return (
    <span ref={watch} className={cn("tabular-nums", className)} {...props}>
      <span className="sr-only">{format(value)}</span>
      {variant === "count" ? (
        <span ref={textRef} aria-hidden="true" />
      ) : (
        <span aria-hidden="true">
          {chars.map((char, i) => (
            <Slot
              key={chars.length - i}
              char={char}
              dir={dir}
              variant={variant}
              duration={duration}
              index={chars.length - 1 - i}
            />
          ))}
        </span>
      )}
    </span>
  );
}
