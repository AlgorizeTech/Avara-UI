"use client";

import { FlavourCarousel, type Flavour } from "@/components/custom/blocks/FlavourCarouselBlock";
import { cn } from "@/lib/utils";

// Eight matcha lattes and what goes in them. Every cup is cut from the same
// sheet with the same geometry, so only the contents change between them.
const ASSETS: Record<string, string> = {
  "cup-berry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-berry-1790509374064.webp",
  "cup-chocolate": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-chocolate-1790509374067.webp",
  "cup-cookie": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-cookie-1790509374068.webp",
  "cup-grape": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/cup-grape-1790509374068.webp",
  "cup-mango": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-mango-1790509374068.webp",
  "cup-passion": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509366/cup-passion-1790509374069.webp",
  "cup-strawberry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/cup-strawberry-1790509374069.webp",
  "cup-ube": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/cup-ube-1790509374069.webp",
  "flavour-berry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-berry-1790509374070.webp",
  "flavour-chocolate": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-chocolate-1790509374070.webp",
  "flavour-cookie": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-cookie-1790509374071.webp",
  "flavour-grape": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-grape-1790509374071.webp",
  "flavour-mango": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509367/flavour-mango-1790509374071.webp",
  "flavour-passion": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-passion-1790509374072.webp",
  "flavour-strawberry": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-strawberry-1790509374072.webp",
  "flavour-ube": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/flavour-ube-1790509374072.webp",
  "green-background-matcha": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509368/green-background-matcha-1790509374073.webp",
  "matcha-powder": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790509369/matcha-powder-1790509374074.png",
};

const asset = (name: string) => ASSETS[name];

export const FLAVOURS: Flavour[] = [
  { name: "Strawberry", price: "$6.50", tint: "#e5394a", product: asset("cup-strawberry"), tile: asset("flavour-strawberry") },
  { name: "Mixed berry", price: "$6.90", tint: "#6a46a8", product: asset("cup-berry"), tile: asset("flavour-berry") },
  { name: "Mango", price: "$6.50", tint: "#f4a51c", product: asset("cup-mango"), tile: asset("flavour-mango") },
  { name: "Passion fruit", price: "$6.90", tint: "#c2604a", product: asset("cup-passion"), tile: asset("flavour-passion") },
  { name: "Chocolate", price: "$6.90", tint: "#8a5a3c", product: asset("cup-chocolate"), tile: asset("flavour-chocolate") },
  { name: "Cookies and cream", price: "$7.20", tint: "#5c4a44", product: asset("cup-cookie"), tile: asset("flavour-cookie") },
  { name: "Grape", price: "$6.50", tint: "#a3305e", product: asset("cup-grape"), tile: asset("flavour-grape") },
  { name: "Ube", price: "$7.20", tint: "#9a5ec2", product: asset("cup-ube"), tile: asset("flavour-ube") },
];

export default function FlavourCarouselDemo({
  interval = 5000,
  rounded = true,
  reveal = "immediate",
}: {
  /** Milliseconds between turns; 0 turns autoplay off. */
  interval?: number;
  rounded?: boolean;
  /** In the docs the section is already on screen, so play the entrance at once. */
  reveal?: "in-view" | "immediate" | "none";
}) {
  return (
    <FlavourCarousel
      flavours={FLAVOURS}
      heading="Choose your matcha tea"
      backgroundImage={asset("green-background-matcha")}
      foregroundImage={asset("matcha-powder")}
      interval={interval}
      reveal={reveal}
      onAdd={() => {}}
      className={cn("w-full", rounded && "rounded-[28px]")}
    />
  );
}
