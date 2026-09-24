# Wallet

An interactive fintech cardholder wallet component featuring 3 serially staggered cards, an authentic physical thumb scoop, a solid enclosed pocket, and privacy balance toggle. When hovered, the 3 cards glide up smoothly in a spring-staggered sequence. Designed with complete dual-theme adaptivity—delivering a clean, crisp, modern light palette in Light Mode and a deep, luxurious violet finish in Dark Mode.

export const usageDefault = `import { Wallet } from "@/components/custom/blocks/WalletBlock";

export default function DefaultWalletExample() {
  return (
    
      {/* 100% identical styling and cards ready out-of-the-box */}

  );
}`;

export const usageCustom = `import { Wallet, type WalletCardItem } from "@/components/custom/blocks/WalletBlock";

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

  );
}`;

## Installation

Register the @algorize-ui registry once per project, then add the component:

```bash
npx shadcn@latest registry add @algorize-ui=https://algorize-ui.vercel.app/r/{name}.json
npx shadcn@latest add @algorize-ui/wallet
```

## Features

    Serially Staggered Cards
    Hovering over the wallet smoothly slides out all 3 cards in a staggered spring sequence, allowing each card tier to reveal its currency and balance.

    100% Theme Adaptive (Light & Dark)
    Renders a clean, elegant light wallet with crisp borders in Light Mode and switches automatically to deep violet luxury tones in Dark Mode.

    Completely Enclosed Pocket Base
    Engineered with a solid pocket base ensuring cards are 100% hidden inside before hover and never poke through the bottom.

    Interactive Balance Privacy Toggle
    Users can toggle balance visibility with an animated eye icon button or auto-reveal the unmasked balance on hover.

## Best Practices & Guidelines

    Touch & Mobile Support
    On touchscreens without hover capability, tapping the wallet triggers the staggered cards reveal so mobile users have the identical tactile experience.

    Custom Datasets
    Pass a custom cards array to customize the name, balance, currency, card number, and gradient classes for each of the 3 cards to match your company's product lineup.

    Individual Card Hover
    When cards are fanned out, hovering over an individual card raises it an extra 18px and adjusts scale to highlight that specific card.

## Props Reference

        Prop
        Type
        Default
        Description

        cards
        WalletCardItem[]
        DEFAULT_WALLET_CARDS
        Array of cards with balances, names, chip states, and gradients.

        overallBalance
        string
        "$89,000.00"
        The total balance shown on the front face of the wallet.

        overallLabel
        string
        "Overall Balance"
        Subtitle text displayed underneath the overall balance.

        revealText
        string
        "Reveal balance"
        Label for the button when balance is concealed/masked.

        concealText
        string
        "Conceal balance"
        Label for the button when balance is revealed/visible.

        maskedBalance
        string
        "✱✱✱✱✱✱✱✱"
        Placeholder string rendered when balance is hidden.

        allowReveal
        boolean
        true
        Whether to show the Reveal/Conceal balance toggle button.

        defaultRevealed
        boolean
        false
        Initial visibility state of the balance (masked or unmasked).

        autoRevealOnHover
        boolean
        false
        Automatically unmask the balance when hovering over the wallet.

        walletColor
        string
        "var(--primary)"
        Custom color or CSS variable for the wallet sleeve and pocket.

        className
        string
        undefined
        Optional wrapper container CSS classes.

### WalletCardItem Object

        Property
        Type
        Default
        Description

        name
        string
        Required
        Card title or currency name (e.g., "Pounds", "Euros").

        balance
        string
        Required
        Formatted balance amount (e.g., "€46,000.00").

        currency
        string
        undefined
        Currency code (e.g., "GBP", "EUR", "USD").

        tag
        string
        undefined
        Small pill tag in top right (e.g., "SAVINGS", "PRIMARY").

        cardNumber
        string
        "•••• 4829"
        Masked card number displayed in the card footer.

        expiry
        string
        "12/29"
        Expiration date string (e.g., "08/29", "09/30").

        issuer
        string
        "PINSTACK"
        Card issuer or network brand name.

        cvv
        string
        "832"
        CVV security code shown on the back-face signature strip.

        hasChip
        boolean
        false
        Renders the metallic golden EMV chip on the card face.

        gradientLight
        string
        undefined
        Tailwind gradient classes for Light Mode card background.

        gradientDark
        string
        undefined
        Tailwind gradient classes for Dark Mode card background.

        textColorLight
        string
        undefined
        Text color class for Light Mode (e.g., "text-amber-950").

        textColorDark
        string
        undefined
        Text color class for Dark Mode (e.g., "text-white").

        subtextColorLight
        string
        undefined
        Secondary text color class for Light Mode.

        subtextColorDark
        string
        undefined
        Secondary text color class for Dark Mode.

        backSignatureLabel
        string
        "AUTHORIZED SIGNATURE"
        Label inside the back-face white signature strip.

        backSubtitle
        string
        "GLOBAL SECURE ASSET CARD"
        Header text printed on the card back footer.

        backNotice
        string
        "NOT VALID UNLESS SIGNED..."
        Legal disclaimer text printed on the card back footer.

---

**Component Path:** `[framework]\wallet\page.mdx`

**Web Version:** Visit the corresponding URL on the Algorize UI documentation site for live previews and interactive examples.
