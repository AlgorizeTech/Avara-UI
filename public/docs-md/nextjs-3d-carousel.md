# 3D Carousel

A premium 3D carousel with a fanned layout, smooth interactive animations, and a sleek adaptive aesthetic. It features physics-based touch and mouse drag gestures, keyboard arrow navigation, circular endless fanning, and an auto-play timer that intelligently pauses on hover.

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

Interact with the active center card by dragging it left or right, or use the navigation controls below the carousel.

## Installation

### Dependencies

This component requires **Framer Motion** for the 3D spring physics and drag gestures, and **Lucide React** for the UI icons.

```bash
npm install framer-motion lucide-react
```

### Copy the Component

Copy the core engine code directly from the Component tab in the Interactive Showcase above and place it in components/custom/blocks/ThreeDCarouselBlock.tsx.

## Implementation

```tsx

export default function ShowcaseSection() {
  const items = [
    {
      id: "1",
      category: "Architecture",
      title: "Futuristic Sanctuary",
      description:
        "Next-generation living spaces integrated with natural flora.",
      image:
        "[https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop)",
    },
    {
      id: "2",
      category: "Automotive",
      title: "Cybernetic Grand Tourer",
      description: "Pure electric performance meeting aerodynamic excellence.",
      image:
        "[https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop](https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop)",
    },
  ];

  return (
    
      {/* Auto-play is enabled by default with a 4000ms interval */}

  );
}
```

## Best Practices & Guidelines

    Animation Performance
    Avoid placing too many heavy animated components on a single screen to prevent layout thrashing and maintain 60fps performance. Use intersection observers to pause off-screen animations.

    State Management
    When triggering animations via state changes, ensure you wrap state updates in startTransition or use lightweight stores to prevent React rendering bottlenecks during the animation tick.

## Props Reference

        Component / Interface
        Prop
        Type
        Default
        Description

          ThreeDCarousel

          items

          CarouselItem[]

          Required

          An array of data objects defining each slide's category, title,
          description, and image URL.

          ThreeDCarousel

          autoPlay

          boolean

          true

          Enables or disables automatic slide advancement. Automatically pauses
          when a user hovers over the carousel.

          ThreeDCarousel

          autoPlayInterval

          number

          4000

          The time duration in milliseconds between automatic slide transitions.

          ThreeDCarousel

          className

          string

          undefined

          Custom Tailwind CSS classes to apply to the outermost responsive flex
          container.

          CarouselItem

          id

          string

          Required

          A unique identifier string required for safe React list rendering and
          Framer Motion layout animation.

          CarouselItem

          title

          string

          Required

          Primary headline text displayed prominently on the card overlay.

          CarouselItem

          category

          string

          Required

          A short descriptive pill/badge label rendered above the title (e.g.,
          "Architecture", "Design").

          CarouselItem

          image

          string

          Required
        
        The URL to the high-resolution background image for the card.

          CarouselItem

          description

          string

          undefined

          Optional supporting paragraph text displayed below the headline.
          Automatically clamped to 2 lines.

---

**Component Path:** `nextjs\3d-carousel\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
