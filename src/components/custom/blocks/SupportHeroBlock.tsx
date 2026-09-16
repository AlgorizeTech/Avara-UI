"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { CounterBlock } from "./CounterBlock";
import { GlassBackdrop, GlassPanel, type GlassPanelProps } from "./GlassPanelBlock";
import { TextAnimation } from "./TextAnimationBlock";

// ==========================================
// SUPPORT HERO
// A product hero on a soft grey ground: a headline that rises in word by
// word, a line under it and one call to action, then a bento of frosted
// cards — integrations, two figures that count up, two portraits and a
// team card with faces scattered over it. The cards land in one staggered
// pass after the headline; after that only the pointer moves anything.
// ==========================================

// ------------------------------------------
// Card — a frosted panel that takes part in the reveal
// ------------------------------------------
export interface SupportHeroCardProps extends GlassPanelProps {
  children: React.ReactNode;
}

function Card({ className, children, ...props }: SupportHeroCardProps) {
  return (
    <GlassPanel
      data-hero-card=""
      shape="tile"
      interactive
      className={cn("group relative min-h-[12rem] overflow-hidden md:col-span-3 lg:col-span-3 lg:h-52", className)}
      {...props}
    >
      {children}
    </GlassPanel>
  );
}

// ------------------------------------------
// Integrations — app marks on tiles, a title and a line
// ------------------------------------------
export interface SupportHeroIntegrationsProps extends Omit<SupportHeroCardProps, "children"> {
  icons: React.ReactNode[];
  title: string;
  text?: string;
}

function Integrations({ icons, title, text, className, ...props }: SupportHeroIntegrationsProps) {
  return (
    <Card className={cn("flex flex-col justify-between p-6", className)} {...props}>
      <div className="flex gap-3">
        {icons.map((icon, i) => (
          <span
            key={i}
            // Each tile rises a touch on hover, one after the other.
            style={{ transitionDelay: `${i * 60}ms` }}
            className="grid h-11 w-11 place-items-center rounded-xl border border-white/80 bg-white shadow-[0_6px_16px_-8px_rgba(15,23,42,0.35)] transition-transform duration-300 ease-out group-hover:-translate-y-1 dark:border-white/10 dark:bg-white/10 [&>svg]:h-5 [&>svg]:w-5"
          >
            {icon}
          </span>
        ))}
      </div>
      <div>
        <p className="text-[1.35rem] font-semibold leading-none tracking-tight">{title}</p>
        {text && <p className="mt-2 max-w-[15rem] text-[11px] leading-snug text-black/55 dark:text-white/55">{text}</p>}
      </div>
    </Card>
  );
}

// ------------------------------------------
// Stat — one figure that counts up, and what it means
// ------------------------------------------
export interface SupportHeroStatProps extends Omit<SupportHeroCardProps, "children"> {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  caption: string;
  /** Frosted, or the lime accent card. */
  tone?: "glass" | "lime";
}

function Stat({ value, decimals = 0, prefix = "", suffix = "", caption, tone = "glass", className, ...props }: SupportHeroStatProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-end p-6",
        tone === "lime" &&
          "border-[#d3ecad] bg-[#cfe9a4] shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_24px_48px_-28px_rgba(101,163,13,0.45)] text-[#1f2a12] backdrop-blur-0 dark:border-[#8fbf4a]/40 dark:bg-[#8fbf4a]/30 dark:text-[#e9f5d6]",
        className,
      )}
      {...props}
    >
      <p className="text-[2.9rem] font-semibold leading-none tracking-[-0.03em]">
        <CounterBlock
          type="animated"
          bare
          startOnView
          targetValue={value}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
          color="zinc"
        />
      </p>
      <p className={cn("mt-3 max-w-[13rem] text-[11px] leading-snug", tone === "lime" ? "text-[#1f2a12]/70 dark:text-[#e9f5d6]/70" : "text-black/55 dark:text-white/55")}>
        {caption}
      </p>
    </Card>
  );
}

// ------------------------------------------
// Photo — a portrait that fills its card
// ------------------------------------------
export interface SupportHeroPhotoProps extends Omit<SupportHeroCardProps, "children"> {
  src: string;
  alt: string;
  /** Small word in the top-left corner, e.g. "Transcript". */
  label?: string;
  /** Where the picture is anchored as it crops. */
  position?: string;
}

