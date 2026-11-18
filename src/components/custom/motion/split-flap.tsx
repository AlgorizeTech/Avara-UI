"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import { animate } from "motion/react";
import { cn } from "@/lib/utils";

// ============================================================================
// CONSTANTS & TYPES
// ============================================================================
export const SPLIT_FLAP_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:!?-";
const EDGE_THICKNESS = 3;

export interface SplitFlapProps {
  /** Text to display or pipe-separated messages (e.g. "DESIGN | SPLIT-FLAP | FUTURE UI") */
  text?: string;
  /** Array of messages to cycle through */
  messages?: string[];
  /** Visual theme preset: "ivory" | "minimalist" | "dark" | "light" (default: "ivory") */
  theme?: "ivory" | "minimalist" | "dark" | "light";
  /** Also alias variant for backward compatibility */
  variant?: "ivory" | "minimalist" | "dark" | "light";
  /** Font size in pixels (default: 38) */
  fontSize?: number;
  /** Size preset: "sm" | "md" | "lg" (convenience shortcut for fontSize) */
  size?: "sm" | "md" | "lg";
  /** Number of character columns. If omitted, automatically fits the longest message */
  columns?: number;
  /** Flip speed in milliseconds per unit (default: 60) */
  speed?: number;
  /** Stagger delay in milliseconds across columns (default: 80) */
  stagger?: number;
  /** Also alias staggerDelay */
  staggerDelay?: number;
  /** Dwell time in milliseconds each message stays stationary (default: 3000) */
  dwell?: number;
  /** Also alias interval for dwell time */
  interval?: number;
  /** Text color (default: "#ff7657" or theme accent) */
  accentColor?: string;
  /** Active theme color bridged from theme picker or custom hex */
  color?: string;
  /** Whether to play realistic mechanical click sound (default: false) */
  sound?: boolean;
  /** Whether to auto-cycle through messages (default: true) */
  autoPlay?: boolean;
  /** Custom class names */
  className?: string;
}

interface ThemeConfig {
  plate: string;
  plateBorder: string;
  topFlap: string;
  bottomFlap: string;
  divider: string;
  dividerGlow: string;
  lightDarkness: number;
  edgeColor: string;
  edgeHighlight: string;
  fontFamily: string;
  defaultAccent: string;
}

const SPLIT_FLAP_THEMES: Record<
  string,
  { light: ThemeConfig; dark: ThemeConfig }
