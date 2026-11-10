---
title: "Shadcn CTA Section"
description: "An interconnected, conversion-focused call-to-action block designed for modern web applications, agencies, and SaaS platforms. Free shadcn/ui CTA Section."
url: https://avaraui.com/docs/nextjs/cta-section
---

# Shadcn CTA Section

An interconnected, conversion-focused call-to-action block designed for modern web applications, agencies, and SaaS platforms. Features high-impact interactive systems including **Mobile App Showcase** (interactive smartphone experience with live workout tracking, app store CTAs, and responsive previews), **Concentric Portal** (scroll-driven expanding circular lens with gyroscopic monospace orbital text), and **Offer Showcase** (promotional pricing card with moving nature reels).

## For AI agents

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/cta-section

**When to use it.** A closing call-to-action block. Four designs, from a promotional offer card to a mobile app showcase, a scroll-driven portal and a brand scorecard.

**When to use something else:**

- [Pricing](https://avaraui.com/docs/reactjs/pricing): when the next step is choosing a plan and the prices need to be shown.
- [Newsletter](https://avaraui.com/docs/reactjs/newsletter): when the action is an email sign-up.

**Gotchas:**

- All four are looks of the one `cta-section` item: install it once and set `variant` from the index. The default, if you set none, is `brand-pillars`.

### The 4 variants

1. **Offer showcase** (`offer-showcase`): A central promotional offer card with an animated price count-up, flanked by moving image reels.
   - Live: https://avaraui.com/view/cta-section/offer-showcase
   - Best for: a launch offer, lifetime deal or limited-time promotion
   - Avoid if: you have no offer or price to promote; you have no images for the reels
   - Traits: animated price count-up, compare-at price and discount badge, four moving image reels
   - Install: `npx shadcn@latest add @avara-ui/cta-section`
   - Set these props: `{"variant":"offer-showcase"}`
   - Docs: https://avaraui.com/docs/nextjs/cta-section#offer-showcase-variant-offer-showcase
2. **Mobile app showcase** (`mobile-app`): An upright Android phone mockup showing your app, with a serif italic highlight in the headline and store buttons.
   - Live: https://avaraui.com/view/cta-section/mobile-app
   - Best for: driving downloads of a mobile app
   - Avoid if: you do not have a mobile app
   - Traits: Pixel 8 phone mockup, App Store and Google Play buttons, serif italic headline phrase
   - Install: `npx shadcn@latest add @avara-ui/cta-section`
   - Set these props: `{"variant":"mobile-app"}`
   - Docs: https://avaraui.com/docs/nextjs/cta-section#mobile-app-showcase-variant-mobile-app
3. **Concentric portal** (`concentric-portal`): A scroll-driven circular lens that expands, ringed by slowly rotating orbital text.
   - Live: https://avaraui.com/view/cta-section/concentric-portal
   - Best for: a memorable closing moment for a launch or event page
   - Avoid if: you want a plain, quick-to-read call to action
   - Traits: scroll-scrubbed expansion, rotating text orbits, monospace orbit text
   - Install: `npx shadcn@latest add @avara-ui/cta-section`
   - Set these props: `{"variant":"concentric-portal"}`
   - Docs: https://avaraui.com/docs/nextjs/cta-section#concentric-portal-variant-concentric-portal
4. **Brand pillars** (`brand-pillars`): An interactive scorecard of brand pillars with live progress meters that recalculate as you choose.
   - Live: https://avaraui.com/view/cta-section/brand-pillars
   - Best for: agencies and services that want to show what they offer before the ask
   - Avoid if: you want a single headline and button
   - Traits: interactive pillars, live score recalculation, accent colour, the default variant
   - Install: `npx shadcn@latest add @avara-ui/cta-section`
   - Set these props: `{"variant":"brand-pillars"}`
   - Docs: https://avaraui.com/docs/nextjs/cta-section#brand-pillars-variant-brand-pillars

## Offer Showcase — variant="offer-showcase"

Pass `variant="offer-showcase"` for a high-impact central promotional offer card flanked by moving nature reels with animated price count-up.

- Pass `variant="offer-showcase"` Selects the offer showcase layout with continuously moving background nature reels and elevated central card.
- Pass `images=natureImages` Passes an array of Cloudinary nature image URLs displayed in the 4 continuous vertical moving reels.
- Set `badge="Limited launch offer"` Renders a prominent pill badge with an animated pulsing live status dot.
- Set `price=149` Sets the numerical offer price with animated count-up and currency symbol.
- Set `compareAtPrice=349` Displays the original price with strikethrough styling.
- Set `savingsText="Save 57%"` Renders the highlighted savings discount badge next to the compare-at price.

```tsx
import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

// Cloudinary Nature Imagery Collection
const natureImages = [
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1470071459604-3b5ec3a7fe05-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1426604966848-d7adac402bff-1790145143490.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146211/photo-1441974231531-c6227db76b6e-1790146212212.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146209/photo-1469474968028-56623f02e42e-1790146212205.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790146210/photo-1506744038136-46273834b3fb-1790146212208.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145142/photo-1511671782779-c97d3d27a1d4-1790145143493.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790145140/photo-1550684848-fac1c5b4e853-1790145143489.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790148864/photo-1618005182384-a83a8bd57fbe-1790148865111.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-7688336-1790166052227.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-8867434-1790166052229.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-7658387-1790166052226.jpg",
  "https://res.cloudinary.com/dodndg7ai/image/upload/f_webp,q_auto,w_800,c_limit/v1790166049/pexels-photo-7709086-1790166052228.jpg",
];

export default function OfferShowcaseExample() {
  return (
    <CTASection
      variant="offer-showcase"
      badge="Limited launch offer"
      heading="Everything you need, one payment"
      subheading="Lifetime access to every current and future release. No subscription, no renewals."
      price={149}
      compareAtPrice={349}
      savingsText="Save 57%"
      ctaText="Claim the offer"
      ctaHref="#"
      footnote="Secure checkout · 14-day refund"
      images={natureImages}
    />
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/cta-section.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/cta-section
```

## Examples

### Concentric Portal — variant="concentric-portal"

Pass `variant="concentric-portal"` for the scroll-driven expanding circular lens with continuous gyroscopic orbital text rings.

- Pass `variant="concentric-portal"` Selects the concentric orbital portal experience with scroll-scrubbed expansion.
- Set `autoRotate=true` Enables automatic gyroscopic rotation for all concentric text orbits (set to false to keep static).
- Set `phrase="THE CONTENT ARCHITECTURE"` Defines the repeating monospace text string orbiting around the portal.

```tsx
import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function ConcentricPortalExample() {
  return (
    <CTASection
      variant="concentric-portal"
      heading="The next 5 days are yours."
      subheading="Access Portal"
      phrase="THE CONTENT ARCHITECTURE"
      ctaText="GET ACCESS"
      ctaHref="#"
      autoRotate={true}
    />
  );
}
```

### Brand Pillars — variant="brand-pillars"

Pass `variant="brand-pillars"` for the interactive synchronized scorecard with dynamic progress metrics.

- Pass `variant="brand-pillars"` Selects the multi-pillar brand scorecard layout with live score recalculation.
- Set `color="#f95716"` Sets the signature brand accent color for active cards, meters, and badges.

```tsx
import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function BrandPillarsExample() {
  return (
    <CTASection
      variant="brand-pillars"
      color="#f95716"
      statement="A strong brand isn't built from a single element. Branding, website, social, and data reinforce each other — together creating a brand that's recognizable, consistent, and effective."
      summaryText='One complete, consistent brand" — 100%'
      ctaText="Boek a demo"
      ctaHref="#"
    />
  );
};
```

### Mobile App Showcase — variant="mobile-app"

Pass `variant="mobile-app"` for a scroll-driven app showcase CTA. Initially displays only the iPhone 16 Pro frame centered in the viewport; scrolling smoothly glides the phone down and to the left while the editorial headline, description, and official app store badges reveal on the right.

- Pass `variant="mobile-app"` Selects the mobile app showcase layout with an upright iPhone 16 Pro mockup.
- Set `headingAccent="your partner"` Applies an elegant serif italic treatment to the highlighted phrase in the headline.
- Set `userName="Alicia Regis"` Customizes the greeting header inside the phone screen feed.
- Set `featuredWorkoutTitle="Wellness Workshops"` Sets the title of the hero video/image card within the mobile feed.
- Set `showAppStoreBadges=true` Displays official Apple App Store and Google Play store download buttons.

```tsx
import { CTASection } from "@/components/custom/blocks/CtaSectionBlock";

export default function MobileAppExample() {
  return (
    <CTASection
      variant="mobile-app"
      badge="Mobile App Available"
      heading={"Aura Clearmind..
Your partner in wellness."}
      subheading="Find and book your favorite yoga classes, guided meditation, and daily mindful wellness sessions from anywhere with our all-in-one mobile app, designed to bring balance, clarity, and peace to your life."
      appleStoreHref="#"
      googlePlayHref="#"
      userName="Alicia Regis"
      featuredWorkoutTitle="Wellness Workshops"
      workoutDuration="10 Min"
      workoutCalories="300 Kcal"
    />
  );
};
```

## Features

Discover the key capabilities that make this component an excellent choice for modern interactive user interfaces.

### Synchronized Scorecard

Selecting any feature or service card on the left automatically synchronizes with the right scorecard canvas, animating scores and progress meters.

### Signature 3D Popover

Features an eye-catching floating active badge with vibrant accent gradients, bold typography, and smooth transitions.

### Design Token Integration

Seamlessly respects `var(--radius)` corner rounding and brand accent tokens across Light and Dark themes.

### Fully Responsive

Adapts effortlessly from expansive two-column desktop layouts to stacked, touch-friendly mobile flows without horizontal overflow.

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"brand-pillars" \| "minimal" \| "split" \| "concentric-portal" \| "orbital-lens"` | `"brand-pillars"` | Visual mode. `"concentric-portal"` renders the scroll-driven expanding circular lens with gyroscopic monospace orbital text and segmented actions; `"brand-pillars"` renders the interactive scorecard ecosystem. |
| `phrase` | `string` | `"THE CONTENT ARCHITECTURE"` | Monospace uppercase text string repeated around the concentric orbital rings in `concentric-portal` variant. |
| `autoRotate` | `boolean` | `true` | Controls continuous automatic ambient spinning of the concentric text rings. Set to `false` to keep them static. |
| `scrollProgress` | `number` | `undefined` | Optional manual scroll progress (`0` to `1`). When provided, locks the concentric portal expansion to a specific progression without requiring scroll track. |
| `color` | `string` | `"#f95716"` | Primary accent color. Accepts hex colors (e.g. `"#f95716"`), CSS variables (`"var(--primary)"`), or preset names (`"orange"`, `"primary"`, `"indigo"`, `"rose"`, `"emerald"`). |
| `heading` | `string` | `undefined` | Optional main section heading. |
| `subheading` | `string` | `undefined` | Optional eyebrow label above the heading. |
| `statement` | `string` | Standard statement | The primary bold philosophy statement rendered on the scorecard panel. |
| `pillars` | `PillarItem[]` | `DEFAULT_PILLARS` | Array of 4 pillar objects containing `id`, `eyebrow`, `title`, `description`, `score`, and optional `icon`. |
| `summaryText` | `string` | `'One complete, consistent brand" — 100%'` | Text displayed inside the bottom summary bar. |
| `summaryScore` | `string \| number` | `"50%"` | Metric or score shown on the summary bar. |
| `ctaText` | `string` | `"Get Started"` | Call-to-action button label. |
| `ctaHref` | `string` | `"#"` | Link destination for the CTA button. |
| `rounded` | `string \| number` | `"var(--radius, 16px)"` | Corner rounding radius for the cards, panels, and buttons. |
| `className` | `string` | `undefined` | Custom Tailwind CSS classes applied to the root section element. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/cta-section
