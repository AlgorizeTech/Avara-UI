import type { PageVariants } from "./types";

export const profileCard: PageVariants = {
  slug: "profile-card",
  intro:
    "Two profile card components: a creator profile card with a pastel aurora cover and Follow button, or a morphing account menu with status picker and workspace switcher.",
  gotchas: [
    "Control the creator card's verified seal and online dot via `verified` and `active` props.",
    "Control the account menu's initial open state and storage meter via `showModal` and `showStorage` props.",
  ],
  variants: [
    {
      id: "aurora",
      label: "Aurora Profile Card",
      summary:
        "Creator profile card with pointer-reactive aurora cover, expandable skills, counting stats, and Follow button.",
      bestFor: ["creator, team member, or author profile cards"],
      avoidIf: ["you need an account switcher menu"],
      traits: [
        "aurora cover",
        "expandable skills",
        "counting stats",
        "Follow button",
      ],
      item: "profile-card",
      demo: "profile-card",
      example: "Aurora Profile Card",
      props: { variant: "aurora", verified: true, active: true },
      setProps: { variant: "aurora" },
    },
    {
      id: "account-menu",
      label: "Account Menu",
      summary:
        "Morphing account pill and card with status picker, quick tiles, workspace switcher, and two-step sign out.",
      bestFor: ["user account menus, workspace switchers, and status pickers"],
      avoidIf: ["you want a public creator bio card"],
      traits: [
        "morphing pill",
        "status picker",
        "workspace switcher",
        "two-step sign out",
      ],
      item: "profile-card",
      demo: "profile-card",
      example: "Account Menu",
      props: { variant: "account-menu", showModal: true, showStorage: false },
      setProps: { variant: "account-menu" },
    },
  ],
};