> = {
  // 1. IVORY (Retro Solari departure board)
  ivory: {
    light: {
      plate:
        "linear-gradient(180deg, #f8f7f4 0%, #f2efe9 48%, #eae5dc 50%, #ede9df 52%, #f4f1ea 100%)",
      plateBorder: "1px solid #ded8cc",
      topFlap: "linear-gradient(180deg, #f8f7f4 0%, #ede8de 100%)",
      bottomFlap: "linear-gradient(180deg, #e5dfd4 0%, #f4f1ea 100%)",
      divider: "rgba(180, 170, 155, 0.45)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.8)",
      lightDarkness: 0.22,
      edgeColor: "#d5cec2",
      edgeHighlight: "#ffffff",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#ea583a",
    },
    dark: {
      plate:
        "linear-gradient(180deg, #23201d 0%, #181614 48%, #100f0e 50%, #181614 52%, #1f1d1a 100%)",
      plateBorder: "1px solid rgba(255,255,255,0.1)",
      topFlap: "linear-gradient(180deg, #262320 0%, #1a1816 100%)",
      bottomFlap: "linear-gradient(180deg, #131211 0%, #1e1c19 100%)",
      divider: "rgba(0,0,0,0.85)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.06)",
      lightDarkness: 0.35,
      edgeColor: "#0a0a0a",
      edgeHighlight: "#36322e",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#ea583a",
    },
  },

  // 2. MINIMALIST (Clean frosted / slate glass cards)
  minimalist: {
    light: {
      plate:
        "linear-gradient(180deg, #ffffff 0%, #f4f4f5 48%, #e4e4e7 50%, #f4f4f5 52%, #ffffff 100%)",
      plateBorder: "1px solid rgba(228,228,231,0.9)",
      topFlap: "linear-gradient(180deg, #ffffff 0%, #f4f4f5 100%)",
      bottomFlap: "linear-gradient(180deg, #f4f4f5 0%, #ffffff 100%)",
      divider: "rgba(0,0,0,0.12)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.8)",
      lightDarkness: 0.2,
      edgeColor: "#e4e4e7",
      edgeHighlight: "#ffffff",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#27272a",
    },
    dark: {
      plate:
        "linear-gradient(180deg, #222227 0%, #161619 48%, #0e0e10 50%, #161619 52%, #1e1e22 100%)",
      plateBorder: "1px solid rgba(255,255,255,0.12)",
      topFlap: "linear-gradient(180deg, #25252b 0%, #18181c 100%)",
      bottomFlap: "linear-gradient(180deg, #111114 0%, #1d1d21 100%)",
      divider: "rgba(0,0,0,0.8)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.06)",
      lightDarkness: 0.32,
      edgeColor: "#09090b",
      edgeHighlight: "#32323a",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#f4f4f5",
    },
  },

  // 3. DARK (Departure board dark)
  dark: {
    light: {
      plate:
        "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 48%, #111 50%, #1a1a1a 52%, #222 100%)",
      plateBorder: "1px solid rgba(255,255,255,0.08)",
      topFlap: "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
      bottomFlap: "linear-gradient(180deg, #1a1a1a 0%, #222 100%)",
      divider: "rgba(0,0,0,0.7)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.04)",
      lightDarkness: 0.35,
      edgeColor: "#0a0a0a",
      edgeHighlight: "#333333",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#ff7657",
    },
    dark: {
      plate:
        "linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 48%, #111 50%, #1a1a1a 52%, #222 100%)",
      plateBorder: "1px solid rgba(255,255,255,0.08)",
      topFlap: "linear-gradient(180deg, #2a2a2a 0%, #1e1e1e 100%)",
      bottomFlap: "linear-gradient(180deg, #1a1a1a 0%, #222 100%)",
      divider: "rgba(0,0,0,0.7)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.04)",
      lightDarkness: 0.35,
      edgeColor: "#0a0a0a",
      edgeHighlight: "#333333",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#ff7657",
    },
  },

  // 4. LIGHT (Departure board light)
  light: {
    light: {
      plate:
        "linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 48%, #ddd 50%, #e8e8e8 52%, #f0f0f0 100%)",
      plateBorder: "1px solid rgba(0,0,0,0.1)",
      topFlap: "linear-gradient(180deg, #f5f5f5 0%, #eee 100%)",
      bottomFlap: "linear-gradient(180deg, #e8e8e8 0%, #f0f0f0 100%)",
      divider: "rgba(0,0,0,0.15)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.6)",
      lightDarkness: 0.2,
      edgeColor: "#bbb",
      edgeHighlight: "#ddd",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#ff7657",
    },
    dark: {
      plate:
        "linear-gradient(180deg, #f5f5f5 0%, #e8e8e8 48%, #ddd 50%, #e8e8e8 52%, #f0f0f0 100%)",
      plateBorder: "1px solid rgba(0,0,0,0.1)",
      topFlap: "linear-gradient(180deg, #f5f5f5 0%, #eee 100%)",
      bottomFlap: "linear-gradient(180deg, #e8e8e8 0%, #f0f0f0 100%)",
      divider: "rgba(0,0,0,0.15)",
      dividerGlow: "0 1px 0 rgba(255,255,255,0.6)",
      lightDarkness: 0.2,
      edgeColor: "#bbb",
      edgeHighlight: "#ddd",
      fontFamily: "'Courier New', 'Consolas', 'Monaco', monospace",
      defaultAccent: "#ff7657",
    },
  },
};

function getSplitFlapTheme(
  themeKey: string = "ivory",
  isDark: boolean = false
): ThemeConfig {
  const preset =
    SPLIT_FLAP_THEMES[themeKey] || SPLIT_FLAP_THEMES.ivory;
  return isDark ? preset.dark : preset.light;
}

/** Hook to automatically detect system / document dark mode */
function useIsDarkMode(): boolean {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const check = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(
        hasDarkClass ||
          (prefersDark && !document.documentElement.classList.contains("light"))
      );
    };

    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", check);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", check);
    };
  }, []);

  return isDark;
}

