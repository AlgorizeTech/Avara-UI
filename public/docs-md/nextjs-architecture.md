# Architecture Overview

This section outlines the architectural foundation of our reusable component library and documentation system.

## Project Structure

```bash
├── src/
│   ├── app/                # Next.js App Router pages and routes
│   ├── components/         # Reusable UI components & showcases
│   │   ├── site/           # Navigation, header, sidebar & layout elements
│   │   ├── ui/             # Core UI components
│   │   └── custom/         # Custom block components
│   ├── constants/          # Site-wide navigation and configuration
│   └── lib/                # Utility functions and helper scripts
└── public/                 # Static assets and markdown documentation
```

## Core Design Principles

    01. Architecture
    Copy & Paste Model
    Zero dependency bloat. Copy component code directly into your repository with 100% ownership.

    02. Modularity
    Modular Primitives
    Built with complete isolation using Tailwind CSS, Framer Motion, and Radix UI primitives.

    03. Build
    Static Export Ready
    Fully optimized for Next.js static HTML exports, SSG, and ultra-fast hosting deployments.

    04. Theming
    Dynamic Dark Mode
    Built-in theme engine with custom color tokens powered by next-themes.

---

**Component Path:** `nextjs\architecture\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
