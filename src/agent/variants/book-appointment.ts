import type { PageVariants } from "./types";

/**
 * Book appointment: 2 looks of one registry item (`book-appointment`), chosen
 * with the `variant` prop. Claims come from
 * src/app/docs/[framework]/book-appointment/page.mdx.
 */
export const bookAppointment: PageVariants = {
  slug: "book-appointment",
  intro: "A booking page for a practitioner: portrait and contact details, scores as stars, two small charts and a day and time booker. Two surface treatments.",
  gotchas: [
    "Both are looks of the one `book-appointment` item: install it once and set `variant` from the index (the glass look needs none). The booker itself is the same in both.",
  ],
  variants: [
    {
      id: "glass",
      label: "Glass booking page",
      summary: "The booking page on frosted panels over an aurora backdrop.",
      bestFor: ["a clinic, studio or practice that wants a soft, atmospheric page"],
      avoidIf: ["you want flat white cards"],
      traits: ["frosted panels", "aurora backdrop", "day and time booker"],
      item: "book-appointment",
      demo: "book-appointment",
      example: "Clinic booking page",
      props: { rounded: true },
    },
    {
      id: "solid",
      label: "Solid booking page",
      summary: "The same booking on white cards with an ordinary shadow; no glass and no aurora.",
      bestFor: ["a clean, conventional page where blur effects would distract"],
      avoidIf: ["you want the soft glass atmosphere"],
      traits: ["white cards", "ordinary shadow", "no aurora"],
      item: "book-appointment",
      demo: "book-appointment",
      example: "Solid",
      props: { rounded: true, variant: "solid" },
      setProps: { variant: "solid" },
    },
  ],
};
