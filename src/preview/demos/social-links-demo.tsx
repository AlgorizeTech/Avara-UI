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
  /** `row` is the five footer networks; `all` every network; `byline` an author card. */
  example?: "row" | "all" | "byline";
}) {
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
