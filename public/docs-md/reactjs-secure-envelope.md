---
title: "Shadcn Secure Envelope"
description: "Shadcn Secure Envelope. An envelope card component: a pass slides out on hover and lifts onto the cover on click, with a thumb notch."
url: https://avaraui.com/docs/nextjs/secure-envelope
---

# Shadcn Secure Envelope

An interactive classified envelope sleeve and travel pass: a secret card glides out on hover, lifts onto the cover on click and flips in 3D to show its back. It suits online tickets, travel passes, security dossiers, vouchers and VIP cards.

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

## More Examples

### Biometric NFC SmartCard (Quantum Vault Variant)

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

### Auto Flip (Classic Voucher / Classified)

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

### Train Online Ticket (Hyperbolt Express Variant)

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

## Features

### Rail Tickets & Biometric SmartCards

Rich variety of real-world templates including Hyperbolt European train tickets, classic classified dossiers, and biometric NFC smartcards with EMV microchips and full light/dark theme adaptivity.

### Two-Stage Flight Choreography

When clicked, the document slides out horizontally past the sleeve edge, elevates in front on the z-axis, and glides back down with a gentle tilt onto the front cover.

### Vector Thumb Scoop Notch

Engineered with a clean, subpixel-sharp SVG inward scoop notch along the right edge, exposing the card inside exactly like a high-end physical envelope sleeve.

### 3D In-Place Flip Physics

Features seamless 180-degree in-place 3D card flips with true perspective, preserved backface visibility, and dynamic theme adaptivity.

## Best Practices & Guidelines

### Keyboard & Accessibility

`SecureEnvelope` supports keyboard navigation: focus it with `Tab` and trigger the opening/closing animation using `Enter` or `Space`, or close with `Escape`.

### Mobile & Touch Interaction

On touch devices where hover is unavailable, tapping the folder launches the smooth opening flight sequence immediately.

### Biometric SmartCards & Access Credentials

Pass `cardDesign="smart-card"` with custom clearance levels, holder name, and department for cybersecurity credentials, VIP access badges, and identity portals.

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

---

Live previews and every example: https://avaraui.com/docs/nextjs/secure-envelope
