import type { ComponentWallItem } from "@/components/custom/blocks/ComponentWallBlock";
import { MotionIcon, GsapIcon } from "@/components/custom/blocks/Icons";
import {
  TechStack,
  TechStackGroup,
  TechStackTool,
  type TechStackProps,
} from "@/components/custom/blocks/TechStackBlock";

// Screenshots of this library's own sections, captured from their previews
// into public/assets/wall. The slug is the registry item, so the hero's
// install line always names something real.
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
  "gallery": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/orbit-gallery-1790516064499.jpg",
  "platform-grid": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516057/platform-grid-1790516064500.jpg",
  "pricing": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/pricing-1790516064500.jpg",
  "product-details": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/product-details-1790516064500.jpg",
  "profile-page": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516058/profile-page-1790516064501.jpg",
  "reviews": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/reviews-1790516064502.jpg",
  "support-hero": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/support-hero-1790516064502.jpg",
  "waitlist": "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516059/waitlist-1790516064503.jpg",
};

// The wall draws each screenshot at roughly 330px wide, but the originals are
// 850-1200px. Ask Cloudinary for 720px (2x for retina) instead of the full size.
const WALL_IMAGE_WIDTH = 720;
const sized = (url: string) =>
  url.replace("/f_webp,q_auto/", `/f_webp,q_auto,w_${WALL_IMAGE_WIDTH},c_limit/`);

const wall = (slug: string, title: string): ComponentWallItem => ({
  slug,
  title,
  image: sized(WALL_IMAGES[slug]),
});

export const WALL_ITEMS: ComponentWallItem[] = [
  wall("collage-hero", "Collage hero"),
  wall("support-hero", "Support hero"),
  wall("pricing", "Product showcase"),
  wall("book-appointment", "Book appointment"),
  wall("calendar", "Calendar"),
  wall("fashion-hero", "Fashion hero"),
  wall("hero-carousel", "Hero carousel"),
  wall("honeycomb-hero", "Honeycomb hero"),
  wall("gallery", "Gallery"),
  wall("newsletter", "Newsletter"),
  wall("waitlist", "Waitlist"),
  wall("footer", "Footer"),
  wall("bento-showcase", "Bento showcase"),
  wall("profile-page", "Profile page"),
  wall("data-flow", "Data flow"),
  wall("navbar", "Navbar"),
  wall("login-form", "Login form"),
  wall("chart", "Chart"),
  wall("product-details", "Product details"),
  wall("reviews", "Reviews"),
  wall("platform-grid", "Platform grid"),
  wall("invoice", "Invoice"),
  wall("data-grid", "Data grid"),
];

// Same faces as the Avatar Stack's first example (Avatar Group, shift on hover).
export const WALL_AVATARS = [
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1036623-1790145143487.jpg", alt: "Ana Watson" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145142/pexels-photo-2043590-1790145143488.jpg", alt: "Tom Hardy" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-1587009-1790145143488.jpg", alt: "Mara Jade" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145139/pexels-photo-3775534-1790145143488.jpg", alt: "Leo Silva" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790082180/pexels-photo-1520760-1790082180553.jpg", alt: "June Carter" },
  { src: "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_120,h_120,c_fill/v1790145141/pexels-photo-6311475-1790145143489.jpg", alt: "Sam Wilson" },
];

// What the library is built with — front-end only. Ten marks make three
// batches of seven, each leaving three out and in a different order, so every
// swap reads as a change; the two animation libraries arrive together. The
// marks are the images in public/assets/tech-icons, plus GSAP and Motion from
// Icons (Motion's mark takes the text colour, so it follows the theme); the black Next.js disc and the shadcn slashes invert in dark. shadcn
// is credited because the registry format and the CLI every install runs
// through are theirs.
interface Tool {
  name: string;
  icon: React.ReactNode;
}

const tool = (name: string, file: string, className?: string): Tool => ({
  name,
  icon: <img src={`/assets/tech-icons/${file}`} alt="" className={className} />,
});

const react = tool("React", "react.png");
const next = tool("Next.js", "nextjs.png", "dark:invert");
const ts = tool("TypeScript", "TypeScript.png");
const js = tool("JavaScript", "JavaScript.png");
const tailwind = tool("Tailwind CSS", "tailwind.png");
const css = tool("CSS", "css.png");
const html = tool("HTML", "HTML.png");
const shadcn = tool("shadcn/ui", "shadcn.svg", "dark:invert");
const gsap: Tool = { name: "GSAP", icon: <GsapIcon /> };
const motion: Tool = { name: "Motion", icon: <MotionIcon /> };

const WALL_STACK: Tool[][] = [
  [react, next, shadcn, ts, tailwind, css, html],
  [shadcn, tailwind, motion, gsap, react, ts, css],
  [js, ts, react, next, gsap, motion, html],
];

/** The "Built with" strip for the hero's `stack` slot. */
export function WallStack(props: Omit<TechStackProps, "children">) {
  return (
    <TechStack label="Built with" {...props}>
      {WALL_STACK.map((group, i) => (
        <TechStackGroup key={i}>
          {group.map((t) => (
            <TechStackTool key={t.name} name={t.name} icon={t.icon} />
          ))}
        </TechStackGroup>
      ))}
    </TechStack>
  );
}
