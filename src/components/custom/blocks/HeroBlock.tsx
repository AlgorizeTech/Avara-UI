"use client";

import { cn } from "@/lib/utils";
import React, { createContext, forwardRef, useContext } from "react";

// ==========================================
// THEME & CONFIGURATION
// ==========================================
export type HeroLayout = "center" | "left" | "split-right" | "split-left";
export type HeroVariant = "default" | "glass" | "glow";
export type HeroPattern = "none" | "grid" | "dots";
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
  if (color === "primary" || color === "default" || !colorThemes[color]) {
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
    return {
      theme: {
        bg: "bg-primary text-primary-foreground hover:bg-primary/90",
        text: "text-primary",
        bgSoft: "bg-primary/10 text-primary",
        border: "border-primary/20",
        glow: "var(--primary)",
      },
      style: {} as React.CSSProperties,
    };
  }
  return { theme: colorThemes[color], style: {} };
};

interface HeroContextType {
  layout: HeroLayout;
  variant: HeroVariant;
  theme: Record<string, string>;
}

const HeroContext = createContext<HeroContextType | null>(null);

function useHero() {
  const context = useContext(HeroContext);
  if (!context)
    throw new Error("Hero components must be used within a Hero root.");
  return context;
}

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  layout?: HeroLayout;
  variant?: HeroVariant;
  color?: HeroColor;
  pattern?: HeroPattern;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(
  (
    {
      children,
      layout = "center",
      variant = "default",
      color = "indigo",
      pattern = "none",
      className,
      ...props
    },
    ref,
  ) => {
    const { theme, style } = getThemeStyles(color as string);
    const uniqueId = React.useId().replace(/:/g, "");

    const layoutStyles = {
      center:
        "flex flex-col items-center text-center max-w-5xl mx-auto py-4 sm:py-8 md:py-12 px-3 sm:px-6",
      left: "flex flex-col items-start text-left max-w-5xl mx-auto py-4 sm:py-8 md:py-12 px-3 sm:px-6",
      "split-right":
        "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-7xl mx-auto py-4 sm:py-8 md:py-12 px-3 sm:px-6",
      "split-left":
        "grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center max-w-7xl mx-auto py-4 sm:py-8 md:py-12 px-3 sm:px-6",
    };

    return (
      <HeroContext.Provider value={{ layout, variant, theme }}>
        <section
          ref={ref}
          className={cn(
            "relative w-full overflow-hidden transition-all duration-700",
            variant === "glass" &&
              "flex items-center justify-center p-0 min-h-[500px] sm:min-h-[600px]",
            variant === "glow" && "bg-[#fafafa] dark:bg-[#050505]",
            className,
          )}
          style={style}
          {...props}
        >
          {pattern === "grid" && (
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
          )}
          {pattern === "dots" && (
            <div className="absolute inset-0 bg-[radial-gradient(#80808030_1px,transparent_1px)] bg-[size:20px_20px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />
          )}

          {variant === "glow" && (
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] opacity-40 dark:opacity-30 blur-[100px] rounded-[100%] pointer-events-none z-0 mix-blend-screen dark:mix-blend-lighten"
              style={{
                background: `radial-gradient(circle, ${theme.glow} 0%, transparent 60%)`,
              }}
            />
          )}

          <style>{`
            @keyframes hero-fade-up {
              0% { opacity: 0; transform: translateY(20px); filter: blur(4px); }
              100% { opacity: 1; transform: translateY(0); filter: blur(0); }
            }
            .hero-stagger-${uniqueId} > * {
              animation: hero-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            .hero-stagger-${uniqueId} > *:nth-child(1) { animation-delay: 100ms; }
            .hero-stagger-${uniqueId} > *:nth-child(2) { animation-delay: 200ms; }
            .hero-stagger-${uniqueId} > *:nth-child(3) { animation-delay: 300ms; }
            .hero-stagger-${uniqueId} > *:nth-child(4) { animation-delay: 400ms; }
            .hero-stagger-${uniqueId} > *:nth-child(5) { animation-delay: 500ms; }
          `}</style>

          <div
            className={cn(
              "relative z-10 w-full",
              variant !== "glass" && layoutStyles[layout],
              variant === "glass" &&
                "flex items-center justify-center w-full py-10 sm:py-16 px-4 sm:px-8",
            )}
          >
            {children}
          </div>
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
  const uniqueId = React.useId().replace(/:/g, "");

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
        `hero-stagger-${uniqueId}`,
        variant === "glass" &&
          "p-8 sm:p-12 md:p-16 my-8 sm:my-10 mx-auto rounded-2xl backdrop-blur-2xl bg-white/70 dark:bg-zinc-950/70 border border-white/60 dark:border-zinc-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.7)] z-10 max-w-5xl w-[calc(100%-2rem)] sm:w-[calc(100%-3rem)] text-center items-center justify-center ring-1 ring-black/5 dark:ring-white/10 relative overflow-hidden group transition-all duration-500",
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
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, className, href = "#", ...props }, ref) => {
  const { theme, variant } = useHero();
  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 mb-4 sm:mb-8 rounded-2xl text-xs sm:text-[13px] font-semibold tracking-tight border backdrop-blur-md transition-colors",
        variant === "glass"
          ? "bg-zinc-900/10 dark:bg-white/10 border-zinc-900/20 dark:border-white/20 text-zinc-900 dark:text-white shadow-sm"
          : cn(theme.bgSoft, theme.border, "shadow-sm"),
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
});
HeroBadge.displayName = "HeroBadge";

