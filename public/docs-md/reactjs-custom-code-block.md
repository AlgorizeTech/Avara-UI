---
title: "Shadcn Custom Code Block"
description: "A beautiful, robust code block component with manual syntax highlighting, automatic language icons, and clipboard copy functionality. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/custom-code-block
---

# Shadcn Custom Code Block

A beautiful, robust code block component with manual syntax highlighting, automatic language icons, and clipboard copy functionality.

This `CustomCodeBlock` provides an elegant interface to display code snippets, complete with macOS-style window controls, dynamic language badges, and a custom syntax highlighter optimized for both light and dark themes.

Every block ships with macOS window controls, a language badge derived from `language`, and a copy button.

## Code block

- Pass `code` as the raw source string — the block does not read children.
- `language` drives both the highlighter and the header icon. Defaults to `typescript`.
- `fileName` is the label shown beside that icon.

```tsx
import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Card UI</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="app-container" id="app">
    <section class="card glass-effect">
      <header class="card-header">
        <div class="status-indicator online"></div>
        <h2 class="title" data-testid="main-title">Project Alpha</h2>
        <span class="badge">v2.4.1</span>
      </header>

      <div class="card-body">
        <p class="description">
          Deploy your applications to the edge in milliseconds.
          Experience blazing fast performance worldwide.
        </p>
        <div class="metrics">
          <div class="metric"><span class="value">99.9%</span> Uptime</div>
          <div class="metric"><span class="value">12ms</span> Latency</div>
        </div>
      </div>

      <footer class="card-footer">
        <button class="btn btn-primary" onclick="deploy()">Deploy Now</button>
        <button class="btn btn-secondary">Settings</button>
      </footer>
    </section>
  </main>
</body>
</html>`;

export default function Snippet() {
  return <CustomCodeBlock code={html} language="html" fileName="index.html" />;
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/custom-code-block.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/custom-code-block
```

## Examples

### TypeScript

- Set `language="tsx"` — or `"ts"` — for TypeScript highlighting and the matching badge.

```tsx
import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const tsx = `import React, { useState, useEffect } from "react";

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
  const [metrics, setMetrics] = useState<SystemMetrics>({ ping: 45, load: 2.1 });

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
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-zinc-900 dark:text-white">
          <Server className="w-5 h-5 text-indigo-500" />
          {serverName}
        </h3>
        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1 flex items-center gap-1">
            <Activity className="w-4 h-4"/> Ping
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{metrics.ping}ms</div>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1 flex items-center gap-1">
            <Zap className="w-4 h-4"/> Load
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{metrics.load}%</div>
        </div>
      </div>
    </div>
  );
}`;

export default function TypeScriptBlock() {
  // `language` drives both the highlighter and the icon in the header;
  // `fileName` is the label beside it.
  return (
    <CustomCodeBlock
      code={tsx}
      language="tsx"
      fileName="SystemStatus.tsx"
    />
  );
}
```

### Shell commands

- Set `language="bash"` to swap the badge for a terminal icon and dim comment lines.

```tsx
import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const commands = `# Initialize a new Next.js project with Tailwind CSS
npx create-next-app@latest my-app --typescript --tailwind --eslint

# Navigate into the project directory
cd my-app

# Install additional UI dependencies and icons
npm install clsx tailwind-merge motion lucide-react

# Add Shadcn UI components for faster development
npx shadcn@latest init
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/button @avara-ui/card @avara-ui/dialog

# Start the development server on port 3000
npm run dev

# The server is now running at http://localhost:3000
# Press Ctrl+C to stop the server`;

export default function ShellBlock() {
  // Shell snippets get a terminal icon and comment-aware highlighting.
  return (
    <CustomCodeBlock code={commands} language="bash" fileName="terminal" />
  );
}
```

### Multiple files

- Pass `tabs` instead of `code` to group related files behind a switcher in one block.

```tsx
import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Modern Card UI</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="app-container" id="app">
    <section class="card glass-effect">
      <header class="card-header">
        <div class="status-indicator online"></div>
        <h2 class="title" data-testid="main-title">Project Alpha</h2>
        <span class="badge">v2.4.1</span>
      </header>

      <div class="card-body">
        <p class="description">
          Deploy your applications to the edge in milliseconds.
          Experience blazing fast performance worldwide.
        </p>
        <div class="metrics">
          <div class="metric"><span class="value">99.9%</span> Uptime</div>
          <div class="metric"><span class="value">12ms</span> Latency</div>
        </div>
      </div>

      <footer class="card-footer">
        <button class="btn btn-primary" onclick="deploy()">Deploy Now</button>
        <button class="btn btn-secondary">Settings</button>
      </footer>
    </section>
  </main>
</body>
</html>`;

const css = `:root {
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
}`;

const tsx = `import React, { useState, useEffect } from "react";

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
  const [metrics, setMetrics] = useState<SystemMetrics>({ ping: 45, load: 2.1 });

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
    <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center gap-2 text-zinc-900 dark:text-white">
          <Server className="w-5 h-5 text-indigo-500" />
          {serverName}
        </h3>
        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-semibold uppercase tracking-wider">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1 flex items-center gap-1">
            <Activity className="w-4 h-4"/> Ping
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{metrics.ping}ms</div>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1 flex items-center gap-1">
            <Zap className="w-4 h-4"/> Load
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{metrics.load}%</div>
        </div>
      </div>
    </div>
  );
}`;

// Pass `tabs` instead of `code` to switch between related files in one block.
export default function MultiFileSnippet() {
  return (
    <CustomCodeBlock
      tabs={[
        { code: html, language: "html", fileName: "index.html" },
        { code: css, language: "css", fileName: "style.css" },
        { code: tsx, language: "tsx", fileName: "SystemStatus.tsx" },
      ]}
    />
  );
}
```

## Features
Explore the Custom Code Block's syntax highlighting features, complete with copy-to-clipboard functionality and line numbering.

### No Highlighting Library

Uses a lightweight, custom regex engine for syntax highlighting. No need to install heavy libraries like PrismJS or Shiki.

### Language Badges

Automatically displays the correct language icon (React, JS, TS, HTML, CSS, Bash) in the macOS-style header.

### Clipboard Copy

Includes a built-in copy button with a temporary success state (checkmark) for an excellent developer experience.

### Dark Mode Ready

The syntax highlighter colors are carefully chosen to look gorgeous on both light and dark backgrounds.

## Best Practices & Guidelines

### Language Prop Mapping

Make sure to pass the correct `language` prop (e.g., `"tsx"`, `"bash"`, `"css"`). This prop drives both the regex syntax highlighting engine and the language icon rendered in the header.

## Props Reference

| Component | Prop | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `CustomCodeBlock` | `code` | `string` | - | The raw code string to display. |
| `CustomCodeBlock` | `language` | `string` | `"typescript"` | The programming language for syntax highlighting (e.g. "javascript", "tsx", "html", "bash"). |
| `CustomCodeBlock` | `fileName` | `string` | - | Optional custom file name to display in the header (e.g. "app.tsx"). |

---

Live previews and every example: https://avaraui.com/docs/nextjs/custom-code-block
