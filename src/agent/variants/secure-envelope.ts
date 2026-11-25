import type { PageVariants } from "./types";

/**
 * Secure Envelope: 4 designs of one registry item (`secure-envelope`), chosen
 * with the `cardDesign` prop (the classic voucher is the default design).
 * `interactionMode` (step-flip or auto-flip) is how the card moves, a
 * behaviour, so it is not a separate variant. Claims come from
 * src/app/docs/[framework]/secure-envelope/page.mdx.
 */
export const secureEnvelope: PageVariants = {
  slug: "secure-envelope",
  intro:
    "An interactive sleeve with a double-sided card that slides out, lands on the sleeve and flips in 3D. Four designs: a confidential dossier folder, a biometric smartcard, a classic voucher and a rail ticket.",
  whenNot: [
    { use: "Wallet", slug: "wallet", reason: "you need a stack of several payment cards, not one flipping pass" },
    { use: "Folder", slug: "folder", reason: "you are showing files or photos in a folder, not a single pass" },
  ],
  gotchas: [
    "All four are the one `secure-envelope` item: install it once and set `cardDesign` from the index.",
    "`interactionMode` is how it moves, not a design: `step-flip` takes three clicks (slide out, flip, return) and `auto-flip` slides and flips on the first click.",
    "Each design reads its own fields from `data` (for example `holderName` for the smartcard, `passengerName` for the ticket), so pass the fields for the design you picked.",
  ],
  variants: [
    {
      id: "confidential-folder",
      label: "Confidential folder",
      group: "Dossier and ID",
      summary: "A manila dossier folder with a CONFIDENTIAL stamp and a hot pink card that slides out of it.",
      bestFor: ["a security dossier or classified-file reveal", "a bold, playful hero moment"],
      avoidIf: ["you want a serious payment or ticket look"],
      traits: ["manila folder", "stamp badge", "step-flip", "slide-out card"],
      item: "secure-envelope",
      demo: "secure-envelope",
      example: "Confidential Folder (Slide-Out Sleeve / Stay Hungry Variant)",
      props: { cardDesign: "confidential-folder", interactionMode: "step-flip" },
      setProps: { cardDesign: "confidential-folder" },
    },
    {
      id: "smart-card",
      label: "Biometric smartcard",
      group: "Dossier and ID",
      summary: "An identity smartcard in an encrypted key-vault sleeve, with a chip, NFC glyph and clearance badge.",
      bestFor: ["a VIP access pass or digital ID", "a security or fintech product page"],
      avoidIf: ["you want a lighthearted look"],
      traits: ["smartcard", "chip and NFC glyph", "clearance badge", "step-flip"],
      item: "secure-envelope",
      demo: "secure-envelope",
      example: "Biometric NFC SmartCard (Quantum Vault Variant)",
      props: { cardDesign: "smart-card", interactionMode: "step-flip" },
      setProps: { cardDesign: "smart-card" },
    },
    {
      id: "classic-voucher",
      label: "Classic voucher",
      group: "Pass and ticket",
      summary: "A reward voucher in a sleeve: the first click slides it out and flips it, the second returns it.",
      bestFor: ["a reward or discount voucher", "a membership offer"],
      avoidIf: ["you need passenger or seat details"],
      traits: ["voucher", "auto-flip", "default design"],
      item: "secure-envelope",
      demo: "secure-envelope",
      example: "Auto Flip (Classic Voucher / Classified)",
      props: { interactionMode: "auto-flip" },
    },
    {
      id: "train-ticket",
      label: "Rail ticket",
      group: "Pass and ticket",
      summary: "A high-speed rail ticket with passenger details, a vertical barcode and a tear-off stub.",
      bestFor: ["travel, event or transport ticketing", "a booking confirmation"],
      avoidIf: ["there is no route, seat or passenger to show"],
      traits: ["ticket", "barcode", "tear-off stub", "step-flip"],
      item: "secure-envelope",
      demo: "secure-envelope",
      example: "Train Online Ticket (Hyperbolt Express Variant)",
      props: { cardDesign: "train-ticket", interactionMode: "step-flip" },
      setProps: { cardDesign: "train-ticket" },
    },
  ],
};
