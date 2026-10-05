export const metadata = docsPageMetadata("confidential-folder");

# Confidential Folder

An interactive classified folder sleeve component featuring a secret document card that glides out horizontally on hover and elevates gracefully onto the folder cover on click. Designed with a vector-precise thumb notch, geometric classified security crest seal, and luxurious dual-tone cardstock aesthetics.

`ConfidentialFolder` brings tactile physical curiosity to editorial portfolios, mission statements, manifesto showcases, and private asset reveals.

export const usageDefault = `import { ConfidentialFolder } from "@/components/custom/blocks/ConfidentialFolderBlock";

export default function ConfidentialFolderExample() {
  return (

  );
}`;

export const usageCustom = `import { ConfidentialFolder } from "@/components/custom/blocks/ConfidentialFolderBlock";

export default function CustomFolderExample() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/confidential-folder
```

## Features

    Two-Stage Flight Choreography
    When clicked, the document slides out horizontally past the sleeve edge, elevates in front on the z-axis, and glides back down with a gentle tilt onto the front cover.

    Vector Thumb Scoop Notch
    Engineered with a clean, subpixel-sharp SVG inward scoop notch along the right edge, exposing the card inside exactly like a high-end physical envelope sleeve.

    Atomic Orbital Spirograph Seal
    Features an intricate, mathematically balanced atomic orbital spirograph with rotated orbital ellipses and delicate node markers in vector SVG format.

    Dual-Tone Editorial Aesthetic
    Pairing a deep slate luxury sleeve with an authentic textured ivory cardstock creates a compelling, museum-grade visual contrast.

## Best Practices & Guidelines

    Keyboard & Accessibility
    ConfidentialFolder supports keyboard navigation: focus it with Tab and trigger the opening/closing animation using Enter or Space, or close with Escape.

    Mobile & Touch Interaction
    On touch devices where hover is unavailable, tapping the folder launches the smooth opening flight sequence immediately.

    Custom Manifesto & Quotes
    Customize quote, subquote, sessionLabel, and sessionNumber to feature your team's core values, product teasers, private key announcements, or executive notes.

## Props Reference

        Prop
        Type
        Default
        Description

        folderColor
        string
        undefined (var(--primary))
        Optional custom theme color override for the folder sleeve and accents. Defaults to the active theme's primary color.

        sleeveTitle
        string
        "Designed to endure"
        The primary headline displayed on the front face of the sleeve flap.

        sleeveSubtitle
        string
        "Crafted for those who value timeless clarity."
        Subtext displayed beneath the sleeve headline.

        frontBadge
        string
        "INTERNAL DISPATCH"
        Badge text displayed at the top left of the card's front cover face.

        frontSerial
        string
        "ARCHIVE // 07-X"
        Document tracking serial number at the top right of the card's front cover.

        frontTitle
        string
        "Design Directives"
        The prominent project title on the front face of the card.

        frontSubtitle
        string
        "Proprietary framework for world-class..."
        Descriptive clearance subtext on the front face of the card.

        frontStamp
        string
        "RESTRICTED"
        The angled classification stamp text displayed in the dashed security box.

        cardCategory
        string
        "ARCHIVE PROTOCOL"
        Category label displayed with indicator dot at the top left of the card.

        cardDate
        string
        "2026 // ED. 04"
        Edition / date tracking tag displayed at the top right of the card.

        cardTitle
        string
        "The Art of Restraint"
        The primary headline of the editorial card.

        cardSubtitle
        string
        "Foundational principles on..."
        Subtext explaining the core theme of the card.

        statement
        string
        "Simplicity is not the lack of..."
        The primary editorial manifesto paragraph inside the card.

        highlightQuote
        string
        "Cut until it is obvious..."
        Featured punchline callout rendered inside the primary-accented quote box.

        metric1Label / metric1Value
        string
        "LATENCY" / "
        Label and value for the first metric pill tile.

        metric2Label / metric2Value
        string
        "PHYSICS" / "Spring-3D"
        Label and value for the second metric pill tile.

        metric3Label / metric3Value
        string
        "INTEGRITY" / "100%"
        Label and value for the third metric pill tile.

        pillar1Title / pillar1Desc
        string
        undefined
        When set, replace metric1Label / metric1Value in the first metric pill tile.

        pillar2Title / pillar2Desc
        string
        undefined
        When set, replace metric2Label / metric2Value in the second metric pill tile.

        statusText
        string
        undefined
        When set, replaces clearanceLevel as the status line in the cover's footer.

        authorText
        string
        "STUDIO CORE TEAM"
        Attribution signature displayed in the footer next to the spirograph.

        initialPeek
        number
        38
        Horizontal pixel distance the card peeks out from the notch in resting idle state.

        hoverPeek
        number
        88
        Horizontal pixel distance the card glides out on hover before being clicked.

        cardVariant
        "adaptive" | "ivory"
        "adaptive"
        Switches between dynamic dual-theme adaptivity (light in Light Mode, dark in Dark Mode) and classic physical ivory cardstock.

        defaultOpen
        boolean
        false
        Whether the folder opens directly in its elevated resting state.

        onOpenChange
        (open: boolean) =&gt; void
        undefined
        Callback fired whenever the card opens or returns inside the sleeve.

---

**Component Path:** `[framework]\confidential-folder\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
