# Kbd (Keyboard)

A specialized typography component used to display keyboard buttons, shortcuts, and commands.

Displaying keyboard shortcuts to power users is a critical part of modern web design (especially in tools like Command Menus). The `KbdBlock` uses a native `` HTML element for strict semantic accuracy, and applies a precise combination of borders, background colors, and inset shadows to simulate a physical, tactile keyboard key.

## Interactive Showcase

Use the controls below to change the size of the keys. `sm` is ideal for placing inside dense dropdown menus, while `md` and `lg` work well for documentation or large onboarding modals.

## Installation

### Copy the Component

This component is **100% dependency-free** and forwards all standard HTML attributes.

You can copy the full engine code (in either TypeScript or JavaScript) directly from the **Component** tab in the Interactive Showcase above. Place it in `components/custom/blocks/KbdBlock.tsx`.

---

## Usage

You can use the component independently, or string multiple together to represent complex key combinations.

```tsx

export default function ShortcutHint() {
  return (
    
      To open the command palette, press
      
        ⌘
        K

  );
}
```

## Features
Learn about the Kbd component's typography styles for displaying keyboard shortcuts and command instructions consistently.

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

          size

          "sm" | "md" | "lg"

          "sm"
        
        Controls the height, padding, and font-size of the key element.

          className

          string

          undefined

          Standard Tailwind CSS overrides. Useful for adding specific margin or
          overriding the shadow if needed.

          ...props

          HTMLAttributes&lt;HTMLElement&gt;

          {}

          Accepts all standard HTML attributes for a native{" "}
          &lt;kbd&gt; element, including title or{" "}
          aria-label for accessibility.

---

**Component Path:** `nextjs\kbd\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
