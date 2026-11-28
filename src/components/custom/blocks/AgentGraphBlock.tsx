"use client";

import { cn } from "@/lib/utils";
import {
  CheckIcon,
  ClockIcon,
  LoaderCircleIcon,
  PauseIcon,
} from "@/components/custom/ui/animated-icons";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

export type AgentStatus = "working" | "done" | "idle" | "needs-you" | "failed" | "paused";

export type AgentColor = "blue" | "purple" | "cyan" | "emerald" | "amber";

export type AgentToolKey = "linear" | "github" | "notion" | "vercel";

export type AgentGraphNode = {
  id: string;
  name: string;
  model?: string;
  status: AgentStatus;
  statusLabel?: string;
  message: string;
  tokensUsed: number;
  tokensMax: number;
  color: AgentColor;
  iconPattern?: number[];
  icon?: React.ReactNode;
  tools?: AgentToolKey[];
  handoff?: {
    agent: string;
    summary: string;
  };
  children?: AgentGraphNode[];

  // Detailed fields for Click Popover
  description?: string;
  time?: string;
  cost?: string;
};

export type AgentGraphVariant = "tree" | "editorial";

export interface AgentGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  data: AgentGraphNode;
  /** Layout variant for the agent graph. Default: "tree" */
  variant?: AgentGraphVariant;
  animateIn?: boolean;
  /** Renders the outer shaded shell and footer tint. Set false for a flat single-card surface. Default: true */
  shade?: boolean;
  /** Toggles sequential live orchestration flow animation loop across the tree */
  liveAnimation?: boolean;
}

const AGENT_COLORS: Record<
  AgentColor,
  {
    hex: string;
    fg: string;
    bg: string;
    border: string;
    bar: string;
  }
> = {
  blue: {
    hex: "#0190fe",
    fg: "#006dcbf2",
    bg: "#008ff519",
    border: "rgba(1, 144, 254, 0.4)",
    bar: "bg-[#0190fe]",
  },
  purple: {
    hex: "#a855f7",
    fg: "#9333ea",
    bg: "rgba(168, 85, 247, 0.12)",
    border: "rgba(168, 85, 247, 0.4)",
    bar: "bg-[#a855f7]",
  },
  cyan: {
    hex: "#0ea5e9",
    fg: "#0284c7",
    bg: "rgba(14, 165, 233, 0.12)",
    border: "rgba(14, 165, 233, 0.4)",
    bar: "bg-[#0ea5e9]",
  },
  emerald: {
    hex: "#10b981",
    fg: "#059669",
    bg: "rgba(16, 185, 129, 0.12)",
    border: "rgba(16, 185, 129, 0.4)",
    bar: "bg-[#10b981]",
  },
  amber: {
    hex: "#f59e0b",
    fg: "#d97706",
    bg: "rgba(245, 158, 11, 0.12)",
    border: "rgba(245, 158, 11, 0.4)",
    bar: "bg-[#f59e0b]",
  },
};

const DEFAULT_MATRIX_PATTERN = [0.45, 0.75, 1, 0.75, 1, 0.75, 1, 0.75, 0.45];

function formatTokens(n: number): string {
  if (n >= 1000) {
    const k = Math.round(n / 1000);
    return `${k}k`;
  }
  return String(n);
}

/** 3x3 Pixel matrix with optional live twinkle when busy */
function PixelMatrixIcon({
  colorHex,
  pattern = DEFAULT_MATRIX_PATTERN,
  isBusy = false,
}: {
  colorHex: string;
  pattern?: number[];
  isBusy?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 grid-rows-3 gap-[1.5px] place-content-center w-4 h-4 shrink-0",
        isBusy && "agent-graph-mark-busy",
      )}
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const row = Math.floor(i / 3);
        const col = i % 3;
        const delay = (row + col) * 120;
        const opacity = pattern[i] ?? 0;
        const isOn = opacity > 0.3;

        return (
          <i
            key={i}
            className="w-[3px] h-[3px] rounded-[0.75px] transition-opacity duration-300"
            style={{
              backgroundColor: colorHex,
              opacity: isOn ? 1 : isBusy ? 0.18 : 0,
              animationDelay: isBusy ? `${delay}ms` : undefined,
            }}
          />
        );
      })}
    </div>
  );
}

