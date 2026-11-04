---
title: "Shadcn Profile Page"
description: "Shadcn Profile Page. A person as a page: an aurora backdrop, frosted panels in four shapes, and a 24-hour dial that shows when they are at work — live."
url: https://avaraui.com/docs/nextjs/profile-page
---

# Shadcn Profile Page

A person as a page: an aurora backdrop, frosted panels in four shapes, and a 24-hour dial that shows when they are at work — live, in their own time zone.

The page is primitives rather than one monolith. `ProfilePage` is the backdrop and a 12-column grid; `GlassPanel` — from [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel), which installs alongside — is one glass recipe with a `shape` that encodes hierarchy (a `slab` for the hero, a `tile` for content, a `disc` for a single number, a `capsule` for chips); `WorkdayDial` is the one element that moves; `useLocalTime` is the hook under it. Compose them with your own data — nothing has to be reshaped to fit. The example page also drops in two other library pieces where a profile wants them: a [Verify Badge](https://avaraui.com/docs/reactjs/verify-badge) beside the name and a row of [Social Links](https://avaraui.com/docs/reactjs/social-links) under the contact details.

## Profile page

The full page. Open it fullscreen to see it as a page — the dial reads Farah's local time, so the marker and the working state are honest wherever it is viewed.

- `shape="slab" | "tile" | "disc" | "capsule"` on `GlassPanel` picks the corner treatment. The recipe — blur, hairline border, inset highlight — is the same; only the shape changes, so radius tells the reader what level a panel is.
- Give `WorkdayDial=timeZone, start, end` and it draws the working window as an arc on a labelled 24-hour ring, with a live marker that takes the theme's primary colour inside the window and grey outside it. Hover or focus the ring for the window converted to the viewer's own time and how long until it opens.
- `aurora` on `ProfilePage` takes three colours for the blobs the glass blurs. Any CSS colour works, including `var(--primary)` to tie the first blob to the theme, as the example does. Change them per person or per team; the panels adapt because they are translucent.

```tsx
const TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 };

const STATS = [
  { value: "116", label: "Components" },
  { value: "317", label: "PRs merged" },
  { value: "88", label: "Code reviews" },
];

const SKILLS = ["Component APIs", "React", "Animation", "Accessibility", "TypeScript", "Figma"];

const HIGHLIGHTS = [
  {
    title: "Animation toolkit 2.0",
    summary: "A shared set of easings for dialogs, sheets and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Brightmoor Kit 4",
    summary: "116 components, a dark theme out of the box, CSS-variable tokens.",
    status: "Released June 2026",
  },
  {
    title: "Colour contrast review",
    summary: "All text and icons verified against a 4.5:1 minimum ratio.",
    status: "Released February 2026",
  },
];

const TEAMMATES = [
  { initials: "MD", name: "Mateo Duarte", role: "Prototypes and animation", zone: "Lisbon", tint: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  { initials: "IO", name: "Ifeoma Okafor", role: "Inclusive design", zone: "Lagos", tint: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  { initials: "KI", name: "Kavya Iyer", role: "Design tokens", zone: "Pune", tint: "bg-rose-500/15 text-rose-800 dark:text-rose-200" },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1311, one shared easing for every overlay", when: "2h ago" },
  { icon: Eye, text: "Reviewed Mateo's sheet focus-trap patch", when: "Yesterday" },
  { icon: FileText, text: "Posted the changelog for Brightmoor Kit 4", when: "3 days ago" },
  { icon: MessageCircle, text: "Started an RFC about naming tokens", when: "Last week" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ProfilePageDemo() {
  const [following, setFollowing] = useState(false);

  return (
    <ProfilePage aurora={["var(--primary)", "#7dd3fc", "#fdba74"]} className="min-h-dvh">
      {/* Hero */}
      <GlassPanel shape="slab" className="flex flex-col gap-6 p-6 sm:p-8 md:col-span-6 lg:col-span-8">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full text-sm text-foreground/60 transition-colors hover:text-foreground",
              focusRing,
            )}
          >
            <ArrowLeft className="size-4" /> Directory
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/70 transition-colors hover:bg-foreground/[0.08]",
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
            <span className="grid size-24 place-items-center rounded-[30%] bg-gradient-to-br from-primary to-primary/70 text-3xl font-semibold text-primary-foreground shadow-[0_16px_32px_-16px_var(--primary)] sm:size-28 sm:text-4xl">
              FH
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-2.5 text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-none">
              Farah Haque
              <VerifyBadge size="lg" aria-label="Verified" />
            </h1>
            <p className="mt-2 text-base text-foreground/60">
              UI engineer at Brightmoor
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> Dhaka
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="size-3.5" /> farah@brightmoor.io
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="size-3.5" /> farahhaque.dev
              </li>
            </ul>
            <SocialLinks
              size="sm"
              variant="ghost"
              className="mt-3 -ml-2 gap-0.5"
              links={[
                { network: "x", href: "https://x.com", label: "Farah on X" },
                { network: "github", href: "https://github.com", label: "Farah on GitHub" },
                { network: "dribbble", href: "https://dribbble.com", label: "Farah on Dribbble" },
              ]}
            />
          </div>
        </div>

        {/* Action capsule */}
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={following}
            onClick={() => setFollowing((v) => !v)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors sm:h-11 sm:gap-2 sm:px-5 sm:text-sm",
              following
                ? "border border-foreground/10 bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              focusRing,
            )}
          >
            {following ? <Check className="size-3.5 sm:size-4" /> : <UserPlus className="size-3.5 sm:size-4" />}
            {following ? "Following" : "Follow"}
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 text-[13px] font-medium transition-colors hover:bg-foreground/[0.08] sm:h-11 sm:gap-2 sm:px-5 sm:text-sm",
              focusRing,
            )}
          >
            <MessageCircle className="size-3.5 sm:size-4" /> Message
          </button>
        </div>
      </GlassPanel>

      {/* Her schedule */}
      <GlassPanel shape="slab" className="flex flex-col p-6 md:col-span-6 lg:col-span-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Her schedule</h2>
          <p className="text-xs text-foreground/50">UTC+6</p>
        </div>
        <div className="my-auto py-4">
          <WorkdayDial
            timeZone={TIME_ZONE}
            start={WORKDAY.start}
            end={WORKDAY.end}
            place="Dhaka"
            name="Farah"
            note="Usually answers the same day"
          />
        </div>
        <p className="text-center text-sm text-foreground/60">
          Point at the ring to see her hours in your zone
        </p>
      </GlassPanel>

      {/* Stat discs */}
      <div className="grid grid-cols-3 gap-4 md:col-span-6 lg:col-span-4">
        {STATS.map((s) => (
          <GlassPanel key={s.label} shape="disc" className="grid place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-foreground/55 sm:text-xs">{s.label}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* About */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-6 lg:col-span-8">
        <h2 className="text-sm font-semibold">About</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-foreground/70">
          Maintains the shared UI kit that three product squads build on. Right
          now reworking the animation toolkit so dialogs, sheets and toasts all
          move on one curve. Loves turning a design choice into a single token.
        </p>
        <ul className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-xs"
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
            <p className="text-xs leading-relaxed text-foreground/60">{item.summary}</p>
          </div>
          <div className="mt-auto space-y-2">
            {item.progress !== undefined && (
              <div
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.title} progress`}
                className="h-1.5 overflow-hidden rounded-full bg-foreground/10"
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
            <p
              className={cn(
                "text-xs font-medium",
                item.progress !== undefined
                  ? "text-primary"
                  : "text-foreground/50",
              )}
            >
              {item.status}
            </p>
          </div>
        </GlassPanel>
      ))}

      {/* Team */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-5">
        <h2 className="text-sm font-semibold">Frequent collaborators</h2>
        <ul className="flex flex-col gap-3">
          {TEAMMATES.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-[30%] text-xs font-semibold", m.tint)}>
                {m.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-foreground/55">{m.role}</p>
              </div>
              <span className="shrink-0 text-xs text-foreground/50">{m.zone}</span>
            </li>
          ))}
        </ul>
      </GlassPanel>

      {/* Activity */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-7">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        <ol className="flex flex-col divide-y divide-foreground/[0.07]">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground/[0.06] text-foreground/60">
                <a.icon className="size-3.5" />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm">{a.text}</p>
              <span className="shrink-0 text-xs text-foreground/50">{a.when}</span>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </ProfilePage>
  );
}
```

## Solid

The same page with no glass: white cards, an ordinary shadow, a flat ground. Nothing else changes — every panel reads the variant from the page.

- Set `variant="solid"` on `ProfilePage` and every `GlassPanel` inside turns into a solid card with a normal shadow; the aurora is not drawn. One panel can opt out with its own `variant`.

```tsx
const TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 };

