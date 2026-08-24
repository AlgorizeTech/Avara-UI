# Marquee

An infinite, seamless scrolling container ideal for logos, testimonials, and image galleries.

This `MarqueeBlock` is engineered to be **flawless**. By exactly duplicating the content and using a precise CSS calculation (`calc(-100% - gap)`), the animation loops infinitely without any stuttering, lagging, or "snap back" resets that plague older implementations.

You only supply one set of items — the block duplicates them and offsets the copy by `calc(-100% - gap)`, so the loop never snaps.

export const marqueeLogos = `import {
  Box,
  Boxes,
  Code2,
  Command,
  Hexagon,
  Layers,
  Network,
  Palette,
  Sparkles,
  Triangle,
} from "lucide-react";

const logos = [
  { icon: Command, name: "Command" },
  { icon: Palette, name: "Palette" },
  { icon: Sparkles, name: "Motion" },
  { icon: Boxes, name: "Packages" },
  { icon: Network, name: "Network" },
  { icon: Hexagon, name: "Hexagon" },
  { icon: Layers, name: "Layers" },
  { icon: Triangle, name: "Triangle" },
  { icon: Code2, name: "Code" },
  { icon: Box, name: "Blocks" },
];`;

export const marqueeTestimonials = `const testimonials = [
  {
    name: "Sarah Connor",
    role: "Product Manager",
    text: "This component library has completely transformed our workflow. Everything just works perfectly out of the box.",
  },
  {
    name: "John Wick",
    role: "Lead Developer",
    text: "The cleanest, most well-documented React code I have ever seen. Absolutely essential for modern web dev.",
  },
  {
    name: "Ellen Ripley",
    role: "UX Designer",
    text: "Beautiful default styles and incredibly smooth animations. It makes prototyping high-fidelity interfaces a breeze.",
  },
  {
    name: "Neo",
    role: "Software Engineer",
    text: "Finally, a library that gives me full control over the code without abstracting away all the important details.",
  },
];`;

export const marqueeImages = `const images = [
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800&auto=format&fit=crop",
];`;

export const usageDefault = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

${marqueeLogos}

export default function LogoSection() {
  return (
    
      {logos.map((logo) => (

          {logo.name}
        
      ))}
    
  );
}`;

export const usageRight = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

${marqueeLogos}

export default function ReverseLogoWall() {
  // Reverses the travel; everything else is identical.
  return (
    
      {logos.map((logo) => (

          {logo.name}
        
      ))}
    
  );
}`;

export const usageVertical = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

${marqueeTestimonials}

export default function TestimonialColumn() {
  // Vertical travel needs a bounded height on the block itself.
  return (
    
      {testimonials.map((t) => (

            &quot;{t.text}&quot;

              {t.name.charAt(0)}

                {t.name}
              
              {t.role}

      ))}
    
  );
}`;

export const usageSpeed = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

${marqueeImages}

export default function SlowGallery() {
  // speed takes "slow" | "normal" | "fast".
  return (
    
      {images.map((src) => (

      ))}
    
  );
}`;

export const usageBare = `import { MarqueeBlock } from "@/components/custom/blocks/MarqueeBlock";

${marqueeLogos}

export default function BareLogoWall() {
  // No fade mask and no hover pause — the plainest marquee there is.
  return (
    
      {logos.map((logo) => (

          {logo.name}
        
      ))}
    
  );
}`;

## Installation

## Examples

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
