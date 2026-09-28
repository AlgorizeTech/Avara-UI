"use client";

import React from "react";
import { MessageCircle, Phone, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { ChatAvatar, ChatBubble, ChatMessage } from "./ChatBubbleBlock";
import { HalfStars } from "./HalfStarsBlock";
import { MarqueeBlock } from "./MarqueeBlock";
import { Iphone17ProMaxMockup } from "./MobileMockupBlock";

// ==========================================
// BENTO SHOWCASE
// A six-card marketing bento: a hero with a live chat, a case-studies
// laptop, a headline, numbers that scroll up, a phone with the plans, and a
// team strip that scrolls left. Every card is a named part of
// `BentoShowcase`, so a page can drop one, reorder them, or add its own with
// `BentoShowcase.Card`. The section follows the site theme: pastels on the
// theme background in light mode, the same hues deepened in dark mode.
// ==========================================

export type BentoTone = "cream" | "ice" | "lilac" | "sky" | "butter" | "ink";

// Flat tones, no border or shadow — colour is the only thing separating a
// card from the ground and from its neighbours. Each pastel has a deep
// counterpart for dark mode; `ink` is the contrast card and flips (dark on
// light, light on dark, from the theme ink); `butter` is the accent and stays
// yellow on both.
// Secondary text inside a card uses `text-current/…` so it follows the tone.
const TONES: Record<BentoTone, string> = {
  cream: "bg-[#f2eee3] text-[#141414] dark:bg-[#1f1c17] dark:text-white",
  ice: "bg-[#e6e8ed] text-[#141414] dark:bg-[#1c1e24] dark:text-white",
  lilac: "bg-[#e9e5f5] text-[#141414] dark:bg-[#221d31] dark:text-white",
  sky: "bg-[#d6e6f6] text-[#141414] dark:bg-[#172336] dark:text-white",
  butter: "bg-[#fbe9a6] text-[#141414]",
  ink: "bg-foreground text-background",
};

// ------------------------------------------
// Root
// ------------------------------------------
export interface BentoShowcaseProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
}

function BentoShowcaseRoot({ className, children, ...props }: BentoShowcaseProps) {
  return (
    <section className={cn("w-full bg-background p-3", className)} {...props}>
      {/* Three rows of 15rem at lg; the tall cards span two of them. At md the
          layout folds to two columns and four rows; on phones every card
          stacks and sizes itself. */}
      <div className="grid grid-cols-1 gap-4 md:auto-rows-[15rem] md:grid-cols-2 lg:grid-cols-[3fr_2fr_3fr]">
        {children}
      </div>
    </section>
  );
}

// ------------------------------------------
// Card
// ------------------------------------------
export interface BentoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: BentoTone;
  /** Small caption in the top-right corner, e.g. the service the card is about. */
  label?: React.ReactNode;
}

