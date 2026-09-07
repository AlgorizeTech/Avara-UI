# Table of Contents

An interactive, responsive **Table of Contents** navigation block engineered to sit on the left side of long documents, articles, or documentation pages.

Features a real-time scroll-spy, animated Framer Motion section indicator, scroll progress bar, section search filter, and mobile navigation drawer.

export const usageExample = `const previewItems = [
  {
    id: "overview",
    title: "Overview & Features",
    level: 1,
    description:
      "The Table of Contents component is a powerful, production-grade navigation system designed specifically for content-heavy documentation, technical blogs, and long-form articles. It dynamically monitors viewport scroll position using high-performance IntersectionObserver and scroll-spy events to highlight the active section instantly. Engineered with smooth Framer Motion spring physics, the active indicator pill glides fluidly across navigation items without causing layout shifts.",
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
      "npx shadcn@latest add https://algorize-ui.vercel.app/r/table-of-contents.json",
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

## Features

    Right-Side Sticky Panel
    Positions the TOC navigation cleanly on the right column while main content flows on the left.

    Scroll-Spy Tracking
    Automatically detects active viewport headings and animates the active indicator smoothly using Framer Motion.

    Section Search Filter
    Filter long document section headers instantly with an embedded search input.

    Mobile Dropdown Menu
    Collapses into a sticky mobile bar with drawer navigation on smaller devices.

---

**Component Path:** `[framework]\table-of-contents\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
