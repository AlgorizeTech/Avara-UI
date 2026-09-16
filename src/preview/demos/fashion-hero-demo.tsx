"use client";

import { FashionHero, type Look } from "@/components/custom/blocks/FashionHeroBlock";
import { cn } from "@/lib/utils";

// Studio shots from Pexels (free to use). Each sits on a colour that echoes
// the outfit, multiplied on so a plain background takes the tone.
const pexels = (id: number, w = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

const LOOKS: Look[] = [
  { src: pexels(16944801), alt: "A woman in a pink shirt and lime trousers, on yellow", tone: "#f0a72f", blend: false, position: "50% 25%" },
  { src: pexels(1520760, 500), alt: "A woman in a dark top, smiling", tone: "#f7d774", position: "50% 30%" },
  { src: pexels(1036623), alt: "A woman in a pale pink dress, chin on hand", tone: "#f4b7c5", blend: false, position: "50% 15%" },
  { src: pexels(1462637), alt: "A woman in a striped blue shirt, gesturing", tone: "#8cc4ee", position: "50% 20%" },
  { src: pexels(9558236), alt: "A woman in a coral shirt dress, hands in pockets", tone: "#f9a875", position: "50% 20%" },
  { src: pexels(6311613), alt: "A woman in a grey hoodie, hood up", tone: "#bfe4c6", position: "50% 15%" },
  { src: pexels(3775534, 500), alt: "A man in a black leather jacket", tone: "#2e9c82", position: "50% 25%" },
];

const AVATARS = [
  { src: pexels(1036623, 120), alt: "Customer" },
  { src: pexels(2043590, 120), alt: "Customer" },
  { src: pexels(1587009, 120), alt: "Customer" },
];

export default function FashionHeroDemo({
  reveal = "immediate",
  rounded = true,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
}) {
  return (
    <FashionHero
      reveal={reveal}
      heading="Elevate Your Style With Bold Fashion"
      video={{ badge: "Learn about us through this video", url: "https://www.youtube.com/embed/ysz5S6PUM-U", title: "About TrendZone" }}
      avatars={AVATARS}
      avatarsHref="#community"
      looks={LOOKS}
      cta={{ label: "Explore collections", href: "#collections" }}
      quote={{
        text: "TrendZone's styles are fresh, bold, and exactly what I needed to upgrade my wardrobe. Loved the quality and vibe!",
        author: "Rafi H.",
      }}
      teaser={{ index: "01", label: "Lifestyle", title: "Set Up Your Fashion With The Latest Trends", href: "#stories" }}
      className={cn("max-w-6xl", rounded && "rounded-[28px] border border-black/[0.06] dark:border-white/10")}
    />
  );
}
