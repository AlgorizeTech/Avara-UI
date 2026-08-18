"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronsUpDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import type { IconType } from "react-icons";
import { SiNextdotjs, SiReact } from "react-icons/si";

import { useFramework } from "@/hooks/use-framework";
import {
  FRAMEWORK_META,
  type Framework,
  LISTED_FRAMEWORKS,
  swapFramework,
} from "@/lib/framework";
import { cn } from "@/lib/utils";

/**
 * The brand mark for each framework.
 *
 * Kept here rather than in `lib/framework` so that module stays a plain data
 * file the server can import without pulling an icon package along with it.
 *
 * The mark is what makes this control self-describing at a glance. A lone word
 * beside a chevron reads as "some dropdown"; the same word beside the React
 * atom reads as "this is the framework". `brand` is set only where a framework
 * owns a colour — Next.js is monochrome by design and inherits the theme, so
 * the two marks stay distinguishable in both light and dark.
 */
const FRAMEWORK_BRAND: Record<Framework, { Icon: IconType; brand?: string }> = {
  nextjs: { Icon: SiNextdotjs },
  reactjs: { Icon: SiReact, brand: "text-[#0B93C4] dark:text-[#61DAFB]" },
};

/** The tile the mark sits in — shared by the trigger and the options so the
 *  selected row and the trigger read as the same object in two places. */
function FrameworkMark({
  framework,
  className,
}: {
  framework: Framework;
  className?: string;
}) {
  const { Icon, brand } = FRAMEWORK_BRAND[framework];

  return (
    <span
      aria-hidden
      className={cn(
        "grid size-7 shrink-0 place-items-center rounded-[9px]",
        "bg-white ring-1 ring-inset ring-zinc-200",
        "dark:bg-zinc-800 dark:ring-white/10",
        className,
      )}
    >
      <Icon
        className={cn("size-[15px]", brand ?? "text-zinc-900 dark:text-zinc-100")}
      />
    </span>
  );
}

/**
 * Scopes the docs to a framework.
 *
 * Sits above the search input rather than below it, because it scopes the whole
 * tree underneath — nav items and search results alike — and a scoping control
 * placed below what it scopes misstates the hierarchy. It shares the sidebar's
 * sticky region so it never scrolls out of reach: the moment a reader realises
 * they are on the wrong framework is exactly when hunting for this control would
 * be the failure.
 *
 * The trigger states its own subject: a small "Framework" eyebrow over the
 * current value, with that framework's mark beside it. That costs one line of
 * height and buys the reader never having to open the menu to discover what the
 * menu is for — the same reason the popover carries a title rather than opening
 * as a bare list of two words.
 *
 * Built on a plain button + listbox rather than a Radix menu because the project
 * does not depend on `@radix-ui/react-dropdown-menu`, and a two-item control is
 * not worth a new package. The keyboard and screen-reader behaviour Radix would
 * have provided is implemented below.
 */
