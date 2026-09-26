# Table of Contents

An interactive, responsive **Table of Contents** navigation block engineered to sit on the left side of long documents, articles, or documentation pages.

Features a real-time scroll-spy, spring-animated section indicator, scroll progress bar, section search filter, and mobile navigation drawer.

export const usageExample = `const previewItems: TOCItem[] = [
  {
    id: "overview",
    title: "Overview & Features",
    level: 1,
    description:
      "The Table of Contents component is a powerful, production-grade navigation system designed specifically for content-heavy documentation, technical blogs, and long-form articles. It dynamically monitors viewport scroll position using high-performance IntersectionObserver and scroll-spy events to highlight the active section instantly. On a spring curve with no animation library behind it, the active indicator pill glides fluidly across navigation items without causing layout shifts.",
  },
  {
    id: "installation",
    title: "Installation & Setup",
    level: 1,
    description:
      "Integrating this Table of Contents component into your modern web application takes less than a minute using the shadcn CLI or custom package managers. It comes pre-configured with support for Next.js App Router server components, standard React SPA architectures, and Tailwind CSS v4 styling rules.",
  },
  {
    id: "prerequisites",
    title: "Prerequisites",
    level: 2,
    description:
      "Before installing the component, verify that your development environment satisfies standard modern React framework requirements. You will need Node.js version 18.0.0 or higher, React 18 or 19, and Next.js 14+ if using the App Router.",
  },
  {
    id: "package-install",
    title: "Package Installation",
    level: 2,
    description:
      "Run the official shadcn registry command to automatically download the component file and inject its dependencies into your project structure.",
    codeSnippet:
      "npx shadcn@latest add @algorize-ui/table-of-contents",
  },
  {
    id: "configuration",
    title: "Configuration & Customization",
    level: 1,
    description:
      "The component provides an extensive set of customizable props to fit your application's unique branding and layout requirements. You can control the sticky sidebar position, adjust scroll offset margins for fixed site headers, enable or disable the progress indicator bar, and customize section filter behavior.",
  },
  {
    id: "accessibility",
    title: "Accessibility & ARIA",
    level: 1,
    description:
      "Built with Web Content Accessibility Guidelines (WCAG 2.1) compliance in mind, the Table of Contents uses semantic HTML5 navigation landmarks () and explicit ARIA attributes like aria-label and aria-current.",
  },
];

export default function TableOfContentsDemo() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/table-of-contents
```

## Features

    Right-Side Sticky Panel
    Positions the TOC navigation cleanly on the right column while main content flows on the left.

    Scroll-Spy Tracking
    Automatically detects active viewport headings and animates the active indicator smoothly along a spring curve, with no animation library.

    Section Search Filter
    Filter long document section headers instantly with an embedded search input.

    Mobile Dropdown Menu
    Collapses into a sticky mobile bar with drawer navigation on smaller devices.

## Props Reference

        Component / Object
        Prop
        Type
        Default
        Description

        TableOfContentsBlock
        items
        TOCItem[]
        DEFAULT_ITEMS
        Array of section content blocks with titles, levels, descriptions, and optional code snippets.

        TableOfContentsBlock
        headings
        TOCHeading[]
        Derived from items
        Custom outline structure containing id, title, and level (1 | 2 | 3).

        TableOfContentsBlock
        activeId
        string
        Controlled by scroll-spy
        Manually override the currently highlighted active section ID.

        TableOfContentsBlock
        onSelectHeading
        (id: string) =&gt; void
        Smooth scroll to target
        Callback fired when a user clicks on a section heading in the TOC sidebar.

        TableOfContentsBlock
        color
        string
        "var(--primary)"
        Accent theme color for active indicator, progress bar, and search highlights (Hex, RGB, or CSS var).

        TableOfContentsBlock
        showProgress
        boolean
        true
        Shows or hides the top reading progress indicator bar.

        TableOfContentsBlock
        showSearch
        boolean
        true
        Shows or hides the inline section search filter input inside the sidebar.

        TableOfContentsBlock
        sidebarTitle
        string
        "On this page"
        Header text displayed at the top of the sticky TOC sidebar.

        TOCItem / TOCHeading
        id
        string
        Required
        Unique DOM element ID matching the section heading target.

        TOCItem / TOCHeading
        title
        string
        Required
        Display title shown in the TOC sidebar and main content section.

        TOCItem / TOCHeading
        level
        1 | 2 | 3
        1
        Indentation hierarchy level for sub-sections.

        TOCItem
        description
        string
        —
        Body paragraph content associated with the section.

        TOCItem
        codeSnippet
        string
        —
        Code snippet displayed inside the section card with a copy-to-clipboard button.

        TOCItem
        badge
        string
        —
        Badge label shown next to the section title (e.g., "New", "Updated").

---

**Component Path:** `[framework]\table-of-contents\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
