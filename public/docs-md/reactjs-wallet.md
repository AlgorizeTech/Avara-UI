---
title: "Shadcn Wallet"
description: "Shadcn Wallet. A wallet component with three cards that rise from a pocket in a spring-staggered sequence on hover, a thumb scoop and a balance privacy toggle."
url: https://avaraui.com/docs/nextjs/wallet
---

# Shadcn Wallet

An interactive fintech cardholder wallet (`Wallet`) with three staggered spring cards, a physical thumb scoop, 3D card flip, and a balance privacy toggle.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/wallet.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/wallet
```

## Interactive Cardholder Wallet

Hover to slide the cards out. Click a card to pull it high out of the wallet, then click again to 3D-flip it to its back face.

- `allowReveal` adds the eye button that reveals or hides the balance.

```tsx
import { Wallet, type WalletCardItem } from "@/components/custom/blocks/WalletBlock";

const myCards: WalletCardItem[] = [
  {
    id: "card-1",
    name: "Savings Vault",
    balance: "€46,000.00",
    currency: "GBP",
    tag: "SAVINGS",
    cardNumber: "•••• 9142",
    expiry: "08/29",
    cvv: "614",
    issuer: "PINSTACK",
    hasChip: false,
    gradientLight: "from-amber-400 via-amber-400 to-amber-500",
    gradientDark: "from-amber-400 via-amber-500 to-amber-600",
    textColorLight: "text-amber-950",
    textColorDark: "text-amber-950",
    subtextColorLight: "text-amber-900/80",
    subtextColorDark: "text-amber-950/70",
    backSignatureLabel: "AUTHORIZED SIGNATURE",
    backSubtitle: "GLOBAL SECURE ASSET CARD",
    backNotice: "NOT VALID UNLESS SIGNED • ISSUED BY PINSTACK",
  },
  {
    id: "card-2",
    name: "Current Account",
    balance: "€46,000.00",
    currency: "GBP",
    tag: "CURRENT",
    cardNumber: "•••• 3058",
    expiry: "11/28",
    cvv: "832",
    issuer: "PINSTACK",
    hasChip: false,
    gradientLight: "from-fuchsia-500 via-purple-500 to-violet-600",
    gradientDark: "from-fuchsia-600 via-purple-600 to-violet-700",
    textColorLight: "text-white",
    textColorDark: "text-white",
    subtextColorLight: "text-white/80",
    subtextColorDark: "text-white/70",
    backSignatureLabel: "AUTHORIZED SIGNATURE",
    backSubtitle: "GROWTH CAPITAL CARD",
    backNotice: "NOT VALID UNLESS SIGNED • ISSUED BY PINSTACK",
  },
  {
    id: "card-3",
    name: "Euro Reserve",
    balance: "€46,000.00",
    currency: "EUR",
    tag: "PRIMARY",
    cardNumber: "•••• 4829",
    expiry: "09/30",
    cvv: "429",
    issuer: "PINSTACK",
    hasChip: true,
    gradientLight: "from-blue-600 via-indigo-600 to-blue-700",
    gradientDark: "from-blue-600 via-indigo-600 to-blue-800",
    textColorLight: "text-white",
    textColorDark: "text-white",
    subtextColorLight: "text-blue-100/80",
    subtextColorDark: "text-blue-200/70",
    backSignatureLabel: "AUTHORIZED SIGNATURE",
    backSubtitle: "PREMIER PRIVILEGE CARD",
    backNotice: "NOT VALID UNLESS SIGNED • ISSUED BY PINSTACK",
  },
];