function Photo({ src, alt, label, position = "center", className, ...props }: SupportHeroPhotoProps) {
  return (
    <Card className={cn("p-0", className)} {...props}>
      <img
        src={src}
        alt={alt}
        style={{ objectPosition: position }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      {label && (
        <span className="absolute left-5 top-4 text-[1.35rem] font-medium tracking-tight text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.25)]">
          {label}
        </span>
      )}
    </Card>
  );
}

// ------------------------------------------
// Team — a title with faces scattered beside it
// ------------------------------------------
export interface SupportHeroTeamProps extends Omit<SupportHeroCardProps, "children" | "title"> {
  title: React.ReactNode;
  avatars: { src: string; alt?: string }[];
}

// Where the faces sit, as percentages of the card's right half, and how far
// each drifts on hover. Keeping them in the right half leaves the title alone
// at every width.
const SPOTS = [
  { left: "6%", top: "20%", size: 44, dx: -6, dy: -8 },
  { left: "62%", top: "10%", size: 40, dx: 8, dy: -6 },
  { left: "26%", top: "60%", size: 40, dx: -4, dy: 8 },
  { left: "72%", top: "54%", size: 44, dx: 8, dy: 6 },
  { left: "0%", top: "72%", size: 32, dx: -8, dy: 4 },
  { left: "46%", top: "38%", size: 30, dx: 4, dy: -2 },
];

function Team({ title, avatars, className, ...props }: SupportHeroTeamProps) {
  return (
    <Card className={cn("flex items-center p-6 md:col-span-6 lg:col-span-6", className)} {...props}>
      {/* A field of dots that fades in from the right, for the faces to sit over. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,rgba(15,23,42,0.14)_1px,transparent_1.2px)] bg-[size:14px_14px] [mask-image:radial-gradient(60%_90%_at_75%_50%,black,transparent)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.18)_1px,transparent_1.2px)]"
      />
      <h3 className="relative z-10 max-w-[11rem] font-sans text-[1.35rem] font-medium leading-[1.15] tracking-tight">{title}</h3>
      <div className="absolute inset-y-0 right-0 w-[52%]">
        {avatars.slice(0, SPOTS.length).map((a, i) => {
          const s = SPOTS[i]!;
          return (
            <img
              key={a.src}
              src={a.src}
              alt={a.alt ?? ""}
              data-hero-avatar=""
              style={
                {
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  "--dx": `${s.dx}px`,
                  "--dy": `${s.dy}px`,
                } as React.CSSProperties
              }
              className="absolute rounded-full border-2 border-white object-cover shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)] transition-transform duration-500 ease-out group-hover:[transform:translate(var(--dx),var(--dy))] dark:border-zinc-800"
            />
          );
        })}
      </div>
    </Card>
  );
}

// ------------------------------------------
// Root
// ------------------------------------------
export interface SupportHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  subtitle?: React.ReactNode;
  cta?: { label: string; href?: string; onClick?: () => void };
  /** The three colours washed behind the glass. Greys by default, so the ground reads as soft stone. */
  aurora?: [string, string, string];
  /** Play the reveal when the section enters the viewport (default) or immediately. */
  reveal?: "in-view" | "immediate";
  children: React.ReactNode;
}

function SupportHeroRoot({
  heading,
  subtitle,
  cta,
  aurora = ["#dde2ea", "#f7f8fa", "#d5dbe5"],
  reveal = "in-view",
  className,
  children,
  ...props
}: SupportHeroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(reveal === "immediate");

  useEffect(() => {
    if (inView) return;
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView]);

  // After the headline has risen: the line and the button, then the cards
  // one after another, then the faces. Everything renders opaque on the
  // server; this only plays once the page is live.
  useEffect(() => {
    if (!inView) return;
    const root = rootRef.current;
    if (!root) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lead = root.querySelectorAll("[data-hero-lead]");
    const cards = root.querySelectorAll("[data-hero-card]");
    const faces = root.querySelectorAll("[data-hero-avatar]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(lead, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 0.5)
      .fromTo(
        cards,
        { opacity: 0, y: 28, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.09, clearProps: "transform" },
        0.7,
      )
      .fromTo(faces, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.07, ease: "back.out(1.8)", clearProps: "transform" }, 1.4);
    return () => {
      tl.kill();
    };
  }, [inView]);

  const onCta = () => {
    cta?.onClick?.();
    if (cta?.href && typeof window !== "undefined") window.location.assign(cta.href);
  };

  return (
    <div ref={rootRef} className={cn("w-full", className)} {...props}>
      <GlassBackdrop
        aurora={aurora}
        className="text-[#1a1f2e] dark:text-white"
        gridClassName="mx-auto max-w-6xl gap-4 px-5 pb-10 pt-0 sm:px-8 sm:pb-12"
      >
      <header className="col-span-full flex flex-col items-center px-2 pb-8 pt-14 text-center sm:pb-10 sm:pt-16">
        <TextAnimation
          as="h1"
          variant="blur-in-up"
          text={heading}
          className="mx-auto max-w-[22ch] justify-center font-sans text-[2.3rem] font-semibold leading-[1.06] tracking-[-0.035em] sm:max-w-[26ch] sm:text-[3.4rem]"
        />
        {subtitle && (
          <p data-hero-lead="" className="mx-auto mt-5 max-w-[34rem] text-[12.5px] leading-[1.7] text-black/55 dark:text-white/55">
            {subtitle}
          </p>
        )}
        {cta && (
          <div data-hero-lead="" className="mt-7">
            <Button
              variant="default"
              iconRight={<ChevronRight size={14} strokeWidth={2.5} />}
              className="h-11 rounded-full px-6 text-[13px] shadow-[0_16px_32px_-14px_rgba(15,23,42,0.7)]"
              onClick={onCta}
            >
              {cta.label}
            </Button>
          </div>
        )}
      </header>

        {children}
      </GlassBackdrop>
    </div>
  );
}

export const SupportHero = Object.assign(SupportHeroRoot, {
  Card,
  Integrations,
  Stat,
  Photo,
  Team,
});

export default SupportHero;
