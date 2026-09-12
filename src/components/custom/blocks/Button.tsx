"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const Loader2: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("animate-spin", className)}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

type ButtonVariant =
  | "outline"
  | "spin-border"
  | "pulse-glow"
  | "shimmer-beam"
  | "neon-aura"
  | "ripple-wave"
  | "gradient-flow"
  | "border-beam"
  | "radar-ping"
  | "breathe-glow"
  | "spotlight"
  | "cosmic-orbit"
  | "cyber-scan"
  | "expand-icon"
  | "slide-icon"
  | "slide-icon-loop"
  | "slide-bg"
  | "slide-bg-top"
  | "slide-bg-bottom"
  | "slide-bg-right"
  | "slide-text"
  | "slide-text-down"
  | "slide-text-bounce"
  | "scale-up"
  | "shine-sweep"
  | "glow-pulse"
  | "skew-slide"
  | "border-expand"
  | "icon-rotate"
  | "icon-bounce"
  | "icon-spin"
  | "curtain-reveal"
  | "corner-expand"
  | "glassmorphism"
  | "floating-shadow"
  | "magnetic-pull"
  | "glitch-cyber"
  | "3d-press"
  | "liquid-fill"
  | "border-chase"
  | "3d-flip"
  | "holographic"
  | "laser-border"
  | "wave-ripple"
  | "electric-pulse"
  | "neon-sign"
  | "morphing-blob"
  | "split-door-reveal"
  | "expanding-circle-center"
  | "diamond-glare-wipe"
  | "border-draw-outline"
  | "vertical-curtain-rise"
  | "magnetic-pulse-ring"
  | "aura-glow-stream"
  | "neon-portal-ring"
  | "cyber-matrix-pulse"
  | "liquid-gradient-flow"
  | "magnetic-laser-ring"
  | "quantum-flux-beam"
  | "border-corner-pulse"
  | "beacon-radar-pulse"
  | "dual-ring-pulse"
  | "square-frame-pulse"
  | "corner-dash-pulse"
  | "horizontal-shutter-split"
  | "diagonal-slash-fill"
  | "corner-cross-bracket"
  | "inset-box-shadow-fill"
  | "glowing-line-trace"
  | "prism-reflection-shimmer"
  | "dual-spin-border"
  // The plain shadcn-style surfaces. Everything above is an animated
  // treatment; these five are the ordinary buttons most pages actually need,
  // and the docs have always advertised them.
  | "default"
  | "destructive"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg";

/**
 * The plain variants, styled from theme tokens so they follow whatever palette
 * the consumer has in globals.css.
 *
 * `outline` is deliberately absent: it is the default value and already has its
 * own treatment further down, so listing it here would silently restyle every
 * button that never passed a variant.
 */
