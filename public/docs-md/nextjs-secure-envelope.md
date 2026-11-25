---
title: "Shadcn Secure Envelope"
description: "Shadcn Secure Envelope. An envelope card component: a pass slides out on hover and lifts onto the cover on click, with a thumb notch."
url: https://avaraui.com/docs/nextjs/secure-envelope
---

# Shadcn Secure Envelope

An interactive envelope sleeve and 3D-flipping pass (`SecureEnvelope`) with `confidential-folder`, `smart-card`, and `train-ticket` designs in `step-flip` or `auto-flip` modes.

## Installation

Add the component by URL — no setup needed:

```bash
npx shadcn@latest add https://avaraui.com/r/secure-envelope.json
```

Or register the @avara-ui registry once per project and add it by name:

```bash
npx shadcn@latest registry add @avara-ui=https://avaraui.com/r/{name}.json
npx shadcn@latest add @avara-ui/secure-envelope
```

## Confidential Folder (Slide-Out Sleeve / Stay Hungry Variant)

A golden manila dossier folder with a stamped CONFIDENTIAL badge and a hot pink card that slides out of it.

- `cardDesign="confidential-folder"` is the manila folder with its top tab, red stamp and hot pink slide-out card.
- `interactionMode="step-flip"` splits the animation into three clicks: the card slides out, flips to the memorandum on its back, then returns inside.

```tsx
import { SecureEnvelope, type SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const confidentialData: SecureEnvelopeData = {
  idNumber: "ID · 0042",
  tagline: "STAY\nHUNGRY",
  subTagline: "STAY FOOLISH · CLASSIFIED",
  stampBadge: "CONFIDENTIAL",
  dossierNumber: "DOSSIER // SEC-0042",
};

export default function ConfidentialFolderExample() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <SecureEnvelope
        cardDesign="confidential-folder"
        interactionMode="step-flip"
        data={confidentialData}
      />
    </div>
  );
}
```

## Biometric NFC SmartCard (Quantum Vault Variant)

A biometric identity smartcard in an encrypted key vault sleeve, with a chip, NFC glyph and clearance badge.

- `cardDesign="smart-card"` is the Quantum Key Vault smartcard layout.
- `interactionMode="step-flip"` splits the animation into three clicks: open to the front, flip to the magnetic stripe and credentials, then close.

```tsx
import { SecureEnvelope, type SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const smartCardData: SecureEnvelopeData = {
  holderName: "Dr. Kaelen Vance",
  roleTitle: "CHIEF ARCHITECT",
  authLevel: "LEVEL 09 // OMNI",
};

export default function CyberSmartCardExample() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <SecureEnvelope
        cardDesign="smart-card"
        interactionMode="step-flip"
        data={smartCardData}
      />
    </div>
  );
}
```

## Auto Flip (Classic Voucher / Classified)

The first click slides the card out and flips it in place to its back; the second flips it back and returns it inside.

- `interactionMode="auto-flip"` runs the whole slide-out and 180° flip on the first click.

```tsx
import { SecureEnvelope, type SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const voucherData: SecureEnvelopeData = {
  frontTitle: "Exclusive Access",
  frontSubtitle: "Limited edition membership and premium reward voucher.",
  highlightQuote: "Unlock 50% off on all annual pro plans.",
};

export default function AutoFlipSecureEnvelopeExample() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <SecureEnvelope
        interactionMode="auto-flip"
        data={voucherData}
      />
    </div>
  );
}
```

## Train Online Ticket (Hyperbolt Express Variant)

A high-speed rail ticket with passenger details, a vertical barcode and a tear-off stub, in a bullet-train sleeve.

- `cardDesign="train-ticket"` is the Hyperbolt Express ticket layout, for both the card and the outer sleeve.
- `interactionMode="step-flip"` splits the animation into three clicks: open to the front ticket, flip to the route overview, then close.

```tsx
import { SecureEnvelope, type SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const ticketData: SecureEnvelopeData = {
  passengerName: "Barbara M. Sandoval",
  routeText: "ZÜRICH HB - PARIS-EST",
  seatNumber: "18A",
  trainNumber: "6",
};

export default function TrainOnlineTicketExample() {
  return (
    <div className="w-full flex items-center justify-center py-12">
      <SecureEnvelope
        cardDesign="train-ticket"
        interactionMode="step-flip"
        data={ticketData}
      />
    </div>
  );
}
```

## About Shadcn Secure Envelope

**What it is.** `SecureEnvelope` renders an interactive sleeve with an SVG thumb scoop and a double-sided card (`confidential-folder`, `smart-card`, `train-ticket`, or classic voucher) that glides out, lands on the sleeve, and flips 180° in 3D.

