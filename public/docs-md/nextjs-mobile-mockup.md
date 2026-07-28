# Mobile Mockups

A stunning, fully responsive collection of mobile device mockups engineered for Next.js, allowing you to present your app designs, images, or autoplaying videos in gorgeous, high-fidelity hardware frames.

The suite ships with six iconic models: the retro iPhone 5, the flat-edged iPhone 12 Pro Max, the ultra-modern iPhone 14 Pro Max, the sleek Samsung S24 Ultra, the uniquely rounded Google Pixel 8, and the futuristic Google Pixel 10. Whether you want to evoke nostalgia with a classic home button or highlight the future with a dynamic island and edge-to-edge glass, these mockups seamlessly wrap your React content to create the perfect showcase.

## Features
Learn about the Mobile Mockup component's realistic device framing, perfect for presenting app screenshots with proper bezels.

    6 Unique Devices
    Choose from a variety of iconic models including classic iPhones, modern Pro Max series, Samsung Ultra, and Google Pixel.

    Pure CSS/SVG
    No heavy raster images used for the frames. Everything is built with perfectly scaled SVG and CSS for blazing fast performance.

    Media & React Ready
    Easily pass static images, autoplaying looping videos, or full interactive React trees directly into the screen container.

    Theme Adapting
    The hardware frames natively adapt their bezels, finishes, and shadows based on your app's current light or dark mode.

## Interactive Showcase
Scroll through the Mobile Mockup demo to see how internal content behaves within the device frame.

## Implementation

```tsx

export default function AppShowcasePage() {
  return (

  );
}
```

## Best Practices & Guidelines

    Content Aspect Ratios
    When passing screenshots as images, try to ensure they roughly match a 16:9 vertical aspect ratio to prevent unnatural stretching or cropping inside the frame.

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

**Component Path:** `nextjs\mobile-mockup\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
