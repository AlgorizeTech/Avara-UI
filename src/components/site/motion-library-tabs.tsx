"use client";

import { useSlidingPill } from "@/components/site/sliding-pill";
import { cn } from "@/lib/utils";
import { GsapIcon, MotionIcon } from "@/components/custom/blocks/Icons";
import {
  MOTION_LIBRARIES,
  MOTION_LIBRARY_LABEL,
  useMotionLibrary,
  type MotionLibrary,
} from "@/contexts/motion-library-context";

/**
 * The libraries' own logos from the brand icon set. On the solid active pill
 * the mark takes the pill's text colour so it reads against any theme colour;
 * the idle one shows the brand mark (GSAP green, Motion in the idle text
 * colour), slightly faded.
 */
function LibraryMark({ library, active }: { library: MotionLibrary; active: boolean }) {
  const Icon = library === "gsap" ? GsapIcon : MotionIcon;
  return (
    <Icon
      aria-hidden
      size={16}
      fill={active ? "currentColor" : undefined}
      className={cn(
        "relative shrink-0 transition-opacity",
        !active && "opacity-80",
      )}
    />
  );
}

/** The accent pill behind the selected build. */
const LIBRARY_PILL = "rounded-md bg-primary shadow-sm";

/**
 * The GSAP / Motion switch for a component that ships both builds.
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
  /** Logos only below `sm`, for a crowded bar; the name stays for screen readers. */
  compact?: boolean;
}) {
  const { library, setLibrary } = useMotionLibrary();
  // One highlight per switch, so two switches on a page never trade it.
  const pill = useSlidingPill(library);

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
      ref={pill.ref}
      className={cn(
        "relative flex shrink-0 items-center gap-0.5 rounded-lg bg-foreground/[0.06] p-0.5 ring-foreground/10",
        className,
      )}
    >
      {pill.pill(LIBRARY_PILL)}
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
            data-pill-active={isActive || undefined}
            className={cn(
              "relative flex cursor-pointer items-center gap-1.5 rounded-md px-2 py-1 text-[12px] font-medium whitespace-nowrap transition-colors duration-150 motion-reduce:transition-none sm:px-2.5",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              isActive
                ? "text-primary-foreground"
                : "text-foreground/60 hover:bg-foreground/[0.05] hover:text-foreground",
              isActive && !pill.ready && LIBRARY_PILL,
            )}
          >
            <LibraryMark library={candidate} active={isActive} />
            <span className={cn("relative", compact && "hidden sm:inline")}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
