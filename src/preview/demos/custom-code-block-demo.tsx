"use client";

import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const SNIPPETS = {
  HTML: {
    language: "html",
    fileName: "index.html",
    code: `<!DOCTYPE html>
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
</html>`
  },
  CSS: {
    language: "css",
    fileName: "style.css",
    code: `:root {
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
}`
  },
  JavaScript: {
    language: "jsx",
    fileName: "SystemStatus.jsx",
    code: `import React, { useState, useEffect } from "react";
import { Activity, Server, Zap } from "lucide-react";

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
    <div className="p-6 rounded-2xl bg-white border border-slate-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Server className="w-5 h-5 text-indigo-500" />
          {serverName}
        </h3>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="text-slate-500 text-sm mb-1 flex items-center gap-1">
            <Activity className="w-4 h-4"/> Ping
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.ping}ms</div>
        </div>
        <div className="p-4 bg-slate-50 rounded-xl">
          <div className="text-slate-500 text-sm mb-1 flex items-center gap-1">
            <Zap className="w-4 h-4"/> Load
          </div>
          <div className="text-2xl font-black text-slate-900">{metrics.load}%</div>
        </div>
      </div>
    </div>
  );
}`
  },
  TypeScript: {
    language: "tsx",
    fileName: "SystemStatus.tsx",
    code: `import React, { useState, useEffect } from "react";
import { Activity, Server, Zap } from "lucide-react";

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
        <h3 className="text-xl font-bold flex items-center gap-2 text-zinc-900 dark:text-white">
          <Server className="w-5 h-5 text-indigo-500" />
          {serverName}
        </h3>
        <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider">
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1 flex items-center gap-1">
            <Activity className="w-4 h-4"/> Ping
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{metrics.ping}ms</div>
        </div>
        <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
          <div className="text-zinc-500 dark:text-zinc-400 text-sm mb-1 flex items-center gap-1">
            <Zap className="w-4 h-4"/> Load
          </div>
          <div className="text-2xl font-black text-zinc-900 dark:text-white">{metrics.load}%</div>
        </div>
      </div>
    </div>
  );
}`
  },
  Terminal: {
    language: "bash",
    fileName: "terminal",
    code: `# Initialize a new Next.js project with Tailwind CSS
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
# Press Ctrl+C to stop the server`
  }
};

export default function CustomCodeBlockDemo({
  activeTab = "HTML",
  example,
}: {
  activeTab?: keyof typeof SNIPPETS;
  /** "tabs" renders one block with a file switcher instead of a single file. */
  example?: "default" | "tabs";
}) {
  const snippet = SNIPPETS[activeTab] || SNIPPETS.HTML;

  return (
    <div className="w-full h-full p-0 sm:p-4">
      <div className="w-full h-full">
        {example === "tabs" ? (
          <CustomCodeBlock
            tabs={[SNIPPETS.HTML, SNIPPETS.CSS, SNIPPETS.TypeScript].map(
              (s) => ({
                code: s.code,
                language: s.language,
                fileName: s.fileName,
              }),
            )}
          />
        ) : (
          <CustomCodeBlock
            code={snippet.code}
            language={snippet.language}
            fileName={snippet.fileName}
          />
        )}
      </div>
    </div>
  );
}
