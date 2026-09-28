"use client";
import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type LanguageType = 'tsx' | 'jsx';

const LANGUAGES: Array<{
  value: LanguageType;
  label: string;
  badge: string;
  /** Square badge fill + the text colour that stays legible on it. */
  badgeClass: string;
  textClass: string;
}> = [
  {
    value: 'tsx',
    label: 'TypeScript',
    badge: 'TS',
    badgeClass: 'bg-[#3178C6]',
    textClass: 'text-white',
  },
  {
    value: 'jsx',
    label: 'JavaScript',
    badge: 'JS',
    badgeClass: 'bg-[#F7DF1E]',
    textClass: 'text-black',
  },
];

/**
 * TS/JS switch for a code panel.
 *
 * A compact segmented control sized to sit inside the 40px code bar: the
 * selected side takes the accent tint, the other rests at the ink's 40% step.
 * The type badges are drawn in CSS rather than imported as icons, which keeps
 * them crisp and tied to the official brand colours; the idle one is
 * desaturated like an inactive tab icon.
 */
const CodeCopy = ({
  className,
  selectedLanguage = 'tsx',
  onLanguageChange,
}: {
  className?: string;
  selectedLanguage?: LanguageType;
  onLanguageChange?: (language: LanguageType) => void;
}) => {
  // One highlight per switch, so two panels on a page never trade it.
  const id = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "flex items-center gap-0.5 rounded-lg bg-foreground/[0.04] p-0.5 animate-in fade-in duration-200",
        className,
      )}
    >
      {LANGUAGES.map(({ value, label, badge, badgeClass, textClass }) => {
        const isActive = selectedLanguage === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => onLanguageChange?.(value)}
            aria-pressed={isActive}
            // Keeps the full name for screen readers once the word is hidden.
            aria-label={label}
            className={cn(
              "relative flex items-center gap-1.5 px-1.5 sm:px-2.5 py-1 text-[12px] font-medium rounded-md transition-colors cursor-pointer",
              isActive
                ? "text-primary"
                : "text-foreground/40 hover:text-foreground/70",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`${id}-language`}
                aria-hidden
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 520, damping: 42, mass: 0.8 }
                }
                className="absolute inset-0 rounded-md bg-primary/15"
              />
            )}
            <div
              className={cn(
                "relative w-3.5 h-3.5 rounded-[3px] flex items-center justify-center shrink-0 transition-[filter,opacity]",
                badgeClass,
                !isActive && "grayscale opacity-60",
              )}
            >
              <span
                className={cn(
                  "text-[8px] font-semibold leading-none mt-px",
                  textClass,
                )}
              >
                {badge}
              </span>
            </div>
            {/* Below sm the badge alone carries the meaning — it already reads
                TS/JS — so the word is dropped rather than truncated. */}
            <span className="relative hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CodeCopy;
