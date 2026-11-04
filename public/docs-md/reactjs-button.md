---
title: "Button"
description: "An animated button with a glowing line that runs around its border, a click ripple, loading states and colours that follow your theme. Free shadcn/ui component."
url: https://avaraui.com/docs/nextjs/button
---

# Button

An animated glowing-border Button component engineered with a spinning conic-gradient line tracking the 4 edges of the button, smooth click ripple physics, loading states, and full theme synchronization.

The glowing border animation continuously spins around the 4 sides of the button matching the form submitting engine animation.

## 4-Side Spinning Glowing Line Animated Button

- Feature `variant="outline"` renders a continuous spinning conic-gradient glowing line with solid white/black bg and hover theme fill.

```tsx
import Button from "@/components/custom/blocks/Button";

export default function GlowingBorderButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* 1. Continuous 4-Edge Conic Spinning Border Line */}
      <Button variant="outline" iconRight={<ArrowRightIcon />}>
        Spinning Border
      </Button>

      {/* 2. Continuous Radar Ping Waves */}
      <Button variant="radar-ping" iconLeft={<SettingsIcon />}>
        Radar Ping
      </Button>

      {/* 3. Continuous Cosmic Orbit Light Ring */}
      <Button variant="cosmic-orbit" iconLeft={<SettingsIcon />}>
        Cosmic Orbit
      </Button>
    </div>
  );
};
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/button.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/button
```

## Examples

### Dark Glass Parameter Control Panel Tiles

Interactive dark glass control tiles for parameter panels (Color pickers, dropdown selects, sliders, and toggle switches).

- Shards Control `variant="shards-control"` renders a dark glass control tile supporting `controlType='color' | 'select' | 'slider' | 'toggle'`.
- Effect `effect="sparkle" | "orbit" | "beacon" | "shimmer"` plays when the tile lands on something: a slider reaching full, a toggle switching on, or a new select / colour pick. Any tile can take any effect; the colour tile tints its effect with the picked colour.
- Mode `effectMode="once" | "continuous"` `once` plays a single time per landing; `continuous` loops while the tile stays active and fades out when it no longer is. Override when it counts as active with `effectActive`. Skipped under `prefers-reduced-motion`.

```tsx
const EFFECT_MODES: Record<string, ShardsEffectMode> = {
  "One time": "once",
  Continuous: "continuous",
};

export default function ControlButtonsDemo() {
  const [effectMode, setEffectMode] = useState<ShardsEffectMode>("once");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      {/* 0. Effect mode picker: one-time plays or continuous loops */}
      <Button
        variant="shards-control"
        controlType="select"
        label="Animation"
        value="One time"
        options={Object.keys(EFFECT_MODES)}
        onValueChange={(label) => setEffectMode(EFFECT_MODES[label])}
        className="sm:col-span-2 lg:col-span-1"
      />

      {/* 1. Color Picker Button - shimmer on every pick, tinted with the colour */}
      <Button
        variant="shards-control"
        controlType="color"
        label="Shards"
        colorHex="#a855f7"
        effect="shimmer"
        effectMode={effectMode}
      />

      {/* 2. Dropdown Select Button - beams orbit the edge on a new pick */}
      <Button
        variant="shards-control"
        controlType="select"
        label="Placement"
        value="Full"
        options={["Full", "Center", "Top", "Bottom"]}
        effect="orbit"
        effectMode={effectMode}
      />

      {/* 3. Range Slider Button - sparkles when dragged to full */}
      <Button
        variant="shards-control"
        controlType="slider"
        label="Scale"
        value={1}
        min={0}
        max={3}
        step={0.1}
        effect="sparkle"
        effectMode={effectMode}
      />

      {/* 4. Toggle Switch Button - beacon pings when switched on */}
      <Button
        variant="shards-control"
        controlType="toggle"
        label="Hold to Gather"
        checked={true}
        effect="beacon"
        effectMode={effectMode}
      />
    </div>
  );
}
```

### Interactive Sliding Icon & Text Motion Variants

