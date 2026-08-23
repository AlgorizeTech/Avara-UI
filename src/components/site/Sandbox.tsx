"use client";

import { useFramework } from "@/hooks/use-framework";
import { resolveSnippet, type Snippet } from "@/lib/snippet";
import { cn } from "@/lib/utils";
import type { BuiltinLanguage } from "shiki";
import {
  CodeBlockClient,
  isTransformable,
} from "@/components/site/code-block-client";
import CodeCopy, { type LanguageType } from "@/components/site/code-copy";
import {
  Code2,
  GripVertical,
  LayoutGrid,
  Link as LinkIcon,
  Monitor,
  MonitorPlay,
  RotateCcw,
  Smartphone,
  Tablet,
  Terminal,
  Maximize2,
} from "lucide-react";
import { SandboxFrame } from "@/components/site/SandboxFrame";
import {
  prefetchHighlight,
  warmHighlighter,
} from "@/components/custom/ui/code-renderer";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import {
  DEFAULT_SHOWCASE_COLOR,
  useShowcaseColorContext,
} from "@/components/site/showcase-color";
import React, { Fragment, useEffect, useId, useRef, useState } from "react";

/**
 * Hard floor for the preview viewport. Nothing — drag, keyboard, or the fluid
 * "100%" state on a sub-350px phone — renders the demo narrower than this; below
 * it the scale-to-fit math shrinks a real 350px viewport instead.
 */
const MIN_PREVIEW_WIDTH = 350;
// Standard breakpoint ranges: mobile < 640 <= tablet < 1024 <= desktop
const TABLET_MIN_WIDTH = 640;
const DESKTOP_MIN_WIDTH = 1024;
const SNAP_TO_FULL_THRESHOLD = 10;

type Device = "desktop" | "tablet" | "mobile";

/**
 * Every device button pins a REAL viewport width and lets the scale-to-fit
 * math shrink it into the available area. Desktop used to be "100%" (i.e.
 * whatever the docs column happened to be), so a desktop layout could never
 * be seen from a narrow screen — the one case tablet and mobile handled fine.
 * The Fit button returns to the fluid "100%" state at any time.
 */
const DESKTOP_PRESET_WIDTH = 1280;

const DEVICE_PRESETS: Record<Device, number> = {
  desktop: DESKTOP_PRESET_WIDTH,
  tablet: 768,
  mobile: 375,
};

const TAB_ICONS: Record<string, React.ReactNode> = {
  preview: <MonitorPlay className="w-4 h-4" />,
  usage: <Terminal className="w-4 h-4" />,
  component: <Code2 className="w-4 h-4" />,
  examples: <LayoutGrid className="w-4 h-4" />,
};

export interface SandboxTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  /** Rendered for non-sandbox tabs (code, usage, examples...). */
  content?: React.ReactNode;
  /**
   * A code snippet to render instead of `content`. Handing the Sandbox the
   * raw source (rather than a prebuilt code block) is what lets the TS/JS
   * switch live up in the header bar next to the tab pills.
   */
  code?: string;
  /** Language of `code`. Defaults to tsx. */
  lang?: BuiltinLanguage;
  /** Marks the tab that shows the sandboxed live preview. */
  resizable?: boolean;
}

export interface SandboxOptions {
  /** "Fit" button — snaps the preview back to a 100% fit-to-screen view. */
  fit?: boolean;
  /** @deprecated Renamed to `fit` when the zoom cycle became a single action. */
  zoom?: boolean;
  deviceSwitcher?: boolean;
  reset?: boolean;
}

/**
 * Tabbed component playground. The preview tab embeds /sandbox/[name] in an
 * iframe, so the demo runs as a REAL standalone page — its own window,
 * document, media queries, portals and scroll. Nothing that works on a real
 * device can break in the preview.
 *
 * `sandboxProps` are bridged live into the demo (postMessage), so multiple
 * Sandbox instances with different props render different variants of the
 * same registered demo.
 */
