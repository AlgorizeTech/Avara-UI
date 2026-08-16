"use client";
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
 * Built from the same tokens as the Sandbox tab pills it sits beside — same
 * track, same active fill — so the header reads as one row of controls. The
 * type badges are drawn in CSS rather than imported as icons, which keeps
 * them crisp at 16px and tied to the official brand colours.
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
  return (
    <div
      className={cn(
        "flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg animate-in fade-in duration-200",
        className,
      )}
    >
      {LANGUAGES.map(({ value, label, badge, badgeClass, textClass }) => (
        <button
          key={value}
          type="button"
          onClick={() => onLanguageChange?.(value)}
          aria-pressed={selectedLanguage === value}
          // Keeps the full name for screen readers once the word is hidden.
          aria-label={label}
          className={cn(
            "flex items-center gap-1.5 px-1.5 sm:px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
            selectedLanguage === value
              ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-[3px] flex items-center justify-center shrink-0",
              badgeClass,
            )}
          >
            <span
              className={cn(
                "text-[9px] font-bold leading-none mt-px",
                textClass,
              )}
            >
              {badge}
            </span>
          </div>
          {/* Below sm the badge alone carries the meaning — it already reads
              TS/JS — so the word is dropped rather than truncated. */}
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default CodeCopy;