const STATS = [
  { value: "116", label: "Components" },
  { value: "317", label: "PRs merged" },
  { value: "88", label: "Code reviews" },
];

const SKILLS = ["Component APIs", "React", "Animation", "Accessibility", "TypeScript", "Figma"];

const HIGHLIGHTS = [
  {
    title: "Animation toolkit 2.0",
    summary: "A shared set of easings for dialogs, sheets and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Brightmoor Kit 4",
    summary: "116 components, a dark theme out of the box, CSS-variable tokens.",
    status: "Released June 2026",
  },
  {
    title: "Colour contrast review",
    summary: "All text and icons verified against a 4.5:1 minimum ratio.",
    status: "Released February 2026",
  },
];

const TEAMMATES = [
  { initials: "MD", name: "Mateo Duarte", role: "Prototypes and animation", zone: "Lisbon", tint: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  { initials: "IO", name: "Ifeoma Okafor", role: "Inclusive design", zone: "Lagos", tint: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  { initials: "KI", name: "Kavya Iyer", role: "Design tokens", zone: "Pune", tint: "bg-rose-500/15 text-rose-800 dark:text-rose-200" },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1311, one shared easing for every overlay", when: "2h ago" },
  { icon: Eye, text: "Reviewed Mateo's sheet focus-trap patch", when: "Yesterday" },
  { icon: FileText, text: "Posted the changelog for Brightmoor Kit 4", when: "3 days ago" },
  { icon: MessageCircle, text: "Started an RFC about naming tokens", when: "Last week" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ProfilePageDemo() {
  const [following, setFollowing] = useState(false);

  return (
    <ProfilePage variant="solid" className="min-h-dvh">
      {/* Hero */}
      <GlassPanel shape="slab" className="flex flex-col gap-6 p-6 sm:p-8 md:col-span-6 lg:col-span-8">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full text-sm text-foreground/60 transition-colors hover:text-foreground",
              focusRing,
            )}
          >
            <ArrowLeft className="size-4" /> Directory
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/70 transition-colors hover:bg-foreground/[0.08]",
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
            <span className="grid size-24 place-items-center rounded-[30%] bg-gradient-to-br from-primary to-primary/70 text-3xl font-semibold text-primary-foreground shadow-[0_16px_32px_-16px_var(--primary)] sm:size-28 sm:text-4xl">
              FH
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-2.5 text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-none">
              Farah Haque
              <VerifyBadge size="lg" aria-label="Verified" />
            </h1>
            <p className="mt-2 text-base text-foreground/60">
              UI engineer at Brightmoor
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> Dhaka
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="size-3.5" /> farah@brightmoor.io
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="size-3.5" /> farahhaque.dev
              </li>
            </ul>
            <SocialLinks
              size="sm"
              variant="ghost"
              className="mt-3 -ml-2 gap-0.5"
              links={[
                { network: "x", href: "https://x.com", label: "Farah on X" },
                { network: "github", href: "https://github.com", label: "Farah on GitHub" },
                { network: "dribbble", href: "https://dribbble.com", label: "Farah on Dribbble" },
              ]}
            />
          </div>
        </div>

        {/* Action capsule */}
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={following}
            onClick={() => setFollowing((v) => !v)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors sm:h-11 sm:gap-2 sm:px-5 sm:text-sm",
              following
                ? "border border-foreground/10 bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              focusRing,
            )}
          >
            {following ? <Check className="size-3.5 sm:size-4" /> : <UserPlus className="size-3.5 sm:size-4" />}
            {following ? "Following" : "Follow"}
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 text-[13px] font-medium transition-colors hover:bg-foreground/[0.08] sm:h-11 sm:gap-2 sm:px-5 sm:text-sm",
              focusRing,
            )}
          >
            <MessageCircle className="size-3.5 sm:size-4" /> Message
          </button>
        </div>
      </GlassPanel>

      {/* Her schedule */}
      <GlassPanel shape="slab" className="flex flex-col p-6 md:col-span-6 lg:col-span-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Her schedule</h2>
          <p className="text-xs text-foreground/50">UTC+6</p>
        </div>
        <div className="my-auto py-4">
          <WorkdayDial
            timeZone={TIME_ZONE}
            start={WORKDAY.start}
            end={WORKDAY.end}
            place="Dhaka"
            name="Farah"
            note="Usually answers the same day"
          />
        </div>
        <p className="text-center text-sm text-foreground/60">
          Point at the ring to see her hours in your zone
        </p>
      </GlassPanel>

      {/* Stat discs */}
      <div className="grid grid-cols-3 gap-4 md:col-span-6 lg:col-span-4">
        {STATS.map((s) => (
          <GlassPanel key={s.label} shape="disc" className="grid place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-foreground/55 sm:text-xs">{s.label}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* About */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-6 lg:col-span-8">
        <h2 className="text-sm font-semibold">About</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-foreground/70">
          Maintains the shared UI kit that three product squads build on. Right
          now reworking the animation toolkit so dialogs, sheets and toasts all
          move on one curve. Loves turning a design choice into a single token.
        </p>
        <ul className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-xs"
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
            <p className="text-xs leading-relaxed text-foreground/60">{item.summary}</p>
          </div>
          <div className="mt-auto space-y-2">
            {item.progress !== undefined && (
              <div
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.title} progress`}
                className="h-1.5 overflow-hidden rounded-full bg-foreground/10"
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
            <p
              className={cn(
                "text-xs font-medium",
                item.progress !== undefined
                  ? "text-primary"
                  : "text-foreground/50",
              )}
            >
              {item.status}
            </p>
          </div>
        </GlassPanel>
      ))}

      {/* Team */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-5">
        <h2 className="text-sm font-semibold">Frequent collaborators</h2>
        <ul className="flex flex-col gap-3">
          {TEAMMATES.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-[30%] text-xs font-semibold", m.tint)}>
                {m.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-foreground/55">{m.role}</p>
              </div>
              <span className="shrink-0 text-xs text-foreground/50">{m.zone}</span>
            </li>
          ))}
        </ul>
      </GlassPanel>

      {/* Activity */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-7">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        <ol className="flex flex-col divide-y divide-foreground/[0.07]">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground/[0.06] text-foreground/60">
                <a.icon className="size-3.5" />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm">{a.text}</p>
              <span className="shrink-0 text-xs text-foreground/50">{a.when}</span>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </ProfilePage>
  );
}
```

## Liquid glass

Fluid SVG displacement map refraction, specular inner highlights, and ambient depth backdrop using LiquidGlassWrapper and LiquidGlassBackground.

- Set `variant="liquid-glass"` on `ProfilePage` wraps the bento grid with fluid SVG refractive glass, deep backdrop blur, and high-contrast translucent panels.

```tsx
const TIME_ZONE = "Asia/Dhaka";
const WORKDAY = { start: 10, end: 18 };

const STATS = [
  { value: "116", label: "Components" },
  { value: "317", label: "PRs merged" },
  { value: "88", label: "Code reviews" },
];

const SKILLS = ["Component APIs", "React", "Animation", "Accessibility", "TypeScript", "Figma"];

const HIGHLIGHTS = [
  {
    title: "Animation toolkit 2.0",
    summary: "A shared set of easings for dialogs, sheets and toasts.",
    status: "In progress",
    progress: 68,
  },
  {
    title: "Brightmoor Kit 4",
    summary: "116 components, a dark theme out of the box, CSS-variable tokens.",
    status: "Released June 2026",
  },
  {
    title: "Colour contrast review",
    summary: "All text and icons verified against a 4.5:1 minimum ratio.",
    status: "Released February 2026",
  },
];

const TEAMMATES = [
  { initials: "MD", name: "Mateo Duarte", role: "Prototypes and animation", zone: "Lisbon", tint: "bg-sky-500/15 text-sky-800 dark:text-sky-200" },
  { initials: "IO", name: "Ifeoma Okafor", role: "Inclusive design", zone: "Lagos", tint: "bg-amber-500/15 text-amber-800 dark:text-amber-200" },
  { initials: "KI", name: "Kavya Iyer", role: "Design tokens", zone: "Pune", tint: "bg-rose-500/15 text-rose-800 dark:text-rose-200" },
];

const ACTIVITY = [
  { icon: GitMerge, text: "Merged #1311, one shared easing for every overlay", when: "2h ago" },
  { icon: Eye, text: "Reviewed Mateo's sheet focus-trap patch", when: "Yesterday" },
  { icon: FileText, text: "Posted the changelog for Brightmoor Kit 4", when: "3 days ago" },
  { icon: MessageCircle, text: "Started an RFC about naming tokens", when: "Last week" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export default function ProfilePageDemo() {
  const [following, setFollowing] = useState(false);

  return (
    <ProfilePage aurora={["var(--primary)", "#7dd3fc", "#fdba74"]} className="min-h-dvh">
      {/* Hero */}
      <GlassPanel shape="slab" className="flex flex-col gap-6 p-6 sm:p-8 md:col-span-6 lg:col-span-8">
        <div className="flex items-center justify-between">
          <a
            href="#"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full text-sm text-foreground/60 transition-colors hover:text-foreground",
              focusRing,
            )}
          >
            <ArrowLeft className="size-4" /> Directory
          </a>
          <button
            type="button"
            className={cn(
              "inline-flex size-10 items-center justify-center rounded-full border border-foreground/10 bg-foreground/[0.04] text-foreground/70 transition-colors hover:bg-foreground/[0.08]",
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
            <span className="grid size-24 place-items-center rounded-[30%] bg-gradient-to-br from-primary to-primary/70 text-3xl font-semibold text-primary-foreground shadow-[0_16px_32px_-16px_var(--primary)] sm:size-28 sm:text-4xl">
              FH
            </span>
          </div>
          <div className="min-w-0">
            <h1 className="flex flex-wrap items-center gap-2.5 text-3xl font-semibold tracking-tight sm:text-[40px] sm:leading-none">
              Farah Haque
              <VerifyBadge size="lg" aria-label="Verified" />
            </h1>
            <p className="mt-2 text-base text-foreground/60">
              UI engineer at Brightmoor
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-foreground/60">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> Dhaka
              </li>
              <li className="flex items-center gap-1.5">
                <Mail className="size-3.5" /> farah@brightmoor.io
              </li>
              <li className="flex items-center gap-1.5">
                <Globe className="size-3.5" /> farahhaque.dev
              </li>
            </ul>
            <SocialLinks
              size="sm"
              variant="ghost"
              className="mt-3 -ml-2 gap-0.5"
              links={[
                { network: "x", href: "https://x.com", label: "Farah on X" },
                { network: "github", href: "https://github.com", label: "Farah on GitHub" },
                { network: "dribbble", href: "https://dribbble.com", label: "Farah on Dribbble" },
              ]}
            />
          </div>
        </div>

        {/* Action capsule */}
        <div className="mt-auto flex flex-wrap gap-2">
          <button
            type="button"
            aria-pressed={following}
            onClick={() => setFollowing((v) => !v)}
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-medium transition-colors sm:h-11 sm:gap-2 sm:px-5 sm:text-sm",
              following
                ? "border border-foreground/10 bg-foreground/[0.04] text-foreground hover:bg-foreground/[0.08]"
                : "bg-primary text-primary-foreground hover:bg-primary/90",
              focusRing,
            )}
          >
            {following ? <Check className="size-3.5 sm:size-4" /> : <UserPlus className="size-3.5 sm:size-4" />}
            {following ? "Following" : "Follow"}
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex h-9 items-center gap-1.5 rounded-full border border-foreground/10 bg-foreground/[0.04] px-4 text-[13px] font-medium transition-colors hover:bg-foreground/[0.08] sm:h-11 sm:gap-2 sm:px-5 sm:text-sm",
              focusRing,
            )}
          >
            <MessageCircle className="size-3.5 sm:size-4" /> Message
          </button>
        </div>
      </GlassPanel>

      {/* Her schedule */}
      <GlassPanel shape="slab" className="flex flex-col p-6 md:col-span-6 lg:col-span-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold">Her schedule</h2>
          <p className="text-xs text-foreground/50">UTC+6</p>
        </div>
        <div className="my-auto py-4">
          <WorkdayDial
            timeZone={TIME_ZONE}
            start={WORKDAY.start}
            end={WORKDAY.end}
            place="Dhaka"
            name="Farah"
            note="Usually answers the same day"
          />
        </div>
        <p className="text-center text-sm text-foreground/60">
          Point at the ring to see her hours in your zone
        </p>
      </GlassPanel>

      {/* Stat discs */}
      <div className="grid grid-cols-3 gap-4 md:col-span-6 lg:col-span-4">
        {STATS.map((s) => (
          <GlassPanel key={s.label} shape="disc" className="grid place-items-center text-center">
            <div>
              <p className="text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl">{s.value}</p>
              <p className="mt-0.5 text-[11px] text-foreground/55 sm:text-xs">{s.label}</p>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* About */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-6 lg:col-span-8">
        <h2 className="text-sm font-semibold">About</h2>
        <p className="max-w-prose text-[15px] leading-relaxed text-foreground/70">
          Maintains the shared UI kit that three product squads build on. Right
          now reworking the animation toolkit so dialogs, sheets and toasts all
          move on one curve. Loves turning a design choice into a single token.
        </p>
        <ul className="flex flex-wrap gap-2">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-foreground/10 bg-foreground/[0.04] px-3 py-1 text-xs"
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
            <p className="text-xs leading-relaxed text-foreground/60">{item.summary}</p>
          </div>
          <div className="mt-auto space-y-2">
            {item.progress !== undefined && (
              <div
                role="progressbar"
                aria-valuenow={item.progress}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${item.title} progress`}
                className="h-1.5 overflow-hidden rounded-full bg-foreground/10"
              >
                <div
                  className="h-full rounded-full bg-primary"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
            <p
              className={cn(
                "text-xs font-medium",
                item.progress !== undefined
                  ? "text-primary"
                  : "text-foreground/50",
              )}
            >
              {item.status}
            </p>
          </div>
        </GlassPanel>
      ))}

      {/* Team */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-5">
        <h2 className="text-sm font-semibold">Frequent collaborators</h2>
        <ul className="flex flex-col gap-3">
          {TEAMMATES.map((m) => (
            <li key={m.name} className="flex items-center gap-3">
              <span className={cn("grid size-10 shrink-0 place-items-center rounded-[30%] text-xs font-semibold", m.tint)}>
                {m.initials}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{m.name}</p>
                <p className="truncate text-xs text-foreground/55">{m.role}</p>
              </div>
              <span className="shrink-0 text-xs text-foreground/50">{m.zone}</span>
            </li>
          ))}
        </ul>
      </GlassPanel>

      {/* Activity */}
      <GlassPanel className="flex flex-col gap-4 p-6 md:col-span-3 lg:col-span-7">
        <h2 className="text-sm font-semibold">Recent activity</h2>
        <ol className="flex flex-col divide-y divide-foreground/[0.07]">
          {ACTIVITY.map((a) => (
            <li key={a.text} className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-foreground/[0.06] text-foreground/60">
                <a.icon className="size-3.5" />
              </span>
              <p className="min-w-0 flex-1 truncate text-sm">{a.text}</p>
              <span className="shrink-0 text-xs text-foreground/50">{a.when}</span>
            </li>
          ))}
        </ol>
      </GlassPanel>
    </ProfilePage>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/profile-page.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/profile-page
```

## Building your own

The page above is a composition, not a component with forty props. Start from three panels and add what your data has.

```tsx
import { GlassPanel } from "@/components/custom/blocks/GlassPanelBlock";
import { ProfilePage, WorkdayDial } from "@/components/custom/blocks/ProfilePageBlock";

export default function Minimal() {
  return (
    <ProfilePage className="rounded-[36px]" aurora={["#f9a8d4", "#a5b4fc", "#fde68a"]}>
      <GlassPanel shape="slab" className="p-8 lg:col-span-8">
        <h1 className="text-3xl font-semibold tracking-tight">Farah Haque</h1>
        <p className="mt-2 text-foreground/60">UI engineer at Brightmoor</p>
      </GlassPanel>

      <GlassPanel shape="slab" className="p-6 lg:col-span-4">
        <WorkdayDial timeZone="Asia/Dhaka" start={10} end={18} place="Dhaka" name="Farah" />
      </GlassPanel>

      <GlassPanel shape="disc" className="grid place-items-center lg:col-span-2">
        <p className="text-3xl font-semibold tabular-nums">116</p>
      </GlassPanel>
    </ProfilePage>
  );
}
```

Grid spans are plain Tailwind: the grid is `grid-cols-1 md:grid-cols-6 lg:grid-cols-12`, so `lg:col-span-8` is two thirds of the page on desktop and full width on a phone. The three-disc row in the example is a nested `grid grid-cols-3` inside one cell, which keeps the discs square at every width.

## Features

### One glass, four shapes

Every panel shares a single recipe. Slab, tile, disc and capsule differ only in corners, so the page reads as one material rather than a kit of cards.

### A live dial, not a status dot

The 24-hour ring shows the working window and where the day is right now, computed in the person's own time zone with Intl.DateTimeFormat — no library.

### Light and dark by construction

Panels are translucent white over the aurora in light mode and over near-black in dark mode. The blobs dim, the text flips, nothing else has to change.

### Theme colours

The dial's arc and marker, the Follow button, the progress bars and the avatar are all written against `primary` and `ring`, so the page follows your theme preset — and the colour picker above — with no prop. Pass `var(--primary)` into `aurora` and the backdrop follows too.

### Still, on purpose

Nothing animates on load. The only motion is the marker on the dial and a lift on panels you mark interactive — and both hold still under prefers-reduced-motion.

## Props Reference

### ProfilePage

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"glass" \| "solid"` | `"glass"` | Frosted panels over an aurora, or solid white cards with a shadow on a flat ground. Read by every `GlassPanel` inside. |
| `aurora` | `[string, string, string]` | violet, sky, peach | Colours of the three blobs behind the glass. Ignored by `solid`. |
| `className` | `string` | — | Add `rounded-[36px]` inside a container, `min-h-dvh` when it is the page. |

### GlassPanel

`GlassPanel` comes from [Glass Panel](https://avaraui.com/docs/reactjs/glass-panel) (and so does `useSurface`, imported from `@/components/custom/blocks/glass-panel-context`); its `shape`, `variant` and `interactive` props are documented there. `ProfilePage` is that page's `GlassBackdrop` under the page's own name.

### WorkdayDial

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `timeZone` | `string` | — | IANA zone the person works in, e.g. `&quot;Asia/Dhaka&quot;`. |
| `start` | `number` | — | Hour the working window opens, 0–24, in that zone. |
| `end` | `number` | — | Hour the working window closes, 0–24, in that zone. |
| `place` | `string` | — | Short name shown under the clock. |
| `name` | `string` | — | Used in the accessible description and the tooltip. |
| `note` | `string` | — | One extra line at the bottom of the tooltip, e.g. `"Usually answers the same day"`. |
| `className` | `string` | — | Sizing; the dial fills its width up to `max-w-[220px]`. |

### useLocalTime

Installed alongside the page in `profile-page-hooks.ts`: `import { useLocalTime } from "@/components/custom/blocks/profile-page-hooks";`.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `timeZone` | `string` | — | IANA zone to read the clock in. Returns `&#123; hour, label, offsetFromViewer &#125; \| null`: `hour` is fractional (14.5 for 14:30), `label` the readable clock, `offsetFromViewer` how many hours that zone runs ahead of the viewer's own. It is `null` until the first client read, so server and client render the same markup. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/profile-page
