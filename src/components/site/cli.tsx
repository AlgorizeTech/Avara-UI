"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { FaYarn } from "react-icons/fa";
import { SiNpm, SiPnpm, SiBun } from "react-icons/si";
import { Copy, Check } from "lucide-react";
import {
  usePackageManager,
  type PackageManager,
  PM_COMMANDS,
} from "@/contexts/package-manager-context";

type CliProps = {
  command: string;
};

/**
 * Where `shadcn build` publishes the registry. Hard-coded rather than read from
 * `window.location.origin` for two reasons: the command has to keep working
 * when it is copied off a localhost or preview deployment, and deriving it on
 * the client only meant the server rendered a different string and hydration
 * mismatched.
 */
const REGISTRY_BASE_URL = "https://algorize-ui.vercel.app/r";

export const Cli = ({ command }: CliProps) => {
  const { packageManager: pm, setPackageManager: setPm } = usePackageManager();
  const [copied, setCopied] = useState(false);

  // 'add something.json' is expanded to the full published registry URL.
  const match = command.match(/^add\s+"?([\w-]+\.json)"?$/);
  const finalCommand = match
    ? `add ${REGISTRY_BASE_URL}/${match[1]}`
    : command;

  const fullCommand = `${PM_COMMANDS[pm]} shadcn@latest ${finalCommand}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullCommand);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full rounded-lg bg-zinc-100 dark:bg-zinc-950 relative overflow-hidden border border-zinc-200 dark:border-zinc-800">
      {/* PM Selector */}
      <div className="flex items-center justify-between py-2 bg-zinc-100 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800">
        <div
          role="tablist"
          aria-label="Package manager"
          className="flex items-center gap-1 sm:gap-2 px-2"
        >
          {(Object.keys(PM_COMMANDS) as PackageManager[]).map((name) => {
            const isActive = name === pm;
            return (
              <button
                key={name}
                onClick={() => setPm(name)}
                className={cn(
                  "flex min-w-0 cursor-pointer items-center gap-1 rounded-t-lg border-b-2 px-2 py-2 text-sm font-medium transition-all duration-200 sm:px-4",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400",
                  isActive
                    ? "border-amber-400 bg-white font-bold text-zinc-900 shadow-sm dark:bg-zinc-900/80 dark:text-zinc-50"
                    : "border-transparent text-zinc-500 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/60 dark:hover:text-zinc-200"
                )}
                aria-selected={isActive}
                role="tab"
                tabIndex={isActive ? 0 : -1}
              >
                {/* Icon for each package manager with color/fade */}
                {name === "npm" && (
                  <SiNpm size={18} color={isActive ? "#CB3837" : "#666"} />
                )}
                {name === "pnpm" && (
                  <SiPnpm size={18} color={isActive ? "#F9DC3E" : "#666"} />
                )}
                {name === "yarn" && (
                  <FaYarn size={18} color={isActive ? "#2C8EBB" : "#666"} />
                )}
                {name === "bun" && (
                  <SiBun size={18} color={isActive ? "#FBF0DF" : "#666"} />
                )}
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Command row. The button and its fade live here, as siblings of the
          scroll region rather than inside it — an absolute child of a scroll
          container scrolls away with the content, and any vertical offset on it
          turns the container's implied `overflow-y: auto` into a real scrollbar. */}
      <div className="relative bg-white dark:bg-zinc-950">
        {/* Deliberately not Tailwind's `overflow-x-auto` class: globals.css
            targets that bare class name with !important table-wrapper styles
            (1.5rem block margins, an 8px gray-track scrollbar). */}
        <div className="min-w-0 max-w-full py-3 pl-4 pr-14 text-left font-mono text-sm font-medium whitespace-nowrap [overflow-x:auto] [overflow-y:hidden] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <span className="text-amber-400">{PM_COMMANDS[pm]}</span>{" "}
          <span className="text-teal-500">shadcn@latest</span>{" "}
          <span className="text-zinc-700 dark:text-zinc-300">
            {finalCommand}
          </span>
        </div>

        {/* Fades the command out beneath the button so a long, scrolled command
            never collides with the icon. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/90 to-transparent dark:from-zinc-950 dark:via-zinc-950/90"
        />

        <button
          onClick={handleCopy}
          className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-md border border-zinc-200/80 bg-white/60 text-zinc-500 backdrop-blur-sm transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 sm:right-3 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
          title={copied ? "Copied!" : "Copy command"}
          aria-label={copied ? "Copied!" : "Copy command"}
        >
          {copied ? (
            <Check size={16} className="text-green-500" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
    </div>
  );
};
