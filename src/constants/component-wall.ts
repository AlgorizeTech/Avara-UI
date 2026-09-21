import type { ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";

// Screenshots of this library's own sections, captured from their previews
// into public/assets/wall. The slug is the registry item, so the hero's
// install line always names something real.
const wall = (slug: string, title: string): ComponentWallItem => ({
  slug,
  title,
  image: `/assets/wall/${slug}.jpg`,
});

export const WALL_ITEMS: ComponentWallItem[] = [
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

export const WALL_AVATARS = [12, 32, 47, 5, 58].map((n) => ({ src: `https://i.pravatar.cc/80?img=${n}`, alt: "" }));