- Icon Expand `variant="expand-icon"` radial color expansion fills button from icon center.
- Icon Slide `variant="slide-icon"` rounded icon slides out to right while new icon enters from left.
- Icon Loop `variant="slide-icon-loop"` same rounded icon, but the arrow keeps travelling right and re-entering from the left on its own — no hover needed. Holds still under `prefers-reduced-motion`.
- 3D Press `variant="3d"` a raised face over a darker edge and a ground shadow; the face sinks toward the edge on hover and all the way down on press. Colours come from `--primary`, so it follows the theme.
- Background Wipe `variant="slide-bg"` background wipes horizontally from left to right.
- Text Roll Motion `variant="slide-text" | "slide-text-down" | "slide-text-bounce"` vertical text sliding and hero spring character bounce.

```tsx
import Button from "@/components/custom/blocks/Button";

export default function MotionButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* 1. Icon Left Radial Expanding Background Fill */}
      <Button variant="expand-icon" iconLeft={<ArrowRightIcon />}>
        Send Message
      </Button>

      {/* 2. Interactive Sliding Rounded Icon Physics */}
      <Button variant="slide-icon" iconRight={<ArrowRightIcon />}>
        Explore Features
      </Button>

      {/* 3. Looping Rounded Icon (arrow cycles through the circle on its own) */}
      <Button variant="slide-icon-loop" iconRight={<ArrowRightIcon />}>
        Keep Reading
      </Button>

      {/* 4. Raised 3D face over a darker edge - sinks on hover, presses on click */}
      <Button variant="3d" iconRight={<ArrowRightIcon />}>
        Get Started
      </Button>

      {/* 5. Horizontal Left to Right Background Wipe */}
      <Button variant="slide-bg" iconRight={<DownloadIcon />}>
        Download Assets
      </Button>

      {/* 6. Spring Bounce Roll (Hero cubic-bezier spring bounce) */}
      <Button variant="slide-text-bounce">
        Spring Bounce
      </Button>

      {/* 7. Upward Text Roll */}
      <Button variant="slide-text" iconRight={<ArrowRightIcon />}>
        Upward Roll
      </Button>

      {/* 8. Downward Text Roll */}
      <Button variant="slide-text-down" iconLeft={<MailIcon />}>
        Downward Roll
      </Button>
    </div>
  );
}
```

### Icon only

Omit the children and the button collapses to a square icon target.

```tsx
import Button from "@/components/custom/blocks/Button";

export default function IconOnlyButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button variant="default" size="sm" iconLeft={<SearchIcon />} />
      <Button variant="default" size="sm" iconLeft={<BellIcon />} />
      <Button variant="default" size="sm" iconLeft={<MailIcon />} />
      <Button variant="default" size="sm" iconLeft={<PhoneIcon />} />
      <Button variant="default" size="sm" iconLeft={<SettingsIcon />} />
      <Button variant="default" size="sm" iconLeft={<PlusIcon />} />
      <Button variant="default" size="sm" iconLeft={<MinusIcon />} />
      <Button variant="default" size="sm" iconLeft={<XIcon />} />
    </div>
  );
}
```

### Social login

Brand SVGs from the bundled icon set as leading icons.

```tsx
import Button from "@/components/custom/blocks/Button";

export default function SocialButtonDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 max-w-2xl mx-auto">
      <Button variant="default" iconLeft={<EmailIcon />}>
        Login with Email
      </Button>
      <Button variant="default" iconLeft={<GoogleIcon />}>
        Continue with Google
      </Button>
      <Button variant="default" iconLeft={<GitHubIcon />}>
        Continue with GitHub
      </Button>
      <Button variant="default" iconLeft={<FacebookIcon />}>
        Login with Facebook
      </Button>
      <Button variant="default" iconLeft={<XIcon2 />}>
        Login with X
      </Button>
      <Button variant="default" iconLeft={<AppleIcon />}>
        Login with Apple
      </Button>
      <Button variant="default" iconLeft={<MicrosoftIcon />}>
        Login with Microsoft
      </Button>
      <Button variant="default" iconLeft={<SlackIcon />}>
        Login with Slack
      </Button>
      <Button variant="default" iconLeft={<LinkedInIcon />}>
        Login with LinkedIn
      </Button>
    </div>
  );
}
```

### Auth, Glass, Liquid-Glass, Scenic & Ribbon Buttons

Dedicated button surfaces used across Auth Forms (Default, Split, Minimal, Frosted Glass, Liquid Glass, Scenic Onboarding, and Ribbon Drift) — available standalone for any glassmorphic or multi-step UI.