function ToolBadge({ tool }: { tool: AgentToolKey }) {
  return (
    <span
      title={tool}
      className="w-[21px] h-[21px] rounded-[6px] bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.1] ring-1 ring-[#f3f4f6] dark:ring-zinc-900 shadow-[0_1px_1px_rgba(0,0,0,0.03)] flex items-center justify-center shrink-0"
    >
      {tool === "linear" && (
        <svg viewBox="0 0 16 16" className="w-3 h-3" aria-hidden="true">
          <circle cx="8" cy="8" r="6" fill="#5E6AD2" />
          <path
            d="M3.3 9.7L6.3 12.7M2.6 7.4L8.6 13.4M4.1 5.1L10.9 11.9"
            stroke="white"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {tool === "github" && (
        <svg
          viewBox="0 0 16 16"
          className="w-3 h-3 text-neutral-800 dark:text-neutral-200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 1.5a6.5 6.5 0 0 0-2.05 12.67c.32.06.44-.14.44-.31v-1.1c-1.8.39-2.18-.87-2.18-.87-.3-.75-.72-.95-.72-.95-.59-.4.04-.39.04-.39.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.95-.72-2.95-3.2 0-.71.25-1.29.67-1.74-.07-.16-.29-.82.06-1.71 0 0 .55-.18 1.8.67a6.2 6.2 0 0 1 3.28 0c1.25-.85 1.8-.67 1.8-.67.35.89.13 1.55.06 1.71.42.45.67 1.03.67 1.74 0 2.49-1.51 3.04-2.96 3.2.23.2.44.6.44 1.21v1.79c0 .17.12.38.44.31A6.5 6.5 0 0 0 8 1.5Z" />
        </svg>
      )}
      {tool === "notion" && (
        <svg
          viewBox="0 0 16 16"
          className="w-3 h-3 text-neutral-800 dark:text-neutral-200"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="2.5"
            y="2.5"
            width="11"
            height="11"
            rx="1.8"
            stroke="currentColor"
            strokeWidth="1.3"
          />
          <path
            d="M5.5 11V5.2L10.3 10.8V5"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      {tool === "vercel" && (
        <svg
          viewBox="0 0 16 16"
          className="w-2.5 h-2.5 text-neutral-900 dark:text-neutral-100"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 2.5L14 13H2L8 2.5Z" />
        </svg>
      )}
    </span>
  );
}

function StatusBadge({
  status,
  label,
  compact = false,
}: {
  status: AgentStatus;
  label?: string;
  compact?: boolean;
}) {
  const defaultLabels: Record<AgentStatus, string> = {
    working: "Working",
    done: "Done",
    idle: "Idle",
    "needs-you": "Needs you",
    failed: "Failed",
    paused: "Paused",
  };

  const styles: Record<AgentStatus, string> = {
    working:
      "bg-blue-50 text-blue-600 border-blue-200/70 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-800/60",
    done: "bg-emerald-50 text-emerald-700 border-emerald-200/70 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60",
    idle: "bg-neutral-100 text-neutral-500 border-neutral-200/70 dark:bg-neutral-800/80 dark:text-neutral-400 dark:border-neutral-700/60",
    "needs-you":
      "bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-950/60 dark:text-amber-400 dark:border-amber-800/60",
    failed:
      "bg-red-50 text-red-700 border-red-200/70 dark:bg-red-950/60 dark:text-red-400 dark:border-red-800/60",
    paused:
      "bg-neutral-100 text-neutral-500 border-neutral-200/70 dark:bg-neutral-800/80 dark:text-neutral-400 dark:border-neutral-700/60",
  };

  const icon = (
    <>
      {status === "working" && <LoaderCircleIcon className="size-3 shrink-0 animate-spin" strokeWidth={2.25} />}
      {status === "done" && <CheckIcon className="size-3.5 shrink-0" strokeWidth={2.25} animateOnMount />}
      {status === "idle" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70 shrink-0" />
      )}
      {status === "paused" && <PauseIcon className="size-3 shrink-0" strokeWidth={2.25} />}
      {status === "needs-you" && <ClockIcon className="size-3 shrink-0" strokeWidth={2.25} />}
    </>
  );

  // Per user specification: "done" and "idle" show only icon/dot (no text)
  const isIconOnly = compact || status === "done" || status === "idle";

  if (isIconOnly) {
    return (
      <span
        className={cn(
          "w-[22px] h-[22px] rounded-full border flex items-center justify-center shrink-0 transition-colors duration-300",
          styles[status],
        )}
        title={label ?? defaultLabels[status]}
      >
        {icon}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full border text-[11px] font-medium inline-flex items-center gap-1.5 shrink-0 leading-none h-[22px] transition-colors duration-300",
        styles[status],
      )}
    >
      {icon}
      <span>{label ?? defaultLabels[status]}</span>
    </span>
  );
}

/** 
 * Soft internal arrival glow that illuminates from the incoming edge
 * when an agent receives a handoff pulse.
 */
function ArrivalGlow({
  colorHex,
  side = "top",
}: {
  colorHex: string;
  side?: "top" | "left" | "bottom";
}) {
  // Orient the glow from the edge where the connector enters the card
  const gradientOrigin =
    side === "top"
      ? "50% 0%"
      : side === "left"
        ? "0% 50%"
        : "50% 100%";

  const riseClass =
    side === "top"
      ? "animate-[agentGraphGlowFromTop_950ms_cubic-bezier(0.22,1,0.36,1)_both]"
      : side === "left"
        ? "animate-[agentGraphGlowFromLeft_950ms_cubic-bezier(0.22,1,0.36,1)_both]"
        : "animate-[agentGraphGlowRise_950ms_cubic-bezier(0.22,1,0.36,1)_both]";

  return (
    <div
      data-side={side}
      className="absolute inset-0 z-0 overflow-hidden rounded-[inherit] pointer-events-none"
    >
      <div className="absolute inset-0 animate-[agentGraphGlowFade_950ms_cubic-bezier(0.22,1,0.36,1)_both]">
        {/* Multi-stop colored wash visible on both light and dark surfaces */}
        <div
          className={cn("absolute -inset-6 blur-xl", riseClass)}
          style={{
            background: `radial-gradient(ellipse 85% 65% at ${gradientOrigin}, ${colorHex}52 0%, ${colorHex}26 42%, transparent 78%)`,
          }}
        />
        {/* Crisp edge highlight */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 65% 40% at ${gradientOrigin}, rgba(255,255,255,0.45) 0%, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}

function AgentDetailPopover({
  node,
  anchorEl,
  onClose,
  status,
  tokensCurrent,
  onPause,
  onResume,
  onStop,
  onApprove,
  onDecline,
}: {
  node: AgentGraphNode;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  status: AgentStatus;
  tokensCurrent: number;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onApprove?: () => void;
  onDecline?: () => void;
}) {
  const [placement, setPlacement] = useState<"bottom" | "top">("bottom");
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [isMessaging, setIsMessaging] = useState(false);
  const [inputText, setInputText] = useState("");
  const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (!anchorEl) return;
    const rect = anchorEl.getBoundingClientRect();
    const popoverHeight = 330;
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < popoverHeight && spaceAbove > spaceBelow) {
      setPlacement("top");
    } else {
      setPlacement("bottom");
    }
  }, [anchorEl]);

  useEffect(() => {
    if (isMessaging && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMessaging]);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        anchorEl &&
        !anchorEl.contains(target)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [anchorEl, onClose]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    setLastUserMessage(inputText.trim());
    setInputText("");
    setIsMessaging(false);
  };

  return (
    <div
      ref={popoverRef}
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "absolute left-0 z-50 w-[260px] sm:w-[280px] rounded-2xl bg-white dark:bg-zinc-950 border border-black/[0.08] dark:border-white/[0.1] shadow-[0_0_24px_rgba(0,0,0,0.08)] dark:shadow-[0_0_28px_rgba(0,0,0,0.5)] p-4 text-left animate-in fade-in zoom-in-95 duration-150",
        placement === "bottom" ? "top-full mt-2" : "bottom-full mb-2",
      )}
    >
      {/* Title & Close */}
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-[14px] font-semibold text-neutral-900 dark:text-neutral-100">
          {node.name}
        </h4>
        <button
          type="button"
          onClick={onClose}
          className="w-5 h-5 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors text-xs"
        >
          ✕
        </button>
      </div>

      {/* Description / Task */}
      <p className="mt-2 text-[12px] leading-relaxed text-neutral-600 dark:text-neutral-300">
        {node.description || node.message}
      </p>

      {/* Model Badge */}
      {node.model && (
        <div className="mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/60 dark:border-zinc-800 text-[11px] text-neutral-700 dark:text-neutral-300 font-medium">
          <span className="text-[#e25530]">✹</span>
          <span>{node.model}</span>
        </div>
      )}

      {/* Metrics Row (Running/Time, Cost, Tokens) */}
      <div className="mt-3.5 pt-3 border-t border-neutral-100 dark:border-zinc-900 grid grid-cols-3 gap-2">
        {(node.time || status === "working" || status === "paused") && (
          <div>
            <span className="text-[11px] text-neutral-400 block">
              {status === "working" ? "Running" : "Time"}
            </span>
            <span className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
              {status === "paused" || status === "idle" ? "0s" : (node.time || "4s")}
            </span>
          </div>
        )}
        {node.cost && (
          <div>
            <span className="text-[11px] text-neutral-400 block">Cost</span>
            <span className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
              {node.cost}
            </span>
          </div>
        )}
        <div>
          <span className="text-[11px] text-neutral-400 block">Tokens</span>
          <span className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-100 tabular-nums">
            {formatTokens(tokensCurrent)}
          </span>
        </div>
      </div>

      {/* Tools Section */}
      {node.tools && node.tools.length > 0 && (
        <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-zinc-900 flex flex-wrap gap-1.5">
          {node.tools.map((t) => (
            <div
              key={t}
              className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-zinc-900 border border-neutral-200/50 dark:border-zinc-800 text-[11px] text-neutral-700 dark:text-neutral-300 capitalize"
            >
              <ToolBadge tool={t} />
              <span>{t}</span>
            </div>
          ))}
        </div>
      )}

      {/* Handoff or Sent Message Section */}
      {lastUserMessage ? (
        <div className="mt-2.5 text-[11.5px] text-neutral-500 dark:text-neutral-400 flex items-start gap-1">
          <span className="text-neutral-400">↳</span>
          <p className="truncate">
            <span className="font-medium text-neutral-800 dark:text-neutral-200 mr-1">
              You
            </span>
            <span>{lastUserMessage}</span>
          </p>
        </div>
      ) : (
        node.handoff && (
          <div className="mt-2.5 text-[11.5px] text-neutral-500 dark:text-neutral-400 flex items-start gap-1">
            <span className="text-neutral-400">↳</span>
            <p className="truncate">
              <span className="font-medium text-neutral-800 dark:text-neutral-200 mr-1">
                {node.handoff.agent}
              </span>
              <span>{node.handoff.summary}</span>
            </p>
          </div>
        )
      )}

      {/* Action: Message Input Field OR State-Specific Controls (Message / Pause / Stop / Resume / Approve / Decline) */}
      {isMessaging ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="mt-3.5 flex items-center gap-1.5"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Tell ${node.name}...`}
            className="flex-1 h-8 px-2.5 rounded-lg border border-neutral-200 dark:border-zinc-800 bg-[#f9fafb] dark:bg-zinc-900 text-[12px] text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 focus:outline-hidden focus:border-neutral-400 dark:focus:border-zinc-600 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M12 5L6 11M12 5L18 11" />
            </svg>
          </button>
        </form>
      ) : (
        <div className="mt-3.5 flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsMessaging(true)}
            className="flex-1 h-8 px-2.5 rounded-lg border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 text-[12px] font-medium text-neutral-800 dark:text-neutral-100 shadow-2xs transition-colors flex items-center justify-center"
          >
            Message
          </button>

          {status === "working" && (
            <>
              <button
                type="button"
                onClick={onPause}
                className="flex-1 h-8 px-2.5 rounded-lg border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 text-[12px] font-medium text-neutral-800 dark:text-neutral-100 shadow-2xs transition-colors flex items-center justify-center"
              >
                Pause
              </button>
              <button
                type="button"
                onClick={onStop}
                className="flex-1 h-8 px-2.5 rounded-lg border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 text-[12px] font-medium text-neutral-800 dark:text-neutral-100 shadow-2xs transition-colors flex items-center justify-center"
              >
                Stop
              </button>
            </>
          )}

          {status === "paused" && (
            <>
              <button
                type="button"
                onClick={onStop}
                className="flex-1 h-8 px-2.5 rounded-lg border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 text-[12px] font-medium text-neutral-800 dark:text-neutral-100 shadow-2xs transition-colors flex items-center justify-center"
              >
                Stop
              </button>
              <button
                type="button"
                onClick={onResume}
                className="flex-1 h-8 px-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-[12px] font-medium transition-colors flex items-center justify-center"
              >
                Resume
              </button>
            </>
          )}

          {status === "needs-you" && (
            <>
              <button
                type="button"
                onClick={onDecline}
                className="flex-1 h-8 px-2.5 rounded-lg border border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-neutral-50 dark:hover:bg-zinc-800/80 text-[12px] font-medium text-neutral-800 dark:text-neutral-100 shadow-2xs transition-colors flex items-center justify-center"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={onApprove}
                className="flex-1 h-8 px-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 text-[12px] font-medium transition-colors flex items-center justify-center"
              >
                Approve
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function AgentCard({
  node,
  compact = false,
  anchorPosition = "left",
  shade = true,
  isOpen = false,
  onToggleOpen,
  isWorking = false,
  isDone = false,
  isPaused = false,
  isWaiting = false,
  hasArrivalGlow = false,
  arrivalSide = "top",
  tokensCurrent,
  liveActivityText,
  onPause,
  onResume,
  onStop,
  onApprove,
  onDecline,
}: {
  node: AgentGraphNode;
  compact?: boolean;
  anchorPosition?: "center-desktop-left-mobile" | "left";
  shade?: boolean;
  isOpen?: boolean;
  onToggleOpen?: () => void;
  isWorking?: boolean;
  isDone?: boolean;
  isPaused?: boolean;
  isWaiting?: boolean;
  hasArrivalGlow?: boolean;
  arrivalSide?: "top" | "left" | "bottom";
  tokensCurrent?: number;
  liveActivityText?: string;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  onApprove?: () => void;
  onDecline?: () => void;
}) {
  const palette = AGENT_COLORS[node.color] ?? AGENT_COLORS.blue;
  
  const currentTokens = tokensCurrent ?? node.tokensUsed;
  const pct = node.tokensMax > 0 ? (currentTokens / node.tokensMax) * 100 : 0;
  const isHighUsage = pct >= 80;
  const isExtremeUsage = pct >= 95;

  const hasFooter = Boolean(node.tools?.length || node.handoff);
  const hasChildren = Boolean(node.children?.length);

  const cardRef = useRef<HTMLDivElement>(null);

  // Status determined by simulation & user overrides:
  const currentStatus: AgentStatus = isWaiting
    ? "needs-you"
    : isPaused
      ? "paused"
      : isWorking
        ? "working"
        : isDone
          ? "done"
          : node.status === "needs-you"
            ? "needs-you"
            : "idle";

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={() => onToggleOpen?.()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggleOpen?.();
        }
      }}
      className={cn(
        "relative w-full cursor-pointer text-left select-none transition-all duration-300",
        shade
          ? "rounded-2xl bg-[#f3f4f6] dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03)] p-[3px]"
          : "rounded-xl bg-white dark:bg-zinc-950 border border-black/[0.08] dark:border-white/[0.08] shadow-[0_1px_2px_rgba(0,0,0,0.03)]",
        isOpen && "ring-2 ring-primary/60",
      )}
    >
      <div
        className={cn(
          "px-3.5 py-3 relative overflow-hidden",
          shade &&
            "rounded-[13px] bg-white dark:bg-zinc-950 border border-black/[0.05] dark:border-white/[0.06] shadow-[0_1px_2px_rgba(0,0,0,0.04)]",
        )}
      >
        {/* Arrival glow when receiving handoff */}
        {hasArrivalGlow && (
          <ArrivalGlow colorHex={palette.hex} side={arrivalSide} />
        )}

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-[9px] bg-white dark:bg-zinc-900 border border-black/[0.07] dark:border-white/[0.1] shadow-[0_1px_2px_rgba(0,0,0,0.04)] flex items-center justify-center shrink-0">
              {node.icon ?? (
                <PixelMatrixIcon
                  colorHex={palette.hex}
                  pattern={node.iconPattern}
                  isBusy={isWorking}
                />
              )}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight truncate">
                {node.name}
              </div>
              {node.model && (
                <div className="text-[11.5px] text-neutral-500 dark:text-neutral-400 leading-tight mt-0.5 truncate">
                  {node.model}
                </div>
              )}
            </div>
          </div>

          <StatusBadge
            status={currentStatus}
            label={currentStatus === "needs-you" ? "Needs you" : node.statusLabel}
            compact={compact}
          />
        </div>

        {/* Status / Activity Message with live shine text */}
        <p
          className={cn(
            "relative z-10 mt-2.5 text-[12px] leading-snug truncate transition-colors duration-200",
            currentStatus === "needs-you"
              ? "text-amber-600 dark:text-amber-400 font-semibold"
              : isWorking
                ? "text-neutral-800 dark:text-neutral-200 font-medium agent-graph-activity-live"
                : isDone
                  ? "text-neutral-600 dark:text-neutral-300"
                  : "text-neutral-400 dark:text-neutral-500",
          )}
        >
          {liveActivityText || node.message}
        </p>

        {/* Progress Bar + Tokens */}
        <div className="relative z-10 mt-2 flex items-center gap-2.5">
          <div className="flex-1 h-[4px] rounded-full bg-neutral-200/80 dark:bg-zinc-800 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0.24,1)]",
                isExtremeUsage
                  ? "bg-red-500"
                  : isHighUsage
                    ? "bg-[#f28a2e]"
                    : palette.bar,
              )}
              style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
            />
          </div>
          <span
            className={cn(
              "text-[11px] tabular-nums shrink-0 transition-colors duration-200",
              isHighUsage
                ? "text-amber-600 dark:text-amber-400 font-medium"
                : isWorking || isDone
                  ? "text-neutral-600 dark:text-neutral-300 font-medium"
                  : "text-neutral-400 dark:text-neutral-500",
            )}
          >
            {formatTokens(currentTokens)} / {formatTokens(node.tokensMax)}
          </span>
        </div>
      </div>

      {/* Footer Strip */}
      {hasFooter && (
        <div
          className={cn(
            "relative z-10 flex items-center gap-2 text-[11.5px] min-h-[30px]",
            shade ? "px-3 py-1.5" : "px-3.5 pb-2.5 pt-0",
          )}
        >
          {node.tools && node.tools.length > 0 && (
            <div className="flex items-center -space-x-1 shrink-0">
              {node.tools.map((tool) => (
                <ToolBadge key={tool} tool={tool} />
              ))}
            </div>
          )}
          {node.handoff && (
            <div className="flex items-center gap-1 min-w-0 text-neutral-500 dark:text-neutral-400">
              <span className="text-neutral-400 dark:text-neutral-500 shrink-0">
                ↳
              </span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300 shrink-0">
                {node.handoff.agent}
              </span>
              <span className="truncate">{node.handoff.summary}</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom Connector Dot */}
      {hasChildren && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute -bottom-[5px] w-[9px] h-[9px] rounded-full border-[1.5px] bg-white dark:bg-zinc-950 z-10 transition-colors duration-300",
            anchorPosition === "center-desktop-left-mobile"
              ? "left-[18px] md:left-1/2 md:-translate-x-1/2"
              : "left-[18px]",
          )}
          style={{ borderColor: palette.hex }}
        />
      )}

      {/* Detail Popover on Click */}
      {isOpen && (
        <AgentDetailPopover
          node={node}
          anchorEl={cardRef.current}
          onClose={() => onToggleOpen?.()}
          status={currentStatus}
          tokensCurrent={currentTokens}
          onPause={onPause}
          onResume={onResume}
          onStop={onStop}
          onApprove={onApprove}
          onDecline={onDecline}
        />
      )}
    </div>
  );
}

function SubAgentBranch({
  nodes,
  lineColor,
  compact = true,
  shade = true,
  openCardId,
  setOpenCardId,
  stateMap,
  activeBeam,
  onAgentAction,
  renderNode,
}: {
  nodes: AgentGraphNode[];
  lineColor: string;
  compact?: boolean;
  shade?: boolean;
  openCardId: string | null;
  setOpenCardId: (id: string | null) => void;
  stateMap: Record<
    string,
    { status: AgentStatus; tokens: number; activity: string; glow: boolean }
  >;
  activeBeam: { from: string; to: string } | null;
  onAgentAction?: (agentId: string, action: "pause" | "resume" | "stop" | "approve" | "decline") => void;
  renderNode?: (node: AgentGraphNode) => React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col">
      {nodes.map((child, idx) => {
        const isLast = idx === nodes.length - 1;
        const s = stateMap[child.id] || {
          status: child.status,
          tokens: child.tokensUsed,
          activity: child.message,
          glow: false,
        };

        const isReceivingBeam = activeBeam?.to === child.id;

        return (
          <div key={child.id} className="relative pl-8 pt-3">
            {/* Continuous vertical rail for non-last siblings */}
            {!isLast && (
              <span
                aria-hidden="true"
                className="absolute left-[22px] top-0 bottom-0 border-l-[1.5px]"
                style={{ borderColor: lineColor }}
              />
            )}

            {/* Rounded elbow into the child card */}
            <div className="absolute left-[22px] top-0 w-[14px] h-[38px] pointer-events-none">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 14 38" fill="none">
                <path
                  d="M 0,0 V 28 Q 0,36 8,36 H 14"
                  stroke={lineColor}
                  strokeWidth="1.5"
                  className={cn(
                    "transition-opacity duration-500",
                    isReceivingBeam ? "opacity-100" : "opacity-60",
                  )}
                />

                {/* Traveling Light Segment along connector elbow (exact 1.5px border width) */}
                {isReceivingBeam && (
                  <path
                    d="M 0,0 V 28 Q 0,36 8,36 H 14"
                    stroke="#0190fe"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    pathLength="100"
                    strokeDasharray="30 130"
                    className="animate-[agentGraphBeamTravel_0.75s_cubic-bezier(0.32,0.72,0.24,1)_forwards]"
                    style={{
                      filter: "drop-shadow(0 0 1.5px rgba(1,144,254,0.45))",
                    }}
                  />
                )}
              </svg>
            </div>

            {renderNode ? (
              renderNode(child)
            ) : (
              <AgentCard
                node={child}
                compact={compact}
                shade={shade}
                isOpen={openCardId === child.id}
                onToggleOpen={() =>
                  setOpenCardId(openCardId === child.id ? null : child.id)
                }
                isWorking={s.status === "working"}
                isDone={s.status === "done"}
                isPaused={s.status === "paused"}
                isWaiting={s.status === "needs-you"}
                hasArrivalGlow={s.glow}
                arrivalSide="left"
                tokensCurrent={s.tokens}
                liveActivityText={s.activity}
                onPause={() => onAgentAction?.(child.id, "pause")}
                onResume={() => onAgentAction?.(child.id, "resume")}
                onStop={() => onAgentAction?.(child.id, "stop")}
                onApprove={() => onAgentAction?.(child.id, "approve")}
                onDecline={() => onAgentAction?.(child.id, "decline")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export const AgentGraph = React.forwardRef<HTMLDivElement, AgentGraphProps>(
  (
    {
      data,
      variant = "tree",
      animateIn = true,
      shade = true,
      liveAnimation = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [openCardId, setOpenCardId] = useState<string | null>(null);

    // Live orchestration simulation state:
    // Tracks each agent's dynamic state: status, token usage, activity message, and arrival glow
    const [simStep, setSimStep] = useState<number>(0);
    const [activeBeam, setActiveBeam] = useState<{ from: string; to: string } | null>(null);

    type AgentStateMap = Record<
      string,
      { status: AgentStatus; tokens: number; activity: string; glow: boolean }
    >;

    const [agentStates, setAgentStates] = useState<AgentStateMap>((): AgentStateMap =>
      variant === "editorial"
        ? {
            editor: { status: "working", tokens: 24000, activity: "Delegating", glow: false },
            researcher: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            writer: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            "fact-checker": { status: "idle", tokens: 0, activity: "Idle", glow: false },
            seo: { status: "idle", tokens: 0, activity: "Idle", glow: false },
          }
        : {
            lead: { status: "working", tokens: 36000, activity: "Planning the fix", glow: false },
            researcher: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            "web-search": { status: "idle", tokens: 0, activity: "Idle", glow: false },
            coder: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            linter: { status: "idle", tokens: 0, activity: "Idle", glow: false },
            "test-runner": { status: "idle", tokens: 0, activity: "Idle", glow: false },
            reviewer: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            "docs-writer": { status: "idle", tokens: 0, activity: "Idle", glow: false },
          },
    );

    type OverrideEntry = {
      status: AgentStatus;
      activity: string;
      frozenTokens: number;
    };
    const [userOverrides, setUserOverrides] = useState<Record<string, OverrideEntry>>({});
    const overridesRef = useRef(userOverrides);
    overridesRef.current = userOverrides;

    const handleAgentAction = (
      agentId: string,
      action: "pause" | "resume" | "stop" | "approve" | "decline",
    ) => {
      const current = agentStates[agentId];
      const currentTokens = current?.tokens ?? 0;

      if (action === "pause") {
        setUserOverrides((prev) => ({
          ...prev,
          [agentId]: {
            status: "paused",
            activity: "Paused by you",
            frozenTokens: currentTokens,
          },
        }));
      } else if (action === "resume") {
        setUserOverrides((prev) => {
          const next = { ...prev };
          delete next[agentId];
          return next;
        });
      } else if (action === "stop") {
        setUserOverrides((prev) => ({
          ...prev,
          [agentId]: {
            status: "idle",
            activity: "Stopped by you",
            frozenTokens: currentTokens,
          },
        }));
      } else if (action === "approve") {
        setUserOverrides((prev) => ({
          ...prev,
          [agentId]: {
            status: "done",
            activity: agentId === "editor" ? "Published launch post" : "Merged PR #482",
            frozenTokens: currentTokens,
          },
        }));
      } else if (action === "decline") {
        setUserOverrides((prev) => ({
          ...prev,
          [agentId]: {
            status: "idle",
            activity: "Declined by you",
            frozenTokens: currentTokens,
          },
        }));
      }
    };

    // Merge simulated state with any active user overrides (pause/stop/approve/decline)
    const effectiveStates: Record<
      string,
      { status: AgentStatus; tokens: number; activity: string; glow: boolean }
    > = { ...agentStates };
    for (const [id, ov] of Object.entries(userOverrides)) {
      effectiveStates[id] = {
        status: ov.status,
        tokens: ov.frozenTokens,
        activity: ov.activity,
        glow: false,
      };
    }

    useEffect(() => {
      if (!liveAnimation) return;

      const schedule: {
        delay: number;
        beam?: { from: string; to: string } | null;
        update: (prev: typeof agentStates) => typeof agentStates;
      }[] = [
        // 0: Initial state - Lead planning
        {
          delay: 1400,
          beam: null,
          update: () => ({
            lead: { status: "working", tokens: 36000, activity: "Planning the fix", glow: false },
            researcher: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            "web-search": { status: "idle", tokens: 0, activity: "Idle", glow: false },
            coder: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            linter: { status: "idle", tokens: 0, activity: "Idle", glow: false },
            "test-runner": { status: "idle", tokens: 0, activity: "Idle", glow: false },
            reviewer: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            "docs-writer": { status: "idle", tokens: 0, activity: "Idle", glow: false },
          }),
        },
        // 1: Lead switches to "Delegating", light travels to Researcher
        {
          delay: 850,
          beam: { from: "lead", to: "researcher" },
          update: (prev) => ({
            ...prev,
            lead: { ...prev.lead, tokens: 44000, activity: "Delegating" },
          }),
        },
        // 2: Researcher receives handoff (Gradient Floor glow), starts working
        {
          delay: 1500,
          beam: null,
          update: (prev) => ({
            ...prev,
            researcher: { status: "working", tokens: 32000, activity: "Reading the bug report", glow: true },
          }),
        },
        // 3: Researcher traces cart.ts, hands off to Web search
        {
          delay: 800,
          beam: { from: "researcher", to: "web-search" },
          update: (prev) => ({
            ...prev,
            researcher: { status: "working", tokens: 62000, activity: "Tracing cart.ts", glow: false },
          }),
        },
        // 4: Web search receives handoff (glow), starts searching
        {
          delay: 1400,
          beam: null,
          update: (prev) => ({
            ...prev,
            "web-search": { status: "working", tokens: 14000, activity: "Searching docs", glow: true },
          }),
        },
        // 5: Web search completes, returns to Researcher
        {
          delay: 800,
          beam: { from: "web-search", to: "researcher" },
          update: (prev) => ({
            ...prev,
            "web-search": { status: "done", tokens: 26000, activity: "Found 3 matches", glow: false },
            researcher: { status: "working", tokens: 88000, activity: "Comparing reports", glow: false },
          }),
        },
        // 6: Researcher completes, returns to Lead
        {
          delay: 850,
          beam: { from: "researcher", to: "lead" },
          update: (prev) => ({
            ...prev,
            researcher: { status: "done", tokens: 104000, activity: "Found the cause", glow: false },
            lead: { status: "working", tokens: 58000, activity: "Assigning the patch", glow: false },
          }),
        },
        // 7: Lead hands off to Coder
        {
          delay: 800,
          beam: { from: "lead", to: "coder" },
          update: (prev) => ({
            ...prev,
            lead: { ...prev.lead, activity: "Watching the patch" },
          }),
        },
        // 8: Coder receives handoff (cyan Gradient Floor glow), starts editing
        {
          delay: 1600,
          beam: null,
          update: (prev) => ({
            ...prev,
            coder: { status: "working", tokens: 76000, activity: "Editing cart.ts", glow: true },
          }),
        },
        // 9: Coder writes tests, hands off to Linter
        {
          delay: 750,
          beam: { from: "coder", to: "linter" },
          update: (prev) => ({
            ...prev,
            coder: { status: "working", tokens: 112000, activity: "Writing 2 tests", glow: false },
          }),
        },
        // 10: Linter runs
        {
          delay: 1100,
          beam: null,
          update: (prev) => ({
            ...prev,
            linter: { status: "working", tokens: 13000, activity: "Linting 3 files", glow: true },
          }),
        },
        // 11: Linter finishes, hands off to Test runner
        {
          delay: 750,
          beam: { from: "coder", to: "test-runner" },
          update: (prev) => ({
            ...prev,
            linter: { status: "done", tokens: 15000, activity: "All clean", glow: false },
            coder: { ...prev.coder, tokens: 136000, activity: "Waiting on tests" },
          }),
        },
        // 12: Test runner runs
        {
          delay: 1300,
          beam: null,
          update: (prev) => ({
            ...prev,
            "test-runner": { status: "working", tokens: 37000, activity: "182/214 passing", glow: true },
          }),
        },
        // 13: Test runner finishes (214/214 pass), Coder finishes PR #482 (86% orange meter)
        {
          delay: 900,
          beam: { from: "test-runner", to: "coder" },
          update: (prev) => ({
            ...prev,
            "test-runner": { status: "done", tokens: 47000, activity: "All 214 pass", glow: false },
            coder: { status: "done", tokens: 172000, activity: "Opened PR #482", glow: false },
          }),
        },
        // 14: Coder hands off to Reviewer
        {
          delay: 850,
          beam: { from: "lead", to: "reviewer" },
          update: (prev) => ({
            ...prev,
          }),
        },
        // 15: Reviewer receives handoff (emerald Gradient Floor), reviews PR
        {
          delay: 1500,
          beam: null,
          update: (prev) => ({
            ...prev,
            reviewer: { status: "working", tokens: 68000, activity: "Reading the diff", glow: true },
          }),
        },
        // 16: Reviewer delegates to Docs writer
        {
          delay: 750,
          beam: { from: "reviewer", to: "docs-writer" },
          update: (prev) => ({
            ...prev,
            reviewer: { status: "working", tokens: 94000, activity: "Checking the tests", glow: false },
          }),
        },
        // 17: Docs writer writes notes
        {
          delay: 1300,
          beam: null,
          update: (prev) => ({
            ...prev,
            "docs-writer": { status: "working", tokens: 36000, activity: "Writing the release note", glow: true },
          }),
        },
        // 18: Docs writer completes, Reviewer approves
        {
          delay: 800,
          beam: { from: "docs-writer", to: "reviewer" },
          update: (prev) => ({
            ...prev,
            "docs-writer": { status: "done", tokens: 45000, activity: "Note written", glow: false },
            reviewer: { status: "done", tokens: 104000, activity: "Approved PR #482", glow: false },
          }),
        },
        // 19: Reviewer hands back to Lead
        {
          delay: 850,
          beam: { from: "reviewer", to: "lead" },
          update: (prev) => ({
            ...prev,
          }),
        },
        // 20: Settled State: Lead enters "Needs you" (amber badge, Merge PR #482?, 66k)
        {
          delay: 3400,
          beam: null,
          update: (prev) => ({
            ...prev,
            lead: { status: "needs-you", tokens: 66000, activity: "Merge PR #482?", glow: true },
          }),
        },
      ];

      const editorialSchedule: typeof schedule = [
        // 0: Editor planning & delegating
        {
          delay: 1300,
          beam: null,
          update: () => ({
            editor: { status: "working", tokens: 24000, activity: "Delegating", glow: false },
            researcher: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            writer: { status: "idle", tokens: 0, activity: "Waiting for work", glow: false },
            "fact-checker": { status: "idle", tokens: 1000, activity: "Idle", glow: false },
            seo: { status: "idle", tokens: 640, activity: "Idle", glow: false },
          }),
        },
        // 1: Editor -> Researcher beam
        {
          delay: 850,
          beam: { from: "editor", to: "researcher" },
          update: (prev) => ({
            ...prev,
            editor: { ...prev.editor, tokens: 30000, activity: "Delegating" },
          }),
        },
        // 2: Researcher working
        {
          delay: 1600,
          beam: null,
          update: (prev) => ({
            ...prev,
            researcher: { status: "working", tokens: 48000, activity: "Reading 42 tickets", glow: true },
          }),
        },
        // 3: Researcher done -> returns to Editor
        {
          delay: 850,
          beam: { from: "researcher", to: "editor" },
          update: (prev) => ({
            ...prev,
            researcher: { status: "done", tokens: 74000, activity: "Summarized 6 features", glow: false },
            editor: { status: "working", tokens: 38000, activity: "Assigning draft", glow: false },
          }),
        },
        // 4: Editor -> Writer beam
        {
          delay: 850,
          beam: { from: "editor", to: "writer" },
          update: (prev) => ({
            ...prev,
          }),
        },
        // 5: Writer working
        {
          delay: 1400,
          beam: null,
          update: (prev) => ({
            ...prev,
            writer: { status: "working", tokens: 42000, activity: "Drafting launch post", glow: true },
          }),
        },
        // 6: Writer -> Fact checker beam
        {
          delay: 750,
          beam: { from: "writer", to: "fact-checker" },
          update: (prev) => ({
            ...prev,
            writer: { status: "working", tokens: 68000, activity: "Checking claims", glow: false },
          }),
        },
        // 7: Fact checker working
        {
          delay: 1200,
          beam: null,
          update: (prev) => ({
            ...prev,
            "fact-checker": { status: "working", tokens: 18000, activity: "Verifying 8 metrics", glow: true },
          }),
        },
        // 8: Fact checker done -> Writer -> SEO beam
        {
          delay: 750,
          beam: { from: "writer", to: "seo" },
          update: (prev) => ({
            ...prev,
            "fact-checker": { status: "done", tokens: 24000, activity: "All 8 verified", glow: false },
            writer: { status: "working", tokens: 84000, activity: "Optimizing copy", glow: false },
          }),
        },
        // 9: SEO working
        {
          delay: 1200,
          beam: null,
          update: (prev) => ({
            ...prev,
            seo: { status: "working", tokens: 12000, activity: "Scoring keywords", glow: true },
          }),
        },
        // 10: SEO done, Writer done -> returns to Editor
        {
          delay: 850,
          beam: { from: "writer", to: "editor" },
          update: (prev) => ({
            ...prev,
            seo: { status: "done", tokens: 16000, activity: "Score 96/100", glow: false },
            writer: { status: "done", tokens: 102000, activity: "Draft ready", glow: false },
          }),
        },
        // 11: Settled State: Editor enters "Needs you"
        {
          delay: 3400,
          beam: null,
          update: (prev) => ({
            ...prev,
            editor: { status: "needs-you", tokens: 48000, activity: "Publish launch post?", glow: true },
          }),
        },
      ];

      const activeSchedule = variant === "editorial" ? editorialSchedule : schedule;

      if (simStep === 0) {
        setUserOverrides({});
      }

      const current = activeSchedule[simStep % activeSchedule.length];
      setActiveBeam(current.beam ?? null);
      setAgentStates(current.update);

      const timer = setTimeout(() => {
        setSimStep((prev) => (prev + 1) % activeSchedule.length);
      }, current.delay);

      return () => clearTimeout(timer);
    }, [simStep, liveAnimation, variant]);

    const rootPalette = AGENT_COLORS[data.color] ?? AGENT_COLORS.blue;
    const children = data.children ?? [];
    const colCount = children.length;

    const leadState = effectiveStates[data.id] || {
      status: data.status,
      tokens: data.tokensUsed,
      activity: data.message,
      glow: false,
    };

    const leftChildId = children[0]?.id;
    const middleChildId = colCount >= 3 ? children[1]?.id : undefined;
    const rightChildId = colCount >= 2 ? children[colCount - 1]?.id : undefined;

    // Determine beam active flags for desktop SVG dynamically
    const isBeamToLeft = activeBeam?.from === data.id && activeBeam?.to === leftChildId;
    const isBeamReturnFromLeft = activeBeam?.from === leftChildId && activeBeam?.to === data.id;
    const isBeamToMiddle = Boolean(middleChildId) && activeBeam?.from === data.id && activeBeam?.to === middleChildId;
    const isBeamToRight = Boolean(rightChildId) && activeBeam?.from === data.id && activeBeam?.to === rightChildId;
    const isBeamReturnFromRight = Boolean(rightChildId) && activeBeam?.from === rightChildId && activeBeam?.to === data.id;

    const trunkRef = useRef<HTMLDivElement>(null);
    const [trunkWidth, setTrunkWidth] = useState<number>(840);

    useEffect(() => {
      const el = trunkRef.current;
      if (!el) return;
      const updateWidth = () => {
        if (el.clientWidth > 0) setTrunkWidth(el.clientWidth);
      };
      updateWidth();
      const ro = new ResizeObserver(updateWidth);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    // Exact 1:1 pixel coordinates for 3-column grid with gap-5 (20px)
    const gapPx = 20;
    const colW = colCount > 0 ? (trunkWidth - gapPx * (colCount - 1)) / colCount : trunkWidth;
    const centerX = trunkWidth / 2;
    const leftX = colCount >= 1 ? colW / 2 : centerX;
    const rightX = colCount >= 2 ? (colCount - 1) * (colW + gapPx) + colW / 2 : centerX;
    const r = 8;

    const leftPath = `M ${centerX},0 V ${16 - r} Q ${centerX},16 ${centerX - r},16 H ${leftX + r} Q ${leftX},16 ${leftX},${16 + r} V 32`;
    const middlePath = `M ${centerX},0 V 32`;
    const rightPath = `M ${centerX},0 V ${16 - r} Q ${centerX},16 ${centerX + r},16 H ${rightX - r} Q ${rightX},16 ${rightX},${16 + r} V 32`;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full max-w-[920px] mx-auto select-none",
          animateIn && "animate-in fade-in duration-500",
          className,
        )}
        {...props}
      >
        {/* Agent Graph CSS Keyframes & Live Effects */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @keyframes agentGraphIn {
              from { opacity: 0; transform: translateY(6px) scale(0.98); }
            }
            @keyframes agentGraphDraw {
              from { stroke-dashoffset: 1; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes agentGraphPixel {
              0%, 100% { opacity: 1; }
              50% { opacity: 0.2; }
            }
            @keyframes agentGraphShine {
              from { background-position: 100% 0; }
              to { background-position: 0 0; }
            }
            @keyframes agentGraphGlowFade {
              0%, 30% { opacity: 1; }
              100% { opacity: 0; }
            }
            @keyframes agentGraphGlowRise {
              0% { transform: translate(0, 0) scale(1, 1); }
              100% { transform: translate(0, -25%) scale(1.08, 1.8); }
            }
            @keyframes agentGraphGlowFromTop {
              0% { transform: translate(0, 0) scale(1, 1); }
              100% { transform: translate(0, 25%) scale(1.08, 1.8); }
            }
            @keyframes agentGraphGlowFromLeft {
              0% { transform: translate(0, 0) scale(1, 1); }
              100% { transform: translate(25%, 0) scale(1.8, 1.08); }
            }
            @keyframes agentGraphBeamTravel {
              0% { stroke-dashoffset: 28; opacity: 0; }
              12% { opacity: 1; }
              88% { opacity: 1; }
              100% { stroke-dashoffset: -100; opacity: 0; }
            }
            @keyframes agentGraphBeamReturn {
              0% { stroke-dashoffset: -100; opacity: 0; }
              12% { opacity: 1; }
              88% { opacity: 1; }
              100% { stroke-dashoffset: 28; opacity: 0; }
            }
            .agent-graph-activity-live {
              background: linear-gradient(90deg, #52525b 0%, #18181b 50%, #52525b 100%) 100% 0 / 260% 100%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: agentGraphShine 2s linear infinite;
            }
            .dark .agent-graph-activity-live {
              background: linear-gradient(90deg, #a1a1aa 0%, #f4f4f5 50%, #a1a1aa 100%) 100% 0 / 260% 100%;
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: agentGraphShine 2s linear infinite;
            }
            .agent-graph-mark-busy i {
              animation: agentGraphPixel 1.2s ease-in-out infinite both;
            }
          `
        }} />

        {/* Root Node (Lead) */}
        <div className="w-full md:w-[272px] md:mx-auto">
          <AgentCard
            node={data}
            anchorPosition="center-desktop-left-mobile"
            shade={shade}
            isOpen={openCardId === data.id}
            onToggleOpen={() =>
              setOpenCardId(openCardId === data.id ? null : data.id)
            }
            isWorking={leadState.status === "working"}
            isDone={leadState.status === "done"}
            isPaused={leadState.status === "paused"}
            isWaiting={leadState.status === "needs-you"}
            hasArrivalGlow={leadState.glow}
            arrivalSide="bottom"
            tokensCurrent={leadState.tokens}
            liveActivityText={leadState.activity}
            onPause={() => handleAgentAction(data.id, "pause")}
            onResume={() => handleAgentAction(data.id, "resume")}
            onStop={() => handleAgentAction(data.id, "stop")}
            onApprove={() => handleAgentAction(data.id, "approve")}
            onDecline={() => handleAgentAction(data.id, "decline")}
          />
        </div>

        {/* Mobile Vertical Tree (< md) */}
        {colCount > 0 && (
          <div className="md:hidden">
            <SubAgentBranch
              nodes={children}
              lineColor={rootPalette.hex}
              compact={false}
              shade={shade}
              openCardId={openCardId}
              setOpenCardId={setOpenCardId}
              stateMap={effectiveStates}
              activeBeam={activeBeam}
              onAgentAction={handleAgentAction}
              renderNode={(child) => {
                const childPalette =
                  AGENT_COLORS[child.color] ?? AGENT_COLORS.blue;
                const s = effectiveStates[child.id] || {
                  status: child.status,
                  tokens: child.tokensUsed,
                  activity: child.message,
                  glow: false,
                };

                return (
                  <div>
                    <AgentCard
                      node={child}
                      shade={shade}
                      isOpen={openCardId === child.id}
                      onToggleOpen={() =>
                        setOpenCardId(openCardId === child.id ? null : child.id)
                      }
                      isWorking={s.status === "working"}
                      isDone={s.status === "done"}
                      isPaused={s.status === "paused"}
                      isWaiting={s.status === "needs-you"}
                      hasArrivalGlow={s.glow}
                      arrivalSide="top"
                      tokensCurrent={s.tokens}
                      liveActivityText={s.activity}
                      onPause={() => handleAgentAction(child.id, "pause")}
                      onResume={() => handleAgentAction(child.id, "resume")}
                      onStop={() => handleAgentAction(child.id, "stop")}
                      onApprove={() => handleAgentAction(child.id, "approve")}
                      onDecline={() => handleAgentAction(child.id, "decline")}
                    />
                    {child.children && child.children.length > 0 && (
                      <SubAgentBranch
                        nodes={child.children}
                        lineColor={childPalette.hex}
                        shade={shade}
                        openCardId={openCardId}
                        setOpenCardId={setOpenCardId}
                        stateMap={effectiveStates}
                        activeBeam={activeBeam}
                        onAgentAction={handleAgentAction}
                      />
                    )}
                  </div>
                );
              }}
            />
          </div>
        )}

        {/* Desktop Horizontal Multi-Column Tree (>= md) */}
        {colCount > 0 && (
          <div className={cn("hidden md:block", colCount === 2 && "max-w-[600px] mx-auto")}>
            {/* SVG Connector Trunk between Root and Columns (1:1 CSS pixel space) */}
            <div ref={trunkRef} className="relative w-full h-8 pointer-events-none">
              <svg
                className="w-full h-full overflow-visible"
                viewBox={`0 0 ${trunkWidth} 32`}
              >
                {/* Center origin dot under Root */}
                <circle
                  cx={centerX}
                  cy="0"
                  r="3"
                  className="fill-white dark:fill-zinc-950"
                  stroke="#0190fe"
                  strokeWidth="1.5"
                />

                {/* Base neutral connector rails */}
                {/* Left Branch Rail (Root to Col 0) */}
                <path
                  d={leftPath}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  className={cn(
                    "transition-opacity duration-500",
                    isBeamToLeft || isBeamReturnFromLeft
                      ? "text-blue-500/50 opacity-90"
                      : "text-neutral-300 dark:text-zinc-700 opacity-60",
                  )}
                />
                {/* Middle Branch Rail (Root to middle column when 3+ cols) */}
                {colCount >= 3 && (
                  <path
                    d={middlePath}
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    className={cn(
                      "transition-opacity duration-500",
                      isBeamToMiddle
                        ? "text-blue-500/50 opacity-90"
                        : "text-neutral-300 dark:text-zinc-700 opacity-60",
                    )}
                  />
                )}
                {/* Right Branch Rail (Lead to Col 2) */}
                <path
                  d={rightPath}
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  className={cn(
                    "transition-opacity duration-500",
                    isBeamToRight || isBeamReturnFromRight
                      ? "text-blue-500/50 opacity-90"
                      : "text-neutral-300 dark:text-zinc-700 opacity-60",
                  )}
                />

                {/* TRAVELING HANDOFF LIGHT: Lead -> Researcher (Left) */}
                {isBeamToLeft && (
                  <path
                    d={leftPath}
                    stroke="#0190fe"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="28 130"
                    className="animate-[agentGraphBeamTravel_0.85s_cubic-bezier(0.32,0.72,0.24,1)_forwards]"
                    style={{
                      filter: "drop-shadow(0 0 1.5px rgba(1,144,254,0.45))",
                    }}
                  />
                )}

                {/* RETURN HANDOFF LIGHT: Researcher -> Lead */}
                {isBeamReturnFromLeft && (
                  <path
                    d={leftPath}
                    stroke="#a855f7"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="28 130"
                    className="animate-[agentGraphBeamReturn_0.85s_cubic-bezier(0.32,0.72,0.24,1)_forwards]"
                    style={{
                      filter: "drop-shadow(0 0 1.5px rgba(168,85,247,0.45))",
                    }}
                  />
                )}

                {/* TRAVELING HANDOFF LIGHT: Lead -> Coder (Middle) */}
                {isBeamToMiddle && (
                  <path
                    d={middlePath}
                    stroke="#0190fe"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="28 130"
                    className="animate-[agentGraphBeamTravel_0.8s_cubic-bezier(0.32,0.72,0.24,1)_forwards]"
                    style={{
                      filter: "drop-shadow(0 0 1.5px rgba(1,144,254,0.45))",
                    }}
                  />
                )}

                {/* TRAVELING HANDOFF LIGHT: Lead -> Reviewer (Right) */}
                {isBeamToRight && (
                  <path
                    d={rightPath}
                    stroke="#0190fe"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="28 130"
                    className="animate-[agentGraphBeamTravel_0.85s_cubic-bezier(0.32,0.72,0.24,1)_forwards]"
                    style={{
                      filter: "drop-shadow(0 0 1.5px rgba(1,144,254,0.45))",
                    }}
                  />
                )}

                {/* RETURN HANDOFF LIGHT: Reviewer -> Lead */}
                {isBeamReturnFromRight && (
                  <path
                    d={rightPath}
                    stroke="#10b981"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    pathLength="100"
                    strokeDasharray="28 130"
                    className="animate-[agentGraphBeamReturn_0.85s_cubic-bezier(0.32,0.72,0.24,1)_forwards]"
                    style={{
                      filter: "drop-shadow(0 0 1.5px rgba(16,185,129,0.45))",
                    }}
                  />
                )}
              </svg>
            </div>

            {/* 3 Columns Grid */}
            <div
              className="grid gap-5"
              style={{
                gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`,
              }}
            >
              {children.map((child) => {
                const childPalette =
                  AGENT_COLORS[child.color] ?? AGENT_COLORS.blue;
                const s = effectiveStates[child.id] || {
                  status: child.status,
                  tokens: child.tokensUsed,
                  activity: child.message,
                  glow: false,
                };

                return (
                  <div key={child.id} className="relative flex flex-col">
                    {/* Level 1 Card */}
                    <AgentCard
                      node={child}
                      shade={shade}
                      isOpen={openCardId === child.id}
                      onToggleOpen={() =>
                        setOpenCardId(openCardId === child.id ? null : child.id)
                      }
                      isWorking={s.status === "working"}
                      isDone={s.status === "done"}
                      isPaused={s.status === "paused"}
                      isWaiting={s.status === "needs-you"}
                      hasArrivalGlow={s.glow}
                      arrivalSide="top"
                      tokensCurrent={s.tokens}
                      liveActivityText={s.activity}
                      onPause={() => handleAgentAction(child.id, "pause")}
                      onResume={() => handleAgentAction(child.id, "resume")}
                      onStop={() => handleAgentAction(child.id, "stop")}
                      onApprove={() => handleAgentAction(child.id, "approve")}
                      onDecline={() => handleAgentAction(child.id, "decline")}
                    />

                    {/* Level 2 Sub-Agents */}
                    {child.children && child.children.length > 0 && (
                      <SubAgentBranch
                        nodes={child.children}
                        lineColor={childPalette.hex}
                        shade={shade}
                        openCardId={openCardId}
                        setOpenCardId={setOpenCardId}
                        stateMap={effectiveStates}
                        activeBeam={activeBeam}
                        onAgentAction={handleAgentAction}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  },
);
AgentGraph.displayName = "AgentGraph";
