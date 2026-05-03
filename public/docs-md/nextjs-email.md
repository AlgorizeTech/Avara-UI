# Email Dashboard

A premium, fully interactive email client featuring a modern SaaS aesthetic. It includes out-of-the-box state management for reading, starring, archiving, deleting, and composing emails, alongside a fully responsive mobile drawer sidebar.

## Interactive Showcase

This component is fully encapsulated. Use the control panel to switch between UI layouts (including minimal and glassmorphism) and select custom color themes.

Try interacting with the interface: search for a sender, star an email to see it move to the "Starred" folder, or open the Compose modal to see the glassmorphism effects applied to absolute overlays.

_Click the **Code** tab in the preview below to copy the full component engine or the dynamic usage snippet for your current selection._

---

## Installation

### 1. Install Dependencies

This component relies heavily on `lucide-react` for its interface iconography. Run the following command:

```bash
npm install lucide-react
```

## Props Reference

        Prop
        Type
        Default
        Description

          initialEmails

          Email[]

          Required

          Array of email objects to populate the client. Includes routing data
          like folder ("inbox", "sent", etc.) and state trackers
          like isRead and isStarred.

          variant

          "default" | "minimal" | "glass"

          "default"

          Applies overarching structural layouts, including borders, backdrop
          blurs, and shadows.

          color

          "indigo" | "rose" | "emerald" | "zinc"

          "indigo"

          Applies global color themes to the compose button, unread notification
          dots, and focus rings.

---

**Component Path:** `nextjs\email\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