const PLAIN_VARIANTS: Record<string, string> = {
  default:
    "bg-primary text-primary-foreground border-transparent hover:bg-primary/90",
  destructive:
    "bg-destructive text-white border-transparent hover:bg-destructive/90",
  secondary:
    "bg-secondary text-secondary-foreground border-transparent hover:bg-secondary/80",
  ghost:
    "bg-transparent text-foreground border-transparent shadow-none hover:bg-accent hover:text-accent-foreground",
  link: "bg-transparent text-primary border-transparent shadow-none underline-offset-4 hover:underline",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "outline",
      size = "default",
      children,
      loading,
      onClick,
      iconLeft,
      iconRight,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const iconOnly = !children && Boolean(iconLeft || iconRight);

    useEffect(() => {
      const styleId = "ripple-animation-style";
      if (document.getElementById(styleId)) return;

      const style = document.createElement("style");
      style.id = styleId;
      style.innerHTML = `
            @keyframes ripple-effect {
                from {
                    transform: scale(0);
                    opacity: 1;
                }
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            .animate-ripple {
                animation: ripple-effect 0.7s ease-out forwards;
            }
        `;
      document.head.appendChild(style);
    }, []);

    const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (loading) return;

      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const rippleSize = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - rippleSize / 2;
      const y = event.clientY - rect.top - rippleSize / 2;

      const newRipple: Ripple = { x, y, size: rippleSize, id: Date.now() };

      setRipples((currentRipples) => [...currentRipples, newRipple]);

      setTimeout(() => {
        setRipples((currentRipples) => currentRipples.slice(1));
      }, 700);

      onClick?.(event);
    };

    const baseClasses =
      variant === "slide-icon" ||
      variant === "slide-icon-loop" ||
      variant === "slide-text" ||
      variant === "slide-text-down" ||
      variant === "slide-text-bounce"
        ? "relative inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer group bg-background text-foreground border border-border hover:bg-primary hover:text-primary-foreground shadow-xs overflow-hidden"
        : variant === "expand-icon" || variant === "slide-bg"
        ? "relative inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer group bg-background text-foreground border border-border shadow-xs overflow-hidden"
        : "relative inline-flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer group bg-background text-foreground border border-border hover:bg-primary hover:text-primary-foreground shadow-xs";

    const sizeClasses = {
      default: iconOnly ? "h-12 w-12 p-0" : "h-12 py-2.5 px-6",
      sm: iconOnly ? "h-10 w-10 p-0" : "h-10 px-4 rounded-lg text-xs",
      lg: iconOnly ? "h-14 w-14 p-0" : "h-14 px-8 rounded-xl text-base",
    };

    const rippleColor = "bg-primary/10 dark:bg-white/10";

    const activeIcon = iconRight || iconLeft;

    // The plain surfaces short-circuit ahead of every animated variant: they
    // share one render and differ only by the token classes above.
    if (PLAIN_VARIANTS[variant]) {
      return (
        <button
          className={cn(
            "relative inline-flex items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-300 shadow-xs overflow-hidden cursor-pointer",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97]",
            sizeClasses[size],
            PLAIN_VARIANTS[variant],
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 inline-flex items-center justify-center gap-2">
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {!loading && iconLeft && (
              <span className="inline-flex items-center">{iconLeft}</span>
            )}
            {children}
            {!loading && iconRight && (
              <span className="inline-flex items-center">{iconRight}</span>
            )}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Style 1: Upwards Text Roll (Initial text goes UP, duplicate comes from BOTTOM)
    if (variant === "slide-text") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out group-hover:-translate-y-[150%]">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
          <span className="absolute inset-0 inline-flex items-center justify-center gap-2 translate-y-[150%] transition-transform duration-300 ease-out group-hover:translate-y-0">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Style 2: Downwards Text Roll (Initial text goes DOWN, duplicate comes from TOP)
    if (variant === "slide-text-down") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out group-hover:translate-y-[150%]">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
          <span className="absolute inset-0 inline-flex items-center justify-center gap-2 -translate-y-[150%] transition-transform duration-300 ease-out group-hover:translate-y-0">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Style 3: Homepage Hero Staggered Character Spring Bounce (Exact Homepage Hero Animation)
    if (variant === "slide-text-bounce") {
      const text = typeof children === "string" ? children : "Spring Bounce";
      const letters = text.split("");

      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Main Initial Character Row (Spring Bounce Out Upwards on Hover) */}
          <span className="inline-flex items-center justify-center">
            {loading && <Loader2 className="h-4 w-4 mr-2" />}
            {letters.map((char, index) => (
              <span
                key={index}
                className="inline-block transition-all duration-300 group-hover:-translate-y-6 group-hover:opacity-0 group-hover:scale-50"
                style={{
                  transitionDelay: `${index * 25}ms`,
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          {/* Duplicate Character Row (Spring Bounce In from Bottom on Hover) */}
          <span className="absolute inset-0 inline-flex items-center justify-center">
            {loading && <Loader2 className="h-4 w-4 mr-2" />}
            {letters.map((char, index) => (
              <span
                key={index}
                className="inline-block translate-y-6 opacity-0 scale-50 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-hover:scale-100"
                style={{
                  transitionDelay: `${index * 25}ms`,
                  transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Variant: Expand Icon Color Fill (Ultra-slow 1.6s radial background expansion)
    if (variant === "expand-icon") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden transition-all duration-700",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Content Wrapper (Highest Z-index z-50 to guarantee text stays strictly on top of all bg layers) */}
          <span className="relative z-50 flex items-center justify-center gap-3">
            {iconLeft && (
              <span className="relative flex items-center justify-center h-7 w-7 rounded-full text-primary-foreground z-30 shrink-0 shadow-sm">
                {/* Layer 1: Initial Icon BG (Fades out on hover) */}
                <span className="absolute inset-0 rounded-full bg-primary/20 transition-opacity duration-700 ease-in-out group-hover:opacity-0 pointer-events-none z-0" />

                {/* Layer 2: Hover Icon Circle BG (Fades in to theme primary-foreground on hover) */}
                <span className="absolute inset-0 rounded-full bg-primary-foreground opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 pointer-events-none z-10" />

                {/* Layer 3: Ultra-Slow 1.6s Radial Primary Layer (Scales out slowly from icon center to fill entire button) */}
                <span className="absolute inset-0 rounded-full bg-primary transition-transform duration-[1600ms] [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[30] pointer-events-none -z-10" />

                {/* Icon Symbol: text-primary-foreground initially, text-primary on hover */}
                <span className="relative z-20 flex items-center justify-center text-primary-foreground group-hover:text-primary transition-colors duration-700">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : iconLeft}
                </span>
              </span>
            )}

            {/* Main Label Text (Elevated Z-Index z-50; transitions to primary-foreground on hover) */}
            <span className="relative z-50 transition-colors duration-700 text-foreground group-hover:!text-primary-foreground font-semibold">
              {children}
            </span>

            {iconRight && !iconLeft && (
              <span className="relative flex items-center justify-center h-7 w-7 rounded-full text-primary-foreground z-30 shrink-0 shadow-sm">
                {/* Layer 1: Initial Icon BG (Fades out on hover) */}
                <span className="absolute inset-0 rounded-full bg-primary/20 transition-opacity duration-700 ease-in-out group-hover:opacity-0 pointer-events-none z-0" />

                {/* Layer 2: Hover Icon Circle BG (Fades in to theme primary-foreground on hover) */}
                <span className="absolute inset-0 rounded-full bg-primary-foreground opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 pointer-events-none z-10" />

                {/* Layer 3: Ultra-Slow 1.6s Radial Primary Layer (Scales out slowly from icon center to fill entire button) */}
                <span className="absolute inset-0 rounded-full bg-primary transition-transform duration-[1600ms] [transition-timing-function:cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[30] pointer-events-none -z-10" />

                {/* Icon Symbol: text-primary-foreground initially, text-primary on hover */}
                <span className="relative z-20 flex items-center justify-center text-primary-foreground group-hover:text-primary transition-colors duration-700">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : iconRight}
                </span>
              </span>
            )}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Variant: Horizontal Slide Background Wipe (Background slides in from left to right on hover)
    if (variant === "slide-bg") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Variant: Slide BG Top (Top to bottom fill)
    if (variant === "slide-bg-top") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Slide BG Bottom (Bottom to top fill)
    if (variant === "slide-bg-bottom") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Slide BG Right (Right to left fill)
    if (variant === "slide-bg-right") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Scale Up (Center pop scale background)
    if (variant === "scale-up") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary scale-0 transition-transform duration-500 ease-out group-hover:scale-100 rounded-xl pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Shine Sweep (Solid block color with border, 100% working auto-sweeping glare pass)
    if (variant === "shine-sweep") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 bg-primary text-primary-foreground border-2 border-primary shadow-md",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Continuous Auto-Sweeping White Glare Beam */}
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/70 to-transparent -skew-x-12 animate-[shine-sweep-keyframe_2.5s_infinite] pointer-events-none z-10" />

          {/* Plain <style> rather than styled-jsx, which only compiles under
              Next.js — everywhere else React rejects its unknown attribute and
              TypeScript fails the build. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@keyframes shine-sweep-keyframe {
  0% { transform: translateX(-150%) skewX(-12deg); }
  100% { transform: translateX(350%) skewX(-12deg); }
}`,
            }}
          />

          <span className="relative z-20 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && (
              <span className="flex items-center justify-center">{iconLeft}</span>
            )}
            {children}
            {!loading && iconRight && (
              <span className="flex items-center justify-center">
                {iconRight}
              </span>
            )}
          </span>
        </button>
      );
    }

    // Variant: Glow Pulse (Shadow pulse animation)
    if (variant === "glow-pulse") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground transition-all duration-300 hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-[1.03]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Skew Slide (Diagonal skewed background slide)
    if (variant === "skew-slide") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary -skew-x-12 -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:scale-125 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Border Expand (Outset border outline expansion)
    if (variant === "border-expand") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 transition-all duration-300 hover:ring-2 hover:ring-primary hover:ring-offset-2 dark:hover:ring-offset-black",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Icon Rotate (Icon 360 spin on hover)
    if (variant === "icon-rotate") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && (
              <span className="transition-transform duration-500 group-hover:rotate-180">
                {iconLeft}
              </span>
            )}
            {children}
            {!loading && iconRight && (
              <span className="transition-transform duration-500 group-hover:rotate-180">
                {iconRight}
              </span>
            )}
          </span>
        </button>
      );
    }

    // Variant: Icon Bounce (Icon spring bounce on hover)
    if (variant === "icon-bounce") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && (
              <span className="transition-transform duration-300 group-hover:-translate-y-1">
                {iconLeft}
              </span>
            )}
            {children}
            {!loading && iconRight && (
              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                {iconRight}
              </span>
            )}
          </span>
        </button>
      );
    }

    // Variant: Icon Spin (Infinite smooth spin on hover)
    if (variant === "icon-spin") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && (
              <span className="group-hover:animate-spin">
                {iconLeft}
              </span>
            )}
            {children}
            {!loading && iconRight && (
              <span className="group-hover:animate-spin">
                {iconRight}
              </span>
            )}
          </span>
        </button>
      );
    }

    // Variant: Curtain Reveal (Vertical split curtain wipe)
    if (variant === "curtain-reveal") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-x-0 top-0 h-1/2 bg-primary -translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />
          <span className="absolute inset-x-0 bottom-0 h-1/2 bg-primary translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Pulse Glow (Ambient continuous glow pulse)
    if (variant === "pulse-glow") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground shadow-[0_0_20px_rgba(59,130,246,0.6)] animate-pulse",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Shimmer Beam (Continuous diagonal glossy beam sweep)
    if (variant === "shimmer-beam") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5 bg-primary text-primary-foreground",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 animate-[shimmer_2.5s_infinite] pointer-events-none z-10" />
          <span className="relative z-20 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Neon Aura (Continuous glowing neon shadow ring)
    if (variant === "neon-aura") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground border-2 border-primary shadow-[0_0_15px_var(--primary,#3b82f6)] animate-bounce",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Border Beam (Continuous traveling border light beam)
    if (variant === "border-beam") {
      return (
        <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_70%,var(--primary,#3b82f6)_100%)] animate-[spin_3s_linear_infinite]" />
          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto bg-background",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && <span>{iconLeft}</span>}
              {children}
              {!loading && iconRight && <span>{iconRight}</span>}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Radar Ping (Continuous radar pulse ping)
    if (variant === "radar-ping") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 rounded-xl bg-primary animate-ping opacity-30 pointer-events-none" />
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Gradient Flow (Continuous animated gradient shift)
    if (variant === "gradient-flow") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-[linear-gradient(90deg,var(--primary,#3b82f6),#ec4899,#8b5cf6,var(--primary,#3b82f6))] bg-[length:200%_auto] animate-[gradient_4s_linear_infinite] text-white",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Keyframes travel with the variant so the animation survives a copy
              into a project whose globals.css never defined `gradient`. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
            }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Breathe Glow (Slow breathing glow opacity scale)
    if (variant === "breathe-glow") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] shadow-[0_0_30px_rgba(59,130,246,0.8)]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Spotlight Beam (Moving spotlight radial glow)
    if (variant === "spotlight") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5 bg-primary text-primary-foreground",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary,#3b82f6)_0%,transparent_70%)] animate-[pulse_2s_infinite] opacity-60 pointer-events-none" />
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Cosmic Orbit (Spinning outer ring dot)
    if (variant === "cosmic-orbit") {
      return (
        <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_75%,var(--primary,#3b82f6)_100%)] animate-[spin_2.5s_linear_infinite]" />
          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto bg-background",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && <span>{iconLeft}</span>}
              {children}
              {!loading && iconRight && <span>{iconRight}</span>}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Cyber Scan (Moving horizontal scan line)
    if (variant === "cyber-scan") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5 bg-zinc-950 text-cyan-400 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.4)]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-x-0 h-[2px] bg-cyan-400 animate-[bounce_1.5s_infinite] pointer-events-none z-10 opacity-70" />
          <span className="relative z-20 flex items-center justify-center gap-2 font-semibold tracking-wider">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Glassmorphism (Frosted glass blur effect)
    if (variant === "glassmorphism") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg text-foreground hover:bg-white/20 transition-all duration-300",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Floating Shadow (Elevation float animation)
    if (variant === "floating-shadow") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Magnetic Pull (Inner scale pulse)
    if (variant === "magnetic-pull") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground transition-transform duration-300 hover:scale-[1.05] active:scale-[0.95]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Glitch Cyber (Cyberpunk RGB glitch effect)
    if (variant === "glitch-cyber") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-black text-lime-400 border border-lime-400 hover:shadow-[3px_3px_0px_#f43f5e] transition-all duration-150 font-mono uppercase tracking-widest",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: 3D Press (Neumorphic 3D depth press)
    if (variant === "3d-press") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 transition-all duration-100",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Liquid Fill (Liquid wave rise fill)
    if (variant === "liquid-fill") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-700 ease-out group-hover:translate-y-0 pointer-events-none z-0" />
          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: 3D Flip (CodePen 3D Perspective Card Flip)
    if (variant === "3d-flip") {
      return (
        <div className="perspective-1000 group inline-block">
          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max px-5 py-2.5 bg-primary text-primary-foreground transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            <span className="flex items-center justify-center gap-2 font-semibold [backface-visibility:hidden]">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && <span>{iconLeft}</span>}
              {children}
              {!loading && iconRight && <span>{iconRight}</span>}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Holographic (Iridescent prismatic metallic sheen)
    if (variant === "holographic") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-5 py-2.5 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white shadow-lg hover:brightness-125 transition-all duration-300",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="absolute inset-0 bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.4)_40%,transparent_60%)] animate-[shimmer_3s_infinite] pointer-events-none" />
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Laser Border (Continuous high-voltage glowing laser outline)
    if (variant === "laser-border") {
      return (
        <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#ef4444,#f59e0b,#10b981,#3b82f6,#ef4444)] animate-[spin_1.5s_linear_infinite]" />
          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto bg-black text-white dark:bg-black",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && <span>{iconLeft}</span>}
              {children}
              {!loading && iconRight && <span>{iconRight}</span>}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Electric Pulse (High frequency electric jitter shadow)
    if (variant === "electric-pulse") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-yellow-400 text-black font-bold shadow-[0_0_20px_#facc15] animate-[pulse_1s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Neon Sign (Retro 80s flicker neon tube text)
    if (variant === "neon-sign") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-5 py-2.5 bg-zinc-950 text-fuchsia-400 border border-fuchsia-500 shadow-[0_0_15px_#d946ef] animate-[pulse_2s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-bold tracking-wider">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Sliding Icon Physics (Horizontal rounded icon slide)
    if (variant === "slide-icon") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max pl-4 pr-3.5 gap-3",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Sliding Left Icon on Hover */}
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center justify-center h-7 w-7 rounded-full bg-primary-foreground text-primary shadow-xs -translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
            {activeIcon}
          </span>

          {/* Main Button Label Text */}
          <span className="relative z-10 font-semibold transition-transform duration-300 ease-out group-hover:translate-x-[36px]">
            {children}
          </span>

          {/* Initial Right Icon (slides out to right on hover) */}
          <span className="relative z-10 flex items-center justify-center h-7 w-7 rounded-full bg-muted text-foreground group-hover:translate-x-10 group-hover:opacity-0 transition-all duration-300 ease-out">
            {loading ? <Loader2 className="h-4 w-4" /> : activeIcon}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Variant: Slide Icon Loop (same rounded icon as slide-icon, but the arrow
    // never rests: it travels out of the circle to the right and re-enters
    // from the left, on a loop. The circle clips it, so only the pass shows.)
    if (variant === "slide-icon-loop") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max pl-4 pr-3.5 gap-3",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Plain <style> rather than styled-jsx — see shine-sweep. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@keyframes slide-icon-loop {
  0%   { transform: translateX(-100%); animation-timing-function: ease-out; }
  50%  { transform: translateX(0);     animation-timing-function: ease-in; }
  100% { transform: translateX(170%); }
}`,
            }}
          />

          <span className="relative z-10 font-semibold">{children}</span>

          {/* Looping Right Icon (circle clips the arrow as it wraps around) */}
          <span className="relative z-10 flex items-center justify-center h-7 w-7 rounded-full bg-muted text-foreground overflow-hidden transition-colors duration-300 group-hover:bg-primary-foreground group-hover:text-primary">
            {loading ? (
              <Loader2 className="h-4 w-4" />
            ) : (
              <span className="flex items-center justify-center animate-[slide-icon-loop_1.4s_linear_infinite] motion-reduce:animate-none">
                {activeIcon}
              </span>
            )}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    // Variant: Split Door Reveal (Continuous horizontal split door pulse using ::before & ::after)
    if (variant === "split-door-reveal") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 before:absolute before:inset-y-0 before:left-0 before:w-1/2 before:bg-primary/30 before:animate-[pulse_2s_infinite] after:absolute after:inset-y-0 after:right-0 after:w-1/2 after:bg-primary/30 after:animate-[pulse_2s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Expanding Circle Center (Continuous expanding center ring ping using ::before)
    if (variant === "expanding-circle-center") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-8 before:h-8 before:rounded-full before:bg-primary/50 before:animate-ping",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Diamond Glare Wipe (Continuous diagonal glare sweep pass using ::after)
    if (variant === "diamond-glare-wipe") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 bg-primary text-primary-foreground after:absolute after:top-0 after:-left-[100%] after:w-full after:h-full after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] after:-skew-x-12 after:animate-[shimmer_2s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Border Draw Outline (Continuous pulse border trace using ::before and ::after)
    if (variant === "border-draw-outline") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 border-2 border-primary animate-[pulse_2s_infinite] shadow-[0_0_15px_var(--primary,#3b82f6)]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Vertical Curtain Rise (Continuous curtain bounce using ::before)
    if (variant === "vertical-curtain-rise") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 before:absolute before:inset-x-0 before:bottom-0 before:h-1 before:bg-primary before:animate-pulse",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Horizontal Shutter Split (Continuous shutter pulse using ::before and ::after)
    if (variant === "horizontal-shutter-split") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 before:absolute before:inset-x-0 before:top-0 before:h-1/2 before:bg-primary/20 before:animate-[pulse_1.5s_infinite] after:absolute after:inset-x-0 after:bottom-0 after:h-1/2 after:bg-primary/20 after:animate-[pulse_1.5s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Diagonal Slash Fill (Continuous 45 degree blade shimmer using ::before)
    if (variant === "diagonal-slash-fill") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 before:absolute before:top-0 before:bottom-0 before:-left-[50%] before:w-[150%] before:bg-gradient-to-r before:from-transparent before:via-primary/40 before:to-transparent before:-skew-x-[35deg] before:animate-[shimmer_2.5s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Corner Cross Bracket (Continuous glowing corner brackets using ::before and ::after)
    if (variant === "corner-cross-bracket") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 border border-primary/40 before:absolute before:top-0 before:left-0 before:w-3 before:h-3 before:border-t-2 before:border-l-2 before:border-primary before:animate-pulse after:absolute after:bottom-0 after:right-0 after:w-3 after:h-3 after:border-b-2 after:border-r-2 after:border-primary after:animate-pulse",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Inset Box Shadow Fill (Continuous inset glow pulse)
    if (variant === "inset-box-shadow-fill") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 shadow-[inset_0_0_15px_var(--primary,#3b82f6)] animate-pulse",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Glowing Line Trace (Continuous bottom tracking glow line using ::after)
    if (variant === "glowing-line-trace") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-primary after:shadow-[0_0_10px_var(--primary,#3b82f6)] after:animate-pulse",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Aura Glow Stream (Continuous pulsing ambient glowing background aura stream)
    if (variant === "aura-glow-stream") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 bg-primary text-primary-foreground shadow-[0_0_25px_var(--primary,#3b82f6)] animate-[pulse_2s_infinite] before:absolute before:-inset-1 before:rounded-xl before:bg-primary/40 before:blur-md before:animate-pulse before:-z-10",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Neon Portal Ring (Continuous traveling 360 neon portal gradient ring)
    if (variant === "neon-portal-ring") {
      return (
        <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_50%,var(--primary,#3b82f6)_100%)] animate-[spin_2.5s_linear_infinite]" />
          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto bg-background text-foreground border border-border shadow-sm",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && <span>{iconLeft}</span>}
              {children}
              {!loading && iconRight && <span>{iconRight}</span>}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Cyber Matrix Pulse (High frequency scanning cyber pulse line)
    if (variant === "cyber-matrix-pulse") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 border border-primary/50 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)] before:absolute before:inset-x-0 before:h-[2px] before:bg-primary before:shadow-[0_0_10px_var(--primary,#3b82f6)] before:animate-[bounce_1.5s_infinite] before:opacity-80",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Liquid Gradient Flow (Continuous animated 200% fluid gradient shift)
    if (variant === "liquid-gradient-flow") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 bg-[linear-gradient(90deg,var(--primary,#3b82f6),#60a5fa,#2563eb,var(--primary,#3b82f6))] bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-white shadow-md",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Keyframes travel with the variant so the animation survives a copy
              into a project whose globals.css never defined `gradient`. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}`,
            }}
          />
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Magnetic Laser Ring (Continuous laser border with soft outer glow ring)
    if (variant === "magnetic-laser-ring") {
      return (
        <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto shadow-[0_0_20px_var(--primary,#3b82f6)]">
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_75%,var(--primary,#3b82f6)_100%)] animate-[spin_2s_linear_infinite]" />
          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto bg-background text-foreground border border-border",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && <span>{iconLeft}</span>}
              {children}
              {!loading && iconRight && <span>{iconRight}</span>}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Quantum Flux Beam (Continuous shimmer glossy glare pass)
    if (variant === "quantum-flux-beam") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max overflow-hidden px-6 py-2.5 bg-primary text-primary-foreground shadow-lg after:absolute after:inset-0 after:w-1/2 after:h-full after:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] after:-skew-x-12 after:animate-[shimmer_2s_infinite]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Prism Reflection Shimmer (Prismatic tracking border sheen)
    if (variant === "prism-reflection-shimmer") {
      return (
        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max px-6 py-2.5 border-2 border-primary animate-pulse shadow-[0_0_15px_var(--primary,#3b82f6)]",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && <span>{iconLeft}</span>}
            {children}
            {!loading && iconRight && <span>{iconRight}</span>}
          </span>
        </button>
      );
    }

    // Variant: Dual Spin Border (Two perfectly synchronized counter-rotating conic border beams)
    if (variant === "dual-spin-border") {
      return (
        <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto">
          {/* Beam 1: Clockwise spinning thin 15% conic beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] aspect-square bg-[conic-gradient(from_0deg,transparent_85%,var(--primary,#3b82f6)_100%)] animate-[spin_3s_linear_infinite] pointer-events-none" />
          {/* Beam 2: Counter-clockwise spinning opposite 180-deg offset thin 15% conic beam */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] aspect-square bg-[conic-gradient(from_180deg,transparent_85%,var(--primary,#3b82f6)_100%)] animate-[spin_3s_linear_infinite_reverse] pointer-events-none" />

          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto overflow-hidden bg-background text-foreground border-0",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            {/* Liquid Fill Wave Layer on Hover */}
            <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />

            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && (
                <span className="flex items-center justify-center">{iconLeft}</span>
              )}
              {children}
              {!loading && iconRight && (
                <span className="flex items-center justify-center">
                  {iconRight}
                </span>
              )}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Border Corner Pulse (Sequential sharp border line waves expanding outward and fading away)
    if (variant === "border-corner-pulse") {
      return (
        <div className="relative inline-flex items-center justify-center group rounded-xl isolation-auto">
          {/* Wave Line 1: Expands outwards and fades away */}
          <span className="absolute inset-0 rounded-xl border border-primary/80 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none -z-10" />
          {/* Wave Line 2: Follows 0.8s later, expands outward and fades away */}
          <span className="absolute inset-0 rounded-xl border border-primary/80 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:0.8s] pointer-events-none -z-10" />
          {/* Wave Line 3: Follows 1.6s later, expands outward and fades away */}
          <span className="absolute inset-0 rounded-xl border border-primary/80 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:1.6s] pointer-events-none -z-10" />

          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto overflow-hidden bg-background text-foreground border border-primary/60",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            {/* Liquid Fill Wave Layer on Hover */}
            <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />

            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && (
                <span className="flex items-center justify-center">{iconLeft}</span>
              )}
              {children}
              {!loading && iconRight && (
                <span className="flex items-center justify-center">
                  {iconRight}
                </span>
              )}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Beacon Radar Pulse (Circular beacon ping wave expanding from icon/center)
    if (variant === "beacon-radar-pulse") {
      return (
        <div className="relative inline-flex items-center justify-center group rounded-xl isolation-auto">
          {/* Smooth Soft Aura Beacon Ring */}
          <span className="absolute inset-0 rounded-xl bg-primary/40 animate-[ping_2.2s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none -z-10" />
          <span className="absolute -inset-1 rounded-xl bg-primary/20 blur-md animate-pulse pointer-events-none -z-20" />

          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto overflow-hidden bg-background text-foreground border border-primary/50",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            {/* Liquid Fill Wave Layer on Hover */}
            <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />

            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && (
                <span className="flex items-center justify-center">{iconLeft}</span>
              )}
              {children}
              {!loading && iconRight && (
                <span className="flex items-center justify-center">
                  {iconRight}
                </span>
              )}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Dual Ring Pulse (2 layered offset border line rings pulsing outward)
    if (variant === "dual-ring-pulse") {
      return (
        <div className="relative inline-flex items-center justify-center group rounded-xl isolation-auto">
          {/* Ring 1: Fast Sharp Border Line */}
          <span className="absolute inset-0 rounded-xl border border-primary animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] pointer-events-none -z-10" />
          {/* Ring 2: Slow Offset Outer Border Line */}
          <span className="absolute inset-0 rounded-xl border border-primary/60 animate-[ping_1.8s_cubic-bezier(0,0,0.2,1)_infinite] [animation-delay:0.9s] pointer-events-none -z-10" />

          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto overflow-hidden bg-background text-foreground border border-primary/60",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            {/* Liquid Fill Wave Layer on Hover */}
            <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />

            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && (
                <span className="flex items-center justify-center">{iconLeft}</span>
              )}
              {children}
              {!loading && iconRight && (
                <span className="flex items-center justify-center">
                  {iconRight}
                </span>
              )}
            </span>
          </button>
        </div>
      );
    }

    // Variant: Corner Dash Pulse (4 corner L-bracket lines pulsing outward)
    if (variant === "corner-dash-pulse") {
      return (
        <div className="relative inline-flex items-center justify-center group p-1 rounded-xl isolation-auto">
          <span className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 border-t-2 border-l-2 border-primary rounded-tl-md animate-[ping_2s_infinite] pointer-events-none" />
          <span className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 border-t-2 border-r-2 border-primary rounded-tr-md animate-[ping_2s_infinite] pointer-events-none" />
          <span className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 border-b-2 border-l-2 border-primary rounded-bl-md animate-[ping_2s_infinite] pointer-events-none" />
          <span className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 border-b-2 border-r-2 border-primary rounded-br-md animate-[ping_2s_infinite] pointer-events-none" />

          <button
            className={cn(
              baseClasses,
              sizeClasses[size],
              "relative z-10 w-max h-auto overflow-hidden bg-background text-foreground border border-primary/50",
              className,
            )}
            onClick={createRipple}
            disabled={loading}
            ref={ref}
            {...props}
          >
            {/* Liquid Fill Wave Layer on Hover */}
            <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />

            <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
              {loading && <Loader2 className="h-4 w-4" />}
              {!loading && iconLeft && (
                <span className="flex items-center justify-center">{iconLeft}</span>
              )}
              {children}
              {!loading && iconRight && (
                <span className="flex items-center justify-center">
                  {iconRight}
                </span>
              )}
            </span>
          </button>
        </div>
      );
    }

    return (
      <div className="relative inline-flex items-center justify-center group p-[2px] rounded-xl overflow-hidden isolation-auto bg-muted">
        {/* Conic Spinning Beam layer that spins exactly over the border frame */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350%] aspect-square bg-[conic-gradient(from_0deg,transparent_70%,var(--primary,#3b82f6)_100%)] group-hover:opacity-0 animate-[spin_3s_linear_infinite] opacity-100 transition-opacity duration-300 pointer-events-none" />

        <button
          className={cn(
            baseClasses,
            sizeClasses[size],
            "relative z-10 w-max h-auto overflow-hidden bg-background text-foreground border-0",
            className,
          )}
          onClick={createRipple}
          disabled={loading}
          ref={ref}
          {...props}
        >
          {/* Liquid Fill Wave Layer (Rises smoothly from bottom to top on hover) */}
          <span className="absolute inset-0 bg-primary rounded-t-full translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 pointer-events-none z-0" />

          <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-primary-foreground font-semibold">
            {loading && <Loader2 className="h-4 w-4" />}
            {!loading && iconLeft && (
              <span className="flex items-center justify-center">{iconLeft}</span>
            )}
            {children}
            {!loading && iconRight && (
              <span className="flex items-center justify-center">
                {iconRight}
              </span>
            )}
          </span>

          {!loading && (
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-xl">
              {ripples.map((ripple) => (
                <span
                  key={ripple.id}
                  className={cn(
                    "absolute rounded-full animate-ripple",
                    rippleColor,
                  )}
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
            </div>
          )}
        </button>
      </div>
    );
  },
);

Button.displayName = "Button";

export default Button;
