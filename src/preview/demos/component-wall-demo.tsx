"use client";

import { ComponentWall, type ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { GitHubIcon } from "@/components/custom/blocks/Icons";

// Screenshots of this library's own sections, captured from their previews.
// The name is the registry item, so the install line names something real.
const wall = (slug: string, title: string): ComponentWallItem => ({
  slug,
  title,
  image: `/assets/wall/${slug}.jpg`,
});

const ITEMS: ComponentWallItem[] = [
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

const AVATARS = [12, 32, 47, 5, 58].map((n) => ({ src: `https://i.pravatar.cc/80?img=${n}`, alt: "" }));

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
        badge={{ label: "Next-gen React components", href: "#" }}
        heading="Build interactive {word}."
        headingWords={["interfaces", "components", "experiences", "animations", "dashboards"]}
        accent="interactive"
        description="A meticulous library of React components and interactive blocks, engineered for seamless performance with Tailwind CSS, TypeScript, GSAP and Framer Motion."
        install={{ command: "npx shadcn@latest add @algorize-ui/{item}" }}
        primaryAction={{ label: "Browse components", href: "#" }}
        secondaryAction={{ label: "Star on GitHub", href: "#", icon: <GitHubIcon size={16} /> }}
        trust={{ text: "Trusted by 120,000+ founders, developers and creators", avatars: AVATARS, rating: 5 }}
        items={ITEMS}
        interval={interval}
        order={order}
      />
    </div>
  );
}