- Auth Social `variant="auth-social"` subtle bordered card button for GitHub/Google social sign-in.
- Frosted Glass Social `variant="glass-social"` translucent backdrop-blur button with crisp hover border for frosted glass cards.
- Liquid Glass Primary `variant="liquid-glass-primary"` primary refractive glass CTA with specular top highlight and ambient glow.
- Liquid Glass Social `variant="liquid-glass-social"` translucent white/12 refractive glass button with inset highlight for dark/image backdrops.
- Scenic Primary & Secondary `variant="scenic-primary" | "scenic-secondary" | "scenic-option"` rounded 2xl action, secondary pill, and 52px social/email option buttons from Scenic auth flows.
- Ribbon Drift `variant="ribbon-primary" | "ribbon-social"` full-pill gradient-hover primary CTA and ringed social button from Ribbon Drift.

```tsx
import Button from "@/components/custom/blocks/Button";

export default function AuthAndGlassButtonsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button variant="auth-social" iconLeft={<GitHubIcon />}>
        Auth Social
      </Button>
      <Button variant="glass-social" iconLeft={<GoogleIcon />}>
        Glass Social
      </Button>
      <Button variant="liquid-glass-primary" showArrow>
        Liquid Glass Primary
      </Button>
      <Button variant="liquid-glass-social" iconLeft={<GoogleIcon />}>
        Liquid Glass Social
      </Button>
      <Button variant="scenic-primary" showArrow>
        Scenic Primary
      </Button>
      <Button variant="scenic-secondary">
        Scenic Secondary
      </Button>
      <Button variant="scenic-option" iconLeft={<AppleIcon />}>
        Scenic Option
      </Button>
      <Button variant="ribbon-primary" showArrow>
        Ribbon Primary
      </Button>
      <Button variant="ribbon-social" iconLeft={<GoogleIcon />}>
        Ribbon Social
      </Button>
    </div>
  );
};
```

### Pricing & Action CTA Buttons

Clean high-converting pricing call-to-action buttons styled for modern pricing tiers, supporting automatic trailing arrows via the showArrow prop or clean text-only states.

- Primary `variant="pricing-primary"` clean solid primary theme button with subtle scale press physics.
- Dark Gradient `variant="pricing-dark"` high-contrast dark gradient button with white text matching Dot Matrix and Scale cards.
- Outline `variant="pricing-outline"` subtle card border with muted background hover effect.
- Glow Pro `variant="pricing-glow"` ambient theme-colored glow shadow for popular or enterprise tiers.
- Muted Flat `variant="pricing-muted"` flat muted card button commonly used for secondary or Contact Sales actions.
- Typographic Primary `variant="pricing-typographic"` featured primary typographic button with slide-up curtain effect and dual looping arrow motion.
- Typographic Muted `variant="pricing-typographic-muted"` muted typographic button with primary curtain slide-up on hover and dual looping arrow motion.
- Icon Toggle `showArrow=true | false` toggles trailing arrow icon cleanly without extra boilerplate.

```tsx
import Button from "@/components/custom/blocks/Button";

export default function PricingButtonsDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* 1. Primary CTA - with and without arrow */}
      <Button variant="pricing-primary" showArrow>
        Primary with Icon
      </Button>
      <Button variant="pricing-primary">
        Primary
      </Button>

      {/* 2. Dark Gradient CTA - with and without arrow */}
      <Button variant="pricing-dark" showArrow>
        Dark with Icon
      </Button>
      <Button variant="pricing-dark">
        Dark
      </Button>

      {/* 3. Outline CTA - with and without arrow */}
      <Button variant="pricing-outline" showArrow>
        Outline with Icon
      </Button>
      <Button variant="pricing-outline">
        Outline
      </Button>

      {/* 3. Glowing Pro CTA - with and without arrow */}
      <Button variant="pricing-glow" showArrow>
        Glow Pro with Icon
      </Button>
      <Button variant="pricing-glow">
        Glow Pro
      </Button>

      {/* 4. Muted Flat CTA - Contact Sales */}
      <Button variant="pricing-muted" showArrow>
        Contact Sales with Icon
      </Button>
      <Button variant="pricing-muted">
        Contact Sales
      </Button>

      {/* 5. Typographic High-Contrast Curtain CTA - with and without arrow */}
      <Button variant="pricing-typographic" showArrow>
        Initiate Project with Icon
      </Button>
      <Button variant="pricing-typographic">
        Initiate Project
      </Button>

      {/* 6. Typographic Muted Curtain CTA - with and without arrow */}
      <Button variant="pricing-typographic-muted" showArrow>
        Muted Project with Icon
      </Button>
      <Button variant="pricing-typographic-muted">
        Muted Project
      </Button>
    </div>
  );
};
```

