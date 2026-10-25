export const metadata = docsPageMetadata("designs-toolkit");

# Designs Toolkit

A pinned resource toolkit grid inspired by creative studio moodboards and curated design directories. Cards feature authentic glossy **3D pushpins**, custom brand icon badges, staggered column vertical rhythm, and connected corkboard path lines across a subtle blueprint grid.

Each card highlights a curated tool with bold numbering, custom accent-themed borders and glows, brand insignia, and customizable interactions. Built with pure React, Tailwind CSS, and zero external dependencies.

export const usageCreative = `const creativeTools = [
  {
    number: "01",
    title: "Freepik",
    description: "Curated vectors, stock photos, and graphic templates for visual creatives.",
    icon: ,
    logoBg: "bg-blue-600 text-white",
    accentColor: "blue",
    pinColor: "#2563eb",
    onClick: () => {},
  },
  {
    number: "02",
    title: "Pinterest",
    description: "Visual discovery engine for finding moodboards, ideas, and creative styling.",
    icon: ,
    logoBg: "bg-red-600 text-white",
    accentColor: "red",
    pinColor: "#dc2626",
    onClick: () => {},
  },
  {
    number: "03",
    title: "Envato",
    description: "Marketplace for premium design assets like templates, graphics, videos, and more.",
    icon: ,
    logoBg: "bg-[#7cb342] text-zinc-950",
    accentColor: "green",
    pinColor: "#65a30d",
    onClick: () => {},
  },
  {
    number: "04",
    title: "Dribbble",
    description: "Platform for showcasing, discovering, and connecting with creative design work.",
    icon: ,
    logoBg: "bg-pink-500 text-white",
    accentColor: "pink",
    pinColor: "#db2777",
    onClick: () => {},
  },
  {
    number: "05",
    title: "Flaticon",
    description: "Millions of free and premium vector icons, stickers, and UI interface graphics.",
    icon: ,
    logoBg: "bg-emerald-500 text-white",
    accentColor: "mint",
    pinColor: "#059669",
    onClick: () => {},
  },
  {
    number: "06",
    title: "Mockup World",
    description: "Free, high-quality PSD mockups for showcasing designs in realistic settings.",
    icon: ,
    logoBg: "bg-gradient-to-tr from-cyan-500 to-sky-400 text-white",
    accentColor: "cyan",
    pinColor: "#0891b2",
    onClick: () => {},
  },
];

export default function CreativeResourcesSection() {
  return (

  );
}`;

export const usageDeveloper = `const developerTools = [
  {
    number: "01",
    title: "Next.js",
    description: "The React framework for high-performance production web applications.",
    icon: ,
    logoBg: "bg-zinc-900 text-white dark:bg-zinc-800",
    accentColor: "blue",
    pinColor: "#2563eb",
    onClick: () => {},
  },
  {
    number: "02",
    title: "TypeScript",
    description: "Strongly typed programming language that builds on JavaScript syntax.",
    icon: ,
    logoBg: "bg-blue-600 text-white",
    accentColor: "red",
    pinColor: "#dc2626",
    onClick: () => {},
  },
  {
    number: "03",
    title: "Tailwind CSS",
    description: "Utility-first CSS framework for rapid and maintainable modern UI design.",
    icon: ,
    logoBg: "bg-sky-500 text-white",
    accentColor: "green",
    pinColor: "#65a30d",
    onClick: () => {},
  },
  {
    number: "04",
    title: "Supabase",
    description: "Open source Firebase alternative with PostgreSQL database and realtime sync.",
    icon: ,
    logoBg: "bg-emerald-600 text-white",
    accentColor: "pink",
    pinColor: "#db2777",
    onClick: () => {},
  },
  {
    number: "05",
    title: "GitHub",
    description: "Cloud-based hosting service for version control, CI/CD, and collaboration.",
    icon: ,
    logoBg: "bg-zinc-950 text-white",
    accentColor: "mint",
    pinColor: "#059669",
    onClick: () => {},
  },
  {
    number: "06",
    title: "Vercel",
    description: "Frontend cloud platform for seamless continuous deployment and serverless.",
    icon: ,
    logoBg: "bg-zinc-900 text-white",
    accentColor: "cyan",
    pinColor: "#0891b2",
    onClick: () => {},
  },
];

export default function DeveloperStackSection() {
  return (

  );
}`;

