"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/custom/blocks/CollapsibleBlock";
import {
  Bell,
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  Shield,
} from "lucide-react";

const colorMap: Record<string, string> = {
  indigo: "#4f46e5",
  rose: "#e11d48",
  emerald: "#10b981",
  zinc: "#3f3f46",
  amber: "#f59e0b",
  blue: "#3b82f6",
};

const getThemeColor = (color: string) => {
  if (color.startsWith("#")) return color;
  return colorMap[color] || "var(--primary)";
};

export default function CollapsibleDemo({
  layout = "basic",
  color = "primary",
}: {
  layout?: "basic" | "settings" | "filetree" | "minimal" | "disabled";
  color?: string;
}) {
  const themeColor = getThemeColor(color);
  const containerStyle =
    color && color !== "primary" && color !== "default"
      ? ({ "--primary": themeColor } as React.CSSProperties)
      : undefined;

  return (
    <div
      style={containerStyle}
      className="w-full flex items-center justify-center min-h-[400px] relative z-10 overflow-hidden"
    >
      {layout === "minimal" && (
        <div className="w-full max-w-md">
          <Collapsible>
            <CollapsibleTrigger className="p-2 border border-zinc-200 dark:border-zinc-800 rounded font-medium hover:bg-primary/5 hover:border-primary/40 hover:text-primary transition-colors">
              Click to Expand
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 border border-zinc-200 dark:border-zinc-800 mt-2 rounded text-sm text-zinc-600 dark:text-zinc-400">
                This content was hidden!
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {layout === "disabled" && (
        <div className="w-full max-w-md space-y-4">
          <Collapsible
            disabled
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm opacity-60"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-zinc-900 dark:text-zinc-100 group cursor-not-allowed">
              Billing history (locked on the free plan)
              <ChevronDown className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-3">
                You will never see this — the trigger ignores clicks.
              </p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm hover:border-primary/30 transition-colors">
            <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-zinc-900 dark:text-zinc-100 group">
              Invoices (enabled)
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-3">
                This one still opens, so you can compare the two.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {layout === "basic" && (
        <div className="w-full max-w-md space-y-4">
          <Collapsible
            defaultOpen
            className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm hover:border-primary/40 data-[state=open]:border-primary/40 transition-colors"
          >
            <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-zinc-900 dark:text-zinc-100 group">
              <span className="group-hover:text-primary transition-colors">
                Can I use this UI kit in open source?
              </span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-3">
                Absolutely! This code is completely dependency-free and
                yours to own. Copy it into your personal, commercial, or
                open-source repositories.
              </p>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm hover:border-primary/40 data-[state=open]:border-primary/40 transition-colors">
            <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-zinc-900 dark:text-zinc-100 group">
              <span className="group-hover:text-primary transition-colors">
                How does the animation work?
              </span>
              <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-primary transition-all duration-200 group-data-[state=open]:rotate-180 group-data-[state=open]:text-primary" />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 pt-3">
                It uses a modern CSS technique: transitioning
                `grid-template-rows` from `0fr` to `1fr`. This allows smooth
                height animation without needing Javascript to measure
                elements.
              </p>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {layout === "settings" && (
        <div className="w-full max-w-lg space-y-4">
          <Collapsible
            defaultOpen
            className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden hover:border-primary/40 transition-colors"
          >
            <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                    Push Notifications
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Manage your alert preferences
                  </p>
                </div>
              </div>
              <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-primary group-data-[state=open]:hidden transition-colors">
                Configure
              </div>
              <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-primary hidden group-data-[state=open]:block transition-colors">
                Close
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/50 mt-2 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm text-zinc-700 dark:text-zinc-300">
                    Email Alerts
                  </label>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="accent-primary w-4 h-4"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label className="text-sm text-zinc-700 dark:text-zinc-300">
                    SMS Alerts
                  </label>
                  <input
                    type="checkbox"
                    className="accent-primary w-4 h-4"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          <Collapsible className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm overflow-hidden hover:border-primary/40 transition-colors">
            <CollapsibleTrigger className="w-full flex items-center justify-between p-5 hover:bg-primary/5 dark:hover:bg-primary/10 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white group-hover:text-primary transition-colors">
                    Security & API
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Tokens and authentication
                  </p>
                </div>
              </div>
              <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-primary group-data-[state=open]:hidden transition-colors">
                Configure
              </div>
              <div className="text-xs font-medium text-zinc-400 dark:text-zinc-500 group-hover:text-primary hidden group-data-[state=open]:block transition-colors">
                Close
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-5 border-t border-zinc-100 dark:border-zinc-800/50 mt-2 space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                    Production Key
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value="sk_live_123456789"
                      readOnly
                      className="flex-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md p-2 text-sm text-zinc-600"
                    />
                    <button className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-md">
                      Roll
                    </button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {layout === "filetree" && (
        <div className="w-full max-w-sm bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 shadow-sm font-mono text-sm">
          <div className="space-y-1">
            {/* Level 1: src */}
            <Collapsible defaultOpen>
              <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-primary/10 dark:hover:bg-primary/15 rounded-md text-zinc-700 dark:text-zinc-300 group transition-colors">
                <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-90 group-hover:text-primary" />
                <Folder className="w-4 h-4 text-primary shrink-0" />
                <span className="group-hover:text-primary transition-colors">src</span>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 mt-1 mb-1">
                  {/* Level 2: app */}
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-primary/10 dark:hover:bg-primary/15 rounded-md text-zinc-700 dark:text-zinc-300 group relative z-10 transition-colors">
                      <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-90 group-hover:text-primary" />
                      <Folder className="w-4 h-4 text-primary shrink-0" />
                      <span className="group-hover:text-primary transition-colors">app</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 mt-1 mb-1">
                        <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary rounded-md cursor-pointer ml-6 relative z-10 transition-colors">
                          <File className="w-4 h-4 shrink-0" /> layout.tsx
                        </div>
                        <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary rounded-md cursor-pointer ml-6 relative z-10 transition-colors">
                          <File className="w-4 h-4 shrink-0" /> page.tsx
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Level 2: components */}
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center justify-start gap-2 w-full p-1.5 hover:bg-primary/10 dark:hover:bg-primary/15 rounded-md text-zinc-700 dark:text-zinc-300 group relative z-10 transition-colors">
                      <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform duration-200 group-data-[state=open]:rotate-90 group-hover:text-primary" />
                      <Folder className="w-4 h-4 text-primary shrink-0" />
                      <span className="group-hover:text-primary transition-colors">components</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="pl-[22px] space-y-1 relative before:absolute before:left-[11px] before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800 mt-1 mb-1">
                        <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary rounded-md cursor-pointer ml-6 relative z-10 transition-colors">
                          <File className="w-4 h-4 shrink-0" /> Button.tsx
                        </div>
                        <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary rounded-md cursor-pointer ml-6 relative z-10 transition-colors">
                          <File className="w-4 h-4 shrink-0" />{" "}
                          Collapsible.tsx
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Root Files */}
            <div className="flex items-center gap-2 p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-primary/10 dark:hover:bg-primary/15 hover:text-primary rounded-md cursor-pointer ml-[22px] transition-colors">
              <File className="w-4 h-4 shrink-0" /> package.json
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
