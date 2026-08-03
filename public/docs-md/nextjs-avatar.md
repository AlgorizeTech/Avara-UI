# Avatar

A powerful, drop-in extension of the standard shadcn/ui avatar. This custom wrapper adds built-in support for avatar groups (stacks), predefined sizing, and dynamic online/offline status indicators.

## Interactive Showcase

Explore the different variations of the Avatar component. Toggle between single and grouped users, adjust the sizing, and test the activity status indicators.

_Click the **Code** tab in the preview below to copy the exact usage code for your selected configuration._

## Installation

### 1. Install Dependencies

This component relies on the standard `shadcn/ui` avatar base. Run the following command to install it:

```bash
npx shadcn-ui@latest add avatar
```

## Features
Explore the core features of the Avatar component, including fallback initials, image loading states, and customizable shapes.

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

        avatars
        AvatarData[]
        []
        Array of objects with src (URL) and fallback (initials).

        size
        "sm" | "default" | "lg"
        "default"
        Controls the dimensions of the avatar.

        active
        boolean
        false
        Displays a status indicator dot on single avatars.

        status
        "active" | "inactive"
        undefined
        Color of the status dot (Green/Red).

        className
        string
        undefined
        Custom classes for the outermost wrapper.

        avatarClassName
        string
        undefined
        Custom classes for the shadcn &lt;Avatar&gt; boundary.

---

**Component Path:** `nextjs\avatar\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
