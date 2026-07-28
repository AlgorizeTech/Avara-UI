# Premium Animated List

A hyper-polished list component that staggers its children into view using GSAP 3D perspective transforms, complete with a mouse-tracking glassmorphic spotlight hover effect.

Standard list animations often feel rigid. By wrapping your notification or activity feeds in the `AnimatedList` container, the engine forces a `perspective` boundary and applies a high-end 3D flip-in sequence (`back.out` easing) to every direct child. Furthermore, the `AnimatedListItem` wrapper brings the component to life _after_ entry by tracking the user's cursor to render a subtle spotlight gradient glow.

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

Hit the replay button below to watch the 3D flip-in sequence. Hover over the rendered cards to see the spotlight gradient and the icon bounce micro-interactions.

## Installation

### Dependencies

This component requires **GSAP** to handle the staggered 3D physics and the rapid coordinate updates for the hover spotlight.

```bash
npm install gsap
```

### Copy the Component

You can copy the full engine code directly from the Component tab in the Interactive Showcase above. Place it in components/custom/blocks/AnimatedListBlock.tsx.

## Usage

Structure your feed using the AnimatedList as the parent wrapper. You can adjust the staggerDelay prop to speed up or slow down the cascade effect. Use the provided AnimatedListItem for your individual rows to instantly inherit the mouse-tracking spotlight and deep shadow styling.

## Implementation

```tsx

export default function NotificationFeed() {
  return (
    // The wrapper forces a 3D perspective to enable the flip-in physics

            $

            Payment Received
            $129.00 via Stripe

            @

            New User Signup
            alice@example.com

  );
}
```

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

**Component Path:** `nextjs\animated-list\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
