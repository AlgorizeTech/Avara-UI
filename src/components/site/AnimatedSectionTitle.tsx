"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export type SectionIconKey =
  | "package"
  | "layers"
  | "card"
  | "terminal"
  | "zap";

const ICON_PATHS: Record<SectionIconKey, string[]> = {
  package: [
    "M16.5 9.4 7.55 4.24",
    "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
    "M3.29 7 12 12l8.71-5",
    "M12 22V12",
  ],
  layers: [
    "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
    "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
    "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
  ],
  card: [
    "M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z",
    "M1 10h22",
    "M6 15h4",
  ],
  terminal: [
    "M4 17l6-6-6-6",
    "M12 19h8",
  ],
  zap: [
    "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  ],
};

function DrawIcon({ icon }: { icon: SectionIconKey }) {
  const prefersReducedMotion = useReducedMotion();
  const paths = ICON_PATHS[icon];

  return (
    <span
      aria-hidden
      className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-foreground/[0.04] border border-foreground/[0.08]"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        className="size-4"
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Base gray icon */}
        <g className="text-foreground/25">
          {paths.map((d, i) => (
            <path key={`bg-${i}`} d={d} stroke="currentColor" />
          ))}
        </g>

        {/* Animated draw-over stroke */}
        <g className="text-primary">
          {paths.map((d, i) => (
            <motion.path
              key={`fg-${i}`}
              d={d}
              stroke="currentColor"
              initial={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 1 }
                  : { pathLength: 0, opacity: 0.4 }
              }
              animate={
                prefersReducedMotion
                  ? { pathLength: 1, opacity: 1 }
                  : {
                      pathLength: [0, 1, 1, 0],
                      opacity: [0.4, 1, 1, 0.4],
                    }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 2.2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      repeatDelay: 0.6,
                      ease: "easeInOut",
                      times: [0, 0.45, 0.75, 1],
                    }
              }
            />
          ))}
        </g>
      </svg>
    </span>
  );
}

export function AnimatedSectionTitle({
  icon,
  children,
  id,
  className,
}: {
  icon: SectionIconKey;
  children: React.ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={cn(
        "not-prose flex items-center gap-3 font-serif text-2xl leading-8 font-normal text-foreground capitalize mt-14 mb-2 scroll-m-24 [&>p]:m-0",
        className,
      )}
    >
      <DrawIcon icon={icon} />
      <span>{children}</span>
    </h2>
  );
}