export function Sandbox({
  name,
  sandboxProps,
  tabs,
  options = {},
  minHeight = 550,
  maxHeight = 820,
}: {
  /** Registry name of the demo (src/preview/registry.tsx). */
  name: string;
  /** JSON-serializable props bridged into the demo, live. */
  sandboxProps?: Record<string, unknown>;
  tabs: SandboxTab[];
  options?: SandboxOptions;
  minHeight?: number;
  maxHeight?: number;
}) {
  const {
    fit: fitOption = options.zoom ?? true,
    deviceSwitcher = true,
    reset = true,
  } = options;

  const previewTab = tabs.find((t) => t.resizable) ?? tabs[0];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? "preview");

  // One selection shared by every code tab, so switching Usage → Code keeps
  // the reader in the language they picked.
  const [codeLanguage, setCodeLanguage] = useState<LanguageType>("tsx");

  // Responsive preview state (same semantics as the classic ComponentPreview)
  // Every preview opens fitted: fluid "100%", unscaled, filling the card edge
  // to edge. That is the visitor's OWN viewport, so the first thing they see is
  // the component exactly as it renders on the device they arrived on — no
  // preset width, no shrink-to-fit. The device buttons are there for anyone who
  // wants to check a class other than their own.
  const [previewWidth, setPreviewWidth] = useState<number | "100%">("100%");
  const [areaWidth, setAreaWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

  // Highlight every code tab while the reader is still on the preview, so
  // opening Usage or Code paints coloured on its first frame instead of
  // flashing raw text and reflowing when Shiki lands. Runs during idle time.
  useEffect(() => {
    warmHighlighter();
    for (const tab of tabs) {
      if (tab.code) prefetchHighlight(tab.code, tab.lang ?? "tsx");
    }
  }, [tabs]);

  // Track the available area width for icon sync / clamping / scale-to-fit.
  useEffect(() => {
    const area = areaRef.current;
    if (!area) return;
    const observer = new ResizeObserver((entries) => {
      // display:none while on other tabs reports 0 — keep the last real width
      if (entries[0].contentRect.width > 0) {
        setAreaWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(area);
    return () => observer.disconnect();
  }, []);

  const availableWidth = areaWidth === null ? null : Math.max(areaWidth - 1, 0);
  const viewportWidth =
    previewWidth === "100%"
      ? availableWidth === null
        ? null
        : Math.max(availableWidth, MIN_PREVIEW_WIDTH)
      : (previewWidth as number);

  // Wide device on a narrow area → keep the true viewport, shrink visually.
  const fitScale =
    viewportWidth !== null && availableWidth !== null && viewportWidth > availableWidth
      ? availableWidth / viewportWidth
      : 1;
  const visualScale = fitScale;
  /** The fluid state — the only one that fills the card edge to edge. On a
   *  sub-floor screen it is scaled rather than unscaled, but still edge to edge. */
  const isFitted = previewWidth === "100%";

  // Derived from the MEASURED width, including the fluid "100%" state — so on
  // first load the highlighted button is the visitor's own device class.
  const activeDevice: Device =
    viewportWidth === null
      ? "desktop"
      : viewportWidth < TABLET_MIN_WIDTH
        ? "mobile"
        : viewportWidth < DESKTOP_MIN_WIDTH
          ? "tablet"
          : "desktop";

  const applyWidth = (width: number, max: number) => {
    if (width >= max - SNAP_TO_FULL_THRESHOLD) {
      setPreviewWidth("100%");
    } else {
      // The floor wins over `max`: in an area narrower than 350px the preview
      // keeps a real 350px viewport and the scale-to-fit math shrinks it visually,
      // exactly like the mobile preset does.
      setPreviewWidth(Math.round(Math.max(Math.min(width, max), MIN_PREVIEW_WIDTH)));
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    applyWidth(e.clientX - rect.left - 1, rect.width);
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  const handleResizeKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const max = areaWidth ?? Infinity;
    const current =
      previewWidth === "100%" ? (viewportWidth ?? DESKTOP_MIN_WIDTH) : previewWidth;
    const step = e.shiftKey ? 64 : 16;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPreviewWidth(Math.round(Math.max(current - step, MIN_PREVIEW_WIDTH)));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      applyWidth(current + step, max);
    } else if (e.key === "Home") {
      e.preventDefault();
      setPreviewWidth(MIN_PREVIEW_WIDTH);
    } else if (e.key === "End") {
      e.preventDefault();
      setPreviewWidth("100%");
    }
  };

  const deviceButtons: Array<{ device: Device; icon: React.ReactNode; label: string }> = [
    {
      device: "desktop",
      icon: <Monitor className="w-4 h-4" />,
      label: `Desktop view (${DEVICE_PRESETS.desktop}px)`,
    },
    {
      device: "tablet",
      icon: <Tablet className="w-4 h-4" />,
      label: `Tablet view (${DEVICE_PRESETS.tablet}px)`,
    },
    {
      device: "mobile",
      icon: <Smartphone className="w-4 h-4" />,
      label: `Mobile view (${DEVICE_PRESETS.mobile}px)`,
    },
  ];

  // Visual box of the (possibly scaled) frame
  const visualWidth =
    viewportWidth === null ? null : Math.round(viewportWidth * visualScale);
  const isPreviewActive = activeTab === (previewTab?.id ?? "preview");
  const currentTab = tabs.find((t) => t.id === activeTab);
  const currentLang = currentTab?.lang ?? "tsx";
  // The switch shows only where it does something: a code tab whose source
  // actually carries types.
  const showLanguageSwitch =
    !isPreviewActive &&
    currentTab?.code !== undefined &&
    isTransformable(currentLang);

  return (
    <div className="w-full my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col not-prose relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-t-xl">
        {/* Left: tab pills */}
        <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer capitalize",
                activeTab === tab.id
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              )}
            >
              {tab.icon ?? TAB_ICONS[tab.id]} {tab.label}
            </button>
          ))}
        </div>

        {/* Right: the code tabs get the TS/JS switch in the same slot the
            preview tab gets its device controls. */}
        {showLanguageSwitch && (
          <CodeCopy
            className="ml-auto"
            selectedLanguage={codeLanguage}
            onLanguageChange={setCodeLanguage}
          />
        )}

        {/* Right: preview controls */}
        {isPreviewActive && (
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* True viewport width, plus how far it was shrunk to fit the
                column, which the Fit button snaps back to 100%. */}
            <span className="flex items-baseline gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400 min-w-[48px] justify-end tabular-nums whitespace-nowrap">
              <span>
                {viewportWidth === null
                  ? "—"
                  : `${Math.round(viewportWidth)}px`}
              </span>
              <span
                className={cn(
                  "text-[11px] hidden sm:inline-block",
                  fitScale < 1
                    ? "text-zinc-400 dark:text-zinc-500"
                    : "text-zinc-300 dark:text-zinc-600",
                )}
                title={
                  fitScale < 1
                    ? `Scaled to ${Math.round(fitScale * 100)}% to fit`
                    : "Shown at full size"
                }
              >
                {Math.round(fitScale * 100)}%
              </span>
            </span>

            {deviceSwitcher && (
              <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
                {deviceButtons.map(({ device, icon, label }) => (
                  <button
                    key={device}
                    onClick={() => setPreviewWidth(DEVICE_PRESETS[device])}
                    className={cn(
                      "p-1.5 rounded-md transition-all cursor-pointer",
                      activeDevice === device
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100"
                        : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                    )}
                    title={label}
                    aria-label={label}
                    aria-pressed={activeDevice === device}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            )}

            {/* Snaps back to the 100% fit-to-screen view from whatever device
                or drag width is active — and reads as selected while the
                preview is in that state, which is how every preview opens. */}
            {fitOption && (
              <button
                onClick={() => setPreviewWidth("100%")}
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm border",
                  isFitted
                    ? "bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border-zinc-300 dark:border-zinc-600"
                    : "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-700",
                )}
                title="Fit to screen (100%)"
                aria-label="Fit preview to screen"
                aria-pressed={isFitted}
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}

            {reset && (
              <button
                onClick={() => setResetKey((k) => k + 1)}
                className="h-8 w-8 flex items-center justify-center rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm border bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-700"
                title="Reload preview"
                aria-label="Reload preview"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative w-full bg-white dark:bg-[#09090b] rounded-b-xl">
        {/* The preview stays MOUNTED across tab switches (hidden, not removed)
            so the sandbox iframe never reloads when returning to Preview. */}
        <div
          ref={areaRef}
          className={cn(
            "flex items-stretch relative justify-start overflow-visible rounded-b-xl",
            "bg-zinc-50/50 dark:bg-[#020202]",
            !isPreviewActive && "hidden",
          )}
          style={{ minHeight }}
        >
            {/* Dashed Grid Background */}
            <div className="absolute inset-0 pointer-events-none rounded-b-xl overflow-hidden">
              <svg width="100%" height="100%">
                <defs>
                  <pattern
                    id="sandbox-dashed-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeDasharray="4 4"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill="url(#sandbox-dashed-grid)"
                  className="text-zinc-400/20 dark:text-white/10"
                />
              </svg>
            </div>

            <div
              /* +1px compensates the right border so the inner viewport is exact */
              style={{
                width:
                  isFitted
                    ? "100%"
                    : visualWidth === null
                      ? "100%"
                      : `${visualWidth + 1}px`,
                maxWidth: "100%",
              }}
              className={cn(
                "relative flex justify-center items-start transition-[width] ease-out",
                isDragging ? "duration-0" : "duration-300",
                "border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]",
                isFitted
                  ? "rounded-b-xl"
                  : "rounded-bl-xl rounded-r-none",
              )}
            >
              <div
                className={cn(
                  "w-full overflow-hidden",
                  isFitted ? "rounded-b-xl" : "rounded-bl-xl",
                  isDragging && "pointer-events-none select-none",
                )}
              >
                <SandboxFrame
                  name={name}
                  sandboxProps={sandboxProps}
                  viewportWidth={viewportWidth}
                  scale={visualScale}
                  resetKey={resetKey}
                  minHeight={minHeight}
                  maxHeight={maxHeight}
                />
              </div>

              {/* Drag Handle */}
              <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize preview"
                aria-valuemin={MIN_PREVIEW_WIDTH}
                aria-valuemax={areaWidth ? Math.round(areaWidth) : undefined}
                aria-valuenow={viewportWidth ? Math.round(viewportWidth) : undefined}
                tabIndex={0}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
                onPointerCancel={handlePointerEnd}
                onKeyDown={handleResizeKeyDown}
                className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-8 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-[3px] hidden sm:flex items-center justify-center cursor-ew-resize shadow-sm hover:shadow-md transition-shadow z-10 touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                <GripVertical className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          </div>

        {!isPreviewActive &&
          (currentTab?.code !== undefined ? (
            /* No height cap here: CodeBlocks sizes itself to the lines it is
               showing, so the panel opens without a scrollbar and only gains
               one once Show More adds lines past that height. */
            <div className="relative w-full overflow-hidden rounded-b-xl">
              <CodeBlockClient
                code={currentTab.code}
                lang={currentLang}
                selectedLanguage={codeLanguage}
                onLanguageChange={setCodeLanguage}
              />
            </div>
          ) : (
            <div className="relative w-full rounded-b-xl">
              {currentTab?.content}
            </div>
          ))}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  ExampleShowcase — shadcn-style stacked example gallery                    */
/*                                                                            */
/*  Purely additive: the Sandbox component above is unchanged, so pages that  */
/*  don't use ExampleShowcase are unaffected.                                 */
/* -------------------------------------------------------------------------- */

/**
 * Renders any number of named examples of the SAME registered demo
 * (src/preview/registry.tsx), each with its own title, optional subheading
 * and prop combination. Every example embeds the original Sandbox, so
 * example previews look identical to the classic showcase.
 *
 * Each Sandbox is gated behind an IntersectionObserver so below-fold
 * examples don't boot their iframe until scrolled near.
 *
 * Tabs per example are driven by the content you provide:
 *   - Preview: always
 *   - Usage:   when `usage` code string is given
 *   - Code:    when `code` code string is given
 *
 * `columns` controls the large-screen layout: 2 (default) lays examples out
 * side by side on lg+ screens; 1 stacks them vertically.
 */

/**
 * One line of the "What the props do" cheat sheet that sits above a preview.
 *
 * The point is that a reader can tell what a prop CHANGES without opening the
 * Usage tab: `prop` + `value` show the exact spelling to copy, `effect`
 * explains what happens when it is set — and, where it matters, what happens
 * when it is not.
 */
export interface PropNote {
  /**
   * Optional word or two placed BEFORE the badges so the row reads as one
   * sentence — `lead: "Use"` renders `Use variant = "ring" for a full track…`.
   */
  lead?: string;
  /** Prop name as written in JSX, e.g. `layout`. */
  prop: string;
  /**
   * The value this example uses, written the way you'd type it —
   * `"group-top"`, `{400}`, `true`. Omit for boolean props used bare, or when
   * the note is about the prop in general rather than one value.
   */
  value?: string;
  /** One short line on what setting it does. Backticks render as inline code. */
  effect: string;
}

export interface ShowcaseExample {
  title: string;
  /** One-line summary under the title. Backticks render as inline code. */
  subheading?: string;
  /** Short prop-by-prop cheat sheet rendered above the preview. */
  propNotes?: PropNote[];
  /** Anchor id override; defaults to a slug of the title. */
  id?: string;
  /** JSON-serializable props bridged into the sandbox demo for this preview. */
  props?: Record<string, unknown>;
  /**
   * Authored usage snippet — adds a Usage tab (TSX; JS toggle built in).
   *
   * A plain string is identical in every framework. Pass `{ nextjs, reactjs }`
   * only when the code genuinely differs — see src/lib/snippet.ts.
   */
  usage?: Snippet;
  /** Optional source snippet — adds a Code tab. Same string-or-map rule. */
  code?: Snippet;
  /** Per-example overrides for the Sandbox. */
  options?: SandboxOptions;
  minHeight?: number;
  maxHeight?: number;
}

/**
 * A ShowcaseExample whose snippets have already been resolved to one framework.
 *
 * This type is the seam: ExampleShowcase resolves `usage` and `code` once, and
 * everything below it — the cards, the code tabs, the TSX→JS transform — deals
 * only in plain strings and never has to know a framework exists.
 */
export type ResolvedShowcaseExample = Omit<ShowcaseExample, "usage" | "code"> & {
  usage?: string;
  code?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/**
 * Example prose is authored as plain strings inside a JS array, so MDX never
 * parses it and its backticks used to reach the page literally. This renders
 * the small slice of markdown that prose actually uses — `code` and **bold** —
 * so a prop name reads as a prop name.
 */
function renderInline(text: string): React.ReactNode {
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[0.85em] text-red-600 dark:bg-zinc-800 dark:text-red-400"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-zinc-700 dark:text-zinc-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part ? <Fragment key={i}>{part}</Fragment> : null;
  });
}

/**
 * Badge used for both halves of a prop reference — name and value alike.
 * Rendered with `data-badge`, which opts out of the global !important inline
 * <code> styling in globals.css; without it these classes never take effect.
 */
const PROP_BADGE =
  "inline-block rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-medium text-primary ring-1 ring-primary/20 [overflow-wrap:anywhere]";

/**
 * The prop cheat sheet. Runs on directly under the subheading — same text
 * block, no separate panel — so the reader picks up what each knob does while
 * still reading the intro, rather than treating it as a section to skip.
 *
 * The name and its value are badged so they stay findable inside the prose.
 */
function PropNotes({ notes }: { notes: PropNote[] }) {
  return (
    <dl className="mt-2 flex flex-col gap-1.5">
      {notes.map((note, i) => (
        <div
          key={`${note.prop}-${note.value ?? i}`}
          className="text-sm leading-6 text-zinc-500 dark:text-zinc-400"
        >
          <dt className="mr-1.5 inline-flex items-center gap-1 align-middle">
            {note.lead && <span className="mr-0.5">{note.lead}</span>}
            <code data-badge className={PROP_BADGE}>
              {note.prop}
            </code>
            {note.value !== undefined && (
              <>
                <span aria-hidden className="font-mono text-xs text-zinc-400">
                  =
                </span>
                <code data-badge className={PROP_BADGE}>
                  {note.value}
                </code>
              </>
            )}
          </dt>
          <dd className="inline">{renderInline(note.effect)}</dd>
        </div>
      ))}
    </dl>
  );
}

const toPascalCase = (str: string) =>
  str
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");

const generateFallbackUsage = (
  componentName: string,
  variantTitle: string,
  props?: Record<string, unknown>
): string => {
  const pascalName = toPascalCase(componentName);
  const cleanTitle = variantTitle.replace(/[^a-zA-Z0-9]/g, "");

  const propEntries = props
    ? Object.entries(props)
        .map(([key, val]) => {
          if (typeof val === "string") return `${key}="${val}"`;
          if (typeof val === "boolean") return val ? key : `${key}={false}`;
          return `${key}={${JSON.stringify(val)}}`;
        })
        .join(" ")
    : "";

  const propString = propEntries ? ` ${propEntries}` : "";

  return `import { ${pascalName} } from "@/components/custom/blocks/${pascalName}Block";

export default function ${cleanTitle}Demo() {
  return <${pascalName}${propString} className="w-full" />;
}`;
};

export interface SliderControl {
  name: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  defaultValue: number;
}

export function ExampleShowcase({
  name,
  examples,
  columns = 1,
  options,
  minHeight = 550,
  maxHeight = 1400,
  className,
  colorControl = false,
  defaultColor = DEFAULT_SHOWCASE_COLOR,
  colorProp = "color",
  colorLabel = "Theme Color",
  controls = [],
}: {
  /** Registry name of the demo (src/preview/registry.tsx). */
  name: string;
  examples: ShowcaseExample[];
  /** Previews per row on large screens. Default 2. */
  columns?: 1 | 2;
  /** Sandbox options applied to all examples (per-example wins). */
  options?: SandboxOptions;
  /** Defaults for all examples (per-example wins). */
  minHeight?: number;
  maxHeight?: number;
  className?: string;
  /**
   * Opts this gallery into the page's theme color: every example gets the
   * color bridged into its props. The control itself is drawn once per page,
   * by whichever opted-in gallery sits highest, so a page reads as one accent
   * switch at the top rather than a picker above every section.
   */
  colorControl?: boolean;
  /** Initial value of the color control. */
  defaultColor?: string;
  /** Demo prop the color is bridged into. */
  colorProp?: string;
  colorLabel?: string;
  /** Optional numerical range sliders for interactive property tuning. */
  controls?: SliderControl[];
}) {
  const shared = useShowcaseColorContext();
  const instanceId = useId();
  // Outside the docs layout there is no page-level provider, so a showcase
  // keeps its own color and draws its own picker.
  const [localColor, setLocalColor] = useState(defaultColor);
  const color = shared ? shared.color : localColor;
  const setColor = shared ? shared.setColor : setLocalColor;
  const ownsPicker = colorControl
    ? shared
      ? shared.claimPicker(instanceId)
      : true
    : false;

  const seededRef = useRef(false);
  useEffect(() => {
    if (!shared || !ownsPicker || seededRef.current) return;
    seededRef.current = true;
    if (defaultColor !== DEFAULT_SHOWCASE_COLOR) shared.setColor(defaultColor);
  }, [shared, ownsPicker, defaultColor]);

  // Snippets resolve once, here, against the framework in the URL. Everything
  // below this point works with plain strings, so the sandbox, the code tabs and
  // the TSX→JS transform needed no changes at all.
  const framework = useFramework();

  // Find component source code fallback from any example that explicitly provides it
  const fallbackCode = resolveSnippet(
    examples.find((ex) => ex.code)?.code,
    framework,
  );

  // Numerical slider control states
  const [controlValues, setControlValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    controls.forEach((ctrl) => {
      initial[ctrl.name] = ctrl.defaultValue;
    });
    return initial;
  });

  const handleControlChange = (name: string, value: number) => {
    setControlValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={cn("not-prose my-8 flex flex-col gap-6", className)}>
      {(ownsPicker || controls.length > 0) && (
        <div className="flex flex-col gap-5 p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl">
          {ownsPicker && (
            <ThemeColorPicker
              color={color}
              onChange={setColor}
              label={colorLabel}
              className="sm:max-w-sm"
            />
          )}

          {controls.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-3 border-t border-zinc-200/80 dark:border-zinc-800">
              {controls.map((ctrl) => {
                const val = controlValues[ctrl.name] ?? ctrl.defaultValue;
                const percentage = Math.min(
                  100,
                  Math.max(0, ((val - ctrl.min) / (ctrl.max - ctrl.min)) * 100)
                );
                return (
                  <div
                    key={ctrl.name}
                    className="flex flex-col gap-2 p-3 bg-white dark:bg-zinc-950/60 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl shadow-xs transition-shadow hover:shadow-sm"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                        {ctrl.label}
                      </span>
                      <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-medium border border-zinc-200/60 dark:border-zinc-700/50 shadow-2xs">
                        {val}
                      </span>
                    </div>
                    <div className="relative flex items-center h-6 w-full group touch-none">
                      {/* Custom Track Background */}
                      <div className="absolute inset-x-0 h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden pointer-events-none">
                        <div
                          className="h-full bg-primary transition-all duration-75"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      {/* Hidden Range Input overlay */}
                      <input
                        type="range"
                        min={ctrl.min}
                        max={ctrl.max}
                        step={ctrl.step ?? 1}
                        value={val}
                        onChange={(e) =>
                          handleControlChange(ctrl.name, parseFloat(e.target.value))
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                      />
                      {/* Custom Thumb Circle with Theme Accent Ring Glow */}
                      <div
                        className="absolute w-5 h-5 rounded-full bg-white dark:bg-zinc-900 border-2 border-primary ring-4 ring-primary/25 shadow-md flex items-center justify-center pointer-events-none transition-transform duration-75 group-hover:scale-120 active:scale-125"
                        style={{
                          left: `calc(${percentage}% - ${(percentage / 100) * 20}px)`,
                        }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 gap-10",
          columns === 2 && "lg:grid-cols-2 lg:gap-x-6",
        )}
      >
        {examples.map((example) => {
          let effectiveProps = { ...example.props, ...controlValues };
          if (colorControl) {
            effectiveProps[colorProp] = color;
          }

          const effectiveUsage =
            resolveSnippet(example.usage, framework) ??
            generateFallbackUsage(name, example.title, effectiveProps);

          const effectiveCode = resolveSnippet(example.code, framework) ?? fallbackCode;

          return (
            <ExampleCard
              key={example.id ?? slugify(example.title)}
              name={name}
              example={{
                ...example,
                props: effectiveProps,
                usage: effectiveUsage,
                code: effectiveCode,
              }}
              options={example.options ?? options}
              minHeight={example.minHeight ?? minHeight}
              maxHeight={example.maxHeight ?? maxHeight}
            />
          );
        })}
      </div>
    </div>
  );
}

function ExampleCard({
  name,
  example,
  options,
  minHeight,
  maxHeight,
}: {
  name: string;
  example: ResolvedShowcaseExample;
  options?: SandboxOptions;
  minHeight: number;
  maxHeight: number;
}) {
  const { title, subheading, propNotes, props, usage } = example;
  const anchor = example.id ?? slugify(title);

  // The Sandbox (and its iframe) mounts only once the card nears the viewport.
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || mounted) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [mounted]);

  const tabs: SandboxTab[] = [
    { id: "preview", label: "Preview", resizable: true },
  ];
  if (usage) {
    tabs.push({ id: "usage", label: "Usage", code: usage, lang: "tsx" });
  }
  // if (code) {
  //   tabs.push({ id: "component", label: "Component", code, lang: "tsx" });
  // }

  return (
    <section ref={rootRef} aria-labelledby={anchor} className="flex flex-col min-w-0">
      {/* Title + optional subheading */}
      <div>
        <h3
          id={anchor}
          className="scroll-m-20 group text-lg font-semibold text-zinc-900 dark:text-zinc-50"
        >
          <a href={`#${anchor}`} className="inline-flex items-center gap-2">
            {title}
            <LinkIcon className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h3>
        {subheading && (
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            {renderInline(subheading)}
          </p>
        )}
        {propNotes && propNotes.length > 0 && <PropNotes notes={propNotes} />}
      </div>

      {/* Sandbox has its own my-8 — tighten it to the heading. */}
      <div className="flex-1 [&>div]:!my-4">
        {mounted ? (
          <Sandbox
            name={name}
            sandboxProps={props}
            tabs={tabs}
            options={options}
            minHeight={minHeight}
            maxHeight={maxHeight}
          />
        ) : (
          <div
            className="my-4 w-full border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center justify-center bg-zinc-50/50 dark:bg-[#020202]"
            style={{ minHeight: minHeight + 58 /* header bar height */ }}
          >
            <div className="h-5 w-5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 border-t-transparent animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}