// ============================================================================
// AUDIO GENERATOR
// ============================================================================
class SplitFlapAudio {
  private ctx: AudioContext | null = null;

  private init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  playClick(pitchVariance = 1) {
    try {
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(320 * pitchVariance, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.04);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(100, now + 0.04);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // The click is a nicety: a blocked or unsupported AudioContext just stays silent.
    }
  }
}

const audioPlayer = new SplitFlapAudio();

// Dynamic shadow calculation
function applyDynamicShadow(
  shadowEl: HTMLDivElement | null,
  progress: number,
  lightDarkness: number
) {
  const sin = Math.sin(progress * Math.PI);
  if (shadowEl) {
    shadowEl.style.opacity = `${sin * lightDarkness}`;
  }
}

// Center/Pad message helper
function padMessage(msg: string, targetLen: number): string {
  if (msg.length >= targetLen) return msg.slice(0, targetLen);
  const leftPad = Math.floor((targetLen - msg.length) / 2);
  return msg.padStart(msg.length + leftPad, " ").padEnd(targetLen, " ");
}

// Theme & Color resolution helpers
const SPLIT_FLAP_COLOR_PRESETS: Record<string, string> = {
  lavender: "#9b8afb",
  indigo: "#6366f1",
  rose: "#f43f5e",
  emerald: "#10b981",
};

function resolveColor(color?: string): string | null {
  if (!color || color === "default" || color === "primary") return null;
  return SPLIT_FLAP_COLOR_PRESETS[color] ?? color;
}

// ============================================================================
// FLAP UNIT COMPONENT (FutureUI Architecture)
// ============================================================================
export interface FlapUnitHandle {
  /** Shutter the leaves shut over the old character, after `delay` seconds. */
  close: (speed: number, delay?: number) => void;
  /** Fold the leaves open onto `newChar`, after `delay` seconds. */
  open: (newChar: string, speed: number, delay?: number) => void;
  /** Show `char` at once, with no flip. */
  set: (char: string) => void;
  kill: () => void;
}

/** GSAP's `power3.out` and `power2.in`, so the flip keeps its feel. */
const easePower3Out = (t: number) => 1 - Math.pow(1 - t, 4);
const easePower2In = (t: number) => t * t * t;
/** The bottom leaf starts this many seconds after the top one. */
const BOTTOM_LEAF_LAG = 0.05;

interface FlapStep {
  el: HTMLElement | null;
  shadow: HTMLDivElement | null;
  /** 0 when the leaf starts flat, anything else when it starts folded. */
  startProgressDir: number;
  from: number;
  to: number;
  ease: (t: number) => number;
  /** Seconds into the flip when this leaf starts. */
  offset: number;
}

interface FlapUnitProps {
  fontSize: number;
  accentColor: string;
  colIndex: number;
  theme: ThemeConfig;
  soundEnabled: boolean;
}

