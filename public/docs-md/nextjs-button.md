# Button

A highly customizable, interactive button primitive. Features a built-in radial ripple animation on click, native loading states, custom SVGs for social media integration, and support for leading/trailing icons.

## Examples

Explore the different variations of the Button component — each example shows a live preview with the exact code to copy.

export const usageDefault = `import Button from "@/components/custom/blocks/Button";

export default function ButtonDemo() {
  return Button;
}`;

export const usageVariants = `import Button from "@/components/custom/blocks/Button";

export default function ButtonVariants() {
  return (
    
      Default
      Destructive
      Outline
      Secondary
      Ghost
      Link
    
  );
}`;

export const usageSizes = `import Button from "@/components/custom/blocks/Button";

export default function ButtonSizes() {
  return (
    
      Small
      Default
      Large
    
  );
}`;

export const usageLoading = `import Button from "@/components/custom/blocks/Button";

export default function ButtonLoading() {
  return Please wait;
}`;

export const usageWithIcon = `import Button from "@/components/custom/blocks/Button";

export default function ButtonWithIcon() {
  return (
    
      }>Email
      }>
        Continue

  );
}`;

export const usageIconOnly = `import Button from "@/components/custom/blocks/Button";

export default function ButtonIconOnly() {
  return } />;
}`;

export const usageSocial = `import Button from "@/components/custom/blocks/Button";

export default function SocialLoginButtons() {
  return (
    
      }>
        Continue with Google
      
      }>
        Continue with GitHub

  );
}`;

## Installation

### Optional — the icon set

The showcase uses a set of brand and UI icons that ship as their own registry item. The button does not need them.

```bash
npx shadcn@latest add icons.json
```

## Features
Discover the versatility of Modern Buttons with support for various variants, sizes, loading states, and icons.

    Customizable
    Easily adapt the component's styling and behavior to fit your application's unique design system.

    Accessible
    Built with accessibility in mind, ensuring all users can interact with your application effectively.

    Responsive
    Fully responsive design that looks and works great across desktop, tablet, and mobile devices.

    Performant
    Optimized for maximum performance with minimal re-renders and efficient state management.

## Best Practices & Guidelines

    Usage Guidelines
    Follow standard design principles when implementing this component. Ensure proper contrast, spacing, and context within your layout.

## Props Reference

        Prop
        Type
        Default
        Description

          variant

            "default" | "destructive" | "outline" | "secondary" | "ghost" |
            "link"

          "default"
        
        The visual style to apply to the button.

          size

          "default" | "sm" | "lg"

          "default"
        
        Controls the padding and height of the button.

          loading

          boolean

          false

          If true, replaces the leading icon with a spinner and disables user
          interaction.

          iconLeft

          React.ReactNode

          undefined
        
        Renders an icon or element to the left of the text.

          iconRight

          React.ReactNode

          undefined
        
        Renders an icon or element to the right of the text.

---

**Component Path:** `[framework]\button\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
