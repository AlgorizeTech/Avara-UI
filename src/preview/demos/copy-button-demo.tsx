"use client";

import {
  CopyButton,
  type CopyButtonSize,
  type CopyButtonVariant,
  CopyField,
} from "@/components/custom/blocks/CopyButtonBlock";
import { Link2, Terminal } from "lucide-react";

const VARIANTS: CopyButtonVariant[] = ["solid", "soft", "outline", "ghost"];
const SIZES: CopyButtonSize[] = ["sm", "md", "lg"];

const SNIPPET = `npx shadcn@latest add @algorize-ui/copy-button`;

export default function CopyButtonDemo({
  color = "primary",
  variant = "solid",
  size = "md",
  example = "basic",
}: {
  color?: string;
  variant?: CopyButtonVariant;
  size?: CopyButtonSize;
  /** Which preview to render. */
  example?: "basic" | "variants" | "sizes" | "icon" | "field" | "inset" | "code" | "labels";
}) {
  const frame = "w-full flex items-center justify-center min-h-[300px] px-6 relative z-10";

  if (example === "variants") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-4 min-h-[300px] px-6 relative z-10">
        {VARIANTS.map((v) => (
          <div key={v} className="flex flex-col items-center gap-3">
            <CopyButton value={`variant="${v}"`} variant={v} color={color} size={size} />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">{v}</span>
          </div>
        ))}
      </div>
    );
  }

  if (example === "sizes") {
    return (
      /* No min-height here, unlike the examples above: `items-end` gives the
         three sizes a common baseline, and inside a 300px box it would pin
         that baseline to the box's bottom edge — leaving the row sitting low
         in the preview. The row hugs its tallest item instead, and the
         sandbox stage centres it. */
      <div className="w-full flex flex-wrap items-end justify-center gap-4 px-6 relative z-10">
        {SIZES.map((s) => (
          <div key={s} className="flex flex-col items-center gap-3">
            <CopyButton value={`size="${s}"`} size={s} variant={variant} color={color} />
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500">{s}</span>
          </div>
        ))}
      </div>
    );
  }

  if (example === "icon") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-4 min-h-[300px] px-6 relative z-10">
        {VARIANTS.map((v) => (
          <CopyButton key={v} value="https://nexus.dev/u/johndoe" iconOnly variant={v} color={color} size={size} />
        ))}
      </div>
    );
  }

  if (example === "field") {
    return (
      <div className={frame}>
        <CopyField
          className="max-w-md"
          label="Profile link"
          value="https://nexus.dev/u/johndoe"
          color={color}
          size={size}
          buttonProps={{ label: "Copy Link", copiedLabel: "Copied!", variant }}
        />
      </div>
    );
  }

  if (example === "inset") {
    return (
      <div className={frame}>
        <CopyField
          className="max-w-md"
          label="Invite link"
          value="https://nexus.dev/invite/7f3a9c"
          inset
          prefix={<Link2 />}
          color={color}
          size={size}
        />
      </div>
    );
  }

  if (example === "code") {
    return (
      <div className={frame}>
        <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-white/10">
            <span className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <Terminal className="h-3.5 w-3.5" /> Terminal
            </span>
            <CopyButton
              value={SNIPPET}
              size="sm"
              variant="ghost"
              color={color}
              className="text-zinc-600 hover:bg-zinc-200/70 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-white/10 dark:hover:text-white"
            />
          </div>
          {/* `overflow-auto`, not `overflow-x-auto`: globals.css zeroes the
              padding of every bare `.overflow-x-auto` (it is the docs table
              wrapper class), which would strip this block's gutter. */}
          <pre className="overflow-auto px-4 py-4 text-[13px] leading-relaxed text-zinc-800 [scrollbar-width:none] dark:text-zinc-100">
            <code>{SNIPPET}</code>
          </pre>
        </div>
      </div>
    );
  }

  if (example === "labels") {
    return (
      <div className="w-full flex flex-wrap items-center justify-center gap-4 min-h-[300px] px-6 relative z-10">
        <CopyButton
          value="SUMMER-2026"
          label="Copy promo code"
          copiedLabel="Code copied"
          timeout={1000}
          variant={variant}
          color={color}
          size={size}
        />
        <CopyButton
          value="sk_live_51N2…"
          label="Reveal & copy key"
          copiedLabel="Key on clipboard"
          timeout={4000}
          variant="outline"
          color={color}
          size={size}
        />
      </div>
    );
  }

  return (
    <div className={frame}>
      <CopyButton value="https://nexus.dev/u/johndoe" label="Copy Link" variant={variant} color={color} size={size} />
    </div>
  );
}
