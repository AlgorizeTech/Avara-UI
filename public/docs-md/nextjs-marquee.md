# Marquee

An infinite, seamless scrolling container ideal for logos, testimonials, and image galleries.

This `MarqueeBlock` is engineered to be **flawless**. By exactly duplicating the content and using a precise CSS calculation (`calc(-100% - gap)`), the animation loops infinitely without any stuttering, lagging, or "snap back" resets that plague older implementations.

## Examples

You only supply one set of items — the block duplicates them and offsets the copy by `calc(-100% - gap)`, so the loop never snaps.

export const usageDefault = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const logos = ["Vercel", "Stripe", "Supabase", "Linear", "Figma"];

export default function LogoSection() {
  return (
    
      {logos.map((logo) => (
        
          {logo}
        
      ))}
    
  );
}`;

export const usageRight = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const logos = ["Vercel", "Stripe", "Supabase", "Linear", "Figma"];

export default function ReverseLogoWall() {
  return (
    // Reverses the travel; everything else is identical.
    
      {logos.map((logo) => (
        
          {logo}
        
      ))}
    
  );
}`;

export const usageVertical = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const testimonials = [
  { name: "Ada", quote: "Shipped our landing page in an afternoon." },
  { name: "Grace", quote: "The loop is genuinely seamless." },
  { name: "Alan", quote: "Dropped three dependencies for this one." },
];

export default function TestimonialColumn() {
  return (
    // Vertical marquees need a bounded height on the container.
    
      {testimonials.map((t) => (
        
          {t.quote}
          {t.name}
        
      ))}
    
  );
}`;

export const usageSpeed = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const images = ["/gallery/01.jpg", "/gallery/02.jpg", "/gallery/03.jpg"];

export default function SlowGallery() {
  return (
    // "slow" | "normal" | "fast", or a raw duration in seconds.
    
      {images.map((src) => (
        
      ))}
    
  );
}`;

export const usageBare = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

const logos = ["Vercel", "Stripe", "Supabase", "Linear", "Figma"];

export default function BareMarquee() {
  return (
    // No edge mask, and the loop keeps running under the cursor.
    
      {logos.map((logo) => (
        
          {logo}
        
      ))}
    
  );
}`;

## Installation

## Props Reference

        Prop
        Type
        Default
        Description

        children
        React.ReactNode
        Required
        One set of items. The block duplicates them internally to close the loop.

        direction
        "left" | "right" | "up" | "down"
        "left"
        Travel direction. Vertical values need a bounded height on the container.

        speed
        "slow" | "normal" | "fast" | number
        "normal"
        Preset pace, or the duration of one full pass in seconds.

        pauseOnHover
        boolean
        false
        Pauses the animation while the pointer is over the marquee.

        fade
        boolean
        false
        Applies a gradient mask-image so items dissolve at both edges.

        gap
        string
        "1rem"
        CSS gap between items. The loop math accounts for it, so any value stays seamless.

---

**Component Path:** `[framework]\marquee\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
