"use client";

import { ComponentWall, type WallItem } from "@/components/custom/blocks/ComponentWallBlock";

// Screenshots of this library's own sections, captured from their previews.
const wall = (name: string, title: string): WallItem => ({
  title,
  image: `/assets/wall/${name}.jpg`,
});

const ITEMS: WallItem[] = [
  wall("hero", "Word bounce hero"),
  wall("pricing", "Product showcase"),
  wall("bento-showcase", "Bento showcase"),
  wall("book-appointment", "Book appointment"),
  wall("collage-hero", "Collage hero"),
  wall("fashion-hero", "Fashion hero"),
  wall("hero-carousel", "Hero carousel"),
  wall("honeycomb-hero", "Honeycomb hero"),
  wall("orbit-gallery", "Orbit gallery"),
  wall("newsletter", "Newsletter"),
  wall("waitlist", "Waitlist"),
  wall("footer", "Footer"),
  wall("support-hero", "Support hero"),
  wall("platform-grid", "Platform grid"),
  wall("profile-page", "Profile page"),
  wall("data-flow", "Data flow"),
  wall("navbar", "Navbar"),
  wall("login-form", "Login form"),
  wall("chart", "Chart"),
  wall("product-details", "Product details"),
  wall("reviews", "Reviews"),
  wall("calendar", "Calendar"),
  wall("invoice", "Invoice"),
  wall("data-grid", "Data grid"),
];

const AVATARS = [12, 32, 47, 5, 58, 21, 36].map((n) => ({ src: `https://i.pravatar.cc/80?img=${n}`, alt: "" }));

export default function ComponentWallDemo({
  interval = 4500,
  order = "serial",
}: {
  /** Milliseconds the camera rests on a card; 0 holds still. */
  interval?: number;
  /** Card by card, or every card once per round in a random order. */
  order?: "serial" | "shuffle";
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <ComponentWall
        badge={{ label: "Changelog", text: "60+ new blocks", href: "#" }}
        heading="The React component library for beautiful landing pages."
        description="200+ production-ready components, blocks and templates built with React, Tailwind CSS and Motion. Copy, paste, customize, and ship at lightning speed without wrestling with animations or styling."
        primaryAction={{ label: "Browse components", href: "#" }}
        secondaryAction={{ label: "Get all-access", href: "#" }}
        trust={{ text: "Trusted by 120,000+ founders, developers and creators", avatars: AVATARS, rating: 5 }}
        items={ITEMS}
        interval={interval}
        order={order}
      />
    </div>
  );
}
