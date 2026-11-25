---
title: "Profile Card"
description: "Shadcn Profile Card. A compact creator profile card with a pointer-reactive pastel aurora cover, verified seal, expandable skill chips."
url: https://avaraui.com/docs/nextjs/profile-card
---

# Profile Card

A creator profile card (`ProfileCard`) with pointer-reactive aurora cover, verified seal, and counting stats, paired with a morphing `AccountMenu` variant.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/profile-card.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/profile-card
```

## Aurora Profile Card

Creator profile card with pointer-reactive aurora cover, expandable skills, counting stats, and Follow button.

- `variant="aurora"` renders the pastel aurora cover card style.
- `verified=true` toggles the scalloped blue verified seal beside the name.
- `active=true` toggles the pulsing green online dot on the avatar.

```tsx
import { ProfileCard } from "@/components/custom/blocks/ProfileCardBlock";

export default function ProfileCardExample() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <ProfileCard
        variant="aurora"
        name="Nadia Karim"
        role="Product & motion engineer"
        location="United States"
        verified={true}
        active={true}
        onFollowChange={(following) => {
          console.log("Following:", following);
        }}
      />
    </div>
  );
}
```

## Account Menu

Morphing account pill and card with live status picker, quick action tiles, workspace switcher, optional storage meter, and two-step sign out.

- `showModal=true` controls whether the expanded account card starts open or collapsed as a pill.
- `showStorage=false` toggles the animated storage usage meter inside the menu.

```tsx
import { AccountMenu } from "@/components/custom/blocks/AccountMenuBlock";

export default function AccountMenuExample() {
  return (
    <div className="w-full py-8 flex items-center justify-center">
      <AccountMenu
        name="John Doe"
        handle="@johndoe"
        showModal={true}
        showStorage={false}
        onStatusChange={(status) => console.log("Status:", status)}
        onWorkspaceChange={(id) => console.log("Workspace:", id)}
      />
    </div>
  );
}
```

## About Profile Card

**What it is.** `ProfileCard` renders a creator/member card with a pointer-reactive aurora cover, online `active` dot, `verified` badge, expandable skills, and Follow CTA, while `AccountMenu` provides an expandable account pill with status picker, workspace switcher, storage meter, and two-step sign out.

**How it is built.** Two focused components (`ProfileCardBlock` and `AccountMenuBlock`) bundled in the `profile-card` registry item, animated with plain CSS and the Web Animations API (no animation library) and installed together with the library's `Button`.

**When to use it.** Use `ProfileCard` for creator bios, team directories, and hover/modal user cards; use `AccountMenu` in app headers and sidebars. For full-screen user profiles, see [Profile Page](https://avaraui.com/docs/nextjs/profile-page).

## For AI agents

**When to use**

- Compact creator/team cards (`ProfileCard`) or interactive workspace account menus (`AccountMenu`)

**When not to use**

- Full-page bento profile layouts — use [Profile Page](https://avaraui.com/docs/nextjs/profile-page)

**Agent notes**

- Named exports: `ProfileCard` (`ProfileCardBlock.tsx`) and `AccountMenu` (`AccountMenuBlock.tsx`) via the `profile-card` registry item
- Toggle `showModal` and `showStorage` on `AccountMenu` to control initial expansion and storage meter visibility
- `AccountMenu` also takes `avatar`, `defaultWorkspace`, `onStatusChange`, `onWorkspaceChange`, `onUpgrade`, `onProfile`, `onSettings`, `onShortcuts`, `onNewWorkspace`, `onSignOut` and `className`; a `workspaces` item is `{ id, name, plan, color? }`
- `ProfileCard` `variant` only sets a `data-variant` attribute; `stats` items are `{ label, value, decimals?, compact? }` and only the first three render
- Both components are `forwardRef` to their root `div` and keep follow, save and status state internally

**Ask before you pick.** This page has 2 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 2 options as live previews: https://avaraui.com/view/profile-card

**When to use it.** Two profile card components: a creator profile card with a pastel aurora cover and Follow button, or a morphing account menu with status picker and workspace switcher.

**Gotchas:**

- Control the creator card's verified seal and online dot via `verified` and `active` props.
- Control the account menu's initial open state and storage meter via `showModal` and `showStorage` props.

### The 2 variants

1. **Aurora Profile Card** (`aurora`): Creator profile card with pointer-reactive aurora cover, expandable skills, counting stats, and Follow button.
   - Live: https://avaraui.com/view/profile-card/aurora
   - Best for: creator, team member, or author profile cards
   - Avoid if: you need an account switcher menu
   - Traits: aurora cover, expandable skills, counting stats, Follow button
   - Install: `npx shadcn@latest add @avara-ui/profile-card`
   - Set these props: `{"variant":"aurora"}`
   - Docs: https://avaraui.com/docs/nextjs/profile-card#aurora-profile-card
2. **Account Menu** (`account-menu`): Morphing account pill and card with status picker, quick tiles, workspace switcher, and two-step sign out.
   - Live: https://avaraui.com/view/profile-card/account-menu
   - Best for: user account menus, workspace switchers, and status pickers
   - Avoid if: you want a public creator bio card
   - Traits: morphing pill, status picker, workspace switcher, two-step sign out
   - Install: `npx shadcn@latest add @avara-ui/profile-card`
   - Set these props: `{"variant":"account-menu"}`
   - Docs: https://avaraui.com/docs/nextjs/profile-card#account-menu

## Props Reference

### ProfileCard

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"aurora" \| "account-menu"` | `"aurora"` | Only sets a `data-variant` attribute on the card; it does not change what renders. Use `AccountMenu` for the account menu. |
| `name` | `string` | `"Nadia Karim"` | Creator display name. |
| `role` | `string` | `"Product &amp; motion engineer"` | Role or title shown beneath the name. |
| `location` | `string \| null` | `"United States"` | City or place shown with an animated pin icon. Pass `null` to hide. |
| `bio` | `string` | `"Building expressive interfaces..."` | Short bio paragraph. |
| `avatar` | `string` | Cloudinary portrait | Avatar portrait image URL. |
| `verified` | `boolean` | `true` | Displays the scalloped blue verified seal beside the name. |
| `active` | `boolean` | `true` | Displays the pulsing green online dot on the avatar. |
| `status` | `string \| null` | `"Available"` | Status pill shown on the top-right of the cover. Pass `null` to hide. |
| `skills` | `string[]` | `6 skills` | Skill chips; the first 3 are shown and the rest expand via the `+n` chip. |
| `stats` | `ProfileStat[]` | Followers, Projects, Rating | Three animated stat tiles. The first tile ticks up/down on Follow. |
| `cover` | `[string, string, string]` | `["#a5f3fc", "#c4b5fd", "#fbcfe8"]` | Three pastel colours for the pointer-reactive aurora cover. |
| `defaultFollowing` | `boolean` | `false` | Initial Following state. |
| `onFollowChange` | `(following: boolean) => void` | `undefined` | Callback fired when the Follow button is clicked. |
| `onMessage` | `() => void` | `undefined` | Callback fired when the Message icon button is clicked. |
| `onSaveChange` | `(saved: boolean) => void` | `undefined` | Callback fired when the Save bookmark button is toggled. |
| `className` | `string` | `undefined` | Additional CSS classes for the card container. |