const FlapUnit = forwardRef<FlapUnitHandle, FlapUnitProps>(
  ({ fontSize, accentColor, colIndex, theme: d, soundEnabled }, ref) => {
    const staticTopRef = useRef<HTMLDivElement>(null);
    const staticBottomRef = useRef<HTMLDivElement>(null);
    const topFlapRef = useRef<HTMLDivElement>(null);
    const bottomFlapRef = useRef<HTMLDivElement>(null);
    const shadowTopRef = useRef<HTMLDivElement>(null);
    const shadowBottomRef = useRef<HTMLDivElement>(null);

    const activeFlip = useRef<ReturnType<typeof animate> | null>(null);

    const unitHeight = fontSize * 1.6;
    const unitWidth = fontSize * 1.1;
    const halfHeight = unitHeight / 2;

    const fontStyle = useMemo<React.CSSProperties>(
      () => ({
        fontFamily: d.fontFamily,
        fontSize: `${fontSize}px`,
        fontWeight: 700,
        color: accentColor,
        lineHeight: `${unitHeight}px`,
        textAlign: "center",
        width: "100%",
        position: "absolute",
        left: 0,
        userSelect: "none",
      }),
      [fontSize, accentColor, unitHeight, d.fontFamily]
    );

    // Immediately synchronize color change across all flap DOM nodes
    useEffect(() => {
      if (staticTopRef.current) staticTopRef.current.style.color = accentColor;
      if (staticBottomRef.current) staticBottomRef.current.style.color = accentColor;
      if (topFlapRef.current) {
        const textEl = topFlapRef.current.querySelector<HTMLElement>(".flap-text");
        if (textEl) textEl.style.color = accentColor;
      }
      if (bottomFlapRef.current) {
        const textEl = bottomFlapRef.current.querySelector<HTMLElement>(".flap-text");
        if (textEl) textEl.style.color = accentColor;
      }
    }, [accentColor]);

    const killActiveFlip = () => {
      activeFlip.current?.stop();
      activeFlip.current = null;
    };

    const resetShadows = () => {
      if (shadowTopRef.current) shadowTopRef.current.style.opacity = "0";
      if (shadowBottomRef.current) shadowBottomRef.current.style.opacity = "0";
    };

    const hideLeaves = () => {
      for (const leaf of [topFlapRef.current, bottomFlapRef.current]) {
        if (!leaf) continue;
        leaf.style.opacity = "0";
        leaf.style.zIndex = "1";
      }
    };

    /**
     * Plays both leaves as one animation: the top leaf, then the bottom one
     * `BOTTOM_LEAF_LAG` seconds behind. `setup` runs when the flip actually
     * starts (after `delay`) and `finish` when it ends.
     */
    const flip = (
      steps: FlapStep[],
      duration: number,
      delay: number,
      setup: () => void,
      finish?: () => void
    ) => {
      killActiveFlip();
      // The handle is rebuilt every render, so `d` is the committed theme.
      const { lightDarkness } = d;
      const total = duration + BOTTOM_LEAF_LAG;
      let started = false;

      activeFlip.current = animate(0, total, {
        delay,
        duration: total,
        ease: "linear",
        onUpdate: (time) => {
          if (!started) {
            started = true;
            setup();
          }
          for (const step of steps) {
            if (!step.el) continue;
            const eased = step.ease(
              Math.min(1, Math.max(0, (time - step.offset) / duration))
            );
            step.el.style.transform = `rotateX(${
              step.from + (step.to - step.from) * eased
            }deg)`;
            applyDynamicShadow(
              step.shadow,
              step.startProgressDir === 0 ? eased : 1 - eased,
              lightDarkness
            );
          }
        },
        onComplete: () => {
          activeFlip.current = null;
          finish?.();
        },
      });
    };

    useImperativeHandle(ref, () => ({
      // FutureUI Shutter Close: Flaps close toward center slit
      close(speed: number, delay = 0) {
        killActiveFlip();
        const topEl = topFlapRef.current;
        const bottomEl = bottomFlapRef.current;
        if (!topEl || !bottomEl) return;

        const topText = topEl.querySelector(".flap-text");
        const bottomText = bottomEl.querySelector(".flap-text");
        const duration = Math.max(speed / 1000, 0.08) * 2;

        flip(
          [
            {
              el: topEl,
              shadow: shadowTopRef.current,
              startProgressDir: -90,
              from: -90,
              to: 0,
              ease: easePower3Out,
              offset: 0,
            },
            {
              el: bottomEl,
              shadow: shadowBottomRef.current,
              startProgressDir: 90,
              from: 90,
              to: 0,
              ease: easePower3Out,
              offset: BOTTOM_LEAF_LAG,
            },
          ],
          duration,
          delay,
          () => {
            if (topText) topText.textContent = "";
            if (bottomText) bottomText.textContent = "";
            resetShadows();
            topEl.style.transform = "rotateX(-90deg)";
            topEl.style.opacity = "1";
            topEl.style.zIndex = "3";
            topEl.style.transformOrigin = "top center";
            bottomEl.style.transform = "rotateX(90deg)";
            bottomEl.style.opacity = "1";
            bottomEl.style.zIndex = "3";
            bottomEl.style.transformOrigin = "bottom center";
          }
        );
      },

      // FutureUI Shutter Open: New character unfolds open from center slit
      open(newChar: string, speed: number, delay = 0) {
        killActiveFlip();
        const staticTop = staticTopRef.current;
        const staticBottom = staticBottomRef.current;
        const topEl = topFlapRef.current;
        const bottomEl = bottomFlapRef.current;
        if (!staticTop || !staticBottom || !topEl || !bottomEl) return;

        const duration = Math.max(speed / 1000, 0.08) * 2;

        flip(
          [
            {
              el: topEl,
              shadow: shadowTopRef.current,
              startProgressDir: 0,
              from: 0,
              to: -90,
              ease: easePower2In,
              offset: 0,
            },
            {
              el: bottomEl,
              shadow: shadowBottomRef.current,
              startProgressDir: 0,
              from: 0,
              to: 90,
              ease: easePower2In,
              offset: BOTTOM_LEAF_LAG,
            },
          ],
          duration,
          delay,
          () => {
            staticTop.textContent = newChar;
            staticBottom.textContent = newChar;
            if (soundEnabled && newChar.trim() !== "") {
              audioPlayer.playClick(0.95 + Math.random() * 0.15);
            }
            topEl.style.transform = "rotateX(0deg)";
            topEl.style.opacity = "1";
            topEl.style.zIndex = "3";
            topEl.style.transformOrigin = "top center";
            bottomEl.style.transform = "rotateX(0deg)";
            bottomEl.style.opacity = "1";
            bottomEl.style.zIndex = "3";
            bottomEl.style.transformOrigin = "bottom center";
          },
          () => {
            resetShadows();
            hideLeaves();
          }
        );
      },

      set(char: string) {
        killActiveFlip();
        if (staticTopRef.current) staticTopRef.current.textContent = char;
        if (staticBottomRef.current) staticBottomRef.current.textContent = char;
        resetShadows();
        hideLeaves();
      },

      kill() {
        killActiveFlip();
        resetShadows();
        hideLeaves();
      },
    }));

    return (
      <div
        style={{
          position: "relative",
          width: unitWidth,
          height: unitHeight,
          perspective: 400,
        }}
        data-col={colIndex}
      >
        {/* 1. Background Plate (clean border, no heavy shadow) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 5,
            background: d.plate,
            border: d.plateBorder,
          }}
        />

        {/* 2. Static Top Flap. Its character is written by `open()`; React only
            renders the blank it starts with, so re-renders never overwrite it. */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: halfHeight,
            overflow: "hidden",
            borderRadius: "5px 5px 0 0",
            zIndex: 1,
          }}
        >
          <div ref={staticTopRef} style={{ ...fontStyle, top: 0 }}>
            {" "}
          </div>
        </div>

        {/* 3. Static Bottom Flap */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: halfHeight,
            overflow: "hidden",
            borderRadius: "0 0 5px 5px",
            zIndex: 1,
          }}
        >
          <div ref={staticBottomRef} style={{ ...fontStyle, bottom: 0 }}>
            {" "}
          </div>
        </div>

        {/* 4. Animating Top Leaf (with 3D thickness edge) */}
        <div
          ref={topFlapRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: halfHeight,
            borderRadius: "5px 5px 0 0",
            transformOrigin: "bottom center",
            transformStyle: "preserve-3d",
            willChange: "transform",
            zIndex: 3,
            opacity: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: "5px 5px 0 0",
              background: d.topFlap,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flap-text" style={{ ...fontStyle, top: 0 }}>
              {" "}
            </div>
          </div>
          {/* Dynamic Light Shadow */}
          <div
            ref={shadowTopRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "5px 5px 0 0",
              background: "#000",
              opacity: 0,
              pointerEvents: "none",
              willChange: "opacity",
            }}
          />
          {/* 3D Physical Edge Thickness */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: EDGE_THICKNESS,
              background: `linear-gradient(180deg, ${d.edgeHighlight} 0%, ${d.edgeColor} 100%)`,
              transform: "rotateX(-90deg)",
              transformOrigin: "bottom center",
              backfaceVisibility: "hidden",
            }}
          />
        </div>

        {/* 5. Animating Bottom Leaf (with 3D thickness edge) */}
        <div
          ref={bottomFlapRef}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: halfHeight,
            borderRadius: "0 0 5px 5px",
            transformOrigin: "top center",
            transformStyle: "preserve-3d",
            willChange: "transform",
            zIndex: 2,
            opacity: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              borderRadius: "0 0 5px 5px",
              background: d.bottomFlap,
              backfaceVisibility: "hidden",
            }}
          >
            <div className="flap-text" style={{ ...fontStyle, bottom: 0 }}>
              {" "}
            </div>
          </div>
          {/* Dynamic Light Shadow */}
          <div
            ref={shadowBottomRef}
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "0 0 5px 5px",
              background: "#000",
              opacity: 0,
              pointerEvents: "none",
              willChange: "opacity",
            }}
          />
          {/* 3D Physical Edge Thickness */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: EDGE_THICKNESS,
              background: `linear-gradient(0deg, ${d.edgeHighlight} 0%, ${d.edgeColor} 100%)`,
              transform: "rotateX(90deg)",
              transformOrigin: "top center",
              backfaceVisibility: "hidden",
            }}
          />
        </div>

        {/* 6. Center Split Line with Subtle Glow */}
        <div
          style={{
            position: "absolute",
            top: halfHeight - 0.5,
            left: 0,
            width: "100%",
            height: 1,
            background: d.divider,
            zIndex: 10,
            boxShadow: d.dividerGlow,
          }}
        />
      </div>
    );
  }
);
FlapUnit.displayName = "FlapUnit";