// --- ADDED: HeroBadgeText ---
export const HeroBadgeText = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { theme, variant } = useHero();
  return (
    <span
      className={cn(
        "text-[10px] uppercase tracking-wider rounded-2xl px-2 py-0.5 mr-1 font-bold",
        variant === "glass" ? "bg-zinc-900/20 dark:bg-white/20 text-zinc-900 dark:text-white" : theme.bg,
        className,
      )}
    >
      {children}
    </span>
  );
};

export interface HeroTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  animation?: "fade-up" | "blur-in" | "glitch" | "none";
}

export const HeroTitle = forwardRef<HTMLHeadingElement, HeroTitleProps>(
  ({ children, animation = "fade-up", className, ...props }, ref) => {
    const { variant } = useHero();
    const uniqueId = React.useId().replace(/:/g, "");

    return (
      <>
        {animation === "glitch" && (
          <style>{`
            .hero-glitch-${uniqueId} { position: relative; }
            .hero-glitch-${uniqueId}::before, .hero-glitch-${uniqueId}::after { content: attr(data-text); position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.8; }
            .hero-glitch-${uniqueId}::before { left: 2px; text-shadow: -2px 0 red; clip: rect(24px, 550px, 90px, 0); animation: glitch-anim-2 3s infinite linear alternate-reverse; }
            .hero-glitch-${uniqueId}::after { left: -2px; text-shadow: -2px 0 blue; clip: rect(85px, 550px, 140px, 0); animation: glitch-anim 2.5s infinite linear alternate-reverse; }
            @keyframes glitch-anim { 0% { clip: rect(10px, 9999px, 44px, 0); } 20% { clip: rect(85px, 9999px, 140px, 0); } 40% { clip: rect(12px, 9999px, 89px, 0); } 60% { clip: rect(65px, 9999px, 10px, 0); } 80% { clip: rect(9px, 9999px, 53px, 0); } 100% { clip: rect(78px, 9999px, 110px, 0); } }
            @keyframes glitch-anim-2 { 0% { clip: rect(65px, 9999px, 100px, 0); } 20% { clip: rect(10px, 9999px, 50px, 0); } 40% { clip: rect(80px, 9999px, 20px, 0); } 60% { clip: rect(30px, 9999px, 90px, 0); } 80% { clip: rect(90px, 9999px, 40px, 0); } 100% { clip: rect(20px, 9999px, 70px, 0); } }
          `}</style>
        )}
        <h1
          ref={ref}
          data-text={typeof children === "string" ? children : undefined}
          className={cn(
            "text-[1.75rem] xs:text-3xl sm:text-[3.5rem] lg:text-[4.5rem] font-black tracking-tighter leading-[1.1]",
            variant === "glass"
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-900 dark:text-zinc-50",
            animation === "glitch" && `hero-glitch-${uniqueId}`,
            animation === "blur-in" &&
              "animate-[hero-blur-in_1s_ease-out_both]",
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
        "mt-3 sm:mt-6 text-sm sm:text-[19px] leading-relaxed tracking-wide",
        layout === "center" || variant === "glass"
          ? "max-w-2xl mx-auto"
          : "max-w-xl",
        variant === "glass"
          ? "text-zinc-600 dark:text-zinc-300"
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
          return cn(
            theme.bg,
            "text-white shadow-xl hover:shadow-[var(--hero-color)]/30 hover:scale-[1.03] active:scale-95 border border-white/20 transition-all duration-300",
          );
        if (actionVariant === "outline")
          return "bg-zinc-900/10 dark:bg-white/10 border border-zinc-900/20 dark:border-white/20 text-zinc-900 dark:text-white hover:bg-zinc-900/20 dark:hover:bg-white/20 backdrop-blur-md hover:scale-[1.03] active:scale-95 shadow-sm transition-all duration-300";
      }

      switch (actionVariant) {
        case "glow":
          return cn(
            theme.bg,
            "relative overflow-hidden group shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all",
            `shadow-[0_0_25px_var(--hero-color)]`,
          );
        case "primary":
          return cn(theme.bg, "shadow-md hover:scale-[1.02] active:scale-95");
        case "secondary":
          return "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-md hover:scale-[1.02] active:scale-95";
        case "outline":
          return "bg-transparent border border-zinc-200/80 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-900 hover:scale-[1.02] active:scale-95 shadow-sm";
        case "ghost":
          return "bg-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-95";
      }
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 h-[46px] px-7 rounded-2xl font-bold text-[14px] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
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
      "w-full max-w-5xl max-h-[360px] sm:max-h-[440px] lg:max-h-[500px] mt-10 sm:mt-14 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-500",
    left: "w-full max-w-5xl max-h-[360px] sm:max-h-[440px] lg:max-h-[500px] mt-10 sm:mt-14 rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-500",
    "split-right":
      "w-full h-full max-h-[360px] sm:max-h-[440px] lg:max-h-[500px] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 order-1 lg:order-2 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-500",
    "split-left":
      "w-full h-full max-h-[360px] sm:max-h-[440px] lg:max-h-[500px] rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800 shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-10 order-1 lg:order-1 hover:shadow-[0_8px_40px_rgb(0,0,0,0.16)] transition-shadow duration-500",
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

// --- ADDED: HeroSocialProof ---
export interface HeroSocialProofProps
  extends React.HTMLAttributes<HTMLDivElement> {
  avatars: string[];
  text: string;
}

export const HeroSocialProof = forwardRef<HTMLDivElement, HeroSocialProofProps>(
  ({ avatars, text, className, ...props }, ref) => {
    const { layout } = useHero();

    return (
      <div
        ref={ref}
        className={cn(
          "mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800 sm:flex sm:items-center",
          layout === "center" && "justify-center border-t-0 pt-0",
          className,
        )}
        {...props}
      >
        <div className="flex -space-x-3 sm:justify-start">
          {avatars.map((src, idx) => (
            <img
              key={idx}
              className="w-10 h-10 border-2 border-white dark:border-[#09090b] rounded-full object-cover shadow-sm"
              src={src}
              alt={`Avatar ${idx + 1}`}
            />
          ))}
        </div>
        <div
          className={cn(
            "mt-3 sm:mt-0 sm:ml-5 text-sm font-medium text-zinc-600 dark:text-zinc-400",
            layout === "center" && "text-center",
          )}
        >
          {text}
        </div>
      </div>
    );
  },
);
HeroSocialProof.displayName = "HeroSocialProof";
