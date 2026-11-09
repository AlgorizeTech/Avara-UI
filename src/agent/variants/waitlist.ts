import type { PageVariants } from "./types";

/**
 * Waitlist: 3 layouts of one registry item (`waitlist`), chosen with the
 * `variant` prop. Claims come from
 * src/app/docs/[framework]/waitlist/page.mdx.
 */
export const waitlist: PageVariants = {
  slug: "waitlist",
  intro: "A pre-launch sign-up section in three layouts: a brand mark with a live countdown, a compact card, or a pill with a bar of early spots claimed.",
  whenNot: [
    {
      use: "Newsletter",
      slug: "newsletter",
      reason: "for an ongoing subscription rather than a place in line before launch",
    },
  ],
  gotchas: [
    "All three are layouts of the one `waitlist` item: install it once and set `variant` from the index.",
  ],
  variants: [
    {
      id: "launch",
      label: "Launch",
      summary: "Your mark, a live countdown to the opening date, and the form beside its button on a wide panel.",
      bestFor: ["a product with a fixed launch date"],
      avoidIf: ["you have no launch date to count down to"],
      traits: ["countdown to a date", "place in line after joining", "invite-link copy button", "wide panel"],
      item: "waitlist",
      demo: "waitlist",
      example: "Launch",
      props: { variant: "launch" },
      setProps: { variant: "launch" },
    },
    {
      id: "card",
      label: "Card",
      summary: "A compact card with the field over the button, for a sidebar, a footer or a modal.",
      bestFor: ["small spaces: a sidebar, a footer or a modal"],
      avoidIf: ["you want the sign-up to be a full section on the page"],
      traits: ["compact", "full-width button", "validates an empty field"],
      item: "waitlist",
      demo: "waitlist",
      example: "Card",
      props: { variant: "card" },
      setProps: { variant: "card" },
    },
    {
      id: "queue",
      label: "Queue",
      summary: "A pill form on a soft ground, faces already in line under it, and a bar of early spots claimed that fills in.",
      bestFor: ["limited early access, where scarcity and a visible crowd help"],
      avoidIf: ["there is no limit on spots"],
      traits: ["spots claimed bar", "faces in line", "light and dark mode"],
      item: "waitlist",
      demo: "waitlist",
      example: "Queue",
      props: { variant: "queue", rounded: true },
      setProps: { variant: "queue" },
    },
  ],
};
