export const metadata = docsPageMetadata("faq-section", {
  title: "FAQ Section",
  description: "An animated, editorial FAQ website section pairing a responsive section header with an interactive nature photography canvas and an expandable question accordion."
});

# FAQ Section

An animated, editorial FAQ section designed for modern landing pages, SaaS platforms, and digital agencies. Pairs a centered section header with an interactive nature photography canvas that dynamically morphs its height and width and crossfades photos with each active question, alongside a keyboard-accessible, smooth accordion list.

Built with pure CSS keyframes and transitions — zero third-party animation library runtime dependencies, guaranteed 60fps performance, and full adaptive styling for both Light and Dark themes.

export const usageDefault = `export default function FAQExample() {
  return (
    
  );
}
`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/faq-section
```

## Props Reference

### FAQSection

        Prop
        Type
        Default
        Description

        eyebrow
        string
        "Common Queries"
        The pill badge text displayed above the title with a sparkles icon. Pass empty string or null to omit.

        title
        string
        "Frequently Asked Questions"
        The primary headline string rendered in editorial serif styling.

        description
        string
        "Everything you need to know..."
        The subtitle paragraph explaining the section context.

        items
        FAQItem[]
        FAQ_ITEMS
        Array of FAQ questions, answers, nature photography URLs, and coordinate metadata.

        showGlows
        boolean
        true
        Whether to render ambient background blur glow orbs behind the section.

        defaultActiveId
        string
        "installation"
        The ID of the question that opens expanded on initial render.

        id
        string
        "faq"
        HTML section element id for anchor linking (e.g. #faq).

        className
        string
        undefined
        Additional Tailwind CSS classes for the root &lt;section&gt; container.

### FAQItem Data Structure

        Field
        Type
        Description

        id
        string
        Unique identifier for the item used for active state tracking.

        question
        string
        The question headline displayed in the accordion button.

        category
        string
        Category badge string (e.g. "CLI & Setup", "Tailwind & Theming").

        answer
        string
        The detailed answer body revealed inside the accordion panel.

        image
        string
        High-resolution photo URL rendered on the interactive nature canvas.

        location
        string
        Geographic location label displayed in the bottom caption badge.

        coordinates
        string
        Latitude/longitude coordinates displayed in the top-right watermark badge.

        height
        number
        Target canvas height in pixels for dynamic morphing transitions.

        maxWidth
        number
        Target canvas maximum width in pixels for dynamic morphing transitions.

        clipCut
        string
        Chamfer corner cut size (e.g. "2.5rem") for the polygon clip-path.

---

**Component Path:** `[framework]\faq-section\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
