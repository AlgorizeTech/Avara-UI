"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type HeroLayout = "center" | "left" | "split-right" | "split-left";
export type HeroVariant = "default" | "glass" | "glow";
export type HeroColor = "indigo" | "rose" | "emerald" | "zinc" | (string & {});

const colorThemes: Record<string, Record<string, string>> = {
  indigo: {
    bg: "bg-indigo-600 text-white",
    text: "text-indigo-600 dark:text-indigo-400",
    bgSoft:
      "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200 dark:border-indigo-800",
    glow: "rgba(99,102,241,0.5)",
  },
  rose: {
    bg: "bg-rose-600 text-white",
    text: "text-rose-600 dark:text-rose-400",
    bgSoft: "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
    border: "border-rose-200 dark:border-rose-800",
    glow: "rgba(225,29,72,0.5)",
  },
  emerald: {
    bg: "bg-emerald-600 text-white",
    text: "text-emerald-600 dark:text-emerald-400",
    bgSoft:
      "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
    glow: "rgba(16,185,129,0.5)",
  },
  zinc: {
    bg: "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900",
    text: "text-zinc-900 dark:text-zinc-100",
    bgSoft: "bg-zinc-100 dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100",
    border: "border-zinc-200 dark:border-zinc-800",
    glow: "rgba(255,255,255,0.3)",
  },
};

const hexToRgb = (hex: string) => {
  let cleanHex = hex.replace(/^#/, "");
  if (cleanHex.length === 3)
    cleanHex = cleanHex
      .split("")
      .map((x) => x + x)
      .join("");
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(cleanHex);
  return result
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : "99, 102, 241";
};

export const getThemeStyles = (color: string) => {
  if (color && color.startsWith("#")) {
    const rgb = hexToRgb(color);
    return {
      theme: {
        bg: "bg-[var(--hero-color)] text-white",
        text: "text-[var(--hero-color)]",
        bgSoft: "bg-[rgba(var(--hero-rgb),0.1)] text-[var(--hero-color)]",
        border: "border-[rgba(var(--hero-rgb),0.2)]",
        glow: `rgba(${rgb}, 0.5)`,
      },
      style: {
        "--hero-color": color,
        "--hero-rgb": rgb,
      } as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color] || colorThemes.indigo, style: {} };
};

// ==========================================
// CONTEXT
// ==========================================
interface HeroContextType {
  layout: HeroLayout;
  variant: HeroVariant;
  theme: Record<string, string>;
}

const HeroContext = createContext<HeroContextType | null>(null);

function useHero() {
  const context = useContext(HeroContext);
  if (!context) throw new Error("Hero components must be used within a Hero");
  return context;
}

// ==========================================
// COMPONENT PIECES
// ==========================================
export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  layout?: HeroLayout;
  variant?: HeroVariant;
  color?: HeroColor;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      children,
      layout = "center",
      variant = "default",
      color = "indigo",
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);

    const layoutStyles = {
      center:
        "flex flex-col items-center text-center max-w-5xl mx-auto pt-20 pb-16 px-6",
      left: "flex flex-col items-start text-left max-w-5xl mx-auto pt-20 pb-16 px-6",
      "split-right":
        "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto py-16 px-6",
      "split-left":
        "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center max-w-7xl mx-auto py-16 px-6",
    };

    return (
      <HeroContext.Provider value={{ layout, variant, theme }}>
        <section
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden transition-all duration-500",
            variant === "glass" &&
              "min-h-[600px] flex items-center justify-center",
            variant === "glow" && "bg-zinc-50 dark:bg-[#030303]",
            variant !== "glass" && layoutStyles[layout],
            className,
          )}
          style={style}
          {...props}
        >
          {variant === "glow" && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-30 dark:opacity-20 blur-[100px] rounded-full pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
              }}
            />
          )}
          {children}
        </section>
      </HeroContext.Provider>
    );
  },
);
Hero.displayName = "Hero";

