---
title: "Shadcn Mobile Mockups"
description: "Eight phone mockups that show your images or autoplaying video in hardware frames, with one shared API. Free shadcn/ui component for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/mobile-mockup
---

# Shadcn Mobile Mockups

Eight phone mockups that show your images or autoplaying video in hardware frames, with one shared API.

Each device is its own exported component that wraps whatever you put inside it — a screenshot, a video or a live React tree. Every frame is plain CSS with no bezel images, so it stays crisp at any zoom. The screens below run this site's own hero section as live children.

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

## iPhone 17 Pro Max

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

## iPhone 14 Pro Max

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

## iPhone 12 Pro Max

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

## iPhone 5

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

## Samsung S24 Ultra

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

## Google Pixel 8

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

## Google Pixel 10

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

## About Shadcn Mobile Mockups

**What it is.** **Shadcn Mobile Mockups** is a suite of eight CSS-only smartphone frames (`Iphone16ProMockup`, `Iphone17ProMaxMockup`, `Iphone14ProMaxMockup`, `Iphone12ProMaxMockup`, `Iphone5Mockup`, `SamsungS24UltraMockup`, `GooglePixel8Mockup` and `GooglePixel10Mockup`) that render images, looping videos, or live React children.

**How it is built.** Each frame is a `forwardRef` component built from styled `div` elements at a fixed pixel size, so there are no bezel images and no npm dependency. Frame borders and rings come from theme tokens such as `border-border` and `ring-muted`, and the screen background is `bg-background`. Screens fill with `object-cover`.

**When to use it.** Use it for mobile app landing pages, interactive UI demos, app store feature sections, and responsive preview cards.

## For AI agents

**When to use**

- Mobile app landing pages, interactive UI demos
- App store feature sections, responsive preview cards

**When not to use**

- A standalone video: use [Video Player](https://avaraui.com/docs/reactjs/video-player)
- A working chat interface: use [Chat](https://avaraui.com/docs/reactjs/chat)

**Agent notes**

- All eight are named exports from `@/components/custom/blocks/MobileMockupBlock` and share one `MockupProps` type: `children`, `src`, `videoSrc`, `className`, plus any `div` attribute.
- Pass `src` for a static screenshot, `videoSrc` for a muted looping video, or `children` for a live interactive React tree. If more than one is set, `videoSrc` wins, then `src`, and `children` is ignored.
- Images and videos use `object-cover`, so a screenshot with a different aspect ratio is cropped to fill the screen, not letterboxed.
- Give embedded React `children` fixed type sizes and `overflow-y-auto` if scrollable, since Tailwind viewport breakpoints key off the browser window rather than the frame.
- `src` renders with a fixed `alt` of "Mockup". For a described screenshot, pass your own `<img alt="...">` as `children`.

## Props Reference

| Prop | Type | Description |
| --- | --- | --- |
| `children` | `ReactNode` | Custom content for the phone screen (useful for complex UIs). Only rendered when neither `videoSrc` nor `src` is set. |
| `src` | `string` | Image URL that fills the screen with `object-cover`. Rendered with `alt="Mockup"`. Ignored when `videoSrc` is set. |
| `videoSrc` | `string` | Video URL that auto-plays inside the screen, muted, looping and inline, with no controls. Takes priority over `src` and `children`. |
| `className` | `string` | Additional CSS classes for the outer wrapper, which has a fixed pixel width and height. Other `div` attributes are passed to it too. |

## Works with other components

- [Video Player](https://avaraui.com/docs/reactjs/video-player) pairs with a mockup for app demo reels.
- [Chat](https://avaraui.com/docs/reactjs/chat) fills a frame for mobile messenger previews.
- [Booking Card](https://avaraui.com/docs/reactjs/booking-card) suits mobile checkout flows inside a frame.

## Can I render interactive React components inside the device screen?

Yes. Pass JSX as `children` instead of `src` or `videoSrc`, and add `overflow-y-auto` on your inner container if the embedded screen should scroll. `children` only renders when neither `src` nor `videoSrc` is set, because those two take priority over it.

## Why do `sm:` or `lg:` classes inside `children` look oversized?

Tailwind responsive breakpoints read the browser viewport rather than the phone frame, which is only about 280 to 340px wide. A `sm:` class therefore still fires on a desktop and can blow the layout out. Use fixed font and spacing classes inside embedded screens.

## What happens if I pass src, videoSrc and children together?

Only one is shown. The frame renders `videoSrc` first, then `src`, and uses `children` only when neither is set. The rest are ignored without a warning, so a leftover `src` can hide your live React screen. Pass one of the three per mockup.

## How do I change the size of a mobile mockup?

Each frame has a fixed pixel size, from 280 by 580 for `Iphone5Mockup` to 340 by 712 for `Iphone17ProMaxMockup`. A `className` such as `w-[260px]` reaches the outer wrapper, but the bezel, buttons and camera cut-outs are also pixel-sized. To shrink the whole device, add a transform class such as `scale-75`.

## How do I add alt text to a screenshot in a mobile mockup?

The `src` prop always renders `alt="Mockup"`, and there is no `alt` prop. When the screenshot carries meaning, skip `src` and pass your own image as a child: `<Iphone16ProMockup><img src="..." alt="Dashboard overview" className="w-full h-full object-cover" /></Iphone16ProMockup>`.

## Does the mobile mockup work outside Next.js?

Yes. The file has no `next/*` imports and no npm dependency beyond the `cn` helper from `@/lib/utils`. Each frame is a `forwardRef` `div`, so it works in Vite or any React app. Frame borders and rings use theme tokens such as `border-border` and `ring-muted`, so they follow your theme without extra props.

---

Live previews and every example: https://avaraui.com/docs/nextjs/mobile-mockup