**How it is built.** Supports `step-flip` (3-click open → flip → close) and `auto-flip` (immediate slide + flip), full keyboard control (`Tab`, `Enter`/`Space`, `Escape`), and touch tap triggers.

**When to use it.** Use `SecureEnvelope` for digital rail/event tickets, VIP access passes, security dossiers, and interactive reward vouchers.

## For AI agents

**When to use**

- Interactive sleeved passes, tickets, NFC smartcards, and classified dossiers with 3D front/back flip

**When not to use**

- Multi-card fintech wallets — use [Wallet](https://avaraui.com/docs/nextjs/wallet)
- File/photo folders — use [Folder](https://avaraui.com/docs/nextjs/folder)

**Agent notes**

- Named exports: `SecureEnvelope`, `type SecureEnvelopeData` from `@/components/custom/blocks/SecureEnvelopeBlock`
- Choose `cardDesign` (`"confidential-folder" | "smart-card" | "train-ticket"`) and `interactionMode` (`"step-flip" | "auto-flip"`)

**Ask before you pick.** This page has 4 variants. If the user has not named one and has not asked you to choose for them, ask which they want before you install anything or write code, and show every option with its live link. If they ask you to choose, pick from each variant's best-for and avoid-if lines against their brief, and say why. If the user named a variant, use it and do not ask.

All 4 options as live previews: https://avaraui.com/view/secure-envelope

**When to use it.** An interactive sleeve with a double-sided card that slides out, lands on the sleeve and flips in 3D. Four designs: a confidential dossier folder, a biometric smartcard, a classic voucher and a rail ticket.

**When to use something else:**

- [Wallet](https://avaraui.com/docs/nextjs/wallet): you need a stack of several payment cards, not one flipping pass.
- [Folder](https://avaraui.com/docs/nextjs/folder): you are showing files or photos in a folder, not a single pass.

**Gotchas:**

- All four are the one `secure-envelope` item: install it once and set `cardDesign` from the index.
- `interactionMode` is how it moves, not a design: `step-flip` takes three clicks (slide out, flip, return) and `auto-flip` slides and flips on the first click.
- Each design reads its own fields from `data` (for example `holderName` for the smartcard, `passengerName` for the ticket), so pass the fields for the design you picked.

### The 4 variants

1. **Confidential folder** (`confidential-folder`): A manila dossier folder with a CONFIDENTIAL stamp and a hot pink card that slides out of it.
   - Live: https://avaraui.com/view/secure-envelope/confidential-folder
   - Best for: a security dossier or classified-file reveal; a bold, playful hero moment
   - Avoid if: you want a serious payment or ticket look
   - Traits: manila folder, stamp badge, step-flip, slide-out card
   - Install: `npx shadcn@latest add @avara-ui/secure-envelope`
   - Set these props: `{"cardDesign":"confidential-folder"}`
   - Docs: https://avaraui.com/docs/nextjs/secure-envelope#confidential-folder-slide-out-sleeve-stay-hungry-variant
2. **Biometric smartcard** (`smart-card`): An identity smartcard in an encrypted key-vault sleeve, with a chip, NFC glyph and clearance badge.
   - Live: https://avaraui.com/view/secure-envelope/smart-card
   - Best for: a VIP access pass or digital ID; a security or fintech product page
   - Avoid if: you want a lighthearted look
   - Traits: smartcard, chip and NFC glyph, clearance badge, step-flip
   - Install: `npx shadcn@latest add @avara-ui/secure-envelope`
   - Set these props: `{"cardDesign":"smart-card"}`
   - Docs: https://avaraui.com/docs/nextjs/secure-envelope#biometric-nfc-smartcard-quantum-vault-variant
3. **Classic voucher** (`classic-voucher`): A reward voucher in a sleeve: the first click slides it out and flips it, the second returns it.
   - Live: https://avaraui.com/view/secure-envelope/classic-voucher
   - Best for: a reward or discount voucher; a membership offer
   - Avoid if: you need passenger or seat details
   - Traits: voucher, auto-flip, default design
   - Install: `npx shadcn@latest add @avara-ui/secure-envelope`
   - Docs: https://avaraui.com/docs/nextjs/secure-envelope#auto-flip-classic-voucher-classified
4. **Rail ticket** (`train-ticket`): A high-speed rail ticket with passenger details, a vertical barcode and a tear-off stub.
   - Live: https://avaraui.com/view/secure-envelope/train-ticket
   - Best for: travel, event or transport ticketing; a booking confirmation
   - Avoid if: there is no route, seat or passenger to show
   - Traits: ticket, barcode, tear-off stub, step-flip
   - Install: `npx shadcn@latest add @avara-ui/secure-envelope`
   - Set these props: `{"cardDesign":"train-ticket"}`
   - Docs: https://avaraui.com/docs/nextjs/secure-envelope#train-online-ticket-hyperbolt-express-variant

## Props Reference

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `data` | `SecureEnvelopeData \| SecureEnvelopeData[]` | `undefined` | Structured data object containing all ticket, pass, keycard, voucher, and card metric properties. Can also be passed as an array. |
| `cardDesign` | `"confidential-folder" \| "smart-card" \| "train-ticket" \| "classified"` | `"classified"` | Selects the visual template: `"confidential-folder"` for the signature manila folder & hot-pink Stay Hungry card, `"smart-card"` for biometric NFC smartcards, `"train-ticket"` for European railway tickets, or `"classified"` for vintage dossiers. |
| `interactionMode` | `"auto-flip" \| "step-flip"` | `"auto-flip"` | Controls opening behavior: `"auto-flip"` opens and flips automatically on 1st click; `"step-flip"` splits the interaction into 3 clicks (Click 1 opens, Click 2 flips, Click 3 closes). |
| `passengerName` | `string` | `"Barbara M. Sandoval"` | Name of passenger printed on the train ticket. |
| `routeText` | `string` | `"ZÜRICH HB - PARIS-EST"` | Train route printed across the blue banner and solid black badge. |
| `seatNumber` | `string` | `"18A"` | Assigned train seat number. |
| `trainNumber` | `string` | `"6"` | Assigned train carriage/train number. |
| `date` | `string` | `"25/11/2024"` | Scheduled date of travel. |
| `departureTime` | `string` | `"06.30"` | Departure timestamp. |
| `trainCompany` | `string` | `"HYPERBOLT EXPRESS"` | Transit brand printed on the sleeve cover and ticket back. |
| `slogan` | `string` | `"UNLEASH THE POWER OF SPEED WITH HYPERBOLT EXPRESS"` | High-speed transit slogan on the sleeve and ticket back. |
| `barcodeNumber` | `string` | `"0 734664 235788"` | Code string for the vertical barcodes. |
| `websiteUrl` | `string` | `"HYPERBOLTEXPRESS.COM"` | Website URL printed on the sleeve and reverse side. |
| `color` | `string` | `undefined (var(--primary))` | Custom theme accent color override for the envelope sleeve and accents. Accepts preset names (`"emerald"`, `"indigo"`, `"rose"`, `"lavender"`, `"zinc"`) or any valid CSS hex/color. |
| `folderColor` | `string` | `undefined` | Alias for `color`. Optional custom theme color override for the folder sleeve and accents. |
| `initialPeek` | `number` | `38` | Horizontal pixel distance the card peeks out from the notch in resting idle state. |
| `hoverPeek` | `number` | `88` | Horizontal pixel distance the card glides out on hover before being clicked. |
| `cardVariant` | `"adaptive" \| "ivory"` | `"adaptive"` | Switches between dynamic dual-theme adaptivity (light in Light Mode, dark in Dark Mode) and classic physical ivory cardstock. |
| `defaultOpen` | `boolean` | `false` | Whether the folder opens directly in its elevated resting state. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Callback fired whenever the card opens or returns inside the sleeve. |

## Works with other components

- Compare with [Wallet](https://avaraui.com/docs/nextjs/wallet) for multi-card fintech pockets or [Card](https://avaraui.com/docs/nextjs/card) for static boarding passes.

## How do I choose the card design in SecureEnvelope?

Set `cardDesign` to `"confidential-folder"`, `"smart-card"` or `"train-ticket"`. Leaving it as the default `"classified"` gives the classic voucher. Each design reads its own fields from `data`, so pass the fields that match the design you picked.

## What is the difference between step-flip and auto-flip?

`step-flip` splits the interaction into three clicks: slide out, flip 180° to the back, then return inside. `auto-flip` slides out and flips to the back on the first click and returns inside on the second. `auto-flip` is the default `interactionMode`.

## How do I fill in the train ticket details?

Pass a `SecureEnvelopeData` object in `data` with fields such as `passengerName`, `routeText`, `seatNumber`, `trainNumber`, `date`, `departureTime`, `trainCompany`, `slogan` and `barcodeNumber`. Any field you omit falls back to the built-in sample value shown in the props table.

## Can SecureEnvelope be used with a keyboard or on touch screens?

Yes. Tab focuses the envelope, and `Enter`, `Space` and `Escape` drive the open, flip and close steps. On touch screens a tap does the same as a click. No gesture library is needed for either input.

## When should I use SecureEnvelope instead of Wallet or Card?

Choose `SecureEnvelope` for a single pass that slides out of a sleeve and flips, such as a rail ticket, VIP pass, dossier or voucher. Use [Wallet](https://avaraui.com/docs/nextjs/wallet) for a pocket of several payment cards and [Card](https://avaraui.com/docs/nextjs/card) for static content.

---

Live previews and every example: https://avaraui.com/docs/nextjs/secure-envelope
