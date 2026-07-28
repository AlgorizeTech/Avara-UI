"use client";

import { CodeBlocks } from "@/components/custom/ui/codeblocks";
import { PreviewFrame } from "@/components/site/PreviewFrame";
import { cn } from "@/lib/utils";
import { Code2, Monitor, MonitorPlay, RotateCcw, Smartphone, Tablet, Terminal, GripVertical } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const MIN_PREVIEW_WIDTH = 320;
// Standard breakpoint ranges: mobile < 640 <= tablet < 1024 <= desktop
const TABLET_MIN_WIDTH = 640;
const DESKTOP_MIN_WIDTH = 1024;
const SNAP_TO_FULL_THRESHOLD = 10;

type Device = "desktop" | "tablet" | "mobile";

const DEVICE_PRESETS: Record<Device, number | "100%"> = {
  desktop: "100%",
  tablet: 768,
  mobile: 375,
};

export function ComponentPreview({
  children,
  tsCode,
  jsCode,
  usageCode,
  jsUsageCode,
  name = "Component",
  disableFrame = false,
}: {
  children: React.ReactNode;
  tsCode: string;
  jsCode?: string;
  usageCode?: string;
  jsUsageCode?: string;
  name?: string;
  /**
   * Resized previews render inside a real iframe viewport ("the preview is a
   * screen"), so Tailwind sm:/md:/lg: media queries respond to the preview
   * width. Components that portal popups must target their own ownerDocument
   * (see TooltipBlock) to position correctly inside the frame. Set this flag
   * only for demos that hook the parent page scroll or measure the top window
   * (GSAP/framer page-scroll blocks, Leaflet maps) — those fall back to the
   * plain inline preview.
   */
  disableFrame?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<"preview" | "usage" | "code">("preview");
  const [language, setLanguage] = useState<"ts" | "js">("ts");

  // Replay Animation State
  const [replayKey, setReplayKey] = useState<number>(0);
  const [isReplaying, setIsReplaying] = useState<boolean>(false);

  // Responsive Preview State
  const [previewWidth, setPreviewWidth] = useState<number | "100%">("100%");
  const [areaWidth, setAreaWidth] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  // Replay Trigger: Increments React key to remount DOM & replay animations
  const handleReplay = () => {
    setIsReplaying(true);
    setReplayKey((prev) => prev + 1);

    setTimeout(() => {
      setIsReplaying(false);
    }, 600);
  };

  const showLanguageToggle =
    (activeTab === "code" && jsCode) || (activeTab === "usage" && jsUsageCode);

  // Track the available preview area width so the device icons stay in sync
  // when the preview is dragged or the browser window itself is resized.
  useEffect(() => {
    if (activeTab !== "preview") return;
    const area = areaRef.current;
    if (!area) return;
    const observer = new ResizeObserver((entries) => {
      setAreaWidth(entries[0].contentRect.width);
    });
    observer.observe(area);
    return () => observer.disconnect();
  }, [activeTab]);

  // Content-box width available inside the preview area (minus the 1px border).
  const availableWidth = areaWidth === null ? null : Math.max(areaWidth - 1, 0);

  // When the chosen device is wider than the area (e.g. tablet preset on a
  // phone), keep the real viewport width and shrink it visually instead.
  const frameScale =
    !disableFrame &&
    previewWidth !== "100%" &&
    availableWidth !== null &&
    previewWidth > availableWidth
      ? availableWidth / previewWidth
      : 1;
  const isScaled = frameScale !== 1;

  // Width the preview viewport actually renders at. Framed previews keep
  // their true width (visually scaled); inline fallbacks are clamped.
  const effectiveWidth =
    previewWidth === "100%"
      ? areaWidth
      : !disableFrame || areaWidth === null
        ? previewWidth
        : Math.min(previewWidth, areaWidth);

  // Active device derives from breakpoint ranges, not exact preset widths,
  // so manual resizing highlights the matching device icon.
  const activeDevice: Device =
    previewWidth === "100%"
      ? "desktop"
      : (effectiveWidth as number) < TABLET_MIN_WIDTH
        ? "mobile"
        : (effectiveWidth as number) < DESKTOP_MIN_WIDTH
          ? "tablet"
          : "desktop";

  const applyWidth = (width: number, max: number) => {
    if (width >= max - SNAP_TO_FULL_THRESHOLD) {
      setPreviewWidth("100%");
    } else {
      setPreviewWidth(Math.round(Math.min(Math.max(width, MIN_PREVIEW_WIDTH), max)));
    }
  };

  // Drag to resize (pointer capture keeps the drag alive over the iframe)
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

  // Keyboard resize on the drag handle
  const handleResizeKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const max = areaWidth ?? Infinity;
    const current = previewWidth === "100%" ? (areaWidth ?? DESKTOP_MIN_WIDTH) : previewWidth;
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

  return (
    <div className="w-full my-8 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-col not-prose relative">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 rounded-t-xl">
        {/* Left Side: 3-Tab Toggles */}
        <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("preview")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer",
              activeTab === "preview"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
            )}
          >
            <MonitorPlay className="w-4 h-4" /> Preview
          </button>

          {usageCode && (
            <button
              onClick={() => setActiveTab("usage")}
              className={cn(
                "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer",
                activeTab === "usage"
                  ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
              )}
            >
              <Terminal className="w-4 h-4" /> Usage
            </button>
          )}

          <button
            onClick={() => setActiveTab("code")}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer",
              activeTab === "code"
                ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
            )}
          >
            <Code2 className="w-4 h-4" /> Component
          </button>
        </div>

        {/* Right Side: Replay Button, Language Toggle & Responsive Controls */}
        <div className="flex items-center gap-2 ml-auto">
          {activeTab === "preview" && (
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Width Display */}
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 min-w-[48px] text-right tabular-nums">
                {previewWidth === "100%"
                  ? "100%"
                  : `${Math.round(effectiveWidth as number)}px`}
              </span>

              {/* Responsive Toggles */}
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

              {/* Replay Button (Icon Only) */}
              <button
                onClick={handleReplay}
                className={cn(
                  "h-8 w-8 flex items-center justify-center rounded-lg transition-all active:scale-95 cursor-pointer shadow-sm border",
                  "bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 border-zinc-200 dark:border-zinc-700",
                )}
                title="Replay component animations"
              >
                <RotateCcw
                  className={cn(
                    "w-4 h-4 transition-transform duration-500",
                    isReplaying && "animate-spin",
                  )}
                />
              </button>
            </div>
          )}

          {/* TS vs JS Language Toggle */}
          {showLanguageToggle && (
            <div className="flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 p-1 rounded-lg animate-in fade-in duration-200 ml-1 pl-2 border-l border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setLanguage("ts")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  language === "ts"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                <div className="w-4 h-4 bg-[#3178C6] rounded-[3px] flex items-center justify-center shrink-0">
                  <span className="text-white text-[9px] font-bold leading-none mt-px">
                    TS
                  </span>
                </div>
                <span className="hidden sm:inline">TypeScript</span>
              </button>
              <button
                onClick={() => setLanguage("js")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  language === "js"
                    ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200",
                )}
              >
                <div className="w-4 h-4 bg-[#F7DF1E] rounded-[3px] flex items-center justify-center shrink-0">
                  <span className="text-black text-[9px] font-bold leading-none mt-px">
                    JS
                  </span>
                </div>
                <span className="hidden sm:inline">JavaScript</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative w-full bg-white dark:bg-[#09090b] rounded-b-xl">
        {activeTab === "preview" ? (
          <div
            ref={areaRef}
            className={cn(
              "flex items-stretch min-h-[400px] relative justify-start overflow-visible rounded-b-xl",
              "bg-zinc-50/50 dark:bg-[#020202]"
            )}
          >
            {/* Dashed Grid Background */}
            <div className="absolute inset-0 pointer-events-none rounded-b-xl overflow-hidden">
              <svg width="100%" height="100%">
                <defs>
                  <pattern id="dashed-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                    <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#dashed-grid)" className="text-zinc-400/20 dark:text-white/10" />
              </svg>
            </div>

            <div
              /* +1px compensates the right border so the inner viewport is exactly previewWidth;
                 a scaled frame takes the full area and shrinks its content instead */
              style={{
                width: previewWidth === "100%" || isScaled ? "100%" : `${(previewWidth as number) + 1}px`,
                maxWidth: "100%",
              }}
              className={cn(
                "relative flex justify-center items-center transition-[width] ease-out",
                isDragging ? "duration-0" : "duration-300",
                "border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]",
                previewWidth === "100%" || isScaled ? "rounded-b-xl" : "rounded-bl-xl rounded-r-none"
              )}
            >
              {disableFrame ? (
                <div
                  key={replayKey}
                  className={cn(
                    "w-full h-full flex justify-center items-center animate-in fade-in duration-300 overflow-visible",
                    previewWidth === "100%" ? "rounded-b-xl" : "rounded-bl-xl rounded-r-none"
                  )}
                >
                  {children}
                </div>
              ) : (
                /* A real iframe viewport at EVERY width (incl. 100%): media
                   queries inside respond to the preview width, and keeping one
                   frame alive across resizes means content never remounts or
                   replays its entrance while dragging. */
                <div
                  className={cn(
                    "w-full overflow-hidden",
                    previewWidth === "100%" || isScaled ? "rounded-b-xl" : "rounded-bl-xl",
                    isDragging && "pointer-events-none select-none"
                  )}
                >
                  <PreviewFrame
                    minHeight={400}
                    title={`${name} responsive preview`}
                    frameWidth={previewWidth === "100%" ? undefined : (previewWidth as number)}
                    scale={frameScale}
                  >
                    <div
                      key={replayKey}
                      className="w-full flex justify-center items-center animate-in fade-in duration-300"
                    >
                      {children}
                    </div>
                  </PreviewFrame>
                </div>
              )}

              {/* Drag Handle */}
              <div
                role="separator"
                aria-orientation="vertical"
                aria-label="Resize preview"
                aria-valuemin={MIN_PREVIEW_WIDTH}
                aria-valuemax={areaWidth ? Math.round(areaWidth) : undefined}
                aria-valuenow={effectiveWidth ? Math.round(effectiveWidth) : undefined}
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
        ) : activeTab === "usage" && usageCode ? (
          <div className="relative w-full max-h-[600px] overflow-y-auto overflow-x-hidden rounded-b-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CodeBlocks
              code={language === "ts" ? usageCode : jsUsageCode || usageCode}
              language={language === "ts" ? "tsx" : "jsx"}
            />
          </div>
        ) : (
          <div className="relative w-full max-h-[600px] overflow-y-auto overflow-x-hidden rounded-b-xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <CodeBlocks
              code={language === "ts" ? tsCode : jsCode || tsCode}
              language={language === "ts" ? "tsx" : "jsx"}
            />
          </div>
        )}
      </div>
    </div>
  );
}