export const HeroContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { layout, variant } = useHero();

  const isSplit = layout === "split-right" || layout === "split-left";

  const contentStyles = {
    center: "flex flex-col items-center justify-center w-full z-10",
    left: "flex flex-col items-start text-left w-full z-10",
    "split-right":
      "flex flex-col items-start text-left w-full z-10 order-2 lg:order-1",
    "split-left":
      "flex flex-col items-start text-left w-full z-10 order-2 lg:order-2",
  };

  return (
    <div
      ref={ref}
      className={cn(
        contentStyles[layout],
        variant === "glass" &&
          "p-8 sm:p-12 rounded-3xl backdrop-blur-2xl bg-white/10 dark:bg-black/40 border border-white/20 dark:border-white/10 shadow-2xl z-10 max-w-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
HeroContent.displayName = "HeroContent";

export const HeroBadge = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { theme, variant } = useHero();

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full text-sm font-bold tracking-tight border backdrop-blur-md transition-colors",
        variant === "glass"
          ? "bg-white/20 border-white/30 text-white"
          : cn(theme.bgSoft, theme.border),
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
HeroBadge.displayName = "HeroBadge";

export interface HeroTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  glitch?: boolean;
}

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ children, glitch, className, ...props }, ref) => {
    const { variant } = useHero();
    const uniqueId = React.useId().replace(/:/g, "");

    return (
      <>
        {glitch && (
          <style>{`
            .glitch-${uniqueId} {
              position: relative;
            }
            .glitch-${uniqueId}::before,
            .glitch-${uniqueId}::after {
              content: attr(data-text);
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              opacity: 0.8;
            }
            .glitch-${uniqueId}::before {
              left: 2px;
              text-shadow: -2px 0 red;
              clip: rect(24px, 550px, 90px, 0);
              animation: glitch-anim-2 3s infinite linear alternate-reverse;
            }
            .glitch-${uniqueId}::after {
              left: -2px;
              text-shadow: -2px 0 blue;
              clip: rect(85px, 550px, 140px, 0);
              animation: glitch-anim 2.5s infinite linear alternate-reverse;
            }
            @keyframes glitch-anim {
              0% { clip: rect(10px, 9999px, 44px, 0); }
              20% { clip: rect(85px, 9999px, 140px, 0); }
              40% { clip: rect(12px, 9999px, 89px, 0); }
              60% { clip: rect(65px, 9999px, 10px, 0); }
              80% { clip: rect(9px, 9999px, 53px, 0); }
              100% { clip: rect(78px, 9999px, 110px, 0); }
            }
            @keyframes glitch-anim-2 {
              0% { clip: rect(65px, 9999px, 100px, 0); }
              20% { clip: rect(10px, 9999px, 50px, 0); }
              40% { clip: rect(80px, 9999px, 20px, 0); }
              60% { clip: rect(30px, 9999px, 90px, 0); }
              80% { clip: rect(90px, 9999px, 40px, 0); }
              100% { clip: rect(20px, 9999px, 70px, 0); }
            }
          `}</style>
        )}
        <h1
          ref={ref}
          data-text={typeof children === "string" ? children : undefined}
          className={cn(
            "text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance leading-[1.1]",
            variant === "glass"
              ? "text-white drop-shadow-md"
              : "text-zinc-900 dark:text-zinc-50",
            glitch && `glitch-${uniqueId}`,
            className,
          )}
          {...props}
        >
          {children}
        </h1>
      </>
    );
  },
);
HeroTitle.displayName = "HeroTitle";

export const HeroDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ children, className, ...props }, ref) => {
  const { variant, layout } = useHero();

  return (
    <p
      ref={ref}
      className={cn(
        "mt-6 text-lg sm:text-xl text-balance leading-relaxed",
        layout === "center" || variant === "glass"
          ? "max-w-2xl mx-auto"
          : "max-w-xl",
        variant === "glass"
          ? "text-zinc-200 drop-shadow-sm"
          : "text-zinc-600 dark:text-zinc-400",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
});
HeroDescription.displayName = "HeroDescription";

export const HeroActions = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { layout } = useHero();
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-4 mt-8 sm:mt-10",
        layout === "center" && "justify-center",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
HeroActions.displayName = "HeroActions";

export interface HeroActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
}

export const HeroAction = forwardRef<HTMLButtonElement, HeroActionProps>(
  (
    { children, variant: actionVariant = "primary", className, ...props },
    ref,
  ) => {
    const { theme, variant: heroVariant } = useHero();

    const getActionStyles = () => {
      if (heroVariant === "glass") {
        if (actionVariant === "primary")
          return "bg-white text-zinc-900 hover:bg-zinc-200 border border-white shadow-lg";
        if (actionVariant === "outline")
          return "bg-transparent border border-white/50 text-white hover:bg-white/10";
      }

      switch (actionVariant) {
        case "glow":
          return cn(
            theme.bg,
            "relative overflow-hidden group shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all",
            `shadow-[0_0_20px_var(--hero-color)]`,
          );
        case "primary":
          return cn(theme.bg, "shadow-md hover:opacity-90");
        case "secondary":
          return "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200";
        case "outline":
          return "bg-transparent border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900";
        case "ghost":
          return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100";
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-xl font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          getActionStyles(),
          className,
        )}
        {...props}
      >
        {actionVariant === "glow" && (
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0" />
        )}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </button>
    );
  },
);
HeroAction.displayName = "HeroAction";

export const HeroVisual = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { layout, variant } = useHero();

  const visualStyles = {
    center:
      "w-full max-w-5xl mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10",
    left: "w-full max-w-5xl mt-12 sm:mt-16 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10",
    "split-right":
      "w-full h-full min-h-[300px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl z-10 order-1 lg:order-2",
    "split-left":
      "w-full h-full min-h-[300px] lg:min-h-[500px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl z-10 order-1 lg:order-1",
  };

  return (
    <div
      ref={ref}
      className={cn(
        variant === "glass" ? "absolute inset-0 z-0" : visualStyles[layout],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
HeroVisual.displayName = "HeroVisual";
