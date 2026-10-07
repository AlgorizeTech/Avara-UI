export const metadata = docsPageMetadata("secure-envelope");

# Secure Envelope

An interactive classified envelope sleeve & travel pass component featuring a secret card that glides out horizontally on hover and elevates gracefully onto the cover on click. Designed with a vector-precise thumb notch, authentic security crest seals, and luxurious 3D dual-sided flip physics.

`SecureEnvelope` brings tactile physical curiosity to train online tickets, travel booking passes, security dossiers, coupon reward vouchers, and VIP cards.

export const usageTrainTicket = `import { SecureEnvelope, SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const ticketData: SecureEnvelopeData = {
  passengerName: "Barbara M. Sandoval",
  routeText: "ZÜRICH HB - PARIS-EST",
  seatNumber: "18A",
  trainNumber: "6",
};

export default function TrainOnlineTicketExample() {
  return (

  );
}`;

export const usageAutoFlip = `import { SecureEnvelope, SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const voucherData: SecureEnvelopeData = {
  frontTitle: "Exclusive Access",
  frontSubtitle: "Limited edition membership and premium reward voucher.",
  highlightQuote: "Unlock 50% off on all annual pro plans.",
};

export default function AutoFlipSecureEnvelopeExample() {
  return (

  );
}`;

export const usageStepFlip = `import { SecureEnvelope, SecureEnvelopeData } from "@/components/custom/blocks/SecureEnvelopeBlock";

const keycardData: SecureEnvelopeData = {
  holderName: "Kaelen Vance",
  roleTitle: "SECURITY ARCHITECT",
  authLevel: "LEVEL 09",
};

export default function CyberBiometricKeycardExample() {
  return (

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/secure-envelope
```

## Features

    Rail Tickets & Cyber Keycards
    Rich variety of real-world templates including Hyperbolt European train tickets, classic classified dossiers, and futuristic Quantum biometric keycards with EMV microchips.

    Two-Stage Flight Choreography
    When clicked, the document slides out horizontally past the sleeve edge, elevates in front on the z-axis, and glides back down with a gentle tilt onto the front cover.

    Vector Thumb Scoop Notch
    Engineered with a clean, subpixel-sharp SVG inward scoop notch along the right edge, exposing the card inside exactly like a high-end physical envelope sleeve.

    3D In-Place Flip Physics
    Features seamless 180-degree in-place 3D card flips with true perspective, preserved backface visibility, and dynamic theme adaptivity.

## Best Practices & Guidelines

    Keyboard & Accessibility
    SecureEnvelope supports keyboard navigation: focus it with Tab and trigger the opening/closing animation using Enter or Space, or close with Escape.

    Mobile & Touch Interaction
    On touch devices where hover is unavailable, tapping the folder launches the smooth opening flight sequence immediately.

    Keycards & Access Credentials
    Pass cardDesign="keycard" with custom clearance levels, holder name, EMV chips, and cryptographic hash telemetry for cybersecurity badges and VIP portals.

## Props Reference

        Prop
        Type
        Default
        Description

        data
        SecureEnvelopeData | SecureEnvelopeData[]
        undefined
        Structured data object containing all ticket, pass, keycard, voucher, and card metric properties. Can also be passed as an array.

        cardDesign
        "classified" | "train-ticket" | "keycard"
        "classified"
        Selects the card visual template: "keycard" for biometric smartcards, "train-ticket" for railway tickets, or "classified" for confidential dossiers.

        interactionMode
        "auto-flip" | "step-flip"
        "auto-flip"
        Controls opening behavior: "auto-flip" opens and flips automatically on 1st click; "step-flip" splits the interaction into 3 clicks (Click 1 opens, Click 2 flips, Click 3 closes).

        passengerName
        string
        "Barbara M. Sandoval"
        Name of passenger printed on the train ticket.

        routeText
        string
        "ZÜRICH HB - PARIS-EST"
        Train route printed across the blue banner and solid black badge.

        seatNumber
        string
        "18A"
        Assigned train seat number.

        trainNumber
        string
        "6"
        Assigned train carriage/train number.

        date
        string
        "25/11/2024"
        Scheduled date of travel.

        departureTime
        string
        "06.30"
        Departure timestamp.

        trainCompany
        string
        "HYPERBOLT EXPRESS"
        Transit brand printed on the sleeve cover and ticket back.

        slogan
        string
        "UNLEASH THE POWER OF SPEED WITH HYPERBOLT EXPRESS"
        High-speed transit slogan on the sleeve and ticket back.

        barcodeNumber
        string
        "0 734664 235788"
        Code string for the vertical barcodes.

        websiteUrl
        string
        "HYPERBOLTEXPRESS.COM"
        Website URL printed on the sleeve and reverse side.

        folderColor
        string
        undefined (var(--primary))
        Optional custom theme color override for the folder sleeve and accents. Defaults to the active theme's primary color.

        initialPeek
        number
        38
        Horizontal pixel distance the card peeks out from the notch in resting idle state.

        hoverPeek
        number
        88
        Horizontal pixel distance the card glides out on hover before being clicked.

        cardVariant
        "adaptive" | "ivory"
        "adaptive"
        Switches between dynamic dual-theme adaptivity (light in Light Mode, dark in Dark Mode) and classic physical ivory cardstock.

        defaultOpen
        boolean
        false
        Whether the folder opens directly in its elevated resting state.

        onOpenChange
        (open: boolean) =&gt; void
        undefined
        Callback fired whenever the card opens or returns inside the sleeve.

---

**Component Path:** `[framework]\secure-envelope\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
