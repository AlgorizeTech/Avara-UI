import type { ReactNode } from "react";
import { Check, type LucideIcon } from "lucide-react";

/**
 * The canvas panel beside a homepage FAQ answer: a title bar, a grid of short
 * points, one highlighted line and a footer. Laid out like the visuals that
 * ship with AnimatedFAQBlock so the two kinds sit together on the same canvas.
 */
export function FaqTopicVisual({
  icon: Icon,
  title,
  badge,
  points,
  highlight,
  highlightMeta,
  footerLeft,
  footerRight,
}: {
  icon: LucideIcon;
  title: string;
  badge: string;
  /** Four short phrases, shown two to a row. */
  points: string[];
  highlight: ReactNode;
  highlightMeta: string;
  footerLeft: string;
  footerRight: string;
}) {
  return (
    <div className="w-full h-full py-4.5 px-6 sm:px-8 flex flex-col justify-between bg-card dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 select-none transition-colors duration-200">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/70">
        <div className="flex items-center gap-2 min-w-0">
          <div className="p-1 rounded-md bg-primary/10 text-primary border border-primary/20 shrink-0">
            <Icon className="size-4" />
          </div>
          <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 truncate">
            {title}
          </span>
        </div>
        <span className="shrink-0 text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 font-bold">
          {badge}
        </span>
      </div>

      <div className="my-auto py-2 space-y-2">
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          {points.map((point) => (
            <div
              key={point}
              className="p-2.5 rounded-xl bg-muted/30 dark:bg-neutral-900/70 border border-border/60 flex items-center gap-2 shadow-xs"
            >
              <Check className="size-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="text-foreground font-medium leading-tight">{point}</span>
            </div>
          ))}
        </div>

        <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between gap-3 text-xs text-primary">
          <span className="font-semibold flex items-center gap-1.5 min-w-0">{highlight}</span>
          <span className="shrink-0 font-mono text-[10px] opacity-80">{highlightMeta}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border/70 flex items-center justify-between gap-3 text-[10px] text-muted-foreground font-mono">
        <span className="truncate">{footerLeft}</span>
        <span className="shrink-0">{footerRight}</span>
      </div>
    </div>
  );
}
