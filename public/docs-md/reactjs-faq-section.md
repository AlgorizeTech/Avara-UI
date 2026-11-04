---
title: "FAQ Section"
description: "An animated, editorial FAQ section designed for modern landing pages, SaaS platforms, and digital agencies. Free shadcn/ui block for React and Tailwind CSS."
url: https://avaraui.com/docs/nextjs/faq-section
---

# FAQ Section

An animated, editorial FAQ section designed for modern landing pages, SaaS platforms, and digital agencies. Pairs a centered section header with an interactive nature photography canvas that dynamically morphs its height and width and crossfades photos with each active question, alongside a keyboard-accessible, smooth accordion list.

Built with pure CSS keyframes and transitions — zero third-party animation library runtime dependencies, guaranteed 60fps performance, and full adaptive styling for both Light and Dark themes.

## 1. Homepage FAQ Section

The complete homepage FAQ section. Features a centered header, ambient background glows, an architectural nature photography canvas that morphs dynamically with each open question, and an accessible accordion list.

- Pass `eyebrow="Common Queries"` to customize the pill badge text displayed above the title.
- Set `title="Frequently Asked Questions"` for the primary section headline.
- Provide `description="..."` to customize the section summary paragraph beneath the title.

```tsx
export default function FAQExample() {
  return (
    <FAQSection
      eyebrow="Common Queries"
      title="Frequently Asked Questions"
      description="Everything you need to know about using Docs UI, component integration, licensing, and custom styling."
    />
  );
}
```

## 2. Two-Column Support FAQ

A two-column section: sticky heading and a support team contact card on the left, the expandable questions accordion on the right.

- Set `variant="two-column"` to switch to a sticky two-column layout with support team contact card.
- `title="Questions people ask..."` for the sticky left-hand headline.
- `description` short introductory summary beneath the headline.

```tsx
export default function TwoColumnFAQExample() {
  return (
    <FAQSection
      variant="two-column"
      title="Questions people ask before they install."
      description="Short answers on licensing, theming and where the components run. If yours isn't here, we read every message."
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/faq-section.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/faq-section
```

## Props Reference

### FAQSection

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"canvas" \| "two-column"` | `"canvas"` | Layout presentation: `"canvas"` displays the centered nature canvas layout; `"two-column"` displays the sticky heading &amp; support card layout. |
| `eyebrow` | `string` | `"Common Queries"` | The pill badge text displayed above the title with a sparkles icon. Pass empty string or null to omit. |
| `title` | `string` | `"Frequently Asked Questions"` | The primary headline string rendered in editorial serif styling. |
| `description` | `string` | `"Everything you need to know..."` | The subtitle paragraph explaining the section context. |
| `items` | `FAQItem[]` | `FAQ_ITEMS` | Array of FAQ questions, answers, nature photography URLs, and coordinate metadata. |
| `showGlows` | `boolean` | `true` | Whether to render ambient background blur glow orbs behind the section. |
| `defaultActiveId` | `string` | `"installation"` | The ID of the question that opens expanded on initial render. |
| `id` | `string` | `"faq"` | HTML section element id for anchor linking (e.g. `#faq`). |
| `className` | `string` | `undefined` | Additional Tailwind CSS classes for the root `<section>` container. |

### FAQItem Data Structure

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Unique identifier for the item used for active state tracking. |
| `question` | `string` | The question headline displayed in the accordion button. |
| `category` | `string` | Category badge string (e.g. `"CLI & Setup"`, `"Tailwind & Theming"`). |
| `answer` | `string` | The detailed answer body revealed inside the accordion panel. |
| `image` | `string` | High-resolution photo URL rendered on the interactive nature canvas. |
| `location` | `string` | Geographic location label displayed in the bottom caption badge. |
| `coordinates` | `string` | Latitude/longitude coordinates displayed in the top-right watermark badge. |
| `height` | `number` | Target canvas height in pixels for dynamic morphing transitions. |
| `maxWidth` | `number` | Target canvas maximum width in pixels for dynamic morphing transitions. |
| `clipCut` | `string` | Chamfer corner cut size (e.g. `"2.5rem"`) for the polygon clip-path. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/faq-section
