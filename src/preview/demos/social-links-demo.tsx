"use client";

import {
  SocialLinks,
  type SocialLink,
  type SocialLinksSize,
  type SocialLinksVariant,
} from "@/components/custom/blocks/SocialLinksBlock";

const LINKS: SocialLink[] = [
  { network: "x", href: "https://x.com" },
  { network: "github", href: "https://github.com" },
  { network: "linkedin", href: "https://linkedin.com" },
  { network: "youtube", href: "https://youtube.com" },
  { network: "instagram", href: "https://instagram.com" },
];

const ALL: SocialLink[] = [
  ...LINKS,
  { network: "facebook", href: "https://facebook.com" },
  { network: "discord", href: "https://discord.com" },
  { network: "dribbble", href: "https://dribbble.com" },
  { network: "email", href: "mailto:hello@example.com" },
];

export default function SocialLinksDemo({
  variant = "tile",
  size = "md",
  example = "row",
}: {
  variant?: SocialLinksVariant;
  size?: SocialLinksSize;
  /** `row` is the five footer networks; `all` every network; `byline` an author card; `expand-reveal` animated share button; `expand-replace` trigger-hide animated share button. */
  example?: "row" | "all" | "byline" | "expand-reveal" | "expand-replace";
}) {
  if (example === "expand-replace" || variant === "expand-replace") {
    return (
      <div className="w-full min-h-[720px] flex items-center justify-center p-4 sm:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-36 sm:gap-y-44 w-full max-w-xl mx-auto py-24">
          {/* 1. Expand Top */}
          <div className="flex items-center justify-center gap-3 order-3 sm:order-1">
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Top</span>
            <SocialLinks links={LINKS} variant="expand-replace" expandDirection="top" size={size} />
          </div>

          {/* 2. Expand Right */}
          <div className="flex items-center justify-start sm:justify-center gap-3 order-2 sm:order-2">
            <SocialLinks links={LINKS} variant="expand-replace" expandDirection="right" size={size} />
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Right</span>
          </div>

          {/* 3. Expand Left */}
          <div className="flex items-center justify-end sm:justify-center gap-3 order-4 sm:order-3">
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Left</span>
            <SocialLinks links={LINKS} variant="expand-replace" expandDirection="left" size={size} />
          </div>

          {/* 4. Expand Bottom */}
          <div className="flex items-center justify-center gap-3 order-1 sm:order-4">
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Bottom</span>
            <SocialLinks links={LINKS} variant="expand-replace" expandDirection="bottom" size={size} />
          </div>
        </div>
      </div>
    );
  }

  if (example === "expand-reveal" || variant === "expand-reveal") {
    return (
      <div className="w-full min-h-[720px] flex items-center justify-center p-4 sm:p-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-32 gap-y-36 sm:gap-y-44 w-full max-w-xl mx-auto py-24">
          {/* 1. Expand Top (Appears below on small screens so top icons reveal upward cleanly) */}
          <div className="flex items-center justify-center gap-3 order-3 sm:order-1">
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Top</span>
            <SocialLinks links={LINKS} variant="expand-reveal" expandDirection="top" size={size} />
          </div>

          {/* 2. Expand Right (Text badge placed on right side) */}
          <div className="flex items-center justify-start sm:justify-center gap-3 order-2 sm:order-2">
            <SocialLinks links={LINKS} variant="expand-reveal" expandDirection="right" size={size} />
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Right</span>
          </div>

          {/* 3. Expand Left (Pushed fully to the right edge on mobile) */}
          <div className="flex items-center justify-end sm:justify-center gap-3 order-4 sm:order-3">
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Left</span>
            <SocialLinks links={LINKS} variant="expand-reveal" expandDirection="left" size={size} />
          </div>

          {/* 4. Expand Bottom (Appears above on small screens so bottom icons reveal downward cleanly) */}
          <div className="flex items-center justify-center gap-3 order-1 sm:order-4">
            <span className="px-2.5 py-0.5 rounded-full bg-muted/80 text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border/40 select-none">Bottom</span>
            <SocialLinks links={LINKS} variant="expand-reveal" expandDirection="bottom" size={size} />
          </div>
        </div>
      </div>
    );
  }

  if (example === "all") {
    return (
      <div className="flex w-full min-h-[240px] items-center justify-center px-6">
        <SocialLinks links={ALL} variant={variant} size={size} className="justify-center" />
      </div>
    );
  }

  if (example === "byline") {
    return (
      <div className="flex w-full min-h-[240px] items-center justify-center px-6">
        <div className="flex w-full max-w-sm items-center gap-4 rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
            alt="Ayesha Karim"
            className="size-14 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Ayesha Karim</p>
            <p className="truncate text-xs text-muted-foreground">Design engineer, Algorize</p>
            <SocialLinks
              size="sm"
              variant="ghost"
              className="mt-2 gap-1"
              links={[
                { network: "x", href: "https://x.com", label: "Ayesha on X" },
                { network: "github", href: "https://github.com", label: "Ayesha on GitHub" },
                { network: "dribbble", href: "https://dribbble.com", label: "Ayesha on Dribbble" },
              ]}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-[240px] items-center justify-center px-6">
      <SocialLinks links={LINKS} variant={variant} size={size} className="justify-center" />
    </div>
  );
}
