"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  MOTION_LIBRARIES,
  MOTION_LIBRARY_LABEL,
  useMotionLibrary,
  type MotionLibrary,
} from "@/contexts/motion-library-context";

/**
 * Brand marks, drawn in CSS/SVG like the TS/JS badges in code-copy.tsx so they
 * stay crisp at 14px and carry the libraries' own colours: GSAP's green and
 * Framer's blue. The idle one is desaturated like an inactive tab icon.
 */
function LibraryMark({ library, active }: { library: MotionLibrary; active: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative flex size-3.5 shrink-0 items-center justify-center rounded-[3px] transition-[filter,opacity]",
        library === "gsap" ? "bg-[#0AE448]" : "bg-[#0055FF]",
        !active && "grayscale opacity-60",
      )}
    >
      {library === "gsap" ? (
        <span className="mt-px text-[7px] leading-none font-bold tracking-tight text-black">
          GS
        </span>
      ) : (
        // The Framer "F": two squares and a diagonal step, on a 24 grid.
        <svg viewBox="0 0 24 24" className="size-2.5 fill-white">
          <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
        </svg>
      )}
    </span>
  );
}

/**
 * The GSAP / Framer Motion switch for a component that ships both builds.
 *
 * Every instance reads and writes the one page-wide pick, so the switch in a
 * preview's bar, the one above the install steps and every other preview on
 * the page move together — the preview, the Code tab and the install command
 * always show the same build.
 *
 * Same segmented anatomy as the TS/JS switch and the name/URL switch: a tinted
 * track, the active side on an accent pill that slides between options.
 */
export function MotionLibraryTabs({
  className,
  compact = false,
}: {
  className?: string;
  /** Short labels ("GSAP" / "Framer") for a crowded bar; the full name stays for screen readers. */
  compact?: boolean;
}) {
  const { library, setLibrary } = useMotionLibrary();
  // One highlight per switch, so two switches on a page never trade it.
  const id = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div
      role="radiogroup"
      aria-label="Animation library"
      onKeyDown={(event) => {
        // Radiogroup convention: arrows move the selection, not focus.
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        event.preventDefault();
        const index = MOTION_LIBRARIES.indexOf(library);
        const step = event.key === "ArrowRight" ? 1 : -1;
        const next =
          MOTION_LIBRARIES[(index + step + MOTION_LIBRARIES.length) % MOTION_LIBRARIES.length];
        setLibrary(next);
        (event.currentTarget.querySelector(
          `[data-library="${next}"]`,
        ) as HTMLButtonElement | null)?.focus();
      }}
      className={cn(
        "flex shrink-0 items-center gap-0.5 rounded-lg bg-foreground/[0.04] p-0.5",
        className,
      )}
    >
      {MOTION_LIBRARIES.map((candidate) => {
        const isActive = candidate === library;
        const label = MOTION_LIBRARY_LABEL[candidate];
        return (
          <button
            key={candidate}
            type="button"
            role="radio"
            data-library={candidate}
            aria-checked={isActive}
            aria-label={label}
            tabIndex={isActive ? 0 : -1}
            title={`Show the ${label} build`}
            onClick={() => setLibrary(candidate)}
            className={cn(
              "relative flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none sm:px-2.5",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isActive ? "text-primary" : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`${id}-motion-library`}
                aria-hidden
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 520, damping: 42, mass: 0.8 }
                }
                className="absolute inset-0 rounded-md bg-primary/15"
              />
            )}
            <LibraryMark library={candidate} active={isActive} />
            <span className="relative">
              {compact && candidate === "framer" ? "Framer" : label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
