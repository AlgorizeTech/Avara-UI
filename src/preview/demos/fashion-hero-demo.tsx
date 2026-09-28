"use client";

import { FashionHero, type Look } from "@/components/custom/blocks/FashionHeroBlock";
import { cn } from "@/lib/utils";

// Studio shots from Pexels (free to use). Each sits on a colour that echoes
// the outfit, multiplied on so a plain background takes the tone.

const LOOKS: Look[] = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150481/pexels-photo-16944801-1790150482273.jpg", alt: "A woman in a pink shirt and lime trousers, on yellow", tone: "#f0a72f", blend: false, position: "50% 25%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "A woman in a dark top, smiling", tone: "#f7d774", position: "50% 30%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "A woman in a pale pink dress, chin on hand", tone: "#f4b7c5", blend: false, position: "50% 15%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150484/pexels-photo-1462637-1790150482282.jpg", alt: "A woman in a striped blue shirt, gesturing", tone: "#8cc4ee", position: "50% 20%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150480/pexels-photo-9558236-1790150482273.jpg", alt: "A woman in a coral shirt dress, hands in pockets", tone: "#f9a875", position: "50% 20%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150480/pexels-photo-6311613-1790150482272.jpg", alt: "A woman in a grey hoodie, hood up", tone: "#bfe4c6", position: "50% 15%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "A man in a black leather jacket", tone: "#2e9c82", position: "50% 25%" },
];

const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Customer" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Customer" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Customer" },
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
      className={cn("max-w-6xl", rounded && "rounded-[28px] border border-border")}
    />
  );
}
