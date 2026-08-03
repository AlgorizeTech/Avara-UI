"use client";

import { cn } from "@/lib/utils";
import {
  Code2,
  GripVertical,
  LayoutGrid,
  Monitor,
  MonitorPlay,
  RotateCcw,
  Smartphone,
  Tablet,
  Terminal,
  ZoomIn,
} from "lucide-react";
import { SandboxFrame } from "@/components/site/SandboxFrame";
import React, { useEffect, useRef, useState } from "react";

const MIN_PREVIEW_WIDTH = 320;
// Standard breakpoint ranges: mobile < 640 <= tablet < 1024 <= desktop
const TABLET_MIN_WIDTH = 640;
const DESKTOP_MIN_WIDTH = 1024;
const SNAP_TO_FULL_THRESHOLD = 10;
const ZOOM_LEVELS = [1, 0.75, 0.5];

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_PRESETS: Record<Device, number | "100%"> = {
  desktop: "100%",
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
  /** Marks the tab that shows the sandboxed live preview. */
  resizable?: boolean;
}

export interface SandboxOptions {
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
  minHeight = 400,
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
  const { zoom: zoomOption = true, deviceSwitcher = true, reset = true } = options;

  const previewTab = tabs.find((t) => t.resizable) ?? tabs[0];
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id ?? "preview");

  // Responsive preview state (same semantics as the classic ComponentPreview)
  const [previewWidth, setPreviewWidth] = useState<number | "100%">("100%");
  const [areaWidth, setAreaWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const areaRef = useRef<HTMLDivElement>(null);

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
    previewWidth === "100%" ? availableWidth : (previewWidth as number);

  // Wide device on a narrow area → keep the true viewport, shrink visually.
  const fitScale =
    viewportWidth !== null && availableWidth !== null && viewportWidth > availableWidth
      ? availableWidth / viewportWidth
      : 1;
  const visualScale = fitScale * zoom;

  const activeDevice: Device =
    previewWidth === "100%"
      ? "desktop"
      : (viewportWidth as number) < TABLET_MIN_WIDTH
        ? "mobile"
        : (viewportWidth as number) < DESKTOP_MIN_WIDTH
          ? "tablet"
          : "desktop";

  const applyWidth = (width: number, max: number) => {
    if (width >= max - SNAP_TO_FULL_THRESHOLD) {
      setPreviewWidth("100%");
    } else {
      setPreviewWidth(Math.round(Math.min(Math.max(width, MIN_PREVIEW_WIDTH), max)));
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
      previewWidth === "100%" ? (areaWidth ?? DESKTOP_MIN_WIDTH) : previewWidth;
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
    { device: "desktop", icon: <Monitor className="w-4 h-4" />, label: "Desktop View" },
    { device: "tablet", icon: <Tablet className="w-4 h-4" />, label: "Tablet View" },
    { device: "mobile", icon: <Smartphone className="w-4 h-4" />, label: "Mobile View" },
  ];

  // Visual box of the (possibly scaled) frame
  const visualWidth =
    viewportWidth === null ? null : Math.round(viewportWidth * visualScale);
  const isPreviewActive = activeTab === (previewTab?.id ?? "preview");
  const currentTab = tabs.find((t) => t.id === activeTab);

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

        {/* Right: preview controls */}
        {isPreviewActive && (
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 min-w-[48px] text-right tabular-nums">
              {previewWidth === "100%"
                ? "100%"
                : `${Math.round(viewportWidth as number)}px`}
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

            {zoomOption && (
              <button
                onClick={() =>
                  setZoom(
                    ZOOM_LEVELS[(ZOOM_LEVELS.indexOf(zoom) + 1) % ZOOM_LEVELS.length],
                  )
                }
                className="h-8 px-2 flex items-center justify-center gap-1 rounded-lg transition-all cursor-pointer shadow-sm border text-xs font-semibold tabular-nums bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-700"
                title="Zoom preview"
                aria-label={`Zoom: ${Math.round(zoom * 100)}%`}
              >
                <ZoomIn className="w-3.5 h-3.5" />
                {Math.round(zoom * 100)}%
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
                  previewWidth === "100%" && zoom === 1
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
                previewWidth === "100%" && zoom === 1
                  ? "rounded-b-xl"
                  : "rounded-bl-xl rounded-r-none",
              )}
            >
              <div
                className={cn(
                  "w-full overflow-hidden",
                  previewWidth === "100%" && zoom === 1 ? "rounded-b-xl" : "rounded-bl-xl",
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

        {!isPreviewActive && (
          <div className="relative w-full max-h-[600px] overflow-y-auto overflow-x-hidden rounded-b-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {currentTab?.content}
          </div>
        )}
      </div>
    </div>
  );
}
