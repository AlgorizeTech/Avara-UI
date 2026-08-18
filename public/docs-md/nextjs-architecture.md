# Architecture Overview

This section outlines the architectural foundation of our reusable component library and documentation system.

## Project Structure

```bash
├── src/
│   ├── app/                # Application pages and routes
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
    Registry Install Model
    The shadcn CLI writes each component's source into your repository. There is no wrapper package to depend on, so you own and edit the code outright.

    02. Modularity
    Per-Component Dependencies
    Each component declares only what it actually imports — usually lucide-react, gsap or framer-motion. Install one and you get its dependencies, not the whole library's.

    03. Build
    Static Export Ready
    Ships as plain source with no build step of its own — bundles cleanly under Vite, a Next.js static export, or any modern bundler.

    04. Theming
    Dynamic Dark Mode
    Built-in theme engine with custom color tokens powered by next-themes, which despite the name works in any React app.

---

**Component Path:** `[framework]\architecture\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