## Features

- **4-Side Animated Glowing Border**: Conic-gradient spinning line that continuously sweeps around the 4 edges of the button matching Form Engine submitting buttons.
- **Interactive Sliding Icon Physics**: `variant="slide-icon"` provides a rounded background icon on the right that slides out to the right on hover, while a new rounded icon slides in smoothly from the left.
- **Looping Icon Motion**: `variant="slide-icon-loop"` keeps the same rounded icon on the right, but the arrow continuously exits to the right and re-enters from the left inside the circle, without any hover.
- **3D Press**: `variant="3d"` stacks a raised primary face over a darkened edge and a soft ground shadow. Hover lowers the face a step; pressing seats it on the edge, so the click reads as a real push.
- **Vertical Text Roll Animation**: `variant="slide-text"` moves the button text smoothly upwards on hover while another text label rolls up smoothly into position from below.
- **Ripple Click Physics**: Interactive radial ripple expansion on mouse click.
- **Loading Spinners**: Built-in async state handling with interactive disabled states.
- **Full Theme Color Syncing**: Automatically inherits site primary CSS variables (`var(--primary)`).

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"outline" \| "default" \| "secondary" \| "destructive" \| "ghost" \| "link" \| "slide-icon" \| "slide-icon-loop" \| "slide-text" \| "3d" \| "shards-control" \| "auth-social" \| "glass-social" \| "liquid-glass-primary" \| "liquid-glass-social" \| "scenic-primary" \| "scenic-secondary" \| "scenic-option" \| "ribbon-primary" \| "ribbon-social" \| "pricing-primary" \| "pricing-dark" \| "pricing-outline" \| "pricing-glow" \| "pricing-muted" \| "pricing-typographic" \| "pricing-typographic-muted" \| ...` | `"outline"` | Choose between 4-side border glow, sliding/looping icon, vertical text roll, raised 3D press, parameter control tiles, Auth &amp; Glass surfaces (`"auth-social"`, `"glass-social"`, `"liquid-glass-primary"`, `"liquid-glass-social"`, `"scenic-primary"`, `"scenic-secondary"`, `"scenic-option"`, `"ribbon-primary"`, `"ribbon-social"`), or pricing CTA surfaces (`"pricing-primary"`, `"pricing-dark"`, `"pricing-outline"`, `"pricing-glow"`, `"pricing-muted"`, `"pricing-typographic"`, `"pricing-typographic-muted"`). |
| `controlType` | `"color" \| "select" \| "slider" \| "toggle"` | `"select"` | Input type for `variant="shards-control"` (color picker, select dropdown, range slider, or toggle switch). |
| `label` · `value` · `options` | `string \| number \| string[]` | `—` | Label title, active value, and option choices for control tiles. |
| `effect` | `"none" \| "sparkle" \| "orbit" \| "beacon" \| "shimmer"` | `undefined` | Effect a control tile plays when a slider reaches full, a toggle switches on, or a select / colour pick changes. `sparkle` is a floor glow with twinkling specks, `orbit` runs two beams around the edge, `beacon` pings rings outward, `shimmer` wipes a bright band across. Unset keeps the built-in feedback (slider beacon at full, colour burst); `"none"` turns all of it off. |
| `effectMode` | `"once" \| "continuous"` | `"once"` | `once` plays a single time per change; `continuous` loops while the tile is active. |
| `effectActive` | `boolean` | `—` | Forces a `continuous` effect on or off. By default it runs while the slider is full, the toggle is on, or once a select / colour tile has been picked. |
| `size` | `"default" \| "sm" \| "lg"` | `"default"` | Controls the padding and height of the button. |
| `loading` | `boolean` | `false` | If true, replaces the leading icon with a spinner and disables user interaction. |
| `iconLeft` | `React.ReactNode` | `undefined` | Renders an icon or element to the left of the text. |
| `iconRight` | `React.ReactNode` | `undefined` | Renders an icon or element to the right of the text. |
| `showArrow` | `boolean` | `false` | If true, automatically displays an interactive trailing arrow icon (`ArrowRightIcon`) without needing to supply `iconRight`. |

---

Live previews and every example: https://avaraui.com/docs/nextjs/button
