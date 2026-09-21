import type { ComponentWallItem, StackTool } from "@/components/custom/blocks/ComponentWallBlock";

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

// What the library is built with — front-end only. Eight marks make three
// batches of seven, each leaving a different one out and in a different
// order, so every swap reads as a change. The marks are the images in
// public/assets/tech-icons; the black Next.js disc inverts in dark.
const tool = (name: string, file: string, className?: string): StackTool => ({
  name,
  icon: <img src={`/assets/tech-icons/${file}`} alt="" className={className} />,
});

const react = tool("React", "react.png");
const next = tool("Next.js", "nextjs.png", "dark:invert");
const ts = tool("TypeScript", "TypeScript.png");
const js = tool("JavaScript", "JavaScript.png");
const redux = tool("Redux", "redux.png");
const tailwind = tool("Tailwind CSS", "tailwind.png");
const css = tool("CSS", "css.png");
const html = tool("HTML", "HTML.png");

export const WALL_STACK: StackTool[][] = [
  [react, next, ts, js, tailwind, css, html],
  [tailwind, css, html, react, redux, ts, next],
  [js, ts, react, redux, next, tailwind, html],
];
