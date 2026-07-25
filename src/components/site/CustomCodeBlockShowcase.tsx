"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { CodeBlocks } from "@/components/custom/ui/codeblocks";

const CODE_TS = `"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiReact } from "react-icons/si";
import { FaTerminal } from "react-icons/fa";

export interface CustomCodeBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language?: string;
  fileName?: string;
}

const LanguageIcon = ({ language }: { language: string }) => {
  const lang = language.toLowerCase();
  const iconClass = "w-4 h-4";
  if (lang === "javascript" || lang === "js") return <SiJavascript className={cn(iconClass, "text-yellow-400")} />;
  if (lang === "typescript" || lang === "ts") return <SiTypescript className={cn(iconClass, "text-blue-500")} />;
  if (lang === "jsx" || lang === "tsx" || lang === "react") return <SiReact className={cn(iconClass, "text-sky-400")} />;
  if (lang === "html" || lang === "xml") return <SiHtml5 className={cn(iconClass, "text-orange-500")} />;
  if (lang === "css") return <SiCss3 className={cn(iconClass, "text-blue-400")} />;
  if (lang === "bash" || lang === "sh") return <FaTerminal className={cn(iconClass, "text-slate-400")} />;
  return <SiReact className={cn(iconClass, "text-slate-400")} />;
};

const formatLanguageName = (language: string) => {
  const lang = language.toLowerCase();
  if (lang === "javascript" || lang === "js") return "JavaScript";
  if (lang === "typescript" || lang === "ts") return "TypeScript";
  if (lang === "jsx" || lang === "react") return "React";
  if (lang === "tsx") return "React TS";
  if (lang === "html" || lang === "xml") return "HTML";
  if (lang === "css") return "CSS";
  if (lang === "bash" || lang === "sh") return "Terminal";
  return language;
};

const highlightCode = (code: string, language: string) => {
  let html = code
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Colorful syntax theme that works on dark mode
  const colors = {
    keyword: "text-fuchsia-500 dark:text-fuchsia-400 font-medium",
    string: "text-amber-500 dark:text-amber-400",
    function: "text-blue-500 dark:text-blue-400",
    number: "text-orange-500 dark:text-orange-400",
    property: "text-sky-500 dark:text-sky-400", // Attributes like class=""
    tag: "text-rose-500 dark:text-rose-400", 
    component: "text-emerald-500 dark:text-emerald-400 font-medium",
    operator: "text-slate-500 dark:text-slate-400",
    comment: "text-slate-400 dark:text-slate-500 italic",
    punctuation: "text-slate-400",
    stringContent: "text-lime-500 dark:text-lime-400", // For classNames inside strings
  };

  if (language === "html" || language === "xml") {
    html = html.replace(/(&lt;!--[\\s\\S]*?--&gt;)/g, \`<span class="\${colors.comment}">$1</span>\`);
    
    // attributes like class="text-xl"
    html = html.replace(
      /([a-zA-Z0-9-]+)(=)(["'])(.*?)\\3/g,
      (match, attr, eq, quote, content) => {
        return \`<span class="\${colors.property}">\${attr}</span><span class="\${colors.operator}">\${eq}</span><span class="\${colors.property}">\${quote}</span><span class="\${colors.stringContent}">\${content}</span><span class="\${colors.property}">\${quote}</span>\`;
      }
    );
    
    html = html.replace(
      /(&lt;\\/?)([a-zA-Z0-9-]+)/g,
      (match, brackets, tagName) => {
        return \`<span class="\${colors.punctuation}">\${brackets}</span><span class="\${colors.tag}">\${tagName}</span>\`;
      }
    );
    html = html.replace(/(\\/&gt;|&gt;)/g, \`<span class="\${colors.punctuation}">$1</span>\`);
    return html;
  }

  // JS/TS/JSX
  html = html.replace(
    /(["'](?:\\\\.|[^\\\\])*?["']|\`(?:\\\\\`|[^\\\`])*\`)|(\\//.*|\\/\\*[\\s\\S]*?\\*\\/)|(&lt;\\/?[a-zA-Z0-9_-]+)|(\\/&gt;|&gt;)|([a-zA-Z0-9_-]+)(?=\\s*[:=])|(\\b\\d+\\.?\\d*\\b)|(\\b(?:const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|implements|new|this|typeof|instanceof|switch|case|break|continue|try|catch|finally|async|await|interface|type|public|private|protected|readonly)\\b)|([a-zA-Z_$][a-zA-Z0-9_$]*)(?=\\s*\\()|(\\b[A-Z][a-zA-Z0-9_$]*\\b)|([=+\\-*/!&|{}()\\[\\]]+)/g,
    (match, str, comment, jsxTag, jsxBracket, attrKey, num, keyword, func, comp, operator) => {
      if (str) {
        const quote = str[0];
        if (["'", '"', "\`"].includes(quote)) {
          const inside = str.slice(1, -1);
          const endQuote = str[str.length - 1];
          return \`<span class="\${colors.property}">\${quote}</span><span class="\${colors.stringContent}">\${inside}</span><span class="\${colors.property}">\${endQuote}</span>\`;
        }
        return \`<span class="\${colors.string}">\${str}</span>\`;
      }
      if (comment) return \`<span class="\${colors.comment}">\${comment}</span>\`;
      if (jsxTag) {
        let isClosing = jsxTag.includes("/");
        let brackets = isClosing ? "&lt;/" : "&lt;";
        let tagName = jsxTag.replace(brackets, "");
        let isComponent = /^[A-Z]/.test(tagName);
        let tagColor = isComponent ? colors.component : colors.tag;
        return \`<span class="\${colors.punctuation}">\${brackets}</span><span class="\${tagColor}">\${tagName}</span>\`;
      }
      if (jsxBracket) return \`<span class="\${colors.punctuation}">\${jsxBracket}</span>\`;
      if (attrKey) return \`<span class="\${colors.property}">\${attrKey}</span>\`;
      if (num) return \`<span class="\${colors.number}">\${num}</span>\`;
      if (keyword) return \`<span class="\${colors.keyword}">\${keyword}</span>\`;
      if (func) return \`<span class="\${colors.function}">\${func}</span>\`;
      if (comp) return \`<span class="\${colors.component}">\${comp}</span>\`;
      if (operator) return \`<span class="\${colors.operator}">\${operator}</span>\`;
      return match;
    }
  );

  html = html.replace(
    /\\b(true|false|null|undefined)\\b/g,
    \`<span class="\${colors.number}">$1</span>\`
  );

  return html;
};

export function CustomCodeBlock({
  code,
  language = "typescript",
  fileName,
  className,
  ...props
}: CustomCodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState("");

  useEffect(() => {
    setHighlightedCode(highlightCode(code, language));
  }, [code, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code: ", err);
    }
  };

  const lines = (highlightedCode || code).trim().split("\\n");

  return (
    <div className={cn("w-full rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 font-sans shadow-sm", className)} {...props}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-4">
          {/* Mac Dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
          </div>
          {/* File Name or Language Badge */}
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-md">
            <LanguageIcon language={language} />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-300">
              {fileName || formatLanguageName(language)}
            </span>
          </div>
        </div>

        {/* Copy Button */}
        <button
          onClick={copyToClipboard}
          className="flex items-center justify-center w-8 h-8 rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          {isCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Code Block */}
      <div className="relative overflow-x-auto">
        <pre className="p-4 text-[13.5px] leading-relaxed font-mono [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-400 dark:hover:[&::-webkit-scrollbar-thumb]:bg-slate-600">
          <code className="block min-w-max text-slate-800 dark:text-slate-200">
            {lines.map((line, i) => (
              <div key={i} className="flex min-h-[1.5rem]">
                <span dangerouslySetInnerHTML={{ __html: line || " " }} />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
`;