### AccountMenu

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `showModal` | `boolean` | `true` | Controls whether the expanded account menu card starts open or collapsed as a pill. |
| `showStorage` | `boolean` | `false` | Controls whether the animated storage meter is displayed. |
| `name` | `string` | `"John Doe"` | User display name. |
| `handle` | `string` | `"@johndoe"` | Handle shown beside the rolling status line. |
| `defaultStatus` | `"online" \| "focus" \| "away" \| "hidden"` | `"online"` | Initial presence status. |
| `workspaces` | `AccountWorkspace[]` | `2 workspaces` | List of workspaces to switch between. |
| `storage` | `[number, number] \| null` | `[6.4, 10]` | Used and total storage in GB (shown when `showStorage` is `true`). |

## Works with other components

- Embed `AccountMenu` inside [Navbar](https://avaraui.com/docs/nextjs/navbar) or [Sidebar](https://avaraui.com/docs/nextjs/sidebar) headers, or pair `ProfileCard` with [Social Links](https://avaraui.com/docs/nextjs/social-links).

## How do I show the storage usage meter inside AccountMenu?

Pass `showStorage={true}` to `AccountMenu`. The meter renders only while `storage` is not `null`, and `storage={[usedGb, totalGb]}` sets the numbers, with `[6.4, 10]` as the default. The bar fill is used divided by total, capped at full.

## How do I listen for Follow, Message and Save clicks on ProfileCard?

Use `onFollowChange(following)`, `onMessage()` and `onSaveChange(saved)`. Follow and save state live inside the card, and `defaultFollowing` only sets the starting value. The first stat tile, treated as followers, counts one up or down relative to that starting state when Follow is toggled.

## How do I change the ProfileCard stats, skills and cover colors?

Pass `stats` as `{ label, value, decimals?, compact? }` objects. Only the first three render, and `compact` shortens thousands to `12.4k`. `skills` shows the first three chips with a `+n` chip for the rest, and `cover` takes three colors for the aurora.

## Does the ProfileCard variant prop change its design?

No. `variant` accepts `"aurora"` or `"account-menu"` but only writes a `data-variant` attribute on the card, so both values render the same aurora card. For the expandable account pill, use the separate `AccountMenu` export from `AccountMenuBlock`, which `ProfileCardBlock` also re-exports.

## How do I start AccountMenu collapsed as a pill?

Set `showModal={false}`. The menu then renders as a pill that expands on click, and `Escape` or the Collapse button folds it back. Changing `showModal` later reopens or closes it. Sign out takes two clicks: the first asks, and a second within about 2.6 seconds fires `onSignOut`.

## What does the profile-card install add, and does it need Next.js?

It installs `ProfileCardBlock`, `AccountMenuBlock` and the library `Button`, plus the npm package `motion`. There are no `next/*` imports and the avatar is a plain `img`, so it works in Vite. Animations switch off for `prefers-reduced-motion` through `useReducedMotion`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/profile-card