export function FrameworkSwitcher({
  onNavigate,
  className,
}: {
  /** Lets the mobile sheet close itself when the reader switches. */
  onNavigate?: () => void;
  className?: string;
}) {
  const framework = useFramework();
  const pathname = usePathname() ?? "";
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const labelId = useId();

  const options = LISTED_FRAMEWORKS;
  const activeIndex = Math.max(0, options.indexOf(framework));

  // One option is not a choice. A disabled or single-item dropdown advertises a
  // feature that does nothing and invites "when?"; rendering nothing leaves the
  // sidebar exactly as it was before this feature existed.
  const isHidden = options.length < 2;

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  const select = useCallback(
    (next: Framework) => {
      setOpen(false);
      if (next === framework) {
        triggerRef.current?.focus();
        return;
      }

      // Preserve the slug: switching on /docs/nextjs/dialog lands on
      // /docs/reactjs/dialog. Dropping the reader at the framework index would
      // punish switching and teach them not to.
      router.push(swapFramework(pathname, next));

      // A framework switch is a route change, and route changes are silent to a
      // screen reader unless announced.
      setAnnouncement(`Switched to ${FRAMEWORK_META[next].label}.`);
      onNavigate?.();
    },
    [framework, onNavigate, pathname, router],
  );

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  if (isHidden) return null;

  const meta = FRAMEWORK_META[framework];

  const onTriggerKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onOptionKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        optionRefs.current[(index + 1) % options.length]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        optionRefs.current[(index - 1 + options.length) % options.length]?.focus();
        break;
      case "Home":
        event.preventDefault();
        optionRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        optionRefs.current[options.length - 1]?.focus();
        break;
      case "Escape":
        event.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        // Naming the role, not just the value: a trigger that announces only
        // "Next.js" tells a screen-reader user nothing about what it does.
        aria-label={`Framework: ${meta.label}. Switch documentation framework`}
        className={cn(
          "group relative flex w-full items-center gap-2.5 rounded-lg py-[7px] pl-[7px] pr-2.5 text-left",
          "border border-zinc-200/90 bg-zinc-50 shadow-[0_1px_2px_rgba(24,24,27,0.04)]",
          "hover:border-zinc-300 hover:bg-white",
          "dark:border-zinc-800 dark:bg-zinc-900/60 dark:shadow-none",
          "dark:hover:border-zinc-700 dark:hover:bg-zinc-900",
          "transition-[background-color,border-color] duration-150 ease-out motion-reduce:transition-none",
          "outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70 dark:focus-visible:ring-zinc-500/70",
          open && "border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-900",
        )}
      >
        <FrameworkMark
          framework={framework}
          className="shadow-[0_1px_2px_rgba(24,24,27,0.06)] dark:shadow-none"
        />

        <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
          {/* The subject of the control, said out loud. Without it the trigger
              is a bare noun, and the reader has to open the menu to learn what
              the menu changes. */}
          <span className="text-[9px] font-semibold uppercase leading-none tracking-[0.11em] text-zinc-500 dark:text-zinc-500">
            Framework
          </span>
          <span className="truncate text-[13.5px] font-semibold leading-none text-zinc-900 dark:text-zinc-100">
            {meta.label}
          </span>
        </span>

        {/* Two arrows, not one. A lone chevron is the universal mark for "expand
            this section"; the up/down pair is the mark for "this value can be
            exchanged for another" — which is what actually happens here. */}
        <ChevronsUpDown
          aria-hidden
          className={cn(
            "size-3.5 shrink-0 text-zinc-400 transition-colors duration-150 motion-reduce:transition-none",
            "group-hover:text-zinc-600 dark:text-zinc-500 dark:group-hover:text-zinc-300",
            open && "text-zinc-600 dark:text-zinc-300",
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            // A short, decelerating curve: the menu arrives fast enough to feel
            // attached to the click and settles without bouncing.
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "absolute left-0 right-0 top-[calc(100%+6px)] z-30 origin-top rounded-xl p-1.5",
              "border border-zinc-200 bg-white shadow-[0_12px_32px_-12px_rgba(24,24,27,0.22)]",
              "dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.7)]",
            )}
          >
            {/* The menu says what it switches, so the list underneath is read as
                two frameworks rather than two unexplained words. */}
            <p
              id={labelId}
              className="px-1.5 pb-2 pt-1 text-[9px] font-semibold uppercase leading-none tracking-[0.11em] text-zinc-400 dark:text-zinc-500"
            >
              Switch framework
            </p>

            <ul role="listbox" aria-labelledby={labelId} className="flex flex-col gap-1">
              {options.map((option, index) => {
                const optionMeta = FRAMEWORK_META[option];
                const isActive = option === framework;

                return (
                  <li key={option} role="none">
                    <button
                      ref={(node) => {
                        optionRefs.current[index] = node;
                      }}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => select(option)}
                      onKeyDown={(event) => onOptionKeyDown(event, index)}
                      className={cn(
                        "flex w-full items-center gap-2.5 rounded-lg py-[7px] pl-[7px] pr-2.5 text-left",
                        "transition-colors duration-150 ease-out motion-reduce:transition-none",
                        "outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/70 dark:focus-visible:ring-zinc-500/70",
                        isActive
                          ? "bg-zinc-100 dark:bg-zinc-800/70"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/40",
                      )}
                    >
                      <FrameworkMark
                        framework={option}
                        className={cn(
                          !isActive &&
                            "bg-zinc-50 ring-zinc-200/80 dark:bg-zinc-800/60 dark:ring-white/[0.07]",
                        )}
                      />

                      <span className="flex min-w-0 flex-1 flex-col gap-[5px]">
                        <span className="truncate text-[13px] font-semibold leading-none text-zinc-900 dark:text-zinc-100">
                          {optionMeta.label}
                        </span>
                        {/* The tiebreaker. "Next.js" and "React" are close
                            enough that "App Router" versus "Vite" is what tells
                            a reader which one their own project is. */}
                        <span className="truncate text-[10.5px] leading-none text-zinc-500 dark:text-zinc-400">
                          {optionMeta.hint}
                        </span>
                      </span>

                      {isActive && (
                        <Check
                          aria-hidden
                          className="size-3.5 shrink-0 text-zinc-900 dark:text-zinc-100"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <span role="status" aria-live="polite" className="sr-only">
        {announcement}
      </span>
    </div>
  );
}
