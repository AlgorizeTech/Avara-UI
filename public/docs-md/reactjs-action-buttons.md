---
title: "Action Button"
description: "Animated action buttons: slide to confirm, hold to delete, star, add to cart, waitlist and payment. Free shadcn/ui component with GSAP and Motion builds."
url: https://avaraui.com/docs/nextjs/action-buttons
---

# Action Button

Animated action buttons: slide to confirm, hold to delete, star, add to cart, waitlist and payment.

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

Or the Motion build (same props, same file — install one):

```bash
npx shadcn@latest add https://avaraui.com/r/action-buttons-motion.json
```

## Slide to Deploy

Draggable slide-to-confirm track with a clipped ink sweep, non-overshoot spring return, tap nudge, and `Deploying` → `Deployed` feedback.

- Slide to Confirm `SlideToConfirm=threshold, resetAfter` draggable slider thumb with ink clip-path reveal, tap nudge, and `Deploying` → `Deployed` feedback.

```tsx
import { SlideToConfirm } from "@/components/custom/blocks/ActionButtons";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <SlideToConfirm
        action={() => new Promise((r) => setTimeout(r, 1200))}
        resetAfter={2000}
      />
    </div>
  );
}
```

## Star & Upvote

Split counter buttons with a spring icon twirl, gold star or upvote triangle fill, and carry-animated odometer digits.

- Star & Upvote `StarButton=icon="star" | "upvote"` toggles pressed state with spring icon twirl and carry-animated odometer digits.

```tsx
import { StarButton } from "@/components/custom/blocks/ActionButtons";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <StarButton count={1299} />
      <StarButton icon="upvote" count={128} />
    </div>
  );
}
```

## Download & Delete

A download button with a live progress sweep, beside a press-and-hold delete with a hinged trash lid and linear fill.

- Interactive Download `InteractiveButton=action(progress)` sweeps horizontal progress fill with live percentage or indeterminate creep.
- Hold to Confirm `HoldToConfirm=holdDuration` lifts trash lid `-34deg` and fills background over hold duration; shows `Keep holding` on early tap.

```tsx
import { InteractiveButton, HoldToConfirm } from "@/components/custom/blocks/ActionButtons";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
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

      <HoldToConfirm
        action={() => new Promise((r) => setTimeout(r, 900))}
        resetAfter={2000}
      />
    </div>
  );
}
```

## Join Waitlist

A button that expands into an inline email form and rolls the returned queue position with an odometer.

- Waitlist Button `WaitlistButton=action(email)` expands smoothly into an inline email form and rolls queue position with an odometer.

```tsx
import { WaitlistButton } from "@/components/custom/blocks/ActionButtons";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <WaitlistButton
        action={async () => {
          await new Promise((r) => setTimeout(r, 1000));
          return { position: 42 };
        }}
      />
    </div>
  );
}
```

## Deploy & Cart

A split deploy button with an animated mode menu, and an add-to-cart button that drops a parcel into the basket and becomes a quantity stepper.

- Split Button `SplitButton=options, onAction` primary action button paired with an animated dropdown menu for switching modes.
- Add to Cart `AddToCart=price, max` drops a parcel into the dipping basket and morphs into a rolling quantity stepper.

```tsx
import { SplitButton, AddToCart } from "@/components/custom/blocks/ActionButtons";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <SplitButton onAction={() => new Promise((r) => setTimeout(r, 1100))} />

      <AddToCart price="$48.00" max={9} />
    </div>
  );
}
```

## Save Changes & Pay

An async save button with a delayed spinner and checkmark, and a checkout button that moves through processing to paid.

- Async Button `AsyncButton=action()` delays spinner by `loadingDelay` (200ms) and morphs to checkmark on resolve.
- Payment Button `PaymentButton=amount, action` transitions through idle → processing → paid (or shakes on failed).

```tsx
import { AsyncButton, PaymentButton } from "@/components/custom/blocks/ActionButtons";

export default function Demo() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      <AsyncButton action={() => new Promise((r) => setTimeout(r, 1200))}>
        Save changes
      </AsyncButton>

      <PaymentButton
        amount="$49.00"
        action={() => new Promise((r) => setTimeout(r, 1200))}
        resetAfter={2200}
      />
    </div>
  );
}
```

## About Action Buttons

**What it is.** Ten stateful buttons for the moments a plain button can't carry: confirming a risky action, saving, paying, joining a waitlist, adding to a cart. They are named exports of one file. Each runs the promise you pass as `action` and moves through idle, pending, done and failed states on its own.

**How it is built.** CSS handles the fixed-value motion and GSAP handles the pointer, drag and physics effects. A Motion build ships the same file on Motion instead. Colours come from your theme tokens, and the animation reads `prefers-reduced-motion`.

**When to use it.** Reach for these when an action takes time, can fail or can't be undone. For a button that only navigates, a plain shadcn button is enough.

## For AI agents

**When to use**

- Hold-to-delete, slide-to-deploy and other confirm-before-you-act flows
- Buttons that run an async call and need pending, success and error states
- Commerce actions: add to cart with a quantity stepper, pay, join a waitlist

