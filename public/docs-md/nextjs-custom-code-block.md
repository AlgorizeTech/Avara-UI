# Custom Code Block

A beautiful, robust code block component with manual syntax highlighting, automatic language icons, and clipboard copy functionality.

This `CustomCodeBlock` provides an elegant interface to display code snippets, complete with macOS-style window controls, dynamic language badges, and a custom syntax highlighter optimized for both light and dark themes.

## Interactive Showcase
Interact with the Custom Code Block to test the copy button and view its scrolling behavior.

## Implementation

```tsx
"use client";

export default function AppShowcasePage() {
  const codeString = `

  Landing Page

    SaaSFlow

        Features
        Pricing

    Build Faster. Scale Better.
    The ultimate UI toolkit for modern startups.
    
      Get Started

`;

  return (

  );
}
```

```tsx
"use client";

export default function AppShowcasePage() {
  const codeString = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --primary: 217.2 91.2% 59.8%;
  }
}

body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-feature-settings: "rlig" 1, "calt" 1;
}

.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 1; }
}`;

  return (

  );
}
```

```tsx
"use client";

export default function AppShowcasePage() {
  const codeString = `import React, { useState, useEffect } from "react";

export function SystemStatus({ serverName, defaultStatus }) {
  const [status, setStatus] = useState(defaultStatus);
  const [metrics, setMetrics] = useState({ ping: 45, load: 2.1 });

  useEffect(() => {
    // Simulate real-time monitoring
    const interval = setInterval(() => {
      setMetrics({
        ping: Math.floor(Math.random() * 20) + 30,
        load: Number((Math.random() * 3 + 1).toFixed(2))
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (

          {serverName}

          {status}

             Ping
          
          {metrics.ping}ms

             Load
          
          {metrics.load}%

  );
}`;

  return (

  );
}
```

```tsx
"use client";

export default function AppShowcasePage() {
  const codeString = `import React, { useState, useEffect } from "react";

interface SystemMetrics {
  ping: number;
  load: number;
}

interface SystemStatusProps {
  serverName: string;
  defaultStatus: "Operational" | "Degraded" | "Outage";
}

export function SystemStatus({ serverName, defaultStatus }: SystemStatusProps) {
  const [status, setStatus] = useState(defaultStatus);
  const [metrics, setMetrics] = useState({ ping: 45, load: 2.1 });

  useEffect(() => {
    // Simulate real-time monitoring data
    const interval = setInterval(() => {
      setMetrics({
        ping: Math.floor(Math.random() * 20) + 30,
        load: Number((Math.random() * 3 + 1).toFixed(2))
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (

          {serverName}

          {status}

             Ping
          
          {metrics.ping}ms

             Load
          
          {metrics.load}%

  );
}`;

  return (

  );
}
```

```tsx
"use client";

export default function AppShowcasePage() {
  const codeString = `# Initialize a new Next.js project with Tailwind CSS
npx create-next-app@latest my-app --typescript --tailwind --eslint

# Navigate into the project directory
cd my-app

# Install additional UI dependencies and icons
npm install clsx tailwind-merge framer-motion lucide-react

# Add Shadcn UI components for faster development
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog

# Start the development server on port 3000
npm run dev

# The server is now running at http://localhost:3000
# Press Ctrl+C to stop the server`;

  return (

  );
}
```

## Features
Explore the Custom Code Block's syntax highlighting features, complete with copy-to-clipboard functionality and line numbering.

    Zero Dependencies
    Uses a lightweight, custom regex engine for syntax highlighting. No need to install heavy libraries like PrismJS or Shiki.

    Language Badges
    Automatically displays the correct language icon (React, JS, TS, HTML, CSS, Bash) in the macOS-style header.

    Clipboard Copy
    Includes a built-in copy button with a temporary success state (checkmark) for an excellent developer experience.

    Dark Mode Ready
    The syntax highlighter colors are carefully chosen to look gorgeous on both light and dark backgrounds.

## Best Practices & Guidelines

    Language Prop Mapping
    Make sure to pass the correct language prop (e.g., "tsx", "bash", "css"). This prop drives both the regex syntax highlighting engine and the language icon rendered in the header.

## Props Reference

        Component
        Prop
        Type
        Default
        Description

          CustomCodeBlock

          code

          string
        
        -
        The raw code string to display.

          CustomCodeBlock

          language

          string

          "typescript"
        
        The programming language for syntax highlighting (e.g. "javascript", "tsx", "html", "bash").

          CustomCodeBlock

          fileName

          string
        
        -
        Optional custom file name to display in the header (e.g. "app.tsx").

---

**Component Path:** `nextjs\custom-code-block\page.mdx`

**Web Version:** Visit the interactive version at the corresponding URL on the Next.js documentation site for live previews and interactive examples.
