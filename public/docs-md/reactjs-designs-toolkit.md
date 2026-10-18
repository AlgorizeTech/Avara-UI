export const metadata = docsPageMetadata("designs-toolkit");

# Designs Toolkit

A pinned resource toolkit grid inspired by creative studio moodboards and curated design directories. Cards feature authentic glossy **3D pushpins**, custom brand icon badges, staggered column vertical rhythm, and connected corkboard path lines across a subtle blueprint grid.

Each card highlights a curated tool with bold numbering, custom accent-themed borders and glows, brand insignia, and external links for quick access. Built with pure React, Tailwind CSS, and zero external dependencies.

export const usageDefault = `export default function ResourcesSection() {
  return (

  );
}`;

export const usageCustom = `const customTools: ToolkitItem[] = [
  {
    number: "01",
    title: "Figma",
    description: "Collaborative interface design tool for modern product teams and design systems.",
    icon: ,
    logoBg: "bg-purple-600 text-white",
    accentColor: "blue",
    href: "https://figma.com",
  },
  {
    number: "02",
    title: "GitHub",
    description: "Version control and collaborative platform hosting modern open-source repositories.",
    icon: ,
    logoBg: "bg-zinc-900 text-white",
    accentColor: "red",
    href: "https://github.com",
  },
  {
    number: "03",
    title: "Coolors",
    description: "The super-fast color palettes generator for UI designers and creative projects.",
    icon: ,
    logoBg: "bg-lime-500 text-zinc-950",
    accentColor: "green",
    href: "https://coolors.co",
  },
  {
    number: "04",
    title: "Shadcn UI",
    description: "Beautifully designed components that you can copy and paste into your apps.",
    icon: ,
    logoBg: "bg-pink-500 text-white",
    accentColor: "pink",
    href: "https://ui.shadcn.com",
  },
  {
    number: "05",
    title: "Tailwind CSS",
    description: "A utility-first CSS framework packed with classes that can be composed directly.",
    icon: ,
    logoBg: "bg-emerald-500 text-white",
    accentColor: "mint",
    href: "https://tailwindcss.com",
  },
  {
    number: "06",
    title: "AI Studio",
    description: "Next-generation generative AI playground for rapid prototyping and experiments.",
    icon: ,
    logoBg: "bg-cyan-500 text-white",
    accentColor: "cyan",
    href: "https://aistudio.google.com",
  },
];

export default function CuratedStack() {
  return (
    
  );
}`;

### Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/designs-toolkit
```

## Examples

## Features

    Authentic 3D Pushpins
    Hyper-realistic SVG 3D pushpins with multi-stop radial highlights, depth bevels, and natural contact drop shadows.

    Staggered Column Rhythm
    Center column vertical offset creates an authentic physical corkboard bulletin feel rather than a rigid symmetric table.

    Brand Badges & Glowing Borders
    Each card carries individual accent palettes with matching pastel tinted borders, glowing hover shadows, and custom icon badges.

    Zero Dependencies
    Pure React and Tailwind CSS implementation with zero external asset or icon library dependencies.

## Props Reference

        Prop
        Type
        Default
        Description

        items
        ToolkitItem[]
        DEFAULT_TOOLKIT_ITEMS
        Array of 6 pinned toolkit cards with number, title, description, icon, and colors.

        title
        string
        undefined
        Optional title shown above the pinned toolkit board.

        description
        string
        undefined
        Optional subtitle description below the title.

        showDashedLine
        boolean
        true
        Whether to render the dashed corkboard connecting path lines.

        showGrid
        boolean
        true
        Renders subtle blueprint grid pattern across the board background.

        interactive
        boolean
        true
        Enables card lift, pin zoom, and accent glow hover micro-interactions.

        animated
        boolean
        true
        Enables the graceful sequential card emergence choreography (Card 02 &rarr; 01 &rarr; 03 &rarr; 04 &rarr; 05 &rarr; 06).

        autoStartOnView
        boolean
        true
        Triggers the animation when the component scrolls into viewport.

---

**Component Path:** `[framework]\designs-toolkit\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
