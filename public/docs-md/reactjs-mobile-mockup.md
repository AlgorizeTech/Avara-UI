---
title: "Shadcn Mobile Mockups"
description: "Shadcn Mobile Mockups. A stunning, fully responsive collection of mobile device mockups engineered for Next.js, allowing you to present your app designs."
url: https://avaraui.com/docs/nextjs/mobile-mockup
---

# Shadcn Mobile Mockups

A stunning, fully responsive collection of mobile device mockups engineered for Next.js, allowing you to present your app designs, images, or autoplaying videos in gorgeous, high-fidelity hardware frames.

The suite ships with eight iconic models, led by the sleek iPhone 16 Pro and iPhone 17 Pro Max. Behind them sit the iPhone 14 Pro Max, the flat-edged iPhone 12 Pro Max, the retro iPhone 5, the sleek Samsung S24 Ultra, the uniquely rounded Google Pixel 8, and the futuristic Google Pixel 10 — so you can evoke nostalgia with a classic home button or show off the newest glass, from the same API.

Each device is its own exported component that wraps whatever you put inside it — a screenshot, an autoplaying video, or a live React tree. Every frame is pure CSS/SVG, so it stays crisp at any zoom. The screens below run this site's own hero section as live children rather than a screenshot: the headline word flips, and the install command copies.

## iPhone 16 Pro

The modern flagship frame — sleek uniform bezel, flush seamless perimeter, and centered Dynamic Island. Running this site's hero section as live children.

- Pass `children` to embed a real, interactive screen; `src` and `videoSrc` swap in a screenshot or a looping video instead.

```tsx
import { Iphone16ProMockup } from "@/components/custom/blocks/MobileMockupBlock";

/**
 * Your marketing hero, sized for a phone screen.
 *
 * Give an embedded screen a fixed type scale rather than Tailwind's responsive
 * prefixes: those key off the viewport, so a `sm:` class still fires inside a
 * 300px-wide frame on a desktop and blows the layout out.
 */
function HeroScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4 text-center bg-background">
      <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-[9px] font-semibold text-primary">
        Next-Gen React Components
      </span>
      <h1 className="text-[19px] font-bold tracking-tight leading-tight text-foreground">
        Build <span className="text-primary">Interactive</span> Interfaces
      </h1>
      <p className="text-[10px] leading-snug text-muted-foreground">
        A meticulous library of React components and interactive blocks.
      </p>
      <button className="w-full max-w-[230px] h-9 rounded-xl bg-primary text-primary-foreground text-[10px] font-semibold">
        Browse Components
      </button>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <Iphone16ProMockup>
      <HeroScreen />
    </Iphone16ProMockup>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/mobile-mockup.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/mobile-mockup
```

## Examples

### iPhone 17 Pro Max

The flagship frame — near-uniform bezel, a compact Dynamic Island and the flush Camera Control. Running this site's hero section as live children.

- Pass `children` to embed a real, interactive screen; `src` and `videoSrc` swap in a screenshot or a looping video instead.

```tsx
import { Iphone17ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

/**
 * Your marketing hero, sized for a phone screen.
 *
 * Give an embedded screen a fixed type scale rather than Tailwind's responsive
 * prefixes: those key off the viewport, so a `sm:` class still fires inside a
 * 300px-wide frame on a desktop and blows the layout out.
 */
function HeroScreen() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2.5 px-4 text-center bg-background">
      <span className="px-2.5 py-1 rounded-full bg-primary/10 border border-primary/30 text-[9px] font-semibold text-primary">
        Next-Gen React Components
      </span>
      <h1 className="text-[19px] font-bold tracking-tight leading-tight text-foreground">
        Build <span className="text-primary">Interactive</span> Interfaces
      </h1>
      <p className="text-[10px] leading-snug text-muted-foreground">
        A meticulous library of React components and interactive blocks.
      </p>
      <button className="w-full max-w-[230px] h-9 rounded-xl bg-primary text-primary-foreground text-[10px] font-semibold">
        Browse Components
      </button>
    </div>
  );
}

export default function AppShowcase() {
  return (
    <Iphone17ProMaxMockup>
      <HeroScreen />
    </Iphone17ProMaxMockup>
  );
}
```

### iPhone 14 Pro Max

A wider Dynamic Island and a chunkier bezel than the 17.

- `videoSrc` suits this frame well — the bezel is slim enough not to distract from motion.

```tsx
import { Iphone14ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

// Autoplaying video works just as well as a live React tree.
export default function Iphone14Showcase() {
  return (
    <Iphone14ProMaxMockup>
      <video autoPlay muted loop playsInline className="w-full h-full object-cover">
        <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
      </video>
    </Iphone14ProMaxMockup>
  );
}
```

### iPhone 12 Pro Max

Flat edges and a notch, at a 19.5:9 aspect ratio.

- `src` should match that ratio or the screenshot will letterbox inside the frame.

