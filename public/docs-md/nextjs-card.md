# Card

A flexible container used to group related information and actions together in a visually distinct box.

Building a UI entirely out of raw `div` tags quickly leads to inconsistent padding, mismatched border radiuses, and spaghetti code. The `CardBlock` provides a set of highly composable components (`CardHeader`, `CardContent`, `CardFooter`) that automatically manage their own internal spacing, ensuring your layouts always look perfectly balanced regardless of what content you put inside them.

## Features
Learn about the Card component's flexible layout options, including headers, footers, content areas, and interactive hover effects.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Interactive Showcase

Use the controls below to experiment with different card layouts and visual variants. Enabling `Interactive Hover` converts the card into an actionable button-like element, adding elevation shadows and transform scaling when hovered.

## Installation

### Copy the Component

This component suite is completely dependency-free, relying only on standard Tailwind utility classes.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/CardBlock.tsx`.

---

## Usage

The Card component uses a composable architecture. You wrap your content in the main `` container, and then use the sub-components to structure the interior layout.

You do not need to use all the sub-components. For example, metric/statistic cards often omit the `` entirely.

```tsx

export default function CheckoutForm() {
  return (

        Payment Details
        
          Enter your credit card information below.

          Submit Payment

  );
}
```

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          Card

          variant

          "default" | "bordered" | "flat"

          "bordered"

          Determines the visual styling of the container. bordered{" "}
          adds a subtle stroke, while flat removes shadows and
          applies a light background fill.

          Card

          interactive

          boolean

          false

          If true, applies hover states (shadow elevation, border color change,
          and slight scaling) to indicate the card is clickable.

          All Components

          className

          string

          undefined

          Standard Tailwind CSS overrides. Useful for adjusting the flex layout
          inside a specific CardContent or CardHeader{" "}
          block.

---

**Component Path:** `nextjs\card\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
