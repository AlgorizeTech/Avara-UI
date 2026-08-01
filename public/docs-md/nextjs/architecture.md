# Architecture Overview

This section outlines the architectural foundation of our reusable component library and documentation system.

## Project Structure

```
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

1. **Modular Components**: Built with isolation and flexibility in mind using Tailwind CSS and Radix UI / Motion primitives.
2. **Static Export Ready**: Configured for static HTML generation and seamless hosting.
3. **Dark / Light Mode**: Built-in dynamic theme system powered by `next-themes`.
