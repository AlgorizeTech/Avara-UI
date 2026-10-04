"use client";

import {
  TerminalBlock,
  type TerminalColor,
  type TerminalVariant,
} from "@/components/custom/blocks/TerminalBlock";

/**
 * Every branch below renders exactly what the matching usage snippet on
 * docs/[framework]/terminal/page.mdx prints — same code strings, same props,
 * same wrapper — so copying the usage reproduces the preview.
 */

const installCommand = `npx create-next-app@latest my-app --typescript --tailwind
cd my-app
npm run dev`;

const pythonSource = `import httpx

def fetch(url: str) -> dict:
    response = httpx.get(url, timeout=10)
    response.raise_for_status()
    return response.json()

if __name__ == "__main__":
    print(fetch("https://api.example.com/status"))`;

const tsxSource = `import { cn } from "@/lib/utils";

export function Button({ className, ...props }) {
  return (
    <button
      className={cn(
        "h-10 rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white",
        className,
      )}
      {...props}
    />
  );
}`;

export default function TerminalDemo({
  activeTab = "Bash",
  variant = "default",
  showFilename = true,
  isCopyable = true,
  color = "primary",
}: {
  activeTab?: "Bash" | "Python" | "React";
  variant?: TerminalVariant;
  showFilename?: boolean;
  isCopyable?: boolean;
  color?: TerminalColor;
}) {
  if (activeTab === "Bash") {
    return (
      <TerminalBlock
        code={installCommand}
        language="bash"
        filename="terminal"
        color={color}
      />
    );
  }

  if (activeTab === "Python") {
    return (
      <TerminalBlock
        code={pythonSource}
        language="python"
        filename="main.py"
        color={color}
      />
    );
  }

  if (variant === "glass") {
    return (
      // Backdrop-blurred chrome — put it over a gradient.
      <div className="p-12 bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl">
        <TerminalBlock
          code={tsxSource}
          language="tsx"
          filename="Button.tsx"
          variant="glass"
          color={color}
        />
      </div>
    );
  }

  if (variant === "minimal") {
    // Drops the window controls and the border for inline snippets.
    return (
      <TerminalBlock
        code={tsxSource}
        language="tsx"
        variant="minimal"
        color={color}
      />
    );
  }

  // No filename header, no copy button — just the code.
  return (
    <TerminalBlock
      code={tsxSource}
      language="tsx"
      copyable={isCopyable}
      filename={showFilename ? "Button.tsx" : undefined}
      color={color}
    />
  );
}