// ============================================================================
// MAIN SPLIT-FLAP DISPLAY CONTAINER COMPONENT
// ============================================================================
export const SplitFlap: React.FC<SplitFlapProps> = ({
  text = "SPLIT-FLAP | MECHANICAL 3D | TIMELESS CRAFT",
  messages,
  theme,
  variant,
  fontSize,
  size = "md",
  columns,
  speed = 60,
  stagger,
  staggerDelay,
  dwell,
  interval,
  accentColor,
  color,
  sound = false,
  autoPlay = true,
  className,
}) => {
  // Determine effective theme with automatic dark mode support
  const isDarkMode = useIsDarkMode();
  const selectedThemeKey = theme || variant || "ivory";
  const activeTheme = getSplitFlapTheme(selectedThemeKey, isDarkMode);

  // Font size calculation from preset or explicit prop
  const computedFontSize = useMemo(() => {
    if (fontSize && fontSize > 0) return fontSize;
    switch (size) {
      case "sm":
        return 26;
      case "lg":
        return 48;
      case "md":
      default:
        return 38;
    }
  }, [fontSize, size]);

  const rawColor = color || accentColor;
  const resolvedAccent = resolveColor(rawColor);
  const effectiveAccent = resolvedAccent || activeTheme.defaultAccent;
  const effectiveStagger = stagger ?? staggerDelay ?? 80;
  const effectiveDwell = dwell ?? interval ?? 3000;

  // Normalize message list
  const messageList: string[] = useMemo(() => {
    if (messages && messages.length > 0) {
      return messages.map((m) => m.trim().toUpperCase()).filter(Boolean);
    }
    if (text) {
      return text
        .split("|")
        .map((m) => m.trim().toUpperCase())
        .filter(Boolean);
    }
    return ["SPLIT-FLAP", "RETRO MECHANICAL", "SOLARI BOARD"];
  }, [messages, text]);

  // Compute number of columns needed
  const totalColumns = useMemo(() => {
    if (columns && columns > 0) return columns;
    const maxLen = Math.max(
      ...messageList.map((m) => m.trimEnd().length),
      10
    );
    return maxLen;
  }, [columns, messageList]);

  const containerRef = useRef<HTMLDivElement>(null);
  const unitsRef = useRef<(FlapUnitHandle | null)[]>([]);
  const currentIndexRef = useRef(0);

  // The cycle reads the latest timings on each turn without restarting.
  const speedRef = useRef(speed);
  const staggerRef = useRef(effectiveStagger);
  const dwellRef = useRef(effectiveDwell);
  useEffect(() => {
    speedRef.current = speed;
    staggerRef.current = effectiveStagger;
    dwellRef.current = effectiveDwell;
  }, [speed, effectiveStagger, effectiveDwell]);

  const getPaddedMessage = (index: number) =>
    padMessage(messageList[index] ?? "", totalColumns);

  // The board turns outside React, so its label follows it the same way.
  const announce = (message: string | undefined) => {
    containerRef.current?.setAttribute("aria-label", `Split-flap display: ${message}`);
  };

  // FutureUI Motion Split-Flap Animation Cycle
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize units with first message
    const initialMessage = getPaddedMessage(0);
    announce(messageList[0]);
    for (let col = 0; col < unitsRef.current.length; col++) {
      const unit = unitsRef.current[col];
      if (!unit) continue;
      const ch = initialMessage[col] ?? " ";
      unit.set(ch);
    }

    if (!autoPlay || messageList.length <= 1) return;

    let isMounted = true;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const scheduleTimeout = (cb: () => void, ms: number) => {
      timeouts.push(
        setTimeout(() => {
          if (isMounted) cb();
        }, ms)
      );
    };

    // Check if 2nd variant: random / scattered flip order ("elomelo kore flip")
    const isRandomStagger =
      selectedThemeKey === "minimalist" || selectedThemeKey === "dark";

    const runWaveTransition = () => {
      const currentSpeed = speedRef.current;
      const currentStagger = staggerRef.current;
      const currentDwell = dwellRef.current;

      const totalSpan = (unitsRef.current.length - 1) * (currentStagger / 1000);
      const flapDuration = Math.max(currentSpeed / 1000, 0.08) * 2;
      const stepDuration = totalSpan + flapDuration + 0.15;

      // Generate delays: either scattered/random ("elomelo") or sequential cascade
      const delays: number[] = unitsRef.current.map((_, i) =>
        isRandomStagger
          ? Math.random() * totalSpan
          : (i / Math.max(1, unitsRef.current.length - 1)) * totalSpan
      );

      // 1. Shutter Close: Flaps close toward center slit
      for (let i = 0; i < unitsRef.current.length; i++) {
        const unit = unitsRef.current[i];
        if (unit) {
          unit.close(currentSpeed, delays[i] ?? 0);
        }
      }

      // 2. Advance index and Shutter Open into new characters
      scheduleTimeout(() => {
        currentIndexRef.current =
          (currentIndexRef.current + 1) % messageList.length;
        const nextMessage = getPaddedMessage(currentIndexRef.current);
        announce(messageList[currentIndexRef.current]);

        // Regenerate random delays for open phase if random mode
        const openDelays: number[] = unitsRef.current.map((_, i) =>
          isRandomStagger
            ? Math.random() * totalSpan
            : (i / Math.max(1, unitsRef.current.length - 1)) * totalSpan
        );

        for (let i = 0; i < unitsRef.current.length; i++) {
          const unit = unitsRef.current[i];
          if (unit) {
            unit.open(nextMessage[i] ?? " ", currentSpeed, openDelays[i] ?? 0);
          }
        }

        // Wait for all flaps to finish opening + exact 3 seconds dwell time before next cycle!
        scheduleTimeout(runWaveTransition, stepDuration * 1000 + currentDwell);
      }, stepDuration * 1000);
    };

    // First transition starts after initial dwell time (3s)
    scheduleTimeout(runWaveTransition, effectiveDwell);

    return () => {
      isMounted = false;
      timeouts.forEach(clearTimeout);
      for (const unit of unitsRef.current) {
        unit?.kill();
      }
    };
  }, [messageList, totalColumns, autoPlay, effectiveDwell, selectedThemeKey]);

  return (
    <div
      className={cn(
        "w-full max-w-5xl mx-auto flex items-center justify-center py-4",
        className
      )}
    >
      {/* -------------------------------------------------------- */}
      {/* NO BIG PARENT BACKGROUND OR HEAVY SHADOWS                 */}
      {/* Cards sit naturally on parent container's background      */}
      {/* -------------------------------------------------------- */}
      <div
        ref={containerRef}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          boxShadow: "none",
          border: "none",
          gap: Math.max(3, computedFontSize * 0.1),
          flexWrap: "wrap",
          maxWidth: "100%",
        }}
        role="status"
        aria-label={`Split-flap display: ${messageList[0]}`}
        aria-live="polite"
      >
        {Array.from({ length: totalColumns }, (_, colIdx) => (
          <FlapUnit
            key={`col-${colIdx}`}
            ref={(handle) => {
              unitsRef.current[colIdx] = handle;
            }}
            fontSize={computedFontSize}
            accentColor={effectiveAccent}
            colIndex={colIdx}
            theme={activeTheme}
            soundEnabled={sound}
          />
        ))}
      </div>
    </div>
  );
};

export default SplitFlap;
