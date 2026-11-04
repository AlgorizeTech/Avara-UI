---
title: "Shadcn Social Links"
description: "Shadcn Social Links. Social media icon links for X, GitHub, LinkedIn, YouTube, Instagram, Facebook, Discord, Dribbble and email, each named for screen readers."
url: https://avaraui.com/docs/nextjs/social-links
---

# Shadcn Social Links

A row of brand marks that link out. Hand it the networks you have — X, GitHub, LinkedIn, YouTube, Instagram, Facebook, Discord, Dribbble, email — and it draws one tile per link, each with an accessible name, opening off-site links in a new tab.

The marks are inline SVG rather than an icon-library import, so the component keeps working whichever icon package (or version of it) a project has installed. It is the social row in every [Footer](https://avaraui.com/docs/nextjs/footer) variant, and fits just as well on a profile card or under an author's name.

## Follow row

The five networks a footer usually carries, as soft tiles that take the primary colour on hover.

- `links` is the only required prop: `{ network, href, label? }[]`. Order is drawn as given; a network you leave out is simply not there.
- `external` is on by default, so every link opens in a new tab with `rel="noopener noreferrer"` — `mailto:` links are left alone. Turn it off for internal hrefs.

```tsx
import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function FollowUs() {
  return (
    <SocialLinks
      links={[
        { network: "x", href: "https://x.com/avaraui" },
        { network: "github", href: "https://github.com/avaraui" },
        { network: "linkedin", href: "https://linkedin.com/company/avaraui" },
        { network: "youtube", href: "https://youtube.com/@avaraui" },
        { network: "instagram", href: "https://instagram.com/avaraui" },
      ]}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/social-links.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/social-links
```

## Examples

### Expand and replace share button (Trigger hides on hover)

Share trigger button hides on hover, with social link icons revealing directly from the trigger position in 4 directions.

- `variant="expand-replace"` hides the trigger button on hover and expands social link icons starting directly from its exact position.
- `expandDirection="top" | "right" | "left" | "bottom"` controls direction of animated reveal. Defaults to "right".

```tsx
import { SocialLinks, type SocialLink } from "@/components/custom/blocks/SocialLinksBlock";

const links: SocialLink[] = [
  { network: "x", href: "https://x.com/avaraui" },
  { network: "github", href: "https://github.com/avaraui" },
  { network: "linkedin", href: "https://linkedin.com/company/avaraui" },
  { network: "youtube", href: "https://youtube.com/@avaraui" },
  { network: "instagram", href: "https://instagram.com/avaraui" },
];

export default function ExpandReplaceShareButton() {
  return (
    <div className="flex gap-8 items-center">
      {/* Expand & Replace Top */}
      <SocialLinks variant="expand-replace" expandDirection="top" links={links} />

      {/* Expand & Replace Right (Default) */}
      <SocialLinks variant="expand-replace" expandDirection="right" links={links} />

      {/* Expand & Replace Left */}
      <SocialLinks variant="expand-replace" expandDirection="left" links={links} />

      {/* Expand & Replace Bottom */}
      <SocialLinks variant="expand-replace" expandDirection="bottom" links={links} />
    </div>
  );
}
```

### Expandable 4-directional share buttons

Icon-only share button trigger that animates social icons expanding smoothly in 4 directions: top, right, left, or bottom.

- `variant="expand-reveal"` renders an icon-only Share trigger button that expands social link tiles on mouse hover.
- `expandDirection="top" | "right" | "left" | "bottom"` controls direction of animated reveal. Defaults to "right".

```tsx
import { SocialLinks, type SocialLink } from "@/components/custom/blocks/SocialLinksBlock";

const links: SocialLink[] = [
  { network: "x", href: "https://x.com/avaraui" },
  { network: "github", href: "https://github.com/avaraui" },
  { network: "linkedin", href: "https://linkedin.com/company/avaraui" },
  { network: "youtube", href: "https://youtube.com/@avaraui" },
  { network: "instagram", href: "https://instagram.com/avaraui" },
];

export default function ExpandShareButton() {
  return (
    <div className="flex gap-8 items-center">
      {/* Expand Top */}
      <SocialLinks variant="expand-reveal" expandDirection="top" links={links} />

      {/* Expand Right (Default) */}
      <SocialLinks variant="expand-reveal" expandDirection="right" links={links} />

      {/* Expand Left */}
      <SocialLinks variant="expand-reveal" expandDirection="left" links={links} />

      {/* Expand Bottom */}
      <SocialLinks variant="expand-reveal" expandDirection="bottom" links={links} />
    </div>
  );
}
```

### Every network, outlined

All nine networks at the large size on the outline surface.

- `variant="outline"` draws a border instead of a fill; `"ghost"` draws nothing until hover. `"tile"` is the default.
- `size="lg"` sets the tile and mark together: sm is 32px, md 40px, lg 48px.

```tsx
import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function EveryNetwork() {
  return (
    <SocialLinks
      variant="outline"
      size="lg"
      links={[
        { network: "x", href: "https://x.com" },
        { network: "github", href: "https://github.com" },
        { network: "linkedin", href: "https://linkedin.com" },
        { network: "youtube", href: "https://youtube.com" },
        { network: "instagram", href: "https://instagram.com" },
        { network: "facebook", href: "https://facebook.com" },
        { network: "discord", href: "https://discord.gg/avaraui" },
        { network: "dribbble", href: "https://dribbble.com/avaraui" },
        { network: "email", href: "mailto:hello@avaraui.com" },
      ]}
    />
  );
}
```

### Author byline

Small ghost tiles under a name, with a label per link so a screen reader says whose profile it is.

- `label` on a link overrides the accessible name — the default is the network's name, e.g. "GitHub".
- `className` lands on the row, so `gap-*` and `justify-*` tune spacing and alignment.

```tsx
import { SocialLinks } from "@/components/custom/blocks/SocialLinksBlock";

export default function AuthorCard() {
  return (
    <div className="flex max-w-sm items-center gap-4 rounded-2xl border border-border bg-card p-4">
      <img src="https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_200,c_limit/v1790158813/photo-1494790108377-be9c29b29330-1790158812212.jpg" alt="Ayesha Karim" className="size-14 rounded-full object-cover" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold">Ayesha Karim</p>
        <p className="text-xs text-muted-foreground">Design engineer, Avara</p>
        <SocialLinks
          size="sm"
          variant="ghost"
          className="mt-2 gap-1"
          links={[
            { network: "x", href: "https://x.com/ayesha", label: "Ayesha on X" },
            { network: "github", href: "https://github.com/ayesha", label: "Ayesha on GitHub" },
            { network: "dribbble", href: "https://dribbble.com/ayesha", label: "Ayesha on Dribbble" },
          ]}
        />
      </div>
    </div>
  );
}
```

## Features

### No icon package

Brand marks are inline SVG. Lucide dropped its brand icons, so this never breaks when an icon library updates.

### Named for screen readers

Every tile carries an aria-label and title — the network's name by default, or whatever label you pass — and a visible focus ring.

### Safe off-site links

External links open in a new tab with noopener noreferrer. Email links stay in place, because a new tab for mailto is just an empty tab.

### Works with your router

Pass linkComponent={"{Link}"} from next/link when some hrefs are internal; a plain anchor is the default so it runs anywhere.

## Props Reference

### SocialLinks

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `links` | `SocialLink[]` | — | The row, in order. See the shape below. |
| `variant` | `&quot;tile&quot; \| &quot;outline&quot; \| &quot;ghost&quot;` | `&quot;tile&quot;` | Soft fill, border, or nothing until hover. |
| `size` | `&quot;sm&quot; \| &quot;md&quot; \| &quot;lg&quot;` | `&quot;md&quot;` | Tile and mark size: 32, 40 or 48px. |
| `external` | `boolean` | `true` | Open links in a new tab with `rel=&quot;noopener noreferrer&quot;`. `mailto:` hrefs are exempt. |
| `linkComponent` | `React.ElementType` | `&quot;a&quot;` | The element used for each link — pass `next/link` for internal hrefs. |
| `className` | `string` | — | Applied to the row; other props are spread there too. |

### SocialLink

| Field | Type | Description |
| --- | --- | --- |
| `network` | `&quot;x&quot; \| &quot;github&quot; \| &quot;linkedin&quot; \| &quot;youtube&quot; \| &quot;instagram&quot; \| &quot;facebook&quot; \| &quot;discord&quot; \| &quot;dribbble&quot; \| &quot;email&quot;` | Which mark to draw. |
| `href` | `string` | Where it goes. |
| `label` | `string` | Accessible name. Defaults to the network's name. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/social-links
