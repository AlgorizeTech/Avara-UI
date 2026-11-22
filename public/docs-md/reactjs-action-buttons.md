---
title: "Action Button"
description: "Shadcn Action Button. A collection of stateful interactive action, commerce."
url: https://avaraui.com/docs/nextjs/action-buttons
---

# Action Button

A collection of stateful interactive action, commerce, and confirmation buttons powered by `motion/react` — featuring spring-morphing icons, odometer digit rolling, hold-to-confirm progress, draggable slide-to-confirm, inline waitlist expansion, cart parcel drop physics, split action menus, and payment/download progress states.

## Interactive Action, Async & Commerce Buttons

Uniform 48px-tall interactive buttons with spring morphing, odometer counters, hold-to-confirm progress, draggable slide-to-confirm, inline waitlist expansion, cart parcel drop physics, split action menu, and payment/download progress feedback.

- Async Button `AsyncButton=action()` delays spinner by `loadingDelay` (200ms) and morphs to checkmark on resolve.
- Hold to Confirm `HoldToConfirm=holdDuration` lifts trash lid `-34deg` and fills background over hold duration; shows `Keep holding` on early tap.
- Star & Upvote `StarButton=icon="star" | "upvote"` toggles pressed state with spring icon twirl and carry-animated odometer digits.
- Follow Button `FollowButton=onFollowingChange` morphs SVG strokes (plus → check → cross) and reveals red `Unfollow` only after pointer leaves and re-enters.
- Split Button `SplitButton=options, onAction` primary action button paired with an animated dropdown menu for switching modes.
- Add to Cart `AddToCart=price, max` drops a parcel into the dipping basket and morphs into a rolling quantity stepper.
- Interactive Download `InteractiveButton=action(progress)` sweeps horizontal progress fill with live percentage or indeterminate creep.
- Slide to Confirm `SlideToConfirm=threshold, resetAfter` draggable slider thumb with ink clip-path reveal, tap nudge, and `Deploying` → `Deployed` feedback.
- Payment Button `PaymentButton=amount, action` transitions through idle → processing → paid (or shakes on failed).
- Waitlist Button `WaitlistButton=action(email)` expands smoothly into an inline email form and rolls queue position with an odometer.

```tsx
import {
  AsyncButton,
  WaitlistButton,
  HoldToConfirm,
  SlideToConfirm,
  StarButton,
  FollowButton,
  SplitButton,
  AddToCart,
  PaymentButton,
  InteractiveButton,
} from "@/components/custom/blocks/ActionButtons";

export default function ActionButtonsDemo() {
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-wrap items-center justify-center gap-5">
        <AsyncButton action={() => new Promise((r) => setTimeout(r, 1200))}>
          Save changes
        </AsyncButton>

        <HoldToConfirm
          action={() => new Promise((r) => setTimeout(r, 900))}
          resetAfter={2000}
        />

        <StarButton count={1299} />

        <StarButton icon="upvote" count={128} />

        <FollowButton name="Lena Ortiz" />

        <SplitButton onAction={() => new Promise((r) => setTimeout(r, 1100))} />

        <AddToCart price="$48.00" max={9} />

        <InteractiveButton
          action={async (progress) => {
            for (let p = 0; p <= 100; p += 10) {
              progress(p / 100);
              await new Promise((r) => setTimeout(r, 160));
            }
          }}
        >
          Download
        </InteractiveButton>
      </div>

      <div className="flex flex-wrap items-start justify-center gap-6">
        <SlideToConfirm
          action={() => new Promise((r) => setTimeout(r, 1200))}
          resetAfter={2000}
        />

        <PaymentButton
          amount="$49.00"
          action={() => new Promise((r) => setTimeout(r, 1200))}
          resetAfter={2200}
        />

        <WaitlistButton
          action={async () => {
            await new Promise((r) => setTimeout(r, 1000));
            return { position: 42 };
          }}
        />
      </div>
    </div>
  );
}
```

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/action-buttons.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/action-buttons
```

## Components Included

- **`AsyncButton`**: Fixed-width async action trigger with delayed spinner (`loadingDelay`) and blur/slide checkmark confirmation.
- **`HoldToConfirm`**: Destructive press-and-hold button with hinged trash lid rotation (`-34deg`), linear fill, early-tap `"Keep holding"` hint, and haptic vibration.
- **`StarButton` (`star` & `upvote`)**: Split counter button with spring icon twirl, gold star fill / upvote triangle fill, and carry-animated `Odometer` digits.
- **`FollowButton`**: Morphing SVG strokes (`plus` → `check` → `cross`) with pointer-leave arming before revealing the soft-red `Unfollow` hover state.
- **`SplitButton`**: Primary action button paired with an animated dropdown menu, keyboard navigation (`ArrowUp`/`ArrowDown`/`Home`/`End`/`Escape`), and async running/done icon states.
- **`AddToCart`**: Drops a `5×5px` parcel into the dipping cart basket and transitions into a rolling `−` / `+` quantity stepper with `max` stock clamping.
- **`InteractiveButton`**: Horizontal progress sweep with live `0%–100%` readout (or indeterminate creep) and `Downloaded` completion feedback.
- **`SlideToConfirm`**: Accessible `role="slider"` track with clipped ink sweep, non-overshoot spring return, tap nudge, and keyboard shortcuts.
- **`PaymentButton`**: Lock-badged checkout trigger transitioning through `idle` → `processing` → `paid` (or horizontal shake on failure).
- **`WaitlistButton`**: Morphs smoothly via `clipPath` and SVG outline into an inline email form and rolls queue position via an odometer.

---

Live previews and every example: https://avaraui.com/docs/nextjs/action-buttons
