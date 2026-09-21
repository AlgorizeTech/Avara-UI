"use client";

import { ImageWall, type WallItem } from "@/components/custom/blocks/ImageWallBlock";
import { cn } from "@/lib/utils";

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

export default function ImageWallDemo({
  interval = 4500,
  order = "serial",
  zoom = 1.35,
  columns = 4,
  example = "window",
}: {
  /** Milliseconds the camera rests on a card; 0 holds still. */
  interval?: number;
  /** Card by card, or every card once per round in a random order. */
  order?: "serial" | "shuffle";
  /** The camera's resting scale. */
  zoom?: number;
  /** Columns in one tile. */
  columns?: number;
  /** `window` is a tall box, one card at a time; `band` a short strip that shows a few. */
  example?: "window" | "band";
}) {
  return (
    <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-neutral-950">
      <ImageWall
        items={ITEMS}
        interval={interval}
        order={order}
        zoom={zoom}
        columns={columns}
        className={cn(example === "band" ? "h-56 sm:h-64" : "h-[28rem] sm:h-[32rem]")}
      />
    </div>
  );
}
