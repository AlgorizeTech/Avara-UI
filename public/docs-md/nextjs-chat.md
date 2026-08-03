# Chat Application

A fully interactive, encapsulated chat interface. Features include search filtering, simulated typing/replies, dynamic unread badges, auto-scrolling, and a responsive mobile drawer sidebar.

## Interactive Showcase

Use the control panel to switch between UI layouts (including standard, minimal, and glassmorphism) and select custom color themes. Test the UI by sending a message or searching for a contact.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

## Installation

### 1. Install Dependencies

This component relies heavily on `lucide-react` for its interface iconography. Run the following command:

```bash
npm install lucide-react
```

## Features
Explore the Chat component's robust features, including message grouping, timestamping, and responsive layout structures.

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

          currentUser

          CurrentUser

          Required

          Object containing avatar (URL), status{" "}
          ("online" | "offline"), and optional name for the
          logged-in user.

          contactsData

          Contact[]

          Required

          Array of objects containing contact info (id,{" "}
          name, message, date,{" "}
          unread, status). Can accept{" "}
          avatar URL or fallback initials and{" "}
          color.

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, backdrop
          blurs, and shadows.

          color

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global color themes to the send button, typing indicators,
          active contacts, and focus rings.

---

**Component Path:** `nextjs\chat\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
