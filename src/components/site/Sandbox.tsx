"use client";

import { useFramework } from "@/hooks/use-framework";
import {
  resolveMotion,
  resolveSnippet,
  resolveUsage,
  type ShowcaseSnippet,
} from "@/lib/snippet";
import { useMotionLibrary } from "@/contexts/motion-library-context";
import { MotionLibraryTabs } from "@/components/site/motion-library-tabs";
import { sandboxNames } from "@/preview/names";
import { cn } from "@/lib/utils";
import type { BuiltinLanguage } from "shiki";
import {
  CODE_SURFACE,
  CodeBlockClient,
  isTransformable,
} from "@/components/site/code-block-client";
import { motion, useReducedMotion } from "motion/react";
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
  MoveHorizontal,
  X,
} from "lucide-react";
import { SandboxFrame } from "@/components/site/SandboxFrame";
import { prefetchHighlight, warmHighlighter } from "@/components/custom/ui/code-renderer-core";
import { ThemeColorPicker } from "@/components/site/ThemeColorPicker";
import { toBlockColor } from "@/lib/accent";
import { slugify } from "@/lib/open-in-v0";
import { OpenInV0Button, v0ItemFor } from "@/components/site/open-in-v0-button";
import {
  ShowcaseControlCard,
  ShowcaseSliders,
  type SliderControl,
} from "@/components/site/ShowcaseSliders";
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

/**
 * Floor for the fluid "100%" state on a desktop-class screen. A desktop visitor
 * should land on the desktop tab even when the docs column is narrower than a
 * desktop viewport, so the fluid state never drops below this: a column wider
 * than 1080 still fills edge to edge at a true 100%, a narrower one keeps a
 * real 1080px viewport and lets the scale-to-fit math shrink it.
 */
const DESKTOP_MIN_PREVIEW_WIDTH = 1080;

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
  /** Fullscreen button — opens the demo in a chrome-free full-viewport modal. */
  fullscreen?: boolean;
  deviceSwitcher?: boolean;
  reset?: boolean;
  /** Open-in-v0 button — shown only for examples with a built v0 item. */
  openInV0?: boolean;
}

/**
 * Whether the VISITOR's screen is desktop-class — not the preview area, which
 * is only ever a fraction of it. Null until the first client effect so the
 * server render and first paint stay neutral.
 */
function useIsDesktopScreen() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const sync = () => setIsDesktop(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return isDesktop;
}

/**
 * The page-level duties of the fullscreen preview: nothing behind it scrolls,
 * Escape leaves, focus moves to the close button and returns to whatever
 * opened it. Kept out of the render path so the overlay itself is just CSS on
 * the preview the reader was already looking at.
 */
