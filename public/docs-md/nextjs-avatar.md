# Avatar

A powerful, drop-in extension of the standard shadcn/ui avatar. This custom wrapper adds built-in support for avatar groups (stacks), predefined sizing, and dynamic online/offline status indicators.

## Interactive Showcase

Explore the different variations of the Avatar component. Toggle between single and grouped users, adjust the sizing, and test the activity status indicators.

_Click the **Code** tab in the preview below to copy the exact usage code for your selected configuration._

---

## Installation

### 1. Install Dependencies

This component relies on the standard `shadcn/ui` avatar base. Run the following command to install it:

```bash
npx shadcn-ui@latest add avatar
```

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
