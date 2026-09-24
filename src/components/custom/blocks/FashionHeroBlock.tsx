"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Play, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { AvatarStack, type StackAvatar } from "./AvatarStackBlock";
import { CircularText } from "./CircularTextBlock";
import { Dialog, DialogContent, DialogTrigger } from "./DialogBlock";
import { TextAnimation } from "./TextAnimationBlock";
import { TiltedCard } from "./TiltedCardBlock";

// ==========================================
// FASHION HERO
// A fashion hero: a bold two-line headline between a turning video badge
// and a stack of faces, five staggered columns of looks — each a person on
// a flat colour, tilting under the pointer — a call to action sitting on
// the middle look, and a footer with a customer's words on one side and the
// next story on the other. One reveal when it first appears; after that the
// badge turns and the pointer does the rest.
// ==========================================

export interface Look {
  src: string;
  alt: string;
  /** The flat colour behind the person. Any CSS colour. */
  tone: string;
  /** Multiply the photo onto the tone, so a plain studio background takes the colour. On by default. */
  blend?: boolean;
  /** CSS object-position for the crop. */
  position?: string;
}

export interface FashionHeroProps extends React.HTMLAttributes<HTMLElement> {
  /** The headline — set word by word as it appears. */
  heading: string;
  /** Text on the turning badge, and the video it opens. */
  video?: { badge: string; url: string; title?: string };
  /** Faces in the top-right stack, and where the "+" beside them goes. */
  avatars?: StackAvatar[];
  avatarsHref?: string;
  avatarsLabel?: string;
  /**
   * Up to seven looks, laid out left to right: a tall and a small, a tall, a
   * tall with the call to action, a tall, a tall and a small. Fewer are fine —
   * a missing look leaves its slot empty.
   */
  looks: Look[];
  cta?: { label: string; href: string };
  quote?: { text: string; author: string };
  /** The next story: a number, a category and a title. */
  teaser?: { index: string; label: string; title: string; href: string };
  /** Sets `--primary` for the section; the theme's primary by default. Used by the play badge, the plus, the button, the teaser arrow and the rings. */
  accent?: string;
  reveal?: "in-view" | "immediate";
  /** Anchor or router link for the hrefs. */
  linkComponent?: React.ElementType;
}

// ------------------------------------------
// One look: a person on a flat colour, tilting under the pointer
// ------------------------------------------
function LookCard({ look, className }: { look: Look; className?: string }) {
  return (
    <TiltedCard tiltIntensity={7} scaleOnHover={1.03} glareOpacity={0.14} className={cn("group/look", className)}>
      <figure
        className="relative h-full w-full overflow-hidden rounded-2xl"
        style={{ backgroundColor: look.tone }}
      >
        <img
          src={look.src}
          alt={look.alt}
          style={look.position ? { objectPosition: look.position } : undefined}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/look:scale-[1.06]",
            look.blend !== false && "mix-blend-multiply",
          )}
        />
      </figure>
    </TiltedCard>
  );
}