export default function CustomWalletExample() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <Wallet
        cards={myCards}
        overallBalance="$89,000.00"
        overallLabel="Overall Balance"
        revealText="Reveal balance"
        concealText="Conceal balance"
        maskedBalance="✱✱✱✱✱✱✱✱"
        allowReveal={true}
        defaultRevealed={false}
        autoRevealOnHover={false}
      />
    </div>
  );
}
```

## About Shadcn Wallet

**What it is.** `Wallet` displays a physical-pocket cardholder with three staggered payment cards (`cards: WalletCardItem[]`), click-to-pull and 3D-flip inspection, and an optional `allowReveal` balance mask toggle.

**How it is built.** Engineered with an enclosed pocket base so cards stay hidden at rest, tap-to-reveal support on touchscreens, and automatic light/dark palette switching.

**When to use it.** Use `Wallet` in fintech dashboards, billing/payment overviews, and interactive product demos. For swipeable card decks, use [Card Stack](https://avaraui.com/docs/reactjs/card-stack).

## For AI agents

**When to use**

- Fintech cardholder showcases with hover/tap card fanning, 3D card flip, and masked balance toggle

**When not to use**

- Generic swipeable card decks — use [Card Stack](https://avaraui.com/docs/reactjs/card-stack)
- Checkout submit buttons — use [Action Button](https://avaraui.com/docs/reactjs/action-buttons) (`PaymentButton`)

**Agent notes**

- Named exports: `Wallet`, `type WalletCardItem` from `@/components/custom/blocks/WalletBlock`
- Pass `allowReveal` and `overallBalance` for the privacy eye toggle; pass custom `cards` to override card names, balances, and gradients

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `cards` | `WalletCardItem[]` | `DEFAULT_WALLET_CARDS` | Array of cards with balances, names, chip states, and gradients. |
| `overallBalance` | `string` | `"$89,000.00"` | The total balance shown on the front face of the wallet. |
| `overallLabel` | `string` | `"Overall Balance"` | Subtitle text displayed underneath the overall balance. |
| `revealText` | `string` | `"Reveal balance"` | Label for the button when balance is concealed/masked. |
| `concealText` | `string` | `"Conceal balance"` | Label for the button when balance is revealed/visible. |
| `maskedBalance` | `string` | `"✱✱✱✱✱✱✱✱"` | Placeholder string rendered when balance is hidden. |
| `allowReveal` | `boolean` | `true` | Whether to show the Reveal/Conceal balance toggle button. |
| `defaultRevealed` | `boolean` | `false` | Initial visibility state of the balance (masked or unmasked). |
| `autoRevealOnHover` | `boolean` | `false` | Automatically unmask the balance when hovering over the wallet. |
| `walletColor` | `string` | `"var(--primary)"` | Base color or CSS variable. The sleeve and pocket wear a soft tint of it, with text in a deep shade of the same hue. |
| `hint` | `string` | `"Hover to view cards"` | Prompt shown above the closed wallet on pointer devices. Pass `""` to hide. |
| `touchHint` | `string` | `"Tap to view cards"` | The same prompt on touch screens, where the wallet opens on tap. |
| `openHint` | `string` | `"Click a card to view details"` | Prompt shown while the cards are out, on pointer devices. Pass `""` to hide. |
| `touchOpenHint` | `string` | `"Tap a card to view details"` | The open prompt on touch screens. |
| `className` | `string` | `undefined` | Optional wrapper container CSS classes. |

### WalletCardItem Object

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | `string` | Required | Card title or currency name (e.g., "Pounds", "Euros"). |
| `balance` | `string` | Required | Formatted balance amount (e.g., "€46,000.00"). |
| `currency` | `string` | `undefined` | Currency code (e.g., "GBP", "EUR", "USD"). |
| `tag` | `string` | `undefined` | Small pill tag in top right (e.g., "SAVINGS", "PRIMARY"). |
| `cardNumber` | `string` | `"•••• 4829"` | Masked card number displayed in the card footer. |
| `expiry` | `string` | `"12/29"` | Expiration date string (e.g., "08/29", "09/30"). |
| `issuer` | `string` | `"PINSTACK"` | Card issuer or network brand name. |
| `cvv` | `string` | `"832"` | CVV security code shown on the back-face signature strip. |
| `hasChip` | `boolean` | `false` | Renders the metallic golden EMV chip on the card face. |
| `gradientLight` | `string` | `undefined` | Tailwind gradient classes for Light Mode card background. |
| `gradientDark` | `string` | `undefined` | Tailwind gradient classes for Dark Mode card background. |
| `textColorLight` | `string` | `undefined` | Text color class for Light Mode (e.g., "text-amber-950"). |
| `textColorDark` | `string` | `undefined` | Text color class for Dark Mode (e.g., "text-white"). |
| `subtextColorLight` | `string` | `undefined` | Secondary text color class for Light Mode. |
| `subtextColorDark` | `string` | `undefined` | Secondary text color class for Dark Mode. |
| `backSignatureLabel` | `string` | `"AUTHORIZED SIGNATURE"` | Label inside the back-face white signature strip. |
| `backSubtitle` | `string` | `"GLOBAL SECURE ASSET CARD"` | Header text printed on the card back footer. |
| `backNotice` | `string` | `"NOT VALID UNLESS SIGNED..."` | Legal disclaimer text printed on the card back footer. |

## Works with other components

- Pair `Wallet` with [Counter](https://avaraui.com/docs/reactjs/counter) balance metrics or [Action Button](https://avaraui.com/docs/reactjs/action-buttons) (`PaymentButton`) checkout triggers.

## How do I build a fintech card wallet UI in React?

Render `Wallet` and pass a `cards` array of `WalletCardItem` objects, each with a `name` and `balance`. The wallet shows three staggered cards in a pocket, lets users pull one out and flip it in 3D, and shows `overallBalance` on its face.

## Does Wallet work on touch devices without hover?

Yes. Tapping `Wallet` on touchscreens opens the staggered card fan, and tapping an individual card pulls it out and flips it in 3D. Prompts use `touchHint` and `touchOpenHint` on touch screens, and `hint` and `openHint` on pointer devices.

## How do I mask or reveal the balance?

`allowReveal` shows a Reveal and Conceal button and is `true` by default. Set `defaultRevealed` to start unmasked, or `autoRevealOnHover` to unmask while hovering. `maskedBalance` is the placeholder text, and `revealText` and `concealText` rename the button.

## How do I style each card and the wallet colour?

Each `WalletCardItem` takes `gradientLight` and `gradientDark` Tailwind gradient classes for the two themes, plus `hasChip`, `tag`, `currency`, `cardNumber`, `expiry`, `issuer` and `cvv`. `walletColor` tints the sleeve and pocket, and defaults to `var(--primary)`.

## When should I use Wallet instead of SecureEnvelope?

Use `Wallet` for several payment cards held in one pocket, with balances. Use [Secure Envelope](https://avaraui.com/docs/reactjs/secure-envelope) when you want one pass, ticket or voucher that slides out of a sleeve and flips. Pair `Wallet` with [Counter](https://avaraui.com/docs/reactjs/counter) for animated balances.

---

Live previews and every example: https://avaraui.com/docs/nextjs/wallet