function useFullscreenOverlay(
  active: boolean,
  closeRef: React.RefObject<HTMLButtonElement | null>,
  onExit: () => void,
) {
  const onExitRef = useRef(onExit);
  onExitRef.current = onExit;

  useEffect(() => {
    if (!active) return;

    const opener = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onExitRef.current();
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      opener?.focus?.();
    };
  }, [active, closeRef]);
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
  accent,
  tabs,
  options = {},
  minHeight = 550,
  maxHeight = 820,
  motionSwitch = false,
  v0Item,
}: {
  /** Registry name of the demo (src/preview/registry.tsx). */
  name: string;
  /** JSON-serializable props bridged into the demo, live. */
  sandboxProps?: Record<string, unknown>;
  /**
   * This preview's example as a v0 item (`<name>/<example id>`, see
   * src/lib/open-in-v0.ts). Draws the Open-in-v0 button after fullscreen.
   */
  v0Item?: string;
  /** Page colour-picker value, applied as theme tokens inside the frame. */
  accent?: string;
  tabs: SandboxTab[];
  options?: SandboxOptions;
  minHeight?: number;
  maxHeight?: number;
  /**
   * Draws the GSAP / Motion switch in the bar, for a component that
   * ships both builds. The caller swaps `name` and the code tabs; the switch
   * only writes the page-wide pick.
   */
  motionSwitch?: boolean;
}) {
  const {
    fullscreen: fullscreenOption = true,
    deviceSwitcher = true,
    reset = true,
    openInV0 = true,
  } = options;

  const previewTab = tabs.find((t) => t.resizable) ?? tabs[0];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? "preview");

  // One selection shared by every code tab, so switching Usage → Code keeps
  // the reader in the language they picked.
  const [codeLanguage, setCodeLanguage] = useState<LanguageType>("tsx");

  // Responsive preview state (same semantics as the classic ComponentPreview)
  // Every preview opens fitted: fluid "100%", filling the card edge to edge.
  // That is the visitor's OWN viewport, so the first thing they see is the
  // component as it renders on the device they arrived on — except on a desktop
  // screen, where the fluid state is floored at DESKTOP_MIN_PREVIEW_WIDTH so a
  // desktop visitor lands on a real desktop viewport (and the desktop tab)
  // even though the docs column is narrower than one. The device buttons are
  // there for anyone who wants to check a class other than their own.
  const [previewWidth, setPreviewWidth] = useState<number | "100%">("100%");
  const [areaWidth, setAreaWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  // The active tab and device each get a pill that slides between options.
  // A page shows several cards, so the layoutIds are scoped per instance.
  const pillId = useId();
  const reduceMotion = useReducedMotion();
  const pillTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34 };
  const areaRef = useRef<HTMLDivElement>(null);
  const closeFullscreenRef = useRef<HTMLButtonElement>(null);

  /**
   * Height the card holds on to while its preview is away being fullscreen.
   * The preview leaves the flow, so without this the page behind would shrink
   * by the height of every open card — and a shorter document clamps the
   * scroll position, which the reader would land on when they close it.
   */
  const [parkedHeight, setParkedHeight] = useState<number | null>(null);

  useFullscreenOverlay(isFullscreen, closeFullscreenRef, () =>
    setIsFullscreen(false),
  );

  const openFullscreen = () => {
    setParkedHeight(areaRef.current?.offsetHeight ?? null);
    setIsFullscreen(true);
  };

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
  const isDesktopScreen = useIsDesktopScreen();

  // Floor for the fluid state. A desktop visitor gets a desktop viewport even
  // when the docs column is narrower than one; every other screen keeps the
  // hard 350px floor and its own column width.
  const fluidFloor = isDesktopScreen
    ? DESKTOP_MIN_PREVIEW_WIDTH
    : MIN_PREVIEW_WIDTH;

  const viewportWidth =
    previewWidth === "100%"
      ? availableWidth === null
        ? null
        : Math.max(availableWidth, fluidFloor)
      : (previewWidth as number);

  // Wide device on a narrow area → keep the true viewport, shrink visually.
  const fitScale =
    viewportWidth !== null && availableWidth !== null && viewportWidth > availableWidth
      ? availableWidth / viewportWidth
      : 1;
  const visualScale = fitScale;
  /** The fluid state — the only one that fills the card edge to edge. When the
   *  column is narrower than the floor (a sub-350px phone, or any column under
   *  1080 on desktop) it is scaled rather than unscaled, but still edge to edge. */
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

  /** Fit lands on the desktop floor rather than a true 100% — say so. */
  const fitLandsOnDesktopFloor =
    availableWidth !== null &&
    fluidFloor > MIN_PREVIEW_WIDTH &&
    availableWidth < fluidFloor;
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
    // The install box's anatomy — an ink-tint shell, a slim bar, the content
    // on an inset panel — with its own accents: a hairline ring and a larger
    // radius on the shell, a sliding pill (not an underline) for the tabs, and
    // the active tab's icon in the primary colour.
    <div className="w-full my-8 rounded-2xl bg-foreground/[0.03] ring-1 ring-inset ring-foreground/[0.05] flex flex-col not-prose relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 min-h-12 py-2 pl-2 pr-2.5">
        {/* Left: tab pills */}
        <div className="flex items-center gap-0.5">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-1.5 sm:gap-2 h-8 px-2.5 sm:px-3 text-[13px] font-medium rounded-lg transition-colors cursor-pointer capitalize",
                  isActive
                    ? "text-foreground"
                    : "text-foreground/45 hover:text-foreground/80",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId={`${pillId}-tab`}
                    transition={pillTransition}
                    aria-hidden
                    className="absolute inset-0 rounded-lg bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-foreground/[0.06]"
                  />
                )}
                <span
                  className={cn(
                    "relative flex items-center [&_svg]:size-3.5 transition-colors",
                    isActive && "text-primary",
                  )}
                >
                  {tab.icon ?? TAB_ICONS[tab.id]}
                </span>
                <span className="relative">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: the build switch on every tab of a dual component (it drives
            the preview AND the code), then the code tabs' TS/JS switch in the
            same slot the preview tab gets its device controls. */}
        <div className="ml-auto flex flex-wrap items-center justify-end gap-2 sm:gap-3">
        {motionSwitch && <MotionLibraryTabs compact />}

        {showLanguageSwitch && (
          <CodeCopy
            selectedLanguage={codeLanguage}
            onLanguageChange={setCodeLanguage}
          />
        )}

        {/* Right: preview controls */}
        {isPreviewActive && (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* True viewport width, plus how far it was shrunk to fit the
                column, which the Fit button snaps back to 100%. */}
            <span className="flex items-baseline gap-1.5 font-mono text-[11px] text-foreground/50 min-w-[48px] justify-end tabular-nums whitespace-nowrap">
              <span>
                {viewportWidth === null
                  ? "—"
                  : `${Math.round(viewportWidth)}px`}
              </span>
              <span
                className={cn(
                  "text-[11px] hidden sm:inline-block",
                  fitScale < 1
                    ? "text-foreground/35"
                    : "text-foreground/25",
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
              <div className="flex items-center gap-0.5 bg-foreground/[0.04] p-0.5 rounded-lg">
                {deviceButtons.map(({ device, icon, label }) => (
                  <button
                    key={device}
                    onClick={() => setPreviewWidth(DEVICE_PRESETS[device])}
                    className={cn(
                      "relative p-1.5 rounded-md transition-colors cursor-pointer",
                      activeDevice === device
                        ? "text-foreground"
                        : "text-foreground/45 hover:text-foreground/80",
                    )}
                    title={label}
                    aria-label={label}
                    aria-pressed={activeDevice === device}
                  >
                    {activeDevice === device && (
                      <motion.span
                        layoutId={`${pillId}-device`}
                        transition={pillTransition}
                        aria-hidden
                        className="absolute inset-0 rounded-md bg-background shadow-[0_1px_2px_rgb(0_0_0/0.06)] ring-1 ring-foreground/[0.06]"
                      />
                    )}
                    <span className="relative flex">{icon}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Snaps back to the 100% fit-to-screen view from whatever device
                or drag width is active — and reads as selected while the
                preview is in that state, which is how every preview opens. */}
            {false && (
              <button
                onClick={() => setPreviewWidth("100%")}
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm border",
                  isFitted
                    ? "bg-foreground/[0.05] dark:bg-foreground/[0.12] text-foreground border-foreground/15 dark:border-foreground/20"
                    : "bg-card dark:bg-foreground/[0.08] hover:bg-foreground/[0.05] dark:hover:bg-foreground/[0.12] text-foreground/55 hover:text-foreground/80 border-border dark:border-foreground/15",
                )}
                title={
                  fitLandsOnDesktopFloor
                    ? `Fit to screen (${fluidFloor}px desktop viewport)`
                    : "Fit to screen (100%)"
                }
                aria-label="Fit preview to screen"
                aria-pressed={isFitted}
              >
                <MoveHorizontal className="w-4 h-4" />
              </button>
            )}

            {/* Fullscreen: the SAME running preview expands to a chrome-free
                overlay at the real window size — the frame stays put in the
                DOM and only its wrapper changes, so the demo is never torn
                down and reloaded. The in-card preview is always a fraction of
                the window and often scaled; this is the only view that shows
                the component at true screen scale. */}
            {fullscreenOption && (
              <button
                onClick={openFullscreen}
                className="h-8 w-8 flex items-center justify-center rounded-lg transition-colors active:scale-95 cursor-pointer text-foreground/45 hover:text-foreground hover:bg-foreground/[0.06] [&_svg]:size-3.5"
                title="Open fullscreen preview"
                aria-label="Open fullscreen preview"
                aria-haspopup="dialog"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}

            {reset && (
              <button
                onClick={() => setResetKey((k) => k + 1)}
                className="h-8 w-8 flex items-center justify-center rounded-lg transition-colors active:scale-95 cursor-pointer text-foreground/45 hover:text-foreground hover:bg-foreground/[0.06] [&_svg]:size-3.5"
                title="Reload preview"
                aria-label="Reload preview"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Main Content Area — an inset panel inside the shell. Not clipped:
          the drag handle hangs over the stage's right edge. */}
      <div className="relative w-full px-1.5 pb-1.5">
        {/* The preview stays MOUNTED across tab switches (hidden, not removed)
            so the sandbox iframe never reloads when returning to Preview. */}
        <div
          ref={areaRef}
          className={cn(
            "flex items-stretch relative justify-start overflow-visible rounded-xl ring-1 ring-foreground/[0.05]",
            "bg-foreground/[0.015] dark:bg-preview-stage",
            !isPreviewActive && "hidden",
          )}
          style={{
            minHeight: isFullscreen ? (parkedHeight ?? minHeight) : minHeight,
          }}
        >
            {/* Dashed Grid Background */}
            <div className="absolute inset-0 pointer-events-none rounded-xl overflow-hidden">
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
                  className="text-foreground/[0.08] dark:text-foreground/10"
                />
              </svg>
            </div>

            <div
              /* Fullscreen is this same element pinned to the viewport: the
                 frame below keeps its place in the DOM, so the demo is resized
                 rather than reloaded. */
              role={isFullscreen ? "dialog" : undefined}
              aria-modal={isFullscreen ? true : undefined}
              aria-label={isFullscreen ? `${name} fullscreen preview` : undefined}
              /* +1px compensates the right border so the inner viewport is exact */
              style={
                isFullscreen
                  ? undefined
                  : {
                      width:
                        isFitted
                          ? "100%"
                          : visualWidth === null
                            ? "100%"
                            : `${visualWidth + 1}px`,
                      maxWidth: "100%",
                    }
              }
              className={cn(
                "flex justify-center bg-preview-stage",
                isFullscreen
                  ? "fixed inset-0 z-[9999] items-stretch"
                  : [
                      "relative items-start transition-[width] ease-out",
                      isDragging ? "duration-0" : "duration-300",
                      "border-r border-border",
                      isFitted ? "rounded-xl" : "rounded-l-xl rounded-r-none",
                    ],
              )}
            >
              <div
                className={cn(
                  "w-full overflow-hidden",
                  isFullscreen
                    ? "h-full"
                    : [
                        isFitted ? "rounded-xl" : "rounded-l-xl",
                        isDragging && "pointer-events-none select-none",
                      ],
                )}
              >
                <SandboxFrame
                  name={name}
                  sandboxProps={sandboxProps}
                  accent={accent}
                  viewportWidth={isFullscreen ? null : viewportWidth}
                  scale={isFullscreen ? 1 : visualScale}
                  resetKey={resetKey}
                  minHeight={minHeight}
                  maxHeight={maxHeight}
                  fill={isFullscreen}
                  className={isFullscreen ? "h-full" : undefined}
                />
              </div>

              {/* Open in v0: this example's code, props and variant, in the
                  reader's current theme — a new chat in a new tab. A glass
                  pill on the stage's corner; transform-gpu lifts it over an
                  iframe whose document composites, like the fullscreen close. */}
              {openInV0 && v0Item && !isFullscreen && (
                <OpenInV0Button
                  item={v0Item}
                  accent={accent}
                  showLabel
                  className="absolute bottom-3 right-3 z-10 transform-gpu flex h-8 items-center gap-1.5 rounded-full px-3 text-[12px] font-medium whitespace-nowrap text-foreground/70 hover:text-foreground bg-background/60 backdrop-blur-md backdrop-saturate-150 ring-1 ring-foreground/10 shadow-[0_2px_12px_rgb(0_0_0/0.08)] transition-colors active:scale-95 cursor-pointer"
                />
              )}

              {/* The only chrome in fullscreen. transform-gpu gives it its own
                  compositing layer, which an iframe whose document composites
                  (GSAP, video, transforms) cannot paint over. */}
              {isFullscreen && (
                <button
                  ref={closeFullscreenRef}
                  type="button"
                  onClick={() => setIsFullscreen(false)}
                  className={cn(
                    "fixed top-4 right-4 z-10 transform-gpu h-10 w-10 flex items-center justify-center rounded-full backdrop-blur-md shadow-lg transition-all active:scale-95 cursor-pointer",
                    // The stage behind is the demo's own surface — near-white
                    // or near-black — so the button carries its own contrast
                    // rather than borrowing any.
                    "bg-foreground/[0.045] border border-foreground/15 text-foreground/80 hover:bg-card hover:text-foreground",
                    "dark:bg-foreground/[0.072] dark:border-foreground/20 dark:text-foreground/80 dark:hover:bg-foreground/[0.12] dark:hover:text-foreground",
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                  )}
                  title="Close fullscreen preview (Esc)"
                  aria-label="Close fullscreen preview"
                >
                  <X className="w-5 h-5" />
                </button>
              )}

              {/* Drag Handle — a width to drag is a card idea, not a screen one. */}
              {!isFullscreen && (
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
                  className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-5 h-8 bg-card dark:bg-foreground/[0.08] border border-border dark:border-foreground/15 rounded-[3px] hidden sm:flex items-center justify-center cursor-ew-resize shadow-sm hover:shadow-md transition-shadow z-10 touch-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <GripVertical className="w-3.5 h-3.5 text-foreground/40" />
                </div>
              )}
            </div>
          </div>

        {!isPreviewActive &&
          (currentTab?.code !== undefined ? (
            /* No height cap here: CodeBlocks sizes itself to the lines it is
               showing, so the panel opens without a scrollbar and only gains
               one once Show More adds lines past that height. */
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-xl bg-background ring-1 ring-foreground/[0.05]",
                CODE_SURFACE,
              )}
            >
              <CodeBlockClient
                code={currentTab.code}
                lang={currentLang}
                selectedLanguage={codeLanguage}
                onLanguageChange={setCodeLanguage}
              />
            </div>
          ) : (
            <div className="relative w-full rounded-xl bg-background ring-1 ring-foreground/[0.05]">
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
  usage?: ShowcaseSnippet;
  /**
   * Component source — adds a Code tab. Same string-or-map rule; a component
   * with a Motion twin passes `{ gsap, motion }` (`extractMotionCode`)
   * so the tab follows the build switch.
   */
  code?: ShowcaseSnippet;
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

/**
 * Example prose is authored as plain strings inside a JS array, so MDX never
 * parses it and its backticks used to reach the page literally. This renders
 * the small slice of markdown that prose actually uses — `code` and **bold** —
 * so a prop name reads as a prop name.
 */
function renderInline(text?: string): React.ReactNode {
  if (!text) return null;
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={i}
          className="rounded bg-primary/10 px-1.5 py-0.5 font-mono text-[0.85em] text-primary"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-foreground/80">
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
 *
 * Inline rather than inline-block so a long badge wraps at word boundaries
 * like the surrounding text; `box-decoration-break: clone` repeats the pill
 * background and ring on each line it spans. Kept in step with BADGE in
 * installation.tsx.
 */
const PROP_BADGE =
  "inline rounded-md bg-primary/10 px-1.5 py-0.5 font-mono text-xs font-medium text-primary ring-1 ring-primary/20 [overflow-wrap:anywhere] [box-decoration-break:clone] [-webkit-box-decoration-break:clone]";

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
          className="text-sm leading-6 text-foreground/55"
        >
          {/* Inline, not flex: a long prop or value then wraps by word with the
              prose instead of being squeezed and split mid-word on narrow screens. */}
          <dt className="mr-1.5 inline">
            {note.lead && <span className="mr-1">{note.lead}</span>}
            <code data-badge className={PROP_BADGE}>
              {note.prop}
            </code>
            {note.value !== undefined && (
              <>
                <span
                  aria-hidden
                  className="mx-1 font-mono text-xs text-foreground/40"
                >
                  =
                </span>
                <code data-badge className={PROP_BADGE}>
                  {note.value}
                </code>
              </>
            )}
          </dt>
          <dd className="inline">{renderInline(note.effect || (note as any).note || "")}</dd>
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

/** Demos that have a Motion twin (`<name>-motion`). */
const DUAL_DEMOS = new Set(
  sandboxNames
    .filter((demo) => demo.endsWith("-motion"))
    .map((demo) => demo.replace(/-motion$/, "")),
);

/** Re-exported so docs pages can keep importing it from the showcase module. */
export type { SliderControl };

export function ExampleShowcase({
  name,
  examples,
  columns = 1,
  options,
  minHeight = 550,
  maxHeight = 1400,
  className,
  colorControl = true,
  defaultColor = DEFAULT_SHOWCASE_COLOR,
  colorProp = "color",
  colorLabel = "Active Color",
  controls = [],
  motionVariants,
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
  /**
   * The component ships a GSAP default and a Motion twin: the previews
   * get the build switch, and follow it to the `<name>-motion` demo. Detected
   * from the preview registry when omitted — a `<name>-motion` demo is exactly
   * what makes a component dual.
   */
  motionVariants?: boolean;
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

  // Dual components resolve the build first, then the framework — so a build
  // can still differ per framework — then the TSX/JS toggle further down.
  const { library } = useMotionLibrary();
  const isDual = motionVariants ?? DUAL_DEMOS.has(name);
  const activeLibrary = isDual ? library : "gsap";
  const previewName = isDual && library === "motion" ? `${name}-motion` : name;
  const pick = (snippet: ShowcaseSnippet | undefined) =>
    resolveMotion(snippet, activeLibrary);

  // Find component source code fallback from any example that explicitly
  // provides it — or, failing that, from another showcase of the same demo
  // higher up the page, so every preview of a component gets its Code tab.
  const ownCode = examples.find((ex) => ex.code)?.code;
  if (ownCode !== undefined) shared?.sharedCode.set(name, ownCode);
  const fallbackCode = resolveSnippet(
    pick(ownCode ?? (shared?.sharedCode.get(name) as ShowcaseSnippet | undefined)),
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

  // Handed to the FIRST example so the card sits directly above its preview —
  // the controls read as part of that demo rather than as page furniture.
  const controlCard =
    ownsPicker || controls.length > 0 ? (
      <ShowcaseControlCard>
        {ownsPicker && (
          <ThemeColorPicker
            color={color}
            onChange={setColor}
            label={colorLabel}
            className="sm:max-w-sm"
          />
        )}

        {controls.length > 0 && (
          <ShowcaseSliders
            controls={controls}
            values={controlValues}
            onChange={handleControlChange}
            // One or two sliders fit the right half; more than that need the
            // full width, so they take their own row under the picker.
            className={cn(controls.length > 2 && "lg:col-span-2")}
          />
        )}
      </ShowcaseControlCard>
    ) : null;

  return (
    <div className={cn("not-prose my-8 flex flex-col gap-6", className)}>
      <div
        className={cn(
          "grid grid-cols-1 gap-10",
          columns === 2 && "lg:grid-cols-2 lg:gap-x-6",
        )}
      >
        {examples.map((example, index) => {
          const effectiveProps = { ...example.props, ...controlValues };
          if (colorControl) {
            effectiveProps[colorProp] = color;
          }

          // The demos know the picker's "lavender" id, the blocks don't — so the
          // snippet a reader copies spells it as the hex it stands for.
          const effectiveUsage =
            resolveUsage(pick(example.usage), framework) ??
            generateFallbackUsage(
              name,
              example.title,
              colorControl
                ? { ...effectiveProps, [colorProp]: toBlockColor(color) }
                : effectiveProps,
            );

          const effectiveCode = resolveSnippet(pick(example.code), framework) ?? fallbackCode;

          return (
            <ExampleCard
              key={example.id ?? slugify(example.title)}
              name={previewName}
              motionSwitch={isDual}
              example={{
                ...example,
                props: effectiveProps,
                usage: effectiveUsage,
                code: effectiveCode,
              }}
              controlCard={index === 0 ? controlCard : null}
              accent={colorControl ? color : undefined}
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
  motionSwitch,
  example,
  controlCard,
  accent,
  options,
  minHeight,
  maxHeight,
}: {
  name: string;
  /** Draw the GSAP / Motion switch in the preview bar. */
  motionSwitch?: boolean;
  example: ResolvedShowcaseExample;
  /** The gallery's live-control card, drawn just above this preview. */
  controlCard?: React.ReactNode;
  /** The gallery's colour-picker value, applied as theme tokens in the frame. */
  accent?: string;
  options?: SandboxOptions;
  minHeight: number;
  maxHeight: number;
}) {
  // `code` feeds the Code tab below, hidden for now — rename back to `code` with it.
  const { title, subheading, propNotes, props, usage, code: _code } = example;
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
  // The source `shadcn add` writes — for a dual component, the build the
  // switch has picked. Hidden for now; uncomment (and restore `code` in the
  // destructure above) to bring the Code tab back.
  // if (code) {
  //   tabs.push({ id: "component", label: "Code", code, lang: "tsx" });
  // }

  return (
    <section ref={rootRef} aria-labelledby={anchor} className="flex flex-col min-w-0">
      {/* Title + optional subheading */}
      <div>
        <h3
          id={anchor}
          className="scroll-m-20 group text-lg font-semibold text-foreground"
        >
          <a href={`#${anchor}`} className="inline-flex items-center gap-2">
            {title}
            <LinkIcon className="w-3.5 h-3.5 text-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </h3>
        {subheading && (
          <p className="mt-1 text-sm text-foreground/55">
            {renderInline(subheading)}
          </p>
        )}
        {propNotes && propNotes.length > 0 && <PropNotes notes={propNotes} />}
      </div>

      {controlCard && <div className="mt-4">{controlCard}</div>}

      {/* Sandbox has its own my-8 — tighten it to the heading. */}
      <div className="flex-1 [&>div]:!my-4">
        {mounted ? (
          <Sandbox
            name={name}
            sandboxProps={props}
            accent={accent}
            tabs={tabs}
            options={options}
            minHeight={minHeight}
            maxHeight={maxHeight}
            motionSwitch={motionSwitch}
            v0Item={v0ItemFor(name, anchor)}
          />
        ) : (
          <div
            className="my-8 w-full rounded-2xl ring-1 ring-inset ring-foreground/[0.05] flex items-center justify-center bg-foreground/[0.03]"
            style={{ minHeight: minHeight + 54 /* 48px bar + 6px inset */ }}
          >
            <div className="h-5 w-5 rounded-full border-2 border-foreground/15 border-t-transparent animate-spin" />
          </div>
        )}
      </div>
    </section>
  );
}