// ------------------------------------------
// Root
// ------------------------------------------
function FashionHeroRoot({
  heading,
  video,
  avatars = [],
  avatarsHref,
  avatarsLabel = "Join the community",
  looks,
  cta,
  quote,
  teaser,
  accent,
  reveal = "in-view",
  linkComponent: Link = "a",
  className,
  style,
  ...props
}: FashionHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(reveal === "immediate");
  const [l0, l1, l2, l3, l4, l5, l6] = looks;

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

  // The one reveal: the badge and faces settle in, the looks rise from the
  // middle column outward, the button lands on its look, the footer last.
  // (The headline animates itself, word by word.) Everything renders opaque on
  // the server; this only plays once the page is live.
  useEffect(() => {
    if (!inView) return;
    const root = rootRef.current;
    if (!root) return;
    const reduced =
      typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const sides = root.querySelectorAll("[data-lb-side]");
    const cols = Array.from(root.querySelectorAll<HTMLElement>("[data-lb-col]"));
    const cta = root.querySelectorAll("[data-lb-cta]");
    const foot = root.querySelectorAll("[data-lb-foot]");
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.fromTo(sides, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.7, ease: "back.out(1.6)" }, 0.1);
    cols.forEach((col) => {
      // Distance from the middle column sets the delay, so the collage opens outward.
      const order = Number(col.getAttribute("data-lb-col") ?? 0);
      tl.fromTo(
        col,
        { opacity: 0, y: 48 },
        { opacity: 1, y: 0, duration: 0.9, clearProps: "transform" },
        0.25 + Math.abs(order - 2) * 0.12,
      );
    });
    tl.fromTo(cta, { opacity: 0, y: 14, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.8)" }, 0.95)
      .fromTo(foot, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, 1.05);
    return () => {
      tl.kill();
    };
  }, [inView]);

  const vars = (accent ? { "--primary": accent } : {}) as React.CSSProperties;

  return (
    <section
      ref={rootRef}
      className={cn("relative w-full overflow-hidden bg-background text-foreground", className)}
      style={{ ...vars, ...style }}
      {...props}
    >
      <div className="mx-auto max-w-6xl px-5 pb-10 pt-8 sm:px-8 sm:pt-10">
        {/* ---- Header: badge / headline / faces ---- */}
        <div className="grid grid-cols-2 items-start gap-y-6 lg:grid-cols-[8rem_1fr_8rem] lg:items-center">
          <div data-lb-side="" className="justify-self-start lg:justify-self-start">
            {video ? (
              <Dialog>
                <DialogTrigger
                  aria-label={video.badge}
                  className="group/badge rounded-full outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  <CircularText text={video.badge} size={100} speed={20} fontSize={10} tracking={0.12} color="currentColor" className="text-foreground">
                    <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover/badge:scale-110">
                      <Play size={12} className="ml-0.5 fill-current" />
                    </span>
                  </CircularText>
                </DialogTrigger>
                <DialogContent size="lg" className="p-0">
                  <div className="aspect-video w-full overflow-hidden rounded-2xl bg-black">
                    <iframe
                      src={video.url}
                      title={video.title ?? video.badge}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <span className="block size-24" aria-hidden />
            )}
          </div>

          <div data-lb-side="" className="justify-self-end lg:order-3">
            {avatars.length > 0 && (
              <AvatarStack
                avatars={avatars}
                size="md"
                max={3}
                ringClassName="ring-background"
                action={
                  avatarsHref ? (
                    <Link
                      href={avatarsHref}
                      aria-label={avatarsLabel}
                      className="group/plus grid size-9 place-items-center rounded-full bg-primary text-primary-foreground ring-2 ring-background transition-transform duration-300 hover:scale-110"
                    >
                      <Plus size={16} className="transition-transform duration-300 group-hover/plus:rotate-90" />
                    </Link>
                  ) : undefined
                }
              />
            )}
          </div>

          <div className="col-span-2 text-center lg:order-2 lg:col-span-1">
            <TextAnimation
              key={String(inView)}
              text={heading}
              variant="blur-in-up"
              as="h1"
              delay={0.1}
              className="mx-auto max-w-[16ch] justify-center font-sans text-[2.5rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[3.4rem] lg:text-[3.9rem]"
            />
          </div>
        </div>

        {/* ---- Looks: five staggered columns ----
            Phones: two columns, the middle look full width between them.
            Tablets: three columns. Desktop: five, stepping down to the middle. */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-7 lg:grid-cols-5">
          <div data-lb-col="0" className="flex flex-col gap-3 sm:gap-4">
            {l0 && <LookCard look={l0} className="aspect-[4/5]" />}
            {l1 && <LookCard look={l1} className="aspect-[5/2]" />}
          </div>
          <div data-lb-col="1" className="flex flex-col gap-3 sm:gap-4 lg:pt-8">
            {l2 && <LookCard look={l2} className="aspect-[3/4] lg:aspect-[4/7]" />}
          </div>
          <div data-lb-col="2" className="relative col-span-2 flex flex-col sm:col-span-1 lg:pt-14">
            {/* A small mark above the middle look, like a maker's stamp. */}
            <span className="mx-auto mb-3 hidden text-primary lg:block" aria-hidden>
              <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                {[0, 45, 90, 135].map((deg) => (
                  <line key={deg} x1="12" y1="2" x2="12" y2="6" transform={`rotate(${deg} 12 12)`} />
                ))}
                {[180, 225, 270, 315].map((deg) => (
                  <line key={deg} x1="12" y1="2" x2="12" y2="6" transform={`rotate(${deg} 12 12)`} />
                ))}
              </svg>
            </span>
            {l3 && <LookCard look={l3} className="aspect-[16/9] sm:aspect-[3/4] lg:aspect-[4/5]" />}
            {cta && (
              <div data-lb-cta="" className="absolute inset-x-0 -bottom-4 flex justify-center">
                <Link
                  href={cta.href}
                  className="group/cta inline-flex h-10 items-center gap-2 rounded-full bg-primary pl-5 pr-4 text-[13px] font-semibold text-primary-foreground shadow-[0_10px_24px_-10px_color-mix(in_oklab,var(--primary)_70%,transparent)] outline-none transition-transform duration-300 hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-primary/60 active:scale-[0.98]"
                >
                  {cta.label}
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5" />
                </Link>
              </div>
            )}
          </div>
          <div data-lb-col="3" className="flex flex-col gap-3 sm:gap-4 lg:pt-8">
            {l4 && <LookCard look={l4} className="aspect-[3/4] lg:aspect-[4/7]" />}
          </div>
          <div data-lb-col="4" className="flex flex-col gap-3 sm:gap-4">
            {l5 && <LookCard look={l5} className="aspect-[4/5]" />}
            {l6 && <LookCard look={l6} className="aspect-[5/2]" />}
          </div>
        </div>

        {/* ---- Footer: a customer's words / the next story ---- */}
        {(quote || teaser) && (
          <div className="mt-12 grid grid-cols-1 items-end gap-8 sm:grid-cols-2 lg:mt-14">
            <div data-lb-foot="" className="max-w-xs">
              {quote && (
                <>
                  <span className="block font-serif text-4xl leading-none text-foreground/30" aria-hidden>
                    &ldquo;
                  </span>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-foreground/70">{quote.text}</p>
                  <p className="relative mt-3 inline-block font-serif text-2xl italic leading-none">
                    {/* A highlighter stroke under the name. */}
                    <span className="absolute inset-x-0 bottom-0 -z-10 h-[0.45em] bg-primary/35" aria-hidden />
                    {quote.author}
                  </p>
                </>
              )}
            </div>

            {teaser && (
              <Link
                data-lb-foot=""
                href={teaser.href}
                className="group/teaser block max-w-xs outline-none sm:justify-self-end focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                <span className="flex items-center justify-between gap-6">
                  <span className="flex items-baseline gap-2.5">
                    <span className="font-sans text-[2rem] font-light leading-none tracking-tight">{teaser.index}</span>
                    <span className="text-[11px] text-foreground/55">{teaser.label}</span>
                  </span>
                  <span className="grid size-8 place-items-center rounded-full transition-all duration-300 group-hover/teaser:bg-primary group-hover/teaser:text-primary-foreground">
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover/teaser:translate-x-0.5" />
                  </span>
                </span>
                <span className="mt-3 block text-[17px] font-semibold leading-snug tracking-[-0.01em] underline decoration-transparent decoration-2 underline-offset-4 transition-[text-decoration-color] duration-300 group-hover/teaser:decoration-current">
                  {teaser.title}
                </span>
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export const FashionHero = Object.assign(FashionHeroRoot, { Look: LookCard });

export default FashionHero;
