# Mobile Mockups

A stunning, fully responsive collection of mobile device mockups engineered for Next.js, allowing you to present your app designs, images, or autoplaying videos in gorgeous, high-fidelity hardware frames.

The suite ships with seven iconic models, led by the iPhone 17 Pro Max — a near-uniform bezel, a compact Dynamic Island and the flush Camera Control on the right rail. Behind it sit the iPhone 14 Pro Max, the flat-edged iPhone 12 Pro Max, the retro iPhone 5, the sleek Samsung S24 Ultra, the uniquely rounded Google Pixel 8, and the futuristic Google Pixel 10 — so you can evoke nostalgia with a classic home button or show off the newest glass, from the same API.

Each device is its own exported component that wraps whatever you put inside it — a screenshot, an autoplaying video, or a live React tree. Every frame is pure CSS/SVG, so it stays crisp at any zoom. The screens below run this site's own hero section as live children rather than a screenshot: the headline word flips, and the install command copies.

export const usageIphone17 = `import { Iphone17ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

/**
 * Your marketing hero, sized for a phone screen.
 *
 * Give an embedded screen a fixed type scale rather than Tailwind's responsive
 * prefixes: those key off the viewport, so a \`sm:\` class still fires inside a
 * 300px-wide frame on a desktop and blows the layout out.
 */
function HeroScreen() {
  return (

        Next-Gen React Components

        Build Interactive Interfaces

        A meticulous library of React components and interactive blocks.

        Browse Components

  );
}

export default function AppShowcase() {
  return (

  );
}`;

export const usageIphone14 = `import { Iphone14ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

// Autoplaying video works just as well as a live React tree.
export default function Iphone14Showcase() {
  return (

  );
}`;

export const usageIphone12 = `import { Iphone12ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function Iphone12Showcase() {
  return (

  );
}`;

export const usageIphone5 = `import { Iphone5Mockup } from "@/components/custom/blocks/MobileMockupBlock";

// The shortest screen in the set — keep embedded hero copy to a couple of lines.
export default function Iphone5Showcase() {
  return (

  );
}`;

export const usageSamsung = `import { SamsungS24UltraMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function SamsungShowcase() {
  return (

  );
}`;

export const usagePixel8 = `import { GooglePixel8Mockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function Pixel8Showcase() {
  return (

  );
}`;

export const usagePixel10 = `import { GooglePixel10Mockup } from "@/components/custom/blocks/MobileMockupBlock";

// Any React tree works inside the frame — swap this for your own screen.
function YourApp() {
  return (
    
      Today
      {["Stand-up at 9:30", "Design review", "Ship the release"].map((task) => (
        
          {task}
        
      ))}
    
  );
}

// Interactive children scroll if you give the wrapper overflow-y-auto.
export default function Pixel10Showcase() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/mobile-mockup
```

## Examples

## Features
Learn about the Mobile Mockup component's realistic device framing, perfect for presenting app screenshots with proper bezels.

    7 Unique Devices
    Choose from a variety of iconic models, from the latest iPhone 17 Pro Max through the classic iPhones to Samsung Ultra and Google Pixel.

    Pure CSS/SVG
    No heavy raster images used for the frames. Everything is built with perfectly scaled SVG and CSS for blazing fast performance.

    Media & React Ready
    Easily pass static images, autoplaying looping videos, or full interactive React trees directly into the screen container.

    Theme Adapting
    The hardware frames natively adapt their bezels, finishes, and shadows based on your app's current light or dark mode.

## Best Practices & Guidelines

    Content Aspect Ratios
    When passing screenshots as images, try to ensure they roughly match a vertical aspect ratio close to the frame you picked (16:9 on the iPhone 5, 19.5:9 on the iPhone 12/14/17 and Samsung, 20:9 on the Pixels) to prevent unnatural stretching or cropping inside the frame.

    Sizing Live Screens
    Tailwind's responsive prefixes key off the viewport, not the frame. A section that uses sm: or lg: classes still renders at desktop sizes inside a 300px-wide mockup, so give an embedded screen a fixed type scale instead of reusing your page-level layout component.

    Handling Overflow
    If you are passing interactive React components inside the mockup instead of an image, ensure you add overflow-y-auto to your child wrapper if you want the screen content to be scrollable.

## Props Reference

        Prop
        Type
        Description

        children
        ReactNode
        Custom content to render inside the phone screen (useful for complex UIs).

        src
        string
        Image URL to display in the screen (fills the whole screen).

        videoSrc
        string
        Video URL to auto-play inside the screen (muted and looping).

        className
        string
        Additional CSS classes to apply to the mockup's outer wrapper.

---

**Component Path:** `[framework]\mobile-mockup\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
