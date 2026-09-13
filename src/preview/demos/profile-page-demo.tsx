"use client";

import { useState } from "react";
import {
  GlassPanel,
  ProfilePage,
  WorkdayDial,
} from "@/components/custom/blocks/ProfilePageBlock";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Check,
  Eye,
  FileText,
  GitMerge,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Share2,
  UserPlus,
} from "lucide-react";

const TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 };

const STATS = [
  { value: "128", label: "Components" },
  { value: "342", label: "Merged PRs" },
  { value: "96", label: "Reviews" },
];

const SKILLS = ["Design systems", "React", "Motion", "Accessibility", "TypeScript", "Figma"];

const HIGHLIGHTS = [
  {
    title: "Motion primitives v2",
    summary: "One easing vocabulary for modals, drawers and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Northwind UI 4.0",
    summary: "128 components, dark mode by default, tokens in CSS.",
    status: "Shipped June 2026",
  },
  {
    title: "Contrast audit",
    summary: "Every text and icon colour checked at 4.5:1 or better.",
    status: "Shipped February 2026",
  },
];

const TEAMMATES = [
  { initials: "TL", name: "Tomás Léger", role: "Motion and prototyping", zone: "Lisbon", tint: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  { initials: "WA", name: "Wren Adeyemi", role: "Accessibility", zone: "Lagos", tint: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  { initials: "RS", name: "Rhea Sen", role: "Platform tokens", zone: "Pune", tint: "bg-rose-500/15 text-rose-800 dark:text-rose-200" },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1287, unify easing curves across overlays", when: "2h ago" },
  { icon: Eye, text: "Reviewed Tomás's drawer focus-trap fix", when: "Yesterday" },
  { icon: FileText, text: "Published the Northwind UI 4.0 release notes", when: "3 days ago" },
  { icon: MessageCircle, text: "Opened an RFC on token naming", when: "Last week" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#0b0b0f]";

export default function ProfilePageDemo({
  rounded = true,
}: {
  /** Round the page corners — off when it fills the viewport. */
  rounded?: boolean;
}) {
  const [following, setFollowing] = useState(false);

  return (
    <ProfilePage className={cn("max-w-6xl", rounded && "rounded-[36px]")}>
      {/* Hero */}
      <GlassPanel shape="slab" className="flex flex-col gap-6 p-6 sm:p-8 md:col-span-6 lg:col-span-8">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full text-sm text-black/60 transition-colors hover:text-black dark:text-white/60 dark:hover:text-white",
              focusRing,
            )}
          >
            <ArrowLeft className="size-4" /> People
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border border-white/70 bg-white/50 text-black/70 transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10",
              focusRing,
            )}
            aria-label="Share profile"
          >
            <Share2 className="size-4" />
          </button>
        </div>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {/* Squircle avatar — the only shape on the page that isn't a
              rectangle, circle or capsule, so it reads as the person */}
          <div className="relative shrink-0">
            <span className="grid size-24 place-items-center rounded-[30%] bg-gradient-to-br from-violet-500 to-fuchsia-500 text-3xl font-semibold text-white shadow-[0_16px_32px_-16px_rgba(124,58,237,0.7)] sm:size-28 sm:text-4xl">
              AK
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-none">
              Ayesha Karim
            </h1>
            <p className="mt-2 text-base text-black/60 dark:text-white/60">
              Design engineer at Northwind
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-black/60 dark:text-white/60">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> Dhaka
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="size-3.5" /> ayesha@northwind.co
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="size-3.5" /> ayesha.design
              </li>
            </ul>
          </div>
        </div>

        {/* Action capsule */}
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={following}
            onClick={() => setFollowing((v) => !v)}
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors",
              following
                ? "border border-white/70 bg-white/50 text-black hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                : "bg-violet-600 text-white hover:bg-violet-500",
              focusRing,
            )}
          >
            {following ? <Check className="size-4" /> : <UserPlus className="size-4" />}
            {following ? "Following" : "Follow"}
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex h-11 items-center gap-2 rounded-full border border-white/70 bg-white/50 px-5 text-sm font-medium transition-colors hover:bg-white dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10",
              focusRing,
            )}
          >
            <MessageCircle className="size-4" /> Message
          </button>
        </div>
      </GlassPanel>

      {/* Her day */}
      <GlassPanel shape="slab" className="flex flex-col p-6 md:col-span-6 lg:col-span-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Her day</h2>
          <p className="text-xs text-black/50 dark:text-white/50">UTC+6</p>
        </div>
        <div className="my-auto py-4">
          <WorkdayDial
            timeZone={TIME_ZONE}
            start={WORKDAY.start}
            end={WORKDAY.end}
            place="Dhaka"
            name="Ayesha"
            note="Replies within the day"
          />
        </div>
        <p className="text-center text-sm text-black/60 dark:text-white/60">
          Hover the ring for her hours in your time
        </p>
      </GlassPanel>

      {/* Stat discs */}
      <div className="grid grid-cols-3 gap-4 md:col-span-6 lg:col-span-4">
        {STATS.map((s) => (
          <GlassPanel key={s.label} shape="disc" className="grid place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-black/55 dark:text-white/55 sm:text-xs">{s.label}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* About */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-6 lg:col-span-8">
        <h2 className="text-sm font-semibold">About</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-black/70 dark:text-white/70">
          Builds the component library three product teams ship on. Currently
          rewriting the motion primitives so a modal, a drawer and a toast all
          ease the same way. Happiest when a design decision becomes one variable.
        </p>
        <ul className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-white/70 bg-white/50 px-3 py-1 text-xs dark:border-white/10 dark:bg-white/5"
            >
              {skill}
            </li>
          ))}
        </ul>
      </GlassPanel>

      {/* Highlights — three tiles, each its own panel */}
      {HIGHLIGHTS.map((item) => (
        <GlassPanel key={item.title} className="flex flex-col gap-3 p-5 md:col-span-2 lg:col-span-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-snug">{item.title}</p>
            <p className="text-xs leading-relaxed text-black/60 dark:text-white/60">{item.summary}</p>
          </div>
          <div className="mt-auto space-y-2">
            {item.progress !== undefined && (
              <div
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.title} progress`}
                className="h-1.5 overflow-hidden rounded-full bg-black/10 dark:bg-white/10"
              >
                <div
                  className="h-full rounded-full bg-violet-600 dark:bg-violet-400"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
            <p
              className={cn(
                "text-xs font-medium",
                item.progress !== undefined
                  ? "text-violet-700 dark:text-violet-300"
                  : "text-black/50 dark:text-white/50",
              )}
            >
              {item.status}
            </p>
          </div>
        </GlassPanel>
      ))}

      {/* Team */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-5">
        <h2 className="text-sm font-semibold">Works closely with</h2>
        <ul className="flex flex-col gap-3">
          {TEAMMATES.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-[30%] text-xs font-semibold", m.tint)}>
                {m.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-black/55 dark:text-white/55">{m.role}</p>
              </div>
              <span className="shrink-0 text-xs text-black/50 dark:text-white/50">{m.zone}</span>
            </li>
          ))}
        </ul>
      </GlassPanel>

      {/* Activity */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-7">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        <ol className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.08]">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-black/[0.05] text-black/60 dark:bg-white/[0.07] dark:text-white/60">
                <a.icon className="size-3.5" />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm">{a.text}</p>
              <span className="shrink-0 text-xs text-black/50 dark:text-white/50">{a.when}</span>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </ProfilePage>
  );
}