function Card({ tone = "cream", label, className, children, ...props }: BentoCardProps) {
  return (
    <div
      className={cn("relative overflow-hidden rounded-[24px]", TONES[tone], className)}
      {...props}
    >
      {label && (
        <span className="absolute right-7 top-6 z-10 max-w-[7rem] text-right text-[9.5px] font-semibold uppercase leading-[1.35] tracking-[0.1em] text-current/60">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

// ------------------------------------------
// Hero — portrait, live chat, headline
// ------------------------------------------
export interface BentoChat {
  /** The customer's message, with who sent it. */
  from: string;
  fromRole?: string;
  message: string;
  /** The assistant's reply, and the name it replies as. */
  as: string;
  reply: string;
  /** Optional avatar for the customer. */
  avatar?: string;
}

export interface BentoHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  photo: string;
  photoAlt?: string;
  chat: BentoChat;
  /** Yellow chip under the chat — what the reply came from. */
  chip?: string;
  /** The headline; wrap the display phrase in <em> for the serif italic. */
  children: React.ReactNode;
  /** Small avatars that sit under the headline as social proof. */
  avatars?: string[];
}

function Hero({
  label = "Outsourcing company",
  photo,
  photoAlt = "",
  chat,
  chip = "Assistant",
  avatars = [],
  className,
  children,
  ...props
}: BentoHeroProps) {
  return (
    <Card
      tone="cream"
      className={cn(
        "min-h-[31rem] md:col-start-1 md:row-start-1 md:row-span-2 lg:col-start-1",
        className,
      )}
      {...props}
    >
      {label && (
        <span className="absolute inset-x-0 top-6 z-10 mx-auto max-w-[6.5rem] text-center text-[9.5px] font-semibold uppercase leading-[1.35] tracking-[0.1em] text-current/60">
          {label}
        </span>
      )}
      {/* Portrait in an arch, headroom above for the call bar, room below for the headline. */}
      <div className="absolute inset-x-[22%] top-[6.5rem] bottom-[7.5rem] overflow-hidden rounded-t-[999px]">
        <img src={photo} alt={photoAlt} className="h-full w-full object-cover object-top" />
        {/* Fade the crop into the card so the portrait reads as a cutout. */}
        <span className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#f2eee3] to-transparent dark:from-[#1f1c17]" aria-hidden />
      </div>

      {/* Call bar: two actions, the status, and a close. */}
      <div className="absolute left-[22%] right-[16%] top-[5.25rem] flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary">
          <Phone size={14} strokeWidth={2.25} aria-hidden />
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-primary/15 text-primary">
          <MessageCircle size={14} strokeWidth={2.25} aria-hidden />
        </span>
        <span className="ml-3 inline-flex items-center gap-1.5 rounded-full bg-card px-2.5 py-1 text-[10px] font-semibold text-card-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
          Online
        </span>
        <span className="ml-auto grid h-8 w-8 place-items-center rounded-full bg-card text-muted-foreground">
          <X size={14} aria-hidden />
        </span>
      </div>

      {/* The customer, on the left. */}
      <div className="absolute left-[9%] top-[8.5rem] w-[52%]">
        <ChatBubble variant="received">
          <ChatMessage className="border-0 bg-card px-3 py-2 text-[10px] leading-[1.3] text-card-foreground shadow-sm">
            <span className="mb-1 flex items-center gap-1.5">
              <ChatAvatar
                {...(chat.avatar ? { src: chat.avatar } : {})}
                fallback={chat.from.slice(0, 1)}
                className="order-none mt-0 h-4 w-4 bg-muted text-[8px]"
              />
              <span className="text-[8.5px] font-semibold leading-none">{chat.from}</span>
              {chat.fromRole && <span className="text-[7.5px] leading-none text-current/45">{chat.fromRole}</span>}
            </span>
            {chat.message}
          </ChatMessage>
        </ChatBubble>
      </div>

      {/* The assistant, on the right, with the chip that says what answered. */}
      <div className="absolute right-[4%] top-[17.5rem] w-[50%]">
        <ChatBubble variant="sent">
          <ChatMessage color="primary" className="px-3 py-2 text-[10px] leading-[1.3]">
            <span className="mb-1 flex items-center gap-1 text-[8.5px] font-semibold leading-none opacity-80">
              {chat.as}
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor" aria-hidden>
                <path d="M6 0l1.4 1.9 2.3-.5.3 2.3 2 1.3-1.5 1.8.6 2.3-2.3.6-1 2.2L6 12l-1.8-1.1-2.3-.6.6-2.3L1 6.2 3 4.9l.3-2.3 2.3.5z" />
                <path d="M4 6l1.4 1.4L8.2 4.6" stroke="var(--primary)" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            {chat.reply}
          </ChatMessage>
        </ChatBubble>
      </div>
      <span className="absolute left-[22%] top-[21.75rem] rounded-full bg-[#f5c518] px-3 py-1 text-[9.5px] font-semibold text-[#3a2e00]">
        {chip}
      </span>
      {/* A hand-drawn stroke, so the card doesn't read as a screenshot. */}
      <svg
        className="absolute left-[8%] top-[15.5rem] h-9 w-16 text-[#f0a3c8]"
        viewBox="0 0 80 40"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 30 C 18 6, 26 8, 30 20 S 44 34, 52 18 S 66 10, 76 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Headline. */}
      <div className="absolute inset-x-5 bottom-7 text-center">
        <h3 className="mx-auto max-w-[17rem] font-sans text-[1.7rem] font-semibold leading-[1.02] tracking-[-0.02em] [&_em]:font-serif [&_em]:font-normal [&_em]:italic">
          {children}
        </h3>
        {avatars.length > 0 && (
          <div className="mt-3 flex justify-center -space-x-2">
            {avatars.map((src) => (
              <img
                key={src}
                src={src}
                alt=""
                className="h-6 w-6 rounded-full border-2 border-[#f2eee3] object-cover dark:border-[#1f1c17]"
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

// ------------------------------------------
// Case studies — a laptop with three results, rated
// ------------------------------------------
export interface BentoCaseStudy {
  quote: string;
  /** Two figures under the quote, e.g. +70% and $250K. */
  metrics: { value: string; label?: string }[];
}

export interface BentoCaseStudiesProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  rating?: number;
  reviews?: number;
  /** Mark before the stars — a disc in the theme ink by default. */
  logo?: React.ReactNode;
  items: BentoCaseStudy[];
}

function DefaultLogo() {
  return (
    <span className="grid h-5 w-5 place-items-center rounded-full bg-foreground text-background" aria-hidden>
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M9 3.5A3.6 3.6 0 1 0 9 8.5" />
      </svg>
    </span>
  );
}

function CaseStudies({
  title = "Case Studies",
  rating = 5,
  reviews,
  logo = <DefaultLogo />,
  items,
  className,
  ...props
}: BentoCaseStudiesProps) {
  return (
    <Card
      tone="ice"
      className={cn("min-h-[15rem] md:col-start-2 md:row-start-1 lg:col-start-2", className)}
      {...props}
    >
      <div className="absolute right-6 top-4 z-10 flex flex-col items-end">
        <div className="flex items-center gap-1.5">
          {logo}
          <HalfStars
            rating={rating}
            size={13}
            showText={false}
            activeColor="text-[#f5c518]"
            inactiveColor="text-black/10 dark:text-white/15"
            className="gap-0"
            role="img"
            aria-label={`${rating} out of 5`}
          />
        </div>
        {reviews !== undefined && (
          <p className="mt-0.5 text-[10px] font-medium text-current/70">{reviews} reviews</p>
        )}
      </div>

      {/* The laptop, seen from below and to the left, running off the card's
          left and bottom edges. The screen leans back on Y so its far edge is
          shorter; the deck is the same slab laid nearly flat. */}
      <div className="absolute -left-3 bottom-1 w-[19rem] [perspective:640px]">
        <div className="origin-left [transform-style:preserve-3d] [transform:rotateY(30deg)]">
          <div className="origin-bottom overflow-hidden rounded-[10px] border-[5px] border-[#1c1c1e] bg-[#111113] pb-3 pl-6 pr-3.5 pt-2.5 text-white [transform:rotateX(7deg)]">
            <span className="mx-auto block h-1 w-1 rounded-full bg-white/35" aria-hidden />
            <p className="mt-2 max-w-[4rem] font-serif text-[15px] italic leading-[1.05]">{title}</p>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              {items.slice(0, 3).map((item) => (
                <div key={item.quote} className="rounded-[5px] bg-white p-1.5 text-[#141414]">
                  <p className="line-clamp-4 text-[6px] leading-[1.3] text-black/70">{item.quote}</p>
                  <div className="mt-2 flex items-end gap-1.5">
                    {item.metrics.slice(0, 2).map((m) => (
                      <div key={m.value} className="min-w-0">
                        <p className="text-[9.5px] font-semibold leading-none">{m.value}</p>
                        {m.label && <p className="mt-0.5 truncate text-[4.5px] uppercase tracking-wider text-black/45">{m.label}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* The deck: a lit top surface over a darker front edge, laid back so it foreshortens. */}
          <div
            className="-mx-2 -mt-px h-8 origin-top rounded-b-[10px] bg-gradient-to-b from-[#f1f3f6] from-0% via-[#d3d7dd] via-55% to-[#8f959f] to-100% [transform:rotateX(-28deg)]"
            aria-hidden
          >
            <span className="mx-auto mt-1 block h-[3px] w-16 rounded-full bg-black/10" />
          </div>
        </div>
      </div>
    </Card>
  );
}

// ------------------------------------------
// Headline — a photo and one line that says what you do
// ------------------------------------------
export interface BentoHeadlineProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  photo: string;
  photoAlt?: string;
  /** The line. Wrap the display phrase in <em>: it takes the serif italic on a line of its own, with a scribble under it. */
  children: React.ReactNode;
}

function Headline({
  label = "Customer support",
  photo,
  photoAlt = "",
  className,
  children,
  ...props
}: BentoHeadlineProps) {
  return (
    <Card
      tone="ice"
      label={label}
      className={cn("min-h-[15rem] md:col-start-1 md:row-start-3 lg:col-start-3 lg:row-start-1", className)}
      {...props}
    >
      <div className="absolute left-6 top-4 h-[4.25rem] w-[8.5rem] overflow-hidden rounded-full">
        <img src={photo} alt={photoAlt} className="h-full w-full object-cover" />
      </div>
      <h3 className="absolute inset-x-6 bottom-5 font-sans text-[2.05rem] lg:text-[2.3rem] font-medium leading-[0.98] tracking-[-0.03em] [&_em]:relative [&_em]:block [&_em]:font-serif [&_em]:text-[2.2rem] lg:[&_em]:text-[2.25rem] [&_em]:font-normal [&_em]:italic [&_em]:tracking-normal">
        {children}
      </h3>
      {/* A looping stroke under the serif line. */}
      <svg
        className="pointer-events-none absolute bottom-[0.6rem] left-[5.25rem] h-5 w-[6.5rem] text-[#b7abf1]"
        viewBox="0 0 104 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M2 16c10-8 22-12 24-6s-8 12-8 6 16-10 30-12 26 0 30 6-6 12-10 8 10-12 34-10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </Card>
  );
}

// ------------------------------------------
// Stats — figures that scroll up
// ------------------------------------------
export type BentoOrnament = "spheres" | "ring" | "drops";

export interface BentoStat {
  value: string;
  caption: string;
  tone?: BentoTone;
  /** A small CSS-drawn object beside the figure. */
  ornament?: BentoOrnament;
}

export interface BentoStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: BentoStat[];
  /** Seconds per loop. */
  speed?: number;
}

function Ornament({ kind }: { kind: BentoOrnament }) {
  if (kind === "ring") {
    return (
      <span className="relative block h-12 w-12" aria-hidden>
        <span className="absolute inset-0 rounded-full border-[9px] border-[#4f8cf7] [box-shadow:inset_2px_2px_4px_rgba(255,255,255,.55),2px_3px_6px_rgba(30,64,175,.25)]" />
        <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-white [box-shadow:inset_-1px_-1px_2px_rgba(0,0,0,.15)]" />
      </span>
    );
  }
  if (kind === "drops") {
    return (
      <span className="relative block h-12 w-14" aria-hidden>
        <span className="absolute bottom-0 left-0 h-9 w-9 rounded-full [background:radial-gradient(circle_at_30%_30%,#ffd6a8,#f97316_55%,#c2410c)]" />
        <span className="absolute right-0 top-0 h-6 w-6 rounded-full [background:radial-gradient(circle_at_30%_30%,#ffe4c4,#fb923c_55%,#ea580c)]" />
        <span className="absolute bottom-1 right-2 h-3 w-3 rounded-full bg-white/90" />
      </span>
    );
  }
  return (
    <span className="relative block h-12 w-14" aria-hidden>
      {[
        "left-0 top-1 h-6 w-6",
        "left-5 top-0 h-5 w-5",
        "left-3 top-5 h-7 w-7",
        "left-9 top-4 h-5 w-5",
        "left-8 bottom-0 h-4 w-4",
      ].map((pos, i) => (
        <span
          key={pos}
          className={cn(
            "absolute rounded-full",
            pos,
            i % 2 === 0
              ? "[background:radial-gradient(circle_at_30%_30%,#f3ffd0,#a3e635_55%,#4d7c0f)]"
              : "[background:radial-gradient(circle_at_30%_30%,#ffffff,#d4d4d8_60%,#71717a)]",
          )}
        />
      ))}
    </span>
  );
}

function Stats({ items, speed = 16, className, ...props }: BentoStatsProps) {
  return (
    <Card
      tone="lilac"
      className={cn("h-[18rem] md:h-auto md:col-start-2 md:row-start-2 lg:col-start-2 lg:row-start-2", className)}
      {...props}
    >
      <MarqueeBlock
        direction="up"
        speed={speed}
        gap="0.625rem"
        pauseOnHover
        className="absolute inset-x-3 inset-y-0 py-3"
      >
        {items.map((item) => (
          <div
            key={item.value}
            className={cn(
              "flex w-full shrink-0 items-center justify-between gap-3 rounded-[20px] px-4 py-3.5",
              TONES[item.tone ?? "cream"],
            )}
          >
            <div className="min-w-0">
              <p className="text-[1.45rem] font-semibold leading-none tracking-[-0.02em]">{item.value}</p>
              <p className="mt-1.5 text-[9px] leading-tight text-current/60">
                {item.caption}
              </p>
            </div>
            {item.ornament && <Ornament kind={item.ornament} />}
          </div>
        ))}
      </MarqueeBlock>
    </Card>
  );
}

// ------------------------------------------
// Phone — the plans, on a device
// ------------------------------------------
export interface BentoPlan {
  /** e.g. "#2" */
  rank: string;
  name: string;
  price?: string;
  note?: string;
  /** Picture behind the tier name. */
  image: string;
  benefits?: string[];
  action?: string;
}

export interface BentoPhoneProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The first plan is shown in full; the second peeks in below it. */
  plans: [BentoPlan, BentoPlan?];
  onAction?: () => void;
}

function PlanTile({ plan, className }: { plan: BentoPlan; className?: string }) {
  return (
    <div className={cn("relative h-28 overflow-hidden rounded-[22px]", className)}>
      <img src={plan.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute left-4 top-3 font-serif text-lg italic text-white/90">{plan.rank}</span>
      <span className="absolute bottom-3 left-4 font-serif text-[2rem] italic leading-none text-white [text-shadow:0_1px_12px_rgba(0,0,0,.25)]">
        {plan.name}
      </span>
    </div>
  );
}

function PhoneCard({ plans, onAction, className, ...props }: BentoPhoneProps) {
  const [main, next] = plans;
  return (
    <Card
      tone="sky"
      className={cn(
        "h-[28rem] md:h-auto md:col-start-2 md:row-start-3 md:row-span-2 lg:col-start-3 lg:row-start-2",
        className,
      )}
      {...props}
    >
      <svg className="absolute left-5 top-7 h-9 w-[4.5rem] text-white" viewBox="0 0 56 28" fill="currentColor" aria-hidden>
        <path d="M2 2h9l11 12-11 12H2l11-12z" />
        <path d="M18 2h9l11 12-11 12h-9l11-12z" />
        <path d="M34 2h9l11 12-11 12h-9l11-12z" />
      </svg>

      {/* The mockup is a fixed 340px device, scaled and tilted into the card so it
          reads as held, and let run off the bottom edge. */}
      <div className="absolute left-1/2 top-10 w-[340px] origin-top -translate-x-[40%] rotate-[12deg] scale-[0.76] sm:scale-[0.8] lg:scale-[0.82]">
        <Iphone17ProMaxMockup>
          <div className="h-full w-full bg-gradient-to-b from-[#ebe7f7] to-[#dfe9f6] px-3 pt-14 text-[#141414] dark:from-[#1c1826] dark:to-[#141c2a] dark:text-white">
            <PlanTile plan={main} />
            <div className="mt-5 text-center">
              {main.price && <p className="text-[2rem] font-semibold leading-none tracking-tight">{main.price}</p>}
              {main.note && <p className="mx-auto mt-2 max-w-[16rem] text-[12px] text-current/60">{main.note}</p>}
              <Button variant="default" size="sm" className="mt-4 h-9 rounded-full px-5 text-[11px]" onClick={onAction}>
                {main.action ?? "Start now"}
              </Button>
            </div>
            {main.benefits && main.benefits.length > 0 && (
              <div className="mt-6 text-center">
                <p className="font-serif text-xl italic leading-none">Benefits</p>
                <ul className="mt-2 space-y-0.5 text-[12px] text-current/65">
                  {main.benefits.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            )}
            {next && <PlanTile plan={next} className="mt-6" />}
          </div>
        </Iphone17ProMaxMockup>
      </div>
    </Card>
  );
}

// ------------------------------------------
// Team — a strip that scrolls left
// ------------------------------------------
export interface BentoTeamProps extends React.HTMLAttributes<HTMLDivElement> {
  photos: { src: string; alt?: string }[];
  /** A figure repeated between the photos. */
  stat?: { value: string; caption: string };
  /** Seconds per loop. */
  speed?: number;
}

function Team({ photos, stat, speed = 36, className, ...props }: BentoTeamProps) {
  // Photo, figure, photo — then again. Every cell is an ellipse and the cells
  // alternate high and low, so keep the count even for a seamless loop.
  const cells: React.ReactNode[] = [];
  let discs = 0;
  photos.forEach((p, i) => {
    cells.push(
      <div key={p.src} className="h-[10rem] w-[6.25rem] shrink-0 overflow-hidden rounded-full">
        <img src={p.src} alt={p.alt ?? ""} className="h-full w-full object-cover" />
      </div>,
    );
    if (stat && i % 2 === 0) {
      cells.push(
        <div
          key={`stat-${i}`}
          className={cn(
            "grid h-[9.25rem] w-[5.75rem] shrink-0 place-items-center rounded-full text-center text-[#141414]",
            discs++ % 2 === 0 ? "bg-[#fbe9a6]" : "bg-[#fdf7e6]",
          )}
        >
          <div className="max-w-[4.75rem]">
            <p className="text-[8.5px] font-semibold leading-[1.3] text-current/75">{stat.caption}</p>
            <p className="mt-1.5 text-[1.6rem] font-semibold leading-none tracking-[-0.02em]">{stat.value}</p>
          </div>
        </div>,
      );
    }
  });

  return (
    <Card
      tone="cream"
      className={cn(
        "h-[15rem] md:h-auto md:col-start-1 md:row-start-4 lg:col-start-1 lg:col-span-2 lg:row-start-3",
        className,
      )}
      {...props}
    >
      <MarqueeBlock
        direction="left"
        speed={speed}
        gap="0.875rem"
        pauseOnHover
        className="absolute inset-x-0 bottom-5 top-7 [&>div>*:nth-child(odd)]:self-end [&>div>*:nth-child(even)]:self-start"
      >
        {cells}
      </MarqueeBlock>
    </Card>
  );
}

// ------------------------------------------
// Export
// ------------------------------------------
export const BentoShowcase = Object.assign(BentoShowcaseRoot, {
  Card,
  Hero,
  CaseStudies,
  Headline,
  Stats,
  Phone: PhoneCard,
  Team,
});

export default BentoShowcase;