```tsx
import { Iphone12ProMaxMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function Iphone12Showcase() {
  return (
    <Iphone12ProMaxMockup>
      <img src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516348/dashboard_light-1790516355268.png" alt="" className="w-full h-full object-cover" />
    </Iphone12ProMaxMockup>
  );
}
```

### iPhone 5

The retro frame — thick bezels, a home button and a 16:9 screen.

- `src` fills the screen with an image; `videoSrc` auto-plays a muted, looping video instead.

```tsx
import { Iphone5Mockup } from "@/components/custom/blocks/MobileMockupBlock";

// The shortest screen in the set — keep embedded hero copy to a couple of lines.
export default function Iphone5Showcase() {
  return (
    <Iphone5Mockup>
      <img
        src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516348/dashboard_light-1790516355268.png"
        alt="Light Dashboard"
        className="dark:hidden w-full h-full object-cover"
      />
      <img
        src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516348/dashboard_dark-1790516355267.png"
        alt="Dark Dashboard"
        className="hidden dark:block w-full h-full object-cover"
      />
    </Iphone5Mockup>
  );
}
```

### Samsung S24 Ultra

Squared-off corners and a centred punch-hole camera.

- `className` sizes the outer wrapper, which is how you scale the whole mockup.

```tsx
import { SamsungS24UltraMockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function SamsungShowcase() {
  return (
    <SamsungS24UltraMockup>
      <img src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516348/dashboard_light-1790516355268.png" alt="" className="w-full h-full object-cover" />
    </SamsungS24UltraMockup>
  );
}
```

### Google Pixel 8

Heavily rounded corners and a 20:9 screen.

- `src` is cropped by those corner radii, so keep anything important away from the edges.

```tsx
import { GooglePixel8Mockup } from "@/components/custom/blocks/MobileMockupBlock";

export default function Pixel8Showcase() {
  return (
    <GooglePixel8Mockup>
      <img src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto/v1790516348/dashboard_light-1790516355268.png" alt="" className="w-full h-full object-cover" />
    </GooglePixel8Mockup>
  );
}
```

### Google Pixel 10

- Pass `children` instead of `src` to embed a live, scrollable app rather than a screenshot.

```tsx
import { GooglePixel10Mockup } from "@/components/custom/blocks/MobileMockupBlock";

// Any React tree works inside the frame — swap this for your own screen.
function YourApp() {
  return (
    <div className="min-h-full bg-background p-5 space-y-3">
      <h1 className="text-lg font-semibold text-foreground">Today</h1>
      {["Stand-up at 9:30", "Design review", "Ship the release"].map((task) => (
        <div
          key={task}
          className="rounded-xl border border-border p-3 text-sm text-muted-foreground"
        >
          {task}
        </div>
      ))}
    </div>
  );
}

// Interactive children scroll if you give the wrapper overflow-y-auto.
export default function Pixel10Showcase() {
  return (
    <GooglePixel10Mockup>
      <div className="w-full h-full overflow-y-auto">
        <YourApp />
      </div>
    </GooglePixel10Mockup>
  );
}
```

## Features
Learn about the Mobile Mockup component's realistic device framing, perfect for presenting app screenshots with proper bezels.

### 8 Unique Devices

Choose from a variety of iconic models, from the modern iPhone 16 Pro and iPhone 17 Pro Max through classic iPhones to Samsung Ultra and Google Pixel.

### Pure CSS/SVG

No heavy raster images used for the frames. Everything is built with perfectly scaled SVG and CSS for blazing fast performance.

### Media & React Ready

Easily pass static images, autoplaying looping videos, or full interactive React trees directly into the screen container.

### Theme Adapting

The hardware frames natively adapt their bezels, finishes, and shadows based on your app's current light or dark mode.

## Best Practices & Guidelines

### Content Aspect Ratios

When passing screenshots as images, try to ensure they roughly match a vertical aspect ratio close to the frame you picked (16:9 on the iPhone 5, 19.5:9 on the iPhone 12/14/17 and Samsung, 20:9 on the Pixels) to prevent unnatural stretching or cropping inside the frame.

### Sizing Live Screens

Tailwind's responsive prefixes key off the viewport, not the frame. A section that uses `sm:` or `lg:` classes still renders at desktop sizes inside a 300px-wide mockup, so give an embedded screen a fixed type scale instead of reusing your page-level layout component.

### Handling Overflow

If you are passing interactive React components inside the mockup instead of an image, ensure you add `overflow-y-auto` to your child wrapper if you want the screen content to be scrollable.

## Props Reference

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Custom content to render inside the phone screen (useful for complex UIs). |
| `src` | `string` | Image URL to display in the screen (fills the whole screen). |
| `videoSrc` | `string` | Video URL to auto-play inside the screen (muted and looping). |
| `className` | `string` | Additional CSS classes to apply to the mockup's outer wrapper. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/mobile-mockup
