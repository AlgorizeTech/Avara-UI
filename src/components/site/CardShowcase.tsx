"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";
import { VariantTabs } from "@/components/site/VariantTabs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/custom/blocks/CardBlock";
import { ComponentPreview } from "@/components/site/ComponentPreview";
import { Bell, CreditCard, Download, Settings, Upload } from "lucide-react";
import { useState } from "react";

// --- TYPESCRIPT ENGINE CODE ---
const CARD_ENGINE_CODE_TS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> { variant?: "default" | "bordered" | "flat"; interactive?: boolean; }
export function Card({ className, variant = "bordered", interactive = false, children, ...props }: CardProps) {
  const variants = { default: "bg-white dark:bg-[#050505] shadow-sm", bordered: "bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 shadow-sm", flat: "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50" };
  return ( <div className={cn("rounded-xl text-zinc-950 dark:text-zinc-50 flex flex-col transition-all duration-200", variants[variant], interactive && "hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.98]", className)} {...props}>{children}</div> );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</div>;
}
export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("font-semibold leading-none tracking-tight text-lg", className)} {...props}>{children}</h3>;
}
export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props}>{children}</p>;
}
export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-6 pt-0 flex-1", className)} {...props}>{children}</div>;
}
export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-6 pt-0 mt-auto", className)} {...props}>{children}</div>;
}`;

// --- JAVASCRIPT ENGINE CODE (Hardcoded native ES6) ---
const CARD_ENGINE_CODE_JS = `"use client";

import { ShowcaseControlPanel } from "@/components/site/ShowcaseControlPanel";

import React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, variant = "bordered", interactive = false, children, ...props }) {
  const variants = {
    default: "bg-white dark:bg-[#050505] shadow-sm",
    bordered: "bg-white dark:bg-[#050505] border border-zinc-200 dark:border-zinc-800 shadow-sm",
    flat: "bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800/50"
  };
  return (
    <div
      className={cn(
        "rounded-xl text-zinc-950 dark:text-zinc-50 flex flex-col transition-all duration-200",
        variants[variant],
        interactive && "hover:shadow-md hover:-translate-y-0.5 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.98]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return <div className={cn("flex flex-col space-y-1.5 p-6", className)} {...props}>{children}</div>;
}
export function CardTitle({ className, children, ...props }) {
  return <h3 className={cn("font-semibold leading-none tracking-tight text-lg", className)} {...props}>{children}</h3>;
}
export function CardDescription({ className, children, ...props }) {
  return <p className={cn("text-sm text-zinc-500 dark:text-zinc-400", className)} {...props}>{children}</p>;
}
export function CardContent({ className, children, ...props }) {
  return <div className={cn("p-6 pt-0 flex-1", className)} {...props}>{children}</div>;
}
export function CardFooter({ className, children, ...props }) {
  return <div className={cn("flex items-center p-6 pt-0 mt-auto", className)} {...props}>{children}</div>;
}`;

export function CardShowcase() {
  const [variant, setVariant] = useState<"bordered" | "default" | "flat">(
    "bordered",
  );
  const [interactive, setInteractive] = useState(false);
  const [layout, setLayout] = useState<"standard" | "grid" | "stats">(
    "standard",
  );

  const generateUsageCode = () => {
    let propsStr = ``;
    if (variant !== "bordered") propsStr += ` variant="${variant}"`;
    if (interactive) propsStr += ` interactive`;

    if (layout === "standard") {
      return `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/custom/blocks/CardBlock";

export default function App() {
  return (
    <Card${propsStr} className="w-[350px]">
      <CardHeader>
        <CardTitle>Create Project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Your form or content here */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <button className="px-4 py-2 border rounded-md">Cancel</button>
        <button className="px-4 py-2 bg-black text-white rounded-md">Deploy</button>
      </CardFooter>
    </Card>
  );
}`;
    }

    if (layout === "stats") {
      return `import { Card, CardHeader, CardTitle, CardContent } from "@/components/custom/blocks/CardBlock";

export default function MetricGrid() {
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <Card${propsStr}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card>
      {/* Add more metric cards */}
    </div>
  );
}`;
    }

    return `// Configure card layouts based on your needs.`;
  };

  return (
    <div className="w-full flex flex-col gap-6 not-prose my-8">
      {/* --- CONTROL PANEL --- */}
      <ShowcaseControlPanel className="flex flex-col md:flex-row gap-6 p-5 rounded-xl z-0 relative">
        <VariantTabs
          variants={["bordered", "default", "flat"]}
          label="Variant"
          defaultValue={variant}
          onValueChange={(v) => setVariant(v as "bordered" | "default" | "flat")}
        />

        <VariantTabs
          variants={["standard", "grid", "stats"]}
          label="Layout Preview"
          defaultValue={layout}
          onValueChange={(v) => setLayout(v as "standard" | "grid" | "stats")}
        />

        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">
            Behavior
          </label>
          <div className="flex items-center h-full px-2">
            <button
              onClick={() => setInteractive(!interactive)}
              className={`px-4 py-1.5 text-sm font-medium rounded-md border transition-all ${
                interactive
                  ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-500/10 dark:border-indigo-500/30 dark:text-indigo-400"
                  : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
              }`}
            >
              Interactive Hover
            </button>
          </div>
        </div>
      </ShowcaseControlPanel>

      {/* --- PREVIEW AND CODE --- */}
      <ComponentPreview
        name="CardBlock"
        tsCode={CARD_ENGINE_CODE_TS}
        jsCode={CARD_ENGINE_CODE_JS}
        usageCode={generateUsageCode()}
        jsUsageCode={generateUsageCode()}
        framed
      >
        <div className="w-full flex items-center justify-center min-h-[400px] transition-colors duration-300 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-[#f8fafc] dark:bg-[#050505] p-6 relative z-10 overflow-hidden">
          {layout === "standard" && (
            <Card
              variant={variant}
              interactive={interactive}
              className="w-full max-w-sm"
            >
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>You have 3 unread messages.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
                  <Bell className="w-5 h-5 text-indigo-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      System Update
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      A new version is available.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/50 bg-zinc-50 dark:bg-zinc-900/20">
                  <Settings className="w-5 h-5 text-rose-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Account Notice
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Please verify your email address.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-zinc-100 dark:border-zinc-800/50 pt-6">
                <button className="w-full py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                  Mark all as read
                </button>
              </CardFooter>
            </Card>
          )}

          {layout === "grid" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <Card variant={variant} interactive={interactive}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-emerald-500" /> Download
                    Report
                  </CardTitle>
                  <CardDescription>
                    Export your analytics data as a CSV file for external
                    processing.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card variant={variant} interactive={interactive}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5 text-indigo-500" /> Import Data
                  </CardTitle>
                  <CardDescription>
                    Upload legacy customer profiles to merge into your active
                    CRM.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}

          {layout === "stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-4xl">
              <Card variant={variant} interactive={interactive}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500">
                    Total Revenue
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-emerald-500 font-medium mt-1">
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card variant={variant} interactive={interactive}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500">
                    Subscriptions
                  </CardTitle>
                  <Bell className="h-4 w-4 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-emerald-500 font-medium mt-1">
                    +180.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card variant={variant} interactive={interactive}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-zinc-500">
                    Active Now
                  </CardTitle>
                  <Settings className="h-4 w-4 text-zinc-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+573</div>
                  <p className="text-xs text-zinc-500 font-medium mt-1">
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </ComponentPreview>
    </div>
  );
}