export const usageRoadmap = `const roadmapSteps = [
  {
    number: "01",
    title: "Testimonials",
    description:
      "The only way to attract new clients, is to show your experience with the previous ones. Include: real photo, position at company, links to profiles.",
    icon: ,
    accentColor: "orange",
    pinColor: "#ea580c",
    onClick: () => {},
  },
  {
    number: "02",
    title: "Trust Badges",
    description:
      "Show all the achievements you have. Awards, certificates, payment protections, and security seals that eliminate buyer doubt.",
    icon: ,
    accentColor: "blue",
    pinColor: "#2563eb",
    onClick: () => {},
  },
  {
    number: "03",
    title: "Add Contacts",
    description:
      "People need to understand that if something happens, they can reach out to you. Leave links to social media, email, and phone.",
    icon: ,
    accentColor: "purple",
    pinColor: "#8b5cf6",
    onClick: () => {},
  },
  {
    number: "04",
    title: "Case Studies",
    description:
      "Share detailed examples of how your product or service solved real problems. This helps visitors imagine their own success.",
    icon: ,
    accentColor: "orange",
    pinColor: "#ea580c",
    onClick: () => {},
  },
  {
    number: "05",
    title: "Clear Refund Policy",
    description:
      "Offer a transparent money-back guarantee or easy return process to build instant customer trust.",
    icon: ,
    accentColor: "blue",
    pinColor: "#2563eb",
    onClick: () => {},
  },
];

export default function RoadmapPathwaySection() {
  return (

  );
}`;

### Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/designs-toolkit.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/designs-toolkit
```

## Examples

## Features

    Authentic 3D Pushpins
    Hyper-realistic SVG 3D pushpins with multi-stop radial highlights, depth bevels, and natural contact drop shadows.

    Multiple Layout Variants
    Switch effortlessly between the staggered 3-column corkboard grid and the winding alternating roadmap timeline pathway.

    Brand Badges & Glowing Borders
    Each card carries individual accent palettes with matching pastel tinted borders, glowing hover shadows, and custom icon badges.

    Pure Reusability & Zero Navigations
    Pass any custom items with your own icons, titles, and descriptions. Cards trigger customizable onClick handlers without navigating.

## Props Reference

        Prop
        Type
        Default
        Description

        variant
        "grid" | "roadmap"
        "grid"
        Layout variant: "grid" for the staggered 3-column corkboard, or "roadmap" for the winding S-curve pathway.

        items
        ToolkitItem[]
        DEFAULT_TOOLKIT_ITEMS
        Array of pinned toolkit cards with number, title, description, icon, colors, and onClick handler.

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
        Whether to render the dashed corkboard or roadmap connecting path lines.

        showGrid
        boolean
        true
        Renders subtle blueprint grid pattern across the board background (for grid variant).

        showLines
        boolean
        false
        Renders subtle horizontal notebook ruled lines across the background (default true in roadmap).

        footerNote
        FooterNote
        undefined
        Custom avatar, text, and highlightText for the roadmap pathway end badge.

        interactive
        boolean
        true
        Enables card lift, pin zoom, and accent glow hover micro-interactions.

        animated
        boolean
        true
        Enables the graceful sequential card emergence choreography.

        autoStartOnView
        boolean
        true
        Triggers the animation when the component scrolls into viewport.

        animationDuration
        number
        1150
        Duration in milliseconds for each card's emergence transition and proportional step timing.

---

**Component Path:** `[framework]\designs-toolkit\page.mdx`

**Web Version:** Visit the corresponding URL on the Avara UI documentation site for live previews and interactive examples.
