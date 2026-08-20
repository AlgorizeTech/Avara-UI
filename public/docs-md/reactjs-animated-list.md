# Premium Animated List

A hyper-polished list component that staggers its children into view using GSAP 3D perspective transforms, complete with a mouse-tracking glassmorphic spotlight hover effect.

Standard list animations often feel rigid. By wrapping your notification or activity feeds in the `AnimatedList` container, the engine forces a `perspective` boundary and applies a high-end 3D flip-in sequence (`back.out` easing) to every direct child. Furthermore, the `AnimatedListItem` wrapper brings the component to life _after_ entry by tracking the user's cursor to render a subtle spotlight gradient glow.

## Examples

Each list plays its entrance once it scrolls into view — use a preview's reload button to replay it. Hover a card afterwards for the cursor-tracking spotlight.

export const usageDefault = `import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

export default function NotificationFeed() {
  return (
    // The wrapper establishes the 3D perspective the children animate inside.

            $

            Payment Received
            $129.00 via Stripe

            @

            New User Signup
            alice@example.com

  );
}`;

export const usageFlip = `import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

export default function FlipFeed() {
  // The 3D flip is the signature entrance — children rotate in on the X axis.
  return (
    
      {items.map((item) => (
        {item.label}
      ))}
    
  );
}`;

export const usageSlideUp = `import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

export default function SlideUpFeed() {
  // Slide variants come in from a direction instead of rotating.
  return (
    
      {items.map((item) => (
        {item.label}
      ))}
    
  );
}`;

export const usagePop = `import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

export default function PopFeed() {
  return (
    
      {items.map((item) => (
        {item.label}
      ))}
    
  );
}`;

export const usageTiming = `import {
  AnimatedList,
  AnimatedListItem,
} from "@/components/custom/blocks/AnimatedListBlock";

export default function TunedFeed() {
  // \`staggerDelay\` is the gap between children, \`duration\` how long each one
  // takes, \`animationDelay\` how long the whole sequence waits before starting,
  // and \`ease\` is any GSAP easing string.
  return (
    
      {items.map((item) => (
        {item.label}
      ))}
    
  );
}`;

## Installation

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

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          AnimatedList

          staggerDelay

          number

          0.12

          The amount of time (in seconds) to wait before animating the next
          consecutive child element in the list.

          AnimatedList

          animationDelay

          number

          0

          The total delay (in seconds) before the entire staggered 3D flip-in
          sequence begins.

          AnimatedList

          duration

          number

          0.8

          The total duration (in seconds) of the GSAP entry animation for a
          single list item.

          AnimatedList

          ease

          string

          "back.out(1.5)"

          The specific GSAP easing function to apply to the entrance animation.
          Determines the spring physics of the 3D rotation and scale.

          AnimatedListItem

          ...props

          HTMLAttributes&lt;HTMLDivElement&gt;

          undefined

          Accepts all native HTML div attributes. This component automatically
          handles its own onMouseMove and onMouseLeave{" "}
          events to drive the glassmorphic spotlight gradient under the hood.

---

**Component Path:** `[framework]\animated-list\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