**When not to use**

- A plain submit or link: use the glowing-border [Button](https://avaraui.com/docs/reactjs/button)
- A confirmation that needs a full explanation: use [Dialog](https://avaraui.com/docs/reactjs/dialog)

**Agent notes**

- Import the named exports from `@/components/custom/blocks/ActionButtons`; there is no default export.
- `action` must return a promise. On the confirm, hold, waitlist and payment buttons a rejected promise shows the failed state, so don't swallow errors inside it.
- `SlideToConfirm`, `HoldToConfirm` and `PaymentButton` stay on their done state until you set `resetAfter` (milliseconds). `AsyncButton` and `InteractiveButton` use `successDuration` instead.
- Install the GSAP build (`action-buttons`) or the Motion build (`action-buttons-motion`), not both.

## Props Reference

Every component is a named export of `ActionButtons`.

### SlideToConfirm

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `() => Promise<void>` | `undefined` | Runs when the thumb passes the threshold. A rejected promise shows the error label. |
| `label` | `string` | `\"Slide to deploy\"` | Track text while idle. |
| `pendingLabel` | `string` | `\"Deploying\"` | Text while the action runs. |
| `doneLabel` | `string` | `\"Deployed\"` | Text after the action resolves. |
| `errorLabel` | `string` | `\"Couldn't deploy\"` | Text after the action rejects. |
| `threshold` | `number` | `0.9` | Fraction of the track the thumb must cross to confirm. |
| `resetAfter` | `number` | `undefined` | Milliseconds before returning to idle after completion. Leave unset to stay done. |
| `disabled` | `boolean` | `undefined` | Disables dragging and keyboard input. |
| `className` | `string` | `undefined` | Classes for the track. |

### StarButton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `icon` | `\"star\" \| \"upvote\"` | `\"star\"` | Icon and default label. |
| `label` | `string` | `\"Star\" or \"Upvote\"` | Button text. Defaults from `icon`. |
| `count` | `number` | `0` | Starting count shown in the odometer. |
| `repo` | `string` | `undefined` | GitHub `owner/name`. Fetches the live star count and renders the button as a link to the repo. |
| `href` | `string` | `undefined` | Renders the button as a link opening in a new tab. Overrides the `repo` link. |
| `pressed` | `boolean` | `undefined` | Controlled pressed state. |
| `defaultPressed` | `boolean` | `false` | Initial pressed state when uncontrolled. |
| `onPressedChange` | `(pressed: boolean) => void` | `undefined` | Called when the pressed state toggles. |
| `className` | `string` | `undefined` | Classes for the root. |

### InteractiveButton

Other `<button>` attributes are passed to the button.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `(progress: (value: number) => void) => Promise<void>` | `undefined` | Runs on click. Call `progress` with 0–1 for a live percentage; never call it for an indeterminate sweep. |
| `children` | `ReactNode` | `\"Download\"` | Idle label. |
| `loadingLabel` | `string` | `\"Downloading\"` | Text while the action runs. |
| `successLabel` | `string` | `\"Downloaded\"` | Text after the action resolves. |
| `successDuration` | `number` | `1600` | Milliseconds the success state stays before resetting. |

### HoldToConfirm

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `() => Promise<void>` | `undefined` | Runs once the hold completes. |
| `label` | `string` | `\"Hold to delete\"` | Idle text. |
| `hintLabel` | `string` | `\"Keep holding\"` | Shown when the button is released early. |
| `pendingLabel` | `string` | `\"Deleting\"` | Text while the action runs. |
| `doneLabel` | `string` | `\"Deleted\"` | Text after the action resolves. |
| `errorLabel` | `string` | `\"Couldn't delete\"` | Text after the action rejects. |
| `holdDuration` | `number` | `1200` | Milliseconds the button must be held. |
| `resetAfter` | `number` | `undefined` | Milliseconds before returning to idle after completion. Leave unset to stay done. |
| `disabled` | `boolean` | `undefined` | Disables the button. |
| `className` | `string` | `undefined` | Classes for the button. |

### WaitlistButton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `(email: string) => Promise<void \| { position?: number }>` | `undefined` | Submits the email. Return a `position` to roll it in the odometer. |
| `label` | `string` | `\"Join the waitlist\"` | Idle button text. |
| `submitLabel` | `string` | `\"Join\"` | Submit button text inside the form. |
| `placeholder` | `string` | `\"you@company.com\"` | Email input placeholder. |
| `successLabel` | `string` | `\"You're on the list\"` | Text after a successful submit. |
| `successMessage` | `(email: string) => string` | Built-in message | Secondary success text. |
| `invalidMessage` | `string` | `\"Enter a valid email address.\"` | Shown for an invalid email. |
| `errorMessage` | `string` | `\"Couldn't save that. Try again.\"` | Shown when `action` rejects. |
| `className` | `string` | `undefined` | Classes for the root. |

### SplitButton

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `options` | `SplitOption[]` | Deploy, preview, redeploy | Menu items: `{ value, label, description?, icon? }`. |
| `value` | `string` | `undefined` | Controlled selected option. |
| `defaultValue` | `string` | First option | Initial option when uncontrolled. |
| `onValueChange` | `(value: string) => void` | `undefined` | Called when a menu item is picked. |
| `onAction` | `(value: string) => void \| Promise<void>` | `undefined` | Runs the selected option. A promise shows the running and done icons. |
| `menuLabel` | `string` | `\"More deploy options\"` | Accessible label for the menu trigger. |
| `disabled` | `boolean` | `undefined` | Disables both halves. |
| `className` | `string` | `undefined` | Classes for the root. |

### AddToCart

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `price` | `string` | `\"$48.00\"` | Price shown beside the label. |
| `label` | `string` | `\"Add to cart\"` | Button text. |
| `quantity` | `number` | `undefined` | Controlled quantity. |
| `defaultQuantity` | `number` | `0` | Initial quantity when uncontrolled. |
| `onQuantityChange` | `(quantity: number) => void \| Promise<void>` | `undefined` | Called when the quantity changes. |
| `max` | `number` | `undefined` | Upper limit for the stepper. |
| `className` | `string` | `undefined` | Classes for the root. |

### AsyncButton

Other `<button>` attributes are passed to the button.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `action` | `() => Promise<void>` | `undefined` | Runs on click. |
| `loadingDelay` | `number` | `200` | Milliseconds before the spinner appears, so fast actions skip it. |
| `successDuration` | `number` | `1500` | Milliseconds the checkmark stays before resetting. |

### PaymentButton

Other `<button>` attributes except `children` are passed to the button.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `amount` | `string` | `\"$49.00\"` | Amount shown after the label. |
| `label` | `string` | `\"Pay\"` | Idle text. |
| `action` | `() => Promise<void>` | `undefined` | Runs the payment. A rejected promise shakes into the failed state. |
| `processingLabel` | `string` | `\"Processing\"` | Text while the action runs. |
| `paidLabel` | `string` | `\"Paid\"` | Text after the action resolves. |
| `failedLabel` | `string` | `\"Payment failed\"` | Text after the action rejects. |
| `failedDuration` | `number` | `1800` | Milliseconds the failed state stays. |
| `resetAfter` | `number` | `undefined` | Milliseconds before returning to idle after paying. Leave unset to stay paid. |

### FollowButton

Included in the install but not shown above.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | `undefined` | Who is being followed, for the accessible label. |
| `following` | `boolean` | `undefined` | Controlled following state. |
| `defaultFollowing` | `boolean` | `false` | Initial state when uncontrolled. |
| `onFollowingChange` | `(following: boolean) => void \| Promise<void>` | `undefined` | Called when the state toggles. |
| `followLabel` | `string` | `\"Follow\"` | Text while not following. |
| `followingLabel` | `string` | `\"Following\"` | Text while following. |
| `unfollowLabel` | `string` | `\"Unfollow\"` | Hover text while following. |
| `className` | `string` | `undefined` | Classes for the button. |

## Works with other components

- Put [Dialog](https://avaraui.com/docs/reactjs/dialog) around a `HoldToConfirm` or `SlideToConfirm` when the confirmation needs a sentence of context.
- Fire a [Sonner toast](https://avaraui.com/docs/reactjs/sonner) when an `action` resolves, such as "Deployed" or "Added to cart".
- Use `AsyncButton` as the submit button of a [form](https://avaraui.com/docs/reactjs/form): its `action` is the async submit, with a spinner after 200 ms and a checkmark on success.
- Add a [Tooltip](https://avaraui.com/docs/reactjs/tooltip) to explain a gesture the first time a reader meets it, such as hold to delete.

## How do I ask for confirmation before a destructive action?

Use `HoldToConfirm` for delete-style actions or `SlideToConfirm` for deploys. Neither runs `action` until the gesture finishes: the hold lasts `holdDuration` (1200 ms by default) and the slide has to pass `threshold` (90% of the track). Releasing a hold early shows "Keep holding", and a rejected action shows the error label.

## Do the buttons handle loading, success and error states?

Yes. Pass an async `action` and the button shows its own pending, done and failed states. `AsyncButton` delays the spinner by 200 ms so a fast call never flashes one, `PaymentButton` shakes into a failed state when the promise rejects, and `resetAfter` returns a finished button to idle.

## Should I use the GSAP or the Motion build?

Either one. Both have the same props, the same file and the same install path, so pick the library your project already ships. GSAP is the default (`action-buttons`) and `action-buttons-motion` is the Motion twin. Install one, not both.

## Are the buttons accessible?

They read `prefers-reduced-motion` and report their state to assistive technology with live-region text, and a pending button is marked busy. `SlideToConfirm` also accepts keyboard input, so the gesture is not pointer-only.

## Can I use them without Next.js?

Yes. They import nothing from `next/*`, so they run in Vite and any other React app. `StarButton` renders a plain link when you pass `repo` or `href`.

---

Live previews and every example: https://avaraui.com/docs/nextjs/action-buttons
