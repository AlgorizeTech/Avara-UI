"use client";

import { FashionHero, type Look } from "@/components/custom/blocks/FashionHeroBlock";
import { cn } from "@/lib/utils";

// Studio shots from Pexels (free to use). Each sits on a colour that echoes
// the outfit, multiplied on so a plain background takes the tone.

const LOOKS: Look[] = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150481/pexels-photo-16944801-1790150482273.jpg", alt: "Model in a pink blouse and lime-green pants against yellow", tone: "#f0a72f", blend: false, position: "50% 25%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "Smiling model in a black top", tone: "#f7d774", position: "50% 30%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Model in a blush dress, chin resting on her hand", tone: "#f4b7c5", blend: false, position: "50% 15%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150484/pexels-photo-1462637-1790150482282.jpg", alt: "Model in a blue pinstripe shirt, mid-gesture", tone: "#8cc4ee", position: "50% 20%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150480/pexels-photo-9558236-1790150482273.jpg", alt: "Model in a coral shirtdress, hands tucked in pockets", tone: "#f9a875", position: "50% 20%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_700,c_limit/v1790150480/pexels-photo-6311613-1790150482272.jpg", alt: "Model in a grey hooded top, hood raised", tone: "#bfe4c6", position: "50% 15%" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_500,c_limit/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Man wearing a dark leather jacket", tone: "#2e9c82", position: "50% 25%" },
];

const AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Shopper" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Shopper" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,c_limit/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Shopper" },
];

export default function FashionHeroDemo({
  reveal = "immediate",
  rounded = true,
  accent,
  color,
}: {
  /** In the docs the section is already on screen, so play at once. */
  reveal?: "in-view" | "immediate";
  rounded?: boolean;
  accent?: string;
  color?: string;
}) {
  return (
    <FashionHero
      reveal={reveal}
      accent={accent ?? (color?.startsWith("#") ? color : undefined)}
      heading="Refresh Your Look With Daring Designs"
      video={{ badge: "Get to know us in this short film", url: "https://www.youtube.com/embed/ysz5S6PUM-U", title: "About Moda Lane" }}
      avatars={AVATARS}
      avatarsHref="#community"
      looks={LOOKS}
      cta={{ label: "Shop new arrivals", href: "#collections" }}
      quote={{
        text: "Moda Lane pieces feel modern and confident, just the refresh my closet was missing. Great fabrics, great feel!",
        author: "Nadia K.",
      }}
      teaser={{ index: "01", label: "Journal", title: "Update Your Wardrobe With New-Season Picks", href: "#stories" }}
      className={cn("max-w-6xl", rounded && "rounded-[28px] border border-border")}
    />
  );
}
