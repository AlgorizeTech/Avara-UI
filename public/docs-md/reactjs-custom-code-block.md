export const metadata = docsPageMetadata("custom-code-block");

# Custom Code Block

A beautiful, robust code block component with manual syntax highlighting, automatic language icons, and clipboard copy functionality.

This `CustomCodeBlock` provides an elegant interface to display code snippets, complete with macOS-style window controls, dynamic language badges, and a custom syntax highlighter optimized for both light and dark themes.

Every block ships with macOS window controls, a language badge derived from `language`, and a copy button.

export const htmlSource = `const html = \`

  Modern Card UI

        Project Alpha
        v2.4.1

          Deploy your applications to the edge in milliseconds.
          Experience blazing fast performance worldwide.

          99.9% Uptime
          12ms Latency

        Deploy Now
        Settings

\`;`;

export const cssSource = `const css = \`:root {
  --primary-color: #6366f1;
  --bg-dark: #0f172a;
  --text-light: #f8fafc;
  --glass-bg: rgba(255, 255, 255, 0.1);
  --glass-border: rgba(255, 255, 255, 0.2);
}

.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.status-indicator.online {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #10b981;
  box-shadow: 0 0 10px #10b981;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.95); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.8; }
  100% { transform: scale(0.95); opacity: 1; }
}\`;`;

export const tsxSource = `const tsx = \`import React, { useState, useEffect } from "react";

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
}\`;`;

export const bashSource = `const commands = \`# Initialize a new Next.js project with Tailwind CSS
npx create-next-app@latest my-app --typescript --tailwind --eslint

# Navigate into the project directory
cd my-app

# Install additional UI dependencies and icons
npm install clsx tailwind-merge framer-motion lucide-react

# Add Shadcn UI components for faster development
npx shadcn@latest init
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/button @algorize-ui/card @algorize-ui/dialog

# Start the development server on port 3000
npm run dev

# The server is now running at http://localhost:3000
# Press Ctrl+C to stop the server\`;`;

export const usageDefault = `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

${htmlSource}

export default function Snippet() {
  return ;
}`;

export const usageTypescript = `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

${tsxSource}

export default function TypeScriptBlock() {
  // \`language\` drives both the highlighter and the icon in the header;
  // \`fileName\` is the label beside it.
  return (
    
  );
}`;

export const usageBash = `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

${bashSource}

export default function ShellBlock() {
  // Shell snippets get a terminal icon and comment-aware highlighting.
  return (
    
  );
}`;

export const usageTabs = `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

${htmlSource}

${cssSource}

${tsxSource}

// Pass \`tabs\` instead of \`code\` to switch between related files in one block.
export default function MultiFileSnippet() {
  return (
    
  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/custom-code-block
```

## Examples

## Features
Explore the Custom Code Block's syntax highlighting features, complete with copy-to-clipboard functionality and line numbering.

    No Highlighting Library
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

**Component Path:** `[framework]\custom-code-block\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
