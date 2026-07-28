# Animated Timeline

A highly dynamic, scroll-aware timeline engine featuring Intersection Observers and multiple 3D/2D entry animations.

Unlike standard static timelines, this `AnimatedTimelineBlock` uses native browser APIs (`IntersectionObserver`) to orchestrate complex animations only when the user scrolls the elements into view. As the user scrolls down your page, the vertical tracking line dynamically extends, the nodes glow, and the cards flip, blur, or slide into position.

## Features
Discover the key capabilities that make this component an excellent choice for modern, animated user interfaces.

    Fluid Animations
    Hardware-accelerated transitions that ensure smooth 60fps performance across devices.

    Highly Customizable
    Exposes intuitive props for tailoring colors, sizes, and animation speeds to fit your brand.

    Responsive Design
    Automatically adapts to mobile, tablet, and desktop viewports without horizontal scrolling issues.

    Accessible
    Built with semantic HTML and ARIA labels where necessary to support screen readers and keyboard navigation.

## Interactive Showcase

Use the control panel below to test the different entry animations. **Scroll down inside the preview box** to see the intersection observers trigger the high-end entrance animations dynamically!

## Installation

### Copy the Component

This component is completely dependency-free. It uses standard React hooks alongside the native JavaScript `IntersectionObserver` API, meaning it has zero impact on your bundle size compared to heavy animation libraries like Framer Motion or GSAP.

You can copy the full engine code directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/AnimatedTimelineBlock.tsx`.

---

## Usage

Define your `items` array to populate the timeline. You can dynamically switch the `animation` and `layout` props to drastically change the visual feel of the page.

## Implementation

```tsx

const EVENTS = [
  { id: "1", title: "Project Start", date: "Q1", icon: Zap },
  {
    id: "2",
    title: "Beta Launch",
    date: "Q2",
    description: "Shipped to 100 users.",
  },
  { id: "3", title: "Global Scaling", date: "Q3", icon: Rocket },
];

export default function CompanyHistory() {
  return (

  );
}
```

---

**Component Path:** `nextjs\animated-timeline\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
