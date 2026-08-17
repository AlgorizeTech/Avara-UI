"use client";

import {
  TerminalBlock,
  TerminalVariant,
} from "@/components/custom/blocks/TerminalBlock";

const sampleCodes = {
  React: {
    language: "tsx",
    filename: "Button.tsx",
    code: `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "focus-visible:outline-none focus-visible:ring-2",
          "disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"`,
  },
  Python: {
    language: "python",
    filename: "main.py",
    code: `def fibonacci(n):
    """Return a list containing the Fibonacci series up to n."""
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a + b
    return result

if __name__ == "__main__":
    # Print Fibonacci sequence up to 100
    print(fibonacci(100))`,
  },
  Bash: {
    language: "bash",
    filename: "terminal",
    code: `npx create-next-app@latest my-app --typescript --tailwind --eslint
cd my-app
npm install lucide-react clsx tailwind-merge
npm run dev`,
  },
};

export default function TerminalDemo({
  variant = "default",
  activeTab = "React",
  color = "primary",
  showFilename = true,
  isCopyable = true,
}: {
  variant?: TerminalVariant;
  activeTab?: keyof typeof sampleCodes;
  color?: string;
  showFilename?: boolean;
  isCopyable?: boolean;
}) {
  const currentSample = sampleCodes[activeTab] || sampleCodes.React;

  return (
    <div
      className={`w-full flex flex-col items-center justify-center min-h-[450px] ${variant === "glass" ? "bg-gradient-to-br from-indigo-500/80 via-purple-500/80 to-pink-500/80 rounded-2xl p-6 sm:p-12" : ""} relative z-10`}
    >
      <div className="w-full max-w-2xl mx-auto">
        <TerminalBlock
          key={`${variant}-${color}-${activeTab}`}
          code={currentSample.code}
          language={currentSample.language}
          filename={showFilename ? currentSample.filename : undefined}
          copyable={isCopyable}
          variant={variant}
          color={color}
        />
      </div>
    </div>
  );
}