const getUsageCode = (tabKey: keyof typeof SNIPPETS) => {
  const snippet = SNIPPETS[tabKey];
  const escapedCode = snippet.code.replace(/`/g, '\\`').replace(/\$/g, '\\$');
  
  return `import { CustomCodeBlock } from "@/components/custom/blocks/CustomCodeBlock";

const ${tabKey.toUpperCase()}_CODE = \`${escapedCode}\`;

export default function Example() {
  return (
    <CustomCodeBlock 
      language="${snippet.language}"
      fileName="${snippet.fileName}"
      code={${tabKey.toUpperCase()}_CODE}
    />
  );
}`;
};


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
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog

# Start the development server on port 3000
npm run dev

# The server is now running at http://localhost:3000
# Press Ctrl+C to stop the server`
  }
};

export function CustomCodeBlockShowcase() {
  const [activeTab, setActiveTab] = useState<keyof typeof SNIPPETS>("HTML");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("custom-code-change", {
          detail: { variant: activeTab },
        })
      );
    }
  }, [activeTab]);

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* Variant Switcher Above Preview */}
      <div className="w-full p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-[#09090b] shadow-sm flex flex-col gap-3">
        <span className="text-[11px] font-bold text-zinc-500 uppercase tracking-wider">
          SUPPORTED LANGUAGES
        </span>
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/50 p-1 rounded-lg w-max flex-wrap">
          {Object.keys(SNIPPETS).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTab(key as keyof typeof SNIPPETS)}
              className={cn(
                "cursor-pointer px-3 py-1.5 text-sm font-medium rounded-md transition-all",
                activeTab === key
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <ComponentPreview
        name="CustomCodeBlock"
        tsCode={CODE_TS}
        usageCode={getUsageCode(activeTab)}
      >
        <div className="w-full h-full p-0 sm:p-4">
          <div className="w-full h-full">
            <CustomCodeBlock 
              code={SNIPPETS[activeTab].code}
              language={SNIPPETS[activeTab].language}
              fileName={SNIPPETS[activeTab].fileName}
            />
          </div>
        </div>
      </ComponentPreview>
    </div>
  );
}

