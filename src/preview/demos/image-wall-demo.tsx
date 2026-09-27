"use client";

import { ImageWall, type WallItem } from "@/components/custom/blocks/ImageWallBlock";
import { cn } from "@/lib/utils";

// Screenshots of this library's own sections, captured from their previews.
const WALL_IMAGES: Record<string, string> = {
  "bento-showcase": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/bento-showcase-1790516064489.jpg",
  "book-appointment": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/book-appointment-1790516064490.jpg",
  "calendar": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/calendar-1790516064491.jpg",
  "chart": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/chart-1790516064492.jpg",
  "collage-hero": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/collage-hero-1790516064493.jpg",
  "data-flow": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-flow-1790516064493.jpg",
  "data-grid": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516056/data-grid-1790516064494.jpg",
  "fashion-hero": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/fashion-hero-1790516064495.jpg",
  "footer": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/footer-1790516064495.jpg",
  "hero": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/hero-1790516064495.jpg",
  "hero-carousel": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/hero-carousel-1790516064496.jpg",
  "honeycomb-hero": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/honeycomb-hero-1790516064497.jpg",
  "invoice": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/invoice-1790516064498.jpg",
  "login-form": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/login-form-1790516064498.jpg",
  "navbar": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/navbar-1790516064499.jpg",
  "newsletter": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/newsletter-1790516064499.jpg",
  "orbit-gallery": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg",
  "platform-grid": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg",
  "pricing": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg",
  "product-details": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg",
  "profile-page": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/profile-page-1790516064501.jpg",
  "reviews": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/reviews-1790516064502.jpg",
  "support-hero": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/support-hero-1790516064502.jpg",
  "waitlist": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/waitlist-1790516064503.jpg",
};

const wall = (name: string, title: string): WallItem => ({
  title,
  image: WALL_IMAGES[name],
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
    <div className="w-full overflow-hidden rounded-2xl border border-border bg-background">
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
